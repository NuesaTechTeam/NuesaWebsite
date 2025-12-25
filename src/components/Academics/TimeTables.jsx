import React from 'react'
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { timeTables } from '../../lib/constants';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { Download, ExternalLink, Calendar, FileText } from 'lucide-react';
import "@react-pdf-viewer/core/lib/styles/index.css";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.js?url";

const TimeTables = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 100 }
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <div className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm mb-3 uppercase tracking-wide px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
          <Calendar className="w-4 h-4" />
          Academic Schedule
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          College Timetables
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Swipe through to find your class schedule and download essential academic documents.
        </p>
      </div>

      <motion.div
        className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {timeTables.map((timetable, index) => (
          <motion.div
            key={timetable.id || index}
            variants={cardVariants}
            className="flex-none w-[280px] md:w-[320px] snap-center"
          >
            <div className="group bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* PDF Preview - Minimal */}
              <div className="h-40 bg-gray-50 relative border-b border-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 z-10">
                  <span className="text-xs font-bold text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                    Preview
                  </span>
                </div>
                <div className="opacity-75 group-hover:opacity-50 transition-opacity duration-300 transform group-hover:scale-105 origin-top">
                  <Worker workerUrl={workerUrl}>
                    <Viewer
                      fileUrl={timetable.link}
                      defaultScale={0.25}
                      initialPage={0}
                      scrollMode="page"
                    />
                  </Worker>
                </div>
              </div>

              {/* Minimal Content */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4 min-h-[3rem]">
                  <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <h3 className="text-base font-semibold text-gray-800 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                    {timetable.title}
                  </h3>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(timetable.link, "_blank")}
                    className="flex-1 py-2 px-3 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
                  >
                    View
                  </button>
                  <a
                    href={timetable.link}
                    download
                    className="flex-1 py-2 px-3 rounded-lg bg-green-700 text-white text-xs font-medium hover:bg-green-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default TimeTables