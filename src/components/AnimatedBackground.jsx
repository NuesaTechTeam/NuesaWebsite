/**
 * Decorative, slowly drifting gradient "aurora" blobs plus a soft grid.
 * Purely cosmetic — never captures pointer events and is hidden from
 * screen readers. Motion is disabled under prefers-reduced-motion (see CSS).
 */
const AnimatedBackground = ({ className = "" }) => (
  <div
    aria-hidden='true'
    className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
  >
    <span className='aurora-blob aurora-blob-1' />
    <span className='aurora-blob aurora-blob-2' />
    <span className='aurora-blob aurora-blob-3' />
    <span className='bg-grid-overlay' />
  </div>
);

export default AnimatedBackground;
