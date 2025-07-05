// src/components/Academics/ResourceCard.jsx
import React from "react";
import { FaDownload } from "react-icons/fa";

const ResourceCard = ({ title, description, course, type, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-green-800 mb-1">{title}</h3>
      {course && <p className="text-sm text-gray-500 mb-1">Department: {course}</p>}
      {description && <p className="text-sm text-gray-700 mb-2">{description}</p>}
      {type && <p className="text-xs text-green-700 italic mb-3">{type}</p>}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-green-600 font-medium hover:underline"
      >
        <FaDownload /> Download
      </a>
    </div>
  );
};

export default ResourceCard;
