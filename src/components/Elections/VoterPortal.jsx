import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Clock, Fingerprint, ShieldCheck, Users } from "lucide-react";
import { ElectionContext } from "./ElectionContext";
import VoterBallot from "./VoterBallot";
import { CandidatesTab, VerificationTab } from "./VoterTabs";

// What voters see on election day, in this order.
const TABS = [
  { id: "verification", label: "Verification", icon: ShieldCheck },
  { id: "candidates", label: "Candidates", icon: Users },
  { id: "ballot", label: "Voter Ballot", icon: Fingerprint },
];

const VoterPortal = ({ election, votingOpen = true, onBack }) => {
  const [activeTab, setActiveTab] = useState("verification");

  const goTo = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ElectionContext.Provider value={election}>
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        {onBack && (
          <button
            type='button'
            onClick={onBack}
            className='mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-green dark:text-gray-400 dark:hover:text-green-400'
          >
            <ArrowLeft className='h-4 w-4' /> All elections
          </button>
        )}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {votingOpen ? (
            <span className='inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700 dark:text-green-400'>
              <span className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
              Voting is open
            </span>
          ) : (
            <span className='inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400'>
              <Clock className='h-3.5 w-3.5' />
              {election.ended ? "Voting has ended" : "Voting has not started"}
            </span>
          )}
          <div className='mt-3 flex items-center gap-3'>
            <img src={election.logo} alt={election.shortName} className='h-11 w-11 shrink-0 object-contain' />
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>{election.title}</h1>
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Session {election.session} ·{" "}
            {election.signIn === "matric-invoice"
              ? "Sign in with your matric and invoice numbers to vote"
              : "Sign in with your matric number to vote"}
          </p>
        </motion.div>

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
                    layoutId='voter-tab-underline'
                    className='absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-green'
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className='mt-6'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {activeTab === "verification" && (
                <VerificationTab
                  onViewCandidates={() => goTo("candidates")}
                  onVoteNow={() => goTo("ballot")}
                />
              )}
              {activeTab === "candidates" && <CandidatesTab onVoteNow={() => goTo("ballot")} />}
              {activeTab === "ballot" &&
                (votingOpen ? (
                  <VoterBallot />
                ) : (
                  <div className='mx-auto max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-900 dark:bg-amber-950/40'>
                    <Clock className='mx-auto h-10 w-10 text-amber-600 dark:text-amber-400' />
                    <h2 className='mt-3 text-xl font-bold text-gray-900 dark:text-white'>
                      {election.ended ? "Voting has ended" : "Voting has not started yet"}
                    </h2>
                    <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                      {election.ended
                        ? "The election is over. Thank you to everyone who voted. You can still look at how verification worked and who the candidates were."
                        : "The ballot opens when the electoral committee starts voting. Keep this page open: it updates on its own. Meanwhile you can read how verification works and view the candidates."}
                    </p>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
    </ElectionContext.Provider>
  );
};

export default VoterPortal;
