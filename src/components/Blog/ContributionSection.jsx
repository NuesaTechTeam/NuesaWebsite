import React from "react";
import { blogPosts } from "../../lib/blogPosts";
import PostCard from "./PostCard";

const ContributionSection = () => {
  const studentPosts = blogPosts.filter(
    (post) => post.category === "Student Contributions"
  );

  if (studentPosts.length === 0) return null;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-6">
        📝 Student Contributions
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Read opinions, tutorials, and experiences shared by NUESA students like you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentPosts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            image={post.image}
            excerpt={post.excerpt}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
    </section>
  );
};

export default ContributionSection;
