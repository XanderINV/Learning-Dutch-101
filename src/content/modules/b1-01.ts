import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'b1-01-ex-01',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l1',
    type: 'multiple-choice',
    prompt: 'Core focus of this module?',
    explanation: 'Module theme recognition.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['Telling detailed stories', 'Only alphabet', 'Only numbers', 'Cooking only'],
    acceptedAnswers: ['Telling detailed stories']
  },
    {
    id: 'b1-01-ex-02',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l1',
    type: 'fill-blank',
    prompt: 'Ik vind _____ dit een goed idee is.',
    explanation: 'Dat-clause after vinden.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['dat']
  },
    {
    id: 'b1-01-ex-03',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l1',
    type: 'translation-nl-en',
    prompt: 'daarom',
    explanation: 'Connector.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['therefore', 'that is why', 'that\'s why']
  },
    {
    id: 'b1-01-ex-04',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l1',
    type: 'listening',
    prompt: 'Connector heard?',
    explanation: 'Nevertheless.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Desondanks ga ik door',
    options: ['Desondanks', 'Misschien', 'Gisteren', 'Hallo'],
    acceptedAnswers: ['Desondanks']
  },
    {
    id: 'b1-01-ex-05',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['doel=goal', 'advies=advice', 'probleem=problem'],
    pairs: [{ left: 'doel', right: 'goal' }, { left: 'advies', right: 'advice' }, { left: 'probleem', right: 'problem' }]
  },
    {
    id: 'b1-01-ex-06',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l2',
    type: 'multiple-choice',
    prompt: 'Als ik tijd had, _____ ik helpen.',
    explanation: 'Conditional zou.',
    skill: 'grammar',
    difficulty: 2,
    options: ['zou', 'heb', 'ben', 'was te'],
    acceptedAnswers: ['zou']
  },
    {
    id: 'b1-01-ex-07',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l2',
    type: 'fill-blank',
    prompt: 'De mail _____ vandaag verstuurd.',
    explanation: 'Passive auxiliary.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['wordt', 'is']
  },
    {
    id: 'b1-01-ex-08',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l2',
    type: 'translation-en-nl',
    prompt: 'In my opinion',
    explanation: 'Opinion frame.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Volgens mij', 'Naar mijn mening', 'Ik vind']
  },
    {
    id: 'b1-01-ex-09',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Opinion pattern.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik vind dat belangrijk.'],
    orderItems: ['dat', 'belangrijk', 'is', 'vind', 'Ik', '.']
  },
    {
    id: 'b1-01-ex-10',
    moduleId: 'b1-01',
    lessonId: 'b1-01-l2',
    type: 'dialogue',
    prompt: 'Give one piece of polite advice using zou.',
    explanation: 'Advice with zou.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Je zou even kunnen rusten.', 'Je zou kunnen bellen.', 'Misschien zou je kunnen wachten.']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'b1-01-ex-11',
    moduleId: 'b1-01',
    type: 'multiple-choice',
    prompt: 'Relative pronoun for de-noun?',
    explanation: 'die for de-words.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['die', 'dat', 'wat always', 'wie only'],
    acceptedAnswers: ['die']
  },
    {
    id: 'b1-01-ex-12',
    moduleId: 'b1-01',
    type: 'error-correction',
    prompt: 'Fix: Ik vind dat hij heeft gelijk.',
    explanation: 'Verb final in dat-clause.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik vind dat hij gelijk heeft.']
  },
    {
    id: 'b1-01-ex-13',
    moduleId: 'b1-01',
    type: 'reading-comp',
    prompt: 'What is the writer’s goal?',
    explanation: 'Goal stated.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Mijn doel is om beter te argumenteren in het Nederlands. Daarom oefen ik elke week met stories.',
    options: ['argumenteren', 'slapen', 'reizen alleen', 'koken'],
    acceptedAnswers: ['argumenteren']
  },
    {
    id: 'b1-01-ex-14',
    moduleId: 'b1-01',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Opinion sentence.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Volgens mij is dat verstandig',
    acceptedAnswers: ['Volgens mij is dat verstandig']
  },
    {
    id: 'b1-01-ex-15',
    moduleId: 'b1-01',
    type: 'guided-writing',
    prompt: 'Write a short paragraph (4–5 sentences) on stories using at least one connector and one complex clause.',
    explanation: 'Self-assess with the checklist.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Eerst miste ik de bus, daarna begon het te regenen. Dat is de collega die me geholpen heeft. Daarom blijf ik oefenen.',
    checklist: ['Connector or opinion phrase', 'Complex clause (dat/omdat/als/die)', 'On topic']
  }
];

export const moduleB101 = createModule(
  {
    id: 'b1-01',
    level: 'b1',
    title: 'Telling detailed stories',
    titleNl: 'Uitgebreid vertellen',
    topic: 'stories',
    grammarFocus: ['Perfect vs simple past', 'Time sequencing', 'Relative die/dat'],
    vocabularyFocus: ['story connectors', 'narrative verbs'],
    skills: ['reading', 'writing', 'grammar', 'speaking', 'listening'],
    description: 'Tell longer stories with clear structure.',
    order: 19,
  },
  [
    {
      id: 'b1-01-l1',
      title: 'Language tools',
      objective: 'Learn core language for stories.',
      steps: [
      {
        type: 'explanation',
        title: 'Language tools',
        body: 'Structure stories with eerst, daarna, toen, uiteindelijk. Spoken narratives often mix perfect and simple past (was, ging, zei).',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Eerst miste ik de bus, daarna begon het te regenen.', en: 'First I missed the bus, then it started raining.' },
          { nl: 'Toen ik aankwam, was iedereen al weg.', en: 'When I arrived, everyone had already left.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-b1-321', 'vocab-b1-322', 'vocab-b1-323', 'vocab-b1-324', 'vocab-b1-325', 'vocab-b1-326'],
      },
      {
        type: 'exercise',
        exerciseIds: ['b1-01-ex-01', 'b1-01-ex-02', 'b1-01-ex-03', 'b1-01-ex-04', 'b1-01-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Structure stories with eerst, daarna, toen, uiteindelijk. Spoken narratives ofte…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'b1-01-l2',
      title: 'Putting it together',
      objective: 'Practise stories in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'Putting it together',
        body: 'Relative clauses: de man die…, het boek dat… Keep finite verbs toward the end in the relative clause.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Dat is de collega die me geholpen heeft.', en: 'That is the colleague who helped me.' },
          { nl: 'Het probleem dat we bespraken, is opgelost.', en: 'The problem that we discussed has been solved.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-b1-327', 'vocab-b1-328', 'vocab-b1-329', 'vocab-b1-330', 'vocab-b1-331', 'vocab-b1-332'],
      },
      {
        type: 'exercise',
        exerciseIds: ['b1-01-ex-06', 'b1-01-ex-07', 'b1-01-ex-08', 'b1-01-ex-09', 'b1-01-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Relative clauses: de man die…, het boek dat… Keep finite verbs toward the end in…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleB101Exercises = lessonExercises;
