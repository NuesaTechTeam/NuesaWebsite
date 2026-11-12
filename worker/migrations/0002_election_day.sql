-- Election-day changes: one ballot per voter (partial ballots allowed), a
-- per-matric cap on verification-code sends, and the admin voting switch.
-- Additive and idempotent: safe to run more than once.

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
