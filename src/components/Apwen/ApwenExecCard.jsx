import { Building, User } from "lucide-react";
import { motion } from "framer-motion";

const FALLBACK = "/images/executives/current/OIP.webp";

const ApwenExecCard = ({ executive, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: (index % 4) * 0.05 }}
      className='overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200 hover:border-purple-300 dark:hover:border-purple-700'
    >
      <div className='relative'>
        <div className='flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-700'>
          <img
            src={executive.image || FALLBACK}
            alt={`${executive.name} - ${executive.position}, APWEN ABUAD Collegiate`}
            loading='lazy'
            width={300}
            height={375}
            className='h-full w-full object-cover'
            onError={(event) => {
              event.target.src = FALLBACK;
            }}
          />
        </div>
        <div className='absolute right-4 top-4 z-10 max-w-[calc(100%-2rem)] truncate rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-md'>
          {executive.position}
        </div>
      </div>

      <div className='p-6'>
        <h3 className='mb-2 text-xl font-bold text-purple-700 dark:text-purple-400'>
          {executive.name}
        </h3>
        <div className='mb-2 flex items-center text-gray-700 dark:text-gray-200'>
          <Building className='mr-2 size-5' />
          <span className='text-sm'>{executive.department}</span>
        </div>
        {executive.level && (
          <div className='flex items-center text-gray-700 dark:text-gray-200'>
            <User className='mr-2 size-5' />
            <span className='text-sm'>{executive.level}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ApwenExecCard;
