/* Camnemi TOPIK App — main engine (mobile, 5-tab)
   Screens: home | daily | mock | wrong | learn
   Data: TOPIK1_BANK + TOPIK2_BANK + MOCK_TESTS
   Persistence: localStorage (camnemi_topik_*) — auth sync added later.
*/
/* eslint-disable no-unused-vars */

/* ---------- state ---------- */
const APP = {
  tab: 'home',
  level: 'II',              // 'I' | 'II' (target test)
  daily: [],                // today's 10 questions
  dailyIdx: 0,
  dailyAnswers: {},         // qid -> picked option index (or writing text)
  mock: null,               // active mock test
  mockIdx: 0,
  mockAnswers: {},
  aiMode: false             // true when the current daily set is AI-generated
};

/* ---------- AI backend ----------
   Local dev: ai_server.py on :9001 (Hermes Nous LLM).
   Deployed:  point AI_API_BASE to a Supabase Edge Function (see docs). */
const AI_API_BASE = (window.CAMNEMI_AI_BASE || 'http://127.0.0.1:9001');

const LS = {
  progress: 'camnemi_topik_progress',   // { qid: {correct, total} }
  daily:    'camnemi_topik_daily',      // { date: { qids, done: {qid:pick}, score } }
  wrong:    'camnemi_topik_wrong',      // [ {qid, at} ] — recent misses
  streak:   'camnemi_topik_streak'      // { last: 'YYYY-MM-DD', count: n }
};

