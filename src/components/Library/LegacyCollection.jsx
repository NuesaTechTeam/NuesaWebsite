import React from "react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import {
  Search,
  Filter,
  Loader2,
  BookOpen,
  Hash,
  X,
  Lock,
  Unlock,
  FileQuestion,
  SlidersHorizontal,
} from "lucide-react";
import DropdownFilter from "../Academics/DropdownFilter";
import ResourceCard from "../Academics/ResourceCard";
import { useResourceSearch } from "../../hooks/useResourceSearch";
import coursesData from "../../../courses.json";

const SkeletonCard = () => (
  <div className='relative flex h-[180px] flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900'>
    <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-100/70 to-transparent' />
    <div>
      <div className='mb-5 flex items-start justify-between'>
        <div className='flex gap-3'>
          <div className='h-10 w-10 rounded-xl bg-gray-200/70 dark:bg-gray-700/70' />
          <div className='h-8 w-16 rounded-md bg-gray-200/70 dark:bg-gray-700/70' />
        </div>
        <div className='h-6 w-10 rounded-full bg-gray-200/70 dark:bg-gray-700/70' />
      </div>
      <div className='space-y-3'>
        <div className='h-5 w-full rounded-md bg-gray-200/70 dark:bg-gray-700/70' />
        <div className='h-5 w-3/4 rounded-md bg-gray-200/70 dark:bg-gray-700/70' />
      </div>
    </div>
    <div className='mt-6 flex items-center justify-between border-t border-gray-100 pt-5 dark:border-gray-800'>
      <div className='h-4 w-24 rounded bg-gray-200/70 dark:bg-gray-700/70' />
      <div className='h-8 w-8 rounded-full bg-gray-200/70 dark:bg-gray-700/70' />
    </div>
  </div>
);

