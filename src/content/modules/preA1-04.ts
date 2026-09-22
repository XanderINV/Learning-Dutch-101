import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'pre-a1-04-ex-01',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l1',
    type: 'multiple-choice',
    prompt: 'What day comes after vrijdag?',
    explanation: 'Friday → Saturday.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['zaterdag', 'donderdag', 'maandag', 'zondag'],
    acceptedAnswers: ['zaterdag']
  },
    {
    id: 'pre-a1-04-ex-02',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l1',
    type: 'fill-blank',
    prompt: 'Zeven dagen in een _____.',
    explanation: 'A week has seven days.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['week']
  },
    {
    id: 'pre-a1-04-ex-03',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l1',
    type: 'translation-en-nl',
    prompt: 'Monday',
    explanation: 'maandag',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['maandag']
  },
    {
    id: 'pre-a1-04-ex-04',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l1',
    type: 'listening',
    prompt: 'Which number?',
    explanation: 'Twelve.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'twaalf',
    options: ['twaalf', 'twee', 'twintig', 'tien'],
    acceptedAnswers: ['twaalf']
  },
    {
    id: 'pre-a1-04-ex-05',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l1',
    type: 'matching',
    prompt: 'Match',
    explanation: 'Time basics.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['uur=hour / o’clock', 'minuut=minute', 'vandaag=today'],
    pairs: [{ left: 'uur', right: 'hour / o’clock' }, { left: 'minuut', right: 'minute' }, { left: 'vandaag', right: 'today' }]
  },
    {
    id: 'pre-a1-04-ex-06',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l2',
    type: 'multiple-choice',
    prompt: 'Half acht means…',
    explanation: 'Halfway toward eight.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['7:30', '8:30', '8:00', '7:00'],
    acceptedAnswers: ['7:30']
  },
    {
    id: 'pre-a1-04-ex-07',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l2',
    type: 'fill-blank',
    prompt: 'Kwart _____ twee = 2:15.',
    explanation: 'Kwart over = quarter past.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['over']
  },
    {
    id: 'pre-a1-04-ex-08',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l2',
    type: 'dictation',
    prompt: 'Write the request.',
    explanation: 'Ask for slow speech.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Spreek alsjeblieft langzaam',
    acceptedAnswers: ['Spreek alsjeblieft langzaam', 'spreek alsjeblieft langzaam']
  },
    {
    id: 'pre-a1-04-ex-09',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l2',
    type: 'dialogue',
    prompt: 'Ask someone to repeat.',
    explanation: 'Herhalen = to repeat.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Kun je dat herhalen?', 'Kunt u dat herhalen?']
  },
    {
    id: 'pre-a1-04-ex-10',
    moduleId: 'pre-a1-04',
    lessonId: 'pre-a1-04-l2',
    type: 'sentence-order',
    prompt: 'Order the time sentence.',
    explanation: 'Het is + time.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Het is drie uur.'],
    orderItems: ['is', 'Het', 'drie', 'uur', '.']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'pre-a1-04-ex-11',
    moduleId: 'pre-a1-04',
    type: 'multiple-choice',
    prompt: 'Choose the classroom phrase for "I do not understand".',
    explanation: 'Begrijpen = understand.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['Ik begrijp het niet', 'Ik heet Sam', 'Tot ziens', 'Hoe laat is het?'],
    acceptedAnswers: ['Ik begrijp het niet']
  },
    {
    id: 'pre-a1-04-ex-12',
    moduleId: 'pre-a1-04',
    type: 'reading-comp',
    prompt: 'When is the break?',
    explanation: 'Break at eleven.',
    skill: 'reading',
    difficulty: 2,
    passage: 'De les begint om negen uur. Om elf uur is pauze.',
    options: ['elf uur', 'negen uur', 'twaalf uur', 'acht uur'],
    acceptedAnswers: ['elf uur']
  },
    {
    id: 'pre-a1-04-ex-13',
    moduleId: 'pre-a1-04',
    type: 'error-correction',
    prompt: 'Fix: Het is half negen (meaning 9:30).',
    explanation: 'Half negen = 8:30; half tien = 9:30.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Het is half tien.', 'Say half tien for 9:30.']
  },
    {
    id: 'pre-a1-04-ex-14',
    moduleId: 'pre-a1-04',
    type: 'translation-nl-en',
    prompt: 'Kun je dat herhalen?',
    explanation: 'Herhalen = repeat.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Can you repeat that?', 'Could you repeat that?']
  },
    {
    id: 'pre-a1-04-ex-15',
    moduleId: 'pre-a1-04',
    type: 'listening',
    prompt: 'What time?',
    explanation: '9:45.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Het is kwart voor tien',
    options: ['kwart voor tien', 'kwart over tien', 'half tien', 'tien uur'],
    acceptedAnswers: ['kwart voor tien']
  }
];

