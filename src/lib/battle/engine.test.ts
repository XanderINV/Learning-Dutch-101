import { describe, expect, it } from 'vitest';
import {
  gradeChoice,
  resolveRound,
  seededShuffle,
} from '@/lib/battle/engine';

describe('battle resolveRound', () => {
  it('keeps HP when both correct', () => {
    const r = resolveRound({
      hpA: 7,
      hpB: 7,
      aCorrect: true,
      bCorrect: true,
      roundIndex: 0,
      maxRounds: 18,
    });
    expect(r.hpA).toBe(7);
    expect(r.hpB).toBe(7);
    expect(r.matchOver).toBe(false);
  });

  it('both wrong lose one HP each', () => {
    const r = resolveRound({
      hpA: 7,
      hpB: 7,
      aCorrect: false,
      bCorrect: false,
      roundIndex: 0,
      maxRounds: 18,
    });
    expect(r.hpA).toBe(6);
    expect(r.hpB).toBe(6);
  });

  it('awards win when opponent reaches zero', () => {
    const r = resolveRound({
      hpA: 1,
      hpB: 3,
      aCorrect: false,
      bCorrect: true,
      roundIndex: 2,
      maxRounds: 18,
    });
    expect(r.hpA).toBe(0);
    expect(r.winner).toBe('playerB');
    expect(r.matchOver).toBe(true);
  });

  it('draws when both reach zero same round', () => {
    const r = resolveRound({
      hpA: 1,
      hpB: 1,
      aCorrect: false,
      bCorrect: false,
      roundIndex: 5,
      maxRounds: 18,
    });
    expect(r.bothZero).toBe(true);
    expect(r.winner).toBe('draw');
    expect(r.matchOver).toBe(true);
  });

  it('compares HP at question limit', () => {
    const r = resolveRound({
      hpA: 4,
      hpB: 2,
      aCorrect: true,
      bCorrect: true,
      roundIndex: 17,
      maxRounds: 18,
    });
    expect(r.winner).toBe('playerA');
    expect(r.reason).toBe('question-limit');
  });

  it('draws at question limit with equal HP', () => {
    const r = resolveRound({
      hpA: 3,
      hpB: 3,
      aCorrect: false,
      bCorrect: false,
      roundIndex: 17,
      maxRounds: 18,
    });
    expect(r.winner).toBe('draw');
    expect(r.hpA).toBe(2);
    expect(r.hpB).toBe(2);
  });
});

describe('gradeChoice', () => {
  it('rejects timeout and late answers', () => {
    expect(gradeChoice(1, 1, null, 1000)).toBe(false);
    expect(gradeChoice(1, 1, 1001, 1000)).toBe(false);
    expect(gradeChoice(1, null, 900, 1000)).toBe(false);
  });

  it('accepts on-time correct choice only', () => {
    expect(gradeChoice(2, 2, 900, 1000)).toBe(true);
    expect(gradeChoice(2, 1, 900, 1000)).toBe(false);
  });
});

describe('seededShuffle', () => {
  it('is deterministic for the same seed', () => {
    const a = seededShuffle([1, 2, 3, 4, 5], 42);
    const b = seededShuffle([1, 2, 3, 4, 5], 42);
    expect(a).toEqual(b);
  });
});
