/* Camnemi TOPIK — K-Drama clip lesson engine */
function renderDrama() {
  const host = document.getElementById('drama-root');
  if (!host || !window.DRAMA_LESSONS) return;

  host.innerHTML = window.DRAMA_LESSONS.map(d => `
    <div class="drama-card">
      <div class="drama-meta">
        <span class="badge-section" style="background:#eef1fa;color:var(--navy);padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700;">🎬 ${d.title}</span>
        <span class="badge-type" style="background:var(--bg);color:var(--muted);padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;">Level ${'★'.repeat(d.level)} · ${d.focus}</span>
      </div>
      <p style="font-size:12px;color:var(--muted);margin:8px 0 0;">Source: ${d.source}</p>

      <div class="video-wrap">
        <video id="drama-video-${d.id}" controls preload="metadata" playsinline>
          <source src="${d.video}" type="video/mp4">
          Your browser does not support video.
        </video>
      </div>

      <h3 style="margin:16px 0 6px;color:var(--navy);">Dialogue · 대사</h3>
      <p style="font-size:13px;color:var(--muted);margin-bottom:8px;">Click a line to jump the video to that moment.</p>
      ${d.namheeAudio ? `<div style="margin:10px 0;">
        <button class="btn btn-teal btn-sm" onclick="playNamheeDrama('${d.id}')">🎤 김남희의 해설 듣기</button>
        <audio id="drama-audio-${d.id}" preload="none" style="display:none;"></audio>
        <span id="drama-nh-${d.id}" style="font-size:12px;color:var(--muted);margin-left:8px;"></span>
      </div>` : ''}
      <div id="lines-${d.id}">
        ${d.lines.map((l, i) => `
          <div class="line-block" id="line-${d.id}-${i}">
            <div class="line-kr">${l.text}
              <button class="jump-btn" onclick="seekDrama('${d.id}', ${l.t})">⏱ ${formatTime(l.t)}</button>
            </div>
            <div class="line-rom">${l.rom}</div>
            <div class="line-en">${l.en}</div>
            <ul class="line-points">
              ${l.points.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function seekDrama(id, t) {
  const v = document.getElementById('drama-video-' + id);
  if (!v) return;
  v.currentTime = t;
  v.play();
  v.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function playNamheeDrama(id) {
  const audio = document.getElementById('drama-audio-' + id);
  const status = document.getElementById('drama-nh-' + id);
  if (!audio) return;
  const lesson = window.DRAMA_LESSONS.find(d => d.id === id);
  if (lesson && !audio.src) audio.src = lesson.namheeAudio;
  if (audio.paused) {
    audio.play().then(() => { if (status) status.textContent = '🔊 playing…'; })
      .catch(e => { if (status) status.textContent = '⚠ ' + e.message.slice(0, 40); });
  } else { audio.pause(); if (status) status.textContent = '⏸ paused'; }
  audio.onended = () => { if (status) status.textContent = '✓ done'; };
}

document.addEventListener('DOMContentLoaded', renderDrama);
