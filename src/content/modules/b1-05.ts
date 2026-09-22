import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'b1-05-ex-01',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l1',
    type: 'multiple-choice',
    prompt: 'Core focus of this module?',
    explanation: 'Module theme recognition.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['Problems, advice, and administration', 'Only alphabet', 'Only numbers', 'Cooking only'],
    acceptedAnswers: ['Problems, advice, and administration']
  },
    {
    id: 'b1-05-ex-02',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l1',
    type: 'fill-blank',
    prompt: 'Ik vind _____ dit een goed idee is.',
    explanation: 'Dat-clause after vinden.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['dat']
  },
    {
    id: 'b1-05-ex-03',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l1',
    type: 'translation-nl-en',
    prompt: 'daarom',
    explanation: 'Connector.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['therefore', 'that is why', 'that\'s why']
  },
    {
    id: 'b1-05-ex-04',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l1',
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
    id: 'b1-05-ex-05',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['doel=goal', 'advies=advice', 'probleem=problem'],
    pairs: [{ left: 'doel', right: 'goal' }, { left: 'advies', right: 'advice' }, { left: 'probleem', right: 'problem' }]
  },
    {
    id: 'b1-05-ex-06',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l2',
    type: 'multiple-choice',
    prompt: 'Als ik tijd had, _____ ik helpen.',
    explanation: 'Conditional zou.',
    skill: 'grammar',
    difficulty: 2,
    options: ['zou', 'heb', 'ben', 'was te'],
    acceptedAnswers: ['zou']
  },
    {
    id: 'b1-05-ex-07',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l2',
    type: 'fill-blank',
    prompt: 'De mail _____ vandaag verstuurd.',
    explanation: 'Passive auxiliary.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['wordt', 'is']
  },
    {
    id: 'b1-05-ex-08',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l2',
    type: 'translation-en-nl',
    prompt: 'In my opinion',
    explanation: 'Opinion frame.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Volgens mij', 'Naar mijn mening', 'Ik vind']
  },
    {
    id: 'b1-05-ex-09',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Opinion pattern.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik vind dat belangrijk.'],
    orderItems: ['dat', 'belangrijk', 'is', 'vind', 'Ik', '.']
  },
    {
    id: 'b1-05-ex-10',
    moduleId: 'b1-05',
    lessonId: 'b1-05-l2',
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
    id: 'b1-05-ex-11',
    moduleId: 'b1-05',
    type: 'multiple-choice',
    prompt: 'Relative pronoun for de-noun?',
    explanation: 'die for de-words.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['die', 'dat', 'wat always', 'wie only'],
    acceptedAnswers: ['die']
  },
    {
    id: 'b1-05-ex-12',
    moduleId: 'b1-05',
    type: 'error-correction',
    prompt: 'Fix: Ik vind dat hij heeft gelijk.',
    explanation: 'Verb final in dat-clause.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik vind dat hij gelijk heeft.']
  },
    {
    id: 'b1-05-ex-13',
    moduleId: 'b1-05',
    type: 'reading-comp',
    prompt: 'What is the writer’s goal?',
    explanation: 'Goal stated.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Mijn doel is om beter te argumenteren in het Nederlands. Daarom oefen ik elke week met admin.',
    options: ['argumenteren', 'slapen', 'reizen alleen', 'koken'],
    acceptedAnswers: ['argumenteren']
  },
    {
    id: 'b1-05-ex-14',
    moduleId: 'b1-05',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Opinion sentence.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Volgens mij is dat verstandig',
    acceptedAnswers: ['Volgens mij is dat verstandig']
  },
    {
    id: 'b1-05-ex-15',
    moduleId: 'b1-05',
    type: 'guided-writing',
    prompt: 'Write a short paragraph (4–5 sentences) on admin using at least one connector and one complex clause.',
    explanation: 'Self-assess with the checklist.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Je zou even kunnen bellen naar de klantenservice. Kunt u mij zeggen welke documenten ik nodig heb? Daarom blijf ik oefenen.',
    checklist: ['Connector or opinion phrase', 'Complex clause (dat/omdat/als/die)', 'On topic']
  }
];

export const moduleB105 = createModule(
  {
    id: 'b1-05',
    level: 'b1',
    title: 'Problems, advice, and administration',
    titleNl: 'Problemen, advies en administratie',
    topic: 'admin',
    grammarFocus: ['Advice with zou', 'Formal vs informal', 'Expanded er'],
    vocabularyFocus: ['problems', 'advice', 'forms and agencies'],
    skills: ['reading', 'writing', 'grammar', 'speaking', 'listening'],
    description: 'Give advice and handle administrative situations.',
    order: 23,
  },
  [
    {
      id: 'b1-05-l1',
      title: 'Language tools',
      objective: 'Learn core language for admin.',
      steps: [
      {
        type: 'explanation',
        title: 'Language tools',
        body: 'Advice: Je zou… / Misschien kun je… Problems: Het lukt niet om… Er is iets misgegaan met…',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Je zou even kunnen bellen naar de klantenservice.', en: 'You could call customer service briefly.' },
          { nl: 'Er ging iets mis met mijn aanvraag.', en: 'Something went wrong with my application.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-b1-321', 'vocab-b1-322', 'vocab-b1-323', 'vocab-b1-324', 'vocab-b1-325', 'vocab-b1-326'],
      },
      {
        type: 'exercise',
        exerciseIds: ['b1-05-ex-01', 'b1-05-ex-02', 'b1-05-ex-03', 'b1-05-ex-04', 'b1-05-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Advice: Je zou… / Misschien kun je… Problems: Het lukt niet om… Er is iets misge…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'b1-05-l2',
      title: 'Putting it together',
      objective: 'Practise admin in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'Putting it together',
        body: 'Admin: formulier, aanvraag, bewijs, gemeente, afspraak maken. Switch register: informal with friends, u with officials.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Kunt u mij zeggen welke documenten ik nodig heb?', en: 'Can you tell me which documents I need?' },
          { nl: 'Ik vul het formulier online in.', en: 'I fill in the form online.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-b1-327', 'vocab-b1-328', 'vocab-b1-329', 'vocab-b1-330', 'vocab-b1-331', 'vocab-b1-332'],
      },
      {
        type: 'exercise',
        exerciseIds: ['b1-05-ex-06', 'b1-05-ex-07', 'b1-05-ex-08', 'b1-05-ex-09', 'b1-05-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Admin: formulier, aanvraag, bewijs, gemeente, afspraak maken. Switch register: i…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleB105Exercises = lessonExercises;
