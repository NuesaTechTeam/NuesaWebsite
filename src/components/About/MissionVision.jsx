import React from "react";
import { Target, Sparkles, Users, GraduationCap } from "lucide-react";

const cardData = [
  {
    title: "Mission",
    text: "Empowering students to lead in engineering through excellence, leadership, and vision.",
    icon: <Target className='w-8 h-8 text-green-600 mb-3' />,
  },
  {
    title: "Innovation",
    text: "Encouraging creativity and problem-solving to build practical solutions for society.",
    icon: <Sparkles className='w-8 h-8 text-green-600 mb-3' />,
  },
  {
    title: "Community",
    text: "Fostering a sense of belonging and collaboration across all engineering disciplines.",
    icon: <Users className='w-8 h-8 text-green-600 mb-3' />,
  },
  {
    title: "Learning",
    text: "Promoting continuous academic growth and professional development opportunities.",
    icon: <GraduationCap className='w-8 h-8 text-green-600 mb-3' />,
  },
];

const MissionVision = () => {
  return (
    <section className='bg-gray-50 dark:bg-gray-900 px-4 py-16 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-950 dark:text-white mb-3'>
          Our Pillars
        </h2>
        <p className='mx-auto mb-10 max-w-2xl text-gray-700 dark:text-gray-200'>
          The association is built around practical support for students: clear purpose, useful programs, shared community, and steady academic growth.
        </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {cardData.map((card, index) => (
          <div
            key={index}
            className='rounded-lg border border-green-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center transition-colors duration-200 hover:border-green-300 dark:hover:border-green-700'
          >
            <div className='flex flex-col items-center'>
              {card.icon}
              <h3 className='text-xl font-bold text-green-800 dark:text-green-400 mb-2'>
                {card.title}
              </h3>
              <p className='text-gray-700 dark:text-gray-200 text-sm'>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default MissionVision;
