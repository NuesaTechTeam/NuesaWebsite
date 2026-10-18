import React from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import {
  Mail,
  Send,
  Square,
  RotateCcw,
  RefreshCw,
  LogOut,
  Users,
  Layers,
  Clock,
  Timer,
  Gauge,
  CheckCircle2,
  XCircle,
  Loader2,
  ShieldCheck,
  User,
  Lock,
  FileSpreadsheet,
  ServerCog,
  Paperclip,
  FileText,
  X,
} from "lucide-react";
import useSEO from "../hooks/useSEO";
import { getAdminToken } from "../lib/electionsApi";
import EmailEditor from "../components/Mailer/EmailEditor";
import {
  mailerLogin,
  mailerLogout,
  mailerCheckSession,
  getMailRecipients,
  createCampaign,
  getCampaign,
  stopCampaign,
  sendTestEmail,
  uploadAttachment,
  uploadMailImage,
  absoluteUrl,
} from "../lib/mailApi";
import letterheadHeader from "../assets/letterhead/header.jpg";
import letterheadBody from "../assets/letterhead/body.jpg";
import letterheadFooter from "../assets/letterhead/footer.jpg";

const AUTH_KEY = "nuesa-mailer-auth";
const POLL_MS = 5000;
const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENT_MB = 5;
const TEST_RECIPIENT = "tunmiseadepitan@gmail.com";
const SENDER_LABEL = "Office of the General Secretary - NUESA";
const LETTERHEAD_KEY = "nuesa-mailer-letterhead-v1";
const LETTERHEAD_ASSETS = {
  header: letterheadHeader,
  body: letterheadBody,
  footer: letterheadFooter,
};

/** Test emails can only ever go to your own inbox. */
const sendTestRecipient = () => TEST_RECIPIENT;

/** Plain-text version of the editor content (used as the text part of the email). */
const stripEditorTextToPlain = (html) => {
  const div = document.createElement("div");
  div.innerHTML = DOMPurify.sanitize(String(html || ""));
  return (div.innerText || div.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
};

/**
 * Upload the bundled letterhead pieces once and remember their public URLs,
 * so every email can load them like any other inline image.
 */
const ensureLetterheadUrls = async () => {
  try {
    const cached = JSON.parse(localStorage.getItem(LETTERHEAD_KEY) || "null");
    if (cached && cached.header && cached.body && cached.footer) return cached;
  } catch {
    // ignore storage access errors
  }
  const urls = {};
  for (const [part, src] of Object.entries(LETTERHEAD_ASSETS)) {
    const blob = await fetch(src).then((r) => r.blob());
    const data = await readFileAsDataUrl(new File([blob], `letterhead-${part}.jpg`, { type: "image/jpeg" }));
    const uploaded = await uploadMailImage({ name: `letterhead-${part}.jpg`, data });
    urls[part] = absoluteUrl(uploaded.url);
  }
  try {
    localStorage.setItem(LETTERHEAD_KEY, JSON.stringify(urls));
  } catch {
    // ignore storage access errors
  }
  return urls;
};

/** Wrap editor HTML in an inline-styled, email-client-friendly container. */
const compileEmailHtml = (html, letterhead = null) => {
  const clean = DOMPurify.sanitize(String(html || ""), {
    FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "meta", "base", "link"],
    ADD_ATTR: ["target", "contenteditable"],
  });
  if (!clean.trim()) return "";
  if (letterhead) {
    // Header and footer are real <img> tags (they show everywhere); the
    // watermark is a cell background, which Outlook desktop simply skips.
    const img = (src) =>
      `<img src="${src}" width="600" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;">`;
    return (
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0;padding:0;background-color:#f3f4f6;border:none;"><tr>` +
      `<td align="center" style="padding:16px 0;">` +
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background-color:#ffffff;border:none;">` +
      `<tr><td style="padding:0;line-height:0;font-size:0;">${img(letterhead.header)}</td></tr>` +
      `<tr><td background="${letterhead.body}" bgcolor="#ffffff" height="420" valign="top" style="background-color:#ffffff;background-image:url('${letterhead.body}');background-repeat:no-repeat;background-position:center center;background-size:cover;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1f2937;line-height:1.6;padding:24px 36px 32px;">${clean}</td></tr>` +
      `<tr><td style="padding:0;line-height:0;font-size:0;">${img(letterhead.footer)}</td></tr>` +
      `</table></td></tr></table>`
    );
  }
  return (
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0;padding:0;background-color:#ffffff;border:none;"><tr>` +
    `<td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1f2937;line-height:1.6;margin:0;padding:0 16px;">` +
    `<div style="max-width:600px;margin:0 auto;padding:24px 0;">${clean}</div>` +
    `</td></tr></table>`
  );
};

