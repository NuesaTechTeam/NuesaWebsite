import { OngoingProjects, PastProjects } from "../components/Projects";
import useSEO from "../hooks/useSEO";

const Projects = () => {
  useSEO({
    title: "Projects",
    description: "Explore student-led projects, physical designs, and digital platforms built by NUESA members at Afe Babalola University."
  });

  return (
    <div className='min-h-screen bg-white text-gray-800'>
      <section className='px-4 pb-14 pt-16 text-center sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold text-gray-950 md:text-5xl'>
          NUESA Projects
        </h1>
        <p className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg'>
          Explore the student-led projects, tools, and college improvements
          built by NUESA members, from current digital platforms to completed
          initiatives around the Engineering College.
        </p>
      </section>

      <OngoingProjects />
      <PastProjects />
    </div>
  );
};

export default Projects;
