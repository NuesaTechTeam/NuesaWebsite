import coursesData from "../../courses.json";

const API_URL = (import.meta.env.VITE_API_URL || "https://r2-to-firestore-worker.nasurf25.workers.dev").replace(/\/+$/, "");
const API_KEY = import.meta.env.VITE_API_KEY;
const UPLOAD_SECRET = import.meta.env.VITE_UPLOAD_SECRET;
const SEARCH_DEPARTMENTS = ["AAE", "BME", "CHE", "COE", "CVE", "EEE", "MCT", "MEE", "PTE"];
const SEARCH_LEVELS = ["100", "200", "300", "400", "500"];
const DEPARTMENT_CODE_ALIASES = {
  MCE: "MCT",
};

const fetchDocuments = async (params = {}, signal) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.append(key, value);
  });

  const queryString = query.toString();
  const response = await fetch(`${API_URL}${queryString ? `?${queryString}` : ""}`, {
    headers: {
      "X-API-Key": API_KEY,
    },
    signal
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Search failed: ${response.statusText}`);
  }
  return response.json();
};

const getLevelPrefixes = (level) => {
  const prefixes = new Set([String(level)]);
  coursesData.forEach((course) => {
    if (course.levels?.map(String).includes(String(level))) {
      const prefix = course.code?.match(/^[A-Z]+/)?.[0];
      if (prefix) prefixes.add(prefix);
    }
  });
  return [...prefixes];
};

const encodeFanoutCursor = (payload) => {
  return `level-fanout:${btoa(JSON.stringify(payload))}`;
};

const decodeFanoutCursor = (cursor) => {
  if (!cursor?.startsWith("level-fanout:")) return null;

  try {
    return JSON.parse(atob(cursor.slice("level-fanout:".length)));
  } catch {
    return null;
  }
};

const normalizeDepartmentCode = (departmentCode) => {
  const normalized = String(departmentCode || "").trim().toUpperCase();
  return DEPARTMENT_CODE_ALIASES[normalized] || normalized;
};

const mergeDocuments = (results) => {
  const seen = new Set();

  return results
    .flatMap(({ result }) => result.documents || [])
    .filter((document) => {
      if (!document?.id || seen.has(document.id)) return false;
      seen.add(document.id);
      return true;
    })
    .sort((a, b) => {
      return `${a.course_code || ""}/${a.file_name || ""}`.localeCompare(`${b.course_code || ""}/${b.file_name || ""}`);
    });
};

const searchLevelAcrossPrefixes = async (params, signal) => {
  const limit = Number(params.limit) || 20;
  const cursorState = decodeFanoutCursor(params.cursor);
  const prefixes = cursorState?.prefixes || getLevelPrefixes(params.level);
  const cursors = cursorState?.cursors || {};
  const activePrefixes = cursorState ? prefixes.filter((prefix) => cursors[prefix] !== null) : prefixes;
  const prefixLimit = Math.max(Math.ceil(limit / Math.max(activePrefixes.length, 1)), 4);

  const results = await Promise.all(activePrefixes.map((departmentCode) => {
    return fetchDocuments({
      ...params,
      department_code: departmentCode,
      cursor: cursors[departmentCode] || null,
      limit: prefixLimit,
    }, signal).then((result) => ({ departmentCode, result }));
  }));

  const nextCursors = Object.fromEntries(prefixes.map((prefix) => [prefix, cursors[prefix] ?? null]));
  results.forEach(({ departmentCode, result }) => {
    nextCursors[departmentCode] = result.next_cursor || null;
  });

  const documents = mergeDocuments(cursorState?.buffer?.length
    ? [{ result: { documents: cursorState.buffer } }, ...results]
    : results);
  const visibleDocuments = documents.slice(0, limit);
  const buffer = documents.slice(limit);

  return {
    documents: visibleDocuments,
    total: visibleDocuments.length,
    next_cursor: buffer.length || Object.values(nextCursors).some(Boolean)
      ? encodeFanoutCursor({ prefixes, cursors: nextCursors, buffer })
      : null,
  };
};

const getPqTargets = (params) => {
  const departments = params.department_code
    ? [normalizeDepartmentCode(params.department_code)]
    : SEARCH_DEPARTMENTS;
  const levels = params.level ? [String(params.level)] : SEARCH_LEVELS;

  return departments.flatMap((departmentCode) => {
    return levels.map((level) => ({
      key: `${departmentCode}:${level}`,
      department_code: departmentCode,
      level,
    }));
  });
};

const searchPqAcrossTargets = async (params, signal) => {
  const limit = Number(params.limit) || 20;
  const cursorState = decodeFanoutCursor(params.cursor);
  const targets = cursorState?.targets || getPqTargets(params);
  const cursors = cursorState?.cursors || {};
  const activeTargets = cursorState ? targets.filter((target) => cursors[target.key] !== null) : targets;
  const targetLimit = Math.max(Math.ceil(limit / Math.max(activeTargets.length, 1)), 2);

  const results = await Promise.all(activeTargets.map((target) => {
    return fetchDocuments({
      ...params,
      department_code: target.department_code,
      level: target.level,
      cursor: cursors[target.key] || null,
      limit: targetLimit,
    }, signal).then((result) => ({ key: target.key, result }));
  }));

  const nextCursors = Object.fromEntries(targets.map((target) => [target.key, cursors[target.key] ?? null]));
  results.forEach(({ key, result }) => {
    nextCursors[key] = result.next_cursor || null;
  });

  const documents = mergeDocuments(cursorState?.buffer?.length
    ? [{ result: { documents: cursorState.buffer } }, ...results]
    : results);
  const visibleDocuments = documents.slice(0, limit);
  const buffer = documents.slice(limit);

  return {
    documents: visibleDocuments,
    total: visibleDocuments.length,
    next_cursor: buffer.length || Object.values(nextCursors).some(Boolean)
      ? encodeFanoutCursor({ targets, cursors: nextCursors, buffer })
      : null,
  };
};

/**
 * Search for documents.
 * @param {Object} params - Search parameters (q, level, department_code, semester, course_code, limit, cursor)
 */
export const searchDocuments = async (params = {}, signal) => {
  if (params.course_code === "PQ") {
    return searchPqAcrossTargets(params, signal);
  }

  if (params.level && !params.department_code && !params.course_code && !params.q) {
    return searchLevelAcrossPrefixes(params, signal);
  }

  return fetchDocuments({
    ...params,
    department_code: normalizeDepartmentCode(params.department_code),
  }, signal);
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

  if (!UPLOAD_SECRET) {
    throw new Error("Upload is not configured. Missing VITE_UPLOAD_SECRET.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "X-API-Key": API_KEY,
      "X-Upload-Secret": UPLOAD_SECRET,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.detail || `Upload failed: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Get courses list.
 */
export const getCourses = async (params = {}) => {
  const limit = Number(params.limit) || 10;
  const startIndex = params.cursor ? Math.max(coursesData.findIndex(course => course.code === params.cursor) + 1, 0) : 0;
  const department = params.department_code || params.department;
  const level = params.level ? String(params.level) : "";
  const searchTerm = (params.q || params.query || "").trim().toLowerCase();

  const DEPARTMENT_MAP = {
    AAE: "AERONAUTICAL ENGINEERING",
    BME: "BIOMEDICAL ENGINEERING",
    CHE: "CHEMICAL ENGINEERING",
    CVE: "CIVIL ENGINEERING",
    CVL: "CIVIL ENGINEERING",
    COE: "COMPUTER ENGINEERING",
    EEE: "ELECTRICAL AND ELECTRONICS ENGINEERING",
    MEE: "MECHANICAL ENGINEERING",
    MCE: "MECHATRONICS ENGINEERING",
    MCT: "MECHATRONICS ENGINEERING",
    PTE: "PETROLEUM ENGINEERING",
    GENERAL: "GENERAL STUDIES",
  };

  const departmentName = department ? DEPARTMENT_MAP[String(department).trim().toUpperCase()] : "";
  const filtered = coursesData.filter(course => {
    if (departmentName && !course.offered_by_programs?.includes(departmentName)) return false;
    if (level && !course.levels?.map(String).includes(level)) return false;
    if (searchTerm) {
      const code = course.code?.toLowerCase() || "";
      const title = course.title?.toLowerCase() || "";
      const compactCode = code.replace(/\s+/g, "");
      const compactSearch = searchTerm.replace(/\s+/g, "");
      if (!code.includes(searchTerm) && !title.includes(searchTerm) && !compactCode.includes(compactSearch)) {
        return false;
      }
    }
    return true;
  });

  const courses = filtered.slice(startIndex, startIndex + limit).map(course => ({
    ...course,
    id: course.code,
  }));

  return {
    courses,
    next_cursor: startIndex + limit < filtered.length ? courses[courses.length - 1]?.code || null : null,
  };
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
