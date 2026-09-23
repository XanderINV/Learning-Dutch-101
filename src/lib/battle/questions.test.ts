import { describe, expect, it } from 'vitest';
import {
  getBattleQuestionBank,
  pickMatchQuestions,
  validateBattleQuestion,
} from '@/lib/battle/questions';

describe('battle question bank', () => {
  it('has a substantial validated bank', () => {
    const bank = getBattleQuestionBank();
    expect(bank.length).toBeGreaterThan(40);
    for (const q of bank) {
      expect(validateBattleQuestion(q)).toEqual([]);
    }
  });

  it('picks unique questions per match', () => {
    const picked = pickMatchQuestions('beginner', 123);
    const ids = picked.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(picked.length).toBeGreaterThan(5);
  });

  it('supports intermediate pool', () => {
    const picked = pickMatchQuestions('intermediate', 99);
    expect(picked.length).toBeGreaterThan(5);
  });
});
