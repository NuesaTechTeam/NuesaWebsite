/**
 * NUESA ABUAD Elections API — Cloudflare Worker
 *
 * Endpoints:
 *   POST /admin/login        { username, password } -> { token }
 *   POST /voter/verify       { matricNumber, invoiceNumber } -> { voterToken, maskedEmail, maskedPhone }
 *   POST /voter/otp/send     { voterToken } -> { sent, channels }
 *   POST /voter/otp/verify   { voterToken, code } -> { ballotToken }
 *   POST /vote               { ballotToken, votes:[{ positionId, candidateId }] } -> { recorded }
 *   GET  /results            -> { positions:[{ positionId, total, candidates:[{ candidateId, votes }] }] }   (admin)
 *   GET  /stats              -> { registeredVoters }                                                          (admin)
 *   GET  /candidates         -> candidates with photos/manifestos (from CANDIDATES_JSON var)
 *
 *   POST /blog/submissions             { title, author, email, category, content } -> { id }
 *   GET  /blog/submissions?status=     (admin) list blog submissions
 *   POST /blog/submissions/:id/status  (admin) { status: approved|rejected }
 *   GET  /blog/posts                   approved blog posts for the public site
 *
 * /results and /stats require an admin Bearer token and are edge-cached for a
 * short TTL so repeated dashboard polling does not hit D1.
 *
 * Bindings (wrangler.toml / secrets):
 *   SESSIONS (KV)   - admin sessions + voter/otp/ballot tokens
 *   DB (D1)         - votes table (see README for schema)
 *   ADMIN_USERNAME, ADMIN_PASSWORD
 *   VOTER_SHEET_CSV_URL   - published Google Sheet CSV
 *   RESEND_API_KEY, OTP_EMAIL_FROM
 *   TERMII_API_KEY, TERMII_SENDER_ID
 *   ALLOWED_ORIGIN        - e.g. "https://nuesaabuad.ng"
 */

const ADMIN_SESSION_TTL = 60 * 60 * 8;
const OTP_TTL = 60 * 10;
const BALLOT_TTL = 60 * 30;
const MAX_OTP_ATTEMPTS = 5;

const ADMIN_ONLY_ROUTES = new Set(["GET /results", "GET /stats"]);

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    const route = `${request.method} ${url.pathname}`;

    try {
      if (ADMIN_ONLY_ROUTES.has(route) && !(await isAdmin(request, env))) {
        return json({ error: "Unauthorized" }, 401, cors);
      }

      let response;
      let handled = false;

      /* ------------------------------------------------------------ blog */
      if (url.pathname === "/blog/posts" && request.method === "GET") {
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
      } else {
        const statusMatch = url.pathname.match(/^\/blog\/submissions\/([^/]+)\/status$/);
        if (statusMatch && request.method === "POST") {
          if (!(await isAdmin(request, env))) {
            return json({ error: "Unauthorized" }, 401, cors);
          }
          response = await blogUpdateStatus(request, env, ctx, statusMatch[1]);
          handled = true;
        }
      }

      if (handled) {
        // fall through to CORS + return below
      } else switch (route) {
        case "POST /admin/login":
          response = await adminLogin(request, env);
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
        case "POST /vote":
          response = await castVote(request, env, ctx);
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
  if (!env.RESEND_API_KEY || !to) return { channel: "email", sent: false };
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
      subject: "Your NUESA Elections verification code",
      text: `Your one-time verification code is ${code}. It expires in 10 minutes. If you did not request this, ignore this message.`,
    }),
  });
  return { channel: "email", sent: response.ok };
}

async function sendSms(env, to, code) {
  if (!env.TERMII_API_KEY || !to) return { channel: "sms", sent: false };
  const response = await fetch("https://api.ng.termii.com/api/sms/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      api_key: env.TERMII_API_KEY,
      to,
      from: env.TERMII_SENDER_ID || "NUESA",
      sms: `Your NUESA Elections verification code is ${code}. It expires in 10 minutes.`,
      type: "plain",
      channel: env.TERMII_CHANNEL || "dnd",
    }),
  });
  return { channel: "sms", sent: response.ok };
}

/* --------------------------------------------------------------- handlers */

/** True when the request carries a valid admin Bearer token. */
async function isAdmin(request, env) {
  const header = request.headers.get("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return false;
  return Boolean(await env.SESSIONS.get(`admin:${token}`));
}

/**
 * Small edge cache for read-heavy admin endpoints. The Cache API does not
 * consume KV reads/writes and does not touch D1 on a hit.
 */
function cacheKeyFor(request, name) {
  return new Request(new URL(`/__cache__/${name}`, request.url), { method: "GET" });
}

async function adminLogin(request, env) {
  const { username, password } = await readJson(request);

  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
    return json({ error: "Admin credentials are not configured" }, 500);
  }

  if (String(username).trim() !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
    return json({ error: "Invalid username or password" }, 401);
  }

  const token = randomToken();
  await env.SESSIONS.put(`admin:${token}`, "1", { expirationTtl: ADMIN_SESSION_TTL });
  return json({ token, expiresIn: ADMIN_SESSION_TTL });
}

