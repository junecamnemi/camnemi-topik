/* Camnemi TOPIK — Level 1 (TOPIK I, beginner) original question bank
   All questions are ORIGINAL Camnemi content — written from scratch to mirror
   the difficulty and patterns of the official TOPIK I Level 1 test.
   Level 1 = very simple Korean: -아요/어요 present tense, basic nouns,
   numbers, days, family, food. Sentences are short and natural.
   Sections: reading (LV1R01-10) + listening (LV1L01-10).
*/
window.LEVEL1_BANK = [
  // ============ READING (10) ============
  { id: "LV1R01", section: "reading", type: "grammar", level: 1, points: 3,
    qGl: "Choose the correct word.",
    q: "저는 학교에 버스(    ) 가요.",
    options: [
      { t: "로", gl: "by (means)" },
      { t: "에서", gl: "at (place)" },
      { t: "하고", gl: "and" },
      { t: "도", gl: "also" }
    ], correct: 0,
    explain: "버스로 = 'by bus'. -(으)로 shows the means or way of doing something: 버스로 가요 (I go by bus).",
    traps: ["② 에서 = the place where an action happens", "③ 하고 = 'and' (connects nouns)", "④ 도 = 'also, too'"],
    tip: "Remember: 타고 가요 → 버스로 가요. -(으)로 answers 'how?' (means).",
    optExplain: [
      "①이 정답이에요. '버스로 가요'에서 -(으)로는 '~을 타고'라는 방법이나 수단을 나타내요. '학교에 버스로 가요'는 '버스를 타고 학교에 간다'는 뜻으로 자연스러운 문장이에요.",
      "② '에서'는 동작이 일어나는 장소를 나타내요. '도서관에서 공부해요'처럼 쓸 수 있지만 '가요'는 이동 동사라서 수단을 나타내는 '로'가 필요해요.",
      "③ '하고'는 명사와 명사를 이어 주는 '~와/과'예요. '버스하고 가요'는 '버스와 함께 간다'는 뜻이 되어 수단을 묻는 이 문장과 맞지 않아요.",
      "④ '도'는 '~도 역시'라는 뜻이에요. '버스도 가요'라고 하면 '버스도 간다'는 의미가 되어 문장이 이상해져요."
    ],
    optExplainEn: [
      "① is the correct answer. In '버스로 가요', the particle -(으)로 expresses the means or method of doing something, like 'by riding'. '저는 학교에 버스로 가요' means 'I go to school by bus', which is a natural, complete sentence.",
      "② is wrong because '에서' marks the place where an action takes place. It works in sentences like '도서관에서 공부해요' (I study at the library), but '가요' is a movement verb, so the means particle '로' is needed instead.",
      "③ is wrong because '하고' connects two nouns and means 'and'. '버스하고 가요' would mean 'I go together with the bus', which does not fit a sentence asking about the means of travel.",
      "④ is wrong because '도' means 'also' or 'too'. '버스도 가요' would mean 'The bus also goes', which makes the sentence strange and unnatural.",
    ],
    tipEn: "Remember: 타고 가요 → 버스로 가요. The particle -(으)로 answers the question 'how?' (the means or method)."
  },

  { id: "LV1R02", section: "reading", type: "vocab", level: 1, points: 2,
    qGl: "Choose the correct word.",
    q: "저는 아침에 물을 (    ).",
    options: [
      { t: "먹어요", gl: "eat" },
      { t: "마셔요", gl: "drink" },
      { t: "자요", gl: "sleep" },
      { t: "읽어요", gl: "read" }
    ], correct: 1,
    explain: "물을 마셔요 = 'I drink water'. For liquids (물, 우유, 커피) use 마시다, not 먹다.",
    traps: ["① 먹다 is for solid food (밥, 빵)", "③ 자다 = to sleep — doesn't go with 물", "④ 읽다 = to read (책을 읽어요)"],
    tip: "Liquids → 마셔요, solid food → 먹어요. This pair is tested often.",
    optExplain: [
      "① '먹어요'는 밥, 빵 같은 고체 음식을 먹을 때 써요. 물은 액체라서 '물을 먹어요'는 어색하고 '물을 마셔요'가 맞아요.",
      "②가 정답이에요. 물, 우유, 커피 같은 액체는 '마시다'를 써요. '저는 아침에 물을 마셔요'는 '아침에 물을 마신다'는 뜻으로 자연스러워요.",
      "③ '자요'는 '잠을 자다'라는 뜻이에요. '물을 자요'는 의미가 성립하지 않아서 물과 전혀 어울리지 않아요.",
      "④ '읽어요'는 '책을 읽어요'처럼 글이나 책에 쓰는 동사예요. 물에는 쓸 수 없어서 틀렸어요."
    ],
    optExplainEn: [
      "① is wrong because '먹어요' is used for solid food like rice (밥) or bread (빵). Water is a liquid, so '물을 먹어요' sounds unnatural; '물을 마셔요' is the correct expression.",
      "② is the correct answer. Liquids such as water (물), milk (우유), and coffee (커피) take the verb '마시다' (to drink). '저는 아침에 물을 마셔요' means 'I drink water in the morning' and is completely natural.",
      "③ is wrong because '자요' means 'to sleep'. '물을 자요' (to sleep water) has no valid meaning, so it does not go with 물 at all.",
      "④ is wrong because '읽어요' is a verb used for texts or books, as in '책을 읽어요' (I read a book). It cannot be used with water, so it is incorrect.",
    ],
    tipEn: "Liquids take 마셔요 (drink), solid food takes 먹어요 (eat). This pair is tested frequently."
  },

  { id: "LV1R03", section: "reading", type: "notice", level: 1, points: 3,
    qGl: "Read the notice and choose the correct answer.",
    q: "다음을 읽고 맞는 것을 고르십시오.",
    passage: "도서관에서 조용히 하세요. 음식을 먹지 마세요.",
    passageGl: "Please be quiet in the library. Don't eat food.",
    options: [
      { t: "도서관에서 크게 말해요.", gl: "People speak loudly in the library." },
      { t: "도서관에서 음식을 팔아요.", gl: "The library sells food." },
      { t: "도서관에서 조용히 해요.", gl: "People are quiet in the library." },
      { t: "도서관에서 음악을 들어요.", gl: "People listen to music in the library." }
    ], correct: 2,
    explain: "The notice says 도서관에서 조용히 하세요 (please be quiet in the library) and 음식을 먹지 마세요 (don't eat food). So option ③ is correct.",
    traps: ["① the notice says be quiet, so speaking loudly is wrong", "② eating is banned, not selling", "④ the notice says nothing about music"],
    tip: "Read notice questions twice: first the rule, then what is allowed (할 것) and what is banned (하지 말 것).",
    optExplain: [
      "① '크게 말해요'는 '조용히 하세요'라는 안내와 정반대예요. 크게 말하는 것은 도서관에서 하지 말라고 한 행동이라 틀렸어요.",
      "② 안내문에는 '음식을 먹지 마세요'라고 했지 음식을 파는 이야기는 없어요. 지문에 없는 내용을 새로 만들어 낸 보기예요.",
      "③이 정답이에요. 안내문의 첫 문장 '도서관에서 조용히 하세요'는 '도서관에서 조용히 해요'와 같은 뜻이라 안내 내용과 일치해요.",
      "④ 안내문에는 음악에 대한 말이 전혀 없어요. 음악을 듣는 행동은 안내문에서 확인할 수 없는 내용이라 틀렸어요."
    ],
    optExplainEn: [
      "① is wrong because '크게 말해요' (speak loudly) is the exact opposite of the notice's instruction '조용히 하세요' (please be quiet). Speaking loudly is the behavior the library tells people not to do.",
      "② is wrong because the notice says '음식을 먹지 마세요' (don't eat food) — it says nothing about selling food. This option invents information that is not in the passage.",
      "③ is the correct answer. The first sentence of the notice, '도서관에서 조용히 하세요', has the same meaning as '도서관에서 조용히 해요' (people are quiet in the library), so it matches the notice.",
      "④ is wrong because the notice says nothing about music. Listening to music is content that cannot be confirmed from the notice, so it is incorrect.",
    ],
    tipEn: "Read notice questions twice: first the rule itself, then what is allowed (할 것) versus what is banned (하지 말 것)."
  },

  { id: "LV1R04", section: "reading", type: "comprehension", level: 1, points: 3,
    qGl: "Read and choose the correct answer.",
    q: "다음을 읽고 맞는 것을 고르십시오.",
    passage: "저는 아침에 일곱 시에 일어나요. 여덟 시 반에 학교에 가요.",
    passageGl: "I wake up at 7 in the morning. I go to school at 8:30.",
    options: [
      { t: "저는 일곱 시에 학교에 가요.", gl: "I go to school at 7." },
      { t: "저는 여덟 시 반에 일어나요.", gl: "I wake up at 8:30." },
      { t: "저는 일곱 시에 일어나요.", gl: "I wake up at 7." },
      { t: "저는 여덟 시 반에 자요.", gl: "I sleep at 8:30." }
    ], correct: 2,
    explain: "The passage says 일곱 시에 일어나요 (I wake up at 7). School time is 여덟 시 반 (8:30), not the wake-up time.",
    traps: ["① 7시 is the wake-up time, not the school time", "② 일어나요 is at 7, not 8:30", "④ the passage says school at 8:30, not sleep"],
    tip: "In comprehension questions, find the exact time in the text before choosing.",
    optExplain: [
      "① 지문에서 일곱 시는 일어나는 시간이에요. 학교에 가는 시간은 여덟 시 반이라서 시간을 바꿔 놓은 보기예요.",
      "② 지문에서 여덟 시 반은 학교에 가는 시간이에요. 일어나는 시간은 일곱 시라서 앞뒤가 뒤바뀐 내용이에요.",
      "③이 정답이에요. 지문 첫 문장 '저는 아침에 일곱 시에 일어나요'와 같은 내용이라 맞아요.",
      "④ 지문에는 여덟 시 반에 자는 이야기가 없어요. 여덟 시 반은 학교에 가는 시간이지 자는 시간이 아니에요."
    ],
    optExplainEn: [
      "① is wrong because in the passage 7 o'clock (일곱 시) is the wake-up time. The time for going to school is 8:30 (여덟 시 반), so this option swaps the two times.",
      "② is wrong because in the passage 8:30 (여덟 시 반) is when the person goes to school, not when they wake up. The wake-up time is 7 o'clock, so the facts are reversed here.",
      "③ is the correct answer. It states the same content as the first sentence of the passage, '저는 아침에 일곱 시에 일어나요' (I wake up at 7 in the morning), so it is correct.",
      "④ is wrong because the passage never says the person sleeps at 8:30. 8:30 is the time for going to school, not the time for sleeping.",
    ],
    tipEn: "In comprehension questions, find the exact time in the text before choosing your answer."
  },

  { id: "LV1R05", section: "reading", type: "comprehension", level: 1, points: 3,
    qGl: "Read and choose the correct answer.",
    q: "다음을 읽고 맞는 것을 고르십시오.",
    passage: "우리 가족은 네 명이에요. 아버지는 선생님이세요. 어머니는 의사예요.",
    passageGl: "My family has four people. My father is a teacher. My mother is a doctor.",
    options: [
      { t: "어머니는 선생님이에요.", gl: "My mother is a teacher." },
      { t: "아버지는 의사예요.", gl: "My father is a doctor." },
      { t: "아버지는 선생님이에요.", gl: "My father is a teacher." },
      { t: "가족은 세 명이에요.", gl: "My family has three people." }
    ], correct: 2,
    explain: "The passage says 아버지는 선생님이세요 (my father is a teacher) and 어머니는 의사예요 (my mother is a doctor). Option ③ matches the father's job.",
    traps: ["① the mother is a doctor, not a teacher", "② the father is a teacher, not a doctor", "④ the family has four people (네 명)"],
    tip: "Careful: mother = 어머니, father = 아버지. Don't swap their jobs when reading.",
    optExplain: [
      "① 지문에서 어머니는 의사예요. 선생님은 아버지의 직업이라서 어머니와 선생님을 바꿔 놓은 보기예요.",
      "② 지문에서 아버지는 선생님이고 의사는 어머니예요. 아버지를 의사로 바꾼 내용이라 틀렸어요.",
      "③이 정답이에요. 지문의 '아버지는 선생님이세요'와 정확히 같은 내용이라 맞아요.",
      "④ 지문에서 '우리 가족은 네 명이에요'라고 했어요. 가족이 세 명이라는 말은 지문에 없어서 틀렸어요."
    ],
    optExplainEn: [
      "① is wrong because in the passage the mother (어머니) is a doctor. The teacher is the father's job, so this option swaps the parents' jobs.",
      "② is wrong because in the passage the father (아버지) is a teacher and the doctor is the mother. Turning the father into a doctor contradicts the text.",
      "③ is the correct answer. It says exactly the same thing as the passage's '아버지는 선생님이세요' (my father is a teacher).",
      "④ is wrong because the passage says '우리 가족은 네 명이에요' (my family has four people). The claim that the family has three people is not in the passage.",
    ],
    tipEn: "Be careful: mother = 어머니, father = 아버지. Don't swap their jobs when you read."
  },

  { id: "LV1R06", section: "reading", type: "main_idea", level: 1, points: 3,
    qGl: "Choose what the person is saying.",
    q: "다음을 읽고 무엇에 대한 말인지 고르십시오.",
    passage: "오늘은 날씨가 추워요. 코트를 입고 싶어요.",
    passageGl: "Today the weather is cold. I want to wear a coat.",
    options: [
      { t: "날씨", gl: "weather" },
      { t: "음식", gl: "food" },
      { t: "운동", gl: "exercise" },
      { t: "친구", gl: "friend" }
    ], correct: 0,
    explain: "The person talks about 오늘은 날씨가 추워요 (the weather is cold today) and wearing a coat because of it. The topic is 날씨 (weather).",
    traps: ["② 음식 = food — no food words appear", "③ 운동 = exercise — not mentioned", "④ 친구 = friend — not mentioned"],
    tip: "The topic is often in the first sentence: 추워요 → 날씨.",
    optExplain: [
      "①이 정답이에요. '오늘은 날씨가 추워요'에서 날씨 이야기를 시작하고, 추우니까 코트를 입고 싶다고 했어요. 이 이야기의 화제는 '날씨'예요.",
      "② '음식'은 밥, 빵 같은 먹을거리를 가리켜요. 지문에는 음식과 관련된 단어가 하나도 없어요.",
      "③ '운동'은 달리기, 축구 같은 활동을 말해요. 지문에는 운동과 관련된 단어가 없어서 틀렸어요.",
      "④ '친구'는 사람을 가리키는 말이에요. 지문에는 친구에 대한 이야기가 없어요."
    ],
    optExplainEn: [
      "① is the correct answer. The passage starts by talking about the weather ('오늘은 날씨가 추워요' — today the weather is cold) and then says the person wants to wear a coat because of it. The topic of this passage is '날씨' (weather).",
      "② is wrong because '음식' (food) refers to things you eat like rice or bread. The passage contains no food-related words at all.",
      "③ is wrong because '운동' (exercise) refers to activities like running or soccer. There are no exercise-related words in the passage.",
      "④ is wrong because '친구' (friend) refers to a person. The passage has no story about a friend.",
    ],
    tipEn: "The topic is often in the first sentence: 추워요 (cold) → 날씨 (weather)."
  },

  { id: "LV1R07", section: "reading", type: "main_idea", level: 1, points: 3,
    qGl: "Choose what the person wants to do.",
    q: "다음을 읽고 무엇을 하고 싶은지 고르십시오.",
    passage: "김치볶음밥을 먹고 싶어요. 한식당에 가요.",
    passageGl: "I want to eat kimchi fried rice. I go to a Korean restaurant.",
    options: [
      { t: "한식을 먹고 싶어요.", gl: "I want to eat Korean food." },
      { t: "한식당에서 일하고 싶어요.", gl: "I want to work at a Korean restaurant." },
      { t: "김치를 만들고 싶어요.", gl: "I want to make kimchi." },
      { t: "친구를 만나고 싶어요.", gl: "I want to meet a friend." }
    ], correct: 0,
    explain: "The person says 김치볶음밥을 먹고 싶어요 (I want to eat kimchi fried rice) and goes to a 한식당 (Korean restaurant). So the wish is to eat Korean food.",
    traps: ["② working (일하고) at the restaurant is not said", "③ making kimchi (만들고) is not said", "④ meeting a friend is not mentioned"],
    tip: "싶어요 = 'want to'. Look at what comes right before 싶어요 — that is the wish.",
    optExplain: [
      "①이 정답이에요. '김치볶음밥을 먹고 싶어요'에서 한식을 먹고 싶다는 마음을 알 수 있고 '한식당에 가요'에서도 한식이 확인돼요.",
      "② 지문에는 한식당에서 '일하고 싶다'는 말이 없어요. 한식당에 가서 먹는 것이지 일하려는 것이 아니에요.",
      "③ '김치를 만들고 싶어요'는 김치를 만드는 것이에요. 지문에서는 김치볶음밥을 '먹고 싶다'고 했지 만들고 싶다고 하지 않았어요.",
      "④ 지문에는 친구를 만나는 이야기가 전혀 없어요. 지문에 없는 내용이라 틀렸어요."
    ],
    optExplainEn: [
      "① is the correct answer. From '김치볶음밥을 먹고 싶어요' we can see the person wants to eat Korean food, and '한식당에 가요' (I go to a Korean restaurant) confirms it.",
      "② is wrong because the passage never says the person wants to 'work' (일하다) at the restaurant. The person goes there to eat, not to work.",
      "③ is wrong because it says '김치를 만들고 싶어요' (I want to make kimchi). The passage says the person wants to 'eat' kimchi fried rice, not make it.",
      "④ is wrong because there is no story about meeting a friend in the passage. This content does not appear anywhere, so it is incorrect.",
    ],
    tipEn: "싶어요 means 'want to'. Look at what comes right before 싶어요 — that is the wish."
  },

  { id: "LV1R08", section: "reading", type: "grammar", level: 1, points: 2,
    qGl: "Choose the correct word.",
    q: "저는 도서관(    ) 공부해요.",
    options: [
      { t: "에", gl: "to/toward" },
      { t: "에서", gl: "at (place of action)" },
      { t: "까지", gl: "until" },
      { t: "부터", gl: "from" }
    ], correct: 1,
    explain: "도서관에서 공부해요 = 'I study at the library'. 에서 marks the place where an action happens (공부하다).",
    traps: ["① 에 = direction/destination (학교에 가요)", "③ 까지 = 'until' (time or place limit)", "④ 부터 = 'from' (starting point)"],
    tip: "Action place → 에서. Destination with 가다/오다 → 에.",
    optExplain: [
      "① '에'는 가다, 오다 같은 이동 동사와 함께 목적지를 나타내요. '공부해요'처럼 동작이 일어나는 장소에는 '에서'가 맞아요.",
      "②가 정답이에요. '도서관에서 공부해요'에서 '에서'는 공부라는 동작이 일어나는 장소를 나타내요.",
      "③ '까지'는 시간이나 장소의 끝, '~까지'를 나타내요. '도서관까지 공부해요'는 어색하고 뜻도 맞지 않아요.",
      "④ '부터'는 시작점을 나타내요. '도서관부터 공부해요'는 '도서관에서 시작해서 공부한다'는 뜻이 되어 맞지 않아요."
    ],
    optExplainEn: [
      "① is wrong because '에' marks a destination together with movement verbs like 가다 or 오다. For a place where an action takes place, like '공부해요', '에서' is the correct particle.",
      "② is the correct answer. In '도서관에서 공부해요' (I study at the library), '에서' marks the place where the action of studying happens.",
      "③ is wrong because '까지' means 'until' and marks the end point of a time or place. '도서관까지 공부해요' is awkward and does not make sense here.",
      "④ is wrong because '부터' marks a starting point. '도서관부터 공부해요' would mean 'I study starting from the library', which does not fit.",
    ],
    tipEn: "Place of an action → 에서. Destination with 가다/오다 → 에."
  },

  { id: "LV1R09", section: "reading", type: "sentence_pos", level: 1, points: 3,
    qGl: "Choose where the sentence fits best.",
    q: "다음을 읽고 ( ㉠  )에 들어갈 문장을 고르십시오.",
    passage: "가: 오늘 영화를 봐요. ( ㉠  ) 나: 그래요? 몇 시에 영화를 봐요?",
    passageGl: "A: Today I'm watching a movie. ( ㉠  ) B: Really? What time is the movie?",
    options: [
      { t: "영화는 다섯 시에 시작해요.", gl: "The movie starts at 5 o'clock." },
      { t: "영화는 어제 봤어요.", gl: "I watched the movie yesterday." },
      { t: "저는 영화를 안 좋아해요.", gl: "I don't like movies." },
      { t: "다음 주에 영화를 볼 거예요.", gl: "I will watch a movie next week." }
    ], correct: 0,
    explain: "After saying 'I'm watching a movie today', adding 영화는 다섯 시에 시작해요 (the movie starts at 5) is natural, and the reply 'What time is the movie?' fits right after it.",
    traps: ["② 'watched yesterday' contradicts '오늘' (today)", "③ not liking movies contradicts watching one", "④ 'next week' does not answer the today plan"],
    tip: "Read the reply too: 나's question (몇 시에요?) shows what information was just given.",
    optExplain: [
      "①이 정답이에요. 가가 '오늘 영화를 봐요'라고 한 뒤 '영화는 다섯 시에 시작해요'라고 시간을 알려 주면, 나의 질문 '몇 시에 영화를 봐요?'와 자연스럽게 이어져요.",
      "② '영화는 어제 봤어요'는 어제 본 이야기예요. '오늘' 영화를 본다고 했는데 어제라고 하면 앞뒤가 맞지 않아요.",
      "③ '저는 영화를 안 좋아해요'는 영화를 싫어한다는 뜻이에요. 오늘 영화를 보겠다고 한 가의 말과 모순돼요.",
      "④ '다음 주에 영화를 볼 거예요'는 다음 주 이야기예요. 나가 '몇 시에 봐요?'라고 오늘 시간을 물으므로 오늘 내용이 필요해요."
    ],
    optExplainEn: [
      "① is the correct answer. After A says '오늘 영화를 봐요' (I'm watching a movie today), adding '영화는 다섯 시에 시작해요' (the movie starts at 5) gives the time information, and B's question '몇 시에 영화를 봐요?' (what time is the movie?) follows naturally.",
      "② is wrong because '영화는 어제 봤어요' (I watched the movie yesterday) is about yesterday. A said they are watching a movie 'today', so saying yesterday contradicts it.",
      "③ is wrong because '저는 영화를 안 좋아해요' (I don't like movies) contradicts A's statement that they are watching a movie today.",
      "④ is wrong because '다음 주에 영화를 볼 거예요' (I'll watch a movie next week) is about next week. Since B asks '몇 시에 봐요?' about today's time, today's information is needed here.",
    ],
    tipEn: "Read the reply too: B's question (몇 시에요?) reveals what information was just given."
  },

  { id: "LV1R10", section: "reading", type: "vocab", level: 1, points: 2,
    qGl: "Choose the correct answer.",
    q: "다음을 읽고 맞는 것을 고르십시오.",
    passage: "오늘은 수요일이에요.",
    passageGl: "Today is Wednesday.",
    options: [
      { t: "내일은 화요일이에요.", gl: "Tomorrow is Tuesday." },
      { t: "내일은 목요일이에요.", gl: "Tomorrow is Thursday." },
      { t: "내일은 금요일이에요.", gl: "Tomorrow is Friday." },
      { t: "내일은 토요일이에요.", gl: "Tomorrow is Saturday." }
    ], correct: 1,
    explain: "오늘은 수요일 (Wednesday), so 내일 (tomorrow) is 목요일 (Thursday).",
    traps: ["① 화요일 is yesterday (어제), not tomorrow", "③ 금요일 is the day after tomorrow (모레)", "④ 토요일 is two days after tomorrow"],
    tip: "Day order: 월 화 수 목 금 토 일. 오늘 = today, 내일 = tomorrow.",
    optExplain: [
      "① 오늘 수요일의 어제는 화요일이에요. 내일은 목요일이라서 화요일은 하루 전 날짜라 틀렸어요.",
      "②가 정답이에요. 수요일의 다음 날은 목요일이에요. '오늘은 수요일이에요'이므로 '내일은 목요일이에요'가 맞아요.",
      "③ 금요일은 목요일의 다음 날, 즉 모레예요. 내일이 아니라서 틀렸어요.",
      "④ 토요일은 수요일에서 사흘 뒤예요. 내일은 하루 뒤라서 토요일은 맞지 않아요."
    ],
    optExplainEn: [
      "① is wrong because yesterday (어제) for Wednesday is Tuesday (화요일). Tomorrow is Thursday, so Tuesday is one day too early.",
      "② is the correct answer. The day after Wednesday (수요일) is Thursday (목요일). Since '오늘은 수요일이에요' (today is Wednesday), '내일은 목요일이에요' (tomorrow is Thursday) is correct.",
      "③ is wrong because Friday (금요일) is the day after Thursday, which is the day after tomorrow (모레), not tomorrow.",
      "④ is wrong because Saturday (토요일) is three days after Wednesday. Tomorrow is only one day later, so Saturday does not fit.",
    ],
    tipEn: "Day order: 월 화 수 목 금 토 일. 오늘 = today, 내일 = tomorrow."
  },


  // ============ LISTENING (10) ============
  { id: "LV1L01", section: "listening", type: "reply", level: 1, points: 2,
    audioHint: "듣기: 두 사람의 대화를 듣고 답하세요.",
    qGl: "A: What day is it today?  B: ______",
    q: "가: 오늘은 무슨 요일이에요?  나: ______",
    options: [
      { t: "월요일이에요.", gl: "It's Monday." },
      { t: "화요일이에요.", gl: "It's Tuesday." },
      { t: "수요일이에요.", gl: "It's Wednesday." },
      { t: "금요일이에요.", gl: "It's Friday." }
    ], correct: 2,
    explain: "무슨 요일이에요? asks the day of the week. In the dialogue today is 수요일 (Wednesday), so answer 수요일이에요.",
    traps: ["① 월요일 = Monday — wrong day", "② 화요일 = Tuesday — wrong day", "④ 금요일 = Friday — wrong day"],
    tip: "Days of the week: 월 화 수 목 금 토 일. Listen carefully to the day word in the dialogue.",
    optExplain: [
      "① 대화에서 오늘은 수요일이에요. 월요일은 수요일이 아니므로 틀렸어요.",
      "② 화요일은 수요일의 전날이에요. 대화에서 말한 요일과 달라서 틀렸어요.",
      "③이 정답이에요. '무슨 요일이에요?'라는 질문에 대화 속에서 '수요일이에요'라고 답했어요.",
      "④ 금요일은 수요일의 이틀 뒤예요. 대화에서 말한 요일과 맞지 않아요."
    ],
    optExplainEn: [
      "① is wrong because in the dialogue today is Wednesday (수요일). Monday (월요일) is not the day mentioned, so it is incorrect.",
      "② is wrong because Tuesday (화요일) is the day before Wednesday. It is different from the day in the dialogue, so it is incorrect.",
      "③ is the correct answer. In answer to the question '무슨 요일이에요?' (what day is it?), the dialogue says '수요일이에요' (it's Wednesday).",
      "④ is wrong because Friday (금요일) is two days after Wednesday. It does not match the day in the dialogue.",
    ],
    tipEn: "Days of the week: 월 화 수 목 금 토 일. Listen carefully to the day word in the dialogue."
  },

  { id: "LV1L02", section: "listening", type: "reply", level: 1, points: 2,
    audioHint: "듣기: 두 사람의 대화를 듣고 답하세요.",
    qGl: "A: What did you do yesterday?  B: ______",
    q: "가: 어제 뭐 했어요?  나: ______",
    options: [
      { t: "영화를 봐요.", gl: "I watch a movie." },
      { t: "영화를 봤어요.", gl: "I watched a movie." },
      { t: "영화를 볼 거예요.", gl: "I will watch a movie." },
      { t: "영화를 보고 있어요.", gl: "I am watching a movie." }
    ], correct: 1,
    explain: "어제 (yesterday) is past time, and the question uses 했어요 (past). Answer in the past tense: 영화를 봤어요.",
    traps: ["① present tense 봐요 — wrong time", "③ future tense 볼 거예요 — wrong time", "④ progressive 보고 있어요 — wrong time"],
    tip: "Match the tense of the question: 어제 → past (았/었어요), 지금 → present, 내일 → future.",
    optExplain: [
      "① '영화를 봐요'는 지금 보거나 평소 보는 현재형이에요. '어제'라는 과거 시간과 맞지 않아요.",
      "②가 정답이에요. '어제 뭐 했어요?'는 과거를 묻는 질문이에요. '봤어요'는 과거형이라 '영화를 봤어요'가 자연스러운 답이에요.",
      "③ '볼 거예요'는 미래형이에요. 어제 일을 묻는 질문에 미래형으로 답하면 시간이 맞지 않아요.",
      "④ '보고 있어요'는 지금 보고 있는 진행형이에요. 어제의 일을 말할 때는 진행형이 어울리지 않아요."
    ],
    optExplainEn: [
      "① is wrong because '영화를 봐요' is the present tense, used for watching now or as a habit. It does not match the past time word '어제' (yesterday).",
      "② is the correct answer. '어제 뭐 했어요?' (what did you do yesterday?) is a question about the past. '봤어요' is the past tense, so '영화를 봤어요' (I watched a movie) is a natural answer.",
      "③ is wrong because '볼 거예요' is the future tense. Answering a question about yesterday in the future tense does not match the time.",
      "④ is wrong because '보고 있어요' is the progressive form, meaning 'watching right now'. The progressive form does not suit talking about yesterday's events.",
    ],
    tipEn: "Match the tense of the question: 어제 → past (았/었어요), 지금 → present, 내일 → future."
  },

  { id: "LV1L03", section: "listening", type: "reply", level: 1, points: 2,
    audioHint: "듣기: 두 사람의 대화를 듣고 답하세요.",
    qGl: "A: What do you eat in the morning?  B: ______",
    q: "가: 아침에 뭐를 먹어요?  나: ______",
    options: [
      { t: "빵하고 우유를 먹어요.", gl: "I eat bread and milk." },
      { t: "아침에 일곱 시에 일어나요.", gl: "I wake up at 7 in the morning." },
      { t: "학교에서 밥을 먹어요.", gl: "I eat rice at school." },
      { t: "친구하고 같이 먹어요.", gl: "I eat with a friend." }
    ], correct: 0,
    explain: "아침에 뭐를 먹어요? asks what you eat in the morning. The natural answer is the food: 빵하고 우유를 먹어요 (I eat bread and milk).",
    traps: ["② this answers 'what time do you wake up?', not what you eat", "③ 학교에서 = school, not morning", "④ 같이 먹어요 answers 'who with?', not what"],
    tip: "Answer WH-questions with the same information: 뭐 (what) → food; 몇 시 (what time) → time.",
    optExplain: [
      "①이 정답이에요. '아침에 뭐를 먹어요?'는 무엇을 먹는지 묻는 질문이라 '빵하고 우유를 먹어요'처럼 먹는 음식을 답해야 해요.",
      "② '일곱 시에 일어나요'는 몇 시에 일어나는지 '시간'을 답한 거예요. 무엇을 먹는지 묻는 질문에 맞지 않아요.",
      "③ '학교에서 밥을 먹어요'는 어디에서 먹는지 '장소'를 답한 거예요. 아침에 먹는 음식을 묻는 질문과 맞지 않아요.",
      "④ '친구하고 같이 먹어요'는 누구와 먹는지 '사람'을 답한 거예요. 무엇을 먹는지 묻는 질문에 대한 답이 아니에요."
    ],
    optExplainEn: [
      "① is the correct answer. '아침에 뭐를 먹어요?' asks what you eat in the morning, so the answer should name the food you eat, like '빵하고 우유를 먹어요' (I eat bread and milk).",
      "② is wrong because '일곱 시에 일어나요' answers 'what time do you wake up?', giving a time. It does not answer a question about what you eat.",
      "③ is wrong because '학교에서 밥을 먹어요' answers 'where do you eat?', giving a place. It does not answer the question about morning food.",
      "④ is wrong because '친구하고 같이 먹어요' answers 'who do you eat with?', giving a person. It is not an answer to a question about what you eat.",
    ],
    tipEn: "Answer WH-questions with the matching information: 뭐 (what) → food, 몇 시 (what time) → time."
  },

  { id: "LV1L04", section: "listening", type: "reply", level: 1, points: 2,
    audioHint: "듣기: 두 사람의 대화를 듣고 답하세요.",
    qGl: "A: Do you have an older sister?  B: ______",
    q: "가: 누나가 있어요?  나: ______",
    options: [
      { t: "네, 누나가 없어요.", gl: "Yes, I don't have an older sister." },
      { t: "네, 동생이 아니에요.", gl: "Yes, he is not my younger sibling." },
      { t: "아니요, 누나가 두 명이에요.", gl: "No, I have two older sisters." },
      { t: "아니요, 남동생이 있어요.", gl: "No, I have a younger brother." }
    ], correct: 3,
    explain: "누나가 있어요? is a yes/no question about having an older sister. The correct reply: 아니요, 남동생이 있어요 (No, I have a younger brother).",
    traps: ["① 네 + 없어요 contradicts itself", "② 아니에요 answers identity, not existence", "③ 아니요 + two sisters contradicts 'no'"],
    tip: "Match 네/아니요 with 있어요/없어요. Family words: 누나 (older sister), 남동생 (younger brother).",
    optExplain: [
      "① '네'라고 긍정하면서 '누나가 없어요'라고 부정하면 앞뒤가 모순돼요. 긍정할 때는 '있어요', 부정할 때는 '없어요'로 답해야 해요.",
      "② '아니에요'는 '무엇이에요?'처럼 신분이나 정체를 묻는 질문에 쓰여요. '있어요?'라는 존재 질문에는 맞지 않아요.",
      "③ '아니요'라고 부정하면서 '누나가 두 명이에요'라고 긍정하면 모순이에요. 부정의 답에는 '없어요'가 필요해요.",
      "④가 정답이에요. '누나가 있어요?'에 '아니요, 남동생이 있어요'라고 하면 누나는 없고 남동생은 있다는 뜻으로 자연스러워요."
    ],
    optExplainEn: [
      "① is wrong because saying '네' (yes) while saying '누나가 없어요' (I don't have an older sister) is contradictory. A yes-answer should go with '있어요' and a no-answer with '없어요'.",
      "② is wrong because '아니에요' is used for questions about identity, like '무엇이에요?' (what is it?). It does not fit an existence question like '있어요?' (do you have?).",
      "③ is wrong because saying '아니요' (no) while saying '누나가 두 명이에요' (I have two older sisters) is a contradiction. A negative answer needs '없어요'.",
      "④ is the correct answer. Replying '아니요, 남동생이 있어요' (No, I have a younger brother) to '누나가 있어요?' means there is no older sister but there is a younger brother, which is natural.",
    ],
    tipEn: "Match 네/아니요 with 있어요/없어요. Family words: 누나 (older sister), 남동생 (younger brother)."
  },

  { id: "LV1L05", section: "listening", type: "place", level: 1, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 어디에서 하는 말인지 고르세요.",
    qGl: "Listen to the dialogue and choose where this conversation takes place.",
    q: "다음 대화를 듣고, 어디에서 하는 말인지 고르십시오.",
    dialogue: "가: 음료수 하나 주세요. / 나: 네, 여기 있어요. 봉투가 필요해요?",
    options: [
      { t: "편의점", gl: "convenience store" },
      { t: "식당", gl: "restaurant" },
      { t: "병원", gl: "hospital" },
      { t: "우체국", gl: "post office" }
    ], correct: 0,
    explain: "The person buys a drink (음료수) and is asked if a bag (봉투) is needed — this is a typical convenience store (편의점) scene.",
    traps: ["② 식당 = restaurant — where you eat meals", "③ 병원 = hospital — for sick people", "④ 우체국 = post office — for mail"],
    tip: "Key words: 편의점 → 음료수/봉투, 식당 → 밥/주문, 병원 → 아파요/약.",
    optExplain: [
      "①이 정답이에요. '음료수 하나 주세요'로 음료수를 사고, '봉투가 필요해요?'라는 말이 나오는 곳은 편의점이에요.",
      "② 식당은 밥이나 반찬을 주문해서 먹는 곳이에요. 음료수와 봉투 대화는 식당 상황과 거리가 있어요.",
      "③ 병원은 아픈 사람이 진찰을 받는 곳이에요. 대화에는 병원과 관련된 말이 없어요.",
      "④ 우체국은 편지를 보내거나 소포를 부치는 곳이에요. 대화 내용과 맞지 않아요."
    ],
    optExplainEn: [
      "① is the correct answer. '음료수 하나 주세요' (one drink, please) shows someone buying a drink, and the question '봉투가 필요해요?' (do you need a bag?) makes a convenience store (편의점) the most natural setting.",
      "② is wrong because a restaurant (식당) is a place where you order and eat meals like rice and side dishes. A conversation about a drink and a bag is far from a restaurant scene.",
      "③ is wrong because a hospital (병원) is where sick people get medical examinations. The dialogue has no hospital-related words.",
      "④ is wrong because a post office (우체국) is where you send letters or parcels. It does not match the dialogue content.",
    ],
    tipEn: "Key words: 편의점 → 음료수/봉투, 식당 → 밥/주문, 병원 → 아파요/약."
  },

  { id: "LV1L06", section: "listening", type: "place", level: 1, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 어디에서 하는 말인지 고르세요.",
    qGl: "Listen to the dialogue and choose where this conversation takes place.",
    q: "다음 대화를 듣고, 어디에서 하는 말인지 고르십시오.",
    dialogue: "가: 날씨가 좋아요. 산책합시다. / 나: 네, 이쪽으로 걸어요.",
    options: [
      { t: "공원", gl: "park" },
      { t: "은행", gl: "bank" },
      { t: "학교", gl: "school" },
      { t: "시장", gl: "market" }
    ], correct: 0,
    explain: "The people talk about the nice weather, taking a walk (산책) and walking (걸어요) — a park (공원) is the natural place.",
    traps: ["② 은행 = bank — for money", "③ 학교 = school — for studying", "④ 시장 = market — for shopping"],
    tip: "Listen for action words: 산책/걷다 → 공원, 사다 → 시장/가게.",
    optExplain: [
      "①이 정답이에요. '산책합시다', '이쪽으로 걸어요'처럼 걸으며 이야기하는 장소로 공원이 가장 자연스러워요.",
      "② 은행은 돈을 찾거나 맡기는 곳이에요. 산책하자는 대화와 맞지 않아요.",
      "③ 학교는 공부하는 곳이에요. 대화에는 공부와 관련된 말이 없어요.",
      "④ 시장은 물건을 사고파는 곳이에요. 대화에는 사고파는 이야기가 없어서 맞지 않아요."
    ],
    optExplainEn: [
      "① is the correct answer. '산책합시다' (let's take a walk) and '이쪽으로 걸어요' (walk this way) show people walking and talking, and a park (공원) is the most natural place for that.",
      "② is wrong because a bank (은행) is where you withdraw or deposit money. It does not match a conversation about taking a walk.",
      "③ is wrong because a school (학교) is a place for studying. The dialogue has no study-related words.",
      "④ is wrong because a market (시장) is where people buy and sell things. There is no buying or selling in the dialogue, so it does not fit.",
    ],
    tipEn: "Listen for action words: 산책/걷다 → 공원 (park), 사다 → 시장/가게 (market/shop)."
  },

  { id: "LV1L07", section: "listening", type: "topic", level: 1, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 무엇에 대한 말인지 고르세요.",
    qGl: "Listen and choose what the conversation is about.",
    q: "다음을 듣고, 무엇에 대한 말인지 고르십시오.",
    dialogue: "가: 이번 주말에 뭐 할 거예요? / 나: 한국어를 공부하고 친구를 만날 거예요.",
    options: [
      { t: "주말 계획", gl: "weekend plans" },
      { t: "어제 일", gl: "yesterday's events" },
      { t: "음식 주문", gl: "ordering food" },
      { t: "날씨 이야기", gl: "talking about weather" }
    ], correct: 0,
    explain: "The man asks 이번 주말에 뭐 할 거예요? (what will you do this weekend?) — the topic is 주말 계획 (weekend plans).",
    traps: ["② 어제 = yesterday — not mentioned", "③ no food ordering (주문) in the dialogue", "④ no weather words (날씨) in the dialogue"],
    tip: "The topic is usually in the question word: 주말/계획 words show the subject.",
    optExplain: [
      "①이 정답이에요. '이번 주말에 뭐 할 거예요?'라고 주말에 할 일을 물었으니 이 대화의 화제는 주말 계획이에요.",
      "② 대화에는 어제 일에 대한 이야기가 없어요. '이번 주말'이라는 미래 시간만 나와요.",
      "③ 대화에는 음식을 주문하는 말이 없어요. '공부하고 친구를 만날 거예요'라는 계획만 나와요.",
      "④ 대화에는 날씨에 대한 말이 전혀 없어요. 주말 계획 이야기라서 날씨와 관련이 없어요."
    ],
    optExplainEn: [
      "① is the correct answer. '이번 주말에 뭐 할 거예요?' (what will you do this weekend?) asks about what to do on the weekend, so the topic of the conversation is weekend plans (주말 계획).",
      "② is wrong because the dialogue has no story about yesterday's events. Only the future time '이번 주말' (this weekend) appears.",
      "③ is wrong because there is no food ordering in the dialogue. Only the plan '공부하고 친구를 만날 거예요' (study and meet a friend) appears.",
      "④ is wrong because there is no talk about the weather in the dialogue at all. It is a conversation about weekend plans, so it has nothing to do with weather.",
    ],
    tipEn: "The topic is usually in the question word: 주말/계획 words show the subject."
  },

  { id: "LV1L08", section: "listening", type: "topic", level: 1, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 무엇에 대한 말인지 고르세요.",
    qGl: "Listen and choose what the conversation is about.",
    q: "다음을 듣고, 무엇에 대한 말인지 고르십시오.",
    dialogue: "가: 뭐 드릴까요? / 나: 칼국수 두 그릇 주세요.",
    options: [
      { t: "옷", gl: "clothes" },
      { t: "음식", gl: "food" },
      { t: "책", gl: "books" },
      { t: "교통", gl: "transportation" }
    ], correct: 1,
    explain: "The customer orders 칼국수 두 그릇 (two bowls of noodle soup) — the conversation is about 음식 (food).",
    traps: ["① 옷 = clothes — no clothing words", "③ 책 = books — not ordered here", "④ 교통 = transportation — not mentioned"],
    tip: "Food words: 칼국수, 비빔밥, 김치찌개. 그릇 = bowl, 잔 = cup.",
    optExplain: [
      "① 옷은 입는 물건이에요. 대화에는 옷과 관련된 단어가 하나도 없어요.",
      "②가 정답이에요. '칼국수 두 그릇 주세요'는 음식을 주문하는 말이에요. 칼국수는 음식이라 이 대화의 화제는 '음식'이에요.",
      "③ 책은 읽는 물건이에요. 대화에는 책을 주문하거나 읽는 이야기가 없어요.",
      "④ 교통은 버스, 지하철 같은 이동 수단을 말해요. 대화에는 교통과 관련된 말이 없어요."
    ],
    optExplainEn: [
      "① is wrong because clothes (옷) are things you wear. The dialogue contains no clothing-related words at all.",
      "② is the correct answer. '칼국수 두 그릇 주세요' (two bowls of noodle soup, please) is an order for food. Since kalguksu is food, the topic of this conversation is '음식' (food).",
      "③ is wrong because books (책) are things you read. The dialogue has no story about ordering or reading books.",
      "④ is wrong because transportation (교통) refers to means of moving around, like buses or subways. The dialogue has no transportation-related words.",
    ],
    tipEn: "Food words: 칼국수, 비빔밥, 김치찌개. 그릇 = bowl, 잔 = cup."
  },

  { id: "LV1L09", section: "listening", type: "intent", level: 1, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 남자가 무엇을 하려고 하는지 고르세요.",
    qGl: "Listen and choose what the man wants to do.",
    q: "다음을 듣고, 남자가 무엇을 하려고 하는지 고르십시오.",
    dialogue: "가: 실례합니다. 지하철역이 어디예요? / 나: 저기예요. 같이 갈게요.",
    options: [
      { t: "지하철역을 찾으려고 해요.", gl: "He wants to find the subway station." },
      { t: "지하철을 기다리려고 해요.", gl: "He wants to wait for the subway." },
      { t: "친구를 만나려고 해요.", gl: "He wants to meet a friend." },
      { t: "집에 가려고 해요.", gl: "He wants to go home." }
    ], correct: 0,
    explain: "The man asks 지하철역이 어디예요? (where is the subway station?) because he wants to find it (찾으려고 해요).",
    traps: ["② waiting (기다리다) is not said", "③ meeting a friend is not mentioned", "④ going home is not said"],
    tip: "Intent questions: the question the man asks (어디예요? 뭐예요?) shows his purpose.",
    optExplain: [
      "①이 정답이에요. 남자가 '지하철역이 어디예요?'라고 물은 것은 지하철역을 찾고 싶기 때문이에요.",
      "② 남자는 지하철역을 '찾는' 것이지 지하철을 '기다리는' 것이 아니에요. 기다린다는 말은 대화에 없어요.",
      "③ 대화에는 친구를 만나려는 말이 없어요. 지하철역의 위치만 물었어요.",
      "④ 남자는 집에 가려는 것이 아니라 지하철역을 찾으려는 거예요. 대화에 집 이야기는 없어요."
    ],
    optExplainEn: [
      "① is the correct answer. The man asks '지하철역이 어디예요?' (where is the subway station?) because he wants to find it. His purpose is to find the subway station (찾으려고 해요).",
      "② is wrong because the man is 'finding' the subway station, not 'waiting for' the subway. There is no mention of waiting in the dialogue.",
      "③ is wrong because there is no mention of meeting a friend in the dialogue. He only asks about the location of the subway station.",
      "④ is wrong because the man is not trying to go home — he is trying to find the subway station. There is no story about home in the dialogue.",
    ],
    tipEn: "Intent questions: the question the man asks (어디예요? 뭐예요?) shows his purpose."
  },

  { id: "LV1L10", section: "listening", type: "intent", level: 1, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 남자가 무엇을 하려고 하는지 고르세요.",
    qGl: "Listen and choose what the man wants to do.",
    q: "다음을 듣고, 남자가 무엇을 하려고 하는지 고르십시오.",
    dialogue: "가: 연필이 있어요? / 나: 네, 여기 있어요. 쓰세요.",
    options: [
      { t: "연필을 사려고 해요.", gl: "He wants to buy a pencil." },
      { t: "연필을 빌리려고 해요.", gl: "He wants to borrow a pencil." },
      { t: "연필을 만들려고 해요.", gl: "He wants to make a pencil." },
      { t: "연필을 버리려고 해요.", gl: "He wants to throw away a pencil." }
    ], correct: 1,
    explain: "The man asks 연필이 있어요? (do you have a pencil?) and the woman says 쓰세요 (use it) — he wants to borrow a pencil (빌리려고 해요).",
    traps: ["① buying (사다) is not mentioned", "③ making (만들다) is not mentioned", "④ throwing away (버리다) is not mentioned"],
    tip: "빌리다 = to borrow, 빌려주다 = to lend. 있어요? + 쓰세요 → borrowing",
    optExplain: [
      "① 남자는 연필을 사려는 것이 아니에요. '연필이 있어요?'라고 물어서 있는 연필을 쓰려는 상황이에요.",
      "②가 정답이에요. 남자가 '연필이 있어요?'라고 빌리려고 묻고, 여자가 '여기 있어요. 쓰세요'라고 빌려 주니까 남자는 연필을 빌리려고 해요.",
      "③ 남자가 연필을 만들려는 말은 대화에 없어요. 만드는 상황이 아니에요.",
      "④ 남자가 연필을 버리려는 것은 아니에요. 오히려 연필이 필요한 상황이라서 틀렸어요."
    ],
    optExplainEn: [
      "① is wrong because the man is not trying to buy a pencil. He asks '연필이 있어요?' (do you have a pencil?) because he wants to use one that already exists.",
      "② is the correct answer. The man asks '연필이 있어요?' to borrow a pencil, and the woman says '여기 있어요. 쓰세요' (here it is, use it) and lends it to him, so the man wants to borrow a pencil (빌리려고 해요).",
      "③ is wrong because the dialogue has no mention of the man making a pencil. This is not a making situation.",
      "④ is wrong because the man is not trying to throw a pencil away. He actually needs a pencil, so this is incorrect.",
    ],
    tipEn: "빌리다 = to borrow, 빌려주다 = to lend. 있어요? + 쓰세요 → borrowing."
  },

];
