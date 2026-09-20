/**
 * Client for the NUESA Digital Library API (see LIBRARY_API.md).
 * Public endpoints, no API key required. CORS is open to all origins.
 *
 * Base: https://nuesaapp.thestackcompany.com/api/v1
 */
const API_BASE = (
  import.meta.env.VITE_LIBRARY_API_URL ||
  "https://nuesaapp.thestackcompany.com/api/v1"
).replace(/\/+$/, "");

const buildQuery = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });
  return query.toString();
};

const request = async (path, params, signal) => {
  const query = buildQuery(params);
  const response = await fetch(`${API_BASE}${path}${query ? `?${query}` : ""}`, {
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || errorData.error || `Request failed (${response.status})`
    );
  }

  return response.json();
};

/**
 * List library resources.
 * Params: course_code, type, department, level, q, limit (max 200), page.
 * Returns { data: [...], meta: { total, page, per_page, last_page } }.
 */
export const listResources = (params = {}, signal) => request("/resources", params, signal);

/** Single document by id. Returns { data: {...} }. */
export const getResource = (id, signal) =>
  request(`/resources/${encodeURIComponent(id)}`, {}, signal);

/** Full course catalogue (code, name, dept, level). */
export const listCourses = (params = {}, signal) => request("/courses", params, signal);

/**
 * Open a library file inline in a new tab.
 *
 * The catalogue's download_url is a signed route that forces a download
 * (Content-Disposition: attachment), and the public API exposes no matching
 * /open URL, so we fetch the signed file (CORS is open) and hand the browser
 * an inline blob instead. Falls back to the raw URL if the fetch fails.
 */
export const openResourceInline = async (url) => {
  if (!url) return;

  // Opened synchronously so mobile browsers keep the user-gesture context.
  const win = window.open("", "_blank");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(
      blob.type ? blob : new Blob([blob], { type: "application/pdf" })
    );

    if (win) {
      win.location.href = objectUrl;
    } else {
      window.location.href = url;
      return;
    }

    // Give the viewer time to load before releasing the blob.
    setTimeout(() => URL.revokeObjectURL(objectUrl), 5 * 60 * 1000);
  } catch {
    if (win) win.location.href = url;
    else window.open(url, "_blank");
  }
};

export { API_BASE as LIBRARY_API_BASE };
