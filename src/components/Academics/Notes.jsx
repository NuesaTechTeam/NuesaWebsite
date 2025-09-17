import React, { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import Filters from "./Filters";

const notesList = [
  {
    title: "A Textbook on Engineering Mechanics",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1YmJ3Z8bw2kIY_Ak7WhTb-ARap5DOPppp",
  },
  {
    title: "Science of Materials",
    course: "200 Level",
    link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  },
  {
    title: "Strength of Materials by RS Khurmi",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1Pc-DhjgK4miLYqug0p9WaoH0rdx6vFXZ",
  },
  {
    title: "A Textbook of Theory of Machines by RS Khurmi",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1ETe5iMmCDaZiqvFWXxgT9M9g4jh4cXGJ",
  },
  {
    title: "Measurement and Instrumentation Principles",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1HWWWJdBuIPm656v4Z0K_0rATTLkP48Fp",
  },
  {
    title: "Introduction to Computer Application",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1MM32wRxV_Fj3l3qHAmTEJdzlj0vtRXqI",
  },
  {
    title: "Fundamentals of Material Science and Engineering",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=17-mSNLxG9h7_1lR80EfLXV1KiN0AQGYD",
  },
  {
    title: "Engineering Mathematics by K.A. Stroud",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1opnVyPqcMYHZB3Mtp3FZP6NS5uhJeTeO",
  },
  {
    title: "Crystal Structure Note 1",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1udeUrxwseSv69l9Mi8SIZ2yKZYywqfog",
  },
  {
    title: "Crystal Structure Note 2",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1F5DJRl8ueZtcXC7s33imlC4P48UlNYnH",
  },
  {
    title: "Introduction to Mechatronics Engineering",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1KlN2U2_VrEHpmjrKKvcg2helrOVZLuOP",
  },
  {
    title: "Measurement and Instrumentation",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1koZ8UJToc9_UauKcj_buV0aXlNJ2s9Os",
  },
  {
    title: "Mechanical Actuation Systems",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=15FkJ_ThWM9BLAWkkJtfFsk9x4ryag733",
  },
  {
    title: "Errors in Measurement",
    course: "200 Level",
    link: "https://docs.google.com/document/d/10udMrnSt9uNzMMmmx-L8uTuFQCBjrPa0/export?format=docx",
  },
  {
    title: "Introduction to NLP",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=12WP0c_BsUbQC3kY2MbMrvrgsL0VdqMop",
  },
  {
    title: "Sensors and Transducers",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1JnOsdwJzJsO4lLmBFdA351ekWwXUc5Se",
  },
  {
    title: "Atomic Structure Class",
    course: "200 Level",
    link: "https://docs.google.com/presentation/d/1BWc3QfhikwuJqoBeO-0zwyyrmgKjlPcS/export/pdf",
  },
  {
    title: "Auxiliary and Modal Verbs",
    course: "200 Level",
    link: "https://docs.google.com/presentation/d/1m6TZkRJo6XBppRX_iGmhP235-vqGnxX2/export/pdf",
  },
  {
    title: "Classification of Engineering Materials",
    course: "200 Level",
    link: "https://docs.google.com/presentation/d/1eIKjBMaIQVawu9zL_2QqPijbRmdm1YWg/export/pdf",
  },
  {
    title: "Engineering Drawing",
    course: "200 Level",
    link: "https://docs.google.com/presentation/d/1SQSq3Xw2hV_n5ZiF9E4hDVQlhUuBiWq7/export/pdf",
  },
  {
    title: "First Conjugation Verbs in Present Tense",
    course: "200 Level",
    link: "https://docs.google.com/presentation/d/1_pzKA1t7717TpE0mw6vxkcN-jZISVaMh/export/pdf",
  },
  {
    title: "Ovie's Mechanics Note 1",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1FDIZPeMQ9Avm511JFwT3v-VZP_bVQoTn",
  },
  {
    title: "Ovie's Thermodynamics Note",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1my2ksufg9M4tRgT3fBM1P4mzwrV0wYWB",
  },
  {
    title: "Mechanical Actuation Systems",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=15FkJ_ThWM9BLAWkkJtfFsk9x4ryag733",
  },
  {
    title: "A Textbook of Fluid Mechanics and Hydraulic Machines",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1hk8erKrSUgpPGAlWtL8o7FQABi26U22p",
  },
  {
    title: "Fluid Mechanics and Hydraulic Machines by Dr.R.K Bansal",
    course: "200 Level",
    link: "https://drive.google.com/uc?export=download&id=1F8elTgeOi_vBhYbjA0u5VcydGH-srgWL",
  },
  {
    title: "Introduction to Visual Basic",
    course: "200 Level",
    link: "https://docs.google.com/presentation/d/1MS_JmyhK01uGgN5GWFGHU-BTm-vgPGaH/export/pdf",
  },
  {
    title: "Introduction to C",
    course: "200 Level",
    link: "https://docs.google.com/document/d/1vqeQF9g-7UE9tW8vXXlMYV_cwDK1G5iM/export?format=docx",
  },
  // {
  //   title: "Variables",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },
  // {
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },{
  //   title: "Science of Materials",
  //   course: "200 Level",
  //   link: "https://docs.google.com/presentation/d/1Sf8WMCuHPG5vlbNfT3ZpuhxK2FxPdMxp/export/pdf",
  // },

];

const Notes = () => {
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const departments = [
    "All",
    "100 Level",
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
    <section className="max-w-7xl mx-auto py-12 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
        Notes & Textbooks
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
