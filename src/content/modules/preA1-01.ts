import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'pre-a1-01-ex-01',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l1',
    type: 'multiple-choice',
    prompt: 'Which Dutch phrase means "How do you spell that?"',
    promptEn: 'Choose the best option.',
    explanation: 'Hoe spel je dat? asks someone to spell a word.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['Hoe spel je dat?', 'Hoe heet je?', 'Waar woon je?', 'Hoe laat is het?'],
    acceptedAnswers: ['Hoe spel je dat?']
  },
    {
    id: 'pre-a1-01-ex-02',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l1',
    type: 'fill-blank',
    prompt: 'Complete: Het Nederlandse _____ heeft 26 letters.',
    promptEn: 'Fill in the blank.',
    explanation: 'Alfabet means alphabet.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['alfabet']
  },
    {
    id: 'pre-a1-01-ex-03',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l1',
    type: 'listening',
    prompt: 'Listen and choose what you hear.',
    explanation: 'You heard the letters of Anna.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'A N N A',
    options: ['Anna', 'Anne', 'Ana', 'Anja'],
    acceptedAnswers: ['Anna']
  },
    {
    id: 'pre-a1-01-ex-04',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l1',
    type: 'matching',
    prompt: 'Match Dutch and English',
    explanation: 'These are core spelling words.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['voornaam=first name', 'achternaam=surname', 'spellen=to spell'],
    pairs: [{ left: 'voornaam', right: 'first name' }, { left: 'achternaam', right: 'surname' }, { left: 'spellen', right: 'to spell' }]
  },
    {
    id: 'pre-a1-01-ex-05',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l1',
    type: 'pronunciation',
    prompt: 'Practise saying this slowly.',
    explanation: 'Focus on clear consonants.',
    skill: 'pronunciation',
    difficulty: 1,
    audioText: 'Hoe spel je dat?',
    acceptedAnswers: ['Hoe spel je dat?']
  },
    {
    id: 'pre-a1-01-ex-06',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l2',
    type: 'multiple-choice',
    prompt: 'What is a "hoofdletter"?',
    promptEn: 'Choose the meaning.',
    explanation: 'Hoofdletter = capital letter.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['a capital letter', 'a vowel', 'a number', 'a punctuation mark'],
    acceptedAnswers: ['a capital letter']
  },
    {
    id: 'pre-a1-01-ex-07',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l2',
    type: 'translation-en-nl',
    prompt: 'first name',
    explanation: 'Voornaam is first name.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['voornaam']
  },
    {
    id: 'pre-a1-01-ex-08',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l2',
    type: 'translation-nl-en',
    prompt: 'achternaam',
    explanation: 'Achternaam is surname.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['surname', 'last name', 'family name']
  },
    {
    id: 'pre-a1-01-ex-09',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l2',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Ik heet Sam = My name is Sam.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik heet Sam',
    acceptedAnswers: ['Ik heet Sam', 'ik heet sam']
  },
    {
    id: 'pre-a1-01-ex-10',
    moduleId: 'pre-a1-01',
    lessonId: 'pre-a1-01-l2',
    type: 'dialogue',
    prompt: 'Someone asks "Hoe spel je je naam?". You answer with letters for "Lisa". Type your reply starting with the name.',
    explanation: 'Give the name, then spell it.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Lisa. L-I-S-A.', 'Lisa. L I S A', 'Lisa L-I-S-A']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'pre-a1-01-ex-11',
    moduleId: 'pre-a1-01',
    type: 'multiple-choice',
    prompt: 'Choose the correct article: ___ alfabet',
    explanation: 'Het alfabet — alfabet is a het-word.',
    skill: 'grammar',
    difficulty: 1,
    options: ['het', 'de', 'een', 'die'],
    acceptedAnswers: ['het']
  },
    {
    id: 'pre-a1-01-ex-12',
    moduleId: 'pre-a1-01',
    type: 'fill-blank',
    prompt: '_____ je achternaam, alsjeblieft.',
    explanation: 'Spel is the imperative of spellen.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Spell', 'Spel']
  },
    {
    id: 'pre-a1-01-ex-13',
    moduleId: 'pre-a1-01',
    type: 'error-correction',
    prompt: 'Fix: De alfabet is belangrijk.',
    explanation: 'Alfabet takes het, not de.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Het alfabet is belangrijk.']
  },
    {
    id: 'pre-a1-01-ex-14',
    moduleId: 'pre-a1-01',
    type: 'reading-comp',
    prompt: 'What does Sam spell?',
    explanation: 'The passage introduces Sam and spells the name.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Hallo, ik heet Sam. S-A-M.',
    options: ['Sam', 'Sara', 'Tom', 'Ana'],
    acceptedAnswers: ['Sam']
  },
    {
    id: 'pre-a1-01-ex-15',
    moduleId: 'pre-a1-01',
    type: 'sentence-order',
    prompt: 'Put the words in order.',
    explanation: 'Question word order with spel in second position after Hoe…je.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Hoe spel je dat?'],
    orderItems: ['je', 'Hoe', 'dat', 'spel', '?']
  }
];

