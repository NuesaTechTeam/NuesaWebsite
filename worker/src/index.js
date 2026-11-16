/**
 * NUESA ABUAD Elections API — Cloudflare Worker
 *
 * Endpoints:
 *   POST /admin/login        { username, password } -> { token }
 *   POST /voter/verify       { matricNumber, invoiceNumber } -> { voterToken, maskedEmail, maskedPhone }
 *   POST /voter/otp/send     { voterToken } -> { sent, channels }
 *   POST /voter/otp/verify   { voterToken, code } -> { ballotToken }
 *   POST /vote               { ballotToken, votes:[{ positionId, candidateId }] } -> { recorded }
 *                            (1+ positions; unopposed positions take the candidate id for Yes or "no")
 *   GET  /results            -> { positions:[{ positionId, total, candidates:[{ candidateId, votes }] }] }   (admin, agent)
 *   GET  /stats              -> { registeredVoters, ballotsCast }                                             (admin, agent)
 *   POST /agent/login        { username, password } -> { token }   (live-results-only role)
 *   GET  /election/status    -> { votingOpen }   (public)
 *   POST /admin/election/status { open } -> { votingOpen }   (admin)
 *   GET  /admin/brevo        (admin) remaining Brevo email credits
 *   GET  /candidates         -> candidates with photos/manifestos (from CANDIDATES_JSON var)
 *
 *   POST /blog/submissions             { title, author, email, category, content, image? } -> { id }
 *   GET  /blog/submissions?status=     (admin) list blog submissions
 *   POST /blog/submissions/:id/status  (admin) { status: approved|rejected }
 *   GET  /blog/posts                   approved blog posts for the public site
 *   GET  /blog/images/:id              cover image for a submission (public, cached)
 *   POST /admin/diagnostics           (admin) { toEmail?, toPhone? } -> provider responses
 *
 *   POST /mailer/login                 { username, password } -> { token }
 *   GET  /admin/mail/recipients        (mailer) recipient count + sample from the sheet
 *   GET  /admin/mail/campaigns         (mailer) recent campaigns
 *   POST /admin/mail/campaigns         (mailer) { subject, body, batchSize?, durationSeconds? } -> { id }
 *   GET  /admin/mail/campaigns/:id     (mailer) campaign status + recent events
 *   POST /admin/mail/campaigns/:id/stop (mailer) stop a running campaign
 *   POST /admin/mail/attachments       (mailer) { name, data } -> { id, name, size }
 *   POST /admin/mail/images            (mailer) { name?, data } -> { id, url } (inline email images)
 *   GET  /mail/images/:id              public image bytes for emails (cached)
 *
 * /results and /stats require an admin Bearer token and are edge-cached for a
 * short TTL so repeated dashboard polling does not hit D1.
 *
 * Bindings (wrangler.toml / secrets):
 *   SESSIONS (KV)   - admin sessions + voter/otp/ballot tokens
 *   DB (D1)         - votes table (see README for schema)
 *   ADMIN_USERNAME, ADMIN_PASSWORD
 *   AGENT_USERNAME, AGENT_PASSWORD        - candidates' agents (live results only)
 *   TURNSTILE_SECRET      - Cloudflare Turnstile secret; unset = check switched off
 *   MAILER_USERNAME, MAILER_PASSWORD      - Mass Mailer login
 *   MAILER_SHEET_CSV_URL                  - published Google Sheet CSV (recipients)
 *   VOTER_SHEET_CSV_URL   - published Google Sheet CSV
 *   RESEND_API_KEY, OTP_EMAIL_FROM
 *   BREVO_API_KEY, MAIL_FROM_NAME, MAIL_FROM_EMAIL, MAIL_REPLY_TO
 *   TERMII_API_KEY, TERMII_SENDER_ID
 *   ALLOWED_ORIGIN        - e.g. "https://nuesaabuad.ng"
 */

import BALLOT from "../../src/lib/electionCandidates.json";

const ADMIN_SESSION_TTL = 60 * 60 * 8;
const OTP_TTL = 60 * 10;
const BALLOT_TTL = 60 * 30;
const MAX_OTP_ATTEMPTS = 5;
const MAX_LOGIN_ATTEMPTS = 10;

// Each matric number gets at most this many verification-code sends before
// voting, at least OTP_SEND_COOLDOWN_MS apart (saves Brevo/Termii credits).
const MAX_OTP_SENDS = 3;
const OTP_SEND_COOLDOWN_MS = 60 * 1000;

// Session roles. A token's KV value is its role; each route lists the roles it accepts.
const ROLE_ADMIN = "admin";
const ROLE_MAILER = "mailer";
const ROLE_AGENT = "agent";
const MAIL_ROLES = [ROLE_ADMIN, ROLE_MAILER];

// The ballot the worker accepts, shared with the website.
const POSITION_IDS = new Set(BALLOT.positions.map((position) => position.id));
const CANDIDATES_BY_POSITION = BALLOT.candidates.reduce((map, candidate) => {
  if (!map.has(candidate.positionId)) map.set(candidate.positionId, new Set());
  map.get(candidate.positionId).add(candidate.id);
  return map;
}, new Map());
const NO_VOTE_ID = "no";

// Site-wide failed-code alarm: more than STORM_THRESHOLD wrong codes across all
// matrics in one 10-minute bucket puts the API in "storm" mode for STORM_MS,
// during which each code allows only STORM_OTP_ATTEMPTS guesses.
const STORM_BUCKET_MS = 10 * 60 * 1000;
const STORM_THRESHOLD = 50;
const STORM_MS = 30 * 60 * 1000;
const STORM_OTP_ATTEMPTS = 3;

// Mass Mailer: hard cap on emails sent per Cron tick. Keeps each invocation
// well under the Workers subrequest limit (each email is one fetch to Brevo).
const MAIL_MAX_PER_TICK = 30;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mass Mailer attachments (PDFs). Bytes live in KV, referenced by campaign rows.
const MAX_MAIL_ATTACHMENTS = 3;
const MAX_ATTACHMENT_CHARS = 7_000_000; // ~5 MB binary (base64 is ~4/3 of bytes)
const MAIL_ATTACHMENT_TTL = 60 * 60 * 24 * 7; // auto-expire KV blobs after 7 days

// Inline images for rich (HTML) emails. Bytes live in D1 so URLs keep working.
const IMAGE_TYPES_RE = /^image\/(png|jpe?g|gif|webp)$/i;

