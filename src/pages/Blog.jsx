import React, { useState } from "react";
import {
  FeaturedSection,
  CategorySection,
  CTASection,
  PostList,
} from "../components/Blog";
import { useSearchParams } from "react-router-dom";
import useSEO from "../hooks/useSEO";

const Blog = () => {
  useSEO({
    title: "Blog",
    description: "Read engineering articles, project showcases, tutorials, student achievements, and newsletters from the NUESA community."
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-dm text-xs font-semibold uppercase tracking-[0.18em] text-green-700 mb-5">
              The NUESA Journal
            </p>
            <h1 className="font-dm text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05]">
              Ideas, projects, and stories from our engineers
            </h1>
            <p className="text-gray-600 mt-5 max-w-[52ch] mx-auto leading-relaxed">
              Editorial, tutorials, and student contributions from the NUESA
              community at ABUAD.
            </p>
          </div>
        </div>
      </header>

      <main className="space-y-4">
        <FeaturedSection />
        <CategorySection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <PostList activeCategory={activeCategory} />
        <CTASection scrollIntoView={view === "submit"} />
      </main>
    </div>
  );
};

export default Blog;