import { useCallback, useEffect, useState } from "react";
import useSEO from "../hooks/useSEO";
import { AdminLogin, AgentsDashboard } from "../components/Elections";
import { Spinner } from "../components/Elections/AdminGate";
import {
  agentLogin,
  checkAgentSession,
  getAgentToken,
  setAgentToken,
} from "../lib/electionsApi";

/** /elections/agents: live results only, for candidates' agents in the office. */
const ElectionsAgents = () => {
  useSEO({
    title: "Elections Live View",
    description: "NUESA ABUAD elections live results for candidates' agents. Restricted access.",
  });

  const [status, setStatus] = useState(() => (getAgentToken() ? "checking" : "guest"));

  useEffect(() => {
    if (status !== "checking") return undefined;
    let cancelled = false;
    checkAgentSession()
      .then(() => {
        if (!cancelled) setStatus("authed");
      })
      .catch(() => {
        if (cancelled) return;
        setAgentToken("");
        setStatus("guest");
      });
    return () => {
      cancelled = true;
    };
  }, [status]);

  const logout = useCallback(() => {
    setAgentToken("");
    setStatus("guest");
  }, []);

  if (status === "checking") return <Spinner />;

  return status === "authed" ? (
    <AgentsDashboard onLogout={logout} />
  ) : (
    <AdminLogin
      title="Agents' Live View"
      subtitle="Sign in with the agents' credentials provided by the electoral committee."
      login={agentLogin}
      idPrefix="agent"
      onSuccess={() => setStatus("authed")}
    />
  );
};

export default ElectionsAgents;
