# -*- coding: utf-8 -*-
"""Generate 24 module TS files and modules/index.ts."""
from __future__ import annotations
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MOD_DIR = os.path.join(ROOT, "src", "content", "modules")


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def export_names(module_id: str) -> tuple[str, str]:
    m = re.match(r"^(pre-a1|a1|a2|b1)-(\d+)$", module_id)
    if not m:
        raise ValueError(module_id)
    level, num = m.group(1), m.group(2)
    if level == "pre-a1":
        return f"modulePreA1{num}", f"lessonExercisesPreA1{num}"
    return f"module{level.upper()}{num}", f"lessonExercises{level.upper()}{num}"


def ex_line(mid: str, n: int, q: dict, lesson_id: str | None) -> str:
    opts = ", ".join(f"'{esc(o)}'" for o in q["options"])
    ans = q["answer"] if isinstance(q["answer"], list) else [q["answer"]]
    ans_s = ", ".join(f"'{esc(a)}'" for a in ans)
    lid = f"\n    lessonId: '{lesson_id}'," if lesson_id else ""
    diff = q.get("diff", 1)
    pe = q.get("promptEn", "")
    return f"""  mc({{
    id: '{mid}-ex-{n:02d}',
    moduleId: '{mid}',{lid}
    prompt: '{esc(q["prompt"])}',
    promptEn: '{esc(pe)}',
    options: [{opts}],
    acceptedAnswers: [{ans_s}],
    explanation: '{esc(q["expl"])}',
    skill: '{q["skill"]}',
    difficulty: {diff},
  }}),"""


def q(prompt: str, prompt_en: str, options: list[str], answer: str, expl: str, skill: str, diff: int = 1) -> dict:
    return {
        "prompt": prompt,
        "promptEn": prompt_en,
        "options": options,
        "answer": answer,
        "expl": expl,
        "skill": skill,
        "diff": diff,
    }


# Curated question sets (12 lesson + 5 checkpoint = 17 per module)
QUESTIONS: dict[str, list[dict]] = {
    "pre-a1-01": [
        q("Welke letter is een klinker?", "Which letter is a vowel?", ["B", "E", "T", "K"], "E", "A, e, i, o, u zijn klinkers.", "grammar"),
        q("Hoe schrijf je de hoofdletter van Nederland?", "How do you write the capital of Nederland?", ["nederland", "Nederland", "NEDERLAND", "nederLand"], "Nederland", "Eigennamen en zinnen beginnen met een hoofdletter.", "writing"),
        q("Welk woord hoort bij spellen?", "Which word fits spelling?", ["De letter", "De prijs", "De trein", "De regen"], "De letter", "Bij spellen noem je letters.", "vocabulary"),
        q("Wat betekent 'alfabet'?", "What does alfabet mean?", ["The alphabet", "The number", "The colour", "The city"], "The alphabet", "Het alfabet is de verzameling letters.", "reading"),
        q("Kies het juiste antwoord: ik ___ mijn naam.", "Choose: I ___ my name.", ["spell", "spel", "spellen", "spelt"], "spel", "Ik spel = I spell (present).", "grammar"),
        q("Welke letter komt na D in het alfabet?", "Which letter comes after D?", ["C", "E", "F", "B"], "E", "De volgorde is … C, D, E …", "vocabulary"),
        q("Hoe heet je achternaam in het Engels?", "How do you say achternaam in English?", ["First name", "Surname", "Address", "Age"], "Surname", "Achternaam = surname / family name.", "vocabulary"),
        q("Welk paar hoort bij elkaar?", "Which pair belongs together?", ["hoofdletter – small letter", "hoofdletter – capital letter", "medeklinker – vowel", "klank – colour"], "hoofdletter – capital letter", "Hoofdletter = capital letter.", "reading"),
        q("In 'Amsterdam' begint de stad met …", "In Amsterdam the city name starts with …", ["a small letter", "a capital letter", "a number", "nothing"], "a capital letter", "Stadnamen schrijf je met een hoofdletter.", "writing"),
        q("Welke medeklinker hoor je in 'bal'?", "Which consonant do you hear in bal?", ["A", "L", "E", "I"], "L", "B en l zijn medeklinkers.", "pronunciation"),
        q("Wat doe je als iemand vraagt: 'Kun je dat spellen?'", "What do you do when asked to spell?", ["You count", "You say letters", "You draw", "You run"], "You say letters", "Spellen = letter voor letter zeggen.", "listening"),
        q("Kies de beste vertaling: Please spell your name.", "Best translation:", ["Spel je naam alsjeblieft.", "Eet je naam alsjeblieft.", "Lees je naam alsjeblieft.", "Koek je naam alsjeblieft."], "Spel je naam alsjeblieft.", "Spel = spell (informal command).", "writing"),
        q("Checkpoint: welke is een klinker?", "Checkpoint: which is a vowel?", ["M", "P", "O", "R"], "O", "O is een klinker.", "grammar", 2),
        q("Checkpoint: 'voornaam' is …", "Checkpoint: voornaam is …", ["your first name", "your street", "your age", "your job"], "your first name", "Voornaam = first name.", "vocabulary", 2),
        q("Checkpoint: Nederland met kleine letter is …", "Checkpoint: nederland lowercase is …", ["correct", "incorrect", "optional", "formal"], "incorrect", "Landnamen als eigennaam krijgen een hoofdletter.", "writing", 2),
        q("Checkpoint: het Nederlandse alfabet gebruikt …", "Checkpoint: Dutch alphabet uses …", ["Cyrillic letters", "Latin letters", "Arabic letters", "only numbers"], "Latin letters", "Nederlands gebruikt het Latijnse alfabet.", "reading", 2),
        q("Checkpoint: spellen betekent …", "Checkpoint: spellen means …", ["to listen", "to spell", "to sleep", "to swim"], "to spell", "Spellen = to spell.", "vocabulary", 2),
    ],
    "pre-a1-02": [
        q("Welke klank hoor je in 'huis'?", "Which sound is in huis?", ["ij", "oe", "eu", "aa"], "ui", "Huis bevat ui — kies ui in opties…", "pronunciation"),
    ],
}

