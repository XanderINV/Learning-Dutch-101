import { getAllExercises, getModuleById, vocabulary } from '@/content/curriculum';
import type { CefrLevel, Exercise, VocabularyItem } from '@/content/types';
import { checkAnswer } from '@/lib/answers';
import {
  type BattleDifficulty,
  type BattleQuestion,
  type BattleQuestionPublic,
  BATTLE_MAX_ROUNDS,
  seededShuffle,
} from '@/lib/battle/engine';

const BEGINNER_LEVELS: CefrLevel[] = ['pre-a1', 'a1'];
const INTERMEDIATE_LEVELS: CefrLevel[] = ['a2', 'b1'];

/** Reject filler/placeholder vocab from generated lists (e.g. begrip398 / "concept 398"). */
export function isQualityVocab(item: VocabularyItem): boolean {
  const dutch = item.dutch.trim();
  const english = item.english.trim();
  if (dutch.length < 2 || english.length < 2) return false;
  if (/\d/.test(dutch) || /\d/.test(english)) return false;
  if (/^concept\b/i.test(english) && english.length < 12) return false;
  if (/^(begrip|woord|item)\d*$/i.test(dutch)) return false;
  // English that is only a number-like stub was already caught; also reject pure stubs
  if (/^(todo|placeholder|xxx)$/i.test(english)) return false;
  return true;
}

function uniqueFour(options: string[]): string[] | null {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const opt of options) {
    const key = opt.trim().toLocaleLowerCase('nl-NL');
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(opt.trim());
    if (out.length === 4) return out;
  }
  return null;
}

function correctIndexFor(
  options: string[],
  acceptedAnswers: string[] | undefined,
): 0 | 1 | 2 | 3 | null {
  if (!acceptedAnswers?.length) return null;
  const matches: number[] = [];
  options.forEach((opt, i) => {
    if (checkAnswer(opt, acceptedAnswers)) matches.push(i);
  });
  if (matches.length !== 1) return null;
  return matches[0] as 0 | 1 | 2 | 3;
}

