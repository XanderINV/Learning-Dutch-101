import type { CefrLevel, VocabularyItem, WordType } from '../types';

export function buildVocab(
  id: string,
  dutch: string,
  english: string,
  wordType: WordType,
  level: CefrLevel,
  topic: string,
  exampleNl: string,
  exampleEn: string,
  extra?: Partial<
    Pick<VocabularyItem, 'article' | 'plural' | 'pronunciationHint' | 'notes'>
  >,
): VocabularyItem {
  return {
    id,
    dutch,
    english,
    wordType,
    level,
    topic,
    exampleNl,
    exampleEn,
    ...extra,
  };
}
