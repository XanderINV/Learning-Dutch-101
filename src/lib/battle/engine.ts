export const BATTLE_START_HP = 7;
export const BATTLE_ROUND_SECONDS = 10;
export const BATTLE_REVEAL_SECONDS = 6;
export const BATTLE_COUNTDOWN_SECONDS = 3;
export const BATTLE_MAX_ROUNDS = 18;
export const BATTLE_CODE_LENGTH = 6;

export type BattleDifficulty = 'beginner' | 'intermediate';

export type BattlePhase =
  | 'lobby'
  | 'countdown'
  | 'answering'
  | 'reveal'
  | 'finished';

export type BattleOutcome = 'playerA' | 'playerB' | 'draw' | null;

export type BattleQuestionPublic = {
  id: string;
  prompt: string;
  promptEn?: string;
  options: [string, string, string, string];
  explanation: string;
  skill: string;
};

/** Full question including correct index — never trust client claims of correctness. */
export type BattleQuestion = BattleQuestionPublic & {
  correctIndex: 0 | 1 | 2 | 3;
};

export type RoundAnswer = {
  /** -1 or null = no answer yet */
  choiceIndex: 0 | 1 | 2 | 3 | -1 | null;
  /** 0 or null = not submitted */
  submittedAt: number | null;
  correct: boolean | null;
};

export type RoundState = {
  index: number;
  questionId: string;
  /** Epoch ms deadline for answers (authoritative). */
  deadlineAt: number;
  revealUntil: number | null;
  answers: {
    a: RoundAnswer;
    b: RoundAnswer;
  };
  resolved: boolean;
  hpAfter: { a: number; b: number } | null;
};

/** Sentinels Firebase will keep (it drops null / empty arrays). */
export function emptyAnswer(): RoundAnswer {
  return { choiceIndex: -1, submittedAt: 0, correct: false };
}

export function hasSubmitted(answer: RoundAnswer | undefined): boolean {
  return (answer?.submittedAt ?? 0) > 0;
}

export type RoundResolution = {
  aCorrect: boolean;
  bCorrect: boolean;
  hpA: number;
  hpB: number;
  bothZero: boolean;
  winner: BattleOutcome;
  matchOver: boolean;
  reason: 'hp' | 'question-limit' | 'continue';
};

/**
 * Pure match rules. Correctness must already be computed from the question bank
 * (never from a client "I was correct" flag).
 */
export function resolveRound(input: {
  hpA: number;
  hpB: number;
  aCorrect: boolean;
  bCorrect: boolean;
  roundIndex: number;
  maxRounds: number;
}): RoundResolution {
  const hpA = input.aCorrect ? input.hpA : Math.max(0, input.hpA - 1);
  const hpB = input.bCorrect ? input.hpB : Math.max(0, input.hpB - 1);
  const bothZero = hpA === 0 && hpB === 0;
  const aOut = hpA === 0;
  const bOut = hpB === 0;

  if (bothZero) {
    return {
      aCorrect: input.aCorrect,
      bCorrect: input.bCorrect,
      hpA,
      hpB,
      bothZero: true,
      winner: 'draw',
      matchOver: true,
      reason: 'hp',
    };
  }
  if (aOut && !bOut) {
    return {
      aCorrect: input.aCorrect,
      bCorrect: input.bCorrect,
      hpA,
      hpB,
      bothZero: false,
      winner: 'playerB',
      matchOver: true,
      reason: 'hp',
    };
  }
  if (bOut && !aOut) {
    return {
      aCorrect: input.aCorrect,
      bCorrect: input.bCorrect,
      hpA,
      hpB,
      bothZero: false,
      winner: 'playerA',
      matchOver: true,
      reason: 'hp',
    };
  }

  const atLimit = input.roundIndex + 1 >= input.maxRounds;
  if (atLimit) {
    if (hpA > hpB) {
      return {
        aCorrect: input.aCorrect,
        bCorrect: input.bCorrect,
        hpA,
        hpB,
        bothZero: false,
        winner: 'playerA',
        matchOver: true,
        reason: 'question-limit',
      };
    }
    if (hpB > hpA) {
      return {
        aCorrect: input.aCorrect,
        bCorrect: input.bCorrect,
        hpA,
        hpB,
        bothZero: false,
        winner: 'playerB',
        matchOver: true,
        reason: 'question-limit',
      };
    }
    return {
      aCorrect: input.aCorrect,
      bCorrect: input.bCorrect,
      hpA,
      hpB,
      bothZero: false,
      winner: 'draw',
      matchOver: true,
      reason: 'question-limit',
    };
  }

  return {
    aCorrect: input.aCorrect,
    bCorrect: input.bCorrect,
    hpA,
    hpB,
    bothZero: false,
    winner: null,
    matchOver: false,
    reason: 'continue',
  };
}

export function gradeChoice(
  correctIndex: number,
  choiceIndex: number | null,
  submittedAt: number | null,
  deadlineAt: number,
): boolean {
  if (choiceIndex === null || choiceIndex < 0 || choiceIndex > 3) return false;
  if (submittedAt === null || submittedAt <= 0) return false;
  if (submittedAt > deadlineAt) return false;
  return choiceIndex === correctIndex;
}

/** Deterministic shuffle from a numeric seed (mulberry32). */
export function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let t = seed >>> 0;
  const random = () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const tmp = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = tmp;
  }
  return arr;
}

export function generateRoomCode(length = BATTLE_CODE_LENGTH): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes =
    typeof crypto !== 'undefined' && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint8Array(length))
      : Uint8Array.from({ length }, () => Math.floor(Math.random() * 256));
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}
