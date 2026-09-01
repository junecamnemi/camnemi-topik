/* Camnemi TOPIK — TOPIK II question bank (Levels 3–6)
   Original questions mirroring official TOPIK II patterns.
   section: reading | listening | writing
   level: 3 (Level 3 goal) — stars shown as difficulty
   type: pattern key used by the weak-spot analyzer
*/
window.TOPIK2_BANK = [
  // ---------- READING (Level 3) ----------
  {
    id: 'T2R001', section: 'reading', type: 'grammar', level: 3, points: 3,
    q: '다음 중 알맞은 것을 고르십시오.',
    passage: '날씨가 너무 더워서 에어컨을 (    ) 못했어요.',
    options: [
      { t: '켜지고', gl: 'turn on & continue' },
      { t: '켜다가', gl: 'while turning on' },
      { t: '켜지는데', gl: 'but turning on' },
      { t: '켜다니', gl: 'heard that (it) turns on' }
    ],
    correct: 1,
    explain: '켜다가 = "while/and then (doing)" — the action is interrupted or its result continues. 더워서 켜다가 못했어요 = "it was so hot (I) started to turn it on but couldn\'t".',
    traps: [
      '켜지고 = "turn on and" — needs a following completed action',
      '켜지는데 = "but (it) turns on" — wrong subject/contrast',
      '켜다니 = "I heard (you) turn on" — hearsay, wrong meaning'
    ],
    tip: '-다가 means an action stops mid-way or switches: 공부하다가 = "while studying (then…)".',
    freq: 6, freqNote: 'TOPIK II 읽기 34~39 · 연결어미'
  },
  {
    id: 'T2R002', section: 'reading', type: 'vocab', level: 3, points: 3,
    q: '다음 중 밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오.',
    passage: '그는 회의 시간에 <u>대충</u> 설명해서 동료들이 다시 물어봤다.',
    options: [
      { t: '자세히', gl: 'in detail' },
      { t: '대강', gl: 'roughly / carelessly' },
      { t: '분명히', gl: 'clearly' },
      { t: '정확히', gl: 'exactly' }
    ],
    correct: 1,
    explain: '대충 = 대강 (roughly, without care). He explained roughly so colleagues asked again.',
    traps: [
      '자세히 / 정확히 are opposites — detailed, not careless',
      '분명히 = clearly — doesn\'t match the careless nuance'
    ],
    tip: 'TOPIK II 어휘 동의어는 3~5급 어휘 대치가 핵심.',
    freq: 4, freqNote: 'TOPIK II 읽기 어휘 문항'
  },
  {
    id: 'T2R003', section: 'reading', type: 'main_idea', level: 3, points: 3,
    q: '다음 글의 중심 내용을 고르십시오.',
    passage: '요즘 많은 사람들이 스마트폰을 보면서 걸어 다닌다. 길을 걸으면서 스마트폰을 보면 주변을 제대로 볼 수 없어서 사고가 날 위험이 크다. 따라서 길을 걸을 때는 스마트폰을 보지 않는 것이 좋다.',
    options: [
      { t: '스마트폰은 생활에 꼭 필요하다', gl: 'smartphones are essential' },
      { t: '걸을 때 스마트폰 사용은 위험하다', gl: 'using phones while walking is dangerous' },
      { t: '사고가 나는 이유는 길이 나쁘기 때문이다', gl: 'accidents happen because of bad roads' },
      { t: '스마트폰을 보는 사람이 점점 많아진다', gl: 'more people look at phones' }
    ],
    correct: 1,
    explain: '핵심은 "따라서" 뒤의 결론: 걸을 때 스마트폰을 보지 말 것 → 사용이 위험하다.',
    traps: [
      '① ③ ④ are details, not the main conclusion'
    ],
    tip: '중심 내용 문제는 "따라서/그래서/그러니까" 뒤 문장을 보라.',
    freq: 3, freqNote: 'TOPIK II 읽기 31~33 · 중심 내용'
  },
  {
    id: 'T2R004', section: 'reading', type: 'order', level: 3, points: 3,
    q: '다음을 순서에 맞게 배열한 것을 고르십시오.',
    passage: '(가) 그래서 그날부터 아침마다 운동을 시작했다.<br>(나) 건강 검진에서 몸이 나쁘다는 말을 들었다.<br>(다) 처음에는 힘들었지만 지금은 몸이 가벼워졌다.<br>(라) 운동하는 것이 몸에 좋다는 것을 알게 되었다.',
    options: [
      { t: '(나) - (라) - (가) - (다)', gl: 'b - d - a - c' },
      { t: '(나) - (가) - (라) - (다)', gl: 'b - a - d - c' },
      { t: '(가) - (나) - (다) - (라)', gl: 'a - b - c - d' },
      { t: '(라) - (가) - (나) - (다)', gl: 'd - a - b - c' }
    ],
    correct: 0,
    explain: '순서: 검진 결과(나) → 운동이 좋다는 걸 알고(라) → 시작(가) → 결과(다).',
    traps: [
      '②는 라가 빠진 채 바로 시작해 자연스럽지 않음',
      '③④는 인과가 뒤집힘'
    ],
    tip: '시간 순서 + 인과(그래서/그러니까) 단서를 먼저 찾는다.',
    freq: 2, freqNote: 'TOPIK II 읽기 57~58 · 순서 배열'
  },
  {
    id: 'T2R005', section: 'reading', type: 'sentence_pos', level: 3, points: 3,
    q: '다음 글에서 (    )에 들어갈 문장으로 알맞은 것을 고르십시오.',
    passage: '요즘 직장인들은 점심시간에 혼자 식사하는 경우가 많다. (    ) 그런 사람들을 위해 혼자 밥을 먹는 모임이 생겨났다.',
    options: [
      { t: '혼자 먹는 것이 오히려 편하다고 생각하는 사람들도 있다', gl: 'some find eating alone more comfortable' },
      { t: '점심시간이 너무 짧아서 불편하다', gl: 'lunchtime is too short' },
      { t: '회사 근처에 좋은 식당이 많다', gl: 'many good restaurants nearby' },
      { t: '점심값이 계속 올라가고 있다', gl: 'lunch prices keep rising' }
    ],
    correct: 0,
    explain: '다음 문장의 "그런 사람들" = 혼자 먹는 것을 편하게 생각하는 사람들.',
    traps: [
      '②③④는 "그런 사람들"을 받을 수 없음'
    ],
    tip: '빈칸 앞뒤의 지시어(그런/이런)가 정답의 단서.',
    freq: 2, freqNote: 'TOPIK II 읽기 59~60 · 문장 위치'
  },

  // ---------- LISTENING (Level 3) ----------
  {
    id: 'T2L001', section: 'listening', type: 'topic', level: 3, points: 3,
    q: '다음을 듣고 남자가 하는 말의 중심 내용을 고르십시오.',
    audioHint: '(듣기 음원 준비 중 — 대본: "요즘 지하철 요금이 올랐지요? 대신 정기권을 사면 20%나 싸집니다. 많이 타시는 분들은 정기권을 이용하세요.")',
    options: [
      { t: '지하철 요금이 내려갔다', gl: 'subway fare went down' },
      { t: '정기권을 이용하면 이득이다', gl: 'using a commuter pass is beneficial' },
      { t: '버스를 타는 것이 좋다', gl: 'taking the bus is better' },
      { t: '정기권은 사지 못한다', gl: 'you can\'t buy a pass' }
    ],
    correct: 1,
    explain: '남자는 "대신 정기권을 사면 20%나 싸집니다"라고 권유 → 중심 내용은 정기권 이용의 이득.',
    traps: [
      '① 반대(올랐다), ③ 버스 언급 없음, ④ 반대'
    ],
    tip: '듣기 중심 내용은 "대신/그래서/그러니까" 뒤 권유·결론에 주목.',
    freq: 4, freqNote: 'TOPIK II 듣기 7~10 · 중심 내용'
  },
  {
    id: 'T2L002', section: 'listening', type: 'intent', level: 3, points: 3,
    q: '다음을 듣고 여자가 할 행동으로 알맞은 것을 고르십시오.',
    audioHint: '(듣기 음원 준비 중 — 대본: "남자: 오늘 회의 자료 다 만들었어요? / 여자: 아직이에요. 지금 바로 만들게요.")',
    options: [
      { t: '회의를 취소한다', gl: 'cancel the meeting' },
      { t: '자료를 만든다', gl: 'make the materials' },
      { t: '회의실을 예약한다', gl: 'book the meeting room' },
      { t: '퇴근한다', gl: 'go home' }
    ],
    correct: 1,
    explain: '"지금 바로 만들게요" = 여자가 지금 자료를 만들겠다는 의도.',
    traps: [
      '①③④ 대본에 없음'
    ],
    tip: '행동 문제는 마지막 대답(-게요/-ㄹ게요)을 듣는다.',
    freq: 3, freqNote: 'TOPIK II 듣기 15~16 · 행동'
  },

  // ---------- WRITING (Level 3) ----------
  {
    id: 'T2W001', section: 'writing', type: 'writing_short', level: 3, points: 10,
    q: '다음을 읽고 150~200자로 답하십시오.',
    passage: '"건강을 지키기 위해 가장 중요한 것은 무엇이라고 생각합니까?" 자신의 경험을 바탕으로 한 문단을 쓰십시오.',
    writePrompt: true,
    answerModel: '건강을 지키기 위해 가장 중요한 것은 규칙적인 운동이라고 생각합니다. 저는 작년에 몸이 아파서 병원에 다닌 적이 있습니다. 그때 의사 선생님이 운동이 부족하다고 하셨습니다. 그래서 그때부터 아침마다 30분씩 걷기 운동을 시작했습니다. 처음에는 힘들었지만 지금은 몸이 훨씬 가벼워졌고 감기에도 잘 걸리지 않습니다. 앞으로도 계속 운동을 하면서 건강을 지키고 싶습니다.',
    explain: '쓰기 채점 기준: 주제 부합(운동) + 구조(경험→변화→결심) + 문법 정확성.',
    traps: [],
    tip: 'TOPIK II 쓰기 51번은 150~200자 문단 완성. 서론 1문장 + 경험 2문장 + 결론 1문장 구조.',
    freq: 1, freqNote: 'TOPIK II 쓰기 51번'
  },
  {
    id: 'T2W002', section: 'writing', type: 'writing_letter', level: 3, points: 20,
    q: '다음을 읽고 편지를 쓰십시오.',
    passage: '친구가 생일 선물로 책을 보냈습니다. 친구에게 감사하는 편지를 쓰십시오. (200~300자)',
    writePrompt: true,
    answerModel: '○○야, 안녕? 생일 선물로 책을 보내줘서 정말 고마워. 나는 요즘 한국어를 공부하고 있는데 네가 보내준 책이 정말 도움이 많이 되고 있어. 특히 소설이라서 재미있게 읽을 수 있었어. 다음에 만나면 내가 생각한 것을 꼭 이야기해 줄게. 네 덕분에 좋은 선물을 받아서 기분이 좋아. 우리 다음에 꼭 만나자. 건강 조심하고. 안녕!',
    explain: '편지 형식(인사→감사→근황→마무리) + 정중한 반말/존댓말 일관성이 채점 포인트.',
    traps: [],
    tip: '편지는 ①인사 ②감사의 이유 ③근황 ④마무리 인사 순서.',
    freq: 1, freqNote: 'TOPIK II 쓰기 52번'
  }
];
