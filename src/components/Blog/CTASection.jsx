import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import emailjs from "@emailjs/browser";

const CTASection = ({scrollIntoView}) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    email: "",
    content: "",
  });

  const submitRef = useRef(null);

  useEffect(() => {
    if (scrollIntoView && submitRef.current) {
      submitRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollIntoView]);

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      "Check out amazing engineering articles on the NUESA Blog! 📚💡 https://nuesa.example.com/blog"
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_75ng39s",
        "template_whc8nhu",
        formData,
        "RKwtceqS0hiSjGSMx"
      )
      .then(() => {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setShowSubmitModal(false);
          setFormData({
            title: "",
            author: "",
            category: "",
            email: "",
            content: "",
          });
        }, 2000);
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <section ref={submitRef} className="py-12 px-4 bg-green-50 border-t border-green-100">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">
            ✍️ Submit Your Blog
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Have an opinion, tutorial, or project to share? Let your voice be heard!
          </p>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="text-green-700 font-semibold flex items-center gap-2 hover:underline text-sm"
          >
            Submit Now <FaArrowRight />
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">
            📤 Share on WhatsApp
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Found this helpful? Share it with course mates and friends!
          </p>
          <button
            onClick={handleWhatsAppShare}
            className="text-green-700 font-semibold flex items-center gap-2 hover:underline text-sm"
          >
            Share Now <FaWhatsapp />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6 relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Submit Your Article
              </h2>

              {submitted ? (
                <p className="text-green-600 text-center font-semibold py-6">
                  🎉 Article submitted successfully!
                </p>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
                  <input
                    type="text"
                    name="title"
                    placeholder="Article Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full border rounded px-4 py-2"
                  />
                  <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                    className="w-full border rounded px-4 py-2"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full border rounded px-4 py-2"
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
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
                  <div className="bg-white border border-green-300 rounded min-h-[200px] max-h-[400px] overflow-auto">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(value) =>
                        setFormData({ ...formData, content: value })
                      }
                      placeholder="Write your article here..."
                    />
                  </div>

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
    </section>
  );
};

export default CTASection;
