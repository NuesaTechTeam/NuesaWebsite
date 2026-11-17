import { Printer, X } from "lucide-react";
import logo from "../../assets/logo.png";
import {
  ELECTION_META,
  ELECTED_POSITIONS,
  NO_VOTE_ID,
  getCandidatesByPosition,
  isUnopposed,
} from "../../lib/electionData";

const percent = (part, whole) => (whole > 0 ? `${((part / whole) * 100).toFixed(1)}%` : "0.0%");

/** Rows for one position: candidates (or Yes/No when unopposed), most votes first. */
const positionRows = (position, votesByCandidate = {}) => {
  const candidates = getCandidatesByPosition(position.id);
  const options = isUnopposed(position.id)
    ? [
        { id: candidates[0].id, name: `Yes: ${candidates[0].name}` },
        { id: NO_VOTE_ID, name: "No" },
      ]
    : candidates.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
      }));
  return options
    .map((option) => ({ ...option, votes: votesByCandidate[option.id] ?? 0 }))
    .sort((a, b) => b.votes - a.votes);
};

/**
 * Printable results: vote counts per candidate for every position. Opened from
 * the admin dashboard; the print stylesheet (index.css, .print-sheet) prints
 * only this sheet.
 */
const SIGNATORIES = [
  "Chairman, Electoral Committee",
  "Secretary, Electoral Committee",
  ...Array.from({ length: 6 }, (_, index) => `Candidates' agent ${index + 1}`),
];

const Signatures = ({ compact }) => (
  <div
    className={
      compact ? "mt-3 grid grid-cols-4 gap-x-4 gap-y-6 text-[9px]" : "mt-10 grid grid-cols-2 gap-x-10 gap-y-12 text-sm"
    }
  >
    {SIGNATORIES.map((role) => (
      <div key={role}>
        <div className='border-b border-gray-900' />
        <p className='mt-1'>
          {role}: name, <span className='font-bold'>SIGNATURE AND DATE</span>
        </p>
      </div>
    ))}
  </div>
);

