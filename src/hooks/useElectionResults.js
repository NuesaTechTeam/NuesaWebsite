import { useCallback, useEffect, useRef, useState } from "react";
import { getResults, getStats, isElectionsApiConfigured } from "../lib/electionsApi";

const REFRESH_MS = 30000;

/**
 * Polls live results + stats. `getToken` picks the session (admin by default;
 * the agents' page passes its own token getter).
 */
export const useElectionResults = ({ getToken, refreshMs = REFRESH_MS } = {}) => {
  const configured = isElectionsApiConfigured();
  const [results, setResults] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(configured);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const cancelledRef = useRef(false);

  const load = useCallback(async () => {
    if (!configured) return;
    try {
      const token = getToken ? getToken() : undefined;
      const [resultsData, statsData] = await Promise.all([getResults(token), getStats(token)]);
      if (cancelledRef.current) return;
      setResults(resultsData);
      setStats(statsData);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      if (cancelledRef.current) return;
      setError(err.message || "Could not load results");
    } finally {
      if (!cancelledRef.current) setLoading(false);
    }
  }, [configured, getToken]);

  useEffect(() => {
    cancelledRef.current = false;

    if (!configured) {
      setLoading(false);
      return undefined;
    }

    let timer = null;

    const start = () => {
      if (timer) return;
      load();
      timer = setInterval(load, refreshMs);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelledRef.current = true;
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [configured, load, refreshMs]);

  const votesByPosition = {};
  for (const position of results?.positions || []) {
    votesByPosition[position.positionId] = {};
    for (const candidate of position.candidates || []) {
      votesByPosition[position.positionId][candidate.candidateId] = candidate.votes;
    }
  }

  return {
    configured,
    results,
    votesByPosition,
    registeredVoters: stats?.registeredVoters ?? null,
    ballotsCast: stats?.ballotsCast ?? null,
    loading,
    error,
    lastUpdated,
    refresh: load,
  };
};

export default useElectionResults;
