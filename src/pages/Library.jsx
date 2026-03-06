import React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, Filter, Loader2, BookOpen, Hash, X, Lock, Unlock, FileQuestion } from "lucide-react";
import DropdownFilter from "../components/Academics/DropdownFilter";
import ResourceCard from "../components/Academics/ResourceCard";
import { useResourceSearch } from "../hooks/useResourceSearch";
import Notes from "../components/Academics/Notes";
import PastPapers from "../components/Academics/PastPapers";
import { Database, History } from "lucide-react";
import coursesData from "../../courses.json";

const SkeletonCard = () => (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 p-6 flex flex-col justify-between h-[180px] overflow-hidden relative shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        <div>
            <div className="flex justify-between items-start mb-5">
                <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-200/50 rounded-xl"></div>
                    <div className="w-16 h-8 bg-gray-200/50 rounded-md"></div>
                </div>
                <div className="w-10 h-6 bg-gray-200/50 rounded-full"></div>
            </div>
            <div className="space-y-3">
                <div className="w-full h-5 bg-gray-200/50 rounded-md"></div>
                <div className="w-3/4 h-5 bg-gray-200/50 rounded-md"></div>
            </div>
        </div>
        <div className="mt-6 pt-5 border-t border-white/30 flex justify-between items-center">
            <div className="w-24 h-4 bg-gray-200/50 rounded"></div>
            <div className="w-8 h-8 bg-gray-200/50 rounded-full"></div>
        </div>
    </div>
);

