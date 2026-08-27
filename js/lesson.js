/* Camnemi TOPIK Preparation — lesson renderer */
/* Reads ?book=1a&lesson=1a-01 and renders the lesson from data/lessons.js */

const BOOK_ORDER = ["1a", "1b", "2a", "2b", "3a", "3b", "4a", "4b", "5a", "5b", "6a", "6b"];

function renderLessonPage() {
  const host = document.getElementById('lesson-root');
  if (!host || !window.LESSONS) return;

  const bookId = qs('book') || '1a';
  const lessonId = qs('lesson') || '1a-01';
  const book = getBook(bookId);
  const lesson = getLesson(bookId, lessonId);

  if (!book || !lesson) {
    host.innerHTML = `<div class="callout">Lesson not found. <a href="curriculum.html">Back to curriculum</a></div>`;
    return;
  }

  // Head
  document.getElementById('lesson-head').innerHTML = `
    <div class="lesson-head">
      <div class="container">
        <div class="crumbs"><a href="curriculum.html">Curriculum</a> · ${book.book} · TOPIK ${book.topik}</div>
        <h1><span class="kr">${lesson.title}</span></h1>
        <p>${book.intro}</p>
      </div>
    </div>`;

  // Grammar cards
  const grammarHTML = lesson.grammar.map(g => `
    <div class="grammar-card">
      <div class="gp"><span class="kr">${g.point}</span> <span style="font-size:14px;color:var(--muted);font-weight:600;">· ${g.name}</span></div>
      <div class="glabel">Rule · ក្បួន</div>
      <div class="grule">${g.rule}</div>
      <div class="glabel">Examples · ឧទាហរណ៍</div>
      <ul class="examples">
        ${g.examples.map(ex => `
          <li>
            <div class="ko">${ex.ko} <button class="audio-btn" onclick="speak('${ex.ko.replace(/'/g, "\\'")}')">🔊</button></div>
            <div class="rom">${ex.rom}</div>
            <div class="gl">${ex.gl} · <span style="color:var(--teal);font-weight:600;">${ex.kh || ''}</span></div>
          </li>`).join('')}
      </ul>
    </div>`).join('');

  // Vocab
  const vocabHTML = lesson.vocab ? `
    <div class="card" style="margin-top:24px;">
      <h3>Vocabulary · វាក្យសព្ទ</h3>
      <div class="vocab-grid" style="margin-top:12px;">
        ${lesson.vocab.map(v => `
          <div class="vocab-item">
            <span><span class="ko">${v.ko}</span> <span style="color:var(--muted);font-size:12.5px;">${v.rom}</span></span>
            <span><span class="en">${v.gl}</span> <span style="color:var(--teal);font-weight:600;">${v.kh || ''}</span></span>
          </div>`).join('')}
      </div>
    </div>` : '';

  // Prev/next
  const idx = book.lessons.findIndex(l => l.id === lessonId);
  const prev = idx > 0 ? book.lessons[idx - 1] : null;
  const next = idx < book.lessons.length - 1 ? book.lessons[idx + 1] : null;
  const navHTML = `
    <div class="lesson-nav">
      ${prev ? `<a class="btn btn-ghost" href="lesson.html?book=${bookId}&lesson=${prev.id}">← ${prev.title}</a>` : '<span></span>'}
      ${next ? `<a class="btn btn-primary" href="lesson.html?book=${bookId}&lesson=${next.id}">${next.title} →</a>` : '<span></span>'}
    </div>`;

  host.innerHTML = grammarHTML + vocabHTML + `
    <div class="callout" style="margin-top:28px;">
      <b>Study in Korea?</b> Camnemi helps Cambodian students apply to Korean universities. Getting your level right is step one —
      <a href="contact.html?level=${bookId}">book a free consultation</a> and we'll map your TOPIK level to real universities.
    </div>` + navHTML;
}

/* Simple text-to-speech for Korean examples (uses Web Speech API; works in Chrome/Edge). */
function speak(text) {
  if (!('speechSynthesis' in window)) { toast('Your browser does not support speech.'); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

document.addEventListener('DOMContentLoaded', renderLessonPage);