function hashId(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Shuffle options; keep correctIndex pointing at the same answer text. */
export function shuffleQuestionOptions(
  q: BattleQuestion,
  seed: number,
): BattleQuestion {
  const answer = q.options[q.correctIndex];
  const options = seededShuffle([...q.options], seed) as [
    string,
    string,
    string,
    string,
  ];
  const correctIndex = options.findIndex((o) => o === answer) as 0 | 1 | 2 | 3;
  if (correctIndex < 0) return q;
  return { ...q, options, correctIndex };
}

function exerciseToBattle(ex: Exercise): BattleQuestion | null {
  if (ex.type !== 'multiple-choice') return null;
  if (!ex.options || !ex.acceptedAnswers?.length) return null;

  const four = uniqueFour(ex.options);
  if (!four) return null;
  const correctIndex = correctIndexFor(four, ex.acceptedAnswers);
  if (correctIndex === null) return null;

  const base: BattleQuestion = {
    id: ex.id,
    prompt: ex.prompt,
    promptEn: ex.promptEn,
    options: four as [string, string, string, string],
    explanation: ex.explanation,
    skill: ex.skill,
    correctIndex,
  };
  // Deterministic shuffle so the correct choice is not always first in the bank.
  return shuffleQuestionOptions(base, hashId(ex.id));
}

function levelOfExercise(ex: Exercise): CefrLevel | null {
  const mod = getModuleById(ex.moduleId);
  return mod?.level ?? null;
}

function vocabBattleQuestions(): BattleQuestion[] {
  const quality = vocabulary.filter(isQualityVocab);
  const byLevel = new Map<CefrLevel, VocabularyItem[]>();
  for (const item of quality) {
    const list = byLevel.get(item.level) ?? [];
    list.push(item);
    byLevel.set(item.level, list);
  }

  const out: BattleQuestion[] = [];
  for (const [level, items] of byLevel) {
    if (items.length < 4) continue;
    for (const target of items) {
      const distractors = items
        .filter((x) => x.id !== target.id)
        .map((x) => x.english);
      const four = uniqueFour([target.english, ...distractors]);
      if (!four) continue;
      const enQ: BattleQuestion = {
        id: `vocab-mc-${target.id}`,
        prompt: `What does “${target.dutch}” mean?`,
        promptEn: `Level ${level.toUpperCase()}`,
        options: four as [string, string, string, string],
        explanation: `${target.dutch} means “${target.english}”. Example: ${target.exampleNl} — ${target.exampleEn}`,
        skill: 'vocabulary',
        correctIndex: 0, // before shuffle; target.english was first in uniqueFour input order but uniqueFour may reorder — fix below
      };
      const enCorrect = four.findIndex(
        (o) => o.toLocaleLowerCase('en') === target.english.toLocaleLowerCase('en'),
      );
      if (enCorrect < 0 || enCorrect > 3) continue;
      enQ.correctIndex = enCorrect as 0 | 1 | 2 | 3;
      out.push(shuffleQuestionOptions(enQ, hashId(enQ.id)));

      const dutchFour = uniqueFour([
        target.dutch,
        ...items.filter((x) => x.id !== target.id).map((x) => x.dutch),
      ]);
      if (!dutchFour) continue;
      const nlCorrect = dutchFour.findIndex(
        (o) =>
          o.toLocaleLowerCase('nl-NL') === target.dutch.toLocaleLowerCase('nl-NL'),
      );
      if (nlCorrect < 0 || nlCorrect > 3) continue;
      const nlQ: BattleQuestion = {
        id: `vocab-nl-${target.id}`,
        prompt: `Which Dutch word means “${target.english}”?`,
        promptEn: `Level ${level.toUpperCase()}`,
        options: dutchFour as [string, string, string, string],
        explanation: `“${target.english}” is ${target.dutch}. ${target.exampleNl}`,
        skill: 'vocabulary',
        correctIndex: nlCorrect as 0 | 1 | 2 | 3,
      };
      out.push(shuffleQuestionOptions(nlQ, hashId(nlQ.id)));
    }
  }
  return out;
}

let cachedBank: BattleQuestion[] | null = null;

export function getBattleQuestionBank(): BattleQuestion[] {
  if (cachedBank) return cachedBank;
  const fromExercises: BattleQuestion[] = [];
  for (const ex of getAllExercises().values()) {
    const q = exerciseToBattle(ex);
    if (q) fromExercises.push(q);
  }
  cachedBank = [...fromExercises, ...vocabBattleQuestions()];
  return cachedBank;
}

/** Test helper — clear memoized bank after filter changes. */
export function resetBattleQuestionBankCache(): void {
  cachedBank = null;
}

export function validateBattleQuestion(q: BattleQuestion): string[] {
  const errors: string[] = [];
  if (!q.id) errors.push('missing id');
  if (!q.prompt) errors.push('missing prompt');
  if (!q.explanation) errors.push('missing explanation');
  if (/begrip\d+|concept \d+/i.test(q.prompt) || q.options.some((o) => /begrip\d+|concept \d+/i.test(o))) {
    errors.push('placeholder content');
  }
  if (!q.options || q.options.length !== 4) {
    errors.push('need exactly 4 options');
  } else {
    const norm = q.options.map((o) => o.trim().toLocaleLowerCase('nl-NL'));
    if (new Set(norm).size !== 4) errors.push('options must be distinct');
    if (q.options.some((o) => !o.trim())) errors.push('empty option');
  }
  if (![0, 1, 2, 3].includes(q.correctIndex)) {
    errors.push('correctIndex out of range');
  }
  return errors;
}

export function filterBankForDifficulty(
  difficulty: BattleDifficulty,
): BattleQuestion[] {
  const bank = getBattleQuestionBank().filter(
    (q) => validateBattleQuestion(q).length === 0,
  );
  const levels =
    difficulty === 'beginner' ? BEGINNER_LEVELS : INTERMEDIATE_LEVELS;

  const matched: BattleQuestion[] = [];
  for (const q of bank) {
    if (q.id.startsWith('vocab-')) {
      const vocabId = q.id.replace(/^vocab-(mc|nl)-/, '');
      const item = vocabulary.find((v) => v.id === vocabId);
      if (!item || !isQualityVocab(item)) continue;
      if (!levels.includes(item.level)) continue;
      matched.push(q);
      continue;
    }
    const ex = getAllExercises().get(q.id);
    if (!ex) continue;
    const level = levelOfExercise(ex);
    if (!level || !levels.includes(level)) continue;
    if (difficulty === 'beginner' && ex.difficulty > 2) continue;
    if (difficulty === 'intermediate' && ex.difficulty < 2) continue;
    matched.push(q);
  }

  if (difficulty === 'intermediate') {
    // Prefer curriculum exercises and B1 vocab over A2 vocab
    matched.sort((a, b) => {
      const score = (q: BattleQuestion) => {
        if (!q.id.startsWith('vocab-')) return 0;
        const id = q.id.replace(/^vocab-(mc|nl)-/, '');
        const item = vocabulary.find((v) => v.id === id);
        return item?.level === 'b1' ? 1 : 2;
      };
      return score(a) - score(b);
    });
  }

  if (matched.length >= BATTLE_MAX_ROUNDS) return matched;

  // Fallback: validated bank filtered only by level when possible
  const levelFallback = bank.filter((q) => {
    if (q.id.startsWith('vocab-')) {
      const vocabId = q.id.replace(/^vocab-(mc|nl)-/, '');
      const item = vocabulary.find((v) => v.id === vocabId);
      return item && isQualityVocab(item) && levels.includes(item.level);
    }
    const ex = getAllExercises().get(q.id);
    const level = ex ? levelOfExercise(ex) : null;
    return level != null && levels.includes(level);
  });
  return levelFallback.length >= BATTLE_MAX_ROUNDS ? levelFallback : bank;
}

export function pickMatchQuestions(
  difficulty: BattleDifficulty,
  seed: number,
  count = BATTLE_MAX_ROUNDS,
): BattleQuestion[] {
  const pool = filterBankForDifficulty(difficulty);
  const shuffled = seededShuffle(pool, seed);
  const picked: BattleQuestion[] = [];
  const seen = new Set<string>();
  for (const q of shuffled) {
    if (seen.has(q.id)) continue;
    if (validateBattleQuestion(q).length > 0) continue;
    seen.add(q.id);
    // Per-match shuffle so answer position varies between rooms, stays synced via seed.
    picked.push(shuffleQuestionOptions(q, seed + picked.length * 10007));
    if (picked.length >= count) break;
  }
  return picked;
}

export function questionForRoomRound(
  questionId: string,
  seed: number,
  roundIndex: number,
): BattleQuestion | undefined {
  const base = getBattleQuestionBank().find((q) => q.id === questionId);
  if (!base || questionId === '_pending') return undefined;
  return shuffleQuestionOptions(base, seed + roundIndex * 10007);
}

export function toPublicQuestion(q: BattleQuestion): BattleQuestionPublic {
  return {
    id: q.id,
    prompt: q.prompt,
    promptEn: q.promptEn,
    options: q.options,
    explanation: q.explanation,
    skill: q.skill,
  };
}

export function getQuestionById(id: string): BattleQuestion | undefined {
  return getBattleQuestionBank().find((q) => q.id === id);
}
