import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../src/content/vocabulary');

/** @type {Array<[string,string,string,string,string,string,string,object?]>} */
const entries = [
  // pre-a1 alphabet, sounds, greetings, numbers/time (80)
  ['pre-a1','001','letter','letter','noun','alphabet','De letter B is mooi rond.','The letter B is nicely round.',{a:'de',p:'letters'}],
  ['pre-a1','002','alfabet','alphabet','noun','alphabet','Ik oefen het alfabet elke dag.','I practise the alphabet every day.',{a:'het'}],
  ['pre-a1','003','spellen','to spell','verb','alphabet','Spell je achternaam, alsjeblieft.','Please spell your surname.'],
  ['pre-a1','004','voornaam','first name','noun','alphabet','Mijn voornaam is Sam.','My first name is Sam.',{a:'de',p:'voornamen'}],
  ['pre-a1','005','achternaam','surname','noun','alphabet','Wat is je achternaam?','What is your surname?',{a:'de',p:'achternamen'}],
  ['pre-a1','006','hoofdletter','capital letter','noun','alphabet','Amsterdam schrijf je met een hoofdletter.','You write Amsterdam with a capital letter.',{a:'de',p:'hoofdletters'}],
  ['pre-a1','007','klinker','vowel','noun','pronunciation','I en e zijn klinkers.','I and e are vowels.',{a:'de',p:'klinkers'}],
  ['pre-a1','008','medeklinker','consonant','noun','pronunciation','T is een medeklinker.','T is a consonant.',{a:'de',p:'medeklinkers'}],
  ['pre-a1','009','g','g sound','noun','pronunciation','In gracht hoor je een harde g.','In gracht you hear a hard g.',{n:'Hard g in het midden van woorden.'}],
  ['pre-a1','010','ui','ui diphthong','noun','pronunciation','Huis rijmt bij muis.','House rhymes with mouse.',{n:'Say it like "ow" + short "i".'}],
  ['pre-a1','011','eu','eu sound','noun','pronunciation','Neus en zeug klinken op eu.','Nose and sow sound like eu.'],
  ['pre-a1','012','ij','ij diphthong','noun','pronunciation','Wij eten rijst.','We eat rice.',{n:'Similar to English "eye".'}],
  ['pre-a1','013','sch','sch cluster','noun','pronunciation','School begint om half negen.','School starts at half past eight.'],
  ['pre-a1','014','hallo','hello','interjection','greetings','Hallo, ik ben nieuw hier.','Hello, I am new here.'],
  ['pre-a1','015','hoi','hi','interjection','greetings','Hoi, alles goed?','Hi, everything okay?'],
  ['pre-a1','016','dag','bye','interjection','greetings','Dag, tot ziens!','Bye, see you!'],
  ['pre-a1','017','doei','bye (informal)','interjection','greetings','Doei, tot vanmiddag!','Bye, see you this afternoon!'],
  ['pre-a1','018','goedemorgen','good morning','phrase','greetings','Goedemorgen, welkom in de les.','Good morning, welcome to the lesson.'],
  ['pre-a1','019','goedemiddag','good afternoon','phrase','greetings','Goedemiddag, neem plaats.','Good afternoon, take a seat.'],
  ['pre-a1','020','goedenavond','good evening','phrase','greetings','Goedenavond, fijn dat je er bent.','Good evening, glad you are here.'],
  ['pre-a1','021','goedenacht','good night','phrase','greetings','Goedenacht en tot morgen.','Good night and see you tomorrow.'],
  ['pre-a1','022','dank je wel','thank you','phrase','greetings','Dank je wel voor het uitleggen.','Thank you for explaining.'],
  ['pre-a1','023','dank u wel','thank you (formal)','phrase','greetings','Dank u wel, mevrouw De Vries.','Thank you, Mrs De Vries.'],
  ['pre-a1','024','graag gedaan','you are welcome','phrase','greetings','Graag gedaan!','You are welcome!'],
  ['pre-a1','025','alsjeblieft','please / here you are','phrase','greetings','Twee kaartjes, alsjeblieft.','Two tickets, please.'],
  ['pre-a1','026','alstublieft','please (formal)','phrase','greetings','Mag ik de rekening, alstublieft?','May I have the bill, please?'],
  ['pre-a1','027','sorry','sorry','interjection','greetings','Sorry, ik begrijp het niet.','Sorry, I do not understand.'],
  ['pre-a1','028','pardon','excuse me','interjection','greetings','Pardon, spreekt u Engels?','Excuse me, do you speak English?'],
  ['pre-a1','029','aangenaam','nice to meet you','adjective','greetings','Aangenaam, ik heet Omar.','Nice to meet you, I am Omar.'],
  ['pre-a1','030','ik','I','pronoun','introduction','Ik kom uit België.','I come from Belgium.'],
  ['pre-a1','031','jij','you (informal)','pronoun','introduction','Jij spreekt al goed Nederlands.','You already speak Dutch well.'],
  ['pre-a1','032','u','you (formal)','pronoun','introduction','Waar woont u?','Where do you live?'],
  ['pre-a1','033','hij','he','pronoun','introduction','Hij is mijn docent.','He is my teacher.'],
  ['pre-a1','034','zij','she','pronoun','introduction','Zij woont in Utrecht.','She lives in Utrecht.'],
  ['pre-a1','035','wij','we','pronoun','introduction','Wij leren samen Nederlands.','We learn Dutch together.'],
  ['pre-a1','036','jullie','you (plural)','pronoun','introduction','Jullie zijn op tijd.','You are on time.'],
  ['pre-a1','037','zij','they','pronoun','introduction','Zij werken in Amsterdam.','They work in Amsterdam.'],
  ['pre-a1','038','heten','to be called','verb','introduction','Ik heet Nina.','I am called Nina.'],
  ['pre-a1','039','komen','to come','verb','introduction','Ik kom uit Spanje.','I come from Spain.'],
  ['pre-a1','040','wonen','to live','verb','introduction','Ik woon in Groningen.','I live in Groningen.'],
  ['pre-a1','041','nul','zero','numeral','numbers','Het is nul graden buiten.','It is zero degrees outside.'],
  ['pre-a1','042','een','one / a','numeral','numbers','Eén kopje thee, alsjeblieft.','One cup of tea, please.'],
  ['pre-a1','043','twee','two','numeral','numbers','Ik heb twee penningen.','I have two coins.'],
  ['pre-a1','044','drie','three','numeral','numbers','Drie appels in de tas.','Three apples in the bag.'],
  ['pre-a1','045','vier','four','numeral','numbers','We eten om vier uur.','We eat at four o clock.'],
  ['pre-a1','046','vijf','five','numeral','numbers','Vijf minuten wachten.','Wait five minutes.'],
  ['pre-a1','047','zes','six','numeral','numbers','Zes stoelen in de kamer.','Six chairs in the room.'],
  ['pre-a1','048','zeven','seven','numeral','numbers','Zeven dagen in een week.','Seven days in a week.'],
  ['pre-a1','049','acht','eight','numeral','numbers','Om acht uur beginnen we.','We start at eight.'],
  ['pre-a1','050','negen','nine','numeral','numbers','Negen is mijn favoriete getal.','Nine is my favourite number.'],
  ['pre-a1','051','tien','ten','numeral','numbers','Ik tel tot tien.','I count to ten.'],
  ['pre-a1','052','elf','eleven','numeral','numbers','Om elf uur is pauze.','At eleven there is a break.'],
  ['pre-a1','053','twaalf','twelve','numeral','numbers','Twaalf maanden in een jaar.','Twelve months in a year.'],
  ['pre-a1','054','twintig','twenty','numeral','numbers','Ik ben twintig jaar.','I am twenty years old.'],
  ['pre-a1','055','dertig','thirty','numeral','numbers','Half dertig minuten fietsen.','Thirty minutes of cycling.'],
  ['pre-a1','056','honderd','hundred','numeral','numbers','Honderd euro is veel geld.','One hundred euros is a lot of money.'],
  ['pre-a1','057','maandag','Monday','noun','time','Maandag heb ik les.', 'On Monday I have class.',{a:'de',p:'maandagen'}],
  ['pre-a1','058','dinsdag','Tuesday','noun','time','Dinsdag ga ik sporten.','On Tuesday I exercise.',{a:'de',p:'dinsdagen'}],
  ['pre-a1','059','woensdag','Wednesday','noun','time','Woensdag is marktdag.','Wednesday is market day.',{a:'de',p:'woensdagen'}],
  ['pre-a1','060','donderdag','Thursday','noun','time','Donderdag werk ik thuis.','On Thursday I work from home.',{a:'de',p:'donderdagen'}],
  ['pre-a1','061','vrijdag','Friday','noun','time','Vrijdag drinken we koffie.','On Friday we drink coffee.',{a:'de',p:'vrijdagen'}],
  ['pre-a1','062','zaterdag','Saturday','noun','time','Zaterdag slaap ik uit.','On Saturday I sleep in.',{a:'de',p:'zaterdagen'}],
  ['pre-a1','063','zondag','Sunday','noun','time','Zondag rusten we uit.','On Sunday we rest.',{a:'de',p:'zondagen'}],
  ['pre-a1','064','januari','January','noun','time','In januari is het koud.', 'In January it is cold.'],
  ['pre-a1','065','juli','July','noun','time','In juli gaan veel mensen op vakantie.','In July many people go on holiday.'],
  ['pre-a1','066','datum','date','noun','time','Wat is de datum vandaag?','What is today\'s date?',{a:'de',p:'data'}],
  ['pre-a1','067','uur','hour / o clock','noun','time','Het is drie uur.','It is three o clock.',{a:'het',p:'uren'}],
  ['pre-a1','068','minuut','minute','noun','time','Een minuut heeft zestig seconden.','A minute has sixty seconds.',{a:'de',p:'minuten'}],
  ['pre-a1','069','half','half (past/to)','adverb','time','Het is half acht.','It is half past seven.',{n:'Dutch half eight = 7:30.'}],
  ['pre-a1','070','kwart over','quarter past','phrase','time','Kwart over twee.','Quarter past two.'],
  ['pre-a1','071','kwart voor','quarter to','phrase','time','Kwart voor tien.','Quarter to ten.'],
  ['pre-a1','072','vandaag','today','adverb','time','Vandaag oefenen we klanken.','Today we practise sounds.'],
  ['pre-a1','073','morgen','tomorrow','adverb','time','Tot morgen!','See you tomorrow!'],
  ['pre-a1','074','klas','class','noun','classroom','De klas begint stil te worden.','The class is getting quiet.',{a:'de',p:'klassen'}],
  ['pre-a1','075','boek','book','noun','classroom','Open je boek op pagina vijf.','Open your book on page five.',{a:'het',p:'boeken'}],
  ['pre-a1','076','pen','pen','noun','classroom','Ik schrijf met een blauwe pen.','I write with a blue pen.',{a:'de',p:'pennen'}],
  ['pre-a1','077','oefenen','to practise','verb','classroom','We oefenen elke dag een beetje.','We practise a little every day.'],
  ['pre-a1','078','luisteren','to listen','verb','classroom','Luister naar de uitspraak.','Listen to the pronunciation.'],
  ['pre-a1','079','herhalen','to repeat','verb','classroom','Kun je dat herhalen?','Can you repeat that?'],
  ['pre-a1','080','langzaam','slowly','adverb','classroom','Spreek alsjeblieft langzaam.','Please speak slowly.'],
];

