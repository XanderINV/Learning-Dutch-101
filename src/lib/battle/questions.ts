import { getAllExercises, getModuleById, vocabulary } from '@/content/curriculum';
import type { CefrLevel, Exercise } from '@/content/types';
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

function exerciseToBattle(ex: Exercise): BattleQuestion | null {
  if (ex.type !== 'multiple-choice') return null;
  if (!ex.options || !ex.acceptedAnswers?.length) return null;

  const four = uniqueFour(ex.options);
  if (!four) return null;
  const correctIndex = correctIndexFor(four, ex.acceptedAnswers);
  if (correctIndex === null) return null;

  return {
    id: ex.id,
    prompt: ex.prompt,
    promptEn: ex.promptEn,
    options: four as [string, string, string, string],
    explanation: ex.explanation,
    skill: ex.skill,
    correctIndex,
  };
}

function levelOfExercise(ex: Exercise): CefrLevel | null {
  const mod = getModuleById(ex.moduleId);
  return mod?.level ?? null;
}

function vocabBattleQuestions(): BattleQuestion[] {
  const byLevel = new Map<CefrLevel, typeof vocabulary>();
  for (const item of vocabulary) {
    const list = byLevel.get(item.level) ?? [];
    list.push(item);
    byLevel.set(item.level, list);
  }

  const out: BattleQuestion[] = [];
  for (const [level, items] of byLevel) {
    for (let i = 0; i < items.length; i += 1) {
      const target = items[i]!;
      const distractors = items
        .filter((x) => x.id !== target.id)
        .map((x) => x.english);
      const four = uniqueFour([target.english, ...distractors]);
      if (!four) continue;
      const correctIndex = four.findIndex(
        (o) => o.toLocaleLowerCase('en') === target.english.toLocaleLowerCase('en'),
      ) as 0 | 1 | 2 | 3;
      if (correctIndex < 0 || correctIndex > 3) continue;
      out.push({
        id: `vocab-mc-${target.id}`,
        prompt: `What does “${target.dutch}” mean?`,
        promptEn: `Level ${level}`,
        options: four as [string, string, string, string],
        explanation: `${target.dutch} means “${target.english}”. Example: ${target.exampleNl} — ${target.exampleEn}`,
        skill: 'vocabulary',
        correctIndex,
      });

      const dutchFour = uniqueFour([
        target.dutch,
        ...items.filter((x) => x.id !== target.id).map((x) => x.dutch),
      ]);
      if (!dutchFour) continue;
      const dutchCorrect = dutchFour.findIndex(
        (o) => o.toLocaleLowerCase('nl-NL') === target.dutch.toLocaleLowerCase('nl-NL'),
      ) as 0 | 1 | 2 | 3;
      if (dutchCorrect < 0 || dutchCorrect > 3) continue;
      out.push({
        id: `vocab-nl-${target.id}`,
        prompt: `Which Dutch word means “${target.english}”?`,
        promptEn: `Level ${level}`,
        options: dutchFour as [string, string, string, string],
        explanation: `“${target.english}” is ${target.dutch}. ${target.exampleNl}`,
        skill: 'vocabulary',
        correctIndex: dutchCorrect,
      });
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

export function validateBattleQuestion(q: BattleQuestion): string[] {
  const errors: string[] = [];
  if (!q.id) errors.push('missing id');
  if (!q.prompt) errors.push('missing prompt');
  if (!q.explanation) errors.push('missing explanation');
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
  const difficultyAllowed =
    difficulty === 'beginner'
      ? (d: number) => d <= 2
      : (d: number) => d >= 1;

  const matched: BattleQuestion[] = [];
  for (const q of bank) {
    if (q.id.startsWith('vocab-')) {
      const vocabId = q.id.replace(/^vocab-(mc|nl)-/, '');
      const item = vocabulary.find((v) => v.id === vocabId);
      if (item && levels.includes(item.level)) matched.push(q);
      continue;
    }
    const ex = getAllExercises().get(q.id);
    if (!ex) continue;
    const level = levelOfExercise(ex);
    if (!level || !levels.includes(level)) continue;
    if (!difficultyAllowed(ex.difficulty)) continue;
    matched.push(q);
  }

  // Fallback: if filter is too thin, use whole validated bank
  return matched.length >= BATTLE_MAX_ROUNDS ? matched : bank;
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
    picked.push(q);
    if (picked.length >= count) break;
  }
  return picked;
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
