import { useEffect, useState } from "react";
import { listPublishedPosts } from "../lib/blogApi";
import { blogPosts } from "../lib/blogPosts";

const stripHtml = (html) =>
  String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
    });
  } catch {
    return "";
  }
};

const normalizeSubmission = (submission) => ({
  id: `submission-${submission.id}`,
  title: submission.title,
  category: submission.category || "Student Contributions",
  excerpt: stripHtml(submission.content).slice(0, 160),
  content: submission.content,
  image: "/images/blog/logo.jpg",
  author: submission.author,
  date: formatDate(submission.created_at),
  isFeatured: false,
});

/**
 * Static blog posts merged with approved submissions from the API.
 * Static posts render immediately; approved posts are appended when loaded.
 */
export const usePublishedPosts = () => {
  const [posts, setPosts] = useState(blogPosts);

  useEffect(() => {
    let cancelled = false;

    listPublishedPosts()
      .then((data) => {
        if (cancelled) return;
        const approved = (data?.posts || []).map(normalizeSubmission);
        setPosts([...blogPosts, ...approved]);
      })
      .catch((err) => {
        console.error("[PublishedPosts] could not load approved posts:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return posts;
};

export default usePublishedPosts;
