/**
 * Frontend client for the NUESA Elections API (see /worker).
 * Set VITE_ELECTIONS_API_URL to enable it. When unset, the app falls back to
 * the local placeholder data so the UI keeps working during development.
 */
const API_URL = (
  import.meta.env.VITE_ELECTIONS_API_URL || "https://elections-api.nuesaabuad.ng"
).replace(/\/+$/, "");
const TOKEN_KEY = "nuesa-elections-token";

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

export const adminLogin = async (username, password) => {
  const data = await request("/admin/login", {
    method: "POST",
    body: { username, password },
  });
  setAdminToken(data.token);
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

export const getResults = () => request("/results", { token: getAdminToken() });

export const getStats = () => request("/stats", { token: getAdminToken() });

export const getCandidates = () => request("/candidates");
