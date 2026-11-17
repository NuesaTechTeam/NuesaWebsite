import { useEffect, useState } from "react";
import useSEO from "../hooks/useSEO";
import { VoterPortal } from "../components/Elections";
import { Spinner } from "../components/Elections/AdminGate";
import { getElectionStatus } from "../lib/electionsApi";

// How often the page re-checks whether voting has been opened or closed.
const STATUS_POLL_MS = 20000;

/**
 * /elections: the public voter portal. Voters can read the verification steps
 * and the candidates at any time; signing in and voting only work once the
 * admin presses "Start voting" (the server also refuses while voting is closed).
 * The admin dashboard lives at /elections/admin.
 */
const Elections = () => {
  const [votingOpen, setVotingOpen] = useState(null);

  useSEO({
    title: "Elections",
    description:
      "NUESA ABUAD online elections. Verify with your matric and invoice numbers, view the candidates and cast your ballot.",
  });

  useEffect(() => {
    let cancelled = false;
    const check = () =>
      getElectionStatus()
        .then((data) => {
          if (!cancelled) setVotingOpen(Boolean(data.votingOpen));
        })
        .catch(() => {
          if (!cancelled) setVotingOpen((current) => current ?? false);
        });
    check();
    const timer = setInterval(check, STATUS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  if (votingOpen === null) return <Spinner />;
  return <VoterPortal votingOpen={votingOpen} />;
};

export default Elections;
