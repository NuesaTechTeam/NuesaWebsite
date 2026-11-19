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
