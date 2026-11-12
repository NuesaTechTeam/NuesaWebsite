import { User } from "lucide-react";
import { motion } from "framer-motion";

const CandidateCard = ({ candidate, positionTitle, unopposed = false }) => {
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

      <div className='flex items-center justify-between gap-2 p-4'>
        <h3 className='font-bold text-gray-900 dark:text-white'>
          {candidate.name}
        </h3>
        {unopposed && (
          <span className='shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'>
            Unopposed
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default CandidateCard;
