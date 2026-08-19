import React from "react";
import { blogPosts } from "../../lib/blogPosts";
import PostCard from "./PostCard";

const PostList = ({ activeCategory }) => {
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts.filter((p) => !p.isFeatured)
      : blogPosts.filter(
          (post) => post.category === activeCategory && !post.isFeatured
        );

  const [firstPost, ...rest] = filteredPosts;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {activeCategory === "All" ? "Latest Articles" : activeCategory}
        </h2>
        <p className="text-gray-500 mt-2 max-w-[60ch]">
          {activeCategory === "All"
            ? "Stories, student contributions, and announcements from the community."
            : `Articles filed under ${activeCategory}.`}
        </p>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="col-span-full text-gray-500">No posts in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {firstPost && (
            <div className="md:col-span-2 lg:row-span-2">
              <PostCard {...firstPost} size="large" />
            </div>
          )}
          {rest.map((post) => (
            <div key={post.id} className="lg:col-span-1">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PostList;