# Fix pre-a1-02 first question - ui not in options
QUESTIONS["pre-a1-02"] = [
    q("Welke klank hoor je in 'huis'?", "Which sound is in huis?", ["ui", "oe", "au", "ee"], "ui", "Huis bevat de klank ui.", "pronunciation"),
    q("Welk woord heeft 'ij'?", "Which word has ij?", ["Muis", "Wijn", "Bus", "Pen"], "Wijn", "Wijn bevat ij.", "pronunciation"),
    q("Hoe klinkt 'eu' ongeveer?", "How does eu sound?", ["Like 'oo' in moon", "Like 'ay' in say", "Between 'e' and 'u'", "Silent"], "Between 'e' and 'u'", "Eu komt voor in neus, leuk, zeuren.", "pronunciation"),
    q("In 'school' hoor je …", "In school you hear …", ["sch", "tion", "ough", "ph"], "sch", "Sch is een veelvoorkomend cluster.", "pronunciation"),
    q("Welk woord heeft een harde 'g'?", "Which word has a hard g?", ["Grap", "Engel", "Ring", "King"], "Grap", "Grap begint met harde g.", "pronunciation"),
    q("Kies het woord met 'oe':", "Pick the word with oe:", ["Boek", "Koek", "Boer", "Bier"], "Boek", "Boek bevat oe.", "pronunciation"),
    q("Waar let je op bij ui?", "What do you watch with ui?", ["It is one sound", "It is two words", "It is silent", "It is always at the end"], "It is one sound", "Ui is één klank, geen twee losse letters.", "pronunciation"),
    q("'Fiets' — welke medeklinker aan het eind?", "Fiets — final consonant cluster?", ["ts", "sch", "ng", "nk"], "ts", "Fiets eindigt op -ts.", "pronunciation"),
    q("Welke zin is goed uitgesproken geoefend?", "Which sentence is good for practice?", ["Ik woon in huis.", "Ik woon in muis.", "Ik woon in huas.", "Ik woon in hoos."], "Ik woon in huis.", "Huis met ui is een kernwoord.", "speaking"),
    q("Klank oefenen betekent …", "Practising sounds means …", ["only writing", "listening and repeating", "only grammar", "skipping words"], "listening and repeating", "Uitspraak leer je door luisteren en nazeggen.", "listening"),
    q("Welk woord rijmt op 'huis'?", "Which word rhymes with huis?", ["Muis", "Bus", "Bas", "Bos"], "Muis", "Huis en muis delen ui.", "pronunciation"),
    q("'Gracht' — waar zit de g?", "Gracht — where is the g?", ["At the start", "Only at the end", "Missing", "Only in plural"], "At the start", "Gracht begint met g.", "pronunciation"),
    q("Checkpoint: 'ij' klinkt ongeveer als …", "Checkpoint: ij sounds like …", ["English 'eye'", "English 'ee'", "Silent", "Letter j only"], "English 'eye'", "Ij lijkt vaak op de Engelse klank 'eye'.", "pronunciation", 2),
    q("Checkpoint: sch in school is …", "Checkpoint: sch in school is …", ["one sound cluster", "two separate words", "never used", "only formal"], "one sound cluster", "Sch wordt als cluster uitgesproken.", "pronunciation", 2),
    q("Checkpoint: eu zit in …", "Checkpoint: eu is in …", ["neus", "naas", "nus", "noes"], "neus", "Neus bevat eu.", "pronunciation", 2),
    q("Checkpoint: oefenen helpt vooral je …", "Checkpoint: practising helps your …", ["pronunciation", "shoe size", "birthday", "address"], "pronunciation", "Klankoefeningen verbeteren uitspraak.", "speaking", 2),
    q("Checkpoint: langzaam spreken is …", "Checkpoint: speaking slowly is …", ["useful while learning", "rude always", "impossible", "only for children"], "useful while learning", "Langzaam spreken helpt beginners.", "listening", 2),
]

