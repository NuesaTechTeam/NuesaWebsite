/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, Filter, Loader2, BookOpen, AlertCircle, ChevronRight, Hash, X, Lock, Unlock, FileQuestion } from "lucide-react";
import DropdownFilter from "./DropdownFilter";
import ResourceCard from "./ResourceCard";
import { useResourceSearch } from "../../hooks/useResourceSearch";

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between h-[180px] overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
    <div>
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-100/80 rounded-xl"></div>
          <div className="w-16 h-8 bg-gray-100/80 rounded-md"></div>
        </div>
        <div className="w-10 h-6 bg-gray-100/80 rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="w-full h-5 bg-gray-100/80 rounded-md"></div>
        <div className="w-3/4 h-5 bg-gray-100/80 rounded-md"></div>
      </div>
    </div>
    <div className="mt-6 pt-5 border-t border-gray-50 flex justify-between items-center">
      <div className="w-24 h-4 bg-gray-100/80 rounded"></div>
      <div className="w-8 h-8 bg-gray-100/80 rounded-full"></div>
    </div>
  </div>
);

const ResourceExplorer = () => {
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
    setNextCursor,
    totalCount,
    isPQLocked,
    setIsPQLocked,
    fetchDocs,
    levels,
    departments
  } = useResourceSearch();

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevel("All");
    setSelectedDept("All");
    setIsPQLocked(false);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 120 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <section className="w-full pb-24 pt-4 overflow-visible">
      {/* Search and Filters */}
      <motion.div
        className="relative z-50 bg-white/60 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 md:p-10 mb-16 overflow-visible"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-green-50/50 to-transparent rounded-[2rem] pointer-events-none -z-10" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6">
          <div className="relative group flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder={isPQLocked ? "Search locked to Past Questions" : "Search course codes, titles, e.g. 'EEE 509'..."}
              value={isPQLocked ? "PQ" : searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isPQLocked}
              className={`w-full pl-14 pr-36 py-4 rounded-2xl border-2 outline-none transition-all shadow-sm text-base md:text-lg font-semibold
                ${isPQLocked
                  ? 'bg-gray-50/80 border-gray-100 text-gray-400 cursor-not-allowed italic shadow-inner'
                  : 'bg-white/90 border-transparent hover:border-gray-200 focus:bg-white focus:ring-[4px] focus:ring-green-500/15 focus:border-green-400 placeholder:text-gray-400 text-gray-800'
                }`}
            />

            {loading && documents.length === 0 && (
              <div className="absolute right-36 top-1/2 -translate-y-1/2">
                <Loader2 className="w-5 h-5 text-green-500 animate-spin" />
              </div>
            )}

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                onClick={() => setIsPQLocked(!isPQLocked)}
                className={`px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider ${isPQLocked ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-transparent'}`}
                title={isPQLocked ? "Unlock standard search" : "Lock search to Past Questions"}
              >
                {isPQLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">PQ Only</span>
              </button>
              {(searchQuery || selectedLevel !== "All" || selectedDept !== "All") && (
                <button
                  onClick={clearFilters}
                  className="p-2 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors shrink-0"
                  title="Clear Filters"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DropdownFilter
              label="Level"
              icon={Filter}
              options={levels}
              selected={selectedLevel}
              onSelect={setSelectedLevel}
            />
            <DropdownFilter
              label="Dept"
              icon={Hash}
              options={departments}
              selected={selectedDept}
              onSelect={setSelectedDept}
            />
          </div>
        </div>
      </motion.div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-8 px-2 md:px-4">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-gray-500 font-semibold tracking-wide">
            Found <span className="text-gray-900 font-bold">{totalCount || documents.length}</span> results
          </span>
        </motion.div>
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1"
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
                className="col-span-full py-24 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-red-50/50 backdrop-blur-sm text-red-600 p-8 rounded-3xl inline-flex flex-col items-center gap-4 border border-red-100 shadow-sm max-w-sm">
                  <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-2">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-red-900">Oops! Something went wrong</h3>
                  <p className="text-sm text-red-700/80 text-center">{error}</p>
                  <button
                    onClick={() => fetchDocs()}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-semibold shadow-sm hover:bg-red-700 transition-colors"
                  >
                    Try again
                  </button>
                </div>
              </motion.div>
            ) : documents.length === 0 ? (
              <motion.div
                className="col-span-full py-32 text-center flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gray-100 rounded-full blur-xl transform scale-150 opacity-50"></div>
                  <div className="bg-white border border-gray-100 shadow-sm w-24 h-24 rounded-full flex items-center justify-center relative z-10">
                    <FileQuestion className="w-10 h-10 text-gray-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No resources found</h3>
                <p className="text-gray-500 max-w-sm mx-auto font-medium">We couldn't find anything matching your search. Try changing your filters or searching for a different course code.</p>
                {(searchQuery || selectedLevel !== "All" || selectedDept !== "All") && (
                  <button
                    onClick={clearFilters}
                    className="mt-8 px-6 py-2.5 bg-gray-900 border border-gray-900 text-white hover:bg-gray-800 hover:text-white rounded-xl font-semibold transition-colors shadow-lg"
                  >
                    Clear all filters
                  </button>
                )}
              </motion.div>
            ) : (
              documents.map((doc) => (
                <ResourceCard
                  key={doc.id}
                  doc={doc}
                  variants={cardVariants}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Pagination */}
      <AnimatePresence>
        {nextCursor && (
          <motion.div
            className="mt-24 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <button
              onClick={() => fetchDocs(true)}
              disabled={loading}
              className="group relative inline-flex items-center gap-3 bg-white border border-gray-200 text-gray-800 px-8 py-4 rounded-2xl font-bold hover:border-green-300 hover:text-green-700 hover:shadow-lg hover:shadow-green-900/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-sm"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Load More</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 text-gray-400 group-hover:text-green-600 transition-all relative z-10" />
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
