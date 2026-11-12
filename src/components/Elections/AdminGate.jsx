import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import ElectionsDashboard from "./ElectionsDashboard";
import { checkAdminSession, getAdminToken, setAdminToken } from "../../lib/electionsApi";

export const Spinner = () => (
  <div className='flex min-h-[60vh] items-center justify-center'>
    <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green' />
  </div>
);

/**
 * Elections admin login + dashboard. The gate is decided by the SERVER, not by
 * a client-side flag: a stored token only counts if the worker confirms it is
 * a live elections-admin session.
 */
const AdminGate = () => {
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

  if (status === "checking") return <Spinner />;

  return status === "authed" ? (
    <ElectionsDashboard
      onLogout={() => {
        setAdminToken("");
        setStatus("guest");
      }}
    />
  ) : (
    <AdminLogin onSuccess={() => setStatus("authed")} />
  );
};

export default AdminGate;
