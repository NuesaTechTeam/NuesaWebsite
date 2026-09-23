import { motion } from "framer-motion";
import { getCandidatesByPosition } from "../../lib/electionData";
import VoteBar from "./VoteBar";

const PositionResult = ({ position, index = 0, votesByCandidate }) => {
  const candidates = getCandidatesByPosition(position.id)
    .map((candidate) => ({
      ...candidate,
      votes: votesByCandidate?.[candidate.id] ?? 0,
    }))
    .sort((a, b) => b.votes - a.votes);
  const total = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  const maxVotes = candidates[0]?.votes ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: (index % 2) * 0.06 }}
      className='rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5'
    >
      <div className='mb-4 flex items-center justify-between gap-3'>
        <h3 className='flex items-center gap-2 font-bold text-gray-900 dark:text-white'>
          <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 text-xs font-bold text-green dark:text-green-400'>
            {position.order}
          </span>
          {position.title}
        </h3>
        <span className='shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400'>
          {total} votes
        </span>
      </div>

      <div className='space-y-4'>
        {candidates.map((candidate, candidateIndex) => (
          <VoteBar
            key={candidate.id}
            name={candidate.name}
            votes={candidate.votes}
            total={total}
            rank={candidateIndex + 1}
            isLeading={candidate.votes === maxVotes && maxVotes > 0}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PositionResult;
