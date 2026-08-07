import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Calendar, Clock, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const FeaturedCarousel = ({ posts }) => {
  const featured = posts || [];
  const [index, setIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
  const nextSlide = () =>
    setIndex((prev) => (prev === featured.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {featured.map((post) => (
          <div key={post.id} className="min-w-full px-1">
            <div className="relative flex flex-col md:flex-row bg-white rounded-2xl border border-green-100 overflow-hidden shadow-[0_8px_30px_rgb(15,81,50,0.08)]">
              {/* Image side */}
              <div className="relative md:w-3/5 min-h-[280px] md:min-h-[360px] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-green-700 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Content side */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 text-balance">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 max-w-[60ch]">
                  {post.excerpt}
                </p>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-2 bg-green text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors duration-200 active:scale-[0.97] w-fit"
                >
                  Read Article
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      {featured.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous article"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg p-3 rounded-full hover:bg-white transition active:scale-[0.97] border border-gray-100"
          >
            <FaChevronLeft className="text-green-700" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next article"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg p-3 rounded-full hover:bg-white transition active:scale-[0.97] border border-gray-100"
          >
            <FaChevronRight className="text-green-700" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to article ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-green" : "w-2 bg-green-200 hover:bg-green-300"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Article modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-modal flex justify-center items-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 md:h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  aria-label="Close article"
                  className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 transition active:scale-[0.97]"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full text-xs font-bold bg-white text-green-700">
                  {selectedPost.category}
                </span>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight text-balance">
                  {selectedPost.title}
                </h2>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-green" />
                    {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-green" />
                    {selectedPost.date}
                  </span>
                </div>

                <div
                  className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeaturedCarousel;