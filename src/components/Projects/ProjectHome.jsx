import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";

const ongoingProjects = [
    {
      title: "NUESA Engineering Hub Mobile App",
      summary:
       "Your all-in-one engineering study app. Features: 📅 Class schedules, 📚 course notes, ❓ past questions, 🤖 AI practice tests, and 📈 smart revision tools. Stay organized and exam-ready!",
      year: 2025,
      students: 2,
      image: "/images/projects/application.webp",
    },
    {
      title: "NUESA Website",
      summary:
        "Your online engineering hub. Features: 📰 News, 📚 study resources, 🗓️ schedules, 🎓 leadership profiles, 🧪 projects, and 📩 direct contact. Stay connected and informed!",
      year: 2025,
      students: 2,
      image: "/images/projects/website.jpg",
    },
]


const pastProjects = [
  {
    title: "Ventilation System",
    summary:
      "Installations of fans in classes around the Engineering college for a more conducive learning environment.",
    status: "past",
    year: 2015,
    image: "/images/projects/2015-2016.jpg",
  },
  {
    title: "Common Room Lounge",
    summary: "Sofas and Couches for Engineering Students to chill.",
    status: "past",
    year: 2022,
    image: "/images/projects/2022-2023-1.jpg",
  },
  {
    title: "Garden Bench",
    summary: "A relaxation bench for Engineering Students during idle hours.",
    status: "past",
    year: 2023,
    image: "/images/projects/2023-2024.jpg",
  },
  {
    title: "Findr",
    summary:
      "A simple platform to help university students connect with their roommates before resumption for better bonding.",
    status: "past",
    year: 2024,
    image: "/images/projects/findr.jpg",
  },
];

const ProjectHome = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % ongoingProjects.length);
    };

    const prevSlide = () => {
      setCurrentSlide(
        (prev) => (prev - 1 + ongoingProjects.length) % ongoingProjects.length
      );
    };

    useEffect(() => {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }, []);

  return (
    <section className='bg-white py-8 lg:px-4 border-t-1 border-green-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Legacy <span className='text-green'>Projects</span>
          </h2>
          <p className='text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed'>
            Explore the innovative projects developed by NUESA ABUAD members
            that showcase our commitment to applying engineering solutions to
            real-world challenges
          </p>
        </div>

        {/* ongoing */}
        <div className='mb-16'>
          <div className='flex items-center justify-between mb-8'>
            <h3 className='text-xl font-semibold text-green flex items-center'>
              <Clock className='w-6 h-6 text-green mr-2' />
              Ongoing Projects
            </h3>
            <div className='flex space-x-2'>
              <button
                onClick={prevSlide}
                className='p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow'
              >
                <ChevronLeft className='w-5 h-5 text-gray-700' />
              </button>
              <button
                onClick={nextSlide}
                className='p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow'
              >
                <ChevronRight className='w-5 h-5 text-gray-700' />
              </button>
            </div>
          </div>

          <div className='relative overflow-hidden rounded-2xl'>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {ongoingProjects.map((project, index) => (
                <div key={index} className='w-full flex-shrink-0'>
                  <div className='bg-white rounded-2xl shadow-md overflow-hidden'>
                    <div className='md:flex'>
                      <div className='md:w-1/2'>
                        <img
                          src={project.image}
                          alt={project.title}
                          className='w-full h-64 md:h-70 object-cover'
                        />
                      </div>
                      <div className='md:w-1/2 p-4'>
                        <h4 className='text-2xl font-bold text-green mb-4'>
                          {project.title}
                        </h4>
                        <p className='text-gray-700 mb-6 leading-relaxed'>
                          {project.summary}
                        </p>

                        <div className='space-y-4'>
                          <div className='flex items-center justify-between pt-4'>
                            <div className='flex items-center text-sm text-gray-600'>
                              <Users className='w-4 h-4 mr-1' />
                              {project.students} members
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-center space-x-2 mt-2'>
            {ongoingProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-green-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* past */}
        <div className='mb-12'>
          <h3 className='text-2xl font-bold text-green mb-8 flex items-center'>
            <CheckCircle className='w-6 h-6 text-green-600 mr-2' />
            Past Projects
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {pastProjects.map((project, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden'
              >
                {/* Project Image */}
                <div className='h-48 overflow-hidden'>
                  <img
                    src={
                      project.image
                    }
                    alt={project.title}
                    className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                  />
                </div>

                {/* Content */}
                <div className='p-6'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='text-sm text-gray-600'>{project.year}</div>
                  </div>

                  <h4 className='text-xl font-bold text-green mb-3'>
                    {project.title}
                  </h4>
                  <p className='text-gray-700 mb-4 leading-relaxed'>
                    {project.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='text-center'>
          <button className='inline-flex items-center px-8 py-4 bg-green text-white font-semibold rounded-lg hover:bg-green-700 duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer'>
            View All Projects
            <ArrowRight className='ml-2 w-5 h-5' />
          </button>
        </div>
      </div>
    </section>
  );
}
export default ProjectHome