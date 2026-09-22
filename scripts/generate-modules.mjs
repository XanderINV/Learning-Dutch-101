/**
 * Generates 24 curriculum modules with lessons, mixed exercises, and checkpoints.
 * Original Netherlands Dutch content for Samen Nederlands.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../src/content/modules');

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function exportName(id) {
  return (
    'module' +
    id
      .split('-')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join('')
  );
}

/** Build a diverse exercise set for a module */
function buildExercises(mid, bank) {
  const exercises = [];
  let n = 1;
  const lid = (lessonIdx) => `${mid}-l${lessonIdx}`;

  const push = (obj) => {
    const id = `${mid}-ex-${String(n).padStart(2, '0')}`;
    n += 1;
    exercises.push({ id, ...obj });
    return id;
  };

  // Lesson 1: 5 exercises
  const l1 = [];
  for (const q of bank.lesson1) {
    l1.push(push({ ...q, moduleId: mid, lessonId: lid(1) }));
  }
  // Lesson 2: 5 exercises
  const l2 = [];
  for (const q of bank.lesson2) {
    l2.push(push({ ...q, moduleId: mid, lessonId: lid(2) }));
  }
  // Lesson 3 (optional): 3 exercises if present
  const l3 = [];
  for (const q of bank.lesson3 || []) {
    l3.push(push({ ...q, moduleId: mid, lessonId: lid(3) }));
  }
  // Checkpoint: at least 5
  const cp = [];
  for (const q of bank.checkpoint) {
    cp.push(push({ ...q, moduleId: mid }));
  }

  return { exercises, l1, l2, l3, cp };
}

function renderExercise(ex) {
  const base = `    {
    id: '${ex.id}',
    moduleId: '${ex.moduleId}',
    ${ex.lessonId ? `lessonId: '${ex.lessonId}',` : ''}
    type: '${ex.type}',
    prompt: '${esc(ex.prompt)}',
    ${ex.promptEn ? `promptEn: '${esc(ex.promptEn)}',` : ''}
    explanation: '${esc(ex.explanation)}',
    skill: '${ex.skill}',
    difficulty: ${ex.difficulty ?? 1},
    ${ex.hint ? `hint: '${esc(ex.hint)}',` : ''}
    ${ex.audioText ? `audioText: '${esc(ex.audioText)}',` : ''}
    ${ex.passage ? `passage: '${esc(ex.passage)}',` : ''}
    ${ex.modelAnswer ? `modelAnswer: '${esc(ex.modelAnswer)}',` : ''}
    ${ex.checklist ? `checklist: [${ex.checklist.map((c) => `'${esc(c)}'`).join(', ')}],` : ''}
    ${ex.options ? `options: [${ex.options.map((o) => `'${esc(o)}'`).join(', ')}],` : ''}
    ${ex.acceptedAnswers ? `acceptedAnswers: [${ex.acceptedAnswers.map((a) => `'${esc(a)}'`).join(', ')}],` : ''}
    ${ex.orderItems ? `orderItems: [${ex.orderItems.map((o) => `'${esc(o)}'`).join(', ')}],` : ''}
    ${ex.pairs ? `pairs: [${ex.pairs.map((p) => `{ left: '${esc(p.left)}', right: '${esc(p.right)}' }`).join(', ')}],` : ''}
  }`;
  return base.replace(/\n\s*\n/g, '\n').replace(/,\n\s*\}/g, '\n  }');
}

function writeModule(spec) {
  const { exercises, l1, l2, l3, cp } = buildExercises(spec.id, spec.bank);
  const lessonExercises = exercises.filter((e) => e.lessonId);
  const checkpoint = exercises.filter((e) => !e.lessonId);

  const lessons = [
    {
      id: `${spec.id}-l1`,
      title: spec.lessons[0].title,
      objective: spec.lessons[0].objective,
      steps: [
        ...spec.lessons[0].steps,
        { type: 'exercise', exerciseIds: l1 },
        {
          type: 'summary',
          title: 'Quick recap',
          bullets: spec.lessons[0].recap,
        },
      ],
    },
    {
      id: `${spec.id}-l2`,
      title: spec.lessons[1].title,
      objective: spec.lessons[1].objective,
      steps: [
        ...spec.lessons[1].steps,
        { type: 'exercise', exerciseIds: l2 },
        {
          type: 'summary',
          title: 'Quick recap',
          bullets: spec.lessons[1].recap,
        },
      ],
    },
  ];

  if (spec.lessons[2]) {
    lessons.push({
      id: `${spec.id}-l3`,
      title: spec.lessons[2].title,
      objective: spec.lessons[2].objective,
      steps: [
        ...spec.lessons[2].steps,
        { type: 'exercise', exerciseIds: l3 },
        {
          type: 'summary',
          title: 'Quick recap',
          bullets: spec.lessons[2].recap,
        },
      ],
    });
  }

  function renderSteps(steps) {
    return steps
      .map((step) => {
        if (step.type === 'explanation') {
          return `      {
        type: 'explanation',
        title: '${esc(step.title)}',
        body: '${esc(step.body)}',
      }`;
        }
        if (step.type === 'examples') {
          const items = step.items
            .map((it) => `          { nl: '${esc(it.nl)}', en: '${esc(it.en)}' }`)
            .join(',\n');
          return `      {
        type: 'examples',
        title: '${esc(step.title)}',
        items: [
${items}
        ],
      }`;
        }
        if (step.type === 'vocabulary') {
          return `      {
        type: 'vocabulary',
        title: '${esc(step.title)}',
        vocabularyIds: [${step.vocabularyIds.map((v) => `'${v}'`).join(', ')}],
      }`;
        }
        if (step.type === 'exercise') {
          return `      {
        type: 'exercise',
        exerciseIds: [${step.exerciseIds.map((id) => `'${id}'`).join(', ')}],
      }`;
        }
        if (step.type === 'summary') {
          return `      {
        type: 'summary',
        title: '${esc(step.title)}',
        bullets: [${step.bullets.map((b) => `'${esc(b)}'`).join(', ')}],
      }`;
        }
        return '';
      })
      .join(',\n');
  }

  const name = exportName(spec.id);
  const content = `import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
${lessonExercises.map(renderExercise).join(',\n')}
];

const checkpoint: Exercise[] = [
${checkpoint.map(renderExercise).join(',\n')}
];

export const ${name} = createModule(
  {
    id: '${spec.id}',
    level: '${spec.level}',
    title: '${esc(spec.title)}',
    titleNl: '${esc(spec.titleNl)}',
    topic: '${esc(spec.topic)}',
    grammarFocus: [${spec.grammarFocus.map((g) => `'${esc(g)}'`).join(', ')}],
    vocabularyFocus: [${spec.vocabularyFocus.map((v) => `'${esc(v)}'`).join(', ')}],
    skills: [${spec.skills.map((s) => `'${s}'`).join(', ')}],
    description: '${esc(spec.description)}',
    order: ${spec.order},
  },
  [
${lessons
  .map(
    (l) => `    {
      id: '${l.id}',
      title: '${esc(l.title)}',
      objective: '${esc(l.objective)}',
      steps: [
${renderSteps(l.steps)}
      ],
    }`,
  )
  .join(',\n')}
  ],
  lessonExercises,
  checkpoint,
);

export const ${name}Exercises = lessonExercises;
`;

  const fname = spec.file;
  fs.writeFileSync(path.join(outDir, fname), content, 'utf8');
  return { id: spec.id, exerciseCount: exercises.length, name, fname };
}

// ---------- Module definitions ----------

function mc(prompt, promptEn, options, answer, explanation, skill, difficulty = 1, hint) {
  return {
    type: 'multiple-choice',
    prompt,
    promptEn,
    options,
    acceptedAnswers: Array.isArray(answer) ? answer : [answer],
    explanation,
    skill,
    difficulty,
    hint,
  };
}

function fill(prompt, promptEn, answers, explanation, skill, difficulty = 1, hint) {
  return {
    type: 'fill-blank',
    prompt,
    promptEn,
    acceptedAnswers: Array.isArray(answers) ? answers : [answers],
    explanation,
    skill,
    difficulty,
    hint,
  };
}

function trNlEn(prompt, answers, explanation, skill = 'vocabulary', difficulty = 2) {
  return {
    type: 'translation-nl-en',
    prompt,
    acceptedAnswers: Array.isArray(answers) ? answers : [answers],
    explanation,
    skill,
    difficulty,
  };
}

function trEnNl(prompt, answers, explanation, skill = 'vocabulary', difficulty = 2) {
  return {
    type: 'translation-en-nl',
    prompt,
    acceptedAnswers: Array.isArray(answers) ? answers : [answers],
    explanation,
    skill,
    difficulty,
  };
}

function order(prompt, items, answer, explanation, skill = 'grammar', difficulty = 2) {
  return {
    type: 'sentence-order',
    prompt,
    orderItems: items,
    acceptedAnswers: [answer],
    explanation,
    skill,
    difficulty,
  };
}

function matching(prompt, pairs, explanation, skill = 'vocabulary') {
  return {
    type: 'matching',
    prompt,
    pairs,
    acceptedAnswers: pairs.map((p) => `${p.left}=${p.right}`),
    explanation,
    skill,
    difficulty: 1,
  };
}

function listening(prompt, audioText, answers, explanation, options) {
  return {
    type: 'listening',
    prompt,
    audioText,
    acceptedAnswers: Array.isArray(answers) ? answers : [answers],
    explanation,
    skill: 'listening',
    difficulty: 2,
    options,
  };
}

function reading(prompt, passage, answers, explanation, options) {
  return {
    type: 'reading-comp',
    prompt,
    passage,
    acceptedAnswers: Array.isArray(answers) ? answers : [answers],
    explanation,
    skill: 'reading',
    difficulty: 2,
    options,
  };
}

function dictation(prompt, audioText, answers, explanation) {
  return {
    type: 'dictation',
    prompt,
    audioText,
    acceptedAnswers: Array.isArray(answers) ? answers : [answers],
    explanation,
    skill: 'listening',
    difficulty: 2,
  };
}

function dialogue(prompt, answers, explanation) {
  return {
    type: 'dialogue',
    prompt,
    acceptedAnswers: Array.isArray(answers) ? answers : [answers],
    explanation,
    skill: 'speaking',
    difficulty: 2,
  };
}

function errorCorr(prompt, answers, explanation) {
  return {
    type: 'error-correction',
    prompt,
    acceptedAnswers: Array.isArray(answers) ? answers : [answers],
    explanation,
    skill: 'grammar',
    difficulty: 2,
  };
}

function guided(prompt, modelAnswer, checklist, explanation) {
  return {
    type: 'guided-writing',
    prompt,
    modelAnswer,
    checklist,
    explanation,
    skill: 'writing',
    difficulty: 2,
  };
}

function pron(prompt, audioText, answers, explanation) {
  return {
    type: 'pronunciation',
    prompt,
    audioText,
    acceptedAnswers: Array.isArray(answers) ? answers : [answers],
    explanation,
    skill: 'pronunciation',
    difficulty: 1,
  };
}

const modules = [];

// ========== PRE-A1 ==========
modules.push({
  file: 'preA1-01.ts',
  id: 'pre-a1-01',
  level: 'pre-a1',
  order: 1,
  title: 'Alphabet and spelling',
  titleNl: 'Alfabet en spelling',
  topic: 'alphabet',
  grammarFocus: ['Letter names', 'Spelling aloud'],
  vocabularyFocus: ['letters', 'names', 'spelling phrases'],
  skills: ['pronunciation', 'listening', 'speaking', 'vocabulary'],
  description: 'Learn the Dutch alphabet and how to spell names clearly.',
  lessons: [
    {
      title: 'The Dutch alphabet',
      objective: 'Recognise and name Dutch letters.',
      recap: ['Dutch uses the Latin alphabet with 26 letters.', 'IJ is often treated as a special digraph in names.'],
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
            { nl: 'De letter G klinkt anders dan in het Engels.', en: 'The letter G sounds different from English.' },
          ],
        },
        {
          type: 'vocabulary',
          title: 'Useful spelling words',
          vocabularyIds: ['vocab-pre-a1-001', 'vocab-pre-a1-002', 'vocab-pre-a1-003', 'vocab-pre-a1-004', 'vocab-pre-a1-005', 'vocab-pre-a1-006'],
        },
      ],
    },
    {
      title: 'Spelling your name',
      objective: 'Spell a first name and surname politely.',
      recap: ['Use "Hoe spel je…?" to ask for spelling.', 'Speak slowly letter by letter.'],
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
            { nl: 'En je achternaam?', en: 'And your surname?' },
          ],
        },
      ],
    },
  ],
  bank: {
    lesson1: [
      mc('Which Dutch phrase means "How do you spell that?"', 'Choose the best option.', ['Hoe spel je dat?', 'Hoe heet je?', 'Waar woon je?', 'Hoe laat is het?'], 'Hoe spel je dat?', 'Hoe spel je dat? asks someone to spell a word.', 'vocabulary'),
      fill('Complete: Het Nederlandse _____ heeft 26 letters.', 'Fill in the blank.', ['alfabet'], 'Alfabet means alphabet.', 'vocabulary'),
      listening('Listen and choose what you hear.', 'A N N A', 'Anna', 'You heard the letters of Anna.', ['Anna', 'Anne', 'Ana', 'Anja']),
      matching('Match Dutch and English', [{ left: 'voornaam', right: 'first name' }, { left: 'achternaam', right: 'surname' }, { left: 'spellen', right: 'to spell' }], 'These are core spelling words.'),
      pron('Practise saying this slowly.', 'Hoe spel je dat?', ['Hoe spel je dat?'], 'Focus on clear consonants.'),
    ],
    lesson2: [
      mc('What is a "hoofdletter"?', 'Choose the meaning.', ['a capital letter', 'a vowel', 'a number', 'a punctuation mark'], 'a capital letter', 'Hoofdletter = capital letter.', 'vocabulary'),
      trEnNl('first name', ['voornaam'], 'Voornaam is first name.'),
      trNlEn('achternaam', ['surname', 'last name', 'family name'], 'Achternaam is surname.'),
      dictation('Write what you hear.', 'Ik heet Sam', ['Ik heet Sam', 'ik heet sam'], 'Ik heet Sam = My name is Sam.'),
      dialogue('Someone asks "Hoe spel je je naam?". You answer with letters for "Lisa". Type your reply starting with the name.', ['Lisa. L-I-S-A.', 'Lisa. L I S A', 'Lisa L-I-S-A'], 'Give the name, then spell it.'),
    ],
    checkpoint: [
      mc('Choose the correct article: ___ alfabet', '', ['het', 'de', 'een', 'die'], 'het', 'Het alfabet — alfabet is a het-word.', 'grammar'),
      fill('_____ je achternaam, alsjeblieft.', '', ['Spell', 'Spel'], 'Spel is the imperative of spellen.', 'grammar', 2),
      errorCorr('Fix: De alfabet is belangrijk.', ['Het alfabet is belangrijk.'], 'Alfabet takes het, not de.'),
      reading('What does Sam spell?', 'Hallo, ik heet Sam. S-A-M.', 'Sam', 'The passage introduces Sam and spells the name.', ['Sam', 'Sara', 'Tom', 'Ana']),
      order('Put the words in order.', ['je', 'Hoe', 'dat', 'spel', '?'], 'Hoe spel je dat?', 'Question word order with spel in second position after Hoe…je.'),
    ],
  },
});

