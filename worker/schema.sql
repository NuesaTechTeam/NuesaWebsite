-- NUESA ABUAD Elections — D1 schema
-- Run: npm run db:init (remote) or npm run db:init:local (local dev)
-- Safe to re-run: every statement is idempotent.

CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  voter_key TEXT NOT NULL,
  position_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE (voter_key, position_id)
);

CREATE INDEX IF NOT EXISTS idx_votes_position ON votes (position_id);
CREATE INDEX IF NOT EXISTS idx_votes_candidate ON votes (position_id, candidate_id);

-- Aggregate tallies. Keeps /results cheap: it reads this small table instead of
-- scanning every row in `votes` on each poll. Updated inside castVote's batch.
CREATE TABLE IF NOT EXISTS tallies (
  position_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (position_id, candidate_id)
);

-- Backfill tallies from existing votes (idempotent: sets the true counts).
INSERT INTO tallies (position_id, candidate_id, votes)
SELECT position_id, candidate_id, COUNT(*)
FROM votes
GROUP BY position_id, candidate_id
ON CONFLICT (position_id, candidate_id) DO UPDATE SET votes = excluded.votes;
