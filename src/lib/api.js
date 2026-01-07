const BASE_URL = "https://textbooks-1093886938384.europe-west1.run.app";
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Search for documents.
 * @param {Object} params - Search parameters (q, level, department_code, semester, course_code, limit, cursor)
 */
export const searchDocuments = async (params = {}, signal) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.append(key, value);
  });

  const response = await fetch(`${BASE_URL}/api/search?${query.toString()}`, {
    headers: {
      "X-API-Key": API_KEY,
    },
    signal
  });
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
      "X-API-Key": API_KEY,
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

  const response = await fetch(`${BASE_URL}/api/courses?${query.toString()}`, {
    headers: {
      "X-API-Key": API_KEY,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.statusText}`);
  }
  return response.json();
};