async function voterVerify(request, env) {
  const { matricNumber, invoiceNumber } = await readJson(request);
  if (!matricNumber || !invoiceNumber) {
    return json({ error: "Matric number and invoice number are required" }, 400);
  }

  const voter = await findVoter(env, matricNumber, invoiceNumber);
  if (!voter) {
    return json({ error: "We could not find a verified dues payment for those details" }, 401);
  }

  const voterToken = randomToken();
  await env.SESSIONS.put(`voter:${voterToken}`, JSON.stringify(voter), {
    expirationTtl: OTP_TTL,
  });

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
  const stored = await env.SESSIONS.get(`voter:${voterToken}`);
  if (!stored) return json({ error: "Verification session expired. Please sign in again." }, 401);

  const voter = JSON.parse(stored);
  const code = randomOtp();

  await env.SESSIONS.put(
    `otp:${voterToken}`,
    JSON.stringify({ code, attempts: 0 }),
    { expirationTtl: OTP_TTL }
  );

  const [emailResult, smsResult] = await Promise.all([
    sendEmail(env, voter.email, code),
    sendSms(env, voter.phone, code),
  ]);

  const channels = [emailResult, smsResult].filter((result) => result.sent);
  if (channels.length === 0) {
    return json({ error: "Could not send the verification code. Please try again." }, 502);
  }

  return json({
    sent: true,
    channels: channels.map((result) => result.channel),
    maskedEmail: maskEmail(voter.email),
    maskedPhone: maskPhone(voter.phone),
  });
}

async function otpVerify(request, env) {
  const { voterToken, code } = await readJson(request);
  const stored = await env.SESSIONS.get(`otp:${voterToken}`);
  if (!stored) return json({ error: "Code expired. Please request a new one." }, 401);

  const record = JSON.parse(stored);
  if (record.attempts >= MAX_OTP_ATTEMPTS) {
    await env.SESSIONS.delete(`otp:${voterToken}`);
    return json({ error: "Too many attempts. Please request a new code." }, 429);
  }

  if (String(code).trim() !== record.code) {
    record.attempts += 1;
    await env.SESSIONS.put(`otp:${voterToken}`, JSON.stringify(record), {
      expirationTtl: OTP_TTL,
    });
    return json({ error: "Incorrect code" }, 401);
  }

  const voter = JSON.parse((await env.SESSIONS.get(`voter:${voterToken}`)) || "{}");
  const ballotToken = randomToken();
  await env.SESSIONS.put(`ballot:${ballotToken}`, JSON.stringify({ voterKey: voter.key }), {
    expirationTtl: BALLOT_TTL,
  });
  await env.SESSIONS.delete(`otp:${voterToken}`);

  return json({ ballotToken });
}

async function castVote(request, env, ctx) {
  const { ballotToken, votes } = await readJson(request);
  const stored = await env.SESSIONS.get(`ballot:${ballotToken}`);
  if (!stored) return json({ error: "Your ballot session expired. Please sign in again." }, 401);
  if (!Array.isArray(votes) || votes.length === 0) {
    return json({ error: "No votes submitted" }, 400);
  }

  const { voterKey } = JSON.parse(stored);
  const createdAt = new Date().toISOString();
  const statements = votes.flatMap((vote) => [
    env.DB.prepare(
      "INSERT INTO votes (voter_key, position_id, candidate_id, created_at) VALUES (?, ?, ?, ?)"
    ).bind(voterKey, vote.positionId, vote.candidateId, createdAt),
    env.DB.prepare(
      `INSERT INTO tallies (position_id, candidate_id, votes) VALUES (?, ?, 1)
       ON CONFLICT (position_id, candidate_id) DO UPDATE SET votes = votes + 1`
    ).bind(vote.positionId, vote.candidateId),
  ]);

  try {
    await env.DB.batch(statements);
  } catch {
    return json({ error: "A vote has already been recorded for this voter" }, 409);
  }

  await env.SESSIONS.delete(`ballot:${ballotToken}`);
  // Drop the cached results so the next dashboard poll reflects this vote.
  if (ctx) ctx.waitUntil(caches.default.delete(cacheKeyFor(request, "results")));
  return json({ recorded: true });
}

async function getStats(request, env, ctx) {
  const cache = caches.default;
  const key = cacheKeyFor(request, "stats");
  const cached = await cache.match(key);
  if (cached) return cached;

  const registeredVoters = await countVoters(env);
  const response = json({ registeredVoters });
  response.headers.set("Cache-Control", "public, max-age=300");
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

function cleanField(value, max) {
  return String(value || "").trim().slice(0, max);
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

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO blog_submissions (id, title, author, email, category, content, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`
  )
    .bind(id, title, author, email, category, content, new Date().toISOString())
    .run();

  return json({ id, status: "pending" }, 201);
}

async function blogListSubmissions(request, env) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");

  let query =
    "SELECT id, title, author, email, category, content, status, created_at, reviewed_at FROM blog_submissions";
  const binds = [];
  if (status && BLOG_STATUSES.has(status)) {
    query += " WHERE status = ?";
    binds.push(status);
  }
  query += " ORDER BY created_at DESC LIMIT 200";

  const { results } = await env.DB.prepare(query).bind(...binds).all();
  return json({ submissions: results || [] });
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
    `SELECT id, title, author, category, content, created_at, reviewed_at
     FROM blog_submissions
     WHERE status = 'approved'
     ORDER BY reviewed_at DESC, created_at DESC
     LIMIT 100`
  ).all();

  const response = json({ posts: results || [] });
  response.headers.set("Cache-Control", "public, max-age=60");
  if (ctx) ctx.waitUntil(cache.put(key, response.clone()));
  return response;
}
