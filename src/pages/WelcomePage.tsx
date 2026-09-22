import { Link, Navigate } from 'react-router-dom';
import { BRAND } from '@/brand';
import { useAppState } from '@/state/AppState';
import { ProfileSwitcher } from '@/components/ProfileSwitcher';

const CEFR_PLAIN: Record<string, string> = {
  'pre-a1': 'Pre-beginner — first words and sounds',
  a1: 'Beginner — simple everyday Dutch',
  a2: 'Elementary — longer conversations',
  b1: 'Intermediate — opinions and longer texts',
};

export function WelcomePage() {
  const { activeProfile, updateSettings } = useAppState();

  if (activeProfile.settings.onboardingComplete) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="hero-welcome">
      <section>
        <span className="hero-welcome__badge">{BRAND.shortName}</span>
        <h1>{BRAND.name}</h1>
        <p>{BRAND.tagline}</p>
        <h2>How it works</h2>
        <ol>
          <li>Pick a learner profile (two people can share this device).</li>
          <li>Follow short lessons with explanations, examples, and exercises.</li>
          <li>Review vocabulary on a spaced schedule and track your streak.</li>
        </ol>
        <ProfileSwitcher />
        <h2>CEFR levels (plain English)</h2>
        <ul>
          {Object.entries(CEFR_PLAIN).map(([level, desc]) => (
            <li key={level}>
              <strong>{level.toUpperCase()}</strong> — {desc}
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2>Where would you like to start?</h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <Link
            className="btn btn--primary"
            to="/home"
            onClick={() =>
              updateSettings({
                onboardingComplete: true,
                startPath: 'beginning',
              })
            }
          >
            Start from the beginning
          </Link>
          <Link
            className="btn btn--secondary"
            to="/assessments"
            onClick={() =>
              updateSettings({
                onboardingComplete: true,
                startPath: 'placement',
              })
            }
          >
            Take a placement check first
          </Link>
        </div>
      </section>
    </div>
  );
}
