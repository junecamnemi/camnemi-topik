/* Camnemi TOPIK App — main engine (mobile, 5-tab)
   Screens: home | daily | mock | wrong | learn
   Data: TOPIK1_BANK + TOPIK2_BANK + MOCK_TESTS
   Persistence: localStorage (camnemi_topik_*) — auth sync added later.
*/
/* eslint-disable no-unused-vars */

/* ---------- state ---------- */
const APP = {
  tab: 'home',
  level: 'II',              // 'I' | 'II' (target test)
  daily: [],                // today's 10 questions
  dailyIdx: 0,
  dailyAnswers: {},         // qid -> picked option index (or writing text)
  mock: null,               // active mock test
  mockIdx: 0,
  mockAnswers: {},
  aiMode: false,          // true when the current daily set is AI-generated
  sectionLoading: false,   // true while AI is generating the remaining section questions
  navStack: []            // tab history for the back button
};

/* ---------- AI backend ----------
   Priority:
   1. window.CAMNEMI_AI_BASE (set by js/config.js on the integrated tunnel server)
   2. Local dev (localhost / 127.0.0.1) -> ai_server.py on :9001
   3. GitHub Pages (junecamnemi.github.io) -> cloudflared tunnel to the PC's ai_server
   4. Anything else (tunnel URL itself) -> same-origin /api
   NOTE: the Pages fallback tunnel URL changes whenever cloudflared restarts;
   update TUNNEL_AI_BASE here when it does. */
const TUNNEL_AI_BASE = 'https://jane-dam-been-voltage.trycloudflare.com';
const AI_API_BASE = (window.CAMNEMI_AI_BASE || (
  /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(location.hostname)
    ? 'http://127.0.0.1:9001'
    : /github\.io$/.test(location.hostname)
      ? TUNNEL_AI_BASE
      : '/api'
));
/* AI endpoint helper: base may already include /api (tunnel same-origin) or not (localhost/tunnel URL) */
function aiUrl(path) {
  const base = AI_API_BASE || '';
  const p = path.startsWith('/') ? path : '/' + path;
  if (base.endsWith('/api')) return base + p;        // '/api' + '/generate'
  return base + '/api' + p;                           // 'http://127.0.0.1:9001' + '/api/generate'
}

const LS = {
  progress: 'camnemi_topik_progress',   // { qid: {correct, total} }
  daily:    'camnemi_topik_daily',      // { date: { qids, done: {qid:pick}, score } }
  wrong:    'camnemi_topik_wrong',      // [ {qid, at} ] — recent misses
  streak:   'camnemi_topik_streak',     // { last: 'YYYY-MM-DD', count: n }
  lang:     'camnemi_topik_lang',       // 'en' | 'ko' | 'km'
  country:  'camnemi_topik_country',    // 'KR' | 'VN' | ... (header selector)
  mockStatus: 'camnemi_topik_mock_status', // { mockId: 'progress'|'done' }
  scores:   'camnemi_topik_scores',    // [{date, level, score, maxScore, pct, passI, passII, correct, wrong, unanswered}]
  theme:    'camnemi_topik_theme',     // 'light' | 'dark' | 'auto'
  srs:      'camnemi_topik_srs',        // { qid: {interval:1|3|7, due:'YYYY-MM-DD', last:0|1} }
  xp:       'camnemi_topik_xp',         // { total: number }
  quests:   'camnemi_topik_quests',      // { date, daily:{n,target}, flash:{n,target}, mock:{n,target} }
  challenge: 'camnemi_topik_challenge',  // { type, idx, answers:{qid:pick}, startAt, timeLeft, qids[] } (in-progress)
  conquered: 'camnemi_topik_conquered',   // { [type]: { n: times conquered, last: date } }
  section:  'camnemi_topik_section',    // { [section]: { qids[], done:{} } }
  mylevel:  'camnemi_topik_mylevel'      // 1-6 — default practice level (set in My)
};

/* ---------- i18n (EN default · 한국어 · ភាសាខ្មែរ) ---------- */
const T = {
  en: {
    nav_home: 'Home', nav_reading: 'Reading', nav_listening: 'Listening', nav_writing: 'Writing', nav_mock: 'Mock test', nav_rank: 'Ranking', nav_my: 'My',
    rank_title: 'Ranking', rank_sub: 'Learners ranked by accuracy · solved · level', rank_acc: 'Accuracy', rank_solved: 'Solved', rank_level: 'Level score', rank_me: 'You', rank_no_data: 'No ranking data yet — solve questions to join!', rank_top_of: 'Top {n} of {total} learners',
    home_sub: 'AI questions · daily mocks · weak-spot review',
    stat_streak: 'streak', stat_today: 'today', stat_mastered: 'mastered',
    btn_today: 'Daily 10', btn_mock: 'Mock Test', btn_read: 'Start reading',
    smart_title: 'Smart recommendation', smart_empty: 'Solve a few questions and we\u2019ll find your weak type to focus on.',
    smart_weak: 'Weak type: {t}', smart_weak_pct: 'Accuracy {p}% ({c}/{n} q) — focus on this?', smart_btn: 'Generate 10 {t} questions with AI',
    avg_acc: 'Average accuracy', overall: 'overall', by_type: 'By type', by_level: 'By difficulty',
    type_empty: 'Accuracy by type will appear here once you solve questions.',
    level_empty: 'Accuracy by level will appear here too.',
    choose_test: 'Choose your test', choose_desc_II: 'Level 3 is the score most Korean universities require. AI generates reading, listening & writing questions at your level.',
    choose_desc_I: 'Start with TOPIK I basics — AI builds questions that match your current level.',
    quick: 'Quick actions', sched_link: 'TOPIK test schedule', sched_desc: 'Dates · registration · results by country',
    learn_link: 'Weak-spot review', learn_desc: 'Vocab & grammar based on your mistakes',
    wrong_link: 'Wrong answer notes', wrong_desc: '{n} recent misses · type-wise breakdown',
    welcome_title: 'Welcome to Camnemi TOPIK', welcome_body: 'Your first step: solve today\u2019s 10 questions. The AI will learn your level and find your weak spots.',
    welcome_cta: 'Start your first streak!',
    ai_badge: 'Generated by AI — unique to you', gen_ai: 'Generate with AI', gen_ai_new: '✨ Generate new AI questions',
    home_ai_title: 'AI past-exam analysis → fresh questions', home_ai_sub: 'The AI studies real past-exam patterns and generates questions at your level — keep solving, keep improving.',
    home_ai_read: 'AI Reading questions', home_ai_listen: 'AI Listening questions', home_ai_quick: 'Quick test',
    goal_title: 'Today\'s goal', goal_sub: 'Pick a skill and train 10 questions',
    home_greet: 'Hi, {name}! 👋', home_greet_sub: 'Ready to achieve something amazing today?',
    home_quote: '“Discipline today, success tomorrow.”', home_daily_goal: 'Daily Goal', home_tasks: 'tasks', home_schedule: 'Today\'s Schedule', home_view_all: 'View all',
    home_sch_reading: 'Reading · Chapters 1–3', home_sch_listening: 'Listening · Dialogue drills', home_sch_vocab: 'Vocabulary · New words', home_sch_mock: 'Mock Test · Full round',
    home_week: 'This week', home_tasks_t: 'Tasks', home_done: 'Done', home_focus: 'Focus Timer', home_focus_start: 'Start', home_focus_pause: 'Pause', home_focus_reset: 'Reset',
    home_focus_pomo: 'Pomodoro', home_focus_short: 'Short Break', home_focus_sessions: 'focus sessions', home_streak_card: 'Study Streak', home_streak_days: 'days',
    home_task_reading: 'Complete Reading', home_task_listening: 'Revise Listening Notes', home_task_vocab: 'Vocabulary Practice', home_task_mock: 'Mock Test Round',
    prog_week: 'This Week', prog_study_time: 'Study Time', prog_tasks_done: 'Tasks Done', prog_focus_sess: 'Focus Sessions', prog_subjects: 'Subjects',
    goal_reading: 'Reading', goal_listening: 'Listening', goal_vocab: 'Vocabulary',
    goal_start: 'Start', goal_done: 'Done', my_level: 'My level', my_level_sub: 'Default level for practice & AI questions', my_char: 'My Character', my_char_change: 'Change', my_char_rename: 'Rename',
    listen: '🔊 Listen', tip: '💡 TIP', tip_hide: '🙈 Hide TIP', prev: '← Prev', next: 'Next →', finish: 'Finish →',
    submit: 'Submit answer', save: 'Save',
    sec_reading: '📖 Reading', sec_listening: '🎧 Listening', sec_writing: '✍️ Writing',
    sec_practice: 'Practice {s}', sec_desc: 'Solve {s} questions generated from past-exam patterns — the AI keeps analyzing your weak spots.', sec_start: 'Start practice', sec_qs: 'questions',
    mock_header: 'Mock Tests', mock_sub: 'daily · by date',
    mock_intro_II: 'A new Camnemi TOPIK Mock Test every day — timed, graded, with explanations. TOPIK II (L3 goal) shown.',
    mock_intro_I: 'A new Camnemi TOPIK Mock Test every day — timed, graded, with explanations. TOPIK I shown.',
    start: 'Start', exit: '✕ Exit', status_new: 'New', status_progress: 'In progress', status_done: 'Done ✓',
    wrong_title: 'Average accuracy', wrong_by_type: 'By type', wrong_by_level: 'By difficulty',
    wrong_no_data: 'No questions solved yet — try Daily 10 or a Mock Test!',
    wrong_level_no_data: 'No data yet.', weak_spots: 'Type-wise weak spots', no_weak: 'No weak types yet — answer some questions first!',
    wrong_notes: 'Wrong answer notes', recent: '{n} recent',
    result_done: 'Daily 10 complete!', result_answered: '{a} of {n} questions answered',
    result_my_score: 'My estimated score', result_pass: 'Pass probability', result_switch: 'If switching to TOPIK {x}: {p}%',
    result_correct: '✓ correct', result_wrong: '✗ wrong', result_unanswered: '⏳ unanswered',
    result_note: '* Estimate based on 10 questions — real exam may differ.',
    result_continue: 'What next?', result_new: '✨ More new questions', result_mock: '📝 Go to Mock Test', result_notes: '📓 View wrong notes', result_done_today: '🏠 Done for today',
    related_q: '📚 Related questions (past-exam type)', related_hide: 'Hide related', related_show_ans: 'Show answer', related_hide_ans: 'Hide answer',
    passage_en: '🔁 View passage in English', passage_ko: '🔁 Back to Korean',
    prog_title: 'My Progress', prog_sub: 'scores & next steps',
    prog_last: 'Latest score', prog_today: 'Today', prog_no_scores: 'No scores yet — finish a Daily 10 set to see your estimated TOPIK score!',
    prog_hist: 'Score history', prog_last7: 'last {n} days', prog_no_hist: 'Your score history will appear here.',
    prog_todo: 'What I need to do', prog_todo_daily: 'Finish today\u2019s Daily 10 ({d}/10)', prog_todo_weak: 'Practice your weak type: {t} ({p}%)', prog_todo_wrong: 'Review {n} wrong answers', prog_todo_exam: 'Next TOPIK: {s} in D-{d}', prog_todo_reg: 'Registration for {s} closes in D-{d}', prog_todo_none: 'All caught up! 🎉 Come back tomorrow.',
    prog_streak: 'streak', prog_mastered: 'mastered', prog_avg: 'avg accuracy', prog_tests: 'sets done', prog_btn_daily: '📅 Daily 10', prog_btn_weak: '✨ Practice {t}', prog_btn_wrong: '📓 Review',
    learn_title: 'Weak-spot review', learn_sub: 'from your mistakes',
    learn_intro: 'You missed questions in: {t}. Here\u2019s focused review content.',
    learn_intro_empty: 'Answer some questions first, and we\u2019ll build your personal review set.',
    learn_grammar: '📖 Grammar', learn_vocab: '🗂 Vocabulary', learn_practice: '✨ Practice these with AI',
    sched_title: 'TOPIK test schedule', sched_note: 'Schedules may change. Register via topik.go.kr or your local Korean embassy / education center.',
    sched_country: 'Country', sched_dday: 'D-Day', sched_cal: 'Calendar view', sched_reg_close: 'Reg. closes', sched_next_test: 'Next test', sched_result: 'Results',
    sched_legend_reg: 'Registration', sched_legend_test: 'Exam day', sched_legend_result: 'Results',
    sched_sessions: 'By session', sched_all: 'All schedule (PBT)', sched_ibt: '💻 IBT (computer test, Korea)',
    status_open: '📌 Reg. opens', status_ing: '🔥 Registering', status_wait: '✏️ Reg. closed · exam', status_result: '📄 Exam done · waiting', status_done: '✓ Ended',
    strip_more: '{n} more sessions', strip_view: 'View schedule',
    time_left: 'Time left', time_up: 'Time up! Auto-submitting...', mock_finished: 'Mock test finished',
    grade_writing: '✨ AI Grade my writing', grading: 'Grading...', grade_score: 'Score', grade_feedback: 'Feedback', grade_fix: 'Corrections',
    flash_title: '🔁 Review flashcards', flash_due: '{n} due today', flash_none: 'No cards due — great job!', flash_front: 'Question', flash_back: 'Answer', flash_knew: '✓ Knew it', flash_forgot: '✗ Forgot', flash_again_later: 'Practice again (1d)', flash_next: 'Next card',
    dark_auto: '🌙 Auto', dark_light: '☀️ Light', dark_dark: '🌙 Dark',
    menu_account: 'Account', menu_signed_in: 'Signed in', menu_guest: 'Guest', menu_login: 'Log in / Sign up', menu_logout: 'Log out',
    menu_stats: 'My stats', menu_streak: 'Day streak', menu_acc: 'Accuracy', menu_due: 'Flashcards due',
    menu_progress: 'My progress', menu_schedule: 'TOPIK schedule', menu_level: 'Test level',
    menu_theme: 'Theme', menu_lang: 'Language', menu_sync: 'Sync my data', menu_synced: '✓ Synced', menu_sync_err: 'Sync failed',
    menu_best: 'Best score: {s}',
    xp_level: 'Level', xp_to_next: '{n} XP to Level {l}', xp_levelup: '🎉 Level up! You reached Level {l}', xp_reward: '+{n} XP',
    quest_title: 'Daily quests', quest_daily: 'Solve {n}/{t} questions', quest_flash: 'Review {n}/{t} flashcards', quest_mock: 'Finish {n}/{t} mock test', quest_done: '✓ Done', quest_reward: '+{n} XP',
    chal_title: 'Weak-spot challenge', chal_sub: 'Beat your weakest type in 5 minutes', chal_start: '⚔️ Start challenge', chal_time: 'Time', chal_correct: 'Correct', chal_conquer: '🏆 Conquered {t}!', chal_fail: 'Keep training — try again!', chal_reward: '+{n} XP bonus', chal_q: 'Question {i}/{n}', chal_done: 'Challenge finished', chal_conquered_before: 'Conquered {n}×', chal_again: 'Challenge again',
  },
  ko: {
    nav_home: '홈', nav_reading: '리딩', nav_listening: '리스닝', nav_writing: '라이팅', nav_mock: '모의고사', nav_rank: '랭킹', nav_my: 'MY',
    rank_title: '랭킹', rank_sub: '정답률 · 푼 문제 · 레벨점수 순위', rank_acc: '정답률', rank_solved: '푼 문제', rank_level: '레벨점수', rank_me: '나', rank_no_data: '아직 랭킹 데이터가 없어요 — 문제를 풀어 참여하세요!', rank_top_of: '상위 {n}명 · 전체 {total}명',
    home_sub: 'AI 문제 · 매일 모의고사 · 취약점 복습',
    stat_streak: '연속', stat_today: '오늘', stat_mastered: '마스터',
    btn_today: '데일리 10', btn_mock: '모의고사', btn_read: '리딩 시작',
    smart_title: '스마트 추천', smart_empty: '문제를 풀면 약한 유형을 찾아 집중 연습을 추천해 드려요.',
    smart_weak: '약한 유형: {t}', smart_weak_pct: '정답률 {p}% ({c}/{n}문항) — 집중 공략?', smart_btn: '{t} 문제 10개 AI 생성',
    avg_acc: '평균 정답률', overall: '전체', by_type: '유형별', by_level: '난이도별',
    type_empty: '문제를 풀면 유형별 정답률이 표시돼요!',
    level_empty: '난이도별 정답률도 여기에 표시돼요!',
    choose_test: '시험 선택', choose_desc_II: 'Level 3 is the score most Korean universities require. AI generates reading, listening & writing questions at your level.',
    choose_desc_I: 'TOPIK I 기초부터 시작 — AI가 내 수준에 맞는 문제를 만들어요.',
    quick: '바로가기', sched_link: 'TOPIK 시험 일정', sched_desc: '나라별 시험일 · 접수기간 · 결과 발표',
    learn_link: '취약점 복습', learn_desc: '틀린 문제 기반 어휘·문법',
    wrong_link: '오답노트', wrong_desc: '최근 {n}개 · 유형별 분석',
    welcome_title: 'Camnemi TOPIK에 오신 걸 환영해요', welcome_body: '첫걸음: 오늘의 문제 10개를 풀어보세요. AI가 내 수준을 파악하고 약한 부분을 찾아드려요.',
    welcome_cta: '첫 연속 기록 시작하기!',
    ai_badge: 'AI 생성 문제 — 나만을 위한 문제', gen_ai: 'AI로 문제 생성', gen_ai_new: '✨ 새 AI 문제 생성',
    home_ai_title: 'AI 기출 분석 → 새로운 문제', home_ai_sub: 'AI가 실제 기출 유형을 분석해 내 수준에 맞는 문제를 계속 만들어요. 풀면 풀수록 실력이 늘어요.',
    home_ai_read: 'AI 리딩 문제', home_ai_listen: 'AI 리스닝 문제', home_ai_quick: '빠른 테스트',
    goal_title: '오늘의 목표', goal_sub: '원하는 영역을 골라 10문제 훈련',
    home_greet: '{name}님, 안녕하세요! 👋', home_greet_sub: '오늘도 놀라운 성과를 만들어 볼까요?',
    home_quote: '“오늘의 노력이 내일의 성공을 만든다.”', home_daily_goal: '오늘의 목표', home_tasks: '개 완료', home_schedule: '오늘의 일정', home_view_all: '전체 보기',
    home_sch_reading: '리딩 · 본문 1–3', home_sch_listening: '리스닝 · 대화 연습', home_sch_vocab: '보케블러리 · 새 단어', home_sch_mock: '모의고사 · 풀세트',
    home_week: '이번 주', home_tasks_t: '할 일', home_done: '완료', home_focus: '집중 타이머', home_focus_start: '시작', home_focus_pause: '일시정지', home_focus_reset: '리셋',
    home_focus_pomo: '뽀모도로', home_focus_short: '짧은 휴식', home_focus_sessions: '집중 세션', home_streak_card: '학습 연속 기록', home_streak_days: '일',
    home_task_reading: '리딩 문제 풀기', home_task_listening: '리스닝 복습', home_task_vocab: '보케블러리 연습', home_task_mock: '모의고사 1회',
    prog_week: '이번 주', prog_study_time: '학습 시간', prog_tasks_done: '완료한 할 일', prog_focus_sess: '집중 세션', prog_subjects: '영역별 진도',
    goal_reading: '리딩', goal_listening: '리스닝', goal_vocab: '보케블러리',
    goal_start: '시작', goal_done: '완료', my_level: '나의 레벨', my_level_sub: '연습·AI 문제의 기본 레벨', my_char: '내 캐릭터', my_char_change: '바꾸기', my_char_rename: '이름 변경',
    listen: '🔊 듣기 재생', tip: '💡 TIP', tip_hide: '🙈 TIP 숨기기', prev: '← 이전', next: '다음 →', finish: '완료 →',
    submit: '답 제출', save: '저장',
    sec_reading: '📖 읽기', sec_listening: '🎧 듣기', sec_writing: '✍️ 쓰기',
    sec_practice: '{s} 연습', sec_desc: '기출 유형을 분석한 {s} 문제를 풀어보세요 — AI가 계속해서 약점을 분석합니다.', sec_start: '연습 시작', sec_qs: '문제',
    mock_header: '모의고사', mock_sub: '매일 · 날짜별',
    mock_intro_II: '매일 새로운 Camnemi TOPIK 모의고사 — 시간 제한, 채점, 해설 포함. TOPIK II (3급 목표).',
    mock_intro_I: '매일 새로운 Camnemi TOPIK 모의고사 — 시간 제한, 채점, 해설 포함. TOPIK I.',
    start: '시작', exit: '✕ 나가기', status_new: '새로움', status_progress: '진행 중', status_done: '완료 ✓',
    wrong_title: '평균 정답률', wrong_by_type: '유형별 평균 정답률', wrong_by_level: '난이도별 평균 정답률',
    wrong_no_data: '아직 푼 문제가 없어요. 데일리 10이나 모의고사를 풀어보세요!',
    wrong_level_no_data: '아직 데이터가 없어요.', weak_spots: '유형별 취약점', no_weak: '아직 약한 유형이 없어요 — 문제를 먼저 풀어보세요!',
    wrong_notes: '오답노트', recent: '최근 {n}개',
    result_done: '데일리 10 완료!', result_answered: '{n}문항 중 {a}문항 답변',
    result_my_score: '나의 예상 점수', result_pass: '합격 확률', result_switch: 'TOPIK {x} 전환 시 {p}%',
    result_correct: '✓ 정답', result_wrong: '✗ 오답', result_unanswered: '⏳ 미응답',
    result_note: '※ 10문제 기준 예상치입니다. 실제 시험과 다를 수 있어요.',
    result_continue: '계속할까요?', result_new: '✨ 새 문제 더 풀기', result_mock: '📝 모의고사 보기', result_notes: '📓 오답노트 보기', result_done_today: '🏠 오늘 끝내기',
    related_q: '📚 관련 문제 (기출 유형)', related_hide: '관련 문제 숨기기', related_show_ans: '답 보기', related_hide_ans: '답 숨기기',
    passage_en: '🔁 지문 영어로 보기', passage_ko: '🔁 한국어로 돌아가기',
    prog_title: '내 진행 상황', prog_sub: '점수 & 다음 할 일',
    prog_last: '최근 점수', prog_today: '오늘', prog_no_scores: '아직 점수가 없어요 — 데일리 10을 완료하면 예상 TOPIK 점수가 표시돼요!',
    prog_hist: '점수 이력', prog_last7: '최근 {n}일', prog_no_hist: '점수 이력이 여기에 표시돼요.',
    prog_todo: '지금 할 일', prog_todo_daily: '오늘의 데일리 10 완료하기 ({d}/10)', prog_todo_weak: '약한 유형 연습: {t} ({p}%)', prog_todo_wrong: '오답 {n}개 복습하기', prog_todo_exam: '다음 TOPIK: {s} D-{d}', prog_todo_reg: '{s} 접수 마감 D-{d}', prog_todo_none: '모두 완료! 🎉 내일 또 만나요.',
    prog_streak: '연속', prog_mastered: '마스터', prog_avg: '평균 정답률', prog_tests: '완료 세트', prog_btn_daily: '📅 데일리 10', prog_btn_weak: '✨ {t} 연습', prog_btn_wrong: '📓 복습',
    learn_title: '취약점 복습', learn_sub: '틀린 문제 기반',
    learn_intro: '틀린 유형: {t}. 집중 복습 콘텐츠예요.',
    learn_intro_empty: '문제를 먼저 풀면 맞춤 복습 세트를 만들어 드려요.',
    learn_grammar: '📖 문법', learn_vocab: '🗂 어휘', learn_practice: '✨ 이 내용으로 AI 문제 만들기',
    sched_title: 'TOPIK 시험 일정', sched_note: '일정은 현지 사정에 따라 변경될 수 있습니다. 접수는 topik.go.kr 또는 현지 한국대사관·한국교육원에서 진행됩니다.',
    sched_country: '나라 선택', sched_dday: 'D-Day', sched_cal: '달력 보기', sched_reg_close: '접수 마감', sched_next_test: '다음 시험', sched_result: '결과 발표',
    sched_legend_reg: '접수기간', sched_legend_test: '시험일', sched_legend_result: '결과발표',
    sched_sessions: '회차별', sched_all: '전체 일정 (PBT)', sched_ibt: '💻 IBT (컴퓨터 시험, 한국)',
    status_open: '📌 접수 예정', status_ing: '🔥 접수 중', status_wait: '✏️ 접수 마감 · 시험 대기', status_result: '📄 시험 완료 · 결과 대기', status_done: '✓ 종료',
    strip_more: '+{n}개 회차', strip_view: '일정 보기',
    time_left: '남은 시간', time_up: '시간 종료! 자동 제출합니다...', mock_finished: '모의고사 완료',
    grade_writing: '✨ AI 채점 받기', grading: '채점 중...', grade_score: '점수', grade_feedback: '피드백', grade_fix: '수정 제안',
    flash_title: '🔁 복습 플래시카드', flash_due: '오늘 {n}장', flash_none: '복습할 카드 없음 — 훌륭해요!', flash_front: '문제', flash_back: '정답', flash_knew: '✓ 알고 있었어요', flash_forgot: '✗ 까먹었어요', flash_again_later: '다시 연습 (1일)', flash_next: '다음 카드',
    dark_auto: '🌙 자동', dark_light: '☀️ 라이트', dark_dark: '🌙 다크',
    menu_account: '계정', menu_signed_in: '로그인됨', menu_guest: '게스트', menu_login: '로그인 / 가입', menu_logout: '로그아웃',
    menu_stats: '내 통계', menu_streak: '연속 학습일', menu_acc: '정답률', menu_due: '복습 카드',
    menu_progress: '내 진행 상황', menu_schedule: 'TOPIK 시험 일정', menu_level: '시험 레벨',
    menu_theme: '테마', menu_lang: '언어', menu_sync: '내 데이터 동기화', menu_synced: '✓ 동기화됨', menu_sync_err: '동기화 실패',
    menu_best: '최고 점수: {s}',
    xp_level: '레벨', xp_to_next: '레벨 {l}까지 {n} XP', xp_levelup: '🎉 레벨업! 레벨 {l}에 도달했어요', xp_reward: '+{n} XP',
    quest_title: '데일리 미션', quest_daily: '문제 {n}/{t}개 풀기', quest_flash: '복습 카드 {n}/{t}장', quest_mock: '모의고사 {n}/{t}회', quest_done: '✓ 완료', quest_reward: '+{n} XP',
    chal_title: '약점 정복 챌린지', chal_sub: '5분 안에 가장 약한 유형을 정복하세요', chal_start: '⚔️ 챌린지 시작', chal_time: '시간', chal_correct: '정답', chal_conquer: '🏆 {t} 정복!', chal_fail: '더 연습하고 다시 도전하세요!', chal_reward: '+{n} XP 보너스', chal_q: '문제 {i}/{n}', chal_done: '챌린지 완료', chal_conquered_before: '{n}회 정복', chal_again: '다시 도전',
  },
  km: {
    nav_home: 'ទំព័រដើម', nav_reading: 'អាន', nav_listening: 'ស្តាប់', nav_writing: 'សរសេរ', nav_mock: 'ប្រឡងសាក', nav_rank: 'ចំណាត់ថ្នាក់', nav_my: 'ខ្ញុំ',
    rank_title: 'ចំណាត់ថ្នាក់', rank_sub: 'ចំណាត់ថ្នាក់តាម ភាពត្រឹមត្រូវ · សំណួរ · ពិន្ទុកម្រិត', rank_acc: 'ភាពត្រឹមត្រូវ', rank_solved: 'បានដោះស្រាយ', rank_level: 'ពិន្ទុកម្រិត', rank_me: 'អ្នក', rank_no_data: 'មិនទាន់មានទិន្នន័យ — ដោះស្រាយសំណួរដើម្បីចូលរួម!', rank_top_of: 'កំពូល {n} នៃ {total} នាក់',
    home_sub: 'សំណួរ AI · ប្រឡងសាកប្រចាំថ្ងៃ · ពិនិត្យចំណុចខ្សោយ',
    stat_streak: 'streak', stat_today: 'ថ្ងៃនេះ', stat_mastered: 'mastered',
    btn_today: 'លំហាត់ ១០', btn_mock: 'ប្រឡងសាក', btn_read: 'ចាប់ផ្តើមអាន',
    smart_title: 'ការណែនាំឆ្លាតវៃ', smart_empty: 'ដោះស្រាយសំណួរខ្លះ យើងនឹងរកចំណុចខ្សោយរបស់អ្នក។',
    smart_weak: 'ចំណុចខ្សោយ: {t}', smart_weak_pct: 'ភាពត្រឹមត្រូវ {p}% ({c}/{n}) — ផ្តោតលើនេះ?', smart_btn: 'បង្កើត {t} ១០ សំណួរជាមួយ AI',
    avg_acc: 'ភាពត្រឹមត្រូវ', overall: 'សរុប', by_type: 'តាមប្រភេទ', by_level: 'តាមកម្រិត',
    type_empty: 'ភាពត្រឹមត្រូវតាមប្រភេទនឹងបង្ហាញនៅពេលអ្នកដោះស្រាយសំណួរ។',
    level_empty: 'ភាពត្រឹមត្រូវតាមកម្រិតក៏នឹងបង្ហាញដែរ។',
    choose_test: 'ជ្រើសរើសការប្រឡង', choose_desc_II: 'Level 3 is the score most Korean universities require. AI generates reading, listening & writing questions at your level.',
    choose_desc_I: 'ចាប់ផ្តើមជាមួយ TOPIK I មូលដ្ឋាន។',
    quick: 'ផ្លូវកាត់', sched_link: 'កាលវិភាគប្រឡង TOPIK', sched_desc: 'កាលបរិច្ឆេទ · ការចុះឈ្មោះ · លទ្ធផលតាមប្រទេស',
    learn_link: 'ពិនិត្យចំណុចខ្សោយ', learn_desc: 'វេយ្យាករណ៍ និងវាក្យសព្ទ ពីកំហុសរបស់អ្នក',
    wrong_link: 'កំណត់ចំណាំកំហុស', wrong_desc: '{n} កំហុសថ្មីៗ · ការវិភាគតាមប្រភេទ',
    welcome_title: 'ស្វាគមន៍មកកាន់ Camnemi TOPIK', welcome_body: 'ជំហានដំបូង: ដោះស្រាយ ១០ សំណួរថ្ងៃនេះ។ AI នឹងរកចំណុចខ្សោយរបស់អ្នក។',
    welcome_cta: 'ចាប់ផ្តើម streak ដំបូង!',
    ai_badge: 'បង្កើតដោយ AI — សម្រាប់អ្នកតែប៉ុណ្ណោះ', gen_ai: 'បង្កើតជាមួយ AI', gen_ai_new: '✨ បង្កើតសំណួរ AI ថ្មី',
    home_ai_title: 'ការវិភាគប្រឡងមុនដោយ AI → សំណួរថ្មី', home_ai_sub: 'AI សិក្សាលំនាំប្រឡងមុនៗ ហើយបង្កើតសំណួរតាមកម្រិតរបស់អ្នក។',
    home_ai_read: 'សំណួរអានដោយ AI', home_ai_listen: 'សំណួរស្តាប់ដោយ AI', home_ai_quick: 'តេស្តរហ័ស',
    goal_title: 'គោលដៅថ្ងៃនេះ', goal_sub: 'ជ្រើសរើសជំនាញ ហើយហ្វឹកហាត់ ១០ សំណួរ',
    home_greet: 'សួស្តី {name}! 👋', home_greet_sub: 'ត្រៀមខ្លួនដើម្បីសម្រេចអ្វីដ៏អស្ចារ្យថ្ងៃនេះហើយ?',
    home_quote: '“វិន័យថ្ងៃនេះ ជោគជ័យថ្ងៃស្អែក។”', home_daily_goal: 'គោលដៅប្រចាំថ្ងៃ', home_tasks: 'កិច្ចការ', home_schedule: 'កាលវិភាគថ្ងៃនេះ', home_view_all: 'មើលទាំងអស់',
    home_sch_reading: 'អាន · ជំពូក 1–3', home_sch_listening: 'ស្តាប់ · ការសន្ទនា', home_sch_vocab: 'វាក្យសព្ទ · ពាក្យថ្មី', home_sch_mock: 'ប្រឡងសាកល្បង',
    home_week: 'សប្តាហ៍នេះ', home_tasks_t: 'កិច្ចការ', home_done: 'រួចរាល់', home_focus: 'កម្មវិធីកំណត់ម៉ោង', home_focus_start: 'ចាប់ផ្តើម', home_focus_pause: 'ផ្អាក', home_focus_reset: 'កំណត់ឡើងវិញ',
    home_focus_pomo: 'Pomodoro', home_focus_short: 'សម្រាកខ្លី', home_focus_sessions: 'វគ្គផ្តោត', home_streak_card: 'ស្ទ្រីកសិក្សា', home_streak_days: 'ថ្ងៃ',
    home_task_reading: 'ធ្វើលំហាត់អាន', home_task_listening: 'ពិនិត្យការស្តាប់', home_task_vocab: 'អនុវត្តវាក្យសព្ទ', home_task_mock: 'ប្រឡងសាកល្បង',
    prog_week: 'សប្តាហ៍នេះ', prog_study_time: 'ពេលសិក្សា', prog_tasks_done: 'កិច្ចការរួច', prog_focus_sess: 'វគ្គផ្តោត', prog_subjects: 'មុខវិជ្ជា',
    goal_reading: 'អាន', goal_listening: 'ស្តាប់', goal_vocab: 'វាក្យសព្ទ',
    goal_start: 'ចាប់ផ្តើម', goal_done: 'រួចរាល់', my_level: 'កម្រិតរបស់ខ្ញុំ', my_level_sub: 'កម្រិតលំនាំដើមសម្រាប់ការអនុវត្ត និងសំណួរ AI', my_char: 'តួអង្គរបស់ខ្ញុំ', my_char_change: 'ផ្លាស់ប្តូរ', my_char_rename: 'ប្តូរឈ្មោះ',
    listen: '🔊 ស្តាប់', tip: '💡 TIP', tip_hide: '🙈 លាក់ TIP', prev: '← ថយក្រោយ', next: 'បន្ទាប់ →', finish: 'បញ្ចប់ →',
    submit: 'ដាក់ស្នើចម្លើយ', save: 'រក្សាទុក',
    sec_reading: '📖 អាន', sec_listening: '🎧 ស្តាប់', sec_writing: '✍️ សរសេរ',
    sec_practice: 'អនុវត្ត {s}', sec_desc: 'ដោះស្រាយសំណួរ {s} ដែលបង្កើតពីលំនាំប្រឡងមុន — AI វិភាគចំណុចខ្សោយរបស់អ្នកជាបន្ត។', sec_start: 'ចាប់ផ្តើមអនុវត្ត', sec_qs: 'សំណួរ',
    mock_header: 'ប្រឡងសាក', mock_sub: 'ប្រចាំថ្ងៃ · តាមកាលបរិច្ឆេទ',
    mock_intro_II: 'ប្រឡងសាកថ្មីរាល់ថ្ងៃ — មានពេលកំណត់ ពិន្ទុ និងការពន្យល់។ TOPIK II (គោលដៅ L3)។',
    mock_intro_I: 'ប្រឡងសាកថ្មីរាល់ថ្ងៃ — មានពេលកំណត់ ពិន្ទុ និងការពន្យល់។ TOPIK I។',
    start: 'ចាប់ផ្តើម', exit: '✕ ចាកចេញ', status_new: 'ថ្មី', status_progress: 'កំពុងដំណើរការ', status_done: 'រួចរាល់ ✓',
    wrong_title: 'ភាពត្រឹមត្រូវ', wrong_by_type: 'តាមប្រភេទ', wrong_by_level: 'តាមកម្រិត',
    wrong_no_data: 'មិនទាន់មានសំណួរទេ — សាកល្បង Daily 10 ឬ Mock Test!',
    wrong_level_no_data: 'មិនទាន់មានទិន្នន័យទេ។', weak_spots: 'ចំណុចខ្សោយតាមប្រភេទ', no_weak: 'មិនទាន់មានចំណុចខ្សោយទេ — ឆ្លើយសំណួរខ្លះមុន!',
    wrong_notes: 'កំណត់ចំណាំកំហុស', recent: '{n} ថ្មីៗ',
    result_done: 'បញ្ចប់ Daily 10!', result_answered: 'ឆ្លើយ {a} ក្នុងចំណោម {n} សំណួរ',
    result_my_score: 'ពិន្ទុប៉ាន់ស្មានរបស់ខ្ញុំ', result_pass: 'ប្រូបាបឆ្លង', result_switch: 'ប្រសិនបើប្តូរទៅ TOPIK {x}: {p}%',
    result_correct: '✓ ត្រឹមត្រូវ', result_wrong: '✗ ខុស', result_unanswered: '⏳ មិនឆ្លើយ',
    result_note: '* ការប៉ាន់ស្មានពី ១០ សំណួរ — ប្រឡងពិតប្រាកដអាចខុសគ្នា។',
    result_continue: 'តើបន្ទាប់ទៀត?', result_new: '✨ សំណួរថ្មីបន្ថែម', result_mock: '📝 ទៅប្រឡងសាក', result_notes: '📓 មើលកំណត់ចំណាំកំហុស', result_done_today: '🏠 បញ្ចប់សម្រាប់ថ្ងៃនេះ',
    related_q: '📚 សំណួរពាក់ព័ន្ធ (ប្រភេទប្រឡងមុន)', related_hide: 'លាក់សំណួរពាក់ព័ន្ធ', related_show_ans: 'មើលចម្លើយ', related_hide_ans: 'លាក់ចម្លើយ',
    passage_en: '🔁 មើលអត្ថបទជាអង់គ្លេស', passage_ko: '🔁 ត្រឡប់ទៅកូរ៉េ',
    prog_title: 'វឌ្ឍនភាពរបស់ខ្ញុំ', prog_sub: 'ពិន្ទុ & ជំហានបន្ទាប់',
    prog_last: 'ពិន្ទុចុងក្រោយ', prog_today: 'ថ្ងៃនេះ', prog_no_scores: 'មិនទាន់មានពិន្ទុទេ — បញ្ចប់ Daily 10 ដើម្បីមើលពិន្ទុ TOPIK ប៉ាន់ស្មាន!',
    prog_hist: 'ប្រវត្តិពិន្ទុ', prog_last7: '{n} ថ្ងៃចុងក្រោយ', prog_no_hist: 'ប្រវត្តិពិន្ទុនឹងបង្ហាញនៅទីនេះ។',
    prog_todo: 'អ្វីដែលខ្ញុំត្រូវធ្វើ', prog_todo_daily: 'បញ្ចប់ Daily 10 ថ្ងៃនេះ ({d}/10)', prog_todo_weak: 'អនុវត្តចំណុចខ្សោយ: {t} ({p}%)', prog_todo_wrong: 'ពិនិត្យ {n} ចម្លើយខុស', prog_todo_exam: 'TOPIK បន្ទាប់: {s} នៅ D-{d}', prog_todo_reg: 'ការចុះឈ្មោះ {s} បិទ D-{d}', prog_todo_none: 'រួចរាល់ទាំងអស់! 🎉 ជួបគ្នាថ្ងៃស្អែក។',
    prog_streak: 'streak', prog_mastered: 'mastered', prog_avg: 'ភាពត្រឹមត្រូវ', prog_tests: 'បានបញ្ចប់', prog_btn_daily: '📅 Daily 10', prog_btn_weak: '✨ អនុវត្ត {t}', prog_btn_wrong: '📓 ពិនិត្យ',
    learn_title: 'ពិនិត្យចំណុចខ្សោយ', learn_sub: 'ពីកំហុសរបស់អ្នក',
    learn_intro: 'អ្នកខុសសំណួរ: {t}. នេះជាខ្លឹមសារពិនិត្យផ្តោត។',
    learn_intro_empty: 'ឆ្លើយសំណួរខ្លះមុន យើងនឹងបង្កើតសំណុំពិនិត្យផ្ទាល់ខ្លួនរបស់អ្នក។',
    learn_grammar: '📖 វេយ្យាករណ៍', learn_vocab: '🗂 វាក្យសព្ទ', learn_practice: '✨ អនុវត្តជាមួយ AI',
    sched_title: 'កាលវិភាគប្រឡង TOPIK', sched_note: 'កាលវិភាគអាចផ្លាស់ប្តូរ។ ចុះឈ្មោះតាម topik.go.kr ឬស្ថានទូតកូរ៉េក្នុងតំបន់។',
    sched_country: 'ជ្រើសរើសប្រទេស', sched_dday: 'D-Day', sched_cal: 'មើលប្រតិទិន', sched_reg_close: 'បិទចុះឈ្មោះ', sched_next_test: 'ប្រឡងបន្ទាប់', sched_result: 'លទ្ធផល',
    sched_legend_reg: 'ការចុះឈ្មោះ', sched_legend_test: 'ថ្ងៃប្រឡង', sched_legend_result: 'លទ្ធផល',
    sched_sessions: 'តាមវគ្គ', sched_all: 'កាលវិភាគទាំងអស់ (PBT)', sched_ibt: '💻 IBT (ប្រឡងកុំព្យូទ័រ កូរ៉េ)',
    status_open: '📌 ចុះឈ្មោះបើក', status_ing: '🔥 កំពុងចុះឈ្មោះ', status_wait: '✏️ បិទ · រង់ចាំប្រឡង', status_result: '📄 ប្រឡងរួច · រង់ចាំលទ្ធផល', status_done: '✓ បញ្ចប់',
    strip_more: '+{n} វគ្គ', strip_view: 'មើលកាលវិភាគ',
    time_left: 'ពេលនៅសល់', time_up: 'ពេលអស់! ដាក់ស្នើដោយស្វ័យប្រវត្តិ...', mock_finished: 'ប្រឡងសាកបានបញ្ចប់',
    grade_writing: '✨ ពិន្ទុការសរសេរដោយ AI', grading: 'កំពុងពិន្ទុ...', grade_score: 'ពិន្ទុ', grade_feedback: 'មតិ', grade_fix: 'ការកែតម្រូវ',
    flash_title: '🔁 បៀរពិនិត្យឡើងវិញ', flash_due: '{n} សន្លឹកថ្ងៃនេះ', flash_none: 'មិនមានបៀរទេ — ពូកែណាស់!', flash_front: 'សំណួរ', flash_back: 'ចម្លើយ', flash_knew: '✓ ចាំបាន', flash_forgot: '✗ ភ្លេច', flash_again_later: 'អនុវត្តម្តងទៀត (១ថ្ងៃ)', flash_next: 'បៀរបន្ទាប់',
    dark_auto: '🌙 ស្វ័យប្រវត្តិ', dark_light: '☀️ ភ្លឺ', dark_dark: '🌙 ងងឹត',
    menu_account: 'គណនី', menu_signed_in: 'បានចូល', menu_guest: 'ភ្ញៀវ', menu_login: 'ចូល / ចុះឈ្មោះ', menu_logout: 'ចាកចេញ',
    menu_stats: 'ស្ថិតិរបស់ខ្ញុំ', menu_streak: 'ថ្ងៃបន្ត', menu_acc: 'ភាពត្រឹមត្រូវ', menu_due: 'បៀរពិនិត្យ',
    menu_progress: 'វឌ្ឍនភាពរបស់ខ្ញុំ', menu_schedule: 'កាលវិភាគប្រឡង', menu_level: 'កម្រិតប្រឡង',
    menu_theme: 'របៀប', menu_lang: 'ភាសា', menu_sync: 'ធ្វើសមកាលកម្មទិន្នន័យ', menu_synced: '✓ បានធ្វើសមកាលកម្ម', menu_sync_err: 'សមកាលកម្មបរាជ័យ',
    menu_best: 'ពិន្ទុខ្ពស់បំផុត: {s}',
    xp_level: 'កម្រិត', xp_to_next: '{n} XP ទៅកម្រិត {l}', xp_levelup: '🎉 ឡើងកម្រិត! អ្នកបានដល់កម្រិត {l}', xp_reward: '+{n} XP',
    quest_title: 'បេសកកម្មប្រចាំថ្ងៃ', quest_daily: 'ដោះស្រាយ {n}/{t} សំណួរ', quest_flash: 'ពិនិត្យ {n}/{t} បៀរ', quest_mock: 'ប្រឡងសាក {n}/{t} វគ្គ', quest_done: '✓ រួចរាល់', quest_reward: '+{n} XP',
    chal_title: 'បេសកកម្មយកឈ្នះចំណុចខ្សោយ', chal_sub: 'យកឈ្នះប្រភេទខ្សោយបំផុតក្នុង ៥ នាទី', chal_start: '⚔️ ចាប់ផ្តើម', chal_time: 'ពេល', chal_correct: 'ត្រឹមត្រូវ', chal_conquer: '🏆 បានយកឈ្នះ {t}!', chal_fail: 'ហ្វឹកហាត់បន្ថែម ហើយព្យាយាមម្តងទៀត!', chal_reward: '+{n} XP បន្ថែម', chal_q: 'សំណួរ {i}/{n}', chal_done: 'បេសកកម្មបានបញ្ចប់', chal_conquered_before: 'បានយកឈ្នះ {n}ដង', chal_again: 'ព្យាយាមម្តងទៀត',
  }
};
let LANG = localStorage.getItem(LS.lang) || 'en';
if (!T[LANG]) LANG = 'en';
function t(key, vars) {
  let s = (T[LANG] && T[LANG][key]) || T.en[key] || key;
  if (vars) Object.keys(vars).forEach(k => { s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]); });
  return s;
}
function setLang(l) {
  if (!T[l]) l = 'en';
  LANG = l; localStorage.setItem(LS.lang, l);
  const sel = $id('lang-sel'); if (sel) sel.value = l;
  document.documentElement.dataset.lang = l;
  // re-render nav labels + current screen
  document.querySelectorAll('[data-nav-label]').forEach(el => { el.textContent = t('nav_' + el.dataset.navLabel); });
  render();
}