modules.push({
  file: 'preA1-02.ts',
  id: 'pre-a1-02',
  level: 'pre-a1',
  order: 2,
  title: 'Important Dutch sounds',
  titleNl: 'Belangrijke klanken',
  topic: 'pronunciation',
  grammarFocus: ['Sound–spelling links'],
  vocabularyFocus: ['ui', 'ij', 'eu', 'g/ch', 'sch'],
  skills: ['pronunciation', 'listening', 'vocabulary'],
  description: 'Train the sounds that most trip up English speakers: g/ch, ui, ij/ei, eu, and sch.',
  lessons: [
    {
      title: 'The famous g and ch',
      objective: 'Recognise the Dutch g/ch fricative.',
      recap: ['Dutch g is not the English hard g.', 'g and ch often sound very similar in the Netherlands.'],
      steps: [
        {
          type: 'explanation',
          title: 'A scrape, not a stop',
          body: 'In native Dutch words, g is a continuous friction sound at the back of the mouth (like Scottish loch), not the stop in English go. Spelling decides g vs ch; the sound is often nearly the same in everyday Netherlandic Dutch.',
        },
        {
          type: 'examples',
          title: 'Hear it in words',
          items: [
            { nl: 'goed', en: 'good' },
            { nl: 'gracht', en: 'canal' },
            { nl: 'lach', en: 'laugh' },
            { nl: 'school', en: 'school (s + scrape, not English sh)' },
          ],
        },
        {
          type: 'vocabulary',
          title: 'Sound focus words',
          vocabularyIds: ['vocab-pre-a1-009', 'vocab-pre-a1-010', 'vocab-pre-a1-011', 'vocab-pre-a1-012', 'vocab-pre-a1-013'],
        },
      ],
    },
    {
      title: 'Diphthongs ui, ij/ei, eu',
      objective: 'Tell ui, ij/ei, and eu apart.',
      recap: ['ij and ei usually sound the same.', 'ui is a rounded diphthong; eu is front and rounded.'],
      steps: [
        {
          type: 'explanation',
          title: 'Three learner hurdles',
          body: 'UI (huis), IJ/EI (wijn/trein), and EU (neus) do not map neatly onto English. Practise minimal pairs and listen carefully before speaking.',
        },
        {
          type: 'examples',
          title: 'Minimal pairs',
          items: [
            { nl: 'huis — muis', en: 'house — mouse' },
            { nl: 'wijn — trein', en: 'wine — train' },
            { nl: 'neus — leuk', en: 'nose — nice/fun' },
          ],
        },
      ],
    },
  ],
  bank: {
    lesson1: [
      mc('Dutch g in "goed" is closest to…', '', ['the ch in Scottish loch', 'English g in go', 'English j in jump', 'silent g'], 'the ch in Scottish loch', 'It is a fricative scrape, not an English stop g.', 'pronunciation'),
      listening('Which word do you hear?', 'gracht', 'gracht', 'Gracht begins with the Dutch g.', ['gracht', 'kracht', 'nacht', 'zacht']),
      fill('School begins with s + the Dutch scrape. The cluster is written ____.', '', ['sch'], 'sch = s + g/ch sound.', 'pronunciation'),
      pron('Say this canal word.', 'gracht', ['gracht'], 'Keep continuous friction on g.'),
      matching('Match sound focus', [{ left: 'ui', right: 'huis / muis' }, { left: 'ij', right: 'wijn' }, { left: 'eu', right: 'neus' }], 'Link spellings to example words.'),
    ],
    lesson2: [
      mc('ei and ij usually…', '', ['sound the same', 'are completely different', 'are silent', 'only appear in English loans'], 'sound the same', 'Historically distinct; today usually merged.', 'pronunciation'),
      trNlEn('huis', ['house'], 'Huis = house.'),
      dictation('Write the word.', 'trein', ['trein'], 'Trein uses ei.'),
      listening('Choose the word with ui.', 'muis', 'muis', 'Muis has the ui diphthong.', ['muis', 'mes', 'meer', 'mooi']),
      errorCorr('Fix the tip: Dutch g sounds like English go.', ['Dutch g does not sound like English go.', 'Dutch g is a fricative, not like English go.'], 'Reject the English stop g comparison as a rule.'),
    ],
    checkpoint: [
      mc('Which word contains ui?', '', ['huis', 'trein', 'neus', 'school'], 'huis', 'Huis has ui.', 'pronunciation'),
      fill('In Netherlandic Dutch, g and ch often sound ____.', '', ['the same', 'similar', 'almost the same'], 'They often collapse to a similar scrape.', 'pronunciation'),
      reading('Which sound is highlighted?', 'Let op de g in "goedemorgen".', 'g', 'The tip focuses on g.', ['g', 'r', 'm', 'o']),
      order('Order the advice.', ['langzaam', 'Spreek', 'alsjeblieft', '.'], 'Spreek alsjeblieft langzaam.', 'Polite request with langzaam.'),
      guided('Write one Dutch word with g that you will practise this week and why.', 'Ik oefen "gracht", omdat de g nieuw voor me is.', ['Includes a Dutch word with g or ch', 'Gives a short reason'], 'Self-assess against the model; no single correct sentence.'),
    ],
  },
});

modules.push({
  file: 'preA1-03.ts',
  id: 'pre-a1-03',
  level: 'pre-a1',
  order: 3,
  title: 'Greetings and introducing yourself',
  titleNl: 'Begroetingen en jezelf voorstellen',
  topic: 'greetings',
  grammarFocus: ['Ik heet…', 'Formal u vs informal je'],
  vocabularyFocus: ['greetings', 'polite phrases', 'introductions'],
  skills: ['speaking', 'listening', 'vocabulary'],
  description: 'Say hello, thank people, and introduce yourself formally and informally.',
  lessons: [
    {
      title: 'Hello, thanks, goodbye',
      objective: 'Use common greetings by time of day.',
      recap: ['Goedemorgen / middag / avond match the time of day.', 'Dank je wel (informal) vs dank u wel (formal).'],
      steps: [
        {
          type: 'explanation',
          title: 'First contact phrases',
          body: 'Start with hallo or hoi among peers. Use goedemorgen before noon, goedemiddag in the afternoon, and goedenavond in the evening. Pair thanks with graag gedaan.',
        },
        {
          type: 'examples',
          title: 'Polite exchanges',
          items: [
            { nl: 'Goedemorgen! Welkom.', en: 'Good morning! Welcome.' },
            { nl: 'Dank je wel. — Graag gedaan.', en: 'Thank you. — You are welcome.' },
            { nl: 'Tot ziens!', en: 'See you!' },
          ],
        },
        {
          type: 'vocabulary',
          title: 'Greeting set',
          vocabularyIds: ['vocab-pre-a1-014', 'vocab-pre-a1-015', 'vocab-pre-a1-018', 'vocab-pre-a1-022', 'vocab-pre-a1-023', 'vocab-pre-a1-024', 'vocab-pre-a1-025'],
        },
      ],
    },
    {
      title: 'Ik heet… / Ik kom uit…',
      objective: 'Introduce your name and country.',
      recap: ['Ik heet… states your name.', 'Use u with strangers in formal settings; je/jij with peers.'],
      steps: [
        {
          type: 'explanation',
          title: 'A tiny introduction script',
          body: 'A simple pattern: Hallo, ik heet [name]. Ik kom uit [country]. Aangenaam! Add Ik woon in [city] when useful.',
        },
        {
          type: 'examples',
          title: 'Model introductions',
          items: [
            { nl: 'Hallo, ik heet Omar. Ik kom uit Spanje.', en: 'Hello, I am Omar. I come from Spain.' },
            { nl: 'Aangenaam, ik woon in Utrecht.', en: 'Nice to meet you, I live in Utrecht.' },
          ],
        },
        {
          type: 'vocabulary',
          title: 'Introduction words',
          vocabularyIds: ['vocab-pre-a1-029', 'vocab-pre-a1-030', 'vocab-pre-a1-038', 'vocab-pre-a1-039', 'vocab-pre-a1-040'],
        },
      ],
    },
  ],
  bank: {
    lesson1: [
      mc('Evening greeting?', '', ['Goedenavond', 'Goedemorgen', 'Goedemiddag', 'Goedenacht'], 'Goedenavond', 'Goedenavond is for the evening.', 'vocabulary'),
      trEnNl('thank you (informal)', ['dank je wel', 'dankjewel', 'dank je'], 'Dank je wel is informal thanks.'),
      listening('What do you hear?', 'Graag gedaan', 'Graag gedaan', 'Response to thanks.', ['Graag gedaan', 'Tot ziens', 'Hallo', 'Pardon']),
      fill('_____ je wel voor je hulp.', '', ['Dank'], 'Dank je wel…', 'vocabulary'),
      dialogue('Reply politely to "Dank u wel".', ['Graag gedaan', 'Graag gedaan!'], 'Graag gedaan = you are welcome.'),
    ],
    lesson2: [
      mc('Choose the formal "you".', '', ['u', 'je', 'jij', 'jullie'], 'u', 'U is formal singular (and sometimes plural).', 'grammar'),
      fill('Ik _____ Maria.', '', ['heet'], 'Ik heet… = I am called…', 'grammar'),
      trNlEn('Ik kom uit Nederland.', ['I come from the Netherlands', 'I come from Netherlands', "I'm from the Netherlands", 'I am from the Netherlands'], 'Komen uit = come from.'),
      order('Order the introduction.', ['heet', 'ik', 'Nina', '.'], 'ik heet Nina.', 'Subject ik, verb heet, name.'),
      guided('Write 2–3 sentences introducing yourself (name, country, city).', 'Hallo, ik heet Alex. Ik kom uit Ierland. Ik woon in Rotterdam.', ['Uses ik heet…', 'Mentions country or city', 'Looks like natural Dutch'], 'Compare with the model; self-check the checklist.'),
    ],
    checkpoint: [
      matching('Match greetings', [{ left: 'Goedemorgen', right: 'Good morning' }, { left: 'Tot ziens', right: 'See you' }, { left: 'Pardon', right: 'Excuse me' }], 'Core politeness set.'),
      errorCorr('Fix: Ik heet is Sam.', ['Ik heet Sam.'], 'No is after heet in this pattern.'),
      listening('Choose the formal thanks.', 'Dank u wel', 'Dank u wel', 'U marks formal register.', ['Dank u wel', 'Dank je wel', 'Doei', 'Hoi']),
      reading('Where does Nina live?', 'Hallo, ik heet Nina. Ik kom uit Italië. Ik woon in Groningen.', 'Groningen', 'Woon in + city.', ['Groningen', 'Italië', 'Amsterdam', 'Nina']),
      mc('Best informal hello among friends?', '', ['Hoi', 'Goedenavond meneer', 'Dank u wel', 'Alstublieft'], 'Hoi', 'Hoi is casual.', 'vocabulary'),
    ],
  },
});

