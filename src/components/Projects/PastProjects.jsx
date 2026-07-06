import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { pastProjects } from "../../lib/projects";

const PastProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className='mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8'>
      <div className='mb-10 text-center'>
        <p className='mb-2 text-sm font-semibold text-green'>
          Completed Projects
        </p>
        <h2 className='text-2xl font-bold text-gray-950 md:text-3xl'>
          Our Engineering Achievements
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-gray-600'>
          A record of implemented NUESA initiatives and student-built products
          that improved the academic and social experience of engineering
          students.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {pastProjects.map((project) => (
          <ProjectCard
            key={`${project.title}-${project.year}`}
            {...project}
            onOpen={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        isOpen={Boolean(selectedProject)}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default PastProjects;
