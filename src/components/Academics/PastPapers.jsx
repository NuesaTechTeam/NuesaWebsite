import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import Filters from "./Filters";

const pastPapers = [
  {
    course: "AESA PQ First Semester",
    level: "300L",
    year: "2023",
    link: "https://drive.google.com/uc?export=download&id=1oqMbK8ehiXgkn1H2kxeawkzgkuugGGAU",
  },
  {
    course: "Aeronautics PQ Second Semester",
    level: "300L",
    year: "2022",
    link: "https://drive.google.com/uc?export=download&id=1jxHoJ8VqIrHmizbHqC9oW6-AVC3fgyx4",
  },
  {
    course: "Aeronautics PQ First Semester",
    level: "400L",
    year: "2021",
    link: "https://drive.google.com/uc?export=download&id=1mcqI1XmYrBdc7VpRriv5JEwPhkCaZYIj",
  },
  {
    course: "Aeronautics PQ First Semester",
    level: "500L",
    year: "2021",
    link: "https://drive.google.com/uc?export=download&id=17iGCOIFd-CuICMDQYdX-0x5iYnmzvGfn",
  },
  {
    course: "Aeronautics PQ Second Semester",
    level: "500L",
    year: "2021",
    link: "https://drive.google.com/uc?export=download&id=1BcZQ9QIT91nki8YyZWjWh9AAFNITSA_p",
  },
];

const PastPapers = () => {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const levels = ["All", "100L", "200L", "300L", "400L", "500L"];

  const filtered = selectedLevel === "All"
    ? pastPapers
    : pastPapers.filter(paper => paper.level === selectedLevel);

  return (
    <section className="max-w-7xl mx-auto py-12 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
         Past Questions & Solutions
      </h2>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto text-sm">
        Browse past exam papers across various levels and engineering courses.
      </p>

      <Filters
        filterOptions={levels}
        selected={selectedLevel}
        setSelected={setSelectedLevel}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((paper, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaFilePdf className="text-red-600 text-xl" />
              <h3 className="text-lg font-semibold text-green-800">
                {paper.course}
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Level: {paper.level} | Year: {paper.year}
            </p>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-green-700 font-medium hover:underline"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PastPapers;
