import React, { useEffect, useState } from "react";

const Overview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
      "/images/executives/current/Kienabere.webp",
      "/images/executives/current/Chinenye.webp",
      "/images/executives/current/Daniel.webp",
      "/images/executives/current/Ese.jpg",
      "/images/executives/current/Karissa.jpg",
      "/images/executives/current/Prosper.jpg",
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [images.length]);
  return (
    <section className='max-w-7xl mx-auto flex flex-col md:flex-row max-sm:gap-6 gap-10 items-center'>
      {/* Left: Image */}
      {/* <div className='w-full md:w-1/2'>
        <img
          src='/images/executives/past/Official.jpg'
          alt='NUESA Overview'
          className='w-full h-64 md:h-80 object-cover rounded-xl shadow-md'
        />
      </div> */}
      <div className='relative w-full md:w-1/2 h-84 md:h-105 rounded-lg '>
        {images.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={photo}
            className={`rounded-lg shadow-lg w-full h-full object-fill aspect-square  object-center absolute transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Right: Text */}
      <div className='w-full md:w-1/2 text-center md:text-left'>
        <h2 className='text-3xl md:text-4xl font-bold text-green mb-6'>
          Who We Are
        </h2>
        <p className='text-gray-700 text-base md:text-lg mb-4'>
          NUESA ABUAD Chapter is a student-led organization that represents all
          engineering students at Afe Babalola University. We serve as a bridge
          between students, faculty, and industry professionals, creating
          opportunities for growth and development.
        </p>
        <p className='text-gray-700 text-base md:text-lg'>
          Our association organizes technical workshops, industry tours,
          competitions, and social events that enhance the academic experience
          and prepare students for successful careers in engineering.
        </p>
        {/* Stats Section */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 text-center'>
          <div>
            <h3 className='text-3xl md:text-4xl font-extrabold text-green'>
              1K+
            </h3>
            <p className='text-green font-medium text-sm'>Members</p>
          </div>
          <div>
            <h3 className='text-3xl md:text-4xl font-extrabold text-green'>
              9
            </h3>
            <p className='text-green font-medium text-sm'>Departments</p>
          </div>
          <div>
            <h3 className='text-3xl md:text-4xl font-extrabold text-green'>
              10
            </h3>
            <p className='text-green font-medium text-sm'>Annual Events</p>
          </div>
          <div>
            <h3 className='text-3xl md:text-4xl font-extrabold text-green'>
              13
            </h3>
            <p className='text-green font-medium text-sm'>Years Active</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
