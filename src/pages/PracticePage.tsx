import { lessonExercises, modules } from '@/content/curriculum';
import { ExercisePlayer } from '@/components/ExercisePlayer';
import { EmptyState } from '@/components/EmptyState';

export function PracticePage() {
  const pool = [
    ...lessonExercises,
    ...modules.flatMap((m) => m.checkpoint),
  ].slice(0, 5);

  return (
    <>
      <header className="page-header">
        <h1>Practice area</h1>
        <p>Quick exercises drawn from lessons — no progress pressure.</p>
      </header>
      {pool.length === 0 ? (
        <EmptyState
          title="Practice sets arrive with content"
          description="When modules land in curriculum.ts, exercises will appear here automatically."
        />
      ) : (
        pool.map((ex) => <ExercisePlayer key={ex.id} exercise={ex} />)
      )}
    </>
  );
}
