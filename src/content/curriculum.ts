import type {
  Assessment,
  Exercise,
  Module,
  ReferenceTopic,
  VocabularyItem,
} from './types';
import { modules as contentModules, allLessonExercises } from './modules';
import { vocabularyItems } from './vocabulary';
import { assessments as contentAssessments } from './assessments';
import { referenceTopics as contentReferences } from './references';

export const modules: Module[] = contentModules;

export const vocabulary: VocabularyItem[] = vocabularyItems;

export const assessments: Assessment[] = contentAssessments;

export const referenceTopics: ReferenceTopic[] = contentReferences;

/** Lesson exercises registered by content modules (not in checkpoint). */
export const lessonExercises: Exercise[] = allLessonExercises;

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getModule(id: string): Module | undefined {
  return getModuleById(id);
}

export function getLesson(moduleId: string, lessonId: string) {
  const mod = getModuleById(moduleId);
  return mod?.lessons.find((l) => l.id === lessonId);
}

export function getAllExercises(): Map<string, Exercise> {
  const map = new Map<string, Exercise>();
  for (const mod of modules) {
    for (const ex of mod.checkpoint) {
      map.set(ex.id, ex);
    }
  }
  for (const ex of lessonExercises) {
    map.set(ex.id, ex);
  }
  return map;
}

export function getExerciseById(id: string) {
  return getAllExercises().get(id);
}

export function getVocabularyById(id: string): VocabularyItem | undefined {
  return vocabulary.find((v) => v.id === id);
}

export function getAssessmentById(id: string): Assessment | undefined {
  return assessments.find((a) => a.id === id);
}

export function getReferenceTopicById(id: string): ReferenceTopic | undefined {
  return referenceTopics.find((t) => t.id === id);
}
