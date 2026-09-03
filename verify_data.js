// Data integrity verification for Camnemi TOPIK site
const fs = require('fs');
const path = require('path');
const base = __dirname;

// Load data files into a fake window
global.window = {};
eval(fs.readFileSync(path.join(base, 'data', 'lessons.js'), 'utf8'));
eval(fs.readFileSync(path.join(base, 'data', 'level-test.js'), 'utf8'));
eval(fs.readFileSync(path.join(base, 'data', 'topik1-bank.js'), 'utf8'));
eval(fs.readFileSync(path.join(base, 'data', 'topik2-bank.js'), 'utf8'));
for (let n = 1; n <= 6; n++) {
  const p = path.join(base, 'data', `level${n}-bank.js`);
  if (fs.existsSync(p)) eval(fs.readFileSync(p, 'utf8'));
}
eval(fs.readFileSync(path.join(base, 'data', 'mock-tests.js'), 'utf8'));
eval(fs.readFileSync(path.join(base, 'data', 'topik-schedule.js'), 'utf8'));
eval(fs.readFileSync(path.join(base, 'data', 'drama-lessons.js'), 'utf8'));
const LESSONS = window.LESSONS;
const QUIZ = window.QUIZ;
const TOPIK1 = window.TOPIK1_BANK;
const TOPIK2 = window.TOPIK2_BANK;
const MOCK = window.MOCK_TESTS;
const SCHEDULE = window.TOPIK_SCHEDULE;
const DRAMA = window.DRAMA_LESSONS;

const errors = [];

// 1. Books 1a + 1b, 8 lessons each, sequential ids
for (const b of ['1a', '1b']) {
  const book = LESSONS[b];
  if (!book) { errors.push(`missing book ${b}`); continue; }
  const n = book.lessons.length;
  if (n !== 8) errors.push(`${b} has ${n} lessons (expected 8)`);
  const ids = book.lessons.map(l => l.id);
  if (new Set(ids).size !== ids.length) errors.push(`${b} duplicate ids`);
  if (!ids.every((id, i) => id === `${b}-0${i + 1}`)) errors.push(`${b} ids not sequential: ${ids.join(',')}`);
}

// 2. Every lesson well-formed
for (const b of Object.keys(LESSONS)) {
  for (const l of LESSONS[b].lessons) {
    if (!l.title) errors.push(`${l.id} missing title`);
    for (const g of l.grammar || []) {
      if (!g.point) errors.push(`${l.id} grammar missing point`);
      if (!g.examples || !g.examples.length) errors.push(`${l.id} grammar ${g.point} no examples`);
      for (const ex of g.examples || []) for (const k of ['ko', 'rom', 'gl'])
        if (!ex[k]) errors.push(`${l.id} example missing ${k}`);
    }
    for (const v of l.vocab || []) if (!v.kh) errors.push(`${l.id} vocab ${v.ko} missing Khmer`);
  }
}

// 3. Totals
let gp = 0, vocab = 0, exs = 0;
for (const b of Object.keys(LESSONS)) for (const l of LESSONS[b].lessons) {
  gp += l.grammar.length;
  exs += l.grammar.reduce((a, g) => a + g.examples.length, 0);
  vocab += (l.vocab || []).length;
}

// 4. Quiz integrity
const bands = {};
QUIZ.forEach((q, i) => {
  if (!(q.band >= 1 && q.band <= 6)) errors.push(`quiz q${i + 1} bad band ${q.band}`);
  bands[q.band] = (bands[q.band] || 0) + 1;
  if (!(q.correct >= 0 && q.correct < q.options.length)) errors.push(`quiz q${i + 1} bad correct`);
  if (q.options.length !== 3) errors.push(`quiz q${i + 1} not 3 options`);
  if (!q.explain) errors.push(`quiz q${i + 1} missing explain`);
});
const bandVals = Object.values(bands).sort();
if (bandVals.length !== 6 || !bandVals.every(v => v === 2)) errors.push(`quiz bands not 2 each: ${JSON.stringify(bands)}`);

console.log('Books:', JSON.stringify(Object.fromEntries(Object.keys(LESSONS).map(b => [b, LESSONS[b].lessons.length]))));
console.log('Grammar points:', gp, '| Vocab:', vocab, '| Examples:', exs);
console.log('Quiz questions:', QUIZ.length, '| bands:', JSON.stringify(bands));

