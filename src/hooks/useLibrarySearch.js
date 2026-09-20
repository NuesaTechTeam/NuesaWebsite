import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { listResources } from "../lib/libraryApi";
import coursesData from "../../courses.json";

/**
 * Search state for the new NUESA Digital Library API.
 * Page-based pagination (page/limit) unlike the legacy cursor-based worker.
 */
export const useLibrarySearch = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");
  const [isPQLocked, setIsPQLocked] = useState(false);
  const [matchedCourse, setMatchedCourse] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const cache = useRef({});
  const abortRef = useRef(null);
  const genRef = useRef(0);
  const pageRef = useRef(1);

  const PAGE_SIZE = 24;

  const levels = ["All", "100", "200", "300", "400", "500"];

  const departments = useMemo(
    () => [
      { name: "All", value: "" },
      { name: "Civil", value: "Civil Engineering" },
      { name: "Computer", value: "Computer Engineering" },
      { name: "Aeronautical", value: "Aeronautical Engineering" },
      { name: "Chemical", value: "Chemical Engineering" },
      { name: "Petroleum", value: "Petroleum Engineering" },
      { name: "Mechanical", value: "Mechanical Engineering" },
      { name: "Mechatronics", value: "Mechatronics Engineering" },
      { name: "Electrical", value: "Electrical Engineering" },
      { name: "Biomedical", value: "Biomedical Engineering" },
    ],
    []
  );

  const normalizeQueryData = (query) => {
    if (!query) return { code: "", course: null };
    const trimmed = query.trim().toUpperCase();

    const courseCodePattern = /^([A-Z]{3})\s*(\d{2,4})$/;
    const match = trimmed.match(courseCodePattern);
    if (match) {
      const exactCode = `${match[1]} ${match[2]}`;
      const exactCourse = coursesData.find((c) => c.code === exactCode) || null;
      return { code: exactCode, course: exactCourse };
    }

    if (trimmed.length >= 3) {
      const matchingCourse = coursesData.find(
        (c) => c.title && c.title.includes(trimmed)
      );
      if (matchingCourse) {
        return { code: matchingCourse.code, course: matchingCourse };
      }
    }

    return { code: trimmed, course: null };
  };

  const stateRef = useRef({});
  stateRef.current = {
    searchQuery,
    selectedLevel,
    selectedDept,
    isPQLocked,
    departments,
  };

  const fetchDocs = useCallback(
    async (isLoadMore = false, overrideQuery = null, overrideFilters = {}) => {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const myGen = ++genRef.current;
      const isStale = () => myGen !== genRef.current;

      setLoading(true);
      setError(null);
      if (!isLoadMore) setDocuments([]);

      let shouldClearLoading = true;

      try {
        const s = stateRef.current;
        const q = overrideQuery !== null ? overrideQuery : s.searchQuery;
        const { code: normalizedQuery, course: foundCourse } = normalizeQueryData(q);

        const levelValue = overrideFilters.level ?? s.selectedLevel;
        const deptValue = overrideFilters.department ?? s.selectedDept;
        const pqLocked = overrideFilters.pqLocked ?? s.isPQLocked;
        const deptName =
          deptValue === "All"
            ? ""
            : s.departments.find((d) => d.name === deptValue)?.value;

        const currentPage = isLoadMore ? pageRef.current + 1 : 1;

        const params = { limit: PAGE_SIZE, page: currentPage };
        if (levelValue !== "All") params.level = levelValue;
        if (deptName) params.department = deptName;
        if (pqLocked) {
          params.type = "past_questions";
        } else if (q) {
          params.course_code = normalizedQuery;
        }

        const cacheKey = JSON.stringify(params);

        if (!isLoadMore && cache.current[cacheKey]) {
          if (!isStale()) {
            const cached = cache.current[cacheKey];
            setMatchedCourse(foundCourse);
            setDocuments(cached.data || []);
            setTotalCount(cached.meta?.total ?? cached.data?.length ?? 0);
            setHasMore((cached.meta?.page ?? 1) < (cached.meta?.last_page ?? 1));
            pageRef.current = 1;
          }
          return;
        }

        const data = await listResources(params, controller.signal);

        if (isStale()) {
          shouldClearLoading = false;
          return;
        }

        setMatchedCourse(foundCourse);
        if (!isLoadMore) cache.current[cacheKey] = data;

        const items = data?.data || [];
        setDocuments((prev) => (isLoadMore ? [...prev, ...items] : items));
        setTotalCount(data?.meta?.total ?? items.length);
        setHasMore((data?.meta?.page ?? currentPage) < (data?.meta?.last_page ?? currentPage));
        pageRef.current = currentPage;
      } catch (err) {
        if (err.name === "AbortError") {
          shouldClearLoading = false;
          return;
        }
        if (!isStale()) {
          setError("Failed to load the library. Please try again.");
          console.error("[LibrarySearch] fetch error:", err);
        } else {
          shouldClearLoading = false;
        }
      } finally {
        if (shouldClearLoading) setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    pageRef.current = 1;
    if (!searchQuery) {
      fetchDocs(false);
      return;
    }
    const timer = setTimeout(() => fetchDocs(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedLevel, selectedDept, isPQLocked, fetchDocs]);

  return {
    documents,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedLevel,
    setSelectedLevel,
    selectedDept,
    setSelectedDept,
    isPQLocked,
    setIsPQLocked,
    matchedCourse,
    fetchDocs,
    levels,
    departments,
    totalCount,
    hasMore,
  };
};

export default useLibrarySearch;
