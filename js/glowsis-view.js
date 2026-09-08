/* Glowsis Book viewer — "flip-book" style.
   Book tab = Level 1-6 grid → Lv1 "Glowsis Korean 1A" → per-unit flip pages.
   Each unit's sections are grouped into swipeable pages you turn left/right. */

/* ---------- textbook interaction helpers ---------- */
function gtts(text) {
  try {
    if (!('speechSynthesis' in window) && !window.fetch) return;
    // Preferred: Nous OpenAI TTS (nova) served by ai_server.py at same origin /api/tts
    // (human-like Korean voice). Cache keyed by hash server-side.
    const url = (window.CAMNEMI_AI_BASE || (location.protocol.startsWith('http') ? '/api' : 'http://127.0.0.1:9001/api')) + '/tts?voice=coral&text=' + encodeURIComponent(text);
    if (window.fetch) {
      fetch(url).then(res => {
        if (!res.ok) throw 0;
        return res.blob();
      }).then(blob => {
        const au = new Audio(URL.createObjectURL(blob));
        au.play().catch(()=>{});
      }).catch(() => fallbackTTS(text));
      return;
    }
    fallbackTTS(text);
  } catch (e) { try { fallbackTTS(text); } catch (_) {} }
}
function fallbackTTS(text) {
  try {
    if (!('speechSynthesis' in window)) return;
    if (window.camVoice) { window.camVoice.speak(text, 'ko-KR'); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR'; u.rate = 0.9;
    speechSynthesis.speak(u);
  } catch (e) {}
}
function glowBindUnit(rootEl) {
  if (!rootEl) return;
  rootEl.querySelectorAll('.opt .o-gl').forEach(el => {
    const t = (el.textContent || '');
    if (t.includes('✅') || t.includes('❌')) {
      el.dataset.hint = t.replace(/[✅❌]\s*/g, '').trim();
      el.textContent = '';
    }
  });
}
function glowCheckQ(qid, correctIdx, btn) {
  const group = btn.parentElement;
  const fb = document.getElementById('fb-' + qid);
  if (!group || !fb) return;
  const opts = group.querySelectorAll('.opt');
  const picked = Array.prototype.indexOf.call(opts, btn);
  opts.forEach((o, i) => {
    o.disabled = true; o.classList.remove('correct', 'wrong');
    if (i === correctIdx) { o.classList.add('correct'); const gl = o.querySelector('.o-gl'); if (gl && gl.dataset.hint) gl.textContent = gl.dataset.hint; }
    else if (i === picked) o.classList.add('wrong');
  });
  fb.classList.add('show');
  if (picked === correctIdx) {
    fb.className = 'p-feedback show ok';
    const gl = opts[correctIdx].querySelector('.o-gl');
    fb.innerHTML = '✅ Correct!' + (gl && gl.dataset.hint ? ' ' + gl.dataset.hint : '');
  } else {
    fb.className = 'p-feedback show no';
    const correctOpt = opts[correctIdx];
    const gl = correctOpt.querySelector('.o-gl');
    const hintText = gl && gl.dataset.hint ? gl.dataset.hint : '';
    const label = (correctOpt.childNodes[1] || {}).textContent ? correctOpt.childNodes[1].textContent.trim() : '';
    fb.innerHTML = '❌ The answer is #' + (correctIdx + 1) + ' "' + label + '" ' + (hintText ? '→ ' + hintText : '');
  }
  // reveal the teacher's deep-dive explanation for this problem (if present)
  const wrap = btn.closest ? btn.closest('.practice') : null;
  if (wrap) {
    const note = wrap.querySelector('.pt-note');
    if (note) note.classList.add('show');
  }
}
window.gtts = gtts;
window.glowCheckQ = glowCheckQ;
window.checkQ = glowCheckQ;
window.tts = gtts;

/* vocab-lab accordion toggles */
function glowVocab(btn) {
  const cat = btn.closest ? btn.closest('.vl-cat') : null;
  if (cat) cat.classList.toggle('open');
}
function glowVocabAll() {
  const lab = document.querySelector('.vocab-lab');
  if (!lab) return;
  const cats = lab.querySelectorAll('.vl-cat');
  const anyClosed = Array.prototype.some.call(cats, c => !c.classList.contains('open'));
  cats.forEach(c => c.classList.toggle('open', anyClosed));
  const exp = lab.querySelector('.vl-expand');
  if (exp) exp.textContent = anyClosed ? '모두 접기' : '모두 펼치기';
}
window.glowVocab = glowVocab;
window.glowVocabAll = glowVocabAll;

/* ==================== BOOK: LEVELS ==================== */
const GLOWSIS_LEVELS = [
  { lv: 1, label: 'TOPIK I · Beginner', book: { id: 'glowsis-1a', title: 'Glowsis Korean 1A', sub: 'Learn beginner Korean with your idols · 9 units' } },
  { lv: 2, label: 'TOPIK II · Intermediate' },
  { lv: 3, label: 'TOPIK II · Intermediate+' },
  { lv: 4, label: 'TOPIK II · Upper' },
  { lv: 5, label: 'TOPIK II · Advanced' },
  { lv: 6, label: 'TOPIK II · Advanced+' }
];
let _book = { book: '1a', unit: 0, page: 0 }; // active book + unit + page
let _bookOpenAt = null;           // timestamp when the book reader was opened (study-time tracking)
const BOOK_SESSION_KEY = 'camnemi_topik_book_session'; // { book, unit, page } — restore on return

/* ---- multi-book registry ----
   Each book's units live in its own global (window.GLOWSIS_BOOK = 1A; future books
   add window.GLOWSIS_1B, GLOWSIS_2A, …). bookUnits() returns the ACTIVE book's units. */
const GLOWSIS_BOOKS = [
  { id: '1a', title: 'Glowsis Korean 1A', ico: '👋', sub: 'Beginner · 9 units', var: 'GLOWSIS_BOOK', lvl: 1 },
  { id: '1b', title: 'Glowsis Korean 1B', ico: '🍚', sub: 'Beginner · 12 units', var: 'GLOWSIS_1B', lvl: 1 },
  { id: '2a', title: 'Glowsis Korean 2A', ico: '🗺', sub: 'Beginner+ · 10 units', var: 'GLOWSIS_2A', lvl: 2 },
  { id: '2b', title: 'Glowsis Korean 2B', ico: '🗣', sub: 'Beginner+ · 10 units', var: 'GLOWSIS_2B', lvl: 2 },
  { id: '3a', title: 'Glowsis Korean 3A', ico: '📚', sub: 'Intermediate · 10 units', var: 'GLOWSIS_3A', lvl: 3 },
  { id: '3b', title: 'Glowsis Korean 3B', ico: '🌟', sub: 'Intermediate · 10 units', var: 'GLOWSIS_3B', lvl: 3 },
  { id: '4a', title: 'Glowsis Korean 4A', ico: '🎤', sub: 'Upper-Intermediate · 10 units', var: 'GLOWSIS_4A', lvl: 4 },
  { id: '4b', title: 'Glowsis Korean 4B', ico: '🤝', sub: 'Upper-Intermediate · 10 units', var: 'GLOWSIS_4B', lvl: 4 },
  { id: '5a', title: 'Glowsis Korean 5A', ico: '🔥', sub: 'Advanced · 10 units', var: 'GLOWSIS_5A', lvl: 5 },
  { id: '5b', title: 'Glowsis Korean 5B', ico: '🎬', sub: 'Advanced · 10 units', var: 'GLOWSIS_5B', lvl: 5 },
  { id: '6a', title: 'Glowsis Korean 6A', ico: '🏆', sub: 'Advanced+ · 10 units', var: 'GLOWSIS_6A', lvl: 6 },
  { id: '6b', title: 'Glowsis Korean 6B', ico: '👑', sub: 'Advanced+ · 10 units', var: 'GLOWSIS_6B', lvl: 6 }
];
function bookMeta(id) { return GLOWSIS_BOOKS.find(b => b.id === id) || GLOWSIS_BOOKS[0]; }
function bookUnits(id) { const m = bookMeta(id || _book.book); return (window[m.var] || []).slice(); }

function saveBookSession() {
  try {
    if (_book && _book.unit !== undefined) localStorage.setItem(BOOK_SESSION_KEY, JSON.stringify({ book: _book.book, unit: _book.unit, page: _book.page || 0 }));
  } catch (e) {}
}
function clearBookSession() {
  try { localStorage.removeItem(BOOK_SESSION_KEY); } catch (e) {}
}
/* If the user left the book mid-page, bring them back to the flip page they were on. */
function restoreBookSession() {
  const raw = (() => { try { return localStorage.getItem(BOOK_SESSION_KEY); } catch (e) { return null; } })();
  if (!raw) return false;
  try {
    const s = JSON.parse(raw);
    if (s && bookUnits(s.book).some(x => x.id === s.unit)) {
      openUnit(s.unit, s.page || 0, s.book);
      return true;
    }
  } catch (e) {}
  return false;
}

function viewBook() {
  describeUnits();
  const ready = GLOWSIS_LEVELS[0];
  // Book where the user left off (last study session) → highlight that book row
  // in the level list below. (The "Where you left off" card is REMOVED from the
  // hero per user; the book/unit highlight in the list is the resume cue.)
  let lastBook = '';
  try {
    const raw = localStorage.getItem(BOOK_SESSION_KEY);
    const s = raw ? JSON.parse(raw) : null;
    if (s && s.book) lastBook = s.book;
  } catch (e) {}
  const overlay = `<span class="tab-hero-cap">TOPIK Levels 1–6</span>
    <span class="scene-hero-sub">Learn with Glowsis — pick a level to start studying</span>`;
  const hero = (typeof tabHeroHTML === 'function') ? tabHeroHTML('book', overlay) : '';
  // build the available books list: any book whose global data array is non-empty
  const avail = GLOWSIS_BOOKS.filter(m => (window[m.var] || []).length);
  const soonLevels = GLOWSIS_LEVELS.filter(l => !avail.some(m => m.id.startsWith(String(l.lv))));
  const levelsHTML = GLOWSIS_LEVELS.map((l, li) => {
    const levelBooks = avail.filter(m => m.id.startsWith(String(l.lv)));
    if (!levelBooks.length) {
      return `<div class="book-level soon">
        <div class="bl-top"><span class="bl-lv">Lv ${l.lv}</span><span class="bl-label">${l.label}</span><span class="bl-coming">SOON</span></div>
        <div class="bl-soon-txt">교재 준비 중입니다.</div>
      </div>`;
    }
    return `<div class="book-level ready">
      <div class="bl-top">
        <span class="bl-lv">Lv ${l.lv}</span>
        <span class="bl-label">${l.label}</span>
        <span class="bl-ok">✓</span>
      </div>
      <div class="bl-books">
        ${levelBooks.map(m => `
          <button class="bl-book ${m.id === lastBook ? 'is-current' : ''}" onclick="openBookUnits('${m.id}')">
            ${m.id === lastBook ? `<span class="bl-cont">${LANG && LANG==='ko' ? '이어서' : LANG && LANG==='km' ? 'បន្ត' : 'Continue'}</span>` : ''}
            <span class="bl-b-ico lvl-${m.lvl || 1}">${m.ico}</span>
            <span class="bl-b-t"><b>${m.title}</b><small>${m.sub}</small></span>
            <span class="bl-b-arr">→</span>
          </button>`).join('')}
      </div>
    </div>`;
  }).join('');
  return `${hero}<div class="book-home">
    <div class="vocab-entry" onclick="openVocab()">
      <div class="ve-ico"><span>📔</span></div>
      <div class="ve-txt">
        <b>${LANG==='ko'?'어휘책':'Vocabulary Book'}</b>
        <small>${LANG==='ko'?'TOPIK I 1,500 + TOPIK II 2,500 단어':'TOPIK I 1,500 + TOPIK II 2,500 words'}</small>
      </div>
      <span class="ve-count">4,000</span>
      <span class="ve-arr">→</span>
    </div>
    <div class="book-levels">
      ${levelsHTML}
    </div>
  </div>`;
}
function openBookUnits(bookId) {
  recordBookStudy();
  // remember the unit the learner was on in THIS book (before clearing the session)
  let lastUnit = null;
  try {
    const raw = localStorage.getItem(BOOK_SESSION_KEY);
    if (raw) { const s = JSON.parse(raw); if (s && s.book === bookId) lastUnit = s.unit; }
  } catch (e) {}
  clearBookSession();
  const m = bookMeta(bookId);
  _book.book = m.id;
  const units = (window[m.var] || []).slice();
  document.getElementById('screen').innerHTML = `<div class="book-units">
    <div class="bu-head">
      <button class="back-btn-mini" onclick="backToBookLevels()">← Levels</button>
      <h2>${m.ico} ${m.title}</h2>
      <p class="bu-sub">${LANG==='ko'?'유닛을 골라 공부를 시작하세요':'Pick a unit to start studying'}</p>
    </div>
    <div class="bu-list">
      ${units.map(u => {
        const ut = u.title || fallbackUnitTitle(m.id, u.id);
        const ue = u.en || (m.id === '1a' ? ['한글 기초','인사 · 이에요/예요','자기소개 · 은/는','사물 · 이/그/저','숫자 · 날짜 · 요일','좋아요 · 을/를','음식 · 안/못','위치 · 에/에서','과거 시제'][u.id] : '');
        const noLabel = (u.id === 0 && LANG === 'ko') ? '준비' : (u.id === 0 && LANG !== 'ko') ? 'Prep' : u.id;
        const cur = (u.id === lastUnit);
        return `
        <button class="bu-item ${cur ? 'is-current' : ''}" onclick="openUnit(${u.id},0,'${m.id}')">
          ${cur ? `<span class="bu-cont">${LANG && LANG==='ko' ? '이어서' : LANG && LANG==='km' ? 'បន្ត' : 'Continue'}</span>` : ''}
          <span class="bu-no">${noLabel}</span>
          <span class="bu-info"><b>${ut}</b><small>${ue}</small></span>
          <span class="bu-arr">→</span>
        </button>`;}).join('')}
    </div>
  </div>`;
  window.scrollTo(0, 0);
}
function backToBookLevels() { recordBookStudy(); clearBookSession(); document.getElementById('screen').innerHTML = viewBook(); window.scrollTo(0, 0); }

/* ==================== BOOK: FLIP-PAGE VIEWER ==================== */
const GLOWSIS_UNITS = []; // filled from data below
let _unitMeta = {};

function describeUnits() {
  GLOWSIS_UNITS.length = 0;
  // 1A units in glowsis-book.js carry no per-unit title, so keep a fallback map
  // for 1A only. 1B / 2A units define their own title + en in data.
  const fallbackTitles = ['Hangul First Steps','Hello!','I\'m a Singer','What is This?','Debut is in May','I Like Singing','Tteokbokki is Spicy','I\'m in the Practice Room','What Did You Do Yesterday?'];
  const fallbackEns = ['한글 기초','인사 · 이에요/예요','자기소개 · 은/는','사물 · 이/그/저','숫자 · 날짜 · 요일','좋아요 · 을/를','음식 · 안/못','위치 · 에/에서','과거 시제'];
  bookUnits().forEach((b) => GLOWSIS_UNITS.push({
    id: b.id,
    no: (b.id === 0 ? '준비' : b.id),
    title: b.title || fallbackTitles[b.id] || ('Unit ' + b.id),
    en: b.en || fallbackEns[b.id] || ''
  }));
}
/* Unit title for books whose data lacks per-unit titles (1A). En by default. */
function fallbackUnitTitle(bookId, id) {
  const en = ['Hangul First Steps','Hello!','I\'m a Singer','What is This?','Debut is in May','I Like Singing','Tteokbokki is Spicy','I\'m in the Practice Room','What Did You Do Yesterday?'][id];
  if (bookId !== '1a') return 'Unit ' + id;
  if (LANG === 'ko') return ['한글 기초','인사 · 이에요/예요','자기소개 · 은/는','사물 · 이/그/저','숫자 · 날짜 · 요일','좋아요 · 을/를','음식 · 안/못','위치 · 에/에서','과거 시제'][id] || ('Unit ' + id);
  return en || ('Unit ' + id);
}

/* group a unit's raw sections into flip pages (natural book-like chunks).
   The FIRST pages are a chapter cover (unit title + story) and a talk page
   (goals + dialogue), then grammar / vocab / practice / culture.
   Same-type consecutive blocks merge onto one page (max a few); changing type
   pushes the current page. */
function groupPages(unit) {
  const secs = unit.sections || [];
  const pages = [];
  const startPage = (type) => pages.push({ type, blocks: [] }) - 1;
  let cover = { type: 'cover', blocks: [] };   // unit-flag + sec-title + story
  let talk = null;                              // goals + dialogue
  const mid = [];                               // grammar/vocab/practice/culture
  let curPage = null;

  for (const s of secs) {
    const t = s.cls;
    if (t === 'unit-flag' || t === 'sec-title' || t === 'story') {
      cover.blocks.push(s.html);
    } else if (t === 'goals' || t === 'dialog') {
      if (!talk) talk = { type: 'talk', blocks: [] };
      talk.blocks.push(s.html);
    } else if (t === 'grammar' || t === 'vocab-grid' || t === 'vocab-lab' || t === 'practice' || t === 'culture' || t === 'teach') {
      const pg = (t === 'vocab-grid' || t === 'vocab-lab') ? 'vocab' : t;
      // teach deep-dives are roomy → one per page; others merge (grammar/practice max 2)
      const cap = (pg === 'grammar' || pg === 'practice') ? 2 : 1;
      if (!curPage || curPage.type !== pg || (curPage.blocks.length >= cap)) {
        if (curPage) mid.push(curPage);
        curPage = { type: pg, blocks: [s.html] };
      } else {
        curPage.blocks.push(s.html);
      }
    }
  }
  if (curPage) mid.push(curPage);

  // cover always a page if it has unit flag/title
  if (cover.blocks.length) pages.push(cover);
  if (talk) pages.push(talk);
  mid.forEach(p => pages.push(p));
  return pages;
}
function pageLabel(p, idx, total) {
  const names = { cover:'Start', goals:'Goals', dialog:'Talk', grammar:'Grammar', teach:'Teacher', vocab:'Words', practice:'Practice', culture:'Culture' };
  const t = names[p.type] || 'Page';
  // practice 번호: page 앞 practice 수
  let n = 0;
  return t;
}
function openUnit(uid, page, book) {
  if (book) _book.book = book;
  const u = bookUnits().find(x => x.id === uid);
  if (!u) return;
  const pages = groupPages(u);
  const end = buildEndPage(u);
  if (end) pages.push(end);
  _book = { book: _book.book, unit: uid, page: Math.min(page || 0, pages.length - 1), pages };
  _bookOpenAt = Date.now();   // start tracking book study time
  saveBookSession();
  renderFlip();
}
/* Record book (교재) study minutes since the last openUnit — call when leaving the reader. */
function recordBookStudy() {
  try {
    if (_bookOpenAt) {
      const mins = Math.max(1, Math.round((Date.now() - _bookOpenAt) / 60000));
      if (typeof addStudyTime === 'function') addStudyTime('book', mins);
      _bookOpenAt = null;
    }
  } catch (e) { /* non-fatal */ }
}
function renderFlip() {
  // meta = the ACTIVE unit from the ACTIVE book (has id/title/en). 1A data lacks
  // per-unit titles, so fill them from the fallback map when missing.
  const raw = bookUnits().find(x => x.id === _book.unit) || { id: _book.unit };
  const meta = {
    id: raw.id,
    no: (raw.no != null ? raw.no : (raw.id === 0 ? (LANG==='ko'?'준비':'Prep') : raw.id)),
    title: raw.title || fallbackUnitTitle(_book.book, raw.id),
    en: raw.en || ''
  };
  const pages = _book.pages;
  const track = pages.map((p, i) => {
    const cls = i === _book.page ? 'active' : '';
    return `<div class="flip-page ${cls}" data-i="${i}">${pageBody(p, i, meta)}</div>`;
  }).join('');
  document.getElementById('screen').innerHTML = `
  <div class="flip-wrap" id="flip-wrap">
    <div class="flip-top">
      <button class="back-btn-mini" onclick="openBookUnits()">← Units</button>
      <span class="flip-unit">Unit ${meta ? meta.no : ''} · ${meta ? meta.title : ''}</span>
      <button class="flip-restart" onclick="gotoPage(0)" title="처음으로">⏮ 처음</button>
    </div>
    <div class="flip-viewport" id="flip-vp">
      <div class="flip-track" id="flip-track" style="transform:translateX(-${_book.page * 100}%)">
        ${track}
      </div>
    </div>
    <div class="flip-dots" id="flip-dots">${pages.map((p,i)=>`<button class="fdot ${i===_book.page?'on':''}" onclick="gotoPage(${i})"></button>`).join('')}</div>
    <div class="flip-nav">
      <button class="fnav" onclick="turn(-1)" ${_book.page===0?'disabled':''}>←</button>
      <span class="fp-cnt">${_book.page+1} / ${pages.length}</span>
      <button class="fnav" onclick="turn(1)" ${_book.page===pages.length-1?'disabled':''}>→</button>
    </div>
  </div>`;
  // bind answers
  setTimeout(() => glowBindUnit(document.getElementById('flip-wrap')), 0);
  window.scrollTo(0,0);
  wireSwipe();
}
/* build a "unit end → next unit" page appended after the last real page.
   meta is the unit we are currently finishing — we advance to the NEXT unit by
   data order (id ascending), never backwards or to an unrelated unit. */
function buildEndPage(meta) {
  const cur = meta && meta.id != null ? meta.id : _book.unit;
  const units = bookUnits().sort((a,b)=>a.id-b.id);
  const idx = units.findIndex(u => u.id === cur);
  const next = (idx >= 0 && idx < units.length-1) ? units[idx+1] : null;
  const nMeta = next ? { id: next.id, no: (next.id === 0 ? (LANG==='ko'?'준비':'Prep') : next.id), title: next.title || fallbackUnitTitle(_book.book, next.id), en: next.en || '' } : null;
  const isLast = idx >= 0 && idx === units.length-1;
  return { type: 'end', blocks: [], endMeta: { next, nMeta, isLast } };
}
function pageBody(p, i, meta) {
  const cls = p.type;
  // pull out labels / titles per type
  let top = '';
  if (cls === 'cover') {
    top = `<div class="bk-cover-inner">
      <div class="bk-cover-badge">UNIT ${meta.no}</div>
      <div class="bk-cover-title">${meta.title}</div>
      <div class="bk-cover-sub">${meta.en}</div>
    </div>`;
  } else if (cls === 'talk') {
    top = `<div class="bk-chaphead"><span class="bk-ch-ico">💬</span><div><b>Dialogue &amp; Goals</b><small>Unit ${meta.no}</small></div></div>`;
  } else if (cls === 'grammar') {
    const gnum = (p.blocks[0].match(/GRAMMAR\s*(\d)/) || [,'1'])[1];
    top = `<div class="bk-chaphead"><span class="bk-ch-ico">📖</span><div><b>Grammar</b><small>Unit ${meta.no}</small></div></div>`;
  } else if (cls === 'teach') {
    top = `<div class="bk-chaphead bk-chaphead-teach"><span class="bk-ch-ico">🧑‍🏫</span><div><b>Teacher's Deep-Dive</b><small>Unit ${meta.no}</small></div></div>`;
  } else if (cls === 'vocab') {
    top = `<div class="bk-chaphead"><span class="bk-ch-ico">🗂️</span><div><b>Vocabulary</b><small>Unit ${meta.no}</small></div></div>`;
  } else if (cls === 'practice') {
    top = `<div class="bk-chaphead"><span class="bk-ch-ico">✏️</span><div><b>Practice</b><small>Unit ${meta.no}</small></div></div>`;
  } else if (cls === 'culture') {
    top = `<div class="bk-chaphead"><span class="bk-ch-ico">🎤</span><div><b>Culture</b><small>Unit ${meta.no}</small></div></div>`;
  }
  if (cls === 'end') {
    const e = p.endMeta || {};
    const next = e.next, nMeta = e.nMeta;
    const nextBtn = next
      ? `<button class="bk-next-btn" onclick="openUnit(${next.id})">
          <span class="bk-next-t">다음 과로</span>
          <span class="bk-next-n">Unit ${nMeta.no} · ${nMeta.title}</span>
          <span class="bk-next-arr">→</span>
        </button>`
      : `<button class="bk-next-btn" onclick="openBookUnits()">
          <span class="bk-next-t">완료! 📚</span>
          <span class="bk-next-n">다른 Unit 고르기</span>
        </button>`;
    return `<div class="bk-page bk-end">
      <div class="bk-end-inner">
        <div class="bk-end-check">✓</div>
        <div class="bk-end-title">Unit ${meta.no} 완료!</div>
        <div class="bk-end-sub">${meta.title} 학습을 마쳤어요</div>
        ${nextBtn}
        <button class="bk-units-btn" onclick="openBookUnits()">← 모든 Unit</button>
      </div>
      <div class="bk-pageno">${i+1}</div>
    </div>`;
  }
  return `<div class="bk-page bk-${cls}">${top}<div class="bk-body">${p.blocks.join('')}</div>
    <div class="bk-pageno">${i+1}</div>
  </div>`;
}
function gotoPage(i) {
  if (i < 0 || i >= _book.pages.length) return;
  _book.page = i;
  saveBookSession();
  const t = document.getElementById('flip-track');
  if (t) t.style.transform = `translateX(-${i*100}%)`;
  document.querySelectorAll('.flip-page').forEach((el,idx)=>el.classList.toggle('active', idx===i));
  document.querySelectorAll('.fdot').forEach((el,idx)=>el.classList.toggle('on', idx===i));
  const c = document.querySelector('.fp-cnt'); if (c) c.textContent = (i+1)+' / '+_book.pages.length;
  const navs = document.querySelectorAll('.fnav');
  if (navs[0]) navs[0].disabled = (i===0);
  if (navs[1]) navs[1].disabled = (i===_book.pages.length-1);
}
function turn(d) { gotoPage(_book.page + d); }
function wireSwipe() {
  // Horizontal swipe-to-turn is disabled (too sensitive) — pages are turned via
  // the ←/→ buttons and dots only.
}
/* init unit meta once data ready */
function glowEnsureReady() { describeUnits(); }
if (typeof window.toast !== 'function') window.toast = function (m) { try { alert(m); } catch (e) {} };

/* ==================== VOCABULARY BOOK (보케책) ==================== */
let _vb = { lvl: '1', cat: 'food', page: 0, q: '' };
const VB_ICONS = { food:'🍜', place:'🏫', person:'👨‍👩‍👧', time:'🕐', weather:'🌦', body:'🩺', animal:'🌳',
  object:'📦', action:'🏃', emotion:'💜', number:'🔢', money:'💰', school:'🎓', transport:'🚌',
  clothes:'👕', hobby:'🎮', direction:'🧭', question:'💬', etc:'📌' };
const CAT_NAME = { food:'Food & Drink', place:'Places', person:'People & Family', time:'Time & Date',
  weather:'Weather & Seasons', body:'Body & Health', animal:'Animals, Plants & Nature', object:'Everyday Objects',
  action:'Actions & Verbs', emotion:'Feelings & Character', number:'Numbers & Counting', money:'Money & Shopping',
  school:'School & Study', transport:'Transport & Travel', clothes:'Clothes & Appearance', hobby:'Hobbies & Leisure',
  direction:'Direction & Location', question:'Question & Communication', etc:'More Words' };
const POS_LABEL = { n:'noun', v:'verb', a:'adjective', adv:'adverb', num:'number', pron:'pronoun',
  det:'determiner', part:'particle', interj:'interjection', conj:'conjunction' };
const VB_PER = 24;

function vocabImg(k) {
  try { const f = (window.KW_IMG||{})[k]; if (f) return 'assets/vocab/'+f+'.webp'; } catch(e){}
  return null;
}
function vocabDict(k) {
  try { return (window.VOCAB_DICT||[]).find(w=>w.k===k); } catch(e){ return null; }
}
function openVocabWord(k) {
  const w = vocabDict(k);
  if (!w) { toast('Not found'); return; }
  _vb.hist = _vb.hist || [];
  const esc = window.esc || function(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));};
  const stars = '★'.repeat(Math.max(1,Math.min(3,w.star||1)));
  const catName = CAT_NAME[w.cat] || w.cat;
  const img = vocabImg(k);
  const pic = img ? `<div class="vd-pic"><img src="${img}" alt="${esc(k)}"></div>` : '';
  // clickable relation chips
  const chip = (arr,label) => arr && arr.length ? `<div class="vd-sec">
    <div class="vd-sec-label">${label}</div>
    <div class="vd-tags">${arr.map(x=>{const t=(x||'').trim(); if(!t)return''; return `<button class="vd-tag" onclick="openVocabWord('${t.replace(/'/g,"\\'")}')">${esc(t)}</button>`;}).join('')}</div>
  </div>` : '';
  const backBtn = `<button class="back-btn-mini" onclick="renderVocabView()">← ${LANG==='ko'?'목록':'List'}</button>`;
  const usg = w.usg ? `<div class="vd-usg">${esc(w.usg)}</div>` : '';
  const def = w.def ? `<div class="vd-def">${esc(w.def)}</div>` : '';
  const ex = w.ex ? `<div class="vd-ex"><div class="vd-ex-ko">${esc(w.ex)}</div><div class="vd-ex-en">${esc(w.exE||'')}</div></div>` : '';
  const posLabel = POS_LABEL[w.pos] || w.pos || '';
  document.getElementById('screen').innerHTML = `
    <div class="book-units vb-screen vd-screen">
      <div class="bu-head">
        ${backBtn}
      </div>
      <div class="vd-card">
        ${pic}
        <div class="vd-main">
          <div class="vd-head">
            <span class="vd-ko">${esc(k)}</span>
            ${stars?`<span class="vd-star">${stars}</span>`:''}
          </div>
          <div class="vd-rom">${esc(w.r||'')}${posLabel?' · '+esc(posLabel):''}${w.sub?' · '+esc(w.sub):''}${w.form?' · '+esc(w.form):''}</div>
          ${usg}
          <div class="vd-e">${esc(w.e||'')}</div>
          ${def}
          ${ex}
          <div class="vd-cat">${esc(catName)}</div>
        </div>
        <div class="vd-relations">
          ${chip(w.syn, LANG==='ko'?'유의어':'Synonyms')}
          ${chip(w.ant, LANG==='ko'?'반의어':'Antonyms')}
          ${chip(w.rel, LANG==='ko'?'함께 쓰는 말 · 관련어':'Related words')}
        </div>
      </div>
    </div>`;
  window.scrollTo(0,0);
}

function openVocab() {
  _vb = { lvl:'1', cat:'food', page:0, q:'' };
  renderVocabView();
}
function renderVocabView() {
  const bk = (window.VOCAB_BOOK||{})[_vb.lvl] || [];
  const esc = window.esc || function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
  // level toggle
  const lvlRow = `<div class="vb-lvl">
    <button class="${_vb.lvl==='1'?'on':''}" onclick="setVbLvl('1')">TOPIK I</button>
    <button class="${_vb.lvl==='2'?'on':''}" onclick="setVbLvl('2')">TOPIK II</button>
  </div>`;
  // category chips
  const chips = bk.map(c => `<button class="vb-chip ${_vb.cat===c.id?'on':''}" onclick="setVbCat('${c.id}')">
    ${c.icon||VB_ICONS[c.id]||'📌'} <span>${_vb.lvl==='1'?catShort(c.name):catShort(c.name)}</span> <i>${c.count}</i></button>`).join('');
  // search
  const srch = `<div class="vb-search"><input id="vb-q" placeholder="${LANG==='ko'?'단어 검색…':'Search words…'}" value="${esc(_vb.q)}" oninput="setVbQ(this.value)"></div>`;
  // words for current cat (filtered by q)
  const cat = bk.find(c=>c.id===_vb.cat) || bk[0] || {words:[]};
  let ws = cat.words || [];
  if (_vb.q) { const q=_vb.q.trim().toLowerCase(); ws = ws.filter(w=>w.k.includes(_vb.q) || w.e.toLowerCase().includes(q)); }
  const total = ws.length;
  const pages = Math.max(1, Math.ceil(total/VB_PER));
  if (_vb.page>=pages) _vb.page=0;
  const pageWs = ws.slice(_vb.page*VB_PER, (_vb.page+1)*VB_PER);
  const cards = pageWs.map(w=>{
    const img = vocabImg(w.k);
    const d = vocabDict(w.k);
    const pic = img ? `<div class="vwb-pic"><img src="${img}" alt="${esc(w.k)}" loading="lazy"></div>` : '';
    const star = (d&&d.star) ? '<span class="vwb-star">'+'★'.repeat(Math.max(1,Math.min(3,d.star)))+'</span>' : '';
    const pos = (d&&d.pos) ? `<span class="vwb-pos">${POS_LABEL[d.pos]||d.pos}</span>` : '';
    return `<button class="vwb-card" onclick="openVocabWord('${(w.k).replace(/'/g,"\\'")}')">
      ${pic}
      <div class="vwb-info">
        <div class="vwb-ko">${esc(w.k)} ${star}${pos}</div>
        <div class="vwb-en">${esc(d&&d.e?d.e:w.e)}</div>
      </div>
    </button>`;
  }).join('') || `<div class="vb-empty">${LANG==='ko'?'단어가 없습니다':'No words found'}</div>`;
  const pager = pages>1 ? `<div class="vb-pager">
    <button ${_vb.page===0?'disabled':''} onclick="vbPage(${_vb.page-1})">←</button>
    <span>${_vb.page+1} / ${pages}</span>
    <button ${_vb.page>=pages-1?'disabled':''} onclick="vbPage(${_vb.page+1})">→</button>
  </div>` : '';
  document.getElementById('screen').innerHTML = `
    <div class="book-units vb-screen">
      <div class="bu-head">
        <button class="back-btn-mini" onclick="document.getElementById('screen').innerHTML=viewBook();window.scrollTo(0,0);">← Levels</button>
        <h2>📚 ${LANG==='ko'?'어휘책':'Vocabulary'}</h2>
        <p class="bu-sub">${LANG==='ko'?'TOPIK I 1,635 + TOPIK II 2,651 단어':'TOPIK I 1,635 + TOPIK II 2,651 words'}</p>
      </div>
      ${lvlRow}
      <div class="vb-search">${srch}</div>
      <div class="vb-chips">${chips}</div>
      <div class="vb-cat-title">${esc(cat.icon||VB_ICONS[cat.id]||'📌')} ${esc(cat.name)} <small>${total} ${LANG==='ko'?'단어':'words'}</small></div>
      <div class="vwb-grid">${cards}</div>
      ${pager}
    </div>`;
  window.scrollTo(0,0);
}
function catShort(n){ return n; }
function setVbLvl(l){ _vb.lvl=l; _vb.cat=(window.VOCAB_BOOK[l]||[]).find(c=>c.count>0)?((window.VOCAB_BOOK[l]||[]).find(c=>c.count>0).id):'etc'; _vb.page=0; _vb.q=''; renderVocabView(); }
function setVbCat(c){ _vb.cat=c; _vb.page=0; renderVocabView(); }
function setVbQ(v){ _vb.q=v; _vb.page=0; renderVocabView(); }
function vbPage(p){ if(p<0)return; _vb.page=p; renderVocabView(); }
window.openVocab=openVocab; window.openVocabWord=openVocabWord; window.setVbLvl=setVbLvl; window.setVbCat=setVbCat; window.setVbQ=setVbQ; window.vbPage=vbPage;

