/**
 * Infinite horizontal ticker. Duplicates the items so the loop is seamless.
 * Pauses on hover; motion is disabled under prefers-reduced-motion.
 */
const Marquee = ({ items = [], duration = 32, className = "" }) => (
  <div
    className={`marquee group relative overflow-hidden ${className}`}
    aria-hidden='true'
  >
    <div className='marquee-track' style={{ animationDuration: `${duration}s` }}>
      {[...items, ...items].map((item, index) => (
        <span key={`${item}-${index}`} className='marquee-item'>
          {item}
          <span className='marquee-dot' />
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
