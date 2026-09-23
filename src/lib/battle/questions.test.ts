import { describe, expect, it } from 'vitest';
import {
  getBattleQuestionBank,
  isQualityVocab,
  pickMatchQuestions,
  resetBattleQuestionBankCache,
  shuffleQuestionOptions,
  validateBattleQuestion,
} from '@/lib/battle/questions';
import { vocabulary } from '@/content/curriculum';

describe('battle question bank', () => {
  it('has a substantial validated bank without placeholder vocab', () => {
    resetBattleQuestionBankCache();
    const bank = getBattleQuestionBank();
    expect(bank.length).toBeGreaterThan(40);
    for (const q of bank) {
      expect(validateBattleQuestion(q)).toEqual([]);
      expect(q.prompt).not.toMatch(/concept \d+/i);
      expect(q.options.join(' ')).not.toMatch(/begrip\d+/i);
    }
  });

  it('rejects filler vocabulary stubs', () => {
    const stub = vocabulary.find((v) => /begrip\d+/.test(v.dutch));
    expect(stub).toBeTruthy();
    expect(isQualityVocab(stub!)).toBe(false);
    const real = vocabulary.find((v) => v.dutch === 'verhaal');
    expect(real && isQualityVocab(real)).toBe(true);
  });

  it('shuffles options so the correct answer is not always first', () => {
    resetBattleQuestionBankCache();
    const bank = getBattleQuestionBank();
    const firstIsCorrect = bank.filter((q) => q.correctIndex === 0).length;
    // With a large shuffled bank, not everything should sit at index 0
    expect(firstIsCorrect).toBeLessThan(bank.length * 0.6);
  });

  it('picks unique questions and keeps options synced to correctIndex', () => {
    const picked = pickMatchQuestions('beginner', 123);
    const ids = picked.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(picked.length).toBeGreaterThan(5);
    for (const q of picked) {
      expect(q.options[q.correctIndex]).toBeTruthy();
      const reshuffled = shuffleQuestionOptions(q, 999);
      expect(reshuffled.options[reshuffled.correctIndex]).toBe(
        q.options[q.correctIndex],
      );
    }
  });

  it('builds a harder intermediate pool', () => {
    const picked = pickMatchQuestions('intermediate', 99);
    expect(picked.length).toBeGreaterThan(5);
    expect(picked.every((q) => validateBattleQuestion(q).length === 0)).toBe(
      true,
    );
  });
});
