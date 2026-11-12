import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, Maximize2, Minimize2, RefreshCw } from "lucide-react";
import logo from "../../assets/logo.png";
import { ELECTION_META, ELECTED_POSITIONS } from "../../lib/electionData";
import { getAgentToken } from "../../lib/electionsApi";
import { useElectionResults } from "../../hooks/useElectionResults";
import LiveOverview from "./LiveOverview";
import PositionResult from "./PositionResult";

const AGENT_REFRESH_MS = 15000;

/** Live results only, for candidates' agents watching from the office screen. */
const AgentsDashboard = ({ onLogout }) => {
  const {
    votesByPosition,
    results,
    registeredVoters,
    ballotsCast,
    loading,
    error,
    lastUpdated,
    refresh,
  } = useElectionResults({ getToken: getAgentToken, refreshMs: AGENT_REFRESH_MS });
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  };

  const unauthorized = /unauthor/i.test(error || "");
  useEffect(() => {
    if (unauthorized) onLogout();
  }, [unauthorized, onLogout]);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
        >
          <div>
            <span className='inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700 dark:text-green-400'>
              Agents&apos; live view
            </span>
            <div className='mt-3 flex items-center gap-3'>
              <img src={logo} alt='NUESA ABUAD' className='h-11 w-11 shrink-0 object-contain' />
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>{ELECTION_META.title}</h1>
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Session {ELECTION_META.session} · Live results
            </p>
          </div>
          <div className='flex items-center gap-2 self-start'>
            <button
              onClick={refresh}
              className='inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={toggleFullscreen}
              className='inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            >
              {fullscreen ? <Minimize2 className='h-4 w-4' /> : <Maximize2 className='h-4 w-4' />}
              {fullscreen ? "Exit full screen" : "Full screen"}
            </button>
            <button
              onClick={onLogout}
              className='inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            >
              <LogOut className='h-4 w-4' />
              Log out
            </button>
          </div>
        </motion.div>

        <div className='mt-6 rounded-xl border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-900/20 px-4 py-3 text-sm text-green-800 dark:text-green-300'>
          <span className='flex flex-wrap items-center gap-2'>
            <span className='inline-flex items-center gap-1.5 font-semibold'>
              <span className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
              Live
            </span>
            {error
              ? `Could not load live results: ${error}`
              : loading && !results
                ? "Loading live results…"
                : `Updates automatically every ${AGENT_REFRESH_MS / 1000}s${lastUpdated ? ` · last updated ${lastUpdated.toLocaleTimeString()}` : ""}`}
          </span>
        </div>

        <div className='mt-6'>
          <LiveOverview registered={registeredVoters ?? 0} ballotsCast={ballotsCast ?? 0} />
        </div>

        <div className='mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2'>
          {ELECTED_POSITIONS.map((position, index) => (
            <PositionResult
              key={position.id}
              position={position}
              index={index}
              votesByCandidate={votesByPosition?.[position.id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsDashboard;
