import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Vote } from "lucide-react";
import useSEO from "../hooks/useSEO";
import { VoterPortal } from "../components/Elections";
import { Spinner } from "../components/Elections/AdminGate";
import { getAllElectionStatuses } from "../lib/electionsApi";
import { ELECTIONS, ELECTION_ORDER, isElectionId } from "../lib/electionsRegistry";

// How often the page re-checks whether voting has been opened or closed.
const STATUS_POLL_MS = 20000;

const statusOf = (election, open) => {
  if (open) return { label: "Voting is open", tone: "open", icon: Vote };
  if (election.ended) return { label: "Voting has ended", tone: "ended", icon: CheckCircle2 };
  if (!election.hasBallot) return { label: "Candidates coming soon", tone: "soon", icon: Clock };
  return { label: "Voting not started", tone: "soon", icon: Clock };
};

const TONES = {
  open: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  soon: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  ended: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

/** One button-card per election on the picker. */
const ElectionCard = ({ election, open, onChoose, index }) => {
  const status = statusOf(election, open);
  const StatusIcon = status.icon;
  return (
    <motion.button
      type='button'
      onClick={() => onChoose(election.id)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className='group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:border-green hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-green-600'
    >
      <div className='flex items-center justify-between gap-3'>
        <img src={election.logo} alt='' className='h-14 w-14 object-contain' />
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${TONES[status.tone]}`}
        >
          {status.tone === "open" ? (
            <span className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
          ) : (
            <StatusIcon className='h-3.5 w-3.5' />
          )}
          {status.label}
        </span>
      </div>
      <h2 className='mt-4 text-xl font-bold text-gray-900 dark:text-white'>{election.shortName} Elections</h2>
      <p className='mt-1 flex-1 text-sm text-gray-600 dark:text-gray-400'>{election.blurb}</p>
      <span className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green dark:text-green-400'>
        {open ? "Go to the ballot" : "View election"}
        <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
      </span>
    </motion.button>
  );
};

/**
 * /elections: public. Pick an election (NUESA, MIPESA, APWEN, ...), then you get its voter
 * portal: verification steps and candidates any time, and the ballot once the admin has
 * pressed "Start voting" for THAT election (the server also refuses votes while it is closed).
 * The admin dashboard, with a switch per election, lives at /elections/admin.
 */
const Elections = () => {
  const [params, setParams] = useSearchParams();
  const requested = params.get("e");
  const election = isElectionId(requested) ? ELECTIONS[requested] : null;
  const [statuses, setStatuses] = useState(null);

  useSEO({
    title: election ? `${election.shortName} Elections` : "Elections",
    description: election
      ? `${election.name} online elections. Verify and cast your ballot.`
      : "NUESA ABUAD online elections for NUESA, MIPESA and APWEN. Pick an election, verify and cast your ballot.",
  });

  useEffect(() => {
    let cancelled = false;
    const check = () =>
      getAllElectionStatuses()
        .then((data) => {
          if (!cancelled) setStatuses(data);
        })
        .catch(() => {
          if (!cancelled) setStatuses((current) => current ?? {});
        });
    check();
    const timer = setInterval(check, STATUS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  if (statuses === null) return <Spinner />;

  if (election) {
    return (
      <VoterPortal
        key={election.id}
        election={election}
        votingOpen={Boolean(statuses[election.id])}
        onBack={() => setParams({})}
      />
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-5xl'>
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Elections</h1>
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            Choose the election you are voting in. You can only vote while its status says &ldquo;Voting is open&rdquo;.
          </p>
        </motion.div>
        <div className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {ELECTION_ORDER.map((id, index) => (
            <ElectionCard
              key={id}
              election={ELECTIONS[id]}
              open={Boolean(statuses[id])}
              index={index}
              onChoose={(choice) => {
                setParams({ e: choice });
                window.scrollTo({ top: 0 });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Elections;
