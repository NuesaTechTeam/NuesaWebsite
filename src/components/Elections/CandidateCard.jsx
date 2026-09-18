import { User } from "lucide-react";
import { motion } from "framer-motion";

const CandidateCard = ({ candidate, positionTitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className='overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-shadow hover:shadow-lg'
    >
      <div className='relative aspect-[4/5] w-full overflow-hidden bg-gray-100 dark:bg-gray-800'>
        {candidate.photo ? (
          <img
            src={candidate.photo}
            alt={candidate.name}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center text-gray-400'>
            <User className='h-12 w-12' />
            <span className='mt-2 text-xs'>Photo coming soon</span>
          </div>
        )}
        <span className='absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white'>
          {positionTitle}
        </span>
      </div>

      <div className='p-4'>
        <h3 className='font-bold text-gray-900 dark:text-white'>
          {candidate.name}
        </h3>

        <div className='mt-3'>
          <h4 className='text-xs font-bold uppercase tracking-wide text-green dark:text-green-400'>
            Manifesto
          </h4>
          <p className='mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
            {candidate.manifesto}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateCard;