const pad = (n) => String(n).padStart(2, "0");

const formatDuration = (ms) => {
  if (!isFinite(ms) || ms <= 0) return "0s";
  const totalSec = Math.round(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (!h) parts.push(`${s}s`);
  return parts.join(" ");
};

const formatClock = (value) => {
  const date = value ? new Date(value) : new Date();
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const formatBytes = (bytes) => {
  if (!bytes || bytes <= 0) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error(`Could not read "${file.name}".`));
    reader.readAsDataURL(file);
  });

const getStoredAuth = () => {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
};

const setStoredAuth = (value) => {
  try {
    if (value) sessionStorage.setItem(AUTH_KEY, "1");
    else sessionStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore storage access errors
  }
};

const LoginGate = ({ onSuccess }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await mailerLogin(username.trim(), password);
      setStoredAuth(true);
      onSuccess();
    } catch (err) {
      setError(err.message || "Invalid username or password.");
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green dark:bg-green-900/30 dark:text-green-400">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mass Mailer
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Restricted access. For the NUESA communications team.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Username
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                required
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-400"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-green px-6 py-3 font-semibold text-white transition-colors hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </motion.form>
    </main>
  );
};

const StatCard = ({ icon, label, value, tone = "gray" }) => {
  const tones = {
    gray: "bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200",
    green: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${tones[tone]}`}
        >
          {icon}
        </span>
        {label}
      </div>
      <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};

const MassMailer = () => {
  useSEO({
    title: "Mass Mailer",
    description: "Send a NUESA email campaign to all registered members.",
  });

  const [authed, setAuthed] = React.useState(() => getStoredAuth());

  const [subject, setSubject] = React.useState("");
  const [mode, setMode] = React.useState("rich");
  const [body, setBody] = React.useState("");
  const [html, setHtml] = React.useState("");
  const [useLetterhead, setUseLetterhead] = React.useState(false);
  const [batchSize, setBatchSize] = React.useState(100);
  const [hours, setHours] = React.useState(1.5);
  const [formError, setFormError] = React.useState("");
  const [runError, setRunError] = React.useState("");

  const [recipients, setRecipients] = React.useState({ total: 0, sample: [] });
  const [recipLoading, setRecipLoading] = React.useState(false);
  const [recipError, setRecipError] = React.useState("");

  const [campaign, setCampaign] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [starting, setStarting] = React.useState(false);
  const [stopping, setStopping] = React.useState(false);

  const [testState, setTestState] = React.useState("idle");
  const [testMessage, setTestMessage] = React.useState("");

  const [attachments, setAttachments] = React.useState([]);
  const [attachError, setAttachError] = React.useState("");
  const [attachBusy, setAttachBusy] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const [nowTick, setNowTick] = React.useState(0);
  const terminalRef = React.useRef(false);
  const [pendingId, setPendingId] = React.useState("");

  // Restore an existing server session on load.
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getAdminToken()) return;
      try {
        await mailerCheckSession();
        if (!cancelled) setAuthed(true);
      } catch {
        mailerLogout();
        setStoredAuth(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadRecipients = React.useCallback(async () => {
    setRecipLoading(true);
    setRecipError("");
    try {
      const data = await getMailRecipients();
      setRecipients({ total: data.total || 0, sample: data.sample || [] });
    } catch (err) {
      setRecipError(err.message || "Could not load recipients.");
    } finally {
      setRecipLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!authed) return;
    loadRecipients();
  }, [authed, loadRecipients]);

  // Poll the running campaign.
  const campaignId = campaign && campaign.id ? campaign.id : pendingId;
  React.useEffect(() => {
    if (!authed || !campaignId) return undefined;
    let cancelled = false;

    const poll = async () => {
      if (terminalRef.current) return;
      try {
        const data = await getCampaign(campaignId);
        if (cancelled) return;
        setCampaign(data.campaign);
        setEvents(data.events || []);
        terminalRef.current =
          data.campaign.status === "done" || data.campaign.status === "stopped";
      } catch (err) {
        if (!cancelled) setRunError(err.message || "Could not load campaign.");
      }
    };

    poll();
    const id = window.setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [authed, campaignId]);

  const isRunning = campaign?.status === "running";
  const terminal =
    campaign?.status === "done" || campaign?.status === "stopped";
  const isLocked = isRunning || starting;

  // Keep ETA/elapsed fresh while a run is active.
  React.useEffect(() => {
    if (!isRunning) return undefined;
    const id = window.setInterval(() => setNowTick((x) => x + 1), 1000);
    return () => window.clearInterval(id);
  }, [isRunning]);

  const total = campaign?.total ?? recipients.total ?? 0;
  const sent = campaign?.sent ?? 0;
  const failed = campaign?.failed ?? 0;
  const processed = sent + failed;
  const remaining = Math.max(total - processed, 0);
  const progress = total > 0 ? Math.round((processed / total) * 100) : 0;
  const batches = total > 0 && batchSize > 0 ? Math.ceil(total / batchSize) : 0;

  const durationSeconds = campaign?.duration_seconds ?? Math.round(hours * 3600);
  const durationMs = durationSeconds * 1000;
  const ratePerMin = durationMs > 0 ? total / (durationMs / 60000) : 0;
  const etaMs = ratePerMin > 0 ? (remaining / ratePerMin) * 60000 : 0;

  const startedAt = campaign?.started_at || 0;
  void nowTick;
  const elapsedMs = startedAt ? Math.max(Date.now() - startedAt, 0) : 0;

  const currentBatch =
    total > 0 && batchSize > 0
      ? Math.min(Math.floor(processed / batchSize) + 1, batches)
      : 0;

  const handleStart = async () => {
    setFormError("");
    setRunError("");
    const cleanSubject = subject.trim();
    const useRich = mode === "rich";
    let letterhead = null;
    if (useRich && useLetterhead && html.trim()) {
      try {
        letterhead = await ensureLetterheadUrls();
      } catch (err) {
        setFormError(err.message || "Could not prepare the letterhead.");
        return;
      }
    }
    const campaignHtml = useRich ? compileEmailHtml(html, letterhead) : "";
    const campaignBody = useRich ? (campaignHtml ? stripEditorTextToPlain(html) : "") : body.trim();
    if (!cleanSubject) {
      setFormError("Add a subject before sending.");
      return;
    }
    if (!campaignHtml && !campaignBody) {
      setFormError("Add a message body before sending.");
      return;
    }
    if (!recipients.total) {
      setFormError("No recipients were found in the sheet.");
      return;
    }

    setStarting(true);
    terminalRef.current = false;
    try {
      const data = await createCampaign({
        subject: cleanSubject,
        body: campaignBody || "Please view this email in an HTML-capable client.",
        html: campaignHtml,
        batchSize,
        durationSeconds: Math.round(hours * 3600),
        attachments: attachments.map((a) => ({ id: a.id, name: a.name })),
      });
      setEvents([]);
      setPendingId(data.id);
      setCampaign({
        id: data.id,
        subject: cleanSubject,
        total: data.total,
        duration_seconds: data.durationSeconds,
        started_at: Date.now(),
        status: "running",
        sent: 0,
        failed: 0,
        cursor: 0,
      });
    } catch (err) {
      setFormError(err.message || "Could not start the campaign.");
    } finally {
      setStarting(false);
    }
  };

  const handleStop = async () => {
    if (!campaignId) return;
    setStopping(true);
    setRunError("");
    try {
      await stopCampaign(campaignId);
      const data = await getCampaign(campaignId);
      setCampaign(data.campaign);
      setEvents(data.events || []);
      terminalRef.current = true;
    } catch (err) {
      setRunError(err.message || "Could not stop the campaign.");
    } finally {
      setStopping(false);
    }
  };

  const handleSendTest = async () => {
    const to = sendTestRecipient();
    setTestMessage("");
    const useRich = mode === "rich";
    const testBody = useRich ? stripEditorTextToPlain(html) : body.trim();
    if (!testBody && !(useRich && html.trim())) {
      setTestState("error");
      setTestMessage("Add a body before sending the test.");
      return;
    }
    setTestState("sending");
    try {
      const letterhead = useRich && useLetterhead ? await ensureLetterheadUrls() : null;
      const testHtml = useRich ? compileEmailHtml(html, letterhead) : "";
      await sendTestEmail({
        email: to,
        subject,
        body: testBody || "Please view this email in an HTML-capable client.",
        html: testHtml,
        attachments: attachments.map((a) => ({ id: a.id, name: a.name })),
      });
      setTestState("ok");
      setTestMessage(`Test sent to ${to}. Check the inbox (and spam).`);
    } catch (err) {
      setTestState("error");
      setTestMessage(err.message || "Could not send the test email.");
    }
  };

  const handleFilesSelected = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (files.length === 0) return;
    setAttachError("");
    setAttachBusy(true);
    try {
      const next = [...attachments];
      for (const file of files) {
        if (next.length >= MAX_ATTACHMENTS) {
          throw new Error(`You can attach up to ${MAX_ATTACHMENTS} PDFs.`);
        }
        const isPdf =
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf");
        if (!isPdf) {
          throw new Error("Only PDF files can be attached.");
        }
        if (file.size > MAX_ATTACHMENT_MB * 1024 * 1024) {
          throw new Error(`"${file.name}" is larger than ${MAX_ATTACHMENT_MB} MB.`);
        }
        const dataUrl = await readFileAsDataUrl(file);
        const data = dataUrl.split(",")[1] || "";
        const uploaded = await uploadAttachment({ name: file.name, data });
        next.push({ id: uploaded.id, name: uploaded.name, size: uploaded.size });
      }
      setAttachments(next);
    } catch (err) {
      setAttachError(err.message || "Could not attach the file.");
    } finally {
      setAttachBusy(false);
    }
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReset = () => {
    setCampaign(null);
    setPendingId("");
    setEvents([]);
    terminalRef.current = false;
    setRunError("");
    setFormError("");
    setSubject("");
    setBody("");
    setHtml("");
    setAttachments([]);
    setAttachError("");
  };

  const handleLogout = () => {
    mailerLogout();
    setStoredAuth(false);
    setAuthed(false);
    handleReset();
  };

  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;

  const statusLabel = {
    running: "Sending",
    done: "Completed",
    stopped: "Stopped",
  }[campaign?.status] || "Idle";

  const statusTone = isRunning
    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
    : campaign?.status === "stopped"
      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      : campaign?.status === "done"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";

  const batchList = Array.from({ length: batches }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700 dark:bg-green-900/40 dark:text-green-400">
              <Mail className="h-3.5 w-3.5" /> Communications
            </span>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              Mass Mailer
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send a real email campaign to every member on the sheet, paced
              smoothly across your chosen window.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusTone}`}
            >
              {statusLabel}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300">
          <ServerCog className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Emails are sent for real by the server, a few at a time, over the
            delivery window. You can safely close this page — the campaign keeps
            running on its own.
          </p>
        </div>

        {runError && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-400">
            {runError}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            icon={<Users className="h-4 w-4" />}
            label="Recipients"
            value={total.toLocaleString()}
            tone="green"
          />
          <StatCard
            icon={<Layers className="h-4 w-4" />}
            label="Batches"
            value={batches.toLocaleString()}
            tone="gray"
          />
          <StatCard
            icon={<Clock className="h-4 w-4" />}
            label="Window"
            value={`${(durationSeconds / 3600).toFixed(2).replace(/\.?0+$/, "")}h`}
            tone="gray"
          />
          <StatCard
            icon={<CheckCircle2 className="h-4 w-4" />}
            label="Sent"
            value={sent.toLocaleString()}
            tone="green"
          />
          <StatCard
            icon={<XCircle className="h-4 w-4" />}
            label="Failed"
            value={failed.toLocaleString()}
            tone="red"
          />
          <StatCard
            icon={<Timer className="h-4 w-4" />}
            label="Remaining"
            value={remaining.toLocaleString()}
            tone="amber"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    Recipients
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Pulled automatically from the Google Sheet when the campaign
                    starts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadRecipients}
                  disabled={isLocked || recipLoading}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${recipLoading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
              </div>

              {recipError ? (
                <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-400">
                  {recipError}
                </p>
              ) : (
                <div className="mt-4 space-y-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Ready to send:{" "}
                    <strong className="text-green-700 dark:text-green-400">
                      {recipients.total.toLocaleString()}
                    </strong>{" "}
                    email{recipients.total === 1 ? "" : "s"}
                  </span>
                  {recipients.sample.length > 0 && (
                    <p className="truncate text-xs text-gray-400">
                      e.g. {recipients.sample.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Message
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isLocked}
                    placeholder={`${SENDER_LABEL} — Important update`}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Body
                    </label>
                    <div className="flex items-center overflow-hidden rounded-lg border border-gray-300 text-xs font-semibold dark:border-gray-700">
                      <button
                        type="button"
                        onClick={() => setMode("rich")}
                        disabled={isLocked}
                        aria-pressed={mode === "rich"}
                        className={`px-3 py-1.5 transition-colors disabled:opacity-60 ${
                          mode === "rich"
                            ? "bg-green text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        Rich (HTML)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode("plain")}
                        disabled={isLocked}
                        aria-pressed={mode === "plain"}
                        className={`px-3 py-1.5 transition-colors disabled:opacity-60 ${
                          mode === "plain"
                            ? "bg-green text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        Plain text
                      </button>
                    </div>
                  </div>
                  {mode === "rich" ? (
                    <>
                      <label className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                        <input
                          type="checkbox"
                          checked={useLetterhead}
                          onChange={(e) => setUseLetterhead(e.target.checked)}
                          disabled={isLocked}
                          className="h-4 w-4 accent-green"
                        />
                        Use NUESA letterhead background
                      </label>
                      <EmailEditor
                        initialHtml={html}
                        onChange={({ html: nextHtml }) =>
                          setHtml(nextHtml === "<br>" ? "" : nextHtml)
                        }
                        disabled={isLocked}
                        onError={(message) => setFormError(message)}
                        contentTop={
                          useLetterhead ? (
                            <img
                              src={letterheadHeader}
                              alt="Letterhead header"
                              className="block w-full border-x border-gray-300 dark:border-gray-700"
                            />
                          ) : null
                        }
                        contentBottom={
                          useLetterhead ? (
                            <img
                              src={letterheadFooter}
                              alt="Letterhead footer"
                              className="block w-full rounded-b-lg border border-t-0 border-gray-300 dark:border-gray-700"
                            />
                          ) : null
                        }
                        contentStyle={
                          useLetterhead
                            ? {
                                backgroundColor: "#ffffff",
                                backgroundImage: `url(${letterheadBody})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                color: "#1f2937",
                                minHeight: 420,
                                padding: "24px 36px 32px",
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                              }
                            : undefined
                        }
                      />
                    </>
                  ) : (
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      disabled={isLocked}
                      rows={10}
                      placeholder={"Hello,\n\nThis is a message from the Office of the General Secretary - NUESA.\n\nRegards,\nNUESA"}
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {mode === "rich" && useLetterhead
                      ? "The letterhead header and footer sit above and below your message, with the faded crest behind the text. Outlook desktop shows the header and footer but skips the crest. "
                      : ""}
                    {mode === "rich"
                      ? "Formatting and images are written as inline styles so Gmail and Outlook render them correctly. Images upload and load inside the email — click one to resize or drag it to move."
                      : "Rich (HTML) emails are the default; this mode sends a plain, formatted-free text email."}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                    <Paperclip className="h-4 w-4 text-green-600" />
                    Attachments (PDF)
                  </label>
                  <span className="text-xs text-gray-400">
                    {attachments.length}/{MAX_ATTACHMENTS}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Attach up to {MAX_ATTACHMENTS} PDFs (max {MAX_ATTACHMENT_MB} MB
                  each). They are included in every email.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  multiple
                  onChange={handleFilesSelected}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={
                    isLocked ||
                    attachBusy ||
                    attachments.length >= MAX_ATTACHMENTS
                  }
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {attachBusy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Paperclip className="h-4 w-4" />
                  )}
                  Add PDF
                </button>
                {attachError && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                    {attachError}
                  </p>
                )}
                {attachments.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {attachments.map((file) => (
                      <li
                        key={file.id}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800"
                      >
                        <FileText className="h-4 w-4 shrink-0 text-red-500" />
                        <span className="truncate text-sm text-gray-700 dark:text-gray-200">
                          {file.name}
                        </span>
                        <span className="ml-auto shrink-0 text-xs text-gray-400">
                          {formatBytes(file.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(file.id)}
                          disabled={isLocked}
                          aria-label={`Remove ${file.name}`}
                          className="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 disabled:opacity-50 dark:hover:bg-gray-800"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-5 rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Send a preview to yourself
                </label>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Uses the subject, editor content and attachments above. Tests
                  are locked to your own inbox; no campaign is created.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    value={TEST_RECIPIENT}
                    readOnly
                    aria-readonly="true"
                    className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={handleSendTest}
                    disabled={isLocked || testState === "sending"}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {testState === "sending" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Send test to myself
                  </button>
                </div>
                {testMessage && (
                  <p
                    className={`mt-2 text-xs ${
                      testState === "ok"
                        ? "text-green-700 dark:text-green-400"
                        : testState === "error"
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {testMessage}
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Schedule
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Batch size (emails per group)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={5000}
                    step={10}
                    value={batchSize}
                    onChange={(e) =>
                      setBatchSize(Math.max(10, Number(e.target.value) || 10))
                    }
                    disabled={isLocked}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </div>
                <div className="flex flex-col justify-center rounded-lg bg-gray-50 px-3 py-2 text-sm dark:bg-gray-950">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Send rate
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {ratePerMin.toFixed(1)} emails / min
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Delivery window
                  </label>
                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                    {hours} hour{hours === 1 ? "" : "s"}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={2}
                  step={0.25}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  disabled={isLocked}
                  className="mt-3 w-full accent-green"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1h</span>
                  <span>1.25h</span>
                  <span>1.5h</span>
                  <span>1.75h</span>
                  <span>2h</span>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Run controls
              </h2>

              {formError && (
                <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-400">
                  {formError}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleStart}
                  disabled={isRunning || starting || recipients.total === 0}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {starting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {terminal ? "Start new campaign" : "Start sending"}
                </button>
                <button
                  type="button"
                  onClick={handleStop}
                  disabled={!isRunning || stopping}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {stopping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  Stop
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isRunning}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Progress
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {progress}%
                  </span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-green-light to-green"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-950">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Elapsed
                    </p>
                    <p className="mt-1 font-bold text-gray-900 dark:text-white">
                      {formatDuration(elapsedMs)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-950">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ETA
                    </p>
                    <p className="mt-1 font-bold text-gray-900 dark:text-white">
                      {formatDuration(etaMs)}
                    </p>
                  </div>
                </div>
              </div>

              {isRunning && (
                <p className="mt-3 flex items-center gap-2 text-xs text-green-700 dark:text-green-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Batch {currentBatch} of {batches} in progress
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Batches
                </h2>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {batches} total
                </span>
              </div>
              {batches === 0 ? (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  No batches yet.
                </p>
              ) : (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {batchList.slice(0, 120).map((n) => {
                    const state =
                      n < currentBatch
                        ? "done"
                        : n === currentBatch && isRunning
                          ? "active"
                          : "pending";
                    const tone =
                      state === "done"
                        ? "bg-green text-white"
                        : state === "active"
                          ? "bg-amber-400 text-black"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";
                    return (
                      <span
                        key={n}
                        className={`inline-flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-xs font-semibold ${tone}`}
                      >
                        {n}
                      </span>
                    );
                  })}
                  {batches > 120 && (
                    <span className="inline-flex h-7 items-center px-2 text-xs text-gray-500 dark:text-gray-400">
                      +{batches - 120}
                    </span>
                  )}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Live log
                </h2>
                <Gauge className="h-4 w-4 text-gray-400" />
              </div>
              <div className="max-h-80 overflow-y-auto p-3">
                {events.length === 0 ? (
                  <p className="p-3 text-sm text-gray-500 dark:text-gray-400">
                    Activity will appear here once sending begins.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {events.map((entry, index) => (
                      <li
                        key={`${entry.email}-${entry.created_at}-${index}`}
                        className="flex items-center gap-2 px-3 py-1 text-xs"
                      >
                        {entry.ok ? (
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-600" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                        )}
                        <span
                          className={`truncate ${
                            entry.ok
                              ? "text-gray-700 dark:text-gray-200"
                              : "text-red-600 dark:text-red-400"
                          }`}
                          title={entry.error || entry.email}
                        >
                          {entry.email}
                          {!entry.ok && entry.error ? ` — ${entry.error}` : ""}
                        </span>
                        <span className="ml-auto shrink-0 text-gray-400">
                          {formatClock(entry.created_at)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassMailer;
