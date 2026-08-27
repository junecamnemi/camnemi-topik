/* Camnemi TOPIK Preparation — placement quiz engine */

const BOOKS_BY_BAND = {
  1: { book: "1a", label: "서울대 한국어 1A", note: "Start from Hangul + greetings — absolute beginner." },
  2: { book: "1b", label: "서울대 한국어 1B", note: "You know the basics — continue to plans, ability, desire." },
  3: { book: "2a", label: "서울대 한국어 2A", note: "Upper beginner — routines, likes, experiences." },
  4: { book: "3a", label: "서울대 한국어 3A", note: "Intermediate — reported speech, suggestion, obligation." },
  5: { book: "4a", label: "서울대 한국어 4A", note: "Upper intermediate — explanations, opinions, comparison." },
  6: { book: "5a", label: "서울대 한국어 5A", note: "Advanced — you're at TOPIK 5+ level. Academic & journalistic patterns." }
};

function quizResult(scores) {
  // scores = {1..6: correct count out of 2}
  let band = 1;
  for (let b = 1; b <= 6; b++) {
    const c = scores[b] || 0;
    if (c === 2) { band = b; }
    else if (c === 1) { return { band: b, partial: true, scores }; }
    else { break; }
  }
  return { band: band >= 6 ? 6 : band, partial: false, scores };
}

function renderQuiz() {
  const host = document.getElementById('quiz-root');
  if (!host || !window.QUIZ) return;
  const questions = window.QUIZ;
  const answers = {};
  let submitted = false;

  const qHTML = questions.map((item, i) => `
    <div class="quiz-question" data-i="${i}">
      <div class="quiz-q">${i + 1}. ${item.q}</div>
      <div class="quiz-options">
        ${item.options.map((o, j) => `
          <label class="quiz-opt" data-o="${j}">
            <input type="radio" name="q${i}" value="${j}">
            <span>${o.t} <span style="color:var(--muted);font-size:13px;">— ${o.gl}</span></span>
          </label>`).join('')}
      </div>
      <div class="explain">${item.explain}</div>
    </div>`).join('');

  host.innerHTML = `
    <div class="progress-track"><div class="progress-fill" id="quiz-progress" style="width:0%"></div></div>
    <form id="quiz-form" onsubmit="return false;">
      ${qHTML}
      <div style="text-align:center;margin-top:20px;">
        <button type="button" class="btn btn-primary btn-lg" id="quiz-submit" onclick="submitQuiz()">Check my level</button>
        <button type="button" class="btn btn-ghost" id="quiz-reset" style="margin-left:10px;display:none;" onclick="resetQuiz()">Retake</button>
      </div>
    </form>
    <div id="quiz-result"></div>`;

  // live progress
  const radios = host.querySelectorAll('input[type=radio]');
  radios.forEach(r => r.addEventListener('change', () => {
    const done = questions.filter((q, i) => {
      const sel = host.querySelector(`input[name="q${i}"]:checked`);
      return !!sel;
    }).length;
    document.getElementById('quiz-progress').style.width = (done / questions.length * 100) + '%';
  }));

  window.submitQuiz = function () {
    const hostEl = document.getElementById('quiz-root');
    const missing = [];
    const scores = {};
    for (let i = 0; i < questions.length; i++) {
      const sel = hostEl.querySelector(`input[name="q${i}"]:checked`);
      if (!sel) { missing.push(i + 1); continue; }
      const pick = parseInt(sel.value, 10);
      const item = questions[i];
      const optEls = hostEl.querySelectorAll(`.quiz-question[data-i="${i}"] .quiz-opt`);
      optEls.forEach((el, j) => {
        el.classList.remove('correct', 'wrong');
        if (j === item.correct) el.classList.add('correct');
        else if (j === pick) el.classList.add('wrong');
      });
      hostEl.querySelector(`.quiz-question[data-i="${i}"] .explain`).classList.add('show');
      scores[item.band] = (scores[item.band] || 0) + (pick === item.correct ? 1 : 0);
      const inputs = hostEl.querySelectorAll(`input[name="q${i}"]`);
      inputs.forEach(inp => inp.disabled = true);
    }
    if (missing.length) { toast('Answer all questions first (' + missing.join(', ') + ' missing).'); return; }

    const res = quizResult(scores);
    const rec = BOOKS_BY_BAND[res.band];
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const resultEl = document.getElementById('quiz-result');
    resultEl.innerHTML = `
      <div class="result-panel" style="margin-top:24px;">
        <div class="score">${total}/12</div>
        <div style="color:var(--muted);font-size:14px;">correct answers</div>
        <div class="result-level">Recommended start: ${rec.label}</div>
        <p style="color:var(--muted);max-width:440px;margin:8px auto 18px;">${rec.note}${res.partial ? ' You got half of the next band — we recommend reviewing that band before moving on.' : ''}</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          <a class="btn btn-teal" href="curriculum.html?level=${rec.book}">Open this level</a>
          <a class="btn btn-red" href="contact.html?level=${rec.book}">Get free study help</a>
        </div>
      </div>`;
    document.getElementById('quiz-submit').style.display = 'none';
    document.getElementById('quiz-reset').style.display = 'inline-flex';
    // send result as a lead (best-effort)
    saveLead({ name: null, contact: null, goal: 'level_test', message: `Level test result: ${total}/12 → ${rec.label}`, level: rec.book }).catch(() => {});
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  window.resetQuiz = function () {
    window.location.reload();
  };
}

document.addEventListener('DOMContentLoaded', renderQuiz);
