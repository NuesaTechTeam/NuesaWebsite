import { motion } from "framer-motion";

const VoteBar = ({ name, votes, total, isLeading, rank }) => {
  const percent = total > 0 ? (votes / total) * 100 : 0;

  return (
    <div>
      <div className='mb-1.5 flex items-center justify-between gap-3 text-sm'>
        <span className='flex min-w-0 items-center gap-2'>
          <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300'>
            {rank}
          </span>
          <span className='truncate font-medium text-gray-800 dark:text-gray-100'>
            {name}
          </span>
          {isLeading && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className='shrink-0 rounded-full bg-green-100 dark:bg-green-900/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700 dark:text-green-400'
            >
              Leading
            </motion.span>
          )}
        </span>
        <span className='shrink-0 tabular-nums text-gray-500 dark:text-gray-400'>
          {votes} · {percent.toFixed(1)}%
        </span>
      </div>
      <div className='h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800'>
        <motion.div
          className={`h-full rounded-full ${
            isLeading ? "bg-green" : "bg-green-400"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default VoteBar;
