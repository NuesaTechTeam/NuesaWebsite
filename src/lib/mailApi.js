/**
 * Frontend client for the Mass Mailer endpoints on the NUESA Elections API
 * (see /worker). Uses the same base URL and admin session token as the
 * elections client.
 */
import { getAdminToken, setAdminToken } from "./electionsApi";

const API_URL = (
  import.meta.env.VITE_ELECTIONS_API_URL || "https://elections-api.nuesaabuad.ng"
).replace(/\/+$/, "");

const request = async (path, { method = "GET", body, token } = {}) => {
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

/** Build the absolute URL for a server-relative path (inline email images). */
export const absoluteUrl = (path) => {
  if (/^https?:\/\//i.test(path || "")) return path;
  return `${API_URL}${path}`;
};

/** Verifies the stored session token against the server. */
export const mailerCheckSession = () =>
  request("/admin/session", { token: getAdminToken() });

export const mailerLogin = async (username, password) => {
  const data = await request("/mailer/login", {
    method: "POST",
    body: { username, password },
  });
  setAdminToken(data.token);
  return data;
};

export const mailerLogout = () => setAdminToken("");

/** Recipient count + a small sample, pulled from the sheet server-side. */
export const getMailRecipients = () =>
  request("/admin/mail/recipients", { token: getAdminToken() });

export const createCampaign = (payload) =>
  request("/admin/mail/campaigns", {
    method: "POST",
    body: payload,
    token: getAdminToken(),
  });

export const getCampaign = (id) =>
  request(`/admin/mail/campaigns/${encodeURIComponent(id)}`, {
    token: getAdminToken(),
  });

export const stopCampaign = (id) =>
  request(`/admin/mail/campaigns/${encodeURIComponent(id)}/stop`, {
    method: "POST",
    token: getAdminToken(),
  });

/** Send a single preview email to one address (no campaign created). */
export const sendTestEmail = (payload) =>
  request("/admin/mail/test", {
    method: "POST",
    body: payload,
    token: getAdminToken(),
  });

/** Upload a PDF attachment (base64, no data: prefix). Returns { id, name, size }. */
export const uploadAttachment = (payload) =>
  request("/admin/mail/attachments", {
    method: "POST",
    body: payload,
    token: getAdminToken(),
  });

/** Upload an inline email image (data URL string). Returns { id, url }. */
export const uploadMailImage = (payload) =>
  request("/admin/mail/images", {
    method: "POST",
    body: payload,
    token: getAdminToken(),
  });

export const listCampaigns = () =>
  request("/admin/mail/campaigns", { token: getAdminToken() });
