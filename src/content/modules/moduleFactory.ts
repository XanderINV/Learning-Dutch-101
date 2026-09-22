import type { Exercise, Lesson, Module, SkillTag } from '../types';

export function createModule(
  meta: Omit<Module, 'lessons' | 'checkpoint'>,
  lessons: Lesson[],
  lessonExercises: Exercise[],
  checkpoint: Exercise[],
): Module {
  const exerciseMap = new Map<string, Exercise>();
  for (const ex of [...lessonExercises, ...checkpoint]) {
    exerciseMap.set(ex.id, ex);
  }

  const lessonsWithSteps = lessons.map((lesson) => ({
    ...lesson,
    steps: lesson.steps.map((step) => {
      if (step.type !== 'exercise') return step;
      return {
        ...step,
        exerciseIds: step.exerciseIds.filter((id) => exerciseMap.has(id)),
      };
    }),
  }));

  return {
    ...meta,
    lessons: lessonsWithSteps,
    checkpoint,
  };
}

export const skillsAll: SkillTag[] = [
  'listening',
  'reading',
  'writing',
  'speaking',
  'vocabulary',
  'grammar',
  'pronunciation',
];
