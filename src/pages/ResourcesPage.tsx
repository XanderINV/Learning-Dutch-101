import { useMemo, useState } from 'react';
import { referenceTopics } from '@/content/curriculum';
import { EmptyState } from '@/components/EmptyState';

export function ResourcesPage() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return referenceTopics;
    return referenceTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.titleNl.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q)) ||
        t.content.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <header className="page-header">
        <h1>Resources & reference</h1>
        <p>Grammar notes, quick tables, and searchable hints.</p>
      </header>
      <label>
        Search
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. de het, word order…"
          style={{ display: 'block', width: '100%', maxWidth: '24rem', marginTop: '0.35rem' }}
        />
      </label>
      {filtered.length === 0 ? (
        <EmptyState
          title="Reference topics coming soon"
          description="Authors can add entries to referenceTopics in curriculum.ts."
        />
      ) : (
        <div className="grid-cards" style={{ marginTop: '1.5rem' }}>
          {filtered.map((topic) => (
            <article key={topic.id} className="card">
              <h2>{topic.title}</h2>
              <p style={{ color: 'var(--color-ink-muted)' }}>{topic.titleNl}</p>
              <p>{topic.content}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
