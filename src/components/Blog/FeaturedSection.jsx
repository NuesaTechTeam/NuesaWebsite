import React from "react";
import { blogPosts } from "../../lib/blogPosts";
import FeaturedCarousel from "./FeaturedCarousel";

const FeaturedSection = () => {
  const featuredPosts = blogPosts.filter((post) => post.isFeatured);

  if (featuredPosts.length === 0) return null;

  return (
    <section className="bg-green-50 py-14 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-3 tracking-tight">
            Featured Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked stories, insights, and updates from the NUESA community.
          </p>
        </div>

        <FeaturedCarousel posts={featuredPosts} />
      </div>
    </section>
  );
};

export default FeaturedSection;