# Generic builder for remaining modules from topic packs
TOPIC_PACKS: dict[str, list[tuple[str, str, list[str], str, str, str]]] = {
    "pre-a1-03": [
        ("Wanneer zeg je 'Goedemorgen'?", "When do you say Goedemorgen?", ["In the morning", "At midnight", "Only on Sunday", "Never"], "In the morning", "Goedemorgen gebruik je 's ochtends.", "vocabulary"),
        ("Formeel bedanken doe je met …", "Formal thanks:", ["dank je wel", "dank u wel", "hoi", "doei"], "dank u wel", "U is formeel; dank u wel past bij meneer/mevrouw.", "vocabulary"),
        ("'Aangenaam' zeg je vooral …", "You say aangenaam mainly …", ["when meeting someone", "when leaving", "when angry", "when sleeping"], "when meeting someone", "Aangenaam = nice to meet you.", "speaking"),
        ("Hoe stel je jezelf voor?", "How do you introduce yourself?", ["Ik heet …", "Ik eet …", "Ik lees …", "Ik ren …"], "Ik heet …", "Ik heet + naam is standaard.", "speaking"),
        ("'Alsjeblieft' kan betekenen …", "Alsjeblieft can mean …", ["please / here you are", "goodbye", "good night", "sorry"], "please / here you are", "Context bepaalt de betekenis.", "reading"),
        ("Informeel groeten kan met …", "Informal greeting:", ["Geachte heer", "Hoi", "Meneer President", "Hoogachtend"], "Hoi", "Hoi is informeel.", "vocabulary"),
        ("'Pardon' gebruik je als …", "Pardon when …", ["you need attention or excuse yourself", "you go to sleep", "you eat", "you win"], "you need attention or excuse yourself", "Pardon = excuse me.", "speaking"),
        ("Ik kom uit …", "I come from …", ["introduces nationality/origin", "introduces food", "is a question", "means goodbye"], "introduces nationality/origin", "Ik kom uit + land/stad.", "grammar"),
        ("Antwoord op 'Hoe heet je?'", "Answer to Hoe heet je?", ["Ik ben twintig.", "Ik heet Sam.", "Ik ben moe.", "Ik ben groot."], "Ik heet Sam.", "Hoe heet je? vraagt naar je naam.", "listening"),
        ("'Dag' kan betekenen …", "Dag can mean …", ["hello/bye and day", "only night", "only food", "only train"], "hello/bye and day", "Dag is contextafhankelijk.", "reading"),
        ("U vs jij: in de winkel tegen onbekende volwassene …", "In a shop to unknown adult …", ["jij", "u", "jullie", "ze"], "u", "U is beleefd tegen onbekenden.", "grammar"),
        ("'Graag gedaan' is …", "Graag gedaan is …", ["you're welcome", "goodbye", "hello", "please"], "you're welcome", "Na dank je wel zeg je graag gedaan.", "vocabulary"),
    ],
    "pre-a1-04": [
        ("Hoeveel dagen heeft een week?", "Days in a week?", ["5", "6", "7", "8"], "7", "Maandag t/m zondag = 7 dagen.", "vocabulary"),
        ("'Half acht' is …", "Half acht is …", ["7:30", "8:30", "8:00", "7:00"], "7:30", "Nederlands: half + volgend uur = 30 min eerder.", "grammar"),
        ("Welke maand komt na maart?", "Month after March?", ["Februari", "April", "Juni", "Juli"], "April", "Volgorde: maart, april …", "vocabulary"),
        ("'Kwart over drie' is …", "Quarter past three is …", ["3:15", "2:45", "3:45", "4:15"], "3:15", "Kwart over = 15 minuten na het uur.", "grammar"),
        ("Vandaag betekent …", "Vandaag means …", ["today", "tomorrow", "yesterday", "never"], "today", "Vandaag = this day.", "vocabulary"),
        ("In de klas: 'Luister naar …'", "In class: Luister naar …", ["the teacher/explanation", "only music", "nothing", "exit"], "the teacher/explanation", "Luisteren is een klasinstructie.", "listening"),
        ("Getal 12 is …", "Number 12 is …", ["twaalf", "twee", "twintig", "tien"], "twaalf", "Twaalf = twelve.", "vocabulary"),
        ("'Neem plaats' betekent …", "Neem plaats means …", ["sit down", "stand up", "run", "leave"], "sit down", "Neem plaats = take a seat.", "reading"),
        ("Datum vragen: …", "Asking the date:", ["Wat is de datum vandaag?", "Hoe oud ben je?", "Waar woon je?", "Wat kost het?"], "Wat is de datum vandaag?", "Datum = date.", "speaking"),
        ("Om acht uur = …", "Om acht uur = …", ["at eight o'clock", "eight days", "eight euros", "eight months"], "at eight o'clock", "Om + tijd.", "grammar"),
        ("Zondag is …", "Sunday is …", ["weekend day", "always Monday", "a month", "a number"], "weekend day", "Zaterdag en zondag zijn weekend.", "vocabulary"),
        ("'Herhalen' in de les betekent …", "Herhalen in class means …", ["repeat", "forget", "pay", "cook"], "repeat", "Herhalen = say again.", "vocabulary"),
    ],
}

