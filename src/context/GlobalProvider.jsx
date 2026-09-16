import GlobalContext from "./GlobalContext";
import global_reducer from "../reducer/global-reducer";
import { useReducer, useState, useEffect, useCallback } from "react";

const initialState = {};

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore storage access errors
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(global_reducer, initialState);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");

    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore storage access errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch, theme, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
