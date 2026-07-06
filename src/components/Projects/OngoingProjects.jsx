import ProjectCarousel from "./ProjectCarousel";
import { ongoingProjects } from "../../lib/projects";

const OngoingProjects = () => {
  return (
    <section className='mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8'>
      <div className='mb-8 text-center'>
        <h2 className='text-2xl font-bold text-gray-950 md:text-3xl'>
          Ongoing Projects
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-gray-600'>
          Current student-led work that gives engineering students better tools,
          stronger access to resources, and a more connected college experience.
        </p>
      </div>
      <ProjectCarousel projects={ongoingProjects} />
    </section>
  );
};

export default OngoingProjects;