// Routes guarded up front, by the roles allowed to call them.
const ROUTE_ROLES = new Map([
  ["GET /results", [ROLE_ADMIN, ROLE_AGENT]],
  ["GET /stats", [ROLE_ADMIN, ROLE_AGENT]],
  ["GET /admin/session", [ROLE_ADMIN, ROLE_MAILER, ROLE_AGENT]],
  ["GET /admin/ballots", [ROLE_ADMIN]],
  ["GET /admin/brevo", [ROLE_ADMIN]],
  ["POST /admin/election/status", [ROLE_ADMIN]],
]);

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    const route = `${request.method} ${url.pathname}`;

    // Guard layer first. Fail-open: if the guard itself errors, the request
    // carries on and the error is logged.
    try {
      const blocked = await runGuard(request, env, url);
      if (blocked) {
        for (const [key, value] of Object.entries(cors)) blocked.headers.set(key, value);
        return blocked;
      }
    } catch (guardError) {
      logEvent(request, "guard_error", { action: "allowed", detail: String(guardError).slice(0, 200) });
    }
    maybeCleanup(env, ctx);

    try {
      const routeRoles = ROUTE_ROLES.get(route);
      if (routeRoles && !(await hasRole(request, env, routeRoles))) {
        return json({ error: "Unauthorized" }, 401, cors);
      }

      let response;
      let handled = false;

      /* ------------------------------------------------------------ blog */
      if (url.pathname.startsWith("/mail/images/") && request.method === "GET") {
        const imageId = decodeURIComponent(url.pathname.slice("/mail/images/".length));
        response = await mailGetImage(request, env, ctx, imageId);
        handled = true;
      } else if (url.pathname.startsWith("/blog/images/") && request.method === "GET") {
        const imageId = decodeURIComponent(url.pathname.slice("/blog/images/".length));
        response = await blogGetImage(request, env, ctx, imageId);
        handled = true;
      } else if (url.pathname === "/blog/posts" && request.method === "GET") {
        response = await blogPublicPosts(request, env, ctx);
        handled = true;
      } else if (url.pathname === "/blog/submissions" && request.method === "POST") {
        response = await blogSubmit(request, env);
        handled = true;
      } else if (url.pathname === "/blog/submissions" && request.method === "GET") {
        if (!(await isAdmin(request, env))) {
          return json({ error: "Unauthorized" }, 401, cors);
        }
        response = await blogListSubmissions(request, env);
        handled = true;
      } else if (url.pathname.startsWith("/admin/mail/campaigns/")) {
        if (!(await hasRole(request, env, MAIL_ROLES))) {
          return json({ error: "Unauthorized" }, 401, cors);
        }
        const rest = url.pathname.slice("/admin/mail/campaigns/".length);
        if (rest.endsWith("/stop") && request.method === "POST") {
          response = await mailStopCampaign(env, decodeURIComponent(rest.slice(0, -"/stop".length)));
          handled = true;
        } else if (!rest.includes("/") && request.method === "GET") {
          response = await mailCampaignStatus(env, decodeURIComponent(rest));
          handled = true;
        }
      } else {
        const statusMatch = url.pathname.match(/^\/blog\/submissions\/([^/]+)\/status$/);
        if (statusMatch && request.method === "POST") {
          if (!(await isAdmin(request, env))) {
            return json({ error: "Unauthorized" }, 401, cors);
          }
          response = await blogUpdateStatus(request, env, ctx, statusMatch[1]);
          handled = true;
        } else if (url.pathname === "/admin/diagnostics" && request.method === "POST") {
          if (!(await isAdmin(request, env))) {
            return json({ error: "Unauthorized" }, 401, cors);
          }
          response = await adminDiagnostics(request, env);
          handled = true;
        }
      }

      if (handled) {
        // fall through to CORS + return below
      } else switch (route) {
        case "POST /admin/login":
          response = await adminLogin(request, env);
          break;
        case "POST /agent/login":
          response = await agentLogin(request, env);
          break;
        case "GET /election/status":
          response = json({ votingOpen: await isVotingOpen(env) });
          break;
        case "POST /admin/election/status":
          response = await setVotingOpen(request, env);
          break;
        case "GET /admin/brevo":
          response = await brevoCredits(env);
          break;
        case "POST /voter/verify":
          response = await voterVerify(request, env);
          break;
        case "POST /voter/otp/send":
          response = await otpSend(request, env);
          break;
        case "POST /voter/otp/verify":
          response = await otpVerify(request, env);
          break;
        case "POST /mailer/login":
          response = await mailerLogin(request, env);
          break;
        case "GET /admin/mail/recipients":
          response = await mailRecipients(request, env);
          break;
        case "GET /admin/mail/campaigns":
          response = await mailListCampaigns(request, env);
          break;
        case "POST /admin/mail/campaigns":
          response = await mailCreateCampaign(request, env);
          break;
        case "POST /admin/mail/test":
          response = await mailTestEmail(request, env);
          break;
        case "POST /admin/mail/attachments":
          response = await mailUploadAttachment(request, env);
          break;
        case "POST /admin/mail/images":
          response = await mailImageUpload(request, env);
          break;
        case "POST /vote":
          response = await castVote(request, env, ctx);
          break;
        case "GET /admin/session":
          response = json({ ok: true, role: await sessionRole(request, env) });
          break;
        case "GET /admin/ballots":
          response = await getBallots(env);
          break;
        case "GET /results":
          response = await getResults(request, env, ctx);
          break;
        case "GET /stats":
          response = await getStats(request, env, ctx);
          break;
        case "GET /candidates":
          response = await getCandidates(env);
          break;
        default:
          response = json({ error: "Not found" }, 404);
      }

      // Rebuild the response so headers are mutable. Responses returned from
      // cache.match() have immutable header guards, and CORS varies by Origin.
      const finalResponse = new Response(response.body, response);
      for (const [key, value] of Object.entries(cors)) {
        finalResponse.headers.set(key, value);
      }
      return finalResponse;
    } catch (error) {
      return json({ error: error.message || "Server error" }, 500, cors);
    }
  },

  // Cron Trigger (every minute): drip out any running Mass Mailer campaigns.
  async scheduled(event, env, ctx) {
    ctx.waitUntil(processMailCampaigns(env));
  },
};

/* ------------------------------------------------------------------ utils */

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...extra },
  });
}

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGIN || "*")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowOrigin = allowed.includes("*")
    ? "*"
    : allowed.includes(origin)
      ? origin
      : allowed[0] || "*";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    Vary: "Origin",
  };
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid JSON body");
  }
}

function randomToken(bytes = 32) {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return [...array].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function randomOtp() {
  const value = crypto.getRandomValues(new Uint32Array(1))[0] % 1000000;
  return String(value).padStart(6, "0");
}

function maskEmail(email) {
  if (!email || !email.includes("@")) return "your email";
  const [user, domain] = email.split("@");
  const head = user.slice(0, 2);
  return `${head}${"*".repeat(Math.max(user.length - 2, 1))}@${domain}`;
}

function maskPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length < 4) return "your phone";
  return `${"*".repeat(Math.max(digits.length - 4, 1))}${digits.slice(-4)}`;
}

function normalizeHeader(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, "");
}

/** Minimal CSV parser that handles quoted fields. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/** Look up a voter in the Google Sheet CSV by matric number + invoice number. */
async function findVoter(env, matricNumber, invoiceNumber) {
  if (!env.VOTER_SHEET_CSV_URL) {
    throw new Error("VOTER_SHEET_CSV_URL is not configured");
  }

  const response = await fetch(env.VOTER_SHEET_CSV_URL, { cf: { cacheTtl: 60 } });
  if (!response.ok) {
    throw new Error("Could not read the voters sheet");
  }

  const rows = parseCsv(await response.text()).filter((row) =>
    row.some((cell) => String(cell).trim() !== "")
  );
  if (rows.length < 2) return null;

  const headers = rows[0].map(normalizeHeader);
  const column = (names) => {
    for (const name of names) {
      const index = headers.indexOf(normalizeHeader(name));
      if (index !== -1) return index;
    }
    return -1;
  };

  const matricIndex = column(["matric number", "matric no", "matric", "matriculation number"]);
  const invoiceIndex = column(["invoice number", "invoice no", "invoice", "dues invoice number"]);
  const emailIndex = column(["email", "email address", "email address "]);
  const phoneIndex = column(["phone number", "phone", "phone no", "mobile", "whatsapp"]);

  if (matricIndex === -1 || invoiceIndex === -1) {
    throw new Error("Voters sheet is missing the matric number or invoice number column");
  }

  const targetMatric = normalizeValue(matricNumber);
  const targetInvoice = normalizeValue(invoiceNumber);

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const matric = normalizeValue(row[matricIndex]);
    const invoice = normalizeValue(row[invoiceIndex]);

    if (matric && matric === targetMatric && invoice === targetInvoice) {
      return {
        key: `${matric}:${invoice}`,
        matricNumber: String(row[matricIndex] || "").trim(),
        invoiceNumber: String(row[invoiceIndex] || "").trim(),
        email: emailIndex !== -1 ? String(row[emailIndex] || "").trim() : "",
        phone: phoneIndex !== -1 ? String(row[phoneIndex] || "").trim() : "",
      };
    }
  }

  return null;
}

/* ------------------------------------------------------------------- mail */

async function sendEmail(env, to, code) {
  if (!to) return { channel: "email", sent: false, reason: "No email address on record" };

  const subject = "Your NUESA Elections verification code";
  const text = `Your one-time verification code is ${code}. It expires in 10 minutes. If you did not request this, ignore this message.`;

  // Preferred provider: Brevo. Falls back to Resend when Brevo is not set.
  if (env.BREVO_API_KEY) {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": env.BREVO_API_KEY,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: env.MAIL_FROM_NAME || "NUESATECHTEAM",
          email: env.MAIL_FROM_EMAIL || "noreply@nuesaabuad.ng",
        },
        to: [{ email: to }],
        replyTo: { email: env.MAIL_REPLY_TO || env.MAIL_FROM_EMAIL || "noreply@nuesaabuad.ng" },
        subject,
        textContent: text,
      }),
    });

    if (response.ok) {
      return { channel: "email", provider: "brevo", sent: true, status: response.status };
    }

    const detail = await response.text().catch(() => "");
    return {
      channel: "email",
      provider: "brevo",
      sent: false,
      status: response.status,
      detail: detail.slice(0, 400),
    };
  }

  if (!env.RESEND_API_KEY) {
    return { channel: "email", sent: false, reason: "No email provider configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.OTP_EMAIL_FROM || "NUESA Elections <elections@nuesaabuad.ng>",
      to: [to],
      reply_to: env.OTP_REPLY_TO || "nuesa.abuad.tech@gmail.com",
      subject,
      text,
    }),
  });

  if (response.ok) return { channel: "email", provider: "resend", sent: true, status: response.status };

  const detail = await response.text().catch(() => "");
  return { channel: "email", provider: "resend", sent: false, status: response.status, detail: detail.slice(0, 400) };
}

/**
 * Convert a phone number to the international (E.164, no "+") format Termii
 * requires. Accepts "08102841732", "+2348102841732", etc.
 */
function normalizePhone(value) {
  let phone = String(value || "").replace(/[\s\-().]/g, "").replace(/^\+/, "");
  if (phone.startsWith("00")) phone = phone.slice(2);
  if (phone.startsWith("0")) phone = "234" + phone.slice(1);
  phone = phone.replace(/[^0-9]/g, "");
  return /^\d{7,15}$/.test(phone) ? phone : "";
}

