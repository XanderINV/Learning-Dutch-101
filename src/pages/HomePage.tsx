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
  const levelLabel = activeProfile.progress.currentLevel.toUpperCase();

  return (
    <>
      <header className="page-header">
        <h1>Welcome back, {activeProfile.name}</h1>
        <p>
          You are working at <strong>{levelLabel}</strong>. {BRAND.name} keeps
          each session short — continue a lesson, clear reviews, or explore the
          map.
        </p>
      </header>

      <div className="stat-strip" role="group" aria-label="Learning snapshot">
        <div className="stat-tile">
          <p className="stat-tile__label">Streak</p>
          <p className="stat-tile__value">{activeProfile.streak.current}</p>
        </div>
        <div className="stat-tile">
          <p className="stat-tile__label">Reviews due</p>
          <p className="stat-tile__value">{due}</p>
        </div>
        <div className="stat-tile">
          <p className="stat-tile__label">Words saved</p>
          <p className="stat-tile__value">{vocabCount}</p>
        </div>
      </div>

      <section className="card card--panel" aria-labelledby="continue-heading">
        <h2 id="continue-heading">Continue learning</h2>
        <ProgressBar
          label="Overall lessons"
          value={completedLessons}
          max={Math.max(totalLessons, 1)}
        />
        <div className="btn-row">
          <Link className="btn btn--primary" to="/curriculum">
            Open curriculum map
          </Link>
          <Link className="btn btn--secondary" to="/review">
            Review centre{due > 0 ? ` (${due})` : ''}
          </Link>
          <Link
            className="btn btn--ghost"
            to="/"
            onClick={() => updateSettings({ onboardingComplete: false })}
          >
            Replay onboarding
          </Link>
        </div>
      </section>
    </>
  );
}
