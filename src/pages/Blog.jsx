import React, { useState } from "react";
import {
  FeaturedSection,
  CategorySection,
  ContributionSection,
  CTASection,
  PostList,
} from "../components/Blog";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">
          NUESA Blog
        </h1>
        <p className="text-gray-600 mt-2">
          Sharing ideas, projects, tutorials & achievements from engineering students.
        </p>
        <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded"></div>
      </header>

      <main className="space-y-16">
        <FeaturedSection />
        <CategorySection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <PostList activeCategory={activeCategory} />
        <ContributionSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Blog;
