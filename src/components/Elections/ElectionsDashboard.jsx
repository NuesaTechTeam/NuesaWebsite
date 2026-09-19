import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Fingerprint,
  LogOut,
  RefreshCw,
  ShieldCheck,
  UserCog,
  Users,
  Vote,
} from "lucide-react";
import logo from "../../assets/logo.png";
import {
  APPOINTED_POSITIONS,
  CANDIDATES,
  ELECTION_META,
  ELECTED_POSITIONS,
  OTP_STEPS,
  VOTER_CONTACT_FIELDS,
  VOTER_LOGIN_FIELDS,
  VOTER_PROFILE_FIELDS,
  getPositionTotalVotes,
} from "../../lib/electionData";
import { useElectionResults } from "../../hooks/useElectionResults";
import CountUp from "../CountUp";
import PositionResult from "./PositionResult";
import CandidateCard from "./CandidateCard";
import VoterBallot from "./VoterBallot";

const TABS = [
  { id: "results", label: "Live Results", icon: BarChart3 },
  { id: "candidates", label: "Candidates", icon: Users },
  { id: "positions", label: "Positions", icon: Vote },
  { id: "ballot", label: "Voter Ballot", icon: Fingerprint },
  { id: "verification", label: "Verification", icon: ShieldCheck },
];

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
    <div className='relative h-28 w-28'>
      <svg viewBox='0 0 100 100' className='h-28 w-28 -rotate-90'>
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
        <span className='text-xl font-bold text-gray-900 dark:text-white'>
          <CountUp end={Math.round(clamped)} suffix='%' />
        </span>
        <span className='text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400'>
          Turnout
        </span>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => {
  const Icon = icon;

  return (
    <div className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5'>
      <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
        <Icon className='h-4 w-4' />
        <p className='text-sm font-medium'>{label}</p>
      </div>
      <p className='mt-2 text-2xl font-bold text-gray-900 dark:text-white'>
        <CountUp end={value} />
      </p>
    </div>
  );
};

const ResultsTab = ({ votesByPosition }) => (
  <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
    {ELECTED_POSITIONS.map((position, index) => (
      <PositionResult
        key={position.id}
        position={position}
        index={index}
        votesByCandidate={votesByPosition?.[position.id]}
      />
    ))}
  </div>
);

