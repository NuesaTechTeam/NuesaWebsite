import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Database, History } from "lucide-react";
import useSEO from "../hooks/useSEO";
import { DigitalCollection, LegacyCollection } from "../components/Library";

const Library = () => {
  useSEO({
    title: "NUESA ABUAD Digital Library | Engineering Textbooks & Past Questions",
    description:
      "Access NUESA ABUAD's digital library. Download engineering textbooks, past questions, lecture notes, and study materials for all levels and departments at Afe Babalola University.",
    keywords:
      "NUESA Abuad library, Abuad engineering past questions, ABUAD engineering textbooks, Afe Babalola University engineering library, engineering courses study materials",
    ogImage: "/images/blog/logo.jpg",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "NUESA ABUAD Digital Library",
      description:
        "Access NUESA ABUAD's digital library. Download engineering textbooks, past questions, lecture notes, and study materials for all levels and departments at Afe Babalola University.",
      url: "https://nuesaabuad.ng/library",
      about: {
        "@type": "Thing",
        name: "Engineering Education & Academic Resources",
      },
      provider: {
        "@type": "EducationalOrganization",
        name: "Nigerian Universities Engineering Students Association (NUESA) ABUAD Chapter",
        url: "https://nuesaabuad.ng",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://nuesaabuad.ng/library?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  });

  const [showLegacy, setShowLegacy] = React.useState(false);

  return (
    <main className='relative min-h-screen overflow-hidden bg-[#F9FAFB] px-4 pb-16 pt-24 font-sans dark:bg-gray-950 md:px-8 lg:px-12'>
      <div className='relative z-10 mx-auto max-w-7xl'>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='mb-16 text-center'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm dark:border-gray-800 dark:bg-gray-900'
          >
            <BookOpen className='h-5 w-5 text-green-600' />
            <span className='text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-gray-100'>
              NUESA Digital Library
            </span>
          </motion.div>
          <h1 className='mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white md:text-7xl'>
            NUESA ABUAD Digital Library
          </h1>
          <p className='mx-auto max-w-2xl text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl'>
            Engineering textbooks, past questions, lecture notes, and study materials for ABUAD
            engineering students.
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          className='mb-12 flex justify-center'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className='relative inline-flex items-center rounded-2xl border border-gray-200 bg-gray-100 p-1.5 dark:border-gray-800 dark:bg-gray-800'
            role='group'
            aria-label='Library collection mode'
          >
            {/* Sliding active background indicator */}
            <motion.div
              className='absolute inset-y-1.5 left-1.5 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'
              layout
              initial={false}
              animate={{
                width: showLegacy ? "48%" : "51%",
                x: showLegacy ? "103%" : "0%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              type='button'
              onClick={() => setShowLegacy(false)}
              aria-pressed={!showLegacy}
              className={`relative z-10 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-colors duration-300 sm:w-auto ${
                !showLegacy
                  ? "text-green-700 dark:text-green-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Database className='h-4 w-4' />
              Digital Collection
            </button>
            <button
              type='button'
              onClick={() => setShowLegacy(true)}
              aria-pressed={showLegacy}
              className={`relative z-10 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-colors duration-300 sm:w-auto ${
                showLegacy
                  ? "text-amber-700 dark:text-amber-300"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <History className='h-4 w-4' />
              Legacy Archive
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode='wait'>
          {!showLegacy ? (
            <motion.div
              key='digital-collection'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DigitalCollection />
            </motion.div>
          ) : (
            <motion.div
              key='legacy-archive'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LegacyCollection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Library;
