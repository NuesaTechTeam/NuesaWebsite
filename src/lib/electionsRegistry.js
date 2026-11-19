// ---------------------------------------------------------------------------
// ELECTIONS REGISTRY
// Every election the site runs (NUESA, MIPESA, APWEN, ...) is described here.
// Ballots live in JSON files that the elections worker ALSO reads to validate
// votes (NUESA: electionCandidates.json; others: src/lib/elections/<id>.json).
// To add an election, see the "new-election" skill / HANDOFF.md: add a JSON file,
// register it below AND in worker/src/index.js, add the voter list, deploy both.
// ---------------------------------------------------------------------------
import nuesaLogo from "../assets/logo.png";
import {
  ELECTED_POSITIONS as NUESA_POSITIONS,
  CANDIDATES as NUESA_CANDIDATES,
  ELECTION_META as NUESA_META,
  OTP_STEPS as NUESA_OTP_STEPS,
  VOTER_LOGIN_FIELDS as NUESA_LOGIN_FIELDS,
} from "./electionData";
import MIPESA from "./elections/mipesa.json";
import APWEN from "./elections/apwen.json";

export const NO_VOTE_ID = "no";

const MATRIC_FIELD = {
  id: "matricNumber",
  label: "Matric Number",
  hint: "Username",
  type: "text",
  placeholder: "e.g. 24/ENG05/037",
};

const MATRIC_ONLY_STEPS = [
  "Voter enters their matric number. Only members on the paid voters' list can continue.",
  "A one-time password is sent to the email address and phone number on record.",
  "Voter enters the OTP to unlock the ballot.",
  "Pick a candidate for any position you want to vote on; you may leave positions blank. Unopposed candidates get a Yes or No vote.",
  "Submit once. Each voter has a single ballot, and it cannot be changed after submission.",
];

const build = ({ id, shortName, name, title, session, logo, signIn, loginFields, otpSteps, positions, candidates, blurb, ended = false }) => {
  const elected = [...positions]
    .filter((position) => candidates.some((candidate) => candidate.positionId === position.id))
    .sort((a, b) => a.order - b.order)
    .map((position, index) => ({ ...position, order: index + 1 }));
  const getCandidatesByPosition = (positionId) => candidates.filter((candidate) => candidate.positionId === positionId);
  return {
    id,
    shortName,
    name,
    title,
    session,
    logo,
    blurb,
    ended,
    signIn,
    loginFields,
    otpSteps,
    positions: elected,
    candidates,
    hasBallot: elected.length > 0,
    getCandidatesByPosition,
    getPositionById: (positionId) => elected.find((position) => position.id === positionId),
    /** A position with exactly one candidate is unopposed: voters answer Yes or No. */
    isUnopposed: (positionId) => getCandidatesByPosition(positionId).length === 1,
    candidateName: (candidateId) => candidates.find((candidate) => candidate.id === candidateId)?.name,
  };
};

const fromConfig = (config, blurb) =>
  build({
    id: config.id,
    shortName: config.shortName,
    name: config.name,
    title: config.title,
    session: config.session,
    logo: config.logo,
    signIn: config.signIn || "matric",
    loginFields: [MATRIC_FIELD],
    otpSteps: MATRIC_ONLY_STEPS,
    positions: config.positions,
    candidates: config.candidates,
    blurb,
  });

export const ELECTIONS = {
  nuesa: build({
    id: "nuesa",
    shortName: "NUESA",
    name: "Nigerian Universities Engineering Students Association, ABUAD",
    title: NUESA_META.title,
    session: NUESA_META.session,
    logo: nuesaLogo,
    signIn: "matric-invoice",
    loginFields: NUESA_LOGIN_FIELDS,
    otpSteps: NUESA_OTP_STEPS,
    positions: NUESA_POSITIONS,
    candidates: NUESA_CANDIDATES,
    blurb: "The main NUESA ABUAD executive elections.",
    ended: true, // 18 Nov 2026 election is over; set to false when NUESA votes again
  }),
  mipesa: fromConfig(MIPESA, "Mechatronics, Industrial and Production Engineering students. Paid members only."),
  apwen: fromConfig(APWEN, "APWEN ABUAD Collegiate: female engineering students."),
};

export const ELECTION_ORDER = ["mipesa", "apwen", "nuesa"];

export const getElection = (id) => ELECTIONS[id] || ELECTIONS.nuesa;
export const isElectionId = (id) => Object.prototype.hasOwnProperty.call(ELECTIONS, id);
