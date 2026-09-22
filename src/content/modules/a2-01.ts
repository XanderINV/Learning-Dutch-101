import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
    {
    id: 'a2-01-ex-01',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l1',
    type: 'multiple-choice',
    prompt: 'Afspraak means…',
    explanation: 'Afspraak = appointment/arrangement.',
    skill: 'vocabulary',
    difficulty: 1,
    options: ['appointment', 'airport', 'discount', 'argument'],
    acceptedAnswers: ['appointment']
  },
    {
    id: 'a2-01-ex-02',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l1',
    type: 'fill-blank',
    prompt: 'Zullen we morgen _____?',
    explanation: 'Suggestion with zullen.',
    skill: 'grammar',
    difficulty: 1,
    acceptedAnswers: ['afspreken', 'lunchen', 'bellen']
  },
    {
    id: 'a2-01-ex-03',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l1',
    type: 'translation-nl-en',
    prompt: 'Tot dan!',
    explanation: 'Closing a plan.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['See you then!', 'Until then!']
  },
    {
    id: 'a2-01-ex-04',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l1',
    type: 'listening',
    prompt: 'What is proposed?',
    explanation: 'Tuesday meeting.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Kunnen we dinsdag afspreken',
    options: ['dinsdag', 'donderdag', 'zaterdag', 'maandag'],
    acceptedAnswers: ['dinsdag']
  },
    {
    id: 'a2-01-ex-05',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l1',
    type: 'matching',
    prompt: 'Match the pairs',
    explanation: 'Build recognition speed.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['verzetten=to reschedule', 'afzeggen=to cancel', 'beschikbaar=available'],
    pairs: [{ left: 'verzetten', right: 'to reschedule' }, { left: 'afzeggen', right: 'to cancel' }, { left: 'beschikbaar', right: 'available' }]
  },
    {
    id: 'a2-01-ex-06',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l2',
    type: 'multiple-choice',
    prompt: 'Ik ga volgende week verhuizen uses ga for…',
    explanation: 'gaan + infinitive.',
    skill: 'grammar',
    difficulty: 2,
    options: ['near future plan', 'passive voice', 'past perfect', 'imperative'],
    acceptedAnswers: ['near future plan']
  },
    {
    id: 'a2-01-ex-07',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l2',
    type: 'fill-blank',
    prompt: 'Sorry, ik moet _____.',
    explanation: 'Cancel.',
    skill: 'vocabulary',
    difficulty: 1,
    acceptedAnswers: ['afzeggen']
  },
    {
    id: 'a2-01-ex-08',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l2',
    type: 'translation-en-nl',
    prompt: 'Does Thursday work for you?',
    explanation: 'Availability check.',
    skill: 'vocabulary',
    difficulty: 2,
    acceptedAnswers: ['Past donderdag?', 'Komt donderdag uit?', 'Heb je donderdag tijd?']
  },
    {
    id: 'a2-01-ex-09',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l2',
    type: 'sentence-order',
    prompt: 'Order',
    explanation: 'Zullen we + infinitive.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Zullen we koffie drinken?'],
    orderItems: ['we', 'Zullen', 'koffie', 'drinken', '?']
  },
    {
    id: 'a2-01-ex-10',
    moduleId: 'a2-01',
    lessonId: 'a2-01-l2',
    type: 'dialogue',
    prompt: 'Suggest meeting tomorrow afternoon.',
    explanation: 'Polite suggestion.',
    skill: 'speaking',
    difficulty: 2,
    acceptedAnswers: ['Zullen we morgenmiddag afspreken?', 'Kunnen we morgenmiddag afspreken?']
  }
];

