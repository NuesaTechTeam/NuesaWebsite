import React from "react";
import { blogPosts } from "../../lib/blogPosts";
import FeaturedCarousel from "./FeaturedCarousel";

const FeaturedSection = () => {
  const featuredPosts = blogPosts.filter((post) => post.isFeatured);

  if (featuredPosts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <FeaturedCarousel posts={featuredPosts} />
      </div>
    </section>
  );
};

export default FeaturedSection;