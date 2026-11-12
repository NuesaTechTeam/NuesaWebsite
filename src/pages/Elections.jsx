import { useEffect, useState } from "react";
import useSEO from "../hooks/useSEO";
import { AdminGate, VoterPortal } from "../components/Elections";
import { Spinner } from "../components/Elections/AdminGate";
import { getElectionStatus } from "../lib/electionsApi";

/**
 * /elections: the voter portal while voting is open (switched on from the admin
 * dashboard), otherwise the restricted admin login, so nothing about the
 * election is visible to the public before the window opens.
 */
const Elections = () => {
  const [votingOpen, setVotingOpen] = useState(null);

  useSEO({
    title: "Elections",
    description: votingOpen
      ? "NUESA ABUAD online elections. Verify with your matric and invoice numbers, view the candidates and cast your ballot."
      : "NUESA ABUAD online elections portal. Restricted to authorised technical team members.",
  });

  useEffect(() => {
    let cancelled = false;
    getElectionStatus()
      .then((data) => {
        if (!cancelled) setVotingOpen(Boolean(data.votingOpen));
      })
      .catch(() => {
        if (!cancelled) setVotingOpen(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (votingOpen === null) return <Spinner />;
  return votingOpen ? <VoterPortal /> : <AdminGate />;
};

export default Elections;