// 4b. TOPIK1 bank integrity
const secCount = { listening: 0, reading: 0 };
const levelCount = {};
const ansDist = {};
const idSet = new Set();
TOPIK1.forEach((q) => {
  if (idSet.has(q.id)) errors.push(`topik1 dup id ${q.id}`);
  idSet.add(q.id);
  secCount[q.section] = (secCount[q.section] || 0) + 1;
  levelCount[q.level] = (levelCount[q.level] || 0) + 1;
  ansDist[q.correct] = (ansDist[q.correct] || 0) + 1;
  if (!['listening', 'reading'].includes(q.section)) errors.push(`topik1 ${q.id} bad section`);
  if (!(q.level >= 1 && q.level <= 5)) errors.push(`topik1 ${q.id} bad level`);
  if (!(q.correct >= 0 && q.correct < q.options.length)) errors.push(`topik1 ${q.id} bad correct`);
  if (q.options.length !== 4) errors.push(`topik1 ${q.id} not 4 options`);
  if (!q.explain || !Array.isArray(q.traps) || q.traps.length < 2 || !q.tip) errors.push(`topik1 ${q.id} missing explain/traps/tip`);
  if (!q.freq || !q.freqNote) errors.push(`topik1 ${q.id} missing freq`);
  if (q.options && q.options.length === 4 && (!q.optExplain || q.optExplain.length !== 4)) errors.push(`topik1 ${q.id} missing optExplain (4 items)`);
  if (q.explainAudio && !fs.existsSync(path.join(base, q.explainAudio))) errors.push(`topik1 ${q.id} explainAudio missing file: ${q.explainAudio}`);
});
if (TOPIK1.length < 10) errors.push(`topik1 bank too small (${TOPIK1.length})`);
console.log('TOPIK1 bank:', TOPIK1.length, '| listening:', secCount.listening, '| reading:', secCount.reading, '| levels:', JSON.stringify(levelCount), '| answers:', JSON.stringify(ansDist));

// 4c. Drama lessons integrity
const dramaIds = new Set();
DRAMA.forEach((d) => {
  if (dramaIds.has(d.id)) errors.push(`drama dup id ${d.id}`);
  dramaIds.add(d.id);
  if (!d.title || !d.video) errors.push(`drama ${d.id} missing title/video`);
  if (!fs.existsSync(path.join(base, d.video))) errors.push(`drama ${d.id} video missing: ${d.video}`);
  if (d.namheeAudio && !fs.existsSync(path.join(base, d.namheeAudio))) errors.push(`drama ${d.id} audio missing: ${d.namheeAudio}`);
  if (!d.lines || !d.lines.length) errors.push(`drama ${d.id} no lines`);
  d.lines.forEach((l, i) => {
    if (!l.text || !l.en) errors.push(`drama ${d.id} line ${i} missing text/en`);
    if (!l.points || !l.points.length) errors.push(`drama ${d.id} line ${i} no points`);
  });
});
console.log('Drama lessons:', DRAMA.length, '| ids:', [...dramaIds].join(','));

// 4d. TOPIK II bank + mock tests integrity
const T2ids = new Set();
TOPIK2.forEach((q) => {
  if (T2ids.has(q.id)) errors.push(`topik2 dup id ${q.id}`);
  T2ids.add(q.id);
  if (!q.q || !q.section) errors.push(`topik2 ${q.id} missing fields`);
  if (!q.qGl) errors.push(`topik2 ${q.id} missing qGl (EN translation)`);
  if (q.section !== 'writing' && !(q.options && q.correct >= 0 && q.correct < q.options.length)) errors.push(`topik2 ${q.id} bad options/correct`);
  if (q.section === 'writing' && !q.writePrompt) errors.push(`topik2 ${q.id} writing missing writePrompt`);
  if (q.level < 3) errors.push(`topik2 ${q.id} level should be 3+`);
  if (q.options && q.options.length === 4 && (!q.optExplain || q.optExplain.length !== 4)) errors.push(`topik2 ${q.id} missing optExplain (4 items)`);
});
MOCK.forEach((m) => {
  if (!m.id || !m.date || !m.name) errors.push(`mock missing fields`);
  m.qids.forEach(qid => { if (!T2ids.has(qid) && !TOPIK1.some(x => x.id === qid)) errors.push(`mock ${m.id} unknown qid ${qid}`); });
});
console.log('TOPIK2 bank:', TOPIK2.length, '| Mock tests:', MOCK.length);

