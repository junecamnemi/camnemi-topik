/* Camnemi TOPIK Preparation — curriculum page renderer */

const BOOK_META = [
  { id: "1a", topik: "TOPIK 1", cefr: "A1", tag: "beginner", label: "Beginner", status: "live", hours: 200, hoursPer: 25 },
  { id: "1b", topik: "TOPIK 1→2", cefr: "A1–A2", tag: "beginner", label: "Beginner", status: "live", hours: 200, hoursPer: 25 },
  { id: "2a", topik: "TOPIK 2", cefr: "A2", tag: "beginner", label: "Beginner", status: "soon" },
  { id: "2b", topik: "TOPIK 2→3", cefr: "A2–B1", tag: "beginner", label: "Beginner", status: "soon" },
  { id: "3a", topik: "TOPIK 3", cefr: "B1", tag: "intermediate", label: "Intermediate", status: "soon" },
  { id: "3b", topik: "TOPIK 3→4", cefr: "B1–B2", tag: "intermediate", label: "Intermediate", status: "soon" },
  { id: "4a", topik: "TOPIK 4", cefr: "B2", tag: "intermediate", label: "Intermediate", status: "soon" },
  { id: "4b", topik: "TOPIK 4→5", cefr: "B2–C1", tag: "intermediate", label: "Intermediate", status: "soon" },
  { id: "5a", topik: "TOPIK 5", cefr: "C1", tag: "advanced", label: "Advanced", status: "soon" },
  { id: "5b", topik: "TOPIK 5→6", cefr: "C1–C2", tag: "advanced", label: "Advanced", status: "soon" },
  { id: "6a", topik: "TOPIK 6", cefr: "C2", tag: "advanced", label: "Advanced", status: "soon" },
  { id: "6b", topik: "TOPIK 6+", cefr: "C2", tag: "advanced", label: "Advanced", status: "soon" }
];

function renderCurriculum() {
  const host = document.getElementById('curriculum-root');
  if (!host) return;

  const rows = BOOK_META.map(m => {
    const book = getBook(m.id);
    const lessonCount = book ? book.lessons.length : 0;
    const isLive = m.status === 'live';
    const level = m.id.charAt(0) + m.id.charAt(1).toUpperCase();
    return `
      <tr data-book="${m.id}">
        <td><b class="kr">${level}</b><br><span class="badge ${m.tag}">${m.label}</span></td>
        <td><span class="badge navy">${m.topik}</span> · ${m.cefr}</td>
        <td>${isLive ? `<b>${lessonCount} lessons</b>${m.hours ? `<br><span class="badge amber" style="margin-top:4px;">≈ ${m.hours} hrs · ${m.hoursPer}h/lesson</span>` : ''}` : '<span style="color:var(--muted);">Coming soon</span>'}</td>
        <td>${isLive
          ? `<a class="btn btn-sm btn-teal" href="lesson.html?book=${m.id}&lesson=${book.lessons[0].id}">Start →</a>`
          : `<a class="btn btn-sm btn-ghost" href="contact.html?level=${m.id}">Notify me</a>`}</td>
      </tr>`;
  }).join('');

  host.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Book</th><th>TOPIK / CEFR</th><th>Content</th><th>Action</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <h2 style="margin:36px 0 6px;color:var(--navy-dark);font-size:22px;">Open now: 서울대 한국어 1A &amp; 1B</h2>
    <p style="color:var(--muted);margin-bottom:18px;">The first two books are published as free lessons. The rest follow — get notified so you never miss a release.</p>
    <div id="live-lessons" class="grid grid-2"></div>`;

  // Live lesson lists
  const liveHost = document.getElementById('live-lessons');
  let html = '';
  ["1a", "1b"].forEach(bid => {
    const book = getBook(bid);
    if (!book) return;
    html += `<div class="card">
      <h3 class="kr">${book.book}</h3>
      <p style="margin-bottom:12px;">${book.intro}</p>
      <p style="margin-bottom:12px;"><span class="badge amber">≈ 200 hours · ${book.lessons.length} lessons · 25h each</span></p>
      <div style="display:grid;gap:6px;">
        ${book.lessons.map(l => `
          <a href="lesson.html?book=${bid}&lesson=${l.id}" style="display:flex;justify-content:space-between;align-items:center;padding:9px 12px;background:#f7f8fc;border-radius:8px;font-size:14.5px;">
            <span><span class="badge teal" style="margin-right:8px;">${l.id.split('-')[1]}</span><span class="kr">${l.title}</span></span>
            <span style="color:var(--navy);font-weight:700;">→</span>
          </a>`).join('')}
      </div>
    </div>`;
  });
  liveHost.innerHTML = html;

  // highlight ?level=
  const target = qs('level');
  if (target) {
    const tr = host.querySelector(`tr[data-book="${target}"]`);
    if (tr) {
      tr.style.background = '#fff4d6';
      setTimeout(() => tr.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }
}

document.addEventListener('DOMContentLoaded', renderCurriculum);
