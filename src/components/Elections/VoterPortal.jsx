import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fingerprint, ShieldCheck, Users } from "lucide-react";
import logo from "../../assets/logo.png";
import { ELECTION_META } from "../../lib/electionData";
import VoterBallot from "./VoterBallot";
import { CandidatesTab, VerificationTab } from "./VoterTabs";

// What voters see on election day, in this order.
const TABS = [
  { id: "verification", label: "Verification", icon: ShieldCheck },
  { id: "candidates", label: "Candidates", icon: Users },
  { id: "ballot", label: "Voter Ballot", icon: Fingerprint },
];

const VoterPortal = () => {
  const [activeTab, setActiveTab] = useState("verification");

  const goTo = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className='inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700 dark:text-green-400'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
            Voting is open
          </span>
          <div className='mt-3 flex items-center gap-3'>
            <img src={logo} alt='NUESA ABUAD' className='h-11 w-11 shrink-0 object-contain' />
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>{ELECTION_META.title}</h1>
          </div>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Session {ELECTION_META.session} · Sign in with your matric and invoice numbers to vote
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
              {activeTab === "ballot" && <VoterBallot />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VoterPortal;