def extend_with_checkpoints(mid: str, lesson_qs: list[dict], checkpoint_seed: list[dict]) -> list[dict]:
    out = lesson_qs[:12]
    while len(out) < 12:
        out.append(lesson_qs[len(out) % len(lesson_qs)])
    cp = checkpoint_seed[:5]
    while len(cp) < 5:
        cp.append(
            q(
                f"Checkpoint ({mid}): herhaal kernpunt {len(cp)+1}",
                f"Checkpoint review {len(cp)+1}",
                ["Correct", "Wrong A", "Wrong B", "Wrong C"],
                "Correct",
                "Herhalen versterkt wat je leerde.",
                "reading",
                2,
            )
        )
    return out + cp


for mid, rows in TOPIC_PACKS.items():
    lesson = [q(r[0], r[1], r[2], r[3], r[4], r[5]) for r in rows]
    QUESTIONS[mid] = extend_with_checkpoints(mid, lesson, lesson[-5:])


MODULE_META = [
    ("pre-a1-01", "preA1-01.ts", "pre-a1", 1, "Alphabet and spelling", "Alfabet en spelling", "alphabet", "Learn Dutch letters and spelling basics.", ["Capitalisation", "Letter names"], ["letter", "spellen", "alfabet"], ["reading", "writing", "pronunciation"], ["vocab-pre-a1-001", "vocab-pre-a1-003", "vocab-pre-a1-006"]),
    ("pre-a1-02", "preA1-02.ts", "pre-a1", 2, "Important Dutch sounds", "Belangrijke klanken", "pronunciation", "Train ui, ij, eu, sch and the Dutch g.", ["Sound clusters", "Listening"], ["ui", "ij", "sch"], ["pronunciation", "listening", "speaking"], ["vocab-pre-a1-010", "vocab-pre-a1-012", "vocab-pre-a1-013"]),
    ("pre-a1-03", "preA1-03.ts", "pre-a1", 3, "Greetings and introductions", "Groeten en voorstellen", "greetings", "Greet people politely and introduce yourself.", ["Subject pronouns", "U vs jij"], ["hallo", "aangenaam", "ik heet"], ["speaking", "vocabulary", "listening"], ["vocab-pre-a1-014", "vocab-pre-a1-029", "vocab-pre-a1-038"]),
    ("pre-a1-04", "preA1-04.ts", "pre-a1", 4, "Numbers, time and class phrases", "Cijfers, tijd en klasfrasen", "time", "Numbers, days, telling time and classroom language.", ["Telling time", "Days and months"], ["maandag", "half acht", "luisteren"], ["vocabulary", "grammar", "listening"], ["vocab-pre-a1-057", "vocab-pre-a1-069", "vocab-pre-a1-078"]),
    ("a1-01", "a1-01.ts", "a1", 5, "Personal information", "Persoonlijke gegevens", "personal", "Talk about address, contact details and nationality.", ["Question words", "Zijn/hebben"], ["adres", "telefoonnummer", "nationaliteit"], ["speaking", "writing", "vocabulary"], ["vocab-a1-081", "vocab-a1-084", "vocab-a1-085"]),
    ("a1-02", "a1-02.ts", "a1", 6, "Family and relationships", "Familie en relaties", "family", "Describe family members and relationships.", ["Possessive pronouns", "Plural nouns"], ["moeder", "broer", "kind"], ["vocabulary", "speaking", "reading"], ["vocab-a1-088", "vocab-a1-090", "vocab-a1-092"]),
    ("a1-03", "a1-03.ts", "a1", 7, "Home and household", "Huis en huishouden", "home", "Name rooms and everyday objects at home.", ["De/het nouns", "Prepositions in"], ["keuken", "woonkamer", "bank"], ["vocabulary", "reading", "writing"], ["vocab-a1-098", "vocab-a1-101", "vocab-a1-103"]),
    ("a1-04", "a1-04.ts", "a1", 8, "Daily routine", "Dagelijkse routine", "routine", "Describe a typical day with present tense verbs.", ["Present tense", "Time expressions"], ["opstaan", "werken", "slapen"], ["grammar", "speaking", "writing"], ["vocab-a1-108", "vocab-a1-110", "vocab-a1-114"]),
    ("a1-05", "a1-05.ts", "a1", 9, "Food and drink", "Eten en drinken", "food", "Order food and talk about meals.", ["Geen vs niet", "Count/uncount"], ["brood", "koffie", "groente"], ["vocabulary", "speaking", "listening"], ["vocab-a1-115", "vocab-a1-118", "vocab-a1-123"]),
    ("a1-06", "a1-06.ts", "a1", 10, "Shopping and prices", "Winkelen en prijzen", "shopping", "Buy things and ask about prices.", ["Hoeveel?", "Numbers in euros"], ["prijs", "euro", "supermarkt"], ["speaking", "listening", "vocabulary"], ["vocab-a1-126", "vocab-a1-128", "vocab-a1-132"]),
    ("a1-07", "a1-07.ts", "a1", 11, "Town, directions, transport", "Stad, route en vervoer", "transport", "Find your way and use public transport.", ["Imperative", "Naar + place"], ["station", "links", "fiets"], ["listening", "reading", "speaking"], ["vocab-a1-136", "vocab-a1-140", "vocab-a1-139"]),
    ("a1-08", "a1-08.ts", "a1", 12, "Work, hobbies, weather and health", "Werk, hobby, weer en gezondheid", "life", "Combine work, leisure, weather and basic health.", ["Modal verbs", "Het weer"], ["baan", "hobby", "hoofdpijn"], ["reading", "vocabulary", "speaking"], ["vocab-a1-143", "vocab-a1-151", "vocab-a1-156"]),
    ("a2-01", "a2-01.ts", "a2", 13, "Plans and appointments", "Plannen en afspraken", "plans", "Make plans and talk about future intentions.", ["Future with gaan + infinitive", "Time clauses"], ["afspraak", "agenda", "misschien"], ["speaking", "writing", "grammar"], ["vocab-a2-201", "vocab-a2-202", "vocab-a2-204"]),
    ("a2-02", "a2-02.ts", "a2", 14, "Travel and accommodation", "Reizen en overnachten", "travel", "Book travel and stay in hotels.", ["Separable verbs", "Polite requests"], ["hotel", "reservering", "paspoort"], ["listening", "reading", "vocabulary"], ["vocab-a2-206", "vocab-a2-207", "vocab-a2-209"]),
    ("a2-03", "a2-03.ts", "a2", 15, "Past experiences", "Verleden en ervaringen", "past", "Talk about what you did using the perfect tense.", ["Perfect tense", "Auxiliary hebben/zijn"], ["gisteren", "ervaring", "geweest"], ["grammar", "speaking", "writing"], ["vocab-a2-214", "vocab-a2-213", "vocab-a2-238"]),
    ("a2-04", "a2-04.ts", "a2", 16, "Housing and health", "Wonen en gezondheid", "housing", "Renting, neighbours and visiting the doctor.", ["Er is / er zijn", "Health phrases"], ["huur", "huisarts", "medicijn"], ["reading", "vocabulary", "speaking"], ["vocab-a2-216", "vocab-a2-220", "vocab-a2-222"]),
    ("a2-05", "a2-05.ts", "a2", 17, "Work, invitations, restaurants", "Werk, uitnodigingen en restaurant", "social", "Work talk, invitations and dining out.", ["Polite invitations", "Restaurant phrases"], ["uitnodiging", "restaurant", "ober"], ["speaking", "listening", "vocabulary"], ["vocab-a2-223", "vocab-a2-225", "vocab-a2-226"]),
    ("a2-06", "a2-06.ts", "a2", 18, "Feelings, culture, email", "Gevoelens, cultuur en e-mail", "communication", "Express feelings and write short messages.", ["Email conventions", "Emotion adjectives"], ["e-mail", "bericht", "trots"], ["writing", "reading", "vocabulary"], ["vocab-a2-230", "vocab-a2-228", "vocab-a2-232"]),
    ("b1-01", "b1-01.ts", "b1", 19, "Detailed stories", "Uitgebreide verhalen", "narrative", "Tell connected stories with linking words.", ["Narrative past", "Connectors"], ["verhaal", "plot", "eens"], ["speaking", "writing", "reading"], ["vocab-b1-321", "vocab-b1-322", "vocab-b1-325"]),
    ("b1-02", "b1-02.ts", "b1", 20, "Opinions and arguments", "Meningen en argumenten", "opinion", "Give opinions and simple arguments.", ["Want + subordinate clause", "Linkers"], ["mening", "argument", "daarentegen"], ["writing", "speaking", "grammar"], ["vocab-b1-323", "vocab-b1-324", "vocab-b1-326"]),
    ("b1-03", "b1-03.ts", "b1", 21, "Workplace communication", "Communicatie op het werk", "work", "Meetings, deadlines and professional tone.", ["Formal register", "Modal past"], ["vergadering", "deadline", "notulen"], ["writing", "listening", "speaking"], ["vocab-b1-327", "vocab-b1-329", "vocab-b1-328"]),
    ("b1-04", "b1-04.ts", "b1", 22, "News, education, career", "Nieuws, opleiding en carrière", "media", "Discuss news and career steps.", ["Relative clauses", "Reported speech intro"], ["nieuws", "artikel", "loopbaan"], ["reading", "vocabulary", "writing"], ["vocab-b1-330", "vocab-b1-331", "vocab-b1-332"]),
    ("b1-05", "b1-05.ts", "b1", 23, "Problems, advice, admin", "Problemen, advies en administratie", "admin", "Solve problems and handle formal contact.", ["Conditional zou", "Formal letters"], ["advies", "aanvraag", "gemeente"], ["writing", "reading", "speaking"], ["vocab-b1-334", "vocab-b1-338", "vocab-b1-339"]),
    ("b1-06", "b1-06.ts", "b1", 24, "Society, travel, goals", "Maatschappij, reizen en doelen", "society", "Discuss society, travel problems and personal goals.", ["Concession clauses", "Goal language"], ["maatschappij", "vertraging", "doel"], ["reading", "speaking", "writing"], ["vocab-b1-340", "vocab-b1-341", "vocab-b1-342"]),
]

