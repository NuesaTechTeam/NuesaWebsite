import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PostCard = ({ title, image, excerpt, author, date, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="bg-white rounded-xl border border-transparent hover:border-green-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
      >
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        <div className="p-4 flex flex-col justify-between min-h-[180px]">
          <div>
            <h3 className="text-lg font-bold text-green-700 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-3">{excerpt}</p>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
            <span>By {author}</span>
            <span>{date}</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 text-green-600 hover:underline text-sm font-medium"
          >
            Read More
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-3xl w-full relative flex flex-col max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-all bg-white rounded-full p-1 shadow-md z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover rounded-t-xl"
              />

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <h2 className="text-2xl font-bold text-green-700 mb-3">
                  {title}
                </h2>
                <p className="text-gray-500 text-sm mb-4 italic">
                  By {author} — {date}
                </p>
                <div
                  className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap"
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
