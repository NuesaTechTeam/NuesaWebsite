const BASE_URL = "https://nuesa-textbooks-98807055984.us-central1.run.app/";
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

/**
 * Send feedback email (suggestions or complaints)
 * @param {string} type - "Suggestion" or "Complaint"
 * @param {Object} data - Feedback details
 */
export const sendFeedbackEmail = async (type, data) => {
  const targetEmail = "drsomelina@gmail.com";
  const subjectStr = type === "Suggestion" ? "NUESA FEEDBACK: SUGGESTION" : "NUESA FEEDBACK: COMPLAINT";

  const textBody = `
You have received a new ${type.toLowerCase()}.

Contact Information:
${data.isAnonymous ? "unknown" : `${data.contactMethod}: ${data.contactInfo}`}

Details:
${data.details}
  `.trim();

  const response = await fetch("https://email-service-98807055984.us-central1.run.app/email/send/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "okay",
    },
    body: JSON.stringify({
      subject: subjectStr,
      to_emails: targetEmail,
      text_body: textBody,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to send ${type.toLowerCase()}`);
  }

  return response.json();
};

