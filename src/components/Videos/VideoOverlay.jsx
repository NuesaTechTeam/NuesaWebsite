import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoOverlay = ({ isOpen, onClose, videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-lg flex flex-col"
          >
            {/* X Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white text-2xl font-bold z-20 hover:text-red-500 transition"
            >
              &times;
            </button>

            {/* Video */}
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              onMouseEnter={() => videoRef.current.play()}
              onMouseLeave={() => videoRef.current.pause()}
              className="w-full max-h-[80vh] object-contain bg-black rounded-b-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoOverlay;
