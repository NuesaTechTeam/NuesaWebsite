import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ArticleFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    email: "",
    content: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Article:", formData);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        title: "",
        author: "",
        category: "",
        email: "",
        content: "",
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Submit Your Article
            </h2>

            {submitted ? (
              <div className="text-center py-8">
                <p className="text-green-600 font-semibold text-lg">
                  🎉 Submission Successful!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <input
                  type="text"
                  name="title"
                  placeholder="Article Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2"
                >
                  <option value="">Select Category</option>
                  <option>Academic Tips</option>
                  <option>Projects & Innovations</option>
                  <option>Events Recaps</option>
                  <option>Career & Internship Tips</option>
                  <option>Student Contributions</option>
                  <option>Tech & Trends</option>
                </select>

                <textarea
                  name="content"
                  placeholder="Write your article here..."
                  rows={6}
                  value={formData.content}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-4 py-2"
                ></textarea>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                  Submit Article
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleFormModal;
