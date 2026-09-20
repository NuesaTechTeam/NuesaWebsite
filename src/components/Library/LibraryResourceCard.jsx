import { motion } from "framer-motion";
import { FileText, Eye, Download } from "lucide-react";
import { openResourceInline } from "../../lib/libraryApi";

const TYPE_LABELS = {
  lecture_notes: "Lecture Notes",
  past_questions: "Past Questions",
  textbook: "Textbook",
  general: "General",
};

const LibraryResourceCard = ({ doc, variants }) => {
  const fileUrl = doc.download_url;
  const typeLabel = TYPE_LABELS[doc.resource_type] || doc.resource_type || "Resource";

  return (
    <motion.div
      variants={variants}
      layout
      className='group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-green-400 dark:border-gray-800 dark:bg-gray-900'
    >
      <div className='relative z-10'>
        <div className='mb-5 flex items-start justify-between gap-3'>
          <div className='flex flex-wrap items-center gap-2'>
            <div className='rounded-xl border border-gray-100/50 bg-gray-50/80 p-2 text-gray-400 transition-colors duration-200 group-hover:bg-green-50 group-hover:text-green-600 dark:border-gray-800/50 dark:bg-gray-900/80 dark:group-hover:bg-green-900/30 dark:group-hover:text-green-400'>
              <FileText className='h-4 w-4' />
            </div>
            <span className='rounded-md border border-gray-100 bg-gray-50/80 px-2.5 py-1 text-xs font-bold text-gray-600 transition-colors group-hover:border-green-200 group-hover:bg-green-50/50 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-300'>
              {doc.course_code}
            </span>
          </div>
          <span className='shrink-0 rounded-full bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:bg-gray-900 dark:text-gray-400'>
            {doc.academic_level}L
          </span>
        </div>

        <h3 className='mb-2 line-clamp-2 text-lg font-bold leading-tight text-gray-800 transition-colors group-hover:text-green-700 dark:text-gray-100 dark:group-hover:text-green-400'>
          {doc.title}
        </h3>
        {doc.course_name && (
          <p className='line-clamp-1 text-sm font-medium text-gray-500 dark:text-gray-400'>
            {doc.course_name}
          </p>
        )}
      </div>

      <div className='relative z-10 mt-6 flex items-center justify-between gap-4 border-t border-gray-100 pt-5 transition-colors duration-200 dark:border-gray-800'>
        <div className='flex min-w-0 flex-col gap-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400'>
          <span className='truncate text-green-700 dark:text-green-400'>{typeLabel}</span>
          <span className='flex items-center gap-1.5 truncate'>
            <span className='truncate'>{doc.department}</span>
            {doc.file_size_mb ? (
              <>
                <span className='h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700' />
                <span className='shrink-0'>{doc.file_size_mb} MB</span>
              </>
            ) : null}
          </span>
        </div>

        {fileUrl && (
          <div className='flex shrink-0 items-center gap-2'>
            <a
              href={fileUrl}
              download
              className='inline-flex items-center justify-center rounded-full bg-gray-100 p-2.5 text-gray-600 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              aria-label={`Download ${doc.title}`}
              title='Download'
            >
              <Download className='h-3.5 w-3.5' />
            </a>
            <button
              type='button'
              onClick={() => openResourceInline(fileUrl)}
              className='inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-700 transition-colors duration-200 hover:bg-green hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:bg-green-900/30 dark:text-green-400'
              aria-label={`Open ${doc.title}`}
            >
              <Eye className='h-3.5 w-3.5' />
              Open
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LibraryResourceCard;