/* ---------- helpers ---------- */
const $id = id => document.getElementById(id);
const todayStr = () => new Date().toISOString().slice(0, 10);
function lsGet(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
function lsSet(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
function allQuestions() {
  const t1 = (window.TOPIK1_BANK || []);
  const t2 = (window.TOPIK2_BANK || []);
  return t1.concat(t2);
}
function qById(id) { return allQuestions().find(q => q.id === id); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function levelOf(q) { return q.level <= 2 ? 'I' : 'II'; }

/* ---------- tab routing ---------- */
function go(tab) {
  APP.tab = tab;
  document.querySelectorAll('.tab-item').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  const titles = { home:'Camnemi TOPIK', daily:'Daily 10', mock:'Mock Test', wrong:'My Notes', learn:'Learn' };
  const hsub = $id('app-h-sub');
  if (hsub) hsub.textContent = titles[tab] || '';
  render();
}
function render() {
  const s = $id('screen');
  if (!s) return;
  switch (APP.tab) {
    case 'home': s.innerHTML = viewHome(); bindHome(); break;
    case 'daily': s.innerHTML = viewDaily(); bindDaily(); break;
    case 'mock': s.innerHTML = viewMock(); bindMock(); break;
    case 'wrong': s.innerHTML = viewWrong(); bindWrong(); break;
    case 'learn': s.innerHTML = viewLearn(); bindLearn(); break;
  }
}

/* ================= HOME ================= */
function viewHome() {
  const prog = lsGet(LS.progress, {});
  const answered = Object.keys(prog).length;
  const mastered = Object.values(prog).filter(p => (p.correct || 0) > 0).length;
  const streak = lsGet(LS.streak, { last: null, count: 0 });
  const today = lsGet(LS.daily, {});
  const doneToday = today[todayStr()] && today[todayStr()].done;
  const doneCount = doneToday ? Object.keys(doneToday).length : 0;
  const acc = accuracyStats();
  return `
    <div class="app-card big-cta">
      <div class="cta-ico">🇰🇷</div>
      <h2 style="font-size:22px;color:var(--navy-dark);margin-bottom:6px;">${APP.level === 'II' ? 'TOPIK II · Level 3' : 'TOPIK I · Level 1–2'}</h2>
      <p class="sub">AI-generated questions · daily mock tests · weak-spot review</p>
      <div class="stat-row">
        <div class="stat-box"><b>${streak.count}</b><span>🔥 streak</span></div>
        <div class="stat-box"><b>${doneCount}/10</b><span>📅 today</span></div>
        <div class="stat-box"><b>${mastered}</b><span>🏆 mastered</span></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:14px;">
        <button class="btn btn-primary" style="flex:1;" onclick="go('daily')">📅 Today's 10</button>
        <button class="btn btn-teal" style="flex:1;" onclick="go('mock')">📝 Mock Test</button>
      </div>
    </div>

    <div class="sec-h"><h2>📊 평균 정답률</h2><span class="sub">전체 ${acc.overall}%</span></div>
    <div class="app-card">
      <b style="font-size:13px;color:var(--navy);">유형별</b>
      ${acc.byType.length
        ? acc.byType.slice(0, 5).map(r => accBar(typeLabel(r.k), r.p, `${r.c}/${r.n}문항`)).join('')
        : '<p class="sub" style="margin-top:6px;">문제를 풀면 여기에 유형별 정답률이 표시돼요!</p>'}
      ${acc.byType.length > 5 ? `<div class="sub" style="font-size:11px;margin-top:6px;">+ ${acc.byType.length - 5}개 유형 더 보기 → 📓 My Notes</div>` : ''}
    </div>
    <div class="app-card">
      <b style="font-size:13px;color:var(--navy);">난이도별</b>
      ${acc.byLevel.length
        ? acc.byLevel.map(r => accBar(r.k <= 2 ? '★'.repeat(r.k) : 'L' + r.k + ' ★'.repeat(Math.max(1, r.k - 2)), r.p, `${r.c}/${r.n}문항`)).join('')
        : '<p class="sub" style="margin-top:6px;">난이도별 정답률도 여기에 표시돼요!</p>'}
    </div>

    <div class="sec-h"><h2>Choose your test</h2></div>
    <div class="app-card">
      <div class="lvl-pills" id="home-lvl">
        <button class="lvl-pill ${APP.level==='I'?'active':''}" data-lvl="I" onclick="setLevel('I')">TOPIK I · L1–2</button>
        <button class="lvl-pill lv2 ${APP.level==='II'?'active':''}" data-lvl="II" onclick="setLevel('II')">TOPIK II · L3–6</button>
      </div>
      <p class="sub">${APP.level === 'II'
        ? 'Level 3 is the score most Korean universities require. AI generates reading, listening & writing questions at your level.'
        : 'Start with TOPIK I basics — AI builds questions that match your current level.'}</p>
    </div>

    <div class="sec-h"><h2>Quick actions</h2></div>
    <div class="app-card"><div class="row" onclick="go('learn')" style="cursor:pointer;">
      <div><b>📚 Weak-spot review</b><div class="sub">Vocab &amp; grammar based on your mistakes</div></div><span style="color:var(--teal);">→</span></div></div>
    <div class="app-card"><div class="row" onclick="go('wrong')" style="cursor:pointer;">
      <div><b>📓 Wrong answer notes</b><div class="sub">${lsGet(LS.wrong, []).length} recent misses · type-wise breakdown</div></div><span style="color:var(--teal);">→</span></div></div>
  `;
}
function setLevel(lv) {
  APP.level = lv;
  document.querySelectorAll('#home-lvl .lvl-pill').forEach(b => b.classList.toggle('active', b.dataset.lvl === lv));
  document.querySelector('#home-lvl .lvl-pill.lv2').classList.toggle('active', lv === 'II');
  render();
}
function bindHome() {}

/* ================= DAILY 10 ================= */
function buildDaily() {
  const today = todayStr();
  const saved = lsGet(LS.daily, {})[today];
  if (saved && saved.questions) {
    // AI-generated set: full question objects stored
    APP.daily = saved.questions;
    APP.dailyAnswers = saved.done || {};
    APP.aiMode = true;
  } else if (saved && saved.qids) {
    APP.daily = saved.qids.map(qById).filter(Boolean);
    APP.dailyAnswers = saved.done || {};
    APP.aiMode = false;
  } else {
    // AI-style daily set: pick 10 by level, balanced sections
    const pool = allQuestions().filter(q => levelOf(q) === APP.level);
    const secs = ['reading','listening','writing'];
    const picked = [];
    secs.forEach(sec => {
      const inSec = pool.filter(q => q.section === sec);
      const want = sec === 'writing' ? 2 : 4;
      for (let i = 0; i < want && inSec.length; i++) {
        const q = inSec[i % inSec.length];
        if (!picked.includes(q.id)) picked.push(q.id);
      }
    });
    pool.forEach(q => { if (picked.length < 10 && !picked.includes(q.id)) picked.push(q.id); });
    APP.daily = picked.map(qById).filter(Boolean);
    APP.dailyAnswers = {};
    APP.aiMode = false;
    const all = lsGet(LS.daily, {});
    all[today] = { qids: picked, done: {} };
    lsSet(LS.daily, all);
  }
}
function viewDaily() {
  buildDaily();
  if (APP.dailyDone) return viewDailyResult();
  const today = todayStr();
  const saved = lsGet(LS.daily, {})[today] || {};
  const done = saved.done || {};
  const qs = APP.daily;
  const doneCount = Object.keys(done).length;
  const pct = qs.length ? Math.round(doneCount / qs.length * 100) : 0;
  const q = qs[APP.dailyIdx];
  if (!q) {
    return `<div class="app-card big-cta">
      <div class="cta-ico">🎉</div><h2>All done for today!</h2>
      <p class="sub">Come back tomorrow for a fresh AI set. Review your mistakes in My Notes.</p>
      <button class="btn btn-primary" style="margin-top:14px;" onclick="go('wrong')">📓 Review mistakes</button>
      ${APP.aiMode ? '' : `<button class="btn btn-teal" style="margin-top:8px;" onclick="generateAI()">✨ Generate new AI questions</button>`}
    </div>`;
  }
  const picked = done[q.id];
  const isAI = String(q.id).startsWith('AI');
  return `
    <div class="app-card">
      <div class="row"><span class="q-num">Q${APP.dailyIdx + 1} / ${qs.length} · DAILY${isAI ? ' ✨ AI' : ''}</span>
      <span class="q-type">${q.section === 'reading' ? '📖 Reading' : q.section === 'listening' ? '🎧 Listening' : '✍️ Writing'}</span></div>
      <div class="daily-progress"><div style="width:${pct}%"></div></div>
      <div style="margin:8px 0;">
        ${isAI
          ? '<span style="font-size:11px;color:var(--teal);font-weight:800;">✨ Generated by AI — unique to you</span>'
          : '<button class="btn btn-teal btn-sm" onclick="generateAI()">✨ Generate with AI</button>'}
      </div>
      ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ''}
      ${q.audioHint ? `<div class="sub" style="font-size:12px;margin-bottom:6px;">🎧 ${q.audioHint}</div>` : ''}
      <div class="q-kr">${q.q}</div>
      ${q.section === 'writing'
        ? `<textarea class="q-write" id="write-ans" placeholder="여기에 답을 쓰세요…">${picked && picked.w ? esc(picked.w) : ''}</textarea>
           <button class="btn btn-primary" style="margin-top:10px;width:100%;" onclick="submitWriting()">Submit answer</button>`
        : q.options.map((o, i) => `
          <button class="q-opt ${picked === i ? 'correct' : ''} ${picked !== undefined && picked !== i ? 'disabled' : ''}" ${picked !== undefined ? 'disabled' : ''} onclick="pickDaily(${i})">
            <span style="font-weight:700;">${'①②③④'[i]}</span> ${esc(o.t)} ${o.gl ? `<span class="sub" style="font-size:12px;"> · ${esc(o.gl)}</span>` : ''}
          </button>`).join('')}
      <div class="q-explain ${picked !== undefined ? 'show' : ''}" id="daily-ex">
        ${picked !== undefined ? `
          <b>✓ 정답: ${'①②③④'[q.correct]}</b> — ${esc(q.explain)}
          ${q.traps && q.traps.length ? `<div class="why-wrong" style="margin-top:6px;"><b>✗ 오답 이유:</b> ${q.traps.map(esc).join(' · ')}</div>` : ''}
          ${q.tip ? `<div style="margin-top:6px;"><b>💡 Tip:</b> ${esc(q.tip)}</div>` : ''}
        ` : ''}
      </div>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost" ${APP.dailyIdx === 0 ? 'disabled style="opacity:.4"' : ''} onclick="navDaily(-1)">← Prev</button>
      <button class="btn btn-teal" style="flex:1;" onclick="navDaily(1)">${APP.dailyIdx >= qs.length - 1 ? 'Finish →' : 'Next →'}</button>
    </div>
  `;
}
/* ---------- AI question generation ---------- */
async function generateAI() {
  // find the triggering button safely (no reliance on global `event`)
  const btn = document.querySelector('[onclick="generateAI()"]') || null;
  if (btn) { btn.disabled = true; btn.textContent = '✨ Generating… (AI)'; }
  const status = $id('ai-status');
  if (status) status.textContent = '✨ AI가 문제를 만들고 있습니다…';
  try {
    const res = await fetch(AI_API_BASE + '/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level: APP.level, count: 10, section: 'all' })
    });
    const data = await res.json();
    if (!res.ok || !data.questions) throw new Error(data.error || 'AI server error');
    const qs = data.questions;
    if (!qs.length) throw new Error('AI returned no questions');
    // store as today's AI set (full question objects so it survives reload)
    const today = todayStr();
    const all = lsGet(LS.daily, {});
    all[today] = { questions: qs, done: {}, ai: true };
    lsSet(LS.daily, all);
    APP.daily = qs;
    APP.dailyIdx = 0;
    APP.dailyAnswers = {};
    APP.aiMode = true;
    APP.dailyDone = false;   // fresh set → back to questions
    render();
    if (status) status.textContent = '';
  } catch (e) {
    if (status) status.textContent = '⚠ ' + e.message;
    toast('AI generation failed: ' + e.message);
    if (btn) { btn.disabled = false; btn.textContent = '✨ Generate with AI'; }
  }
}
function pickDaily(i) {
  const q = APP.daily[APP.dailyIdx];
  if (!q) return;
  const today = todayStr();
  const all = lsGet(LS.daily, {});
  all[today].done[q.id] = i;
  lsSet(LS.daily, all);
  recordResult(q, i === q.correct);
  render();
}
function submitWriting() {
  const q = APP.daily[APP.dailyIdx];
  const ta = $id('write-ans');
  if (!q || !ta) return;
  const today = todayStr();
  const all = lsGet(LS.daily, {});
  all[today].done[q.id] = { w: ta.value };
  lsSet(LS.daily, all);
  render();
}
function navDaily(d) {
  // at last question, moving forward triggers the finish screen
  if (d > 0 && APP.dailyIdx >= APP.daily.length - 1) { finishDaily(); return; }
  APP.dailyIdx = Math.min(APP.daily.length - 1, Math.max(0, APP.dailyIdx + d));
  render();
}
function bindDaily() {}

/* ---------- Daily finish → estimated TOPIK score ---------- */
function finishDaily() {
  const today = todayStr();
  const saved = lsGet(LS.daily, {})[today] || {};
  const done = saved.done || {};
  const qs = APP.daily;
  let correct = 0, wrong = 0, unanswered = 0;
  qs.forEach(q => {
    const ans = done[q.id];
    if (ans === undefined) { unanswered++; return; }
    if (q.section === 'writing') { correct++; return; }        // submitted writing counts as attempted
    if (ans === q.correct) correct++; else wrong++;
  });
  APP.dailyResult = { correct, wrong, unanswered, total: qs.length };
  APP.dailyDone = true;
  render();
}

function estimatedScore() {
  const r = APP.dailyResult || { correct: 0, wrong: 0, unanswered: 0, total: 1 };
  const total = r.correct + r.wrong;
  if (total === 0) return { score: 0, pct: 0, level: '—', next: '—', passI: 0, passII: 0, passLabel: '' };
  const maxScore = APP.level === 'I' ? 200 : 300;
  const pct = r.correct / total;
  const score = Math.round(pct * maxScore);
  let level, next;
  if (APP.level === 'I') {
    if (score >= 140) { level = 'TOPIK I · Level 2'; next = 'Level 3 is next!'; }
    else if (score >= 80) { level = 'TOPIK I · Level 1'; next = 'Need 140+ for Level 2'; }
    else { level = 'Below Level 1'; next = 'Keep practicing!'; }
  } else {
    if (score >= 230) { level = 'TOPIK II · Level 6'; next = 'Amazing!'; }
    else if (score >= 190) { level = 'TOPIK II · Level 5'; next = 'So close to 6!'; }
    else if (score >= 150) { level = 'TOPIK II · Level 4'; next = 'Aim for 190+ → Level 5'; }
    else if (score >= 120) { level = 'TOPIK II · Level 3'; next = 'Your goal! Keep going → 150'; }
    else { level = 'Below Level 3'; next = 'Need 120+ for Level 3'; }
  }
  // 합격 확률: 정답률을 합격 커트라인에 선형 매핑 (10문항 샘플 보정)
  let passI = 0, passII = 0, passLabel = '';
  if (APP.level === 'I') {
    passI = clampPct(pct * 100);
    passII = clampPct(((pct - 140 / 200) / (1 - 140 / 200)) * 100);
    passLabel = 'TOPIK I 합격확률';
  } else {
    passII = clampPct(pct * 100);
    passI = clampPct(((pct - 120 / 300) / (1 - 120 / 300)) * 100);
    passLabel = 'TOPIK II 합격확률';
  }
  return { score, pct, level, next, maxScore, passI, passII, passLabel };
}
function clampPct(v) { return Math.max(0, Math.min(100, Math.round(v))); }

function viewDailyResult() {
  const r = APP.dailyResult || { correct: 0, wrong: 0, unanswered: 0, total: 1 };
  const est = estimatedScore();
  // 상단 요약: 예상 점수 + 합격 확률
  const passTarget = APP.level === 'I' ? 'TOPIK I (L1 이상)' : 'TOPIK II (L3 이상)';
  return `
    <div class="app-card big-cta">
      <div class="cta-ico">🎯</div>
      <h2 style="font-size:22px;color:var(--navy-dark);margin-bottom:6px;">Daily 10 완료!</h2>
      <p class="sub">${r.total}문항 중 ${r.correct + r.wrong}문항 답변</p>
      <div style="margin:18px 0;">
        <div style="font-size:15px;color:var(--muted);">나의 예상 점수</div>
        <div style="font-size:52px;font-weight:800;color:var(--navy);">${est.score}<span style="font-size:20px;color:var(--muted);"> / ${est.maxScore}</span></div>
        <div class="mock-badge ${APP.level === 'I' ? 't1' : 't2'}" style="margin-top:8px;">${est.level}</div>
        <div class="sub" style="margin-top:6px;">${est.next}</div>
        <!-- 합격 확률 -->
        <div style="margin-top:16px;padding:12px;background:#f0f3fa;border-radius:12px;">
          <div style="font-size:13px;color:var(--muted);margin-bottom:6px;">${est.passLabel} · ${passTarget}</div>
          <div style="font-size:30px;font-weight:800;color:var(--teal);">${APP.level === 'I' ? est.passI : est.passII}%</div>
          <div style="font-size:12px;color:var(--muted);margin-top:4px;">TOPIK ${APP.level === 'I' ? 'II' : 'I'} 전환 시 ${APP.level === 'I' ? est.passII : est.passI}%</div>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat-box"><b style="color:var(--teal);">${r.correct}</b><span>✓ 정답</span></div>
        <div class="stat-box"><b style="color:var(--red);">${r.wrong}</b><span>✗ 오답</span></div>
        <div class="stat-box"><b>${r.unanswered}</b><span>⏳ 미응답</span></div>
      </div>
      <p class="sub" style="font-size:11.5px;">※ 10문제 기준 예상치입니다. 실제 시험과 다를 수 있어요.</p>
    </div>
    <div class="app-card">
      <h3>계속할까요?</h3>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
        <button class="btn btn-teal" onclick="continueAfterFinish()">✨ 새 문제 더 풀기</button>
        <button class="btn btn-primary" onclick="go('mock')">📝 모의고사 보기</button>
        <button class="btn btn-ghost" onclick="go('wrong')">📓 오답노트 보기</button>
        <button class="btn btn-ghost" onclick="APP.dailyDone=false; APP.dailyIdx=0; go('home')">🏠 오늘 끝내기</button>
      </div>
    </div>
  `;
}
function continueAfterFinish() {
  APP.dailyDone = false;
  APP.dailyIdx = 0;
  render();
  generateAI();
}

/* ---------- shared result recording ---------- */
/* 유형/난이도 라벨 (한국어 표기) */
const TYPE_LABELS = {
  grammar: '문법', vocab: '어휘', main_idea: '중심내용', order: '순서',
  sentence_pos: '문장위치', reply: '대답고르기', place: '장소', topic: '주제',
  intent: '의도', detail: '세부사항', flow: '흐름', synonym: '동의어',
  notice: '안내문', comprehension: '내용이해', long: '장문',
  writing_short: '쓰기·단답', writing_letter: '쓰기·편지'
};
function typeLabel(t) { return TYPE_LABELS[t] || t; }

/* 유형별·난이도별 평균 정답률 계산 (progress 기반) */
function accuracyStats() {
  const prog = lsGet(LS.progress, {});
  const byType = {}, byLevel = {};
  allQuestions().forEach(q => {
    const p = prog[q.id];
    if (!p || !p.total) return;
    const t = q.type || q.section;
    byType[t] = byType[t] || { c: 0, n: 0 };
    byType[t].c += p.correct; byType[t].n += p.total;
    const lv = q.level || 1;
    byLevel[lv] = byLevel[lv] || { c: 0, n: 0 };
    byLevel[lv].c += p.correct; byLevel[lv].n += p.total;
  });
  const pct = s => s ? Math.round(s.c / s.n * 100) : 0;
  const rows = obj => Object.entries(obj)
    .map(([k, s]) => ({ k, ...s, p: pct(s) }))
    .sort((a, b) => a.p - b.p);            // 취약한 것부터
  return {
    byType: rows(byType),
    byLevel: rows(byLevel).sort((a, b) => a.k - b.k),
    overall: (() => {
      let c = 0, n = 0;
      Object.values(byType).forEach(s => { c += s.c; n += s.n; });
      return n ? Math.round(c / n * 100) : 0;
    })()
  };
}

/* 정답률 바 렌더 헬퍼 */
function accBar(label, p, sub) {
  const color = p >= 70 ? 'var(--teal)' : p >= 40 ? 'var(--gold)' : 'var(--red)';
  return `
    <div style="padding:7px 0;border-bottom:1px solid var(--border);">
      <div class="row"><span style="font-size:13px;">${esc(label)}</span>
        <b style="font-size:13px;color:${color};">${p}%</b></div>
      <div class="daily-progress" style="margin:4px 0 0;height:6px;">
        <div style="width:${p}%;background:${color};"></div>
      </div>
      ${sub ? `<div class="sub" style="font-size:10.5px;margin-top:2px;">${sub}</div>` : ''}
    </div>`;
}
function recordResult(q, correct) {
  // progress
  const prog = lsGet(LS.progress, {});
  const p = prog[q.id] || { correct: 0, total: 0 };
  p.total += 1;
  if (correct) p.correct += 1;
  prog[q.id] = p;
  lsSet(LS.progress, prog);
  // wrong note
  if (!correct) {
    const wrong = lsGet(LS.wrong, []);
    wrong.unshift({ qid: q.id, at: Date.now() });
    lsSet(LS.wrong, wrong.slice(0, 50));
  }
  // streak
  const today = todayStr();
  const st = lsGet(LS.streak, { last: null, count: 0 });
  if (st.last !== today) {
    const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    st.count = st.last === y ? st.count + 1 : 1;
    st.last = today;
    lsSet(LS.streak, st);
  }
}

/* ================= MOCK TEST ================= */
function viewMock() {
  if (APP.mock) return viewMockRun();
  const mocks = window.MOCK_TESTS || [];
  return `
    <div class="sec-h"><h2>Mock Tests</h2><span class="sub">daily · by date</span></div>
    <div class="app-card"><p class="sub">A new Camnemi TOPIK Mock Test every day — timed, graded, with explanations. ${APP.level === 'II' ? 'TOPIK II (L3 goal) shown.' : 'TOPIK I shown.'}</p></div>
    ${mocks.map(m => `
      <div class="mock-item">
        <div>
          <div class="mock-name">${esc(m.name)}</div>
          <div class="mock-date">📅 ${m.date} · ⏱ ${m.duration} · 🎯 ${m.goal}</div>
        </div>
        <div style="margin-left:auto;display:flex;flex-direction:column;gap:6px;align-items:flex-end;">
          <span class="mock-badge ${m.test === 'TOPIK I' ? 't1' : 't2'}">${m.test}</span>
          <button class="btn btn-teal btn-sm" onclick="startMock('${m.id}')">Start</button>
        </div>
      </div>`).join('') || '<p class="muted">No mock tests yet.</p>'}
  `;
}
function startMock(id) {
  const m = (window.MOCK_TESTS || []).find(x => x.id === id);
  if (!m) return;
  APP.mock = m; APP.mockIdx = 0; APP.mockAnswers = {};
  go('mock');
}
function viewMockRun() {
  const m = APP.mock;
  const qs = m.qids.map(qById).filter(Boolean);
  const q = qs[APP.mockIdx];
  const picked = APP.mockAnswers[q.id];
  return `
    <div class="app-card">
      <div class="row"><span class="q-num">${esc(m.name)}</span>
      <button class="btn btn-ghost btn-sm" onclick="exitMock()">✕ Exit</button></div>
      <div class="sub" style="margin:4px 0 8px;">Q${APP.mockIdx + 1} / ${qs.length} · ⏱ ${m.duration}</div>
      <div class="daily-progress"><div style="width:${Math.round(APP.mockIdx / qs.length * 100)}%"></div></div>
      ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ''}
      ${q.audioHint ? `<div class="sub" style="font-size:12px;margin-bottom:6px;">🎧 ${q.audioHint}</div>` : ''}
      <div class="q-kr">${q.q}</div>
      ${q.section === 'writing'
        ? `<textarea class="q-write" id="mock-write">${picked && picked.w ? esc(picked.w) : ''}</textarea><button class="btn btn-primary" style="width:100%;margin-top:10px;" onclick="submitMockWriting()">Save</button>`
        : q.options.map((o, i) => `
          <button class="q-opt ${picked === i ? 'correct' : ''}" onclick="pickMock(${i})"><span style="font-weight:700;">${'①②③④'[i]}</span> ${esc(o.t)}</button>`).join('')}
      ${picked !== undefined && q.correct !== undefined ? `<div class="q-explain show"><b>✓ 정답: ${'①②③④'[q.correct]}</b> — ${esc(q.explain)}</div>` : ''}
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost" ${APP.mockIdx === 0 ? 'disabled style="opacity:.4"' : ''} onclick="navMock(-1)">← Prev</button>
      <button class="btn btn-teal" style="flex:1;" onclick="navMock(1)">${APP.mockIdx >= qs.length - 1 ? 'Finish →' : 'Next →'}</button>
    </div>
  `;
}
function pickMock(i) {
  const q = APP.mock.qids.map(qById).filter(Boolean)[APP.mockIdx];
  if (!q) return;
  APP.mockAnswers[q.id] = i;
  recordResult(q, i === q.correct);
  render();
}
function submitMockWriting() {
  const q = APP.mock.qids.map(qById).filter(Boolean)[APP.mockIdx];
  const ta = $id('mock-write');
  if (!q || !ta) return;
  APP.mockAnswers[q.id] = { w: ta.value };
  render();
}
function navMock(d) {
  const qs = APP.mock.qids.map(qById).filter(Boolean);
  APP.mockIdx = Math.min(qs.length - 1, Math.max(0, APP.mockIdx + d));
  render();
}
function exitMock() { APP.mock = null; render(); }
function bindMock() {}

/* ================= WRONG / TYPE-WISE ================= */
function viewWrong() {
  const wrong = lsGet(LS.wrong, []);
  const prog = lsGet(LS.progress, {});
  const acc = accuracyStats();
  // type-wise breakdown from progress misses
  const typeStats = {};
  allQuestions().forEach(q => {
    const p = prog[q.id];
    if (p && p.total > 0 && p.correct < p.total) {
      const t = q.type || q.section;
      typeStats[t] = (typeStats[t] || 0) + (p.total - p.correct);
    }
  });
  const typeRows = Object.entries(typeStats).sort((a, b) => b[1] - a[1]);
  const hasData = acc.byType.length > 0;
  return `
    <div class="sec-h"><h2>📊 평균 정답률</h2><span class="sub">전체 ${acc.overall}%</span></div>
    <div class="app-card">
      <b style="font-size:13px;color:var(--navy);">유형별 평균 정답률</b>
      ${hasData ? acc.byType.map(r => accBar(typeLabel(r.k) + (r.k === 'writing_short' || r.k === 'writing_letter' ? '' : ''), r.p, `${r.c}/${r.n}문항`)).join('') : '<p class="sub" style="margin-top:6px;">아직 푼 문제가 없어요. Daily 10이나 모의고사를 풀어보세요!</p>'}
    </div>
    <div class="app-card">
      <b style="font-size:13px;color:var(--navy);">난이도별 평균 정답률</b>
      ${hasData ? acc.byLevel.map(r => accBar(r.k <= 2 ? '★'.repeat(r.k) : 'L' + r.k + ' ★'.repeat(Math.max(1, r.k - 2)), r.p, `${r.c}/${r.n}문항`)).join('') : '<p class="sub" style="margin-top:6px;">아직 데이터가 없어요.</p>'}
    </div>

    <div class="sec-h"><h2>Type-wise weak spots</h2></div>
    <div class="app-card">
      ${typeRows.length ? typeRows.map(([t, n]) => `
        <div class="row" style="padding:6px 0;border-bottom:1px solid var(--border);">
          <span>${esc(typeLabel(t))}</span><span class="wrong-tag">${n} misses</span>
        </div>`).join('') : '<p class="sub">No weak types yet — answer some questions first!</p>'}
    </div>
    <div class="sec-h"><h2>Wrong answer notes</h2><span class="sub">${wrong.length} recent</span></div>
    ${wrong.length ? wrong.map(w => {
      const q = qById(w.qid);
      if (!q) return '';
      return `<div class="app-card wrong-item">
        <div class="row"><span class="q-num">${esc(q.id)}</span><span class="q-type">${q.section === 'reading' ? '📖' : q.section === 'listening' ? '🎧' : '✍️'} ${esc(typeLabel(q.type))}</span></div>
        <div class="q-kr" style="font-size:14px;margin:8px 0;">${q.q}</div>
        <div class="q-explain show"><b>✓ ${q.correct !== undefined ? '정답: ' + '①②③④'[q.correct] : '참고'}</b> — ${esc(q.explain)}</div>
      </div>`;
    }).join('') : '<div class="app-card"><p class="sub">No wrong answers yet — keep practicing!</p></div>'}
  `;
}
function bindWrong() {}

/* ================= LEARN (weak → vocab/grammar) ================= */
const LEARN_CONTENT = {
  grammar: [
    { k: '-(으)ㄴ 지', t: 'Time since', ex: '한국에 온 지 3년이 됐어요.', en: 'It\'s been 3 years since I came to Korea.' },
    { k: '-다가', t: 'Interrupted action', ex: '책을 읽다가 잠이 들었어요.', en: 'I fell asleep while reading.' },
    { k: '-았/었으면 좋겠다', t: 'Wish', ex: '빨리 합격했으면 좋겠어요.', en: 'I hope I pass soon.' }
  ],
  vocab: [
    { k: '치사하다', t: 'adj. mean/hateful', ex: '사랑하지 않으니까 치사한 거지.', en: 'Because you don\'t love, it\'s mean.' },
    { k: '대충', t: 'adv. roughly', ex: '대충 설명하면 안 돼요.', en: 'Don\'t explain roughly.' },
    { k: '정기권', t: 'n. commuter pass', ex: '정기권을 사면 20% 싸요.', en: 'A commuter pass is 20% cheaper.' }
  ]
};
function viewLearn() {
  const wrong = lsGet(LS.wrong, []);
  const recentIds = wrong.slice(0, 6).map(w => w.qid);
  const missedTypes = recentIds.map(qById).filter(Boolean).map(q => q.type);
  const weakGrammar = missedTypes.includes('grammar') || missedTypes.includes('sentence_pos') || missedTypes.includes('order');
  const weakVocab = missedTypes.includes('vocab');
  return `
    <div class="sec-h"><h2>Weak-spot review</h2><span class="sub">based on your mistakes</span></div>
    <div class="app-card"><p class="sub">${wrong.length
      ? `You missed questions in: ${missedTypes.map(esc).join(', ') || 'mixed types'}. Here's focused review content.`
      : 'Answer some questions first, and we\'ll build your personal review set.'}</p></div>

    ${weakGrammar || wrong.length === 0 ? `<div class="sec-h"><h2>📖 Grammar</h2></div>
      <div class="app-card">
        ${LEARN_CONTENT.grammar.map(g => `
          <div style="padding:8px 0;border-bottom:1px solid var(--border);">
            <b style="color:var(--navy);">${esc(g.k)}</b> <span class="sub">· ${esc(g.t)}</span>
            <div style="font-size:14px;margin-top:4px;">${esc(g.ex)}</div>
            <div class="sub" style="font-size:12px;">${esc(g.en)}</div>
          </div>`).join('')}
      </div>` : ''}

    ${weakVocab || wrong.length === 0 ? `<div class="sec-h"><h2>🗂 Vocabulary</h2></div>
      <div class="app-card">
        ${LEARN_CONTENT.vocab.map(v => `
          <div style="padding:8px 0;border-bottom:1px solid var(--border);">
            <b style="color:var(--teal);">${esc(v.k)}</b> <span class="sub">· ${esc(v.t)}</span>
            <div style="font-size:14px;margin-top:4px;">${esc(v.ex)}</div>
            <div class="sub" style="font-size:12px;">${esc(v.en)}</div>
          </div>`).join('')}
      </div>` : ''}
  `;
}
function bindLearn() {}

/* ---------- boot ---------- */
// expose for tests / debugging
window.APP = APP;
window.generateAI = generateAI;
document.addEventListener('DOMContentLoaded', () => {
  // deep-link support: app.html?tab=daily (or #daily) opens that tab
  const q = new URLSearchParams(location.search).get('tab');
  const h = (location.hash || '').replace('#', '');
  go(['home','daily','mock','wrong','learn'].includes(q) ? q : (['home','daily','mock','wrong','learn'].includes(h) ? h : 'home'));
  // demo mode for screenshots: ?tab=daily&demo=finish shows the score screen
  if (new URLSearchParams(location.search).get('demo') === 'finish') {
    setTimeout(() => {
      buildDaily();
      const today = todayStr();
      const all = lsGet(LS.daily, {});
      const done = {};
      APP.daily.forEach((qq, i) => {
        if (qq.section === 'writing') done[qq.id] = { w: '테스트 답변입니다. 건강을 위해 운동을 시작했습니다.' };
        else if (i % 5 === 1) done[qq.id] = (qq.correct + 1) % qq.options.length; // one wrong-ish
        else done[qq.id] = qq.correct;
      });
      all[today] = { qids: APP.daily.map(x => x.id), done, ai: false };
      lsSet(LS.daily, all);
      APP.dailyDone = false; APP.dailyIdx = 0; render();
      APP.dailyIdx = APP.daily.length - 1; finishDaily();
    }, 400);
  }
});
