import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'pre-a1-02-ex-01',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l1',
    type: 'multiple-choice',
    prompt: 'Dutch g in "goed" is closest to…',
    explanation: 'It is a fricative scrape, not an English stop g.',
    skill: 'pronunciation',
    difficulty: 1,
    options: ['the ch in Scottish loch', 'English g in go', 'English j in jump', 'silent g'],
    acceptedAnswers: ['the ch in Scottish loch']
  },
    {
    id: 'pre-a1-02-ex-02',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l1',
    type: 'listening',
    prompt: 'Which word do you hear?',
    explanation: 'Gracht begins with the Dutch g.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'gracht',
    options: ['gracht', 'kracht', 'nacht', 'zacht'],
    acceptedAnswers: ['gracht']
  },
    {
    id: 'pre-a1-02-ex-03',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l1',
    type: 'fill-blank',
    prompt: 'School begins with s + the Dutch scrape. The cluster is written ____.',
    explanation: 'sch = s + g/ch sound.',
    skill: 'pronunciation',
    difficulty: 1,
    acceptedAnswers: ['sch']
  },
    {
    id: 'pre-a1-02-ex-04',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l1',
    type: 'pronunciation',
    prompt: 'Say this canal word.',
    explanation: 'Keep continuous friction on g.',
    skill: 'pronunciation',
    difficulty: 1,
    audioText: 'gracht',
    acceptedAnswers: ['gracht']
  },
    {
    id: 'pre-a1-02-ex-05',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l1',
    type: 'matching',
    prompt: 'Match sound focus',
    explanation: 'Link spellings to example words.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['ui=huis / muis', 'ij=wijn', 'eu=neus'],
    pairs: [{ left: 'ui', right: 'huis / muis' }, { left: 'ij', right: 'wijn' }, { left: 'eu', right: 'neus' }]
  },
    {
    id: 'pre-a1-02-ex-06',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l2',
    type: 'multiple-choice',
    prompt: 'ei and ij usually…',
    explanation: 'Historically distinct; today usually merged.',
    skill: 'pronunciation',
    difficulty: 1,
    options: ['sound the same', 'are completely different', 'are silent', 'only appear in English loans'],
    acceptedAnswers: ['sound the same']
  },
    {
    id: 'pre-a1-02-ex-07',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l2',
    type: 'translation-nl-en',
    prompt: 'huis',
    explanation: 'Huis = house.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['house']
  },
    {
    id: 'pre-a1-02-ex-08',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l2',
    type: 'dictation',
    prompt: 'Write the word.',
    explanation: 'Trein uses ei.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'trein',
    acceptedAnswers: ['trein']
  },
    {
    id: 'pre-a1-02-ex-09',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l2',
    type: 'listening',
    prompt: 'Choose the word with ui.',
    explanation: 'Muis has the ui diphthong.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'muis',
    options: ['muis', 'mes', 'meer', 'mooi'],
    acceptedAnswers: ['muis']
  },
    {
    id: 'pre-a1-02-ex-10',
    moduleId: 'pre-a1-02',
    lessonId: 'pre-a1-02-l2',
    type: 'error-correction',
    prompt: 'Fix the tip: Dutch g sounds like English go.',
    explanation: 'Reject the English stop g comparison as a rule.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Dutch g does not sound like English go.', 'Dutch g is a fricative, not like English go.']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'pre-a1-02-ex-11',
    moduleId: 'pre-a1-02',
    type: 'multiple-choice',
    prompt: 'Which word contains ui?',
    explanation: 'Huis has ui.',
    skill: 'pronunciation',
    difficulty: 1,
    options: ['huis', 'trein', 'neus', 'school'],
    acceptedAnswers: ['huis']
  },
    {
    id: 'pre-a1-02-ex-12',
    moduleId: 'pre-a1-02',
    type: 'fill-blank',
    prompt: 'In Netherlandic Dutch, g and ch often sound ____.',
    explanation: 'They often collapse to a similar scrape.',
    skill: 'pronunciation',
    difficulty: 1,
    acceptedAnswers: ['the same', 'similar', 'almost the same']
  },
    {
    id: 'pre-a1-02-ex-13',
    moduleId: 'pre-a1-02',
    type: 'reading-comp',
    prompt: 'Which sound is highlighted?',
    explanation: 'The tip focuses on g.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Let op de g in "goedemorgen".',
    options: ['g', 'r', 'm', 'o'],
    acceptedAnswers: ['g']
  },
    {
    id: 'pre-a1-02-ex-14',
    moduleId: 'pre-a1-02',
    type: 'sentence-order',
    prompt: 'Order the advice.',
    explanation: 'Polite request with langzaam.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Spreek alsjeblieft langzaam.'],
    orderItems: ['langzaam', 'Spreek', 'alsjeblieft', '.']
  },
    {
    id: 'pre-a1-02-ex-15',
    moduleId: 'pre-a1-02',
    type: 'guided-writing',
    prompt: 'Write one Dutch word with g that you will practise this week and why.',
    explanation: 'Self-assess against the model; no single correct sentence.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Ik oefen "gracht", omdat de g nieuw voor me is.',
    checklist: ['Includes a Dutch word with g or ch', 'Gives a short reason']
  }
];

