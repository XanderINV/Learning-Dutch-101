import type { Exercise, SkillTag } from '../types';

type Base = {
  id: string;
  moduleId: string;
  lessonId?: string;
  prompt: string;
  promptEn?: string;
  explanation: string;
  skill: SkillTag;
  difficulty?: 1 | 2 | 3;
  hint?: string;
};

export function mc(
  base: Base & { options: string[]; acceptedAnswers: string[] },
): Exercise {
  return {
    type: 'multiple-choice',
    difficulty: base.difficulty ?? 1,
    ...base,
  };
}

export function fill(
  base: Base & { acceptedAnswers: string[] },
): Exercise {
  return {
    type: 'fill-blank',
    difficulty: base.difficulty ?? 1,
    ...base,
  };
}

export function translateNlEn(
  base: Base & { acceptedAnswers: string[] },
): Exercise {
  return {
    type: 'translation-nl-en',
    difficulty: base.difficulty ?? 2,
    ...base,
  };
}

export function translateEnNl(
  base: Base & { acceptedAnswers: string[] },
): Exercise {
  return {
    type: 'translation-en-nl',
    difficulty: base.difficulty ?? 2,
    ...base,
  };
}

export function order(
  base: Base & { orderItems: string[]; acceptedAnswers: string[] },
): Exercise {
  return {
    type: 'sentence-order',
    difficulty: base.difficulty ?? 2,
    ...base,
  };
}

export function matching(
  base: Base & {
    pairs: { left: string; right: string }[];
    acceptedAnswers: string[];
  },
): Exercise {
  return {
    type: 'matching',
    difficulty: base.difficulty ?? 1,
    ...base,
  };
}

export function readingComp(
  base: Base & { passage: string; acceptedAnswers: string[]; options?: string[] },
): Exercise {
  return {
    type: 'reading-comp',
    difficulty: base.difficulty ?? 2,
    ...base,
  };
}

export function listeningEx(
  base: Base & { audioText: string; acceptedAnswers: string[]; options?: string[] },
): Exercise {
  return {
    type: 'listening',
    difficulty: base.difficulty ?? 2,
    ...base,
  };
}

export function errorCorrection(
  base: Base & { acceptedAnswers: string[] },
): Exercise {
  return {
    type: 'error-correction',
    difficulty: base.difficulty ?? 2,
    ...base,
  };
}

export function pronunciationEx(
  base: Base & { audioText: string; acceptedAnswers: string[] },
): Exercise {
  return {
    type: 'pronunciation',
    difficulty: base.difficulty ?? 1,
    ...base,
  };
}

export function guidedWriting(
  base: Base & { modelAnswer: string; checklist: string[] },
): Exercise {
  return {
    type: 'guided-writing',
    difficulty: base.difficulty ?? 2,
    ...base,
  };
}

export function dialogueEx(
  base: Base & { acceptedAnswers: string[] },
): Exercise {
  return {
    type: 'dialogue',
    difficulty: base.difficulty ?? 2,
    ...base,
  };
}

export function dictationEx(
  base: Base & { audioText: string; acceptedAnswers: string[] },
): Exercise {
  return {
    type: 'dictation',
    difficulty: base.difficulty ?? 2,
    ...base,
  };
}
