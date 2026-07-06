import React from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";

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
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-6 transition-[border-color,transform] duration-200 hover:border-green-400 hover:-translate-y-0.5 overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gray-50/80 text-gray-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors duration-200 border border-gray-100/50">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-gray-600 bg-gray-50/80 px-2.5 py-1 rounded-md border border-gray-100 group-hover:border-green-200 group-hover:bg-green-50/50 transition-colors">
              {doc.course_code}
            </span>
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-full">
            {doc.level}L
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-green-700 transition-colors line-clamp-2">
          {doc.file_name}
        </h3>
      </div>

      <div className="relative z-10 mt-6 pt-5 border-t border-gray-100 flex items-center justify-between gap-4 transition-colors duration-200">
        <div className="min-w-0 flex items-center gap-2 text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
          <span className="text-green-700">{doc.department_code || "GEN"}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="truncate">{doc.semester || "Resource"}</span>
        </div>

        <a
          href={doc.file_path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-700 transition-colors duration-200 hover:bg-green hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
          aria-label={`Open ${doc.file_name}`}
        >
          Open
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
