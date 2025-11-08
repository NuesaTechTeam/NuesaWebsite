import React from "react";
import { blogPosts } from "../../lib/blogPosts";
import FeaturedCarousel from "./FeaturedCarousel";

const FeaturedSection = () => {
  const featuredPosts = blogPosts.filter((post) => post.isFeatured);

  if (featuredPosts.length === 0) return null;

  return (
    <section className="bg-green-50 py-10 px-2">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-6">
          Featured Articles
        </h2>

        <FeaturedCarousel posts={featuredPosts} />
      </div>
    </section>
  );
};

export default FeaturedSection;
