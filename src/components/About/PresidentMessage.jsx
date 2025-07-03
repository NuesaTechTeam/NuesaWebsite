import React from "react";
import { Link } from "react-router-dom";

const PresidentMessage = () => {
  return (
    <section className='max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10'>
      <div className='w-full md:w-1/2'>
        <img
          src='https://via.placeholder.com/400x400' // TODO: Add actual image later //
          alt='NUESA President'
          className='w-full h-auto rounded-xl object-cover shadow-md'
        />
      </div>

      <div className='w-full md:w-1/2'>
        <h2 className='text-3xl md:text-4xl font-bold text-green mb-6'>
          President's Message
        </h2>
        <p className='text-gray-700 text-base md:text-lg mb-4 leading-relaxed'>
          Greetings fellow engineering students! It is a privilege to serve as
          the president of this dynamic body. Our mission is to uphold academic
          excellence, foster collaboration, and create a community where every
          engineer has the tools to succeed.
        </p>
        <p className='text-gray-700 text-base md:text-lg mb-4 leading-relaxed'>
          NUESA is more than a union — it is a family, a force, and a future. I
          encourage every student to get involved, contribute, and grow with us.
          Together, we engineer greatness.
        </p>
        <Link to='/executives'>
          <button className='mt-4 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-green-600 hover:to-teal-700 transition-all'>
            Meet Other Executives
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PresidentMessage;
