# NUESA ABUAD Elections API (Cloudflare Worker)

Backend for the online elections on the NUESA ABUAD website. It verifies
eligible voters against the Google Form / Sheet of verified dues payments, sends
OTP codes to email + phone, records votes once per position, and serves live
results.

> This is separate from the frontend. The React app talks to it via
> `VITE_ELECTIONS_API_URL` (see `src/lib/electionsApi.js`).

---

## Endpoints

Base URL: `https://<your-worker>.workers.dev`

| Method | Path | Auth | Body | Returns |
|---|---|---|---|---|
| `POST` | `/admin/login` | — | `{ username, password }` | `{ token, expiresIn }` |
| `POST` | `/voter/verify` | — | `{ matricNumber, invoiceNumber }` | `{ voterToken, maskedEmail, maskedPhone, hasEmail, hasPhone }` |
| `POST` | `/voter/otp/send` | — | `{ voterToken }` | `{ sent, channels, maskedEmail, maskedPhone }` |
| `POST` | `/voter/otp/verify` | — | `{ voterToken, code }` | `{ ballotToken }` |
| `POST` | `/vote` | ballot | `{ ballotToken, votes:[{ positionId, candidateId }] }` | `{ recorded: true }` |
| `GET` | `/results` | **admin** | — | `{ positions:[{ positionId, total, candidates:[{ candidateId, votes }] }] }` |
| `GET` | `/stats` | **admin** | — | `{ registeredVoters }` |
| `GET` | `/candidates` | — | — | `{ candidates:[...] }` (from `CANDIDATES_JSON`) |

`/results` and `/stats` require `Authorization: Bearer <admin token>` and are
edge-cached (15 s and 300 s respectively) so dashboard polling does not hammer D1.

Errors return `{ error: "message" }` with an appropriate status code.

### Flow

1. Voter signs in with **matric number (username)** + **invoice number (password)** → `/voter/verify`.
2. Backend matches the row in the voters sheet → issues a short-lived `voterToken`.
3. `/voter/otp/send` generates a 6-digit code, stores it (10 min TTL) and sends it to the voter's **email and phone**.
4. Voter enters the code → `/voter/otp/verify` returns a `ballotToken`.
5. `/vote` records one vote per position. A duplicate vote for the same position is rejected (`409`).
6. `/results` powers the live dashboard.

---

## Google Form / Sheet setup

The backend reads the **linked Google Sheet**, not the Form itself.

1. In the Form: **Responses → Link to Sheets** (creates/links a sheet).
2. Make sure the sheet has columns for at least **Matric Number** and **Invoice Number**
   (header names are matched flexibly, e.g. "Matric No", "Invoice Number").
   Email and Phone columns are used for OTP delivery.
3. Publish the sheet as CSV (quick start): **File → Share → Publish to web → CSV**,
   then set the resulting URL as the `VOTER_SHEET_CSV_URL` secret.

For production, switch to the **Google Sheets API with a service account** (share the
sheet with the service account email) so the data is not publicly readable. The
`findVoter()` function in `src/index.js` is the single place to swap the data source.

---

## Storage

- **KV namespace `SESSIONS`** — admin sessions, voter tokens, OTP codes, ballot tokens.
- **D1 database `DB`** — votes + tallies. Schema in `schema.sql`:

```sql
CREATE TABLE votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  voter_key TEXT NOT NULL,
  position_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE (voter_key, position_id)
);

CREATE TABLE tallies (
  position_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (position_id, candidate_id)
);
```

The `UNIQUE (voter_key, position_id)` constraint is what prevents double voting.

`tallies` holds running per-candidate totals. `castVote` updates it in the same
batch as the `votes` insert, so `GET /results` reads a few dozen rows instead of
scanning the whole `votes` table. `schema.sql` is idempotent and backfills
`tallies` from any existing votes, so re-running `npm run db:init` is safe.

---

## Setup

```bash
cd worker
npm install

# 1. Create the KV namespace and D1 database, then paste their IDs into wrangler.toml
npx wrangler kv namespace create SESSIONS
npx wrangler d1 create nuesa-elections

# 2. Create the votes table
npm run db:init

# 3. Set secrets
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put VOTER_SHEET_CSV_URL
npx wrangler secret put RESEND_API_KEY        # email OTP
npx wrangler secret put TERMII_API_KEY        # SMS OTP (Nigeria)

# 4. (optional) candidates + manifestos, as a JSON array
npx wrangler secret put CANDIDATES_JSON

# 5. Run locally / deploy
npm run dev
npm run deploy
```

### Rotating the admin password

Admin credentials are Worker secrets, never in the repo. To change them:

```bash
cd worker
npx wrangler secret put ADMIN_USERNAME   # enter the username at the prompt
npx wrangler secret put ADMIN_PASSWORD   # enter the new password at the prompt
```

Existing admin sessions are not invalidated automatically, but they expire after
8 hours. To force everyone out immediately, delete the `admin:*` keys in the
`SESSIONS` KV namespace.

### Going live (election day)

Public live results means many browsers polling at once. Before opening the page
to students:

1. **Upgrade the Cloudflare account to Workers Paid ($5/mo).** The free plan
   allows 100,000 requests/day, which ~1500 viewers polling every 30 s will
   exceed. Paid also raises D1 limits well beyond what this workload needs.
2. Apply the schema (creates `tallies` + backfills): `npm run db:init`.
3. Re-check secrets (`VOTER_SHEET_CSV_URL`, `RESEND_API_KEY`, `TERMII_API_KEY`,
   `ADMIN_USERNAME`, `ADMIN_PASSWORD`).
4. `npm run deploy`.
5. Confirm `/results` returns 401 without a token, and 200 with one.

At ~1500 voters: writes are ~18k rows (well under the paid write allowance) and
`/results` reads only the `tallies` table, so D1 load stays flat regardless of
viewer count.

### Providers

- **Email OTP:** [Resend](https://resend.com) (`RESEND_API_KEY`, `OTP_EMAIL_FROM`).
  SendGrid/Mailgun can be swapped in `sendEmail()`.
- **SMS OTP (Nigeria):** [Termii](https://termii.com) (`TERMII_API_KEY`, `TERMII_SENDER_ID`).
  Africa's Talking / Twilio can be swapped in `sendSms()`.

---

## Security notes

- Admin credentials live in Worker secrets, never in the frontend bundle.
- OTP codes expire in 10 minutes and allow a maximum of 5 attempts.
- Ballot tokens expire in 30 minutes and are single-use.
- Vote uniqueness is enforced at the database level, not just in application code.
- Set `ALLOWED_ORIGIN` to the production domain to lock down CORS.
