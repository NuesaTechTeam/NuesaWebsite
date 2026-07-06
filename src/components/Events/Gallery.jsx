import { useEffect, useState } from "react";
import { galleryPhotos } from "../../lib/constants";
import { ChevronLeft, ChevronRight, Play, Pause, X } from "lucide-react";

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxAutoPlay, setIsLightboxAutoPlay] = useState(false);

  // autoplay for main slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryPhotos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // autoplay for lightbox
  useEffect(() => {
    if (!isLightboxAutoPlay || !isLightboxOpen) return;
    const interval = setInterval(() => {
      setLightboxIndex((prev) => (prev + 1) % galleryPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isLightboxAutoPlay, isLightboxOpen]);

  // main gallery controls
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % galleryPhotos.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length
    );
  const goToSlide = (index) => setCurrentSlide(index);

  // lightbox controls
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsLightboxAutoPlay(false);
  };
  const nextLightbox = () =>
    setLightboxIndex((prev) => (prev + 1) % galleryPhotos.length);
  const prevLightbox = () =>
    setLightboxIndex(
      (prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length
    );

  // keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isLightboxOpen]);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green mb-4">
            Event Photo Gallery
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Relive the memorable moments from our college events through this
            curated collection of photographs
          </p>
          <div className="w-24 h-1 bg-green mx-auto mt-8"></div>
        </div>

        {/* main gallery carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="relative h-96 md:h-[500px]">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <h3 className="text-white">{photo.title}</h3>
                    <p className="font-medium text-gray-200">
                      {photo.eventDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              aria-label="Previous gallery photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-800 transition-colors duration-200 hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="size-8" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next gallery photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-800 transition-colors duration-200 hover:bg-white cursor-pointer"
            >
              <ChevronRight className="size-8" />
            </button>
            <button
              aria-label={isAutoPlaying ? "Pause gallery autoplay" : "Play gallery autoplay"}
              className="absolute top-4 right-4 rounded-full bg-white/80 p-3 text-gray-800 transition-colors duration-200 hover:bg-white cursor-pointer"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? (
                <Pause className="size-7" />
              ) : (
                <Play className="size-7" />
              )}
            </button>
          </div>

          {/* thumbnails */}
          <div className="flex justify-center mt-8 space-x-3 px-4 overflow-x-auto scrollbar-hidden">
            {galleryPhotos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToSlide(index)}
                aria-label={`Show ${photo.title}`}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-opacity duration-200 ${
                  index === currentSlide
                    ? "ring-2 ring-green ring-offset-2 opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {galleryPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to gallery slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide
                    ? "bg-green"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View Full Gallery button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-green px-8 py-4 font-semibold text-white transition-colors duration-200 hover:bg-green-dark"
          >
            View Full Gallery
          </button>
        </div>
      </div>

      {/* full gallery modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-modal flex justify-center items-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg p-6 max-w-6xl w-full overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close full gallery"
              className="absolute top-4 right-4 text-gray-600 hover:text-green-600"
            >
              <X className="size-8" />
            </button>

            <h2 className="text-3xl font-bold text-green text-center mb-6">
              Full Photo Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative group overflow-hidden rounded-lg border border-gray-200 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition duration-300">
                    <p className="font-semibold">{photo.title}</p>
                    <p>{photo.eventDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* lightbox with fade + autoplay */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-modal flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 text-gray-200 hover:text-white transition-colors"
          >
            <X className="size-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            aria-label="Previous lightbox photo"
            className="absolute left-6 text-gray-300 hover:text-white p-3"
          >
            <ChevronLeft className="size-12" />
          </button>

          {/* fade transition */}
          <div className="relative flex items-center justify-center w-full h-full">
            {galleryPhotos.map((photo, index) => (
              <img
                key={photo.id}
                src={photo.src}
                alt={photo.title}
                className={`absolute transition-opacity duration-200 max-h-[85vh] max-w-[90vw] object-contain rounded-lg ${
                  index === lightboxIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            ))}
          </div>


          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            aria-label="Next lightbox photo"
            className="absolute right-6 text-gray-300 hover:text-white p-3"
          >
            <ChevronRight className="size-12" />
          </button>

          <div className="absolute bottom-10 text-center text-gray-200">
            <h3 className="text-xl font-semibold">
              {galleryPhotos[lightboxIndex].title}
            </h3>
            <p>{galleryPhotos[lightboxIndex].eventDate}</p>
          </div>

          {/* autoplay toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxAutoPlay((prev) => !prev);
            }}
            aria-label={isLightboxAutoPlay ? "Pause lightbox autoplay" : "Play lightbox autoplay"}
            className="absolute bottom-6 right-10 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm text-gray-200 transition"
          >
            {isLightboxAutoPlay ? (
              <Pause className="size-7" />
            ) : (
              <Play className="size-7" />
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
