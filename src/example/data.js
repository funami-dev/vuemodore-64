/**
 * Everything the example magazine shows.
 *
 * Kept apart from the components so the sections stay about layout and
 * interaction rather than about content. All of it is invented.
 */

export const ISSUES = ['04/2026', '03/2026', '02/2026', '01/2026'];

export const TICKER = 'NEUE AUSGABE ONLINE ... SID-WETTBEWERB LÄUFT BIS FREITAG ... '
  + 'LESERTREFFEN IN BREMEN AUSVERKAUFT ... TYPE-IN DES MONATS: SPRITE-SCROLLER ... ';

export const SECTIONS = ['Titelstory', 'Charts', 'Umfrage', 'Leserbriefe', 'Werkstatt'];

export const ARTICLE = {
  kicker: 'Titelstory',
  headline: 'Wie der SID sprechen lernte',
  standfirst: 'Vierzig Jahre nach dem letzten Brotkasten vom Band bauen drei Bastler '
    + 'aus Bremen einen Sprachsynthesizer nach, den es nie zu kaufen gab.',
  body: [
    'Der Chip, der dem C64 seine Stimme gab, war eigentlich ein Unfall. Bob Yannes '
    + 'hatte drei Monate Zeit und baute in dieser Zeit einen Synthesizer, der mehr '
    + 'konnte als alles, was sonst in einem Heimcomputer steckte.',
    'Was danach kam, ist Szenegeschichte: drei Stimmen, ein Filter, und eine '
    + 'Generation von Musikern, die daraus mehr herausholten, als der Chip '
    + 'eigentlich hergab.',
  ],
  listing: [
    '10 REM *** SPRITE SCROLLER ***',
    '20 POKE 53280,0 : POKE 53281,0',
    '30 FOR I=0 TO 62 : READ D',
    '40 POKE 832+I,D : NEXT I',
    '50 POKE 2040,13 : POKE 53269,1',
    '60 POKE 53248,X : X=X+1',
    '70 IF X>255 THEN X=0',
    '80 GOTO 60',
  ],
  tags: ['Hardware', 'Exklusiv'],
  readingMinutes: 7,
};

export const CHART_COLUMNS = [
  { key: 'rank', label: '#', align: 'right' },
  { key: 'title', label: 'Titel' },
  { key: 'group', label: 'Gruppe' },
  { key: 'votes', label: 'Stimmen', align: 'right' },
];

export const CHART_ROWS = [
  {
    rank: 1, title: 'Edge Of Disgrace', group: 'Booze Design', votes: 4821,
  },
  {
    rank: 2, title: 'Comaland', group: 'Censor Design', votes: 4410,
  },
  {
    rank: 3, title: 'Uncensored', group: 'Booze Design', votes: 3990,
  },
  {
    rank: 4, title: 'Lunatico', group: 'Fairlight', votes: 3612,
  },
  {
    rank: 5, title: 'We Are New', group: 'Bonzai', votes: 3401,
  },
  {
    rank: 6, title: 'Wonderland XII', group: 'Censor Design', votes: 3120,
  },
  {
    rank: 7, title: 'Next Level', group: 'Performers', votes: 2870,
  },
  {
    rank: 8, title: 'Coma Light 13', group: 'Oxyron', votes: 2755,
  },
  {
    rank: 9, title: 'Onscreen', group: 'Offence', votes: 2510,
  },
  {
    rank: 10, title: 'Deus Ex Machina', group: 'Crest', votes: 2333,
  },
  {
    rank: 11, title: 'Soiled Legacy', group: 'Resource', votes: 2190,
  },
  {
    rank: 12, title: 'Krestage 3', group: 'Crest', votes: 2044,
  },
];

export const POLL = {
  question: 'Wer hat den besten SID-Sound geschrieben?',
  options: ['Rob Hubbard', 'Martin Galway', 'Jeroen Tel', 'Chris Hülsbeck'],
  votes: {
    'Rob Hubbard': 412, 'Martin Galway': 288, 'Jeroen Tel': 344, 'Chris Hülsbeck': 301,
  },
};

export const LETTERS = [
  {
    author: 'Sabine, Kiel',
    text: 'Euer Type-In aus 02/2026 lief bei mir erst nach dem dritten Anlauf. '
      + 'Zeile 40 hatte einen Zahlendreher. Trotzdem: schönster Scroller seit Jahren.',
  },
  {
    author: 'Micha, Wien',
    text: 'Bitte mehr über Diskettenlaufwerke. Die 1541 ist das am meisten '
      + 'unterschätzte Stück Hardware der Achtziger.',
  },
];

export const HEART = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'];