export const modulePreA102 = createModule(
  {
    id: 'pre-a1-02',
    level: 'pre-a1',
    title: 'Important Dutch sounds',
    titleNl: 'Belangrijke klanken',
    topic: 'pronunciation',
    grammarFocus: ['Sound–spelling links'],
    vocabularyFocus: ['ui', 'ij', 'eu', 'g/ch', 'sch'],
    skills: ['pronunciation', 'listening', 'vocabulary'],
    description: 'Train the sounds that most trip up English speakers: g/ch, ui, ij/ei, eu, and sch.',
    order: 2,
  },
  [
    {
      id: 'pre-a1-02-l1',
      title: 'The famous g and ch',
      objective: 'Recognise the Dutch g/ch fricative.',
      steps: [
      {
        type: 'explanation',
        title: 'A scrape, not a stop',
        body: 'In native Dutch words, g is a continuous friction sound at the back of the mouth (like Scottish loch), not the stop in English go. Spelling decides g vs ch; the sound is often nearly the same in everyday Netherlandic Dutch.',
      },
      {
        type: 'examples',
        title: 'Hear it in words',
        items: [
          { nl: 'goed', en: 'good' },
          { nl: 'gracht', en: 'canal' },
          { nl: 'lach', en: 'laugh' },
          { nl: 'school', en: 'school (s + scrape, not English sh)' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Sound focus words',
        vocabularyIds: ['vocab-pre-a1-009', 'vocab-pre-a1-010', 'vocab-pre-a1-011', 'vocab-pre-a1-012', 'vocab-pre-a1-013'],
      },
      {
        type: 'exercise',
        exerciseIds: ['pre-a1-02-ex-01', 'pre-a1-02-ex-02', 'pre-a1-02-ex-03', 'pre-a1-02-ex-04', 'pre-a1-02-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Dutch g is not the English hard g.', 'g and ch often sound very similar in the Netherlands.'],
      }
      ],
    },
    {
      id: 'pre-a1-02-l2',
      title: 'Diphthongs ui, ij/ei, eu',
      objective: 'Tell ui, ij/ei, and eu apart.',
      steps: [
      {
        type: 'explanation',
        title: 'Three learner hurdles',
        body: 'UI (huis), IJ/EI (wijn/trein), and EU (neus) do not map neatly onto English. Practise minimal pairs and listen carefully before speaking.',
      },
      {
        type: 'examples',
        title: 'Minimal pairs',
        items: [
          { nl: 'huis — muis', en: 'house — mouse' },
          { nl: 'wijn — trein', en: 'wine — train' },
          { nl: 'neus — leuk', en: 'nose — nice/fun' }
        ],
      },
      {
        type: 'exercise',
        exerciseIds: ['pre-a1-02-ex-06', 'pre-a1-02-ex-07', 'pre-a1-02-ex-08', 'pre-a1-02-ex-09', 'pre-a1-02-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['ij and ei usually sound the same.', 'ui is a rounded diphthong; eu is front and rounded.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const modulePreA102Exercises = lessonExercises;
