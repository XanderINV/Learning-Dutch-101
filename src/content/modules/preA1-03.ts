import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'pre-a1-03-ex-01',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l1',
    type: 'multiple-choice',
    prompt: 'Evening greeting?',
    explanation: 'Goedenavond is for the evening.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['Goedenavond', 'Goedemorgen', 'Goedemiddag', 'Goedenacht'],
    acceptedAnswers: ['Goedenavond']
  },
    {
    id: 'pre-a1-03-ex-02',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l1',
    type: 'translation-en-nl',
    prompt: 'thank you (informal)',
    explanation: 'Dank je wel is informal thanks.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['dank je wel', 'dankjewel', 'dank je']
  },
    {
    id: 'pre-a1-03-ex-03',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l1',
    type: 'listening',
    prompt: 'What do you hear?',
    explanation: 'Response to thanks.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Graag gedaan',
    options: ['Graag gedaan', 'Tot ziens', 'Hallo', 'Pardon'],
    acceptedAnswers: ['Graag gedaan']
  },
    {
    id: 'pre-a1-03-ex-04',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l1',
    type: 'fill-blank',
    prompt: '_____ je wel voor je hulp.',
    explanation: 'Dank je wel…',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['Dank']
  },
    {
    id: 'pre-a1-03-ex-05',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l1',
    type: 'dialogue',
    prompt: 'Reply politely to "Dank u wel".',
    explanation: 'Graag gedaan = you are welcome.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Graag gedaan', 'Graag gedaan!']
  },
    {
    id: 'pre-a1-03-ex-06',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l2',
    type: 'multiple-choice',
    prompt: 'Choose the formal "you".',
    explanation: 'U is formal singular (and sometimes plural).',
    skill: 'grammar',
    difficulty: 1,
    options: ['u', 'je', 'jij', 'jullie'],
    acceptedAnswers: ['u']
  },
    {
    id: 'pre-a1-03-ex-07',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l2',
    type: 'fill-blank',
    prompt: 'Ik _____ Maria.',
    explanation: 'Ik heet… = I am called…',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['heet']
  },
    {
    id: 'pre-a1-03-ex-08',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l2',
    type: 'translation-nl-en',
    prompt: 'Ik kom uit Nederland.',
    explanation: 'Komen uit = come from.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['I come from the Netherlands', 'I come from Netherlands', 'I\'m from the Netherlands', 'I am from the Netherlands']
  },
    {
    id: 'pre-a1-03-ex-09',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l2',
    type: 'sentence-order',
    prompt: 'Order the introduction.',
    explanation: 'Subject ik, verb heet, name.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['ik heet Nina.'],
    orderItems: ['heet', 'ik', 'Nina', '.']
  },
    {
    id: 'pre-a1-03-ex-10',
    moduleId: 'pre-a1-03',
    lessonId: 'pre-a1-03-l2',
    type: 'guided-writing',
    prompt: 'Write 2–3 sentences introducing yourself (name, country, city).',
    explanation: 'Compare with the model; self-check the checklist.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Hallo, ik heet Alex. Ik kom uit Ierland. Ik woon in Rotterdam.',
    checklist: ['Uses ik heet…', 'Mentions country or city', 'Looks like natural Dutch']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'pre-a1-03-ex-11',
    moduleId: 'pre-a1-03',
    type: 'matching',
    prompt: 'Match greetings',
    explanation: 'Core politeness set.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['Goedemorgen=Good morning', 'Tot ziens=See you', 'Pardon=Excuse me'],
    pairs: [{ left: 'Goedemorgen', right: 'Good morning' }, { left: 'Tot ziens', right: 'See you' }, { left: 'Pardon', right: 'Excuse me' }]
  },
    {
    id: 'pre-a1-03-ex-12',
    moduleId: 'pre-a1-03',
    type: 'error-correction',
    prompt: 'Fix: Ik heet is Sam.',
    explanation: 'No is after heet in this pattern.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik heet Sam.']
  },
    {
    id: 'pre-a1-03-ex-13',
    moduleId: 'pre-a1-03',
    type: 'listening',
    prompt: 'Choose the formal thanks.',
    explanation: 'U marks formal register.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Dank u wel',
    options: ['Dank u wel', 'Dank je wel', 'Doei', 'Hoi'],
    acceptedAnswers: ['Dank u wel']
  },
    {
    id: 'pre-a1-03-ex-14',
    moduleId: 'pre-a1-03',
    type: 'reading-comp',
    prompt: 'Where does Nina live?',
    explanation: 'Woon in + city.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Hallo, ik heet Nina. Ik kom uit Italië. Ik woon in Groningen.',
    options: ['Groningen', 'Italië', 'Amsterdam', 'Nina'],
    acceptedAnswers: ['Groningen']
  },
    {
    id: 'pre-a1-03-ex-15',
    moduleId: 'pre-a1-03',
    type: 'multiple-choice',
    prompt: 'Best informal hello among friends?',
    explanation: 'Hoi is casual.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['Hoi', 'Goedenavond meneer', 'Dank u wel', 'Alstublieft'],
    acceptedAnswers: ['Hoi']
  }
];

