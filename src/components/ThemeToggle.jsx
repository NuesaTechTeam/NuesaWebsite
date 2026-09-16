import { Moon, Sun } from "lucide-react";
import { useGlobalContext } from "../context";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useGlobalContext();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-700 hover:bg-green-100 hover:text-green-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-green-400 transition-colors duration-200 active:scale-[0.97] cursor-pointer ${className}`}
    >
      {isDark ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
    </button>
  );
};

export default ThemeToggle;
