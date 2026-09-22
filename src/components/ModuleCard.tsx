import { Link } from 'react-router-dom';
import type { Module } from '@/content/types';
import { ProgressBar } from '@/components/ProgressBar';

type Props = {
  module: Module;
  completedLessons: number;
  unlocked?: boolean;
};

export function ModuleCard({ module, completedLessons, unlocked = true }: Props) {
  const total = module.lessons.length;
  const targetLesson =
    module.lessons[Math.min(completedLessons, Math.max(total - 1, 0))] ??
    module.lessons[0];

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
      {unlocked && targetLesson ? (
        <>
          <Link
            className="btn btn--primary"
            style={{ marginTop: '1rem' }}
            to={`/lesson/${module.id}/${targetLesson.id}`}
          >
            {completedLessons > 0 ? 'Continue' : 'Start module'}
          </Link>
          <ul className="module-card__lessons">
            {module.lessons.map((lesson, index) => (
              <li key={lesson.id}>
                <Link to={`/lesson/${module.id}/${lesson.id}`}>
                  {index + 1}. {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="module-card__locked">This module is unavailable.</p>
      )}
    </article>
  );
}
