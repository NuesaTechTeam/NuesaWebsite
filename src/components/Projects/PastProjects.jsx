import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { pastProjects } from "../../lib/projects";

const PastProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className='mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8'>
      {/* Legacy Project Heading */}
      <div className='mb-10 text-center'>
        <p className='mb-2 text-sm font-semibold text-green dark:text-green-400'>
          Our History
        </p>
        <h2 className='mb-4 text-2xl font-bold text-gray-950 dark:text-white md:text-3xl'>
          Legacy Project
        </h2>
        <p className='mx-auto max-w-2xl text-gray-600 dark:text-gray-300'>
          A look back at the projects and initiatives that have shaped the
          engineering community over the years, built by students for
          students.
        </p>
      </div>

      {/* Renovated Engineering Auditorium Card */}
      <div className='mx-auto mb-16 max-w-2xl'>
        <article className='group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition-shadow duration-200 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md'>
          <div className='relative'>
            <img
              src='/images/projects/legacy_project.jpg'
              alt='Renovated Engineering Auditorium'
              className='aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]'
            />
          </div>
          <div className='p-5'>
            <p className='mb-2 text-sm font-medium text-gray-500 dark:text-gray-400'>2026</p>
            <h3 className='mb-2 text-lg font-semibold text-gray-950 dark:text-white group-hover:text-green dark:group-hover:text-green-400 transition-colors'>
              Renovated Engineering Auditorium
            </h3>
            <p className='text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
              Upgraded the comfort of the engineering auditorium by installing
              seat cushions for students attending lectures and events.
            </p>
          </div>
        </article>
      </div>

      {/* Past Projects Grid */}
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
