import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  LogOut,
  Loader2,
  RefreshCw,
  Mail,
  User,
  Tag,
  Calendar,
  ShieldCheck,
  Lock,
} from "lucide-react";
import useSEO from "../hooks/useSEO";
import { sanitizeHtml } from "../lib/sanitizeHtml";
import {
  adminLogin,
  setAdminToken,
  getAdminToken,
  isElectionsApiConfigured,
} from "../lib/electionsApi";
import {
  listBlogSubmissions,
  updateBlogStatus,
} from "../lib/blogApi";

const TABS = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

const formatDate = (iso) => {
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

const LoginPanel = ({ onSuccess }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (!isElectionsApiConfigured()) {
        throw new Error("The API is not configured. Sign-in is unavailable.");
      }
      await adminLogin(username, password);
      onSuccess();
    } catch (err) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className='flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 dark:bg-gray-950'>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900'
      >
        <div className='mb-8 flex flex-col items-center text-center'>
          <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green dark:bg-green-900/30 dark:text-green-400'>
            <ShieldCheck className='h-7 w-7' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Blog Admin</h1>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Restricted access. For the NUESA editorial team.
          </p>
        </div>

        <div className='space-y-5'>
          <div>
            <label className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200'>
              Username
            </label>
            <div className='relative'>
              <User className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter username'
                autoComplete='username'
                required
                className='w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30 dark:border-gray-700 dark:bg-gray-950 dark:text-white'
              />
            </div>
          </div>

          <div>
            <label className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200'>
              Password
            </label>
            <div className='relative'>
              <Lock className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password'
                autoComplete='current-password'
                required
                className='w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30 dark:border-gray-700 dark:bg-gray-950 dark:text-white'
              />
            </div>
          </div>

          {error && (
            <p
              role='alert'
              className='rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-400'
            >
              {error}
            </p>
          )}

          <button
            type='submit'
            disabled={busy}
            className='w-full rounded-lg bg-green px-6 py-3 font-semibold text-white transition-colors hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-70'
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </motion.form>
    </main>
  );
};

const SubmissionCard = ({ submission, onApprove, onReject, busy }) => {
  const [expanded, setExpanded] = React.useState(false);
  const isPending = submission.status === "pending";

  return (
    <div className='flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white'>{submission.title}</h3>
          <div className='mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400'>
            <span className='inline-flex items-center gap-1.5'>
              <User className='h-3.5 w-3.5' /> {submission.author}
            </span>
            {submission.email && (
              <span className='inline-flex items-center gap-1.5'>
                <Mail className='h-3.5 w-3.5' />
                <a href={`mailto:${submission.email}`} className='hover:underline'>
                  {submission.email}
                </a>
              </span>
            )}
            {submission.category && (
              <span className='inline-flex items-center gap-1.5'>
                <Tag className='h-3.5 w-3.5' /> {submission.category}
              </span>
            )}
            <span className='inline-flex items-center gap-1.5'>
              <Calendar className='h-3.5 w-3.5' /> {formatDate(submission.created_at)}
            </span>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
            submission.status === "approved"
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
              : submission.status === "rejected"
                ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
          }`}
        >
          {submission.status}
        </span>
      </div>

      <div
        className={`relative mt-4 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200 ${
          expanded ? "" : "max-h-40"
        }`}
      >
        <div
          className='prose-sm [&_a]:text-green-700 [&_a]:underline [&_p]:mb-3'
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(submission.content) }}
        />
        {!expanded && (
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-950' />
        )}
      </div>

      <div className='mt-3 flex items-center justify-between gap-3'>
        <button
          type='button'
          onClick={() => setExpanded((v) => !v)}
          className='text-xs font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
        >
          {expanded ? "Show less" : "Read full content"}
        </button>

        {isPending && (
          <div className='flex items-center gap-2'>
            <button
              type='button'
              disabled={busy}
              onClick={() => onReject(submission.id)}
              className='inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-900/40 dark:hover:bg-red-900/30'
            >
              <X className='h-4 w-4' /> Reject
            </button>
            <button
              type='button'
              disabled={busy}
              onClick={() => onApprove(submission.id)}
              className='inline-flex items-center gap-1.5 rounded-lg bg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-dark disabled:opacity-50'
            >
              <Check className='h-4 w-4' /> Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const BlogAdmin = () => {
  useSEO({ title: "Blog Admin | NUESA", description: "Blog submissions review." });

  const [authed, setAuthed] = React.useState(() => Boolean(getAdminToken()));
  const [activeTab, setActiveTab] = React.useState("pending");
  const [submissions, setSubmissions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [busyId, setBusyId] = React.useState(null);

  const load = React.useCallback(async (status) => {
    setLoading(true);
    setError(null);
    try {
      const data = await listBlogSubmissions(status);
      setSubmissions(data?.submissions || []);
    } catch (err) {
      setError(err.message || "Could not load submissions");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (authed) load(activeTab);
  }, [authed, activeTab, load]);

  const handleDecision = async (id, status) => {
    setBusyId(id);
    try {
      await updateBlogStatus(id, status);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message || "Could not update the submission");
    } finally {
      setBusyId(null);
    }
  };

  const handleLogout = () => {
    setAdminToken("");
    setAuthed(false);
    setSubmissions([]);
  };

  if (!authed) return <LoginPanel onSuccess={() => setAuthed(true)} />;

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-5xl'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <span className='inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-700 dark:bg-green-900/40 dark:text-green-400'>
              Editorial
            </span>
            <h1 className='mt-3 text-3xl font-bold text-gray-900 dark:text-white'>
              Blog Submissions
            </h1>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Approve to publish on the blog, or reject to discard.
            </p>
          </div>
          <div className='flex items-center gap-2 self-start'>
            <button
              onClick={() => load(activeTab)}
              className='inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className='inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'
            >
              <LogOut className='h-4 w-4' />
              Log out
            </button>
          </div>
        </div>

        <div className='mt-8 flex gap-1 border-b border-gray-200 dark:border-gray-800'>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-green dark:text-green-400"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId='blog-admin-underline'
                    className='absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-green'
                  />
                )}
              </button>
            );
          })}
        </div>

        {error && (
          <p className='mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/30 dark:text-red-400'>
            {error}
          </p>
        )}

        <div className='mt-6 space-y-4'>
          {loading && submissions.length === 0 ? (
            <div className='flex justify-center py-20'>
              <Loader2 className='h-8 w-8 animate-spin text-green-600' />
            </div>
          ) : submissions.length === 0 ? (
            <p className='py-20 text-center text-gray-500 dark:text-gray-400'>
              No {activeTab} submissions.
            </p>
          ) : (
            <AnimatePresence mode='popLayout'>
              {submissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <SubmissionCard
                    submission={submission}
                    busy={busyId === submission.id}
                    onApprove={(id) => handleDecision(id, "approved")}
                    onReject={(id) => handleDecision(id, "rejected")}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
