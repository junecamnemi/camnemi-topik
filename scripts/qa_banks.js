#!/usr/bin/env node
/*
 * qa_banks.js — camnemi-topik question-bank全数 QA
 * --------------------------------------------------------------
 * Checks EVERY question across all sources (reading / listening /
 * writing / mock / vocab / daily) for the error classes the user
 * has hit. Exits non-zero when any ERROR is found.
 *
 * Usage:  node scripts/qa_banks.js [--json]
 * Sources scanned:
 *   data/topik1-bank.js  data/topik2-bank.js
 *   data/level1..6-bank.js  data/gen-bank.js
 *   data/level-test.js (QUIZ)   data/daily-bank.json
 *   data/mock-tests.js (MOCK_META — references qids)
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');

const errors = [];
const warns = [];
let scanned = 0;
const perFile = {};

function err(file, id, code, msg) { errors.push({ file, id, code, msg }); }
function warn(file, id, code, msg) { warns.push({ file, id, code, msg }); }

function loadJs(file) {
  const s = fs.readFileSync(path.join(DATA, file), 'utf8');
  const m = s.match(/window\.(\w+)\s*=\s*([\[{][\s\S]*?[\]}]);/);
  if (!m) return null;
  try { return { name: m[1], data: eval('(' + m[2] + ')') }; }
  catch (e) { err(file, '-', 'EVAL_FAIL', e.message); return null; }
}

// ---- helpers ----
const TASK_WORDS = /(고르십시오|답하십시오|쓰십시오|무엇|무슨|어디|누구|언제|왜|어떻게|몇|맞는 것|같은 것|알맞은|들어갈|이유|중심|주제|밑줄|고르세요|선택)/;
const isBareInstruction = (q) => /물음에\s*답하십시오/.test(q) && !TASK_WORDS.test(q.replace('물음에 답하십시오', ''));

const WRITING_TYPES = /writing/;

function checkQuestion(file, q, idx) {
  scanned++;
  const id = q.id || q.q || `${file}#${idx}`;
  const sec = q.section || (file.includes('level-test') ? 'leveltest' : '');
  const type = q.type || '';
  const isWriting = WRITING_TYPES.test(type) || !!q.answerModel || !!q.writePrompt;

  // 1) missing / empty question text
  if (!q.q || !String(q.q).trim()) err(file, id, 'EMPTY_Q', 'question text is empty (물음 없음)');

  // 2) bare instruction referencing a "물음" but supplying none
  if (q.q && isBareInstruction(String(q.q)) && !q.subq) err(file, id, 'BARE_INSTRUCTION', `"${q.q}" references 물음 but has no subq`);

  // 3) options present & valid (skip writing)
  if (!isWriting) {
    if (!Array.isArray(q.options) || q.options.length < 2) {
      err(file, id, 'NO_OPTIONS', `options missing/<2 (${Array.isArray(q.options) ? q.options.length : 'none'})`);
    } else {
      if (q.options.length !== 4) warn(file, id, 'OPT_COUNT', `${q.options.length} options (expected 4)`);
      const texts = q.options.map(o => (o && typeof o === 'object') ? String(o.t || '') : String(o || ''));
      if (texts.some(t => !t.trim())) err(file, id, 'EMPTY_OPTION', 'an option has empty text');
      const dup = texts.filter((t, i) => t && texts.indexOf(t) !== i);
      if (dup.length) err(file, id, 'DUP_OPTION', `duplicate option(s): ${[...new Set(dup)].join(' / ')}`);
      // correct index valid
      const ci = typeof q.correct === 'number' ? q.correct : parseInt(q.correct);
      if (isNaN(ci) || ci < 0 || ci >= q.options.length) err(file, id, 'BAD_CORRECT', `correct=${q.correct} out of range(0..${q.options.length - 1})`);
    }
  }

  // 4) underline mention must carry <u> (blank-fill ______ is exempt)
  const blob = (q.passage || '') + ' ' + (q.q || '');
  const mentionsUnderline = /밑줄|밑\s*친|underlin/i.test((q.q || '') + (q.passage || ''));
  if (mentionsUnderline && !blob.includes('<u>') && !/_{3,}/.test(blob)) {
    err(file, id, 'UNDERLINE_MISSING', 'mentions 밑줄 but passage/q has no <u> tag');
  }

  // 5) passage required for READING comprehension-ish types.
  //    Listening scripts live in dialogue/audioHint/q, so they are exempt.
  const isReading = (sec === 'reading') || (!sec && /^(LV|T2R|R\d)/.test(String(id)));
  const needsPassage = /(comprehension|long|same_content|main_idea|insert_sentence|order|attitude|notice|headline|topic|detail)/.test(type);
  if (needsPassage && isReading && (!q.passage || !String(q.passage).trim())) {
    err(file, id, 'NO_PASSAGE', `reading type=${type} requires a passage but none present`);
  }
  // 5b) listening questions MUST carry a script somewhere (dialogue/audioHint/q itself)
  if (sec === 'listening') {
    const hasScript = (q.dialogue && String(q.dialogue).trim()) || (q.audioHint && String(q.audioHint).trim()) || (q.passage && String(q.passage).trim()) || (String(q.q || '').length > 12);
    if (!hasScript) err(file, id, 'LISTENING_NO_SCRIPT', 'listening question has no dialogue/audioHint/passage/script');
  }

  // 5c) freqNote level mismatch: a TOPIK I question must not carry a "TOPIK II" note (and vice-versa)
  if (q.freqNote) {
    const lv = q.level || 0;
    if (/TOPIK II/.test(q.freqNote) && lv > 0 && lv <= 2) err(file, id, 'FREQ_LEVEL_MISMATCH', `level ${lv} carries freqNote "${q.freqNote}"`);
    if (/TOPIK I(?!I)/.test(q.freqNote) && lv >= 3) err(file, id, 'FREQ_LEVEL_MISMATCH', `level ${lv} carries freqNote "${q.freqNote}"`);
  }

  // 6) explanation & tip presence
  if (!isWriting && (!q.explain || !String(q.explain).trim())) err(file, id, 'NO_EXPLAIN', 'explain is empty');
  if (!isWriting && (!q.tip || !String(q.tip).trim())) warn(file, id, 'NO_TIP', 'tip is empty');

  // 7) optExplain length should match options
  if (Array.isArray(q.optExplain) && Array.isArray(q.options) && q.optExplain.length !== q.options.length) {
    warn(file, id, 'OPTEXPLAIN_LEN', `optExplain ${q.optExplain.length} != options ${q.options.length}`);
  }

  // 8) instructions grammar typo: "다음 읽고" → "다음을 읽고"
  if (/다음\s+읽고/.test(String(q.q || ''))) err(file, id, 'TYPO', '"다음 읽고" (should be "다음을 읽고")');

  // 9) given sentence (insert_sentence) must carry a `given`
  if (/insert_sentence/.test(type) && (!q.given || !String(q.given).trim())) {
    err(file, id, 'NO_GIVEN', 'insert_sentence type but no `given` sentence');
  }
}

// ---------- scan banks ----------
const jsBanks = ['topik1-bank.js','topik2-bank.js','level1-bank.js','level2-bank.js','level3-bank.js','level4-bank.js','level5-bank.js','level6-bank.js','gen-bank.js'];
for (const f of jsBanks) {
  const r = loadJs(f); if (!r || !Array.isArray(r.data)) continue;
  perFile[f] = r.data.length;
  r.data.forEach((q, i) => checkQuestion(f, q, i));
}

// level-test QUIZ (band/q/options/correct/explain)
const lt = loadJs('level-test.js');
if (lt && Array.isArray(lt.data)) {
  perFile['level-test.js'] = lt.data.length;
  lt.data.forEach((q, i) => {
    scanned++;
    const id = `LT#${q.band}`;
    if (!q.q) err('level-test.js', id, 'EMPTY_Q', 'no q');
    if (!Array.isArray(q.options) || q.options.length < 2) err('level-test.js', id, 'NO_OPTIONS', 'options<2');
    else if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) err('level-test.js', id, 'BAD_CORRECT', `correct=${q.correct}`);
    if (!q.explain) warn('level-test.js', id, 'NO_EXPLAIN', 'no explain');
  });
}

// daily-bank.json (array of generated questions)
try {
  const daily = JSON.parse(fs.readFileSync(path.join(DATA, 'daily-bank.json'), 'utf8'));
  if (Array.isArray(daily)) {
    perFile['daily-bank.json'] = daily.length;
    daily.forEach((q, i) => checkQuestion('daily-bank.json', q, i));
  }
} catch (e) { err('daily-bank.json', '-', 'PARSE_FAIL', e.message); }

// mock-tests.js references qids — verify each qid exists in some bank
const mt = loadJs('mock-tests.js');
if (mt && Array.isArray(mt.data)) {
  perFile['mock-tests.js'] = mt.data.length;
  const allIds = new Set();
  for (const f of jsBanks) { const r = loadJs(f); if (r && Array.isArray(r.data)) r.data.forEach(q => q.id && allIds.add(q.id)); }
  mt.data.forEach(m => {
    (m.qids || []).forEach(qid => { if (!allIds.has(qid)) warn('mock-tests.js', m.id, 'MOCK_QID_MISSING', `qid ${qid} not found in any bank`); });
  });
}

// ---------- report ----------
const byCode = {};
errors.forEach(e => byCode[e.code] = (byCode[e.code] || 0) + 1);
if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ scanned, perFile, errors, warns, byCode }, null, 1));
} else {
  console.log(`\n=== camnemi-topik question QA ===`);
  console.log(`scanned: ${scanned} questions across ${Object.keys(perFile).length} files`);
  console.log(Object.entries(perFile).map(([f, n]) => `  ${f}: ${n}`).join('\n'));
  console.log(`\nERRORS: ${errors.length}   WARNINGS: ${warns.length}`);
  if (errors.length) {
    console.log('\n--- ERRORS ---');
    for (const e of errors) console.log(`  [${e.code}] ${e.file} ${e.id}: ${e.msg}`);
    console.log('\n  by code:', JSON.stringify(byCode));
  }
  if (warns.length && process.env.QA_SHOW_WARN) {
    console.log('\n--- WARNINGS ---');
    for (const w of warns) console.log(`  [${w.code}] ${w.file} ${w.id}: ${w.msg}`);
  }
  console.log('');
}
process.exit(errors.length ? 1 : 0);
