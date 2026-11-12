import { motion } from "framer-motion";
import { Users, Vote } from "lucide-react";
import {
  CANDIDATES,
  ELECTED_POSITIONS,
  OTP_STEPS,
  VOTER_CONTACT_FIELDS,
  VOTER_LOGIN_FIELDS,
  VOTER_PROFILE_FIELDS,
  isUnopposed,
} from "../../lib/electionData";
import CandidateCard from "./CandidateCard";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const greenButton =
  "btn-lively inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-dark";

/** Admin-only preview of the sign-in fields voters see. */
const SignInPreview = () => (
  <motion.div
    variants={fadeUp}
    initial='hidden'
    animate='visible'
    transition={{ duration: 0.4 }}
    className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6'
  >
    <div className='flex items-center justify-between gap-3'>
      <h2 className='text-lg font-bold text-gray-900 dark:text-white'>Voter sign-in</h2>
      <span className='rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
        Preview
      </span>
    </div>
    <p className='mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
      Matric number is the username and invoice number is the password. The
      details are checked against the verified paid-dues record before a ballot
      is issued. The fields below are a preview of what voters see.
    </p>

    <div className='mt-5 space-y-4'>
      {VOTER_LOGIN_FIELDS.map((field) => (
        <div key={field.id}>
          <label className='mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
            {field.label}
            <span className='rounded-full bg-green-50 dark:bg-green-900/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green dark:text-green-400'>
              {field.hint}
            </span>
          </label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            disabled
            className='w-full cursor-not-allowed rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 placeholder-gray-400'
          />
        </div>
      ))}
    </div>

    <div className='mt-6 border-t border-gray-100 dark:border-gray-800 pt-5'>
      <p className='text-sm font-semibold text-gray-900 dark:text-white'>OTP is sent to</p>
      <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2'>
        {VOTER_CONTACT_FIELDS.map((field) => (
          <div
            key={field.id}
            className='rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2'
          >
            <p className='text-[10px] font-bold uppercase tracking-wide text-gray-400'>{field.label}</p>
            <p className='text-sm text-gray-600 dark:text-gray-300'>{field.placeholder}</p>
          </div>
        ))}
      </div>
      <p className='mt-3 text-xs text-gray-500 dark:text-gray-400'>
        On record: {VOTER_PROFILE_FIELDS.map((field) => field.label).join(" · ")}
      </p>
    </div>
  </motion.div>
);

export const VerificationTab = ({ onViewCandidates, onVoteNow, showPreview = false }) => (
  <div className={showPreview ? "grid grid-cols-1 gap-6 lg:grid-cols-2" : "mx-auto max-w-2xl"}>
    {showPreview && <SignInPreview />}

    <motion.div
      variants={fadeUp}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.4, delay: showPreview ? 0.08 : 0 }}
      className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6'
    >
      <h2 className='text-lg font-bold text-gray-900 dark:text-white'>Verification flow</h2>
      <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
        Every login is verified with a one-time password sent to both the
        voter&apos;s email and phone number.
      </p>
      <motion.ol
        className='mt-5 space-y-3'
        initial='hidden'
        animate='visible'
        variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      >
        {OTP_STEPS.map((step, index) => (
          <motion.li key={index} variants={fadeUp} className='flex gap-3'>
            <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green text-xs font-bold text-white'>
              {index + 1}
            </span>
            <span className='text-sm leading-relaxed text-gray-600 dark:text-gray-300'>{step}</span>
          </motion.li>
        ))}
      </motion.ol>

      <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
        <button type='button' onClick={onViewCandidates} className={greenButton}>
          <Users className='h-4 w-4' />
          View candidate
        </button>
        <button type='button' onClick={onVoteNow} className={greenButton}>
          <Vote className='h-4 w-4' />
          Vote now
        </button>
      </div>
    </motion.div>
  </div>
);

export const CandidatesTab = ({ onVoteNow }) => (
  <div className='space-y-10'>
    {ELECTED_POSITIONS.map((position) => {
      const candidates = CANDIDATES.filter((candidate) => candidate.positionId === position.id);
      if (candidates.length === 0) return null;
      const unopposed = isUnopposed(position.id);

      return (
        <div key={position.id}>
          <motion.h2
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4 }}
            className='mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white'
          >
            <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 text-xs font-bold text-green dark:text-green-400'>
              {position.order}
            </span>
            {position.title}
          </motion.h2>
          {unopposed && (
            <p className='-mt-2 mb-4 text-sm text-gray-500 dark:text-gray-400'>
              Unopposed: voters choose Yes or No for this candidate.
            </p>
          )}
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                positionTitle={position.title}
                unopposed={unopposed}
              />
            ))}
          </div>
        </div>
      );
    })}

    <div className='flex justify-center border-t border-gray-200 pt-8 dark:border-gray-800'>
      <button
        type='button'
        onClick={onVoteNow}
        className='btn-lively inline-flex items-center justify-center gap-2 rounded-lg bg-green px-10 py-3.5 text-base font-semibold text-white transition-colors hover:bg-green-dark'
      >
        <Vote className='h-5 w-5' />
        Vote now
      </button>
    </div>
  </div>
);
