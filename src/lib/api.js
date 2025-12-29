const BASE_URL = "https://textbooks-1093886938384.europe-west1.run.app";
const UPLOAD_SECRET = import.meta.env.VITE_UPLOAD_SECRET;

/**
 * Search for documents.
 * @param {Object} params - Search parameters (q, level, department_code, semester, course_code, limit, cursor)
 */
export const searchDocuments = async (params = {}, signal) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.append(key, value);
  });

  const response = await fetch(`${BASE_URL}/api/search?${query.toString()}`, { signal });
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Upload a document.
 * @param {File} file - The PDF file.
 * @param {Object} metadata - Metadata (department, department_code, level, semester, course_code)
 */
export const uploadDocument = async (file, metadata) => {
  const formData = new FormData();
  formData.append("file", file);
  Object.entries(metadata).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: {
      "X-Upload-Secret": UPLOAD_SECRET,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Upload failed: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Get courses list.
 */
export const getCourses = async (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.append(key, value);
  });

  const response = await fetch(`${BASE_URL}/api/courses?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.statusText}`);
  }
  return response.json();
};
