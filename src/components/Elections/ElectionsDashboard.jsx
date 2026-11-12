import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Fingerprint,
  ListChecks,
  Lock,
  LogOut,
  Mail,
  RefreshCw,
  ShieldCheck,
  Unlock,
  Users,
} from "lucide-react";
import logo from "../../assets/logo.png";
import {
  CANDIDATES,
  ELECTION_META,
  ELECTED_POSITIONS,
  NO_VOTE_ID,
  getPositionById,
} from "../../lib/electionData";
import { useElectionResults } from "../../hooks/useElectionResults";
import {
  getBallots,
  getBrevoCredits,
  getElectionStatus,
  runDiagnostics,
  setElectionStatus,
} from "../../lib/electionsApi";
import PositionResult from "./PositionResult";
import VoterBallot from "./VoterBallot";
import LiveOverview, { StatCard } from "./LiveOverview";
import { CandidatesTab, VerificationTab } from "./VoterTabs";

const TABS = [
  { id: "results", label: "Live Results", icon: BarChart3 },
  { id: "candidates", label: "Candidates", icon: Users },
  { id: "ballot", label: "Voter Ballot", icon: Fingerprint },
  { id: "verification", label: "Verification", icon: ShieldCheck },
  { id: "ballots", label: "Ballots", icon: ListChecks },
  { id: "diagnostics", label: "Diagnostics", icon: Activity },
];