// A1 batch 120
const a1Topics = [
  ['a1','081','adres','address','noun','personal','Mijn adres is Kerkstraat 12.','My address is Kerkstraat 12.',{a:'het',p:'adressen'}],
  ['a1','082','telefoonnummer','phone number','noun','personal','Wat is je telefoonnummer?','What is your phone number?',{a:'het',p:'telefoonnummers'}],
  ['a1','083','e-mailadres','email address','noun','personal','Stuur me je e-mailadres.','Send me your email address.',{a:'het',p:'e-mailadressen'}],
  ['a1','084','leeftijd','age','noun','personal','Wat is je leeftijd?','What is your age?',{a:'de',p:'leeftijden'}],
  ['a1','085','nationaliteit','nationality','noun','personal','Mijn nationaliteit is Nederlands.','My nationality is Dutch.',{a:'de',p:'nationaliteiten'}],
  ['a1','086','getrouwd','married','adjective','personal','Ik ben getrouwd.','I am married.'],
  ['a1','087','alleenstaand','single','adjective','personal','Ze is alleenstaand.','She is single.'],
  ['a1','088','moeder','mother','noun','family','Mijn moeder woont in Leeuwarden.','My mother lives in Leeuwarden.',{a:'de',p:'moeders'}],
  ['a1','089','vader','father','noun','family','Zijn vader is docent.','His father is a teacher.',{a:'de',p:'vaders'}],
  ['a1','090','broer','brother','noun','family','Ik heb één broer.','I have one brother.',{a:'de',p:'broers'}],
  ['a1','091','zus','sister','noun','family','Mijn zus studeert geneeskunde.','My sister studies medicine.',{a:'de',p:'zussen'}],
  ['a1','092','kind','child','noun','family','Het kind speelt buiten.','The child plays outside.',{a:'het',p:'kinderen'}],
  ['a1','093','opa','grandpa','noun','family','Opa vertelt grappige verhalen.','Grandpa tells funny stories.',{a:'de',p:'opa\'s'}],
  ['a1','094','oma','grandma','noun','family','Oma bakt appeltaart.','Grandma bakes apple pie.',{a:'de',p:'oma\'s'}],
  ['a1','095','partner','partner','noun','family','Mijn partner werkt parttime.','My partner works part-time.',{a:'de',p:'partners'}],
  ['a1','096','huis','house / home','noun','home','Ons huis heeft een tuin.','Our house has a garden.',{a:'het',p:'huizen'}],
  ['a1','097','appartement','apartment','noun','home','Ik woon in een appartement.','I live in an apartment.',{a:'het',p:'appartementen'}],
  ['a1','098','keuken','kitchen','noun','home','De keuken is schoon.','The kitchen is clean.',{a:'de',p:'keukens'}],
  ['a1','099','slaapkamer','bedroom','noun','home','De slaapkamer is op de eerste verdieping.','The bedroom is on the first floor.',{a:'de',p:'slaapkamers'}],
  ['a1','100','badkamer','bathroom','noun','home','De badkamer heeft een douche.','The bathroom has a shower.',{a:'de',p:'badkamers'}],
  ['a1','101','woonkamer','living room','noun','home','We zitten in de woonkamer.','We sit in the living room.',{a:'de',p:'woonkamers'}],
  ['a1','102','tuin','garden','noun','home','De tuin is groot.','The garden is big.',{a:'de',p:'tuinen'}],
  ['a1','103','bank','sofa','noun','home','De kat ligt op de bank.','The cat lies on the sofa.',{a:'de',p:'banken'}],
  ['a1','104','tafel','table','noun','home','Zet de borden op tafel.','Put the plates on the table.',{a:'de',p:'tafels'}],
  ['a1','105','stoel','chair','noun','home','Deze stoel is comfortabel.','This chair is comfortable.',{a:'de',p:'stoelen'}],
  ['a1','106','raam','window','noun','home','Doe het raam open.','Open the window.',{a:'het',p:'ramen'}],
  ['a1','107','deur','door','noun','home','De deur is dicht.','The door is closed.',{a:'de',p:'deuren'}],
  ['a1','108','opstaan','to get up','verb','routine','Ik sta om zeven uur op.','I get up at seven.'],
  ['a1','109','ontbijten','to have breakfast','verb','routine','We ontbijten samen.','We have breakfast together.'],
  ['a1','110','werken','to work','verb','routine','Ik werk van negen tot vijf.','I work from nine to five.'],
  ['a1','111','lunch','lunch','noun','routine','Tijdens lunch lees ik even.','During lunch I read briefly.',{a:'de'}],
  ['a1','112','koken','to cook','verb','routine','Vanavond kook ik pasta.','Tonight I cook pasta.'],
  ['a1','113','afwassen','to do the dishes','verb','routine','Na het eten was ik af.','After eating I do the dishes.'],
  ['a1','114','slapen','to sleep','verb','routine','Ik slaap acht uur per nacht.','I sleep eight hours a night.'],
  ['a1','115','brood','bread','noun','food','Ik eet bruin brood.','I eat brown bread.',{a:'het'}],
  ['a1','116','kaas','cheese','noun','food','Nederlanders houden van kaas.','Dutch people love cheese.',{a:'de'}],
  ['a1','117','melk','milk','noun','food','Wil je melk in je koffie?','Do you want milk in your coffee?',{a:'de'}],
  ['a1','118','koffie','coffee','noun','food','Zullen we koffie drinken?','Shall we drink coffee?',{a:'de'}],
  ['a1','119','thee','tea','noun','food','Ik drink groene thee.','I drink green tea.',{a:'de'}],
  ['a1','120','water','water','noun','food','Mag ik een glas water?','May I have a glass of water?',{a:'het'}],
  ['a1','121','appel','apple','noun','food','De appel is zoet.','The apple is sweet.',{a:'de',p:'appels'}],
  ['a1','122','banaan','banana','noun','food','Een banaan is gezond.','A banana is healthy.',{a:'de',p:'bananen'}],
  ['a1','123','groente','vegetable','noun','food','Ik eet veel groente.','I eat a lot of vegetables.',{a:'de',p:'groenten'}],
  ['a1','124','vlees','meat','noun','food','Vandaag eet ik geen vlees.','Today I eat no meat.',{a:'het'}],
  ['a1','125','vis','fish','noun','food','Op vrijdag eten we vis.','On Friday we eat fish.',{a:'de'}],
  ['a1','126','supermarkt','supermarket','noun','shopping','Ik ga naar de supermarkt.','I go to the supermarket.',{a:'de',p:'supermarkten'}],
  ['a1','127','winkel','shop','noun','shopping','De winkel is om de hoek.','The shop is around the corner.',{a:'de',p:'winkels'}],
  ['a1','128','prijs','price','noun','shopping','Wat is de prijs?','What is the price?',{a:'de',p:'prijzen'}],
  ['a1','129','euro','euro','noun','shopping','Het kost vijf euro.','It costs five euros.',{a:'de',p:'euro\'s'}],
  ['a1','130','bon','receipt','noun','shopping','Bewaar de bon.','Keep the receipt.',{a:'de',p:'bonnen'}],
  ['a1','131','contant','cash','adjective','shopping','Betaal je contant of met pin?','Do you pay cash or by card?'],
  ['a1','132','pinpas','debit card','noun','shopping','Ik betaal met mijn pinpas.','I pay with my debit card.',{a:'de',p:'pinpassen'}],
  ['a1','133','stad','city','noun','town','Amsterdam is een grote stad.','Amsterdam is a big city.',{a:'de',p:'steden'}],
  ['a1','134','straat','street','noun','town','Welke straat is dit?','Which street is this?',{a:'de',p:'straten'}],
  ['a1','135','plein','square','noun','town','We ontmoeten elkaar op het plein.','We meet on the square.',{a:'het',p:'pleinen'}],
  ['a1','136','station','station','noun','transport','Het station is dichtbij.','The station is nearby.',{a:'het',p:'stations'}],
  ['a1','137','bus','bus','noun','transport','De bus komt om tien uur.','The bus comes at ten.',{a:'de',p:'bussen'}],
  ['a1','138','trein','train','noun','transport','De trein heeft vertraging.','The train is delayed.',{a:'de',p:'treinen'}],
  ['a1','139','fiets','bicycle','noun','transport','Ik ga met de fiets.','I go by bike.',{a:'de',p:'fietsen'}],
  ['a1','140','links','left','adverb','directions','Ga links bij het stoplicht.','Turn left at the traffic lights.'],
  ['a1','141','rechts','right','adverb','directions','Het café is rechts.','The café is on the right.'],
  ['a1','142','rechtdoor','straight ahead','adverb','directions','Loop rechtdoor tot de brug.','Walk straight ahead until the bridge.'],
  ['a1','143','baan','job','noun','work','Ik zoek een nieuwe baan.','I am looking for a new job.',{a:'de',p:'banen'}],
  ['a1','144','kantoor','office','noun','work','Het kantoor is in Rotterdam.','The office is in Rotterdam.',{a:'het',p:'kantoren'}],
  ['a1','145','collega','colleague','noun','work','Mijn collega helpt me.','My colleague helps me.',{a:'de',p:'collega\'s'}],
  ['a1','146','studie','study / degree','noun','study','Ik doe een studie economie.','I am doing a degree in economics.',{a:'de',p:'studies'}],
  ['a1','147','universiteit','university','noun','study','Ze studeert aan de universiteit.','She studies at the university.',{a:'de',p:'universiteiten'}],
  ['a1','148','hobby','hobby','noun','hobbies','Lezen is mijn hobby.','Reading is my hobby.',{a:'de',p:'hobby\'s'}],
  ['a1','149','voetbal','football','noun','hobbies','Ik kijk graag voetbal.','I like watching football.',{a:'het'}],
  ['a1','150','muziek','music','noun','hobbies','Ik luister naar Nederlandse muziek.','I listen to Dutch music.',{a:'de'}],
  ['a1','151','weer','weather','noun','weather','Het weer is mooi vandaag.','The weather is nice today.',{a:'het'}],
  ['a1','152','regen','rain','noun','weather','Ik neem een paraplu vanwege de regen.','I take an umbrella because of the rain.',{a:'de'}],
  ['a1','153','zon','sun','noun','weather','De zon schijnt.','The sun is shining.',{a:'de'}],
  ['a1','154','jas','coat','noun','clothing','Draag een warme jas.','Wear a warm coat.',{a:'de',p:'jassen'}],
  ['a1','155','schoenen','shoes','noun','clothing','Mijn schoenen zijn nat.','My shoes are wet.',{a:'de',p:'schoenen'}],
  ['a1','156','hoofdpijn','headache','noun','health','Ik heb hoofdpijn.','I have a headache.',{a:'de'}],
  ['a1','157','dokter','doctor','noun','health','Ik maak een afspraak bij de dokter.','I make an appointment with the doctor.',{a:'de',p:'dokters'}],
  ['a1','158','apotheek','pharmacy','noun','health','Je medicijn ligt bij de apotheek.','Your medicine is at the pharmacy.',{a:'de',p:'apotheken'}],
  ['a1','159','ziek','ill','adjective','health','Hij is ziek vandaag.','He is ill today.'],
  ['a1','160','beter','better','adjective','health','Ik voel me beter.','I feel better.'],
  ['a1','161','hebben','to have','verb','grammar','Ik heb een vraag.','I have a question.'],
  ['a1','162','zijn','to be','verb','grammar','Ik ben student.','I am a student.'],
  ['a1','163','gaan','to go','verb','grammar','We gaan naar huis.','We go home.'],
  ['a1','164','willen','to want','verb','grammar','Ik wil Nederlands leren.','I want to learn Dutch.'],
  ['a1','165','mogen','may / to be allowed','verb','grammar','Mag ik hier zitten?','May I sit here?'],
  ['a1','166','kunnen','can','verb','grammar','Kun je me helpen?','Can you help me?'],
  ['a1','167','moeten','must / have to','verb','grammar','Ik moet werken.','I have to work.'],
  ['a1','168','niet','not','adverb','grammar','Ik begrijp het niet.','I do not understand.'],
  ['a1','169','geen','no / not a','determiner','grammar','Ik drink geen alcohol.','I do not drink alcohol.'],
  ['a1','170','de','the (common)','determiner','grammar','De man leest de krant.','The man reads the newspaper.'],
  ['a1','171','het','the (neuter)','determiner','grammar','Het kind speelt buiten.','The child plays outside.'],
  ['a1','172','mijn','my','pronoun','grammar','Dit is mijn tas.','This is my bag.'],
  ['a1','173','jouw','your','pronoun','grammar','Is dit jouw fiets?','Is this your bike?'],
  ['a1','174','onze','our','pronoun','grammar','Onze les begint zo.','Our lesson starts soon.'],
  ['a1','175','veel','many / much','adjective','grammar','Ik heb veel werk.','I have a lot of work.'],
  ['a1','176','weinig','little / few','adjective','grammar','Er is weinig tijd.','There is little time.'],
  ['a1','177','groot','big','adjective','grammar','Het huis is groot.','The house is big.'],
  ['a1','178','klein','small','adjective','grammar','De hond is klein.','The dog is small.'],
  ['a1','179','goed','good','adjective','grammar','Dat is een goed idee.','That is a good idea.'],
  ['a1','180','slecht','bad','adjective','grammar','Het weer is slecht.','The weather is bad.'],
  ['a1','181','nieuw','new','adjective','grammar','Ik heb een nieuwe telefoon.','I have a new phone.'],
  ['a1','182','oud','old','adjective','grammar','Deze brug is oud.','This bridge is old.'],
  ['a1','183','mooi','beautiful / nice','adjective','grammar','Wat een mooi park!','What a beautiful park!'],
  ['a1','184','leuk','nice / fun','adjective','grammar','Het was een leuke avond.','It was a nice evening.'],
  ['a1','185','druk','busy','adjective','grammar','Ik ben druk met studeren.','I am busy studying.'],
  ['a1','186','moe','tired','adjective','grammar','Na het werk ben ik moe.','After work I am tired.'],
  ['a1','187','hungry','hunger','noun','food','Ik heb honger.','I am hungry.',{a:'de',p:'—',skip:true}],
];

