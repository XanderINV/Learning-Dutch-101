import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a1-01-ex-01',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l1',
    type: 'multiple-choice',
    prompt: 'Wat is je _____?',
    explanation: 'Asking for a phone number.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['telefoonnummer', 'gracht', 'maandag', 'trein'],
    acceptedAnswers: ['telefoonnummer']
  },
    {
    id: 'a1-01-ex-02',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l1',
    type: 'fill-blank',
    prompt: 'Mijn _____ is Kerkstraat 12.',
    explanation: 'Adres = address.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['adres']
  },
    {
    id: 'a1-01-ex-03',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l1',
    type: 'translation-en-nl',
    prompt: 'What is your email address?',
    explanation: 'E-mailadres is common.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Wat is je e-mailadres?', 'Wat is jouw e-mailadres?']
  },
    {
    id: 'a1-01-ex-04',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l1',
    type: 'listening',
    prompt: 'What is asked?',
    explanation: 'Where do you live?',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Waar woon je?',
    options: ['Waar woon je?', 'Hoe heet je?', 'Hoe laat is het?', 'Wat eet je?'],
    acceptedAnswers: ['Waar woon je?']
  },
    {
    id: 'a1-01-ex-05',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l1',
    type: 'matching',
    prompt: 'Match',
    explanation: 'Personal info set.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['leeftijd=age', 'nationaliteit=nationality', 'getrouwd=married'],
    pairs: [{ left: 'leeftijd', right: 'age' }, { left: 'nationaliteit', right: 'nationality' }, { left: 'getrouwd', right: 'married' }]
  },
    {
    id: 'a1-01-ex-06',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l2',
    type: 'fill-blank',
    prompt: 'Ik _____ student.',
    explanation: 'Ik ben…',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['ben']
  },
    {
    id: 'a1-01-ex-07',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l2',
    type: 'multiple-choice',
    prompt: 'Choose: Hij _____ een auto.',
    explanation: 'Hij/zij/het heeft.',
    skill: 'grammar',
    difficulty: 1,
    options: ['heeft', 'heb', 'hebt', 'zijn'],
    acceptedAnswers: ['heeft']
  },
    {
    id: 'a1-01-ex-08',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l2',
    type: 'error-correction',
    prompt: 'Fix: Jij ben laat.',
    explanation: 'Jij bent, not ben.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Jij bent laat.']
  },
    {
    id: 'a1-01-ex-09',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Subject–verb–place.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Ik woon in Delft.'],
    orderItems: ['woon', 'Ik', 'in', 'Delft', '.']
  },
    {
    id: 'a1-01-ex-10',
    moduleId: 'a1-01',
    lessonId: 'a1-01-l2',
    type: 'guided-writing',
    prompt: 'Write three sentences about your personal details.',
    explanation: 'Self-check against checklist.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Ik heet Sam. Ik ben 30 jaar. Ik woon in Leiden.',
    checklist: ['Name', 'Age or job', 'City']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a1-01-ex-11',
    moduleId: 'a1-01',
    type: 'multiple-choice',
    prompt: 'Formal: Waar woont _____?',
    explanation: 'Formal question uses u.',
    skill: 'grammar',
    difficulty: 1,
    options: ['u', 'je', 'jij', 'ik'],
    acceptedAnswers: ['u']
  },
    {
    id: 'a1-01-ex-12',
    moduleId: 'a1-01',
    type: 'translation-nl-en',
    prompt: 'Ik ben getrouwd.',
    explanation: 'Getrouwd = married.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['I am married', 'I\'m married']
  },
    {
    id: 'a1-01-ex-13',
    moduleId: 'a1-01',
    type: 'reading-comp',
    prompt: 'What is the phone number?',
    explanation: 'Number appears in the text.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Bel me op 06 12345678. Mijn naam is Eva.',
    options: ['06 12345678', 'Eva', 'Bel me', 'naam'],
    acceptedAnswers: ['06 12345678']
  },
    {
    id: 'a1-01-ex-14',
    moduleId: 'a1-01',
    type: 'dictation',
    prompt: 'Write it.',
    explanation: 'Nationaliteit sentence.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Mijn nationaliteit is Nederlands',
    acceptedAnswers: ['Mijn nationaliteit is Nederlands']
  },
    {
    id: 'a1-01-ex-15',
    moduleId: 'a1-01',
    type: 'dialogue',
    prompt: 'Ask someone’s age politely (informal).',
    explanation: 'Hoe oud ben je? is common.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Hoe oud ben je?', 'Wat is je leeftijd?']
  }
];

export const moduleA101 = createModule(
  {
    id: 'a1-01',
    level: 'a1',
    title: 'Personal information',
    titleNl: 'Persoonlijke gegevens',
    topic: 'personal',
    grammarFocus: ['zijn / hebben', 'Personal pronouns', 'Questions with waar/wat/hoe'],
    vocabularyFocus: ['address', 'phone', 'nationality', 'age'],
    skills: ['speaking', 'writing', 'vocabulary', 'grammar'],
    description: 'Give and ask for basic personal details.',
    order: 5,
  },
  [
    {
      id: 'a1-01-l1',
      title: 'Contact details',
      objective: 'Share address, phone, and email.',
      steps: [
      {
        type: 'explanation',
        title: 'Asking for details',
        body: 'Use Wat is je telefoonnummer? and Wat is je e-mailadres? Answer with Mijn nummer is… Keep numbers clear.',
      },
      {
        type: 'examples',
        title: 'Examples',
        items: [
          { nl: 'Waar woon je?', en: 'Where do you live?' },
          { nl: 'Mijn adres is Kerkstraat 12.', en: 'My address is Kerkstraat 12.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Personal words',
        vocabularyIds: ['vocab-a1-081', 'vocab-a1-082', 'vocab-a1-083', 'vocab-a1-084', 'vocab-a1-085'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-01-ex-01', 'a1-01-ex-02', 'a1-01-ex-03', 'a1-01-ex-04', 'a1-01-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Wat is je…? for informal questions.', 'Mijn… is… for answers.'],
      }
      ],
    },
    {
      id: 'a1-01-l2',
      title: 'Pronouns and zijn',
      objective: 'Use ik/jij/hij with ben/bent/is.',
      steps: [
      {
        type: 'explanation',
        title: 'zijn in the present',
        body: 'Zijn (to be) is irregular: ik ben, jij bent, u bent, hij/zij/het is, wij/jullie/zij zijn.',
      },
      {
        type: 'examples',
        title: 'Forms',
        items: [
          { nl: 'Ik ben 28 jaar.', en: 'I am 28 years old.' },
          { nl: 'Zij is getrouwd.', en: 'She is married.' }
        ],
      },
      {
        type: 'exercise',
        exerciseIds: ['a1-01-ex-06', 'a1-01-ex-07', 'a1-01-ex-08', 'a1-01-ex-09', 'a1-01-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Ik ben, jij bent, hij/zij is.', 'Hebben: ik heb, jij hebt, hij heeft.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA101Exercises = lessonExercises;