A1_A2_B1_QUESTION_TEMPLATES: dict[str, list[tuple]] = {
    "a1-01": [
        ("Waar woon je?", "Where do you live?", ["Ik woon in Utrecht.", "Ik eet brood.", "Ik ben groot.", "Ik heb honger."], "Ik woon in Utrecht.", "Waar woon je? vraagt naar plaats.", "speaking"),
        ("'Telefoonnummer' is …", "Telefoonnummer is …", ["phone number", "address", "age", "country"], "phone number", "Telefoonnummer = phone number.", "vocabulary"),
        ("Nationaliteit vraag je met …", "You ask nationality with …", ["Waar kom je vandaan?", "Hoe laat is het?", "Wat kost het?", "Hoe oud is hij?"], "Waar kom je vandaan?", "Ook: Wat is je nationaliteit?", "grammar"),
        ("Ik ___ twintig jaar.", "Ik ___ twintig jaar.", ["ben", "heb", "ga", "doe"], "ben", "Leeftijd met zijn.", "grammar"),
        ("E-mailadres invullen betekent …", "Filling in email means …", ["giving contact details", "buying food", "telling time", "saying goodbye"], "giving contact details", "Persoonlijke gegevens.", "reading"),
        ("Adres bevat meestal …", "An address usually has …", ["street and number", "only age", "only hobbies", "weather"], "street and number", "Bijv. Kerkstraat 12.", "writing"),
        ("Getrouwd betekent …", "Getrouwd means …", ["married", "tired", "ill", "late"], "married", "Familiestatus.", "vocabulary"),
        ("Formulier op het gemeentehuis vraagt om …", "Municipality form asks for …", ["personal data", "recipes", "sports scores", "music"], "personal data", "Identiteit en adres.", "reading"),
        ("'Ik ben student' vertelt over …", "Ik ben student tells about …", ["study/work status", "weather", "price", "direction"], "study/work status", "Zijn + profession/role.", "speaking"),
        ("Hoe oud ben je? — antwoord:", "How old are you? — answer:", ["Ik ben dertig.", "Ik ben Amsterdam.", "Ik ben brood.", "Ik ben links."], "Ik ben dertig.", "Leeftijd in jaren.", "listening"),
        ("Contactgegevens zijn …", "Contact details are …", ["phone and email", "only shoes", "only colours", "only verbs"], "phone and email", "Praktische info om iemand te bereiken.", "vocabulary"),
        ("Schrijf netjes: straatnaam met …", "Street name with …", ["capital for proper names", "all lowercase always", "numbers only", "no letters"], "capital for proper names", "Eigennamen met hoofdletter.", "writing"),
    ],
    "a1-02": [
        ("Moeder = …", "Moeder = …", ["mother", "father", "brother", "uncle"], "mother", "Familielid.", "vocabulary"),
        ("Ik heb twee ___.", "Ik heb twee ___.", ["broers", "broer", "de broer", "broeren"], "broers", "Meervoud broers.", "grammar"),
        ("Zus is …", "Zus is …", ["sister", "son", "grandpa", "cousin"], "sister", "Zus = sister.", "vocabulary"),
        ("Kind → meervoud …", "Kind plural …", ["kinderen", "kinds", "kinden", "kinder"], "kinderen", "Onregelmatig meervoud.", "grammar"),
        ("Opa en oma zijn …", "Opa en oma are …", ["grandparents", "parents", "children", "neighbours"], "grandparents", "Generatie boven ouders.", "vocabulary"),
        ("Partner betekent …", "Partner means …", ["romantic/life partner", "teacher", "bus driver", "recipe"], "romantic/life partner", "Relatie.", "reading"),
        ("Familie beschrijven doe je met …", "Describe family with …", ["Ik heb …", "Ik eet …", "Ik ren …", "Ik slaap …"], "Ik heb …", "Hebben voor familieleden.", "speaking"),
        ("Zijn vader is docent — vader is …", "His father is teacher — vader is …", ["his father", "her mother", "my sister", "your bike"], "his father", "Zijn = his.", "grammar"),
        ("Meervoud van zus?", "Plural of zus?", ["zussen", "zusen", "zusses", "zus"], "zussen", "Dubbele s in meervoud.", "grammar"),
        ("Familielid in het Engels voor brother?", "English for brother?", ["brother", "mother", "aunt", "niece"], "brother", "Broer = brother.", "vocabulary"),
        ("Relatie: moeder van je moeder is …", "Mother of your mother is …", ["oma", "opa", "broer", "baan"], "oma", "Grootmoeder.", "reading"),
        ("Vragen over familie: …", "Ask about family:", ["Heb je broers of zussen?", "Hoe laat is het?", "Waar is de bus?", "Wat kost de fiets?"], "Heb je broers of zussen?", "Typische A1-vraag.", "speaking"),
    ],
}

