import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Cloudflare's always-pass test key on localhost; the real site key otherwise.
// Site keys are public by design (they ship in every page that uses them).
// Leave TURNSTILE_SITE_KEY empty to hide the widget (the server check is off
// until its TURNSTILE_SECRET is set too).
const TURNSTILE_SITE_KEY = "";
const TEST_SITE_KEY = "1x00000000000000000000AA";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const LOAD_TIMEOUT_MS = 8000;

export const turnstileSiteKey = () => {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return TEST_SITE_KEY;
  return import.meta.env.VITE_TURNSTILE_SITE_KEY || TURNSTILE_SITE_KEY;
};

let scriptPromise = null;
const loadScript = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("no turnstile")));
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return Promise.race([
    scriptPromise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Turnstile load timeout")), LOAD_TIMEOUT_MS)),
  ]);
};

/**
 * Cloudflare Turnstile "are you human" check. Reports its state through
 * onChange({ token, unavailable }): a fresh single-use token once passed, or
 * unavailable: true if Cloudflare's script can't be loaded (the server only
 * accepts that when it also can't reach Cloudflare). Call ref.reset() after
 * each submit to get a new token.
 */
const TurnstileWidget = forwardRef(({ onChange }, ref) => {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const siteKey = turnstileSiteKey();

  useImperativeHandle(ref, () => ({
    reset: () => {
      onChangeRef.current?.({ token: "", unavailable: false });
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.reset(widgetIdRef.current);
      }
    },
  }));

  useEffect(() => {
    if (!siteKey) {
      onChangeRef.current?.({ token: "", unavailable: false, disabled: true });
      return undefined;
    }
    let cancelled = false;
    loadScript()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          appearance: "interaction-only",
          callback: (token) => onChangeRef.current?.({ token, unavailable: false }),
          "expired-callback": () => onChangeRef.current?.({ token: "", unavailable: false }),
          "error-callback": () => {
            onChangeRef.current?.({ token: "", unavailable: true });
            return true;
          },
        });
      })
      .catch(() => {
        if (!cancelled) onChangeRef.current?.({ token: "", unavailable: true });
      });
    return () => {
      cancelled = true;
      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // already removed
        }
      }
      widgetIdRef.current = null;
    };
  }, [siteKey]);

  if (!siteKey) return null;
  return <div ref={containerRef} className='flex justify-center' />;
});

TurnstileWidget.displayName = "TurnstileWidget";

/** Whether a form may submit given the widget's state. */
export const turnstileReady = (state) =>
  Boolean(state?.disabled || state?.token || state?.unavailable);

/** The fields the server expects alongside a form submit. */
export const turnstileFields = (state) => ({
  turnstileToken: state?.token || "",
  turnstileUnavailable: Boolean(state?.unavailable),
});

export default TurnstileWidget;
