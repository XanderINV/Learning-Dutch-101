import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a1-05-ex-01',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l1',
    type: 'multiple-choice',
    prompt: 'Morning meal?',
    explanation: 'Ontbijt = breakfast.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['ontbijt', 'avondeten', 'nagerecht', 'voorgerecht'],
    acceptedAnswers: ['ontbijt']
  },
    {
    id: 'a1-05-ex-02',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l1',
    type: 'fill-blank',
    prompt: 'Ik drink _____ koffie.',
    explanation: 'Graag = gladly / like to.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['graag']
  },
    {
    id: 'a1-05-ex-03',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l1',
    type: 'translation-nl-en',
    prompt: 'water',
    explanation: 'Same word.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['water']
  },
    {
    id: 'a1-05-ex-04',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l1',
    type: 'listening',
    prompt: 'What is ordered?',
    explanation: 'Coffee.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik wil een koffie, alstublieft',
    options: ['koffie', 'thee', 'melk', 'sap'],
    acceptedAnswers: ['koffie']
  },
    {
    id: 'a1-05-ex-05',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['brood=bread', 'kaas=cheese', 'appel=apple'],
    pairs: [{ left: 'brood', right: 'bread' }, { left: 'kaas', right: 'cheese' }, { left: 'appel', right: 'apple' }]
  },
    {
    id: 'a1-05-ex-06',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l2',
    type: 'multiple-choice',
    prompt: 'Choose: Ik drink _____ alcohol.',
    explanation: 'Geen + noun.',
    skill: 'grammar',
    difficulty: 2,
    options: ['geen', 'niet', 'nooit melk', 'wel geen'],
    acceptedAnswers: ['geen']
  },
    {
    id: 'a1-05-ex-07',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l2',
    type: 'fill-blank',
    prompt: 'Mag ik de _____, alstublieft?',
    explanation: 'Rekening = bill; kaart = menu.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['rekening', 'kaart']
  },
    {
    id: 'a1-05-ex-08',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l2',
    type: 'translation-en-nl',
    prompt: 'I would like tea',
    explanation: 'Ordering patterns.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Ik wil thee', 'Ik wil graag thee', 'Een thee, alstublieft']
  },
    {
    id: 'a1-05-ex-09',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Ik wil + object.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik wil een broodje.'],
    orderItems: ['een', 'wil', 'Ik', 'broodje', '.']
  },
    {
    id: 'a1-05-ex-10',
    moduleId: 'a1-05',
    lessonId: 'a1-05-l2',
    type: 'dialogue',
    prompt: 'Say you do not eat meat.',
    explanation: 'Geen vlees.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Ik eet geen vlees.', 'Ik eet niet graag vlees']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a1-05-ex-11',
    moduleId: 'a1-05',
    type: 'multiple-choice',
    prompt: 'Avondeten is…',
    explanation: 'Evening meal.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['dinner', 'breakfast', 'snack', 'dessert'],
    acceptedAnswers: ['dinner']
  },
    {
    id: 'a1-05-ex-12',
    moduleId: 'a1-05',
    type: 'error-correction',
    prompt: 'Fix: Ik drink niet koffie.',
    explanation: 'Geen before noun object.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik drink geen koffie.', 'Ik drink niet graag koffie.']
  },
    {
    id: 'a1-05-ex-13',
    moduleId: 'a1-05',
    type: 'reading-comp',
    prompt: 'What is missing?',
    explanation: 'Geen melk.',
    skill: 'reading',
    difficulty: 2,
    passage: 'We willen thee, maar er is geen melk.',
    options: ['melk', 'thee', 'koffie', 'suiker'],
    acceptedAnswers: ['melk']
  },
    {
    id: 'a1-05-ex-14',
    moduleId: 'a1-05',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Food preference.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik eet graag kaas',
    acceptedAnswers: ['Ik eet graag kaas']
  },
    {
    id: 'a1-05-ex-15',
    moduleId: 'a1-05',
    type: 'guided-writing',
    prompt: 'Write a café order (2–3 lines).',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Goedemiddag. Ik wil een koffie en een broodje kaas, alstublieft.',
    checklist: ['Greeting or polite word', 'Ik wil / Mag ik', 'Food or drink item']
  }
];

export const moduleA105 = createModule(
  {
    id: 'a1-05',
    level: 'a1',
    title: 'Food and drink',
    titleNl: 'Eten en drinken',
    topic: 'food',
    grammarFocus: ['de/het with food', 'geen vs niet', 'Ik wil / Mag ik…'],
    vocabularyFocus: ['meals', 'drinks', 'common foods'],
    skills: ['vocabulary', 'speaking', 'listening'],
    description: 'Order food and talk about meals.',
    order: 9,
  },
  [
    {
      id: 'a1-05-l1',
      title: 'Meals and drinks',
      objective: 'Learn core language for food.',
      steps: [
      {
        type: 'explanation',
        title: 'Meals and drinks',
        body: 'Breakfast ontbijt, lunch lunch/middageten, dinner avondeten. Common drinks: koffie, thee, water, melk, sap.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Ik drink graag thee.', en: 'I like drinking tea.' },
          { nl: 'We eten om zes uur.', en: 'We eat at six.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a1-123', 'vocab-a1-124', 'vocab-a1-125', 'vocab-a1-126', 'vocab-a1-127', 'vocab-a1-128'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-05-ex-01', 'a1-05-ex-02', 'a1-05-ex-03', 'a1-05-ex-04', 'a1-05-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Breakfast ontbijt, lunch lunch/middageten, dinner avondeten. Common drinks: koff…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a1-05-l2',
      title: 'geen and ordering',
      objective: 'Practise food in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'geen and ordering',
        body: 'Geen negates a noun (geen melk); niet negates verbs/adjectives (Ik drink niet). Mag ik… / Ik wil… for ordering.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Ik wil een broodje, alstublieft.', en: 'I would like a sandwich, please.' },
          { nl: 'Er is geen melk meer.', en: 'There is no milk left.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a1-129', 'vocab-a1-130', 'vocab-a1-131', 'vocab-a1-132', 'vocab-a1-133', 'vocab-a1-134'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-05-ex-06', 'a1-05-ex-07', 'a1-05-ex-08', 'a1-05-ex-09', 'a1-05-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Geen negates a noun (geen melk); niet negates verbs/adjectives (Ik drink niet). …', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA105Exercises = lessonExercises;
