/* Camnemi TOPIK — Level 4 question bank (TOPIK II 중급)
   Original questions mirroring official TOPIK II patterns.
   section: reading | listening
   level: 4 (Level 4 goal)
   type: pattern key used by the weak-spot analyzer
*/
window.LEVEL4_BANK = [
  // ---------- READING (Level 4) ----------
  {
    id: 'LV4R01', section: 'reading', type: 'comprehension', level: 4, points: 3,
    q: '다음 글을 읽고 내용과 같은 것을 고르십시오.', qGl: "Read the passage and choose the statement that matches it.",
    passage: '최근 여러 지방 자치 단체가 쓰레기 종량제 봉투 가격을 올렸다. 시는 쓰레기를 줄이기 위해서 가격을 올렸다고 밝혔다. 그러나 주민들은 생활비 부담이 커졌다며 반대하고 있다. 이에 따라 시는 주민 의견을 듣는 자리를 마련하기로 했다.',
    passageGl: "Recently, several local governments raised the price of standard garbage bags. The city said it raised the price to reduce waste. However, residents are opposing it, saying the cost of living has grown. Accordingly, the city decided to hold a meeting to hear residents' opinions.",
    options: [
      { t: '시는 주민들의 의견을 들을 예정이다', gl: 'The city plans to hear residents opinions' },
      { t: '주민들은 봉투 가격 인상을 반겼다', gl: 'Residents welcomed the price increase' },
      { t: '시는 봉투 가격을 처음으로 올렸다', gl: 'The city raised the price for the first time' },
      { t: '쓰레기가 줄어서 가격이 내려갔다', gl: 'The price went down because waste decreased' }
    ],
    correct: 0,
    explain: '주민들이 반대하자 시는 의견을 듣는 자리를 마련하기로 했으므로 ①이 맞다.',
    traps: [
      '② 주민들은 반대하고 있음',
      '③ 처음인지는 글에 없음',
      '④ 가격은 올랐지 내려가지 않음'
    ],
    tip: '내용 일치 문제는 인물(시/주민)과 행동을 짝지어 확인하라.',
    freq: 3, freqNote: 'TOPIK II 읽기 31~33 · 내용 일치'
  },
  {
    id: 'LV4R02', section: 'reading', type: 'comprehension', level: 4, points: 3,
    q: '다음 글을 읽고 내용과 같은 것을 고르십시오.', qGl: "Read the passage and choose the statement that matches it.",
    passage: '국립중앙박물관에서는 다음 달부터 조선 시대 생활 도구를 주제로 한 특별전을 연다. 관람료는 무료이지만 사전 예약을 해야 한다. 주말에는 인원이 제한되므로 일찍 예약하는 것이 좋다.',
    passageGl: "The National Museum of Korea is holding a special exhibition on daily tools of the Joseon period starting next month. Admission is free, but advance reservation is required. Since weekend capacity is limited, it is better to reserve early.",
    options: [
      { t: '특별전은 다음 주부터 시작된다', gl: 'The exhibition starts next week' },
      { t: '특별전을 보려면 예약이 필요하다', gl: 'A reservation is required to see the exhibition' },
      { t: '관람료를 내야 특별전을 볼 수 있다', gl: 'You must pay to see the exhibition' },
      { t: '주말에는 예약하지 않아도 된다', gl: 'No reservation is needed on weekends' }
    ],
    correct: 1,
    explain: '관람료는 무료지만 사전 예약을 해야 하므로 ②가 맞다.',
    traps: [
      '① 전시는 다음 달에 시작함',
      '③ 무료이므로 관람료는 없음',
      '④ 주말은 인원이 제한되어 예약이 더 필요함'
    ],
    tip: '"~지만" 앞뒤 조건(무료/예약)을 나눠 기억하면 일치 판단이 쉽다.',
    freq: 3, freqNote: 'TOPIK II 읽기 31~33 · 내용 일치'
  },
  {
    id: 'LV4R03', section: 'reading', type: 'main_idea', level: 4, points: 3,
    q: '다음 글의 중심 내용을 고르십시오.', qGl: "Choose the main idea of the passage.",
    passage: '요즘 많은 사람들이 스마트폰으로 뉴스를 본다. 그러나 깊이 있는 정보는 신문이나 책을 통해 얻을 때가 많다. 중요한 것은 어떤 매체를 쓰느냐가 아니라 정보를 비판적으로 보는 태도이다.',
    passageGl: "These days many people read the news on their smartphones. However, in-depth information is often obtained through newspapers or books. What matters is not which medium you use, but having an attitude of viewing information critically.",
    options: [
      { t: '스마트폰으로 뉴스를 보는 것은 위험하다', gl: 'Reading news on a phone is dangerous' },
      { t: '신문과 책은 이제 필요 없어졌다', gl: 'Newspapers and books are no longer needed' },
      { t: '정보를 비판적으로 보는 태도가 중요하다', gl: 'A critical attitude toward information matters' },
      { t: '뉴스는 아침에 보는 것이 좋다', gl: 'It is better to read the news in the morning' }
    ],
    correct: 2,
    explain: '글의 결론은 매체보다 정보를 비판적으로 보는 태도가 중요하다는 것이다.',
    traps: [
      '①② 본문 내용과 반대',
      '④ 아침 시청은 언급되지 않음'
    ],
    tip: '중심 내용은 "중요한 것은 ~이다"처럼 주장이 드러난 문장에서 찾는다.',
    freq: 3, freqNote: 'TOPIK II 읽기 31~33 · 중심 내용'
  },
  {
    id: 'LV4R04', section: 'reading', type: 'grammar', level: 4, points: 3,
    q: '다음 글의 (    )에 들어갈 말로 알맞은 것을 고르십시오.', qGl: "Choose the correct word for the blank.",
    passage: '사람마다 생각이 다르다. 상황에 (    ) 행동도 달라진다.',
    passageGl: "Everyone thinks differently. Behavior also changes depending on the situation.",
    options: [
      { t: '따르면', gl: 'if (one) follows' },
      { t: '따라서', gl: 'therefore' },
      { t: '따라', gl: 'depending on' },
      { t: '따르고', gl: 'follow and' }
    ],
    correct: 2,
    explain: '명사 뒤에 붙어 "그것에 의존하여"라는 뜻을 나타내는 -에 따라가 알맞다.',
    traps: [
      '① 따르면은 조건 연결어미',
      '② 따라서는 문장과 문장을 잇는 접속 부사',
      '④ 따르고는 나열의 뜻이라 어색함'
    ],
    tip: '-에 따라(서)는 명사와 함께 쓰여 "depending on"의 뜻이다.',
    freq: 4, freqNote: 'TOPIK II 읽기 34~39 · 문법'
  },
  {
    id: 'LV4R05', section: 'reading', type: 'grammar', level: 4, points: 3,
    q: '다음 글의 (    )에 들어갈 말로 알맞은 것을 고르십시오.', qGl: "Choose the correct word for the blank.",
    passage: '민수 씨는 한국어를 배우기 (    ) 매일 한국 친구와 이야기한다.',
    passageGl: "Minsu talks with his Korean friend every day in order to learn Korean.",
    options: [
      { t: '때문에', gl: 'because of' },
      { t: '동안에', gl: 'during' },
      { t: '대신에', gl: 'instead of' },
      { t: '위해서', gl: 'in order to' }
    ],
    correct: 3,
    explain: '목적을 나타내는 -기 위해서가 알맞다. 배우기 위해서 = "in order to learn".',
    traps: [
      '① 때문에는 원인을 나타냄',
      '② 동안에 = "during", 기간을 나타냄',
      '③ 대신에 = "instead of", 대체를 나타냄'
    ],
    tip: '목적은 -기 위해서, 원인은 -기 때문에로 구분하라.',
    freq: 4, freqNote: 'TOPIK II 읽기 34~39 · 문법'
  },
  {
    id: 'LV4R06', section: 'reading', type: 'vocab', level: 4, points: 3,
    q: '다음 중 밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오.', qGl: "Choose the word closest in meaning to the underlined part.",
    passage: '그 회사는 직원들의 의견을 <u>적극적으로</u> 반영해서 일이 잘 진행되고 있다.',
    passageGl: "The company actively reflects its employees' opinions, so work is going well.",
    options: [
      { t: '수동적으로', gl: 'passively' },
      { t: '형식적으로', gl: 'formally' },
      { t: '일시적으로', gl: 'temporarily' },
      { t: '능동적으로', gl: 'proactively' }
    ],
    correct: 3,
    explain: '적극적으로는 "능동적으로"와 의미가 가장 비슷하다.',
    traps: [
      '① 수동적으로는 반대 의미',
      '② 형식적으로 = 겉으로만, ③ 일시적으로 = 잠시 동안'
    ],
    tip: '동의어 문제는 접두사(수동/능동, 일시/영구)의 반의 관계를 먼저 본다.',
    freq: 3, freqNote: 'TOPIK II 읽기 어휘 문항'
  },
  {
    id: 'LV4R07', section: 'reading', type: 'notice', level: 4, points: 3,
    q: '다음을 읽고 안내 내용과 같은 것을 고르십시오.', qGl: "Read the notice and choose the statement that matches it.",
    passage: '이번 주 토요일 오전 9시부터 오후 1시까지 엘리베이터 점검이 있습니다. 점검 시간 동안에는 엘리베이터를 이용할 수 없습니다. 불편하시더라도 계단을 이용해 주시기 바랍니다.',
    passageGl: "Elevator inspection will take place this Saturday from 9 a.m. to 1 p.m. During the inspection hours, the elevator cannot be used. Please use the stairs even if it is inconvenient.",
    options: [
      { t: '점검은 일요일에 있다', gl: 'The inspection is on Sunday' },
      { t: '점검 시간에는 엘리베이터를 반만 쓸 수 있다', gl: 'The elevator can be used half the time during inspection' },
      { t: '점검은 오전 9시부터 오후 2시까지다', gl: 'The inspection runs from 9 a.m. to 2 p.m.' },
      { t: '점검하는 동안 계단을 이용해야 한다', gl: 'You must use the stairs during the inspection' }
    ],
    correct: 3,
    explain: '점검 시간 동안 엘리베이터를 쓸 수 없고 계단을 이용하라고 했으므로 ④가 맞다.',
    traps: [
      '① 토요일임',
      '② 이용 자체가 불가능함',
      '③ 오후 1시까지임'
    ],
    tip: '안내문 문제는 날짜, 시간, 제한 사항(이용 불가)을 표로 정리하라.',
    freq: 2, freqNote: 'TOPIK II 읽기 28~30 · 안내문'
  },
  {
    id: 'LV4R08', section: 'reading', type: 'order', level: 4, points: 3,
    q: '다음을 순서에 맞게 배열한 것을 고르십시오.', qGl: "Arrange the following in the correct order.",
    passage: '(가) 먼저 시장에서 필요한 재료를 샀다.<br>(나) 이제 집에서 김치찌개를 직접 만들어 보려고 한다.<br>(다) 그다음에 재료를 썰어서 냄비에 넣고 끓였다.<br>(라) 마지막으로 간을 맞추니 정말 맛있는 냄새가 났다.',
    passageGl: "(A) First I bought the needed ingredients at the market. (B) Now I plan to try making kimchi stew at home. (C) Next I cut the ingredients, put them in a pot, and boiled them. (D) Finally, when I seasoned it, a really delicious smell came out.",
    options: [
      { t: '(가) - (나) - (다) - (라)', gl: 'a - b - c - d' },
      { t: '(나) - (가) - (다) - (라)', gl: 'b - a - c - d' },
      { t: '(나) - (다) - (가) - (라)', gl: 'b - c - a - d' },
      { t: '(다) - (나) - (가) - (라)', gl: 'c - b - a - d' }
    ],
    correct: 1,
    explain: '계획(나) → 재료 구입(가) → 요리(다) → 완성(라)의 순서가 자연스럽다.',
    traps: [
      '① 재료를 사기 전에 요리 계획이 먼저임',
      '③ 재료를 사기 전에 썰 수 없음',
      '④ 간을 맞추는 것은 마지막임'
    ],
    tip: '순서 문제는 시간 표현(먼저/그다음/마지막)을 단서로 삼는다.',
    freq: 2, freqNote: 'TOPIK II 읽기 43~45 · 순서'
  },
  {
    id: 'LV4R09', section: 'reading', type: 'long', level: 4, points: 3,
    q: '다음 글을 읽고 내용과 같은 것을 고르십시오.', qGl: "Read the passage and choose the statement that matches it.",
    passage: '한 연구 결과에 따르면 사람들은 아침에 기분이 좋을수록 하루 일을 더 효율적으로 처리한다고 한다. 연구팀은 직장인 500명을 대상으로 한 달 동안 기분과 업무 효율을 조사했다. 그 결과 아침에 산책을 하거나 음악을 듣는 사람들의 기분이 더 좋은 것으로 나타났다. 연구팀은 이 결과를 통해 아침 습관의 중요성을 알게 되었다.',
    passageGl: "According to one study, the better people feel in the morning, the more efficiently they handle the day's work. The research team surveyed 500 office workers about their mood and work efficiency for one month. As a result, people who take a walk or listen to music in the morning showed better moods. Through this result, the research team came to realize the importance of morning habits.",
    options: [
      { t: '아침에 기분이 좋으면 업무 효율이 높아진다', gl: 'A good mood in the morning raises work efficiency' },
      { t: '연구팀은 직장인 500명을 한 번만 조사했다', gl: 'The team surveyed 500 workers only once' },
      { t: '아침에 산책하는 사람은 업무 효율이 낮았다', gl: 'Morning walkers had low work efficiency' },
      { t: '기분과 업무 효율은 관계가 없다', gl: 'Mood and work efficiency are unrelated' }
    ],
    correct: 0,
    explain: '기분이 좋을수록 일을 효율적으로 처리한다는 연구 결과가 핵심이다.',
    traps: [
      '② 한 달 동안 조사했음',
      '③ 산책하는 사람들의 기분이 더 좋았음',
      '④ 관계가 있다는 내용임'
    ],
    tip: '긴 지문은 문단 첫 문장(주장)과 결과 문장에 밑줄을 그으며 읽는다.',
    freq: 2, freqNote: 'TOPIK II 읽기 46~50 · 긴 지문'
  },
  {
    id: 'LV4R10', section: 'reading', type: 'detail', level: 4, points: 3,
    q: '다음 책 소개를 읽고 이 책에서 알 수 없는 것을 고르십시오.', qGl: "Read the book introduction and choose what you CANNOT learn from it.",
    passage: '이 책은 한국의 전통 시장을 소개하는 안내서이다. 책에는 시장의 역사와 유명한 음식점, 물건을 싸게 사는 방법이 담겨 있다. 특히 3장에서는 지역별로 다른 시장의 특징을 비교해서 설명한다.',
    passageGl: "This book is a guide introducing Korea's traditional markets. It contains the history of markets, famous restaurants, and ways to buy things cheaply. In particular, chapter 3 compares and explains the different characteristics of markets by region.",
    options: [
      { t: '시장의 역사', gl: 'the history of markets' },
      { t: '유명한 음식점 정보', gl: 'information on famous restaurants' },
      { t: '지역별 시장의 특징', gl: 'market features by region' },
      { t: '외국인 관광객의 방문 후기', gl: 'reviews from foreign tourists' }
    ],
    correct: 3,
    explain: '책의 내용은 역사, 음식점, 싸게 사는 방법, 지역별 비교이며 방문 후기는 언급되지 않았다.',
    traps: [
      '①②③ 모두 책에 담긴 내용임'
    ],
    tip: '"알 수 없는 것" 문제는 지문에 나온 정보를 모두 지운 뒤 남는 것을 고른다.',
    freq: 2, freqNote: 'TOPIK II 읽기 46~50 · 세부 정보'
  },

  // ---------- LISTENING (Level 4) ----------
  {
    id: 'LV4L01', section: 'listening', type: 'topic', level: 4, points: 3,
    q: '다음을 듣고 두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.', qGl: "Listen and choose what the two people are talking about.",
    audioHint: '(듣기 음원 준비 중 — 대본: "남자: 요즘 뉴스를 보면 전기차 충전소가 많이 늘었더라고요. / 여자: 맞아요. 전기차를 사는 사람이 늘면서 충전소도 함께 늘어난 것 같아요. / 남자: 그래도 아직 부족하다는 이야기가 있던데요.")',
    options: [
      { t: '전기차 가격', gl: 'the price of EVs' },
      { t: '전기차 디자인', gl: 'EV design' },
      { t: '전기차 충전소', gl: 'EV charging stations' },
      { t: '전기차 보험', gl: 'EV insurance' }
    ],
    correct: 2,
    explain: '두 사람은 충전소가 늘었다는 것과 여전히 부족하다는 것을 이야기하고 있다.',
    traps: [
      '①②④ 대화에 등장하지 않음'
    ],
    tip: '주제 문제는 양쪽 화자가 공통으로 언급하는 단어를 찾는다.',
    freq: 3, freqNote: 'TOPIK II 듣기 7~10 · 주제'
  },
  {
    id: 'LV4L02', section: 'listening', type: 'topic', level: 4, points: 3,
    q: '다음을 듣고 두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.', qGl: "Listen and choose what the two people are talking about.",
    audioHint: '(듣기 음원 준비 중 — 대본: "남자: 다음 달에 회사가 이사를 한대요. / 여자: 어디로 이사하는데요? / 남자: 시청역 근처로 옮긴대요. 출퇴근이 훨씬 편해질 것 같아요. / 여자: 정말요? 그럼 좋겠네요.")',
    options: [
      { t: '새 직원 채용', gl: 'hiring new staff' },
      { t: '회사 이사', gl: 'the company move' },
      { t: '출장 계획', gl: 'a business trip plan' },
      { t: '회식 장소', gl: 'a dinner venue' }
    ],
    correct: 1,
    explain: '회사가 시청역 근처로 이사한다는 이야기를 주고받고 있다.',
    traps: [
      '①③④ 대화에 언급되지 않음'
    ],
    tip: '첫 화자의 첫 문장이 대화의 주제인 경우가 많다.',
    freq: 3, freqNote: 'TOPIK II 듣기 7~10 · 주제'
  },
  {
    id: 'LV4L03', section: 'listening', type: 'intent', level: 4, points: 3,
    q: '다음을 듣고 남자가 이어서 할 행동으로 알맞은 것을 고르십시오.', qGl: "Listen and choose what the man will do next.",
    audioHint: '(듣기 음원 준비 중 — 대본: "여자: 이 책 좀 봐 주시겠어요? 다음 주에 발표가 있어서요. / 남자: 그래요? 시간이 있으면 읽어 보겠습니다. / 여자: 네, 시간 나실 때 천천히 읽어 주세요.")',
    options: [
      { t: '여자의 발표 자료를 읽어 본다', gl: "read the woman's presentation draft" },
      { t: '자신의 발표를 준비한다', gl: 'prepare his own presentation' },
      { t: '새 책을 사러 간다', gl: 'go to buy a new book' },
      { t: '발표 날짜를 바꾼다', gl: 'change the presentation date' }
    ],
    correct: 0,
    explain: '남자가 "시간이 있으면 읽어 보겠습니다"라고 했으므로 발표 자료를 읽어 볼 것이다.',
    traps: [
      '②③④ 대화 내용과 관련 없음'
    ],
    tip: '행동 문제는 "-ㄹ게요/-겠습니다"처럼 의지를 나타내는 표현을 듣는다.',
    freq: 3, freqNote: 'TOPIK II 듣기 15~16 · 행동'
  },
  {
    id: 'LV4L04', section: 'listening', type: 'intent', level: 4, points: 3,
    q: '다음을 듣고 남자의 의도로 알맞은 것을 고르십시오.', qGl: "Listen and choose what the man intends to do.",
    audioHint: '(듣기 음원 준비 중 — 대본: "남자: 이번 주말에 등산 갈래요? / 여자: 저는 이번 주말에 할 일이 많아서요. / 남자: 그래요? 그럼 다음 주말은 어때요? / 여자: 다음 주말도 조금 바쁠 것 같아요.")',
    options: [
      { t: '여자의 일을 도와주겠다고 한다', gl: 'offers to help her work' },
      { t: '약속을 취소하자고 한다', gl: 'suggests cancelling the plan' },
      { t: '등산 장비를 사자고 한다', gl: 'suggests buying hiking gear' },
      { t: '등산에 함께 가자고 권한다', gl: 'invites her to go hiking' }
    ],
    correct: 3,
    explain: '남자는 주말을 바꿔 가며 등산을 권유하고 있으므로 의도는 초대이다.',
    traps: [
      '①②③ 대화에 나타나지 않음'
    ],
    tip: '의도 문제는 "~ㄹ래요? / ~는 게 어때요?" 같은 권유 표현에 주목한다.',
    freq: 3, freqNote: 'TOPIK II 듣기 15~16 · 의도'
  },
  {
    id: 'LV4L05', section: 'listening', type: 'detail', level: 4, points: 3,
    q: '다음을 듣고 프로젝트의 마감일을 고르십시오.', qGl: "Listen and choose the project deadline.",
    audioHint: '(듣기 음원 준비 중 — 대본: "남자: 김 대리, 이번 프로젝트는 언제까지 해야 해요? / 여자: 다음 주 금요일까지예요. 그런데 아직 자료가 반밖에 모이지 않았어요. / 남자: 그럼 서둘러야겠네요.")',
    options: [
      { t: '이번 주 금요일', gl: 'this Friday' },
      { t: '다음 주 금요일', gl: 'next Friday' },
      { t: '다음 달 금요일', gl: 'next month Friday' },
      { t: '이번 달 월요일', gl: 'this month Monday' }
    ],
    correct: 1,
    explain: '여자가 "다음 주 금요일까지예요"라고 마감일을 직접 말했다.',
    traps: [
      '① "다음 주"를 "이번 주"로 잘못 들으면 오답',
      '③④ 대화에 없는 시기'
    ],
    tip: '날짜 문제는 "~까지"가 붙은 표현을 정확히 메모하라.',
    freq: 3, freqNote: 'TOPIK II 듣기 11~14 · 세부 정보'
  },
  {
    id: 'LV4L06', section: 'listening', type: 'detail', level: 4, points: 3,
    q: '다음을 듣고 남자가 주문한 것을 고르십시오.', qGl: "Listen and choose what the man ordered.",
    audioHint: '(듣기 음원 준비 중 — 대본: "여자: 손님, 주문하시겠어요? / 남자: 네, 냉면 하나 주세요. 그리고 김치전도 하나 주세요. / 여자: 네, 김치전은 10분 정도 걸립니다.")',
    options: [
      { t: '냉면과 김치전', gl: 'cold noodles and kimchi pancake' },
      { t: '냉면과 비빔밥', gl: 'cold noodles and bibimbap' },
      { t: '김치전과 막걸리', gl: 'kimchi pancake and makgeolli' },
      { t: '냉면 하나만', gl: 'cold noodles only' }
    ],
    correct: 0,
    explain: '남자는 냉면 하나와 김치전 하나를 주문했다.',
    traps: [
      '②③ 음식 하나가 다르거나 없음',
      '④ 김치전도 주문했음'
    ],
    tip: '주문 문제는 메뉴 이름을 들으며 하나씩 체크하라.',
    freq: 3, freqNote: 'TOPIK II 듣기 11~14 · 세부 정보'
  },
  {
    id: 'LV4L07', section: 'listening', type: 'reply', level: 4, points: 3,
    q: '다음을 듣고 여자의 응답으로 알맞은 것을 고르십시오.', qGl: "Listen and choose the woman's most appropriate reply.",
    audioHint: '(듣기 음원 준비 중 — 대본: "여자: 김 선생님, 아이가 열이 많이 나서 내일 수업에 못 갈 것 같아요. / 남자: 그래요? 괜찮아요. 아이부터 잘 돌보세요. / 여자: (    )")',
    options: [
      { t: '네, 내일 봬요', gl: 'OK, see you tomorrow' },
      { t: '수업을 취소하세요', gl: 'please cancel the class' },
      { t: '네, 그렇게 하겠습니다', gl: 'OK, I will do that' },
      { t: '아이를 데리고 나오세요', gl: 'please bring the child along' }
    ],
    correct: 2,
    explain: '남자가 아이를 잘 돌보라고 했으므로 "그렇게 하겠습니다"가 자연스러운 응답이다.',
    traps: [
      '① 내일 수업에 못 가므로 어색함',
      '②④ 상대에게 명령하는 표현이라 부적절함'
    ],
    tip: '응답 문제는 앞사람의 조언·부탁을 받아들이는 말이 정답인 경우가 많다.',
    freq: 3, freqNote: 'TOPIK II 듣기 7~10 · 응답'
  },
  {
    id: 'LV4L08', section: 'listening', type: 'reply', level: 4, points: 3,
    q: '다음을 듣고 남자의 응답으로 알맞은 것을 고르십시오.', qGl: "Listen and choose the man's most appropriate reply.",
    audioHint: '(듣기 음원 준비 중 — 대본: "남자: 이 가방 얼마예요? / 여자: 원래 3만 원인데 지금 세일해서 2만 원이에요. / 남자: 그럼 (    )")',
    options: [
      { t: '이걸로 주세요', gl: 'I will take this one' },
      { t: '더 비싼 걸 보여 주세요', gl: 'show me something more expensive' },
      { t: '가격이 너무 비싸네요', gl: 'the price is too expensive' },
      { t: '여기가 어디예요', gl: 'where is this place' }
    ],
    correct: 0,
    explain: '세일 가격을 들은 뒤 "이걸로 주세요"라고 구매 의사를 밝히는 것이 자연스럽다.',
    traps: [
      '② 세일 가격이 싸다고 했으므로 어색함',
      '③④ 상황과 무관한 응답'
    ],
    tip: '가격을 묻는 대화의 응답은 구매 또는 거절로 이어진다.',
    freq: 3, freqNote: 'TOPIK II 듣기 7~10 · 응답'
  },
  {
    id: 'LV4L09', section: 'listening', type: 'place', level: 4, points: 3,
    q: '다음을 듣고 남자가 이어서 갈 곳을 고르십시오.', qGl: "Listen and choose where the man will go next.",
    audioHint: '(듣기 음원 준비 중 — 대본: "여자: 오늘 저녁은 뭐 먹을까요? / 남자: 냉장고에 아무것도 없어서 장을 봐야 해요. / 여자: 그럼 저녁은 어떻게 하지요? / 남자: 제가 퇴근하면서 시장에 들렀다 올게요. / 여자: 고마워요. 그럼 저는 집에서 청소할게요.")',
    options: [
      { t: '시장', gl: 'the market' },
      { t: '회사', gl: 'the office' },
      { t: '병원', gl: 'the hospital' },
      { t: '은행', gl: 'the bank' }
    ],
    correct: 0,
    explain: '남자가 "퇴근하면서 시장에 들렀다 올게요"라고 했으므로 다음에 갈 곳은 시장이다.',
    traps: [
      '② 퇴근 후이므로 회사가 아님',
      '③④ 대화에 언급되지 않음'
    ],
    tip: '장소 문제는 이동 동사(들르다, 가다, 오다)와 함께 나온 명사를 듣는다.',
    freq: 2, freqNote: 'TOPIK II 듣기 11~14 · 장소'
  },
  {
    id: 'LV4L10', section: 'listening', type: 'main_idea', level: 4, points: 3,
    q: '다음을 듣고 남자의 생각으로 알맞은 것을 고르십시오.', qGl: "Listen and choose the statement that matches the man's opinion.",
    audioHint: '(듣기 음원 준비 중 — 대본: "남자: 요즘 아이들이 밖에서 노는 시간이 점점 줄고 있어요. / 여자: 맞아요. 대신 스마트폰 게임을 하는 시간이 늘었죠. / 남자: 아이들이 건강하게 자라려면 밖에서 뛰어노는 시간이 꼭 필요하다고 생각해요.")',
    options: [
      { t: '아이들은 밖에서 뛰어놀아야 한다', gl: 'children should play outside' },
      { t: '아이들은 스마트폰 게임을 좋아한다', gl: 'children like smartphone games' },
      { t: '스마트폰은 아이에게 해롭다', gl: 'smartphones are harmful to children' },
      { t: '밖에서 노는 시간이 늘었다', gl: 'outdoor play time has increased' }
    ],
    correct: 0,
    explain: '남자는 아이들이 건강하게 자라려면 밖에서 뛰어노는 시간이 필요하다고 생각한다.',
    traps: [
      '② 여자의 말일 뿐 남자의 생각이 아님',
      '③ 해롭다는 직접적 표현은 없음',
      '④ 실제로는 줄고 있다고 함'
    ],
    tip: '생각 문제는 "~다고 생각해요 / ~아야 한다"로 끝나는 화자의 말을 듣는다.',
    freq: 3, freqNote: 'TOPIK II 듣기 7~10 · 중심 내용'
  }
];