modules.push({
  file: 'preA1-04.ts',
  id: 'pre-a1-04',
  level: 'pre-a1',
  order: 4,
  title: 'Numbers, time, and classroom phrases',
  titleNl: 'Getallen, tijd en klastaal',
  topic: 'numbers-time',
  grammarFocus: ['Telling the time', 'Half = 30 minutes before the hour'],
  vocabularyFocus: ['numbers', 'days', 'months', 'classroom phrases'],
  skills: ['listening', 'vocabulary', 'speaking'],
  description: 'Count, say the date and time, and use survival phrases in class.',
  lessons: [
    {
      title: 'Numbers and days',
      objective: 'Count useful numbers and name the days.',
      recap: ['Learn 0–12 solidly, then tens.', 'Days are not capitalised in Dutch running text.'],
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
            { nl: 'Kun je dat herhalen?', en: 'Can you repeat that?' },
          ],
        },
        {
          type: 'vocabulary',
          title: 'Numbers and days',
          vocabularyIds: ['vocab-pre-a1-041', 'vocab-pre-a1-051', 'vocab-pre-a1-057', 'vocab-pre-a1-063', 'vocab-pre-a1-067', 'vocab-pre-a1-069'],
        },
      ],
    },
    {
      title: 'Clock time and class talk',
      objective: 'Understand half/kwart and ask for slower speech.',
      recap: ['Half acht = 7:30.', 'Use Langzaam, alsjeblieft and Kun je dat herhalen?'],
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
            { nl: 'Wat betekent dat?', en: 'What does that mean?' },
          ],
        },
        {
          type: 'vocabulary',
          title: 'Classroom phrases',
          vocabularyIds: ['vocab-pre-a1-074', 'vocab-pre-a1-077', 'vocab-pre-a1-078', 'vocab-pre-a1-079', 'vocab-pre-a1-080'],
        },
      ],
    },
  ],
  bank: {
    lesson1: [
      mc('What day comes after vrijdag?', '', ['zaterdag', 'donderdag', 'maandag', 'zondag'], 'zaterdag', 'Friday → Saturday.', 'vocabulary'),
      fill('Zeven dagen in een _____.', '', ['week'], 'A week has seven days.', 'vocabulary'),
      trEnNl('Monday', ['maandag'], 'maandag'),
      listening('Which number?', 'twaalf', 'twaalf', 'Twelve.', ['twaalf', 'twee', 'twintig', 'tien']),
      matching('Match', [{ left: 'uur', right: 'hour / o’clock' }, { left: 'minuut', right: 'minute' }, { left: 'vandaag', right: 'today' }], 'Time basics.'),
    ],
    lesson2: [
      mc('Half acht means…', '', ['7:30', '8:30', '8:00', '7:00'], '7:30', 'Halfway toward eight.', 'vocabulary', 2),
      fill('Kwart _____ twee = 2:15.', '', ['over'], 'Kwart over = quarter past.', 'vocabulary'),
      dictation('Write the request.', 'Spreek alsjeblieft langzaam', ['Spreek alsjeblieft langzaam', 'spreek alsjeblieft langzaam'], 'Ask for slow speech.'),
      dialogue('Ask someone to repeat.', ['Kun je dat herhalen?', 'Kunt u dat herhalen?'], 'Herhalen = to repeat.'),
      order('Order the time sentence.', ['is', 'Het', 'drie', 'uur', '.'], 'Het is drie uur.', 'Het is + time.'),
    ],
    checkpoint: [
      mc('Choose the classroom phrase for "I do not understand".', '', ['Ik begrijp het niet', 'Ik heet Sam', 'Tot ziens', 'Hoe laat is het?'], 'Ik begrijp het niet', 'Begrijpen = understand.', 'vocabulary'),
      reading('When is the break?', 'De les begint om negen uur. Om elf uur is pauze.', 'elf uur', 'Break at eleven.', ['elf uur', 'negen uur', 'twaalf uur', 'acht uur']),
      errorCorr('Fix: Het is half negen (meaning 9:30).', ['Het is half tien.', 'Say half tien for 9:30.'], 'Half negen = 8:30; half tien = 9:30.'),
      trNlEn('Kun je dat herhalen?', ['Can you repeat that?', 'Could you repeat that?'], 'Herhalen = repeat.'),
      listening('What time?', 'Het is kwart voor tien', 'kwart voor tien', '9:45.', ['kwart voor tien', 'kwart over tien', 'half tien', 'tien uur']),
    ],
  },
});

// ========== A1 modules (abbreviated banks but meeting 15+ exercises) ==========
function makeLevelModule(cfg) {
  modules.push(cfg);
}

makeLevelModule({
  file: 'a1-01.ts',
  id: 'a1-01',
  level: 'a1',
  order: 5,
  title: 'Personal information',
  titleNl: 'Persoonlijke gegevens',
  topic: 'personal',
  grammarFocus: ['zijn / hebben', 'Personal pronouns', 'Questions with waar/wat/hoe'],
  vocabularyFocus: ['address', 'phone', 'nationality', 'age'],
  skills: ['speaking', 'writing', 'vocabulary', 'grammar'],
  description: 'Give and ask for basic personal details.',
  lessons: [
    {
      title: 'Contact details',
      objective: 'Share address, phone, and email.',
      recap: ['Wat is je…? for informal questions.', 'Mijn… is… for answers.'],
      steps: [
        { type: 'explanation', title: 'Asking for details', body: 'Use Wat is je telefoonnummer? and Wat is je e-mailadres? Answer with Mijn nummer is… Keep numbers clear.' },
        { type: 'examples', title: 'Examples', items: [{ nl: 'Waar woon je?', en: 'Where do you live?' }, { nl: 'Mijn adres is Kerkstraat 12.', en: 'My address is Kerkstraat 12.' }] },
        { type: 'vocabulary', title: 'Personal words', vocabularyIds: ['vocab-a1-081', 'vocab-a1-082', 'vocab-a1-083', 'vocab-a1-084', 'vocab-a1-085'] },
      ],
    },
    {
      title: 'Pronouns and zijn',
      objective: 'Use ik/jij/hij with ben/bent/is.',
      recap: ['Ik ben, jij bent, hij/zij is.', 'Hebben: ik heb, jij hebt, hij heeft.'],
      steps: [
        { type: 'explanation', title: 'zijn in the present', body: 'Zijn (to be) is irregular: ik ben, jij bent, u bent, hij/zij/het is, wij/jullie/zij zijn.' },
        { type: 'examples', title: 'Forms', items: [{ nl: 'Ik ben 28 jaar.', en: 'I am 28 years old.' }, { nl: 'Zij is getrouwd.', en: 'She is married.' }] },
      ],
    },
  ],
  bank: {
    lesson1: [
      mc('Wat is je _____?', '', ['telefoonnummer', 'gracht', 'maandag', 'trein'], 'telefoonnummer', 'Asking for a phone number.', 'vocabulary'),
      fill('Mijn _____ is Kerkstraat 12.', '', ['adres'], 'Adres = address.', 'vocabulary'),
      trEnNl('What is your email address?', ['Wat is je e-mailadres?', 'Wat is jouw e-mailadres?'], 'E-mailadres is common.'),
      listening('What is asked?', 'Waar woon je?', 'Waar woon je?', 'Where do you live?', ['Waar woon je?', 'Hoe heet je?', 'Hoe laat is het?', 'Wat eet je?']),
      matching('Match', [{ left: 'leeftijd', right: 'age' }, { left: 'nationaliteit', right: 'nationality' }, { left: 'getrouwd', right: 'married' }], 'Personal info set.'),
    ],
    lesson2: [
      fill('Ik _____ student.', '', ['ben'], 'Ik ben…', 'grammar'),
      mc('Choose: Hij _____ een auto.', '', ['heeft', 'heb', 'hebt', 'zijn'], 'heeft', 'Hij/zij/het heeft.', 'grammar'),
      errorCorr('Fix: Jij ben laat.', ['Jij bent laat.'], 'Jij bent, not ben.'),
      order('Order', ['woon', 'Ik', 'in', 'Delft', '.'], 'Ik woon in Delft.', 'Subject–verb–place.'),
      guided('Write three sentences about your personal details.', 'Ik heet Sam. Ik ben 30 jaar. Ik woon in Leiden.', ['Name', 'Age or job', 'City'], 'Self-check against checklist.'),
    ],
    checkpoint: [
      mc('Formal: Waar woont _____?', '', ['u', 'je', 'jij', 'ik'], 'u', 'Formal question uses u.', 'grammar'),
      trNlEn('Ik ben getrouwd.', ['I am married', "I'm married"], 'Getrouwd = married.'),
      reading('What is the phone number?', 'Bel me op 06 12345678. Mijn naam is Eva.', '06 12345678', 'Number appears in the text.', ['06 12345678', 'Eva', 'Bel me', 'naam']),
      dictation('Write it.', 'Mijn nationaliteit is Nederlands', ['Mijn nationaliteit is Nederlands'], 'Nationaliteit sentence.'),
      dialogue('Ask someone’s age politely (informal).', ['Hoe oud ben je?', 'Wat is je leeftijd?'], 'Hoe oud ben je? is common.'),
    ],
  },
});

// Helper to quickly create remaining modules with solid content
function quickModule({ file, id, level, order: moduleOrder, title, titleNl, topic, grammarFocus, vocabularyFocus, skills, description, vocabIds, lessonTitles, explanations, examples, wordBank }) {
  const [t1, t2] = lessonTitles;
  const [e1, e2] = explanations;
  const [ex1, ex2] = examples;
  const wb = wordBank;
  makeLevelModule({
    file,
    id,
    level,
    order: moduleOrder,
    title,
    titleNl,
    topic,
    grammarFocus,
    vocabularyFocus,
    skills,
    description,
    lessons: [
      {
        title: t1,
        objective: `Learn core language for ${topic}.`,
        recap: [e1.slice(0, 80) + '…', 'Practise with short examples daily.'],
        steps: [
          { type: 'explanation', title: t1, body: e1 },
          { type: 'examples', title: 'In context', items: ex1 },
          { type: 'vocabulary', title: 'Key words', vocabularyIds: vocabIds.slice(0, 6) },
        ],
      },
      {
        title: t2,
        objective: `Practise ${topic} in short exchanges.`,
        recap: [e2.slice(0, 80) + '…', 'Reuse patterns in your own life.'],
        steps: [
          { type: 'explanation', title: t2, body: e2 },
          { type: 'examples', title: 'More examples', items: ex2 },
          { type: 'vocabulary', title: 'More words', vocabularyIds: vocabIds.slice(6, 12) },
        ],
      },
    ],
    bank: {
      lesson1: [
        mc(wb.mc1.q, '', wb.mc1.options, wb.mc1.a, wb.mc1.expl, 'vocabulary'),
        fill(wb.fill1.q, '', wb.fill1.a, wb.fill1.expl, 'grammar'),
        trNlEn(wb.tr1.nl, wb.tr1.en, wb.tr1.expl),
        listening(wb.listen1.q, wb.listen1.audio, wb.listen1.a, wb.listen1.expl, wb.listen1.options),
        matching('Match the pairs', wb.match1, 'Build recognition speed.'),
      ],
      lesson2: [
        mc(wb.mc2.q, '', wb.mc2.options, wb.mc2.a, wb.mc2.expl, 'grammar', 2),
        fill(wb.fill2.q, '', wb.fill2.a, wb.fill2.expl, 'vocabulary'),
        trEnNl(wb.tr2.en, wb.tr2.nl, wb.tr2.expl),
        order(wb.order2.q, wb.order2.items, wb.order2.a, wb.order2.expl),
        dialogue(wb.dialogue2.q, wb.dialogue2.a, wb.dialogue2.expl),
      ],
      checkpoint: [
        mc(wb.cpmc.q, '', wb.cpmc.options, wb.cpmc.a, wb.cpmc.expl, 'vocabulary', 2),
        errorCorr(wb.err.q, wb.err.a, wb.err.expl),
        reading(wb.read.q, wb.read.passage, wb.read.a, wb.read.expl, wb.read.options),
        dictation('Write what you hear.', wb.dict.audio, wb.dict.a, wb.dict.expl),
        guided(wb.guided.q, wb.guided.model, wb.guided.check, wb.guided.expl),
      ],
    },
  });
}

