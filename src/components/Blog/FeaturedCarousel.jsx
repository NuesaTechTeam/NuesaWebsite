import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ArticleModal from "./ArticleModal";

const FeaturedCarousel = ({ posts }) => {
  const featured = posts || [];
  const [index, setIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  if (featured.length === 0) return null;

  const featuredPost = featured[index];

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
  const nextSlide = () =>
    setIndex((prev) => (prev === featured.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full">
      <article className="grid md:grid-cols-2 bg-white rounded-2xl border border-green-100 overflow-hidden shadow-[0_8px_30px_rgba(15,81,50,0.08)]">
        {/* Image side */}
        <div className="relative min-h-[280px] md:min-h-[420px] overflow-hidden">
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-green-700 backdrop-blur-sm">
            {featuredPost.category}
          </span>
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-green-700 mb-4">
            Featured
          </p>
          <h3 className="font-lora text-2xl md:text-4xl text-gray-900 leading-tight mb-4 text-balance">
            {featuredPost.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-[52ch]">
            {featuredPost.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-8">
            <span>{featuredPost.author}</span>
            <span aria-hidden="true" className="text-green-300">
              /
            </span>
            <time>{featuredPost.date}</time>
          </div>

          <button
            onClick={() => setSelectedPost(featuredPost)}
            className="inline-flex items-center justify-center gap-2 bg-green text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors duration-200 w-fit"
          >
            Read Article
          </button>
        </div>
      </article>

      {/* Controls — only when more than one featured */}
      {featured.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous article"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(15,81,50,0.12)] p-3 rounded-full hover:bg-white transition"
          >
            <FaChevronLeft className="text-green-700" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next article"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(15,81,50,0.12)] p-3 rounded-full hover:bg-white transition"
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

      <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
};

export default FeaturedCarousel;