/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, Filter, Loader2, BookOpen, AlertCircle, ChevronRight, Hash, X, Lock, Unlock } from "lucide-react";
import DropdownFilter from "./DropdownFilter";
import ResourceCard from "./ResourceCard";
import { useResourceSearch } from "../../hooks/useResourceSearch";

const SkeletonCard = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col justify-between animate-pulse h-[160px]">
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded-md"></div>
          <div className="w-12 h-8 bg-gray-100 rounded-md"></div>
        </div>
        <div className="w-12 h-3 bg-gray-100 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-4 bg-gray-100 rounded"></div>
        <div className="w-2/3 h-4 bg-gray-100 rounded"></div>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between">
      <div className="w-24 h-3 bg-gray-100 rounded"></div>
      <div className="w-12 h-3 bg-gray-100 rounded"></div>
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

  // Effect for Filters/Search
  // Handled internally by useResourceSearch with AbortController support

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
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
            placeholder={isPQLocked ? "Search locked to Past Questions" : "Quick Search for course codes: eg 'EEE 509' "}
            value={isPQLocked ? "PQ" : searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isPQLocked}
            className={`w-full pl-14 pr-32 py-5 rounded-2xl border-2 outline-none transition-all shadow-sm text-lg font-bold
              ${isPQLocked
                ? 'bg-gray-100/50 border-gray-100 text-gray-400 cursor-not-allowed italic'
                : 'border-green-50 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 placeholder:text-gray-400 text-gray-800'
              }`}
          />

          {loading && documents.length === 0 && (
            <div className="absolute right-36 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-green-500 animate-spin" />
            </div>
          )}

          <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={() => setIsPQLocked(!isPQLocked)}
              className={`p-2 rounded-xl transition-all duration-300 flex items-center gap-2 font-bold text-xs ${isPQLocked ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border border-transparent'}`}
              title={isPQLocked ? "Unlock standard search" : "Lock search to Past Questions"}
            >
              {isPQLocked ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PQ Only</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PQ</span>
                </>
              )}
            </button>
          </div>
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
          Found <span className="text-green-700 font-bold">{totalCount || documents.length}</span> specialized {(totalCount || documents.length) === 1 ? 'resource' : 'resources'}
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