quickModule({
  file: 'a1-02.ts', id: 'a1-02', level: 'a1', order: 6,
  title: 'Family and relationships', titleNl: 'Familie en relaties', topic: 'family',
  grammarFocus: ['Possessives mijn/jouw/zijn', 'Plural family nouns'],
  vocabularyFocus: ['family members', 'relationships'],
  skills: ['vocabulary', 'speaking', 'grammar'],
  description: 'Talk about family members and relationships.',
  vocabIds: ['vocab-a1-087', 'vocab-a1-088', 'vocab-a1-089', 'vocab-a1-090', 'vocab-a1-091', 'vocab-a1-092', 'vocab-a1-093', 'vocab-a1-094', 'vocab-a1-095', 'vocab-a1-096', 'vocab-a1-097', 'vocab-a1-098'],
  lessonTitles: ['Family words', 'Possessives'],
  explanations: [
    'Core family words: moeder, vader, broer, zus, kind, ouders. Use de for most people nouns.',
    'Possessives: mijn, jouw, zijn, haar, ons/onze, jullie, hun. Ons before het-words; onze before de-words.',
  ],
  examples: [
    [{ nl: 'Dit is mijn zus.', en: 'This is my sister.' }, { nl: 'Zijn ouders wonen in Den Haag.', en: 'His parents live in The Hague.' }],
    [{ nl: 'Ons huis is klein.', en: 'Our house is small.' }, { nl: 'Onze kinderen spelen buiten.', en: 'Our children play outside.' }],
  ],
  wordBank: {
    mc1: { q: 'What is "broer"?', options: ['brother', 'sister', 'uncle', 'cousin'], a: 'brother', expl: 'Broer = brother.' },
    fill1: { q: 'Dit is _____ moeder.', a: ['mijn'], expl: 'Mijn = my.' },
    tr1: { nl: 'ouders', en: ['parents'], expl: 'Ouders = parents.' },
    listen1: { q: 'Who is mentioned?', audio: 'Dit is mijn zus', a: 'zus', expl: 'Zus = sister.', options: ['zus', 'broer', 'vader', 'oom'] },
    match1: [{ left: 'vader', right: 'father' }, { left: 'moeder', right: 'mother' }, { left: 'kind', right: 'child' }],
    mc2: { q: 'Choose: _____ huis (het) is groot.', options: ['Ons', 'Onze', 'Mijnne', 'Jouwes'], a: 'Ons', expl: 'Ons + het-noun.' },
    fill2: { q: 'Haar _____ heet Tom.', a: ['broer', 'vader', 'zoon'], expl: 'Any fitting family noun; common answer broer.' },
    tr2: { en: 'my sister', nl: ['mijn zus'], expl: 'Mijn zus.' },
    order2: { q: 'Order', items: ['ouders', 'Mijn', 'in', 'wonen', 'Utrecht', '.'], a: 'Mijn ouders wonen in Utrecht.', expl: 'Possessive + noun + verb.' },
    dialogue2: { q: 'Ask "Do you have brothers or sisters?"', a: ['Heb je broers of zussen?', 'Heb je broers of zussen'], expl: 'Hebben + family.' },
    cpmc: { q: '"Zus" means…', options: ['sister', 'brother', 'niece', 'aunt'], a: 'sister', expl: 'Zus = sister.' },
    err: { q: 'Fix: Onze huis is oud.', a: ['Ons huis is oud.'], expl: 'Huis is het → ons.' },
    read: { q: 'How many children?', passage: 'Wij hebben twee kinderen: een zoon en een dochter.', a: 'twee', expl: 'Twee kinderen.', options: ['twee', 'een', 'drie', 'geen'] },
    dict: { audio: 'Dit is mijn familie', a: ['Dit is mijn familie'], expl: 'Familie sentence.' },
    guided: { q: 'Describe your family in 3 sentences.', model: 'Ik heb één zus. Mijn ouders wonen in Spanje. Wij zijn een klein gezin.', check: ['Uses family word', 'Uses possessive', 'At least two sentences'], expl: 'Self-assess.' },
  },
});

quickModule({
  file: 'a1-03.ts', id: 'a1-03', level: 'a1', order: 7,
  title: 'Home and household', titleNl: 'Thuis en in huis', topic: 'home',
  grammarFocus: ['de/het with household nouns', 'Er is / er zijn'],
  vocabularyFocus: ['rooms', 'furniture', 'household objects'],
  skills: ['vocabulary', 'listening', 'grammar'],
  description: 'Name rooms and objects at home.',
  vocabIds: ['vocab-a1-099', 'vocab-a1-100', 'vocab-a1-101', 'vocab-a1-102', 'vocab-a1-103', 'vocab-a1-104', 'vocab-a1-105', 'vocab-a1-106', 'vocab-a1-107', 'vocab-a1-108', 'vocab-a1-109', 'vocab-a1-110'],
  lessonTitles: ['Rooms and furniture', 'de or het at home'],
  explanations: [
    'Learn kamer, keuken, badkamer, woonkamer, slaapkamer and common objects like tafel, stoel, bed, lamp.',
    'Articles must be learned with the noun: de tafel, het bed, de keuken, het huis. Use er is/er zijn for existence.',
  ],
  examples: [
    [{ nl: 'De keuken is klein maar licht.', en: 'The kitchen is small but bright.' }, { nl: 'Er is een bank in de woonkamer.', en: 'There is a sofa in the living room.' }],
    [{ nl: 'Het raam is open.', en: 'The window is open.' }, { nl: 'Er zijn twee stoelen.', en: 'There are two chairs.' }],
  ],
  wordBank: {
    mc1: { q: 'Where do you cook?', options: ['keuken', 'badkamer', 'slaapkamer', 'gang'], a: 'keuken', expl: 'Keuken = kitchen.' },
    fill1: { q: '_____ is een lamp op de tafel.', a: ['Er'], expl: 'Er is…' },
    tr1: { nl: 'het bed', en: ['the bed'], expl: 'Bed is het.' },
    listen1: { q: 'Which room?', audio: 'Ik slaap in de slaapkamer', a: 'slaapkamer', expl: 'Bedroom.', options: ['slaapkamer', 'keuken', 'tuin', 'zolder'] },
    match1: [{ left: 'stoel', right: 'chair' }, { left: 'tafel', right: 'table' }, { left: 'raam', right: 'window' }],
    mc2: { q: 'Choose the article: ___ huis', options: ['het', 'de'], a: 'het', expl: 'Het huis.' },
    fill2: { q: 'Er _____ twee ramen.', a: ['zijn'], expl: 'Er zijn + plural.' },
    tr2: { en: 'the kitchen', nl: ['de keuken'], expl: 'De keuken.' },
    order2: { q: 'Order', items: ['bank', 'een', 'is', 'Er', 'in', 'de', 'woonkamer', '.'], a: 'Er is een bank in de woonkamer.', expl: 'Er is + indefinite noun.' },
    dialogue2: { q: 'Say that your bathroom is small.', a: ['Mijn badkamer is klein.', 'De badkamer is klein'], expl: 'Adjective after zijn.' },
    cpmc: { q: 'Woonkamer is the…', options: ['living room', 'bedroom', 'attic', 'cellar'], a: 'living room', expl: 'Woonkamer = living room.' },
    err: { q: 'Fix: De bed is groot.', a: ['Het bed is groot.'], expl: 'Het bed.' },
    read: { q: 'What is open?', passage: 'In ons huis is de keuken warm. Het raam is open.', a: 'Het raam', expl: 'Raam is open.', options: ['Het raam', 'De keuken', 'Het huis', 'De deur'] },
    dict: { audio: 'Er is een tafel in de keuken', a: ['Er is een tafel in de keuken'], expl: 'Existence sentence.' },
    guided: { q: 'Describe your home in 3 sentences.', model: 'Ik woon in een appartement. Er is een kleine keuken. Mijn woonkamer heeft een bank.', check: ['Mentions home type or room', 'Uses er is/er zijn or article correctly'], expl: 'Self-assess.' },
  },
});

quickModule({
  file: 'a1-04.ts', id: 'a1-04', level: 'a1', order: 8,
  title: 'Daily routine', titleNl: 'Dagelijks ritme', topic: 'routine',
  grammarFocus: ['Present tense regular verbs', 'Separable verbs opstaan/aankomen', 'Word order time expressions'],
  vocabularyFocus: ['daily verbs', 'times of day'],
  skills: ['grammar', 'speaking', 'listening'],
  description: 'Describe a simple daily routine.',
  vocabIds: ['vocab-a1-111', 'vocab-a1-112', 'vocab-a1-113', 'vocab-a1-114', 'vocab-a1-115', 'vocab-a1-116', 'vocab-a1-117', 'vocab-a1-118', 'vocab-a1-119', 'vocab-a1-120', 'vocab-a1-121', 'vocab-a1-122'],
  lessonTitles: ['A day in verbs', 'Separable verbs'],
  explanations: [
    'Regular present: ik werk, jij werkt, hij werkt, wij werken. Place time early: ’s ochtends werk ik.',
    'Separable verbs split in main clauses: Ik sta om zeven uur op. Prefix goes to the end.',
  ],
  examples: [
    [{ nl: 'Ik werk van negen tot vijf.', en: 'I work from nine to five.' }, { nl: '’s Avonds lees ik een boek.', en: 'In the evening I read a book.' }],
    [{ nl: 'Ik sta vroeg op.', en: 'I get up early.' }, { nl: 'De trein komt om acht uur aan.', en: 'The train arrives at eight.' }],
  ],
  wordBank: {
    mc1: { q: 'Ik _____ om zeven uur op.', options: ['sta', 'staan', 'staat', 'opsta'], a: 'sta', expl: 'Ik sta … op.' },
    fill1: { q: '’s Ochtends _____ ik koffie.', a: ['drink'], expl: 'Present tense drink.' },
    tr1: { nl: 'Ik ga naar mijn werk.', en: ['I go to work', 'I go to my work'], expl: 'Naar mijn werk.' },
    listen1: { q: 'What happens?', audio: 'Ik sta vroeg op', a: 'opstaan', expl: 'Getting up.', options: ['opstaan', 'aankomen', 'werken', 'slapen'] },
    match1: [{ left: 'opstaan', right: 'to get up' }, { left: 'werken', right: 'to work' }, { left: 'slapen', right: 'to sleep' }],
    mc2: { q: 'In main clauses, the separable prefix…', options: ['goes to the end', 'stays attached always', 'is deleted', 'comes first'], a: 'goes to the end', expl: 'Split in main clauses.' },
    fill2: { q: 'De bus komt laat _____.', a: ['aan'], expl: 'Aankomen → komt … aan.' },
    tr2: { en: 'I get up at seven.', nl: ['Ik sta om zeven uur op.', 'Ik sta om 7 uur op.'], expl: 'Separable opstaan.' },
    order2: { q: 'Order', items: ['op', 'sta', 'Ik', 'om', 'zes', 'uur', '.'], a: 'Ik sta om zes uur op.', expl: 'Prefix at end.' },
    dialogue2: { q: 'Say you work in the morning.', a: ["’s Ochtends werk ik.", "'s Ochtends werk ik.", 'Ik werk ’s ochtends.'], expl: 'Time expression + verb.' },
    cpmc: { q: 'Slapen means…', options: ['to sleep', 'to eat', 'to run', 'to cook'], a: 'to sleep', expl: 'Slapen = sleep.' },
    err: { q: 'Fix: Ik opsta om zeven uur.', a: ['Ik sta om zeven uur op.'], expl: 'Split the verb.' },
    read: { q: 'When does Eva start work?', passage: 'Eva staat om half acht op. Zij begint om negen uur met werken.', a: 'negen uur', expl: 'Begins at nine.', options: ['negen uur', 'half acht', 'acht uur', 'zes uur'] },
    dict: { audio: '’s Avonds lees ik', a: ["’s Avonds lees ik", "'s Avonds lees ik"], expl: 'Evening routine.' },
    guided: { q: 'Write your weekday morning routine (3 sentences).', model: 'Ik sta om zeven uur op. Ik drink koffie. Daarna ga ik naar mijn werk.', check: ['Uses time', 'Uses at least one routine verb'], expl: 'Self-assess.' },
  },
});

quickModule({
  file: 'a1-05.ts', id: 'a1-05', level: 'a1', order: 9,
  title: 'Food and drink', titleNl: 'Eten en drinken', topic: 'food',
  grammarFocus: ['de/het with food', 'geen vs niet', 'Ik wil / Mag ik…'],
  vocabularyFocus: ['meals', 'drinks', 'common foods'],
  skills: ['vocabulary', 'speaking', 'listening'],
  description: 'Order food and talk about meals.',
  vocabIds: ['vocab-a1-123', 'vocab-a1-124', 'vocab-a1-125', 'vocab-a1-126', 'vocab-a1-127', 'vocab-a1-128', 'vocab-a1-129', 'vocab-a1-130', 'vocab-a1-131', 'vocab-a1-132', 'vocab-a1-133', 'vocab-a1-134'],
  lessonTitles: ['Meals and drinks', 'geen and ordering'],
  explanations: [
    'Breakfast ontbijt, lunch lunch/middageten, dinner avondeten. Common drinks: koffie, thee, water, melk, sap.',
    'Geen negates a noun (geen melk); niet negates verbs/adjectives (Ik drink niet). Mag ik… / Ik wil… for ordering.',
  ],
  examples: [
    [{ nl: 'Ik drink graag thee.', en: 'I like drinking tea.' }, { nl: 'We eten om zes uur.', en: 'We eat at six.' }],
    [{ nl: 'Ik wil een broodje, alstublieft.', en: 'I would like a sandwich, please.' }, { nl: 'Er is geen melk meer.', en: 'There is no milk left.' }],
  ],
  wordBank: {
    mc1: { q: 'Morning meal?', options: ['ontbijt', 'avondeten', 'nagerecht', 'voorgerecht'], a: 'ontbijt', expl: 'Ontbijt = breakfast.' },
    fill1: { q: 'Ik drink _____ koffie.', a: ['graag'], expl: 'Graag = gladly / like to.' },
    tr1: { nl: 'water', en: ['water'], expl: 'Same word.' },
    listen1: { q: 'What is ordered?', audio: 'Ik wil een koffie, alstublieft', a: 'koffie', expl: 'Coffee.', options: ['koffie', 'thee', 'melk', 'sap'] },
    match1: [{ left: 'brood', right: 'bread' }, { left: 'kaas', right: 'cheese' }, { left: 'appel', right: 'apple' }],
    mc2: { q: 'Choose: Ik drink _____ alcohol.', options: ['geen', 'niet', 'nooit melk', 'wel geen'], a: 'geen', expl: 'Geen + noun.' },
    fill2: { q: 'Mag ik de _____, alstublieft?', a: ['rekening', 'kaart'], expl: 'Rekening = bill; kaart = menu.' },
    tr2: { en: 'I would like tea', nl: ['Ik wil thee', 'Ik wil graag thee', 'Een thee, alstublieft'], expl: 'Ordering patterns.' },
    order2: { q: 'Order', items: ['een', 'wil', 'Ik', 'broodje', '.'], a: 'Ik wil een broodje.', expl: 'Ik wil + object.' },
    dialogue2: { q: 'Say you do not eat meat.', a: ['Ik eet geen vlees.', 'Ik eet niet graag vlees'], expl: 'Geen vlees.' },
    cpmc: { q: 'Avondeten is…', options: ['dinner', 'breakfast', 'snack', 'dessert'], a: 'dinner', expl: 'Evening meal.' },
    err: { q: 'Fix: Ik drink niet koffie.', a: ['Ik drink geen koffie.', 'Ik drink niet graag koffie.'], expl: 'Geen before noun object.' },
    read: { q: 'What is missing?', passage: 'We willen thee, maar er is geen melk.', a: 'melk', expl: 'Geen melk.', options: ['melk', 'thee', 'koffie', 'suiker'] },
    dict: { audio: 'Ik eet graag kaas', a: ['Ik eet graag kaas'], expl: 'Food preference.' },
    guided: { q: 'Write a café order (2–3 lines).', model: 'Goedemiddag. Ik wil een koffie en een broodje kaas, alstublieft.', check: ['Greeting or polite word', 'Ik wil / Mag ik', 'Food or drink item'], expl: 'Self-assess.' },
  },
});

