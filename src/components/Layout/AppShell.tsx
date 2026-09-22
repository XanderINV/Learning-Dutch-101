import { NavLink } from 'react-router-dom';
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
  return (
    <div className="app-shell">
      <header className="app-nav">
        <div className="app-nav__inner">
          <NavLink className="app-nav__brand" to="/home">
            {BRAND.name}
          </NavLink>
          <nav aria-label="Main">
            <ul className="app-nav__links">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ProfileSwitcher />
        </div>
      </header>
      <main className="app-main">
        <AnimatedOutlet />
      </main>
      <footer className="app-footer">{BRAND.tagline}</footer>
    </div>
  );
}
