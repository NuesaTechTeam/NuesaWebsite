import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {featured.map((post) => (
          <div key={post.id} className="min-w-full">
            <div className="flex flex-col md:flex-row bg-white shadow rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full md:w-1/2 h-64 object-cover"
              />
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-bold text-green-700">{post.title}</h3>
                <p className="text-gray-600 text-sm mt-3">{post.excerpt}</p>
                <p className="text-xs text-gray-400 mt-2">
                  By {post.author} — {post.date}
                </p>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="mt-4 inline-block text-green-600 text-sm font-medium hover:underline"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {featured.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-green-100"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-green-100"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white max-w-3xl w-full rounded-xl shadow-xl overflow-y-auto max-h-[90vh] relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-700 mb-3">
                  {selectedPost.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4 italic">
                  By {selectedPost.author} — {selectedPost.date}
                </p>
                <div
                  className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap"
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