quickModule({
  file: 'a1-06.ts', id: 'a1-06', level: 'a1', order: 10,
  title: 'Shopping and prices', titleNl: 'Winkelen en prijzen', topic: 'shopping',
  grammarFocus: ['Numbers with euro', 'Deze/die', 'Modal kunnen/willen'],
  vocabularyFocus: ['shop phrases', 'prices', 'sizes'],
  skills: ['listening', 'speaking', 'vocabulary'],
  description: 'Ask prices and buy everyday items.',
  vocabIds: ['vocab-a1-135', 'vocab-a1-136', 'vocab-a1-137', 'vocab-a1-138', 'vocab-a1-139', 'vocab-a1-140', 'vocab-a1-141', 'vocab-a1-142', 'vocab-a1-143', 'vocab-a1-144', 'vocab-a1-145', 'vocab-a1-146'],
  lessonTitles: ['In the shop', 'Paying'],
  explanations: [
    'Useful questions: Heeft u…? Wat kost dit? Mag ik dit passen? Numbers with euro: Dat is vijf euro vijftig.',
    'Cash contant, card pinpas/kaart. Kunt u dat inpakken? for wrapping.',
  ],
  examples: [
    [{ nl: 'Wat kost deze jas?', en: 'How much is this coat?' }, { nl: 'Die is te duur.', en: 'That one is too expensive.' }],
    [{ nl: 'Kan ik pinnen?', en: 'Can I pay by card?' }, { nl: 'Alstublieft, vijf euro.', en: 'Here you are, five euros.' }],
  ],
  wordBank: {
    mc1: { q: 'Wat _____ dit?', options: ['kost', 'kostten', 'prijs', 'euro'], a: 'kost', expl: 'Wat kost dit?' },
    fill1: { q: 'Heeft u dit in een andere _____?', a: ['maat', 'kleur'], expl: 'Maat = size.' },
    tr1: { nl: 'duur', en: ['expensive'], expl: 'Duur = expensive.' },
    listen1: { q: 'Price?', audio: 'Dat is tien euro', a: 'tien euro', expl: 'Ten euros.', options: ['tien euro', 'twee euro', 'twaalf euro', 'dertig euro'] },
    match1: [{ left: 'kassa', right: 'checkout' }, { left: 'korting', right: 'discount' }, { left: 'bon', right: 'receipt' }],
    mc2: { q: 'Pinpas is used to…', options: ['pay by card', 'measure size', 'open a shop', 'ask for a bag'], a: 'pay by card', expl: 'Card payment.' },
    fill2: { q: 'Mag ik dit _____?', a: ['passen'], expl: 'Passen = try on.' },
    tr2: { en: 'How much does this cost?', nl: ['Wat kost dit?', 'Hoeveel kost dit?'], expl: 'Price question.' },
    order2: { q: 'Order', items: ['deze', 'kost', 'Wat', 'tas', '?'], a: 'Wat kost deze tas?', expl: 'Question with kost.' },
    dialogue2: { q: 'Ask if you can pay by card.', a: ['Kan ik pinnen?', 'Kan ik met de pinpas betalen?', 'Mag ik pinnen?'], expl: 'Pinnen = pay by debit.' },
    cpmc: { q: 'Korting means…', options: ['discount', 'receipt', 'basket', 'queue'], a: 'discount', expl: 'Korting = discount.' },
    err: { q: 'Fix: Wat kosten deze jas?', a: ['Wat kost deze jas?'], expl: 'Singular kost.' },
    read: { q: 'Is it cheap?', passage: 'De schoenen kosten tachtig euro. Dat is duur voor mij.', a: 'Nee, duur', expl: 'Called duur.', options: ['Nee, duur', 'Ja, goedkoop', 'Gratis', 'Onbekend'] },
    dict: { audio: 'Kan ik pinnen', a: ['Kan ik pinnen?', 'Kan ik pinnen'], expl: 'Card payment question.' },
    guided: { q: 'Write a short shop dialogue (customer lines).', model: 'Pardon, wat kost deze trui? Mag ik die passen? Dank u wel.', check: ['Asks price or size', 'Uses polite word'], expl: 'Self-assess.' },
  },
});

quickModule({
  file: 'a1-07.ts', id: 'a1-07', level: 'a1', order: 11,
  title: 'Town, directions, transport', titleNl: 'Stad, richting, vervoer', topic: 'town',
  grammarFocus: ['Imperatives', 'Prepositions naar/in/op/bij', 'Modal kunnen'],
  vocabularyFocus: ['places in town', 'directions', 'transport'],
  skills: ['listening', 'speaking', 'vocabulary'],
  description: 'Ask for directions and use local transport.',
  vocabIds: ['vocab-a1-147', 'vocab-a1-148', 'vocab-a1-149', 'vocab-a1-150', 'vocab-a1-151', 'vocab-a1-152', 'vocab-a1-153', 'vocab-a1-154', 'vocab-a1-155', 'vocab-a1-156', 'vocab-a1-157', 'vocab-a1-158'],
  lessonTitles: ['Places in town', 'Getting there'],
  explanations: [
    'Town words: station, bushalte, markt, museum, centrum, brug. Ask: Waar is…? / Hoe kom ik bij…?',
    'Directions: links, rechts, rechtdoor. Transport: fiets, bus, trein, tram, metro. Ik ga met de trein.',
  ],
  examples: [
    [{ nl: 'Het station is dichtbij.', en: 'The station is nearby.' }, { nl: 'Neem de eerste straat links.', en: 'Take the first street on the left.' }],
    [{ nl: 'Ik ga met de fiets.', en: 'I go by bike.' }, { nl: 'Stap uit bij het museum.', en: 'Get off at the museum.' }],
  ],
  wordBank: {
    mc1: { q: 'Rechtdoor means…', options: ['straight ahead', 'left', 'right', 'back'], a: 'straight ahead', expl: 'Rechtdoor = straight on.' },
    fill1: { q: 'Hoe kom ik _____ het station?', a: ['bij', 'naar'], expl: 'Bij/naar for reaching a place.' },
    tr1: { nl: 'links', en: ['left'], expl: 'Links = left.' },
    listen1: { q: 'Direction?', audio: 'Ga rechts', a: 'rechts', expl: 'Right.', options: ['rechts', 'links', 'rechtdoor', 'terug'] },
    match1: [{ left: 'trein', right: 'train' }, { left: 'bushalte', right: 'bus stop' }, { left: 'fiets', right: 'bike' }],
    mc2: { q: 'Ik ga _____ de bus.', options: ['met', 'op', 'in naar', 'voor'], a: 'met', expl: 'Met + vehicle.' },
    fill2: { q: 'Neem de tweede straat _____.', a: ['links', 'rechts'], expl: 'Left or right.' },
    tr2: { en: 'Where is the market?', nl: ['Waar is de markt?', 'Waar is de markt'], expl: 'Waar is…?' },
    order2: { q: 'Order', items: ['met', 'ga', 'Ik', 'de', 'trein', '.'], a: 'Ik ga met de trein.', expl: 'Met + transport.' },
    dialogue2: { q: 'Ask where the station is.', a: ['Waar is het station?', 'Hoe kom ik bij het station?'], expl: 'Location question.' },
    cpmc: { q: 'Bushalte is…', options: ['bus stop', 'train ticket', 'bridge', 'taxi rank'], a: 'bus stop', expl: 'Bushalte.' },
    err: { q: 'Fix: Ik ga met trein.', a: ['Ik ga met de trein.'], expl: 'Article de before trein.' },
    read: { q: 'How does Lara travel?', passage: 'Lara woont ver van haar werk. Zij gaat elke dag met de tram.', a: 'tram', expl: 'Met de tram.', options: ['tram', 'fiets', 'auto', 'te voet'] },
    dict: { audio: 'Ga rechtdoor', a: ['Ga rechtdoor'], expl: 'Imperative direction.' },
    guided: { q: 'Give directions from a station to a café (3 steps).', model: 'Ga rechtdoor. Neem de eerste straat rechts. Het café is naast de boekhandel.', check: ['Uses a direction word', 'Mentions a landmark or place'], expl: 'Self-assess.' },
  },
});

quickModule({
  file: 'a1-08.ts', id: 'a1-08', level: 'a1', order: 12,
  title: 'Work, free time, weather and health', titleNl: 'Werk, vrije tijd, weer en gezondheid', topic: 'everyday',
  grammarFocus: ['Modal verbs kunnen/willen/moeten', 'Basic adjectives', 'Questions'],
  vocabularyFocus: ['jobs', 'hobbies', 'weather', 'body/health'],
  skills: ['speaking', 'vocabulary', 'grammar', 'listening'],
  description: 'Talk about work, hobbies, weather, and simple health needs.',
  vocabIds: ['vocab-a1-159', 'vocab-a1-160', 'vocab-a1-161', 'vocab-a1-162', 'vocab-a1-163', 'vocab-a1-164', 'vocab-a1-165', 'vocab-a1-166', 'vocab-a1-167', 'vocab-a1-168', 'vocab-a1-169', 'vocab-a1-170'],
  lessonTitles: ['Work and hobbies', 'Weather and feeling unwell'],
  explanations: [
    'Say Ik werk als… / Ik studeer… Hobbies: sporten, lezen, muziek luisteren, wandelen. Modals: ik kan, ik wil, ik moet.',
    'Weather: het regent, de zon schijnt, het is koud/warm. Health: Ik voel me ziek. Ik heb pijn aan mijn…',
  ],
  examples: [
    [{ nl: 'Ik werk als verpleegkundige.', en: 'I work as a nurse.' }, { nl: 'In mijn vrije tijd sport ik.', en: 'In my free time I exercise.' }],
    [{ nl: 'Het regent vandaag.', en: 'It is raining today.' }, { nl: 'Ik heb hoofdpijn.', en: 'I have a headache.' }],
  ],
  wordBank: {
    mc1: { q: 'Vrije tijd means…', options: ['free time', 'full-time job', 'overtime', 'holiday only'], a: 'free time', expl: 'Leisure time.' },
    fill1: { q: 'Ik _____ zwemmen.', a: ['kan', 'wil'], expl: 'Modal + infinitive.' },
    tr1: { nl: 'het regent', en: ['it is raining', "it's raining", 'it rains'], expl: 'Weather phrase.' },
    listen1: { q: 'Complaint?', audio: 'Ik heb hoofdpijn', a: 'hoofdpijn', expl: 'Headache.', options: ['hoofdpijn', 'koorts', 'hoest', 'verkoudheid'] },
    match1: [{ left: 'werken', right: 'to work' }, { left: 'studeren', right: 'to study' }, { left: 'wandelen', right: 'to walk' }],
    mc2: { q: 'Ik moet naar de huisarts. Moeten expresses…', options: ['necessity', 'ability', 'desire only', 'past tense'], a: 'necessity', expl: 'Moeten = must/have to.' },
    fill2: { q: 'Het is vandaag erg _____.', a: ['koud', 'warm', 'heet'], expl: 'Weather adjective.' },
    tr2: { en: 'I feel sick', nl: ['Ik voel me ziek', 'Ik ben ziek'], expl: 'Health statement.' },
    order2: { q: 'Order', items: ['als', 'werk', 'Ik', 'docent', '.'], a: 'Ik werk als docent.', expl: 'Job pattern.' },
    dialogue2: { q: 'Say you want to rest.', a: ['Ik wil rusten.', 'Ik moet rusten'], expl: 'Modal + infinitive.' },
    cpmc: { q: 'Huisarts is…', options: ['GP / family doctor', 'dentist', 'pharmacist', 'surgeon only'], a: 'GP / family doctor', expl: 'General practitioner.' },
    err: { q: 'Fix: Ik kan te zwemmen.', a: ['Ik kan zwemmen.'], expl: 'No te after modal + infinitive.' },
    read: { q: 'Why stay inside?', passage: 'Tom wil wandelen, maar het regent hard. Daarom blijft hij thuis.', a: 'regen', expl: 'Heavy rain.', options: ['regen', 'werk', 'ziekte', 'feest'] },
    dict: { audio: 'Ik moet sporten', a: ['Ik moet sporten'], expl: 'Modal sentence.' },
    guided: { q: 'Write about your job/studies, a hobby, and today’s weather.', model: 'Ik studeer economie. In mijn vrije tijd lees ik. Vandaag schijnt de zon.', check: ['Work/study', 'Hobby', 'Weather'], expl: 'Self-assess.' },
  },
});

