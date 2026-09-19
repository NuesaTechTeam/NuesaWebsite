// ---------------------------------------------------------------------------
// BACKEND
// The elections API lives in /worker (Cloudflare Worker + KV + D1). The frontend
// talks to it via VITE_ELECTIONS_API_URL (see src/lib/electionsApi.js).
// Admin credentials live ONLY as Worker secrets — never in this bundle.
// Remaining wiring: live results + candidates + the voter OTP flow on the UI.
// ---------------------------------------------------------------------------
export const ELECTION_META = {
  title: "NUESA ABUAD Elections",
  session: "2026/2027",
  registeredVoters: 500,
  status: "pending",
};

export const ELECTED_POSITIONS = [
  { id: "president", title: "President", order: 1 },
  { id: "vice-president", title: "Vice President", order: 2 },
  { id: "general-secretary", title: "General Secretary", order: 3 },
  { id: "assistant-general-secretary", title: "Assistant General Secretary", order: 4 },
  { id: "financial-secretary", title: "Financial Secretary", order: 5 },
  { id: "treasurer", title: "Treasurer", order: 6 },
  { id: "public-relations-officer", title: "Public Relations Officer", order: 7 },
  { id: "social-director-male", title: "Social Director (Male)", order: 8 },
  { id: "social-director-female", title: "Social Director (Female)", order: 9 },
  { id: "sports-director-male", title: "Sports Director (Male)", order: 10 },
  { id: "sports-director-female", title: "Sports Director (Female)", order: 11 },
  { id: "welfare-officer", title: "Welfare Officer", order: 12 },
];

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
  "One vote is recorded per position; duplicate or unverified attempts are blocked.",
];

// ---------------------------------------------------------------------------
// PLACEHOLDER DATA
// Replace this whole section once the verified Google Form responses (voters,
// candidates, photos and manifestos) are ready.
// ---------------------------------------------------------------------------
const PLACEHOLDER_MANIFESTO =
  "Manifesto placeholder. This is where the candidate's manifesto will appear once submitted — it also serves as their speech.";

export const CANDIDATES = ELECTED_POSITIONS.flatMap((position, pIndex) => {
  const candidateCount = 2 + (pIndex % 2);
  const base = 60 + ((pIndex * 37) % 120);

  return Array.from({ length: candidateCount }, (_, cIndex) => ({
    id: `${position.id}-${cIndex + 1}`,
    positionId: position.id,
    name: `Candidate ${String.fromCharCode(65 + cIndex)}`,
    photo: "",
    manifesto: PLACEHOLDER_MANIFESTO,
    votes: Math.max(0, base - cIndex * (18 + ((pIndex * 7) % 25))),
  }));
});

export const getPositionById = (positionId) =>
  ALL_POSITIONS.find((position) => position.id === positionId);

export const getCandidatesByPosition = (positionId) =>
  CANDIDATES.filter((candidate) => candidate.positionId === positionId);

export const getPositionTotalVotes = (positionId) =>
  getCandidatesByPosition(positionId).reduce((sum, candidate) => sum + candidate.votes, 0);

export const getTotalVotesCast = () =>
  CANDIDATES.reduce((sum, candidate) => sum + candidate.votes, 0);
