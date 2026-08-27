// Data integrity verification for Camnemi TOPIK site
const fs = require('fs');
const path = require('path');
const base = __dirname;

// Load data files into a fake window
global.window = {};
eval(fs.readFileSync(path.join(base, 'data', 'lessons.js'), 'utf8'));
eval(fs.readFileSync(path.join(base, 'data', 'level-test.js'), 'utf8'));
eval(fs.readFileSync(path.join(base, 'data', 'topik1-bank.js'), 'utf8'));
const LESSONS = window.LESSONS;
const QUIZ = window.QUIZ;
const TOPIK1 = window.TOPIK1_BANK;

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
  if (q.explainAudio && !fs.existsSync(path.join(base, q.explainAudio))) errors.push(`topik1 ${q.id} explainAudio missing file: ${q.explainAudio}`);
});
if (TOPIK1.length < 10) errors.push(`topik1 bank too small (${TOPIK1.length})`);
console.log('TOPIK1 bank:', TOPIK1.length, '| listening:', secCount.listening, '| reading:', secCount.reading, '| levels:', JSON.stringify(levelCount), '| answers:', JSON.stringify(ansDist));
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
