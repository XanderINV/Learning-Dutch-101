import { Link } from 'react-router-dom';
import { BRAND } from '@/brand';
import { modules } from '@/content/curriculum';
import { getDueItems } from '@/lib/review';
import { countVocabularyLearned } from '@/lib/progress';
import { useAppState } from '@/state/AppState';
import { ProgressBar } from '@/components/ProgressBar';

export function HomePage() {
  const { activeProfile, updateSettings } = useAppState();
  const due = getDueItems(activeProfile.reviewQueue).length;
  const vocabCount = countVocabularyLearned(activeProfile);
  const completedLessons = activeProfile.progress.lessons.length;
  const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <>
      <header className="page-header">
        <h1>Welcome back, {activeProfile.name}</h1>
        <p>
          {BRAND.name} is ready when you are — a calm space to build Dutch step
          by step.
        </p>
      </header>
      <div
        className="card"
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
          marginBottom: '2rem',
        }}
      >
        <div>
          <p style={{ margin: 0, color: 'var(--color-ink-muted)' }}>Streak</p>
          <p style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-display)' }}>
            {activeProfile.streak.current} days
          </p>
        </div>
        <div>
          <p style={{ margin: 0, color: 'var(--color-ink-muted)' }}>Due reviews</p>
          <p style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-display)' }}>
            {due}
          </p>
        </div>
        <div>
          <p style={{ margin: 0, color: 'var(--color-ink-muted)' }}>Words saved</p>
          <p style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-display)' }}>
            {vocabCount}
          </p>
        </div>
      </div>
      <ProgressBar
        label="Overall lessons"
        value={completedLessons}
        max={Math.max(totalLessons, 1)}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
        <Link className="btn btn--primary" to="/curriculum">
          Open curriculum map
        </Link>
        <Link className="btn btn--secondary" to="/review">
          Review centre
        </Link>
        <Link
          className="btn btn--ghost"
          to="/"
          onClick={() => updateSettings({ onboardingComplete: false })}
        >
          Replay onboarding
        </Link>
      </div>
    </>
  );
}
