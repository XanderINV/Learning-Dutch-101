import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a2-03-ex-01',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l1',
    type: 'multiple-choice',
    prompt: 'Ik _____ een boek gelezen.',
    explanation: 'Lezen takes hebben.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['heb', 'ben', 'hebt', 'zijn'],
    acceptedAnswers: ['heb']
  },
    {
    id: 'a2-03-ex-02',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l1',
    type: 'fill-blank',
    prompt: 'Zij is naar huis _____.',
    explanation: 'Participle of gaan.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['gegaan']
  },
    {
    id: 'a2-03-ex-03',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l1',
    type: 'translation-nl-en',
    prompt: 'gisteren',
    explanation: 'Time marker.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['yesterday']
  },
    {
    id: 'a2-03-ex-04',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l1',
    type: 'listening',
    prompt: 'Auxiliary?',
    explanation: 'Zijn + geweest.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik ben geweest',
    options: ['ben', 'heb', 'was', 'word'],
    acceptedAnswers: ['ben']
  },
    {
    id: 'a2-03-ex-05',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['gezien=seen', 'gegeten=eaten', 'gewerkt=worked'],
    pairs: [{ left: 'gezien', right: 'seen' }, { left: 'gegeten', right: 'eaten' }, { left: 'gewerkt', right: 'worked' }]
  },
    {
    id: 'a2-03-ex-06',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l2',
    type: 'multiple-choice',
    prompt: 'Welke zin is correct?',
    explanation: 'Zijn + geweest.',
    skill: 'grammar',
    difficulty: 2,
    options: ['Ik ben naar school geweest.', 'Ik heb naar school geweest.', 'Ik is naar school geweest.', 'Ik hebt naar school gegaan.'],
    acceptedAnswers: ['Ik ben naar school geweest.']
  },
    {
    id: 'a2-03-ex-07',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l2',
    type: 'fill-blank',
    prompt: '_____ week was ik in België.',
    explanation: 'Vorige week.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['Vorige']
  },
    {
    id: 'a2-03-ex-08',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l2',
    type: 'translation-en-nl',
    prompt: 'I have worked today',
    explanation: 'Perfect with hebben.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Ik heb vandaag gewerkt']
  },
    {
    id: 'a2-03-ex-09',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Object before participle.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik heb je niet gebeld.'],
    orderItems: ['heb', 'Ik', 'je', 'niet', 'gebeld', '.']
  },
    {
    id: 'a2-03-ex-10',
    moduleId: 'a2-03',
    lessonId: 'a2-03-l2',
    type: 'dialogue',
    prompt: 'Ask if someone has already eaten.',
    explanation: 'Perfect question.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Heb je al gegeten?', 'Hebben jullie al gegeten?']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a2-03-ex-11',
    moduleId: 'a2-03',
    type: 'multiple-choice',
    prompt: 'Participle of zien?',
    explanation: 'Irregular gezien.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['gezien', 'gezienen', 'zagen', 'zicht'],
    acceptedAnswers: ['gezien']
  },
    {
    id: 'a2-03-ex-12',
    moduleId: 'a2-03',
    type: 'error-correction',
    prompt: 'Fix: Ik heb naar de winkel gegaan.',
    explanation: 'Gaan → zijn.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik ben naar de winkel gegaan.']
  },
    {
    id: 'a2-03-ex-13',
    moduleId: 'a2-03',
    type: 'reading-comp',
    prompt: 'What did they do?',
    explanation: 'Went to a concert.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Gisteren zijn we naar een concert geweest. We hebben genoten.',
    options: ['concert', 'examen', 'vergadering', 'markt'],
    acceptedAnswers: ['concert']
  },
    {
    id: 'a2-03-ex-14',
    moduleId: 'a2-03',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Perfect statement.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik heb hard gewerkt',
    acceptedAnswers: ['Ik heb hard gewerkt']
  },
    {
    id: 'a2-03-ex-15',
    moduleId: 'a2-03',
    type: 'guided-writing',
    prompt: 'Write three things you did last weekend using the perfect tense.',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Vorige weekeinde ben ik gaan wandelen. Ik heb een boek gelezen. We hebben pizza gegeten.',
    checklist: ['Uses heb/ben + participle', 'Mentions time']
  }
];

export const moduleA203 = createModule(
  {
    id: 'a2-03',
    level: 'a2',
    title: 'Past experiences',
    titleNl: 'Ervaringen in het verleden',
    topic: 'past',
    grammarFocus: ['Perfect with hebben/zijn', 'Past participles', 'Time markers gisteren/vorige week'],
    vocabularyFocus: ['experience verbs', 'time phrases'],
    skills: ['grammar', 'speaking', 'listening', 'writing'],
    description: 'Talk about what you have done recently.',
    order: 15,
  },
  [
    {
      id: 'a2-03-l1',
      title: 'Core patterns',
      objective: 'Learn core language for past.',
      steps: [
      {
        type: 'explanation',
        title: 'Core patterns',
        body: 'Most verbs form the perfect with hebben + participle: Ik heb gewerkt. Movement/change often use zijn: Ik ben geweest/gegaan/gekomen.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Ik heb een goede film gezien.', en: 'I have seen a good film.' },
          { nl: 'We zijn naar de markt geweest.', en: 'We have been to the market.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a2-201', 'vocab-a2-202', 'vocab-a2-203', 'vocab-a2-204', 'vocab-a2-205', 'vocab-a2-206'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-03-ex-01', 'a2-03-ex-02', 'a2-03-ex-03', 'a2-03-ex-04', 'a2-03-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Most verbs form the perfect with hebben + participle: Ik heb gewerkt. Movement/c…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a2-03-l2',
      title: 'More practice',
      objective: 'Practise past in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'More practice',
        body: 'Place time expressions early: Gisteren heb ik… Regular participles ge-stem-t/d; irregulars must be learned (gegeten, gezien, geweest).',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Vorige week heeft hij verhuisd.', en: 'Last week he moved house.' },
          { nl: 'Heb je al gegeten?', en: 'Have you eaten already?' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a2-207', 'vocab-a2-208', 'vocab-a2-209', 'vocab-a2-210', 'vocab-a2-211', 'vocab-a2-212'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-03-ex-06', 'a2-03-ex-07', 'a2-03-ex-08', 'a2-03-ex-09', 'a2-03-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Place time expressions early: Gisteren heb ik… Regular participles ge-stem-t/d; …', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA203Exercises = lessonExercises;
