import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className='bg-white py-8 pb-18  lg:px-4 overflow-hidden relative'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <div className='space-y-6'>
              <h1 className='text-4xl lg:text-6xl font-bold text-green leading-tight'>
                Nigerian Universities Engineering Students Association
                <span className='block text-green-700 mt-2'>ABUAD Chapter</span>
              </h1>
              <p className='text-lg text-gray-700 leading-relaxed max-w-lg'>
                Empowering future engineers through innovation, collaboration,
                and excellence in the field of engineering.
              </p>
            </div>
          </div>
          <div className='relative'>
            <div className='absolute z-10 -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300 '>
              <span className='text-green font-bold'>
                Engineering Excellence
              </span>
            </div>
            <div className='absolute z-10 -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg transform rotate-[5deg] hover:rotate-0 transition-transform duration-300 '>
              <span className='text-green font-bold'>High Standards</span>
            </div>
            <div className='group relative w-full overflow-hidden rounded-lg h-130'>
              
              <img
                src='/images/college/college.jpg'
                alt='College'
                className='w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#0F5132]/80 via-[#0F5132]/20 to-transparent' />
            </div>
          </div>
        </div>
      </div>
      <div className='hidden absolute bottom-8 left-1/2 transform  text-center'>
        <div className='text-green text-sm mb-2'>Scroll Down</div>
        <ChevronDown className='w-6 h-6 text-green mx-auto animate-bounce' />
      </div>
    </section>
  );
};
export default Hero;
