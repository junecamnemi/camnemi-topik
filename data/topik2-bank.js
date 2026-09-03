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
    q: '다음 중 알맞은 것을 고르십시오.', qGl: "Choose the correct one.",
    passage: '날씨가 너무 더워서 에어컨을 (    ) 못했어요.', passageGl: "It was so hot that I couldn’t turn on the air conditioner.",
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
    optExplain: [
      '① "켜지고"는 "켜고 나서"처럼 다음 동작이 이어질 때 써요. 그런데 뒤에 "못했어요"가 와서 동작이 완결되지 않았어요. 그래서 오답이에요.',
      '②가 정답이에요. "-다가"는 어떤 동작을 하다가 중단하거나 다른 동작으로 바뀔 때 써요. "켜다가 못했어요"는 켜려다가 못 했다는 뜻이 돼요.',
      '③ "켜지는데"는 "켜지지만"이라는 대조의 뜻이에요. 주어와 연결도 어색하고 "못했어요"와 어울리지 않아요. 그래서 틀렸어요.',
      '④ "켜다니"는 "켠다는 말을 들었다"는 전달·의외의 뜻이에요. 문장의 뜻과 맞지 않아요. 그래서 오답이에요.'
    ],
    optExplainEn: [
      'Option ① "켜지고" is used when one action is completed and then the next action follows. Here "못했어요" follows, meaning the action was not completed, so this is wrong.',
      'Option ② is the correct answer. "-다가" is used when an action is interrupted or changes to another action. "켜다가 못했어요" means he tried to turn it on but could not.',
      'Option ③ "켜지는데" expresses contrast ("but it turns on"). The subject connection is awkward and it does not fit with "못했어요", so this is incorrect.',
      'Option ④ "켜다니" expresses hearsay or surprise ("I heard that it turns on"). It does not match the meaning of the sentence, so this is wrong.',
    ],
    tipEn: '-다가 means an action stops mid-way or switches, e.g. 공부하다가 = while studying (then...).',
    freq: 6, freqNote: 'TOPIK II 읽기 34~39 · 연결어미'
  },
  {
    id: 'T2R002', section: 'reading', type: 'vocab', level: 3, points: 3,
    q: '다음 중 밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오.', qGl: "Choose the one closest in meaning to the underlined part.",
    passage: '그는 회의 시간에 <u>대충</u> 설명해서 동료들이 다시 물어봤다.', passageGl: "He explained roughly in the meeting, so his colleagues asked again.",
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
    optExplain: [
      '① "자세히"는 아주 상세하게 한다는 뜻이에요. 대충과는 반대 의미예요. 동료들이 다시 물어봤다는 건 설명이 부족했다는 뜻이니까 오답이에요.',
      '②가 정답이에요. "대충"과 "대강"은 둘 다 자세히 하지 않고 적당히 한다는 뜻이에요. 의미가 같아요.',
      '③ "분명히"는 확실하고 뚜렷하다는 뜻이에요. 대충 설명한 것과 반대예요. 그래서 틀렸어요.',
      '④ "정확히"는 틀림없이 맞다는 뜻이에요. 대충과는 반대 의미라서 오답이에요.'
    ],
    optExplainEn: [
      'Option ① "자세히" means doing something in great detail. It is the opposite of 대충. The colleagues asked again because the explanation was insufficient, so this is wrong.',
      'Option ② is the correct answer. "대충" and "대강" both mean doing something roughly without care, so their meanings are the same.',
      'Option ③ "분명히" means clearly and distinctly. It is the opposite of explaining roughly, so this is incorrect.',
      'Option ④ "정확히" means exactly and without error. It is the opposite meaning of 대충, so this is wrong.',
    ],
    tipEn: 'TOPIK II vocabulary synonym questions focus on swapping words at the 3rd–5th level.',
    freq: 4, freqNote: 'TOPIK II 읽기 어휘 문항'
  },
  {
    id: 'T2R003', section: 'reading', type: 'main_idea', level: 3, points: 3,
    q: '다음 글의 중심 내용을 고르십시오.', qGl: "Choose the main idea of the passage.",
    passage: '요즘 많은 사람들이 스마트폰을 보면서 걸어 다닌다. 길을 걸으면서 스마트폰을 보면 주변을 제대로 볼 수 없어서 사고가 날 위험이 크다. 따라서 길을 걸을 때는 스마트폰을 보지 않는 것이 좋다.', passageGl: "These days many people walk while looking at their smartphones. If you look at your smartphone while walking, you can’t see your surroundings properly, so there is a high risk of accidents. Therefore, it is better not to look at your smartphone while walking.",
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
    optExplain: [
      '①은 스마트폰이 생활에 꼭 필요하다는 내용이에요. 글에는 스마트폰이 꼭 필요하다는 말이 없어요. 그래서 오답이에요.',
      '②가 정답이에요. 글은 걸으면서 스마트폰을 보면 사고 위험이 크다고 하고 마지막에 "보지 않는 것이 좋다"고 결론을 내요. 중심 내용은 걸을 때 스마트폰 사용이 위험하다는 거예요.',
      '③은 사고가 나는 이유가 길이 나쁘기 때문이라고 해요. 글에는 길이 나쁘다는 내용이 없어요. 그래서 틀렸어요.',
      '④는 스마트폰을 보는 사람이 점점 많아진다는 내용이에요. 이것은 글의 도입부에 나오는 현상일 뿐 중심 내용이 아니에요. 그래서 오답이에요.'
    ],
    optExplainEn: [
      'Option ① says smartphones are essential to daily life. The passage never says smartphones are essential, so this is wrong.',
      'Option ② is the correct answer. The passage says looking at a smartphone while walking creates a high accident risk and concludes "보지 않는 것이 좋다" (better not to look). The main idea is that using phones while walking is dangerous.',
      'Option ③ says accidents happen because of bad roads. The passage has no content about bad roads, so this is incorrect.',
      'Option ④ says more and more people look at phones. That is just the phenomenon described in the introduction, not the main idea, so this is wrong.',
    ],
    tipEn: 'For main-idea questions, look at the sentence after 따라서/그래서/그러니까.',
    freq: 3, freqNote: 'TOPIK II 읽기 31~33 · 중심 내용'
  },
  {
    id: 'T2R004', section: 'reading', type: 'order', level: 3, points: 3,
    q: '다음을 순서에 맞게 배열한 것을 고르십시오.', qGl: "Arrange the following in the correct order.",
    passage: '(가) 그래서 그날부터 아침마다 운동을 시작했다.<br>(나) 건강 검진에서 몸이 나쁘다는 말을 들었다.<br>(다) 처음에는 힘들었지만 지금은 몸이 가벼워졌다.<br>(라) 운동하는 것이 몸에 좋다는 것을 알게 되었다.', passageGl: "(A) So I started exercising every morning from that day. (B) I was told at my health checkup that my body was in bad shape. (C) It was hard at first, but now my body feels light. (D) I learned that exercising is good for the body.",
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
    optExplain: [
      '①이 정답이에요. 건강 검진에서 몸이 나쁘다는 말을 듣고(나) → 운동이 몸에 좋다는 걸 알게 되고(라) → 매일 아침 운동을 시작하고(가) → 지금은 몸이 가벼워졌다(다) 순서예요.',
      '②는 검진 후 바로 운동을 시작해요. 그런데 "운동하는 것이 몸에 좋다는 것을 알게 되었다"는 과정이 빠져서 흐름이 자연스럽지 않아요. 그래서 오답이에요.',
      '③은 운동 시작(가)이 검진(나)보다 앞에 있어요. 검진을 받기 전에 운동을 시작할 수 없어요. 인과가 뒤집혔어요.',
      '④는 운동이 좋다는 걸 아는 것(라)이 제일 먼저 와요. 건강 상태를 모르는데 운동의 좋음을 알았다고 할 수 없어요. 그래서 틀렸어요.'
    ],
    optExplainEn: [
      'Option ① is the correct answer. The order is: hearing at the checkup that his body is in bad shape (나) → learning that exercise is good for the body (라) → starting to exercise every morning (가) → now his body feels light (다).',
      'Option ② starts exercising right after the checkup. The step of learning that exercise is good (라) is missing, so the flow is unnatural and this is wrong.',
      'Option ③ puts starting exercise (가) before the checkup (나). You cannot start exercising before receiving the checkup result, so the cause and effect are reversed.',
      'Option ④ puts learning that exercise is good (라) first. You cannot know exercise is good without knowing your health condition first, so this is incorrect.',
    ],
    tipEn: 'Find time order + cause-effect (그래서/그러니까) clues first.',
    freq: 2, freqNote: 'TOPIK II 읽기 57~58 · 순서 배열'
  },
  {
    id: 'T2R005', section: 'reading', type: 'sentence_pos', level: 3, points: 3,
    q: '다음 글에서 (    )에 들어갈 문장으로 알맞은 것을 고르십시오.', qGl: "Choose the sentence that fits the blank.",
    passage: '요즘 직장인들은 점심시간에 혼자 식사하는 경우가 많다. (    ) 그런 사람들을 위해 혼자 밥을 먹는 모임이 생겨났다.', passageGl: "These days many office workers eat lunch alone. (    ) Groups for people who eat alone have been created for them.",
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
    optExplain: [
      '①이 정답이에요. 다음 문장의 "그런 사람들"은 혼자 먹는 것이 편하다고 생각하는 사람들을 가리켜요. 그래서 이 문장이 빈칸에 들어가야 해요.',
      '②는 점심시간이 짧다고 해요. "그런 사람들"이라는 지시어를 받을 수 있는 내용이 아니에요. 그래서 오답이에요.',
      '③은 회사 근처에 좋은 식당이 많다는 내용이에요. 혼자 먹는 모임과 연결되지 않아요. 그래서 틀렸어요.',
      '④는 점심값이 계속 오른다는 내용이에요. "그런 사람들"과 관계가 없어서 빈칸에 어울리지 않아요. 그래서 오답이에요.'
    ],
    optExplainEn: [
      'Option ① is the correct answer. "그런 사람들" in the next sentence refers to people who find eating alone more comfortable, so this sentence belongs in the blank.',
      'Option ② says lunchtime is too short. It cannot serve as the referent for the demonstrative "그런 사람들", so this is wrong.',
      'Option ③ says there are many good restaurants near the office. It has no connection to groups for eating alone, so this is incorrect.',
      'Option ④ says lunch prices keep rising. It has no relation to "그런 사람들", so it does not fit the blank and this is wrong.',
    ],
    tipEn: 'The demonstrative (그런/이런) before or after the blank is the clue to the answer.',
    freq: 2, freqNote: 'TOPIK II 읽기 59~60 · 문장 위치'
  },

  // ---------- LISTENING (Level 3) ----------
  {
    id: 'T2L001', section: 'listening', type: 'topic', level: 3, points: 3,
    q: '다음을 듣고 남자가 하는 말의 중심 내용을 고르십시오.', qGl: "Listen and choose the main point of what the man says.",
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
    optExplain: [
      '①은 지하철 요금이 내려갔다고 해요. 그런데 대본에는 요금이 올랐다고 해요. 내용과 반대라서 틀렸어요.',
      '②가 정답이에요. 남자는 정기권을 사면 20%나 싸지고 많이 타는 사람은 정기권을 이용하라고 권해요. 중심 내용은 정기권을 이용하면 이득이라는 거예요.',
      '③ 버스에 대한 말은 대본에 전혀 없어요. 그래서 오답이에요.',
      '④는 정기권을 살 수 없다고 해요. 그런데 남자는 정기권을 이용하라고 권해요. 내용과 반대예요. 그래서 틀렸어요.'
    ],
    optExplainEn: [
      'Option ① says the subway fare went down. The script says the fare went up, so this is the opposite of the content and is wrong.',
      'Option ② is the correct answer. The man says a commuter pass is 20% cheaper and recommends it to frequent riders. The main point is that using a commuter pass is beneficial.',
      'Option ③ says taking the bus is better. There is no mention of buses in the script at all, so this is incorrect.',
      'Option ④ says you cannot buy a pass. The man actually recommends buying a pass, so this is the opposite and is wrong.',
    ],
    tipEn: 'For listening main-point questions, pay attention to the recommendation/conclusion after 대신/그래서/그러니까.',
    freq: 4, freqNote: 'TOPIK II 듣기 7~10 · 중심 내용'
  },
  {
    id: 'T2L002', section: 'listening', type: 'intent', level: 3, points: 3,
    q: '다음을 듣고 여자가 할 행동으로 알맞은 것을 고르십시오.', qGl: "Listen and choose what the woman will do.",
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
    optExplain: [
      '① 회의를 취소한다는 내용은 대본에 없어요. 여자는 회의를 취소한다고 말하지 않았어요. 그래서 오답이에요.',
      '②가 정답이에요. 여자가 "지금 바로 만들게요"라고 했어요. 여자는 지금 자료를 만들 거예요.',
      '③ 회의실 예약에 대한 말은 대본에 없어요. 그래서 틀렸어요.',
      '④ 퇴근한다는 내용도 대본에 없어요. 여자는 퇴근하는 게 아니라 자료를 만들겠다고 해요. 그래서 오답이에요.'
    ],
    optExplainEn: [
      'Option ① says she will cancel the meeting, but that is not in the script. The woman never says she will cancel the meeting, so this is wrong.',
      'Option ② is the correct answer. The woman says "지금 바로 만들게요" — she will make the materials right now.',
      'Option ③ booking the meeting room is not mentioned in the script, so this is incorrect.',
      'Option ④ going home is also not in the script. The woman says she will make the materials, not go home, so this is wrong.',
    ],
    tipEn: 'For action questions, listen to the final answer (-게요/-ㄹ게요).',
    freq: 3, freqNote: 'TOPIK II 듣기 15~16 · 행동'
  },

  // ---------- WRITING (Level 3) ----------
  {
    id: 'T2W001', section: 'writing', type: 'writing_short', level: 3, points: 10,
    q: '다음을 읽고 150~200자로 답하십시오.', qGl: "Read the prompt and answer in 150–200 characters.",
    passage: '"건강을 지키기 위해 가장 중요한 것은 무엇이라고 생각합니까?" 자신의 경험을 바탕으로 한 문단을 쓰십시오.', passageGl: "“What do you think is most important for protecting your health?” Write one paragraph based on your own experience.",
    writePrompt: true,
    answerModel: '건강을 지키기 위해 가장 중요한 것은 규칙적인 운동이라고 생각합니다. 저는 작년에 몸이 아파서 병원에 다닌 적이 있습니다. 그때 의사 선생님이 운동이 부족하다고 하셨습니다. 그래서 그때부터 아침마다 30분씩 걷기 운동을 시작했습니다. 처음에는 힘들었지만 지금은 몸이 훨씬 가벼워졌고 감기에도 잘 걸리지 않습니다. 앞으로도 계속 운동을 하면서 건강을 지키고 싶습니다.',
    explain: '쓰기 채점 기준: 주제 부합(운동) + 구조(경험→변화→결심) + 문법 정확성.',
    traps: [],
    tip: 'TOPIK II 쓰기 51번은 150~200자 문단 완성. 서론 1문장 + 경험 2문장 + 결론 1문장 구조.',
    freq: 1, freqNote: 'TOPIK II 쓰기 51번'
  },
  {
    id: 'T2W002', section: 'writing', type: 'writing_letter', level: 3, points: 20,
    q: '다음을 읽고 편지를 쓰십시오.', qGl: "Read the prompt and write a letter.",
    passage: '친구가 생일 선물로 책을 보냈습니다. 친구에게 감사하는 편지를 쓰십시오. (200~300자)', passageGl: "Your friend sent you a book as a birthday present. Write a thank-you letter to your friend. (200–300 characters)",
    writePrompt: true,
    answerModel: '○○야, 안녕? 생일 선물로 책을 보내줘서 정말 고마워. 나는 요즘 한국어를 공부하고 있는데 네가 보내준 책이 정말 도움이 많이 되고 있어. 특히 소설이라서 재미있게 읽을 수 있었어. 다음에 만나면 내가 생각한 것을 꼭 이야기해 줄게. 네 덕분에 좋은 선물을 받아서 기분이 좋아. 우리 다음에 꼭 만나자. 건강 조심하고. 안녕!',
    explain: '편지 형식(인사→감사→근황→마무리) + 정중한 반말/존댓말 일관성이 채점 포인트.',
    traps: [],
    tip: '편지는 ①인사 ②감사의 이유 ③근황 ④마무리 인사 순서.',
    freq: 1, freqNote: 'TOPIK II 쓰기 52번'
  }
];
