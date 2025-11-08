import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videosList } from "./videosData";
import VideoCard from "./VideoCard";
import VideoOverlay from "./VideoOverlay";
import SubmitVideoOverlay from "./SubmitVideoOverlay";

const VideosSection = () => {
  const videosPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [submitOverlayOpen, setSubmitOverlayOpen] = useState(false);
  const [sortType, setSortType] = useState("date");

  const sortedVideos = [...videosList].sort((a, b) => {
    if (sortType === "name") return a.title.localeCompare(b.title);
    if (sortType === "date") return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const totalPages = Math.ceil(sortedVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = sortedVideos.slice(startIndex, startIndex + videosPerPage);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setOverlayOpen(true);
  };

  return (
    <section className="py-12 lg:px-4 bg-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green mb-4">NUESA Videos</h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Explore our collection of videos from NUESA events, workshops, and seminars.
          </p>
        </div>

        {/* Sort Pill Buttons */}
        <div className="flex justify-center mb-6 gap-4">
          {["date", "name"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSortType(type);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 rounded-full font-medium transition-all border ${
                sortType === type
                  ? "bg-green text-white border-green shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green/10"
              }`}
            >
              {type === "date" ? "Date Added" : "Name (A-Z)"}
            </button>
          ))}
        </div>

        {/* Videos Grid with Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${sortType}`} // re-render animations on page/sort change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentVideos.map((video, index) => (
              <VideoCard
                key={index}
                {...video}
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-green text-white shadow-sm"
                  : "bg-gray-200 text-gray-700 hover:bg-green/20"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Submit Video Section */}
        <div className="mt-16 text-center">
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100 shadow-md">
            <h2 className="text-2xl font-bold text-green mb-4">
              Want to Feature Your Event?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Submit your video to be featured on our NUESA page.
            </p>
            <button
              onClick={() => setSubmitOverlayOpen(true)}
              className="bg-green text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Submit Video
            </button>
          </div>
        </div>

        {/* Overlays */}
        {selectedVideo && (
          <VideoOverlay
            isOpen={overlayOpen}
            onClose={() => setOverlayOpen(false)}
            videoUrl={selectedVideo.videoUrl}
          />
        )}
        <SubmitVideoOverlay
          isOpen={submitOverlayOpen}
          onClose={() => setSubmitOverlayOpen(false)}
        />
      </div>
    </section>
  );
};

export default VideosSection;