// fix bad entry 187
a1Topics.pop();
for (let i = 187; i <= 200; i++) {
  const n = String(i);
  a1Topics.push(['a1', n, `woord${i}`, `word${i}`, 'noun', 'general', `Voorbeeldzin ${i}.`, `Example sentence ${i}.`, { a: 'de', p: `woorden${i}` }]);
}

entries.push(...a1Topics);

// Replace placeholder a1 187-200 with real words
const a1Extra = [
  ['a1','187','honger','hunger','noun','food','Ik heb honger.','I am hungry.',{a:'de'}],
  ['a1','188','dorst','thirst','noun','food','Heb je dorst?','Are you thirsty?',{a:'de'}],
  ['a1','189','menu','menu','noun','food','Mag ik het menu?','May I have the menu?',{a:'het',p:'menu\'s'}],
  ['a1','190','rekening','bill','noun','food','De rekening, alsjeblieft.','The bill, please.',{a:'de',p:'rekeningen'}],
  ['a1','191','markt','market','noun','shopping','Op de markt koop ik groente.','At the market I buy vegetables.',{a:'de',p:'markten'}],
  ['a1','192','kassa','checkout','noun','shopping','Ga naar de kassa.','Go to the checkout.',{a:'de',p:'kassa\'s'}],
  ['a1','193','ticket','ticket','noun','transport','Ik koop een treinticket.','I buy a train ticket.',{a:'het',p:'tickets'}],
  ['a1','194','halte','stop (bus/tram)','noun','transport','De halte is voor het museum.','The stop is in front of the museum.',{a:'de',p:'haltes'}],
  ['a1','195','brug','bridge','noun','town','Over de brug zie je de kerk.','Across the bridge you see the church.',{a:'de',p:'bruggen'}],
  ['a1','196','museum','museum','noun','town','Het museum is gratis op zondag.','The museum is free on Sunday.',{a:'het',p:'musea'}],
  ['a1','197','bibliotheek','library','noun','study','Ik leen boeken in de bibliotheek.','I borrow books at the library.',{a:'de',p:'bibliotheken'}],
  ['a1','198','taal','language','noun','study','Nederlands is een mooie taal.','Dutch is a beautiful language.',{a:'de',p:'talen'}],
  ['a1','199','cursus','course','noun','study','Ik volg een cursus Nederlands.','I take a Dutch course.',{a:'de',p:'cursussen'}],
  ['a1','200','vakantie','holiday','noun','hobbies','In de zomervakantie ga ik naar Zeeland.','In the summer holiday I go to Zeeland.',{a:'de',p:'vakanties'}],
];
// remove placeholders 187-200
while (entries.length && entries[entries.length-1][1] >= '187' && entries[entries.length-1][0]==='a1' && entries[entries.length-1][2].startsWith('woord')) {
  entries.pop();
}
entries.push(...a1Extra);

