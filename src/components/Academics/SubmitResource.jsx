// src/components/Academics/SubmitResource.jsx
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { uploadDocument } from "../../lib/api";

const SubmitResource = () => {
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    department: "",
    department_code: "",
    level: "",
    semester: "1",
    course_code: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const departments = [
    { name: "Civil Engineering", code: "CVE" },
    { name: "Computer Engineering", code: "COE" },
    { name: "Aeronautical Engineering", code: "AAE" },
    { name: "Chemical Engineering", code: "CHE" },
    { name: "Petroleum Engineering", code: "PTE" },
    { name: "Mechanical Engineering", code: "MEE" },
    { name: "Mechatronics Engineering", code: "MCE" },
    { name: "Electrical Engineering", code: "EEE" },
    { name: "Biomedical Engineering", code: "BME" },
    { name: "General Engineering", code: "GENERAL" },
  ];

  const handleDeptChange = (deptName) => {
    const dept = departments.find((d) => d.name === deptName);
    setFormData({
      ...formData,
      department: deptName,
      department_code: dept ? dept.code : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      await uploadDocument(file, formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setFile(null);
        setFormData({
          department: "",
          department_code: "",
          level: "",
          semester: "1",
          course_code: "",
        });
      }, 3000);
    } catch (err) {
      setError(err.message || "Something went wrong during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="text-center mt-10">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition flex items-center gap-2 mx-auto font-medium shadow-sm hover:shadow-md"
      >
        <Upload className="w-4 h-4" />
        Submit a PDF Resource
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative overflow-hidden border border-green-100"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <motion.button
                onClick={() => !isUploading && setShowForm(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                disabled={isUploading}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div className="mb-8">
                <motion.h3
                  className="text-3xl font-black text-green-800 tracking-tight"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Submit Resource
                </motion.h3>
                <motion.p
                  className="text-gray-500 text-sm mt-2 font-medium"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Help fellow engineers by sharing quality study materials.
                </motion.p>
              </div>

              {submitted ? (
                <motion.div
                  className="py-12 text-center space-y-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">Mission Accomplished!</h4>
                    <p className="text-gray-600 font-medium">Your contribution is being processed.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    className="grid grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black text-green-600 mb-2 uppercase tracking-[0.2em]">PDF Document</label>
                      <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.01 }}
                      >
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setFile(e.target.files[0])}
                          required
                          className="w-full border-2 border-dashed border-gray-200 p-6 rounded-2xl hover:border-green-400 hover:bg-green-50/30 transition-all cursor-pointer text-sm font-medium"
                          disabled={isUploading}
                        />
                        {file && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 bg-green-100 px-3 py-1 rounded-full text-[10px] font-bold">
                            Selected
                          </div>
                        )}
                      </motion.div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] font-black text-green-600 mb-2 uppercase tracking-[0.2em]">Department</label>
                      <select
                        value={formData.department}
                        onChange={(e) => handleDeptChange(e.target.value)}
                        required
                        className="w-full border-2 border-green-50 px-5 py-3.5 rounded-2xl appearance-none bg-gray-50 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                        disabled={isUploading}
                      >
                        <option value="">Choose Department</option>
                        {departments.map((d) => (
                          <option key={d.code} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-green-600 mb-2 uppercase tracking-[0.2em]">Level</label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        required
                        className="w-full border-2 border-green-50 px-5 py-3.5 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                        disabled={isUploading}
                      >
                        <option value="">Lvl</option>
                        <option value="100">100L</option>
                        <option value="200">200L</option>
                        <option value="300">300L</option>
                        <option value="400">400L</option>
                        <option value="500">500L</option>
                        <option value="GENERAL">GNR</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-green-600 mb-2 uppercase tracking-[0.2em]">Semester</label>
                      <select
                        value={formData.semester}
                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                        required
                        className="w-full border-2 border-green-50 px-5 py-3.5 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-medium text-gray-700"
                        disabled={isUploading}
                      >
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] font-black text-green-600 mb-2 uppercase tracking-[0.2em]">Course Code</label>
                      <input
                        type="text"
                        placeholder="e.g. MEE 301"
                        value={formData.course_code}
                        onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
                        required
                        className="w-full border-2 border-green-50 px-5 py-3.5 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-medium text-gray-700 uppercase"
                        disabled={isUploading}
                      />
                    </div>
                  </motion.div>

                  {error && (
                    <motion.div
                      className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isUploading}
                    className="bg-green-600 w-full text-white py-4 rounded-2xl font-black hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    whileHover={{ scale: 1.02, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Submit Resource
                      </>
                    )}
                  </motion.button>
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
