/**
 * Generates B2 vocabulary + 6 modules for Samen Nederlands.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const vocabDir = path.join(root, 'src/content/vocabulary');
const modDir = path.join(root, 'src/content/modules');

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const vocab = [
  ['421', 'nuanceren', 'to nuance', 'verb', 'argument', 'Ik wil mijn mening nuanceren.', 'I want to nuance my opinion.'],
  ['422', 'standpunt', 'position / viewpoint', 'noun', 'argument', 'Wat is jouw standpunt?', 'What is your position?', { a: 'het', p: 'standpunten' }],
  ['423', 'tegenargument', 'counter-argument', 'noun', 'argument', 'Heb je een tegenargument?', 'Do you have a counter-argument?', { a: 'het', p: 'tegenargumenten' }],
  ['424', 'overtuigen', 'to persuade', 'verb', 'argument', 'Zij probeert ons te overtuigen.', 'She is trying to persuade us.'],
  ['425', 'relatief', 'relatively', 'adverb', 'argument', 'Dat is relatief nieuw.', 'That is relatively new.'],
  ['426', 'desalniettemin', 'nevertheless', 'adverb', 'connectors', 'Desalniettemin ga ik door.', 'Nevertheless I continue.'],
  ['427', 'hoewel', 'although', 'conjunction', 'connectors', 'Hoewel het regent, fietsen we.', 'Although it rains, we cycle.'],
  ['428', 'mits', 'provided that', 'conjunction', 'connectors', 'Je mag gaan, mits je op tijd bent.', 'You may go, provided you are on time.'],
  ['429', 'tenzij', 'unless', 'conjunction', 'connectors', 'Ik kom, tenzij de trein uitvalt.', 'I am coming unless the train is cancelled.'],
  ['430', 'enerzijds', 'on the one hand', 'adverb', 'connectors', 'Enerzijds is het handig.', 'On the one hand it is convenient.'],
  ['431', 'anderzijds', 'on the other hand', 'adverb', 'connectors', 'Anderzijds kost het tijd.', 'On the other hand it costs time.'],
  ['432', 'hypothetisch', 'hypothetical', 'adjective', 'hypothesis', 'Dit is een hypothetische situatie.', 'This is a hypothetical situation.'],
  ['433', 'zou hebben', 'would have (conditional perfect)', 'phrase', 'hypothesis', 'Ik zou het hebben gedaan.', 'I would have done it.'],
  ['434', 'onderhandelen', 'to negotiate', 'verb', 'work', 'We onderhandelen over de voorwaarden.', 'We are negotiating the terms.'],
  ['435', 'voorwaarde', 'condition', 'noun', 'work', 'Dat is een harde voorwaarde.', 'That is a hard condition.', { a: 'de', p: 'voorwaarden' }],
  ['436', 'compromis', 'compromise', 'noun', 'work', 'Laten we een compromis zoeken.', 'Let us look for a compromise.', { a: 'het', p: 'compromissen' }],
  ['437', 'deadline', 'deadline', 'noun', 'work', 'De deadline is vrijdag.', 'The deadline is Friday.', { a: 'de', p: 'deadlines' }],
  ['438', 'vergaderstukken', 'meeting documents', 'noun', 'work', 'Heb je de vergaderstukken gelezen?', 'Have you read the meeting documents?', { a: 'de' }],
  ['439', 'besluitvorming', 'decision-making', 'noun', 'work', 'De besluitvorming duurt lang.', 'Decision-making takes a long time.', { a: 'de' }],
  ['440', 'kritisch', 'critical', 'adjective', 'media', 'Lees kritisch.', 'Read critically.'],
  ['441', 'bron', 'source', 'noun', 'media', 'Controleer je bronnen.', 'Check your sources.', { a: 'de', p: 'bronnen' }],
  ['442', 'berichtgeving', 'news coverage', 'noun', 'media', 'De berichtgeving is eenzijdig.', 'The coverage is one-sided.', { a: 'de' }],
  ['443', 'desinformatie', 'disinformation', 'noun', 'media', 'Desinformatie verspreidt zich snel.', 'Disinformation spreads quickly.', { a: 'de' }],
  ['444', 'nuance', 'nuance', 'noun', 'media', 'Er mist nuance in het artikel.', 'Nuance is missing in the article.', { a: 'de', p: 'nuances' }],
  ['445', 'abstract', 'abstract', 'adjective', 'culture', 'Dit is een abstract begrip.', 'This is an abstract concept.'],
  ['446', 'interpretatie', 'interpretation', 'noun', 'culture', 'Elke interpretatie is anders.', 'Every interpretation is different.', { a: 'de', p: 'interpretaties' }],
  ['447', 'tentoonstelling', 'exhibition', 'noun', 'culture', 'De tentoonstelling is indrukwekkend.', 'The exhibition is impressive.', { a: 'de', p: 'tentoonstellingen' }],
  ['448', 'recensie', 'review', 'noun', 'culture', 'Ik schreef een recensie.', 'I wrote a review.', { a: 'de', p: 'recensies' }],
  ['449', 'literair', 'literary', 'adjective', 'culture', 'Een literaire tekst vraagt aandacht.', 'A literary text requires attention.'],
  ['450', 'perspectief', 'perspective', 'noun', 'narrative', 'Vanuit haar perspectief is het anders.', 'From her perspective it is different.', { a: 'het', p: 'perspectieven' }],
  ['451', 'flashback', 'flashback', 'noun', 'narrative', 'Het verhaal begint met een flashback.', 'The story starts with a flashback.', { a: 'de', p: 'flashbacks' }],
  ['452', 'spanningsboog', 'narrative arc', 'noun', 'narrative', 'De spanningsboog is sterk.', 'The narrative arc is strong.', { a: 'de', p: 'spanningsbogen' }],
  ['453', 'impliciet', 'implicit', 'adjective', 'narrative', 'De kritiek is impliciet.', 'The criticism is implicit.'],
  ['454', 'expliciet', 'explicit', 'adjective', 'narrative', 'Wees expliciet over je doelen.', 'Be explicit about your goals.'],
  ['455', 'studiebelasting', 'study load', 'noun', 'study', 'De studiebelasting is hoog.', 'The study load is high.', { a: 'de' }],
  ['456', 'onderzoeksvraag', 'research question', 'noun', 'study', 'Formuleer een onderzoeksvraag.', 'Formulate a research question.', { a: 'de', p: 'onderzoeksvragen' }],
  ['457', 'bronvermelding', 'citation', 'noun', 'study', 'Vergeet de bronvermelding niet.', 'Do not forget the citation.', { a: 'de', p: 'bronvermeldingen' }],
  ['458', 'samenvatten', 'to summarise', 'verb', 'study', 'Kun je de tekst samenvatten?', 'Can you summarise the text?'],
  ['459', 'parafraseren', 'to paraphrase', 'verb', 'study', 'Parafraseer de zin in eigen woorden.', 'Paraphrase the sentence in your own words.'],
  ['460', 'duurzaamheid', 'sustainability', 'noun', 'society', 'Duurzaamheid staat centraal.', 'Sustainability is central.', { a: 'de' }],
  ['461', 'ongelijkheid', 'inequality', 'noun', 'society', 'Ongelijkheid blijft een probleem.', 'Inequality remains a problem.', { a: 'de' }],
  ['462', 'participatie', 'participation', 'noun', 'society', 'Participatie van burgers is belangrijk.', 'Citizen participation is important.', { a: 'de' }],
  ['463', 'beleid', 'policy', 'noun', 'society', 'Het beleid verandert volgend jaar.', 'The policy changes next year.', { a: 'het' }],
  ['464', 'maatschappelijk', 'societal', 'adjective', 'society', 'Dit is een maatschappelijk debat.', 'This is a societal debate.'],
  ['465', 'vooruitzicht', 'prospect', 'noun', 'future', 'De vooruitzichten zijn goed.', 'The prospects are good.', { a: 'het', p: 'vooruitzichten' }],
  ['466', 'ambitie', 'ambition', 'noun', 'future', 'Zij heeft grote ambities.', 'She has big ambitions.', { a: 'de', p: 'ambities' }],
  ['467', 'scenario', 'scenario', 'noun', 'future', 'In dit scenario werken we thuis.', 'In this scenario we work from home.', { a: 'het', p: 'scenario\'s' }],
  ['468', 'waarschijnlijk', 'probably / likely', 'adverb', 'future', 'Dat is waarschijnlijk waar.', 'That is probably true.'],
  ['469', 'onwaarschijnlijk', 'unlikely', 'adjective', 'future', 'Het is onwaarschijnlijk dat hij komt.', 'It is unlikely that he is coming.'],
  ['470', 'uiteindelijk', 'ultimately / eventually', 'adverb', 'connectors', 'Uiteindelijk koos ik voor rust.', 'Ultimately I chose rest.'],
  ['471', 'desondanks', 'despite that', 'adverb', 'connectors', 'Desondanks bleef hij vriendelijk.', 'Despite that he stayed friendly.'],
  ['472', 'bovendien', 'moreover', 'adverb', 'connectors', 'Bovendien is het goedkoper.', 'Moreover it is cheaper.'],
  ['473', 'daarentegen', 'by contrast', 'adverb', 'connectors', 'Daarentegen werkt plan B beter.', 'By contrast plan B works better.'],
  ['474', 'consequentie', 'consequence', 'noun', 'argument', 'Denk aan de consequenties.', 'Think about the consequences.', { a: 'de', p: 'consequenties' }],
  ['475', 'aanname', 'assumption', 'noun', 'argument', 'Die aanname is twijfelachtig.', 'That assumption is doubtful.', { a: 'de', p: 'aannames' }],
  ['476', 'bewijs', 'evidence', 'noun', 'argument', 'Waar is het bewijs?', 'Where is the evidence?', { a: 'het' }],
  ['477', 'reflecteren', 'to reflect', 'verb', 'study', 'Reflecteer op je leerproces.', 'Reflect on your learning process.'],
  ['478', 'feedback', 'feedback', 'noun', 'work', 'Ik waardeer constructieve feedback.', 'I appreciate constructive feedback.', { a: 'de' }],
  ['479', 'prioriteit', 'priority', 'noun', 'work', 'Wat is de prioriteit vandaag?', 'What is the priority today?', { a: 'de', p: 'prioriteiten' }],
  ['480', 'stakeholders', 'stakeholders', 'noun', 'work', 'We betrekken alle stakeholders.', 'We involve all stakeholders.', { a: 'de' }],
];

function buildVocabFile() {
  const lines = vocab.map(([num, dutch, english, wordType, topic, exNl, exEn, extra]) => {
    const id = `vocab-b2-${num}`;
    const parts = [];
    if (extra?.a) parts.push(`article: '${extra.a}'`);
    if (extra?.p) parts.push(`plural: '${esc(extra.p)}'`);
    if (extra?.n) parts.push(`notes: '${esc(extra.n)}'`);
    const tail = parts.length ? `, { ${parts.join(', ')} }` : '';
    return `  buildVocab('${id}', '${esc(dutch)}', '${esc(english)}', '${wordType}', 'b2', '${esc(topic)}', '${esc(exNl)}', '${esc(exEn)}'${tail}),`;
  });
  const content = `import { buildVocab } from './buildItem';
import type { VocabularyItem } from '../types';

export const vocabularyB2Items: VocabularyItem[] = [
${lines.join('\n')}
];
`;
  fs.writeFileSync(path.join(vocabDir, 'b2.ts'), content, 'utf8');
  console.log('B2 vocab', vocab.length);
}

function renderExercise(ex) {
  return `    {
    id: '${ex.id}',
    moduleId: '${ex.moduleId}',
    ${ex.lessonId ? `lessonId: '${ex.lessonId}',` : ''}
    type: '${ex.type}',
    prompt: '${esc(ex.prompt)}',
    ${ex.promptEn ? `promptEn: '${esc(ex.promptEn)}',` : ''}
    explanation: '${esc(ex.explanation)}',
    skill: '${ex.skill}',
    difficulty: ${ex.difficulty ?? 2},
    ${ex.audioText ? `audioText: '${esc(ex.audioText)}',` : ''}
    ${ex.passage ? `passage: '${esc(ex.passage)}',` : ''}
    ${ex.modelAnswer ? `modelAnswer: '${esc(ex.modelAnswer)}',` : ''}
    ${ex.checklist ? `checklist: [${ex.checklist.map((c) => `'${esc(c)}'`).join(', ')}],` : ''}
    ${ex.options ? `options: [${ex.options.map((o) => `'${esc(o)}'`).join(', ')}],` : ''}
    ${ex.acceptedAnswers ? `acceptedAnswers: [${ex.acceptedAnswers.map((a) => `'${esc(a)}'`).join(', ')}],` : ''}
    ${ex.orderItems ? `orderItems: [${ex.orderItems.map((o) => `'${esc(o)}'`).join(', ')}],` : ''}
    ${ex.pairs ? `pairs: [${ex.pairs.map((p) => `{ left: '${esc(p.left)}', right: '${esc(p.right)}' }`).join(', ')}],` : ''}
  }`.replace(/\n\s*\n/g, '\n');
}

function makeModule(spec) {
  let n = 1;
  const push = (lessonId, obj) => {
    const id = `${spec.id}-ex-${String(n).padStart(2, '0')}`;
    n += 1;
    return { id, moduleId: spec.id, lessonId, ...obj };
  };

  const l1 = spec.bank.lesson1.map((q) => push(`${spec.id}-l1`, q));
  const l2 = spec.bank.lesson2.map((q) => push(`${spec.id}-l2`, q));
  const cp = spec.bank.checkpoint.map((q) => {
    const id = `${spec.id}-ex-${String(n).padStart(2, '0')}`;
    n += 1;
    return { id, moduleId: spec.id, ...q };
  });

  const lessonExercises = [...l1, ...l2];
  const name = 'module' + spec.id.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');

  const lessonsCode = [1, 2]
    .map((i) => {
      const lesson = spec.lessons[i - 1];
      const ids = (i === 1 ? l1 : l2).map((e) => e.id);
      return `    {
      id: '${spec.id}-l${i}',
      title: '${esc(lesson.title)}',
      objective: '${esc(lesson.objective)}',
      steps: [
        {
          type: 'explanation',
          title: '${esc(lesson.explTitle)}',
          body: '${esc(lesson.explBody)}',
        },
        {
          type: 'examples',
          title: 'In context',
          items: [
${lesson.examples.map((it) => `            { nl: '${esc(it.nl)}', en: '${esc(it.en)}' }`).join(',\n')}
          ],
        },
        {
          type: 'vocabulary',
          title: 'Key words',
          vocabularyIds: [${lesson.vocab.map((v) => `'${v}'`).join(', ')}],
        },
        {
          type: 'exercise',
          exerciseIds: [${ids.map((id) => `'${id}'`).join(', ')}],
        },
        {
          type: 'summary',
          title: 'Quick recap',
          bullets: [${lesson.recap.map((b) => `'${esc(b)}'`).join(', ')}],
        },
      ],
    }`;
    })
    .join(',\n');

  const content = `import { createModule } from './moduleFactory';
import type { Exercise } from '../types';

const lessonExercises: Exercise[] = [
${lessonExercises.map(renderExercise).join(',\n')}
];

const checkpoint: Exercise[] = [
${cp.map(renderExercise).join(',\n')}
];

export const ${name} = createModule(
  {
    id: '${spec.id}',
    level: 'b2',
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
${lessonsCode}
  ],
  lessonExercises,
  checkpoint,
);

export const ${name}Exercises = lessonExercises;
`;
  fs.writeFileSync(path.join(modDir, spec.file), content, 'utf8');
  return name;
}

const mc = (prompt, options, answer, explanation, skill = 'vocabulary', difficulty = 2) => ({
  type: 'multiple-choice',
  prompt,
  options,
  acceptedAnswers: [answer],
  explanation,
  skill,
  difficulty,
});
const fill = (prompt, answers, explanation, skill = 'grammar') => ({
  type: 'fill-blank',
  prompt,
  acceptedAnswers: Array.isArray(answers) ? answers : [answers],
  explanation,
  skill,
  difficulty: 2,
});
const tr = (prompt, answers, explanation) => ({
  type: 'translation-en-nl',
  prompt,
  acceptedAnswers: Array.isArray(answers) ? answers : [answers],
  explanation,
  skill: 'writing',
  difficulty: 3,
});
const order = (prompt, items, answer, explanation) => ({
  type: 'sentence-order',
  prompt,
  orderItems: items,
  acceptedAnswers: [answer],
  explanation,
  skill: 'grammar',
  difficulty: 2,
});
const reading = (prompt, passage, answers, options, explanation) => ({
  type: 'reading-comp',
  prompt,
  passage,
  acceptedAnswers: Array.isArray(answers) ? answers : [answers],
  options,
  explanation,
  skill: 'reading',
  difficulty: 3,
});
const guided = (prompt, modelAnswer, checklist, explanation) => ({
  type: 'guided-writing',
  prompt,
  modelAnswer,
  checklist,
  explanation,
  skill: 'writing',
  difficulty: 3,
});
const err = (prompt, answers, explanation) => ({
  type: 'error-correction',
  prompt,
  acceptedAnswers: Array.isArray(answers) ? answers : [answers],
  explanation,
  skill: 'grammar',
  difficulty: 3,
});
const listening = (prompt, audioText, answers, options, explanation) => ({
  type: 'listening',
  prompt,
  audioText,
  acceptedAnswers: Array.isArray(answers) ? answers : [answers],
  options,
  explanation,
  skill: 'listening',
  difficulty: 2,
});

const modules = [
  {
    file: 'b2-01.ts',
    id: 'b2-01',
    order: 25,
    title: 'Nuanced opinions and debate',
    titleNl: 'Nuances en debat',
    topic: 'argument',
    grammarFocus: ['hoewel/mits/tenzij', 'enerzijds/anderzijds', 'Nominal style'],
    vocabularyFocus: ['standpunt', 'tegenargument', 'nuance'],
    skills: ['writing', 'speaking', 'grammar', 'reading'],
    description: 'Argue with nuance using advanced connectors and balanced structure.',
    lessons: [
      {
        title: 'Connectors for balanced views',
        objective: 'Use hoewel, mits, tenzij, enerzijds/anderzijds.',
        explTitle: 'Beyond omdat and maar',
        explBody: 'At B2 you weigh ideas. Hoewel opens a concessive clause (verb final). Mits and tenzij set conditions. Enerzijds… anderzijds… frames two sides without sounding childish.',
        examples: [
          { nl: 'Hoewel het plan duur is, steun ik het.', en: 'Although the plan is expensive, I support it.' },
          { nl: 'Enerzijds besparen we, anderzijds investeren we.', en: 'On the one hand we save, on the other we invest.' },
        ],
        vocab: ['vocab-b2-421', 'vocab-b2-422', 'vocab-b2-426', 'vocab-b2-427', 'vocab-b2-430', 'vocab-b2-431'],
        recap: ['Hoewel + verb at end', 'Use enerzijds/anderzijds for balance'],
      },
      {
        title: 'Building a counter-argument',
        objective: 'State a position and answer a counter-argument.',
        explTitle: 'Standpunt + tegenargument',
        explBody: 'State your standpunt clearly, acknowledge a tegenargument, then respond with bewijs or a nuance. Avoid absolute claims when evidence is thin.',
        examples: [
          { nl: 'Mijn standpunt is dat thuiswerken productiever kan zijn.', en: 'My position is that working from home can be more productive.' },
          { nl: 'Een tegenargument is minder teamcontact; desalniettemin helpt digitaal overleg.', en: 'A counter-argument is less team contact; nevertheless digital meetings help.' },
        ],
        vocab: ['vocab-b2-423', 'vocab-b2-424', 'vocab-b2-474', 'vocab-b2-475', 'vocab-b2-476', 'vocab-b2-425'],
        recap: ['Acknowledge then respond', 'Prefer evidence over slogans'],
      },
    ],
    bank: {
      lesson1: [
        mc('Hoewel introduces…', ['a concessive clause', 'only past tense', 'a question tag', 'an imperative'], 'a concessive clause', 'Hoewel = although.', 'grammar'),
        fill('_____ het laat is, werk ik door.', ['Hoewel'], 'Hoewel + concession.'),
        order('Order', ['is', 'duur', 'het', 'Hoewel', ',', 'steun', 'ik', 'het', '.'], 'Hoewel het duur is, steun ik het.', 'Verb final in hoewel-clause.'),
        mc('Enerzijds pairs best with…', ['anderzijds', 'daarom alleen', 'gisteren', 'alsjeblieft'], 'anderzijds', 'Two-sided framing.', 'vocabulary'),
        listening('Which connector?', 'Desalniettemin ga ik door', 'Desalniettemin', ['Desalniettemin', 'Misschien', 'Hallo', 'Graag'], 'Nevertheless.'),
      ],
      lesson2: [
        fill('Wat is jouw _____ over dit plan?', ['standpunt'], 'Standpunt = viewpoint.'),
        tr('Translate: I want to nuance my opinion.', ['Ik wil mijn mening nuanceren.'], 'Nuanceren.'),
        err('Fix: Hoewel het is duur, koop ik het.', ['Hoewel het duur is, koop ik het.'], 'Verb goes to the end in the subordinate clause.'),
        reading('What is the writer’s move?', 'Ik erken het tegenargument over kosten. Desalniettemin zie ik langetermijnwinst.', 'acknowledges then counters', ['acknowledges then counters', 'gives up', 'asks a price', 'tells a joke'], 'Classic debate move.'),
        guided('Write 4–5 sentences: standpunt, tegenargument, response, conclusion.', 'Mijn standpunt is dat openbaar vervoer voorrang moet krijgen. Een tegenargument is de korte termijnkosten. Desalniettemin dalen de files en de uitstoot. Daarom steun ik de investering.', ['States a standpunt', 'Names a tegenargument', 'Uses a B2 connector'], 'Self-assess.'),
      ],
      checkpoint: [],
    },
  },
];

// Replace empty checkpoint with full set
modules[0].bank.checkpoint = [
  mc('Tenzij means…', ['unless', 'because', 'before', 'during'], 'unless', 'Condition of exclusion.', 'vocabulary'),
  fill('Je mag lenen, _____ je het terugbetaalt.', ['mits'], 'Mits = provided that.'),
  {
    type: 'matching',
    prompt: 'Match connectors',
    pairs: [
      { left: 'hoewel', right: 'although' },
      { left: 'desalniettemin', right: 'nevertheless' },
      { left: 'bovendien', right: 'moreover' },
    ],
    acceptedAnswers: ['hoewel=although', 'desalniettemin=nevertheless', 'bovendien=moreover'],
    explanation: 'High-frequency B2 connectors.',
    skill: 'vocabulary',
    difficulty: 2,
  },
  reading(
    'Main claim?',
    'Enerzijds is digitaal werken flexibel. Anderzijds vraagt het discipline. Uiteindelijk hangt succes af van duidelijke afspraken.',
    'success depends on clear agreements',
    ['success depends on clear agreements', 'digital work always fails', 'discipline is unimportant', 'flexibility is banned'],
    'Uiteindelijk introduces the conclusion.',
  ),
  guided(
    'Argue for or against longer library opening hours (B2 paragraph).',
    'Hoewel langere openingstijden geld kosten, verbeteren ze studiekansen. Bovendien gebruiken veel studenten de avonduren. Daarom ben ik voor een proefperiode.',
    ['Uses a concessive or two-sided connector', 'Gives a reason', 'Ends with a clear position'],
    'Self-assess.',
  ),
];

function bankFor(topicKey, words) {
  return {
    lesson1: [
      mc(`Core theme of this module?`, [topicKey, 'Only alphabet', 'Only numbers', 'Cooking recipes'], topicKey, 'Theme recognition.', 'vocabulary'),
      fill('_____ ik meer tijd had, zou ik helpen.', ['Als'], 'Conditional als-clause.'),
      order('Order', ['zou', 'Ik', 'het', 'anders', 'aanpakken', '.'], 'Ik zou het anders aanpakken.', 'Conditional zou.'),
      listening('Pick the word', words[0], words[0], [words[0], 'fiets', 'soep', 'stoel'], 'Listening recognition.'),
      tr(`Translate: ${words[1]}`, [words[1]], 'Target phrase.'),
    ],
    lesson2: [
      fill('_____ de tekst kritisch.', ['Lees', 'lees'], 'Imperative / instruction.'),
      err('Fix: Ik zou hebben het gedaan gisteren.', ['Ik zou het gisteren hebben gedaan.', 'Ik zou het hebben gedaan.'], 'Participle placement in conditional perfect.'),
      reading('Focus?', `In dit B2-onderdeel oefenen we ${topicKey}. Let op structuur en nuance.`, topicKey, [topicKey, 'spelling only', 'numbers', 'greetings'], 'Topic in passage.'),
      {
        type: 'matching',
        prompt: 'Match',
        pairs: [
          { left: 'beleid', right: 'policy' },
          { left: 'bewijs', right: 'evidence' },
          { left: 'ambitie', right: 'ambition' },
        ],
        acceptedAnswers: ['beleid=policy', 'bewijs=evidence', 'ambitie=ambition'],
        explanation: 'B2 keywords.',
        skill: 'vocabulary',
        difficulty: 2,
      },
      guided(
        `Write a short B2 paragraph about ${topicKey}.`,
        `Wat ${topicKey} betreft, vind ik dat nuance en bewijs essentieel zijn. Bovendien helpt reflectie om betere keuzes te maken.`,
        ['On topic', 'Uses at least one advanced connector', 'Clear conclusion'],
        'Self-assess.',
      ),
    ],
    checkpoint: [
      mc('B2 writing should…', ['support claims with reasons', 'only list words', 'avoid connectors', 'use only A1 phrases'], 'support claims with reasons', 'Argument quality.', 'writing'),
      fill('_____ de bronnen betrouwbaar zijn, kun je citaten gebruiken.', ['Mits', 'Als'], 'Condition.'),
      listening('Connector?', 'Bovendien is het goedkoper', 'Bovendien', ['Bovendien', 'Misschien', 'Hallo', 'Doei'], 'Moreover.'),
      reading(
        'Tone?',
        'Het artikel klinkt stellig, maar het bewijs is dun. Een kritische lezer vraagt om bronnen.',
        'critical',
        ['critical', 'celebratory', 'silent', 'childish'],
        'Critical reading.',
      ),
      guided(
        `Respond to a short prompt on ${topicKey} in 5 sentences.`,
        `Mijn standpunt over ${topicKey} is genuanceerd. Enerzijds zie ik voordelen. Anderzijds zijn er risico's. Daarom stel ik een stapsgewijze aanpak voor.`,
        ['Standpunt', 'Two sides or concession', 'Conclusion'],
        'Self-assess.',
      ),
    ],
  };
}

const more = [
  {
    file: 'b2-02.ts', id: 'b2-02', order: 26, title: 'Workplace negotiation', titleNl: 'Onderhandelen op het werk', topic: 'negotiation',
    grammarFocus: ['Polite conditionals', 'Passive in minutes', 'Formal register'],
    vocabularyFocus: ['onderhandelen', 'compromis', 'voorwaarde'],
    skills: ['speaking', 'writing', 'listening', 'grammar'],
    description: 'Negotiate deadlines, conditions, and compromises in professional Dutch.',
    lessons: [
      {
        title: 'Setting conditions politely',
        objective: 'Propose conditions with zou and mits.',
        explTitle: 'Soft power language',
        explBody: 'In meetings, soften proposals: Zou het mogelijk zijn…? We kunnen akkoord gaan, mits… Passives appear in minutes: Er werd besloten dat…',
        examples: [
          { nl: 'Zou het lukken om de deadline te verschuiven?', en: 'Would it be possible to move the deadline?' },
          { nl: 'We gaan akkoord, mits de voorwaarden duidelijk zijn.', en: 'We agree, provided the conditions are clear.' },
        ],
        vocab: ['vocab-b2-434', 'vocab-b2-435', 'vocab-b2-436', 'vocab-b2-437', 'vocab-b2-438', 'vocab-b2-439'],
        recap: ['Use zou for polite proposals', 'Record decisions with clear conditions'],
      },
      {
        title: 'Finding a compromise',
        objective: 'Offer and evaluate a compromise.',
        explTitle: 'Win–win phrasing',
        explBody: 'Name priorities, offer a compromis, and confirm next steps. Stakeholders expect clarity more than dramatic rhetoric.',
        examples: [
          { nl: 'Laten we een compromis zoeken over de planning.', en: 'Let us look for a compromise on the schedule.' },
          { nl: 'De prioriteit is kwaliteit, niet snelheid.', en: 'The priority is quality, not speed.' },
        ],
        vocab: ['vocab-b2-478', 'vocab-b2-479', 'vocab-b2-480', 'vocab-b2-437', 'vocab-b2-436', 'vocab-b2-435'],
        recap: ['State priorities', 'Confirm the deal in writing'],
      },
    ],
    bank: bankFor('negotiation', ['compromis', 'Ik wil onderhandelen']),
  },
  {
    file: 'b2-03.ts', id: 'b2-03', order: 27, title: 'Media literacy', titleNl: 'Kritisch met media', topic: 'media',
    grammarFocus: ['Reported claims', 'Hedging language', 'Complex noun phrases'],
    vocabularyFocus: ['bron', 'desinformatie', 'berichtgeving'],
    skills: ['reading', 'listening', 'writing', 'vocabulary'],
    description: 'Evaluate sources, bias, and claims in Dutch media texts.',
    lessons: [
      {
        title: 'Checking sources',
        objective: 'Ask critical questions about a news claim.',
        explTitle: 'Who says what, and based on what?',
        explBody: 'At B2, separate claim, bron, and bewijs. Hedging helps: het lijkt erop dat…, volgens de berichtgeving… Avoid repeating viral claims without checking.',
        examples: [
          { nl: 'Volgens de berichtgeving daalt de werkloosheid.', en: 'According to the coverage, unemployment is falling.' },
          { nl: 'Controleer altijd je bronnen.', en: 'Always check your sources.' },
        ],
        vocab: ['vocab-b2-440', 'vocab-b2-441', 'vocab-b2-442', 'vocab-b2-443', 'vocab-b2-444', 'vocab-b2-476'],
        recap: ['Name the source', 'Ask what evidence is missing'],
      },
      {
        title: 'Writing a critical note',
        objective: 'Summarise and critique a short article.',
        explTitle: 'Summary then judgement',
        explBody: 'First samenvatten neutrally, then add critique: eenzijdig, impliciet, of goed onderbouwd. Keep tone professional.',
        examples: [
          { nl: 'Het artikel vat het conflict samen, maar mist nuance.', en: 'The article summarises the conflict but lacks nuance.' },
          { nl: 'Desinformatie verspreidt zich sneller dan correcties.', en: 'Disinformation spreads faster than corrections.' },
        ],
        vocab: ['vocab-b2-458', 'vocab-b2-459', 'vocab-b2-453', 'vocab-b2-454', 'vocab-b2-444', 'vocab-b2-440'],
        recap: ['Neutral summary first', 'Then evaluate evidence'],
      },
    ],
    bank: bankFor('media literacy', ['bronnen', 'Lees kritisch']),
  },
  {
    file: 'b2-04.ts', id: 'b2-04', order: 28, title: 'Culture and interpretation', titleNl: 'Cultuur en interpretatie', topic: 'culture',
    grammarFocus: ['Relative clauses for detail', 'Abstract nouns', 'Opinion frames'],
    vocabularyFocus: ['interpretatie', 'tentoonstelling', 'recensie'],
    skills: ['reading', 'writing', 'speaking', 'vocabulary'],
    description: 'Discuss exhibitions, reviews, and abstract cultural ideas.',
    lessons: [
      {
        title: 'Talking about art and reviews',
        objective: 'Describe and evaluate a cultural experience.',
        explTitle: 'From concrete to abstract',
        explBody: 'Move from what you saw to interpretatie. A recensie balances description and judgement. Relative clauses add precision: het werk dat…',
        examples: [
          { nl: 'De tentoonstelling die ik bezocht, was indrukwekkend.', en: 'The exhibition I visited was impressive.' },
          { nl: 'Mijn interpretatie verschilt van de recensie.', en: 'My interpretation differs from the review.' },
        ],
        vocab: ['vocab-b2-445', 'vocab-b2-446', 'vocab-b2-447', 'vocab-b2-448', 'vocab-b2-449', 'vocab-b2-450'],
        recap: ['Describe then interpret', 'Use relative clauses for detail'],
      },
      {
        title: 'Writing a short review',
        objective: 'Produce a structured mini-recensie.',
        explTitle: 'Structure helps',
        explBody: 'Context → description → interpretation → recommendation. Keep claims fair and specific.',
        examples: [
          { nl: 'Ik raad de tentoonstelling aan vanwege de heldere opbouw.', en: 'I recommend the exhibition because of its clear structure.' },
          { nl: 'Het thema blijft soms te abstract.', en: 'The theme sometimes stays too abstract.' },
        ],
        vocab: ['vocab-b2-448', 'vocab-b2-445', 'vocab-b2-446', 'vocab-b2-450', 'vocab-b2-454', 'vocab-b2-472'],
        recap: ['Recommend with reasons', 'Mention one limitation'],
      },
    ],
    bank: bankFor('culture', ['recensie', 'De tentoonstelling is indrukwekkend']),
  },
  {
    file: 'b2-05.ts', id: 'b2-05', order: 29, title: 'Complex stories and perspective', titleNl: 'Complexe verhalen', topic: 'narrative',
    grammarFocus: ['Perspective shifts', 'Past vs perfect choices', 'Impliciet/expliciet'],
    vocabularyFocus: ['perspectief', 'spanningsboog', 'flashback'],
    skills: ['reading', 'writing', 'listening', 'grammar'],
    description: 'Follow and retell multi-layered narratives with clear perspective.',
    lessons: [
      {
        title: 'Tracking perspective',
        objective: 'Identify whose viewpoint a text uses.',
        explTitle: 'Who is telling, and what is hidden?',
        explBody: 'B2 stories may shift perspectief or use a flashback. Notice what is impliciet versus expliciet. Summarise events without inventing facts.',
        examples: [
          { nl: 'Vanuit haar perspectief voelde de reis onveilig.', en: 'From her perspective the journey felt unsafe.' },
          { nl: 'De flashback verklaart zijn twijfel.', en: 'The flashback explains his doubt.' },
        ],
        vocab: ['vocab-b2-450', 'vocab-b2-451', 'vocab-b2-452', 'vocab-b2-453', 'vocab-b2-454', 'vocab-b2-470'],
        recap: ['Name the narrator/viewpoint', 'Separate facts from hints'],
      },
      {
        title: 'Retelling with control',
        objective: 'Retell a short story with a clear arc.',
        explTitle: 'Spanningsboog',
        explBody: 'Mark begin, turning point, and ending. Choose tense consistently; mix only when the narrative needs a flashback.',
        examples: [
          { nl: 'Eerst leek alles rustig; uiteindelijk barstte het conflict los.', en: 'At first everything seemed calm; eventually the conflict erupted.' },
          { nl: 'De spanningsboog houdt de lezer vast.', en: 'The narrative arc holds the reader.' },
        ],
        vocab: ['vocab-b2-452', 'vocab-b2-470', 'vocab-b2-450', 'vocab-b2-451', 'vocab-b2-453', 'vocab-b2-454'],
        recap: ['Keep a clear arc', 'Signal flashbacks explicitly'],
      },
    ],
    bank: bankFor('narrative', ['perspectief', 'Er was een flashback']),
  },
  {
    file: 'b2-06.ts', id: 'b2-06', order: 30, title: 'Study, society, and future scenarios', titleNl: 'Studie, samenleving, toekomst', topic: 'future-society',
    grammarFocus: ['Scenario language', 'Academic phrases', 'Advanced connectors'],
    vocabularyFocus: ['onderzoeksvraag', 'beleid', 'vooruitzicht'],
    skills: ['writing', 'reading', 'speaking', 'vocabulary'],
    description: 'Discuss study skills, societal issues, and likely future scenarios.',
    lessons: [
      {
        title: 'Academic moves',
        objective: 'Formulate a research question and paraphrase.',
        explTitle: 'Study language',
        explBody: 'Use onderzoeksvraag, samenvatten, parafraseren, and bronvermelding. Reflect on studybelasting without only complaining—propose strategies.',
        examples: [
          { nl: 'Mijn onderzoeksvraag gaat over digitaal leren.', en: 'My research question is about digital learning.' },
          { nl: 'Vergeet de bronvermelding niet.', en: 'Do not forget the citation.' },
        ],
        vocab: ['vocab-b2-455', 'vocab-b2-456', 'vocab-b2-457', 'vocab-b2-458', 'vocab-b2-459', 'vocab-b2-477'],
        recap: ['Ask a clear research question', 'Cite sources'],
      },
      {
        title: 'Society and scenarios',
        objective: 'Discuss policy and probable futures.',
        explTitle: 'Likely, unlikely, ambitious',
        explBody: 'Combine maatschappelijk topics (duurzaamheid, ongelijkheid, participatie) with scenario language: waarschijnlijk, onwaarschijnlijk, vooruitzicht, ambitie.',
        examples: [
          { nl: 'In dit scenario groeit burgerparticipatie.', en: 'In this scenario citizen participation grows.' },
          { nl: 'De vooruitzichten voor duurzaam beleid zijn gemengd.', en: 'Prospects for sustainable policy are mixed.' },
        ],
        vocab: ['vocab-b2-460', 'vocab-b2-461', 'vocab-b2-462', 'vocab-b2-463', 'vocab-b2-465', 'vocab-b2-467'],
        recap: ['Link policy to consequences', 'Mark probability clearly'],
      },
    ],
    bank: bankFor('future scenarios', ['beleid', 'De vooruitzichten zijn goed']),
  },
];

modules.push(...more);

buildVocabFile();
const names = modules.map(makeModule);
console.log('B2 modules', names.join(', '));
