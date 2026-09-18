import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import {
  castVote,
  isElectionsApiConfigured,
  otpSend,
  otpVerify,
  voterVerify,
} from "../../lib/electionsApi";
import { ELECTED_POSITIONS, getCandidatesByPosition } from "../../lib/electionData";

const STEPS = ["Sign in", "Verify code", "Vote"];

const Field = ({ id, label, hint, icon, ...props }) => {
  const Icon = icon;

  return (
    <div>
      <label
        htmlFor={id}
        className='mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200'
      >
        {label}
        {hint && (
          <span className='rounded-full bg-green-50 dark:bg-green-900/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green dark:text-green-400'>
            {hint}
          </span>
        )}
      </label>
      <div className='relative'>
        <Icon className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
        <input
          id={id}
          className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 py-2.5 pl-10 pr-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30'
          {...props}
        />
      </div>
    </div>
  );
};

const VoterBallot = () => {
  const configured = isElectionsApiConfigured();
  const [step, setStep] = useState(0);
  const [matricNumber, setMatricNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [voterToken, setVoterToken] = useState("");
  const [contacts, setContacts] = useState(null);
  const [code, setCode] = useState("");
  const [ballotToken, setBallotToken] = useState("");
  const [selections, setSelections] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const run = async (fn) => {
    setLoading(true);
    setError("");
    try {
      await fn();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = (event) => {
    event.preventDefault();
    run(async () => {
      const data = await voterVerify(matricNumber, invoiceNumber);
      setVoterToken(data.voterToken);
      setContacts(data);
      const sent = await otpSend(data.voterToken);
      setContacts((prev) => ({ ...prev, ...sent }));
      setStep(1);
    });
  };

  const handleResend = () => run(async () => {
    const sent = await otpSend(voterToken);
    setContacts((prev) => ({ ...prev, ...sent }));
  });

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    run(async () => {
      const data = await otpVerify(voterToken, code);
      setBallotToken(data.ballotToken);
      setStep(2);
    });
  };

  const handleSubmit = () => {
    const votes = ELECTED_POSITIONS.filter((position) => selections[position.id]).map(
      (position) => ({ positionId: position.id, candidateId: selections[position.id] })
    );
    run(async () => {
      await castVote(ballotToken, votes);
      setSubmitted(true);
      setStep(3);
    });
  };

  const selectedCount = ELECTED_POSITIONS.filter((position) => selections[position.id]).length;
  const allSelected = selectedCount === ELECTED_POSITIONS.length;

  if (!configured) {
    return (
      <div className='rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-900/20 p-6 text-sm text-amber-800 dark:text-amber-300'>
        The voter ballot requires the elections API. Set
        <code className='mx-1 rounded bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5'>
          VITE_ELECTIONS_API_URL
        </code>
        to enable it.
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl'>
      {/* stepper */}
      <ol className='mb-8 flex items-center justify-center gap-2 sm:gap-4'>
        {STEPS.map((label, index) => {
          const state = submitted ? "done" : index < step ? "done" : index === step ? "current" : "todo";
          return (
            <li key={label} className='flex items-center gap-2'>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  state === "done"
                    ? "bg-green text-white"
                    : state === "current"
                      ? "bg-green-100 dark:bg-green-900/40 text-green dark:text-green-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                }`}
              >
                {state === "done" ? <CheckCircle2 className='h-4 w-4' /> : index + 1}
              </span>
              <span className={`text-sm font-medium ${state === "todo" ? "text-gray-400" : "text-gray-800 dark:text-gray-100"}`}>
                {label}
              </span>
              {index < STEPS.length - 1 && <span className='mx-1 h-px w-6 bg-gray-200 dark:bg-gray-700 sm:w-10' />}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode='wait'>
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8'
        >
          {error && (
            <p
              role='alert'
              className='mb-5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/30 px-3 py-2 text-sm text-red-600 dark:text-red-400'
            >
              {error}
            </p>
          )}

          {step === 0 && (
            <form onSubmit={handleVerify} className='space-y-5'>
              <div className='flex items-center gap-2 text-green dark:text-green-400'>
                <ShieldCheck className='h-5 w-5' />
                <h2 className='font-bold text-gray-900 dark:text-white'>Voter sign-in</h2>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Use your matric number as the username and your dues invoice
                number as the password.
              </p>
              <Field
                id='matric'
                label='Matric Number'
                hint='Username'
                icon={User}
                value={matricNumber}
                onChange={(event) => setMatricNumber(event.target.value)}
                placeholder='e.g. 24/ENG05/037'
                required
              />
              <Field
                id='invoice'
                label='Invoice Number'
                hint='Password'
                icon={KeyRound}
                type='password'
                value={invoiceNumber}
                onChange={(event) => setInvoiceNumber(event.target.value)}
                placeholder='Your dues invoice number'
                required
              />
              <button
                type='submit'
                disabled={loading}
                className='inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green px-6 py-3 font-semibold text-white transition-colors hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-70'
              >
                {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : <ArrowRight className='h-4 w-4' />}
                Continue
              </button>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={handleVerifyOtp} className='space-y-5'>
              <div className='flex items-center gap-2 text-green dark:text-green-400'>
                <ShieldCheck className='h-5 w-5' />
                <h2 className='font-bold text-gray-900 dark:text-white'>Enter verification code</h2>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                We sent a 6-digit code to your email and phone on record.
              </p>
              {contacts && (
                <div className='flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400'>
                  {contacts.hasEmail && (
                    <span className='inline-flex items-center gap-1.5'>
                      <Mail className='h-3.5 w-3.5' /> {contacts.maskedEmail}
                    </span>
                  )}
                  {contacts.hasPhone && (
                    <span className='inline-flex items-center gap-1.5'>
                      <Phone className='h-3.5 w-3.5' /> {contacts.maskedPhone}
                    </span>
                  )}
                </div>
              )}
              <input
                inputMode='numeric'
                maxLength={6}
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                placeholder='123456'
                className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] text-gray-900 dark:text-white focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30'
                required
              />
              <div className='flex flex-col gap-3 sm:flex-row'>
                <button
                  type='button'
                  onClick={() => setStep(0)}
                  className='inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 font-semibold text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
                >
                  <ArrowLeft className='h-4 w-4' /> Back
                </button>
                <button
                  type='submit'
                  disabled={loading || code.length !== 6}
                  className='inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green px-6 py-3 font-semibold text-white transition-colors hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : <ShieldCheck className='h-4 w-4' />}
                  Verify
                </button>
              </div>
              <button
                type='button'
                onClick={handleResend}
                disabled={loading}
                className='w-full text-center text-sm font-medium text-green dark:text-green-400 hover:underline'
              >
                Resend code
              </button>
            </form>
          )}

          {step === 2 && (
            <div className='space-y-6'>
              <div className='flex items-center justify-between gap-3'>
                <h2 className='font-bold text-gray-900 dark:text-white'>Cast your vote</h2>
                <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                  {selectedCount}/{ELECTED_POSITIONS.length} selected
                </span>
              </div>

              <div className='space-y-6'>
                {ELECTED_POSITIONS.map((position) => (
                  <div key={position.id}>
                    <h3 className='mb-3 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white'>
                      <span className='flex h-6 w-6 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 text-[10px] font-bold text-green dark:text-green-400'>
                        {position.order}
                      </span>
                      {position.title}
                    </h3>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                      {getCandidatesByPosition(position.id).map((candidate) => {
                        const selected = selections[position.id] === candidate.id;
                        return (
                          <button
                            key={candidate.id}
                            type='button'
                            onClick={() =>
                              setSelections((prev) => ({ ...prev, [position.id]: candidate.id }))
                            }
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                              selected
                                ? "border-green bg-green-50 dark:bg-green-900/30"
                                : "border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700"
                            }`}
                          >
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                selected
                                  ? "bg-green text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                              }`}
                            >
                              <User className='h-4 w-4' />
                            </span>
                            <span className='min-w-0'>
                              <span className='block truncate text-sm font-semibold text-gray-900 dark:text-white'>
                                {candidate.name}
                              </span>
                              <span className='block truncate text-xs text-gray-500 dark:text-gray-400'>
                                {candidate.manifesto}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type='button'
                onClick={handleSubmit}
                disabled={loading || !allSelected}
                className='inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green px-6 py-3 font-semibold text-white transition-colors hover:bg-green-dark disabled:cursor-not-allowed disabled:opacity-70'
              >
                {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : <CheckCircle2 className='h-4 w-4' />}
                Submit vote{allSelected ? "" : ` (${selectedCount}/${ELECTED_POSITIONS.length})`}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className='py-8 text-center'>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 text-green dark:text-green-400'
              >
                <CheckCircle2 className='h-8 w-8' />
              </motion.div>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                Your vote has been recorded
              </h2>
              <p className='mx-auto mt-2 max-w-md text-sm text-gray-600 dark:text-gray-300'>
                Thank you for voting. Your ballot has been securely submitted and
                cannot be changed.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VoterBallot;