export const ResultsTab = ({ votesByPosition }) => (
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

/** Open/close voting. While closed the public sees no voter portal and the API refuses voters. */
const VotingSwitch = ({ votingOpen, onChange }) => {
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  const apply = async () => {
    setBusy(true);
    setError("");
    try {
      const data = await setElectionStatus(!votingOpen);
      onChange(data.votingOpen);
      setConfirming(false);
    } catch (err) {
      setError(err.message || "Could not change the voting status.");
    } finally {
      setBusy(false);
    }
  };

  const loading = votingOpen === null;

  return (
    <div
      className={`h-full rounded-2xl border p-5 ${
        votingOpen
          ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
          : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
      }`}
    >
      <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
        {votingOpen ? <Unlock className='h-4 w-4' /> : <Lock className='h-4 w-4' />}
        <p className='text-sm font-medium'>Voting</p>
      </div>
      <p
        className={`mt-2 text-2xl font-bold ${
          votingOpen ? "text-green-700 dark:text-green-400" : "text-gray-900 dark:text-white"
        }`}
      >
        {loading ? "…" : votingOpen ? "Open" : "Closed"}
      </p>
      <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
        {votingOpen
          ? "Voters can see the portal at /elections and cast ballots."
          : "The voter portal is hidden and voter sign-ins are refused."}
      </p>

      {!loading &&
        (confirming ? (
          <div className='mt-3 flex flex-wrap gap-2'>
            <button
              type='button'
              onClick={apply}
              disabled={busy}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white disabled:opacity-60 ${
                votingOpen ? "bg-red-600 hover:bg-red-700" : "bg-green hover:bg-green-dark"
              }`}
            >
              {busy && <RefreshCw className='h-3.5 w-3.5 animate-spin' />}
              {votingOpen ? "Yes, close voting" : "Yes, open voting"}
            </button>
            <button
              type='button'
              onClick={() => setConfirming(false)}
              disabled={busy}
              className='rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type='button'
            onClick={() => setConfirming(true)}
            className={`mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white ${
              votingOpen ? "bg-red-600 hover:bg-red-700" : "bg-green hover:bg-green-dark"
            }`}
          >
            {votingOpen ? <Lock className='h-3.5 w-3.5' /> : <Unlock className='h-3.5 w-3.5' />}
            {votingOpen ? "Close voting" : "Open voting"}
          </button>
        ))}
      {error && <p className='mt-2 text-xs text-red-600 dark:text-red-400'>{error}</p>}
    </div>
  );
};

/** Remaining Brevo email credits (each verification code email uses one). */
const BrevoCredits = () => {
  const [state, setState] = useState({ loading: true, credits: null, planType: null, error: "" });

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: "" }));
    try {
      const data = await getBrevoCredits();
      setState({ loading: false, credits: data.credits, planType: data.planType, error: "" });
    } catch (err) {
      setState({ loading: false, credits: null, planType: null, error: err.message || "Unavailable" });
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 60000);
    return () => clearInterval(id);
  }, [load]);

  return (
    <StatCard
      icon={Mail}
      label='Brevo emails left'
      value={state.credits ?? (state.loading ? "…" : "—")}
    >
      <div className='mt-1 flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400'>
        <span>
          {state.error
            ? state.error
            : state.planType === "free"
              ? "Free plan · resets daily"
              : state.planType
                ? `${state.planType} plan`
                : "Each verification code uses one"}
        </span>
        <button
          type='button'
          onClick={load}
          aria-label='Refresh Brevo credits'
          className='rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          <RefreshCw className={`h-3.5 w-3.5 ${state.loading ? "animate-spin" : ""}`} />
        </button>
      </div>
    </StatCard>
  );
};

const CANDIDATE_NAME_BY_ID = CANDIDATES.reduce((map, candidate) => {
  map[candidate.id] = candidate.name;
  return map;
}, {});

/** How a recorded choice reads in the Ballots tab (handles unopposed Yes/No). */
const choiceLabel = (positionId, candidateId) => {
  if (candidateId === NO_VOTE_ID) return "No";
  const name = CANDIDATE_NAME_BY_ID[candidateId] || candidateId;
  const unopposed = CANDIDATES.filter((c) => c.positionId === positionId).length === 1;
  return unopposed ? `Yes: ${name}` : name;
};

const formatBallotTime = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

const BallotsTab = () => {
  const [ballots, setBallots] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getBallots();
      setBallots(data?.ballots || []);
    } catch (err) {
      setError(err.message || "Could not load ballots.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = (ballots || []).filter((ballot) =>
    ballot.matric.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div>
      <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-lg font-bold text-gray-900 dark:text-white'>Recorded ballots</h2>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {ballots ? `${ballots.length} voter(s) have cast a ballot.` : "Loading…"}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search matric number…'
            className='rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-green focus:ring-2 focus:ring-green/30 dark:border-gray-700 dark:bg-gray-950 dark:text-white'
          />
          <button
            type='button'
            onClick={load}
            className='inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <p className='mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-400'>
          {error}
        </p>
      )}

      {loading && !ballots ? (
        <div className='flex justify-center py-20'>
          <RefreshCw className='h-8 w-8 animate-spin text-green-600' />
        </div>
      ) : filtered.length === 0 ? (
        <p className='py-20 text-center text-gray-500 dark:text-gray-400'>No ballots recorded yet.</p>
      ) : (
        <div className='space-y-4'>
          {filtered.map((ballot) => (
            <div
              key={ballot.voterKey}
              className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'
            >
              <div className='flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 dark:border-gray-800'>
                <span className='font-mono text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white'>
                  {ballot.matric}
                </span>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  {formatBallotTime(ballot.votedAt)} · {ballot.votes.length} positions
                </span>
              </div>
              <div className='mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2'>
                {ballot.votes.map((vote) => (
                  <div
                    key={vote.positionId}
                    className='flex items-center justify-between gap-3 text-sm'
                  >
                    <span className='text-gray-500 dark:text-gray-400'>
                      {getPositionById(vote.positionId)?.title || vote.positionId}
                    </span>
                    <span className='text-right font-medium text-gray-800 dark:text-gray-100'>
                      {choiceLabel(vote.positionId, vote.candidateId)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DiagnosticsTab = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const run = async () => {
    if (!email && !phone) {
      setError("Enter an email and/or a phone number.");
      return;
    }
    setError("");
    setBusy(true);
    setResult(null);
    try {
      const data = await runDiagnostics({
        toEmail: email.trim() || undefined,
        toPhone: phone.trim() || undefined,
      });
      setResult(data);
    } catch (err) {
      setError(err.message || "Diagnostics failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      <div className='rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900'>
        <h2 className='text-lg font-bold text-gray-900 dark:text-white'>Delivery diagnostics</h2>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
          Sends a real test OTP and shows exactly what Brevo (email) and Termii (SMS) replied.
          The code is shown below — you can ignore it.
        </p>

        <div className='mt-5 space-y-4'>
          <div>
            <label className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200'>
              Test email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-green focus:ring-2 focus:ring-green/30 dark:border-gray-700 dark:bg-gray-950 dark:text-white'
            />
          </div>
          <div>
            <label className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200'>
              Test phone
            </label>
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='e.g. 08012345678'
              className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-green focus:ring-2 focus:ring-green/30 dark:border-gray-700 dark:bg-gray-950 dark:text-white'
            />
          </div>
          <button
            type='button'
            onClick={run}
            disabled={busy}
            className='btn-lively inline-flex items-center gap-2 rounded-lg bg-green px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60'
          >
            {busy ? <RefreshCw className='h-4 w-4 animate-spin' /> : <Activity className='h-4 w-4' />}
            Run test
          </button>
        </div>

        {error && (
          <p className='mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-400'>
            {error}
          </p>
        )}
      </div>

      <div className='rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900'>
        <h3 className='text-lg font-bold text-gray-900 dark:text-white'>Result</h3>
        {!result ? (
          <p className='mt-3 text-sm text-gray-500 dark:text-gray-400'>
            Run a test to see Brevo/Termii responses here.
          </p>
        ) : (
          <div className='mt-3 space-y-4'>
            <div className='text-xs text-gray-500 dark:text-gray-400'>
              Config: email {result.config?.email ? "ok" : "missing"} · sms{" "}
              {result.config?.sms ? "ok" : "missing"} · sender {result.config?.smsSenderId || "—"} /
              channel {result.config?.smsChannel || "—"}
            </div>
            {[result.results?.email, result.results?.sms].filter(Boolean).map((r) => (
              <div
                key={r.channel}
                className={`rounded-lg border p-3 text-sm ${
                  r.sent
                    ? "border-green-200 bg-green-50 dark:border-green-900/40 dark:bg-green-900/20"
                    : "border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-900/20"
                }`}
              >
                <div className='flex items-center justify-between gap-2'>
                  <span className='font-bold uppercase tracking-wide text-gray-700 dark:text-gray-200'>
                    {r.channel}
                  </span>
                  <span className={r.sent ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    {r.sent ? "sent ✓" : "failed ✗"} {r.status ? `(${r.status})` : ""}
                  </span>
                </div>
                {(r.reason || r.detail) && (
                  <pre className='mt-2 whitespace-pre-wrap break-words text-xs text-gray-600 dark:text-gray-300'>
                    {r.reason || r.detail}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ElectionsDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("results");
  const [votingOpen, setVotingOpen] = useState(null);
  const {
    configured,
    votesByPosition,
    results,
    registeredVoters,
    ballotsCast,
    loading: resultsLoading,
    error: resultsError,
    lastUpdated,
    refresh,
  } = useElectionResults();

  useEffect(() => {
    getElectionStatus()
      .then((data) => setVotingOpen(Boolean(data.votingOpen)))
      .catch(() => setVotingOpen(false));
  }, []);

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
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  votingOpen
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                }`}
              >
                {votingOpen ? "Voting open" : "Not live yet"}
              </span>
            </div>
            <div className='mt-3 flex items-center gap-3'>
              <img src={logo} alt='NUESA ABUAD' className='h-11 w-11 shrink-0 object-contain' />
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>{ELECTION_META.title}</h1>
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
                <RefreshCw className={`h-4 w-4 ${resultsLoading ? "animate-spin" : ""}`} />
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
                  : `Tallies refresh automatically every 30s${lastUpdated ? ` · last updated ${lastUpdated.toLocaleTimeString()}` : ""}. Agents watch the same results at /elections/agents.`}
            </span>
          ) : (
            "Showing placeholder candidates and sample tallies. Connect the elections API to show live results."
          )}
        </motion.div>

        {/* stats */}
        <div className='mt-6'>
          <LiveOverview registered={registeredVoters ?? 0} ballotsCast={ballotsCast ?? 0} />
        </div>
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <VotingSwitch votingOpen={votingOpen} onChange={setVotingOpen} />
          <BrevoCredits />
        </div>

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
              {activeTab === "results" && <ResultsTab votesByPosition={votesByPosition} />}
              {activeTab === "candidates" && <CandidatesTab onVoteNow={() => setActiveTab("ballot")} />}
              {activeTab === "ballot" && <VoterBallot />}
              {activeTab === "verification" && (
                <VerificationTab
                  showPreview
                  onViewCandidates={() => setActiveTab("candidates")}
                  onVoteNow={() => setActiveTab("ballot")}
                />
              )}
              {activeTab === "ballots" && <BallotsTab />}
              {activeTab === "diagnostics" && <DiagnosticsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ElectionsDashboard;