async function sendSms(env, to, code) {
  if (!to) return { channel: "sms", sent: false, reason: "No phone number on record" };
  if (!env.TERMII_API_KEY) return { channel: "sms", sent: false, reason: "TERMII_API_KEY is not configured" };

  const recipient = normalizePhone(to);
  if (!recipient) {
    return { channel: "sms", sent: false, reason: `Unrecognized phone format: "${to}"` };
  }

  const response = await fetch("https://api.ng.termii.com/api/sms/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      api_key: env.TERMII_API_KEY,
      to: recipient,
      from: env.TERMII_SENDER_ID || "NUESA",
      sms: `Your NUESA Elections verification code is ${code}. It expires in 10 minutes.`,
      type: "plain",
      channel: env.TERMII_CHANNEL || "generic",
    }),
  });

  const raw = await response.text().catch(() => "");
  let parsed = null;
  try { parsed = JSON.parse(raw); } catch { /* keep raw */ }

  // Termii returns HTTP 200 even for some failures, so inspect the body too.
  const ok =
    response.ok &&
    (!parsed || !["error", "failed", "failure"].includes(String(parsed.code || parsed.status || "").toLowerCase()));

  return {
    channel: "sms",
    sent: ok,
    status: response.status,
    detail: (parsed ? JSON.stringify(parsed) : raw).slice(0, 400),
  };
}

/** Admin-only: send a real test OTP to a given email/phone and return provider responses. */
async function adminDiagnostics(request, env) {
  const { toEmail, toPhone } = await readJson(request);
  if (!toEmail && !toPhone) {
    return json({ error: "Provide toEmail and/or toPhone" }, 400);
  }

  const code = randomOtp();
  const results = {};
  if (toEmail) results.email = await sendEmail(env, toEmail, code);
  if (toPhone) results.sms = await sendSms(env, toPhone, code);

  return json({
    sentCode: code,
    config: {
      email: Boolean(env.BREVO_API_KEY || env.RESEND_API_KEY),
      emailFrom: env.OTP_EMAIL_FROM || null,
      sms: Boolean(env.TERMII_API_KEY),
      smsSenderId: env.TERMII_SENDER_ID || null,
      smsChannel: env.TERMII_CHANNEL || null,
    },
    results,
  });
}

/* ------------------------------------------------------------- security log */

/**
 * One structured line per security-relevant event. With Workers Logs enabled
 * (wrangler.toml [observability]) these are kept and searchable in the
 * Cloudflare dashboard; nothing here touches D1 or KV, so logging can't be used
 * to burn the free daily write allowance.
 */
function logEvent(request, kind, fields = {}) {
  const cf = request?.cf || {};
  const url = request ? new URL(request.url) : null;
  console.log(
    JSON.stringify({
      evt: "security",
      kind,
      time: new Date().toISOString(),
      ip: request?.headers.get("CF-Connecting-IP") || "",
      country: cf.country || "",
      asn: cf.asn || "",
      network: String(cf.asOrganization || "").slice(0, 80),
      ua: String(request?.headers.get("User-Agent") || "").slice(0, 200),
      method: request?.method || "",
      path: url ? `${url.pathname}${url.search}`.slice(0, 300) : "",
      ...fields,
    })
  );
}

/* ------------------------------------------------------- tokens in D1 (hashed) */

async function sha256Hex(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value)));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Voter and ballot tokens live in D1 (strongly consistent, 100k writes/day on
 * the free plan) instead of KV (1,000 writes/day). Only a hash of each token is
 * stored, so someone reading the database can't reuse a live token.
 */
async function putToken(env, kind, token, payload, ttlSeconds) {
  await env.DB.prepare(
    "INSERT INTO auth_tokens (token_hash, kind, payload, expires_at) VALUES (?, ?, ?, ?)"
  )
    .bind(await sha256Hex(token), kind, JSON.stringify(payload), Date.now() + ttlSeconds * 1000)
    .run();
}

async function getToken(env, kind, token) {
  if (!token || typeof token !== "string") return null;
  const row = await env.DB.prepare(
    "SELECT payload FROM auth_tokens WHERE token_hash = ? AND kind = ? AND expires_at > ?"
  )
    .bind(await sha256Hex(token), kind, Date.now())
    .first();
  return row ? JSON.parse(row.payload) : null;
}

/** Occasionally sweep expired rows so the security tables stay small. */
function maybeCleanup(env, ctx) {
  if (!ctx || Math.random() > 0.02) return;
  const now = Date.now();
  ctx.waitUntil(
    env.DB.batch([
      env.DB.prepare("DELETE FROM auth_tokens WHERE expires_at < ?").bind(now),
      env.DB.prepare("DELETE FROM otp_codes WHERE expires_at < ?").bind(now),
      env.DB.prepare("DELETE FROM login_attempts WHERE expires_at < ?").bind(now),
      env.DB.prepare("DELETE FROM guard_strikes WHERE expires_at < ?").bind(now),
      env.DB.prepare("DELETE FROM guard_bans WHERE until < ?").bind(now),
    ]).catch(() => {})
  );
}

/* ---------------------------------------------------------------- turnstile */

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Checks a Turnstile pass with Cloudflare. Fail-open by design: if Cloudflare's
 * checker can't be reached (network error, timeout, 5xx, internal-error) the
 * request continues and an event is logged; a pass Cloudflare rejects is
 * refused. With no TURNSTILE_SECRET configured the check is switched off.
 * A client that couldn't load the widget sends turnstileUnavailable; that is
 * only honoured when the server also can't reach Cloudflare.
 */
