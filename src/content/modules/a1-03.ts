import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a1-03-ex-01',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l1',
    type: 'multiple-choice',
    prompt: 'Where do you cook?',
    explanation: 'Keuken = kitchen.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['keuken', 'badkamer', 'slaapkamer', 'gang'],
    acceptedAnswers: ['keuken']
  },
    {
    id: 'a1-03-ex-02',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l1',
    type: 'fill-blank',
    prompt: '_____ is een lamp op de tafel.',
    explanation: 'Er is…',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['Er']
  },
    {
    id: 'a1-03-ex-03',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l1',
    type: 'translation-nl-en',
    prompt: 'het bed',
    explanation: 'Bed is het.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['the bed']
  },
    {
    id: 'a1-03-ex-04',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l1',
    type: 'listening',
    prompt: 'Which room?',
    explanation: 'Bedroom.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik slaap in de slaapkamer',
    options: ['slaapkamer', 'keuken', 'tuin', 'zolder'],
    acceptedAnswers: ['slaapkamer']
  },
    {
    id: 'a1-03-ex-05',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['stoel=chair', 'tafel=table', 'raam=window'],
    pairs: [{ left: 'stoel', right: 'chair' }, { left: 'tafel', right: 'table' }, { left: 'raam', right: 'window' }]
  },
    {
    id: 'a1-03-ex-06',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l2',
    type: 'multiple-choice',
    prompt: 'Choose the article: ___ huis',
    explanation: 'Het huis.',
    skill: 'grammar',
    difficulty: 2,
    options: ['het', 'de'],
    acceptedAnswers: ['het']
  },
    {
    id: 'a1-03-ex-07',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l2',
    type: 'fill-blank',
    prompt: 'Er _____ twee ramen.',
    explanation: 'Er zijn + plural.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['zijn']
  },
    {
    id: 'a1-03-ex-08',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l2',
    type: 'translation-en-nl',
    prompt: 'the kitchen',
    explanation: 'De keuken.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['de keuken']
  },
    {
    id: 'a1-03-ex-09',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Er is + indefinite noun.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Er is een bank in de woonkamer.'],
    orderItems: ['bank', 'een', 'is', 'Er', 'in', 'de', 'woonkamer', '.']
  },
    {
    id: 'a1-03-ex-10',
    moduleId: 'a1-03',
    lessonId: 'a1-03-l2',
    type: 'dialogue',
    prompt: 'Say that your bathroom is small.',
    explanation: 'Adjective after zijn.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Mijn badkamer is klein.', 'De badkamer is klein']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a1-03-ex-11',
    moduleId: 'a1-03',
    type: 'multiple-choice',
    prompt: 'Woonkamer is the…',
    explanation: 'Woonkamer = living room.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['living room', 'bedroom', 'attic', 'cellar'],
    acceptedAnswers: ['living room']
  },
    {
    id: 'a1-03-ex-12',
    moduleId: 'a1-03',
    type: 'error-correction',
    prompt: 'Fix: De bed is groot.',
    explanation: 'Het bed.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Het bed is groot.']
  },
    {
    id: 'a1-03-ex-13',
    moduleId: 'a1-03',
    type: 'reading-comp',
    prompt: 'What is open?',
    explanation: 'Raam is open.',
    skill: 'reading',
    difficulty: 2,
    passage: 'In ons huis is de keuken warm. Het raam is open.',
    options: ['Het raam', 'De keuken', 'Het huis', 'De deur'],
    acceptedAnswers: ['Het raam']
  },
    {
    id: 'a1-03-ex-14',
    moduleId: 'a1-03',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Existence sentence.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Er is een tafel in de keuken',
    acceptedAnswers: ['Er is een tafel in de keuken']
  },
    {
    id: 'a1-03-ex-15',
    moduleId: 'a1-03',
    type: 'guided-writing',
    prompt: 'Describe your home in 3 sentences.',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Ik woon in een appartement. Er is een kleine keuken. Mijn woonkamer heeft een bank.',
    checklist: ['Mentions home type or room', 'Uses er is/er zijn or article correctly']
  }
];

export const moduleA103 = createModule(
  {
    id: 'a1-03',
    level: 'a1',
    title: 'Home and household',
    titleNl: 'Thuis en in huis',
    topic: 'home',
    grammarFocus: ['de/het with household nouns', 'Er is / er zijn'],
    vocabularyFocus: ['rooms', 'furniture', 'household objects'],
    skills: ['vocabulary', 'listening', 'grammar'],
    description: 'Name rooms and objects at home.',
    order: 7,
  },
  [
    {
      id: 'a1-03-l1',
      title: 'Rooms and furniture',
      objective: 'Learn core language for home.',
      steps: [
      {
        type: 'explanation',
        title: 'Rooms and furniture',
        body: 'Learn kamer, keuken, badkamer, woonkamer, slaapkamer and common objects like tafel, stoel, bed, lamp.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'De keuken is klein maar licht.', en: 'The kitchen is small but bright.' },
          { nl: 'Er is een bank in de woonkamer.', en: 'There is a sofa in the living room.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a1-099', 'vocab-a1-100', 'vocab-a1-101', 'vocab-a1-102', 'vocab-a1-103', 'vocab-a1-104'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-03-ex-01', 'a1-03-ex-02', 'a1-03-ex-03', 'a1-03-ex-04', 'a1-03-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Learn kamer, keuken, badkamer, woonkamer, slaapkamer and common objects like taf…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a1-03-l2',
      title: 'de or het at home',
      objective: 'Practise home in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'de or het at home',
        body: 'Articles must be learned with the noun: de tafel, het bed, de keuken, het huis. Use er is/er zijn for existence.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Het raam is open.', en: 'The window is open.' },
          { nl: 'Er zijn twee stoelen.', en: 'There are two chairs.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a1-105', 'vocab-a1-106', 'vocab-a1-107', 'vocab-a1-108', 'vocab-a1-109', 'vocab-a1-110'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-03-ex-06', 'a1-03-ex-07', 'a1-03-ex-08', 'a1-03-ex-09', 'a1-03-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Articles must be learned with the noun: de tafel, het bed, de keuken, het huis. …', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA103Exercises = lessonExercises;
