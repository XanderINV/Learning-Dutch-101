import { useMemo, useState } from 'react';
import { modules } from '@/content/curriculum';
import { skillBreakdown, type ScoredItem } from '@/lib/scoring';
import { countVocabularyLearned } from '@/lib/progress';
import { useAppState } from '@/state/AppState';
import { ProgressBar } from '@/components/ProgressBar';
import { SkillChart } from '@/components/SkillChart';
import { ConfirmDialog } from '@/components/ConfirmDialog';

export function ProgressPage() {
  const { activeProfile, exportData, importData, resetActiveProfile, updateSettings } =
    useAppState();
  const [confirmReset, setConfirmReset] = useState(false);

  const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0);
  const completed = activeProfile.progress.lessons.length;

  const skillItems: ScoredItem[] = useMemo(
    () =>
      activeProfile.progress.lessons.flatMap((l) => ({
        id: l.lessonId,
        skill: 'vocabulary' as const,
        correct: (l.score ?? 100) >= 80,
      })),
    [activeProfile.progress.lessons],
  );

  return (
    <>
      <header className="page-header">
        <h1>Your progress</h1>
        <p>Level {activeProfile.progress.currentLevel.toUpperCase()} · longest streak{' '}
          {activeProfile.streak.longest} days</p>
      </header>
      <ProgressBar label="Lessons completed" value={completed} max={Math.max(totalLessons, 1)} />
      <p style={{ marginTop: '1rem' }}>
        Vocabulary learned: {countVocabularyLearned(activeProfile)}
      </p>
      <SkillChart items={skillBreakdown(skillItems)} title="Lesson scores" />
      <section className="card" style={{ marginTop: '2rem' }}>
        <h2>Settings & data</h2>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={activeProfile.settings.slowSpeech}
            onChange={(e) => updateSettings({ slowSpeech: e.target.checked })}
          />
          Slower Dutch speech
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => {
              const blob = new Blob([exportData()], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'samen-nederlands-backup.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export JSON
          </button>
          <label className="btn btn--ghost" style={{ cursor: 'pointer' }}>
            Import JSON
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                importData(text);
              }}
            />
          </label>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setConfirmReset(true)}
          >
            Reset profile
          </button>
        </div>
      </section>
      <ConfirmDialog
        open={confirmReset}
        title="Reset this profile?"
        message="All progress, reviews, and settings for the active learner will be cleared."
        confirmLabel="Reset"
        onConfirm={() => {
          resetActiveProfile();
          setConfirmReset(false);
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </>
  );
}