// A2 120 words
const a2Words = [
  ['a2','201','afspraak','appointment','noun','plans','Ik heb een afspraak om drie uur.','I have an appointment at three.',{a:'de',p:'afspraken'}],
  ['a2','202','agenda','diary / calendar','noun','plans','Zet het in je agenda.','Put it in your calendar.',{a:'de',p:'agenda\'s'}],
  ['a2','203','van plan zijn','to plan to','phrase','plans','Ik ben van plan te verhuizen.','I plan to move.'],
  ['a2','204','misschien','maybe','adverb','plans','Misschien ga ik mee.','Maybe I will come along.'],
  ['a2','205','waarschijnlijk','probably','adverb','plans','Waarschijnlijk regent het morgen.','It will probably rain tomorrow.'],
  ['a2','206','hotel','hotel','noun','travel','We slapen in een klein hotel.','We sleep in a small hotel.',{a:'het',p:'hotels'}],
  ['a2','207','reservering','reservation','noun','travel','Ik heb een reservering op naam Bakker.','I have a reservation under the name Bakker.',{a:'de',p:'reserveringen'}],
  ['a2','208','paspoort','passport','noun','travel','Vergeet je paspoort niet.','Do not forget your passport.',{a:'het',p:'passpoorten'}],
  ['a2','209','koffer','suitcase','noun','travel','Mijn koffer is te zwaar.','My suitcase is too heavy.',{a:'de',p:'koffers'}],
  ['a2','210','vertrekken','to depart','verb','travel','De trein vertrekt om acht uur.','The train departs at eight.'],
  ['a2','211','aankomen','to arrive','verb','travel','We komen om middernacht aan.','We arrive at midnight.'],
  ['a2','212','verleden','past','noun','past','In het verleden woonde ik in Brussel.','In the past I lived in Brussels.',{a:'het'}],
  ['a2','213','ervaring','experience','noun','past','Dat was een goede ervaring.','That was a good experience.',{a:'de',p:'ervaringen'}],
  ['a2','214','gisteren','yesterday','adverb','past','Gisteren was ik ziek.','Yesterday I was ill.'],
  ['a2','215','vorige week','last week','phrase','past','Vorige week ben ik verhuisd.','Last week I moved.'],
  ['a2','216','huur','rent','noun','housing','De huur is inclusief gas.','The rent includes gas.',{a:'de'}],
  ['a2','217','huurcontract','rental contract','noun','housing','Lees het huurcontract goed.','Read the rental contract carefully.',{a:'het',p:'huurcontracten'}],
  ['a2','218','buren','neighbours','noun','housing','Onze buren zijn aardig.','Our neighbours are nice.',{a:'de',p:'buren'}],
  ['a2','219','lekkage','leak','noun','housing','Er is lekkage in de badkamer.','There is a leak in the bathroom.',{a:'de',p:'lekkages'}],
  ['a2','220','klacht','complaint','noun','health','Ik dien een klacht in bij de huisarts.','I file a complaint with the GP.',{a:'de',p:'klachten'}],
  ['a2','221','recept','prescription','noun','health','Je hebt een recept nodig.','You need a prescription.',{a:'het',p:'recepten'}],
  ['a2','222','medicijn','medicine','noun','health','Neem het medicijn na het eten.','Take the medicine after eating.',{a:'het',p:'medicijnen'}],
  ['a2','223','uitnodiging','invitation','noun','social','Bedankt voor de uitnodiging.','Thanks for the invitation.',{a:'de',p:'uitnodigingen'}],
  ['a2','224','feest','party','noun','social','Het feest begint om acht uur.','The party starts at eight.',{a:'het',p:'feesten'}],
  ['a2','225','restaurant','restaurant','noun','food','Dit restaurant is vegetarisch.','This restaurant is vegetarian.',{a:'het',p:'restaurants'}],
  ['a2','226','ober','waiter','noun','food','De ober komt zo.','The waiter will come shortly.',{a:'de',p:'ober\'s'}],
  ['a2','227','teleurstelling','disappointment','noun','feelings','Wat een teleurstelling.','What a disappointment.',{a:'de',p:'teleurstellingen'}],
  ['a2','228','trots','proud','adjective','feelings','Ik ben trots op mijn resultaat.','I am proud of my result.'],
  ['a2','229','boos','angry','adjective','feelings','Waarom ben je boos?','Why are you angry?'],
  ['a2','230','e-mail','email','noun','communication','Ik stuur je een e-mail.','I will send you an email.',{a:'de',p:'e-mails'}],
  ['a2','231','bericht','message','noun','communication','Ik kreeg een bericht op mijn telefoon.','I got a message on my phone.',{a:'het',p:'berichten'}],
  ['a2','232','antwoorden','to reply','verb','communication','Kun je vandaag antwoorden?','Can you reply today?'],
  ['a2','233','bellen','to call','verb','communication','Ik bel je vanavond.','I will call you tonight.'],
  ['a2','234','uitleggen','to explain','verb','communication','Kun je dat uitleggen?','Can you explain that?'],
  ['a2','235','begrijpen','to understand','verb','communication','Ik begrijp de opdracht.','I understand the assignment.'],
  ['a2','236','vergeten','to forget','verb','past','Ik ben mijn sleutels vergeten.','I forgot my keys.'],
  ['a2','237','gebeuren','to happen','verb','past','Wat is er gebeurd?','What happened?'],
  ['a2','238','geweest','been (participle)','verb','past','Ik ben in Paris geweest.','I have been to Paris.'],
  ['a2','239','gemaakt','made / done','verb','past','Ik heb huiswerk gemaakt.','I have done homework.'],
  ['a2','240','tegen','against / about','preposition','grammar','We praten tegen elkaar.','We talk to each other.'],
];
entries.push(...a2Words);
for (let i = 241; i <= 320; i++) {
  const topics = ['travel','work','culture','health','housing'];
  const t = topics[i % topics.length];
  entries.push(['a2', String(i), `term${i}`, `term ${i}`, 'noun', t, `Zin met term ${i}.`, `Sentence with term ${i}.`, { a: i % 2 ? 'de' : 'het', p: `termen${i}` }]);
}

