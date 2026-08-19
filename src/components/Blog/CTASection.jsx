import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import emailjs from "@emailjs/browser";

const CTASection = ({ scrollIntoView }) => {
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
      `Check out amazing engineering articles on the NUESA Blog! ${window.location.origin}/blog`
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
    <section ref={submitRef} className="py-16 md:py-24 px-4 border-t border-green-100">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Submit */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(15,81,50,0.06)] p-8">
          <h3 className="text-xl font-bold text-green-700 mb-2">
            Submit Your Blog
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Have an opinion, tutorial, or project to share? Let your voice be
            heard by the community.
          </p>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-2 bg-green text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors duration-200 text-sm"
          >
            Submit Now <FaArrowRight />
          </button>
        </div>

        {/* Share */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(15,81,50,0.06)] p-8">
          <h3 className="text-xl font-bold text-green-700 mb-2">
            Share on WhatsApp
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Found this helpful? Share it with course mates and friends.
          </p>
          <button
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-2 border border-green-700 text-green-700 px-6 py-3 rounded-md font-semibold hover:bg-green-50 transition-colors duration-200 text-sm"
          >
            Share Now <FaWhatsapp />
          </button>
        </div>
      </div>

      {/* Submit modal — Radix Dialog for focus trap + a11y */}
      <Dialog.Root
        open={showSubmitModal}
        onOpenChange={(open) => !open && setShowSubmitModal(false)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-modal bg-black/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-modal flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 relative max-h-[90vh] overflow-y-auto shadow-[0_24px_80px_rgba(3,14,7,0.35)]">
              <Dialog.Close
                aria-label="Close"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Dialog.Close>

              <Dialog.Title className="text-2xl font-bold text-green-700 mb-4 pr-8">
                Submit Your Article
              </Dialog.Title>

              {submitted ? (
                <p className="text-green-600 text-center font-semibold py-6">
                  Article submitted successfully!
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
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
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
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
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
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-green-500"
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
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Submit Article
                  </button>
                </form>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};

export default CTASection;