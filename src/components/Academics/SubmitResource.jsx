// src/components/Academics/SubmitResource.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SubmitResource = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    link: "",
    course: "",
    submittedBy: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Resource:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setFormData({
        title: "",
        type: "",
        link: "",
        course: "",
        submittedBy: "",
      });
    }, 2000);
  };

  return (
    <div className="text-center mt-10">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        ✍️ Submit a Resource
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-green-700 mb-4">Submit a New Resource</h3>

              {submitted ? (
                <p className="text-green-600 text-center font-semibold">✅ Submitted Successfully!</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  <input
                    type="text"
                    placeholder="Resource Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Department / Course"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Resource Type (Note, Past Paper, Tutorial)"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  <input
                    type="url"
                    placeholder="Resource Link (e.g. Google Drive or YouTube)"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    required
                    className="w-full border px-4 py-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Submitted By (Optional)"
                    value={formData.submittedBy}
                    onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                    className="w-full border px-4 py-2 rounded"
                  />

                  <button
                    type="submit"
                    className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    Submit Resource
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubmitResource;
