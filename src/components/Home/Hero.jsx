import { ChevronDown } from "lucide-react";
import AnimatedBackground from "../AnimatedBackground";

const Hero = () => {
  return (
    <section className='relative overflow-hidden bg-white py-8 pb-18 dark:bg-gray-900 lg:px-4'>
      <AnimatedBackground />
      <div className='relative z-10 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <div className='space-y-6'>
              <h1 className='text-4xl lg:text-6xl font-bold text-green dark:text-green-400 leading-tight'>
                Nigerian Universities Engineering Students Association
                <span className='text-shimmer mt-2 block'>ABUAD Chapter</span>
              </h1>
              <p className='text-lg text-gray-700 dark:text-gray-200 leading-relaxed max-w-lg'>
                Empowering future engineers through innovation, collaboration,
                and excellence in the field of engineering.
              </p>
            </div>
          </div>
          <div className='relative'>
            <div className='animate-floaty absolute z-10 -top-6 -left-2 md:-left-6'>
              <div className='transform rotate-[-5deg] rounded-lg bg-white p-4 shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105 dark:bg-gray-900'>
                <span className='font-bold text-green dark:text-green-400'>
                  Engineering Excellence
                </span>
              </div>
            </div>
            <div className='animate-floaty absolute z-10 -bottom-6 -right-2 md:-right-6' style={{ animationDelay: "1.3s" }}>
              <div className='transform rotate-[5deg] rounded-lg bg-white p-4 shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105 dark:bg-gray-900'>
                <span className='font-bold text-green dark:text-green-400'>High Standards</span>
              </div>
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
        <div className='text-green dark:text-green-400 text-sm mb-2'>Scroll Down</div>
        <ChevronDown className='w-6 h-6 text-green dark:text-green-400 mx-auto animate-bounce' />
      </div>
    </section>
  );
};
export default Hero;
