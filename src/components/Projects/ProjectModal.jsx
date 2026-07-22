import { ExternalLink, X } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div
      className='fixed inset-0 z-modal flex items-center justify-center bg-black/60 px-4 py-6'
      role='dialog'
      aria-modal='true'
      aria-labelledby='project-modal-title'
      onClick={onClose}
    >
      <div
        className='relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white'
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type='button'
          onClick={onClose}
          aria-label='Close project details'
          className='absolute right-4 top-4 rounded-full bg-white/90 p-2 text-gray-700 transition-colors duration-200 hover:bg-white hover:text-green'
        >
          <X className='h-5 w-5' />
        </button>

        <img
          src={project.image}
          alt={project.title}
          className='h-64 w-full object-cover'
        />

        <div className='p-6'>
          <div className='mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-600'>
            {project.year && <span>{project.year}</span>}
            {project.students && <span>{project.students} members</span>}
            {project.status && (
              <span className='rounded-full bg-green-50 px-3 py-1 font-medium capitalize text-green-800'>
                {project.status}
              </span>
            )}
          </div>

          <h2
            id='project-modal-title'
            className='mb-3 text-2xl font-bold text-gray-950'
          >
            {project.title}
          </h2>
          <p className='whitespace-pre-line text-sm leading-relaxed text-gray-700 md:text-base'>
            {project.summary}
          </p>

          <div className='mt-6 flex flex-wrap items-center gap-3'>
            {project.appLink && (
              <a
                href={project.appLink}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-lg bg-green px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-dark'
              >
                <FaGooglePlay className='h-4 w-4' />
                Download App
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-lg border border-green px-5 py-3 font-semibold text-green transition-colors duration-200 hover:bg-green hover:text-white'
              >
                Try Online
                <ExternalLink className='h-4 w-4' />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