// A2 modules
const a2Specs = [
  {
    file: 'a2-01.ts', id: 'a2-01', order: 13, title: 'Plans and appointments', titleNl: 'Plannen en afspraken', topic: 'plans',
    grammarFocus: ['Going to / zullen', 'Time clauses with als/wanneer', 'Kunnen we…?'],
    vocabularyFocus: ['calendar', 'appointments', 'suggestions'],
    description: 'Make plans and arrange to meet.',
    vocabIds: ['vocab-a2-171', 'vocab-a2-172', 'vocab-a2-173', 'vocab-a2-174', 'vocab-a2-175', 'vocab-a2-176', 'vocab-a2-177', 'vocab-a2-178', 'vocab-a2-179', 'vocab-a2-180', 'vocab-a2-181', 'vocab-a2-182'],
    e1: 'Use Zal ik…? / Kunnen we…? / Heb je tijd op…? Future-ish: Ik ga morgen sporten; We zullen zien.',
    e2: 'Confirm with Prima, tot dan! Cancel politely: Ik kan toch niet. Sorry, ik moet afzeggen.',
    ex1: [{ nl: 'Zullen we vrijdag afspreken?', en: 'Shall we meet on Friday?' }, { nl: 'Ik heb om drie uur een afspraak.', en: 'I have an appointment at three.' }],
    ex2: [{ nl: 'Past het dinsdagochtend?', en: 'Does Tuesday morning work?' }, { nl: 'Laten we het verzetten.', en: 'Let’s reschedule.' }],
    wb: {
      mc1: { q: 'Afspraak means…', options: ['appointment', 'airport', 'discount', 'argument'], a: 'appointment', expl: 'Afspraak = appointment/arrangement.' },
      fill1: { q: 'Zullen we morgen _____?', a: ['afspreken', 'lunchen', 'bellen'], expl: 'Suggestion with zullen.' },
      tr1: { nl: 'Tot dan!', en: ['See you then!', 'Until then!'], expl: 'Closing a plan.' },
      listen1: { q: 'What is proposed?', audio: 'Kunnen we dinsdag afspreken', a: 'dinsdag', expl: 'Tuesday meeting.', options: ['dinsdag', 'donderdag', 'zaterdag', 'maandag'] },
      match1: [{ left: 'verzetten', right: 'to reschedule' }, { left: 'afzeggen', right: 'to cancel' }, { left: 'beschikbaar', right: 'available' }],
      mc2: { q: 'Ik ga volgende week verhuizen uses ga for…', options: ['near future plan', 'passive voice', 'past perfect', 'imperative'], a: 'near future plan', expl: 'gaan + infinitive.' },
      fill2: { q: 'Sorry, ik moet _____.', a: ['afzeggen'], expl: 'Cancel.' },
      tr2: { en: 'Does Thursday work for you?', nl: ['Past donderdag?', 'Komt donderdag uit?', 'Heb je donderdag tijd?'], expl: 'Availability check.' },
      order2: { q: 'Order', items: ['we', 'Zullen', 'koffie', 'drinken', '?'], a: 'Zullen we koffie drinken?', expl: 'Zullen we + infinitive.' },
      dialogue2: { q: 'Suggest meeting tomorrow afternoon.', a: ['Zullen we morgenmiddag afspreken?', 'Kunnen we morgenmiddag afspreken?'], expl: 'Polite suggestion.' },
      cpmc: { q: 'Verzetten means…', options: ['reschedule', 'sit down', 'travel', 'pay'], a: 'reschedule', expl: 'Move an appointment.' },
      err: { q: 'Fix: Zullen wij gaan te lunchen?', a: ['Zullen we gaan lunchen?', 'Zullen we lunchen?'], expl: 'No te after gaan/zullen + infinitive.' },
      read: { q: 'Why cancel?', passage: 'Lotte belt: ze is ziek en moet de afspraak afzeggen. Ze wil een nieuwe datum.', a: 'ziek', expl: 'She is ill.', options: ['ziek', 'druk alleen', 'verhuisd', 'op vakantie'] },
      dict: { audio: 'Tot donderdag', a: ['Tot donderdag'], expl: 'See you Thursday.' },
      guided: { q: 'Write a short message to reschedule a coffee.', model: 'Hoi Sam, ik kan vrijdag toch niet. Kunnen we het naar maandag verzetten?', check: ['Mentions problem or change', 'Suggests new time'], expl: 'Self-assess.' },
    },
  },
  {
    file: 'a2-02.ts', id: 'a2-02', order: 14, title: 'Travel and accommodation', titleNl: 'Reizen en overnachting', topic: 'travel',
    grammarFocus: ['Perfect with zijn for movement', 'Questions for booking', 'Comparatives'],
    vocabularyFocus: ['hotel', 'tickets', 'luggage', 'delays'],
    description: 'Book travel and handle hotel check-in.',
    vocabIds: ['vocab-a2-183', 'vocab-a2-184', 'vocab-a2-185', 'vocab-a2-186', 'vocab-a2-187', 'vocab-a2-188', 'vocab-a2-189', 'vocab-a2-190', 'vocab-a2-191', 'vocab-a2-192', 'vocab-a2-193', 'vocab-a2-194'],
    e1: 'Travel verbs often take zijn in the perfect: Ik ben naar Berlijn gegaan. Useful: enkele reis, retour, overstappen.',
    e2: 'Hotel language: Ik heb een reservering op naam van… Heeft u een kamer met ontbijt? Check-in/uit.',
    ex1: [{ nl: 'Ik wil een retourtje naar Utrecht.', en: 'I want a return ticket to Utrecht.' }, { nl: 'We moeten overstappen in Zwolle.', en: 'We have to change in Zwolle.' }],
    ex2: [{ nl: 'Ik heb een reservering.', en: 'I have a reservation.' }, { nl: 'Is het ontbijt inbegrepen?', en: 'Is breakfast included?' }],
    wb: {
      mc1: { q: 'Retourtje is a…', options: ['return ticket', 'single ticket', 'platform', 'passport'], a: 'return ticket', expl: 'Return ticket.' },
      fill1: { q: 'Ik _____ naar Gent geweest.', a: ['ben'], expl: 'Zijn with movement/change.' },
      tr1: { nl: 'overstappen', en: ['to change (trains)', 'to transfer'], expl: 'Change trains.' },
      listen1: { q: 'Destination?', audio: 'Een enkele reis naar Maastricht', a: 'Maastricht', expl: 'Single to Maastricht.', options: ['Maastricht', 'Amsterdam', 'Rotterdam', 'Haarlem'] },
      match1: [{ left: 'koffer', right: 'suitcase' }, { left: 'vertraging', right: 'delay' }, { left: 'reservering', right: 'reservation' }],
      mc2: { q: 'Ontbijt inbegrepen means…', options: ['breakfast included', 'breakfast extra', 'no breakfast', 'lunch only'], a: 'breakfast included', expl: 'Inbegrepen = included.' },
      fill2: { q: 'Heeft u een _____ voor twee nachten?', a: ['kamer'], expl: 'Room.' },
      tr2: { en: 'I have a reservation', nl: ['Ik heb een reservering'], expl: 'Booking phrase.' },
      order2: { q: 'Order', items: ['ben', 'Ik', 'laat', 'aangekomen', '.'], a: 'Ik ben laat aangekomen.', expl: 'Perfect with zijn.' },
      dialogue2: { q: 'Ask if breakfast is included.', a: ['Is het ontbijt inbegrepen?', 'Is ontbijt inbegrepen?'], expl: 'Hotel question.' },
      cpmc: { q: 'Vertraging means…', options: ['delay', 'platform', 'ticket', 'luggage'], a: 'delay', expl: 'Delay.' },
      err: { q: 'Fix: Ik heb naar Parijs gegaan.', a: ['Ik ben naar Parijs gegaan.'], expl: 'Gaan takes zijn.' },
      read: { q: 'How many nights?', passage: 'Goedenavond, ik heb een reservering voor drie nachten op naam van Bakker.', a: 'drie', expl: 'Three nights.', options: ['drie', 'twee', 'vier', 'een'] },
      dict: { audio: 'Is er vertraging', a: ['Is er vertraging?', 'Is er vertraging'], expl: 'Delay question.' },
      guided: { q: 'Write a check-in line and one question about the room.', model: 'Goedemiddag, ik heb een reservering op naam van Costa. Heeft de kamer wifi?', check: ['Mentions reservation/name', 'Asks a room question'], expl: 'Self-assess.' },
    },
  },
  {
    file: 'a2-03.ts', id: 'a2-03', order: 15, title: 'Past experiences', titleNl: 'Ervaringen in het verleden', topic: 'past',
    grammarFocus: ['Perfect with hebben/zijn', 'Past participles', 'Time markers gisteren/vorige week'],
    vocabularyFocus: ['experience verbs', 'time phrases'],
    description: 'Talk about what you have done recently.',
    vocabIds: ['vocab-a2-195', 'vocab-a2-196', 'vocab-a2-197', 'vocab-a2-198', 'vocab-a2-199', 'vocab-a2-200', 'vocab-a2-201', 'vocab-a2-202', 'vocab-a2-203', 'vocab-a2-204', 'vocab-a2-205', 'vocab-a2-206'],
    e1: 'Most verbs form the perfect with hebben + participle: Ik heb gewerkt. Movement/change often use zijn: Ik ben geweest/gegaan/gekomen.',
    e2: 'Place time expressions early: Gisteren heb ik… Regular participles ge-stem-t/d; irregulars must be learned (gegeten, gezien, geweest).',
    ex1: [{ nl: 'Ik heb een goede film gezien.', en: 'I have seen a good film.' }, { nl: 'We zijn naar de markt geweest.', en: 'We have been to the market.' }],
    ex2: [{ nl: 'Vorige week heeft hij verhuisd.', en: 'Last week he moved house.' }, { nl: 'Heb je al gegeten?', en: 'Have you eaten already?' }],
    wb: {
      mc1: { q: 'Ik _____ een boek gelezen.', options: ['heb', 'ben', 'hebt', 'zijn'], a: 'heb', expl: 'Lezen takes hebben.' },
      fill1: { q: 'Zij is naar huis _____.', a: ['gegaan'], expl: 'Participle of gaan.' },
      tr1: { nl: 'gisteren', en: ['yesterday'], expl: 'Time marker.' },
      listen1: { q: 'Auxiliary?', audio: 'Ik ben geweest', a: 'ben', expl: 'Zijn + geweest.', options: ['ben', 'heb', 'was', 'word'] },
      match1: [{ left: 'gezien', right: 'seen' }, { left: 'gegeten', right: 'eaten' }, { left: 'gewerkt', right: 'worked' }],
      mc2: { q: 'Welke zin is correct?', options: ['Ik ben naar school geweest.', 'Ik heb naar school geweest.', 'Ik is naar school geweest.', 'Ik hebt naar school gegaan.'], a: 'Ik ben naar school geweest.', expl: 'Zijn + geweest.' },
      fill2: { q: '_____ week was ik in België.', a: ['Vorige'], expl: 'Vorige week.' },
      tr2: { en: 'I have worked today', nl: ['Ik heb vandaag gewerkt'], expl: 'Perfect with hebben.' },
      order2: { q: 'Order', items: ['heb', 'Ik', 'je', 'niet', 'gebeld', '.'], a: 'Ik heb je niet gebeld.', expl: 'Object before participle.' },
      dialogue2: { q: 'Ask if someone has already eaten.', a: ['Heb je al gegeten?', 'Hebben jullie al gegeten?'], expl: 'Perfect question.' },
      cpmc: { q: 'Participle of zien?', options: ['gezien', 'gezienen', 'zagen', 'zicht'], a: 'gezien', expl: 'Irregular gezien.' },
      err: { q: 'Fix: Ik heb naar de winkel gegaan.', a: ['Ik ben naar de winkel gegaan.'], expl: 'Gaan → zijn.' },
      read: { q: 'What did they do?', passage: 'Gisteren zijn we naar een concert geweest. We hebben genoten.', a: 'concert', expl: 'Went to a concert.', options: ['concert', 'examen', 'vergadering', 'markt'] },
      dict: { audio: 'Ik heb hard gewerkt', a: ['Ik heb hard gewerkt'], expl: 'Perfect statement.' },
      guided: { q: 'Write three things you did last weekend using the perfect tense.', model: 'Vorige weekeinde ben ik gaan wandelen. Ik heb een boek gelezen. We hebben pizza gegeten.', check: ['Uses heb/ben + participle', 'Mentions time'], expl: 'Self-assess.' },
    },
  },
];

for (const s of a2Specs) {
  quickModule({
    file: s.file, id: s.id, level: 'a2', order: s.order, title: s.title, titleNl: s.titleNl, topic: s.topic,
    grammarFocus: s.grammarFocus, vocabularyFocus: s.vocabularyFocus,
    skills: ['grammar', 'speaking', 'listening', 'writing'], description: s.description, vocabIds: s.vocabIds,
    lessonTitles: ['Core patterns', 'More practice'], explanations: [s.e1, s.e2], examples: [s.ex1, s.ex2], wordBank: s.wb,
  });
}

