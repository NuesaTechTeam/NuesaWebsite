import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ProjectCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = projects.length;
  const [modalProject, setModalProject] = useState(null);

  const goTo = (index) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const active = projects[currentIndex];

  return (
    <div className="mb-12">
      <div className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={active.image}
          alt={active.title}
          className="w-full md:w-1/2 h-72 md:h-auto object-cover"
        />
        <div className="p-6 flex-1">
          <h3 className="text-2xl font-bold text-green-700 mb-2">{active.title}</h3>
          <p className="text-gray-700 text-sm">{active.summary}</p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex
                ? "bg-green-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-5 overflow-x-auto px-2 scrollbar-hidden">
        {projects.map((proj, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`flex-shrink-0 w-72 bg-white border rounded-xl overflow-hidden text-left transition-all duration-300 ${
              idx === currentIndex
                ? "ring-2 ring-green-500 scale-105"
                : "hover:shadow-md hover:scale-[1.02]"
            }`}
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between min-h-[150px]">
              <div>
                <h4 className="text-green-700 text-lg font-semibold mb-1">
                  {proj.title}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">{proj.summary}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalProject(proj);
                }}
                className="mt-3 w-full py-2 px-4 text-sm border border-green-500 text-green-700 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                View Details
              </button>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {modalProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setModalProject(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={modalProject.image}
                alt={modalProject.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-700 mb-3">
                  {modalProject.title}
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
  {modalProject.summary}
</p>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCarousel;
