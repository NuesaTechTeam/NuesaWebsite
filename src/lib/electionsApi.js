/**
 * Frontend client for the NUESA Elections API (see /worker).
 * Set VITE_ELECTIONS_API_URL to enable it. When unset, the app falls back to
 * the local placeholder data so the UI keeps working during development.
 */
const API_URL = (
  import.meta.env.VITE_ELECTIONS_API_URL || "https://elections-api.nuesaabuad.ng"
).replace(/\/+$/, "");
const TOKEN_KEY = "nuesa-elections-token";
const AGENT_TOKEN_KEY = "nuesa-elections-agent-token";

export const isElectionsApiConfigured = () => Boolean(API_URL);

const request = async (path, { method = "GET", body, token } = {}) => {
  if (!API_URL) throw new Error("Elections API is not configured");

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body ? { "content-type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
};

export const getAdminToken = () => {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
};

export const setAdminToken = (token) => {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore storage access errors
  }
};

export const getAgentToken = () => {
  try {
    return sessionStorage.getItem(AGENT_TOKEN_KEY) || "";
  } catch {
    return "";
  }
};

export const setAgentToken = (token) => {
  try {
    if (token) sessionStorage.setItem(AGENT_TOKEN_KEY, token);
    else sessionStorage.removeItem(AGENT_TOKEN_KEY);
  } catch {
    // ignore storage access errors
  }
};

/** Confirms the stored token is valid and belongs to an elections admin. */
export const checkAdminSession = async () => {
  const data = await request("/admin/session", { token: getAdminToken() });
  if (data.role !== "admin") throw new Error("Not an elections admin session");
  return data;
};

/** Confirms the stored agent token is still valid. */
export const checkAgentSession = async () => {
  const data = await request("/admin/session", { token: getAgentToken() });
  if (data.role !== "agent") throw new Error("Not an agent session");
  return data;
};

export const adminLogin = async (username, password) => {
  const data = await request("/admin/login", {
    method: "POST",
    body: { username, password },
  });
  setAdminToken(data.token);
  return data;
};

/** Candidates' agents: live results only. */
export const agentLogin = async (username, password) => {
  const data = await request("/agent/login", {
    method: "POST",
    body: { username, password },
  });
  setAgentToken(data.token);
  return data;
};

export const voterVerify = (matricNumber, invoiceNumber) =>
  request("/voter/verify", {
    method: "POST",
    body: { matricNumber, invoiceNumber },
  });

export const otpSend = (voterToken) =>
  request("/voter/otp/send", { method: "POST", body: { voterToken } });

export const otpVerify = (voterToken, code) =>
  request("/voter/otp/verify", { method: "POST", body: { voterToken, code } });

export const castVote = (ballotToken, votes) =>
  request("/vote", { method: "POST", body: { ballotToken, votes } });

export const getResults = (token = getAdminToken()) => request("/results", { token });

export const getStats = (token = getAdminToken()) => request("/stats", { token });

/** Public: whether the voter portal is open. */
export const getElectionStatus = () => request("/election/status");

/** Admin: open or close voting. */
export const setElectionStatus = (open) =>
  request("/admin/election/status", { method: "POST", body: { open }, token: getAdminToken() });

/** Admin: remaining Brevo email credits. */
export const getBrevoCredits = () => request("/admin/brevo", { token: getAdminToken() });

export const getCandidates = () => request("/candidates");

/** Admin: send a test OTP and return the raw provider responses. */
export const runDiagnostics = (payload) =>
  request("/admin/diagnostics", { method: "POST", body: payload, token: getAdminToken() });

/** Admin: every recorded ballot grouped by voter (matric + choices). */
export const getBallots = () => request("/admin/ballots", { token: getAdminToken() });
