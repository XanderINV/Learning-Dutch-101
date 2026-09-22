import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a1-06-ex-01',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l1',
    type: 'multiple-choice',
    prompt: 'Wat _____ dit?',
    explanation: 'Wat kost dit?',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['kost', 'kostten', 'prijs', 'euro'],
    acceptedAnswers: ['kost']
  },
    {
    id: 'a1-06-ex-02',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l1',
    type: 'fill-blank',
    prompt: 'Heeft u dit in een andere _____?',
    explanation: 'Maat = size.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['maat', 'kleur']
  },
    {
    id: 'a1-06-ex-03',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l1',
    type: 'translation-nl-en',
    prompt: 'duur',
    explanation: 'Duur = expensive.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['expensive']
  },
    {
    id: 'a1-06-ex-04',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l1',
    type: 'listening',
    prompt: 'Price?',
    explanation: 'Ten euros.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Dat is tien euro',
    options: ['tien euro', 'twee euro', 'twaalf euro', 'dertig euro'],
    acceptedAnswers: ['tien euro']
  },
    {
    id: 'a1-06-ex-05',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['kassa=checkout', 'korting=discount', 'bon=receipt'],
    pairs: [{ left: 'kassa', right: 'checkout' }, { left: 'korting', right: 'discount' }, { left: 'bon', right: 'receipt' }]
  },
    {
    id: 'a1-06-ex-06',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l2',
    type: 'multiple-choice',
    prompt: 'Pinpas is used to…',
    explanation: 'Card payment.',
    skill: 'grammar',
    difficulty: 2,
    options: ['pay by card', 'measure size', 'open a shop', 'ask for a bag'],
    acceptedAnswers: ['pay by card']
  },
    {
    id: 'a1-06-ex-07',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l2',
    type: 'fill-blank',
    prompt: 'Mag ik dit _____?',
    explanation: 'Passen = try on.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['passen']
  },
    {
    id: 'a1-06-ex-08',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l2',
    type: 'translation-en-nl',
    prompt: 'How much does this cost?',
    explanation: 'Price question.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Wat kost dit?', 'Hoeveel kost dit?']
  },
    {
    id: 'a1-06-ex-09',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Question with kost.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Wat kost deze tas?'],
    orderItems: ['deze', 'kost', 'Wat', 'tas', '?']
  },
    {
    id: 'a1-06-ex-10',
    moduleId: 'a1-06',
    lessonId: 'a1-06-l2',
    type: 'dialogue',
    prompt: 'Ask if you can pay by card.',
    explanation: 'Pinnen = pay by debit.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Kan ik pinnen?', 'Kan ik met de pinpas betalen?', 'Mag ik pinnen?']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a1-06-ex-11',
    moduleId: 'a1-06',
    type: 'multiple-choice',
    prompt: 'Korting means…',
    explanation: 'Korting = discount.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['discount', 'receipt', 'basket', 'queue'],
    acceptedAnswers: ['discount']
  },
    {
    id: 'a1-06-ex-12',
    moduleId: 'a1-06',
    type: 'error-correction',
    prompt: 'Fix: Wat kosten deze jas?',
    explanation: 'Singular kost.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Wat kost deze jas?']
  },
    {
    id: 'a1-06-ex-13',
    moduleId: 'a1-06',
    type: 'reading-comp',
    prompt: 'Is it cheap?',
    explanation: 'Called duur.',
    skill: 'reading',
    difficulty: 2,
    passage: 'De schoenen kosten tachtig euro. Dat is duur voor mij.',
    options: ['Nee, duur', 'Ja, goedkoop', 'Gratis', 'Onbekend'],
    acceptedAnswers: ['Nee, duur']
  },
    {
    id: 'a1-06-ex-14',
    moduleId: 'a1-06',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'Card payment question.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Kan ik pinnen',
    acceptedAnswers: ['Kan ik pinnen?', 'Kan ik pinnen']
  },
    {
    id: 'a1-06-ex-15',
    moduleId: 'a1-06',
    type: 'guided-writing',
    prompt: 'Write a short shop dialogue (customer lines).',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Pardon, wat kost deze trui? Mag ik die passen? Dank u wel.',
    checklist: ['Asks price or size', 'Uses polite word']
  }
];

export const moduleA106 = createModule(
  {
    id: 'a1-06',
    level: 'a1',
    title: 'Shopping and prices',
    titleNl: 'Winkelen en prijzen',
    topic: 'shopping',
    grammarFocus: ['Numbers with euro', 'Deze/die', 'Modal kunnen/willen'],
    vocabularyFocus: ['shop phrases', 'prices', 'sizes'],
    skills: ['listening', 'speaking', 'vocabulary'],
    description: 'Ask prices and buy everyday items.',
    order: 10,
  },
  [
    {
      id: 'a1-06-l1',
      title: 'In the shop',
      objective: 'Learn core language for shopping.',
      steps: [
      {
        type: 'explanation',
        title: 'In the shop',
        body: 'Useful questions: Heeft u…? Wat kost dit? Mag ik dit passen? Numbers with euro: Dat is vijf euro vijftig.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Wat kost deze jas?', en: 'How much is this coat?' },
          { nl: 'Die is te duur.', en: 'That one is too expensive.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a1-135', 'vocab-a1-136', 'vocab-a1-137', 'vocab-a1-138', 'vocab-a1-139', 'vocab-a1-140'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-06-ex-01', 'a1-06-ex-02', 'a1-06-ex-03', 'a1-06-ex-04', 'a1-06-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Useful questions: Heeft u…? Wat kost dit? Mag ik dit passen? Numbers with euro: …', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a1-06-l2',
      title: 'Paying',
      objective: 'Practise shopping in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'Paying',
        body: 'Cash contant, card pinpas/kaart. Kunt u dat inpakken? for wrapping.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Kan ik pinnen?', en: 'Can I pay by card?' },
          { nl: 'Alstublieft, vijf euro.', en: 'Here you are, five euros.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a1-141', 'vocab-a1-142', 'vocab-a1-143', 'vocab-a1-144', 'vocab-a1-145', 'vocab-a1-146'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-06-ex-06', 'a1-06-ex-07', 'a1-06-ex-08', 'a1-06-ex-09', 'a1-06-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Cash contant, card pinpas/kaart. Kunt u dat inpakken? for wrapping.…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA106Exercises = lessonExercises;