async function checkTurnstile(request, env, body) {
  if (!env.TURNSTILE_SECRET) return { ok: true };

  const token = typeof body?.turnstileToken === "string" ? body.turnstileToken : "";
  const verify = async (response) => {
    const form = new FormData();
    form.append("secret", env.TURNSTILE_SECRET);
    form.append("response", response);
    const ip = request.headers.get("CF-Connecting-IP");
    if (ip) form.append("remoteip", ip);
    // TURNSTILE_VERIFY_URL can be overridden only to test the fail-open path locally.
    const res = await fetch(env.TURNSTILE_VERIFY_URL || TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { unavailable: true, status: res.status };
    const data = await res.json().catch(() => null);
    if (!data) return { unavailable: true };
    const codes = data["error-codes"] || [];
    if (!data.success && codes.includes("internal-error")) return { unavailable: true };
    return { success: Boolean(data.success), codes };
  };

  let result;
  try {
    result = await verify(token || "missing-token");
  } catch {
    result = { unavailable: true };
  }

  if (result.unavailable) {
    logEvent(request, "turnstile_unavailable", { action: "allowed" });
    return { ok: true };
  }
  if (result.success) return { ok: true };

  logEvent(request, "turnstile_fail", {
    action: "refused",
    reason: token ? (result.codes || []).join(",") : body?.turnstileUnavailable ? "widget_unavailable" : "missing",
  });
  return {
    ok: false,
    response: json(
      {
        error: token
          ? "The security check expired or failed. Please try again."
          : "The security check didn't load. Please refresh the page and try again.",
      },
      403
    ),
  };
}

/* -------------------------------------------------------------- guard layer */

// Scoring adapted from Con Security. Checked against the URL decoded twice,
// because attackers double-encode to slip past filters.
const GUARD_SIGNALS = [
  {
    kind: "scan",
    points: 100,
    attack: true,
    test: (u) =>
      /(\/\.env|\/\.git|\/\.svn|\/\.aws|\/\.ssh|id_rsa|wp-login|wp-admin|wp-content|xmlrpc\.php|phpmyadmin|adminer|cgi-bin|vendor\/phpunit|shell\.php|\.php(\?|$)|backup\.(zip|tar|gz)|\.sql(\?|$)|\.bak(\?|$)|\.old(\?|$)|config\.(bak|old|php))/i.test(
        u.path
      ),
  },
  {
    kind: "tool_ua",
    points: 100,
    attack: true,
    test: (u) =>
      /(sqlmap|nikto|nmap|masscan|nuclei|wpscan|gobuster|ffuf|hydra|acunetix|dirbuster|feroxbuster|zgrab|nessus|openvas|w3af|arachni|skipfish|burpcollaborator)/i.test(
        u.ua
      ),
  },
  {
    kind: "sqli",
    points: 60,
    attack: true,
    test: (u) =>
      /(union[\s+]+(all[\s+]+)?select|information_schema|sleep\(\s*\d|benchmark\(|'\s*or\s*'?1'?\s*=\s*'?1|\bor\s+1\s*=\s*1\b|load_file\(|into\s+outfile)/i.test(
        u.target
      ),
  },
  {
    kind: "xss",
    points: 60,
    attack: true,
    test: (u) => /(<script|javascript:|onerror\s*=|onload\s*=|<iframe|document\.cookie|alert\()/i.test(u.target),
  },
  {
    kind: "traversal",
    points: 60,
    attack: true,
    test: (u) => /(\.\.\/|\.\.\\|\/etc\/passwd|\/proc\/self|php:\/\/|data:\/\/|file:\/\/)/i.test(u.target),
  },
  {
    kind: "cmdi",
    points: 60,
    attack: true,
    test: (u) => /(\$\{jndi:|;\s*(cat|ls|id|wget|curl)\s|\|\s*(bash|sh)\b|`[^`]+`)/i.test(u.target),
  },
  { kind: "no_ua", points: 60, attack: false, test: (u) => !u.ua },
  {
    kind: "scripted",
    points: 40,
    attack: false,
    test: (u) =>
      /(curl\/|wget\/|python-requests|python-urllib|go-http-client|scrapy|axios\/|headlesschrome|okhttp|libwww|httpclient|node-fetch)/i.test(
        u.ua
      ),
  },
];

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Runs before every route. Bans are keyed by IP + user agent, so a ban on one
 * attacking device never locks out other students sharing the same campus
 * Wi-Fi address. Failed codes and wrong passwords never lead to a ban.
 * Returns a Response to send instead of the route, or null to continue.
 */
async function runGuard(request, env, url) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ua = request.headers.get("User-Agent") || "";
  const banKey = `${ip}|${(await sha256Hex(ua)).slice(0, 16)}`;
  const now = Date.now();
  const reference = randomToken(4);

  const ban = await env.DB.prepare("SELECT until, reason FROM guard_bans WHERE ip_ua = ? AND until > ?")
    .bind(banKey, now)
    .first();
  if (ban) {
    logEvent(request, "ban", { action: "blocked", reason: ban.reason, reference });
    return json(
      { error: "Access from this device is temporarily blocked.", reference },
      403,
      { "Retry-After": String(Math.ceil((ban.until - now) / 1000)) }
    );
  }

  const raw = `${url.pathname}${url.search}`;
  const target = safeDecode(safeDecode(raw));
  const probe = { path: url.pathname, target, ua };
  const hits = GUARD_SIGNALS.filter((signal) => signal.test(probe));
  if (hits.length === 0) return null;

  const score = hits.reduce((sum, signal) => sum + signal.points, 0);
  const attack = hits.some((signal) => signal.attack);
  const kinds = hits.map((signal) => signal.kind).join(",");

  if (!attack) {
    logEvent(request, kinds, { action: "log", score, reference });
    return null;
  }

  // Strikes turn into timed bans (never shortened if a longer one exists).
  const day = Math.floor(now / 86400000);
  const bucket = Math.floor(now / 600000);
  const isScan = hits.some((signal) => signal.kind === "scan");
  const isTool = hits.some((signal) => signal.kind === "tool_ua");
  const bump = (key, ttlMs) =>
    env.DB.prepare(
      `INSERT INTO guard_strikes (key, count, expires_at) VALUES (?, 1, ?)
       ON CONFLICT (key) DO UPDATE SET count = count + 1 RETURNING count`
    )
      .bind(key, now + ttlMs)
      .first();

  const attackRow = await bump(`attack:${banKey}:${day}`, 86400000);
  const scanRow = isScan ? await bump(`scan:${banKey}:${bucket}`, 600000) : null;
  const attacks = attackRow?.count || 1;

  let banMs = 0;
  let reason = "";
  if (isTool) [banMs, reason] = [86400000, "attack tool"];
  if (scanRow && scanRow.count >= 3) [banMs, reason] = [86400000, "scanner"];
  if (attacks >= 6) [banMs, reason] = [86400000, "repeated attacks"];
  else if (attacks >= 3 && banMs === 0) [banMs, reason] = [3600000, "attacks"];

  if (banMs) {
    await env.DB.prepare(
      `INSERT INTO guard_bans (ip_ua, until, reason, created_at) VALUES (?, ?, ?, ?)
       ON CONFLICT (ip_ua) DO UPDATE SET until = MAX(until, excluded.until), reason = excluded.reason`
    )
      .bind(banKey, now + banMs, reason, now)
      .run();
    logEvent(request, kinds, { action: "ban", score, reason, banHours: banMs / 3600000, reference });
  } else {
    logEvent(request, kinds, { action: "blocked", score, strikes: attacks, reference });
  }

  return json({ error: "Request blocked.", reference }, 403);
}

/* --------------------------------------------------------------- handlers */

/** The role stored for the request's Bearer token ("admin", "mailer", "agent"), or "". */
async function sessionRole(request, env) {
  const header = request.headers.get("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return "";
  const role = await env.SESSIONS.get(`admin:${token}`);
  // Tokens issued before roles existed stored "1"; they no longer grant access.
  return [ROLE_ADMIN, ROLE_MAILER, ROLE_AGENT].includes(role) ? role : "";
}

async function hasRole(request, env, roles) {
  return roles.includes(await sessionRole(request, env));
}

/** True when the request carries a valid elections-admin Bearer token. */
async function isAdmin(request, env) {
  return hasRole(request, env, [ROLE_ADMIN]);
}

/**
 * Small edge cache for read-heavy admin endpoints. The Cache API does not
 * consume KV reads/writes and does not touch D1 on a hit.
 */
function cacheKeyFor(request, name) {
  return new Request(new URL(`/__cache__/${name}`, request.url), { method: "GET" });
}

/** Constant-time string comparison (reduces timing leakage on credentials). */
function safeEqual(a, b) {
  const left = String(a ?? "");
  const right = String(b ?? "");
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) {
    diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Shared username/password login. Failed attempts are rate-limited per IP and
 * role; a success stores a session token whose KV value is the role.
 */
/**
 * Failed-login counters live in D1 (not KV), so a flood of wrong passwords
 * can't use up KV's 1,000 writes/day on the free plan.
 */
async function loginAttempts(env, key) {
  const row = await env.DB.prepare("SELECT count FROM login_attempts WHERE key = ? AND expires_at > ?")
    .bind(key, Date.now())
    .first();
  return row?.count || 0;
}

async function bumpLoginAttempts(env, key) {
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO login_attempts (key, count, expires_at) VALUES (?, 1, ?)
     ON CONFLICT (key) DO UPDATE SET
       count = CASE WHEN expires_at > ? THEN count + 1 ELSE 1 END,
       expires_at = CASE WHEN expires_at > ? THEN expires_at ELSE excluded.expires_at END`
  )
    .bind(key, now + 600000, now, now)
    .run();
}

async function clearLoginAttempts(env, key) {
  await env.DB.prepare("DELETE FROM login_attempts WHERE key = ?").bind(key).run();
}

async function roleLogin(request, env, { role, username: expectedUser, password: expectedPass }) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const attemptKey = `${role}:${ip}`;

  if ((await loginAttempts(env, attemptKey)) >= MAX_LOGIN_ATTEMPTS) {
    logEvent(request, "login_locked", { role, action: "refused" });
    return json({ error: "Too many login attempts. Please try again later." }, 429);
  }

  const body = await readJson(request);
  const turnstile = await checkTurnstile(request, env, body);
  if (!turnstile.ok) return turnstile.response;

  const { username, password } = body;

  if (!expectedUser || !expectedPass) {
    return json({ error: "Login is not configured" }, 500);
  }

  const validUser = safeEqual(String(username || "").trim(), expectedUser);
  const validPass = safeEqual(password, expectedPass);
  if (!validUser || !validPass) {
    await bumpLoginAttempts(env, attemptKey);
    logEvent(request, "login_fail", { role, action: "refused" });
    return json({ error: "Invalid username or password" }, 401);
  }

  // Successful login clears the attempt counter.
  await clearLoginAttempts(env, attemptKey);

  const token = randomToken();
  await env.SESSIONS.put(`admin:${token}`, role, { expirationTtl: ADMIN_SESSION_TTL });
  logEvent(request, "login_ok", { role, action: "allowed" });
  return json({ token, role, expiresIn: ADMIN_SESSION_TTL });
}

function adminLogin(request, env) {
  return roleLogin(request, env, {
    role: ROLE_ADMIN,
    username: env.ADMIN_USERNAME,
    password: env.ADMIN_PASSWORD,
  });
}

function agentLogin(request, env) {
  return roleLogin(request, env, {
    role: ROLE_AGENT,
    username: env.AGENT_USERNAME,
    password: env.AGENT_PASSWORD,
  });
}

/* ------------------------------------------------------------ voting window */

async function isVotingOpen(env) {
  const row = await env.DB.prepare(
    "SELECT value FROM election_settings WHERE key = 'voting_open'"
  ).first();
  return row?.value === "1";
}

async function setVotingOpen(request, env) {
  const { open } = await readJson(request);
  if (typeof open !== "boolean") return json({ error: "Send { open: true | false }" }, 400);
  await env.DB.prepare(
    `INSERT INTO election_settings (key, value) VALUES ('voting_open', ?)
     ON CONFLICT (key) DO UPDATE SET value = excluded.value`
  )
    .bind(open ? "1" : "0")
    .run();
  logEvent(request, open ? "voting_opened" : "voting_closed", { action: "admin" });
  return json({ votingOpen: open });
}

/** Milliseconds-since-epoch until which "storm" mode lasts (0 when off). */
async function stormUntil(env) {
  const row = await env.DB.prepare("SELECT value FROM election_settings WHERE key = 'storm_until'").first();
  return Number(row?.value) || 0;
}

async function stormActive(env) {
  return (await stormUntil(env)) > Date.now();
}

/**
 * Counts wrong codes across ALL matrics in 10-minute buckets. Crossing the
 * threshold switches on storm mode (fewer guesses per code) and logs it.
 */
async function recordCodeFailure(request, env) {
  const now = Date.now();
  const bucket = Math.floor(now / STORM_BUCKET_MS);
  const row = await env.DB.prepare(
    `INSERT INTO code_fail_buckets (bucket, count) VALUES (?, 1)
     ON CONFLICT (bucket) DO UPDATE SET count = count + 1 RETURNING count`
  )
    .bind(bucket)
    .first();
  if ((row?.count || 0) > STORM_THRESHOLD && !(await stormActive(env))) {
    await env.DB.prepare(
      `INSERT INTO election_settings (key, value) VALUES ('storm_until', ?)
       ON CONFLICT (key) DO UPDATE SET value = excluded.value`
    )
      .bind(String(now + STORM_MS))
      .run();
    logEvent(request, "storm", {
      action: "storm_on",
      failedCodes: row.count,
      minutes: STORM_MS / 60000,
      guessesPerCode: STORM_OTP_ATTEMPTS,
    });
  }
}

const votingClosed = () =>
  json({ error: "Voting is not open right now. Please check back during the election window." }, 403);

/** True once this matric number has submitted a ballot. */
async function hasVoted(env, matric) {
  const row = await env.DB.prepare("SELECT 1 AS voted FROM ballots WHERE matric = ?")
    .bind(matric)
    .first();
  return Boolean(row);
}

const alreadyVoted = () =>
  json({ error: "This matric number has already voted. Each voter can only submit one ballot." }, 409);

/** Admin: remaining Brevo email credits (the account's send limit). */
async function brevoCredits(env) {
  if (!env.BREVO_API_KEY) return json({ error: "BREVO_API_KEY is not configured" }, 500);
  const response = await fetch("https://api.brevo.com/v3/account", {
    headers: { "api-key": env.BREVO_API_KEY, accept: "application/json" },
  });
  if (!response.ok) return json({ error: `Brevo returned ${response.status}` }, 502);

  const data = await response.json().catch(() => ({}));
  const plans = (Array.isArray(data.plan) ? data.plan : []).map((plan) => ({
    type: plan.type,
    credits: plan.credits,
    creditsType: plan.creditsType,
  }));
  const emailPlan = plans.find((plan) => plan.creditsType === "sendLimit") || plans[0] || null;
  return json({
    credits: emailPlan ? emailPlan.credits : null,
    planType: emailPlan ? emailPlan.type : null,
    plans,
  });
}

async function voterVerify(request, env) {
  const body = await readJson(request);
  const { matricNumber, invoiceNumber } = body;
  if (!matricNumber || !invoiceNumber) {
    return json({ error: "Matric number and invoice number are required" }, 400);
  }

  if (!(await isVotingOpen(env))) return votingClosed();

  const turnstile = await checkTurnstile(request, env, body);
  if (!turnstile.ok) return turnstile.response;

  const voter = await findVoter(env, matricNumber, invoiceNumber);
  if (!voter) {
    logEvent(request, "voter_not_found", {
      action: "refused",
      matric: String(matricNumber).trim().slice(0, 40),
    });
    return json({ error: "We could not find a verified dues payment for those details" }, 401);
  }
  voter.matric = normalizeValue(voter.matricNumber);
  if (await hasVoted(env, voter.matric)) return alreadyVoted();

  const voterToken = randomToken();
  await putToken(env, "voter", voterToken, voter, OTP_TTL);

  return json({
    voterToken,
    maskedEmail: maskEmail(voter.email),
    maskedPhone: maskPhone(voter.phone),
    hasEmail: Boolean(voter.email),
    hasPhone: Boolean(voter.phone),
  });
}

async function otpSend(request, env) {
  const { voterToken } = await readJson(request);
  const voter = await getToken(env, "voter", voterToken);
  if (!voter) return json({ error: "Verification session expired. Please sign in again." }, 401);

  if (!(await isVotingOpen(env))) return votingClosed();

  const matric = voter.matric || normalizeValue(voter.matricNumber);
  if (await hasVoted(env, matric)) return alreadyVoted();

  const now = Date.now();
  const sendRow = await env.DB.prepare("SELECT sends, last_sent_at FROM otp_sends WHERE matric = ?")
    .bind(matric)
    .first();
  if (sendRow && sendRow.sends >= MAX_OTP_SENDS) {
    return json(
      {
        error: `This matric number has already been sent ${MAX_OTP_SENDS} verification codes. Please see the electoral committee for help.`,
      },
      429
    );
  }
  if (sendRow && now - sendRow.last_sent_at < OTP_SEND_COOLDOWN_MS) {
    const wait = Math.ceil((OTP_SEND_COOLDOWN_MS - (now - sendRow.last_sent_at)) / 1000);
    return json({ error: `Please wait ${wait}s before requesting another code.`, retryAfter: wait }, 429);
  }
  // Count the send before contacting the providers so retries can't bypass the cap.
  await env.DB.prepare(
    `INSERT INTO otp_sends (matric, sends, last_sent_at) VALUES (?, 1, ?)
     ON CONFLICT (matric) DO UPDATE SET sends = sends + 1, last_sent_at = excluded.last_sent_at`
  )
    .bind(matric, now)
    .run();
  const sendsUsed = (sendRow?.sends || 0) + 1;

  const code = randomOtp();

  // Stored as a hash of (voter token + code): someone reading the database has
  // neither the voter token nor the code, so they can't recover or replay it.
  await env.DB.prepare(
    `INSERT INTO otp_codes (voter_token_hash, code_hash, attempts, expires_at) VALUES (?, ?, 0, ?)
     ON CONFLICT (voter_token_hash) DO UPDATE SET
       code_hash = excluded.code_hash, attempts = 0, expires_at = excluded.expires_at`
  )
    .bind(await sha256Hex(voterToken), await sha256Hex(`${voterToken}:${code}`), Date.now() + OTP_TTL * 1000)
    .run();

  const [emailResult, smsResult] = await Promise.all([
    sendEmail(env, voter.email, code),
    sendSms(env, voter.phone, code),
  ]);

  const channels = [emailResult, smsResult].filter((result) => result.sent);
  if (channels.length === 0) {
    return json(
      {
        error: "Could not send the verification code. Please try again.",
        failures: [emailResult, smsResult].map((result) => ({
          channel: result.channel,
          status: result.status,
          reason: result.reason,
          detail: result.detail,
        })),
      },
      502
    );
  }

  return json({
    sent: true,
    channels: channels.map((result) => result.channel),
    maskedEmail: maskEmail(voter.email),
    maskedPhone: maskPhone(voter.phone),
    sendsRemaining: Math.max(MAX_OTP_SENDS - sendsUsed, 0),
  });
}

async function otpVerify(request, env) {
  if (!(await isVotingOpen(env))) return votingClosed();
  const { voterToken, code } = await readJson(request);
  if (typeof voterToken !== "string" || !voterToken) {
    return json({ error: "Verification session expired. Please sign in again." }, 401);
  }
  const tokenHash = await sha256Hex(voterToken);
  const now = Date.now();
  const limit = (await stormActive(env)) ? STORM_OTP_ATTEMPTS : MAX_OTP_ATTEMPTS;

  // Each guess must first claim one of the allowed attempts in a single atomic
  // step. A burst of simultaneous guesses can't get more than `limit` checks.
  const claim = await env.DB.prepare(
    `UPDATE otp_codes SET attempts = attempts + 1
     WHERE voter_token_hash = ? AND attempts < ? AND expires_at > ?
     RETURNING code_hash, attempts`
  )
    .bind(tokenHash, limit, now)
    .first();

  if (!claim) {
    const existing = await env.DB.prepare(
      "SELECT attempts FROM otp_codes WHERE voter_token_hash = ? AND expires_at > ?"
    )
      .bind(tokenHash, now)
      .first();
    if (!existing) return json({ error: "Code expired. Please request a new one." }, 401);
    return json({ error: "Too many attempts. Please request a new code." }, 429);
  }

  const voter = await getToken(env, "voter", voterToken);
  if (!voter?.key) return json({ error: "Verification session expired. Please sign in again." }, 401);
  const matric = voter.matric || normalizeValue(voter.matricNumber);

  const guessHash = await sha256Hex(`${voterToken}:${String(code ?? "").trim()}`);
  if (!safeEqual(guessHash, claim.code_hash)) {
    logEvent(request, "code_fail", { action: "refused", matric, attempt: claim.attempts, limit });
    await recordCodeFailure(request, env);
    return json({ error: "Incorrect code" }, 401);
  }

  if (await hasVoted(env, matric)) return alreadyVoted();

  const ballotToken = randomToken();
  await putToken(env, "ballot", ballotToken, { voterKey: voter.key, matric }, BALLOT_TTL);
  await env.DB.prepare("DELETE FROM otp_codes WHERE voter_token_hash = ?").bind(tokenHash).run();

  return json({ ballotToken });
}

/**
 * Check a submitted ballot against the shared candidate list. Voters may leave
 * positions blank but must choose at least one; unopposed positions take the
 * candidate's id (Yes) or NO_VOTE_ID (No). Returns an error message or "".
 */
function validateBallot(votes) {
  if (!Array.isArray(votes) || votes.length === 0) {
    return "Choose at least one candidate before submitting.";
  }
  if (votes.length > POSITION_IDS.size) return "Too many votes on this ballot.";

  const seen = new Set();
  for (const vote of votes) {
    const positionId = String(vote?.positionId || "");
    const candidateId = String(vote?.candidateId || "");
    if (!POSITION_IDS.has(positionId)) return "Your ballot contains an unknown position.";
    if (seen.has(positionId)) return "Your ballot has more than one vote for a position.";
    seen.add(positionId);

    const candidates = CANDIDATES_BY_POSITION.get(positionId) || new Set();
    const unopposed = candidates.size === 1;
    const valid = candidates.has(candidateId) || (unopposed && candidateId === NO_VOTE_ID);
    if (!valid) return "Your ballot contains an unknown candidate.";
  }
  return "";
}

async function castVote(request, env, ctx) {
  if (!(await isVotingOpen(env))) return votingClosed();

  const { ballotToken, votes } = await readJson(request);
  const stored = await getToken(env, "ballot", ballotToken);
  if (!stored) return json({ error: "Your ballot session expired. Please sign in again." }, 401);

  const problem = validateBallot(votes);
  if (problem) return json({ error: problem }, 400);

  const ballotTokenHash = await sha256Hex(ballotToken);
  const { voterKey, matric: storedMatric } = stored;
  const matric = storedMatric || String(voterKey).split(":")[0];
  const createdAt = new Date().toISOString();

  // The ballots row goes first: its primary key makes a second ballot from the
  // same matric fail, and D1 rolls the whole batch back with it.
  const statements = [
    env.DB.prepare("INSERT INTO ballots (matric, voter_key, submitted_at) VALUES (?, ?, ?)").bind(
      matric,
      voterKey,
      createdAt
    ),
    ...votes.flatMap((vote) => [
      env.DB.prepare(
        "INSERT INTO votes (voter_key, position_id, candidate_id, created_at) VALUES (?, ?, ?, ?)"
      ).bind(voterKey, vote.positionId, vote.candidateId, createdAt),
      env.DB.prepare(
        `INSERT INTO tallies (position_id, candidate_id, votes) VALUES (?, ?, 1)
         ON CONFLICT (position_id, candidate_id) DO UPDATE SET votes = votes + 1`
      ).bind(vote.positionId, vote.candidateId),
    ]),
    env.DB.prepare(
      `INSERT INTO election_settings (key, value) VALUES ('ballots_cast', '1')
       ON CONFLICT (key) DO UPDATE SET value = CAST(CAST(value AS INTEGER) + 1 AS TEXT)`
    ),
    env.DB.prepare("DELETE FROM auth_tokens WHERE token_hash = ?").bind(ballotTokenHash),
  ];

  try {
    await env.DB.batch(statements);
  } catch {
    await env.DB.prepare("DELETE FROM auth_tokens WHERE token_hash = ?").bind(ballotTokenHash).run();
    return alreadyVoted();
  }

  logEvent(request, "vote_recorded", { action: "recorded", matric, positions: votes.length });
  // Drop the cached results/stats so the next dashboard poll reflects this ballot.
  if (ctx) {
    ctx.waitUntil(
      Promise.all([
        caches.default.delete(cacheKeyFor(request, "results")),
        caches.default.delete(cacheKeyFor(request, "stats")),
      ])
    );
  }
  return json({ recorded: true });
}

async function getStats(request, env, ctx) {
  const cache = caches.default;
  const key = cacheKeyFor(request, "stats");
  const cached = await cache.match(key);
  if (cached) return cached;

  // Ballots cast comes from a running counter kept in the vote's own batch, so
  // dashboards refreshing every 15 s don't recount every ballot (free D1 reads).
  const [registeredVoters, countRow, storm] = await Promise.all([
    countVoters(env),
    env.DB.prepare("SELECT value FROM election_settings WHERE key = 'ballots_cast'").first(),
    stormUntil(env),
  ]);
  const response = json({
    registeredVoters,
    ballotsCast: Number(countRow?.value) || 0,
    stormUntil: storm > Date.now() ? storm : 0,
  });
  response.headers.set("Cache-Control", "public, max-age=15");
  if (ctx) ctx.waitUntil(cache.put(key, response.clone()));
  return response;
}

async function countVoters(env) {
  if (!env.VOTER_SHEET_CSV_URL) return 0;

  const response = await fetch(env.VOTER_SHEET_CSV_URL, { cf: { cacheTtl: 60 } });
  if (!response.ok) throw new Error("Could not read the voters sheet");

  const rows = parseCsv(await response.text()).filter((row) =>
    row.some((cell) => String(cell).trim() !== "")
  );

  return Math.max(rows.length - 1, 0);
}

async function getResults(request, env, ctx) {
  const cache = caches.default;
  const key = cacheKeyFor(request, "results");
  const cached = await cache.match(key);
  if (cached) return cached;

  // Reads the small aggregate table instead of scanning every vote row.
  const { results } = await env.DB.prepare(
    "SELECT position_id AS positionId, candidate_id AS candidateId, votes FROM tallies"
  ).all();

  const positions = {};
  for (const row of results || []) {
    if (!positions[row.positionId]) {
      positions[row.positionId] = { positionId: row.positionId, total: 0, candidates: [] };
    }
    positions[row.positionId].candidates.push({
      candidateId: row.candidateId,
      votes: row.votes,
    });
    positions[row.positionId].total += row.votes;
  }

  const response = json({ positions: Object.values(positions) });
  response.headers.set("Cache-Control", "public, max-age=15");
  if (ctx) ctx.waitUntil(cache.put(key, response.clone()));
  return response;
}

/** Admin: every recorded ballot, grouped by voter (matric number + choices). */
async function getBallots(env) {
  const { results } = await env.DB.prepare(
    `SELECT voter_key AS voterKey, position_id AS positionId,
            candidate_id AS candidateId, created_at AS createdAt
     FROM votes
     ORDER BY voter_key, position_id`
  ).all();

  const byVoter = new Map();
  for (const row of results || []) {
    if (!byVoter.has(row.voterKey)) {
      byVoter.set(row.voterKey, {
        voterKey: row.voterKey,
        matric: String(row.voterKey).split(":")[0],
        votedAt: row.createdAt,
        votes: [],
      });
    }
    byVoter.get(row.voterKey).votes.push({
      positionId: row.positionId,
      candidateId: row.candidateId,
    });
  }

  return json({ ballots: [...byVoter.values()] });
}

async function getCandidates(env) {
  if (!env.CANDIDATES_JSON) return json({ candidates: [] });
  try {
    return json({ candidates: JSON.parse(env.CANDIDATES_JSON) });
  } catch {
    return json({ error: "CANDIDATES_JSON is not valid JSON" }, 500);
  }
}

/* --------------------------------------------------------------- blog */

const BLOG_STATUSES = new Set(["pending", "approved", "rejected"]);
const MAX_BLOG_CONTENT = 100000;
const MAX_IMAGE_CHARS = 2_600_000; // ~1.9 MB binary after base64

function cleanField(value, max) {
  return String(value || "").trim().slice(0, max);
}

/** Parse a `data:<type>;base64,<data>` URL. Returns null if not a valid image. */
function parseImageDataUrl(value) {
  if (typeof value !== "string") return null;
  const match = value.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/s);
  if (!match) return null;
  const contentType = match[1].toLowerCase();
  const data = match[2].replace(/\s/g, "");
  if (!data || data.length > MAX_IMAGE_CHARS) return null;
  return { contentType, data };
}

function imageUrlFor(request, id, hasImage) {
  return hasImage ? `${new URL(request.url).origin}/blog/images/${encodeURIComponent(id)}` : null;
}

async function blogSubmit(request, env) {
  const body = await readJson(request);
  const title = cleanField(body.title, 200);
  const author = cleanField(body.author, 120);
  const email = cleanField(body.email, 200);
  const category = cleanField(body.category, 80);
  const content = String(body.content || "").trim();

  if (!title || !author || !content) {
    return json({ error: "Title, author and content are required" }, 400);
  }
  if (content.length > MAX_BLOG_CONTENT) {
    return json({ error: "Submission is too long" }, 413);
  }

  const image = body.image ? parseImageDataUrl(body.image) : null;
  if (body.image && !image) {
    return json({ error: "The cover image is invalid or too large." }, 413);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO blog_submissions (id, title, author, email, category, content, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`
  )
    .bind(id, title, author, email, category, content, createdAt)
    .run();

  if (image) {
    await env.DB.prepare(
      "INSERT INTO blog_images (id, content_type, data, created_at) VALUES (?, ?, ?, ?)"
    )
      .bind(id, image.contentType, image.data, createdAt)
      .run();
  }

  return json({ id, status: "pending", hasImage: Boolean(image) }, 201);
}

async function blogListSubmissions(request, env) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");

  let query =
    `SELECT b.id, b.title, b.author, b.email, b.category, b.content, b.status,
            b.created_at, b.reviewed_at,
            CASE WHEN i.id IS NOT NULL THEN 1 ELSE 0 END AS has_image
     FROM blog_submissions b
     LEFT JOIN blog_images i ON i.id = b.id`;
  const binds = [];
  if (status && BLOG_STATUSES.has(status)) {
    query += " WHERE b.status = ?";
    binds.push(status);
  }
  query += " ORDER BY b.created_at DESC LIMIT 200";

  const { results } = await env.DB.prepare(query).bind(...binds).all();
  const submissions = (results || []).map((row) => ({
    id: row.id,
    title: row.title,
    author: row.author,
    email: row.email,
    category: row.category,
    content: row.content,
    status: row.status,
    created_at: row.created_at,
    reviewed_at: row.reviewed_at,
    image_url: imageUrlFor(request, row.id, row.has_image),
  }));

  return json({ submissions });
}

async function blogUpdateStatus(request, env, ctx, id) {
  const { status } = await readJson(request);
  if (!BLOG_STATUSES.has(String(status)) || status === "pending") {
    return json({ error: "Status must be 'approved' or 'rejected'" }, 400);
  }

  const result = await env.DB.prepare(
    "UPDATE blog_submissions SET status = ?, reviewed_at = ? WHERE id = ?"
  )
    .bind(status, new Date().toISOString(), id)
    .run();

  if (!result.meta || result.meta.changes === 0) {
    return json({ error: "Submission not found" }, 404);
  }

  if (ctx) ctx.waitUntil(caches.default.delete(cacheKeyFor(request, "blog-posts")));
  return json({ id, status });
}

async function blogPublicPosts(request, env, ctx) {
  const cache = caches.default;
  const key = cacheKeyFor(request, "blog-posts");
  const cached = await cache.match(key);
  if (cached) return cached;

  const { results } = await env.DB.prepare(
    `SELECT b.id, b.title, b.author, b.category, b.content, b.created_at, b.reviewed_at,
            CASE WHEN i.id IS NOT NULL THEN 1 ELSE 0 END AS has_image
     FROM blog_submissions b
     LEFT JOIN blog_images i ON i.id = b.id
     WHERE b.status = 'approved'
     ORDER BY b.reviewed_at DESC, b.created_at DESC
     LIMIT 100`
  ).all();

  const posts = (results || []).map((row) => ({
    id: row.id,
    title: row.title,
    author: row.author,
    category: row.category,
    content: row.content,
    created_at: row.created_at,
    reviewed_at: row.reviewed_at,
    image_url: imageUrlFor(request, row.id, row.has_image),
  }));

  const response = json({ posts });
  response.headers.set("Cache-Control", "public, max-age=60");
  if (ctx) ctx.waitUntil(cache.put(key, response.clone()));
  return response;
}

async function blogGetImage(request, env, ctx, id) {
  const cache = caches.default;
  const key = cacheKeyFor(request, `blog-image:${id}`);
  const cached = await cache.match(key);
  if (cached) return cached;

  const row = await env.DB.prepare(
    "SELECT content_type, data FROM blog_images WHERE id = ?"
  )
    .bind(id)
    .first();

  if (!row) return json({ error: "Image not found" }, 404);

  const binary = Uint8Array.from(atob(row.data), (char) => char.charCodeAt(0));
  const response = new Response(binary, {
    headers: {
      "content-type": row.content_type || "application/octet-stream",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
  if (ctx) ctx.waitUntil(cache.put(key, response.clone()));
  return response;
}

/* -------------------------------------------------------- mass mailer */

async function mailerLogin(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const attemptKey = `${ROLE_MAILER}:${ip}`;

  if ((await loginAttempts(env, attemptKey)) >= MAX_LOGIN_ATTEMPTS) {
    logEvent(request, "login_locked", { role: ROLE_MAILER, action: "refused" });
    return json({ error: "Too many login attempts. Please try again later." }, 429);
  }

  const { username, password } = await readJson(request);

  if (!env.MAILER_USERNAME || !env.MAILER_PASSWORD) {
    return json({ error: "Mailer credentials are not configured" }, 500);
  }

  const validUser = safeEqual(String(username || "").trim(), env.MAILER_USERNAME);
  const validPass = safeEqual(password, env.MAILER_PASSWORD);
  if (!validUser || !validPass) {
    await bumpLoginAttempts(env, attemptKey);
    logEvent(request, "login_fail", { role: ROLE_MAILER, action: "refused" });
    return json({ error: "Invalid username or password" }, 401);
  }

  await clearLoginAttempts(env, attemptKey);
  logEvent(request, "login_ok", { role: ROLE_MAILER, action: "allowed" });

  const token = randomToken();
  await env.SESSIONS.put(`admin:${token}`, ROLE_MAILER, { expirationTtl: ADMIN_SESSION_TTL });
  return json({ token, expiresIn: ADMIN_SESSION_TTL });
}

/**
 * Pull recipient emails from the published Google Sheet. We look for a header
 * cell containing "email"; if none is found we scan every cell for an address.
 * Duplicates (case-insensitive) and invalid addresses are dropped.
 */
async function fetchCampaignRecipients(env) {
  if (!env.MAILER_SHEET_CSV_URL) {
    throw new Error("Recipients sheet is not configured");
  }
  const response = await fetch(env.MAILER_SHEET_CSV_URL, { cf: { cacheTtl: 60 } });
  if (!response.ok) {
    throw new Error("Could not read the recipients sheet");
  }
  const rows = parseCsv(await response.text()).filter((row) =>
    row.some((cell) => String(cell).trim() !== "")
  );
  if (rows.length < 2) return [];

  const headers = rows[0].map(normalizeHeader);
  const emailIndex = headers.findIndex((header) => header.includes("email"));

  const emails = [];
  const seen = new Set();
  const add = (value) => {
    const address = String(value || "").trim();
    if (!EMAIL_RE.test(address)) return;
    const key = address.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    emails.push(address);
  };

  if (emailIndex !== -1) {
    for (let i = 1; i < rows.length; i += 1) add(rows[i][emailIndex]);
  } else {
    for (let i = 1; i < rows.length; i += 1) rows[i].forEach(add);
  }
  return emails;
}

async function mailRecipients(request, env) {
  if (!(await hasRole(request, env, MAIL_ROLES))) {
    return json({ error: "Unauthorized" }, 401);
  }
  try {
    const emails = await fetchCampaignRecipients(env);
    return json({ total: emails.length, sample: emails.slice(0, 3) });
  } catch (error) {
    return json({ error: error.message || "Could not read recipients" }, 500);
  }
}

async function mailListCampaigns(request, env) {
  if (!(await hasRole(request, env, MAIL_ROLES))) {
    return json({ error: "Unauthorized" }, 401);
  }
  const { results } = await env.DB.prepare(
    `SELECT id, subject, total, status, sent, failed, started_at, duration_seconds
     FROM mail_campaigns ORDER BY created_at DESC LIMIT 20`
  ).all();
  return json({ campaigns: results || [] });
}

/**
 * Parse a `data:application/pdf;base64,<data>` URL (or raw base64) into
 * `{ data, size }`. Returns null if it is not a PDF or is too large.
 */
function parsePdfDataUrl(value) {
  if (typeof value !== "string") return null;
  let data = value;
  const match = value.match(/^data:application\/pdf;[^,]*base64,(.+)$/s);
  if (match) data = match[1];
  data = data.replace(/\s/g, "");
  if (!data) return null;
  // PDF files begin with "%PDF" -> base64 "JVBER".
  if (!data.startsWith("JVBER")) return null;
  if (data.length > MAX_ATTACHMENT_CHARS) return null;
  return { data, size: Math.floor((data.length * 3) / 4) };
}

/** Store an uploaded PDF in KV and return a reference the campaign can use. */
async function mailUploadAttachment(request, env) {
  if (!(await hasRole(request, env, MAIL_ROLES))) {
    return json({ error: "Unauthorized" }, 401);
  }
  const body = await readJson(request);
  const name = cleanField(body.name, 120);
  const pdf = parsePdfDataUrl(body.data);
  if (!name) return json({ error: "Attachment name is required" }, 400);
  if (!pdf) return json({ error: "Only PDF files up to 5 MB are supported." }, 413);

  const id = randomToken(8);
  await env.SESSIONS.put(`mail-att:${id}`, pdf.data, { expirationTtl: MAIL_ATTACHMENT_TTL });
  return json({ id, name, size: pdf.size }, 201);
}

/** Normalize a client attachment list to `[{ id, name }]`, capped in length. */
function normalizeAttachmentList(value) {
  if (!Array.isArray(value)) return [];
  const out = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const id = String(item.id || "").trim();
    if (!id) continue;
    const name = String(item.name || "").trim().slice(0, 120) || "attachment.pdf";
    out.push({ id, name });
    if (out.length >= MAX_MAIL_ATTACHMENTS) break;
  }
  return out;
}

/** Read attachment bytes (base64) from KV for sending. Missing blobs are skipped. */
async function resolveAttachments(env, list) {
  const resolved = [];
  for (const item of list) {
    const content = await env.SESSIONS.get(`mail-att:${item.id}`);
    if (content) resolved.push({ name: item.name, content });
  }
  return resolved;
}

/** Store an inline image for rich emails in D1 and return a public URL. */
async function mailImageUpload(request, env) {
  if (!(await hasRole(request, env, MAIL_ROLES))) {
    return json({ error: "Unauthorized" }, 401);
  }
  const body = await readJson(request);
  const image = parseImageDataUrl(body.data);
  if (!image || !IMAGE_TYPES_RE.test(image.contentType)) {
    return json(
      { error: "Only PNG, JPG, GIF or WebP images up to 1.9 MB are supported." },
      413
    );
  }

  const id = randomToken(8);
  await env.DB.prepare(
    "INSERT INTO mail_images (id, content_type, data, created_at) VALUES (?, ?, ?, ?)"
  )
    .bind(id, image.contentType.toLowerCase(), image.data, new Date().toISOString())
    .run();

  return json({ id, url: `/mail/images/${encodeURIComponent(id)}` }, 201);
}

/** Serve an inline email image (public; email clients fetch it directly). */
async function mailGetImage(request, env, ctx, id) {
  const cache = caches.default;
  const key = cacheKeyFor(request, `mail-image:${id}`);
  const cached = await cache.match(key);
  if (cached) return cached;

  const row = await env.DB.prepare(
    "SELECT content_type, data FROM mail_images WHERE id = ?"
  )
    .bind(id)
    .first();
  if (!row) return json({ error: "Image not found" }, 404);

  const binary = Uint8Array.from(atob(row.data), (char) => char.charCodeAt(0));
  const response = new Response(binary, {
    headers: {
      "content-type": row.content_type || "application/octet-stream",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
  if (ctx) ctx.waitUntil(cache.put(key, response.clone()));
  return response;
}

/**
 * Best-effort server-side hardening of pasted email HTML: drop executable or
 * remotely-loading elements/event handlers. The frontend already sanitizes
 * with DOMPurify; this is the second line of defence before anything sends.
 */
function sanitizeEmailHtml(html) {
  if (typeof html !== "string" || html === "") return "";
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|iframe|object|embed|form|meta|base)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|iframe|object|embed|form|meta|base)\b[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*([^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*"?\s*javascript:[^"'>\s]*"?/gi, '$1="#"');
}

async function mailCreateCampaign(request, env) {
  if (!(await hasRole(request, env, MAIL_ROLES))) {
    return json({ error: "Unauthorized" }, 401);
  }

  const body = await readJson(request);
  const subject = String(body.subject || "").trim();
  const text = String(body.body || "").trim();
  const html = typeof body.html === "string" ? sanitizeEmailHtml(body.html) : "";
  const attachments = normalizeAttachmentList(body.attachments);
  const batchSize = Math.min(Math.max(Number(body.batchSize) || 100, 10), 5000);
  const durationSeconds = Math.min(
    Math.max(Number(body.durationSeconds) || 5400, 60),
    6 * 60 * 60
  );

  if (!subject) return json({ error: "Subject is required" }, 400);
  if (!text && !html) return json({ error: "Message body is required" }, 400);

  let recipients;
  try {
    recipients = await fetchCampaignRecipients(env);
  } catch (error) {
    return json({ error: error.message || "Could not read recipients" }, 500);
  }
  if (recipients.length === 0) {
    return json({ error: "No recipients found in the sheet" }, 400);
  }

  const id = randomToken(8);
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO mail_campaigns
       (id, subject, body, html, recipients, attachments, total, duration_seconds, started_at, status,
        sent, failed, cursor, from_name, from_email, reply_to, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'running', 0, 0, 0, ?, ?, ?, ?)`
  )
    .bind(
      id,
      subject,
      text,
      html,
      JSON.stringify(recipients),
      JSON.stringify(attachments),
      recipients.length,
      durationSeconds,
      now,
      env.MAIL_FROM_NAME || "NUESATECHTEAM",
      env.MAIL_FROM_EMAIL || "noreply@nuesaabuad.ng",
      env.MAIL_REPLY_TO || env.MAIL_FROM_EMAIL || "noreply@nuesaabuad.ng",
      now
    )
    .run();

  return json({ id, total: recipients.length, durationSeconds, batchSize, attachments: attachments.length });
}

/** Send a single preview email (does not create a campaign). */
async function mailTestEmail(request, env) {
  if (!(await hasRole(request, env, MAIL_ROLES))) {
    return json({ error: "Unauthorized" }, 401);
  }
  const body = await readJson(request);
  const to = String(body.email || "").trim();
  const subject = String(body.subject || "").trim() || "Office of the General Secretary test email";
  const text = String(body.body || "").trim();
  const html = typeof body.html === "string" ? body.html : "";

  if (!EMAIL_RE.test(to)) {
    return json({ error: "Enter a valid email address to send the test to." }, 400);
  }
  if (!text && !html.trim()) {
    return json({ error: "Add a body before sending the test email." }, 400);
  }

  const attachments = await resolveAttachments(env, normalizeAttachmentList(body.attachments));
  const result = await sendCampaignEmail(env, to, subject, text, attachments, html);
  if (!result.ok) {
    return json({ error: result.error || "Could not send the test email" }, 502);
  }
  return json({ ok: true, status: result.status });
}

async function mailCampaignStatus(env, id) {  const campaign = await env.DB.prepare(
    `SELECT id, subject, total, duration_seconds, started_at, status, sent, failed, cursor, attachments
     FROM mail_campaigns WHERE id = ?`
  )
    .bind(id)
    .first();
  if (!campaign) return json({ error: "Campaign not found" }, 404);

  const { results } = await env.DB.prepare(
    `SELECT email, ok, error, created_at FROM mail_events
     WHERE campaign_id = ? ORDER BY id DESC LIMIT 100`
  )
    .bind(id)
    .all();

  return json({ campaign, events: results || [] });
}

async function mailStopCampaign(env, id) {
  const result = await env.DB.prepare(
    "UPDATE mail_campaigns SET status = 'stopped' WHERE id = ? AND status = 'running'"
  )
    .bind(id)
    .run();
  return json({ ok: true, changed: (result.meta && result.meta.changes) || 0 });
}

/** Send one transactional email through Brevo (plain text and/or rich HTML). */
async function sendCampaignEmail(env, to, subject, text, attachments = [], html = "") {
  if (!env.BREVO_API_KEY) {
    return { ok: false, error: "BREVO_API_KEY is not configured" };
  }
  const fromEmail = env.MAIL_FROM_EMAIL || "noreply@nuesaabuad.ng";
  const senderName = env.MAIL_FROM_NAME || "Office of the General Secretary - NUESA";
  try {
    const payload = {
      sender: { name: senderName, email: fromEmail },
      to: [{ email: to }],
      replyTo: { email: env.MAIL_REPLY_TO || fromEmail },
      subject,
      textContent: text || "",
    };
    const safeHtml = sanitizeEmailHtml(html);
    if (safeHtml) payload.htmlContent = safeHtml;
    if (!payload.textContent && safeHtml) payload.textContent = "Please view this email in an HTML-capable client.";
    if (attachments.length > 0) {
      payload.attachment = attachments.map((file) => ({
        name: file.name,
        content: file.content,
      }));
    }
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": env.BREVO_API_KEY,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) return { ok: true, status: response.status };
    const detail = await response.text().catch(() => "");
    return { ok: false, status: response.status, error: detail.slice(0, 300) };
  } catch (error) {
    return { ok: false, error: error.message || "Request failed" };
  }
}

/** Cron entry point: advance every running campaign by one tick. */
async function processMailCampaigns(env) {
  let rows = [];
  try {
    const result = await env.DB.prepare(
      "SELECT * FROM mail_campaigns WHERE status = 'running'"
    ).all();
    rows = result.results || [];
  } catch {
    return;
  }
  for (const campaign of rows) {
    try {
      await processMailCampaign(env, campaign, Date.now());
    } catch {
      // Leave the campaign running; the next tick will retry.
    }
  }
}

async function processMailCampaign(env, campaign, now) {
  const total = Number(campaign.total) || 0;
  const done = (Number(campaign.sent) || 0) + (Number(campaign.failed) || 0);

  if (done >= total) {
    await env.DB.prepare("UPDATE mail_campaigns SET status = 'done' WHERE id = ?")
      .bind(campaign.id)
      .run();
    return;
  }

  // Time-based pacing: by now we should have sent `desired` emails.
  const durationMs = (Number(campaign.duration_seconds) || 0) * 1000;
  const elapsed = Math.max(now - (Number(campaign.started_at) || now), 0);
  const fraction = durationMs > 0 ? Math.min(elapsed / durationMs, 1) : 1;
  const desired = fraction >= 1 ? total : Math.floor(total * fraction);

  let deficit = desired - done;
  if (deficit <= 0) return;
  if (deficit > MAIL_MAX_PER_TICK) deficit = MAIL_MAX_PER_TICK;

  let recipients;
  try {
    recipients = JSON.parse(campaign.recipients);
  } catch {
    recipients = [];
  }
  const cursor = Number(campaign.cursor) || 0;
  const batch = recipients.slice(cursor, cursor + deficit);

  if (batch.length === 0) {
    await env.DB.prepare("UPDATE mail_campaigns SET status = 'done' WHERE id = ?")
      .bind(campaign.id)
      .run();
    return;
  }

  let attachmentList = [];
  try {
    attachmentList = normalizeAttachmentList(JSON.parse(campaign.attachments || "[]"));
  } catch {
    attachmentList = [];
  }
  const attachments = await resolveAttachments(env, attachmentList);

  const results = await Promise.all(
    batch.map((email) =>
      sendCampaignEmail(env, email, campaign.subject, campaign.body, attachments, campaign.html || "")
    )
  );

  let sent = 0;
  let failed = 0;
  const ts = Date.now();
  const statements = [];
  results.forEach((result, index) => {
    const email = batch[index];
    if (result.ok) sent += 1;
    else failed += 1;
    statements.push(
      env.DB.prepare(
        `INSERT INTO mail_events (campaign_id, email, ok, error, created_at)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(campaign.id, email, result.ok ? 1 : 0, result.ok ? null : result.error || "failed", ts)
    );
  });

  const newCursor = cursor + batch.length;
  statements.push(
    env.DB.prepare(
      `UPDATE mail_campaigns
       SET sent = sent + ?, failed = failed + ?, cursor = ?, status = ?
       WHERE id = ?`
    ).bind(sent, failed, newCursor, newCursor >= total ? "done" : "running", campaign.id)
  );

  await env.DB.batch(statements);
}
