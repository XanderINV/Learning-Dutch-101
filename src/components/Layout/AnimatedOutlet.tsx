import { useLocation, useOutlet } from 'react-router-dom';

/** Soft enter animation on route changes (respects reduced-motion via CSS). */
export function AnimatedOutlet() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div key={location.pathname} className="page-enter">
      {outlet}
    </div>
  );
}
