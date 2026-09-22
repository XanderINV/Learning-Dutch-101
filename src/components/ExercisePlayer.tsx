import { useState } from 'react';
import type { Exercise } from '@/content/types';
import {
  checkAnswer,
  checkMatchingAnswer,
  checkOrderedAnswer,
} from '@/lib/answers';
import { AudioButton } from '@/components/AudioButton';

export type ExerciseResult = {
  correct: boolean;
  userAnswer: string;
  userItems?: string[];
  pairs?: { left: string; right: string }[];
};

type Props = {
  exercise: Exercise;
  onComplete?: (result: ExerciseResult) => void;
};

type Feedback = 'idle' | 'correct' | 'incorrect';

export function ExercisePlayer({ exercise, onComplete }: Props) {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [matchLeft, setMatchLeft] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Feedback>('idle');
  const [submitted, setSubmitted] = useState(false);

  const isSelfAssessed = exercise.type === 'guided-writing';

  function evaluate(): boolean {
    if (isSelfAssessed) return true;
    const accepted = exercise.acceptedAnswers ?? [];
    switch (exercise.type) {
      case 'multiple-choice':
      case 'reading-comp':
      case 'listening':
        return checkAnswer(selected ?? '', accepted);
      case 'fill-blank':
      case 'translation-nl-en':
      case 'translation-en-nl':
      case 'dictation':
      case 'error-correction':
      case 'pronunciation':
      case 'dialogue':
        return checkAnswer(text, accepted);
      case 'sentence-order':
        return checkOrderedAnswer(order, accepted);
      case 'matching': {
        const pairs = (exercise.pairs ?? []).map((p) => ({
          left: p.left,
          right: matchLeft[p.left] ?? '',
        }));
        return checkMatchingAnswer(pairs, accepted);
      }
      default:
        return checkAnswer(text, accepted);
    }
  }

  function submit() {
    const ok = evaluate();
    setFeedback(ok ? 'correct' : 'incorrect');
    setSubmitted(true);
    const pairs = (exercise.pairs ?? []).map((p) => ({
      left: p.left,
      right: matchLeft[p.left] ?? '',
    }));
    onComplete?.({
      correct: ok,
      userAnswer: selected ?? text,
      userItems: order.length ? order : undefined,
      pairs: exercise.type === 'matching' ? pairs : undefined,
    });
  }

  function reset() {
    setText('');
    setSelected(null);
    setOrder([]);
    setMatchLeft({});
    setFeedback('idle');
    setSubmitted(false);
  }

  const promptId = `ex-prompt-${exercise.id}`;

  return (
    <section className="card" aria-labelledby={promptId}>
      <p id={promptId} style={{ fontWeight: 600 }}>
        {exercise.prompt}
      </p>
      {exercise.promptEn ? (
        <p style={{ color: 'var(--color-ink-muted)' }}>{exercise.promptEn}</p>
      ) : null}
      {exercise.passage ? (
        <div
          style={{
            background: 'var(--color-sky)',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1rem',
          }}
        >
          {exercise.passage}
        </div>
      ) : null}
      {(exercise.audioText || exercise.type === 'listening') && exercise.audioText ? (
        <AudioButton text={exercise.audioText} />
      ) : null}

      {exercise.type === 'multiple-choice' ||
      exercise.type === 'reading-comp' ||
      (exercise.type === 'listening' && (exercise.options?.length ?? 0) > 0) ? (
        <fieldset style={{ border: 'none', padding: 0, margin: '1rem 0' }}>
          <legend className="visually-hidden">Choose an answer</legend>
          {(exercise.options ?? []).map((opt) => (
            <label
              key={opt}
              style={{ display: 'block', marginBottom: '0.35rem', cursor: 'pointer' }}
            >
              <input
                type="radio"
                name={exercise.id}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                disabled={submitted}
              />{' '}
              {opt}
            </label>
          ))}
        </fieldset>
      ) : null}

      {exercise.type === 'sentence-order' ? (
        <div>
          <p>Select words in order:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {(exercise.orderItems ?? []).map((word) => (
              <button
                key={word}
                type="button"
                className="btn btn--ghost"
                disabled={submitted || order.includes(word)}
                onClick={() => setOrder((o) => [...o, word])}
              >
                {word}
              </button>
            ))}
          </div>
          <p aria-live="polite">Your sentence: {order.join(' ') || '—'}</p>
          {!submitted ? (
            <button type="button" className="btn btn--ghost" onClick={() => setOrder([])}>
              Clear order
            </button>
          ) : null}
        </div>
      ) : null}

      {exercise.type === 'matching' ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {(exercise.pairs ?? []).map((pair) => (
            <li key={pair.left} style={{ marginBottom: '0.5rem' }}>
              <label>
                {pair.left} →{' '}
                <select
                  value={matchLeft[pair.left] ?? ''}
                  disabled={submitted}
                  onChange={(e) =>
                    setMatchLeft((m) => ({ ...m, [pair.left]: e.target.value }))
                  }
                >
                  <option value="">Choose…</option>
                  {(exercise.pairs ?? []).map((p) => (
                    <option key={p.right} value={p.right}>
                      {p.right}
                    </option>
                  ))}
                </select>
              </label>
            </li>
          ))}
        </ul>
      ) : null}

      {![
        'multiple-choice',
        'reading-comp',
        'sentence-order',
        'matching',
      ].includes(exercise.type) &&
      !(exercise.type === 'listening' && (exercise.options?.length ?? 0) > 0) ? (
        <label style={{ display: 'block', marginTop: '1rem' }}>
          Your answer
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitted}
            rows={exercise.type === 'guided-writing' ? 5 : 2}
            style={{ width: '100%', marginTop: '0.35rem' }}
          />
        </label>
      ) : null}

      {exercise.hint && feedback === 'incorrect' ? (
        <p style={{ fontSize: '0.9rem' }}>
          <strong>Hint:</strong> {exercise.hint}
        </p>
      ) : null}

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {!submitted ? (
          <button type="button" className="btn btn--primary" onClick={submit}>
            {isSelfAssessed ? 'Compare with model' : 'Check answer'}
          </button>
        ) : (
          <button type="button" className="btn btn--secondary" onClick={reset}>
            Try again
          </button>
        )}
      </div>

      {feedback === 'correct' && isSelfAssessed ? (
        <div className="feedback feedback--success" role="status">
          <span aria-hidden="true">✎</span>
          <div>
            <strong>Self-check</strong>
            <p style={{ margin: 0 }}>
              Compare your writing with the model. This activity is not auto-scored for
              linguistic accuracy.
            </p>
            {exercise.modelAnswer ? (
              <p style={{ margin: '0.5rem 0 0' }}>
                <strong>Model:</strong> {exercise.modelAnswer}
              </p>
            ) : null}
            {exercise.checklist?.length ? (
              <ul>
                {exercise.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <p style={{ margin: '0.5rem 0 0' }}>{exercise.explanation}</p>
          </div>
        </div>
      ) : null}
      {feedback === 'correct' && !isSelfAssessed ? (
        <div className="feedback feedback--success" role="status">
          <span aria-hidden="true">✓</span>
          <div>
            <strong>Correct!</strong>
            <p style={{ margin: 0 }}>{exercise.explanation}</p>
          </div>
        </div>
      ) : null}
      {feedback === 'incorrect' ? (
        <div className="feedback feedback--error" role="status">
          <span aria-hidden="true">✗</span>
          <div>
            <strong>Not quite.</strong>
            <p style={{ margin: 0 }}>{exercise.explanation}</p>
            {exercise.acceptedAnswers?.[0] ? (
              <p style={{ margin: '0.5rem 0 0' }}>
                Expected example: {exercise.acceptedAnswers[0]}
              </p>
            ) : null}
            {exercise.modelAnswer ? (
              <p style={{ margin: '0.5rem 0 0' }}>
                Model: {exercise.modelAnswer}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
