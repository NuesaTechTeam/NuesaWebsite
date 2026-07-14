import { useState } from "react";
import { Play, X } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { pastProjects } from "../../lib/projects";

const PastProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className='mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8'>
      {/* Legacy Project Heading */}
      <div className='mb-10 text-center'>
        <p className='mb-2 text-sm font-semibold text-green'>
          Our History
        </p>
        <h2 className='mb-4 text-2xl font-bold text-gray-950 md:text-3xl'>
          Legacy Project
        </h2>
        <p className='mx-auto max-w-2xl text-gray-600'>
          A look back at the projects and initiatives that have shaped the
          engineering community over the years, built by students for
          students.
        </p>
      </div>

      {/* Renovated Engineering Auditorium Card */}
      <div className='mx-auto mb-16 max-w-2xl'>
        <article
          onClick={() => setIsVideoOpen(true)}
          className='group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:border-green-300 hover:shadow-md'
        >
          <div className='relative'>
            <img
              src='/images/projects/legacy_project.jpg'
              alt='Renovated Engineering Auditorium'
              className='aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent' />
            <div className='absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
              <div className='flex items-center gap-3 rounded-lg bg-green px-5 py-3 text-white shadow-lg'>
                <Play className='h-5 w-5' fill='currentColor' />
                <span className='text-sm font-semibold'>Watch Video</span>
              </div>
            </div>
          </div>
          <div className='p-5'>
            <p className='mb-2 text-sm font-medium text-gray-500'>2026</p>
            <h3 className='mb-2 text-lg font-semibold text-gray-950 group-hover:text-green transition-colors'>
              Renovated Engineering Auditorium
            </h3>
            <p className='text-sm leading-relaxed text-gray-600'>
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

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className='fixed inset-0 z-modal flex items-center justify-center bg-black/70 px-4 py-6'
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className='relative w-full max-w-4xl overflow-hidden rounded-lg bg-black'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              onClick={() => setIsVideoOpen(false)}
              aria-label='Close video'
              className='absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30'
            >
              <X className='h-5 w-5' />
            </button>
            <video
              controls
              autoPlay
              playsInline
              className='w-full'
            >
              <source
                src='/videos/Nuesa_Legacy_Project.mp4'
                type='video/mp4'
              />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default PastProjects;
