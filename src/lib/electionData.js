// ---------------------------------------------------------------------------
// BACKEND
// The elections API lives in /worker (Cloudflare Worker + KV + D1). The frontend
// talks to it via VITE_ELECTIONS_API_URL (see src/lib/electionsApi.js).
// Admin credentials live ONLY as Worker secrets — never in this bundle.
// Remaining wiring: live results + candidates + the voter OTP flow on the UI.
// ---------------------------------------------------------------------------
import BALLOT from "./electionCandidates.json";

export const ELECTION_META = {
  title: "NUESA ABUAD Elections",
  session: "2026/2027",
  status: "pending",
};

export const ELECTED_POSITIONS = [...BALLOT.positions].sort((a, b) => a.order - b.order);

export const APPOINTED_POSITIONS = [
  { id: "chief-of-staff", title: "Chief of Staff", order: 13 },
  { id: "chief-strategy-officer", title: "Chief Strategy Officer", order: 14 },
  { id: "director-of-events", title: "Director of Events", order: 15 },
  { id: "academic-director", title: "Academic Director", order: 16 },
  { id: "technical-director", title: "Technical Director", order: 17 },
  { id: "director-of-sponsorships", title: "Director of Sponsorships", order: 18 },
  { id: "director-of-external-affairs", title: "Director of External Affairs", order: 19 },
  { id: "creative-director", title: "Creative Director", order: 20 },
  { id: "director-of-media-and-publicity", title: "Director of Media and Publicity", order: 21 },
];

export const ALL_POSITIONS = [...ELECTED_POSITIONS, ...APPOINTED_POSITIONS];

// Voters sign in with their matric number as username and invoice number as
// password.
export const VOTER_LOGIN_FIELDS = [
  {
    id: "matricNumber",
    label: "Matric Number",
    hint: "Username",
    type: "text",
    placeholder: "e.g. 24/ENG05/037",
  },
  {
    id: "invoiceNumber",
    label: "Invoice Number",
    hint: "Password",
    type: "password",
    placeholder: "Your dues invoice number",
  },
];

// The OTP is delivered to the email address and phone number on record.
export const VOTER_CONTACT_FIELDS = [
  { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
  { id: "phoneNumber", label: "Phone Number", type: "tel", placeholder: "e.g. 08012345678" },
];

export const VOTER_PROFILE_FIELDS = [
  { id: "department", label: "Department" },
  { id: "level", label: "Level" },
];

export const OTP_STEPS = [
  "Voter signs in with their matric number (username) and invoice number (password).",
  "Details are checked against the verified paid-dues record.",
  "A one-time password is sent to the email address and phone number on record.",
  "Voter enters the OTP to unlock the ballot.",
  "Pick a candidate for any position you want to vote on; you may leave positions blank. Unopposed candidates get a Yes or No vote.",
  "Submit once. Each voter has a single ballot, and it cannot be changed after submission.",
];

// ---------------------------------------------------------------------------
// CANDIDATES
// Loaded from electionCandidates.json, which the elections worker also reads to
// validate ballots. No vote counts live here: tallies come only from the API.
// ---------------------------------------------------------------------------
export const CANDIDATES = BALLOT.candidates;

// Ballot value recorded when a voter rejects an unopposed candidate.
export const NO_VOTE_ID = "no";

export const getPositionById = (positionId) =>
  ALL_POSITIONS.find((position) => position.id === positionId);

export const getCandidatesByPosition = (positionId) =>
  CANDIDATES.filter((candidate) => candidate.positionId === positionId);

/** A position with exactly one candidate is unopposed: voters answer Yes or No. */
export const isUnopposed = (positionId) => getCandidatesByPosition(positionId).length === 1;
