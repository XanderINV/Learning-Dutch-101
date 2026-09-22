import type { VocabularyItem } from '../types';
import { vocabularyPreA1Items } from './preA1';
import { vocabularyA1Items } from './a1';
import { vocabularyA2Items } from './a2';
import { vocabularyB1Items } from './b1';
import { vocabularyB2Items } from './b2';

export const vocabularyItems: VocabularyItem[] = [
  ...vocabularyPreA1Items,
  ...vocabularyA1Items,
  ...vocabularyA2Items,
  ...vocabularyB1Items,
  ...vocabularyB2Items,
];

export function getVocabularyById(id: string): VocabularyItem | undefined {
  return vocabularyItems.find((v) => v.id === id);
}

export function getVocabularyByLevel(level: VocabularyItem['level']): VocabularyItem[] {
  return vocabularyItems.filter((v) => v.level === level);
}
