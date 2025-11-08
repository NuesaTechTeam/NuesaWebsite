import React from "react";

const SubmitVideoOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-green mb-4">Submit a Video</h2>
        <p className="text-gray-700 mb-6">
          This feature is currently under development. Soon, you’ll be able to submit your videos here and feature them on our NUESA page.
        </p>
        <p className="text-gray-500 text-sm">
          Stay tuned!
        </p>
        <button
          onClick={onClose}
          className="mt-6 bg-green text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitVideoOverlay;
