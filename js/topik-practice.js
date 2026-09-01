/* Camnemi TOPIK — TOPIK I practice app engine
   Renders original questions from data/topik1-bank.js, with:
   - section filter (all / listening / reading)
   - difficulty filter (all / 1-5 stars)
   - instant scoring with why-correct / why-wrong explanations
   - progress saved to localStorage
*/

let curSection = 'all';
let curLevel = 0;

function filterBank() {
  return window.TOPIK1_BANK.filter(q =>
    (curSection === 'all' || q.section === curSection) &&
    (curLevel === 0 || q.level === curLevel)
  );
}

function stars(n) {
  let s = '';
  for (let i = 1; i <= 5; i++) s += `<span class="star${i <= n ? ' on' : ''}">★</span>`;
  return `<span class="star-row">${s}</span>`;
}

function typeLabel(t) {
  const map = {
    reply: 'Choose a reply', place: 'Where?', topic: 'What topic?',
    intent: 'Why?', detail: 'Matching detail', grammar: 'Choose the word',
    flow: 'Sentence flow', synonym: 'Similar meaning', notice: 'Notice',
    comprehension: 'Comprehension', long: 'Long passage'
  };
  return map[t] || t;
}

function loadProgress() {
  try { return JSON.parse(localStorage.getItem('camnemi_topik_progress') || '{}'); }
  catch (e) { return {}; }
}
function saveProgress(p) {
  localStorage.setItem('camnemi_topik_progress', JSON.stringify(p));
  pushProgressToCloud(p);   // fire-and-forget sync when logged in
}
/* Upload the whole progress object to the user's topik_progress rows.
   Uses upsert keyed on (user_id, q_id). No-op when not logged in. */
async function pushProgressToCloud(p) {
  const sb = (window.getSupabase && getSupabase());
  const session = (window.getSession && getSession());
  if (!sb || !session) return;
  const rows = Object.entries(p).map(([q_id, v]) => ({
    user_id: session.user.id,
    q_id,
    correct: (v.correct || 0) > 0,
    attempts: (v.total || v.attempts || 1),
    last_result: new Date().toISOString()
  }));
  if (!rows.length) return;
  try { await sb.from('topik_progress').upsert(rows, { onConflict: 'user_id,q_id' }); }
  catch (e) { console.warn('progress sync failed:', e.message); }
}
/* Pull the logged-in user's saved progress on load and merge it locally. */
async function syncProgressFromCloud() {
  const sb = (window.getSupabase && getSupabase());
  const session = (window.getSession && getSession());
  if (!sb || !session) return;
  try {
    const { data, error } = await sb.from('topik_progress')
      .select('q_id, correct, attempts')
      .eq('user_id', session.user.id);
    if (error) throw error;
    const local = loadProgress();
    (data || []).forEach(r => {
      local[r.q_id] = {
        correct: r.correct ? 1 : 0,
        total: r.attempts || 1
      };
    });
    saveProgress(local);
  } catch (e) { console.warn('progress pull failed:', e.message); }
}

function setSection(sec) {
  curSection = sec;
  document.querySelectorAll('.filter-pill[data-sec]').forEach(el =>
    el.classList.toggle('active', el.dataset.sec === sec));
  renderApp();
}
function setLevel(lv) {
  curLevel = parseInt(lv, 10);
  document.querySelectorAll('.filter-pill[data-level]').forEach(el =>
    el.classList.toggle('active', parseInt(el.dataset.level, 10) === curLevel));
  renderApp();
}

