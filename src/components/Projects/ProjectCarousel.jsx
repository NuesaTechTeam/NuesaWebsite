import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectModal from "./ProjectModal";

const ProjectCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [modalProject, setModalProject] = useState(null);
  const total = projects.length;

  const goTo = (index) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (!isAutoPlaying || total <= 1) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, total]);

  if (!total) return null;

  const active = projects[currentIndex];

  return (
    <div>
      <div className='relative overflow-hidden rounded-lg border border-gray-200 bg-white'>
        <div className='flex flex-col md:flex-row'>
          <img
            src={active.image}
            alt={active.title}
            className='h-64 w-full object-cover object-center md:h-[20rem] md:w-1/2'
          />

          <div className='flex flex-1 flex-col justify-between p-6'>
            <div>
              <div className='mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-600'>
                <span>{active.year}</span>
                <span>{active.students} members</span>
              </div>
              <h3 className='mb-3 text-2xl font-bold text-gray-950'>
                {active.title}
              </h3>
              <p className='mb-6 line-clamp-7 text-sm leading-relaxed text-gray-700 md:text-base'>
                {active.summary}
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <button
                type='button'
                onClick={() => setModalProject(active)}
                className='rounded-lg border border-green px-5 py-2.5 font-semibold text-green transition-colors duration-200 hover:bg-green hover:text-white'
              >
                View Details
              </button>
              {active.link && (
                <a
                  href={active.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 rounded-lg bg-green px-5 py-2.5 font-semibold text-white transition-colors duration-200 hover:bg-green-dark'
                >
                  Visit Project
                  <ExternalLink className='h-4 w-4' />
                </a>
              )}
            </div>
          </div>
        </div>

        {total > 1 && (
          <>
            <button
              type='button'
              onClick={prevSlide}
              aria-label='Previous project'
              className='absolute left-3 top-32 rounded-full bg-white/90 p-2 text-gray-800 transition-colors duration-200 hover:bg-white md:top-1/2 md:-translate-y-1/2'
            >
              <ChevronLeft className='h-5 w-5' />
            </button>
            <button
              type='button'
              onClick={nextSlide}
              aria-label='Next project'
              className='absolute right-3 top-32 rounded-full bg-white/90 p-2 text-gray-800 transition-colors duration-200 hover:bg-white md:top-1/2 md:-translate-y-1/2'
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className='mt-4 flex items-center justify-center gap-3'>
          <button
            type='button'
            onClick={() => setIsAutoPlaying((value) => !value)}
            aria-label={isAutoPlaying ? "Pause project carousel" : "Play project carousel"}
            className='rounded-full border border-gray-200 p-2 text-gray-700 transition-colors duration-200 hover:border-green hover:text-green'
          >
            {isAutoPlaying ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
          </button>

          {projects.map((project, index) => (
            <button
              key={project.title}
              type='button'
              onClick={() => goTo(index)}
              aria-label={`Show ${project.title}`}
              className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-green" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      <div className='mt-6 flex gap-4 overflow-x-auto px-1 py-4 scrollbar-hidden'>
        {projects.map((project, index) => (
          <button
            type='button'
            key={project.title}
            onClick={() => goTo(index)}
            className={`w-64 flex-shrink-0 overflow-hidden rounded-lg border bg-white text-left transition-colors duration-200 ${
              index === currentIndex
                ? "border-green"
                : "border-gray-200 hover:border-green-300"
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className='h-40 w-full object-cover'
            />
            <div className='p-4'>
              <h4 className='mb-1 text-base font-semibold text-gray-950'>
                {project.title}
              </h4>
              <p className='line-clamp-2 text-sm text-gray-700'>
                {project.summary}
              </p>
            </div>
          </button>
        ))}
      </div>

      <ProjectModal
        isOpen={Boolean(modalProject)}
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
};

export default ProjectCarousel;
