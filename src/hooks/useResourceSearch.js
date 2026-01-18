import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { searchDocuments } from "../lib/api";

export const useResourceSearch = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("All");
    const [selectedDept, setSelectedDept] = useState("All");
    const [nextCursor, setNextCursor] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [isPQLocked, setIsPQLocked] = useState(false);

    // Cache for search results
    const cache = useRef({});

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

    /**
     * Normalizes search input for course codes.
     */
    /* eslint-disable react-hooks/exhaustive-deps */
    const abortControllerRef = useRef(null);

    /**
     * Normalizes search input for course codes.
     */
    const normalizeQuery = (query) => {
        if (!query) return "";
        let trimmed = query.trim();

        // Flexible Regex: 3 letters + optional spaces + 2-4 digits
        const courseCodePattern = /^([a-zA-Z]{3})\s*(\d{2,4})$/;
        const match = trimmed.match(courseCodePattern);

        if (match) {
            return `${match[1].toUpperCase()} ${match[2]}`;
        }

        return trimmed.toUpperCase();
    };

    const fetchDocs = useCallback(async (isLoadMore = false) => {
        // If it's a new search (not load more), cancel any pending previous search
        if (!isLoadMore) {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();
        }

        setLoading(true);
        setError(null);

        // Clear documents immediately if it's a new search to show skeletons
        if (!isLoadMore) {
            setDocuments([]);
        }

        try {
            const normalizedQuery = normalizeQuery(searchQuery);
            const deptCode = selectedDept === "All" ? "" : departments.find(d => d.name === selectedDept)?.code;
            const lvl = selectedLevel === "All" ? "" : selectedLevel;

            let params = {
                level: lvl,
                department_code: deptCode,
                cursor: isLoadMore ? nextCursor : null,
            };

            if (isPQLocked) {
                params.course_code = "PQ";
            } else {
                if (searchQuery) {
                    const normalizedQuery = normalizeQuery(searchQuery);
                    // Use 'q' for both course codes and keywords as per Direct Mode requirements
                    params.course_code = normalizedQuery;
                }
            }

            const cacheKey = JSON.stringify(params);

            // Check cache for initial fetches (non-pagination)
            // Check BEFORE network call
            if (!isLoadMore && cache.current[cacheKey]) {
                const cached = cache.current[cacheKey];
                setDocuments(cached.documents);
                setNextCursor(cached.next_cursor);
                setTotalCount(cached.total || (cached.documents ? cached.documents.length : 0));
                setLoading(false);
                return;
            }

            // Pass the signal to the API
            const signal = isLoadMore ? null : abortControllerRef.current?.signal;
            const data = await searchDocuments(params, signal);

            // Cache successful initial fetches
            if (!isLoadMore) {
                cache.current[cacheKey] = data;
            }

            setDocuments(prev => isLoadMore ? [...prev, ...data.documents] : data.documents);
            setNextCursor(data.next_cursor);
            // Fallback for total since backend might return 0 incorrectly in Browsing Mode
            setTotalCount(data.total || (isLoadMore ? documents.length + data.documents.length : data.documents.length));
        } catch (err) {
            if (err.name === 'AbortError') {
                // Ignore abort errors
                console.log("[ResourceSearch] Request aborted");
                return;
            }
            setError("Failed to fetch documents. Please try again.");
            console.error("[ResourceSearch] Error fetching documents:", err);
        } finally {
            // Only turn off loading if we weren't aborted (or if we are loading more, which isn't aborted usually)
            if (isLoadMore || (abortControllerRef.current && !abortControllerRef.current.signal.aborted)) {
                setLoading(false);
            }
        }
    }, [searchQuery, selectedLevel, selectedDept, nextCursor, departments, isPQLocked]);

    // Active Synchronization Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            // Reset cursor for new searches/filters
            setNextCursor(null);
            fetchDocs(false);
        }, 500);

        return () => {
            clearTimeout(timer);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [searchQuery, selectedLevel, selectedDept, isPQLocked]);

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
        fetchDocs,
        levels,
        departments,
        setNextCursor // Exported mainly for internal reset logic if needed, or we can handle it inside
    };
};
