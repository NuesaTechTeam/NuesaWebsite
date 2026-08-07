import React, { useState } from "react";
import { X, User, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const PostCard = ({ title, image, excerpt, author, date, content, category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="group bg-white rounded-xl border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-lg transition duration-200 overflow-hidden hover:-translate-y-1 flex flex-col"
      >
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-green-700 backdrop-blur-sm">
              {category}
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
            {excerpt}
          </p>

          <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-green" />
              {author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-green" />
              {date}
            </span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 text-green-600 hover:text-green-700 text-sm font-semibold inline-flex items-center gap-1 w-fit active:scale-[0.97] transition-transform"
          >
            Read More
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-modal bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative flex flex-col max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-64 md:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close article"
                  className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 transition active:scale-[0.97]"
                >
                  <X className="w-5 h-5" />
                </button>
                {category && (
                  <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full text-xs font-bold bg-white text-green-700">
                    {category}
                  </span>
                )}
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight text-balance">
                  {title}
                </h2>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-green" />
                    {author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-green" />
                    {date}
                  </span>
                </div>

                <div
                  className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PostCard;