import React from "react";
import { motion } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";

/**
 * A minimalist card component for displaying resource details.
 */
const ResourceCard = ({
  doc,
  variants
}) => {
  return (
    <motion.div
      variants={variants}
      layout
      className="group relative flex flex-col justify-between bg-white rounded-lg border border-gray-200 p-5 transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-900/5"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100 group-hover:border-green-100 transition-colors">
              {doc.course_code}
            </span>
          </div>
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
            {doc.level} Level
          </span>
        </div>

        <h3 className="text-base font-medium text-gray-900 mb-2 leading-snug group-hover:text-green-700 transition-colors">
          {doc.file_name}
        </h3>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
          <span className="bg-gray-50 px-2 py-0.5 rounded text-gray-400">{doc.department_code || "General"}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>{doc.semester}</span>
        </div>

        <a
          href={doc.file_path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-green-600 transition-colors"
        >
          <span>Open</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