const Library = () => {
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
        departments
    } = useResourceSearch();

    const [showLegacy, setShowLegacy] = React.useState(false);
    const [showDropdown, setShowDropdown] = React.useState(false);
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
        return coursesData.filter(c =>
            (c.code.toLowerCase().includes(query) || (c.title && c.title.toLowerCase().includes(query)))
        ).slice(0, 5);
    }, [searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setShowDropdown(false);
        fetchDocs(false);
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
    };

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
        <main className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-12 bg-[#F9FAFB] relative overflow-hidden font-sans">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-200/40 mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100/40 mix-blend-multiply filter blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md mb-6"
                    >
                        <BookOpen className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-bold text-gray-800 tracking-wide uppercase">NUESA Digital Library</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight leading-tight mb-6">
                        Discover academic<br />excellence.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                        Access thousands of curated textbooks, past questions, and lecture notes tailored for engineering students.
                    </p>
                </motion.div>

                {/* Mode Toggle */}
                <motion.div
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="inline-flex items-center p-1.5 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm relative">
                        {/* Sliding active background indicator */}
                        <motion.div
                            className="absolute inset-y-1.5 left-1.5 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100"
                            layout
                            initial={false}
                            animate={{
                                width: showLegacy ? "48%" : "51%",
                                x: showLegacy ? "103%" : "0%"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        <button
                            onClick={() => setShowLegacy(false)}
                            className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors duration-300 w-full sm:w-auto justify-center ${!showLegacy
                                ? "text-green-700"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <Database className="w-4 h-4" />
                            Digital Collection
                        </button>
                        <button
                            onClick={() => setShowLegacy(true)}
                            className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors duration-300 w-full sm:w-auto justify-center ${showLegacy
                                ? "text-amber-700"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <History className="w-4 h-4" />
                            Legacy Archive
                        </button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!showLegacy ? (
                        <motion.div
                            key="digital-collection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Search & Filter Hub - Glassmorphism */}
                            <motion.div
                                className="relative z-50 bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 p-6 md:p-8 mb-16 overflow-visible"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", damping: 25, delay: 0.1 }}
                            >
                                <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-center">
                                    <div className="relative group flex-1 w-full" ref={dropdownRef}>
                                        <form onSubmit={handleSearchSubmit} className="relative w-full">
                                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-6 h-6 pointer-events-none" />
                                            <input
                                                type="text"
                                                placeholder={isPQLocked ? "Search locked to Past Questions" : "Search course codes, titles, e.g. 'EEE 509'..."}
                                                value={isPQLocked ? "PQ" : searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(e.target.value);
                                                    setShowDropdown(true);
                                                }}
                                                onFocus={() => setShowDropdown(true)}
                                                disabled={isPQLocked}
                                                className={`w-full pl-16 pr-36 py-5 rounded-2xl border-2 outline-none transition-all shadow-sm text-lg font-semibold
                                        ${isPQLocked
                                                        ? 'bg-gray-100/50 border-gray-200 text-gray-400 cursor-not-allowed italic shadow-inner'
                                                        : 'bg-white/80 border-white/50 hover:border-green-200 focus:bg-white focus:ring-[4px] focus:ring-green-500/20 focus:border-green-400 placeholder:text-gray-400 text-gray-800'
                                                    }`}
                                            />
                                        </form>

                                        {/* Autocomplete Dropdown */}
                                        <AnimatePresence>
                                            {showDropdown && searchQuery.length >= 2 && !isPQLocked && filteredCourses.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-[105%] left-0 w-full bg-[#FDFBF7]/95 backdrop-blur-xl border border-gray-200/60 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden z-50 p-2"
                                                >
                                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pb-2 pt-1">
                                                        Suggested Courses
                                                    </div>
                                                    {filteredCourses.map((course) => (
                                                        <button
                                                            key={course.code}
                                                            onClick={() => handleCourseSelect(course.code)}
                                                            className="w-full text-left px-4 py-3 hover:bg-green-50 rounded-lg transition-colors flex flex-col gap-1 group/item"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-bold text-green-700 bg-green-100/50 px-2 py-0.5 rounded text-sm shrink-0">
                                                                    {course.code}
                                                                </span>
                                                                <span className="text-gray-400 text-xs font-medium group-hover/item:text-green-500 transition-colors">Select ↵</span>
                                                            </div>
                                                            <span className="text-gray-600 text-sm font-medium line-clamp-1">
                                                                {course.title}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {loading && documents.length === 0 && (
                                            <div className="absolute right-36 top-1/2 -translate-y-1/2">
                                                <Loader2 className="w-5 h-5 text-green-500 animate-spin" />
                                            </div>
                                        )}

                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <button
                                                onClick={() => setIsPQLocked(!isPQLocked)}
                                                className={`px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${isPQLocked ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200 shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-transparent'}`}
                                                title={isPQLocked ? "Unlock standard search" : "Lock search to Past Questions"}
                                            >
                                                {isPQLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                                <span className="hidden sm:inline">PQ Only</span>
                                            </button>
                                            {(searchQuery || selectedLevel !== "All" || selectedDept !== "All") && (
                                                <button
                                                    onClick={clearFilters}
                                                    className="p-2.5 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors shrink-0"
                                                    title="Clear Filters"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 w-full md:w-auto">
                                        <div className="w-1/2 md:w-36">
                                            <DropdownFilter
                                                label="Level"
                                                icon={Filter}
                                                options={levels}
                                                selected={selectedLevel}
                                                onSelect={setSelectedLevel}
                                            />
                                        </div>
                                        <div className="w-1/2 md:w-40">
                                            <DropdownFilter
                                                label="Dept"
                                                icon={Hash}
                                                options={departments}
                                                selected={selectedDept}
                                                onSelect={setSelectedDept}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Results Section */}
                            <div className="flex flex-col gap-4 mb-8 px-2 md:px-4">
                                <div className="flex items-center justify-between">
                                    <motion.div
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
                                        <span className="text-sm text-gray-500 font-semibold tracking-wide uppercase">
                                            Found <span className="text-gray-900 font-bold text-base">{totalCount || documents.length}</span> resources
                                        </span>
                                    </motion.div>

                                    <AnimatePresence>
                                        {matchedCourse && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200/60 rounded-xl"
                                            >
                                                <BookOpen className="w-4 h-4 text-green-600" />
                                                <span className="text-xs text-green-800 font-medium">
                                                    Searching for: <strong className="font-bold">{matchedCourse.code}</strong> - {matchedCourse.title}
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
                                            className="sm:hidden overflow-hidden"
                                        >
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200/60 rounded-xl w-full">
                                                <BookOpen className="w-4 h-4 text-green-600 shrink-0" />
                                                <span className="text-xs text-green-800 font-medium truncate">
                                                    Searching for: <strong className="font-bold">{matchedCourse.code}</strong> - {matchedCourse.title}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <LayoutGroup>
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-1"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    layout
                                >
                                    <AnimatePresence mode="popLayout">
                                        {loading && documents.length === 0 ? (
                                            [...Array(8)].map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
                                        ) : error ? (
                                            <motion.div
                                                className="col-span-full py-24 text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <div className="bg-red-50/50 backdrop-blur-sm text-red-600 p-8 rounded-3xl inline-flex flex-col items-center gap-4 border border-red-100 shadow-sm max-w-sm mx-auto">
                                                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-2 shadow-inner">
                                                        <X className="w-8 h-8" />
                                                    </div>
                                                    <h3 className="font-bold text-lg text-red-900">Connection Error</h3>
                                                    <p className="text-sm text-red-700/80 text-center">{error}</p>
                                                    <button
                                                        onClick={() => fetchDocs()}
                                                        className="mt-4 px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition-all"
                                                    >
                                                        Retry
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
                                                    <div className="absolute inset-0 bg-gray-200/50 rounded-full blur-2xl transform scale-150 opacity-60"></div>
                                                    <div className="bg-white/80 border border-white shadow-sm w-28 h-28 rounded-full flex items-center justify-center relative z-10 backdrop-blur-sm">
                                                        <FileQuestion className="w-12 h-12 text-gray-400" />
                                                    </div>
                                                </div>
                                                <h3 className="text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">Nothing Found</h3>
                                                <p className="text-gray-500 max-w-md mx-auto font-medium text-lg leading-relaxed">
                                                    We explored every shelf but couldn't find matches. Broaden your search or check your spelling.
                                                </p>
                                                {(searchQuery || selectedLevel !== "All" || selectedDept !== "All") && (
                                                    <button
                                                        onClick={clearFilters}
                                                        className="mt-8 px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                                    >
                                                        Reset Filters
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
                                        className="mt-20 flex justify-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <button
                                            onClick={() => fetchDocs(true)}
                                            disabled={loading}
                                            className="group relative inline-flex items-center gap-3 bg-white/60 backdrop-blur-md border border-white/80 text-gray-800 px-10 py-4 rounded-full font-bold hover:bg-white hover:shadow-xl hover:shadow-green-900/5 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-sm"
                                        >
                                            {loading ? (
                                                <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
                                            ) : (
                                                <>
                                                    <span className="relative z-10 text-sm tracking-wide uppercase">Load More</span>
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="legacy-archive"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-16"
                        >
                            <div className="max-w-4xl mx-auto">
                                <motion.div
                                    className="bg-amber-50/80 backdrop-blur-sm border border-amber-200/60 p-5 rounded-2xl flex items-start gap-4 shadow-sm"
                                    initial={{ scale: 0.98, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <div className="p-2.5 bg-amber-100/80 rounded-xl text-amber-600 shadow-sm shrink-0">
                                        <History className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-amber-900 text-lg">Legacy Archive Active</h4>
                                        <p className="text-sm text-amber-800/80 leading-relaxed font-medium mt-1">
                                            You are browsing the old static archives of Lecture Notes and Past Papers. New materials are actively being added to the primary Digital Collection above.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Re-using the existing legacy components but inside the new Library boundary */}
                            <div className="[&>section]:!py-0">
                                <Notes />
                                <div className="h-16"></div> {/* Spacer */}
                                <PastPapers />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main >
    );
};

export default Library;
