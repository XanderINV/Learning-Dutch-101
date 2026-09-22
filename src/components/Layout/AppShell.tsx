import { useEffect, useId, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BRAND } from '@/brand';
import { ProfileSwitcher } from '@/components/ProfileSwitcher';
import { AnimatedOutlet } from '@/components/Layout/AnimatedOutlet';

const links = [
  { to: '/home', label: 'Home' },
  { to: '/curriculum', label: 'Curriculum' },
  { to: '/review', label: 'Review' },
  { to: '/practice', label: 'Practice' },
  { to: '/assessments', label: 'Assessments' },
  { to: '/progress', label: 'Progress' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
];

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('nav-lock');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('nav-lock');
    };
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <header className="app-nav">
        <div className="app-nav__inner">
          <NavLink className="app-nav__brand" to="/home">
            {BRAND.name}
          </NavLink>

          <button
            type="button"
            className="app-nav__toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="visually-hidden">
              {menuOpen ? 'Close menu' : 'Open menu'}
            </span>
            <span className="app-nav__toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <div
            id={menuId}
            className={`app-nav__panel${menuOpen ? ' is-open' : ''}`}
          >
            <nav aria-label="Main">
              <ul className="app-nav__links">
                {links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        isActive ? 'active' : undefined
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="app-nav__profiles">
              <ProfileSwitcher />
            </div>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <button
          type="button"
          className="app-nav__backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <main className="app-main">
        <AnimatedOutlet />
      </main>
      <footer className="app-footer">{BRAND.tagline}</footer>
    </div>
  );
}
