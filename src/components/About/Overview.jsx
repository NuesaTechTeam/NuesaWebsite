import React, { useEffect, useState } from "react";

const Overview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/images/executives/current/Kienabere.jpg",
    "/images/executives/current/Chinenye.jpg",
    "/images/executives/current/Daniel.jpg",
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
    <section className='px-4 pt-24 pb-16 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center'>
        <div className='relative overflow-hidden rounded-lg border border-green-100 bg-gray-100'>
          <div className='relative aspect-[4/3] w-full'>
            {images.map((photo, index) => (
              <img
                key={photo}
                src={photo}
                alt='NUESA executive'
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        <div className='text-center md:text-left'>
          <p className='mb-3 text-sm font-semibold text-green'>About NUESA ABUAD</p>
          <h1 className='mb-6 text-4xl font-bold text-gray-950 md:text-5xl'>
            A student-led engineering community built for academic and professional growth.
          </h1>
          <p className='mb-4 text-base leading-relaxed text-gray-700 md:text-lg'>
            NUESA ABUAD Chapter represents engineering students at Afe Babalola University. We connect students, faculty, alumni, and industry partners through programs that make engineering school more practical, collaborative, and career-focused.
          </p>
          <p className='text-base leading-relaxed text-gray-700 md:text-lg'>
            From academic support and technical workshops to competitions, tours, and social events, the association creates the structure students need to learn, lead, and contribute.
          </p>

          <div className='mt-8 grid grid-cols-2 gap-4 text-left sm:grid-cols-4'>
            <div className='border-l border-green-200 pl-4'>
              <h3 className='text-3xl font-bold text-green'>1K+</h3>
              <p className='text-sm font-medium text-gray-600'>Members</p>
            </div>
            <div className='border-l border-green-200 pl-4'>
              <h3 className='text-3xl font-bold text-green'>9</h3>
              <p className='text-sm font-medium text-gray-600'>Departments</p>
            </div>
            <div className='border-l border-green-200 pl-4'>
              <h3 className='text-3xl font-bold text-green'>10</h3>
              <p className='text-sm font-medium text-gray-600'>Annual Events</p>
            </div>
            <div className='border-l border-green-200 pl-4'>
              <h3 className='text-3xl font-bold text-green'>13</h3>
              <p className='text-sm font-medium text-gray-600'>Years Active</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
