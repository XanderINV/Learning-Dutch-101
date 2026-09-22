export type CefrLevel = 'pre-a1' | 'a1' | 'a2' | 'b1' | 'b2';

export type SkillTag =
  | 'listening'
  | 'reading'
  | 'writing'
  | 'speaking'
  | 'vocabulary'
  | 'grammar'
  | 'pronunciation';

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'sentence-order'
  | 'matching'
  | 'translation-nl-en'
  | 'translation-en-nl'
  | 'listening'
  | 'reading-comp'
  | 'dictation'
  | 'guided-writing'
  | 'dialogue'
  | 'error-correction'
  | 'pronunciation';

export type WordType =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection'
  | 'numeral'
  | 'phrase'
  | 'determiner'
  | 'article';

export interface VocabularyItem {
  id: string;
  dutch: string;
  english: string;
  article?: 'de' | 'het';
  plural?: string;
  wordType: WordType;
  level: CefrLevel;
  topic: string;
  exampleNl: string;
  exampleEn: string;
  pronunciationHint?: string;
  notes?: string;
}

export interface Exercise {
  id: string;
  moduleId: string;
  lessonId?: string;
  type: ExerciseType;
  prompt: string;
  promptEn?: string;
  options?: string[];
  acceptedAnswers?: string[];
  pairs?: { left: string; right: string }[];
  orderItems?: string[];
  explanation: string;
  hint?: string;
  skill: SkillTag;
  difficulty: 1 | 2 | 3;
  audioText?: string;
  passage?: string;
  modelAnswer?: string;
  checklist?: string[];
}

export type LessonStepType =
  | 'explanation'
  | 'examples'
  | 'vocabulary'
  | 'exercise'
  | 'summary';

export interface LessonExample {
  nl: string;
  en: string;
}

export interface LessonStepExplanation {
  type: 'explanation';
  title: string;
  body: string;
}

export interface LessonStepExamples {
  type: 'examples';
  title: string;
  items: LessonExample[];
}

export interface LessonStepVocabulary {
  type: 'vocabulary';
  title: string;
  vocabularyIds: string[];
}

export interface LessonStepExercise {
  type: 'exercise';
  exerciseIds: string[];
}

export interface LessonStepSummary {
  type: 'summary';
  title: string;
  bullets: string[];
}

export type LessonStep =
  | LessonStepExplanation
  | LessonStepExamples
  | LessonStepVocabulary
  | LessonStepExercise
  | LessonStepSummary;

export interface Lesson {
  id: string;
  title: string;
  objective: string;
  steps: LessonStep[];
}

export interface Module {
  id: string;
  level: CefrLevel;
  title: string;
  titleNl: string;
  topic: string;
  grammarFocus: string[];
  vocabularyFocus: string[];
  skills: SkillTag[];
  description: string;
  order: number;
  lessons: Lesson[];
  checkpoint: Exercise[];
}

export interface AssessmentQuestion {
  id: string;
  type: ExerciseType;
  prompt: string;
  promptEn?: string;
  options?: string[];
  acceptedAnswers?: string[];
  pairs?: { left: string; right: string }[];
  orderItems?: string[];
  explanation: string;
  skill: SkillTag;
  level: CefrLevel;
  difficulty: 1 | 2 | 3;
  passage?: string;
  audioText?: string;
  modelAnswer?: string;
  checklist?: string[];
}

export interface Assessment {
  id: string;
  title: string;
  titleNl: string;
  description: string;
  kind: 'placement' | 'level-end' | 'mixed';
  targetLevel?: CefrLevel;
  questions: AssessmentQuestion[];
}

export interface ReferenceTopic {
  id: string;
  title: string;
  titleNl: string;
  category: string;
  keywords: string[];
  content: string;
  relatedModuleIds?: string[];
}