const checkpoint: Exercise[] = [
    {
    id: 'a2-01-ex-11',
    moduleId: 'a2-01',
    type: 'multiple-choice',
    prompt: 'Verzetten means…',
    explanation: 'Move an appointment.',
    skill: 'vocabulary',
    difficulty: 2,
    options: ['reschedule', 'sit down', 'travel', 'pay'],
    acceptedAnswers: ['reschedule']
  },
    {
    id: 'a2-01-ex-12',
    moduleId: 'a2-01',
    type: 'error-correction',
    prompt: 'Fix: Zullen wij gaan te lunchen?',
    explanation: 'No te after gaan/zullen + infinitive.',
    skill: 'grammar',
    difficulty: 2,
    acceptedAnswers: ['Zullen we gaan lunchen?', 'Zullen we lunchen?']
  },
    {
    id: 'a2-01-ex-13',
    moduleId: 'a2-01',
    type: 'reading-comp',
    prompt: 'Why cancel?',
    explanation: 'She is ill.',
    skill: 'reading',
    difficulty: 2,
    passage: 'Lotte belt: ze is ziek en moet de afspraak afzeggen. Ze wil een nieuwe datum.',
    options: ['ziek', 'druk alleen', 'verhuisd', 'op vakantie'],
    acceptedAnswers: ['ziek']
  },
    {
    id: 'a2-01-ex-14',
    moduleId: 'a2-01',
    type: 'dictation',
    prompt: 'Write what you hear.',
    explanation: 'See you Thursday.',
    skill: 'listening',
    difficulty: 2,
    audioText: 'Tot donderdag',
    acceptedAnswers: ['Tot donderdag']
  },
    {
    id: 'a2-01-ex-15',
    moduleId: 'a2-01',
    type: 'guided-writing',
    prompt: 'Write a short message to reschedule a coffee.',
    explanation: 'Self-assess.',
    skill: 'writing',
    difficulty: 2,
    modelAnswer: 'Hoi Sam, ik kan vrijdag toch niet. Kunnen we het naar maandag verzetten?',
    checklist: ['Mentions problem or change', 'Suggests new time']
  }
];

export const moduleA201 = createModule(
  {
    id: 'a2-01',
    level: 'a2',
    title: 'Plans and appointments',
    titleNl: 'Plannen en afspraken',
    topic: 'plans',
    grammarFocus: ['Going to / zullen', 'Time clauses with als/wanneer', 'Kunnen we…?'],
    vocabularyFocus: ['calendar', 'appointments', 'suggestions'],
    skills: ['grammar', 'speaking', 'listening', 'writing'],
    description: 'Make plans and arrange to meet.',
    order: 13,
  },
  [
    {
      id: 'a2-01-l1',
      title: 'Core patterns',
      objective: 'Learn core language for plans.',
      steps: [
      {
        type: 'explanation',
        title: 'Core patterns',
        body: 'Use Zal ik…? / Kunnen we…? / Heb je tijd op…? Future-ish: Ik ga morgen sporten; We zullen zien.',
      },
      {
        type: 'examples',
        title: 'In context',
        items: [
          { nl: 'Zullen we vrijdag afspreken?', en: 'Shall we meet on Friday?' },
          { nl: 'Ik heb om drie uur een afspraak.', en: 'I have an appointment at three.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'Key words',
        vocabularyIds: ['vocab-a2-201', 'vocab-a2-202', 'vocab-a2-203', 'vocab-a2-204', 'vocab-a2-205', 'vocab-a2-206'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-01-ex-01', 'a2-01-ex-02', 'a2-01-ex-03', 'a2-01-ex-04', 'a2-01-ex-05'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Use Zal ik…? / Kunnen we…? / Heb je tijd op…? Future-ish: Ik ga morgen sporten; …', 'Practise with short examples daily.'],
      }
      ],
    },
    {
      id: 'a2-01-l2',
      title: 'More practice',
      objective: 'Practise plans in short exchanges.',
      steps: [
      {
        type: 'explanation',
        title: 'More practice',
        body: 'Confirm with Prima, tot dan! Cancel politely: Ik kan toch niet. Sorry, ik moet afzeggen.',
      },
      {
        type: 'examples',
        title: 'More examples',
        items: [
          { nl: 'Past het dinsdagochtend?', en: 'Does Tuesday morning work?' },
          { nl: 'Laten we het verzetten.', en: 'Let’s reschedule.' }
        ],
      },
      {
        type: 'vocabulary',
        title: 'More words',
        vocabularyIds: ['vocab-a2-207', 'vocab-a2-208', 'vocab-a2-209', 'vocab-a2-210', 'vocab-a2-211', 'vocab-a2-212'],
      },
      {
        type: 'exercise',
        exerciseIds: ['a2-01-ex-06', 'a2-01-ex-07', 'a2-01-ex-08', 'a2-01-ex-09', 'a2-01-ex-10'],
      },
      {
        type: 'summary',
        title: 'Quick recap',
        bullets: ['Confirm with Prima, tot dan! Cancel politely: Ik kan toch niet. Sorry, ik moet a…', 'Reuse patterns in your own life.'],
      }
      ],
    }
  ],
  lessonExercises,
  checkpoint,
);

export const moduleA201Exercises = lessonExercises;
