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

  host.innerHTML = lessonPlanHTML() + grammarHTML + vocabHTML + sectionsHTML + `
    <div class="callout" style="margin-top:28px;">
      <b>Study in Korea?</b> Camnemi helps Cambodian students apply to Korean universities. Getting your level right is step one —
      <a href="contact.html?level=${bookId}">book a free consultation</a> and we'll map your TOPIK level to real universities.
    </div>` + navHTML;
}

/* Renders the extended 200-hour lesson sections (dialogue / listening / reading /
   writing / speaking / culture / review). Each section is a self-contained card.
   Falls back to a single "sections" object if the field is missing. */
function sectionsHTML() {
  const sections = [];
  const add = (title, body) => sections.push(`<div class="card" style="margin-top:24px;"><h3>${title}</h3>${body}</div>`);

  const L = getLesson(qs('book') || '1a', qs('lesson') || '1a-01');
  if (!L) return '';
  const s = L.sections || {};

  // Warm-up & objectives
  if (s.objectives && s.objectives.length) {
    add('Objectives · គោលបំណង', `
      <ul class="examples" style="margin-top:10px;">
        ${s.objectives.map(o => `<li><div class="gl">🎯 ${o}</div></li>`).join('')}
      </ul>`);
  }
  // Extended vocabulary (beyond the top vocab list)
  if (s.vocabExt && s.vocabExt.length) {
    add('More Vocabulary · វាក្យសព្ទបន្ថែម', `
      <div class="vocab-grid" style="margin-top:12px;">
        ${s.vocabExt.map(v => `
          <div class="vocab-item">
            <span><span class="ko">${v.ko}</span> <span style="color:var(--muted);font-size:12.5px;">${v.rom}</span></span>
            <span><span class="en">${v.gl}</span> <span style="color:var(--teal);font-weight:600;">${v.kh || ''}</span></span>
          </div>`).join('')}
      </div>`);
  }
  // Dialogue
  if (s.dialogue && s.dialogue.length) {
    add('Dialogue · ការសន្ទនា', `
      <div class="dialogue" style="margin-top:10px;">
        ${s.dialogue.map(line => `
          <div style="margin-bottom:10px;">
            <div class="ko">${line.ko} <button class="audio-btn" onclick="speak('${line.ko.replace(/'/g, "\\'")}')">🔊</button></div>
            <div class="rom">${line.rom}</div>
            <div class="gl">${line.gl}${line.kh ? ` · <span style="color:var(--teal);font-weight:600;">${line.kh}</span>` : ''}</div>
          </div>`).join('')}
      </div>`);
  }
  // Listening script
  if (s.listening && s.listening.length) {
    add('Listening · ការស្តាប់', `
      <p style="color:var(--muted);margin-bottom:8px;">Listen to the conversation, then answer: <b>${s.listenTask || ''}</b></p>
      <div class="dialogue">
        ${s.listening.map(line => `
          <div style="margin-bottom:8px;"><div class="gl">${line}</div></div>`).join('')}
      </div>`);
  }
  // Reading passage
  if (s.reading) {
    add('Reading · ការអាន', `
      <p style="margin-top:10px;line-height:1.9;"><span class="ko">${s.reading}</span></p>
      ${s.readingQ ? `<p style="color:var(--muted);margin-top:8px;"><b>Comprehension:</b> ${s.readingQ}</p>` : ''}
      ${s.readingA ? `<p style="color:var(--teal);margin-top:6px;"><b>Answer:</b> ${s.readingA}</p>` : ''}`);
  }
  // Writing prompt
  if (s.writing) {
    add('Writing · ការសរសេរ', `
      <p style="margin-top:10px;line-height:1.7;">✍️ ${s.writing}</p>
      ${s.writingTip ? `<p style="color:var(--muted);margin-top:8px;">💡 ${s.writingTip}</p>` : ''}`);
  }
  // Speaking task
  if (s.speaking && s.speaking.length) {
    add('Speaking Task · សកម្មភាពនិយាយ', `
      <ul style="margin-top:10px;line-height:1.8;">
        ${s.speaking.map(t => `<li>🗣️ ${t}</li>`).join('')}
      </ul>`);
  }
  // Culture
  if (s.culture) {
    add('Culture · វប្បធម៌', `
      <p style="margin-top:10px;line-height:1.7;">${s.culture}</p>`);
  }
  // Review quiz
  if (s.review && s.review.length) {
    add('Review Quiz · លំហាត់ពិនិត្យ', `
      <ol style="margin-top:10px;line-height:2;">
        ${s.review.map(q => `<li>${q.q} <span style="color:var(--teal);font-weight:600;">→ ${q.a}</span></li>`).join('')}
      </ol>`);
  }
  return sections.join('');
}

/* A 25-hour lesson plan breakdown shown at the top of each lesson (200h per book). */
function lessonPlanHTML() {
  return `
    <div class="card" style="margin-top:24px;border-left:4px solid #b8860b;">
      <h3 style="color:#b8860b;">📅 25-hour lesson plan · ផែនការមេរៀន 25 ម៉ោង</h3>
      <p style="color:var(--muted);margin:6px 0 12px;">Each lesson is a full 25-hour unit. Follow the parts in order — together they build toward ~200 hours for the whole book (8 lessons × 25h).</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;font-size:13.5px;">
        <div class="plan-box" style="background:#fdf6ec;padding:10px;border-radius:8px;"><b>1. Objectives</b><br><span style="color:var(--muted);">🎯 2h</span></div>
        <div class="plan-box" style="background:#fdf6ec;padding:10px;border-radius:8px;"><b>2. Vocabulary</b><br><span style="color:var(--muted);">📖 5h</span></div>
        <div class="plan-box" style="background:#fdf6ec;padding:10px;border-radius:8px;"><b>3. Grammar</b><br><span style="color:var(--muted);">🔤 6h</span></div>
        <div class="plan-box" style="background:#fdf6ec;padding:10px;border-radius:8px;"><b>4. Dialogue</b><br><span style="color:var(--muted);">💬 3h</span></div>
        <div class="plan-box" style="background:#fdf6ec;padding:10px;border-radius:8px;"><b>5. Listening</b><br><span style="color:var(--muted);">👂 3h</span></div>
        <div class="plan-box" style="background:#fdf6ec;padding:10px;border-radius:8px;"><b>6. Reading</b><br><span style="color:var(--muted);">📚 2h</span></div>
        <div class="plan-box" style="background:#fdf6ec;padding:10px;border-radius:8px;"><b>7. Writing</b><br><span style="color:var(--muted);">✍️ 2h</span></div>
        <div class="plan-box" style="background:#fdf6ec;padding:10px;border-radius:8px;"><b>8. Speaking</b><br><span style="color:var(--muted);">🗣️ 1h</span></div>
        <div class="plan-box" style="background:#fdf6ec;padding:10px;border-radius:8px;"><b>9. Culture</b><br><span style="color:var(--muted);">🎎 1h</span></div>
      </div>
    </div>`;
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
