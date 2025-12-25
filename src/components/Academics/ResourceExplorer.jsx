/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, Filter, Loader2, BookOpen, Eye, AlertCircle, ChevronRight, Hash, X, Lock, Unlock } from "lucide-react";
import { searchDocuments } from "../../lib/api";
import DropdownFilter from "./DropdownFilter";

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between animate-pulse">
    <div>
      <div className="flex justify-between mb-4">
        <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
        <div className="w-12 h-5 bg-gray-100 rounded"></div>
      </div>
      <div className="h-6 bg-gray-100 rounded w-3/4 mb-4"></div>
      <div className="flex gap-2">
        <div className="w-16 h-5 bg-gray-50 rounded"></div>
        <div className="w-16 h-5 bg-gray-50 rounded"></div>
      </div>
    </div>
    <div className="mt-8 pt-4 border-t border-gray-50 flex justify-between">
      <div className="w-10 h-4 bg-gray-50 rounded"></div>
      <div className="w-20 h-4 bg-gray-50 rounded"></div>
    </div>
  </div>
);

const ResourceExplorer = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");
  const [nextCursor, setNextCursor] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isPQLocked, setIsPQLocked] = useState(false);
  const cache = React.useRef({});

  const levels = ["All", "100", "200", "300", "400", "500", "GENERAL"];
  const departments = React.useMemo(() => [
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
   * Handles variations like "eee313", "eee 313", "GEE 1101", "mat 11"
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
    setLoading(true);
    setError(null);
    try {

      const normalizedQuery = normalizeQuery(searchQuery);
      // When locked, we ignore the user's text input and strictly search for "PQ" within the selected filters
      const finalQuery = isPQLocked ? "PQ" : normalizedQuery;

      const params = {
        course_code: finalQuery,
        level: selectedLevel === "All" ? "" : selectedLevel,
        department_code: selectedDept === "All" ? "" : departments.find(d => d.name === selectedDept)?.code,
        cursor: isLoadMore ? nextCursor : null,
      };

      const cacheKey = JSON.stringify(params);

      // Check cache for initial fetches (non-pagination)
      if (!isLoadMore && cache.current[cacheKey]) {
        const cached = cache.current[cacheKey];
        setDocuments(cached.documents);
        setNextCursor(cached.next_cursor);
        setTotalCount(cached.total);
        setLoading(false);
        return;
      }

      const data = await searchDocuments(params);

      // Cache successful initial fetches
      if (!isLoadMore) {
        cache.current[cacheKey] = data;
      }

      setDocuments(prev => isLoadMore ? [...prev, ...data.documents] : data.documents);
      setNextCursor(data.next_cursor);
      setTotalCount(data.total);
    } catch (err) {
      setError("Failed to fetch documents. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedLevel, selectedDept, nextCursor, departments, isPQLocked]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevel("All");
    setSelectedDept("All");
    setIsPQLocked(false);
  };

  // Effect for Filters/Search - Only fetch if cursor is null (initial load or filter change)
  useEffect(() => {
    const timer = setTimeout(() => {
      // When filters or search change, we reset cursor and list
      setNextCursor(null);
      fetchDocs(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedLevel, selectedDept, isPQLocked]); // Removed fetchDocs from deps to avoid loop on nextCursor update

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", damping: 20, stiffness: 100 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-black text-green-800 mb-6 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Academic Resource Explorer
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Search and discover thousands of academic documents indexed by NUESA's TextBookParser.
        </motion.p>
      </div>

      {/* Search and Filters */}
      <motion.div
        className="bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-green-100 p-8 mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="relative max-w-3xl mx-auto mb-12 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors w-6 h-6" />
          <input
            type="text"
            placeholder={isPQLocked ? "Search locked to Past Questions" : "Enter course code (e.g. EEE 313, GEE 211)..."}
            value={isPQLocked ? "PQ" : searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isPQLocked}
            className={`w-full pl-14 pr-28 py-5 rounded-2xl border-2 outline-none transition-all shadow-sm text-lg font-bold 
              ${isPQLocked
                ? 'bg-gray-100/50 border-gray-100 text-gray-400 cursor-not-allowed italic'
                : 'border-green-50 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 placeholder:text-gray-400 text-gray-800'
              }`}
          />

          <button
            onClick={() => setIsPQLocked(!isPQLocked)}
            className={`absolute right-14 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300 flex items-center gap-2 font-bold text-xs ${isPQLocked ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border border-transparent'}`}
            title={isPQLocked ? "Unlock standard search" : "Lock search to Past Questions"}
          >
            {isPQLocked ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>PQ Only</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>PQ</span>
              </>
            )}
          </button>
          {(searchQuery || selectedLevel !== "All" || selectedDept !== "All") && (
            <button
              onClick={clearFilters}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full transition-colors"
              title="Clear Filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
          <DropdownFilter
            label="Filter by Level"
            icon={Filter}
            options={levels}
            selected={selectedLevel}
            onSelect={setSelectedLevel}
          />

          <div className="hidden md:block w-px h-12 bg-gray-100"></div>

          <DropdownFilter
            label="Filter by Department"
            icon={Hash}
            options={departments}
            selected={selectedDept}
            onSelect={setSelectedDept}
          />
        </div>
      </motion.div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-8 px-4">
        <motion.span
          className="text-sm text-gray-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Found <span className="text-green-700 font-bold">{totalCount}</span> specialized {totalCount === 1 ? 'resource' : 'resources'}
        </motion.span>
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          <AnimatePresence mode="popLayout">
            {loading && documents.length === 0 ? (
              [...Array(6)].map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
            ) : error ? (
              <motion.div
                className="col-span-full py-20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl inline-flex flex-col items-center gap-4 border border-red-100 shadow-sm">
                  <AlertCircle className="w-10 h-10" />
                  <p className="font-bold">{error}</p>
                  <button
                    onClick={() => fetchDocs()}
                    className="text-sm underline hover:text-red-800"
                  >
                    Try again
                  </button>
                </div>
              </motion.div>
            ) : documents.length === 0 ? (
              <motion.div
                className="col-span-full py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-gray-100/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No results matched</h3>
                <p className="text-gray-500 max-w-xs mx-auto">Try refining your filters or using a broader search term.</p>
              </motion.div>
            ) : (
              documents.map((doc) => (
                <motion.div
                  key={doc.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-black bg-green-100 text-green-800 px-2 py-1 rounded-full uppercase tracking-widest">
                          {doc.level}L
                        </span>
                        <span className="text-[9px] font-bold text-gray-400">PDF Document</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2 mb-4 group-hover:text-green-700 transition-colors leading-tight">
                      {doc.file_name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="text-xs font-bold bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-100">
                        {doc.course_code}
                      </span>
                      <span className="text-xs font-bold bg-green-50/50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        {doc.department_code}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Semester</span>
                      <span className="text-sm font-black text-gray-800">{doc.semester}</span>
                    </div>
                    <motion.a
                      href={doc.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-50 hover:bg-green-600 text-green-700 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 group/btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4" />
                      View Resource
                    </motion.a>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Pagination */}
      <AnimatePresence>
        {nextCursor && (
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <button
              onClick={() => fetchDocs(true)}
              disabled={loading}
              className="group relative inline-flex items-center gap-3 bg-green-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-green-600/20 hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Load More Resources</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ResourceExplorer;
