import React from "react";
import { OngoingProjects, PastProjects } from "../components/Projects";

const Projects = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 space-y-24 px-6 md:px-12 py-12">
      <section className="text-center pt-6 pb-2">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
          NUESA Projects
        </h1>
        <div className="w-24 h-1 bg-green-500 mx-auto mt-2 rounded"></div>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm md:text-base">
          Explore the innovative and impactful projects driven by engineering students — from ongoing developments to completed achievements that shape our academic and technical community.
        </p>
      </section>

      <OngoingProjects />
      <PastProjects />
    </div>
  );
};

export default Projects;