export const modulePreA104 = createModule(
  {
    id: 'pre-a1-04',
    level: 'pre-a1',
    title: 'Numbers, time, and classroom phrases',
    titleNl: 'Getallen, tijd en klastaal',
    topic: 'numbers-time',
    grammarFocus: ['Telling the time', 'Half = 30 minutes before the hour'],
    vocabularyFocus: ['numbers', 'days', 'months', 'classroom phrases'],
    skills: ['listening', 'vocabulary', 'speaking'],
    description: 'Count, say the date and time, and use survival phrases in class.',
    order: 4,
  },
  [
    {
      id: 'pre-a1-04-l1',
      title: 'Numbers and days',
      objective: 'Count useful numbers and name the days.',
      steps: [
      {
        type: 'explanation',
        title: 'Numbers you need daily',
        body: 'Master 0–12, then 20, 30, 100. Days run maandag to zondag. In normal Dutch sentences, days and months are lowercase.',
      },
      {
        type: 'examples',
        title: 'In sentences',
        items: [
          { nl: 'Ik heb les op maandag.', en: 'I have class on Monday.' },
          { nl: 'Het is vijf uur.', en: 'It is five o’clock.' },
          { nl: 'Kun je dat herhalen?', en: 'Can you repeat that?' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Numbers and days',
        vocabularyIds: ['vocab-pre-a1-041', 'vocab-pre-a1-051', 'vocab-pre-a1-057', 'vocab-pre-a1-063', 'vocab-pre-a1-067', 'vocab-pre-a1-069'],
      },
      {
        type: 'exercise',
        exerciseIds: ['pre-a1-04-ex-01', 'pre-a1-04-ex-02', 'pre-a1-04-ex-03', 'pre-a1-04-ex-04', 'pre-a1-04-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Learn 0–12 solidly, then tens.', 'Days are not capitalised in Dutch running text.'],
      }
      ],
    },
    {
      id: 'pre-a1-04-l2',
      title: 'Clock time and class talk',
      objective: 'Understand half/kwart and ask for slower speech.',
      steps: [
      {
        type: 'explanation',
        title: 'Dutch half hours',
        body: 'Half acht means 7:30 (halfway to eight), not 8:30. Kwart over twee = 2:15; kwart voor tien = 9:45.',
      },
      {
        type: 'examples',
        title: 'Classroom survival',
        items: [
          { nl: 'Spreek alsjeblieft langzaam.', en: 'Please speak slowly.' },
          { nl: 'Ik begrijp het niet.', en: 'I do not understand.' },
          { nl: 'Wat betekent dat?', en: 'What does that mean?' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Classroom phrases',
        vocabularyIds: ['vocab-pre-a1-074', 'vocab-pre-a1-077', 'vocab-pre-a1-078', 'vocab-pre-a1-079', 'vocab-pre-a1-080'],
      },
      {
        type: 'exercise',
        exerciseIds: ['pre-a1-04-ex-06', 'pre-a1-04-ex-07', 'pre-a1-04-ex-08', 'pre-a1-04-ex-09', 'pre-a1-04-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Half acht = 7:30.', 'Use Langzaam, alsjeblieft and Kun je dat herhalen?'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const modulePreA104Exercises = lessonExercises;