/** One-page version: every position in a compact two-column grid. */
const OnePageBody = ({ votesByPosition, registered, cast, votingOpen, generatedAt }) => (
  <>
    <header className='flex items-center gap-3 border-b-2 border-gray-900 pb-2'>
      <img src={logo} alt='' className='h-9 w-9 object-contain' />
      <div className='flex-1'>
        <h1 className='text-base font-bold leading-tight'>{ELECTION_META.title}: Official Results</h1>
        <p className='text-[9px] text-gray-600'>
          Session {ELECTION_META.session} · Generated {generatedAt.toLocaleString()} ·{" "}
          {votingOpen ? "Voting OPEN (provisional)" : "Voting closed"}
        </p>
      </div>
      <p className='text-right text-[10px] leading-tight'>
        Registered <b className='tabular-nums'>{registered.toLocaleString()}</b> · Cast{" "}
        <b className='tabular-nums'>{cast.toLocaleString()}</b> · Turnout <b>{percent(cast, registered)}</b>
      </p>
    </header>
    <div className='mt-2 grid grid-cols-2 gap-x-3 gap-y-2'>
      {ELECTED_POSITIONS.map((position) => {
        const rows = positionRows(position, votesByPosition?.[position.id]);
        const total = rows.reduce((sum, row) => sum + row.votes, 0);
        const top = rows[0]?.votes ?? 0;
        const tied = rows.filter((row) => row.votes === top).length > 1;
        const blank = Math.max(cast - total, 0);
        return (
          <section key={position.id} className='break-inside-avoid'>
            <h2 className='text-[10px] font-bold leading-tight'>
              {position.order}. {position.title}
              {isUnopposed(position.id) && (
                <span className='ml-1 font-semibold uppercase text-gray-500'>(Yes / No)</span>
              )}
            </h2>
            <table className='w-full border-collapse text-[9px] leading-tight'>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className={row.votes === top && top > 0 ? "font-bold" : ""}>
                    <td className='border border-gray-400 px-1.5 py-0.5'>
                      {row.name}
                      {row.votes === top && top > 0 && (
                        <span className='ml-1 uppercase'>{tied ? "(tie)" : "(highest)"}</span>
                      )}
                    </td>
                    <td className='w-12 border border-gray-400 px-1.5 py-0.5 text-right tabular-nums'>
                      {row.votes.toLocaleString()}
                    </td>
                    <td className='w-12 border border-gray-400 px-1.5 py-0.5 text-right tabular-nums'>
                      {percent(row.votes, total)}
                    </td>
                  </tr>
                ))}
                <tr className='text-gray-600'>
                  <td className='border border-gray-400 px-1.5 py-0.5'>
                    Total {total.toLocaleString()} · blank {blank.toLocaleString()}
                  </td>
                  <td className='border border-gray-400' colSpan={2} />
                </tr>
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
    <Signatures compact />
  </>
);

const ResultsPrintSheet = ({
  votesByPosition,
  registeredVoters,
  ballotsCast,
  votingOpen,
  compact = false,
  onClose,
}) => {
  const generatedAt = new Date();
  const registered = registeredVoters ?? 0;
  const cast = ballotsCast ?? 0;

  return (
    <div className='fixed inset-0 z-[5000] overflow-y-auto bg-gray-900/70 p-4 print:static print:bg-white print:p-0'>
      <div className='mx-auto mb-4 flex max-w-3xl justify-end gap-2 print:hidden'>
        <button
          type='button'
          onClick={() => window.print()}
          className='inline-flex items-center gap-2 rounded-lg bg-green px-4 py-2 text-sm font-semibold text-white hover:bg-green-dark'
        >
          <Printer className='h-4 w-4' />
          Print / Save as PDF
        </button>
        <button
          type='button'
          onClick={onClose}
          className='inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100'
        >
          <X className='h-4 w-4' />
          Close
        </button>
      </div>

      <article
        className={`print-sheet mx-auto max-w-3xl bg-white text-gray-900 shadow-xl print:max-w-none print:p-0 print:shadow-none ${
          compact ? "print-one-page p-5" : "p-8"
        }`}
      >
        {compact ? (
          <OnePageBody
            votesByPosition={votesByPosition}
            registered={registered}
            cast={cast}
            votingOpen={votingOpen}
            generatedAt={generatedAt}
          />
        ) : (
          <>
            <header className='flex items-center gap-4 border-b-2 border-gray-900 pb-4'>
              <img src={logo} alt='' className='h-14 w-14 object-contain' />
              <div>
                <h1 className='text-2xl font-bold'>{ELECTION_META.title}: Official Results</h1>
                <p className='text-sm text-gray-600'>
                  Session {ELECTION_META.session} · Generated {generatedAt.toLocaleString()} ·{" "}
                  {votingOpen ? "Voting OPEN (provisional)" : "Voting closed"}
                </p>
              </div>
            </header>

            <table className='mt-4 w-full border-collapse text-sm'>
              <tbody>
                <tr>
                  <td className='border border-gray-400 px-3 py-2 font-semibold'>Registered voters</td>
                  <td className='border border-gray-400 px-3 py-2 text-right tabular-nums'>
                    {registered.toLocaleString()}
                  </td>
                  <td className='border border-gray-400 px-3 py-2 font-semibold'>Ballots cast</td>
                  <td className='border border-gray-400 px-3 py-2 text-right tabular-nums'>{cast.toLocaleString()}</td>
                  <td className='border border-gray-400 px-3 py-2 font-semibold'>Turnout</td>
                  <td className='border border-gray-400 px-3 py-2 text-right tabular-nums'>
                    {percent(cast, registered)}
                  </td>
                </tr>
              </tbody>
            </table>

            {ELECTED_POSITIONS.map((position) => {
              const rows = positionRows(position, votesByPosition?.[position.id]);
              const total = rows.reduce((sum, row) => sum + row.votes, 0);
              const top = rows[0]?.votes ?? 0;
              const tied = rows.filter((row) => row.votes === top).length > 1;
              const blank = Math.max(cast - total, 0);

              return (
                <section key={position.id} className='mt-6 break-inside-avoid'>
                  <h2 className='mb-1 text-base font-bold'>
                    {position.order}. {position.title}
                    {isUnopposed(position.id) && (
                      <span className='ml-2 text-xs font-semibold uppercase text-gray-500'>(unopposed: Yes / No)</span>
                    )}
                  </h2>
                  <table className='w-full border-collapse text-sm'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th className='border border-gray-400 px-3 py-1.5 text-left'>Candidate</th>
                        <th className='w-28 border border-gray-400 px-3 py-1.5 text-right'>Votes</th>
                        <th className='w-24 border border-gray-400 px-3 py-1.5 text-right'>Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.id} className={row.votes === top && top > 0 ? "font-bold" : ""}>
                          <td className='border border-gray-400 px-3 py-1.5'>
                            {row.name}
                            {row.votes === top && top > 0 && (
                              <span className='ml-2 text-xs uppercase'>{tied ? "(tie)" : "(highest)"}</span>
                            )}
                          </td>
                          <td className='border border-gray-400 px-3 py-1.5 text-right tabular-nums'>
                            {row.votes.toLocaleString()}
                          </td>
                          <td className='border border-gray-400 px-3 py-1.5 text-right tabular-nums'>
                            {percent(row.votes, total)}
                          </td>
                        </tr>
                      ))}
                      <tr className='bg-gray-50'>
                        <td className='border border-gray-400 px-3 py-1.5 font-semibold'>
                          Total votes for this position
                        </td>
                        <td className='border border-gray-400 px-3 py-1.5 text-right font-semibold tabular-nums'>
                          {total.toLocaleString()}
                        </td>
                        <td className='border border-gray-400 px-3 py-1.5' />
                      </tr>
                      <tr>
                        <td className='border border-gray-400 px-3 py-1.5 text-gray-600'>
                          Ballots left blank for this position
                        </td>
                        <td className='border border-gray-400 px-3 py-1.5 text-right tabular-nums text-gray-600'>
                          {blank.toLocaleString()}
                        </td>
                        <td className='border border-gray-400 px-3 py-1.5' />
                      </tr>
                    </tbody>
                  </table>
                </section>
              );
            })}

            <footer className='mt-10 break-inside-avoid'>
              <p className='text-xs text-gray-600'>
                Counts are taken from the live elections server at the time shown above. Shares are of the votes cast
                for each position; blank ballots are excluded.
              </p>
              <Signatures />
            </footer>
          </>
        )}
      </article>
    </div>
  );
};

export default ResultsPrintSheet;