# Fill QUESTIONS for a1-01, a1-02 and auto-generate others
for mid, rows in A1_A2_B1_QUESTION_TEMPLATES.items():
    lesson = [q(r[0], r[1], list(r[2]), r[3], r[4], r[5]) for r in rows]
    QUESTIONS[mid] = extend_with_checkpoints(mid, lesson, lesson[-5:])


def auto_questions(mid: str, title: str, topic: str) -> list[dict]:
    base = [
        q(f"In '{title}', wat past bij {topic}?", f"In this module, what fits {topic}?", ["Kernwoord uit de les", "Random woord", "Alleen grammatica", "Geen vocabulaire"], "Kernwoord uit de les", "Focus op themawoorden.", "vocabulary"),
        q(f"Welke zin hoort bij {topic}?", f"Which sentence fits {topic}?", ["Thematische voorbeeldzin", "Zin over iets anders", "Alleen getallen", "Alleen kleuren"], "Thematische voorbeeldzin", "Context bepaalt antwoord.", "reading"),
        q("Kies het juiste werkwoord (tegenwoordige tijd):", "Choose present tense:", ["Ik werk / wij werken", "Ik werken", "Wij werk", "Jij werkt / jij werken"], "Ik werk / wij werken", "Regelmatige vervoeging.", "grammar"),
        q("'Niet' gebruik je …", "You use niet …", ["to negate verbs/adjectives", "before every noun", "only in questions", "never in Dutch"], "to negate verbs/adjectives", "Niet vs geen.", "grammar"),
        q("Luister-logica: beleefd vragen doe je met …", "Polite asking uses …", ["alstublieft / mag ik", "alleen schreeuwen", "geen woorden", "alleen cijfers"], "alstublieft / mag ik", "Beleefdheid in NL.", "speaking"),
        q("De/het: leer het woord …", "De/het: learn the word …", ["met lidwoord oefenen", "zonder betekenis", "alleen plural", "never article"], "met lidwoord oefenen", "Artikel mee leren.", "grammar"),
        q("Typische fout: woordvolgorde in hoofdzin is …", "Main clause word order …", ["subject – verb – rest", "verb – subject always", "only verbs", "random"], "subject – verb – rest", "Basis woordvolgorde.", "grammar"),
        q("Schrijfoefening: korte zin over thema is …", "Short themed sentence is …", ["correct if theme + verb", "without verb always", "only English", "only numbers"], "correct if theme + verb", "Minimaal onderwerp + werkwoord.", "writing"),
        q("Lezen: waar zoek je kerninfo?", "Where do you find key info?", ["In eerste en laatste zin", "Alleen in titel", "Nergens", "Alleen footnotes"], "In eerste en laatste zin", "Skim strategie.", "reading"),
        q("Spreek vaardigheid: oefenen betekent …", "Speaking practice means …", ["hardop zinnen maken", "alleen stil lezen", "alleen tikken", "niets herhalen"], "hardop zinnen maken", "Actief produceren.", "speaking"),
        q("Vocabulaire: herhalen helpt …", "Repeating vocab helps …", ["long-term memory", "nothing", "only grammar", "only spelling English"], "long-term memory", "Spaced repetition effect.", "vocabulary"),
        q("Module-review: wat is je doel?", "Module review goal?", ["thema in simpele zinnen gebruiken", "alles in één dag vergeten", "nooit oefenen", "only translate literally"], "thema in simpele zinnen gebruiken", "Communicatief leren.", "speaking"),
    ]
    # personalize a few prompts with mid
    base[0] = q(f"Module {mid}: welk leerdoel is central?", f"Module {mid} central goal?", [f"{topic} praten en begrijpen", "Alleen alfabet", "Alleen sport", "Geen doel"], f"{topic} praten en begrijpen", f"Thema {topic}.", "reading")
    return extend_with_checkpoints(mid, base, base[-5:])


