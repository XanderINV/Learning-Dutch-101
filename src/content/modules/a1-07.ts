import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a1-07-ex-01',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l1',
    type: 'multiple-choice',
    prompt: 'Rechtdoor means…',
    explanation: 'Rechtdoor = straight on.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['straight ahead', 'left', 'right', 'back'],
    acceptedAnswers: ['straight ahead']
  },
    {
    id: 'a1-07-ex-02',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l1',
    type: 'fill-blank',
    prompt: 'Hoe kom ik _____ het station?',
    explanation: 'Bij/naar for reaching a place.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['bij', 'naar']
  },
    {
    id: 'a1-07-ex-03',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l1',
    type: 'translation-nl-en',
    prompt: 'links',
    explanation: 'Links = left.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['left']
  },
    {
    id: 'a1-07-ex-04',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l1',
    type: 'listening',
    prompt: 'Direction?',
    explanation: 'Right.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ga rechts',
    options: ['rechts', 'links', 'rechtdoor', 'terug'],
    acceptedAnswers: ['rechts']
  },
    {
    id: 'a1-07-ex-05',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['trein=train', 'bushalte=bus stop', 'fiets=bike'],
    pairs: [{ left: 'trein', right: 'train' }, { left: 'bushalte', right: 'bus stop' }, { left: 'fiets', right: 'bike' }]
  },
    {
    id: 'a1-07-ex-06',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l2',
    type: 'multiple-choice',
    prompt: 'Ik ga _____ de bus.',
    explanation: 'Met + vehicle.',
    skill: 'grammar',
    difficulty: 2,
    options: ['met', 'op', 'in naar', 'voor'],
    acceptedAnswers: ['met']
  },
    {
    id: 'a1-07-ex-07',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l2',
    type: 'fill-blank',
    prompt: 'Neem de tweede straat _____.',
    explanation: 'Left or right.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['links', 'rechts']
  },
    {
    id: 'a1-07-ex-08',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l2',
    type: 'translation-en-nl',
    prompt: 'Where is the market?',
    explanation: 'Waar is…?',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Waar is de markt?', 'Waar is de markt']
  },
    {
    id: 'a1-07-ex-09',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Met + transport.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik ga met de trein.'],
    orderItems: ['met', 'ga', 'Ik', 'de', 'trein', '.']
  },
    {
    id: 'a1-07-ex-10',
    moduleId: 'a1-07',
    lessonId: 'a1-07-l2',
    type: 'dialogue',
    prompt: 'Ask where the station is.',
    explanation: 'Location question.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Waar is het station?', 'Hoe kom ik bij het station?']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a1-07-ex-11',
    moduleId: 'a1-07',
    type: 'multiple-choice',
    prompt: 'Bushalte is…',
    explanation: 'Bushalte.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['bus stop', 'train ticket', 'bridge', 'taxi rank'],
    acceptedAnswers: ['bus stop']
  },
    {
    id: 'a1-07-ex-12',
    moduleId: 'a1-07',
    type: 'error-correction',
    prompt: 'Fix: Ik ga met trein.',
    explanation: 'Article de before trein.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik ga met de trein.']
  },
    {
    id: 'a1-07-ex-13',
    moduleId: 'a1-07',
    type: 'reading-comp',
    prompt: 'How does Lara travel?',
    explanation: 'Met de tram.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Lara woont ver van haar werk. Zij gaat elke dag met de tram.',
    options: ['tram', 'fiets', 'auto', 'te voet'],
    acceptedAnswers: ['tram']
  },
    {
    id: 'a1-07-ex-14',
    moduleId: 'a1-07',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Imperative direction.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ga rechtdoor',
    acceptedAnswers: ['Ga rechtdoor']
  },
    {
    id: 'a1-07-ex-15',
    moduleId: 'a1-07',
    type: 'guided-writing',
    prompt: 'Give directions from a station to a café (3 steps).',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Ga rechtdoor. Neem de eerste straat rechts. Het café is naast de boekhandel.',
    checklist: ['Uses a direction word', 'Mentions a landmark or place']
  }
];

export const moduleA107 = createModule(
  {
    id: 'a1-07',
    level: 'a1',
    title: 'Town, directions, transport',
    titleNl: 'Stad, richting, vervoer',
    topic: 'town',
    grammarFocus: ['Imperatives', 'Prepositions naar/in/op/bij', 'Modal kunnen'],
    vocabularyFocus: ['places in town', 'directions', 'transport'],
    skills: ['listening', 'speaking', 'vocabulary'],
    description: 'Ask for directions and use local transport.',
    order: 11,
  },
  [
    {
      id: 'a1-07-l1',
      title: 'Places in town',
      objective: 'Learn core language for town.',
      steps: [
      {
        type: 'explanation',
        title: 'Places in town',
        body: 'Town words: station, bushalte, markt, museum, centrum, brug. Ask: Waar is…? / Hoe kom ik bij…?',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Het station is dichtbij.', en: 'The station is nearby.' },
          { nl: 'Neem de eerste straat links.', en: 'Take the first street on the left.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a1-147', 'vocab-a1-148', 'vocab-a1-149', 'vocab-a1-150', 'vocab-a1-151', 'vocab-a1-152'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-07-ex-01', 'a1-07-ex-02', 'a1-07-ex-03', 'a1-07-ex-04', 'a1-07-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Town words: station, bushalte, markt, museum, centrum, brug. Ask: Waar is…? / Ho…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a1-07-l2',
      title: 'Getting there',
      objective: 'Practise town in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'Getting there',
        body: 'Directions: links, rechts, rechtdoor. Transport: fiets, bus, trein, tram, metro. Ik ga met de trein.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Ik ga met de fiets.', en: 'I go by bike.' },
          { nl: 'Stap uit bij het museum.', en: 'Get off at the museum.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a1-153', 'vocab-a1-154', 'vocab-a1-155', 'vocab-a1-156', 'vocab-a1-157', 'vocab-a1-158'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-07-ex-06', 'a1-07-ex-07', 'a1-07-ex-08', 'a1-07-ex-09', 'a1-07-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Directions: links, rechts, rechtdoor. Transport: fiets, bus, trein, tram, metro.…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA107Exercises = lessonExercises;
