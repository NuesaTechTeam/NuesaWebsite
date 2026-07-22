import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Pause,
  Play,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaGooglePlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ongoingProjects, pastProjects } from "../../lib/projects";

const ProjectHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ongoingProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + ongoingProjects.length) % ongoingProjects.length
    );
  };

  useEffect(() => {
    if (!isAutoPlaying || ongoingProjects.length <= 1) return undefined;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ongoingProjects.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleProjectButton = () => {
    navigate("/projects");
  };

  return (
    <section className='border-t border-green-200 bg-white px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-gray-950'>
            Legacy <span className='text-green'>Projects</span>
          </h2>
          <p className='mx-auto max-w-3xl text-lg leading-relaxed text-gray-700'>
            Explore the projects developed by NUESA ABUAD members and
            administrations, from student software to practical improvements
            around the Engineering College.
          </p>
        </div>

        <div className='mb-16'>
          <div className='mb-8 flex items-center justify-between gap-4'>
            <h3 className='flex items-center text-xl font-semibold text-green'>
              <Clock className='mr-2 h-6 w-6 text-green' />
              Ongoing Projects
            </h3>
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={prevSlide}
                aria-label='Previous ongoing project'
                className='rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition-colors duration-200 hover:border-green hover:text-green'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
              <button
                type='button'
                onClick={nextSlide}
                aria-label='Next ongoing project'
                className='rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition-colors duration-200 hover:border-green hover:text-green'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
              <button
                type='button'
                onClick={() => setIsAutoPlaying((value) => !value)}
                aria-label={isAutoPlaying ? "Pause ongoing project carousel" : "Play ongoing project carousel"}
                className='rounded-full border border-gray-200 bg-white p-2 text-gray-700 transition-colors duration-200 hover:border-green hover:text-green'
              >
                {isAutoPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
              </button>
            </div>
          </div>

          <div className='relative overflow-hidden rounded-lg border border-gray-200'>
            <div
              className='flex transition-transform duration-500 ease-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {ongoingProjects.map((project) => (
                <div key={project.title} className='w-full flex-shrink-0'>
                  <article className='bg-white'>
                    <div className='md:flex'>
                      <div className='md:w-1/2'>
                        <img
                          src={project.image}
                          alt={project.title}
                          className='h-64 w-full object-cover md:h-80'
                        />
                      </div>
                      <div className='flex flex-col justify-between p-6 md:w-1/2'>
                        <div>
                          <h4 className='mb-4 text-2xl font-bold text-gray-950'>
                            {project.title}
                          </h4>
                          <p className='mb-6 line-clamp-6 leading-relaxed text-gray-700'>
                            {project.summary}
                          </p>
                        </div>

                        <div className='flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4'>
                          <div className='flex items-center text-sm text-gray-600'>
                            <Users className='mr-1 h-4 w-4' />
                            {project.students} members
                          </div>
                          <div className='flex flex-wrap items-center gap-2'>
                            {project.appLink && (
                              <a
                                href={project.appLink}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center gap-1.5 rounded-lg bg-green px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-green-dark'
                              >
                                <FaGooglePlay className='h-3.5 w-3.5' />
                                Download App
                              </a>
                            )}
                            {project.link && (
                              <a
                                href={project.link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center gap-1.5 rounded-lg border border-green px-3.5 py-2 text-xs font-semibold text-green transition-colors duration-200 hover:bg-green hover:text-white'
                              >
                                Try Online
                                <ExternalLink className='h-3.5 w-3.5' />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-4 flex justify-center gap-2'>
            {ongoingProjects.map((project, index) => (
              <button
                key={project.title}
                type='button'
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show ${project.title}`}
                className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? "bg-green" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <div className='mb-12'>
          <h3 className='mb-8 flex items-center text-2xl font-bold text-green'>
            <CheckCircle className='mr-2 h-6 w-6 text-green' />
            Completed Projects
          </h3>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {pastProjects.slice(0, 4).map((project) => (
              <article
                key={`${project.title}-${project.year}`}
                className='overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors duration-200 hover:border-green-300'
              >
                <div className='h-48 overflow-hidden'>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='h-full w-full object-cover'
                  />
                </div>

                <div className='p-6'>
                  <div className='mb-4 text-sm text-gray-600'>
                    {project.year}
                  </div>

                  <h4 className='mb-3 text-xl font-bold text-gray-950'>
                    {project.title}
                  </h4>
                  <p className='line-clamp-3 leading-relaxed text-gray-700'>
                    {project.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className='text-center'>
          <button
            type='button'
            onClick={handleProjectButton}
            className='inline-flex items-center rounded-lg bg-green px-8 py-4 font-semibold text-white transition-colors duration-200 hover:bg-green-dark'
          >
            View All Projects
            <ArrowRight className='ml-2 h-5 w-5' />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectHome;