quickModule({
  file: 'a2-04.ts', id: 'a2-04', level: 'a2', order: 16,
  title: 'Housing and health', titleNl: 'Wonen en gezondheid', topic: 'housing-health',
  grammarFocus: ['Moeten/mogen', 'Body part possessives', 'Comparatives for housing'],
  vocabularyFocus: ['renting', 'symptoms', 'pharmacy'],
  skills: ['vocabulary', 'speaking', 'listening'],
  description: 'Handle housing issues and doctor visits.',
  vocabIds: ['vocab-a2-207', 'vocab-a2-208', 'vocab-a2-209', 'vocab-a2-210', 'vocab-a2-211', 'vocab-a2-212', 'vocab-a2-213', 'vocab-a2-214', 'vocab-a2-215', 'vocab-a2-216', 'vocab-a2-217', 'vocab-a2-218'],
  lessonTitles: ['Finding a place', 'At the doctor'],
  explanations: [
    'Housing: huur, kamer, contract, verhuurder, buren. Ik zoek een woning. De huur is te hoog.',
    'Health: Ik heb last van… / Ik voel me… Pharmacy apotheek; prescription recept. Maak een afspraak bij de huisarts.',
  ],
  examples: [
    [{ nl: 'De woning is gemeubileerd.', en: 'The flat is furnished.' }, { nl: 'Wanneer kan ik bezichtigen?', en: 'When can I view it?' }],
    [{ nl: 'Ik heb koorts sinds gisteren.', en: 'I have had a fever since yesterday.' }, { nl: 'Moet ik antibiotica slikken?', en: 'Do I need to take antibiotics?' }],
  ],
  wordBank: {
    mc1: { q: 'Huur means…', options: ['rent', 'buyer', 'garden', 'neighbour'], a: 'rent', expl: 'Huur = rent.' },
    fill1: { q: 'Ik zoek een _____.', a: ['woning', 'kamer', 'appartement'], expl: 'Looking for housing.' },
    tr1: { nl: 'huisarts', en: ['GP', 'family doctor', 'general practitioner'], expl: 'Doctor.' },
    listen1: { q: 'Symptom?', audio: 'Ik heb koorts', a: 'koorts', expl: 'Fever.', options: ['koorts', 'hoest', 'pijn', 'allergie'] },
    match1: [{ left: 'apotheek', right: 'pharmacy' }, { left: 'recept', right: 'prescription' }, { left: 'bezichtigen', right: 'to view (a home)' }],
    mc2: { q: 'Ik heb last van mijn keel. Last van means…', options: ['suffer from / bothered by', 'like', 'ignore', 'heal'], a: 'suffer from / bothered by', expl: 'Complaint pattern.' },
    fill2: { q: 'Mag ik een _____ maken?', a: ['afspraak'], expl: 'Make an appointment.' },
    tr2: { en: 'The rent is too high', nl: ['De huur is te hoog'], expl: 'Housing complaint.' },
    order2: { q: 'Order', items: ['me', 'voel', 'Ik', 'ziek', '.'], a: 'Ik voel me ziek.', expl: 'Reflexive-like voelen.' },
    dialogue2: { q: 'Ask for a viewing.', a: ['Wanneer kan ik bezichtigen?', 'Kan ik de woning bezichtigen?'], expl: 'Viewing request.' },
    cpmc: { q: 'Apotheek is…', options: ['pharmacy', 'hospital ward', 'dentist', 'ambulance'], a: 'pharmacy', expl: 'Pharmacy.' },
    err: { q: 'Fix: Ik heb pijn mijn rug.', a: ['Ik heb pijn aan mijn rug.', 'Ik heb last van mijn rug.'], expl: 'Aan / last van.' },
    read: { q: 'What does Mira need?', passage: 'Mira gaat naar de huisarts. Zij krijgt een recept voor de apotheek.', a: 'recept', expl: 'Prescription.', options: ['recept', 'huur', 'fiets', 'ticket'] },
    dict: { audio: 'Ik zoek een kamer', a: ['Ik zoek een kamer'], expl: 'Housing search.' },
    guided: { q: 'Describe a housing problem OR a health symptom in 3 sentences.', model: 'Ik huur een kamer in de stad. De verwarming doet het niet. Ik heb de verhuurder al gebeld.', check: ['Clear situation', 'Uses A2 vocabulary'], expl: 'Self-assess.' },
  },
});

quickModule({
  file: 'a2-05.ts', id: 'a2-05', level: 'a2', order: 17,
  title: 'Work, invitations, restaurants', titleNl: 'Werk, uitnodigingen, restaurants', topic: 'social-work',
  grammarFocus: ['Object pronouns', 'Imperatives polite', 'Conjunctions want/maar/dus'],
  vocabularyFocus: ['workplace', 'invitations', 'restaurant complaints'],
  skills: ['speaking', 'writing', 'listening'],
  description: 'Navigate workplace small talk, invitations, and dining out.',
  vocabIds: ['vocab-a2-219', 'vocab-a2-220', 'vocab-a2-221', 'vocab-a2-222', 'vocab-a2-223', 'vocab-a2-224', 'vocab-a2-225', 'vocab-a2-226', 'vocab-a2-227', 'vocab-a2-228', 'vocab-a2-229', 'vocab-a2-230'],
  lessonTitles: ['At work and invitations', 'In a restaurant'],
  explanations: [
    'Workplace: collega, vergadering, deadline, fulltime/parttime. Invitations: Heb je zin om…? Zin in…? Leuk, graag! / Jammer, ik kan niet.',
    'Restaurant: Een tafel voor twee. De soep is koud — polite complaint. Mag ik de rekening?',
  ],
  examples: [
    [{ nl: 'Heb je zin om te lunchen?', en: 'Do you feel like having lunch?' }, { nl: 'De vergadering begint om tien uur.', en: 'The meeting starts at ten.' }],
    [{ nl: 'Dit gerecht is niet gaar.', en: 'This dish is undercooked.' }, { nl: 'Excuses, we brengen meteen iets anders.', en: 'Sorry, we’ll bring something else right away.' }],
  ],
  wordBank: {
    mc1: { q: 'Collega means…', options: ['colleague', 'college', 'customer', 'manager only'], a: 'colleague', expl: 'Colleague.' },
    fill1: { q: 'Heb je zin _____ te komen?', a: ['om'], expl: 'Zin om te…' },
    tr1: { nl: 'uitnodiging', en: ['invitation'], expl: 'Invitation.' },
    listen1: { q: 'Response type?', audio: 'Leuk, graag', a: 'accept', expl: 'Accepting.', options: ['accept', 'refuse', 'ask price', 'order food'] },
    match1: [{ left: 'vergadering', right: 'meeting' }, { left: 'rekening', right: 'bill' }, { left: 'klacht', right: 'complaint' }],
    mc2: { q: 'Polite complaint starter?', options: ['Excuseer, maar…', 'Geef nu!', 'Dit is stom.', 'Niks zeggen'], a: 'Excuseer, maar…', expl: 'Softener.' },
    fill2: { q: 'Mag ik de _____, alstublieft?', a: ['rekening'], expl: 'Ask for the bill.' },
    tr2: { en: 'Would you like to join us?', nl: ['Heb je zin om mee te gaan?', 'Wil je meedoen?', 'Wil je meekomen?'], expl: 'Invitation.' },
    order2: { q: 'Order', items: ['niet', 'kan', 'Ik', 'jammer', 'maar', '.'], a: 'Jammer, maar ik kan niet.', expl: 'Polite refusal.' },
    dialogue2: { q: 'Invite a colleague for coffee.', a: ['Heb je zin in een koffie?', 'Zullen we koffie drinken?'], expl: 'Invitation.' },
    cpmc: { q: 'Deadline is…', options: ['deadline', 'desk', 'salary', 'holiday'], a: 'deadline', expl: 'Loanword same meaning.' },
    err: { q: 'Fix: Heb je zin van te eten?', a: ['Heb je zin om te eten?'], expl: 'Zin om te.' },
    read: { q: 'What is wrong with the dish?', passage: 'De klant zegt dat de soep koud is. De ober biedt een nieuwe soep aan.', a: 'koud', expl: 'Soup is cold.', options: ['koud', 'duur', 'zout', 'lekker'] },
    dict: { audio: 'Heb je zin om te lunchen', a: ['Heb je zin om te lunchen?', 'Heb je zin om te lunchen'], expl: 'Invitation.' },
    guided: { q: 'Write a polite restaurant complaint and a desired solution.', model: 'Excuseer, maar mijn pasta is koud. Kunt u die even opwarmen, alstublieft?', check: ['Polite tone', 'States problem', 'Asks for action'], expl: 'Self-assess.' },
  },
});

quickModule({
  file: 'a2-06.ts', id: 'a2-06', level: 'a2', order: 18,
  title: 'Feelings, culture, and messages', titleNl: 'Gevoelens, cultuur en berichten', topic: 'culture-messages',
  grammarFocus: ['Subordinate word order with omdat/dat', 'Introductory er', 'Informal vs formal emails'],
  vocabularyFocus: ['emotions', 'Dutch daily life', 'message phrases'],
  skills: ['writing', 'reading', 'grammar'],
  description: 'Express feelings, notice cultural habits, and write short messages.',
  vocabIds: ['vocab-a2-231', 'vocab-a2-232', 'vocab-a2-233', 'vocab-a2-234', 'vocab-a2-235', 'vocab-a2-236', 'vocab-a2-237', 'vocab-a2-238', 'vocab-a2-239', 'vocab-a2-240', 'vocab-a2-241', 'vocab-a2-242'],
  lessonTitles: ['Feelings and omdat', 'Messages and culture'],
  explanations: [
    'Emotions: blij, boos, verdrietig, zenuwachtig, trots. Subordinate clause: Ik ben blij omdat ik geslaagd ben (verb at end).',
    'Messages: Hoi / Beste…, Groetjes / Met vriendelijke groet. Culture tips: directness, bicycle life, coffee appointments (een kopje koffie).',
  ],
  examples: [
    [{ nl: 'Ik ben nerveus omdat ik een presentatie geef.', en: 'I am nervous because I am giving a presentation.' }, { nl: 'Er is altijd wel een oplossing.', en: 'There is always a solution.' }],
    [{ nl: 'Hoi Maya, kunnen we even bellen?', en: 'Hi Maya, can we talk on the phone briefly?' }, { nl: 'Met vriendelijke groet, Adam', en: 'Kind regards, Adam' }],
  ],
  wordBank: {
    mc1: { q: 'In omdat-clauses the finite verb usually…', options: ['goes to the end', 'stays in position two', 'is deleted', 'comes first'], a: 'goes to the end', expl: 'SOV in subordinates.' },
    fill1: { q: 'Ik ben blij _____ het weekend begint.', a: ['omdat'], expl: 'Omdat + reason.' },
    tr1: { nl: 'boos', en: ['angry'], expl: 'Emotion.' },
    listen1: { q: 'Feeling?', audio: 'Ik ben trots op je', a: 'trots', expl: 'Proud.', options: ['trots', 'boos', 'moedeloos', 'moe'] },
    match1: [{ left: 'blij', right: 'happy' }, { left: 'verdrietig', right: 'sad' }, { left: 'zenuwachtig', right: 'nervous' }],
    mc2: { q: 'Best closing for a formal email?', options: ['Met vriendelijke groet', 'Doei xxx', 'Hoi hoi', 'Later'], a: 'Met vriendelijke groet', expl: 'Formal closing.' },
    fill2: { q: '_____ is veel verkeer in de spits.', a: ['Er'], expl: 'Introductory er.' },
    tr2: { en: 'I am happy because…', nl: ['Ik ben blij omdat'], expl: 'Pattern starter.' },
    order2: { q: 'Order', items: ['omdat', 'blij', 'ben', 'Ik', 'je', 'komt', '.'], a: 'Ik ben blij omdat je komt.', expl: 'Verb komt at end.' },
    dialogue2: { q: 'Start an informal message to cancel politely.', a: ['Hoi, ik kan toch niet komen.', 'Hoi! Jammer, maar ik kan niet.'], expl: 'Informal cancel.' },
    cpmc: { q: 'Spits refers to…', options: ['rush hour', 'spice', 'sports', 'speech'], a: 'rush hour', expl: 'Peak traffic time.' },
    err: { q: 'Fix: Ik ben blij omdat ik heb geslaagd.', a: ['Ik ben blij omdat ik geslaagd ben.'], expl: 'Participle before auxiliary in subordinate.' },
    read: { q: 'Why is she proud?', passage: 'Sara is trots omdat zij haar eerste Nederlandse mail heeft gestuurd.', a: 'mail', expl: 'Sent a Dutch email.', options: ['mail', 'fiets', 'vakantie', 'huis'] },
    dict: { audio: 'Ik ben een beetje zenuwachtig', a: ['Ik ben een beetje zenuwachtig'], expl: 'Emotion sentence.' },
    guided: { q: 'Write a short formal email declining a meeting with a reason (omdat).', model: 'Beste meneer de Vries, helaas kan ik donderdag niet omdat ik bij de dokter moet zijn. Met vriendelijke groet, Nora', check: ['Greeting', 'omdat-clause', 'Closing'], expl: 'Self-assess.' },
  },
});

