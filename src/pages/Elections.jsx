import { useEffect, useState } from "react";
import useSEO from "../hooks/useSEO";
import { AdminLogin, ElectionsDashboard } from "../components/Elections";
import {
  checkAdminSession,
  getAdminToken,
  setAdminToken,
} from "../lib/electionsApi";

const Elections = () => {
  useSEO({
    title: "Elections",
    description:
      "NUESA ABUAD online elections portal. Restricted to authorised technical team members.",
  });

  // The gate is decided by the SERVER, not by a client-side flag. A stored
  // token only counts if the worker confirms it is still valid.
  const [status, setStatus] = useState(() => (getAdminToken() ? "checking" : "guest"));

  useEffect(() => {
    if (status !== "checking") return undefined;

    let cancelled = false;
    checkAdminSession()
      .then(() => {
        if (!cancelled) setStatus("authed");
      })
      .catch(() => {
        if (cancelled) return;
        setAdminToken("");
        setStatus("guest");
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  const handleLogout = () => {
    setAdminToken("");
    setStatus("guest");
  };

  if (status === "checking") {
    return (
      <div className='flex min-h-[60vh] items-center justify-center'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green' />
      </div>
    );
  }

  return status === "authed" ? (
    <ElectionsDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onSuccess={() => setStatus("authed")} />
  );
};

export default Elections;
