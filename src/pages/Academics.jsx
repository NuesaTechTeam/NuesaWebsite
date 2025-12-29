import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Tutorials from "../components/Academics/Tutorials";
import PastPapers from "../components/Academics/PastPapers";
import Notes from "../components/Academics/Notes";
import { TimeTables, ResourceExplorer } from "../components/Academics";
import { Info, Database, History } from "lucide-react";

const Academics = () => {
  const [showLegacy, setShowLegacy] = useState(false);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring", damping: 25, stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50/50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header
        className="text-center py-20 px-4 bg-gradient-to-br from-green-50 via-white to-green-50/30 border-b border-green-100 relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 -right-20 w-60 h-60 bg-green-200 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10">

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-green-900 mb-6 tracking-tight">
            NUESA Academic Resources
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            The ultimate engineering library. Access notes, past questions, and tutorials vetted by the NUESA Tech Team.
          </p>
          <motion.div
            className="w-24 h-2 bg-green-500 mt-8 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          ></motion.div>
        </div>
      </motion.header>

      <main className="pb-32">
        <div className="max-w-7xl mx-auto pt-10 px-4">
          {/* Navigation Cards or Quick Jump could go here if needed */}
        </div>

        <motion.div variants={itemVariants}>
          <TimeTables />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tutorials />
        </motion.div>

        <div className="relative">
          {showLegacy ? (
            <motion.div
              className="space-y-16"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key="legacy-view"
            >
              <div className="max-w-4xl mx-auto px-4 mt-10">
                <motion.div
                  className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-4 shadow-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-800 text-lg">Legacy Search Active</h4>
                    <p className="text-sm text-amber-700 leading-relaxed font-medium">You are browsing the old static archives. Some newer resources might only be available in the Modern Explorer.</p>
                  </div>
                </motion.div>
              </div>
              <Notes />
              <PastPapers />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key="modern-view"
            >
              <ResourceExplorer />
            </motion.div>
          )}

          <motion.div
            className="text-center mt-24 space-y-10"
            variants={itemVariants}
          >
            <div className="max-w-md mx-auto p-1.5 bg-gray-200/50 backdrop-blur-sm rounded-2xl inline-flex border border-gray-300/30 shadow-inner">
              <button
                onClick={() => setShowLegacy(false)}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 ${!showLegacy
                  ? "bg-white text-green-700 shadow-md scale-105"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }`}
              >
                <Database className="w-4 h-4" />
                Modern Explorer
              </button>
              <button
                onClick={() => setShowLegacy(true)}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 ${showLegacy
                  ? "bg-white text-amber-700 shadow-md scale-105"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }`}
              >
                <History className="w-4 h-4" />
                Legacy Search
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default Academics;
