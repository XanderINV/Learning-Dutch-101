import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a2-02-ex-01',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l1',
    type: 'multiple-choice',
    prompt: 'Retourtje is a…',
    explanation: 'Return ticket.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['return ticket', 'single ticket', 'platform', 'passport'],
    acceptedAnswers: ['return ticket']
  },
    {
    id: 'a2-02-ex-02',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l1',
    type: 'fill-blank',
    prompt: 'Ik _____ naar Gent geweest.',
    explanation: 'Zijn with movement/change.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['ben']
  },
    {
    id: 'a2-02-ex-03',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l1',
    type: 'translation-nl-en',
    prompt: 'overstappen',
    explanation: 'Change trains.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['to change (trains)', 'to transfer']
  },
    {
    id: 'a2-02-ex-04',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l1',
    type: 'listening',
    prompt: 'Destination?',
    explanation: 'Single to Maastricht.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Een enkele reis naar Maastricht',
    options: ['Maastricht', 'Amsterdam', 'Rotterdam', 'Haarlem'],
    acceptedAnswers: ['Maastricht']
  },
    {
    id: 'a2-02-ex-05',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['koffer=suitcase', 'vertraging=delay', 'reservering=reservation'],
    pairs: [{ left: 'koffer', right: 'suitcase' }, { left: 'vertraging', right: 'delay' }, { left: 'reservering', right: 'reservation' }]
  },
    {
    id: 'a2-02-ex-06',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l2',
    type: 'multiple-choice',
    prompt: 'Ontbijt inbegrepen means…',
    explanation: 'Inbegrepen = included.',
    skill: 'grammar',
    difficulty: 2,
    options: ['breakfast included', 'breakfast extra', 'no breakfast', 'lunch only'],
    acceptedAnswers: ['breakfast included']
  },
    {
    id: 'a2-02-ex-07',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l2',
    type: 'fill-blank',
    prompt: 'Heeft u een _____ voor twee nachten?',
    explanation: 'Room.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['kamer']
  },
    {
    id: 'a2-02-ex-08',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l2',
    type: 'translation-en-nl',
    prompt: 'I have a reservation',
    explanation: 'Booking phrase.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Ik heb een reservering']
  },
    {
    id: 'a2-02-ex-09',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Perfect with zijn.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik ben laat aangekomen.'],
    orderItems: ['ben', 'Ik', 'laat', 'aangekomen', '.']
  },
    {
    id: 'a2-02-ex-10',
    moduleId: 'a2-02',
    lessonId: 'a2-02-l2',
    type: 'dialogue',
    prompt: 'Ask if breakfast is included.',
    explanation: 'Hotel question.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Is het ontbijt inbegrepen?', 'Is ontbijt inbegrepen?']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a2-02-ex-11',
    moduleId: 'a2-02',
    type: 'multiple-choice',
    prompt: 'Vertraging means…',
    explanation: 'Delay.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['delay', 'platform', 'ticket', 'luggage'],
    acceptedAnswers: ['delay']
  },
    {
    id: 'a2-02-ex-12',
    moduleId: 'a2-02',
    type: 'error-correction',
    prompt: 'Fix: Ik heb naar Parijs gegaan.',
    explanation: 'Gaan takes zijn.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik ben naar Parijs gegaan.']
  },
    {
    id: 'a2-02-ex-13',
    moduleId: 'a2-02',
    type: 'reading-comp',
    prompt: 'How many nights?',
    explanation: 'Three nights.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Goedenavond, ik heb een reservering voor drie nachten op naam van Bakker.',
    options: ['drie', 'twee', 'vier', 'een'],
    acceptedAnswers: ['drie']
  },
    {
    id: 'a2-02-ex-14',
    moduleId: 'a2-02',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Delay question.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Is er vertraging',
    acceptedAnswers: ['Is er vertraging?', 'Is er vertraging']
  },
    {
    id: 'a2-02-ex-15',
    moduleId: 'a2-02',
    type: 'guided-writing',
    prompt: 'Write a check-in line and one question about the room.',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Goedemiddag, ik heb een reservering op naam van Costa. Heeft de kamer wifi?',
    checklist: ['Mentions reservation/name', 'Asks a room question']
  }
];

export const moduleA202 = createModule(
  {
    id: 'a2-02',
    level: 'a2',
    title: 'Travel and accommodation',
    titleNl: 'Reizen en overnachting',
    topic: 'travel',
    grammarFocus: ['Perfect with zijn for movement', 'Questions for booking', 'Comparatives'],
    vocabularyFocus: ['hotel', 'tickets', 'luggage', 'delays'],
    skills: ['grammar', 'speaking', 'listening', 'writing'],
    description: 'Book travel and handle hotel check-in.',
    order: 14,
  },
  [
    {
      id: 'a2-02-l1',
      title: 'Core patterns',
      objective: 'Learn core language for travel.',
      steps: [
      {
        type: 'explanation',
        title: 'Core patterns',
        body: 'Travel verbs often take zijn in the perfect: Ik ben naar Berlijn gegaan. Useful: enkele reis, retour, overstappen.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Ik wil een retourtje naar Utrecht.', en: 'I want a return ticket to Utrecht.' },
          { nl: 'We moeten overstappen in Zwolle.', en: 'We have to change in Zwolle.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a2-201', 'vocab-a2-202', 'vocab-a2-203', 'vocab-a2-204', 'vocab-a2-205', 'vocab-a2-206'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-02-ex-01', 'a2-02-ex-02', 'a2-02-ex-03', 'a2-02-ex-04', 'a2-02-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Travel verbs often take zijn in the perfect: Ik ben naar Berlijn gegaan. Useful:…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a2-02-l2',
      title: 'More practice',
      objective: 'Practise travel in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'More practice',
        body: 'Hotel language: Ik heb een reservering op naam van… Heeft u een kamer met ontbijt? Check-in/uit.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Ik heb een reservering.', en: 'I have a reservation.' },
          { nl: 'Is het ontbijt inbegrepen?', en: 'Is breakfast included?' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a2-207', 'vocab-a2-208', 'vocab-a2-209', 'vocab-a2-210', 'vocab-a2-211', 'vocab-a2-212'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-02-ex-06', 'a2-02-ex-07', 'a2-02-ex-08', 'a2-02-ex-09', 'a2-02-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Hotel language: Ik heb een reservering op naam van… Heeft u een kamer met ontbij…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA202Exercises = lessonExercises;
