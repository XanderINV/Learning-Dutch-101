import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a1-02-ex-01',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l1',
    type: 'multiple-choice',
    prompt: 'What is "broer"?',
    explanation: 'Broer = brother.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['brother', 'sister', 'uncle', 'cousin'],
    acceptedAnswers: ['brother']
  },
    {
    id: 'a1-02-ex-02',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l1',
    type: 'fill-blank',
    prompt: 'Dit is _____ moeder.',
    explanation: 'Mijn = my.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['mijn']
  },
    {
    id: 'a1-02-ex-03',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l1',
    type: 'translation-nl-en',
    prompt: 'ouders',
    explanation: 'Ouders = parents.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['parents']
  },
    {
    id: 'a1-02-ex-04',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l1',
    type: 'listening',
    prompt: 'Who is mentioned?',
    explanation: 'Zus = sister.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Dit is mijn zus',
    options: ['zus', 'broer', 'vader', 'oom'],
    acceptedAnswers: ['zus']
  },
    {
    id: 'a1-02-ex-05',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['vader=father', 'moeder=mother', 'kind=child'],
    pairs: [{ left: 'vader', right: 'father' }, { left: 'moeder', right: 'mother' }, { left: 'kind', right: 'child' }]
  },
    {
    id: 'a1-02-ex-06',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l2',
    type: 'multiple-choice',
    prompt: 'Choose: _____ huis (het) is groot.',
    explanation: 'Ons + het-noun.',
    skill: 'grammar',
    difficulty: 2,
    options: ['Ons', 'Onze', 'Mijnne', 'Jouwes'],
    acceptedAnswers: ['Ons']
  },
    {
    id: 'a1-02-ex-07',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l2',
    type: 'fill-blank',
    prompt: 'Haar _____ heet Tom.',
    explanation: 'Any fitting family noun; common answer broer.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['broer', 'vader', 'zoon']
  },
    {
    id: 'a1-02-ex-08',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l2',
    type: 'translation-en-nl',
    prompt: 'my sister',
    explanation: 'Mijn zus.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['mijn zus']
  },
    {
    id: 'a1-02-ex-09',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Possessive + noun + verb.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Mijn ouders wonen in Utrecht.'],
    orderItems: ['ouders', 'Mijn', 'in', 'wonen', 'Utrecht', '.']
  },
    {
    id: 'a1-02-ex-10',
    moduleId: 'a1-02',
    lessonId: 'a1-02-l2',
    type: 'dialogue',
    prompt: 'Ask "Do you have brothers or sisters?"',
    explanation: 'Hebben + family.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Heb je broers of zussen?', 'Heb je broers of zussen']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a1-02-ex-11',
    moduleId: 'a1-02',
    type: 'multiple-choice',
    prompt: '"Zus" means…',
    explanation: 'Zus = sister.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['sister', 'brother', 'niece', 'aunt'],
    acceptedAnswers: ['sister']
  },
    {
    id: 'a1-02-ex-12',
    moduleId: 'a1-02',
    type: 'error-correction',
    prompt: 'Fix: Onze huis is oud.',
    explanation: 'Huis is het → ons.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ons huis is oud.']
  },
    {
    id: 'a1-02-ex-13',
    moduleId: 'a1-02',
    type: 'reading-comp',
    prompt: 'How many children?',
    explanation: 'Twee kinderen.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Wij hebben twee kinderen: een zoon en een dochter.',
    options: ['twee', 'een', 'drie', 'geen'],
    acceptedAnswers: ['twee']
  },
    {
    id: 'a1-02-ex-14',
    moduleId: 'a1-02',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Familie sentence.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Dit is mijn familie',
    acceptedAnswers: ['Dit is mijn familie']
  },
    {
    id: 'a1-02-ex-15',
    moduleId: 'a1-02',
    type: 'guided-writing',
    prompt: 'Describe your family in 3 sentences.',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Ik heb één zus. Mijn ouders wonen in Spanje. Wij zijn een klein gezin.',
    checklist: ['Uses family word', 'Uses possessive', 'At least two sentences']
  }
];

export const moduleA102 = createModule(
  {
    id: 'a1-02',
    level: 'a1',
    title: 'Family and relationships',
    titleNl: 'Familie en relaties',
    topic: 'family',
    grammarFocus: ['Possessives mijn/jouw/zijn', 'Plural family nouns'],
    vocabularyFocus: ['family members', 'relationships'],
    skills: ['vocabulary', 'speaking', 'grammar'],
    description: 'Talk about family members and relationships.',
    order: 6,
  },
  [
    {
      id: 'a1-02-l1',
      title: 'Family words',
      objective: 'Learn core language for family.',
      steps: [
      {
        type: 'explanation',
        title: 'Family words',
        body: 'Core family words: moeder, vader, broer, zus, kind, ouders. Use de for most people nouns.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Dit is mijn zus.', en: 'This is my sister.' },
          { nl: 'Zijn ouders wonen in Den Haag.', en: 'His parents live in The Hague.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a1-087', 'vocab-a1-088', 'vocab-a1-089', 'vocab-a1-090', 'vocab-a1-091', 'vocab-a1-092'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-02-ex-01', 'a1-02-ex-02', 'a1-02-ex-03', 'a1-02-ex-04', 'a1-02-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Core family words: moeder, vader, broer, zus, kind, ouders. Use de for most peop…', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a1-02-l2',
      title: 'Possessives',
      objective: 'Practise family in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'Possessives',
        body: 'Possessives: mijn, jouw, zijn, haar, ons/onze, jullie, hun. Ons before het-words; onze before de-words.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Ons huis is klein.', en: 'Our house is small.' },
          { nl: 'Onze kinderen spelen buiten.', en: 'Our children play outside.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a1-093', 'vocab-a1-094', 'vocab-a1-095', 'vocab-a1-096', 'vocab-a1-097', 'vocab-a1-098'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-02-ex-06', 'a1-02-ex-07', 'a1-02-ex-08', 'a1-02-ex-09', 'a1-02-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Possessives: mijn, jouw, zijn, haar, ons/onze, jullie, hun. Ons before het-words…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA102Exercises = lessonExercises;
