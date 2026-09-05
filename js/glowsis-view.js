/* Glowsis Book viewer — opens the original Glowsis 1A textbook in the app.
   Book tab = Level 1-6 grid → Lv1 "Glowsis Korean 1A" opens textbook/1a.html
   in an iframe (its own design works as-is; the app tab bar stays around it). */

/* ---------- textbook interaction helpers (kept global for any inline use) ---------- */
function gtts(text) {
  try {
    if (!('speechSynthesis' in window)) return;
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
}
window.gtts = gtts;
window.glowCheckQ = glowCheckQ;
window.checkQ = glowCheckQ;   // textbook HTML calls checkQ(...) + tts(...)
window.tts = gtts;

/* ==================== BOOK TAB (Level 1-6 → open Glowsis textbook) ==================== */
const GLOWSIS_LEVELS = [
  { lv: 1, label: 'TOPIK I · Beginner', book: { id: 'glowsis-1a', title: 'Glowsis Korean 1A', sub: '아이돌과 함께 배우는 초급 한국어 · 9 units', href: 'textbook/1a.html' } },
  { lv: 2, label: 'TOPIK II · Intermediate' },
  { lv: 3, label: 'TOPIK II · Intermediate+' },
  { lv: 4, label: 'TOPIK II · Upper' },
  { lv: 5, label: 'TOPIK II · Advanced' },
  { lv: 6, label: 'TOPIK II · Advanced+' }
];
let _bookIframe = null; // {href, title} when a book is open

function viewBook() {
  if (_bookIframe) {
    return `<div class="book-frame-wrap">
      <div class="bf-head">
        <button class="back-btn-mini" onclick="backToBookLevels()">← Levels</button>
        <span class="bf-title">${_bookIframe.title}</span>
      </div>
      <iframe class="book-frame" id="book-frame" src="${_bookIframe.href}" title="${_bookIframe.title}"></iframe>
    </div>`;
  }
  return `<div class="book-home">
    <div class="book-hero">
      <div class="book-hero-inner">
        <span class="book-badge">📚 STUDY</span>
        <h2>TOPIK Levels 1–6</h2>
        <p>Learn with Glowsis — our K-pop idol study crew. Pick a level to start studying.</p>
      </div>
    </div>
    <div class="book-levels">
      ${GLOWSIS_LEVELS.map((l, i) => bookLevelCard(l, i + 1)).join('')}
    </div>
  </div>`;
}
function bookLevelCard(l, n) {
  const ready = l.lv === 1;
  return `<div class="book-level ${ready ? 'ready' : 'soon'}">
    <div class="bl-top">
      <span class="bl-lv">Lv ${l.lv}</span>
      <span class="bl-label">${l.label}</span>
      ${ready ? '<span class="bl-ok">✓</span>' : '<span class="bl-coming">SOON</span>'}
    </div>
    ${ready && l.book ? `<div class="bl-books">
      <button class="bl-book" onclick="openBookFrame('${l.book.href}','${l.book.title.replace(/'/g, "\\'")}')">
        <span class="bl-b-ico">🎤</span>
        <span class="bl-b-t"><b>${l.book.title}</b><small>${l.book.sub}</small></span>
        <span class="bl-b-arr">→</span>
      </button></div>` : `<div class="bl-soon-txt">교재 준비 중입니다. Lv 1부터 시작하세요!</div>`}
  </div>`;
}
function openBookFrame(href, title) {
  _bookIframe = { href, title };
  const s = document.getElementById('screen');
  if (s) s.innerHTML = viewBook();
  window.scrollTo(0, 0);
}
function backToBookLevels() {
  _bookIframe = null;
  const s = document.getElementById('screen');
  if (s) s.innerHTML = viewBook();
  window.scrollTo(0, 0);
}
if (typeof window.toast !== 'function') window.toast = function (m) { try { alert(m); } catch (e) {} };
