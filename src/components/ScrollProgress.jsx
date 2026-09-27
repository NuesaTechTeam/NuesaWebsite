import { motion, useScroll, useSpring } from "framer-motion";

/** Thin progress bar at the very top that fills as you scroll the page. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden='true'
      className='fixed left-0 top-0 z-toast h-1 w-full origin-left bg-gradient-to-r from-green-400 via-green-500 to-green-700'
    />
  );
};

export default ScrollProgress;
