/**
 * Client for the blog submission/review endpoints on the NUESA Worker.
 * Shares the elections API base and admin token (same Worker + SESSIONS KV).
 */
import { getAdminToken } from "./electionsApi";

const API_URL = (
  import.meta.env.VITE_BLOG_API_URL ||
  import.meta.env.VITE_ELECTIONS_API_URL ||
  "https://elections-api.nuesaabuad.ng"
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

/** Public: submit a blog article. Returns { id, status }. */
export const submitBlog = (data) =>
  request("/blog/submissions", { method: "POST", body: data });

/** Admin: list submissions, optionally filtered by status. */
export const listBlogSubmissions = (status) =>
  request(
    `/blog/submissions${status ? `?status=${encodeURIComponent(status)}` : ""}`,
    { token: getAdminToken() }
  );

/** Admin: approve or reject a submission. */
export const updateBlogStatus = (id, status) =>
  request(`/blog/submissions/${encodeURIComponent(id)}/status`, {
    method: "POST",
    body: { status },
    token: getAdminToken(),
  });

/** Public: approved posts for the site. */
export const listPublishedPosts = () => request("/blog/posts");

export { API_URL as BLOG_API_URL };
