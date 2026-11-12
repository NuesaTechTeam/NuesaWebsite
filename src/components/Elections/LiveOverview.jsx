import { motion } from "framer-motion";
import { UserCog, Users, Vote } from "lucide-react";
import { ELECTED_POSITIONS } from "../../lib/electionData";
import CountUp from "../CountUp";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const TurnoutDonut = ({ percent }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(percent, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className='relative h-20 w-20 shrink-0 sm:h-28 sm:w-28'>
      <svg viewBox='0 0 100 100' className='h-20 w-20 -rotate-90 sm:h-28 sm:w-28'>
        <circle
          cx='50'
          cy='50'
          r={radius}
          fill='none'
          strokeWidth='10'
          className='stroke-gray-100 dark:stroke-gray-800'
        />
        <motion.circle
          cx='50'
          cy='50'
          r={radius}
          fill='none'
          strokeWidth='10'
          strokeLinecap='round'
          className='stroke-green'
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </svg>
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <span className='text-base font-bold text-gray-900 dark:text-white sm:text-xl'>
          <CountUp end={Math.round(clamped)} suffix='%' />
        </span>
        <span className='text-[9px] uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-[10px]'>
          Turnout
        </span>
      </div>
    </div>
  );
};

export const StatCard = ({ icon, label, value, children }) => {
  const Icon = icon;

  return (
    <div className='h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5'>
      <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
        <Icon className='h-4 w-4' />
        <p className='text-sm font-medium'>{label}</p>
      </div>
      <p className='mt-2 text-2xl font-bold text-gray-900 dark:text-white'>
        {typeof value === "number" ? <CountUp end={value} /> : value}
      </p>
      {children}
    </div>
  );
};

/** Registered voters, ballots cast, elected positions and the turnout donut. */
const LiveOverview = ({ registered = 0, ballotsCast = 0 }) => {
  const turnout = registered > 0 ? (ballotsCast / registered) * 100 : 0;

  return (
    <motion.div
      className='grid grid-cols-2 gap-4 lg:grid-cols-4'
      initial='hidden'
      animate='visible'
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
    >
      <motion.div variants={fadeUp}>
        <StatCard icon={Users} label='Registered Voters' value={registered} />
      </motion.div>
      <motion.div variants={fadeUp}>
        <StatCard icon={Vote} label='Ballots Cast' value={ballotsCast} />
      </motion.div>
      <motion.div variants={fadeUp}>
        <StatCard icon={UserCog} label='Elected Positions' value={ELECTED_POSITIONS.length} />
      </motion.div>
      <motion.div
        variants={fadeUp}
        className='flex flex-col items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-center sm:flex-row sm:items-center sm:justify-between sm:p-5 sm:text-left'
      >
        <div>
          <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>Turnout</p>
          <p className='mt-1 text-2xl font-bold text-gray-900 dark:text-white'>
            <CountUp end={ballotsCast} />
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>of {registered} voters</p>
        </div>
        <TurnoutDonut percent={turnout} />
      </motion.div>
    </motion.div>
  );
};

export default LiveOverview;