// B1 modules
const b1Specs = [
  {
    file: 'b1-01.ts', id: 'b1-01', order: 19, title: 'Telling detailed stories', titleNl: 'Uitgebreid vertellen', topic: 'stories',
    grammarFocus: ['Perfect vs simple past', 'Time sequencing', 'Relative die/dat'],
    vocabularyFocus: ['story connectors', 'narrative verbs'],
    description: 'Tell longer stories with clear structure.',
    vocabIds: ['vocab-b1-243', 'vocab-b1-244', 'vocab-b1-245', 'vocab-b1-246', 'vocab-b1-247', 'vocab-b1-248', 'vocab-b1-249', 'vocab-b1-250', 'vocab-b1-251', 'vocab-b1-252', 'vocab-b1-253', 'vocab-b1-254'],
    e1: 'Structure stories with eerst, daarna, toen, uiteindelijk. Spoken narratives often mix perfect and simple past (was, ging, zei).',
    e2: 'Relative clauses: de man die…, het boek dat… Keep finite verbs toward the end in the relative clause.',
    ex1: [{ nl: 'Eerst miste ik de bus, daarna begon het te regenen.', en: 'First I missed the bus, then it started raining.' }, { nl: 'Toen ik aankwam, was iedereen al weg.', en: 'When I arrived, everyone had already left.' }],
    ex2: [{ nl: 'Dat is de collega die me geholpen heeft.', en: 'That is the colleague who helped me.' }, { nl: 'Het probleem dat we bespraken, is opgelost.', en: 'The problem that we discussed has been solved.' }],
  },
  {
    file: 'b1-02.ts', id: 'b1-02', order: 20, title: 'Opinions and arguments', titleNl: 'Meningsuiting en argumenten', topic: 'opinions',
    grammarFocus: ['Ik vind dat…', 'omdat/want nuance', 'zou/zouden conditionals'],
    vocabularyFocus: ['opinion phrases', 'agree/disagree'],
    description: 'Give reasons and respond to other views.',
    vocabIds: ['vocab-b1-255', 'vocab-b1-256', 'vocab-b1-257', 'vocab-b1-258', 'vocab-b1-259', 'vocab-b1-260', 'vocab-b1-261', 'vocab-b1-262', 'vocab-b1-263', 'vocab-b1-264', 'vocab-b1-265', 'vocab-b1-266'],
    e1: 'Frames: Ik vind dat…, Volgens mij…, Aan de ene kant… aan de andere kant… Soften with misschien / het lijkt me…',
    e2: 'Hypotheticals: Als ik jou was, zou ik… Agree: Daar ben ik het mee eens. Disagree politely: Daar denk ik anders over.',
    ex1: [{ nl: 'Ik vind dat openbaar vervoer goedkoper moet zijn.', en: 'I think public transport should be cheaper.' }, { nl: 'Want is for a coordinating reason; omdat subordinates.', en: 'Want vs omdat reminder.' }],
    ex2: [{ nl: 'Als het regent, zouden we binnen kunnen eten.', en: 'If it rains, we could eat inside.' }, { nl: 'Daar ben ik het deels mee eens.', en: 'I partly agree with that.' }],
  },
  {
    file: 'b1-03.ts', id: 'b1-03', order: 21, title: 'Workplace communication', titleNl: 'Communicatie op het werk', topic: 'workplace',
    grammarFocus: ['Passives', 'om te + infinitive', 'Formal register'],
    vocabularyFocus: ['meetings', 'email verbs', 'tasks'],
    description: 'Write and speak clearly in workplace contexts.',
    vocabIds: ['vocab-b1-267', 'vocab-b1-268', 'vocab-b1-269', 'vocab-b1-270', 'vocab-b1-271', 'vocab-b1-272', 'vocab-b1-273', 'vocab-b1-274', 'vocab-b1-275', 'vocab-b1-276', 'vocab-b1-277', 'vocab-b1-278'],
    e1: 'Passive: De mail wordt vandaag verstuurd. / Het rapport is gisteren afgerond. Useful for minutes and updates.',
    e2: 'Om te expresses purpose: Ik bel om te overleggen. Formal email verbs: bevestigen, verzoeken, bijslueten, doorsturen.',
    ex1: [{ nl: 'De beslissing wordt morgen genomen.', en: 'The decision will be taken tomorrow.' }, { nl: 'Er wordt vanmiddag vergaderd.', en: 'There will be a meeting this afternoon.' }],
    ex2: [{ nl: 'Ik stuur de bijlage om te informeren.', en: 'I am sending the attachment to inform you.' }, { nl: 'Kunt u de deadline bevestigen?', en: 'Can you confirm the deadline?' }],
  },
  {
    file: 'b1-04.ts', id: 'b1-04', order: 22, title: 'News, education, career', titleNl: 'Nieuws, onderwijs, carrière', topic: 'news-career',
    grammarFocus: ['Nominalisations', 'Reported speech light', 'Complex sentences'],
    vocabularyFocus: ['media', 'study', 'career goals'],
    description: 'Discuss news, study paths, and career aims.',
    vocabIds: ['vocab-b1-279', 'vocab-b1-280', 'vocab-b1-281', 'vocab-b1-282', 'vocab-b1-283', 'vocab-b1-284', 'vocab-b1-285', 'vocab-b1-286', 'vocab-b1-287', 'vocab-b1-288', 'vocab-b1-289', 'vocab-b1-290'],
    e1: 'Read short news summaries: Volgens het artikel… Education: opleiding, stage, diploma, solliciteren.',
    e2: 'Career talk: Mijn doel is… Ik wil me ontwikkelen in… Weigh options with liever / eerder / vooral.',
    ex1: [{ nl: 'Het artikel gaat over klimaatbeleid.', en: 'The article is about climate policy.' }, { nl: 'Zij loopt stage bij een museum.', en: 'She is doing an internship at a museum.' }],
    ex2: [{ nl: 'Ik wil graag doorgroeien naar een leidinggevende rol.', en: 'I would like to progress into a leadership role.' }, { nl: 'Daarom volg ik een avondcursus.', en: 'That is why I am taking an evening course.' }],
  },
  {
    file: 'b1-05.ts', id: 'b1-05', order: 23, title: 'Problems, advice, and administration', titleNl: 'Problemen, advies en administratie', topic: 'admin',
    grammarFocus: ['Advice with zou', 'Formal vs informal', 'Expanded er'],
    vocabularyFocus: ['problems', 'advice', 'forms and agencies'],
    description: 'Give advice and handle administrative situations.',
    vocabIds: ['vocab-b1-291', 'vocab-b1-292', 'vocab-b1-293', 'vocab-b1-294', 'vocab-b1-295', 'vocab-b1-296', 'vocab-b1-297', 'vocab-b1-298', 'vocab-b1-299', 'vocab-b1-300', 'vocab-b1-301', 'vocab-b1-302'],
    e1: 'Advice: Je zou… / Misschien kun je… Problems: Het lukt niet om… Er is iets misgegaan met…',
    e2: 'Admin: formulier, aanvraag, bewijs, gemeente, afspraak maken. Switch register: informal with friends, u with officials.',
    ex1: [{ nl: 'Je zou even kunnen bellen naar de klantenservice.', en: 'You could call customer service briefly.' }, { nl: 'Er ging iets mis met mijn aanvraag.', en: 'Something went wrong with my application.' }],
    ex2: [{ nl: 'Kunt u mij zeggen welke documenten ik nodig heb?', en: 'Can you tell me which documents I need?' }, { nl: 'Ik vul het formulier online in.', en: 'I fill in the form online.' }],
  },
  {
    file: 'b1-06.ts', id: 'b1-06', order: 24, title: 'Society, travel problems, goals', titleNl: 'Samenleving, reisproblemen, doelen', topic: 'society-goals',
    grammarFocus: ['Linking arguments', 'Passives in newsy style', 'Reflective language'],
    vocabularyFocus: ['society', 'travel disruption', 'personal goals'],
    description: 'Discuss social topics, unexpected travel events, and personal goals.',
    vocabIds: ['vocab-b1-303', 'vocab-b1-304', 'vocab-b1-305', 'vocab-b1-306', 'vocab-b1-307', 'vocab-b1-308', 'vocab-b1-309', 'vocab-b1-310', 'vocab-b1-311', 'vocab-b1-312', 'vocab-b1-313', 'vocab-b1-314'],
    e1: 'Society themes: duurzaamheid, gelijkheid, wonen, werkdruk. Use connectors: bovendien, desondanks, daarom, bijvoorbeeld.',
    e2: 'Travel chaos: staking, annulering, omleiding. Goals: Ik wil binnen een jaar… Terugblikken: Wat ik geleerd heb, is…',
    ex1: [{ nl: 'Duurzaam reizen wordt steeds belangrijker.', en: 'Sustainable travel is becoming more important.' }, { nl: 'Desondanks blijven veel mensen het vliegtuig kiezen.', en: 'Nevertheless many people still choose to fly.' }],
    ex2: [{ nl: 'Door de staking zijn meerdere treinen geannuleerd.', en: 'Due to the strike several trains were cancelled.' }, { nl: 'Mijn doel is om zelfverzekerder Nederlands te spreken.', en: 'My goal is to speak Dutch more confidently.' }],
  },
];

for (const s of b1Specs) {
  const topicWord = s.topic.split('-')[0];
  quickModule({
    file: s.file, id: s.id, level: 'b1', order: s.order, title: s.title, titleNl: s.titleNl, topic: s.topic,
    grammarFocus: s.grammarFocus, vocabularyFocus: s.vocabularyFocus,
    skills: ['reading', 'writing', 'grammar', 'speaking', 'listening'], description: s.description, vocabIds: s.vocabIds,
    lessonTitles: ['Language tools', 'Putting it together'], explanations: [s.e1, s.e2], examples: [s.ex1, s.ex2],
    wordBank: {
      mc1: { q: `Core focus of this module?`, options: [s.title, 'Only alphabet', 'Only numbers', 'Cooking only'], a: s.title, expl: 'Module theme recognition.' },
      fill1: { q: 'Ik vind _____ dit een goed idee is.', a: ['dat'], expl: 'Dat-clause after vinden.' },
      tr1: { nl: 'daarom', en: ['therefore', 'that is why', "that's why"], expl: 'Connector.' },
      listen1: { q: 'Connector heard?', audio: 'Desondanks ga ik door', a: 'Desondanks', expl: 'Nevertheless.', options: ['Desondanks', 'Misschien', 'Gisteren', 'Hallo'] },
      match1: [{ left: 'doel', right: 'goal' }, { left: 'advies', right: 'advice' }, { left: 'probleem', right: 'problem' }],
      mc2: { q: 'Als ik tijd had, _____ ik helpen.', options: ['zou', 'heb', 'ben', 'was te'], a: 'zou', expl: 'Conditional zou.' },
      fill2: { q: 'De mail _____ vandaag verstuurd.', a: ['wordt', 'is'], expl: 'Passive auxiliary.' },
      tr2: { en: 'In my opinion', nl: ['Volgens mij', 'Naar mijn mening', 'Ik vind'], expl: 'Opinion frame.' },
      order2: { q: 'Order', items: ['dat', 'belangrijk', 'is', 'vind', 'Ik', '.'], a: 'Ik vind dat belangrijk.', expl: 'Opinion pattern.' },
      dialogue2: { q: 'Give one piece of polite advice using zou.', a: ['Je zou even kunnen rusten.', 'Je zou kunnen bellen.', 'Misschien zou je kunnen wachten.'], expl: 'Advice with zou.' },
      cpmc: { q: 'Relative pronoun for de-noun?', options: ['die', 'dat', 'wat always', 'wie only'], a: 'die', expl: 'die for de-words.' },
      err: { q: 'Fix: Ik vind dat hij heeft gelijk.', a: ['Ik vind dat hij gelijk heeft.'], expl: 'Verb final in dat-clause.' },
      read: { q: 'What is the writer’s goal?', passage: `Mijn doel is om beter te argumenteren in het Nederlands. Daarom oefen ik elke week met ${topicWord}.`, a: 'argumenteren', expl: 'Goal stated.', options: ['argumenteren', 'slapen', 'reizen alleen', 'koken'] },
      dict: { audio: 'Volgens mij is dat verstandig', a: ['Volgens mij is dat verstandig'], expl: 'Opinion sentence.' },
      guided: { q: `Write a short paragraph (4–5 sentences) on ${s.topic} using at least one connector and one complex clause.`, model: s.ex1[0].nl + ' ' + s.ex2[0].nl + ' Daarom blijf ik oefenen.', check: ['Connector or opinion phrase', 'Complex clause (dat/omdat/als/die)', 'On topic'], expl: 'Self-assess with the checklist.' },
    },
  });
}

// Write all modules
const results = modules.map(writeModule);

// index.ts
const index = `import type { Module } from '../types';
${results.map((r) => `import { ${r.name}, ${r.name}Exercises } from './${r.fname.replace(/\\.ts$/, '')}';`).join('\n')}

export const modules: Module[] = [
${results.map((r) => `  ${r.name},`).join('\n')}
].sort((a, b) => a.order - b.order);

export const allLessonExercises = [
${results.map((r) => `  ...${r.name}Exercises,`).join('\n')}
];
`;

fs.writeFileSync(path.join(outDir, 'index.ts'), index, 'utf8');

const totalEx = results.reduce((s, r) => s + r.exerciseCount, 0);
console.log(`Wrote ${results.length} modules, ~${totalEx} exercises`);
