import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getExerciseById,
  getLesson,
  getModuleById,
  getVocabularyById,
} from '@/content/curriculum';
import { useAppState } from '@/state/AppState';
import { ExplanationCard } from '@/components/ExplanationCard';
import { ExamplePair } from '@/components/ExamplePair';
import { VocabCard } from '@/components/VocabCard';
import { ExercisePlayer } from '@/components/ExercisePlayer';
import { EmptyState } from '@/components/EmptyState';

export function LessonPage() {
  const { moduleId = '', lessonId = '' } = useParams();
  const { completeLesson } = useAppState();
  const [stepIndex, setStepIndex] = useState(0);
  const [exerciseScore, setExerciseScore] = useState({ done: 0, correct: 0 });

  const module = getModuleById(moduleId);
  const lesson = getLesson(moduleId, lessonId);
  const lessonIndex = module?.lessons.findIndex((l) => l.id === lessonId) ?? -1;

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
    <article>
      <header className="page-header">
        <p className="module-card__eyebrow">
          {module.level.toUpperCase()} · Lesson {lessonIndex + 1} of{' '}
          {module.lessons.length}
        </p>
        <h1>{lesson.title}</h1>
        <p>{lesson.objective}</p>
      </header>

      {step?.type === 'explanation' ? (
        <ExplanationCard title={step.title} body={step.body} />
      ) : null}
      {step?.type === 'examples' ? (
        <section className="card">
          <h2>{step.title}</h2>
          {step.items.map((item) => (
            <ExamplePair key={item.nl} nl={item.nl} en={item.en} />
          ))}
        </section>
      ) : null}
      {step?.type === 'vocabulary' ? (
        <section className="card">
          <h2>{step.title}</h2>
          <div className="grid-cards">
            {step.vocabularyIds.map((id) => {
              const item = getVocabularyById(id);
              return item ? <VocabCard key={id} item={item} /> : null;
            })}
          </div>
        </section>
      ) : null}
      {step?.type === 'exercise' ? (
        <div>
          {step.exerciseIds.map((id) => {
            const ex = getExerciseById(id);
            if (!ex) return null;
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
        </div>
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

      <div className="btn-row">
        <button
          type="button"
          className="btn btn--ghost"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
        >
          Back
        </button>
        {!isLast ? (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setStepIndex((i) => i + 1)}
          >
            Continue
          </button>
        ) : (
          <Link
            className="btn btn--primary"
            to="/curriculum"
            onClick={finishLesson}
          >
            Complete lesson
          </Link>
        )}
      </div>
    </article>
  );
}
