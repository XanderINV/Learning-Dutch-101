import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getExerciseById,
  getLesson,
  getModuleById,
  getVocabularyById,
} from '@/content/curriculum';
import { isLessonUnlocked, unlockModulesForLevel } from '@/lib/progress';
import { useAppState } from '@/state/AppState';
import { ExplanationCard } from '@/components/ExplanationCard';
import { ExamplePair } from '@/components/ExamplePair';
import { VocabCard } from '@/components/VocabCard';
import { ExercisePlayer } from '@/components/ExercisePlayer';
import { EmptyState } from '@/components/EmptyState';

export function LessonPage() {
  const { moduleId = '', lessonId = '' } = useParams();
  const { activeProfile, completeLesson } = useAppState();
  const [stepIndex, setStepIndex] = useState(0);
  const [exerciseScore, setExerciseScore] = useState({ done: 0, correct: 0 });

  const module = getModuleById(moduleId);
  const lesson = getLesson(moduleId, lessonId);

  const lessonIndex = module?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const progress = unlockModulesForLevel(
    activeProfile.progress,
    module ? [module] : [],
    module?.level ?? 'pre-a1',
  );
  const unlocked =
    module && lessonIndex >= 0
      ? isLessonUnlocked(progress, module, lessonIndex)
      : false;

  const vocabIds = useMemo(() => {
    if (!lesson) return [];
    return lesson.steps.flatMap((s) =>
      s.type === 'vocabulary' ? s.vocabularyIds : [],
    );
  }, [lesson]);

  if (!module || !lesson) {
    return (
      <EmptyState
        title="Lesson not found"
        description="This lesson is not in the curriculum yet."
        action={
          <Link className="btn btn--primary" to="/curriculum">
            Back to map
          </Link>
        }
      />
    );
  }

  if (!unlocked) {
    return (
      <EmptyState
        title="Lesson locked"
        description="Finish the previous lesson in this module first."
        action={
          <Link className="btn btn--primary" to="/curriculum">
            Curriculum map
          </Link>
        }
      />
    );
  }

  const step = lesson.steps[stepIndex];
  const isLast = stepIndex >= lesson.steps.length - 1;

  function finishLesson() {
    const score =
      exerciseScore.done > 0
        ? Math.round((exerciseScore.correct / exerciseScore.done) * 100)
        : undefined;
    completeLesson({
      moduleId,
      lessonId,
      vocabularyIds: vocabIds,
      score,
    });
  }

  return (
    <>
      <header className="page-header">
        <p style={{ margin: 0, color: 'var(--color-ink-muted)' }}>{module.title}</p>
        <h1>{lesson.title}</h1>
        <p>{lesson.objective}</p>
        <p>
          Step {stepIndex + 1} of {lesson.steps.length}
        </p>
      </header>

      {step?.type === 'explanation' ? (
        <ExplanationCard title={step.title} body={step.body} />
      ) : null}
      {step?.type === 'examples' ? (
        <section>
          <h2>{step.title}</h2>
          {step.items.map((item) => (
            <ExamplePair key={item.nl} nl={item.nl} en={item.en} />
          ))}
        </section>
      ) : null}
      {step?.type === 'vocabulary' ? (
        <section>
          <h2>{step.title}</h2>
          <div className="grid-cards">
            {step.vocabularyIds.map((id) => {
              const v = getVocabularyById(id);
              return v ? <VocabCard key={id} item={v} /> : null;
            })}
          </div>
        </section>
      ) : null}
      {step?.type === 'exercise' ? (
        <section>
          {step.exerciseIds.map((id) => {
            const ex = getExerciseById(id);
            if (!ex) {
              return (
                <p key={id} role="status">
                  Exercise {id} is not registered in curriculum yet.
                </p>
              );
            }
            return (
              <ExercisePlayer
                key={id}
                exercise={ex}
                onComplete={(result) =>
                  setExerciseScore((s) => ({
                    done: s.done + 1,
                    correct: s.correct + (result.correct ? 1 : 0),
                  }))
                }
              />
            );
          })}
        </section>
      ) : null}
      {step?.type === 'summary' ? (
        <section className="card">
          <h2>{step.title}</h2>
          <ul>
            {step.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <button
          type="button"
          className="btn btn--ghost"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => i - 1)}
        >
          Previous
        </button>
        {!isLast ? (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setStepIndex((i) => i + 1)}
          >
            Next step
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={finishLesson}>
            Complete lesson
          </button>
        )}
      </div>
    </>
  );
}