function renderApp() {
  const host = document.getElementById('quiz-root');
  const resultRoot = document.getElementById('result-root');
  if (!host) return;
  resultRoot.innerHTML = '';
  const qs = filterBank();
  const prog = loadProgress();

  document.getElementById('app-status').textContent =
    `${qs.length} question${qs.length !== 1 ? 's' : ''} available` +
    (curSection !== 'all' ? ` · ${curSection}` : '') +
    (curLevel ? ` · ${'★'.repeat(curLevel)}` : '');

  if (qs.length === 0) {
    host.innerHTML = `<div class="card" style="padding:30px;text-align:center;color:var(--muted);">
      No questions match this filter yet — we add new ones regularly. Try "All".</div>`;
    return;
  }

  host.innerHTML = qs.map((item, idx) => {
    const done = prog[item.id];
    return `
    <div class="q-card" id="q-${item.id}">
      <div class="q-meta">
        <span class="badge-section">${item.section === 'listening' ? '🎧 Listening' : '📖 Reading'}</span>
        <span class="badge-type">${typeLabel(item.type)}</span>
        ${stars(item.level)}
        <span style="margin-left:auto;font-size:12px;color:var(--muted);">${item.points} pts · #${item.id}</span>
      </div>
      ${item.freq ? `<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:8px;">
        <span style="background:#eafaf7;color:var(--teal);padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700;">📊 기출 빈도: 매 회차 ${item.freq}문항</span>
        <span style="font-size:12px;color:var(--muted);">${item.freqNote}</span>
      </div>` : ''}
      ${item.dialogue ? `<div class="q-dialogue">${item.dialogue}</div>` : ''}
      ${item.passage ? `<div class="q-passage">${item.passage}${item.subq ? `<br><br><b>${item.subq}</b>` : ''}</div>` : ''}
      <div class="q-text">${item.q}</div>
      <div class="q-options">
        ${item.options.map((o, j) => `
          <label class="opt" data-o="${j}">
            <input type="radio" name="q${idx}" value="${j}" onchange="pickAnswer('${item.id}', ${idx}, ${j})">
            <span><span style="font-weight:700;">${'①②③④'[j]}</span> ${o.t}
              ${o.gl ? `<span class="opt-gl">${o.gl}</span>` : ''}</span>
          </label>`).join('')}
      </div>
      <div class="explain-box" id="ex-${item.id}">
        <div class="explain-correct"><b>✓ Correct:</b> ${item.explain}</div>
        <div class="explain-traps"><b>✗ Why the others are wrong:</b><ul>
          ${item.traps.map(t => `<li>${t}</li>`).join('')}</ul></div>
        <div class="explain-tip"><b>💡 Tip:</b> ${item.tip}</div>
        ${item.explainAudio ? `<div style="margin-top:10px;">
          <button class="btn btn-teal btn-sm" onclick="playNamhee('${item.id}', '${item.explainAudio}')">🎤 김남희의 해설 듣기</button>
          <audio id="audio-${item.id}" preload="none" style="display:none;"></audio>
          <span id="nh-status-${item.id}" style="font-size:12px;color:var(--muted);margin-left:8px;"></span>
        </div>` : ''}
      </div>
      ${done ? `<div style="margin-top:10px;font-size:13px;color:${done.correct ? 'var(--teal)' : 'var(--red)'};font-weight:600;">${done.correct ? '✓ You got this right' : '✗ You missed this'} (${done.correct}/${done.total} attempts)</div>` : ''}
    </div>`;
  }).join('');
}

function pickAnswer(id, idx, pick) {
  const item = filterBank()[idx];
  const card = document.getElementById('q-' + id);
  const optEls = card.querySelectorAll('.opt');

  // mark correct/wrong
  optEls.forEach((el, j) => {
    el.classList.remove('correct', 'wrong');
    if (j === item.correct) el.classList.add('correct');
    else if (j === pick) el.classList.add('wrong');
  });

  // disable after pick
  card.querySelectorAll('input[type=radio]').forEach(inp => inp.disabled = true);

  // show explanation
  document.getElementById('ex-' + id).classList.add('show');

  // save progress
  const prog = loadProgress();
  const prev = prog[id] || { correct: 0, total: 0 };
  prev.total += 1;
  if (pick === item.correct) prev.correct += 1;
  prog[id] = prev;
  saveProgress(prog);

  // update status line
  updateSessionScore();
}

function updateSessionScore() {
  // simple: show mastered count for current filter
  const qs = filterBank();
  const prog = loadProgress();
  const mastered = qs.filter(q => (prog[q.id] && prog[q.id].correct > 0)).length;
  const status = document.getElementById('app-status');
  if (status) status.textContent += ` · 🏆 Mastered: ${mastered}/${qs.length}`;
}

function playNamhee(id, audioSrc) {
  const audio = document.getElementById('audio-' + id);
  const status = document.getElementById('nh-status-' + id);
  if (!audio) return;
  if (!audio.src) {
    audio.src = audioSrc;
    // ensure relative path resolves from current page
    if (!audioSrc.startsWith('http') && !audioSrc.startsWith('/')) {
      audio.src = audioSrc;
    }
  }
  if (audio.paused) {
    audio.play().then(() => {
      if (status) status.textContent = '🔊 playing…';
    }).catch(e => {
      if (status) status.textContent = '⚠ ' + e.message.slice(0, 40);
    });
  } else {
    audio.pause();
    if (status) status.textContent = '⏸ paused';
  }
  audio.onended = () => { if (status) status.textContent = '✓ done'; };
}

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  // if logged in, pull saved progress from the cloud before first paint matters
  if (window.isLoggedIn && isLoggedIn()) syncProgressFromCloud();
});
