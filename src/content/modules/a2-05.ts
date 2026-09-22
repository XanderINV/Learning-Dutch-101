import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a2-05-ex-01',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l1',
    type: 'multiple-choice',
    prompt: 'Collega means…',
    explanation: 'Colleague.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['colleague', 'college', 'customer', 'manager only'],
    acceptedAnswers: ['colleague']
  },
    {
    id: 'a2-05-ex-02',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l1',
    type: 'fill-blank',
    prompt: 'Heb je zin _____ te komen?',
    explanation: 'Zin om te…',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['om']
  },
    {
    id: 'a2-05-ex-03',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l1',
    type: 'translation-nl-en',
    prompt: 'uitnodiging',
    explanation: 'Invitation.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['invitation']
  },
    {
    id: 'a2-05-ex-04',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l1',
    type: 'listening',
    prompt: 'Response type?',
    explanation: 'Accepting.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Leuk, graag',
    options: ['accept', 'refuse', 'ask price', 'order food'],
    acceptedAnswers: ['accept']
  },
    {
    id: 'a2-05-ex-05',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['vergadering=meeting', 'rekening=bill', 'klacht=complaint'],
    pairs: [{ left: 'vergadering', right: 'meeting' }, { left: 'rekening', right: 'bill' }, { left: 'klacht', right: 'complaint' }]
  },
    {
    id: 'a2-05-ex-06',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l2',
    type: 'multiple-choice',
    prompt: 'Polite complaint starter?',
    explanation: 'Softener.',
    skill: 'grammar',
    difficulty: 2,
    options: ['Excuseer, maar…', 'Geef nu!', 'Dit is stom.', 'Niks zeggen'],
    acceptedAnswers: ['Excuseer, maar…']
  },
    {
    id: 'a2-05-ex-07',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l2',
    type: 'fill-blank',
    prompt: 'Mag ik de _____, alstublieft?',
    explanation: 'Ask for the bill.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['rekening']
  },
    {
    id: 'a2-05-ex-08',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l2',
    type: 'translation-en-nl',
    prompt: 'Would you like to join us?',
    explanation: 'Invitation.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Heb je zin om mee te gaan?', 'Wil je meedoen?', 'Wil je meekomen?']
  },
    {
    id: 'a2-05-ex-09',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Polite refusal.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Jammer, maar ik kan niet.'],
    orderItems: ['niet', 'kan', 'Ik', 'jammer', 'maar', '.']
  },
    {
    id: 'a2-05-ex-10',
    moduleId: 'a2-05',
    lessonId: 'a2-05-l2',
    type: 'dialogue',
    prompt: 'Invite a colleague for coffee.',
    explanation: 'Invitation.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Heb je zin in een koffie?', 'Zullen we koffie drinken?']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a2-05-ex-11',
    moduleId: 'a2-05',
    type: 'multiple-choice',
    prompt: 'Deadline is…',
    explanation: 'Loanword same meaning.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['deadline', 'desk', 'salary', 'holiday'],
    acceptedAnswers: ['deadline']
  },
    {
    id: 'a2-05-ex-12',
    moduleId: 'a2-05',
    type: 'error-correction',
    prompt: 'Fix: Heb je zin van te eten?',
    explanation: 'Zin om te.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Heb je zin om te eten?']
  },
    {
    id: 'a2-05-ex-13',
    moduleId: 'a2-05',
    type: 'reading-comp',
    prompt: 'What is wrong with the dish?',
    explanation: 'Soup is cold.',
    skill: 'reading',
    difficulty: 2,
    passage: 'De klant zegt dat de soep koud is. De ober biedt een nieuwe soep aan.',
    options: ['koud', 'duur', 'zout', 'lekker'],
    acceptedAnswers: ['koud']
  },
    {
    id: 'a2-05-ex-14',
    moduleId: 'a2-05',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Invitation.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Heb je zin om te lunchen',
    acceptedAnswers: ['Heb je zin om te lunchen?', 'Heb je zin om te lunchen']
  },
    {
    id: 'a2-05-ex-15',
    moduleId: 'a2-05',
    type: 'guided-writing',
    prompt: 'Write a polite restaurant complaint and a desired solution.',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Excuseer, maar mijn pasta is koud. Kunt u die even opwarmen, alstublieft?',
    checklist: ['Polite tone', 'States problem', 'Asks for action']
  }
];

export const moduleA205 = createModule(
  {
    id: 'a2-05',
    level: 'a2',
    title: 'Work, invitations, restaurants',
    titleNl: 'Werk, uitnodigingen, restaurants',
    topic: 'social-work',
    grammarFocus: ['Object pronouns', 'Imperatives polite', 'Conjunctions want/maar/dus'],
    vocabularyFocus: ['workplace', 'invitations', 'restaurant complaints'],
    skills: ['speaking', 'writing', 'listening'],
    description: 'Navigate workplace small talk, invitations, and dining out.',
    order: 17,
  },
  [
    {
      id: 'a2-05-l1',
      title: 'At work and invitations',
      objective: 'Learn core language for social-work.',
      steps: [
      {
        type: 'explanation',
        title: 'At work and invitations',
        body: 'Workplace: collega, vergadering, deadline, fulltime/parttime. Invitations: Heb je zin om…? Zin in…? Leuk, graag! / Jammer, ik kan niet.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Heb je zin om te lunchen?', en: 'Do you feel like having lunch?' },
          { nl: 'De vergadering begint om tien uur.', en: 'The meeting starts at ten.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a2-201', 'vocab-a2-202', 'vocab-a2-203', 'vocab-a2-204', 'vocab-a2-205', 'vocab-a2-206'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-05-ex-01', 'a2-05-ex-02', 'a2-05-ex-03', 'a2-05-ex-04', 'a2-05-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Workplace: collega, vergadering, deadline, fulltime/parttime. Invitations: Heb j…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a2-05-l2',
      title: 'In a restaurant',
      objective: 'Practise social-work in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'In a restaurant',
        body: 'Restaurant: Een tafel voor twee. De soep is koud — polite complaint. Mag ik de rekening?',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Dit gerecht is niet gaar.', en: 'This dish is undercooked.' },
          { nl: 'Excuses, we brengen meteen iets anders.', en: 'Sorry, we’ll bring something else right away.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a2-207', 'vocab-a2-208', 'vocab-a2-209', 'vocab-a2-210', 'vocab-a2-211', 'vocab-a2-212'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-05-ex-06', 'a2-05-ex-07', 'a2-05-ex-08', 'a2-05-ex-09', 'a2-05-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Restaurant: Een tafel voor twee. De soep is koud — polite complaint. Mag ik de r…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA205Exercises = lessonExercises;
