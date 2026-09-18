import { useState } from "react";
import useSEO from "../hooks/useSEO";
import { AdminLogin, ElectionsDashboard } from "../components/Elections";

const SESSION_KEY = "nuesa-elections-auth";

const Elections = () => {
  useSEO({
    title: "Elections",
    description:
      "NUESA ABUAD online elections portal. Restricted to authorised technical team members.",
  });

  const [isAuthed, setIsAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      return false;
    }
  });

  const handleSuccess = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // ignore storage access errors
    }
    setIsAuthed(true);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore storage access errors
    }
    setIsAuthed(false);
  };

  return isAuthed ? (
    <ElectionsDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onSuccess={handleSuccess} />
  );
};

export default Elections;
