import React, { useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import Filters from "./Filters";

const tutorialData = [
  {
    title: "Signals and Systems",
    description: "Concepts in Signals & Systems play a very important role in many areas of engineering. Learn these concepts with properly designed lectures.",
    tutor: "Neso Academy",
    date: "April 2025",
    department: "Mechatronics Engineering",
    link: "https://youtube.com/playlist?list=PLBlnK6fEyqRhG6s3jYIU48CqsT5cyiDTO&si=cZL9MgkSiNIcKc2m",
  },
];

const Tutorials = () => {
  const [selectedDept, setSelectedDept] = useState("All");
  const departments = [
  "All",
  "Civil Engineering",
  "Computer Engineering",
  "Aeronautical Engineering",
  "Chemical Engineering",
  "Petroleum Engineering",
  "Mechanical Engineering",
  "Mechatronics Engineering",
  "Electrical Engineering",
  "Biomedical Engineering",
];

  const filtered = selectedDept === "All"
    ? tutorialData
    : tutorialData.filter(tut => tut.department === selectedDept);

  return (
    <section className="max-w-7xl mx-auto py-12 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
        Tutorials
      </h2>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto text-sm">
        Access tutorials provided and gotten from Youtube.
      </p>

      <Filters
        filterOptions={departments}
        selected={selectedDept}
        setSelected={setSelectedDept}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tutorial, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaChalkboardTeacher className="text-green-600 text-xl" />
              <h3 className="text-lg font-semibold text-green-800">
                {tutorial.title}
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">{tutorial.description}</p>
            <p className="text-xs text-gray-500">
              👤 {tutorial.tutor} | 📅 {tutorial.date}
            </p>
            <a
              href={tutorial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-green-600 text-sm font-medium hover:underline"
            >
              Watch Tutorial →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tutorials;