const LegacyCollection = () => {
  const shouldReduceMotion = useReducedMotion();
  const {
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
  } = useResourceSearch();

  const [showDropdown, setShowDropdown] = React.useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(0);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCourses = React.useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return coursesData
      .filter(
        (c) =>
          c.code.toLowerCase().includes(query) ||
          (c.title && c.title.toLowerCase().includes(query))
      )
      .slice(0, 5);
  }, [searchQuery]);

  React.useEffect(() => {
    setActiveSuggestionIndex(0);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    fetchDocs(false);
  };

  const handleSearchKeyDown = (event) => {
    if (!showDropdown || filteredCourses.length === 0 || isPQLocked) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestionIndex((current) => {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        return (current + direction + filteredCourses.length) % filteredCourses.length;
      });
    }

    if (event.key === "Enter") {
      event.preventDefault();
      handleCourseSelect(filteredCourses[activeSuggestionIndex].code);
    }

    if (event.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleCourseSelect = (courseCode) => {
    setSearchQuery(courseCode);
    setShowDropdown(false);
    fetchDocs(false, courseCode);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevel("All");
    setSelectedDept("All");
    setIsPQLocked(false);
    setShowDropdown(false);
    fetchDocs(false, "", { level: "All", department: "All", pqLocked: false });
  };

  const hasActiveFilters =
    searchQuery || selectedLevel !== "All" || selectedDept !== "All" || isPQLocked;
  const resultCount = documents.length;
  const resultLabel =
    totalCount > resultCount && resultCount > 0
      ? `Showing ${resultCount} of ${totalCount} resources`
      : `Found ${totalCount || resultCount} resources`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.05 },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 8,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0.15 }
        : { type: "spring", damping: 25, stiffness: 120 },
    },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, transition: { duration: 0.15 } },
  };

  return (
    <div>
      {/* Search & Filter Hub */}
      <motion.div
        className='relative z-40 mb-12 overflow-visible rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:p-6'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, delay: 0.1 }}
      >
        <div className='mb-5 flex items-start gap-3 border-b border-gray-100 pb-5 dark:border-gray-800'>
          <div className='rounded-xl bg-green-50 p-2.5 text-green-700 dark:bg-green-900/30 dark:text-green-400'>
            <SlidersHorizontal className='h-5 w-5' />
          </div>
          <div>
            <h2 className='text-lg font-bold text-gray-950 dark:text-white'>Find a resource</h2>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Search by course code or title, then narrow results by level and department.
            </p>
          </div>
        </div>

        <div className='relative z-40 mx-auto max-w-5xl space-y-5'>
          <div className='group relative w-full' ref={dropdownRef}>
            <label
              htmlFor='library-search'
              className='mb-2 flex items-center gap-2 pl-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400'
            >
              <Search className='h-3.5 w-3.5 text-gray-400' />
              Course or title
            </label>
            <form onSubmit={handleSearchSubmit} className='flex flex-col gap-3 sm:flex-row'>
              <div className='relative flex-1'>
                <Search className='pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-green-500' />
                <input
                  id='library-search'
                  type='text'
                  placeholder={
                    isPQLocked
                      ? "Search locked to Past Questions"
                      : "Search course codes, titles, e.g. 'EEE 509'..."
                  }
                  value={isPQLocked ? "PQ" : searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={handleSearchKeyDown}
                  disabled={isPQLocked}
                  className={`w-full rounded-2xl border-2 py-4 pl-14 pr-4 text-base font-semibold outline-none transition md:text-lg ${
                    isPQLocked
                      ? "cursor-not-allowed border-gray-200 bg-gray-100/50 italic text-gray-400 shadow-inner dark:border-gray-700 dark:bg-gray-800/50"
                      : "border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 hover:border-green-200 focus:border-green-400 focus:bg-white focus:ring-[4px] focus:ring-green-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:bg-gray-900"
                  }`}
                />
              </div>
              <button
                type='submit'
                disabled={loading}
                className='inline-flex items-center justify-center rounded-xl bg-green px-6 py-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto'
              >
                {loading && documents.length === 0 ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <Search className='mr-2 h-4 w-4' />
                )}
                <span>Search</span>
              </button>
            </form>

            <AnimatePresence>
              {showDropdown &&
                searchQuery.length >= 2 &&
                !isPQLocked &&
                filteredCourses.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className='absolute left-0 top-[calc(100%+8px)] z-[80] w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.14)] dark:border-gray-800 dark:bg-gray-900'
                  >
                    <div className='px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-gray-400'>
                      Suggested Courses
                    </div>
                    {filteredCourses.map((course, index) => (
                      <button
                        type='button'
                        key={course.code}
                        onMouseEnter={() => setActiveSuggestionIndex(index)}
                        onClick={() => handleCourseSelect(course.code)}
                        className={`group/item flex w-full flex-col gap-1 rounded-lg px-4 py-3 text-left transition-colors ${
                          index === activeSuggestionIndex
                            ? "bg-green-50 dark:bg-green-900/30"
                            : "hover:bg-green-50 dark:hover:bg-green-900/30"
                        }`}
                      >
                        <div className='flex items-center justify-between'>
                          <span className='shrink-0 rounded bg-green-100/50 px-2 py-0.5 text-sm font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400'>
                            {course.code}
                          </span>
                          <span className='text-xs font-medium text-gray-400 transition-colors group-hover/item:text-green-500'>
                            Select ↵
                          </span>
                        </div>
                        <span className='line-clamp-1 text-sm font-medium text-gray-600 dark:text-gray-300'>
                          {course.title}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end'>
            <div className='min-w-0'>
              <DropdownFilter
                label='Level'
                icon={Filter}
                options={levels}
                selected={selectedLevel}
                onSelect={setSelectedLevel}
              />
            </div>
            <div className='min-w-0'>
              <DropdownFilter
                label='Dept'
                icon={Hash}
                options={departments}
                selected={selectedDept}
                onSelect={setSelectedDept}
              />
            </div>
            <div className='flex flex-wrap gap-2 md:justify-end'>
              <button
                type='button'
                onClick={() => setIsPQLocked(!isPQLocked)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition duration-200 ${
                  isPQLocked
                    ? "border border-amber-200 bg-amber-100 text-amber-700 shadow-sm hover:bg-amber-200 dark:border-amber-800/60 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
                    : "border border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                }`}
                title={isPQLocked ? "Unlock standard search" : "Lock search to Past Questions"}
              >
                {isPQLocked ? <Lock className='h-4 w-4' /> : <Unlock className='h-4 w-4' />}
                <span>PQ Only</span>
              </button>
              {(searchQuery || selectedLevel !== "All" || selectedDept !== "All") && (
                <button
                  type='button'
                  onClick={clearFilters}
                  className='shrink-0 rounded-xl bg-gray-100 px-4 py-3 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400'
                  title='Clear Filters'
                >
                  <span className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider'>
                    <X className='h-4 w-4' />
                    Clear
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className='mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-5 dark:border-gray-800'>
            <span className='text-xs font-bold uppercase tracking-wide text-gray-400'>Active</span>
            {searchQuery && !isPQLocked && (
              <span className='rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200'>
                Search: {searchQuery}
              </span>
            )}
            {isPQLocked && (
              <span className='rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'>
                Past Questions only
              </span>
            )}
            {selectedLevel !== "All" && (
              <span className='rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400'>
                {selectedLevel}L
              </span>
            )}
            {selectedDept !== "All" && (
              <span className='rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400'>
                {selectedDept}
              </span>
            )}
            <button
              type='button'
              onClick={clearFilters}
              className='rounded-full px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/30'
            >
              Clear all
            </button>
          </div>
        )}
      </motion.div>

      {/* Results Section */}
      <div className='mb-8 flex flex-col gap-4 px-2 md:px-4'>
        <div className='flex items-center justify-between'>
          <motion.div
            className='flex items-center gap-3'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className='h-2.5 w-2.5 rounded-full bg-green-500' />
            <span className='text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              <span className='text-base font-bold text-gray-900 dark:text-white'>{resultLabel}</span>
            </span>
          </motion.div>

          <AnimatePresence>
            {matchedCourse && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className='hidden items-center gap-2 rounded-xl border border-green-200/60 bg-green-50 px-3 py-1.5 dark:border-green-800/60 dark:bg-green-900/30 sm:inline-flex'
              >
                <BookOpen className='h-4 w-4 text-green-600' />
                <span className='text-xs font-medium text-green-800 dark:text-green-400'>
                  Searching for: <strong className='font-bold'>{matchedCourse.code}</strong> - {matchedCourse.title}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {matchedCourse && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className='overflow-hidden sm:hidden'
            >
              <div className='inline-flex w-full items-center gap-2 rounded-xl border border-green-200/60 bg-green-50 px-3 py-1.5 dark:border-green-800/60 dark:bg-green-900/30'>
                <BookOpen className='h-4 w-4 shrink-0 text-green-600' />
                <span className='truncate text-xs font-medium text-green-800 dark:text-green-400'>
                  Searching for: <strong className='font-bold'>{matchedCourse.code}</strong> - {matchedCourse.title}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LayoutGroup>
        <motion.div
          className='grid grid-cols-1 gap-6 px-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          layout
        >
          <AnimatePresence mode='popLayout'>
            {loading && documents.length === 0 ? (
              [...Array(8)].map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
            ) : error ? (
              <motion.div
                className='col-span-full py-24 text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className='mx-auto inline-flex max-w-sm flex-col items-center gap-4 rounded-3xl border border-red-100 bg-red-50/50 p-8 text-red-600 shadow-sm backdrop-blur-sm dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400'>
                  <div className='mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500 shadow-inner dark:bg-red-900/40 dark:text-red-400'>
                    <X className='h-8 w-8' />
                  </div>
                  <h3 className='text-lg font-bold text-red-900 dark:text-red-300'>Connection Error</h3>
                  <p className='text-center text-sm text-red-700/80 dark:text-red-300/80'>{error}</p>
                  <button
                    type='button'
                    onClick={() => fetchDocs()}
                    className='mt-4 rounded-xl bg-red-600 px-6 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-red-700'
                  >
                    Retry
                  </button>
                </div>
              </motion.div>
            ) : documents.length === 0 ? (
              <motion.div
                className='col-span-full flex flex-col items-center justify-center py-32 text-center'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className='relative mb-6'>
                  <div className='absolute inset-0 scale-150 transform rounded-full bg-gray-200/50 opacity-60 blur-2xl dark:bg-gray-700/50' />
                  <div className='relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80'>
                    <FileQuestion className='h-12 w-12 text-gray-400' />
                  </div>
                </div>
                <h3 className='mb-3 text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100'>
                  Nothing Found
                </h3>
                <p className='mx-auto max-w-md text-lg font-medium leading-relaxed text-gray-500 dark:text-gray-400'>
                  We explored every shelf but couldn't find matches. Broaden your search or check your spelling.
                </p>
                {(searchQuery || selectedLevel !== "All" || selectedDept !== "All") && (
                  <button
                    type='button'
                    onClick={clearFilters}
                    className='mt-8 rounded-2xl bg-gray-900 px-8 py-3 font-bold text-white transition-colors duration-200 hover:bg-gray-800'
                  >
                    Reset Filters
                  </button>
                )}
              </motion.div>
            ) : (
              documents.map((doc) => <ResourceCard key={doc.id} doc={doc} variants={cardVariants} />)
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>
        {nextCursor && (
          <motion.div
            className='mt-20 flex justify-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <button
              onClick={() => fetchDocs(true)}
              disabled={loading}
              className='group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-200 bg-white px-10 py-4 font-bold text-gray-800 transition-colors duration-200 hover:border-green-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-green-700'
            >
              {loading ? (
                <Loader2 className='h-5 w-5 animate-spin text-green-600' />
              ) : (
                <span className='relative z-10 text-sm uppercase tracking-wide'>Load More</span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LegacyCollection;