const CandidatesTab = () => (
  <div className='space-y-10'>
    {ELECTED_POSITIONS.map((position) => {
      const candidates = CANDIDATES.filter(
        (candidate) => candidate.positionId === position.id
      );
      if (candidates.length === 0) return null;

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
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                positionTitle={position.title}
              />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

const PositionList = ({ title, subtitle, positions, votable }) => (
  <div className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5'>
    <h2 className='text-lg font-bold text-gray-900 dark:text-white'>{title}</h2>
    <p className='text-sm text-gray-500 dark:text-gray-400'>{subtitle}</p>
    <motion.ul
      className='mt-4 space-y-2'
      initial='hidden'
      animate='visible'
      variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
    >
      {positions.map((position) => (
        <motion.li
          key={position.id}
          variants={fadeUp}
          className='flex items-center justify-between gap-3 rounded-lg border border-gray-100 dark:border-gray-800 px-3 py-2'
        >
          <span className='flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100'>
            <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300'>
              {position.order}
            </span>
            {position.title}
          </span>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              votable
                ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            }`}
          >
            {votable ? "Voting" : "Appointed"}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  </div>
);

const PositionsTab = () => (
  <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
    <PositionList
      title='Elected Executives'
      subtitle='Members vote for these 12 positions.'
      positions={ELECTED_POSITIONS}
      votable
    />
    <PositionList
      title='Appointed Positions'
      subtitle='Appointed by the executive — no voting.'
      positions={APPOINTED_POSITIONS}
    />
  </div>
);

const VerificationTab = ({ onGoToBallot }) => (
  <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
    <motion.div
      variants={fadeUp}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.4 }}
      className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6'
    >
      <div className='flex items-center justify-between gap-3'>
        <h2 className='text-lg font-bold text-gray-900 dark:text-white'>
          Voter sign-in
        </h2>
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
        <p className='text-sm font-semibold text-gray-900 dark:text-white'>
          OTP is sent to
        </p>
        <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {VOTER_CONTACT_FIELDS.map((field) => (
            <div
              key={field.id}
              className='rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2'
            >
              <p className='text-[10px] font-bold uppercase tracking-wide text-gray-400'>
                {field.label}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                {field.placeholder}
              </p>
            </div>
          ))}
        </div>
        <p className='mt-3 text-xs text-gray-500 dark:text-gray-400'>
          On record:{" "}
          {VOTER_PROFILE_FIELDS.map((field) => field.label).join(" · ")}
        </p>
      </div>
    </motion.div>

    <motion.div
      variants={fadeUp}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.4, delay: 0.08 }}
      className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6'
    >
      <h2 className='text-lg font-bold text-gray-900 dark:text-white'>
        Verification flow
      </h2>
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
            <span className='text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
              {step}
            </span>
          </motion.li>
        ))}
      </motion.ol>
      <div className='mt-5 rounded-lg border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-900/20 px-3 py-2 text-xs text-green-800 dark:text-green-300'>
        OTP is delivered by the elections API to the voter&apos;s email and phone.{" "}
        {onGoToBallot && (
          <button
            type='button'
            onClick={onGoToBallot}
            className='font-semibold underline'
          >
            Run the flow in the Voter Ballot tab.
          </button>
        )}
      </div>
    </motion.div>
  </div>
);

const ElectionsDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("results");
  const {
    configured,
    votesByPosition,
    results,
    registeredVoters,
    loading: resultsLoading,
    error: resultsError,
    lastUpdated,
    refresh,
  } = useElectionResults();

  const stats = useMemo(() => {
    const livePresidentVotes = votesByPosition?.president
      ? Object.values(votesByPosition.president).reduce(
          (sum, value) => sum + value,
          0
        )
      : null;
    const ballotsCast = livePresidentVotes ?? getPositionTotalVotes("president");
    const registered = registeredVoters ?? ELECTION_META.registeredVoters;
    const turnout = registered > 0 ? (ballotsCast / registered) * 100 : 0;
    return { ballotsCast, registered, turnout };
  }, [votesByPosition, registeredVoters]);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
        >
          <div>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700 dark:text-green-400'>
                Admin
              </span>
              <span className='inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400'>
                {ELECTION_META.status === "pending"
                  ? "Not live yet"
                  : ELECTION_META.status}
              </span>
            </div>
            <div className='mt-3 flex items-center gap-3'>
              <img
                src={logo}
                alt='NUESA ABUAD'
                className='h-11 w-11 shrink-0 object-contain'
              />
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                {ELECTION_META.title}
              </h1>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Session {ELECTION_META.session} · Live voting dashboard
            </p>
          </div>
          <div className='flex items-center gap-2 self-start'>
            {configured && (
              <button
                onClick={refresh}
                className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <RefreshCw
                  className={`h-4 w-4 ${resultsLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            )}
            <button
              onClick={onLogout}
              className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
            >
              <LogOut className='h-4 w-4' />
              Log out
            </button>
          </div>
        </motion.div>

        {/* status notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            configured
              ? "border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
              : "border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300"
          }`}
        >
          {configured ? (
            <span className='flex flex-wrap items-center gap-2'>
              <span className='inline-flex items-center gap-1.5 font-semibold'>
                <span className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
                Live
              </span>
              {resultsError
                ? `Could not load live results: ${resultsError}`
                : resultsLoading && !results
                  ? "Loading live results…"
                  : `Tallies refresh automatically every 30s${lastUpdated ? ` · last updated ${lastUpdated.toLocaleTimeString()}` : ""}. Candidate names, photos and manifestos are placeholders until the candidate data is provided.`}
            </span>
          ) : (
            "Showing placeholder candidates and sample tallies. Connect the elections API to show live results."
          )}
        </motion.div>

        {/* stats */}
        <motion.div
          className='mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4'
          initial='hidden'
          animate='visible'
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp}>
            <StatCard icon={Users} label='Registered Voters' value={stats.registered} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StatCard icon={Vote} label='Ballots Cast' value={stats.ballotsCast} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StatCard
              icon={UserCog}
              label='Elected Positions'
              value={ELECTED_POSITIONS.length}
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            className='flex items-center justify-between rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5'
          >
            <div>
              <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Turnout
              </p>
              <p className='mt-1 text-2xl font-bold text-gray-900 dark:text-white'>
                <CountUp end={stats.ballotsCast} />
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                of {stats.registered} voters
              </p>
            </div>
            <TurnoutDonut percent={stats.turnout} />
          </motion.div>
        </motion.div>

        {/* tabs */}
        <div className='mt-8 flex gap-1 overflow-x-auto scrollbar-hidden border-b border-gray-200 dark:border-gray-800'>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-green dark:text-green-400"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                <Icon className='h-4 w-4' />
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId='elections-tab-underline'
                    className='absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-green'
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* tab content */}
        <div className='mt-6'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {activeTab === "results" && (
                <ResultsTab votesByPosition={votesByPosition} />
              )}
              {activeTab === "candidates" && <CandidatesTab />}
              {activeTab === "positions" && <PositionsTab />}
              {activeTab === "ballot" && <VoterBallot />}
              {activeTab === "verification" && (
                <VerificationTab onGoToBallot={() => setActiveTab("ballot")} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ElectionsDashboard;
