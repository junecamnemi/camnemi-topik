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
  },
  // ================= 102nd 기출 유형 분석 기반 추가 (2026-09) =================
  // 유형 커버리지 확충: 16-18 빈칸·19-24 긴글 2문항·25-27 제목·28-31 빈칸·32-34 내용일치·
  // 35-38 주제·39-41 문장넣기·42-50 긴글 태도/목적 — 지문은 전부 원본 창작
  // ---------- READING: blank_fill 16-18형 ----------
  {
    id: 'T2R006', section: 'reading', type: 'blank_fill', level: 3, points: 2,
    q: '다음 글에서 (    )에 들어갈 말로 가장 알맞은 것을 고르십시오.', qGl: "Choose the most appropriate phrase for the blank.",
    passage: '사막여우는 몸집이 작아 체온을 쉽게 잃는다. 그래서 낮에는 굴속에 숨어 있다가 해가 진 뒤에야 밖으로 나와 사냥한다. 또 발바닥에 두꺼운 털이 나 있어 뜨거운 모래 위를 걸어도 발이 데지 않는다. 이처럼 사막여우는 혹독한 사막 환경에서 살아남기 위해 (    ) 적응해 왔다.',
    passageGl: 'Fennec foxes are small and lose body heat easily. So they hide in burrows during the day and only come out after sunset to hunt. They also have thick fur on their paws so their feet do not burn on the hot sand. In this way fennec foxes have adapted to survive the harsh desert.',
    options: [
      { t: '몸집을 키우는 방향으로', gl: 'in the direction of growing larger' },
      { t: '여러 가지 방법으로 몸을', gl: 'their bodies in various ways' },
      { t: '다른 동물들의 도움을 받아', gl: 'with the help of other animals' },
      { t: '밤에는 활동을 하지 않는', gl: 'not being active at night' }
    ],
    correct: 1,
    explain: '글은 사막여우가 굴속 생활·두꺼운 발털 등 "여러 가지 방법으로" 환경에 적응했음을 나열한다. ②만 앞 문장의 구체적 예들을 자연스럽게 마무리한다.',
    traps: [
      '① 몸집을 키웠다는 내용은 글에 없다',
      '③ 다른 동물의 도움은 언급되지 않는다',
      '④ 밤에 활동하는 것이 오히려 본문 내용과 반대'
    ],
    tip: '빈칸 문제는 앞에 나온 구체적 예들이 무엇을 증명하는지 보라.',
    optExplain: [
      '① 글에서는 몸집을 키운다고 하지 않았어요. 사막여우는 몸집이 작아서 체온을 잃기 쉬운데, 그걸 굴속 생활로 극복했어요. 그래서 오답이에요.',
      '②가 정답이에요. 굴에 숨기, 두꺼운 발털처럼 여러 방법을 들어 사막에 적응했다는 내용이에요. "여러 가지 방법으로 몸을 적응해 왔다"가 글 전체를 잘 요약해요.',
      '③ 글에는 다른 동물의 도움이 전혀 나오지 않아요. 그래서 틀렸어요.',
      '④ 반대로 사막여우는 밤에 활동해요. 해가 진 뒤에 사냥한다고 했으니까 밤에 활동을 안 한다는 건 본문과 반대예요.'
    ],
    optExplainEn: [
      'Option ① says they grew bigger, which is not in the passage. They stay small and compensate with burrow life.',
      'Option ② is correct. Burrow hiding, thick paw fur — several methods show how they adapted in various ways.',
      'Option ③ mentions help from other animals, which never appears in the passage.',
      'Option ④ contradicts the passage — fennec foxes are active at night.'
    ],
    tipEn: 'For blank questions, check what the preceding concrete examples prove.',
    freq: 4, freqNote: 'TOPIK II 읽기 16~18 · 빈칸'
  },
  {
    id: 'T2R007', section: 'reading', type: 'blank_fill', level: 3, points: 2,
    q: '다음 글에서 (    )에 들어갈 말로 가장 알맞은 것을 고르십시오.', qGl: "Choose the most appropriate phrase for the blank.",
    passage: '우리나라에서는 결혼식에 하객으로 초대받으면 축의금을 내는 것이 일반적이다. 그런데 최근에는 부담을 느끼는 사람들이 늘면서 결혼식 대신 (    ) 이른바 "무(無)하객 결혼식"이 확산하고 있다. 두 사람만의 예식을 올리고 축의금 대신 축하 메시지를 받는 방식이다.',
    passageGl: 'In Korea it is common to give congratulatory money when invited as a guest to a wedding. Recently, however, more people feel burdened, and so-called "no-guest weddings" are spreading, where instead of a wedding with guests... It is a way of holding a ceremony for just the two people and receiving congratulatory messages instead of money.',
    options: [
      { t: '가족과 친지들을 초대해', gl: 'inviting family and relatives' },
      { t: '소박하게 예식을 올리는', gl: 'holding a modest ceremony' },
      { t: '축의금을 따로 준비하는', gl: 'preparing congratulatory money separately' },
      { t: '하객들에게 식사를 대접하는', gl: 'serving meals to the guests' }
    ],
    correct: 1,
    explain: '뒤 문장이 "두 사람만의 예식"이라 설명하므로, 결혼식 대신 "소박하게 예식을 올리는" 방식이 자연스럽다. ②가 정답.',
    traps: [
      '① 두 사람만의 예식이라는 설명과 모순',
      '③ 축의금을 준비하는 건 오히려 하객 부담과 반대',
      '④ 하객이 없는 것이 무하객 결혼식의 핵심'
    ],
    tip: '뒤에 오는 정의/설명 문장을 먼저 읽고 빈칸을 채우면 쉽다.',
    optExplain: [
      '① "두 사람만의 예식"이라는 뒷말과 맞지 않아요. 가족과 친지를 초대하면 하객이 있는 결혼식이 되잖아요. 그래서 오답이에요.',
      '②가 정답이에요. 하객 없이 두 사람만 소박하게 예식을 올리는 게 "무하객 결혼식"이에요.',
      '③ 축의금을 준비한다는 건 하객들의 부담을 없애려는 흐름과 반대예요.',
      '④ 하객들에게 식사를 대접하는 것도 하객이 있다는 뜻이라 본문과 안 맞아요.'
    ],
    optExplainEn: [
      'Option ① conflicts with "a ceremony for just the two".',
      'Option ② is correct: a modest ceremony with no guests is the no-guest wedding.',
      'Option ③ is the opposite of reducing guests\' burden.',
      'Option ④ implies guests exist, which contradicts the passage.'
    ],
    tipEn: 'Read the defining sentence after the blank first.',
    freq: 4, freqNote: 'TOPIK II 읽기 16~18 · 빈칸'
  },
  // ---------- READING: same_content 9-12형 ----------
  {
    id: 'T2R008', section: 'reading', type: 'same_content', level: 3, points: 2,
    q: '다음 글의 내용과 같은 것을 고르십시오.', qGl: "Choose the statement consistent with the passage.",
    passage: '인천의 한 도서관이 밤 10시까지 문을 여는 "심야 도서관"을 운영해 직장인들에게 인기를 끌고 있다. 이 도서관은 퇴근 후에도 책을 읽거나 공부할 수 있도록 지난 3월부터 평일 야간 개방을 시작했다. 야간에는 조용한 분위기에서 집중할 수 있다는 장점 때문에 매일 좌석이 가득 찬다. 다만 주말에는 오후 6시에 문을 닫는다.',
    passageGl: 'A library in Incheon is popular with office workers by staying open until 10 PM as a "night library". It began weekday evening hours last March so people can read or study after work. Seats are full every day because of the advantage of concentrating in a quiet atmosphere at night. However, it closes at 6 PM on weekends.',
    options: [
      { t: '이 도서관은 주말에도 밤 10시까지 문을 연다.', gl: 'The library stays open until 10 PM on weekends too.' },
      { t: '이 도서관의 야간 운영은 최근에 시작되었다.', gl: 'The night operation started recently.' },
      { t: '이 도서관은 직장인들이 낮 시간에 주로 찾는다.', gl: 'Office workers mostly visit during the day.' },
      { t: '이 도서관의 야간 좌석은 잘 비어 있는 편이다.', gl: 'The night seats are usually empty.' }
    ],
    correct: 1,
    explain: '"지난 3월부터 평일 야간 개방을 시작했다"고 했으므로 야간 운영은 최근 시작. ②가 정답.',
    traps: [
      '① 주말에는 오후 6시에 닫는다고 했다',
      '③ 직장인들은 퇴근 후(야간)에 이용한다',
      '④ 매일 좌석이 가득 찬다고 했다'
    ],
    tip: '내용일치 문제는 수량·시간·요일 같은 구체 정보를 하나씩 대조하라.',
    optExplain: [
      '① 주말에는 오후 6시에 문을 닫는다고 했어요. 밤 10시까지 여는 건 평일이에요. 그래서 틀렸어요.',
      '②가 정답이에요. 지난 3월부터 시작했다고 했으니까 최근에 시작된 게 맞아요.',
      '③ 직장인들은 퇴근하고 나서 오니까 밤에 와요. 낮 시간에 온다는 건 틀렸어요.',
      '④ "매일 좌석이 가득 찬다"고 했으니 비어 있다는 건 반대예요.'
    ],
    optExplainEn: [
      'Option ① wrong — weekend closing is 6 PM; 10 PM is weekdays only.',
      'Option ② correct — started last March, i.e. recently.',
      'Option ③ wrong — office workers come after work at night.',
      'Option ④ wrong — seats are full every day.'
    ],
    tipEn: 'Check quantity, time, and day details one by one.',
    freq: 4, freqNote: 'TOPIK II 읽기 9~12 · 내용일치'
  },
  {
    id: 'T2R009', section: 'reading', type: 'same_content', level: 3, points: 2,
    q: '다음 글의 내용과 같은 것을 고르십시오.', qGl: "Choose the statement consistent with the passage.",
    passage: '산책하던 주민이 쓰러져 있는 고양이를 발견해 동물 보호 센터에 신고했다. 센터 직원은 고양이를 병원에 데려가 치료했고, 건강을 되찾은 고양이는 새로운 가족을 찾게 되었다. 센터는 입양을 원하는 사람이 있으면 상담 후 집에서 기를 수 있는 환경인지 확인한다고 밝혔다.',
    passageGl: 'A resident out on a walk found a collapsed cat and reported it to an animal shelter. Shelter staff took the cat to a hospital for treatment, and once healthy, the cat found a new family. The shelter said that when someone wants to adopt, they check after consultation whether the home environment is suitable.',
    options: [
      { t: '고양이는 센터에서 계속 살게 되었다.', gl: 'The cat will keep living at the shelter.' },
      { t: '고양이를 발견한 사람은 센터 직원이었다.', gl: 'The person who found the cat was a staff member.' },
      { t: '입양 전에 집 환경을 확인하는 절차가 있다.', gl: 'There is a process of checking the home before adoption.' },
      { t: '고양이는 발견 당시 이미 건강한 상태였다.', gl: 'The cat was already healthy when found.' }
    ],
    correct: 2,
    explain: '마지막 문장에서 "입양을 원하는 사람이 있으면 상담 후 집에서 기를 수 있는 환경인지 확인한다"고 했다. ③이 정답.',
    traps: [
      '① 새로운 가족을 찾았다고 했다',
      '② 발견한 사람은 주민이다',
      '④ 쓰러져 있었으므로 치료가 필요했다'
    ],
    tip: '마지막 문장이 제도/절차를 설명하면 그 부분이 자주 정답이 된다.',
    optExplain: [
      '① 고양이는 건강을 되찾은 뒤 새로운 가족을 찾았다고 했어요. 센터에 계속 살게 됐다는 건 틀렸어요.',
      '② 발견한 사람은 산책하던 주민이에요. 센터 직원이 아니에요.',
      '③가 정답이에요. 입양 전에 상담 후 집에서 기를 수 있는 환경인지 확인한다고 했어요.',
      '④ 쓰러져 있었으니까 발견 당시 건강하지 않았어요.'
    ],
    optExplainEn: [
      'Option ① wrong — the cat found a new family.',
      'Option ② wrong — a resident found it, not staff.',
      'Option ③ correct — home environment is checked before adoption.',
      'Option ④ wrong — it had collapsed and needed treatment.'
    ],
    tipEn: 'Final sentences describing rules are often the answer.',
    freq: 4, freqNote: 'TOPIK II 읽기 9~12 · 내용일치'
  },
  // ---------- READING: main_idea 35-38형 ----------
  {
    id: 'T2R010', section: 'reading', type: 'main_idea', level: 4, points: 2,
    q: '다음 글의 주제로 가장 알맞은 것을 고르십시오.', qGl: "Choose the topic of the passage.",
    passage: '회의 시간에 스마트폰을 보거나 자리를 비우는 직장인이 많아졌다. 회의 참석자가 많을수록 한 사람이 느끼는 책임감은 줄어들기 마련인데, 이를 전문가들은 "사회적 태만"이라고 부른다. 참석자가 많을수록 개인의 집중력이 떨어지는 것이다. 해결을 위해서는 회의 인원을 줄이고 각자 맡은 역할을 분명히 해야 한다는 조언이 나온다.',
    passageGl: 'More workers look at their phones or leave during meetings. The more attendees a meeting has, the less responsibility each person feels — experts call this "social loafing". The more attendees, the lower each individual\'s focus. Experts advise reducing the number of attendees and making each person\'s role clear.',
    options: [
      { t: '회의는 참석자의 의견이 잘 반영되도록 진행해야 한다.', gl: 'Meetings should be run so attendees\' opinions are reflected.' },
      { t: '회의에서 스마트폰 사용을 금지하는 규칙이 필요하다.', gl: 'Rules banning phones in meetings are needed.' },
      { t: '회의 참석자가 많을수록 개인의 책임감이 높아진다.', gl: 'More attendees raise each person\'s sense of responsibility.' },
      { t: '회의의 효율을 높이려면 인원을 줄이고 역할을 나눠야 한다.', gl: 'To make meetings efficient, reduce attendees and divide roles.' }
    ],
    correct: 3,
    explain: '글은 "사회적 태만" 현상을 설명하고 해결책으로 인원 축소와 역할 분담을 제시한다. ④가 주제.',
    traps: [
      '① 의견 반영은 글에 없다',
      '② 스마트폰 금지는 글에 없다',
      '③ 본문과 반대 — 많을수록 책임감이 줄어든다'
    ],
    tip: '주제 문제는 문제 제기 + 해결책 구조에서 해결책 부분이 핵심이다.',
    optExplain: [
      '① 의견을 반영해야 한다는 내용은 글에 없어요.',
      '② 스마트폰 사용을 금지하라는 조언도 나오지 않아요.',
      '③ 반대로 참석자가 많을수록 책임감이 줄어든다고 했어요.',
      '④가 정답이에요. 인원을 줄이고 역할을 분명히 하라는 게 글의 핵심 조언이에요.'
    ],
    optExplainEn: [
      'Option ① not mentioned. Option ② not mentioned.',
      'Option ③ is the opposite — responsibility drops with more attendees.',
      'Option ④ correct: reduce attendees and clarify roles.'
    ],
    tipEn: 'In problem+solution passages, the solution is the core.',
    freq: 4, freqNote: 'TOPIK II 읽기 35~38 · 주제'
  },
  {
    id: 'T2R011', section: 'reading', type: 'main_idea', level: 4, points: 2,
    q: '다음 글의 주제로 가장 알맞은 것을 고르십시오.', qGl: "Choose the topic of the passage.",
    passage: '제품을 살 때 환경을 생각하는 소비자가 늘고 있다. 플라스틱 대신 종이를 쓰고, 다 쓴 물건은 수리해서 오래 쓰는 것이 그 예이다. 기업들도 이런 흐름에 맞춰 친환경 제품을 내놓고 있다. 하지만 환경을 생각하는 마음이 실제 구매로 이어지려면 친환경 제품의 가격이 합리적이어야 한다는 지적이 있다. 환경을 위한 선택이 경제적 부담이 되면 오래가지 못하기 때문이다.',
    passageGl: 'More consumers consider the environment when buying. Using paper instead of plastic and repairing used goods to keep them longer are examples. Companies also release eco-friendly products following this trend. However, there is a point that eco-friendly products must be reasonably priced for eco-consciousness to lead to actual purchases, because eco-choices that are a financial burden do not last.',
    options: [
      { t: '친환경 소비가 확산되려면 가격이 받쳐 줘야 한다.', gl: 'Eco-consumption needs supportive prices to spread.' },
      { t: '기업들은 환경보다 이익을 우선시하고 있다.', gl: 'Companies prioritize profit over the environment.' },
      { t: '플라스틱 제품은 완전히 사라져야 한다.', gl: 'Plastic products should disappear completely.' },
      { t: '소비자들은 친환경 제품의 품질을 의심한다.', gl: 'Consumers doubt the quality of eco products.' }
    ],
    correct: 0,
    explain: '"하지만" 뒤의 반전, 즉 가격이 합리적이어야 실제 구매로 이어진다는 지적이 글의 주제다. ①이 정답.',
    traps: [
      '② 기업 이익 우선은 글에 없다',
      '③ 플라스틱 완전 퇴출은 과장',
      '④ 품질 의심은 언급되지 않는다'
    ],
    tip: '"하지만/그러나" 뒤 문장이 주제일 확률이 높다.',
    optExplain: [
      '①이 정답이에요. 마지막에 "가격이 합리적이어야 한다"고 했어요. 환경 선택이 부담이 되면 오래가지 못한다는 게 핵심이에요.',
      '② 기업이 이익을 우선한다는 내용은 없어요. 친환경 제품을 내놓고 있다고 했죠.',
      '③ 플라스틱이 완전히 사라져야 한다는 극단적 주장은 글에 없어요.',
      '④ 품질을 의심한다는 내용은 나오지 않아요.'
    ],
    optExplainEn: [
      'Option ① correct — reasonable pricing is the key point.',
      'Option ② not mentioned. Option ③ exaggerated.',
      'Option ④ not mentioned.'
    ],
    tipEn: 'Sentences after "however" usually carry the topic.',
    freq: 4, freqNote: 'TOPIK II 읽기 35~38 · 주제'
  },
  // ---------- READING: headline_desc 25-27형 ----------
  {
    id: 'T2R012', section: 'reading', type: 'headline_desc', level: 4, points: 2,
    q: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.', qGl: "Choose the best description of the headline.",
    passage: '동네 서점 살리기 나선 주민들, 한 달 만에 목표 모금액 돌파',
    passageGl: 'Residents working to save the neighborhood bookstore pass their fundraising goal within a month.',
    options: [
      { t: '주민들이 동네 서점을 위해 모금 활동을 시작했다.', gl: 'Residents started fundraising for the bookstore.' },
      { t: '주민들이 동네 서점의 목표 매출액을 달성했다.', gl: 'Residents achieved the bookstore\'s target sales.' },
      { t: '동네 서점이 주민들의 도움으로 한 달 만에 문을 닫았다.', gl: 'The bookstore closed within a month despite residents\' help.' },
      { t: '동네 서점이 주민들을 위해 모금액을 기부했다.', gl: 'The bookstore donated funds to residents.' }
    ],
    correct: 0,
    explain: '"주민들이 ... 모금액 돌파" — 주체는 주민, 목적은 동네 서점 살리기. ①이 가장 정확한 설명.',
    traps: [
      '② 목표 매출액이 아니라 모금액이다',
      '③ 문을 닫았다는 건 반대',
      '④ 주체와 방향이 바뀜'
    ],
    tip: '제목 문제는 주체(누가) + 동작(무엇을) + 대상(누구를)을 가려라.',
    optExplain: [
      '①이 정답이에요. 주민들이 동네 서점을 지키려고 모금을 했고 목표를 넘겼다는 내용이에요.',
      '② 모금액이지 매출액이 아니에요. 틀렸어요.',
      '③ 반대로 서점을 살리려는 활동이에요. 문을 닫았다는 건 반대예요.',
      '④ 주민들이 모금한 거지 서점이 기부한 게 아니에요.'
    ],
    optExplainEn: [
      'Option ① correct — residents fundraised and passed the goal.',
      'Option ② wrong target (sales vs funds).',
      'Option ③ opposite meaning. Option ④ reversed roles.'
    ],
    tipEn: 'Identify who did what to whom in the headline.',
    freq: 3, freqNote: 'TOPIK II 읽기 25~27 · 제목'
  },
  {
    id: 'T2R013', section: 'reading', type: 'headline_desc', level: 4, points: 2,
    q: '다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.', qGl: "Choose the best description of the headline.",
    passage: '무더위에 전기료 "비상등" 켜진 가계…절약 바람 확산',
    passageGl: 'Households\' electricity bills flash a warning light in the heat wave... an economizing wind spreads.',
    options: [
      { t: '무더위로 전기 사용이 늘자 아껴 쓰는 분위기가 퍼지고 있다.', gl: 'As electricity use rises in the heat, a saving mood is spreading.' },
      { t: '전기료 인상으로 가계의 부담이 줄어들고 있다.', gl: 'Household burden is falling due to the rate hike.' },
      { t: '무더위에도 불구하고 전기 사용량이 줄어들었다.', gl: 'Electricity use fell despite the heat.' },
      { t: '정부가 가계의 전기료를 지원하기로 결정했다.', gl: 'The government decided to subsidize household bills.' }
    ],
    correct: 0,
    explain: '"전기료 비상등"은 부담을 뜻하고 "절약 바람 확산"이 핵심. ①이 정확.',
    traps: [
      '② 부담이 줄어든다? 비상등=부담 증가',
      '③ 사용량이 줄었다는 직접 근거 없음',
      '④ 정부 지원은 언급 없음'
    ],
    tip: '은유적 표현(비상등)은 실제 의미(부담/위기)로 풀어라.',
    optExplain: [
      '①이 정답이에요. 무더위로 전기료 부담이 커지니까 절약하려는 분위기가 퍼진다는 내용이에요.',
      '② 비상등이 켜졌다는 건 부담이 커졌다는 뜻이에요. 줄어든다는 건 반대예요.',
      '③ 사용량이 줄었다는 건 글에 없어요. 절약 바람이 확산되고 있다는 중이에요.',
      '④ 정부 지원은 전혀 언급되지 않아요.'
    ],
    optExplainEn: [
      'Option ① correct — bill burden rises, saving mood spreads.',
      'Option ② opposite. Option ③ unsupported. Option ④ not mentioned.'
    ],
    tipEn: 'Decode metaphors (warning light = burden) into plain meaning.',
    freq: 3, freqNote: 'TOPIK II 읽기 25~27 · 제목'
  },
  // ---------- READING: insert_sentence 39-41형 ----------
  {
    id: 'T2R014', section: 'reading', type: 'insert_sentence', level: 4, points: 2,
    q: '주어진 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.', qGl: "Choose where the given sentence fits best.",
    given: '하지만 처음부터 자신의 목소리를 찾는 사람은 드물다.',
    passage: '많은 사람이 글을 쓸 때 유명 작가의 문체를 따라 하려고 한다. ( ㄱ ) 따라 하다 보면 자신만의 스타일이 무엇인지 오히려 더 헷갈린다. ( ㄴ ) 대부분은 남의 글을 흉내 내는 과정을 거쳐 조금씩 자신만의 목소리를 만들어 간다. ( ㄷ ) 오랜 시간 쓰다 보면 어느 순간 내 글이 내 목소리를 갖게 된다. ( ㄹ ) 그래서 전문가들은 실패를 두려워하지 말고 꾸준히 쓰라고 조언한다.',
    passageGl: 'Many people try to imitate famous writers\' styles when writing. (ㄱ) The more they imitate, the more confused they get about their own style. (ㄴ) Most people develop their own voice gradually through the process of imitating others. (ㄷ) After writing for a long time, my writing gains my own voice at some point. (ㄹ) So experts advise writing steadily without fearing failure.',
    options: [
      { t: 'ㄱ', gl: 'spot ㄱ' },
      { t: 'ㄴ', gl: 'spot ㄴ' },
      { t: 'ㄷ', gl: 'spot ㄷ' },
      { t: 'ㄹ', gl: 'spot ㄹ' }
    ],
    correct: 1,
    explain: '"하지만 처음부터 ~ 드물다"는 (ㄴ)의 "대부분은 ~ 과정을 거쳐"와 이어져 대조-보완 관계를 이룬다. ㄴ이 정답.',
    traps: [
      '① ㄱ 뒤는 "따라 하다 보면"으로 이미 같은 흐름',
      '③ ㄷ 뒤는 "오랜 시간 쓰다 보면"으로 결론 진행',
      '④ ㄹ 뒤는 "그래서"로 마무리'
    ],
    tip: '"하지만/그런데"로 시작하는 문장은 바로 앞에 반대되는 내용이 있어야 한다.',
    optExplain: [
      '① ㄱ 자리에 넣으면 "따라 하려고 한다. 하지만 처음부터..."가 되는데, 뒤 문장이 또 따라 하다 보니 헷갈린다는 내용이라 어색해요.',
      '②가 정답이에요. "대부분은 남의 글을 흉내 내는 과정을 거쳐"라는 문장이 "처음부터 목소리를 찾는 사람은 드물다"는 말을 자연스럽게 이어받아요.',
      '③ ㄷ 자리는 "오랜 시간 쓰다 보면"이라는 결론 진행이라 맞지 않아요.',
      '④ ㄹ 자리는 "그래서"로 마무리되는 자리라 들어갈 수 없어요.'
    ],
    optExplainEn: [
      'Option ① flows into more imitation talk — awkward after a contrast marker.',
      'Option ② correct: "most people develop through imitating" naturally follows "few find their voice from the start".',
      'Options ③④ are at the concluding part — a "however" sentence cannot go there.'
    ],
    tipEn: 'A sentence starting with "however" needs an opposing idea right before it.',
    freq: 3, freqNote: 'TOPIK II 읽기 39~41 · 문장 넣기'
  },
  // ---------- READING: attitude 42-50형 ----------
  {
    id: 'T2R015', section: 'reading', type: 'attitude', level: 5, points: 2,
    q: '윗글에 나타난 필자의 태도로 가장 알맞은 것을 고르십시오.', qGl: "Choose the writer's attitude.",
    passage: '요즘 청소년 사이에서 유행하는 숏폼 영상은 짧고 자극적이어서 몰입감이 뛰어나다. 그러나 한 연구에 따르면 하루 2시간 이상 숏폼을 시청한 청소년은 집중력 저하를 호소하는 비율이 그렇지 않은 경우보다 두 배 이상 높았다. 숏폼의 빠른 화면 전환에 익숙해진 뇌는 느리고 지루한 학습을 견디지 못한다. 우리는 아이들의 미래를 위해 숏폼 사용 시간을 제한하는 사회적 논의를 지금 시작해야 한다.',
    passageGl: 'Short-form videos popular among teens are short and stimulating with great immersion. But a study found that teens watching 2+ hours daily reported concentration problems at more than double the rate of others. Brains used to fast cuts cannot endure slow, boring study. We must start a social discussion to limit short-form use for our children\'s future.',
    options: [
      { t: '숏폼 영상의 긍정적 효과를 강조하고 있다.', gl: 'Emphasizing the positive effects of short-form video.' },
      { t: '숏폼 영상 규제에 신중한 입장을 보이고 있다.', gl: 'Taking a cautious stance on regulating short-form.' },
      { t: '숏폼 영상의 부작용을 지적하며 대책을 촉구하고 있다.', gl: 'Pointing out the harm and urging countermeasures.' },
      { t: '숏폼 영상이 청소년의 학습에 도움이 된다고 본다.', gl: 'Believing short-form helps teens study.' }
    ],
    correct: 2,
    explain: '필자는 연구 결과를 들어 부작용을 지적하고 "사용 시간을 제한하는 사회적 논의를 시작해야 한다"고 촉구한다. ③이 정답.',
    traps: [
      '① 긍정 효과는 서론의 몰입감뿐',
      '② 신중한 입장이 아니라 적극적 촉구',
      '④ 학습에 도움된다는 내용 없음'
    ],
    tip: '태도 문제는 "~해야 한다 / 촉구 / 우려" 같은 필자의 표현에 주목하라.',
    optExplain: [
      '① 몰입감이 뛰어나다는 건 인정하지만 전체적으로 부작용을 다루고 있어요.',
      '② 신중한 게 아니라 오히려 적극적으로 제한을 촉구하고 있어요.',
      '③이 정답이에요. 집중력 저하 연구를 들고 "사용 시간을 제한하는 논의를 시작해야 한다"고 해요.',
      '④ 학습에 도움이 된다는 내용은 없어요. 반대로 학습을 견디지 못한다고 했죠.'
    ],
    optExplainEn: [
      'Option ① only the intro admits immersion.',
      'Option ② wrong — the writer urges action, not caution.',
      'Option ③ correct — cites harm and urges limiting use.',
      'Option ④ not supported — short-form harms study stamina.'
    ],
    tipEn: 'Watch for "~해야 한다 / 촉구" (must / urge) markers.',
    freq: 3, freqNote: 'TOPIK II 읽기 42~50 · 태도'
  },
  {
    id: 'T2R016', section: 'reading', type: 'attitude', level: 5, points: 2,
    q: '윗글에 나타난 필자의 태도로 가장 알맞은 것을 고르십시오.', qGl: "Choose the writer's attitude.",
    passage: '온라인 쇼핑이 일상이 되면서 택배 상자와 포장재 쓰레기가 급증하고 있다. 분리배출을 하면 재활용이 된다지만, 실제로는 오염된 포장재 상당수가 소각된다. 일부 기업은 "친환경 포장"을 내세우지만 겉면에 플라스틱 필름을 입힌 상자는 재활용이 어렵다. 소비자도 기업도 "착한 소비"라는 말에 안심할 것이 아니라 포장의 처음과 끝을 다시 설계해야 할 때다.',
    passageGl: 'As online shopping becomes routine, delivery box and packaging waste surge. Even if sorted for recycling, much contaminated packaging is actually incinerated. Some firms claim "eco packaging", but boxes coated with plastic film are hard to recycle. It is time for both consumers and companies to redesign packaging from start to finish instead of feeling safe with the phrase "good consumption".',
    options: [
      { t: '친환경 포장의 성과를 높이 평가하고 있다.', gl: 'Highly praising eco-packaging achievements.' },
      { t: '포장재 문제의 심각성을 지적하며 근본적 변화를 요구한다.', gl: 'Pointing out the seriousness and demanding fundamental change.' },
      { t: '기업들의 재활용 노력을 긍정적으로 소개하고 있다.', gl: 'Positively introducing firms\' recycling efforts.' },
      { t: '소비자들의 분리배출 참여 부족을 탓하고 있다.', gl: 'Blaming consumers for poor sorting.' }
    ],
    correct: 1,
    explain: '필자는 "친환경 포장"의 실체를 비판하며 "처음과 끝을 다시 설계해야 할 때"라고 근본적 변화를 요구한다. ②가 정답.',
    traps: [
      '① 친환경 포장을 비판한다',
      '③ 기업 노력을 비판한다',
      '④ 소비자 탓이 아니라 구조 재설계 요구'
    ],
    tip: '"~해야 할 때다" = 근본적 변화 요구 신호.',
    optExplain: [
      '① 친환경 포장을 높이 사는 게 아니라 "실제로는 소각된다"며 비판해요.',
      '②가 정답이에요. 표면적 친환경을 지적하고 포장을 처음부터 다시 설계하자고 해요.',
      '③ 기업들의 노력을 긍정적으로 소개하는 게 아니라 문제를 지적해요.',
      '④ 소비자를 탓하기보다 소비자와 기업 모두의 인식 전환을 요구해요.'
    ],
    optExplainEn: [
      'Option ① wrong — the writer criticizes fake eco-packaging.',
      'Option ② correct — calls for fundamental redesign.',
      'Option ③ wrong — firms are the target of criticism.',
      'Option ④ wrong — not blaming consumers, asking both sides to change.'
    ],
    tipEn: '"~해야 할 때다" signals a demand for fundamental change.',
    freq: 3, freqNote: 'TOPIK II 읽기 42~50 · 태도'
  }
];