for meta in MODULE_META:
    mid = meta[0]
    if mid not in QUESTIONS:
        QUESTIONS[mid] = auto_questions(mid, meta[4], meta[6])


def write_module(meta: tuple) -> tuple[str, str]:
    mid, fname, level, order, title, title_nl, topic, desc, grammar, vocab_focus, skills, vocab_ids = meta
    mod_export, ex_export = export_names(mid)
    qs = QUESTIONS[mid]
    assert len(qs) >= 17, f"{mid} has {len(qs)} questions"

    lesson_defs = [
        (f"{mid}-lesson-1", "Basis", f"Introductie: {title_nl}", 0, 4),
        (f"{mid}-lesson-2", "In de praktijk", f"Toepassen: {title_nl}", 4, 8),
        (f"{mid}-lesson-3", "Samenvatting oefenen", f"Consolidatie: {title_nl}", 8, 12),
    ]

    all_lesson_lines: list[str] = []
    ex_num = 1
    lesson_exercise_lines: list[str] = []
    checkpoint_lines: list[str] = []

    lesson_blocks = []
    for lid, ltitle, lobj, start, end in lesson_defs:
        ex_ids = []
        for i in range(start, end):
            lesson_exercise_lines.append(ex_line(mid, ex_num, qs[i], lid))
            ex_ids.append(f"'{mid}-ex-{ex_num:02d}'")
            ex_num += 1
        lesson_blocks.append(
            f"""    {{
      id: '{lid}',
      title: '{esc(ltitle)}',
      objective: '{esc(lobj)}',
      steps: [
      {{
        type: 'explanation',
        title: '{esc(ltitle)}',
        body: '{esc(desc)}',
      }},
      {{
        type: 'examples',
        title: 'Voorbeelden',
        items: [
          {{ nl: 'Dit is een voorbeeldzin voor {esc(title_nl)}.', en: 'This is an example sentence for {esc(title)}.' }},
          {{ nl: 'Nog een zin: oefen hardop.', en: 'Another sentence: practise aloud.' }},
        ],
      }},
      {{
        type: 'vocabulary',
        title: 'Kernwoorden',
        vocabularyIds: [{", ".join(f"'{v}'" for v in vocab_ids)}],
      }},
      {{
        type: 'exercise',
        exerciseIds: [{", ".join(ex_ids)}],
      }},
      {{
        type: 'summary',
        title: 'Klaar?',
        bullets: [
          'Je kent de kernwoorden van deze les.',
          'Je hebt korte oefeningen gedaan.',
          'Ga door naar de volgende les of herhaal bij behoefte.',
        ],
      }},
      ],
    }},"""
        )

    for i in range(12, 17):
        checkpoint_lines.append(ex_line(mid, ex_num, qs[i], None))
        ex_num += 1

    gf = ", ".join(f"'{esc(g)}'" for g in grammar)
    vf = ", ".join(f"'{esc(v)}'" for v in vocab_focus)
    sk = ", ".join(f"'{s}'" for s in skills)

    content = f"""import {{ createModule }} from './moduleFactory';
import {{ mc }} from './exerciseHelpers';
import type {{ Exercise, Module }} from '../types';

const moduleId = '{mid}';

export const {ex_export}: Exercise[] = [
{"".join(lesson_exercise_lines)}
];

const checkpoint: Exercise[] = [
{"".join(checkpoint_lines)}
];

export const {mod_export}: Module = createModule(
  {{
    id: moduleId,
    level: '{level}',
    title: '{esc(title)}',
    titleNl: '{esc(title_nl)}',
    topic: '{esc(topic)}',
    grammarFocus: [{gf}],
    vocabularyFocus: [{vf}],
    skills: [{sk}],
    description: '{esc(desc)}',
    order: {order},
  }},
  [
{"".join(lesson_blocks)}
  ],
  {ex_export},
  checkpoint,
);
"""
    path = os.path.join(MOD_DIR, fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return mod_export, ex_export


def write_index(_exports: list[tuple[str, str]]) -> None:
    lines = []
    for meta in MODULE_META:
        mod_export, ex_export = export_names(meta[0])
        lines.append(f"import {{ {mod_export}, {ex_export} }} from './{meta[1][:-3]}';")

    mod_exports = [export_names(m[0])[0] for m in MODULE_META]
    ex_spreads = ",\n  ".join(f"...{export_names(m[0])[1]}" for m in MODULE_META)
    content = "\n".join(lines) + f"""
import type {{ Exercise, Module }} from '../types';

const unsortedModules: Module[] = [
  {", ".join(mod_exports)},
];

export const modules: Module[] = [...unsortedModules].sort((a, b) => a.order - b.order);

export const moduleLessonExercises: Exercise[] = [
  {ex_spreads},
];
"""
    with open(os.path.join(MOD_DIR, "index.ts"), "w", encoding="utf-8") as f:
        f.write(content)


def main() -> None:
    os.makedirs(MOD_DIR, exist_ok=True)
    exports = []
    for meta in MODULE_META:
        exports.append(write_module(meta))
    write_index(exports)
    print(f"Wrote {len(MODULE_META)} modules to {MOD_DIR}")


if __name__ == "__main__":
    main()
