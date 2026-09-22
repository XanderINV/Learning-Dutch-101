import type { ReferenceTopic } from '../types';

export const referenceTopics: ReferenceTopic[] = [
  {
    id: 'ref-pronunciation',
    title: 'Dutch pronunciation (Netherlands)',
    titleNl: 'Uitspraak (Nederland)',
    category: 'pronunciation',
    keywords: ['ui', 'ij', 'eu', 'g', 'sch', 'stress', 'klank'],
    relatedModuleIds: ['pre-a1-02'],
    content: `# Uitspraak — kernpunten

- **Ij** klinkt vaak als de Engelse klank in *eye* (bijv. *wij*, *lij*).
- **Ui** is één klank (bijv. *huis*, *muis*), geen twee losse letters.
- **Eu** komt voor in *neus*, *leuk*, *deur* — tussen *e* en *u* in.
- **G** is vaak een harde fricatief achter in de mond (*goed*, *gracht*); zachter in het zuiden, maar deze site focust op **Nederlands-Nederlands**.
- **Sch** is één cluster (*school*, *schip*).
- **Stress**: meestal op de **eerste lettergreep** (*'MAN-schap*, *'Nede-land*).

## Oefentips
1. Luister → herhaal langzaam → versnel.
2. Neem jezelf op en vergelijk met voorbeelden.
3. Leer woorden **met artikel** (*de huis* ❌ → *het huis* ✅).`,
  },
  {
    id: 'ref-pronouns',
    title: 'Personal pronouns',
    titleNl: 'Persoonlijke voornaamwoorden',
    category: 'grammar',
    keywords: ['ik', 'jij', 'u', 'zij', 'wij', 'jullie', 'formal'],
    relatedModuleIds: ['pre-a1-03', 'a1-01'],
    content: `# Persoonlijke voornaamwoorden

| Nederlands | Engels | Opmerking |
|------------|--------|-----------|
| ik | I | |
| jij / je | you (informal) | tegen vrienden, kinderen |
| u | you (formal) | beleefd, onbekenden |
| hij | he | |
| zij / ze | she | |
| het | it | voor **het-woorden** |
| wij / we | we | |
| jullie | you (plural) | |
| zij / ze | they | context bepaalt she/they |

**Tip:** In de spreektaal klinkt *jij* vaak extra beklemtoond voor contrast (*ik wel, jij niet*).`,
  },
  {
    id: 'ref-de-het',
    title: 'De and het (articles)',
    titleNl: 'De/het — lidwoorden',
    category: 'grammar',
    keywords: ['de', 'het', 'article', 'gender', 'diminutive'],
    relatedModuleIds: ['a1-03', 'a1-05'],
    content: `# De / het

- **de** — veel **personen**, beroepen, meervoud, en de meeste zelfstandige naamwoorden.
- **het** — veel **verkleinwoorden** (*het huisje*), **abstracte** begrippen (*het weer*), talen (*het Nederlands*), en vaste lijsten die je leert.

## Diminutief
Op **-je** → meestal **het**: *het meisje*, *het kopje*.

## Meervoud
In meervoud altijd **de**: *de boeken*, *de huizen*.

## Leerstrategie
Schrijf nieuwe woorden altijd als **de tafel** / **het boek**, niet los *tafel*.`,
  },
  {
    id: 'ref-verbs-present',
    title: 'Verbs in the present tense',
    titleNl: 'Werkwoorden — tegenwoordige tijd',
    category: 'grammar',
    keywords: ['present', 'conjugation', 'regular', 'irregular'],
    relatedModuleIds: ['a1-04', 'a1-08'],
    content: `# Tegenwoordige tijd

## Regelmatig (zwak)
Stam + eind: *werk → ik werk, jij werkt, wij werken*.

## Veel voorkomende onregelmatigheden
- **zijn**: ik ben, jij bent, hij is, wij zijn
- **hebben**: ik heb, jij hebt, hij heeft
- **gaan**: ik ga, jij gaat, wij gaan
- **kunnen / moeten / willen / mogen** — modalen, stamwijziging

## Inversion
Vraag: *Werk jij vandaag?* — werkwoord op positie 1, onderwerp volgt.`,
  },
  {
    id: 'ref-word-order',
    title: 'Word order in main clauses',
    titleNl: 'Woordvolgorde in hoofdzinnen',
    category: 'grammar',
    keywords: ['V2', 'inversion', 'time', 'place'],
    relatedModuleIds: ['a1-07', 'b1-02'],
    content: `# Hoofdzin (standaard)
**Onderwerp – werkwoord – rest**

- *Ik drink koffie.*
- *Morgen **ga** ik naar school.* (tijd vooraan → werkwoord op 2)

## Volgorde bij rest
Tijd – manier – plaats (TMP) is een handige richtlijn:
- *Ik ga **vanavond** **met de trein** **naar Utrecht**.*

## Ja/nee-vraag
Werkwoord eerst: *Ga jij mee?*`,
  },
  {
    id: 'ref-negation',
    title: 'Negation: niet and geen',
    titleNl: 'Ontkenning: niet en geen',
    category: 'grammar',
    keywords: ['niet', 'geen', 'negation'],
    relatedModuleIds: ['a1-05', 'a1-end'],
    content: `# Niet vs geen

- **geen** = not a / no + **onbepaald** zelfstandig naamwoord  
  *Ik drink **geen** melk.* (≠ geen melk als specifieke hoeveelheid → dan *niet*)

- **niet** ontkennt werkwoord, bijvoeglijk naamwoord, bijwoord, etc.  
  *Ik werk **niet** vandaag.*  
  *De soep is **niet** warm.*

## Plaats van niet
Meestal **eind** van de zin in A1/A2: *Ik begrijp het niet.*`,
  },
  {
    id: 'ref-perfect',
    title: 'Perfect tense (voltooid tegenwoordige tijd)',
    titleNl: 'Perfectum',
    category: 'grammar',
    keywords: ['perfect', 'hebben', 'zijn', 'voltooid deelwoord'],
    relatedModuleIds: ['a2-03'],
    content: `# Perfectum

**hebben/zijn + voltooid deelwoord**

- **hebben** — meeste werkwoorden: *Ik **heb** gewerkt.*
- **zijn** — beweging/verandering van toestand: *Ik **ben** gegaan*, *Ik **ben** ziek **geworden**.*

## Voltooid deelwoord
- Regelmatig met **ge-**: *gewerkt*, *gekookt*
- Scheidbare werkwoorden: *opgestaan* (*Ik ben opgestaan*)
- Veel starke/onregelmatige vormen: *geschreven*, *gedronken* — per woord leren.`,
  },
  {
    id: 'ref-modal-verbs',
    title: 'Modal verbs',
    titleNl: 'Modale werkwoorden',
    category: 'grammar',
    keywords: ['kunnen', 'moeten', 'willen', 'mogen', 'zullen'],
    relatedModuleIds: ['a1-08', 'b1-03'],
    content: `# Modale werkwoorden

| Werkwoord | Kernbetekenis |
|-----------|----------------|
| kunnen | can, be able |
| moeten | must, have to |
| willen | want |
| mogen | may, be allowed |
| zullen | shall, will (future) |

**Structuur:** modal + infinitief achteraan: *Ik **moet** vandaag **werken**.*`,
  },
  {
    id: 'ref-questions',
    title: 'Question words',
    titleNl: 'Vraagwoorden',
    category: 'grammar',
    keywords: ['wie', 'wat', 'waar', 'wanneer', 'hoe', 'waarom', 'hoeveel'],
    relatedModuleIds: ['a1-01', 'a1-06'],
    content: `# Vraagwoorden

- **wie** — who
- **wat** — what
- **waar** — where
- **waarom** — why
- **wanneer** — when
- **hoe** — how
- **hoeveel / hoe lang / hoe laat** — how many/much, how long, what time

Vraagzin: *Waar **woon** je?* — werkwoord op 2.`,
  },
  {
    id: 'ref-formal-informal',
    title: 'Formal and informal register',
    titleNl: 'Formeel en informeel',
    category: 'communication',
    keywords: ['u', 'jij', 'geachte', 'hoi', 'email'],
    relatedModuleIds: ['b1-05', 'b1-03'],
    content: `# Formeel vs informeel

| Situatie | Aanspreking | Groet |
|----------|-------------|-------|
| Winkel, overheid, eerste contact | **u** | Goedemiddag |
| Vrienden, familie | **jij** | Hoi / Hey |

## E-mail
- Formeel: *Geachte heer/mevrouw*, *Met vriendelijke groet*
- Informeel: *Hoi …*, *Groetjes*

**Samen Nederlands** oefent beide; kies bewust passend register.`,
  },
  {
    id: 'ref-numbers-time',
    title: 'Numbers and telling time',
    titleNl: 'Getallen en tijd',
    category: 'vocabulary',
    keywords: ['half', 'kwart', 'uur', 'getallen'],
    relatedModuleIds: ['pre-a1-04'],
    content: `# Tijd (Nederland)

- **Hoe laat is het?** — *Het is drie uur.*
- **Half acht** = **7:30** (half **naar** acht)
- **Kwart over / kwart voor** — *kwart over twee* = 2:15

## Getallen
Leer **21–99** patroon: *eenentwintig* (een + en + twintig).`,
  },
  {
    id: 'ref-separable-verbs',
    title: 'Separable verbs',
    titleNl: 'Scheidbare werkwoorden',
    category: 'grammar',
    keywords: ['opstaan', 'prefix', 'voltooid deelwoord'],
    relatedModuleIds: ['a2-02', 'a1-04'],
    content: `# Scheidbare werkwoorden

Voorvoegsel krijgt stress: **op**staan, **uit**gaan, **aan**komen.

In hoofdzin: *Ik **sta** om zeven uur **op**.*

Voltooid deelwoord: meestal **aan elkaar**: *opgestaan*, *uitgegaan*.`,
  },
];

export function searchReferenceTopics(query: string): ReferenceTopic[] {
  const q = query.trim().toLowerCase();
  if (!q) return referenceTopics;
  return referenceTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.titleNl.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q)) ||
      t.content.toLowerCase().includes(q),
  );
}
