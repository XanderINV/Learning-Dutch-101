import type { VocabularyItem } from '@/content/types';
import { AudioButton } from '@/components/AudioButton';

type Props = {
  item: VocabularyItem;
};

export function VocabCard({ item }: Props) {
  const headword = item.article ? `${item.article} ${item.dutch}` : item.dutch;
  return (
    <article className="card">
      <header>
        <h3>{headword}</h3>
        <p style={{ color: 'var(--color-ink-muted)', margin: 0 }}>{item.english}</p>
      </header>
      <p style={{ fontSize: '0.95rem' }}>
        <em>{item.exampleNl}</em>
        <br />
        {item.exampleEn}
      </p>
      {item.notes ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>{item.notes}</p>
      ) : null}
      <AudioButton text={item.dutch} label={`Pronounce ${item.dutch}`} />
    </article>
  );
}
