import { useEffect, useRef, useState } from "react";

const CountUp = ({
  end = 0,
  duration = 1100,
  prefix = "",
  suffix = "",
  format,
  className = "",
}) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let rafId;
    let observer;
    let cancelled = false;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      if (prefersReduced || duration <= 0) {
        setValue(end);
        return;
      }

      const start = performance.now();

      const tick = (now) => {
        if (cancelled) return;
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(progress < 1 ? end * eased : end);
        if (progress < 1) rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      animate();
      return () => {
        cancelled = true;
      };
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [end, duration]);

  const text = format ? format(value) : String(Math.round(value));

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
};

export default CountUp;
