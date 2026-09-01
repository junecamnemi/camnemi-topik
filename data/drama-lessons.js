/* Camnemi TOPIK — K-Drama clip lessons (드라마 짤로 배우는 한국어)
   Each entry = a short K-drama / story clip with:
   - video: local clip path (ffmpeg-cut, fair-use teaching clip)
   - subtitle lines with romanization + translation + grammar breakdown
   - optional namheeAudio: Kim Nam-hee's spoken explanation
   All explanations are ORIGINAL Camnemi content. Drama quotes are cited.
*/
window.DRAMA_LESSONS = [
  {
    id: 'D001',
    title: '윤지의 하루 — 집과 학교',
    source: 'Immersion in Korean · [Super BEGINNER] Yoonji Goes to School',
    sourceUrl: 'https://www.youtube.com/watch?v=o6AP3nVNj_8',
    video: 'assets/drama/yoonji_clip_40s.mp4',
    level: 1,
    focus: '은/는 · 에 · 이/가 · 도 · 와/과',
    lines: [
      { t: 8.7, text: '윤지는 학교에 가요.', rom: 'yunjineun hakgyoe gayo', en: 'Yoonji goes to school.',
        points: ['은/는 = topic marker (윤지는 = "as for Yoonji")', '에 = to (direction) — 학교에 = to school', '가요 = present tense of 가다 (to go)'] },
      { t: 31.6, text: '집에 아빠가 있어요.', rom: 'jibe appaga isseoyo', en: 'Dad is at home.',
        points: ['에 = at (location) — 집에 = at home', '이/가 = subject marker (아빠가 = "dad")', '있어요 = to exist / to have (TOPIK 1 core)'] },
      { t: 36.9, text: '집에 엄마가 있어요.', rom: 'jibe eommaga isseoyo', en: 'Mom is at home.',
        points: ['Same pattern — 집에 + N이/가 + 있어요', '있어요 is the existence verb — "there is"'] },
      { t: 41.7, text: '집에 윤지도 있어요.', rom: 'jibe yunjido isseoyo', en: 'Yoonji is also at home.',
        points: ['도 = "also / too" (윤지도 = "Yoonji also")', '도 replaces the subject marker: 윤지가 → 윤지도'] },
      { t: 47.3, text: '저는 아빠, 엄마, 윤지와 같이 살아요.', rom: 'jeoneun appa, eomma, yunjiwa gachi sarayo', en: 'I live together with dad, mom, and Yoonji.',
        points: ['와/과 = "and / with" (윤지와 = with Yoonji)', '같이 = together', '살아요 = present tense of 살다 (to live)'] }
    ]
  },
  {
    id: 'D002',
    title: '아이유의 명대사 — 사랑하지 않으니까 치사한 거지',
    source: 'tvN 드라마 《나의 아저씨》 EP9 — 이지안(아이유) · 인용',
    sourceUrl: 'https://www.youtube.com/watch?v=duEBKERT8l0',
    video: 'assets/drama/iu_mylove_clip.mp4',
    level: 3,
    focus: '니까(이유) · A/V-ㄴ 거지 · 형용사 활용',
    namheeAudio: 'assets/audio/namhee_iu_mylove.mp3',
    lines: [
      { t: 5, text: '사랑하지 않으니까 치사한 거지.', rom: 'saranghaji aneunikka chisahan geoji', en: 'Because you don\'t love, that\'s why it\'s so mean.',
        points: ['사랑하다 = to love → 사랑하지 않다 = to not love', '니까 = because (reason) — 않으니까 = "because (one) doesn\'t"', '치사하다 = hateful / mean (adjective)', 'ㄴ 거지 = it is (것이지 contraction) — informal explanation'] },
      { t: 12, text: '사람이 사람을 사랑하면 그런 일이 없어.', rom: 'sarami sarameul saranghamyeon geureon iri eopseo', en: 'If a person truly loves a person, that kind of thing never happens.',
        points: ['사람이 사람을 = person (subject) + person (object)', '사랑하면 = if (one) loves — (으)면 conditional', '그런 일 = such a thing', '없어 = there isn\'t (plain informal of 없다)'] },
      { t: 20, text: '저는 그냥 다 미워요.', rom: 'jeoneun geunyang da miwoyo', en: 'I just hate everything.',
        points: ['저는 = as for me', '그냥 = just', '다 = everything / all', '미워요 = present of 밉다 (to hate / to be hateful)'] }
    ]
  }
];
