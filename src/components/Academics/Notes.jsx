import React, { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import Filters from "./Filters";

const notesList = [
  {
    title: "Thermodynamics Notes",
    course: "Mechanical Engineering",
    link: "/notes/thermodynamics-notes.pdf",
  },
  {
    title: "Circuit Theory Essentials",
    course: "Electrical Engineering",
    link: "/notes/circuit-theory.pdf",
  },
  {
    title: "Introduction to Programming (Python)",
    course: "Computer Engineering",
    link: "/notes/python-intro.pdf",
  },
];

const Notes = () => {
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

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

  const filteredNotes = notesList.filter((note) => {
    const matchesDept =
      selectedCourse === "All" || note.course === selectedCourse;
    const matchesSearch = note.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const totalPages = Math.ceil(filteredNotes.length / perPage);
  const paginatedNotes = filteredNotes.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
        📚 Notes & Textbooks
      </h2>
      <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto text-sm">
        Download comprehensive lecture notes and recommended textbooks to guide your academic journey.
      </p>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-green-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
        />
      </div>

      {/* Department Filters */}
      <Filters
        filterOptions={departments}
        selected={selectedCourse}
        setSelected={setSelectedCourse}
      />

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedNotes.map((note, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaBookOpen className="text-green-700 text-xl" />
              <h3 className="text-lg font-semibold text-green-800">
                {note.title}
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Department: {note.course}
            </p>
            <a
              href={note.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-green-700 font-medium hover:underline"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-full text-sm ${
                i + 1 === page
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Notes;
