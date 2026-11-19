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

-- One row per submitted ballot. The primary key is what stops a voter who left
-- positions blank from signing in again to fill them in.
CREATE TABLE IF NOT EXISTS ballots (
  matric TEXT PRIMARY KEY,
  voter_key TEXT NOT NULL,
  submitted_at TEXT NOT NULL
);

-- Verification-code sends per matric number (capped to save email/SMS credits).
CREATE TABLE IF NOT EXISTS otp_sends (
  matric TEXT PRIMARY KEY,
  sends INTEGER NOT NULL DEFAULT 0,
  last_sent_at INTEGER NOT NULL
);

-- Small key/value settings. voting_open = '1' opens the voter portal.
CREATE TABLE IF NOT EXISTS election_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO election_settings (key, value) VALUES ('voting_open', '0')
ON CONFLICT (key) DO NOTHING;

-- Voter and ballot tokens, moved out of KV (free plan: 1,000 KV writes/day).
-- Only a SHA-256 hash of each token is stored.
CREATE TABLE IF NOT EXISTS auth_tokens (
  token_hash TEXT PRIMARY KEY,
  kind TEXT NOT NULL,              -- 'voter' | 'ballot'
  payload TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);

-- Verification codes: hash of (voter token + code), with an atomic guess counter.
CREATE TABLE IF NOT EXISTS otp_codes (
  voter_token_hash TEXT PRIMARY KEY,
  code_hash TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER NOT NULL
);

-- Failed admin / agent / mailer login counters (per role + IP, 10 minutes).
CREATE TABLE IF NOT EXISTS login_attempts (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

-- Guard layer: strike counters and timed bans, keyed by IP + user-agent hash
-- so one attacking device never locks out others on the same campus Wi-Fi.
CREATE TABLE IF NOT EXISTS guard_strikes (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS guard_bans (
  ip_ua TEXT PRIMARY KEY,
  until INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

-- Site-wide failed-code alarm: wrong codes per 10-minute bucket.
CREATE TABLE IF NOT EXISTS code_fail_buckets (
  bucket INTEGER PRIMARY KEY,
  count INTEGER NOT NULL
);

-- Running ballot counter (seeded from existing ballots) and storm flag.
INSERT INTO election_settings (key, value)
SELECT 'ballots_cast', CAST(COUNT(*) AS TEXT) FROM ballots WHERE true
ON CONFLICT (key) DO NOTHING;
INSERT INTO election_settings (key, value) VALUES ('storm_until', '0')
ON CONFLICT (key) DO NOTHING;

-- Blog submissions awaiting editorial review. `content` holds the rich-text
-- HTML from the submit form (sanitized before rendering on the site).
CREATE TABLE IF NOT EXISTS blog_submissions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  email TEXT,
  category TEXT,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  created_at TEXT NOT NULL,
  reviewed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_submissions (status);

-- Optional cover image for a submission. The image row shares the submission's
-- id, so we avoid altering blog_submissions. `data` is base64 (no data: prefix).
CREATE TABLE IF NOT EXISTS blog_images (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  data TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Mass-mail campaigns (frontend "Mass Mailer"). Recipients come from the
-- published Google Sheet and are stored as a JSON array. A Cron Trigger drips
-- the emails out in paced batches (over the chosen 1-2 hour window) via Brevo.
CREATE TABLE IF NOT EXISTS mail_campaigns (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  html TEXT,
  recipients TEXT NOT NULL,
  attachments TEXT,
  total INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  started_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'running',  -- running | done | stopped
  sent INTEGER NOT NULL DEFAULT 0,
  failed INTEGER NOT NULL DEFAULT 0,
  cursor INTEGER NOT NULL DEFAULT 0,
  from_name TEXT,
  from_email TEXT,
  reply_to TEXT,
  created_at INTEGER NOT NULL
);

-- Inline images referenced from rich (HTML) campaign emails. `data` is base64
-- (no data: prefix); served publicly at /mail/images/:id so inbox clients load it.
CREATE TABLE IF NOT EXISTS mail_images (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  data TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Per-recipient delivery events for a campaign (used for the live log).
CREATE TABLE IF NOT EXISTS mail_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id TEXT NOT NULL,
  email TEXT NOT NULL,
  ok INTEGER NOT NULL,
  error TEXT,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mail_events_campaign ON mail_events (campaign_id, id);
-- Department elections (MIPESA, APWEN, ...): a private voter list per election.
-- Structure only: the voter rows (matric numbers, emails, phones) are imported separately
-- from a private file and are NEVER committed. Additive and idempotent.
CREATE TABLE IF NOT EXISTS election_voters (
  election_id TEXT NOT NULL,
  matric_key  TEXT NOT NULL,            -- lower-case letters and digits only, e.g. 25eng05001
  matric      TEXT NOT NULL,            -- as listed
  name        TEXT NOT NULL DEFAULT '',
  level       TEXT NOT NULL DEFAULT '',
  department  TEXT NOT NULL DEFAULT '',
  email       TEXT NOT NULL DEFAULT '',
  phone       TEXT NOT NULL DEFAULT '',
  PRIMARY KEY (election_id, matric_key)
);
