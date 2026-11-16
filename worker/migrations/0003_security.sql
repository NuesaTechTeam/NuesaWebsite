-- Security changes (16 Nov 2026, see election-security/AUDIT.md section 6).
-- Additive and idempotent: safe to run more than once. Existing tables and
-- votes are untouched.

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