// 4d2. Level banks (L1–L6) integrity: each 10 reading + 10 listening
const LV_ALL = [];
for (let n = 1; n <= 6; n++) {
  const arr = window['LEVEL' + n + '_BANK'];
  if (!arr) { errors.push(`level${n} bank missing`); continue; }
  const read = arr.filter(q => q.section === 'reading').length;
  const listen = arr.filter(q => q.section === 'listening').length;
  if (read !== 10) errors.push(`level${n} bank reading=${read} (expected 10)`);
  if (listen !== 10) errors.push(`level${n} bank listening=${listen} (expected 10)`);
  arr.forEach(q => {
    if (q.level !== n) errors.push(`level${n} ${q.id} level=${q.level}`);
    if (!q.id || !q.q || !q.qGl) errors.push(`level${n} ${q.id} missing id/q/qGl`);
    if (!q.options || q.options.length !== 4) errors.push(`level${n} ${q.id} not 4 options`);
    else if (!(q.correct >= 0 && q.correct < 4)) errors.push(`level${n} ${q.id} bad correct`);
    if (!q.explain || !q.tip) errors.push(`level${n} ${q.id} missing explain/tip`);
    if (!['reading', 'listening'].includes(q.section)) errors.push(`level${n} ${q.id} bad section`);
    if (q.options && q.options.length === 4 && (!q.optExplain || q.optExplain.length !== 4)) errors.push(`level${n} ${q.id} missing optExplain (4 items)`);
    if (q.options && q.options.length === 4 && (!q.optExplainEn || q.optExplainEn.length !== 4 || !q.tipEn)) errors.push(`level${n} ${q.id} missing optExplainEn/tipEn (EN)`);
    LV_ALL.push(q);
  });
  console.log(`Level${n} bank: ${arr.length} qs (reading ${read} / listening ${listen})`);
}
const lvIds = new Set(LV_ALL.map(q => q.id));
if (lvIds.size !== LV_ALL.length) errors.push('level banks have duplicate ids');
console.log('Level banks total:', LV_ALL.length, '| unique ids:', lvIds.size);

// 4e. schedule integrity
const SCHED_PBTS = new Set(SCHEDULE.pbt.map(p => parseInt(p.session)));
const allSessions = new Set(SCHEDULE.pbt.map(p => parseInt(p.session)));
SCHEDULE.countries.forEach(c => {
  if (!c.key || !c.name || !c.sessions.length) errors.push(`schedule country ${c.key || '?'} missing fields`);
  c.sessions.forEach(s => { if (!allSessions.has(s)) errors.push(`schedule ${c.key} unknown session ${s}`); });
});
if (SCHEDULE.pbt.length !== 6) errors.push('schedule: PBT should have 6 sessions');
console.log('Schedule: PBT', SCHEDULE.pbt.length, '| IBT', SCHEDULE.ibt.length, '| countries', SCHEDULE.countries.length);
console.log(errors.length ? `ERRORS (${errors.length}):\n - ` + errors.join('\n - ') : 'ALL DATA CHECKS PASSED');

// 5. Quiz scoring engine (replicate pure function from quiz.js)
function quizResult(scores) {
  let band = 1;
  for (let b = 1; b <= 6; b++) {
    const c = scores[b] || 0;
    if (c === 2) band = b;
    else if (c === 1) return { band: b, partial: true, scores };
    else break;
  }
  return { band: band >= 6 ? 6 : band, partial: false, scores };
}
const t1 = quizResult({1:2,2:2,3:1,4:0,5:0,6:0});   // strong through band 2, half of 3
const t2 = quizResult({1:2,2:2,3:2,4:2,5:2,6:2});   // perfect
const t3 = quizResult({1:2,2:0,3:0,4:0,5:0,6:0});   // only band 1 (misses band 2)
const t4 = quizResult({1:1,2:0,3:0,4:0,5:0,6:0});   // weak band 1
console.log('Score engine: perfect→band', t2.band, '| strong→', t1.band, t1.partial ? '(partial)' : '', '| only1→', t3.band, '| weak→', t4.band, t4.partial ? '(partial)' : '');
if (t2.band !== 6 || t1.band !== 3 || !t1.partial || t3.band !== 1 || t4.band !== 1 || !t4.partial) {
  console.log('SCORE ENGINE MISBEHAVING');
}
