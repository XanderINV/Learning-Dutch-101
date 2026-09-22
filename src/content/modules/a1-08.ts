import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a1-08-ex-01',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l1',
    type: 'multiple-choice',
    prompt: 'Vrije tijd means…',
    explanation: 'Leisure time.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['free time', 'full-time job', 'overtime', 'holiday only'],
    acceptedAnswers: ['free time']
  },
    {
    id: 'a1-08-ex-02',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l1',
    type: 'fill-blank',
    prompt: 'Ik _____ zwemmen.',
    explanation: 'Modal + infinitive.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['kan', 'wil']
  },
    {
    id: 'a1-08-ex-03',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l1',
    type: 'translation-nl-en',
    prompt: 'het regent',
    explanation: 'Weather phrase.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['it is raining', 'it\'s raining', 'it rains']
  },
    {
    id: 'a1-08-ex-04',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l1',
    type: 'listening',
    prompt: 'Complaint?',
    explanation: 'Headache.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik heb hoofdpijn',
    options: ['hoofdpijn', 'koorts', 'hoest', 'verkoudheid'],
    acceptedAnswers: ['hoofdpijn']
  },
    {
    id: 'a1-08-ex-05',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['werken=to work', 'studeren=to study', 'wandelen=to walk'],
    pairs: [{ left: 'werken', right: 'to work' }, { left: 'studeren', right: 'to study' }, { left: 'wandelen', right: 'to walk' }]
  },
    {
    id: 'a1-08-ex-06',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l2',
    type: 'multiple-choice',
    prompt: 'Ik moet naar de huisarts. Moeten expresses…',
    explanation: 'Moeten = must/have to.',
    skill: 'grammar',
    difficulty: 2,
    options: ['necessity', 'ability', 'desire only', 'past tense'],
    acceptedAnswers: ['necessity']
  },
    {
    id: 'a1-08-ex-07',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l2',
    type: 'fill-blank',
    prompt: 'Het is vandaag erg _____.',
    explanation: 'Weather adjective.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['koud', 'warm', 'heet']
  },
    {
    id: 'a1-08-ex-08',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l2',
    type: 'translation-en-nl',
    prompt: 'I feel sick',
    explanation: 'Health statement.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Ik voel me ziek', 'Ik ben ziek']
  },
    {
    id: 'a1-08-ex-09',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Job pattern.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik werk als docent.'],
    orderItems: ['als', 'werk', 'Ik', 'docent', '.']
  },
    {
    id: 'a1-08-ex-10',
    moduleId: 'a1-08',
    lessonId: 'a1-08-l2',
    type: 'dialogue',
    prompt: 'Say you want to rest.',
    explanation: 'Modal + infinitive.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Ik wil rusten.', 'Ik moet rusten']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a1-08-ex-11',
    moduleId: 'a1-08',
    type: 'multiple-choice',
    prompt: 'Huisarts is…',
    explanation: 'General practitioner.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['GP / family doctor', 'dentist', 'pharmacist', 'surgeon only'],
    acceptedAnswers: ['GP / family doctor']
  },
    {
    id: 'a1-08-ex-12',
    moduleId: 'a1-08',
    type: 'error-correction',
    prompt: 'Fix: Ik kan te zwemmen.',
    explanation: 'No te after modal + infinitive.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik kan zwemmen.']
  },
    {
    id: 'a1-08-ex-13',
    moduleId: 'a1-08',
    type: 'reading-comp',
    prompt: 'Why stay inside?',
    explanation: 'Heavy rain.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Tom wil wandelen, maar het regent hard. Daarom blijft hij thuis.',
    options: ['regen', 'werk', 'ziekte', 'feest'],
    acceptedAnswers: ['regen']
  },
    {
    id: 'a1-08-ex-14',
    moduleId: 'a1-08',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Modal sentence.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik moet sporten',
    acceptedAnswers: ['Ik moet sporten']
  },
    {
    id: 'a1-08-ex-15',
    moduleId: 'a1-08',
    type: 'guided-writing',
    prompt: 'Write about your job/studies, a hobby, and today’s weather.',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Ik studeer economie. In mijn vrije tijd lees ik. Vandaag schijnt de zon.',
    checklist: ['Work/study', 'Hobby', 'Weather']
  }
];

export const moduleA108 = createModule(
  {
    id: 'a1-08',
    level: 'a1',
    title: 'Work, free time, weather and health',
    titleNl: 'Werk, vrije tijd, weer en gezondheid',
    topic: 'everyday',
    grammarFocus: ['Modal verbs kunnen/willen/moeten', 'Basic adjectives', 'Questions'],
    vocabularyFocus: ['jobs', 'hobbies', 'weather', 'body/health'],
    skills: ['speaking', 'vocabulary', 'grammar', 'listening'],
    description: 'Talk about work, hobbies, weather, and simple health needs.',
    order: 12,
  },
  [
    {
      id: 'a1-08-l1',
      title: 'Work and hobbies',
      objective: 'Learn core language for everyday.',
      steps: [
      {
        type: 'explanation',
        title: 'Work and hobbies',
        body: 'Say Ik werk als… / Ik studeer… Hobbies: sporten, lezen, muziek luisteren, wandelen. Modals: ik kan, ik wil, ik moet.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Ik werk als verpleegkundige.', en: 'I work as a nurse.' },
          { nl: 'In mijn vrije tijd sport ik.', en: 'In my free time I exercise.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a1-159', 'vocab-a1-160', 'vocab-a1-161', 'vocab-a1-162', 'vocab-a1-163', 'vocab-a1-164'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-08-ex-01', 'a1-08-ex-02', 'a1-08-ex-03', 'a1-08-ex-04', 'a1-08-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Say Ik werk als… / Ik studeer… Hobbies: sporten, lezen, muziek luisteren, wandel…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a1-08-l2',
      title: 'Weather and feeling unwell',
      objective: 'Practise everyday in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'Weather and feeling unwell',
        body: 'Weather: het regent, de zon schijnt, het is koud/warm. Health: Ik voel me ziek. Ik heb pijn aan mijn…',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Het regent vandaag.', en: 'It is raining today.' },
          { nl: 'Ik heb hoofdpijn.', en: 'I have a headache.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a1-165', 'vocab-a1-166', 'vocab-a1-167', 'vocab-a1-168', 'vocab-a1-169', 'vocab-a1-170'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-08-ex-06', 'a1-08-ex-07', 'a1-08-ex-08', 'a1-08-ex-09', 'a1-08-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Weather: het regent, de zon schijnt, het is koud/warm. Health: Ik voel me ziek. …', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA108Exercises = lessonExercises;