export const modulePreA103 = createModule(
  {
    id: 'pre-a1-03',
    level: 'pre-a1',
    title: 'Greetings and introducing yourself',
    titleNl: 'Begroetingen en jezelf voorstellen',
    topic: 'greetings',
    grammarFocus: ['Ik heet…', 'Formal u vs informal je'],
    vocabularyFocus: ['greetings', 'polite phrases', 'introductions'],
    skills: ['speaking', 'listening', 'vocabulary'],
    description: 'Say hello, thank people, and introduce yourself formally and informally.',
    order: 3,
  },
  [
    {
      id: 'pre-a1-03-l1',
      title: 'Hello, thanks, goodbye',
      objective: 'Use common greetings by time of day.',
      steps: [
      {
        type: 'explanation',
        title: 'First contact phrases',
        body: 'Start with hallo or hoi among peers. Use goedemorgen before noon, goedemiddag in the afternoon, and goedenavond in the evening. Pair thanks with graag gedaan.',
      },
      {
        type: 'examples',
        title: 'Polite exchanges',
        items: [
          { nl: 'Goedemorgen! Welkom.', en: 'Good morning! Welcome.' },
          { nl: 'Dank je wel. — Graag gedaan.', en: 'Thank you. — You are welcome.' },
          { nl: 'Tot ziens!', en: 'See you!' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Greeting set',
        vocabularyIds: ['vocab-pre-a1-014', 'vocab-pre-a1-015', 'vocab-pre-a1-018', 'vocab-pre-a1-022', 'vocab-pre-a1-023', 'vocab-pre-a1-024', 'vocab-pre-a1-025'],
      },
      {
        type: 'exercise',
        exerciseIds: ['pre-a1-03-ex-01', 'pre-a1-03-ex-02', 'pre-a1-03-ex-03', 'pre-a1-03-ex-04', 'pre-a1-03-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Goedemorgen / middag / avond match the time of day.', 'Dank je wel (informal) vs dank u wel (formal).'],
      }
      ],
    },
    {
      id: 'pre-a1-03-l2',
      title: 'Ik heet… / Ik kom uit…',
      objective: 'Introduce your name and country.',
      steps: [
      {
        type: 'explanation',
        title: 'A tiny introduction script',
        body: 'A simple pattern: Hallo, ik heet [name]. Ik kom uit [country]. Aangenaam! Add Ik woon in [city] when useful.',
      },
      {
        type: 'examples',
        title: 'Model introductions',
        items: [
          { nl: 'Hallo, ik heet Omar. Ik kom uit Spanje.', en: 'Hello, I am Omar. I come from Spain.' },
          { nl: 'Aangenaam, ik woon in Utrecht.', en: 'Nice to meet you, I live in Utrecht.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Introduction words',
        vocabularyIds: ['vocab-pre-a1-029', 'vocab-pre-a1-030', 'vocab-pre-a1-038', 'vocab-pre-a1-039', 'vocab-pre-a1-040'],
      },
      {
        type: 'exercise',
        exerciseIds: ['pre-a1-03-ex-06', 'pre-a1-03-ex-07', 'pre-a1-03-ex-08', 'pre-a1-03-ex-09', 'pre-a1-03-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Ik heet… states your name.', 'Use u with strangers in formal settings; je/jij with peers.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const modulePreA103Exercises = lessonExercises;
