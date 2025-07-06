import React from "react";
import { blogPosts } from "../../lib/blogPosts";
import PostCard from "./PostCard";

const PostList = ({ activeCategory }) => {
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-2 py-2">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-6">
        {activeCategory === "All" ? "All Posts" : activeCategory}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              image={post.image}
              excerpt={post.excerpt}
              author={post.author}
              date={post.date}
              content={post.content}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No posts in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default PostList;
