/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Eye } from "lucide-react";

/**
 * A premium card component for displaying resource details.
 */
const ResourceCard = ({
  doc,
  variants
}) => {
  return (
    <motion.div
      layout
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Hover Decorator */}
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
  );
};

export default ResourceCard;
