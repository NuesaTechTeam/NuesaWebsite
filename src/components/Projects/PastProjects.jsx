import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { FaCheckCircle, FaFolderOpen, FaList } from "react-icons/fa";

const filters = [
  { label: "All", value: "all", icon: <FaList /> },
  { label: "Completed", value: "completed", icon: <FaCheckCircle /> },
  { label: "Past", value: "past", icon: <FaFolderOpen /> },
];

const projects = [
  {
    title: "Ventilation System",
    summary:
      "Installations of fans in classes around the Engineering college for a more conducive learning environment.",
    status: "past",
    year: 2015,
    image: "/images/projects/2015-2016.webp",
  },
  {
    title: "Common Room Lounge",
    summary: "Sofas and Couches for Engineering Students to chill.",
    status: "past",
    year: 2022,
    image: "/images/projects/2022-2023-1.webp",
  },
  {
    title: "Garden Bench",
    summary: "A relaxation bench for Engineering Students during idle hours.",
    status: "past",
    year: 2023,
    image: "/images/projects/2023-2024.webp",
  },
  {
    title: "Findr",
    summary:
      "A simple platform to help university students connect with their roommates before resumption for better bonding.",
    status: "past",
    year: 2024,
    image: "/images/projects/findr.webp",
  },
];

const PastProjects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = projects.filter(
    (proj) => activeFilter === "all" || proj.status === activeFilter
  );

  return (
    <section className='max-w-7xl mx-auto pb-10 px-4'>
      <h3 className='text-lg font-bold text-green-700 text-center mb-2'>
        Completed & Past Projects
      </h3>
      <h2 className='text-2xl md:text-3xl font-bold text-center text-green mb-3'>
        Our Engineering Achievements
      </h2>
      <p className='text-center text-gray-600 max-w-2xl mx-auto mb-10'>
        Browse through the completed and previously implemented NUESA
        initiatives.
      </p>

      <div className='flex justify-center flex-wrap gap-3 mb-8'>
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
              activeFilter === filter.value
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filtered.length > 0 ? (
          filtered.map((proj, idx) => <ProjectCard key={idx} {...proj} />)
        ) : (
          <p className='text-center col-span-full text-gray-500'>
            No projects found.
          </p>
        )}
      </div>
    </section>
  );
};

export default PastProjects;
