import { Link } from 'react-router-dom';
import type { Module } from '@/content/types';
import { ProgressBar } from '@/components/ProgressBar';

type Props = {
  module: Module;
  completedLessons: number;
  unlocked: boolean;
};

export function ModuleCard({ module, completedLessons, unlocked }: Props) {
  const total = module.lessons.length;
  const firstLesson = module.lessons[0];

  return (
    <article
      className={`card${unlocked ? ' card--interactive' : ''}`}
      aria-labelledby={`mod-${module.id}`}
    >
      <p className="module-card__eyebrow">
        {module.level} · {module.topic}
      </p>
      <h2 id={`mod-${module.id}`}>{module.title}</h2>
      <p className="module-card__desc">{module.description}</p>
      <ProgressBar
        label="Lessons completed"
        value={completedLessons}
        max={Math.max(total, 1)}
      />
      {unlocked && firstLesson ? (
        <Link
          className="btn btn--primary"
          style={{ marginTop: '1rem' }}
          to={`/lesson/${module.id}/${firstLesson.id}`}
        >
          {completedLessons > 0 ? 'Continue' : 'Start module'}
        </Link>
      ) : (
        <p className="module-card__locked">Complete the previous module to unlock.</p>
      )}
    </article>
  );
}