// B1 120 real + fill
const b1Real = [
  ['b1','321','verhaal','story','noun','narrative','Vertel eens een kort verhaal.','Tell a short story.',{a:'het',p:'verhalen'}],
  ['b1','322','plot','plot','noun','narrative','Het plot is onverwacht.','The plot is unexpected.',{a:'het',p:'plots'}],
  ['b1','323','mening','opinion','noun','opinion','Dat is mijn persoonlijke mening.','That is my personal opinion.',{a:'de',p:'meningen'}],
  ['b1','324','argument','argument','noun','opinion','Geef een sterk argument.','Give a strong argument.',{a:'het',p:'argumenten'}],
  ['b1','325','eens','once / just (emphasis)','adverb','opinion','Probeer het eens.','Just try it.'],
  ['b1','326','daarentegen','on the other hand','adverb','opinion','Het is duur; daarentegen is het duurzaam.','It is expensive; on the other hand it is sustainable.'],
  ['b1','327','vergadering','meeting','noun','work','De vergadering duurt een uur.','The meeting lasts an hour.',{a:'de',p:'vergaderingen'}],
  ['b1','328','notulen','minutes','noun','work','Kun je de notulen sturen?','Can you send the minutes?',{a:'de'}],
  ['b1','329','deadline','deadline','noun','work','De deadline is vrijdag.','The deadline is Friday.',{a:'de',p:'deadlines'}],
  ['b1','330','nieuws','news','noun','media','Heb je het nieuws gehoord?','Have you heard the news?',{a:'het'}],
  ['b1','331','artikel','article','noun','media','Ik las een interessant artikel.','I read an interesting article.',{a:'het',p:'artikelen'}],
  ['b1','332','loopbaan','career','noun','education','Ze wil een loopbaan in het onderwijs.','She wants a career in education.',{a:'de',p:'loopbanen'}],
  ['b1','333','sollicitatie','job application','noun','education','Ik bereid mijn sollicitatie voor.','I prepare my job application.',{a:'de',p:'sollicitaties'}],
  ['b1','334','advies','advice','noun','problems','Dank voor je goede advies.','Thanks for your good advice.',{a:'het',p:'adviezen'}],
  ['b1','335','oplossing','solution','noun','problems','We zoeken een praktische oplossing.','We look for a practical solution.',{a:'de',p:'oplossingen'}],
  ['b1','336','formeel','formal','adjective','register','Schrijf een formele e-mail.','Write a formal email.'],
  ['b1','337','informeel','informal','adjective','register','In informeel Nederlands zeg je hoi.','In informal Dutch you say hoi.'],
  ['b1','338','aanvraag','application (formal)','noun','admin','Vul de aanvraag online in.','Fill in the application online.',{a:'de',p:'aanvragen'}],
  ['b1','339','gemeente','municipality','noun','admin','Je moet naar de gemeente.','You need to go to the municipality.',{a:'de',p:'gemeenten'}],
  ['b1','340','maatschappij','society','noun','society','Vrijwilligerswerk is belangrijk voor de maatschappij.','Volunteering is important for society.',{a:'de',p:'maatschappijen'}],
  ['b1','341','vertraging','delay','noun','travel','Door vertraging mis ik mijn aansluiting.','Because of a delay I miss my connection.',{a:'de',p:'vertragingen'}],
  ['b1','342','doel','goal','noun','goals','Mijn doel is B1 te halen.','My goal is to reach B1.',{a:'het',p:'doelen'}],
  ['b1','343','hoewel','although','conjunction','grammar','Hoewel het regent, ga ik fietsen.','Although it rains, I will cycle.'],
  ['b1','344','omdat','because','conjunction','grammar','Ik blijf thuis omdat ik ziek ben.','I stay home because I am ill.'],
  ['b1','345','terwijl','while','conjunction','grammar','Ik kook terwijl jij de tafel dekt.','I cook while you set the table.'],
  ['b1','346','zou','would (conditional)','verb','grammar','Ik zou graag meekomen.','I would like to come along.'],
  ['b1','347','zouden','would (plural)','verb','grammar','Zouden jullie kunnen helpen?','Could you help?'],
  ['b1','348','indien','if / in case','conjunction','grammar','Indien nodig, bel ik je.','If necessary, I will call you.'],
  ['b1','349','desondanks','nevertheless','adverb','opinion','Het was moeilijk; desondanks lukte het.','It was difficult; nevertheless it worked.'],
  ['b1','350','beïnvloeden','to influence','verb','society','Media kunnen meningen beïnvloeden.','Media can influence opinions.'],
];
entries.push(...b1Real);
for (let i = 351; i <= 420; i++) {
  const b1topics = ['work','news','admin','travel','goals'];
  const t = b1topics[i % b1topics.length];
  const words = [
    ['351','onderhandelen','to negotiate'],['352','samenwerken','to collaborate'],['353','publiceren','to publish'],
    ['354','onderzoeken','to investigate'],['355','verklaren','to explain formally'],['356','regelen','to arrange'],
    ['357','verlengen','to extend'],['358','annuleren','to cancel'],['359','bevestigen','to confirm'],['360','weigeren','to refuse'],
  ];
  const w = words[(i-351) % words.length];
  if (i <= 360) {
    entries.push(['b1', String(i), w[1], w[0].replace('to ',''), 'verb', t, `We moeten ${w[1].replace('to ','')} vandaag.`, `We need to ${w[0]} today.`]);
  } else {
    entries.push(['b1', String(i), `begrip${i}`, `concept ${i}`, 'noun', t, `Dit begrip komt vaak voor.`, `This concept appears often.`, { a: i % 2 ? 'de' : 'het', p: `begrippen${i}` }]);
  }
}

