import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a2-06-ex-01',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l1',
    type: 'multiple-choice',
    prompt: 'In omdat-clauses the finite verb usually…',
    explanation: 'SOV in subordinates.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['goes to the end', 'stays in position two', 'is deleted', 'comes first'],
    acceptedAnswers: ['goes to the end']
  },
    {
    id: 'a2-06-ex-02',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l1',
    type: 'fill-blank',
    prompt: 'Ik ben blij _____ het weekend begint.',
    explanation: 'Omdat + reason.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['omdat']
  },
    {
    id: 'a2-06-ex-03',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l1',
    type: 'translation-nl-en',
    prompt: 'boos',
    explanation: 'Emotion.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['angry']
  },
    {
    id: 'a2-06-ex-04',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l1',
    type: 'listening',
    prompt: 'Feeling?',
    explanation: 'Proud.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik ben trots op je',
    options: ['trots', 'boos', 'moedeloos', 'moe'],
    acceptedAnswers: ['trots']
  },
    {
    id: 'a2-06-ex-05',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['blij=happy', 'verdrietig=sad', 'zenuwachtig=nervous'],
    pairs: [{ left: 'blij', right: 'happy' }, { left: 'verdrietig', right: 'sad' }, { left: 'zenuwachtig', right: 'nervous' }]
  },
    {
    id: 'a2-06-ex-06',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l2',
    type: 'multiple-choice',
    prompt: 'Best closing for a formal email?',
    explanation: 'Formal closing.',
    skill: 'grammar',
    difficulty: 2,
    options: ['Met vriendelijke groet', 'Doei xxx', 'Hoi hoi', 'Later'],
    acceptedAnswers: ['Met vriendelijke groet']
  },
    {
    id: 'a2-06-ex-07',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l2',
    type: 'fill-blank',
    prompt: '_____ is veel verkeer in de spits.',
    explanation: 'Introductory er.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['Er']
  },
    {
    id: 'a2-06-ex-08',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l2',
    type: 'translation-en-nl',
    prompt: 'I am happy because…',
    explanation: 'Pattern starter.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Ik ben blij omdat']
  },
    {
    id: 'a2-06-ex-09',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Verb komt at end.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik ben blij omdat je komt.'],
    orderItems: ['omdat', 'blij', 'ben', 'Ik', 'je', 'komt', '.']
  },
    {
    id: 'a2-06-ex-10',
    moduleId: 'a2-06',
    lessonId: 'a2-06-l2',
    type: 'dialogue',
    prompt: 'Start an informal message to cancel politely.',
    explanation: 'Informal cancel.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Hoi, ik kan toch niet komen.', 'Hoi! Jammer, maar ik kan niet.']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a2-06-ex-11',
    moduleId: 'a2-06',
    type: 'multiple-choice',
    prompt: 'Spits refers to…',
    explanation: 'Peak traffic time.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['rush hour', 'spice', 'sports', 'speech'],
    acceptedAnswers: ['rush hour']
  },
    {
    id: 'a2-06-ex-12',
    moduleId: 'a2-06',
    type: 'error-correction',
    prompt: 'Fix: Ik ben blij omdat ik heb geslaagd.',
    explanation: 'Participle before auxiliary in subordinate.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik ben blij omdat ik geslaagd ben.']
  },
    {
    id: 'a2-06-ex-13',
    moduleId: 'a2-06',
    type: 'reading-comp',
    prompt: 'Why is she proud?',
    explanation: 'Sent a Dutch email.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Sara is trots omdat zij haar eerste Nederlandse mail heeft gestuurd.',
    options: ['mail', 'fiets', 'vakantie', 'huis'],
    acceptedAnswers: ['mail']
  },
    {
    id: 'a2-06-ex-14',
    moduleId: 'a2-06',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Emotion sentence.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik ben een beetje zenuwachtig',
    acceptedAnswers: ['Ik ben een beetje zenuwachtig']
  },
    {
    id: 'a2-06-ex-15',
    moduleId: 'a2-06',
    type: 'guided-writing',
    prompt: 'Write a short formal email declining a meeting with a reason (omdat).',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Beste meneer de Vries, helaas kan ik donderdag niet omdat ik bij de dokter moet zijn. Met vriendelijke groet, Nora',
    checklist: ['Greeting', 'omdat-clause', 'Closing']
  }
];

export const moduleA206 = createModule(
  {
    id: 'a2-06',
    level: 'a2',
    title: 'Feelings, culture, and messages',
    titleNl: 'Gevoelens, cultuur en berichten',
    topic: 'culture-messages',
    grammarFocus: ['Subordinate word order with omdat/dat', 'Introductory er', 'Informal vs formal emails'],
    vocabularyFocus: ['emotions', 'Dutch daily life', 'message phrases'],
    skills: ['writing', 'reading', 'grammar'],
    description: 'Express feelings, notice cultural habits, and write short messages.',
    order: 18,
  },
  [
    {
      id: 'a2-06-l1',
      title: 'Feelings and omdat',
      objective: 'Learn core language for culture-messages.',
      steps: [
      {
        type: 'explanation',
        title: 'Feelings and omdat',
        body: 'Emotions: blij, boos, verdrietig, zenuwachtig, trots. Subordinate clause: Ik ben blij omdat ik geslaagd ben (verb at end).',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Ik ben nerveus omdat ik een presentatie geef.', en: 'I am nervous because I am giving a presentation.' },
          { nl: 'Er is altijd wel een oplossing.', en: 'There is always a solution.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a2-201', 'vocab-a2-202', 'vocab-a2-203', 'vocab-a2-204', 'vocab-a2-205', 'vocab-a2-206'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-06-ex-01', 'a2-06-ex-02', 'a2-06-ex-03', 'a2-06-ex-04', 'a2-06-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Emotions: blij, boos, verdrietig, zenuwachtig, trots. Subordinate clause: Ik ben…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a2-06-l2',
      title: 'Messages and culture',
      objective: 'Practise culture-messages in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'Messages and culture',
        body: 'Messages: Hoi / Beste…, Groetjes / Met vriendelijke groet. Culture tips: directness, bicycle life, coffee appointments (een kopje koffie).',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Hoi Maya, kunnen we even bellen?', en: 'Hi Maya, can we talk on the phone briefly?' },
          { nl: 'Met vriendelijke groet, Adam', en: 'Kind regards, Adam' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a2-207', 'vocab-a2-208', 'vocab-a2-209', 'vocab-a2-210', 'vocab-a2-211', 'vocab-a2-212'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-06-ex-06', 'a2-06-ex-07', 'a2-06-ex-08', 'a2-06-ex-09', 'a2-06-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Messages: Hoi / Beste…, Groetjes / Met vriendelijke groet. Culture tips: directn…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA206Exercises = lessonExercises;
