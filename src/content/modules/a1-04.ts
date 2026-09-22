import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a1-04-ex-01',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l1',
    type: 'multiple-choice',
    prompt: 'Ik _____ om zeven uur op.',
    explanation: 'Ik sta … op.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['sta', 'staan', 'staat', 'opsta'],
    acceptedAnswers: ['sta']
  },
    {
    id: 'a1-04-ex-02',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l1',
    type: 'fill-blank',
    prompt: '’s Ochtends _____ ik koffie.',
    explanation: 'Present tense drink.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['drink']
  },
    {
    id: 'a1-04-ex-03',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l1',
    type: 'translation-nl-en',
    prompt: 'Ik ga naar mijn werk.',
    explanation: 'Naar mijn werk.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['I go to work', 'I go to my work']
  },
    {
    id: 'a1-04-ex-04',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l1',
    type: 'listening',
    prompt: 'What happens?',
    explanation: 'Getting up.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik sta vroeg op',
    options: ['opstaan', 'aankomen', 'werken', 'slapen'],
    acceptedAnswers: ['opstaan']
  },
    {
    id: 'a1-04-ex-05',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['opstaan=to get up', 'werken=to work', 'slapen=to sleep'],
    pairs: [{ left: 'opstaan', right: 'to get up' }, { left: 'werken', right: 'to work' }, { left: 'slapen', right: 'to sleep' }]
  },
    {
    id: 'a1-04-ex-06',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l2',
    type: 'multiple-choice',
    prompt: 'In main clauses, the separable prefix…',
    explanation: 'Split in main clauses.',
    skill: 'grammar',
    difficulty: 2,
    options: ['goes to the end', 'stays attached always', 'is deleted', 'comes first'],
    acceptedAnswers: ['goes to the end']
  },
    {
    id: 'a1-04-ex-07',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l2',
    type: 'fill-blank',
    prompt: 'De bus komt laat _____.',
    explanation: 'Aankomen → komt … aan.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['aan']
  },
    {
    id: 'a1-04-ex-08',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l2',
    type: 'translation-en-nl',
    prompt: 'I get up at seven.',
    explanation: 'Separable opstaan.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Ik sta om zeven uur op.', 'Ik sta om 7 uur op.']
  },
    {
    id: 'a1-04-ex-09',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Prefix at end.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik sta om zes uur op.'],
    orderItems: ['op', 'sta', 'Ik', 'om', 'zes', 'uur', '.']
  },
    {
    id: 'a1-04-ex-10',
    moduleId: 'a1-04',
    lessonId: 'a1-04-l2',
    type: 'dialogue',
    prompt: 'Say you work in the morning.',
    explanation: 'Time expression + verb.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['’s Ochtends werk ik.', '\'s Ochtends werk ik.', 'Ik werk ’s ochtends.']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a1-04-ex-11',
    moduleId: 'a1-04',
    type: 'multiple-choice',
    prompt: 'Slapen means…',
    explanation: 'Slapen = sleep.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['to sleep', 'to eat', 'to run', 'to cook'],
    acceptedAnswers: ['to sleep']
  },
    {
    id: 'a1-04-ex-12',
    moduleId: 'a1-04',
    type: 'error-correction',
    prompt: 'Fix: Ik opsta om zeven uur.',
    explanation: 'Split the verb.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik sta om zeven uur op.']
  },
    {
    id: 'a1-04-ex-13',
    moduleId: 'a1-04',
    type: 'reading-comp',
    prompt: 'When does Eva start work?',
    explanation: 'Begins at nine.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Eva staat om half acht op. Zij begint om negen uur met werken.',
    options: ['negen uur', 'half acht', 'acht uur', 'zes uur'],
    acceptedAnswers: ['negen uur']
  },
    {
    id: 'a1-04-ex-14',
    moduleId: 'a1-04',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Evening routine.',
    skill: 'listening',
    difficulty: 2,
    audioText: '’s Avonds lees ik',
    acceptedAnswers: ['’s Avonds lees ik', '\'s Avonds lees ik']
  },
    {
    id: 'a1-04-ex-15',
    moduleId: 'a1-04',
    type: 'guided-writing',
    prompt: 'Write your weekday morning routine (3 sentences).',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Ik sta om zeven uur op. Ik drink koffie. Daarna ga ik naar mijn werk.',
    checklist: ['Uses time', 'Uses at least one routine verb']
  }
];

export const moduleA104 = createModule(
  {
    id: 'a1-04',
    level: 'a1',
    title: 'Daily routine',
    titleNl: 'Dagelijks ritme',
    topic: 'routine',
    grammarFocus: ['Present tense regular verbs', 'Separable verbs opstaan/aankomen', 'Word order time expressions'],
    vocabularyFocus: ['daily verbs', 'times of day'],
    skills: ['grammar', 'speaking', 'listening'],
    description: 'Describe a simple daily routine.',
    order: 8,
  },
  [
    {
      id: 'a1-04-l1',
      title: 'A day in verbs',
      objective: 'Learn core language for routine.',
      steps: [
      {
        type: 'explanation',
        title: 'A day in verbs',
        body: 'Regular present: ik werk, jij werkt, hij werkt, wij werken. Place time early: ’s ochtends werk ik.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Ik werk van negen tot vijf.', en: 'I work from nine to five.' },
          { nl: '’s Avonds lees ik een boek.', en: 'In the evening I read a book.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a1-111', 'vocab-a1-112', 'vocab-a1-113', 'vocab-a1-114', 'vocab-a1-115', 'vocab-a1-116'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-04-ex-01', 'a1-04-ex-02', 'a1-04-ex-03', 'a1-04-ex-04', 'a1-04-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Regular present: ik werk, jij werkt, hij werkt, wij werken. Place time early: ’s…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a1-04-l2',
      title: 'Separable verbs',
      objective: 'Practise routine in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'Separable verbs',
        body: 'Separable verbs split in main clauses: Ik sta om zeven uur op. Prefix goes to the end.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Ik sta vroeg op.', en: 'I get up early.' },
          { nl: 'De trein komt om acht uur aan.', en: 'The train arrives at eight.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a1-117', 'vocab-a1-118', 'vocab-a1-119', 'vocab-a1-120', 'vocab-a1-121', 'vocab-a1-122'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-04-ex-06', 'a1-04-ex-07', 'a1-04-ex-08', 'a1-04-ex-09', 'a1-04-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Separable verbs split in main clauses: Ik sta om zeven uur op. Prefix goes to th…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA104Exercises = lessonExercises;
