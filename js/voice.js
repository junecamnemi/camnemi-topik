/* camnemi-topik TTS voice helper
   Picks the most natural-sounding Korean voice available in the browser
   (Google neural > MS Neural/Natural > fallback), cached after voices load. */
(function () {
  if (window.camVoice) return; // already defined
  let cache = [];

  function norm(l) { return (l || '').toLowerCase().replace(/_/g, '-'); }

  // rank: 0 = best (neural/human) … 9 = worst (robotic desktop)
  function rank(v) {
    const n = v.name || '';
    if (/google/i.test(n)) return /korean|한국/i.test(n) ? 0 : 2;   // Google Korean is neural
    if (/neural|natural|online|premium/i.test(n)) return 1;          // MS neural voices
    if (/huihui|yaoyao|hazel|haruka|.iaomi/i.test(n)) return 1;
    if (/desktop|^microsoft/i.test(n)) return 5;                     // robotic desktop
    return 3;
  }

  function candidates(lang) {
    const base = norm(lang).split('-')[0]; // 'ko'
    return cache
      .filter(v => norm(v.lang).split('-')[0] === base)
      .sort((a, b) => rank(a) - rank(b));
  }

  function refresh() {
    try { cache = window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch (e) { cache = []; }
  }
  refresh();
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = refresh;
    // also retry once shortly after (some browsers fire late)
    setTimeout(refresh, 300);
  }

  // pick best voice for a language tag (default ko-KR)
  function pick(lang) {
    refresh();
    const best = candidates(lang || 'ko-KR')[0];
    return best || null;
  }

  // speak text in a chosen language, tuned to sound natural
  function speak(text, lang) {
    if (!('speechSynthesis' in window) || !text) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const l = norm(lang || 'ko-KR');
      u.lang = l;
      const v = pick(l);
      if (v) u.voice = v;
      // Slightly slower + warm pitch reads far more human than the default.
      u.pitch = /google/i.test((v && v.name) || '') ? 1.0 : 0.95;
      u.rate = /google/i.test((v && v.name) || '') ? 0.95 : 0.85;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  window.camVoice = { pick, speak };
})();
