import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { searchDocuments } from "../lib/api";
import coursesData from "../../courses.json";

export const useResourceSearch = () => {
    const [documents, setDocuments] = useState([]);
    // Start loading=true so skeleton UI shows before the first fetch, not "Nothing Found"
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("All");
    const [selectedDept, setSelectedDept] = useState("All");
    const [nextCursor, setNextCursor] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [isPQLocked, setIsPQLocked] = useState(false);
    const [matchedCourse, setMatchedCourse] = useState(null);

    const cache = useRef({});
    const abortControllerRef = useRef(null);
    // Monotonically-increasing counter. Each call to fetchDocs gets its own
    // generation number. Only the latest generation may commit state changes.
    const fetchGenRef = useRef(0);

    const levels = ["All", "100", "200", "300", "400", "500", "GENERAL"];

    const departments = useMemo(() => [
        { name: "All", code: "" },
        { name: "Civil", code: "CVE" },
        { name: "Computer", code: "COE" },
        { name: "Aeronautical", code: "AAE" },
        { name: "Chemical", code: "CHE" },
        { name: "Petroleum", code: "PTE" },
        { name: "Mechanical", code: "MEE" },
        { name: "Mechatronics", code: "MCE" },
        { name: "Electrical", code: "EEE" },
        { name: "Biomedical", code: "BME" },
    ], []);

    const normalizeQueryData = (query) => {
        if (!query) return { code: "", course: null };
        const trimmed = query.trim().toUpperCase();

        const courseCodePattern = /^([A-Z]{3})\s*(\d{2,4})$/;
        const match = trimmed.match(courseCodePattern);
        if (match) {
            const exactCode = `${match[1]} ${match[2]}`;
            const exactCourse = coursesData.find(c => c.code === exactCode) || null;
            return { code: exactCode, course: exactCourse };
        }

        if (trimmed.length >= 3) {
            const matchingCourse = coursesData.find(c =>
                c.title && c.title.includes(trimmed)
            );
            if (matchingCourse) {
                return { code: matchingCourse.code, course: matchingCourse };
            }
        }

        return { code: trimmed, course: null };
    };

    // Always-current state snapshot — lets fetchDocs stay stable (empty deps)
    // without stale-closure issues.
    const stateRef = useRef({});
    stateRef.current = { searchQuery, selectedLevel, selectedDept, isPQLocked, nextCursor, departments };

    const fetchDocs = useCallback(async (isLoadMore = false, overrideQuery = null, overrideFilters = {}) => {
        // Cancel any in-flight request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        const myGen = ++fetchGenRef.current;

        // Helper: is this fetch still the latest?
        const isStale = () => myGen !== fetchGenRef.current;

        setLoading(true);
        setError(null);
        if (!isLoadMore) setDocuments([]);

        let shouldClearLoading = true; // always clear loading at the end

        try {
            const {
                searchQuery: currentQuery,
                selectedLevel,
                selectedDept,
                isPQLocked,
                nextCursor,
                departments,
            } = stateRef.current;

            const q = overrideQuery !== null ? overrideQuery : currentQuery;
            const { code: normalizedQuery, course: foundCourse } = normalizeQueryData(q);

            const levelValue = overrideFilters.level ?? selectedLevel;
            const deptValue = overrideFilters.department ?? selectedDept;
            const pqLocked = overrideFilters.pqLocked ?? isPQLocked;
            const deptCode = deptValue === "All" ? "" : departments.find(d => d.name === deptValue)?.code;
            const lvl = levelValue === "All" ? "" : levelValue;

            const params = {
                level: lvl,
                department_code: deptCode,
                cursor: isLoadMore ? nextCursor : null,
            };
            if (pqLocked) {
                params.course_code = "PQ";
            } else if (q) {
                params.course_code = normalizedQuery;
            }

            const cacheKey = JSON.stringify(params);

            // Return cached result immediately if available
            if (!isLoadMore && cache.current[cacheKey]) {
                if (!isStale()) {
                    const cached = cache.current[cacheKey];
                    setMatchedCourse(foundCourse);
                    setDocuments(cached.documents);
                    setNextCursor(cached.next_cursor);
                    setTotalCount(cached.total || cached.documents?.length || 0);
                }
                return; // loading will be cleared in finally
            }

            const data = await searchDocuments(params, controller.signal);

            // A newer fetch has superseded this one — don't commit stale results
            if (isStale()) {
                shouldClearLoading = false; // the newer fetch manages its own loading
                return;
            }

            setMatchedCourse(foundCourse);
            if (!isLoadMore && data) cache.current[cacheKey] = data;

            const docs = data?.documents || [];
            setDocuments(prev => isLoadMore ? [...prev, ...docs] : docs);
            setNextCursor(data?.next_cursor || null);
            setTotalCount(data?.total || docs.length);

        } catch (err) {
            if (err.name === "AbortError") {
                // This fetch was cancelled because a newer one started.
                // The newer fetch manages loading state — don't touch it.
                shouldClearLoading = false;
                return;
            }
            if (!isStale()) {
                setError("Failed to fetch documents. Please try again.");
                console.error("[ResourceSearch] fetch error:", err);
            } else {
                shouldClearLoading = false;
            }
        } finally {
            if (shouldClearLoading) {
                setLoading(false);
            }
        }
    }, []); // stable — reads live state via stateRef

    // Re-fetch whenever search/filter state changes.
    // When there is no search query (initial load or filter change), call
    // fetchDocs synchronously so React 18 StrictMode's effect cleanup cannot
    // cancel a setTimeout(fn, 0) before it fires — which would leave the page
    // perpetually blank. Typed queries use a 300 ms debounce.
    useEffect(() => {
        setNextCursor(null);
        if (!searchQuery) {
            // Synchronous — not cancellable by cleanup
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
        nextCursor,
        totalCount,
        isPQLocked,
        setIsPQLocked,
        matchedCourse,
        fetchDocs,
        levels,
        departments,
        setNextCursor,
    };
};
