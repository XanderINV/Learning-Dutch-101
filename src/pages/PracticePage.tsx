import { useMemo, useState } from 'react';
import { lessonExercises, modules } from '@/content/curriculum';
import { LEVEL_ORDER } from '@/lib/progress';
import { ExercisePlayer } from '@/components/ExercisePlayer';
import { EmptyState } from '@/components/EmptyState';
import type { CefrLevel, ExerciseType } from '@/content/types';

const LEVEL_LABELS: Record<CefrLevel, string> = {
  'pre-a1': 'Pre-A1',
  a1: 'A1',
  a2: 'A2',
  b1: 'B1',
  b2: 'B2',
};

const TYPE_OPTIONS: Array<ExerciseType | 'all'> = [
  'all',
  'multiple-choice',
  'fill-blank',
  'translation-en-nl',
  'translation-nl-en',
  'listening',
  'reading-comp',
  'error-correction',
  'guided-writing',
];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export function PracticePage() {
  const [level, setLevel] = useState<CefrLevel | 'all'>('all');
  const [type, setType] = useState<ExerciseType | 'all'>('all');
  const [seed, setSeed] = useState(0);

  const pool = useMemo(() => {
    const all = [...lessonExercises, ...modules.flatMap((m) => m.checkpoint)];
    const filtered = all.filter((ex) => {
      const mod = modules.find((m) => m.id === ex.moduleId);
      const levelOk = level === 'all' || mod?.level === level;
      const typeOk = type === 'all' || ex.type === type;
      return levelOk && typeOk;
    });
    return shuffle(filtered).slice(0, 6);
    // seed forces reshuffle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, type, seed]);

  return (
    <>
      <header className="page-header">
        <h1>Practice area</h1>
        <p>
          Mix exercises by level and type. Practice does not lock content — pick
          what you want to train.
        </p>
      </header>

      <div className="practice-filters">
        <label>
          Level
          <select
            value={level}
            onChange={(e) =>
              setLevel(e.target.value as CefrLevel | 'all')
            }
          >
            <option value="all">All levels</option>
            {LEVEL_ORDER.map((l) => (
              <option key={l} value={l}>
                {LEVEL_LABELS[l]}
              </option>
            ))}
          </select>
        </label>
        <label>
          Exercise type
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ExerciseType | 'all')}
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setSeed((s) => s + 1)}
        >
          New mixed set
        </button>
      </div>

      {pool.length === 0 ? (
        <EmptyState
          title="No matching exercises"
          description="Try another level or exercise type."
        />
      ) : (
        pool.map((ex) => <ExercisePlayer key={`${seed}-${ex.id}`} exercise={ex} />)
      )}
    </>
  );
}