/* ---------- Theme (light / dark / auto) ---------- */
let THEME = localStorage.getItem(LS.theme) || 'light';   // pastel light is the default look
const THEME_ICONS = { dark: '🌙', light: '☀️', auto: '🌗' };
function applyTheme() {
  const t = THEME === 'auto' ? (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : THEME;
  document.documentElement.setAttribute('data-theme', t);
  const btn = $id('theme-btn');
  if (btn) btn.textContent = THEME_ICONS[THEME] || '🌗';
  // theme-color meta
  const mc = document.querySelector('meta[name="theme-color"]');
  if (mc) mc.setAttribute('content', t === 'dark' ? '#000000' : '#007AFF');
  // re-apply the character accent theme (overrides meta + accent vars)
  if (typeof applyCharTheme === 'function') applyCharTheme();
}
function cycleTheme() {
  const order = ['light', 'dark', 'auto'];
  THEME = order[(order.indexOf(THEME) + 1) % order.length];
  localStorage.setItem(LS.theme, THEME);
  applyTheme();
}

/* ---------- Country selector ---------- */
function countryList() { return (window.TOPIK_SCHEDULE && TOPIK_SCHEDULE.countries) || []; }
function selectedCountry() {
  const list = countryList();
  const key = localStorage.getItem(LS.country) || 'KR';
  return list.find(c => c.key === key) || list[0] || null;
}
function setCountry(k) {
  localStorage.setItem(LS.country, k);
  APP.scheduleCountry = k;
  const sch = $id('schedule-country'); if (sch) sch.value = k;
  render();
}
function initCountrySel() { /* country picker lives in the schedule tab only */ }
/* ---------- Header schedule banner (오른쪽 토픽일정 배너) ---------- */
function renderSchedBanner() {
  const el = $id('sched-banner');
  if (!el) return;
  const sch = window.TOPIK_SCHEDULE;
  const country = selectedCountry();
  if (!sch || !country) { el.style.display = 'none'; return; }
  const rows = sch.pbt.filter(p => country.sessions.includes(parseInt(p.session)))
    .map(p => ({ p, st: sessionStatus(p) }))
    .filter(x => x.st.key !== 'done')
    .sort((a, b) => a.p.date < b.p.date ? -1 : 1);
  if (!rows.length) { el.style.display = 'none'; return; }
  const x = rows[0];
  let dday, label;
  if (x.st.key === 'reg_ing' || x.st.key === 'reg_open') { dday = ddayStr(x.st.reg.end); label = t('sched_reg_close'); }
  else if (x.st.key === 'test_wait') { dday = ddayStr(x.p.date); label = t('sched_next_test'); }
  else { dday = ddayStr(x.p.result); label = t('sched_result'); }
  el.style.display = 'inline-flex';
  el.innerHTML = `<span style="font-size:15px;line-height:1;">${country.flag}</span><span style="font-weight:800;font-size:13px;">${esc(sessionTh(x.p.session))}</span><span style="font-size:9px;opacity:.85;">${esc(label)}</span><b style="font-size:12px;font-weight:800;">${dday}</b>`;
}
/* '108회' → '108th' (works for any 회차 label: 95회 → 95th) */
function sessionTh(s) {
  const m = String(s).match(/(\d+)회/);
  if (!m) return s;
  const n = parseInt(m[1], 10);
  let suf = 'th';
  if (n % 100 < 11 || n % 100 > 13) {
    if (n % 10 === 1) suf = 'st';
    else if (n % 10 === 2) suf = 'nd';
    else if (n % 10 === 3) suf = 'rd';
  }
  return n + suf;
}

/* ---------- helpers ---------- */
const $id = id => document.getElementById(id);
const todayStr = () => new Date().toISOString().slice(0, 10);
function lsGet(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
function lsSet(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

/* ---------- attractive SVG icon set (stroke style, currentColor) ---------- */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>',
  daily: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="m9 15 2 2 4-4"/>',
  mock: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6M9 4c0-1 .5-2 1.5-2h3C14.5 2 15 3 15 4"/><path d="M9 10h6M9 14h6M9 18h3"/>',
  notes: '<path d="M12 6c-1.5-1.2-3.5-2-6-2H3v15h3c2.5 0 4.5.8 6 2 1.5-1.2 3.5-2 6-2h3V4h-3c-2.5 0-4.5.8-6 2z"/><path d="M12 6v15"/>',
  progress: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  learn: '<path d="M2 9 12 4l10 5-10 5L2 9z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v5"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  listen: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  tip: '<path d="M9 18h6M10 21h4"/><path d="M12 3a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 3z"/>',
  schedule: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="M8 15h.01M12 15h.01M16 15h.01"/>',
  spark: '<path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2L12 2z"/>',
  flame: '<path d="M12 2s5 4.5 5 9.5a5 5 0 0 1-10 0C7 9 9 7 12 2z"/><path d="M12 22a6 6 0 0 0 6-6c0-2-1-3.5-2-5-1 1.5-2.5 2-3 2 1-2 .5-4-1-6-2 2-4 4.5-4 9a6 6 0 0 0 4 6z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5"/>',
  edit: '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3z"/><path d="M13.5 6.5l3 3"/>'
};
function ic(name, size = 24) {
  const body = ICONS[name] || '';
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-3px;">${body}</svg>`;
}
function allQuestions() {
  const t1 = (window.TOPIK1_BANK || []);
  const t2 = (window.TOPIK2_BANK || []);
  const lv = [1,2,3,4,5,6].flatMap(n => window['LEVEL' + n + '_BANK'] || []);
  return t1.concat(t2, lv);
}
function qById(id) { return allQuestions().find(q => q.id === id); }

/* ---------- Past-exam frequency info ----------
   Shows how often this question TYPE appeared in real TOPIK sessions.
   Uses the question's own freq/freqNote, else maps its type+section to
   the pattern observed in the topik1/topik2 banks (built from past papers). */
let _freqMap = null;
function freqInfo(q) {
  if (!q) return null;
  if (q.freq && q.freqNote) return { n: q.freq, note: q.freqNote };
  if (!_freqMap) {
    _freqMap = {};
    [...(window.TOPIK1_BANK || []), ...(window.TOPIK2_BANK || [])].forEach(b => {
      if (!b.freq || !b.freqNote) return;
      const k = b.section + ':' + b.type;
      if (!_freqMap[k]) _freqMap[k] = { n: b.freq, note: b.freqNote };
    });
  }
  const f = _freqMap[q.section + ':' + q.type];
  return f || null;
}
function freqBadge(q) {
  const f = freqInfo(q);
  if (!f) return '';
  return `<span class="q-freq" title="${esc(f.note)}">${ic('schedule', 11)} ${esc(f.note)}</span>`;
}

/* ---------- Grammar point → Sejong textbook mapping ----------
   Authoritative, level-true placement of the TOPIK grammar tested in each
   question. sej: suggested 세종한국어 volume (1A–6B) for review. */
const GRAMMAR_LIB = [
  // --- TOPIK I / 초급 (세종 1–2) ---
  { m: '아/어요',  pat: '-(아/어)요', sej: 1, ko: '해요체(두루높임)의 종결 어미로, 일상적인 대화에서 가장 많이 쓰입니다.', ex: '지금 학교에 가요.' },
  { m: '을 수 있', pat: '-(으)ㄹ 수 있다', sej: 1, ko: '가능(할 수 있음)을 나타냅니다.', ex: '저는 수영을 할 수 있어요.' },
  { m: '을 거',   pat: '-(으)ㄹ 거예요', sej: 2, ko: '미래의 일이나 추측을 나타냅니다.', ex: '내일은 비가 올 거예요.' },
  { m: '지 않',   pat: '-지 않다', sej: 2, ko: '부정(하지 않음)을 나타내는 표현입니다.', ex: '그는 밥을 먹지 않았어요.' },
  { m: '려고',    pat: '-(으)려고', sej: 2, ko: '목적·의도를 나타냅니다. 뒤에는 주로 행동 동사가 옵니다.', ex: '한국어를 배우려고 한국에 왔어요.' },
  { m: '러 가',   pat: '-(으)러 가다/오다', sej: 2, ko: '어떤 행동을 하러 이동함을 나타냅니다.', ex: '책을 빌리러 도서관에 갔어요.' },
  { m: '기 전에', pat: '-기 전에', sej: 2, ko: '어떤 행동보다 앞선 시점을 나타냅니다.', ex: '밥을 먹기 전에 손을 씻어요.' },
  { m: '은 후에', pat: '-(으)ㄴ 후에', sej: 2, ko: '어떤 행동이 끝난 뒤의 시점을 나타냅니다.', ex: '수업이 끝난 후에 만나요.' },
  // --- TOPIK II 중급 (세종 3) ---
  { m: '다가',    pat: '-다가', sej: 3, ko: '어떤 동작을 하다가 중단하거나 다른 동작으로 바뀜을 나타냅니다.', ex: '전화를 하다가 갑자기 끊겼어요.' },
  { m: '는 동안', pat: '-는 동안', sej: 3, ko: '어떤 행동이 지속되는 시간을 나타냅니다.', ex: '음악을 듣는 동안 공부를 했어요.' },
  { m: '은 지',   pat: '-(으)ㄴ 지', sej: 3, ko: '어떤 일이 일어난 후 경과한 시간을 나타냅니다.', ex: '한국에 온 지 1년이 됐어요.' },
  { m: '고 나서', pat: '-고 나서', sej: 3, ko: '앞의 행동을 마친 후에 다음 행동을 함을 나타냅니다.', ex: '숙제를 하고 나서 텔레비전을 봤어요.' },
  { m: '아/어 놓', pat: '-아/어 놓다', sej: 3, ko: '행동의 결과가 그대로 유지됨을 나타냅니다.', ex: '문을 열어 놓았어요.' },
  { m: '아/어 두', pat: '-아/어 두다', sej: 3, ko: '미리 준비해 둠을 나타내는 표현입니다.', ex: '내일 쓸 자료를 미리 준비해 두었어요.' },
  { m: '는 바람에', pat: '-는 바람에', sej: 3, ko: '앞의 일이 원인이 되어 부정적인 결과가 생겼음을 나타냅니다.', ex: '비가 오는 바람에 약속을 취소했어요.' },
  { m: '는지 알', pat: '-(으)ㄴ/는지 알다/모르다', sej: 3, ko: '어떤 사실의 여부를 알거나 모름을 나타냅니다.', ex: '그가 언제 오는지 몰라요.' },
  { m: '아/어도 되', pat: '-아/어도 되다', sej: 3, ko: '허용·허락의 뜻을 나타냅니다.', ex: '여기에 앉아도 돼요?' },
  { m: '면 안',   pat: '-(으)면 안 되다', sej: 3, ko: '금지의 뜻을 나타냅니다.', ex: '수업 시간에 떠들면 안 돼요.' },
  // --- TOPIK II 중고급 (세종 4) ---
  { m: 'ㄹ 뻔',   pat: '-(으)ㄹ 뻔하다', sej: 4, ko: '거의 그렇게 될 뻔했으나 그렇게 되지 않았음을 나타냅니다.', ex: '늦을 뻔했어요.' },
  { m: '는 김에', pat: '-는 김에', sej: 4, ko: '어떤 일을 하는 기회에 함께 다른 일도 함을 나타냅니다.', ex: '편지를 쓰는 김에 답장도 썼어요.' },
  { m: '는 척',   pat: '-(으)ㄴ/는 척하다', sej: 4, ko: '실제로는 그렇지 않은데 그런 것처럼 행동함을 나타냅니다.', ex: '들은 척도 안 했어요.' },
  { m: '더니',    pat: '-더니', sej: 4, ko: '과거에 경험한 일에 이어지는 일이나 대조를 나타냅니다.', ex: '아까는 덥더니 지금은 시원하네요.' },
  { m: '을 텐데', pat: '-(으)ㄹ 텐데', sej: 4, ko: '미루어 짐작한 상황을 배경으로 말함을 나타냅니다.', ex: '아마 피곤할 텐데 좀 쉬세요.' },
  { m: '아/어 버리', pat: '-아/어 버리다', sej: 4, ko: '행동이 완전히 끝났거나 아쉬움·안도감이 있음을 나타냅니다.', ex: '그만 실수로 지워 버렸어요.' },
  { m: '기로 하', pat: '-기로 하다', sej: 4, ko: '결정·약속의 뜻을 나타냅니다.', ex: '매일 운동하기로 했어요.' },
  { m: '자마자',  pat: '-자마자', sej: 4, ko: '앞의 일이 끝나자 곧바로 뒤의 일이 일어남을 나타냅니다.', ex: '집에 도착하자마자 전화했어요.' },
  { m: '도록',    pat: '-도록', sej: 4, ko: '정도·기준 또는 목적(그렇게 되게)을 나타냅니다.', ex: '늦지 않도록 일찍 출발했어요.' },
  { m: '는 편이', pat: '-는 편이다', sej: 4, ko: '대체로 그러한 경향이 있음을 나타냅니다.', ex: '저는 아침을 거르는 편이에요.' },
  { m: 'ㄹ수록',  pat: '-(으)ㄹ수록', sej: 4, ko: '정도가 커짐에 따라 그만큼 더함을 나타냅니다.', ex: '공부할수록 어려워져요.' },
  { m: '았/었더니', pat: '-았/었더니', sej: 4, ko: '과거의 행동을 하니 그 결과를 발견함을 나타냅니다.', ex: '창문을 열었더니 시원했어요.' },
  { m: '는 데다가', pat: '-는 데다가', sej: 4, ko: '앞의 사실에 덧붙여 또 다른 사실이 있음을 나타냅니다.', ex: '값도 싼 데다가 맛도 좋아요.' },
  // --- TOPIK II 고급 (세종 5–6) ---
  { m: 'ㄹ 지경', pat: '-(으)ㄹ 지경이다', sej: 6, ko: '정도가 매우 심함을 나타냅니다.', ex: '걱정이 되어 잠을 못 잘 지경이에요.' },
  { m: '는 한',   pat: '-는 한', sej: 6, ko: '앞의 조건이 유지되는 동안에는 뒤의 상황이 계속됨을 나타냅니다.', ex: '내가 있는 한 너를 지킬게.' },
  { m: '다시피',  pat: '-다시피 하다', sej: 6, ko: '실제로 그렇게 한 것은 아니지만 그에 가깝게 함을 나타냅니다.', ex: '매일 학교에 가다시피 해요.' }
];
function grammarHit(q) {
  const text = ((q.passage || '') + ' ' + (q.q || '') + ' ' +
    (q.options || []).map(o => o.t || '').join(' '));
  for (const g of GRAMMAR_LIB) {
    if (text.includes(g.m)) return g;
  }
  return null;
}
function sejBookVol(sej) {
  const map = { 1: '세종한국어 1A~2B · 초급', 2: '세종한국어 1A~2B · 초급', 3: '세종한국어 3A~4B · 중급', 4: '세종한국어 3A~4B · 중급', 5: '세종한국어 5A~6B · 고급', 6: '세종한국어 5A~6B · 고급' };
  return map[sej] || '세종한국어';
}

/* ---------- Professional references (국립국어원 / 세종학당재단 / NIIED) ---------- */
function refsFor(q) {
  const ko = LANG === 'ko';
  const refs = [];
  const lv = q.level || 3;
  const band = lv <= 2 ? (ko ? '초급(1A~2B)' : 'Beginner (1A–2B)')
            : lv <= 4 ? (ko ? '중급(3A~4B)' : 'Intermediate (3A–4B)')
            : (ko ? '고급(5A~6B)' : 'Advanced (5A–6B)');
  const p = (q.passage || '').trim();
  // 1) dictionary deep-links when the target word is directly available
  if (/^[가-힣]+$/.test(p) && p.length <= 20) {
    const enc = encodeURIComponent(p);
    refs.push({ src: ko ? '국립국어원 우리말샘' : 'NIKL Open Dictionary',
      label: ko ? `'${p}' 뜻과 용례 검색` : `Search '${p}' — meaning & usage`,
      url: 'https://opendict.korean.go.kr/search/searchResult?searchType=all&query=' + enc });
    refs.push({ src: '표준국어대사전',
      label: ko ? `'${p}' 표준어 뜻풀이 보기` : `'${p}' in the Standard Korean Dictionary`,
      url: 'https://stdict.korean.go.kr/search/searchResult.do?pageSize=10&searchKeyword=' + enc });
  } else {
    refs.push({ src: '표준국어대사전',
      label: ko ? '국립국어원 표준국어대사전 — 어휘 뜻 확인' : 'Standard Korean Dictionary (NIKL) — word meanings',
      url: 'https://stdict.korean.go.kr/' });
  }
  // 2) Sejong textbook matching this question's level band
  refs.push({ src: '세종학당재단',
    label: ko ? `누리 세종학당 — 세종한국어 ${band} 교재(E-book·PDF)에서 같은 문법·표현 복습` : `Nuri Sejong Institute — review the same grammar/expression in Sejong Korean ${band}`,
    url: 'https://nuri.iksi.or.kr/front/main/main.do?language=' + (ko ? 'ko' : 'en') });
  // 3) official TOPIK site
  refs.push({ src: 'NIIED',
    label: ko ? 'TOPIK 공식 누리집 — 시험 안내·기출 자료' : 'Official TOPIK (NIIED) — test guide & past papers',
    url: 'https://www.topik.go.kr/' });
  return refs;
}

/* ---------- Detailed explanation (why each option is right/wrong) ---------- */
function explainBlock(q) {
  const ko = LANG === 'ko';
  const en = LANG === 'en';
  const letters = '①②③④';
  const correct = q.correct;
  const optEx = en ? (q.optExplainEn || q.optExplain) : q.optExplain || [];
  const tipTxt = en ? (q.tipEn || q.tip) : q.tip;
  const optText = (o) => esc(o.t || '');
  let h = '';
  // 정답 상세
  const whyRight = optEx[correct] || q.explain || '';
  // 공식 도입문 — 유형 안내 (해설을 교과서체로 시작)
  const introGuide = {
    grammar: { ko: '이 문항은 문법 표현의 의미와 쓰임을 정확히 이해하고 있는지 확인하는 문제입니다. 제시된 문장의 구조와 어미의 기능을 중심으로 판단해야 합니다.', en: 'This item checks whether you understand the meaning and use of the grammar expression. Judge by the sentence structure and the function of the ending.' },
    vocab: { ko: '이 문항은 어휘의 정확한 의미를 알고 있는지 확인하는 문제입니다. 밑줄 친 단어가 문장 안에서 어떤 뜻으로 쓰였는지 살펴야 합니다.', en: 'This item checks your knowledge of exact word meaning. Look at how the underlined word is used in the sentence.' },
    blank_fill: { ko: '이 문항은 문맥에 맞는 표현을 고르는 문제입니다. 앞뒤 문장이 요구하는 내용과 어울리는지 확인해야 합니다.', en: 'This item asks you to choose the expression that fits the context. Check what the surrounding sentences require.' },
    main_idea: { ko: '이 문항은 글의 중심 내용(주제)을 파악하는 문제입니다. 필자가 전달하려는 핵심 주장에 주목해야 합니다.', en: 'This item asks for the main idea of the passage. Focus on the writer\'s core claim.' },
    same_content: { ko: '이 문항은 글의 세부 내용과 일치하는 것을 고르는 문제입니다. 수량·시간·대상 등 구체적 정보를 지문과 대조해야 합니다.', en: 'This item asks which detail matches the passage. Compare quantity, time, and object details with the text.' },
    insert_sentence: { ko: '이 문항은 주어진 문장이 들어갈 가장 자연스러운 위치를 찾는 문제입니다. 접속 표현과 문장 간 의미 관계를 살펴야 합니다.', en: 'This item asks where a given sentence best fits. Examine connective expressions and meaning relations.' },
    attitude: { ko: '이 문항은 필자의 태도·심정을 파악하는 문제입니다. 평가를 드러내는 표현("~해야 한다", "우려된다" 등)에 주목해야 합니다.', en: 'This item asks about the writer\'s attitude. Watch for evaluative expressions such as "must" or "concerned".' },
    headline_desc: { ko: '이 문항은 신문 제목이 전하는 내용을 정확히 해석하는 문제입니다. 주체·행위·대상의 관계를 풀어야 합니다.', en: 'This item asks you to interpret what a headline says. Unpack who did what to whom.' },
    topic: { ko: '이 문항은 말이나 글의 주제를 파악하는 문제입니다.', en: 'This item asks for the topic of the utterance or text.' },
    order: { ko: '이 문항은 문장을 자연스러운 순서로 배열하는 문제입니다. 시간 흐름과 접속 표현의 연결을 살펴야 합니다.', en: 'This item asks you to order sentences naturally. Follow time flow and connectives.' }
  }[q.type] || null;
  if (introGuide) {
    h += `<div class="dx dx-intro"><b style="color:var(--ios-purple);">${ko ? '해설' : 'Explanation'}</b> · ${ko ? introGuide.ko : introGuide.en}</div>`;
  }
  h += `<div class="dx dx-right">
    <div class="dx-head"><b>✅ ${en ? 'Correct' : ko ? '정답' : 'Correct'}: ${letters[correct]} ${optText(q.options[correct])}</b></div>
    <div class="dx-body">${esc(whyRight)}</div>
  </div>`;
  // 오답 상세 (각 오답 옵션별)
  const wrongs = [];
  (q.options || []).forEach((o, i) => {
    if (i === correct) return;
    const why = optEx[i] || (q.traps && q.traps.find(t => t.includes(letters[i]))) || '';
    wrongs.push(`<div class="dx-row">
      <b class="dx-letter">✗ ${letters[i]}</b>
      <div><div class="dx-opt">${optText(o)}${o.gl && en ? ` <span class="opt-gloss">· ${esc(o.gl)}</span>` : ''}</div>
      ${why ? `<div class="dx-why">${esc(why)}</div>` : ''}</div>
    </div>`);
  });
  if (wrongs.length) {
    h += `<div class="dx dx-wrongs"><div class="dx-head"><b>${en ? 'Why the others are wrong' : ko ? '왜 틀렸을까?' : 'Why the others are wrong'}</b></div>${wrongs.join('')}</div>`;
  }
  // TIP
  if (tipTxt) {
    h += `<div class="dx dx-tip"><div class="dx-head"><b>💡 ${t('tip').replace(/^💡\s*/, '')}</b></div><div class="dx-body">${esc(tipTxt)}</div></div>`;
  }
  // 문법 포인트 — 실제 기출 문법 표현을 감지해 세종학당 교재와 연결
  const g = grammarHit(q);
  const isGrammarType = q.type === 'grammar' || q.type === 'blank_fill' || q.type === 'sentence_pos';
  if (ko && g) {
    h += `<div class="dx dx-grammar"><div class="dx-head"><b>문법 포인트 · ${esc(g.pat)}</b></div>
      <div class="dx-body">${esc(g.ko)}</div>
      <div class="dx-gex">${esc(g.ex)}</div>
      <div class="dx-gsej">📖 ${esc(sejBookVol(g.sej))} — 누리 세종학당(세종학당재단)의 해당 권수 교재에서 이 문법이 나오는 단원을 찾아 복습하면 같은 유형 문제를 정확히 풀 수 있습니다.</div>
      <a class="dx-glink" href="https://nuri.iksi.or.kr/front/main/main.do?language=ko" target="_blank" rel="noopener">세종한국어 E-book에서 문법 단원 열기 ↗</a>
    </div>`;
  } else if (ko && isGrammarType) {
    const vol = (q.level <= 2 ? '세종한국어 1A~2B · 초급' : q.level <= 4 ? '세종한국어 3A~4B · 중급' : '세종한국어 5A~6B · 고급');
    h += `<div class="dx dx-grammar"><div class="dx-head"><b>문법 포인트</b></div>
      <div class="dx-body">이 문항은 문법·문장 구조를 묻는 문제로, 어미와 연결 표현의 기능을 정확히 알고 있는지 확인합니다. 제시문의 (    ) 앞뒤 문장이 요구하는 의미 관계를 먼저 파악하세요.</div>
      <div class="dx-gsej">📖 ${vol} — 세종학당재단 누리 세종학당의 해당 권수 교재에서 문법 단원을 복습하면 같은 유형 문제에 체계적으로 대비할 수 있습니다.</div>
      <a class="dx-glink" href="https://nuri.iksi.or.kr/front/main/main.do?language=ko" target="_blank" rel="noopener">세종한국어 E-book에서 문법 단원 열기 ↗</a>
    </div>`;
  }
  // 전문 참고자료 — 국립국어원 사전 / 세종학당 교재 / TOPIK 공식
  const refs = refsFor(q);
  h += `<div class="dx dx-ref"><div class="dx-head"><b>📚 ${ko ? '전문 참고자료' : 'References'}</b></div><div class="dx-refs">` +
    refs.map(r => `<a class="dx-ref-link" href="${escAttr(r.url)}" target="_blank" rel="noopener"><span class="dx-ref-src">${esc(r.src)}</span><span class="dx-ref-label">${esc(r.label)}</span><span class="dx-ref-go">↗</span></a>`).join('') +
    `</div></div>`;
  return h;
}
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escAttr(s) { return esc(s).replace(/"/g, '&quot;'); }

/* ---------- TTS listening playback ---------- */
let _audioEl = null;
function playListening(btn, text) {
  if (!text) { alert(t('listen') + ' — ' + (LANG==='ko'?'대본이 없습니다.':'No script available.')); return; }
  const url = aiUrl('/tts?text=') + encodeURIComponent(text) + '&voice=alloy';
  if (!_audioEl) {
    _audioEl = new Audio();
    _audioEl.onended = () => { if (btn) { btn.innerHTML = ic('listen',15) + ' ' + t('listen'); btn.disabled = false; } };
    _audioEl.onerror = () => { if (btn) { btn.innerHTML = ic('listen',15) + ' ' + t('listen'); btn.disabled = false; alert(LANG==='ko'?'오디오를 불러오지 못했어요. AI 서버가 켜져 있는지 확인하세요.':'Could not load audio — is the AI server running?'); } };
  }
  _audioEl.src = url;
  _audioEl.play().then(() => {
    if (btn) { btn.innerHTML = ic('pause', 15) + ' ' + (LANG==='ko' ? '재생 중…' : 'Playing…'); btn.disabled = true; }
  }).catch(e => {
    if (btn) { btn.innerHTML = ic('listen',15) + ' ' + t('listen'); btn.disabled = false; }
    alert(LANG==='ko' ? ('재생에 실패했어요: ' + e.message) : ('Playback failed: ' + e.message));
  });
}
function levelOf(q) { return q.level <= 2 ? 'I' : 'II'; }

/* ---------- tab routing ---------- */
function go(tab, noPush) {
  if (tab !== APP.tab) {
    if (!noPush) {
      APP.navStack.push(APP.tab);
      if (APP.navStack.length > 20) APP.navStack.shift();
      try { history.pushState({ t: tab }, ''); } catch (e) {}
    }
  }
  APP.tab = tab;
  document.querySelectorAll('.tab-item').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  render();
}
/* Back navigation — pops the tab stack (used by the header back button AND the Android hardware back via popstate) */
function goBack() {
  // if we're mid-section (solving questions), back exits the flow first
  if (APP.sectionQs || APP.sectionLoading) { exitSection(); return; }
  // mid mock test → exit to the mock list first (stack survives so a second back leaves the tab)
  if (APP.mock) { exitMock(); return; }
  // mid daily set → clear it and return to where we came from
  if (APP.daily && APP.daily.length && (APP.tab === 'daily' || APP.dailyDone)) {
    APP.daily = []; APP.dailyIdx = 0; APP.dailyAnswers = {}; APP.dailyDone = false; APP.dailyResult = null;
    const prev = APP.navStack.pop();
    go(prev || 'home', true);
    return;
  }
  const prev = APP.navStack.pop();
  go(prev || 'home', true);
}
function updateBackBtn() {
  const btn = $id('back-btn');
  if (!btn) return;
  const show = APP.navStack.length > 0;
  btn.style.display = show ? 'inline-flex' : 'none';
}
window.addEventListener('popstate', () => {
  // Android / browser hardware back — mimic the on-screen back button
  goBack();
});
function render() {
  const s = $id('screen');
  if (!s) return;
  switch (APP.tab) {
    case 'home': s.innerHTML = viewHome(); bindHome(); break;
    case 'daily': s.innerHTML = viewDaily(); bindDaily(); break;
    case 'reading': s.innerHTML = viewSection('reading'); bindDaily(); break;
    case 'listening': s.innerHTML = viewSection('listening'); bindDaily(); break;
    case 'writing': s.innerHTML = viewSection('writing'); bindDaily(); break;
    case 'mock': s.innerHTML = viewMock(); bindMock(); break;
    case 'rank': s.innerHTML = viewRank(); bindRank(); break;
    case 'wrong': s.innerHTML = viewWrong(); bindWrong(); break;
    case 'learn': s.innerHTML = viewLearn(); bindLearn(); break;
    case 'progress': s.innerHTML = viewProgress(); bindProgress(); break;
    case 'my': s.innerHTML = viewMy(); bindMy(); break;
    case 'challenge': s.innerHTML = viewChallenge(); bindChallenge(); break;
    case 'schedule': s.innerHTML = viewSchedule(); bindSchedule(); break;
  }
  renderSchedBanner();
  updateBackBtn();
  // expression cycle only lives on the home tab
  if (APP.tab !== 'home') stopFxCycle();
}

/* ================= HOME ================= */
function viewHome() {
  const prog = lsGet(LS.progress, {});
  const answered = Object.keys(prog).length;
  const streak = lsGet(LS.streak, { last: null, count: 0 });
  const acc = accuracyStats();
  const isNew = answered === 0;
  const lvl = xpProgress();
  // Greeting — Hi, {character name}! 👋 inside a Seoul-scene card
  const nm = myCharName();
  const mc = myChar();
  const wxc = wxCached();
  const scene = `
    <div class="seoul-scene scene-${scenePartOfDay()}" id="seoul-scene">
      <img class="scene-landmark" id="scene-landmark" src="assets/img/namsan-${scenePartOfDay()}.svg" alt="Namsan Seoul Tower" draggable="false">
      <div class="scene-top">
        <div class="scene-txt">
          <h1 class="greet-h">${t('home_greet', { name: esc(nm) })}</h1>
          <p class="greet-s">${t('home_greet_sub')}</p>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;position:relative;z-index:2;">
          <div class="greet-avatar" id="greet-avatar" onclick="openCharPicker()" title="${LANG==='ko'?'캐릭터 바꾸기':'Change character'}">
            <img id="greet-avatar-img" src="${mc.img}" alt="mascot">
            <span class="avatar-edit">✎</span>
          </div>
        </div>
      </div>
      <div class="scene-meta">
        <span class="wx-chip" id="wx-chip">${wxc ? greetWxText(wxc) : (LANG === 'ko' ? '서울 · --°' : 'Seoul · --°')}</span>
        <span class="meta-dot">•</span>
        <span class="time-chip" id="seoul-clock">${seoulTimeStr()}</span>
      </div>
    </div>`;
  // fetch Seoul weather in the background and patch in place (chip only)
  fetchSeoulWeather().then(wx => {
    if (!wx) return;
    const chip = $id('wx-chip'); if (chip) chip.textContent = greetWxText(wx);
  });
  tickClock();
  // Quick start — four big pretty one-tap test cards (no icons, no title bar)
  const aiQuick = `
    <div class="app-card ai-quick ai-hero aq-nohead">
      <div class="aq-4">
        <button class="aq-cell aq-r" onclick="startSection('reading', myLevel())">
          <span class="aq-txt"><b>${t('nav_reading')}</b><span class="aq-sub">${t('home_ai_read')}</span></span>
          <span class="aq-arr">→</span>
        </button>
        <button class="aq-cell aq-l" onclick="startSection('listening', myLevel())">
          <span class="aq-txt"><b>${t('nav_listening')}</b><span class="aq-sub">${t('home_ai_listen')}</span></span>
          <span class="aq-arr">→</span>
        </button>
        <button class="aq-cell aq-v" onclick="startSection('reading', myLevel(), 'vocab')">
          <span class="aq-txt"><b>${t('home_task_vocab')}</b><span class="aq-sub">${t('home_sch_vocab')}</span></span>
          <span class="aq-arr">→</span>
        </button>
        <button class="aq-cell aq-m" onclick="go('mock')">
          <span class="aq-txt"><b>${t('home_task_mock')}</b><span class="aq-sub">${t('home_sch_mock')}</span></span>
          <span class="aq-arr">→</span>
        </button>
      </div>
    </div>`;
  // Today's Schedule — compact 2×2 grid (clean)
  const schedRows = [
    { time: '09:00', icon: 'learn', col: 'var(--ios-blue)', label: t('home_sch_reading'), go: `startSection('reading', myLevel())` },
    { time: '11:30', icon: 'listen', col: 'var(--ios-teal)', label: t('home_sch_listening'), go: `startSection('listening', myLevel())` },
    { time: '14:00', icon: 'notes', col: 'var(--ios-orange)', label: t('home_sch_vocab'), go: `startSection('reading', myLevel(), 'vocab')` },
    { time: '16:30', icon: 'mock', col: 'var(--ios-pink)', label: t('home_sch_mock'), go: `go('mock')` }
  ].map(r => `
    <div class="sched-cell" onclick="${r.go}">
      <span class="sched-ico" style="background:${r.col}1A;color:${r.col};">${ic(r.icon,16)}</span>
      <div class="sched-txt"><b>${r.label}</b><span class="sub">${r.time}</span></div>
    </div>`).join('');
  const schedule = `
    <div class="sec-h"><h2>${ic('schedule',15)} ${t('home_schedule')}</h2><span class="sub" style="cursor:pointer;" onclick="go('schedule')">${t('home_view_all')} →</span></div>
    <div class="app-card sched-grid">${schedRows}</div>`;
  // Today's goal — reading / listening / vocabulary
  const goalCards = [
    { key: 'reading', icon: 'learn', col: 'var(--ios-blue)', go: `startSection('reading', myLevel())` },
    { key: 'listening', icon: 'listen', col: 'var(--ios-teal)', go: `startSection('listening', myLevel())` },
    { key: 'vocab', icon: 'notes', col: 'var(--ios-orange)', go: `startSection('reading', myLevel(), 'vocab')` }
  ].map(g => `
    <div class="app-card goal-card" style="border-left:3px solid ${g.col};">
      <div class="row" style="cursor:pointer;" onclick="${g.go}">
        <div style="color:${g.col};margin-right:10px;">${ic(g.icon,22)}</div>
        <div style="flex:1;"><b style="font-size:14px;">${t('goal_' + g.key)}</b>
        <div class="sub" style="font-size:11.5px;">${t('goal_start')} · 10 ${t('sec_qs')}</div></div>
        <span style="color:${g.col};">→</span>
      </div>
    </div>`).join('');
  // This Week — calendar + tasks + streak (Aiko planner)
  const weekBlock = `
    <div class="sec-h"><h2>${ic('daily',15)} ${t('home_week')}</h2></div>
    ${weekCalendarHTML()}
    <div class="app-card ht-card">${homeTasksHTML()}</div>
    ${streakCardHTML()}`;
  return `
    ${scene}
    ${aiQuick}
    ${weekBlock}
    ${schedule}
    <div class="sec-h"><h2>${ic('target',15)} ${t('goal_title')}</h2><span class="sub">${t('goal_sub')}</span></div>
    ${goalCards}
    ${levelCardHTML()}
    ${smartRecCard(acc)}
    ${questHTML()}
    ${isNew ? '' : `
    <div class="sec-h"><h2>${ic('chart',15)} ${t('avg_acc')}</h2><span class="sub">${t('overall')} ${acc.overall}%</span></div>
    <div class="app-card filled">
      <b style="font-size:13px;color:var(--ios-blue);">${t('by_type')}</b>
      ${acc.byType.length
        ? acc.byType.slice(0, 5).map(r => accBar(typeLabel(r.k), r.p, `${r.c}/${r.n}문항`)).join('')
        : `<p class="sub" style="margin-top:6px;">${t('type_empty')}</p>`}
      ${acc.byType.length > 5 ? `<div class="sub" style="font-size:11px;margin-top:6px;">+ ${acc.byType.length - 5} ${t('by_type')} → ${ic('notes',12)} ${t('wrong_link')}</div>` : ''}
    </div>
    <div class="app-card filled">
      <b style="font-size:13px;color:var(--ios-blue);">${t('by_level')}</b>
      ${acc.byLevel.length
        ? acc.byLevel.map(r => accBar(r.k <= 2 ? '★'.repeat(r.k) : 'L' + r.k + ' ★'.repeat(Math.max(1, r.k - 2)), r.p, `${r.c}/${r.n}문항`)).join('')
        : `<p class="sub" style="margin-top:6px;">${t('level_empty')}</p>`}
    </div>`}

    <div class="sec-h"><h2>${t('quick')}</h2></div>
    <div class="app-card elevated"><div class="row" onclick="go('schedule')" style="cursor:pointer;">
      <div style="color:var(--ios-blue);margin-right:10px;">${ic('schedule',22)}</div><div><b>${t('sched_link')}</b><div class="sub">${t('sched_desc')}</div></div><span style="color:var(--ios-green);">→</span></div></div>
    <div class="app-card elevated"><div class="row" onclick="go('learn')" style="cursor:pointer;">
      <div style="color:var(--ios-green);margin-right:10px;">${ic('learn',22)}</div><div><b>${t('learn_link')}</b><div class="sub">${t('learn_desc')}</div></div><span style="color:var(--ios-green);">→</span></div></div>
    <div class="app-card elevated"><div class="row" onclick="go('wrong')" style="cursor:pointer;">
      <div style="color:var(--ios-orange);margin-right:10px;">${ic('notes',22)}</div><div><b>${t('wrong_link')}</b><div class="sub">${t('wrong_desc', { n: lsGet(LS.wrong, []).length })}</div></div><span style="color:var(--ios-green);">→</span></div></div>
  `;
}
function setLevel(lv) {
  APP.level = lv;
  document.querySelectorAll('#home-lvl .lvl-pill').forEach(b => b.classList.toggle('active', b.dataset.lvl === lv));
  document.querySelector('#home-lvl .lvl-pill.lv2').classList.toggle('active', lv === 'II');
  render();
}
function bindHome() {
  startFxCycle();
}
/* ================= CHARACTER EXPRESSION ANIMATIONS ================= */
/* Each mood swaps the avatar to a REAL face-image of the same character
   (AI-generated expression portraits in assets/img/chars/fx/). The face
   itself changes: smile / angry / cry / phone / eat / sleepy. */
const FX_MOODS = [
  { k: 'smile',  file: 'smile',  cls: 'fx-smile' },   // 웃는 얼굴
  { k: 'angry',  file: 'angry',  cls: 'fx-angry' },   // 화난 얼굴
  { k: 'cry',    file: 'cry',    cls: 'fx-cry' },     // 우는 얼굴
  { k: 'phone',  file: 'phone',  cls: 'fx-phone' },   // 전화하는 얼굴
  { k: 'eat',    file: 'eat',    cls: 'fx-eat' },     // 밥 먹는 얼굴
  { k: 'music',  file: 'music',  cls: 'fx-music' },   // 음악 듣는 얼굴 (헤드폰)
  { k: 'sleep',  file: 'sleep',  cls: 'fx-sleep' },   // 책상에 엎드려 자는 얼굴
  { k: 'study',  file: 'study',  cls: 'fx-study' },   // 책 읽는 얼굴
  { k: 'sing',   file: 'sing',   cls: 'fx-sing' },    // 노래 부르는 얼굴
  { k: 'dance',  file: 'dance',  cls: 'fx-dance' },   // 춤추는 얼굴
  { k: 'cook',   file: 'cook',   cls: 'fx-cook' },    // 요리하는 얼굴
  { k: 'game',   file: 'game',   cls: 'fx-game' },    // 게임하는 얼굴
  { k: 'selfie', file: 'selfie', cls: 'fx-selfie' }   // 셀카 찍는 얼굴
];
let _fxTimer = null, _fxIdx = -1, _fxLastKey = 'smile';
/* frames per mood — when a mood has N frames (f-01-{mood}-1.webp … -N.webp)
   the avatar plays them as a flip-book loop for a real animation feel.
   Fallback to the single still portrait when frames are missing. */
const FX_FRAMES = { dance: 4, smile: 3, angry: 3, cry: 3, phone: 3, eat: 3, music: 3, sleep: 3, study: 3, sing: 3, cook: 3, game: 3, selfie: 3 };
const FX_FRAME_MS = 280;   // ms per frame (≈3.5 fps flip-book)
let _fxFrameTimer = null, _fxFrameIdx = 0;
function fxFrameCount(k) {
  const n = FX_FRAMES[k] || 0;
  return n;
}
/* play a flip-book loop for the current mood — called after the still is set */
function fxStartFrames(m) {
  if (_fxFrameTimer) { clearInterval(_fxFrameTimer); _fxFrameTimer = null; }
  const n = fxFrameCount(m.k);
  if (!n) return;
  const img = $id('greet-avatar-img');
  if (!img) return;
  _fxFrameIdx = 0;
  const id = myCharId();
  const base = `assets/img/chars/fx/${id}-${m.file}.webp`;
  // pre-load all frames, then loop 1..n → n..1 ping-pong for smoothness
  const frames = [];
  let loaded = 0;
  const onProbe = (src, ok) => {
    if (ok) { frames.push(src); loaded++; }
    if (loaded === n) {
      if (!frames.length) return;
      _fxFrameTimer = setInterval(() => {
        const img2 = $id('greet-avatar-img');
        if (!img2 || _fxLastKey !== m.k) { clearInterval(_fxFrameTimer); _fxFrameTimer = null; return; }
        img2.src = frames[_fxFrameIdx % frames.length];
        _fxFrameIdx++;
      }, FX_FRAME_MS);
    }
  };
  for (let i = 1; i <= n; i++) {
    const p = `assets/img/chars/fx/${id}-${m.file}-${i}.webp`;
    const pr = new Image();
    pr.onload = () => onProbe(p, true);
    pr.onerror = () => onProbe(base, false);
    pr.src = p;
  }
}
/* Which moods fit each 3-hour Seoul block — the character only ACTS actions
   that make sense right now (sleeps late at night, studies in the morning,
   eats at lunch, cooks/sings in the evening, games before bed). */
const FX_BY_PART = {
  midnight:  ['sleep'],
  predawn:   ['sleep'],
  sunrise:   ['smile', 'music', 'sing', 'eat'],          // waking up, morning mood
  morning:   ['study', 'smile', 'music'],                // study time
  midday:    ['eat', 'study', 'smile', 'phone'],         // lunch break
  afternoon: ['study', 'phone', 'game', 'music'],        // classes + study
  sunset:    ['cook', 'eat', 'dance', 'sing', 'music'],  // dinner, hobbies
  night:     ['game', 'selfie', 'music', 'phone', 'dance'] // evening wind-down
};
function fxPoolForPart(part) {
  const keys = FX_BY_PART[part] || ['smile'];
  return keys.map(k => FX_MOODS.find(m => m.k === k)).filter(Boolean);
}
/* pick the expression portrait path for the current character (falls back to base) */
function fxImgPath(m) {
  return `assets/img/chars/fx/${myCharId()}-${m.file}.webp`;
}
function fxApply(m) {
  const av = $id('greet-avatar');
  const img = $id('greet-avatar-img');
  if (!av || !img) return;
  FX_MOODS.forEach(x => av.classList.remove(x.cls));
  av.classList.add(m.cls);
  _fxLastKey = m.k;
  const target = fxImgPath(m);
  const probe = new Image();
  probe.onload = () => { img.src = target; fxStartFrames(m); };
  probe.onerror = () => { img.src = myChar().img; };   // portrait missing → base face
  probe.src = target;
}
function showFx(i) { const m = FX_MOODS[i % FX_MOODS.length]; fxApply(m); }
function nextFx() {
  const pool = fxPoolForPart(scenePartOfDay());
  if (!pool.length) return;
  _fxIdx = (_fxIdx + 1) % pool.length;
  fxApply(pool[_fxIdx]);
}
function startFxCycle() {
  if (_fxTimer) clearInterval(_fxTimer);
  if ($id('greet-avatar')) {
    _fxIdx = -1;
    nextFx();
    _fxTimer = setInterval(nextFx, 4200);
  }
}
function stopFxCycle() { if (_fxTimer) { clearInterval(_fxTimer); _fxTimer = null; } if (_fxFrameTimer) { clearInterval(_fxFrameTimer); _fxFrameTimer = null; } }
/* when the time-of-day scene changes, hop the character to a mood that fits */
function syncFxWithPart() {
  const pool = fxPoolForPart(scenePartOfDay());
  if (!pool.length) return;
  if (!pool.some(m => m.k === _fxLastKey)) {
    _fxIdx = -1;
    nextFx();
  }
}


/* ================= FOCUS TIMER (Pomodoro, Aiko-style) ================= */
let _focusTimer = null, _focusRemain = 0, _focusMode = 'pomo';
const FOCUS_LS = 'camnemi_topik_focus';
function focusState() { return lsGet(FOCUS_LS, { pomo: 25 * 60, short: 5 * 60 }); }
function focusDur(mode) { const s = focusState(); return (mode || _focusMode) === 'short' ? (s.short || 300) : (s.pomo || 1500); }
function fmtFocus(sec) { return String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0'); }
function focusCardHTML() {
  _focusMode = _focusMode || 'pomo';
  if (_focusRemain <= 0) _focusRemain = focusDur(_focusMode);
  const total = focusDur(_focusMode);
  const r = 42, C = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, _focusRemain / total));
  return `
  <div class="app-card focus-card">
    <div class="sec-h" style="margin-bottom:8px;"><h2>${ic('target',15)} ${t('home_focus')}</h2>
      <div class="focus-tabs">
        <span class="ft ${_focusMode === 'pomo' ? 'on' : ''}" onclick="setFocusMode('pomo')">${t('home_focus_pomo')}</span>
        <span class="ft ${_focusMode === 'short' ? 'on' : ''}" onclick="setFocusMode('short')">${t('home_focus_short')}</span>
      </div></div>
    <div class="focus-main">
      <div class="focus-ring" style="--pct:${pct};">
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="${r}" class="fr-bg"/><circle cx="50" cy="50" r="${r}" class="fr-fg" style="stroke-dasharray:${C};stroke-dashoffset:${C * (1 - pct)};"/></svg>
        <div class="focus-time" id="focus-time">${fmtFocus(_focusRemain)}</div>
      </div>
      <button class="btn btn-primary focus-btn" id="focus-btn" onclick="toggleFocus()">${ic('pause',15)} ${t('home_focus_start')}</button>
    </div>
    <div class="focus-sess"><img src="${myChar().img}" alt="girl" class="fs-girl"> ${ic('flame',12)} <b id="focus-sess">${lsGet('camnemi_topik_focus_sess', 0)}</b> ${t('home_focus_sessions')}</div>
  </div>`;
}
function setFocusMode(m) {
  _focusMode = m; _focusRemain = focusDur(m);
  if (_focusTimer) { clearInterval(_focusTimer); _focusTimer = null; }
  const b = $id('focus-btn'); if (b) b.innerHTML = ic('pause',15) + ' ' + t('home_focus_start');
  render();
}
function toggleFocus() {
  const b = $id('focus-btn');
  if (_focusTimer) {
    clearInterval(_focusTimer); _focusTimer = null;
    if (b) b.innerHTML = ic('pause',15) + ' ' + t('home_focus_start');
    return;
  }
  if (b) b.innerHTML = ic('pause',15) + ' ' + t('home_focus_pause');
  _focusTimer = setInterval(() => {
    _focusRemain--;
    const el = $id('focus-time');
    if (el) el.textContent = fmtFocus(Math.max(0, _focusRemain));
    if (_focusRemain <= 0) {
      clearInterval(_focusTimer); _focusTimer = null;
      // session complete
      const n = (parseInt(lsGet('camnemi_topik_focus_sess', 0)) || 0) + 1;
      localStorage.setItem('camnemi_topik_focus_sess', n);
      const mins = (parseInt(localStorage.getItem('camnemi_topik_focus_min') || '0') || 0) + Math.round(focusDur(_focusMode) / 60);
      localStorage.setItem('camnemi_topik_focus_min', mins);
      const se = $id('focus-sess'); if (se) se.textContent = n;
      _focusRemain = focusDur(_focusMode);
      render();
      toast(LANG === 'ko' ? '🎉 집중 세션 완료! 잠깐 쉬어요.' : '🎉 Focus session done! Take a short break.');
    }
  }, 1000);
}

/* ================= WEEK CALENDAR + TASKS + STREAK (Aiko-style) ================= */
/* per-day stats from the daily store: {solved, correct, pct} or null if untouched */
function dayStats(dateStr) {
  const rec = lsGet(LS.daily, {})[dateStr];
  if (!rec) return null;
  const done = rec.done || {};
  const ids = Object.keys(done);
  if (!ids.length) return null;
  let correct = 0;
  ids.forEach(qid => {
    const q = (rec.questions && rec.questions.find(x => x.id === qid)) || qById(qid);
    if (!q) return;
    if (q.section === 'writing') { correct++; return; }   // submitted writing counts as attempted
    if (done[qid] === q.correct) correct++;
  });
  const solved = ids.length;
  return { solved, correct, pct: Math.round(correct / solved * 100) };
}
function weekCalendarHTML() {
  const now = new Date();
  const day = now.getDay();               // 0=Sun
  const mon = new Date(now); mon.setDate(now.getDate() - ((day + 6) % 7));   // Monday
  const days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const dailyAll = lsGet(LS.daily, {});
  const cells = days.map((d, i) => {
    const dt = new Date(mon); dt.setDate(mon.getDate() + i);
    const ds = dayStats(dateKey(dt));
    const isToday = dt.toDateString() === now.toDateString();
    return `<div class="wc-day ${isToday ? 'on' : ''} ${ds ? 'has' : ''}" onclick="showDayStats('${dateKey(dt)}', this)">
      <span class="wc-d">${d}</span><span class="wc-n">${dt.getDate()}</span>
      ${ds ? `<span class="wc-dot" title="${ds.solved} q · ${ds.pct}%"></span>` : ''}
    </div>`;
  }).join('');
  return `<div class="app-card wc-card">
    <div class="wc-grid">${cells}</div>
    <div class="wc-detail" id="wc-detail"></div>
  </div>`;
}
function dateKey(dt) {
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return `${dt.getFullYear()}-${m}-${dd}`;
}
function showDayStats(dateStr, el) {
  const det = $id('wc-detail');
  if (!det) return;
  // highlight
  document.querySelectorAll('.wc-day').forEach(x => x.classList.remove('pick'));
  if (el) el.classList.add('pick');
  const ds = dayStats(dateStr);
  const dt = new Date(dateStr + 'T00:00:00');
  const label = `${dt.getMonth() + 1}/${dt.getDate()}`;
  det.innerHTML = ds ? `
    <div class="wc-stat"><b>${ds.solved}</b> ${t('sec_qs')} · ${t('rank_acc')} <b>${ds.pct}%</b></div>
    <div class="wc-bar"><span style="width:${ds.pct}%"></span></div>` : `
    <div class="wc-stat muted">${label} — ${LANG === 'ko' ? '푼 문제 없음' : LANG === 'km' ? 'គ្មានសំណួរ' : 'No questions solved'}</div>`;
}
function homeTasksHTML() {
  const done = lsGet('camnemi_topik_home_tasks', {});
  const tasks = [
    { k: 'reading', icon: 'learn', col: 'var(--ios-blue)', label: t('home_task_reading'), go: `startSection('reading', myLevel())` },
    { k: 'listening', icon: 'listen', col: 'var(--ios-teal)', label: t('home_task_listening'), go: `startSection('listening', myLevel())` },
    { k: 'vocab', icon: 'notes', col: 'var(--ios-orange)', label: t('home_task_vocab'), go: `startSection('reading', myLevel(), 'vocab')` },
    { k: 'mock', icon: 'mock', col: 'var(--ios-pink)', label: t('home_task_mock'), go: `go('mock')` }
  ];
  return tasks.map(tk => `
    <div class="ht-row" onclick="${tk.go}">
      <span class="ht-check ${done[tk.k] ? 'on' : ''}" onclick="event.stopPropagation();toggleHomeTask('${tk.k}')">${done[tk.k] ? '✓' : ''}</span>
      <span class="ht-ico" style="background:${tk.col}1A;color:${tk.col};">${ic(tk.icon,15)}</span>
      <span class="ht-label ${done[tk.k] ? 'done' : ''}">${tk.label}</span>
    </div>`).join('');
}
function toggleHomeTask(k) {
  const d = lsGet('camnemi_topik_home_tasks', {});
  d[k] = !d[k]; localStorage.setItem('camnemi_topik_home_tasks', JSON.stringify(d));
  render();
}
/* ================= Seoul weather (subtle animated backdrop behind the greeting) ================= */
const WX_LS = 'camnemi_topik_weather';
const WX_CACHE_MS = 10 * 60 * 1000;      // 10-minute cache
/* Seoul local time (Asia/Seoul), e.g. 오후 2:30 or 2:30 PM */
function seoulTimeStr() {
  try {
    const loc = LANG === 'ko' ? 'ko-KR' : 'en-US';
    return new Intl.DateTimeFormat(loc, { timeZone: 'Asia/Seoul', hour: 'numeric', minute: '2-digit' }).format(new Date());
  } catch (e) {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
/* Seoul hour-of-day → which Namsan scene (3-hour blocks, 8 scenes):
   midnight(00-03) predawn(03-06) sunrise(06-09) morning(09-12)
   midday(12-15) afternoon(15-18) sunset(18-21) night(21-24) */
function scenePartOfDay() {
  let h;
  try {
    h = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Seoul', hour: '2-digit', hour12: false }).format(new Date()), 10);
  } catch (e) {
    h = new Date().getHours();
  }
  if (h >= 0 && h < 3) return 'midnight';
  if (h >= 3 && h < 6) return 'predawn';
  if (h >= 6 && h < 9) return 'sunrise';
  if (h >= 9 && h < 12) return 'morning';
  if (h >= 12 && h < 15) return 'midday';
  if (h >= 15 && h < 18) return 'afternoon';
  if (h >= 18 && h < 21) return 'sunset';
  return 'night';
}
/* cross-fade the scene landmark to the time-of-day art */
let _scenePart = null;
function updateScenePart() {
  const img = $id('scene-landmark');
  if (!img) return;
  const part = scenePartOfDay();
  if (part === _scenePart) return;
  _scenePart = part;
  const next = 'assets/img/namsan-' + part + '.svg';
  if (img.src && img.src.indexOf('namsan-' + part) !== -1) return;
  // switch the card mood class too
  const card = $id('seoul-scene');
  if (card) {
    card.classList.remove('scene-midnight','scene-predawn','scene-sunrise','scene-morning','scene-midday','scene-afternoon','scene-sunset','scene-night');
    card.classList.add('scene-' + part);
  }
  // character hops to an action that fits the new time of day
  syncFxWithPart();
  img.style.opacity = 0;
  setTimeout(() => {
    const probe = new Image();
    probe.onload = () => { img.src = next; img.style.opacity = .92; };
    probe.onerror = () => { img.style.opacity = .92; };  // keep current art if missing
    probe.src = next;
  }, 450);
}
/* refresh #seoul-clock every 20s while visible */
let _wxClockTimer = null;
function tickClock() {
  const el = $id('seoul-clock');
  if (!el) return;
  el.textContent = seoulTimeStr();
  updateScenePart();
  if (!_wxClockTimer) {
    _wxClockTimer = setInterval(() => {
      const e = $id('seoul-clock');
      if (e && e.isConnected) e.textContent = seoulTimeStr();
      updateScenePart();
    }, 20000);
  }
}
function wxCached() {
  try {
    const c = JSON.parse(localStorage.getItem(WX_LS) || 'null');
    if (c && c.ts && Date.now() - c.ts < WX_CACHE_MS && typeof c.code === 'number') return c;
  } catch (e) {}
  return null;
}
async function fetchSeoulWeather() {
  try {
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current=temperature_2m,weather_code&timezone=Asia%2FSeoul', { signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    const j = await r.json();
    const wx = { ts: Date.now(), code: j.current.weather_code, temp: Math.round(j.current.temperature_2m) };
    try { localStorage.setItem(WX_LS, JSON.stringify(wx)); } catch (e) {}
    return wx;
  } catch (e) { return null; }
}
/* WMO weather code → animation type */
function weatherType(code) {
  if (code === 0) return 'sun';
  if (code === 1 || code === 2) return 'suncloud';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'fog';
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return 'rain';
  if ([71,73,75,77,85,86].includes(code)) return 'snow';
  if ([95,96,99].includes(code)) return 'thunder';
  return 'cloud';
}
function wxIcon(code) {
  const t = weatherType(code);
  return { sun: '☀️', suncloud: '⛅', cloud: '☁️', fog: '🌫️', rain: '🌧️', snow: '🌨️', thunder: '⛈️' }[t] || '☁️';
}
function greetWxText(wx) {
  const city = LANG === 'ko' ? '서울' : 'Seoul';
  return `${city} · ${wxIcon(wx.code)} ${wx.temp}°`;
}
function streakCardHTML() {
  const streak = lsGet(LS.streak, { last: null, count: 0 });
  return `
  <div class="streak-card">
    <div class="sc-ico"><img src="assets/img/cat-mascot.webp" alt="cat"></div>
    <div class="sc-main"><b>${streak.count}</b> ${t('home_streak_days')}<div class="sc-sub">${t('home_streak_card')}</div></div>
    <div class="sc-flame">🔥</div>
  </div>`;
}

/* ================= DAILY 10 ================= */
function buildDaily() {
  const today = todayStr();
  const saved = lsGet(LS.daily, {})[today];
  if (saved && saved.questions) {
    // AI-generated set: full question objects stored
    APP.daily = saved.questions;
    APP.dailyAnswers = saved.done || {};
    APP.aiMode = true;
  } else if (saved && saved.qids) {
    APP.daily = saved.qids.map(qById).filter(Boolean);
    APP.dailyAnswers = saved.done || {};
    APP.aiMode = false;
  } else {
    // AI-style daily set: pick 10 by level, balanced sections
    const pool = allQuestions().filter(q => levelOf(q) === APP.level);
    const secs = ['reading','listening','writing'];
    const picked = [];
    secs.forEach(sec => {
      const inSec = pool.filter(q => q.section === sec);
      const want = sec === 'writing' ? 2 : 4;
      for (let i = 0; i < want && inSec.length; i++) {
        const q = inSec[i % inSec.length];
        if (!picked.includes(q.id)) picked.push(q.id);
      }
    });
    pool.forEach(q => { if (picked.length < 10 && !picked.includes(q.id)) picked.push(q.id); });
    APP.daily = picked.map(qById).filter(Boolean);
    APP.dailyAnswers = {};
    APP.aiMode = false;
    const all = lsGet(LS.daily, {});
    all[today] = { qids: picked, done: {} };
    lsSet(LS.daily, all);
  }
}
function viewDaily() {
  buildDaily();
  if (APP.dailyDone) return viewDailyResult();
  const today = todayStr();
  const saved = lsGet(LS.daily, {})[today] || {};
  const done = saved.done || {};
  const qs = APP.daily;
  const doneCount = Object.keys(done).length;
  const pct = qs.length ? Math.round(doneCount / qs.length * 100) : 0;
  const q = qs[APP.dailyIdx];
  if (!q) {
    return `<div class="app-card big-cta">
      <div class="cta-ico" style="color:var(--ios-green);">${ic('spark', 40)}</div><h2>${LANG === 'ko' ? '오늘의 문제를 모두 풀었어요!' : 'All done for today!'}</h2>
      <p class="sub">${LANG === 'ko' ? '내일 새로운 문제가 나와요. 틀린 문제를 오답노트에서 복습하세요.' : 'Come back tomorrow for a fresh set. Review your mistakes in My Notes.'}</p>
      <button class="btn btn-primary" style="margin-top:14px;" onclick="go('wrong')">${ic('notes',16)} ${t('wrong_link')}</button>
    </div>`;
  }
  const picked = done[q.id];
  const isAI = String(q.id).startsWith('AI');
  return `
    <div class="app-card">
      <div class="row"><span class="q-num">Q${APP.dailyIdx + 1} / ${qs.length} · DAILY${isAI ? ' ✨ AI' : ''}</span>
      <span class="q-type">${q.section === 'reading' ? t('sec_reading') : q.section === 'listening' ? t('sec_listening') : t('sec_writing')}</span></div>
      <div class="daily-progress"><div style="width:${pct}%"></div></div>
      ${isAI ? `<div style="margin:4px 0;"><span style="font-size:11px;color:var(--ios-green);font-weight:800;">✨ ${t('ai_badge')}</span></div>` : ''}
      ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ''}
      ${q.passageGl ? `<div class="passage-gloss">📖 ${esc(q.passageGl)}</div>` : ''}
      ${q.section === 'listening' ? `<button class="btn btn-primary btn-sm" style="margin:4px 0 8px;width:100%;" onclick="playListening(this, '${escAttr(q.q)}')">${ic('listen',15)} ${t('listen')}</button>` : ''}
      ${q.audioHint ? `<div class="sub" style="font-size:12px;margin-bottom:6px;">🎧 ${q.audioHint}</div>` : ''}
      <button class="btn btn-ghost tip-btn" style="width:100%;margin:4px 0 8px;background:var(--ios-fill);border-radius:10px;font-size:12px;font-weight:800;padding:8px;" onclick="toggleTip(this)">${ic('tip',14)} ${t('tip')}</button>
      <div class="q-kr">${q.q}</div>
      ${q.qGl ? `<div class="q-gloss">📝 ${esc(q.qGl)}</div>` : ''}
      ${q.section === 'writing'
        ? `<textarea class="q-write" id="write-ans" placeholder="${LANG==='ko'?'여기에 답을 쓰세요…':'Write your answer here…'}">${picked && picked.w ? esc(picked.w) : ''}</textarea>
           <button class="btn btn-primary" style="margin-top:10px;width:100%;" onclick="submitWriting()">${t('submit')}</button>
           <button class="btn btn-teal" style="margin-top:8px;width:100%;" onclick="gradeWriting('daily')">${t('grade_writing')}</button>
           <div id="write-grade"></div>`
        : q.options.map((o, i) => `
          <button class="q-opt ${picked === i ? 'correct' : ''} ${picked !== undefined && picked !== i ? 'disabled' : ''}" ${picked !== undefined ? 'disabled' : ''} onclick="pickDaily(${i})">
            <span style="font-weight:700;">${'①②③④'[i]}</span> ${esc(o.t)}${o.gl ? `<span class="opt-gloss"> · ${esc(o.gl)}</span>` : ''}
          </button>`).join('')}
      <div class="q-explain" id="daily-ex">
        ${picked !== undefined ? explainBlock(q) : ''}
      </div>
      <div class="q-meta" style="margin-top:10px;">${freqBadge(q)}</div>
      ${relatedBlock(q)}
      ${!isAI ? `<button class="btn btn-ghost btn-sm" style="width:100%;margin-top:6px;color:var(--ios-green);" onclick="generateAI()">${ic('spark',14)} ${t('gen_ai')}</button>` : ''}
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost" ${APP.dailyIdx === 0 ? 'disabled style="opacity:.4"' : ''} onclick="navDaily(-1)">${t('prev')}</button>
      <button class="btn btn-primary" style="flex:1;" onclick="navDaily(1)">${APP.dailyIdx >= qs.length - 1 ? t('finish') : t('next')}</button>
    </div>
  `;
}
/* ---------- AI question generation (streaming: 1st question fast, rest in background) ---------- */
async function generateAI(optType) {
  // find the triggering button safely (no reliance on global `event`)
  const btn = document.querySelector('[onclick^="generateAI"]') || null;
  const status = $id('ai-status');
  const SECTIONS = ['reading', 'listening', 'writing'];
  const sec = SECTIONS.includes(optType) ? optType : null;   // section practice call
  const setBtn = (txt, dis) => { if (btn) { btn.disabled = dis; if (txt !== undefined) btn.textContent = txt; } };
  try {
    if (sec) {
      // ---- section practice: fetch 1 question now, start the quiz, generate the other 9 while you solve ----
      setBtn('✨ ' + (LANG === 'ko' ? '첫 문제 생성 중…' : 'Making Q1…'), true);
      if (status) status.textContent = LANG === 'ko' ? '✨ AI가 첫 문제를 만들고 있습니다…' : '✨ AI is writing your first question…';
      const body1 = { level: APP.level, count: 1, section: sec };
      const res1 = await fetch(aiUrl('/generate'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body1) });
      const d1 = await res1.json();
      if (!res1.ok || !d1.questions || !d1.questions.length) throw new Error(d1.error || 'AI server error');
      const q1 = d1.questions[0];
      APP.section = sec;
      APP.sectionQs = [q1];
      APP.sectionIdx = 0;
      APP.sectionAnswers = {};
      APP.sectionDone = false;
      APP.sectionAI = true;
      APP.sectionLoading = true;   // more questions are on the way
      const all = lsGet(LS.section, {});
      all[sec] = { qids: [q1.id], done: {}, ai: true, loading: true };
      lsSet(LS.section, all);
      if (status) status.textContent = '';
      setBtn('✨ ' + (LANG === 'ko' ? '나머지 생성 중…' : 'Making more…'), true);
      go(sec);   // switch to the section tab so the quiz card renders
      // ---- background: fetch the remaining 9 ----
      try {
        const bodyN = { level: APP.level, count: 9, section: sec };
        const resN = await fetch(aiUrl('/generate'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyN) });
        const dN = await resN.json();
        if (!resN.ok || !dN.questions || !dN.questions.length) throw new Error(dN.error || 'AI server error');
        // append only if the user is still on this section quiz
        if (APP.section === sec && !APP.sectionDone) {
          const existing = new Set(APP.sectionQs.map(q => q.id));
          const fresh = dN.questions.filter(q => !existing.has(q.id));
          APP.sectionQs = APP.sectionQs.concat(fresh).slice(0, 10);
          APP.sectionLoading = false;
          const all2 = lsGet(LS.section, {});
          if (all2[sec]) { all2[sec].qids = APP.sectionQs.map(q => q.id); all2[sec].loading = false; }
          lsSet(LS.section, all2);
          toast(LANG === 'ko' ? `✨ 나머지 ${fresh.length}문제가 준비됐어요!` : `✨ ${fresh.length} more questions ready!`);
          render();
        }
      } catch (e2) {
        APP.sectionLoading = false;
        toast(LANG === 'ko' ? '⚠ 나머지 문제 생성 실패 — 1문제로 계속하세요.' : '⚠ Could not make the rest — keep going with Q1.');
      }
      setBtn(undefined, false);
      return;
    }
    // ---- daily / smart-rec: fetch all 10 at once (no quiz in progress yet) ----
    setBtn('✨ Generating… (AI)', true);
    if (status) status.textContent = '✨ AI가 문제를 만들고 있습니다…';
    const body = { level: APP.level, count: 10, section: 'all' };
    if (optType) body.type = optType;   // smart rec: generate the weak type
    const res = await fetch(aiUrl('/generate'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok || !data.questions) throw new Error(data.error || 'AI server error');
    const qs = data.questions;
    if (!qs.length) throw new Error('AI returned no questions');
    // store as today's AI set (full question objects so it survives reload)
    const today = todayStr();
    const all = lsGet(LS.daily, {});
    all[today] = { questions: qs, done: {}, ai: true, aiType: optType || '' };
    lsSet(LS.daily, all);
    APP.daily = qs;
    APP.dailyIdx = 0;
    APP.dailyAnswers = {};
    APP.aiMode = true;
    APP.dailyDone = false;   // fresh set → back to questions
    render();
    if (status) status.textContent = '';
    setBtn(undefined, false);
  } catch (e) {
    if (status) status.textContent = '⚠ ' + e.message;
    toast('AI generation failed: ' + e.message);
    if (btn) { btn.disabled = false; btn.textContent = '✨ Generate with AI'; }
  }
}
function pickDaily(i) {
  const q = APP.daily[APP.dailyIdx];
  if (!q) return;
  const today = todayStr();
  const all = lsGet(LS.daily, {});
  all[today].done[q.id] = i;
  lsSet(LS.daily, all);
  recordResult(q, i === q.correct);
  render();
}
function submitWriting() {
  const q = APP.daily[APP.dailyIdx];
  const ta = $id('write-ans');
  if (!q || !ta) return;
  const today = todayStr();
  const all = lsGet(LS.daily, {});
  all[today].done[q.id] = { w: ta.value };
  lsSet(LS.daily, all);
  render();
}
function navDaily(d) {
  // at last question, moving forward triggers the finish screen
  if (d > 0 && APP.dailyIdx >= APP.daily.length - 1) { finishDaily(); return; }
  APP.dailyIdx = Math.min(APP.daily.length - 1, Math.max(0, APP.dailyIdx + d));
  // reset passage scroll to top
  const scr = $id('screen'); if (scr) scr.querySelector('.q-passage')?.scrollTo(0, 0);
  render();
}
function bindDaily() {}

/* ================= SECTION PRACTICE (Reading / Listening / Writing) ================= */
let _secTimer = null, _secRemain = 0;
const SEC_MINUTES = 10;   // 10 min per 10 questions (fixed pace for all levels)
async function startSection(sec, lv, type) {
  // build a set of 10 for this section + level (fall back to level-agnostic if scarce)
  const target = lv || APP.sectionLevel || myLevel();
  // ---- Vocabulary mode: generate 4-option quizzes straight from VOCAB_BANK ----
  if (type === 'vocab' && window.VOCAB_BANK && window.VOCAB_BANK.length) {
    const bank = window.VOCAB_BANK;
    const lvBand = target <= 2 ? 1 : 2;              // TOPIK I (1-2) vs II (3-6)
    const pool = bank.filter(w => w.l === lvBand);
    const src = (pool.length >= 20 ? pool : bank).slice();
    const shuf = src.sort(() => Math.random() - 0.5);
    const pick = shuf.slice(0, 10);
    const lvName = lvBand === 1 ? 'TOPIK I' : 'TOPIK II';
    const qs = pick.map((w, i) => {
      // distractors: 3 other English meanings from the same band
      const others = (pool.length >= 20 ? pool : bank).filter(x => x.k !== w.k);
      const dist = others.sort(() => Math.random() - 0.5).slice(0, 3);
      const opts = [{ t: w.e, gl: w.k }, ...dist.map(d => ({ t: d.e, gl: d.k }))];
      opts.sort(() => Math.random() - 0.5);
      const correct = opts.findIndex(o => o.t === w.e);
      // 조사 처리 helper (받침 유무)
      const josa = (s, eunNeun) => {
        const code = s.charCodeAt(s.length - 1);
        return ((code - 0xAC00) % 28 !== 0) ? eunNeun[0] : eunNeun[1];
      };
      const optEx = opts.map((o, oi) => {
        const wk = o.gl || '';
        if (oi === correct) {
          return `'${w.k}'은(는) '${w.e}'의 의미를 지닌 어휘입니다. 따라서 ${'①②③④'[oi]}이(가) 정답입니다.`;
        }
        return `${'①②③④'[oi]} '${wk}'은(는) '${o.t}'의 의미로 쓰이는 어휘로, 제시된 단어 '${w.k}'의 의미와 일치하지 않으므로 정답이 될 수 없습니다.`;
      });
      const optExEn = opts.map((o, oi) => {
        if (oi === correct) return `'${w.k}' means '${w.e}', so option ${'①②③④'[oi]} is correct.`;
        return `Option ${'①②③④'[oi]} '${o.gl}' means '${o.t}', which does not match the given word '${w.k}'.`;
      });
      const explain = `'${w.k}'은(는) '${w.e}'의 뜻입니다. TOPIK ${lvBand === 1 ? 'I(초급)' : 'II(중·고급)'} 어휘 목록에 포함된 빈출 어휘로, 문장 속에서의 쓰임까지 함께 익혀 두는 것이 효과적입니다.`;
      return {
        id: 'VOCAB' + (i + 1), section: 'reading', type: 'vocab', level: target, points: 2,
        q: LANG === 'ko' ? '다음 단어의 뜻으로 알맞은 것을 고르십시오.' :
           LANG === 'km' ? 'ជ្រើសរើសអត្ថន័យត្រឹមត្រូវរបស់ពាក្យ។' : 'Choose the correct meaning of the word.',
        passage: w.k, passageGl: lvName + ' · Level ' + target,
        options: opts, correct,
        explain, optExplain: optEx, optExplainEn: optExEn,
        tip: LANG === 'ko' ? `'${w.k}'은(는) ${lvName} 핵심 어휘입니다. 비슷한 의미의 어휘들과 함께 묶어 비교하며 암기하면 기억에 오래 남습니다.` :
             `'${w.k}' is core ${lvName} vocabulary. Grouping it with similar words helps long-term retention.`,
        tipEn: `'${w.k}' is core ${lvName} vocabulary. Grouping it with similar words helps long-term retention.`,
        freq: 5, freqNote: 'TOPIK 어휘 · 빈출 단어장'
      };
    });
    APP.section = sec; APP.sectionLevel = target; APP.sectionType = 'vocab';
    APP.sectionQs = qs; APP.sectionIdx = 0; APP.sectionAnswers = {}; APP.sectionDone = false;
    const all = lsGet(LS.section, {}); all['reading:' + target + ':vocab'] = { qids: qs.map(q => q.id), done: {}, level: target, type: 'vocab' };
    lsSet(LS.section, all);
    go(sec);
    return;
  }
  const byType = (pool) => (type ? pool.filter(q => q.type === type) : pool);
  let pool = byType(allQuestions().filter(q => q.section === sec && q.level === target));
  if (pool.length < 10) pool = byType(allQuestions().filter(q => q.section === sec && levelOf(q) === APP.level));
  if (pool.length < 10) pool = byType(allQuestions().filter(q => q.section === sec));
  const shuf = pool.slice().sort(() => Math.random() - 0.5);
  const localQs = shuf.slice(0, 10);
  // try the daily bank first — fresh AI questions, no repeats (exclude seen ids)
  let qs = null;
  try {
    const seen = Object.keys(lsGet(LS.progress, {})).join(',');
    const r = await fetch(aiUrl('/daily-bank?level=' + target + '&section=' + sec + '&exclude=' + seen), { signal: AbortSignal.timeout(6000) });
    const d = await r.json();
    if (d.questions && d.questions.length >= 5) qs = d.questions.slice(0, 10);
  } catch (e) { /* offline or no bank yet → local fallback */ }
  if (!qs) {
    if (!localQs.length) { toast(LANG === 'ko' ? '이 섹션·레벨 문제가 아직 없어요 — AI 생성 버튼을 눌러보세요.' : 'No questions for this section/level yet — try AI generate.'); return; }
    qs = localQs;
  }
  APP.section = sec;
  APP.sectionLevel = target;
  APP.sectionType = type || null;
  APP.sectionQs = qs;
  APP.sectionIdx = 0;
  APP.sectionAnswers = {};
  APP.sectionDone = false;
  // 10-minute practice timer (reading & listening only — writing has no timer)
  if (_secTimer) { clearInterval(_secTimer); _secTimer = null; }
  if (sec === 'reading' || sec === 'listening') {
    _secRemain = SEC_MINUTES * 60;
    _secTimer = setInterval(() => {
      _secRemain--;
      const el = $id('sec-timer');
      if (el) {
        el.textContent = fmtTime(_secRemain);
        el.style.color = _secRemain < 60 ? 'var(--ios-red)' : 'var(--ios-green)';
      }
      if (_secRemain <= 0) {
        clearInterval(_secTimer); _secTimer = null;
        finishSection();   // auto-submit when time is up
      }
    }, 1000);
  } else {
    _secRemain = 0;
  }
  const all = lsGet(LS.section, {});
  all[sec + ':' + target + ':' + (type || 'all')] = { qids: qs.map(q => q.id), done: {}, level: target, type: type || null };
  lsSet(LS.section, all);
  go(sec);   // switch to the section tab so the quiz card renders
}
function sectionLabel(sec) {
  if (APP.sectionType === 'vocab') return LANG === 'en' ? 'Vocabulary' : LANG === 'km' ? 'វាក្យសព្ទ' : '보케블러리';
  return t('nav_' + sec);
}
function viewSection(sec) {
  const label = sectionLabel(sec);
  const ico = APP.sectionType === 'vocab' ? 'notes' : sec === 'reading' ? 'learn' : sec === 'listening' ? 'listen' : 'mock';
  const col = sec === 'reading' ? 'var(--ios-blue)' : sec === 'listening' ? 'var(--ios-teal)' : 'var(--ios-orange)';
  // in-progress quiz → render the question card
  if (APP.section === sec && APP.sectionQs && !APP.sectionDone) return viewSectionCard();
  if (APP.section === sec && APP.sectionDone) return viewSectionResult();
  const selLv = APP.sectionLevel || myLevel();
  // stats for this section + selected level
  const prog = lsGet(LS.progress, {});
  let tried = 0, corr = 0;
  Object.entries(prog).forEach(([id, p]) => {
    const q = qById(id);
    if (q && q.section === sec && q.level === selLv) { tried += p.total || 0; corr += p.correct || 0; }
  });
  const acc = tried ? Math.round(corr / tried * 100) : null;
  const wrong = lsGet(LS.wrong, []).filter(w => { const q = qById(w.qid); return q && q.section === sec; }).length;
  // per-level question counts
  const lvCounts = [1,2,3,4,5,6].map(lv => allQuestions().filter(q => q.section === sec && q.level === lv).length);
  const lvBtns = [1,2,3,4,5,6].map(lv => `
    <button class="lv-btn ${lv === selLv ? 'active' : ''}" style="--lv-col:${col};" onclick="setSectionLevel(${lv})">
      <b>L${lv}</b><span>${lvCounts[lv-1]}</span>
    </button>`).join('');
  return `
    <div class="sec-h"><h2 style="color:${col};">${ic(ico,18)} ${label}</h2><span class="sub">${t('nav_' + sec)} · TOPIK ${APP.level}</span></div>
    <div class="lv-picker">${lvBtns}</div>
    <div class="app-card big-cta" style="border:1.5px solid ${col};">
      <div class="cta-ico" style="color:${col};">${ic(ico, 44)}</div>
      <h2 style="font-size:21px;margin:8px 0 4px;">${t('sec_practice', { s: label })} <span class="sub">· L${selLv}</span></h2>
      <p class="sub" style="line-height:1.6;">${t('sec_desc', { s: label })}</p>
      <div class="stat-row">
        <div class="stat-box"><b>${acc === null ? '—' : acc + '%'}</b><span>${t('menu_acc')}</span></div>
        <div class="stat-box"><b>${wrong}</b><span>${t('wrong_title')}</span></div>
        <div class="stat-box"><b>${lvCounts[selLv-1] || 10}</b><span>${t('sec_qs')}</span></div>
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:14px;background:${col};box-shadow:0 6px 18px ${col}55;" onclick="startSection('${sec}', ${selLv})">${ic('daily',17)} ${t('sec_start')} · L${selLv}</button>
      <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:8px;color:${col};" onclick="generateAI('${sec}')">${ic('spark',15)} ${t('gen_ai')}</button>
    </div>
    ${wrong ? `<div class="app-card" onclick="go('wrong')" style="cursor:pointer;">
      <div class="row"><div>${ic('notes',20)} <b>${t('wrong_title')} (${wrong})</b></div><span style="color:var(--ios-green);">→</span></div>
    </div>` : ''}`;
}
function setSectionLevel(lv) {
  APP.sectionLevel = lv;
  render();
}
/* ---------- My level (default practice level, set in My tab) ---------- */
function myLevel() {
  const v = parseInt(localStorage.getItem(LS.mylevel), 10);
  return (v >= 1 && v <= 6) ? v : 3;
}
function setMyLevel(n) {
  localStorage.setItem(LS.mylevel, String(n));
  toast(LANG === 'ko' ? `나의 레벨: L${n}` : LANG === 'km' ? `កម្រិតរបស់ខ្ញុំ: L${n}` : `My level: L${n}`);
  render();
}
function viewSectionCard() {
  const sec = APP.section;
  const qs = APP.sectionQs;
  const q = qs[APP.sectionIdx];
  const done = APP.sectionAnswers || {};
  const doneCount = Object.keys(done).length;
  const pct = qs.length ? Math.round(doneCount / qs.length * 100) : 0;
  if (!q) return viewSectionResult();
  const picked = done[q.id];
  const label = sectionLabel(sec);
  return `
    <div class="app-card">
      <div class="row"><span class="q-num">Q${APP.sectionIdx + 1} / ${qs.length} · ${label.toUpperCase()}</span>
      <span class="q-type">${q.section === 'reading' ? t('sec_reading') : q.section === 'listening' ? t('sec_listening') : t('sec_writing')}</span>
      ${(sec === 'reading' || sec === 'listening') ? `<span id="sec-timer" class="mock-timer" style="font-weight:800;color:${_secRemain < 60 ? 'var(--ios-red)' : 'var(--ios-green)'};font-size:14px;">⏱ ${fmtTime(_secRemain)}</span>` : ''}</div>
      <div class="daily-progress"><div style="width:${pct}%"></div></div>
      ${APP.sectionLoading ? `<div style="margin:6px 0;display:flex;align-items:center;gap:6px;font-size:12px;color:var(--ios-blue);font-weight:700;">${ic('spark',13)} ${LANG==='ko'?'AI가 나머지 문제를 만들고 있어요…':'AI is making more questions…'}<span class="sub"> (${qs.length}/10)</span></div>` : ''}
      ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ''}
      ${q.passageGl ? `<div class="passage-gloss">📖 ${esc(q.passageGl)}</div>` : ''}
      ${q.section === 'listening' ? `<button class="btn btn-primary btn-sm" style="margin:4px 0 8px;width:100%;" onclick="playListening(this, '${escAttr(q.q)}')">${ic('listen',15)} ${t('listen')}</button>` : ''}
      ${q.audioHint ? `<div class="sub" style="font-size:12px;margin-bottom:6px;">🎧 ${q.audioHint}</div>` : ''}
      <button class="btn btn-ghost tip-btn" style="width:100%;margin:4px 0 8px;background:var(--ios-fill);border-radius:10px;font-size:12px;font-weight:800;padding:8px;" onclick="toggleTip(this)">${ic('tip',14)} ${t('tip')}</button>
      <div class="q-kr">${q.q}</div>
      ${q.qGl ? `<div class="q-gloss">📝 ${esc(q.qGl)}</div>` : ''}
      ${q.section === 'writing'
        ? `<textarea class="q-write" id="write-ans" placeholder="${LANG==='ko'?'여기에 답을 쓰세요…':'Write your answer here…'}">${picked && picked.w ? esc(picked.w) : ''}</textarea>
           <button class="btn btn-primary" style="margin-top:10px;width:100%;" onclick="submitSectionWriting()">${t('submit')}</button>
           <button class="btn btn-teal" style="margin-top:8px;width:100%;" onclick="gradeWriting('daily')">${t('grade_writing')}</button>
           <div id="write-grade"></div>`
        : q.options.map((o, i) => `
          <button class="q-opt ${picked === i ? 'correct' : ''} ${picked !== undefined && picked !== i ? 'disabled' : ''}" ${picked !== undefined ? 'disabled' : ''} onclick="pickSection(${i})">
            <span style="font-weight:700;">${'①②③④'[i]}</span> ${esc(o.t)}${o.gl ? `<span class="opt-gloss"> · ${esc(o.gl)}</span>` : ''}
          </button>`).join('')}
      <div class="q-explain" id="daily-ex">
        ${picked !== undefined ? explainBlock(q) : ''}
      </div>
      <div class="q-meta" style="margin-top:10px;">${freqBadge(q)}</div>
      ${relatedBlock(q)}
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost" ${APP.sectionIdx === 0 ? 'disabled style="opacity:.4"' : ''} onclick="navSection(-1)">${t('prev')}</button>
      <button class="btn btn-primary" style="flex:1;" onclick="navSection(1)">${APP.sectionIdx >= qs.length - 1 ? t('finish') : t('next')}</button>
    </div>
  `;
}
function pickSection(i) {
  const q = APP.sectionQs[APP.sectionIdx];
  if (!q) return;
  APP.sectionAnswers[q.id] = i;
  recordResult(q, i === q.correct);
  const all = lsGet(LS.section, {});
  if (all[APP.section]) all[APP.section].done[q.id] = i;
  lsSet(LS.section, all);
  render();
}
function submitSectionWriting() {
  const q = APP.sectionQs[APP.sectionIdx];
  const ta = $id('write-ans');
  if (!q || !ta) return;
  APP.sectionAnswers[q.id] = { w: ta.value };
  recordResult(q, true);
  const all = lsGet(LS.section, {});
  if (all[APP.section]) all[APP.section].done[q.id] = { w: ta.value };
  lsSet(LS.section, all);
  render();
}
function navSection(d) {
  if (APP.sectionLoading && d > 0 && APP.sectionIdx >= APP.sectionQs.length - 1) {
    toast(LANG === 'ko' ? '✨ 나머지 문제를 생성하고 있어요 — 잠시만요!' : '✨ Making more questions — one sec!');
    return;
  }
  if (d > 0 && APP.sectionIdx >= APP.sectionQs.length - 1) { finishSection(); return; }
  APP.sectionIdx = Math.min(APP.sectionQs.length - 1, Math.max(0, APP.sectionIdx + d));
  // reset passage scroll to top
  const scr = $id('screen'); if (scr) scr.querySelector('.q-passage')?.scrollTo(0, 0);
  render();
}
function finishSection() {
  if (APP.sectionLoading) {
    toast(LANG === 'ko' ? '✨ 나머지 문제를 생성하고 있어요 — 잠시만요!' : '✨ Making more questions — one sec!');
    return;
  }
  if (_secTimer) { clearInterval(_secTimer); _secTimer = null; }
  const qs = APP.sectionQs;
  const done = APP.sectionAnswers || {};
  let correct = 0, wrong = 0, unanswered = 0;
  qs.forEach(q => {
    const ans = done[q.id];
    if (ans === undefined) { unanswered++; return; }
    if (q.section === 'writing') { correct++; return; }
    if (ans === q.correct) correct++; else wrong++;
  });
  APP.sectionDone = true;
  APP.sectionResult = { correct, wrong, unanswered, total: qs.length };
  addXP(XP_RULES.daily_finish, 'section_finish');
  render();
}
function viewSectionResult() {
  const r = APP.sectionResult;
  const label = sectionLabel(APP.section);
  if (!r) return `<div class="app-card"><p class="sub">${label}</p></div>`;
  const pct = r.total ? Math.round((r.correct + r.wrong ? r.correct / (r.correct + r.wrong) : 0) * 100) : 0;
  return `
    <div class="app-card elevated big-cta">
      <div class="cta-ico" style="color:var(--ios-green);">${ic('trophy', 42)}</div>
      <h2 style="font-size:22px;margin:6px 0;">${label} ${t('result_done')}</h2>
      <div class="stat-row">
        <div class="stat-box"><b>${r.correct}/${r.total}</b><span>${t('chal_correct')}</span></div>
        <div class="stat-box"><b>${pct}%</b><span>${t('menu_acc')}</span></div>
        <div class="stat-box"><b>${r.wrong}</b><span>${t('wrong_title')}</span></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:14px;">
        <button class="btn btn-ghost" style="flex:1;border:1.5px solid var(--ios-separator);" onclick="exitSection()">← ${t('nav_home')}</button>
        <button class="btn btn-primary" style="flex:1;" onclick="startSection('${APP.section}', myLevel(), ${APP.sectionType ? `'${APP.sectionType}'` : 'null'})">${t('chal_again')}</button>
      </div>
    </div>`;
}
function exitSection() {
  if (_secTimer) { clearInterval(_secTimer); _secTimer = null; }
  APP.section = null; APP.sectionQs = null; APP.sectionDone = false; APP.sectionResult = null; APP.sectionType = null; APP.sectionLoading = false;
  APP.navStack = [];
  go('home', true);
}
function bindMy() {}

/* ================= MY (profile & hub) ================= */
function viewMy() {
  const authed = isAuthed();
  const u = currentUser();
  const streak = lsGet(LS.streak, { count: 0 });
  const acc = (() => { try { return accuracyStats().overall; } catch (e) { return 0; } })();
  const due = (() => { try { return dueCards().length; } catch (e) { return 0; } })();
  const lvl = xpProgress();
  const wrongN = lsGet(LS.wrong, []).length;
  const scores = lsGet(LS.scores, []);
  const best = scores.length ? Math.max(...scores.map(s => s.score)) : 0;
  const head = authed ? `
    <div class="um-head">
      <span class="um-avatar" style="overflow:hidden;background:var(--ios-fill);"><img src="${myChar().img}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onclick="openCharPicker&&openCharPicker()"></span>
      <div class="um-id">
        <b>${esc(myCharName())}</b>
        <span class="sub">${esc(u.email || t('menu_signed_in'))}</span>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-left:auto;" onclick="doLogout()">${t('menu_logout')}</button>
    </div>` : `
    <div class="um-head">
      <span class="um-avatar" style="overflow:hidden;background:var(--ios-fill);"><img src="${myChar().img}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onclick="openCharPicker&&openCharPicker()"></span>
      <div class="um-id">
        <b>${esc(myCharName())}</b>
        <span class="sub">${LANG === 'ko' ? '게스트로 사용 중' : LANG === 'km' ? 'កំពុងប្រើជាភ្ញៀវ' : 'Using as guest'}</span>
      </div>
      <a class="btn btn-primary btn-sm" style="margin-left:auto;" href="login.html">${t('menu_login')}</a>
    </div>`;
  const stats = `
    <div class="um-stats">
      <div class="stat-box"><b>${streak.count}</b><span style="color:var(--ios-orange);">${ic('flame',12)} ${t('menu_streak')}</span></div>
      <div class="stat-box"><b>${acc}%</b><span style="color:var(--ios-blue);">${ic('chart',12)} ${t('menu_acc')}</span></div>
      <div class="stat-box"><b>L${lvl.lv}</b><span style="color:var(--ios-green);">${lvl.xp} XP</span></div>
    </div>`;
  const rows = `
    <div class="app-card" style="padding:6px 14px;">
      ${umRow('progress', t('menu_progress'), `go('progress')`)}
      ${umRow('notes', t('wrong_link') + ' (' + wrongN + ')', `go('wrong')`)}
      ${umRow('learn', t('flash_title') + (due ? ` · ${due}` : ''), `go('learn')`)}
      ${umRow('schedule', t('menu_schedule'), `go('schedule')`)}
    </div>
    <div class="app-card" style="padding:6px 14px;">
      ${umRow('target', t('xp_level') + ' ' + lvl.lv + ' · ' + t('xp_to_next', { n: lvl.maxed ? 0 : lvl.need - lvl.into, l: lvl.lv + 1 }), `go('progress')`)}
      ${umRow('trophy', t('menu_best', { s: best || '—' }), `go('progress')`)}
    </div>`;
  const settings = `
    <div class="sec-h"><h2>${t('my_level')}</h2></div>
    <div class="app-card" style="padding:12px 14px;">
      <div class="row"><b style="font-size:13px;">${t('my_level')}</b><span class="sub">L${myLevel()}</span></div>
      <p class="sub" style="font-size:11.5px;margin:2px 0 8px;">${t('my_level_sub')}</p>
      <div class="lv-picker" style="grid-template-columns:repeat(6,1fr);margin:0;">
        ${[1,2,3,4,5,6].map(n => `<button class="lv-btn ${n === myLevel() ? 'active' : ''}" style="--lv-col:var(--ios-blue);" onclick="setMyLevel(${n})"><b>L${n}</b></button>`).join('')}
      </div>
    </div>
    <div class="sec-h"><h2>${t('menu_theme')} / ${t('menu_lang')}</h2></div>
    <div class="app-card" style="padding:6px 14px;">
      <div class="um-item" onclick="cycleTheme();render()">${ic('learn',19)}<span>${t('menu_theme')}</span><em>${THEME_ICONS[THEME] || '🌗'}</em></div>
      <div class="um-item">
        ${ic('learn',19)}<span>${t('menu_lang')}</span>
        <select class="um-select" onchange="setLang(this.value)">
          <option value="en" ${LANG === 'en' ? 'selected' : ''}>English</option>
          <option value="ko" ${LANG === 'ko' ? 'selected' : ''}>한국어</option>
          <option value="km" ${LANG === 'km' ? 'selected' : ''}>ខ្មែរ</option>
        </select>
      </div>
      ${authed ? `<div class="um-item" onclick="syncUserData(this)">${ic('daily',19)}<span id="um-sync">${t('menu_sync')}</span><em>⇅</em></div>` : ''}
    </div>`;
  return `
    <div class="sec-h"><h2>${t('menu_account')}</h2></div>
    <div class="app-card" style="padding:14px 16px;">${head}${stats}</div>
    ${rows}
    ${settings}
  `;
}
function renameChar() {
  openCharPicker();
  const inp = $id('cp-name-input');
  if (inp) { inp.focus(); inp.select(); }
}
function umRow(ico, label, act) {
  return `<div class="um-item" onclick="${act}">${ic(ico, 19)}<span>${label}</span><em>→</em></div>`;
}

/* ---------- Daily finish → estimated TOPIK score ---------- */
function finishDaily() {
  const today = todayStr();
  const saved = lsGet(LS.daily, {})[today] || {};
  const done = saved.done || {};
  const qs = APP.daily;
  let correct = 0, wrong = 0, unanswered = 0;
  qs.forEach(q => {
    const ans = done[q.id];
    if (ans === undefined) { unanswered++; return; }
    if (q.section === 'writing') { correct++; return; }        // submitted writing counts as attempted
    if (ans === q.correct) correct++; else wrong++;
  });
  APP.dailyResult = { correct, wrong, unanswered, total: qs.length };
  APP.dailyDone = true;
  // XP: daily set finished +50 · (daily quest already bumped per answer)
  addXP(XP_RULES.daily_finish, 'daily_finish');
  // persist score record for the progress page
  try {
    const est = estimatedScore();
    const scores = lsGet(LS.scores, []);
    const rec = {
      date: today, level: APP.level, score: est.score, maxScore: est.maxScore,
      pct: Math.round(est.pct * 100), passI: est.passI, passII: est.passII,
      correct, wrong, unanswered, total: qs.length
    };
    const idx = scores.findIndex(s => s.date === today);
    if (idx >= 0) scores[idx] = rec; else scores.push(rec);
    scores.sort((a, b) => a.date < b.date ? -1 : 1);
    lsSet(LS.scores, scores.slice(-30));
  } catch (e) { /* non-fatal */ }
  render();
}

function estimatedScore() {
  const r = APP.dailyResult || { correct: 0, wrong: 0, unanswered: 0, total: 1 };
  const total = r.correct + r.wrong;
  if (total === 0) return { score: 0, pct: 0, level: '—', next: '—', passI: 0, passII: 0, passLabel: '' };
  const maxScore = APP.level === 'I' ? 200 : 300;
  const pct = r.correct / total;
  const score = Math.round(pct * maxScore);
  let level, next;
  if (APP.level === 'I') {
    if (score >= 140) { level = 'TOPIK I · Level 2'; next = 'Level 3 is next!'; }
    else if (score >= 80) { level = 'TOPIK I · Level 1'; next = 'Need 140+ for Level 2'; }
    else { level = 'Below Level 1'; next = 'Keep practicing!'; }
  } else {
    if (score >= 230) { level = 'TOPIK II · Level 6'; next = 'Amazing!'; }
    else if (score >= 190) { level = 'TOPIK II · Level 5'; next = 'So close to 6!'; }
    else if (score >= 150) { level = 'TOPIK II · Level 4'; next = 'Aim for 190+ → Level 5'; }
    else if (score >= 120) { level = 'TOPIK II · Level 3'; next = 'Your goal! Keep going → 150'; }
    else { level = 'Below Level 3'; next = 'Need 120+ for Level 3'; }
  }
  // 합격 확률: 정답률을 합격 커트라인에 선형 매핑 (10문항 샘플 보정)
  let passI = 0, passII = 0, passLabel = '';
  if (APP.level === 'I') {
    passI = clampPct(pct * 100);
    passII = clampPct(((pct - 140 / 200) / (1 - 140 / 200)) * 100);
    passLabel = 'TOPIK I 합격확률';
  } else {
    passII = clampPct(pct * 100);
    passI = clampPct(((pct - 120 / 300) / (1 - 120 / 300)) * 100);
    passLabel = 'TOPIK II 합격확률';
  }
  return { score, pct, level, next, maxScore, passI, passII, passLabel };
}
function clampPct(v) { return Math.max(0, Math.min(100, Math.round(v))); }

function viewDailyResult() {
  const r = APP.dailyResult || { correct: 0, wrong: 0, unanswered: 0, total: 1 };
  const est = estimatedScore();
  // 상단 요약: 예상 점수 + 합격 확률
  const passTarget = APP.level === 'I' ? 'TOPIK I (L1+)' : 'TOPIK II (L3+)';
  return `
    <div class="app-card big-cta">
      <div class="cta-ico" style="color:var(--ios-blue);">${ic('trophy', 42)}</div>
      <h2 style="font-size:22px;color:var(--ios-label);margin-bottom:6px;">${t('result_done')}</h2>
      <p class="sub">${t('result_answered', { a: r.correct + r.wrong, n: r.total })}</p>
      <div style="margin:18px 0;">
        <div style="font-size:15px;color:var(--ios-secondary-label);">${t('result_my_score')}</div>
        <div style="font-size:52px;font-weight:800;color:var(--ios-blue);">${est.score}<span style="font-size:20px;color:var(--ios-secondary-label);"> / ${est.maxScore}</span></div>
        <div class="mock-badge ${APP.level === 'I' ? 't1' : 't2'}" style="margin-top:8px;">${est.level}</div>
        <div class="sub" style="margin-top:6px;">${est.next}</div>
        <!-- 합격 확률 -->
        <div style="margin-top:16px;padding:12px;background:#f0f3fa;border-radius:12px;">
          <div style="font-size:13px;color:var(--ios-secondary-label);margin-bottom:6px;">${t('result_pass')} · ${passTarget}</div>
          <div style="font-size:30px;font-weight:800;color:var(--ios-green);">${APP.level === 'I' ? est.passI : est.passII}%</div>
          <div style="font-size:12px;color:var(--ios-secondary-label);margin-top:4px;">${t('result_switch', { x: APP.level === 'I' ? 'II' : 'I', p: APP.level === 'I' ? est.passII : est.passI })}</div>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat-box"><b style="color:var(--ios-green);">${r.correct}</b><span>${t('result_correct')}</span></div>
        <div class="stat-box"><b style="color:var(--ios-red);">${r.wrong}</b><span>${t('result_wrong')}</span></div>
        <div class="stat-box"><b>${r.unanswered}</b><span>${t('result_unanswered')}</span></div>
      </div>
      <p class="sub" style="font-size:11.5px;">${t('result_note')}</p>
    </div>
    <div class="app-card">
      <h3>${t('result_continue')}</h3>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
        <button class="btn btn-teal" onclick="continueAfterFinish()">${t('result_new')}</button>
        <button class="btn btn-primary" onclick="go('mock')">${t('result_mock')}</button>
        <button class="btn btn-ghost" onclick="go('wrong')">${t('result_notes')}</button>
        <button class="btn btn-ghost" onclick="APP.dailyDone=false; APP.dailyIdx=0; go('home')">${t('result_done_today')}</button>
      </div>
    </div>
  `;
}
function continueAfterFinish() {
  APP.dailyDone = false;
  APP.dailyIdx = 0;
  render();
  generateAI();
}

/* ---------- shared result recording ---------- */
/* 유형/난이도 라벨 (한국어 표기) */
const TYPE_LABELS = {
  grammar: '문법', vocab: '어휘', main_idea: '중심내용', order: '순서',
  sentence_pos: '문장위치', reply: '대답고르기', place: '장소', topic: '주제',
  intent: '의도', detail: '세부사항', flow: '흐름', synonym: '동의어',
  notice: '안내문', comprehension: '내용이해', long: '장문',
  blank_fill: '빈칸채우기', same_content: '내용일치', headline_desc: '제목이해',
  insert_sentence: '문장넣기', attitude: '글쓴이태도', purpose: '글의목적',
  writing_short: '쓰기·단답', writing_letter: '쓰기·편지'
};
const TYPE_LABELS_EN = {
  grammar: 'Grammar', vocab: 'Vocabulary', main_idea: 'Main idea', order: 'Order',
  sentence_pos: 'Sentence position', reply: 'Reply', place: 'Place', topic: 'Topic',
  intent: 'Intent', detail: 'Detail', flow: 'Flow', synonym: 'Synonym',
  notice: 'Notice', comprehension: 'Comprehension', long: 'Long passage',
  blank_fill: 'Fill in blank', same_content: 'Content match', headline_desc: 'Headline',
  insert_sentence: 'Insert sentence', attitude: "Writer's attitude", purpose: 'Purpose',
  writing_short: 'Writing · short', writing_letter: 'Writing · letter'
};
function typeLabel(t) {
  const map = LANG === 'en' ? TYPE_LABELS_EN : TYPE_LABELS;
  return map[t] || t;
}

/* ---------- Smart recommendation card (weakest type → AI practice) ---------- */
function smartRecCard(acc) {
  // find weakest type with >=2 attempts (stable signal)
  const weak = (acc.byType || []).filter(r => r.n >= 2 && r.p < 70)[0];
  if (!weak) {
    return `<div class="app-card filled smart-card">
      <div class="row">
        <div style="color:var(--ios-blue);margin-right:10px;">${ic('spark', 24)}</div>
        <div><b style="font-size:14px;color:var(--ios-blue);">${t('smart_title')}</b>
        <div class="sub" style="font-size:12.5px;margin-top:3px;">${t('smart_empty')}</div></div>
      </div></div>`;
  }
  const label = typeLabel(weak.k);
  const icoName = { grammar:'mock', vocab:'notes', main_idea:'tip', order:'progress', sentence_pos:'target', topic:'listen', place:'schedule', intent:'target', comprehension:'notes', writing_short:'mock', writing_letter:'mock',
    blank_fill:'edit', same_content:'notes', headline_desc:'chart', insert_sentence:'progress', attitude:'tip', purpose:'target' }[weak.k] || 'target';
  const icoColor = { grammar:'var(--ios-red)', vocab:'var(--ios-green)', main_idea:'var(--ios-blue)', order:'var(--ios-orange)', sentence_pos:'var(--ios-blue)', topic:'var(--ios-teal)', place:'var(--ios-orange)', intent:'var(--ios-red)', comprehension:'var(--ios-blue)', writing_short:'var(--ios-green)', writing_letter:'var(--ios-green)',
    blank_fill:'var(--ios-teal)', same_content:'var(--ios-blue)', headline_desc:'var(--ios-orange)', insert_sentence:'var(--ios-purple)', attitude:'var(--ios-pink)', purpose:'var(--ios-blue)' }[weak.k] || 'var(--ios-blue)';
  return `<div class="app-card smart-card" style="border:1.5px solid var(--ios-blue);">
    <div class="row">
      <div style="color:${icoColor};margin-right:10px;">${ic(icoName, 24)}</div>
      <div><b style="font-size:14px;color:var(--ios-label);">${t('smart_weak', { t: label })}</b>
      <div class="sub" style="font-size:12.5px;margin-top:3px;">${t('smart_weak_pct', { p: weak.p, c: weak.c, n: weak.n })}</div></div>
    </div>
    <button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="generateAI('${escAttr(weak.k)}')">${ic('spark',15)} ${t('smart_btn', { t: label })}</button>
    <button class="btn btn-ghost btn-sm" style="width:100%;margin-top:6px;color:var(--ios-orange);border:1.5px solid var(--ios-orange);border-radius:10px;" onclick="startChallenge('${escAttr(weak.k)}')">${t('chal_start')}</button>
  </div>`;
}

/* 유형별·난이도별 평균 정답률 계산 (progress 기반) */
function accuracyStats() {
  const prog = lsGet(LS.progress, {});
  const byType = {}, byLevel = {};
  allQuestions().forEach(q => {
    const p = prog[q.id];
    if (!p || !p.total) return;
    const t = q.type || q.section;
    byType[t] = byType[t] || { c: 0, n: 0 };
    byType[t].c += p.correct; byType[t].n += p.total;
    const lv = q.level || 1;
    byLevel[lv] = byLevel[lv] || { c: 0, n: 0 };
    byLevel[lv].c += p.correct; byLevel[lv].n += p.total;
  });
  const pct = s => s ? Math.round(s.c / s.n * 100) : 0;
  const rows = obj => Object.entries(obj)
    .map(([k, s]) => ({ k, ...s, p: pct(s) }))
    .sort((a, b) => a.p - b.p);            // 취약한 것부터
  return {
    byType: rows(byType),
    byLevel: rows(byLevel).sort((a, b) => a.k - b.k),
    overall: (() => {
      let c = 0, n = 0;
      Object.values(byType).forEach(s => { c += s.c; n += s.n; });
      return n ? Math.round(c / n * 100) : 0;
    })()
  };
}

/* 정답률 바 렌더 헬퍼 */
function toggleTip(btn) {
  const card = btn.closest('.app-card');
  if (!card) return;
  const on = card.classList.toggle('tip-on');
  btn.innerHTML = (on ? ic('tip', 15) + ' ' + t('tip_hide') : ic('tip', 15) + ' ' + t('tip'));
}

/* ---------- Passage language toggle (지문 ↔ English) ---------- */
function togglePassage(btn) {
  const card = btn.closest('.app-card') || btn.parentElement;
  const kr = card.querySelector('.q-passage');
  const en = card.querySelector('.passage-gloss');
  if (!kr || !en) return;
  const showEn = kr.style.display !== 'none';
  kr.style.display = showEn ? 'none' : '';
  en.style.display = showEn ? 'block' : 'none';
  en.style.color = showEn ? 'var(--ios-label)' : 'var(--ios-secondary-label)';
  btn.innerHTML = (showEn ? ic('tip', 13) + ' ' + t('passage_ko') : ic('tip', 13) + ' ' + t('passage_en'));
}

/* ---------- Related questions (same type/level, past-exam pattern) ---------- */
function relatedQuestions(q, limit) {
  const seen = {};
  const pool = allQuestions().slice();
  (APP.daily || []).forEach(x => { if (!seen[x.id]) { seen[x.id] = 1; pool.push(x); } });
  // 1) same type + similar level
  let out = pool.filter(x => x.id !== q.id && x.type === q.type && Math.abs((x.level || 0) - (q.level || 0)) <= 1);
  // 2) same type any level
  if (out.length < limit) {
    const more = pool.filter(x => x.id !== q.id && !out.some(o => o.id === x.id) && x.type === q.type)
      .slice(0, limit - out.length);
    out = out.concat(more);
  }
  // 3) same section
  if (out.length < limit) {
    const more = pool.filter(x => x.id !== q.id && !out.some(o => o.id === x.id) && x.section === q.section)
      .slice(0, limit - out.length);
    out = out.concat(more);
  }
  return out.slice(0, limit);
}
function relatedBlock(q) {
  const rel = relatedQuestions(q, 3);
  if (!rel.length) return '';
  return `<button class="btn btn-ghost btn-sm" style="width:100%;margin-top:8px;color:var(--ios-blue);" onclick="toggleRelated(this)">${ic('notes',14)} ${t('related_q')}</button>
    <div class="related-list" style="display:none;margin-top:8px;">
      ${rel.map((r, i) => `
        <div class="related-item" style="background:var(--ios-fill);border-radius:10px;padding:10px;margin-bottom:8px;color:var(--ios-label);">
          <div style="font-size:10.5px;font-weight:700;color:var(--ios-secondary-label);margin-bottom:4px;">${t('related_q')} ${i + 1} · ${typeLabel(r.type)} · L${r.level}</div>
          ${r.passage ? `<div class="related-passage" style="font-size:12.5px;line-height:1.55;background:var(--ios-card);border-left:2.5px solid var(--ios-blue-2);border-radius:8px;padding:8px 10px;margin-bottom:6px;color:var(--ios-label);">${r.passage}</div>` : ''}
          ${r.passageGl ? `<div class="passage-gloss" style="font-size:11.5px;">📖 ${esc(r.passageGl)}</div>` : ''}
          <div style="font-size:13.5px;line-height:1.5;color:var(--ios-label);">${esc(r.q)}</div>
          ${r.qGl ? `<div class="q-gloss" style="font-size:11.5px;margin-top:3px;">📝 ${esc(r.qGl)}</div>` : ''}
          ${r.options && r.options.length ? `<div style="margin-top:6px;">${r.options.map((o, oi) => `
            <div class="rel-opt" data-ok="${oi === r.correct ? '1' : '0'}" style="font-size:12.5px;line-height:1.5;padding:3px 0;color:var(--ios-label);">${'①②③④'[oi]} ${esc(o.t)}${o.gl ? `<span class="opt-gloss"> · ${esc(o.gl)}</span>` : ''}</div>`).join('')}</div>` : ''}
          <button class="btn btn-ghost btn-sm" style="margin-top:6px;color:var(--ios-green);" onclick="toggleRelAns(this)">${t('related_show_ans')}</button>
          <div class="rel-ans" style="display:none;margin-top:6px;font-size:12.5px;color:var(--ios-label);">
            <b>✓ ${r.correct !== undefined ? '①②③④'[r.correct] : ''}</b> — ${esc((LANG === 'en' && r.optExplainEn) ? r.optExplainEn[r.correct] : (r.explain || ''))}
            ${r.options && r.options[r.correct] ? `<div style="margin-top:2px;">${esc(r.options[r.correct].t)}${r.options[r.correct].gl ? ' · ' + esc(r.options[r.correct].gl) : ''}</div>` : ''}
          </div>
        </div>`).join('')}
    </div>`;
}
function toggleRelated(btn) {
  const card = btn.parentElement;
  const list = card.querySelector('.related-list');
  if (!list) return;
  const open = list.style.display !== 'none';
  list.style.display = open ? 'none' : 'block';
  btn.innerHTML = (open ? ic('notes',14) + ' ' + t('related_q') : ic('notes',14) + ' ' + t('related_hide'));
}
function toggleRelAns(btn) {
  const item = btn.parentElement;
  const ans = item.querySelector('.rel-ans');
  if (!ans) return;
  const open = ans.style.display !== 'none';
  ans.style.display = open ? 'none' : 'block';
  btn.textContent = open ? t('related_show_ans') : t('related_hide_ans');
  // highlight the correct option (green) when the answer is shown
  item.querySelectorAll('.rel-opt').forEach(o => {
    if (o.dataset.ok === '1') {
      o.style.color = 'var(--ios-green)';
      o.style.fontWeight = '700';
    }
  });
}
function accBar(label, p, sub) {
  const color = p >= 70 ? 'var(--ios-green)' : p >= 40 ? 'var(--ios-orange)' : 'var(--ios-red)';
  return `
    <div style="padding:7px 0;border-bottom:1px solid var(--border);">
      <div class="row"><span style="font-size:13px;">${esc(label)}</span>
        <b style="font-size:13px;color:${color};">${p}%</b></div>
      <div class="daily-progress" style="margin:4px 0 0;height:6px;">
        <div style="width:${p}%;background:${color};"></div>
      </div>
      ${sub ? `<div class="sub" style="font-size:10.5px;margin-top:2px;">${sub}</div>` : ''}
    </div>`;
}
/* ================= XP / LEVELS / DAILY QUESTS ================= */
// level thresholds: L1→L2→L3→L4→L5→L6 (TOPIK ladder)
const XP_LEVELS = [
  { lv: 1, need: 0 }, { lv: 2, need: 200 }, { lv: 3, need: 500 },
  { lv: 4, need: 900 }, { lv: 5, need: 1500 }, { lv: 6, need: 2500 }
];
const XP_RULES = { correct: 10, wrong: 3, daily_finish: 50, mock_finish: 100, flash: 5 };
function xpTotal() { return (lsGet(LS.xp, {})).total || 0; }
function xpLevel(xp) {
  let lv = 1;
  for (const l of XP_LEVELS) if (xp >= l.need) lv = l.lv;
  return lv;
}
function xpProgress() {
  const xp = xpTotal();
  const lv = xpLevel(xp);
  const cur = XP_LEVELS[lv - 1];
  const next = XP_LEVELS[lv] || null;
  if (!next) return { lv, xp, into: 1, need: 1, pct: 100, maxed: true };
  const into = xp - cur.need;
  const need = next.need - cur.need;
  return { lv, xp, into, need, pct: Math.min(100, Math.round(into / need * 100)), maxed: false };
}
function addXP(n, why) {
  const st = lsGet(LS.xp, { total: 0 });
  const before = xpLevel(st.total || 0);
  st.total = (st.total || 0) + n;
  lsSet(LS.xp, st);
  const after = xpLevel(st.total);
  if (after > before) {
    // level up! celebrate
    toast(t('xp_levelup', { l: after }));
    try { if (navigator.vibrate) navigator.vibrate([60, 40, 60]); } catch (e) {}
  }
  return after;
}
/* ---- daily quests ---- */
function questDefaults() {
  return { date: todayStr(), daily: { n: 0, target: 10 }, flash: { n: 0, target: 3 }, mock: { n: 0, target: 1 } };
}
function questState() {
  const q = lsGet(LS.quests, null);
  const today = todayStr();
  if (!q || q.date !== today) {
    const fresh = questDefaults();
    lsSet(LS.quests, fresh);
    return fresh;
  }
  return q;
}
function bumpQuest(key, step = 1) {
  const q = questState();
  if (!q[key]) return;
  q[key].n = Math.min(q[key].target, q[key].n + step);
  const justDone = q[key].n === q[key].target && q[key].n - step < q[key].target;
  lsSet(LS.quests, q);
  if (justDone) {
    const bonus = key === 'mock' ? 100 : key === 'flash' ? 30 : 50;
    toast(t('quest_done') + ' ' + t('xp_reward', { n: bonus }));
    addXP(bonus, 'quest:' + key);
  }
  return q;
}
function questDoneCount() {
  const q = questState();
  return ['daily', 'flash', 'mock'].filter(k => q[k] && q[k].n >= q[k].target).length;
}
function questHTML() {
  const q = questState();
  const mk = (k, label, reward) => {
    const done = q[k].n >= q[k].target;
    return `<div class="quest-item ${done ? 'done' : ''}">
      <span class="quest-ico">${done ? '✓' : (k === 'daily' ? '📅' : k === 'flash' ? '🔁' : '📝')}</span>
      <div class="quest-main">
        <div class="quest-label">${label}</div>
        <div class="daily-progress" style="height:5px;margin:4px 0 0;"><div style="width:${Math.round(q[k].n / q[k].target * 100)}%;background:${done ? 'var(--ios-green)' : 'var(--ios-blue)'};"></div></div>
      </div>
      <span class="quest-xp">${done ? t('quest_done') : t('xp_reward', { n: reward })}</span>
    </div>`;
  };
  return `<div class="app-card quest-card">
    <div class="row" style="margin-bottom:6px;"><b style="font-size:14px;color:var(--ios-label);">${ic('target',16)} ${t('quest_title')}</b>
    <span class="sub">${questDoneCount()}/3</span></div>
    ${mk('daily', t('quest_daily', { n: q.daily.n, t: q.daily.target }), 50)}
    ${mk('flash', t('quest_flash', { n: q.flash.n, t: q.flash.target }), 30)}
    ${mk('mock', t('quest_mock', { n: q.mock.n, t: q.mock.target }), 100)}
  </div>`;
}
function levelBadgeHTML(size = 40) {
  const p = xpProgress();
  return `<div class="lvl-badge" style="width:${size}px;height:${size}px;">
    <b>L${p.lv}</b>
    <svg viewBox="0 0 40 40" width="${size}" height="${size}">
      <circle cx="20" cy="20" r="17" fill="none" stroke="var(--ios-fill)" stroke-width="3"/>
      <circle cx="20" cy="20" r="17" fill="none" stroke="var(--ios-blue)" stroke-width="3" stroke-linecap="round"
        stroke-dasharray="${2 * Math.PI * 17}" stroke-dashoffset="${2 * Math.PI * 17 * (1 - p.pct / 100)}" transform="rotate(-90 20 20)"/>
    </svg>
  </div>`;
}
function levelCardHTML() {
  const p = xpProgress();
  const nextLbl = p.maxed ? t('xp_level') + ' 6 · MAX' : t('xp_to_next', { n: p.need - p.into, l: p.lv + 1 });
  return `<div class="app-card elevated level-card">
    <div class="row">
      ${levelBadgeHTML(46)}
      <div class="lvl-main">
        <div class="row" style="justify-content:flex-start;gap:8px;">
          <b style="font-size:15px;color:var(--ios-label);">${t('xp_level')} ${p.lv}</b>
          <span class="sub">${p.xp} XP</span>
        </div>
        <div class="daily-progress" style="height:7px;margin:6px 0 3px;"><div style="width:${p.pct}%;background:linear-gradient(90deg,var(--ios-blue),var(--ios-teal));"></div></div>
        <div class="sub" style="font-size:11.5px;">${nextLbl}</div>
      </div>
    </div>
  </div>`;
}
/* ================= WEAK-SPOT CHALLENGE (boss mode) ================= */
const CHAL_SECONDS = 300;        // 5 minutes
const CHAL_QS = 5;               // 5 questions
const CHAL_PASS = 0.6;           // ≥60% to conquer
let _chalTimer = null, _chalRemain = CHAL_SECONDS;

function chalPickQs(type) {
  // prefer bank questions of that type FIRST (up to CHAL_QS); pad from same section only if needed
  const pool = allQuestions().concat(APP.daily || []);
  const same = pool.filter(q => q.type === type && q.options && q.options.length === 4);
  const shufSame = same.slice().sort(() => Math.random() - 0.5);
  const chosen = shufSame.slice(0, CHAL_QS);
  if (chosen.length >= CHAL_QS) return chosen;
  // pad: same section, different type
  const section = chosen[0] ? chosen[0].section : (same[0] ? same[0].section : 'reading');
  const sec = pool.filter(q => q.section === section && q.options && q.options.length === 4
    && q.type !== type && !chosen.some(c => c.id === q.id));
  const shufSec = sec.slice().sort(() => Math.random() - 0.5);
  return chosen.concat(shufSec.slice(0, CHAL_QS - chosen.length));
}
function startChallenge(type) {
  const qs = chalPickQs(type);
  if (!qs.length) { toast(LANG === 'ko' ? '챌린지 문제가 부족해요.' : 'Not enough challenge questions.'); return; }
  APP.challenge = {
    type, qids: qs.map(q => q.id), idx: 0,
    answers: {}, startAt: Date.now(), remain: CHAL_SECONDS, done: false
  };
  lsSet(LS.challenge, APP.challenge);
  if (_chalTimer) clearInterval(_chalTimer);
  _chalRemain = CHAL_SECONDS;
  _chalTimer = setInterval(() => {
    _chalRemain--;
    if (APP.challenge && !APP.challenge.done) APP.challenge.remain = _chalRemain;
    const el = $id('chal-timer');
    if (el) { el.textContent = fmtTime(_chalRemain); if (_chalRemain < 60) el.style.color = 'var(--ios-red)'; }
    if (_chalRemain <= 0) { clearInterval(_chalTimer); _chalTimer = null; finishChallenge(true); }
  }, 1000);
  go('challenge');
}
function viewChallenge() {
  const ch = APP.challenge;
  if (!ch) return `<div class="app-card"><p class="sub">${t('chal_title')}</p>
    <button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="go('home')">← Home</button></div>`;
  if (ch.done) return viewChallengeResult();
  const qs = ch.qids.map(qById).filter(Boolean);
  const q = qs[ch.idx];
  if (!q) return viewChallengeResult();
  const picked = ch.answers[q.id];
  const label = typeLabel(ch.type);
  const conquered = lsGet(LS.conquered, {})[ch.type];
  return `
    <div class="sec-h"><h2>⚔️ ${t('chal_title')}</h2><span class="sub">${conquered ? t('chal_conquered_before', { n: conquered.n }) : ''}</span></div>
    <div class="app-card" style="border:1.5px solid var(--ios-orange);">
      <div class="row">
        <span class="q-num">${t('chal_q', { i: ch.idx + 1, n: qs.length })}</span>
        <span id="chal-timer" style="font-weight:800;color:${_chalRemain < 60 ? 'var(--ios-red)' : 'var(--ios-orange)'};font-size:15px;">⏱ ${fmtTime(_chalRemain)}</span>
        <button class="btn btn-ghost btn-sm" onclick="exitChallenge()">${t('exit')}</button>
      </div>
      <div class="daily-progress"><div style="width:${Math.round((ch.idx + 1) / qs.length * 100)}%;background:var(--ios-orange);"></div></div>
      ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ''}
      ${q.passageGl ? `<div class="passage-gloss">📖 ${esc(q.passageGl)}</div>` : ''}
      ${q.section === 'listening' ? `<button class="btn btn-primary btn-sm" style="margin:4px 0 8px;width:100%;" onclick="playListening(this, '${escAttr(q.q)}')">${ic('listen',15)} ${t('listen')}</button>` : ''}
      <div class="q-kr">${q.q}</div>
      ${q.qGl ? `<div class="q-gloss">📝 ${esc(q.qGl)}</div>` : ''}
      ${q.options.map((o, i) => `
        <button class="q-opt ${picked === i ? 'correct' : ''}" onclick="pickChallenge(${i})">
          <span style="font-weight:700;">${'①②③④'[i]}</span> ${esc(o.t)}${o.gl ? `<span class="opt-gloss"> · ${esc(o.gl)}</span>` : ''}
        </button>`).join('')}
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button class="btn btn-ghost" ${ch.idx === 0 ? 'disabled style="opacity:.4"' : ''} onclick="navChallenge(-1)">${t('prev')}</button>
        <button class="btn btn-primary" style="flex:1;background:var(--ios-orange);" onclick="navChallenge(1)">${ch.idx >= qs.length - 1 ? t('finish') : t('next')}</button>
      </div>
    </div>`;
}
function pickChallenge(i) {
  const ch = APP.challenge;
  const qs = ch.qids.map(qById).filter(Boolean);
  const q = qs[ch.idx];
  if (!q) return;
  ch.answers[q.id] = i;
  lsSet(LS.challenge, ch);
  // XP per answer (same as normal)
  addXP(i === q.correct ? XP_RULES.correct : XP_RULES.wrong, 'challenge:' + (i === q.correct ? 'c' : 'w'));
  bumpQuest('daily', 1);
  render();
}
function navChallenge(d) {
  const ch = APP.challenge;
  const qs = ch.qids.map(qById).filter(Boolean);
  const next = Math.min(qs.length - 1, Math.max(0, ch.idx + d));
  if (d > 0 && ch.idx >= qs.length - 1) { finishChallenge(false); return; }
  ch.idx = next;
  lsSet(LS.challenge, ch);
  render();
}
function finishChallenge(timedOut) {
  const ch = APP.challenge;
  if (!ch || ch.done) return;
  const qs = ch.qids.map(qById).filter(Boolean);
  let correct = 0, attempted = 0;
  qs.forEach(q => {
    const a = ch.answers[q.id];
    if (a === undefined) return;
    attempted++;
    if (a === q.correct) correct++;
  });
  const pct = attempted ? correct / attempted : 0;
  const conquered = attempted > 0 && pct >= CHAL_PASS;
  ch.done = true;
  ch.result = { correct, attempted, total: qs.length, conquered, pct: Math.round(pct * 100) };
  lsSet(LS.challenge, ch);
  if (_chalTimer) { clearInterval(_chalTimer); _chalTimer = null; }
  // conquer → bonus XP + record
  if (conquered) {
    const bonus = 150;
    addXP(bonus, 'conquer:' + ch.type);
    const cq = lsGet(LS.conquered, {});
    const prev = cq[ch.type] || { n: 0, last: null };
    cq[ch.type] = { n: prev.n + 1, last: todayStr() };
    lsSet(LS.conquered, cq);
    toast(t('chal_conquer', { t: typeLabel(ch.type) }) + ' ' + t('chal_reward', { n: bonus }));
  } else {
    toast(t('chal_fail'));
  }
  render();
}
function viewChallengeResult() {
  const ch = APP.challenge;
  if (!ch || !ch.done) return `<div class="app-card"><p class="sub">${t('chal_title')}</p></div>`;
  const r = ch.result;
  const label = typeLabel(ch.type);
  const conquered = lsGet(LS.conquered, {})[ch.type];
  return `
    <div class="app-card elevated big-cta" style="${r.conquered ? 'border:2px solid var(--ios-green);' : ''}">
      <div class="cta-ico" style="color:${r.conquered ? 'var(--ios-green)' : 'var(--ios-orange)'};font-size:52px;">${r.conquered ? '🏆' : '⚔️'}</div>
      <h2 style="font-size:22px;color:var(--ios-label);margin:6px 0;">${r.conquered ? t('chal_conquer', { t: label }) : t('chal_fail')}</h2>
      <div class="stat-row">
        <div class="stat-box"><b>${r.correct}/${r.attempted}</b><span>${t('chal_correct')}</span></div>
        <div class="stat-box"><b>${r.pct}%</b><span>${t('menu_acc')}</span></div>
        <div class="stat-box"><b>${conquered ? conquered.n : 0}</b><span>${t('chal_conquered_before', { n: conquered ? conquered.n : 0 }).replace(/[0-9]+×/, conquered ? conquered.n + '×' : '×')}</span></div>
      </div>
      ${r.conquered ? `<div class="sub" style="color:var(--ios-green);font-weight:700;">${t('chal_reward', { n: 150 })}</div>` : `<div class="sub">${t('chal_sub')}</div>`}
      <div style="display:flex;gap:8px;margin-top:14px;">
        <button class="btn btn-ghost" style="flex:1;border:1.5px solid var(--ios-border,var(--ios-separator));" onclick="go('home')">← ${t('nav_home')}</button>
        <button class="btn btn-primary" style="flex:1;background:var(--ios-orange);" onclick="startChallenge('${escAttr(ch.type)}')">${t('chal_again')}</button>
      </div>
    </div>`;
}
function exitChallenge() {
  if (_chalTimer) { clearInterval(_chalTimer); _chalTimer = null; }
  APP.challenge = null;
  lsSet(LS.challenge, null);
  go('home');
}
function bindChallenge() {}

function recordResult(q, correct) {
  // progress
  const prog = lsGet(LS.progress, {});
  const p = prog[q.id] || { correct: 0, total: 0 };
  p.total += 1;
  if (correct) p.correct += 1;
  prog[q.id] = p;
  lsSet(LS.progress, prog);
  // XP: correct +10, wrong +3 · daily quest counter
  addXP(correct ? XP_RULES.correct : XP_RULES.wrong, 'answer:' + (correct ? 'c' : 'w'));
  bumpQuest('daily', 1);
  // wrong note
  if (!correct) {
    const wrong = lsGet(LS.wrong, []);
    wrong.unshift({ qid: q.id, at: Date.now() });
    lsSet(LS.wrong, wrong.slice(0, 50));
  }
  // SRS flashcard schedule (spaced repetition: 1 → 3 → 7 days)
  const srs = lsGet(LS.srs, {});
  const prev = srs[q.id] || { interval: 1, due: todayStr(), last: 0 };
  const addDays = (n) => { const d = new Date(Date.now() + n * 86400000); return d.toISOString().slice(0, 10); };
  if (correct) {
    const nextI = prev.last === 1 ? Math.min(prev.interval * 2 + 1, 7) : prev.interval;
    srs[q.id] = { interval: nextI, due: addDays(nextI), last: 1 };
  } else {
    // forgot → back to 1 day
    srs[q.id] = { interval: 1, due: addDays(1), last: 0 };
  }
  lsSet(LS.srs, srs);
  // streak
  const today = todayStr();
  const st = lsGet(LS.streak, { last: null, count: 0 });
  if (st.last !== today) {
    const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    st.count = st.last === y ? st.count + 1 : 1;
    st.last = today;
    lsSet(LS.streak, st);
  }
}
/* SRS: due cards for review */
function dueCards() {
  const srs = lsGet(LS.srs, {});
  const today = todayStr();
  return Object.entries(srs)
    .filter(([, s]) => s.due <= today)
    .map(([qid, s]) => ({ q: qById(qid), s }))
    .filter(x => x.q);
}
function flashState() { return { due: dueCards(), idx: 0, flipped: false }; }
/* ---------- Flashcard UI ---------- */
function startFlash() {
  APP.flash = flashState();
  render();
}
function flipFlash() {
  if (!APP.flash || !APP.flash.due.length) return;
  APP.flash.flipped = !APP.flash.flipped;
  render();
}
function flashAnswer(knew) {
  if (!APP.flash || !APP.flash.due.length) return;
  const cur = APP.flash.due[APP.flash.idx];
  // update SRS based on answer
  const srs = lsGet(LS.srs, {});
  const prev = cur.s || { interval: 1, due: todayStr(), last: 0 };
  const addDays = (n) => { const d = new Date(Date.now() + n * 86400000); return d.toISOString().slice(0, 10); };
  if (knew) {
    const nextI = prev.last === 1 ? Math.min(prev.interval * 2 + 1, 7) : Math.max(prev.interval, 1);
    srs[cur.q.id] = { interval: nextI, due: addDays(nextI), last: 1 };
  } else {
    srs[cur.q.id] = { interval: 1, due: addDays(1), last: 0 };
  }
  lsSet(LS.srs, srs);
  // XP + flashcard quest
  addXP(XP_RULES.flash, 'flash');
  bumpQuest('flash', 1);
  APP.flash.idx++;
  APP.flash.flipped = false;
  if (APP.flash.idx >= APP.flash.due.length) {
    APP.flash = null; // done
  }
  render();
}
function viewFlashCard() {
  const fl = APP.flash;
  if (!fl || !fl.due.length) return `<p class="sub" style="text-align:center;padding:10px 0;">${t('flash_none')}</p>`;
  const item = fl.due[fl.idx];
  const q = item.q;
  if (!q) return '';
  const total = fl.due.length;
  const i = fl.idx + 1;
  if (!fl.flipped) {
    return `
      <div style="text-align:center;padding:6px 0;">
        <div class="sub" style="margin-bottom:8px;">${t('flash_front')} ${i}/${total} · ${typeLabel(q.type)}</div>
        <div class="q-kr" style="font-size:17px;min-height:70px;display:flex;align-items:center;justify-content:center;">${esc(q.q)}</div>
        <button class="btn btn-primary" style="width:100%;margin-top:12px;" onclick="flipFlash()">${ic('tip',15)} ${t('flash_back')}</button>
      </div>`;
  }
  const ans = q.correct !== undefined && q.options && q.options[q.correct]
    ? '①②③④'[q.correct] + ' ' + esc(q.options[q.correct].t)
    : (q.answerModel ? esc(q.answerModel) : esc(q.explain || ''));
  return `
    <div style="text-align:center;padding:6px 0;">
      <div class="sub" style="margin-bottom:8px;">${t('flash_back')} ${i}/${total}</div>
      <div class="q-passage" style="font-size:15px;padding:14px;">${ans}</div>
      ${q.qGl ? `<div class="sub" style="font-size:12px;margin-top:6px;">${esc(q.qGl)}</div>` : ''}
      ${q.explain ? `<div class="sub" style="font-size:12px;margin-top:6px;">💡 ${esc(q.explain)}</div>` : ''}
      <div style="display:flex;gap:8px;margin-top:14px;">
        <button class="btn btn-teal" style="flex:1;" onclick="flashAnswer(true)">${t('flash_knew')}</button>
        <button class="btn btn-ghost" style="flex:1;border:1.5px solid var(--ios-red);color:var(--ios-red);" onclick="flashAnswer(false)">${t('flash_forgot')}</button>
      </div>
    </div>`;
}

/* ---------- AI writing grading ---------- */
async function gradeWriting(area) {
  const ta = $id(area === 'daily' ? 'write-ans' : 'mock-write');
  const statusEl = $id(area === 'daily' ? 'write-grade' : 'mock-grade');
  if (!ta || !ta.value.trim()) { toast(LANG==='ko'?'먼저 답을 작성하세요.':'Write your answer first.'); return; }
  const q = area === 'daily' ? APP.daily[APP.dailyIdx] : APP.mock.qids.map(qById).filter(Boolean)[APP.mockIdx];
  if (statusEl) statusEl.innerHTML = `<span class="sub">${t('grading')}…</span>`;
  try {
    const res = await fetch(aiUrl('/grade-writing'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: q.q || '', answer: ta.value })
    });
    const data = await res.json();
    if (!res.ok || !data.grade) throw new Error(data.error || 'grading failed');
    const g = data.grade;
    const sc = Math.round(g.score);
    const col = sc >= 24 ? 'var(--ios-green)' : sc >= 15 ? 'var(--ios-orange)' : 'var(--ios-red)';
    const criteria = g.criteria || {};
    if (statusEl) statusEl.innerHTML = `
      <div class="grade-card" style="background:var(--ios-fill);border-radius:12px;padding:12px;margin-top:10px;">
        <div class="row"><b style="font-size:15px;">${t('grade_score')}: <span style="color:${col};font-size:22px;">${sc}</span><span class="sub"> / 30</span></b>
        <span class="mock-badge t2">${esc(g.band || '')}</span></div>
        <div style="display:flex;gap:6px;margin:8px 0;">
          ${Object.entries(criteria).map(([k, v]) => `<span style="font-size:11px;background:#fff;border-radius:8px;padding:3px 8px;">${esc(k)} ${v}</span>`).join('')}
        </div>
        <div style="font-size:13px;line-height:1.5;">${esc(g.feedback || '')}</div>
        ${(g.fixes || []).length ? `<div style="margin-top:8px;"><b style="font-size:12px;color:var(--ios-orange);">✏️ ${t('grade_fix')}</b>
          ${g.fixes.map(f => `<div style="font-size:12.5px;margin:3px 0 0 8px;">· ${esc(f)}</div>`).join('')}</div>` : ''}
      </div>`;
  } catch (e) {
    if (statusEl) statusEl.innerHTML = `<span class="sub" style="color:var(--ios-red);">⚠ ${esc(e.message)}</span>`;
    toast('AI grading failed: ' + e.message);
  }
}

/* ================= MOCK TEST ================= */
function viewMock() {
  if (APP.mock) return viewMockRun();
  const mocks = window.MOCK_TESTS || [];
  const status = lsGet(LS.mockStatus, {});
  const badgeOf = id => status[id] === 'done'
    ? `<span class="mock-badge t1" style="background:#E7F9EF;color:#1B7A3D;">${t('status_done')}</span>`
    : status[id] === 'progress'
      ? `<span class="mock-badge t1" style="background:#FFF6E5;color:#C77C00;">${t('status_progress')}</span>`
      : `<span class="mock-badge t1" style="background:var(--ios-fill);color:var(--ios-secondary-label);">${t('status_new')}</span>`;
  return `
    <div class="sec-h"><h2>${t('mock_header')}</h2><span class="sub">${t('mock_sub')}</span></div>
    <div class="app-card"><p class="sub">${APP.level === 'II' ? t('mock_intro_II') : t('mock_intro_I')}</p></div>
    ${mocks.map(m => `
      <div class="mock-item">
        <div style="flex:1;min-width:0;">
          <div class="mock-name">${esc(m.name)}</div>
          <div class="mock-date">📅 ${m.date} · ⏱ ${m.duration} · 🎯 ${m.goal}</div>
          <div style="margin-top:4px;">${badgeOf(m.id)}</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="startMock('${m.id}')">${t('start')}</button>
      </div>`).join('') || `<p class="muted">No mock tests yet.</p>`}
  `;
}
let _mockTimer = null, _mockRemain = 0;
function mockSeconds(m) {
  // '180 min' -> 180*60, '100 min' -> 100*60; fallback 90 min
  const n = parseInt(String(m.duration || '90'), 10);
  return (isNaN(n) ? 90 : n) * 60;
}
function startMock(id) {
  const m = (window.MOCK_TESTS || []).find(x => x.id === id);
  if (!m) return;
  APP.mock = m; APP.mockIdx = 0; APP.mockAnswers = {};
  const st = lsGet(LS.mockStatus, {});
  st[id] = 'progress'; lsSet(LS.mockStatus, st);
  // start countdown
  if (_mockTimer) clearInterval(_mockTimer);
  _mockRemain = mockSeconds(m);
  _mockTimer = setInterval(() => {
    _mockRemain--;
    const el = $id('mock-timer');
    if (el) el.textContent = fmtTime(_mockRemain);
    if (_mockRemain <= 0) {
      clearInterval(_mockTimer); _mockTimer = null;
      // auto-submit: mark done and return to list
      const st2 = lsGet(LS.mockStatus, {});
      st2[APP.mock.id] = 'done'; lsSet(LS.mockStatus, st2);
      APP.mock = null;
      toast(t('time_up'));
      go('mock');
    }
  }, 1000);
  go('mock');
}
function fmtTime(sec) {
  if (sec < 0) sec = 0;
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  const pad = n => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
function viewMockRun() {
  const m = APP.mock;
  const qs = m.qids.map(qById).filter(Boolean);
  const q = qs[APP.mockIdx];
  const picked = APP.mockAnswers[q.id];
  return `
    <div class="app-card">
      <div class="row"><span class="q-num">${esc(m.name)}</span>
      <span id="mock-timer" class="mock-timer" style="font-weight:800;color:${_mockRemain < 300 ? 'var(--ios-red)' : 'var(--ios-green)'};font-size:14px;">⏱ ${fmtTime(_mockRemain)}</span>
      <button class="btn btn-ghost btn-sm" onclick="exitMock()">${t('exit')}</button></div>
      <div class="sub" style="margin:4px 0 8px;">Q${APP.mockIdx + 1} / ${qs.length} · ${t('time_left')}</div>
      <div class="daily-progress"><div style="width:${Math.round(APP.mockIdx / qs.length * 100)}%"></div></div>
      ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ''}
      ${q.passageGl ? `<div class="passage-gloss">📖 ${esc(q.passageGl)}</div>` : ''}
      ${q.section === 'listening' ? `<button class="btn btn-primary btn-sm" style="margin:4px 0 8px;width:100%;" onclick="playListening(this, '${escAttr(q.q)}')">${ic('listen',15)} ${t('listen')}</button>` : ''}
      ${q.audioHint ? `<div class="sub" style="font-size:12px;margin-bottom:6px;">🎧 ${q.audioHint}</div>` : ''}
      <button class="btn btn-ghost tip-btn" style="width:100%;margin:4px 0 8px;background:var(--ios-fill);border-radius:10px;font-size:12px;font-weight:800;padding:8px;" onclick="toggleTip(this)">${ic('tip',14)} ${t('tip')}</button>
      <div class="q-kr">${q.q}</div>
      ${q.qGl ? `<div class="q-gloss">📝 ${esc(q.qGl)}</div>` : ''}
      ${q.section === 'writing'
        ? `<textarea class="q-write" id="mock-write">${picked && picked.w ? esc(picked.w) : ''}</textarea><button class="btn btn-primary" style="width:100%;margin-top:10px;" onclick="submitMockWriting()">${t('save')}</button>
           <button class="btn btn-teal" style="width:100%;margin-top:8px;" onclick="gradeWriting('mock')">${t('grade_writing')}</button>
           <div id="mock-grade"></div>`
        : q.options.map((o, i) => `
          <button class="q-opt ${picked === i ? 'correct' : ''}" onclick="pickMock(${i})"><span style="font-weight:700;">${'①②③④'[i]}</span> ${esc(o.t)}${o.gl ? `<span class="opt-gloss"> · ${esc(o.gl)}</span>` : ''}</button>`).join('')}
      ${picked !== undefined && q.correct !== undefined ? `<div class="q-explain">${explainBlock(q)}</div>` : ''}
      <div class="q-meta" style="margin-top:10px;">${freqBadge(q)}</div>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost" ${APP.mockIdx === 0 ? 'disabled style="opacity:.4"' : ''} onclick="navMock(-1)">${t('prev')}</button>
      <button class="btn btn-primary" style="flex:1;" onclick="navMock(1)">${APP.mockIdx >= qs.length - 1 ? t('finish') : t('next')}</button>
    </div>
  `;
}
function pickMock(i) {
  const q = APP.mock.qids.map(qById).filter(Boolean)[APP.mockIdx];
  if (!q) return;
  APP.mockAnswers[q.id] = i;
  recordResult(q, i === q.correct);
  render();
}
function submitMockWriting() {
  const q = APP.mock.qids.map(qById).filter(Boolean)[APP.mockIdx];
  const ta = $id('mock-write');
  if (!q || !ta) return;
  APP.mockAnswers[q.id] = { w: ta.value };
  render();
}
function navMock(d) {
  const qs = APP.mock.qids.map(qById).filter(Boolean);
  const next = Math.min(qs.length - 1, Math.max(0, APP.mockIdx + d));
  // moving forward off the last question (Finish) marks the mock done
  if (d > 0 && APP.mockIdx >= qs.length - 1) {
    const st = lsGet(LS.mockStatus, {});
    st[APP.mock.id] = 'done'; lsSet(LS.mockStatus, st);
    // XP: mock finished +100 · mock quest
    addXP(XP_RULES.mock_finish, 'mock_finish');
    bumpQuest('mock', 1);
    if (_mockTimer) { clearInterval(_mockTimer); _mockTimer = null; }
  }
  APP.mockIdx = next;
  // reset passage scroll to top
  const scr = $id('screen'); if (scr) scr.querySelector('.q-passage')?.scrollTo(0, 0);
  render();
}
function exitMock() {
  if (_mockTimer) { clearInterval(_mockTimer); _mockTimer = null; }
  APP.mock = null; render();
}
function bindMock() {}

/* ================= RANKING ================= */
let _rankSort = 'acc';            // 'acc' | 'solved' | 'level'
let _rankPeers = null;            // [{name, img, acc, solved, level, xp, me}] — lazy-loaded from Supabase
const _RANK_FAKE_COUNT = 100;     // assume ~100 learners on the leaderboard

/* deterministic PRNG so the demo leaderboard is stable across visits */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* build 100 fake learners (used when there's no real synced data) */
function makeFakePeers() {
  const rnd = mulberry32(20260904);
  const chars = window.CHAR_LIST || [];
  const namePool = ['Jisoo','Minji','Hana','Yuna','Seojun','Doyun','Eunwoo','Jihye','Somin','Taeyang',
    'Lina','Kai','Nari','Junho','Sooah','Hyunwoo','Bomi','Chan','Yerin','Donghyun',
    'Ara','Seungmin','Hyerin','Jaehyun','Gowoon','Sangwoo','Mina','Kyungsoo','Dahye','Wonho',
    'Eunbi','Jiho','Nayoung','Taemin','Boram','Sungjae','Chaewon','Minseok','Hana','Yujin',
    'Seoyoung','Kangmin','Yeji','Joon','Sara','Doyoung','Rin','Hoseok','Miso','Taeri'];
  const peers = [];
  for (let i = 0; i < _RANK_FAKE_COUNT; i++) {
    const ch = chars[Math.floor(rnd() * chars.length)] || { id: 'f-01', img: 'assets/img/chars/f-01.webp' };
    // accuracy clustered 30–100, skewed toward mid-high
    const acc = Math.min(100, Math.max(10, Math.round((rnd() * 0.7 + 0.25) * 100)));
    const solved = Math.max(1, Math.round(rnd() * 260 + 4));
    const xp = Math.round(solved * 3.1 + rnd() * 200);
    peers.push({
      name: namePool[i % namePool.length] + (i >= namePool.length ? ' ' + (Math.floor(i / namePool.length) + 2) : ''),
      img: ch.img,
      acc,
      solved,
      level: xpLevel(xp),
      xp,
      me: false
    });
  }
  return peers;
}
function charImg(id) {
  const c = (window.CHAR_LIST || []).find(x => x.id === id);
  return c ? c.img : 'assets/img/chars/f-01.webp';
}
function myRankEntry() {
  const prog = lsGet(LS.progress, {});
  return {
    name: myCharName() || (isAuthed() ? currentUser().name : 'Learner'),
    img: myChar().img,
    acc: accuracyStats().overall,
    solved: Object.keys(prog).length,
    level: xpProgress().lv,
    xp: xpTotal(),
    me: true
  };
}
async function loadRankPeers() {
  let real = [];
  if (isAuthed() && window.getSupabase) {
    try {
      const sb = getSupabase();
      const { data, error } = await sb.from('topik_user_data').select('user_id, data').limit(200);
      if (error || !data) throw new Error('no data');
      data.forEach(r => {
        if (r.user_id === getSession().user.id) return;   // me is rendered separately
        const d = r.data || {};
        const prog = d[LS.progress] || {};
        let c = 0, n = 0;
        Object.values(prog).forEach(p => { if (p && p.total) { c += p.correct || 0; n += p.total; } });
        const xp = (d[LS.xp] || {}).total || 0;
        const solved = Object.keys(prog).length;
        if (!solved && !xp) return;                        // skip empty profiles
        real.push({
          name: (d.camnemi_topik_char_name || 'Learner'),
          img: charImg(d.camnemi_topik_char),
          acc: n ? Math.round(c / n * 100) : 0,
          solved, level: xpLevel(xp), xp, me: false
        });
      });
    } catch (e) { real = []; }
  }
  // pad with deterministic fake learners so the board always shows ~100 people
  const fakes = makeFakePeers();
  const need = Math.max(0, _RANK_FAKE_COUNT - real.length);
  _rankPeers = real.concat(fakes.slice(0, need));
}
function rankRows() {
  const rows = [myRankEntry()].concat(_rankPeers || []);
  const sorters = {
    acc:    (a, b) => b.acc - a.acc || b.solved - a.solved,
    solved: (a, b) => b.solved - a.solved || b.acc - a.acc,
    level:  (a, b) => b.level - a.level || b.xp - a.xp || b.acc - a.acc
  };
  return rows.sort(sorters[_rankSort] || sorters.acc);
}
function setRankSort(m) {
  _rankSort = m;
  const list = $id('rank-list');
  if (list) list.innerHTML = rankListHTML();
  const meCard = $id('rank-me');
  if (meCard) meCard.innerHTML = rankMeCardHTML();
  document.querySelectorAll('.rk-chip').forEach(b => b.classList.toggle('on', b.dataset.m === m));
}
function rankMetricHTML(r) {
  if (_rankSort === 'solved') return `<b>${r.solved}</b><span class="sub">${t('rank_solved')}</span>`;
  if (_rankSort === 'level') return `<b>Lv.${r.level}</b><span class="sub">${r.xp} XP</span>`;
  return `<b>${r.acc}%</b><span class="sub">${t('rank_acc')}</span>`;
}
function rankListHTML() {
  const rows = rankRows();
  const total = rows.length;
  const SHOW = 30;                       // show the top 30 on screen
  const medals = ['🥇', '🥈', '🥉'];
  let visible = rows.slice(0, SHOW).map((r, i) => `
    <div class="rk-row ${r.me ? 'me' : ''}">
      <span class="rk-pos">${medals[i] || (i + 1)}</span>
      <span class="rk-ava"><img src="${r.img}" alt=""></span>
      <span class="rk-name">${esc(r.name)}${r.me ? ` <em class="rk-me">${t('rank_me')}</em>` : ''}</span>
      <span class="rk-val">${rankMetricHTML(r)}</span>
    </div>`).join('');
  return `${visible}
    <div class="rk-more">${t('rank_top_of', { n: SHOW, total })}</div>`;
}
/* my standing card — always visible at the top of the ranking tab */
function rankMeCardHTML() {
  const rows = rankRows();
  const total = rows.length;
  const meIdx = rows.findIndex(r => r.me);
  const me = meIdx !== -1 ? rows[meIdx] : myRankEntry();
  if (!me) return '';
  const place = meIdx !== -1 ? meIdx + 1 : '–';
  const pctRank = meIdx !== -1 && total > 1 ? Math.round((1 - meIdx / (total - 1)) * 100) : 100;
  return `
    <div class="rk-me-card">
      <span class="rk-ava"><img src="${me.img}" alt=""></span>
      <div class="rk-me-info">
        <b>${esc(me.name)}</b>
        <span class="rk-me-sub">${t('rank_me')} · ${rankMetricHTML(me)}</span>
      </div>
      <div class="rk-me-right">
        <span class="rk-me-place"><b>${place}</b>/${total}</span>
        <span class="rk-me-pct"><i style="width:${pctRank}%"></i></span>
      </div>
    </div>`;
}
function viewRank() {
  return `
    <div class="sec-h"><h2>${ic('trophy',16)} ${t('rank_title')}</h2><span class="sub">${t('rank_sub')}</span></div>
    <div class="rk-chips">
      <button class="rk-chip ${_rankSort === 'acc' ? 'on' : ''}" data-m="acc" onclick="setRankSort('acc')">${t('rank_acc')}</button>
      <button class="rk-chip ${_rankSort === 'solved' ? 'on' : ''}" data-m="solved" onclick="setRankSort('solved')">${t('rank_solved')}</button>
      <button class="rk-chip ${_rankSort === 'level' ? 'on' : ''}" data-m="level" onclick="setRankSort('level')">${t('rank_level')}</button>
    </div>
    <div id="rank-me">${rankMeCardHTML()}</div>
    <div id="rank-list">${rankListHTML()}</div>
    <div class="app-card rk-note">
      <span class="sub">${LANG === 'ko' ? '랭킹은 내 학습 기록을 기준으로 해요 — 문제를 풀수록 순위가 올라가요!' : LANG === 'km' ? 'ចំណាត់ថ្នាក់ផ្អែកលើកំណត់ត្រារបស់អ្នក — ដោះស្រាយសំណួរកាន់តែច្រើន កាន់តែឡើងខ្ពស់!' : 'Ranking is based on your study record — the more you solve, the higher you climb!'}</span>
    </div>`;
}
function bindRank() {
  // lazily load other learners once, then re-render the list
  if (_rankPeers === null) {
    loadRankPeers().then(() => {
      const list = $id('rank-list');
      if (list) list.innerHTML = rankListHTML();
      const meCard = $id('rank-me');
      if (meCard) meCard.innerHTML = rankMeCardHTML();
    });
  }
}

/* ================= WRONG / TYPE-WISE ================= */
function viewWrong() {
  const wrong = lsGet(LS.wrong, []);
  const prog = lsGet(LS.progress, {});
  const acc = accuracyStats();
  // type-wise breakdown from progress misses
  const typeStats = {};
  allQuestions().forEach(q => {
    const p = prog[q.id];
    if (p && p.total > 0 && p.correct < p.total) {
      const t = q.type || q.section;
      typeStats[t] = (typeStats[t] || 0) + (p.total - p.correct);
    }
  });
  const typeRows = Object.entries(typeStats).sort((a, b) => b[1] - a[1]);
  const hasData = acc.byType.length > 0;
  return `
    <div class="sec-h"><h2>📊 ${t('wrong_title')}</h2><span class="sub">${t('overall')} ${acc.overall}%</span></div>
    <div class="app-card">
      <b style="font-size:13px;color:var(--ios-blue);">${t('wrong_by_type')}</b>
      ${hasData ? acc.byType.map(r => accBar(typeLabel(r.k) + (r.k === 'writing_short' || r.k === 'writing_letter' ? '' : ''), r.p, `${r.c}/${r.n}문항`)).join('') : `<p class="sub" style="margin-top:6px;">${t('wrong_no_data')}</p>`}
    </div>
    <div class="app-card">
      <b style="font-size:13px;color:var(--ios-blue);">${t('wrong_by_level')}</b>
      ${hasData ? acc.byLevel.map(r => accBar(r.k <= 2 ? '★'.repeat(r.k) : 'L' + r.k + ' ★'.repeat(Math.max(1, r.k - 2)), r.p, `${r.c}/${r.n}문항`)).join('') : `<p class="sub" style="margin-top:6px;">${t('wrong_level_no_data')}</p>`}
    </div>

    <div class="sec-h"><h2>${t('weak_spots')}</h2></div>
    <div class="app-card">
      ${typeRows.length ? typeRows.map(([t, n]) => `
        <div class="row" style="padding:6px 0;border-bottom:1px solid var(--border);">
          <span>${esc(typeLabel(t))}</span><span class="wrong-tag">${n} ${LANG==='ko'?'개':'misses'}</span>
        </div>`).join('') : `<p class="sub">${t('no_weak')}</p>`}
    </div>
    <div class="sec-h"><h2>${t('wrong_notes')}</h2><span class="sub">${t('recent', { n: wrong.length })}</span></div>
    ${wrong.length ? wrong.map(w => {
      const q = qById(w.qid);
      if (!q) return '';
      return `<div class="app-card wrong-item">
        <div class="row"><span class="q-num">${esc(q.id)}</span><span class="q-type">${q.section === 'reading' ? '📖' : q.section === 'listening' ? '🎧' : '✍️'} ${esc(typeLabel(q.type))}</span></div>
        <div class="q-kr" style="font-size:14px;margin:8px 0;">${q.q}</div>
        <div class="q-explain show"><b>✓ ${q.correct !== undefined ? (LANG==='ko' ? '정답: ' : 'Answer: ') + '①②③④'[q.correct] : '참고'}</b> — ${esc(q.explain)}</div>
      </div>`;
    }).join('') : `<div class="app-card"><p class="sub">${LANG==='ko'?'아직 틀린 문제가 없어요 — 계속 연습하세요!':'No wrong answers yet — keep practicing!'}</p></div>`}
  `;
}
function bindWrong() {}

/* ================= LEARN (weak → vocab/grammar) ================= */
const LEARN_CONTENT = {
  grammar: [
    { k: '-(으)ㄴ 지', t: 'Time since', ex: '한국에 온 지 3년이 됐어요.', en: 'It\'s been 3 years since I came to Korea.' },
    { k: '-다가', t: 'Interrupted action', ex: '책을 읽다가 잠이 들었어요.', en: 'I fell asleep while reading.' },
    { k: '-았/었으면 좋겠다', t: 'Wish', ex: '빨리 합격했으면 좋겠어요.', en: 'I hope I pass soon.' }
  ],
  vocab: [
    { k: '치사하다', t: 'adj. mean/hateful', ex: '사랑하지 않으니까 치사한 거지.', en: 'Because you don\'t love, it\'s mean.' },
    { k: '대충', t: 'adv. roughly', ex: '대충 설명하면 안 돼요.', en: 'Don\'t explain roughly.' },
    { k: '정기권', t: 'n. commuter pass', ex: '정기권을 사면 20% 싸요.', en: 'A commuter pass is 20% cheaper.' }
  ]
};
function viewLearn() {
  const wrong = lsGet(LS.wrong, []);
  const recentIds = wrong.slice(0, 6).map(w => w.qid);
  const missedTypes = recentIds.map(qById).filter(Boolean).map(q => q.type);
  const weakGrammar = missedTypes.includes('grammar') || missedTypes.includes('sentence_pos') || missedTypes.includes('order');
  const weakVocab = missedTypes.includes('vocab');
  const practiceType = weakGrammar ? 'grammar' : (weakVocab ? 'vocab' : '');
  const due = dueCards();
  return `
    <div class="sec-h"><h2>🔁 ${t('flash_title')}</h2><span class="sub">${t('flash_due', { n: due.length })}</span></div>
    <div class="app-card">
      ${APP.flash && APP.flash.due && APP.flash.due.length ? viewFlashCard() : (due.length ? `<button class="btn btn-primary" style="width:100%;" onclick="startFlash()">${ic('spark',15)} ${t('flash_title')} (${due.length})</button>` : `<p class="sub" style="text-align:center;padding:10px 0;">${t('flash_none')}</p>`)}
    </div>

    <div class="sec-h"><h2>${t('learn_title')}</h2><span class="sub">${t('learn_sub')}</span></div>
    <div class="app-card"><p class="sub">${wrong.length
      ? t('learn_intro', { t: missedTypes.map(typeLabel).join(', ') || 'mixed' })
      : t('learn_intro_empty')}</p></div>

    ${weakGrammar || wrong.length === 0 ? `<div class="sec-h"><h2>${t('learn_grammar')}</h2></div>
      <div class="app-card">
        ${LEARN_CONTENT.grammar.map(g => `
          <div style="padding:8px 0;border-bottom:1px solid var(--border);">
            <b style="color:var(--ios-blue);">${esc(g.k)}</b> <span class="sub">· ${esc(g.t)}</span>
            <div style="font-size:14px;margin-top:4px;">${esc(g.ex)}</div>
            <div class="sub" style="font-size:12px;">${esc(g.en)}</div>
          </div>`).join('')}
      </div>` : ''}

    ${weakVocab || wrong.length === 0 ? `<div class="sec-h"><h2>${t('learn_vocab')}</h2></div>
      <div class="app-card">
        ${LEARN_CONTENT.vocab.map(v => `
          <div style="padding:8px 0;border-bottom:1px solid var(--border);">
            <b style="color:var(--ios-green);">${esc(v.k)}</b> <span class="sub">· ${esc(v.t)}</span>
            <div style="font-size:14px;margin-top:4px;">${esc(v.ex)}</div>
            <div class="sub" style="font-size:12px;">${esc(v.en)}</div>
          </div>`).join('')}
      </div>` : ''}

    ${practiceType ? `<button class="btn btn-primary" style="width:100%;margin-top:8px;" onclick="generateAI('${escAttr(practiceType)}')">${ic('spark',15)} ${t('learn_practice')}</button>` : ''}
  `;
}
function bindLearn() {}

/* ================= MY PROGRESS (scores + what to do) ================= */
function viewProgress() {
  const scores = lsGet(LS.scores, []);
  const prog = lsGet(LS.progress, {});
  const wrong = lsGet(LS.wrong, []);
  const streak = lsGet(LS.streak, { last: null, count: 0 });
  const acc = accuracyStats();
  const today = todayStr();
  const doneToday = lsGet(LS.daily, {})[today];
  const doneCount = doneToday ? Object.keys(doneToday.done || {}).length : 0;

  // latest score card
  let lastCard = '';
  if (scores.length) {
    const last = scores[scores.length - 1];
    const pass = last.level === 'I' ? last.passI : last.passII;
    lastCard = `
    <div class="app-card elevated big-cta">
      <div class="cta-ico" style="color:var(--ios-blue);">${ic('target', 38)}</div>
      <div style="font-size:13px;color:var(--ios-secondary-label);">${last.date === today ? t('prog_today') : t('prog_last')} · TOPIK ${last.level} (${last.date})</div>
      <div style="font-size:44px;font-weight:800;color:var(--ios-blue);margin:6px 0;">${last.score}<span style="font-size:18px;color:var(--ios-secondary-label);"> / ${last.maxScore}</span></div>
      <div class="row" style="justify-content:center;gap:10px;">
        <span class="mock-badge t2">${t('result_pass')} ${pass}%</span>
        <span class="mock-badge t1" style="background:#E7F9EF;color:#1B7A3D;">${last.correct}✓ ${last.wrong}✗</span>
      </div>
    </div>`;
  } else {
    lastCard = `<div class="app-card filled"><p class="sub" style="text-align:center;padding:10px 0;">${t('prog_no_scores')}</p></div>`;
  }

  // score history (last 7 entries) — simple CSS bars
  const hist = scores.slice(-7);
  const maxScore = hist.length ? Math.max(...hist.map(s => s.score), 1) : 1;
  const histHTML = hist.length ? `
    <div style="display:flex;align-items:flex-end;gap:6px;height:110px;padding:10px 0 0;">
      ${hist.map(s => `
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
          <span style="font-size:10px;font-weight:700;color:${s.score >= 120 ? 'var(--ios-green)' : 'var(--ios-secondary-label)'};">${s.score}</span>
          <div style="width:70%;max-width:34px;height:${Math.max(8, Math.round(s.score / maxScore * 80))}px;border-radius:6px 6px 2px 2px;background:${s.score >= 120 ? 'var(--ios-green)' : 'var(--ios-blue)'};opacity:.85;"></div>
          <span style="font-size:9px;color:var(--ios-secondary-label);">${s.date.slice(5)}</span>
        </div>`).join('')}
    </div>` : `<p class="sub" style="padding:8px 0;">${t('prog_no_hist')}</p>`;

  // ---- What I need to do ----
  const todos = [];
  // 1. today's daily
  if (doneCount < 10) todos.push({ ico: 'daily', label: t('prog_todo_daily', { d: doneCount }), act: "go('daily')", btn: t('prog_btn_daily') });
  // 2. weak type (>=2 attempts, <70%)
  const weak = (acc.byType || []).filter(r => r.n >= 2 && r.p < 70)[0];
  if (weak) todos.push({ ico: 'target', label: t('prog_todo_weak', { t: typeLabel(weak.k), p: weak.p }), act: `generateAI('${escAttr(weak.k)}')`, btn: t('prog_btn_weak', { t: typeLabel(weak.k) }) });
  // 3. wrong answers to review
  if (wrong.length) todos.push({ ico: 'notes', label: t('prog_todo_wrong', { n: wrong.length }), act: "go('wrong')", btn: t('prog_btn_wrong') });
  // 4. next exam / reg deadline (Korea schedule)
  const sch = window.TOPIK_SCHEDULE;
  if (sch && sch.pbt) {
    const todayD = new Date(today + 'T00:00:00');
    let nextExam = null, nextReg = null;
    sch.pbt.forEach(p => {
      const reg = parseReg(p.reg, p.date);
      if (reg && new Date(reg.end + 'T00:00:00') >= todayD && !nextReg) nextReg = { p, end: reg.end };
      if (new Date(p.date + 'T00:00:00') >= todayD && !nextExam) nextExam = { p, date: p.date };
    });
    if (nextExam) {
      const d = Math.round((new Date(nextExam.date + 'T00:00:00') - todayD) / 86400000);
      if (d > 0) todos.push({ ico: 'schedule', label: t('prog_todo_exam', { s: sessionTh(nextExam.p.session), d }), act: "go('schedule')", btn: '🗓' });
    }
    if (nextReg) {
      const d = Math.round((new Date(nextReg.end + 'T00:00:00') - todayD) / 86400000);
      if (d >= 0) todos.push({ ico: 'schedule', label: t('prog_todo_reg', { s: sessionTh(nextReg.p.session), d }), act: "go('schedule')", btn: '🗓' });
    }
  }
  const todosHTML = todos.length ? todos.map(td => `
    <div class="row" style="padding:11px 0;border-bottom:1px solid var(--border);">
      <span style="color:var(--ios-blue);margin-right:8px;">${ic(td.ico, 20)}</span>
      <div style="flex:1;min-width:0;"><span style="font-size:13.5px;">${td.label}</span></div>
      <button class="btn btn-primary btn-sm" onclick="${td.act}">${td.btn}</button>
    </div>`).join('')
    : `<p class="sub" style="text-align:center;padding:14px 0;">${t('prog_todo_none')}</p>`;

  const mastered = Object.values(prog).filter(p => (p.correct || 0) > 0).length;
  const testsDone = scores.length;

  // ---- Aiko-style dashboard: study time / tasks / focus sessions / subjects ----
  const focusMin = parseInt(localStorage.getItem('camnemi_topik_focus_min') || '0') || 0;
  const homeTasks = lsGet('camnemi_topik_home_tasks', {});
  const tasksDone = Object.values(homeTasks).filter(Boolean).length;
  const focusSess = parseInt(localStorage.getItem('camnemi_topik_focus_sess') || '0') || 0;
  const studyH = Math.floor(focusMin / 60), studyM = focusMin % 60;
  // per-subject progress from accuracy by type
  const subjMap = { reading: 'home_sch_reading', listening: 'home_sch_listening', vocab: 'home_sch_vocab' };
  const subjRows = Object.entries(subjMap).map(([k, lab]) => {
    const r = (acc.byType || []).find(x => x.k === k);
    const p = r ? r.p : 0;
    const color = k === 'reading' ? 'var(--ios-blue)' : k === 'listening' ? 'var(--ios-teal)' : 'var(--ios-orange)';
    return `<div class="subj-row"><span class="subj-name">${t(lab)}</span>
      <span class="subj-bar"><span style="width:${p}%;background:${color};"></span></span>
      <span class="subj-pct">${p}%</span></div>`;
  }).join('');
  const dash = `
    <div class="app-card dash-card">
      <div class="dash-top">
        <div class="dash-time"><b>${studyH}h ${studyM}m</b><span>${t('prog_study_time')}</span></div>
        <div class="dash-stats">
          <div class="dash-stat"><b>${tasksDone}</b><span>${ic('daily',12)} ${t('prog_tasks_done')}</span></div>
          <div class="dash-stat"><b>${focusSess}</b><span>${ic('target',12)} ${t('prog_focus_sess')}</span></div>
        </div>
      </div>
      <div class="dash-subj">
        <div class="dash-subj-h">${t('prog_subjects')}</div>
        ${subjRows}
      </div>
    </div>`;

  return `
    <div class="sec-h"><h2>📈 ${t('prog_title')}</h2><span class="sub">${t('prog_sub')}</span></div>
    ${dash}
    ${lastCard}

    <div class="sec-h"><h2>${t('prog_hist')}</h2><span class="sub">${t('prog_last7', { n: hist.length })}</span></div>
    <div class="app-card filled">${histHTML}</div>

    <div class="sec-h"><h2>✅ ${t('prog_todo')}</h2></div>
    <div class="app-card">${todosHTML}</div>

    <div class="sec-h"><h2>📊 ${t('avg_acc')}</h2><span class="sub">${t('overall')} ${acc.overall}%</span></div>
    <div class="app-card filled">
      <div class="stat-row" style="margin:0;">
        <div class="stat-box"><b>${streak.count}</b><span>🔥 ${t('prog_streak')}</span></div>
        <div class="stat-box"><b>${mastered}</b><span>🏆 ${t('prog_mastered')}</span></div>
        <div class="stat-box"><b>${testsDone}</b><span>📈 ${t('prog_tests')}</span></div>
      </div>
      ${acc.byType.length ? `<div style="margin-top:10px;">${acc.byType.slice(0, 3).map(r => accBar(typeLabel(r.k), r.p, `${r.c}/${r.n}`)).join('')}</div>` : ''}
    </div>
  `;
}
function bindProgress() {}

/* ================= TOPIK SCHEDULE (나라별 일정 + 달력 + D-Day) ================= */
function ddayStr(target) {
  // target: 'YYYY-MM-DD' → 'D-N' / 'D-DAY' / 'D+N'
  const t = new Date(target + 'T00:00:00');
  const n = new Date(todayStr() + 'T00:00:00');
  const diff = Math.round((t - n) / 86400000);
  if (diff === 0) return 'D-DAY';
  return diff > 0 ? 'D-' + diff : 'D+' + Math.abs(diff);
}
function parseReg(reg, testDate) {
  // '2025-12-09 ~ 12-15' → {start:'2025-12-09', end:'2025-12-15'}
  const m = String(reg).match(/(\d{4})-(\d{2})-(\d{2})\s*~\s*(\d{2})-(\d{2})/);
  if (!m) return null;
  let sy = +m[1], sm = +m[2], sd = +m[3], em = +m[4], ed = +m[5];
  let ey = sy;
  if (em < sm) ey = sy + 1;              // 연말 접수 → 연초 시험인 경우
  const pad = n => String(n).padStart(2, '0');
  return { start: `${sy}-${pad(sm)}-${pad(sd)}`, end: `${ey}-${pad(em)}-${pad(ed)}` };
}
function sessionStatus(p) {
  // 접수 기간 기준으로 상태 판정
  const today = todayStr();
  const reg = parseReg(p.reg, p.date);
  if (!reg) return { key: 'unknown', label: '정보 확인 필요' };
  if (today < reg.start) return { key: 'reg_open', label: '접수 예정', reg: reg };
  if (today <= reg.end) return { key: 'reg_ing', label: '접수 중', reg: reg };
  if (today < p.date) return { key: 'test_wait', label: '접수 마감 · 시험 대기', reg: reg };
  if (today < p.result) return { key: 'result_wait', label: '시험 완료 · 결과 대기', reg: reg };
  return { key: 'done', label: '종료', reg: reg };
}

function viewSchedule() {
  const sch = window.TOPIK_SCHEDULE;
  if (!sch) return '<div class="app-card"><p class="sub">일정 데이터가 없습니다.</p></div>';
  const today = todayStr();
  const sel = APP.scheduleCountry || localStorage.getItem(LS.country) || 'KR';
  const country = sch.countries.find(c => c.key === sel) || sch.countries[0];
  const sessions = country.sessions;
  const rows = sch.pbt.filter(p => sessions.includes(parseInt(p.session)));
  // D-Day 계산: 다가오는 접수 / 시험 / 결과
  const upcoming = rows.map(p => ({ p, st: sessionStatus(p) }))
    .filter(x => x.st.key !== 'done');
  // 접수 마감 D-day (접수 중 or 예정인 것 중 가장 가까운)
  const regTargets = upcoming.filter(x => x.st.key === 'reg_ing' || x.st.key === 'reg_open');
  const testTargets = upcoming.filter(x => x.st.key === 'reg_ing' || x.st.key === 'test_wait' || x.st.key === 'reg_open');
  const resultTargets = upcoming.filter(x => x.st.key === 'result_wait');
  const regNear = regTargets.length ? regTargets[0] : null;
  const testNear = testTargets.length ? testTargets[0] : null;
  const resultNear = resultTargets.length ? resultTargets[0] : null;
  // 달력 이벤트
  const events = [];
  rows.forEach(p => {
    const reg = parseReg(p.reg, p.date);
    if (reg) {
      events.push({ date: reg.start, type: 'reg', label: sessionTh(p.session) + ' 접수시작' });
      events.push({ date: reg.end, type: 'reg', label: sessionTh(p.session) + ' 접수마감' });
    }
    events.push({ date: p.date, type: 'test', label: sessionTh(p.session) + ' 시험' });
    events.push({ date: p.result, type: 'result', label: sessionTh(p.session) + ' 결과' });
  });
  const calMonth = APP.scheduleMonth || today.slice(0, 7);   // 'YYYY-MM'
  return `
    <div class="sec-h"><h2>🗓 ${t('sched_title')}</h2><span class="sub">${sch.year}</span></div>
    <div class="app-card"><p class="sub" style="font-size:12px;">${LANG === 'ko' ? sch.note : t('sched_note')}</p></div>

    <div class="sec-h"><h2>${t('sched_country')}</h2></div>
    <div class="app-card">
      <select id="schedule-country" style="width:100%;padding:12px;border:1.5px solid var(--border);border-radius:10px;font-size:15px;font-family:var(--font);" onchange="setScheduleCountry(this.value)">
        ${sch.countries.map(c => `<option value="${c.key}" ${c.key === sel ? 'selected' : ''}>${c.flag} ${c.name}</option>`).join('')}
      </select>
    </div>

    <!-- D-Day 요약 -->
    <div class="sec-h"><h2>${country.flag} ${country.name} · ${t('sched_dday')}</h2></div>
    <div class="app-card">
      <div class="dday-row">
        <div class="dday-pill ${regNear && regNear.st.key === 'reg_ing' ? 'hot' : ''}">
          <b>${regNear ? ddayStr(regNear.st.reg.end) : '—'}</b><span>${t('sched_reg_close')}</span>
        </div>
        <div class="dday-pill ${testNear && testNear.st.key === 'test_wait' ? 'warn' : ''}">
          <b>${testNear ? ddayStr(testNear.p.date) : '—'}</b><span>${t('sched_next_test')}</span>
        </div>
        <div class="dday-pill">
          <b>${resultNear ? ddayStr(resultNear.p.result) : '—'}</b><span>${t('sched_result')}</span>
        </div>
      </div>
      ${regNear ? `<div class="sub" style="font-size:11px;">${sessionTh(regNear.p.session)} · ${regNear.st.reg.start} ~ ${regNear.st.reg.end}</div>` : ''}
      ${resultNear ? `<div class="sub" style="font-size:11px;">${sessionTh(resultNear.p.session)} · ${resultNear.p.result}</div>` : ''}
    </div>

    <!-- 달력 -->
    <div class="sec-h"><h2>📅 ${t('sched_cal')}</h2>
      <span style="display:flex;gap:6px;">
        <button class="btn btn-ghost btn-sm" onclick="scheduleMonth(-1)">◀</button>
        <span style="font-size:13px;font-weight:800;color:var(--ios-blue);">${calMonth.slice(0,4)} · ${+calMonth.slice(5,7)}</span>
        <button class="btn btn-ghost btn-sm" onclick="scheduleMonth(1)">▶</button>
      </span>
    </div>
    <div class="app-card">
      ${calendarHTML(calMonth, events)}
      <div class="cal-legend">
        <span><i class="r1"></i>${t('sched_legend_reg')}</span><span><i class="r2"></i>${t('sched_legend_test')}</span><span><i class="r3"></i>${t('sched_legend_result')}</span>
      </div>
    </div>

    <!-- 회차별 상세 -->
    <div class="sec-h"><h2>${country.flag} ${country.name} · ${t('sched_sessions')}</h2><span class="sub">${country.cities}</span></div>
    ${rows.length ? rows.map(p => {
      const st = sessionStatus(p);
      const reg = st.reg;
      const d = p.date.split('-');
      const dow = ['일','월','화','수','목','금','토'][new Date(p.date + 'T00:00:00').getDay()];
      const statusTxt = st.key === 'done' ? t('status_done') : st.key === 'reg_ing' ? t('status_ing') : st.key === 'reg_open' ? t('status_open') : st.key === 'test_wait' ? t('status_wait') : t('status_result');
      return `
        <div class="app-card" style="${st.key === 'done' ? 'opacity:.5;' : ''}">
          <div class="row">
            <span class="mock-badge t2">${sessionTh(p.session)}</span>
            <span style="font-size:12px;font-weight:800;color:${st.key === 'reg_ing' ? 'var(--ios-green)' : st.key === 'test_wait' ? '#c78a00' : 'var(--ios-secondary-label)'};">${statusTxt}</span>
          </div>
          <div style="font-size:16px;font-weight:800;color:var(--ios-label);margin:8px 0 4px;">
            ${d[1]}월 ${d[2]}일 (${dow}) <span style="font-size:12px;color:var(--ios-secondary-label);font-weight:600;">${p.date.slice(0,4)}</span>
          </div>
          <div class="sub" style="font-size:12.5px;margin:3px 0;">🖥 ${LANG==='ko'?'접수':'Reg'}: <b>${p.reg}</b> ${reg && st.key !== 'done' && st.key !== 'result_wait' ? `<span style="color:var(--ios-blue);font-weight:700;">(${ddayStr(reg.end)})</span>` : ''}</div>
          <div class="sub" style="font-size:12.5px;margin:3px 0;">✏️ ${LANG==='ko'?'시험':'Exam'}: <b>${p.date}</b> ${st.key !== 'done' && st.key !== 'result_wait' ? `<span style="color:var(--ios-blue);font-weight:700;">(${ddayStr(p.date)})</span>` : ''}</div>
          <div class="sub" style="font-size:12.5px;margin:3px 0;">📄 ${LANG==='ko'?'결과':'Result'}: <b>${p.result}</b> ${st.key === 'result_wait' || st.key === 'test_wait' || st.key === 'reg_ing' ? `<span style="color:var(--ios-blue);font-weight:700;">(${ddayStr(p.result)})</span>` : ''}</div>
          <div class="sub" style="font-size:11.5px;margin-top:4px;">📍 ${country.cities} · ${country.reg}</div>
        </div>`;
    }).join('') : `<div class="app-card"><p class="sub">${LANG==='ko'?'이 나라에서는 아직 시행 정보가 없습니다.':'No sessions in this country yet.'}</p></div>`}

    <!-- 전체 회차 -->
    <div class="sec-h"><h2>📋 ${t('sched_all')}</h2></div>
    <div class="app-card">
      ${sch.pbt.map(p => {
        const st = sessionStatus(p);
        return `<div class="row" style="padding:6px 0;border-bottom:1px solid var(--border);${st.key==='done'?'opacity:.5':''}">
          <span style="font-size:13px;font-weight:700;">${sessionTh(p.session)}</span>
          <span style="font-size:13px;">${p.date.slice(5)}</span>
          <span class="sub" style="font-size:10.5px;">${st.label}</span>
          <span class="mock-badge ${p.overseas ? 't2' : 't1'}" style="font-size:9px;">${p.overseas ? '해외' : '한국'}</span>
        </div>`;}).join('')}
    </div>
    <div class="app-card">
      <b style="font-size:13px;color:var(--ios-blue);">${t('sched_ibt')}</b>
      ${sch.ibt.map(p => `<div class="row" style="padding:5px 0;border-bottom:1px solid var(--border);">
        <span style="font-size:12.5px;font-weight:700;">${sessionTh(p.session)}</span>
        <span style="font-size:12.5px;">${p.date.slice(5)}</span>
        <span class="sub" style="font-size:10.5px;">${LANG==='ko'?'결과':'Result'} ${p.result.slice(5)}</span>
      </div>`).join('')}
      <p class="sub" style="font-size:10.5px;margin-top:6px;">${LANG==='ko'?'IBT는 2026년 17개국 확대 예정 (한국 중심)':'IBT expanding to 17 countries in 2026 (Korea-centered)'}</p>
    </div>
  `;
}
function calendarHTML(ym, events) {
  // ym: 'YYYY-MM', events: [{date, type, label}]
  const [y, m] = ym.split('-').map(Number);
  const first = new Date(y, m - 1, 1);
  const startDow = first.getDay();                 // 0=일
  const daysInMonth = new Date(y, m, 0).getDate();
  const today = todayStr();
  const evByDate = {};
  events.forEach(e => { (evByDate[e.date] = evByDate[e.date] || []).push(e.type); });
  let html = `<table class="cal"><tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr><tr>`;
  for (let i = 0; i < startDow; i++) html += `<td class="empty"></td>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${ym}-${String(d).padStart(2, '0')}`;
    const cls = [ds === today ? 'today' : '', ds < today ? 'past' : ''].join(' ');
    const mks = (evByDate[ds] || []).slice(0, 3).map(t => `<span class="mk ${t}"></span>`).join('');
    html += `<td class="${cls}"><span class="day-num">${d}</span>${mks}</td>`;
    if ((startDow + d) % 7 === 0 && d < daysInMonth) html += `</tr><tr>`;
  }
  const trail = (startDow + daysInMonth) % 7;
  if (trail) for (let i = trail; i < 7; i++) html += `<td class="empty"></td>`;
  html += `</tr></table>`;
  return html;
}
function scheduleMonth(delta) {
  const cur = APP.scheduleMonth || todayStr().slice(0, 7);
  const [y, m] = cur.split('-').map(Number);
  const nd = new Date(y, m - 1 + delta, 1);
  APP.scheduleMonth = `${nd.getFullYear()}-${String(nd.getMonth() + 1).padStart(2, '0')}`;
  render();
}
function setScheduleCountry(k) { APP.scheduleCountry = k; localStorage.setItem(LS.country, k); const hs = $id('country-sel'); if (hs) hs.value = k; render(); }
function bindSchedule() {}

/* ================= USER MENU (account sheet) ================= */
function isAuthed() { return !!(window.isLoggedIn && isLoggedIn()); }
function currentUser() {
  const s = window.getSession && getSession();
  const p = window.getProfile && getProfile();
  const name = (p && (p.full_name || p.email)) || (s && s.user && s.user.email) || '';
  const email = (s && s.user && s.user.email) || (p && p.email) || '';
  return { name, email, initial: (name[0] || '?').toUpperCase() };
}
function refreshUserBtn() {
  const btn = $id('user-btn');
  if (!btn) return;
  if (isAuthed()) {
    const u = currentUser();
    btn.textContent = u.initial;
    btn.classList.add('authed');
    btn.title = u.name;
  } else {
    btn.textContent = '👤';
    btn.classList.remove('authed');
    btn.title = 'Account';
  }
}
function toggleUserMenu(ev) {
  if (ev && ev.stopPropagation) ev.stopPropagation();
  const menu = $id('user-menu'), ov = $id('user-menu-overlay');
  if (!menu) return;
  const open = menu.classList.contains('open');
  if (open) { closeUserMenu(); return; }
  renderUserMenu();
  menu.classList.add('open');
  if (ov) ov.classList.add('open');
}
function closeUserMenu() {
  const menu = $id('user-menu'), ov = $id('user-menu-overlay');
  if (menu) menu.classList.remove('open');
  if (ov) ov.classList.remove('open');
}
function renderUserMenu() {
  const host = $id('user-menu');
  if (!host) return;
  const authed = isAuthed();
  const u = currentUser();
  const streak = lsGet(LS.streak, { count: 0 });
  const acc = (() => { try { return accuracyStats().overall; } catch (e) { return 0; } })();
  const due = (() => { try { return dueCards().length; } catch (e) { return 0; } })();
  const head = authed ? `
    <div class="um-head">
      <span class="um-avatar">${esc(u.initial)}</span>
      <div class="um-id">
        <b>${esc(u.name || t('menu_account'))}</b>
        <span class="sub">${esc(u.email || t('menu_signed_in'))}</span>
      </div>
    </div>` : `
    <div class="um-head">
      <span class="um-avatar guest">👤</span>
      <div class="um-id">
        <b>${t('menu_guest')}</b>
        <span class="sub">${t('menu_signed_in')}</span>
      </div>
    </div>`;
  const stats = `
    <div class="um-stats">
      <div class="stat-box"><b>${streak.count}</b><span>${t('menu_streak')}</span></div>
      <div class="stat-box"><b>${acc}%</b><span>${t('menu_acc')}</span></div>
      <div class="stat-box"><b>L${xpProgress().lv}</b><span>${xpTotal()} XP</span></div>
    </div>`;
  const items = `
    <div class="um-item" onclick="go('progress');closeUserMenu()">${ic('progress',19)}<span>${t('menu_progress')}</span><em>→</em></div>
    <div class="um-item" onclick="go('schedule');closeUserMenu()">${ic('schedule',19)}<span>${t('menu_schedule')}</span><em>→</em></div>
    <div class="um-item" onclick="cycleTheme();renderUserMenu()">${ic('learn',19)}<span>${t('menu_theme')}</span><em>${THEME_ICONS[THEME]||'🌗'}</em></div>
    <div class="um-item">
      ${ic('learn',19)}<span>${t('menu_lang')}</span>
      <select class="um-select" onchange="setLang(this.value);renderUserMenu()">
        <option value="en" ${LANG==='en'?'selected':''}>English</option>
        <option value="ko" ${LANG==='ko'?'selected':''}>한국어</option>
        <option value="km" ${LANG==='km'?'selected':''}>ខ្មែរ</option>
      </select>
    </div>`;
  const footer = authed ? `
    <div class="um-item" onclick="syncUserData(this)">${ic('daily',19)}<span id="um-sync">${t('menu_sync')}</span><em>⇅</em></div>
    <div class="um-item danger" onclick="doLogout()">${ic('home',19)}<span>${t('menu_logout')}</span><em>→</em></div>` : `
    <a class="btn btn-primary" style="width:100%;margin-top:4px;" href="login.html">${t('menu_login')}</a>`;
  host.innerHTML = `<div class="um-handle"></div>${head}${stats}<div class="um-divider"></div>${items}${footer}`;
}
async function syncUserData(btnEl) {
  if (!isAuthed() || !window.getSupabase) return;
  const sb = getSupabase();
  const payload = {};
  [LS.progress, LS.wrong, LS.srs, LS.scores, LS.daily, LS.streak, LS.mockStatus, LS.country, LS.lang, LS.xp, LS.mylevel,
   'camnemi_topik_char', 'camnemi_topik_char_name'].forEach(k => {
    const v = localStorage.getItem(k);
    if (!v) return;
    try { payload[k] = JSON.parse(v); } catch (e) { payload[k] = v; }  // plain strings (lang/country)
  });
  const lbl = $id('um-sync');
  if (lbl) lbl.textContent = '…';
  try {
    const { error } = await sb.from('topik_user_data').upsert(
      { user_id: getSession().user.id, data: payload, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    );
    if (error) throw error;
    if (lbl) lbl.textContent = t('menu_synced');
    setTimeout(() => { if (lbl) lbl.textContent = t('menu_sync'); }, 1800);
  } catch (e) {
    if (lbl) lbl.textContent = t('menu_sync_err');
    console.warn('sync failed:', e.message);
  }
}
async function loadUserData() {
  // pull the user's synced data from Supabase and merge into localStorage
  if (!isAuthed() || !window.getSupabase) return;
  const sb = getSupabase();
  try {
    const { data, error } = await sb.from('topik_user_data').select('data').eq('user_id', getSession().user.id).maybeSingle();
    if (error || !data || !data.data) return;
    Object.keys(data.data).forEach(k => {
      const v = data.data[k];
      if (v === undefined || v === null) return;
      if (typeof v === 'object') localStorage.setItem(k, JSON.stringify(v));
      else if (k === LS.lang || k === LS.country) localStorage.setItem(k, v); // scalar prefs
    });
  } catch (e) { console.warn('loadUserData failed:', e.message); }
}
function doLogout() {
  closeUserMenu();
  if (window.logout) logout();
  else { localStorage.clear(); location.reload(); }
}

/* ---------- boot ---------- */
// expose for tests / debugging
window.APP = APP;
window.generateAI = generateAI;
document.addEventListener('DOMContentLoaded', () => {
  // init header selectors (country first so the D-day strip renders)
  initCountrySel();
  applyTheme();
  applyCharTheme();
  refreshUserBtn();
  // auth → refresh user button + pull synced data when signed in
  if (window.onAuthChange) {
    onAuthChange((session) => {
      refreshUserBtn();
      if (session) {
        syncCharFromAccount();
        loadUserData().then(() => { try { render(); } catch (e) {} });
      }
    });
    // in case initAuth already fired before this listener registered
    setTimeout(() => {
      if (isAuthed()) { refreshUserBtn(); syncCharFromAccount(); loadUserData().then(() => { try { render(); } catch (e) {} }); }
    }, 400);
  }
  // apply saved language: selector, nav labels, header, strip
  setLang(LANG);
  // PWA service worker (skip on file:// and non-https)
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  // deep-link support: app.html?tab=daily (or #daily) opens that tab
  const q = new URLSearchParams(location.search).get('tab');
  const h = (location.hash || '').replace('#', '');
  go(['home','reading','listening','writing','mock','my','daily','wrong','learn','progress','schedule','challenge'].includes(q) ? q : (['home','reading','listening','writing','mock','my','daily','wrong','learn','progress','schedule','challenge'].includes(h) ? h : 'home'));
  // demo mode for screenshots: ?tab=daily&demo=finish shows the score screen
  if (new URLSearchParams(location.search).get('demo') === 'finish') {
    setTimeout(() => {
      buildDaily();
      const today = todayStr();
      const all = lsGet(LS.daily, {});
      const done = {};
      APP.daily.forEach((qq, i) => {
        if (qq.section === 'writing') done[qq.id] = { w: '테스트 답변입니다. 건강을 위해 운동을 시작했습니다.' };
        else if (i % 5 === 1) done[qq.id] = (qq.correct + 1) % qq.options.length; // one wrong-ish
        else done[qq.id] = qq.correct;
      });
      all[today] = { qids: APP.daily.map(x => x.id), done, ai: false };
      lsSet(LS.daily, all);
      APP.dailyDone = false; APP.dailyIdx = 0; render();
      APP.dailyIdx = APP.daily.length - 1; finishDaily();
    }, 400);
  }
});
