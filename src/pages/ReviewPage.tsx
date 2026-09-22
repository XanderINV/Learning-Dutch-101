import { useState } from 'react';
import { getDueItems, getStatusCounts } from '@/lib/review';
import { getVocabularyById } from '@/content/curriculum';
import { useAppState } from '@/state/AppState';
import { VocabCard } from '@/components/VocabCard';
import { EmptyState } from '@/components/EmptyState';

export function ReviewPage() {
  const { activeProfile, rateReviewCard } = useAppState();
  const [index, setIndex] = useState(0);
  const due = getDueItems(activeProfile.reviewQueue);
  const counts = getStatusCounts(activeProfile.reviewQueue);
  const current = due[index];
  const vocab = current ? getVocabularyById(current.cardId) : undefined;

  function rate(rating: 'Again' | 'Hard' | 'Good' | 'Easy') {
    if (!current) return;
    rateReviewCard(current.cardId, rating);
    setIndex(0);
  }

  return (
    <>
      <header className="page-header">
        <h1>Review centre</h1>
        <p>Spaced repetition keeps vocabulary fresh without cramming.</p>
      </header>
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <p style={{ margin: 0 }}>
          Due today: <strong>{due.length}</strong> · New: {counts.new} · Learning:{' '}
          {counts.learning} · Review: {counts.review} · Mastered: {counts.mastered}
        </p>
      </div>
      {!current || !vocab ? (
        <EmptyState
          title={due.length === 0 ? 'Nothing due right now' : 'Card missing'}
          description={
            due.length === 0
              ? 'Complete lessons to add words, or check back tomorrow.'
              : 'Vocabulary entry not found in curriculum.'
          }
        />
      ) : (
        <>
          <VocabCard item={vocab} />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginTop: '1rem',
            }}
            aria-label="Rate recall"
          >
            {(['Again', 'Hard', 'Good', 'Easy'] as const).map((label) => (
              <button
                key={label}
                type="button"
                className="btn btn--secondary"
                onClick={() => rate(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
