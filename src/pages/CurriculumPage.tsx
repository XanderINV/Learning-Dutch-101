import { useMemo, useState } from 'react';
import { modules } from '@/content/curriculum';
import { unlockModulesForLevel, LEVEL_ORDER } from '@/lib/progress';
import { useAppState } from '@/state/AppState';
import { ModuleCard } from '@/components/ModuleCard';
import { EmptyState } from '@/components/EmptyState';
import type { CefrLevel } from '@/content/types';

const LEVEL_LABELS: Record<CefrLevel, string> = {
  'pre-a1': 'Pre-A1',
  a1: 'A1',
  a2: 'A2',
  b1: 'B1',
  b2: 'B2',
};

export function CurriculumPage() {
  const { activeProfile } = useAppState();
  const [filter, setFilter] = useState<CefrLevel | 'all'>('all');
  const progress = unlockModulesForLevel(activeProfile.progress, modules);

  const visible = useMemo(() => {
    const list =
      filter === 'all' ? [...modules] : modules.filter((m) => m.level === filter);
    return list.sort((a, b) => a.order - b.order);
  }, [filter]);

  return (
    <>
      <header className="page-header">
        <h1>Curriculum map</h1>
        <p>
          Browse every level freely — you can start any module without finishing
          earlier ones. Your focus level is{' '}
          <strong>{activeProfile.progress.currentLevel.toUpperCase()}</strong>.
        </p>
      </header>

      <div className="level-filter" role="group" aria-label="Filter by level">
        <button
          type="button"
          className={`btn ${filter === 'all' ? 'btn--secondary' : 'btn--ghost'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        {LEVEL_ORDER.map((level) => (
          <button
            key={level}
            type="button"
            className={`btn ${filter === level ? 'btn--secondary' : 'btn--ghost'}`}
            onClick={() => setFilter(level)}
          >
            {LEVEL_LABELS[level]}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title="No modules for this filter"
          description="Try another CEFR level."
        />
      ) : (
        <div className="grid-cards">
          {visible.map((mod) => {
            const entry = progress.modules.find((m) => m.moduleId === mod.id);
            return (
              <ModuleCard
                key={mod.id}
                module={mod}
                completedLessons={entry?.lessonsCompleted.length ?? 0}
                unlocked
              />
            );
          })}
        </div>
      )}
    </>
  );
}
