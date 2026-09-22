import { useId, useState } from 'react';

type Props = {
  nl: string;
  en: string;
};

export function ExamplePair({ nl, en }: Props) {
  const [revealed, setRevealed] = useState(false);
  const id = useId();

  return (
    <figure className="card" style={{ margin: '0.5rem 0' }}>
      <blockquote cite="nl">{nl}</blockquote>
      <figcaption>
        <button
          type="button"
          className="btn btn--ghost"
          aria-expanded={revealed}
          aria-controls={id}
          onClick={() => setRevealed((v) => !v)}
        >
          {revealed ? 'Hide translation' : 'Reveal translation'}
        </button>
        {revealed ? (
          <p id={id} style={{ marginTop: '0.5rem' }}>
            {en}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
