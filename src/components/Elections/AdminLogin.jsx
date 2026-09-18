import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { ADMIN_CREDENTIALS } from "../../lib/electionData";
import { adminLogin, isElectionsApiConfigured } from "../../lib/electionsApi";

const AdminLogin = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isElectionsApiConfigured()) {
        await adminLogin(username, password);
      } else {
        const validUser = username.trim() === ADMIN_CREDENTIALS.username;
        const validPass = password === ADMIN_CREDENTIALS.password;
        if (!validUser || !validPass) {
          throw new Error("Invalid username or password. Access denied.");
        }
      }
      onSuccess();
    } catch (err) {
      setError(err.message || "Invalid username or password. Access denied.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex min-h-[80vh] items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-16'>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className='w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-lg'
      >
        <div className='mb-8 flex flex-col items-center text-center'>
          <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 dark:bg-green-900/30 text-green dark:text-green-400'>
            <ShieldCheck className='h-7 w-7' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Elections Admin
          </h1>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Restricted access. For authorised NUESA technical team members only.
          </p>
        </div>

        <div className='space-y-5'>
          <div>
            <label
              htmlFor='admin-username'
              className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200'
            >
              Username
            </label>
            <div className='relative'>
              <User className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <input
                id='admin-username'
                type='text'
                autoComplete='username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder='Enter username'
                className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 py-2.5 pl-10 pr-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='admin-password'
              className='mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200'
            >
              Password
            </label>
            <div className='relative'>
              <Lock className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <input
                id='admin-password'
                type={showPassword ? "text" : "password"}
                autoComplete='current-password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder='Enter password'
                className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 py-2.5 pl-10 pr-10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/30'
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p
              role='alert'
              className='rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/30 px-3 py-2 text-sm text-red-600 dark:text-red-400'
            >
              {error}
            </p>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full rounded-lg bg-green px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-green-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70'
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