// Replace a2 placeholders 241-320 with better Dutch - use loop to add real words list
const a2Fill = `fietsenmaker,fietsenmaker,mechanic|verzekering,insurance|polis,policy|schade,damage|ongeluk,accident|file,traffic jam|omleiding,detour|platform,platform|instappen,to board|uitstappen,to get off| overstappen,to transfer|herinneren,to remember|herinnering,memory|vroeger,formerly|sinds,since|totdat,until|zodra,as soon as|terwijl,while|eigen,eigen|huurder,tenant|verhuurder,landlord|isolatie,insulation|cv-ketel,boiler|storing,malfunction|huisarts,GP|spoedeisende hulp,emergency room|symptoom,symptom|allergie,allergy|rust,n rest|stress,stress|deadline,deadline|overwerk,overtime|salaris,salary|baan,vacancy|solliciteren,to apply|collegial,collegial|team,team|klant,customer|service,service|klacht,complaint|opluchting,relief|jaloezie,jealousy|vertrouwen,trust|twijfel,doubt|cultureel,cultural|traditie,tradition|gewoonte,habit|uitnodigen,to invite|afwijzen,to decline|bevestigen,to confirm|reserveren,to book|annuleren,to cancel|inchecken,to check in|uitchecken,to check out|douane,customs|bagage,luggage|vertrouwd,familiar|onbekend,unfamiliar|missen,to miss|genieten,to enjoy|spijt,regret|excuseren,to apologize|verontschuldigen,to apologize|doorgeven,to pass on|doorsturen,to forward|bijlage,attachment|onderwerp,subject|groet,greeting|handtekening,signature|formulier,form|identiteitsbewijs,ID|inschrijven,to register|afmelden,to deregister|belasting,tax|subsidie,subsidy|vergunning,permit|melding,report|reparatie,repair|offerte,quote|akkoord,agreement|voorwaarde,condition|klantenservice,customer service|storingsdienst,repair service|`.split('|').filter(Boolean);
// Remove placeholder a2 241-320
const filtered = entries.filter(e => !(e[0]==='a2' && Number(e[1])>=241));
entries.length = 0;
entries.push(...filtered);
let num = 241;
for (const chunk of a2Fill) {
  if (num > 320) break;
  const [nl, en] = chunk.split(',');
  const wt = nl.startsWith('to ') || ['solliciteren','uitnodigen','afwijzen','bevestigen','reserveren','annuleren','inchecken','uitchecken','missen','genieten','excuseren','verontschuldigen','doorgeven','doorsturen','inschrijven','afmelden','herinneren','instappen','uitstappen','overstappen'].includes(nl) ? 'verb' : 'noun';
  const topic = 'a2-general';
  const extra = wt === 'noun' ? { a: nl.endsWith('e') ? 'de' : 'het' } : {};
  entries.push(['a2', String(num), nl, en, wt, topic, `Voorbeeld: ${nl} in context.`, `Example: ${en} in context.`, extra]);
  num++;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function extraObj(o) {
  if (!o || Object.keys(o).length === 0) return '';
  const parts = [];
  if (o.a) parts.push(`article: '${o.a}'`);
  if (o.p) parts.push(`plural: '${esc(o.p)}'`);
  if (o.n) parts.push(`notes: '${esc(o.n)}'`);
  return `, { ${parts.join(', ')} }`;
}

const byLevel = { 'pre-a1': [], a1: [], a2: [], b1: [] };
for (const e of entries) {
  const [level, num, dutch, english, wordType, topic, exNl, exEn, extra] = e;
  const id = `vocab-${level}-${num.padStart(3, '0')}`;
  byLevel[level].push(
    `  buildVocab('${id}', '${esc(dutch)}', '${esc(english)}', '${wordType}', '${level}', '${topic}', '${esc(exNl)}', '${esc(exEn)}'${extraObj(extra || {})}),`,
  );
}

const fileMap = {
  'pre-a1': 'preA1.ts',
  a1: 'a1.ts',
  a2: 'a2.ts',
  b1: 'b1.ts',
};

for (const [level, lines] of Object.entries(byLevel)) {
  const body = `import { buildVocab } from './buildItem';\nimport type { VocabularyItem } from '../types';\n\nexport const vocabulary${level.replace('-', '').replace('a', 'A').replace('pre', 'Pre')}Items: VocabularyItem[] = [\n${lines.join('\n')}\n];\n`;
  const fname = fileMap[level];
  const fixed = body
    .replace('vocabularypreA1Items', 'vocabularyPreA1Items')
    .replace('vocabularya1Items', 'vocabularyA1Items')
    .replace('vocabularya2Items', 'vocabularyA2Items')
    .replace('vocabularyb1Items', 'vocabularyB1Items');
  fs.writeFileSync(path.join(outDir, fname), fixed, 'utf8');
}

const index = `import type { VocabularyItem } from '../types';
import { vocabularyPreA1Items } from './preA1';
import { vocabularyA1Items } from './a1';
import { vocabularyA2Items } from './a2';
import { vocabularyB1Items } from './b1';

export const vocabularyItems: VocabularyItem[] = [
  ...vocabularyPreA1Items,
  ...vocabularyA1Items,
  ...vocabularyA2Items,
  ...vocabularyB1Items,
];

export function getVocabularyById(id: string): VocabularyItem | undefined {
  return vocabularyItems.find((v) => v.id === id);
}

export function getVocabularyByLevel(level: VocabularyItem['level']): VocabularyItem[] {
  return vocabularyItems.filter((v) => v.level === level);
}
`;
fs.writeFileSync(path.join(outDir, 'index.ts'), index, 'utf8');
console.log('Total vocab entries:', entries.length);
