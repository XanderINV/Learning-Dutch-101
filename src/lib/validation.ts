import type {
  Assessment,
  CefrLevel,
  Exercise,
  Module,
  VocabularyItem,
} from '@/content/types';

const CEFR_LEVELS: CefrLevel[] = ['pre-a1', 'a1', 'a2', 'b1'];

const NEEDS_ANSWERS: Set<Exercise['type']> = new Set([
  'multiple-choice',
  'fill-blank',
  'sentence-order',
  'matching',
  'translation-nl-en',
  'translation-en-nl',
  'listening',
  'reading-comp',
  'dictation',
  'error-correction',
]);

export type ValidationResult = {
  ok: boolean;
  errors: string[];
};

function push(errors: string[], message: string): void {
  errors.push(message);
}

function validateExercise(ex: Exercise, path: string, errors: string[]): void {
  if (!ex.id) push(errors, `${path}: missing id`);
  if (!ex.prompt?.trim()) push(errors, `${path}: missing prompt`);
  if (!ex.explanation?.trim()) push(errors, `${path}: missing explanation`);
  if (NEEDS_ANSWERS.has(ex.type)) {
    if (!ex.acceptedAnswers?.length) {
      push(errors, `${path}: exercise type ${ex.type} requires acceptedAnswers`);
    }
  }
  if (ex.type === 'multiple-choice' && (!ex.options || ex.options.length < 2)) {
    push(errors, `${path}: multiple-choice needs at least 2 options`);
  }
  if (ex.type === 'sentence-order' && !ex.orderItems?.length) {
    push(errors, `${path}: sentence-order needs orderItems`);
  }
  if (ex.type === 'matching' && !ex.pairs?.length) {
    push(errors, `${path}: matching needs pairs`);
  }
}

export function validateCurriculum(
  modules: Module[],
  vocab: VocabularyItem[],
  assessments: Assessment[],
  lessonExercises: Exercise[] = [],
): ValidationResult {
  const errors: string[] = [];
  const moduleIds = new Set<string>();
  const lessonIds = new Set<string>();
  const exerciseIds = new Set<string>();
  const vocabIds = new Set<string>();
  const exerciseById = new Map<string, Exercise>();

  for (const v of vocab) {
    if (vocabIds.has(v.id)) push(errors, `Duplicate vocabulary id: ${v.id}`);
    vocabIds.add(v.id);
    if (!v.dutch?.trim()) push(errors, `Vocabulary ${v.id}: missing dutch`);
    if (!CEFR_LEVELS.includes(v.level)) {
      push(errors, `Vocabulary ${v.id}: invalid level ${v.level}`);
    }
  }

  for (const ex of lessonExercises) {
    if (exerciseIds.has(ex.id)) push(errors, `Duplicate exercise id: ${ex.id}`);
    exerciseIds.add(ex.id);
    exerciseById.set(ex.id, ex);
    validateExercise(ex, `Lesson exercise ${ex.id}`, errors);
  }

  for (const mod of modules) {
    if (moduleIds.has(mod.id)) push(errors, `Duplicate module id: ${mod.id}`);
    moduleIds.add(mod.id);
    if (!CEFR_LEVELS.includes(mod.level)) {
      push(errors, `Module ${mod.id}: invalid CEFR level`);
    }
    if (!mod.lessons.length) {
      push(errors, `Module ${mod.id}: no lessons`);
    }
    for (const lesson of mod.lessons) {
      if (lessonIds.has(lesson.id)) {
        push(errors, `Duplicate lesson id: ${lesson.id}`);
      }
      lessonIds.add(lesson.id);
      if (!lesson.steps.length) {
        push(errors, `Lesson ${lesson.id}: no steps`);
      }
      for (const step of lesson.steps) {
        if (step.type === 'vocabulary') {
          for (const vid of step.vocabularyIds) {
            if (!vocabIds.has(vid)) {
              push(errors, `Lesson ${lesson.id}: unknown vocabulary id ${vid}`);
            }
          }
        }
        if (step.type === 'exercise') {
          for (const eid of step.exerciseIds) {
            if (!exerciseById.has(eid) && !mod.checkpoint.some((c) => c.id === eid)) {
              push(errors, `Lesson ${lesson.id}: unknown exercise id ${eid}`);
            }
          }
        }
      }
    }
    for (const ex of mod.checkpoint) {
      if (exerciseIds.has(ex.id)) {
        push(errors, `Duplicate exercise id: ${ex.id}`);
      }
      exerciseIds.add(ex.id);
      exerciseById.set(ex.id, ex);
      validateExercise(ex, `Module ${mod.id} checkpoint ${ex.id}`, errors);
    }
    if (mod.checkpoint.length === 0) {
      push(errors, `Module ${mod.id}: empty checkpoint`);
    }
  }

  for (const assessment of assessments) {
    if (!assessment.questions.length) {
      push(errors, `Assessment ${assessment.id}: no questions`);
    }
    for (const q of assessment.questions) {
      if (!q.acceptedAnswers?.length && NEEDS_ANSWERS.has(q.type)) {
        push(errors, `Assessment ${assessment.id} question ${q.id}: missing answers`);
      }
      if (!CEFR_LEVELS.includes(q.level)) {
        push(errors, `Assessment question ${q.id}: invalid level`);
      }
    }
  }

  if (modules.length === 0) {
    push(errors, 'No modules registered');
  }

  return { ok: errors.length === 0, errors };
}
