import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a2-04-ex-01',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l1',
    type: 'multiple-choice',
    prompt: 'Huur means…',
    explanation: 'Huur = rent.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['rent', 'buyer', 'garden', 'neighbour'],
    acceptedAnswers: ['rent']
  },
    {
    id: 'a2-04-ex-02',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l1',
    type: 'fill-blank',
    prompt: 'Ik zoek een _____.',
    explanation: 'Looking for housing.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['woning', 'kamer', 'appartement']
  },
    {
    id: 'a2-04-ex-03',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l1',
    type: 'translation-nl-en',
    prompt: 'huisarts',
    explanation: 'Doctor.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['GP', 'family doctor', 'general practitioner']
  },
    {
    id: 'a2-04-ex-04',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l1',
    type: 'listening',
    prompt: 'Symptom?',
    explanation: 'Fever.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik heb koorts',
    options: ['koorts', 'hoest', 'pijn', 'allergie'],
    acceptedAnswers: ['koorts']
  },
    {
    id: 'a2-04-ex-05',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['apotheek=pharmacy', 'recept=prescription', 'bezichtigen=to view (a home)'],
    pairs: [{ left: 'apotheek', right: 'pharmacy' }, { left: 'recept', right: 'prescription' }, { left: 'bezichtigen', right: 'to view (a home)' }]
  },
    {
    id: 'a2-04-ex-06',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l2',
    type: 'multiple-choice',
    prompt: 'Ik heb last van mijn keel. Last van means…',
    explanation: 'Complaint pattern.',
    skill: 'grammar',
    difficulty: 2,
    options: ['suffer from / bothered by', 'like', 'ignore', 'heal'],
    acceptedAnswers: ['suffer from / bothered by']
  },
    {
    id: 'a2-04-ex-07',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l2',
    type: 'fill-blank',
    prompt: 'Mag ik een _____ maken?',
    explanation: 'Make an appointment.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['afspraak']
  },
    {
    id: 'a2-04-ex-08',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l2',
    type: 'translation-en-nl',
    prompt: 'The rent is too high',
    explanation: 'Housing complaint.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['De huur is te hoog']
  },
    {
    id: 'a2-04-ex-09',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Reflexive-like voelen.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik voel me ziek.'],
    orderItems: ['me', 'voel', 'Ik', 'ziek', '.']
  },
    {
    id: 'a2-04-ex-10',
    moduleId: 'a2-04',
    lessonId: 'a2-04-l2',
    type: 'dialogue',
    prompt: 'Ask for a viewing.',
    explanation: 'Viewing request.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Wanneer kan ik bezichtigen?', 'Kan ik de woning bezichtigen?']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a2-04-ex-11',
    moduleId: 'a2-04',
    type: 'multiple-choice',
    prompt: 'Apotheek is…',
    explanation: 'Pharmacy.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['pharmacy', 'hospital ward', 'dentist', 'ambulance'],
    acceptedAnswers: ['pharmacy']
  },
    {
    id: 'a2-04-ex-12',
    moduleId: 'a2-04',
    type: 'error-correction',
    prompt: 'Fix: Ik heb pijn mijn rug.',
    explanation: 'Aan / last van.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik heb pijn aan mijn rug.', 'Ik heb last van mijn rug.']
  },
    {
    id: 'a2-04-ex-13',
    moduleId: 'a2-04',
    type: 'reading-comp',
    prompt: 'What does Mira need?',
    explanation: 'Prescription.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Mira gaat naar de huisarts. Zij krijgt een recept voor de apotheek.',
    options: ['recept', 'huur', 'fiets', 'ticket'],
    acceptedAnswers: ['recept']
  },
    {
    id: 'a2-04-ex-14',
    moduleId: 'a2-04',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Housing search.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Ik zoek een kamer',
    acceptedAnswers: ['Ik zoek een kamer']
  },
    {
    id: 'a2-04-ex-15',
    moduleId: 'a2-04',
    type: 'guided-writing',
    prompt: 'Describe a housing problem OR a health symptom in 3 sentences.',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Ik huur een kamer in de stad. De verwarming doet het niet. Ik heb de verhuurder al gebeld.',
    checklist: ['Clear situation', 'Uses A2 vocabulary']
  }
];

export const moduleA204 = createModule(
  {
    id: 'a2-04',
    level: 'a2',
    title: 'Housing and health',
    titleNl: 'Wonen en gezondheid',
    topic: 'housing-health',
    grammarFocus: ['Moeten/mogen', 'Body part possessives', 'Comparatives for housing'],
    vocabularyFocus: ['renting', 'symptoms', 'pharmacy'],
    skills: ['vocabulary', 'speaking', 'listening'],
    description: 'Handle housing issues and doctor visits.',
    order: 16,
  },
  [
    {
      id: 'a2-04-l1',
      title: 'Finding a place',
      objective: 'Learn core language for housing-health.',
      steps: [
      {
        type: 'explanation',
        title: 'Finding a place',
        body: 'Housing: huur, kamer, contract, verhuurder, buren. Ik zoek een woning. De huur is te hoog.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'De woning is gemeubileerd.', en: 'The flat is furnished.' },
          { nl: 'Wanneer kan ik bezichtigen?', en: 'When can I view it?' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a2-201', 'vocab-a2-202', 'vocab-a2-203', 'vocab-a2-204', 'vocab-a2-205', 'vocab-a2-206'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-04-ex-01', 'a2-04-ex-02', 'a2-04-ex-03', 'a2-04-ex-04', 'a2-04-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Housing: huur, kamer, contract, verhuurder, buren. Ik zoek een woning. De huur i…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a2-04-l2',
      title: 'At the doctor',
      objective: 'Practise housing-health in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'At the doctor',
        body: 'Health: Ik heb last van… / Ik voel me… Pharmacy apotheek; prescription recept. Maak een afspraak bij de huisarts.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Ik heb koorts sinds gisteren.', en: 'I have had a fever since yesterday.' },
          { nl: 'Moet ik antibiotica slikken?', en: 'Do I need to take antibiotics?' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a2-207', 'vocab-a2-208', 'vocab-a2-209', 'vocab-a2-210', 'vocab-a2-211', 'vocab-a2-212'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-04-ex-06', 'a2-04-ex-07', 'a2-04-ex-08', 'a2-04-ex-09', 'a2-04-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Health: Ik heb last van… / Ik voel me… Pharmacy apotheek; prescription recept. M…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA204Exercises = lessonExercises;