export const modulePreA101 = createModule(
  {
    id: 'pre-a1-01',
    level: 'pre-a1',
    title: 'Alphabet and spelling',
    titleNl: 'Alfabet en spelling',
    topic: 'alphabet',
    grammarFocus: ['Letter names', 'Spelling aloud'],
    vocabularyFocus: ['letters', 'names', 'spelling phrases'],
    skills: ['pronunciation', 'listening', 'speaking', 'vocabulary'],
    description: 'Learn the Dutch alphabet and how to spell names clearly.',
    order: 1,
  },
  [
    {
      id: 'pre-a1-01-l1',
      title: 'The Dutch alphabet',
      objective: 'Recognise and name Dutch letters.',
      steps: [
      {
        type: 'explanation',
        title: 'Same letters, new sounds',
        body: 'Dutch uses A–Z like English, but several letter names and sounds differ. Learning the alphabet helps you spell your name, email address, and street names on the phone.',
      },
      {
        type: 'examples',
        title: 'Letter names in context',
        items: [
          { nl: 'Mijn naam is Anna. A-N-N-A.', en: 'My name is Anna. A-N-N-A.' },
          { nl: 'Hoe spel je dat?', en: 'How do you spell that?' },
          { nl: 'De letter G klinkt anders dan in het Engels.', en: 'The letter G sounds different from English.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Useful spelling words',
        vocabularyIds: ['vocab-pre-a1-001', 'vocab-pre-a1-002', 'vocab-pre-a1-003', 'vocab-pre-a1-004', 'vocab-pre-a1-005', 'vocab-pre-a1-006'],
      },
      {
        type: 'exercise',
        exerciseIds: ['pre-a1-01-ex-01', 'pre-a1-01-ex-02', 'pre-a1-01-ex-03', 'pre-a1-01-ex-04', 'pre-a1-01-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Dutch uses the Latin alphabet with 26 letters.', 'IJ is often treated as a special digraph in names.'],
      }
      ],
    },
    {
      id: 'pre-a1-01-l2',
      title: 'Spelling your name',
      objective: 'Spell a first name and surname politely.',
      steps: [
      {
        type: 'explanation',
        title: 'A polite spelling exchange',
        body: 'In Dutch you often hear: "Kunt u dat spellen?" (formal) or "Kun je dat spellen?" (informal). Answer with clear letter names, pausing between groups.',
      },
      {
        type: 'examples',
        title: 'Mini dialogue',
        items: [
          { nl: 'Wat is je voornaam?', en: 'What is your first name?' },
          { nl: 'Sam. S-A-M.', en: 'Sam. S-A-M.' },
          { nl: 'En je achternaam?', en: 'And your surname?' }
        ],
      },
      {
        type: 'exercise',
        exerciseIds: ['pre-a1-01-ex-06', 'pre-a1-01-ex-07', 'pre-a1-01-ex-08', 'pre-a1-01-ex-09', 'pre-a1-01-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Use "Hoe spel je…?" to ask for spelling.', 'Speak slowly letter by letter.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const modulePreA101Exercises = lessonExercises;
