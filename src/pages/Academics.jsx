import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Tutorials from "../components/Academics/Tutorials";
import { TimeTables } from "../components/Academics";
import { Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Academics = () => {

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: "spring", damping: 30, stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#fafcfa] font-sans selection:bg-green-200 selection:text-green-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header
        className="relative text-center pt-32 pb-24 px-4 overflow-hidden"
        variants={itemVariants}
      >
        {/* Dynamic Abstract Background Decor */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
          <motion.div
            className="absolute top-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br from-green-300/30 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-[100px]"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-gradient-to-tl from-teal-200/40 to-green-100/20 rounded-full mix-blend-multiply filter blur-[90px]"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafcfa] to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-green-50 border border-green-200/60 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-green-800 tracking-wide uppercase">Engineering Resources</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
            NUESA <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">Academic</span> Resources
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Access past questions, verified notes, and premium tutorials vetted by the NUESA Tech Team. Built for excellence.
          </p>
        </div>
      </motion.header>

      <main className="pb-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative mb-24">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-green-600 font-bold tracking-wider text-xs uppercase">
                    <Database className="w-4 h-4" />
                    <span>The Full Collection</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Looking for Textbooks or Past Papers?</h3>
                  <p className="text-gray-500 font-medium max-w-md">Our specialized Digital Library contains thousands of vetted textbooks, premium study guides, and legacy archives.</p>
                </div>
                <Link
                  to="/library"
                  className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 shrink-0"
                >
                  <span>Visit Library</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-32">
            <TimeTables />
            <Tutorials />
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default Academics;
