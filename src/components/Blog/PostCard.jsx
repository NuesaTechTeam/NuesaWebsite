import React, { useState } from "react";
import ArticleModal from "./ArticleModal";

const PostCard = ({ title, image, excerpt, author, date, content, category, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const large = size === "large";

  return (
    <>
      <article className={`group bg-white rounded-2xl border border-gray-100 hover:border-green-200 shadow-[0_4px_20px_rgba(15,81,50,0.06)] hover:shadow-[0_12px_40px_rgba(15,81,50,0.12)] transition duration-300 overflow-hidden hover:-translate-y-1 flex flex-col h-full`}>
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className={`w-full ${large ? "h-64 md:h-80" : "h-48"} object-cover transition-transform duration-500 group-hover:scale-[1.03]`}
          />
          {category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-green-700 backdrop-blur-sm">
              {category}
            </span>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className={`${large ? "text-xl md:text-2xl" : "text-lg"} font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors leading-snug`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-4">
            <span>{author}</span>
            <time>{date}</time>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 text-green-600 hover:text-green-700 text-sm font-semibold inline-flex items-center gap-1 w-fit"
          >
            Read More
          </button>
        </div>
      </article>

      <ArticleModal post={isOpen ? { title, image, excerpt, author, date, content, category } : null} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default PostCard;