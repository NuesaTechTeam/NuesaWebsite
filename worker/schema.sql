-- NUESA ABUAD Elections — D1 schema
-- Run once: npm run db:init (remote) or npm run db:init:local (local dev)

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
