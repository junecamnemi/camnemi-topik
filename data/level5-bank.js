/* Camnemi TOPIK — Level 5 (TOPIK II, advanced) original question bank
   All questions are ORIGINAL Camnemi content — written from scratch to mirror
   the difficulty and patterns of the official TOPIK II Level 5 test.
   Level 5 = advanced: -(으)ㄹ 뿐만 아니라, -는 한, -더라도, -았/었더라면,
   -는 척하다, formal written style, society/science/environment topics.
   Sections: reading (LV5R01-10) + listening (LV5L01-10).
*/
window.LEVEL5_BANK = [
  // ============ READING (10) ============
  { id: "LV5R01", section: "reading", type: "long", level: 5, points: 3,
    qGl: "Read the passage and choose what matches its content.",
    q: "다음을 읽고 내용과 같은 것을 고르십시오.",
    passage: "지난해 국내 커피 시장 규모가 처음으로 12조 원을 넘어섰다. 이는 1인당 연간 커피 소비량이 꾸준히 늘어난 결과로, 전문가들은 커피 소비가 단순한 기호를 넘어 하나의 문화로 자리 잡았다고 분석한다. 그러나 이러한 성장세 뒤에는 폐기되는 일회용 컵의 양이 해마다 증가한다는 문제가 숨어 있다. 이에 따라 일부 지자체는 매장 내 일회용 컵 사용을 금지하는 조례를 도입했고, 시민들의 참여를 이끌기 위한 캠페인도 활발히 진행되고 있다.",
    passageGl: "Last year the domestic coffee market surpassed 12 trillion won for the first time. Experts analyze that this is the result of steadily rising per-capita coffee consumption and that coffee has become more than a simple taste — it is now a culture. Behind this growth, however, hides the problem that the amount of disposable cups discarded increases every year. Accordingly, some local governments introduced ordinances banning disposable cups in stores, and campaigns to draw citizens' participation are also being actively carried out.",
    options: [
      { t: "커피 소비 증가는 환경 문제와 무관하다.", gl: "The rise in coffee consumption has nothing to do with environmental problems." },
      { t: "일회용 컵 사용을 줄이기 위한 노력이 이루어지고 있다.", gl: "Efforts are being made to reduce the use of disposable cups." },
      { t: "1인당 커피 소비량은 최근 들어 감소하기 시작했다.", gl: "Per-capita coffee consumption has recently begun to decrease." },
      { t: "국내 커피 시장 규모는 아직 10조 원을 넘지 못했다.", gl: "The domestic coffee market has not yet surpassed 10 trillion won." }
    ], correct: 1,
    explain: "지문에서 지자체의 일회용 컵 금지 조례와 시민 참여 캠페인을 언급하므로 일회용 컵 사용을 줄이기 위한 노력이 이루어지고 있다는 ②가 내용과 일치한다.",
    traps: ["① 커피 소비 증가와 일회용 컵 폐기 문제가 함께 언급되었다", "③ 소비량이 늘어났다고 했지 줄었다고 하지 않았다", "④ 시장 규모가 12조 원을 넘었다고 했다"],
    tip: "장문 독해는 숫자와 인과 관계에 주목하세요. '처음으로 12조 원'은 증가 추세를, '그러나' 뒤에는 반대되는 문제가 나옵니다.",
    optExplain: [
      "①은 본문의 '폐기되는 일회용 컵의 양이 해마다 증가한다는 문제'라는 내용과 정면으로 배치되어 틀렸어요. 커피 소비 증가는 오히려 환경 문제와 연결되어 있답니다.",
      "②가 정답이에요. 본문에서 일부 지자체가 일회용 컵 사용 금지 조례를 도입하고 시민 참여 캠페인도 진행되고 있다고 했으니, 일회용 컵 사용을 줄이기 위한 노력이 이루어지고 있다는 내용이 정확히 일치해요.",
      "③은 '1인당 연간 커피 소비량이 꾸준히 늘어난 결과'라는 본문 내용과 반대예요. 소비량이 줄기 시작했다는 언급은 어디에도 없으므로 오답이에요.",
      "④는 '시장 규모가 처음으로 12조 원을 넘어섰다'는 본문과 맞지 않아요. 10조 원을 넘지 못했다는 것은 사실과 정면으로 배치돼요."
    ],
    optExplainEn: [
      "① is wrong because it directly contradicts the passage, which says the amount of disposable cups discarded increases every year. The growth in coffee consumption is actually connected to environmental problems, not unrelated to them.",
      "② is the correct answer. The passage says some local governments introduced ordinances banning disposable cups in stores and that campaigns to encourage citizen participation are being actively carried out, so the statement that efforts are being made to reduce disposable cup use matches the content exactly.",
      "③ is the opposite of the passage, which states that per-capita annual coffee consumption has steadily increased. There is no mention anywhere of consumption beginning to decrease, so this option is incorrect.",
      "④ does not match the passage, which says the market size surpassed 12 trillion won for the first time. Claiming that it has not yet surpassed 10 trillion won directly contradicts the facts in the passage."
    ],
    tipEn: "In long reading passages, pay attention to numbers and cause-and-effect relationships. '12 trillion won for the first time' signals an upward trend, and what follows 'however' is the opposing problem."
  },
  { id: "LV5R02", section: "reading", type: "long", level: 5, points: 3,
    qGl: "Read the passage and choose what matches its content.",
    q: "다음을 읽고 내용과 같은 것을 고르십시오.",
    passage: "수면 부족이 단순한 피로에 그치지 않고 기억력과 판단력에까지 영향을 미친다는 연구 결과가 잇따라 발표되고 있다. 연구진은 충분한 수면을 취한 집단과 그렇지 않은 집단을 비교한 결과, 수면 시간이 짧을수록 새로운 정보를 오래 기억하지 못할 뿐만 아니라 감정 조절 능력도 떨어지는 것으로 나타났다고 밝혔다. 전문가들은 수면의 질을 높이기 위해서는 잠들기 전 스마트폰 사용을 피하고 규칙적인 취침 시간을 지키는 것이 중요하다고 조언한다.",
    passageGl: "Research results are being announced one after another showing that lack of sleep does not stop at simple fatigue but affects memory and judgment as well. After comparing a group that slept enough with one that did not, researchers reported that the shorter the sleep time, the more people failed to remember new information for long — and their emotional regulation ability also declined. Experts advise that to improve sleep quality it is important to avoid using smartphones before falling asleep and to keep a regular bedtime.",
    options: [
      { t: "수면 부족은 감정 조절 능력에도 부정적인 영향을 준다.", gl: "Lack of sleep also negatively affects emotional regulation ability." },
      { t: "수면 시간이 짧을수록 정보를 더 오래 기억한다.", gl: "The shorter the sleep time, the longer people remember information." },
      { t: "연구 결과, 스마트폰 사용은 수면의 질을 높인다.", gl: "According to research, smartphone use improves sleep quality." },
      { t: "수면의 질보다 수면 시간의 양이 가장 중요하다.", gl: "The amount of sleep time is more important than sleep quality." }
    ], correct: 0,
    explain: "지문에서 수면 시간이 짧을수록 감정 조절 능력도 떨어진다고 했으므로 ①이 내용과 일치한다.",
    traps: ["② 기억을 오래 하지 못한다고 했지 더 오래 기억한다고 하지 않았다", "③ 잠들기 전 스마트폰 사용을 피하라고 조언했다", "④ 양과 질의 비교는 지문에 없다"],
    tip: "'-ㄹ 뿐만 아니라'는 'A뿐 아니라 B도'라는 의미로, 앞뒤 내용이 함께 사실임을 나타냅니다. 둘 다 사실인 선택지를 고르세요.",
    optExplain: [
      "①이 정답이에요. 본문에서 수면 시간이 짧을수록 새로운 정보를 오래 기억하지 못할 뿐만 아니라 감정 조절 능력도 떨어진다고 했으니, 수면 부족이 감정 조절 능력에 부정적인 영향을 준다는 내용이 일치해요.",
      "②는 방향이 반대예요. 본문은 수면 시간이 짧을수록 정보를 오래 기억하지 못한다고 했지, 더 오래 기억한다고 하지 않았어요.",
      "③은 전문가의 조언과 반대예요. 잠들기 전 스마트폰 사용을 피하라고 조언했으므로, 스마트폰 사용이 수면의 질을 높인다는 것은 틀렸어요.",
      "④는 본문에 없는 비교예요. 지문은 수면의 질을 높이는 방법만 언급했을 뿐, 양과 질 중 무엇이 더 중요한지는 비교하지 않았어요."
    ],
    optExplainEn: [
      "① is the correct answer. The passage says the shorter the sleep time, the more people fail to remember new information for long AND their emotional regulation ability also declines, so the claim that lack of sleep negatively affects emotional regulation matches the content.",
      "② has the direction reversed. The passage says the shorter the sleep time, the less people remember information for long — it never says they remember it longer.",
      "③ is the opposite of the experts' advice. Since experts advise avoiding smartphone use before falling asleep, the claim that smartphone use improves sleep quality is wrong.",
      "④ is a comparison that does not appear in the passage. The text only mentions ways to improve sleep quality; it never compares whether quantity or quality of sleep is more important."
    ],
    tipEn: "'-(으)ㄹ 뿐만 아니라' means 'not only A but also B' and shows that both the preceding and following content are true. Choose the option in which both parts are true."
  },
  { id: "LV5R03", section: "reading", type: "comprehension", level: 5, points: 3,
    qGl: "Read the passage and choose the correct answer.",
    q: "다음을 읽고 물음에 답하십시오.",
    passage: "회사는 지난달부터 주 4일 근무제를 시범 운영하고 있다. 시행 두 달 만에 직원들의 만족도는 크게 올랐지만, 업무량은 줄어들지 않았다는 지적도 나온다. 이에 회사 측은 업무 효율을 높이기 위한 교육을 도입할 계획이라고 밝혔다. 일부에서는 근무일이 줄면 고객 응대 시간이 짧아져 서비스 품질이 떨어질 것을 우려하는 목소리도 있다.",
    passageGl: "The company has been piloting a four-day workweek since last month. Within two months of implementation, employee satisfaction rose significantly, but there are also criticisms that the workload has not decreased. In response, the company announced plans to introduce training to raise work efficiency. Some also voice concern that shorter working days will shorten customer service hours and lower service quality.",
    options: [
      { t: "주 4일 근무제는 시행 이후 문제점이 전혀 나타나지 않았다.", gl: "The four-day workweek has shown no problems at all since implementation." },
      { t: "회사는 업무 효율 향상을 위한 교육을 준비하고 있다.", gl: "The company is preparing training to improve work efficiency." },
      { t: "직원들은 근무일이 늘어나기를 원하고 있다.", gl: "Employees want working days to increase." },
      { t: "회사는 주 4일 근무제를 즉시 중단하기로 결정했다.", gl: "The company decided to end the four-day workweek immediately." }
    ], correct: 1,
    explain: "회사 측이 업무 효율을 높이기 위한 교육을 도입할 계획이라고 밝혔으므로 ②가 맞다.",
    traps: ["① 업무량이 줄지 않았다는 지적과 서비스 품질 우려가 있다", "③ 근무일이 늘어나기를 원한다는 내용은 없다", "④ 중단이 아니라 시범 운영 중이며 교육 도입 계획이다"],
    tip: "지문의 동사에 주목하세요: '밝혔다', '우려한다' 등 화자의 태도를 나타내는 표현이 정답의 단서입니다.",
    optExplain: [
      "①은 틀렸어요. 본문에는 업무량이 줄어들지 않았다는 지적과 서비스 품질이 떨어질 것이라는 우려가 함께 언급되어 있어요. 문제점이 전혀 없다는 것은 사실과 달라요.",
      "②가 정답이에요. 회사 측이 업무 효율을 높이기 위한 교육을 도입할 계획이라고 밝혔으므로, 교육을 준비하고 있다는 내용이 일치해요.",
      "③은 본문에 없는 내용이에요. 직원들의 만족도가 올랐다는 언급은 있지만, 근무일이 늘어나기를 원한다는 내용은 어디에도 없어요.",
      "④는 본문과 반대예요. 회사는 시범 운영을 중단하는 것이 아니라 교육 도입을 통해 문제를 해결할 계획이라고 했어요."
    ],
    optExplainEn: [
      "① is wrong. The passage mentions both the criticism that the workload has not decreased and the concern that service quality could drop, so the claim that no problems have appeared at all is not true.",
      "② is the correct answer. The company announced plans to introduce training to raise work efficiency, so the statement that it is preparing such training matches the content.",
      "③ is content that does not appear in the passage. Employee satisfaction is mentioned as having risen, but nowhere does it say employees want more working days.",
      "④ is the opposite of the passage. The company is not ending the pilot; it plans to solve the problems by introducing training."
    ],
    tipEn: "Pay attention to the verbs in the passage: expressions showing the speaker's attitude such as 'announced' (밝혔다) and 'concerned' (우려한다) are clues to the correct answer."
  },
  { id: "LV5R04", section: "reading", type: "comprehension", level: 5, points: 3,
    qGl: "Read the passage and choose the correct answer.",
    q: "다음을 읽고 물음에 답하십시오.",
    passage: "재활용품을 분리배출할 때 가장 흔한 실수는 내용물을 헹구지 않고 버리는 것이다. 음식물 찌꺼기가 묻은 플라스틱은 재활용 과정에서 오염을 일으켜 결국 일반 쓰레기로 처리된다. 전문가들은 라벨을 떼는 것보다 내용물을 깨끗이 씻는 것이 더 중요하다고 강조한다. 또한 비닐류는 재질에 따라 재활용 여부가 달라지므로 지역의 안내를 확인할 필요가 있다.",
    passageGl: "The most common mistake when separating recyclables is throwing them out without rinsing the contents. Plastic with food residue causes contamination during the recycling process and is eventually treated as general waste. Experts emphasize that washing the contents cleanly is more important than removing the label. Also, since whether vinyl can be recycled depends on its material, it is necessary to check local guidance.",
    options: [
      { t: "재활용품은 내용물을 깨끗이 씻어서 버려야 한다.", gl: "Recyclables should be washed clean before disposal." },
      { t: "라벨을 떼는 것이 내용물을 씻는 것보다 중요하다.", gl: "Removing the label is more important than washing the contents." },
      { t: "오염된 플라스틱도 문제없이 재활용된다.", gl: "Contaminated plastic is recycled without any problem." },
      { t: "모든 비닐류는 지역에 관계없이 재활용할 수 있다.", gl: "All vinyl can be recycled regardless of region." }
    ], correct: 0,
    explain: "전문가들이 내용물을 깨끗이 씻는 것이 더 중요하다고 강조했으므로 ①이 맞다.",
    traps: ["② 라벨보다 내용물을 씻는 것이 더 중요하다고 했다", "③ 오염된 플라스틱은 일반 쓰레기로 처리된다", "④ 비닐류는 재질에 따라 재활용 여부가 다르다"],
    tip: "'A보다 B가 더 중요하다'는 비교 표현입니다. 비교의 방향을 정확히 파악해야 오답을 피할 수 있습니다.",
    optExplain: [
      "①이 정답이에요. 전문가들이 라벨을 떼는 것보다 내용물을 깨끗이 씻는 것이 더 중요하다고 강조했으므로, 내용물을 씻어서 버려야 한다는 내용이 일치해요.",
      "②는 비교의 방향이 반대예요. 본문은 라벨을 떼는 것이 아니라 내용물을 씻는 것이 더 중요하다고 했어요.",
      "③은 본문과 반대예요. 음식물 찌꺼기가 묻은 플라스틱은 재활용 과정에서 오염을 일으켜 결국 일반 쓰레기로 처리된다고 했어요.",
      "④는 지나친 일반화예요. 본문은 비닐류가 재질에 따라 재활용 여부가 달라진다고 했으므로, 모든 비닐류를 재활용할 수 있다는 것은 틀렸어요."
    ],
    optExplainEn: [
      "① is the correct answer. Experts emphasize that washing the contents cleanly is MORE important than removing the label, so the statement that recyclables should be washed before disposal matches the content.",
      "② has the comparison direction reversed. The passage says washing the contents is more important than removing the label — not the other way around.",
      "③ is the opposite of the passage. Plastic with food residue causes contamination during recycling and is eventually treated as general waste, so it is NOT recycled without a problem.",
      "④ is an overgeneralization. The passage says whether vinyl can be recycled depends on its material, so claiming all vinyl can be recycled is wrong."
    ],
    tipEn: "'A보다 B가 더 중요하다' is a comparison expression meaning 'B is more important than A.' You must grasp the direction of the comparison exactly to avoid wrong answers."
  },
  { id: "LV5R05", section: "reading", type: "grammar", level: 5, points: 3,
    qGl: "Choose the correct grammatical form.",
    q: "다음을 읽고 ( ㉠  )에 들어갈 알맞은 표현을 고르십시오.",
    passage: "친구가 늦게 오기로 해서 두 시간이나 기다렸다. 아무리 바쁘더라도 연락 한 통은 할 수 있었을 텐데. 다음에는 이런 일이 ( ㉠  ) 약속 시간을 미리 정할 것이다.",
    passageGl: "I waited two whole hours because my friend said he would come late. No matter how busy he was, he could have sent one call. Next time, rather than letting this happen again, I will set the appointment time in advance.",
    options: [
      { t: "없어지더라도", gl: "even if it disappears" },
      { t: "없어지는 한", gl: "as long as it disappears" },
      { t: "없어지지 않도록", gl: "so that it doesn't happen" },
      { t: "없어졌더라면", gl: "if it had disappeared" }
    ], correct: 2,
    explain: "이런 일이 없어지지 않도록 = 'so that this doesn't happen again'. -(으)도록은 목적이나 결과를 나타내며, 앞의 의지(약속 시간을 미리 정할 것이다)와 자연스럽게 연결된다.",
    traps: ["① -더라도는 양보(비록 ~해도)를 나타내어 문맥에 맞지 않는다", "② -는 한은 '~하는 동안에는' 조건의 의미라 어색하다", "④ -았/었더라면은 과거 사실의 반대 가정이라 맞지 않다"],
    tip: "빈칸 뒤에 의지 표현(것이다)이 오면 앞에는 목적을 나타내는 '-도록'이 잘 어울립니다.",
    optExplain: [
      "① '-더라도'는 '비록 ~해도'라는 양보의 의미예요. '이런 일이 없어지더라도'는 '없어져도'라는 뜻이 되어, 다음에는 약속 시간을 미리 정하겠다는 의지와 연결되지 않아요.",
      "② '-는 한'은 '~하는 동안에는'이라는 조건의 의미인데, '이런 일이 없어지는 한'은 '없어지는 동안에는'이라는 어색한 뜻이 돼요.",
      "③이 정답이에요. '-지 않도록'은 '~하지 않게 하기 위해서'라는 목적을 나타내는데, '이런 일이 없어지지 않도록 약속 시간을 미리 정할 것이다'처럼 뒤의 의지 표현과 자연스럽게 연결돼요.",
      "④ '-았/었더라면'은 과거 사실을 반대로 가정할 때 쓰여요. '없어졌더라면'은 '없어졌었다면'이라는 뜻이라 미래의 다짐을 나타내는 문맥에 맞지 않아요."
    ],
    optExplainEn: [
      "① '-더라도' has a concessive meaning of 'even if ~'. '이런 일이 없어지더라도' would mean 'even if this disappears', which does not connect naturally with the resolve to set the appointment time in advance next time.",
      "② '-는 한' expresses a condition meaning 'as long as ~ / while ~'. '이런 일이 없어지는 한' would awkwardly mean 'as long as this disappears', so it does not fit the context.",
      "③ is the correct answer. '-지 않도록' expresses purpose ('so as not to ~'). '이런 일이 없어지지 않도록 약속 시간을 미리 정할 것이다' (I will set the appointment time in advance so this doesn't happen again) connects naturally with the following expression of intention.",
      "④ '-았/었더라면' is used for counterfactual assumptions about the past. '없어졌더라면' means 'if it had disappeared', which does not fit a context expressing a resolve for the future."
    ],
    tipEn: "When an expression of intention (것이다) follows the blank, the purpose marker '-도록' fits well right before it."
  },
  { id: "LV5R06", section: "reading", type: "grammar", level: 5, points: 3,
    qGl: "Choose the correct grammatical form.",
    q: "다음을 읽고 ( ㉠  )에 들어갈 알맞은 표현을 고르십시오.",
    passage: "대부분의 사람들은 성공한 사람들의 노력은 보지 못하고 화려한 결과만 바라본다. 그러나 그들의 성공 뒤에는 남모르는 고생이 있었다. 성공을 꿈꾸는 한 ( ㉠  ) 각오가 필요하다.",
    passageGl: "Most people do not see the efforts of successful people and only look at the brilliant results. Behind their success, however, there was hardship no one knew about. As long as you dream of success, you need determination.",
    options: [
      { t: "포기하는 법도 없다", gl: "there is no way to give up" },
      { t: "포기하는 척해야 한다", gl: "you should pretend to give up" },
      { t: "포기하지 않는 한 계속 노력해야 한다", gl: "as long as you don't give up, you must keep trying" },
      { t: "포기할수록 좋은 결과가 온다", gl: "the more you give up, the better results come" }
    ], correct: 2,
    explain: "'성공을 꿈꾸는 한'은 '꿈꾸는 동안에는'이라는 조건의 의미로, 뒤에는 그 조건 아래 계속 노력해야 한다는 내용이 온다.",
    traps: ["① '법도 없다'는 불가능을 강조해 앞 문맥과 연결이 어색하다", "② '척하다'는 '~인 체하다'로 거짓 행동을 나타내어 맞지 않다", "④ 포기할수록 좋다는 것은 지문의 논지와 반대다"],
    tip: "-는 한 = '~하는 동안에는(조건)'. 조건 표현 뒤에는 그 조건이 유지되는 한 성립하는 결과가 옵니다.",
    optExplain: [
      "① '-ㄹ 법도 없다'는 '도저히 ~할 수 없다'는 불가능을 강조하는 표현이에요. '포기하는 법도 없다'는 앞의 '성공을 꿈꾸는 한'이라는 조건과 의미상 연결이 어색해요.",
      "② '-는 척하다'는 '~인 체하다'처럼 실제로는 그렇지 않은데 그런 것처럼 행동한다는 뜻이에요. 성공을 위해 각오가 필요하다는 문맥에서 '포기하는 척해야 한다'는 맞지 않아요.",
      "③이 정답이에요. '-지 않는 한'은 '~하지 않는 동안에는'이라는 조건의 의미로, '성공을 꿈꾸는 한 계속 노력해야 한다'는 내용이 자연스럽게 이어져요.",
      "④ '포기할수록 좋은 결과가 온다'는 '~할수록 ~하다'라는 비례 표현인데, 성공하려면 포기하지 말고 노력해야 한다는 글의 논지와 정반대예요."
    ],
    optExplainEn: [
      "① '-ㄹ 법도 없다' emphasizes impossibility ('there is no way to ~'). '포기하는 법도 없다' does not connect meaningfully with the preceding condition 'as long as you dream of success'.",
      "② '-는 척하다' means to pretend/act as if something were true when it is not. In a context about needing determination to succeed, 'you should pretend to give up' does not fit.",
      "③ is the correct answer. '-지 않는 한' expresses a condition meaning 'as long as ~ / while not ~ing'. The content 'as long as you dream of success, you must keep trying' flows naturally from the passage.",
      "④ '포기할수록 좋은 결과가 온다' (the more you give up, the better the results) is a proportional expression that runs directly counter to the passage's point that you must keep trying without giving up."
    ],
    tipEn: "-는 한 = 'as long as ~ / while ~ (a condition)'. After a conditional expression comes a result that holds true as long as that condition is maintained."
  },
  { id: "LV5R07", section: "reading", type: "vocab", level: 5, points: 3,
    qGl: "Choose the word that best fits the blank.",
    q: "다음을 읽고 ( ㉠  )에 들어갈 알맞은 말을 고르십시오.",
    passage: "이번 전시회는 기존의 미술관 틀을 벗어나 시민들이 일상에서 예술을 ( ㉠  )할 수 있도록 기획되었다. 길거리와 공원을 전시 공간으로 활용한 것이 특징이다.",
    passageGl: "This exhibition was planned so that citizens can encounter art in their daily lives, breaking away from the existing art museum frame. Its characteristic is using streets and parks as exhibition spaces.",
    options: [
      { t: "체험", gl: "experience" },
      { t: "위임", gl: "delegation" },
      { t: "단절", gl: "severance" },
      { t: "유보", gl: "reservation/postponement" }
    ], correct: 0,
    explain: "일상에서 예술을 체험할 수 있도록 = 'so that citizens can experience art in daily life'. 전시 공간을 일상으로 확장한 맥락에서 '체험'이 가장 자연스럽다.",
    traps: ["② 위임 = 권한을 맡김 — 예술과 어울리지 않는다", "③ 단절 = 끊어짐 — 전시회의 취지와 반대된다", "④ 유보 = 보류함 — 문맥에 맞지 않는다"],
    tip: "한자어 어휘는 접두사에 주목하세요: 체(體)+험(驗) = 몸으로 겪어봄. 문맥에서 '일상에서 예술을'과 연결되는 단어를 고르세요.",
    optExplain: [
      "①이 정답이에요. '일상에서 예술을 체험할 수 있도록'은 '일상에서 예술을 몸으로 직접 경험할 수 있게'라는 뜻으로, 길거리와 공원을 전시 공간으로 활용한 전시회의 취지와 잘 맞아요.",
      "② '위임'은 '권한이나 일을 남에게 맡김'이라는 뜻이에요. 예술을 위임하다는 표현은 어색하므로 오답이에요.",
      "③ '단절'은 '관계나 연결이 끊어짐'이라는 뜻이에요. 시민들이 일상에서 예술과 단절한다는 것은 전시회를 기획한 취지와 반대예요.",
      "④ '유보'는 '결정을 미루고 보류함'이라는 뜻이에요. '예술을 유보하다'는 문맥에 맞지 않아요."
    ],
    optExplainEn: [
      "① is the correct answer. '일상에서 예술을 체험할 수 있도록' means 'so that citizens can directly experience art in their daily lives', which fits the exhibition's purpose of using streets and parks as exhibition spaces.",
      "② '위임' means 'delegation — entrusting authority or work to someone else'. The expression 'delegate art' is unnatural, so it is incorrect.",
      "③ '단절' means 'severance — a break in a relationship or connection'. Saying citizens are cut off from art in daily life is the opposite of the exhibition's purpose.",
      "④ '유보' means 'reservation/postponement — putting off a decision'. '유보하다 art' does not fit the context at all."
    ],
    tipEn: "For Sino-Korean vocabulary, pay attention to the root characters: 체(體) + 험(驗) = experiencing with the body. Choose the word that connects naturally with 'art in daily life' in the context."
  },
  { id: "LV5R08", section: "reading", type: "order", level: 5, points: 3,
    qGl: "Put the sentences in the correct order.",
    q: "다음을 순서대로 맞게 배열한 것을 고르십시오.",
    passage: "(가) 그런데 도시에서는 빗물이 땅속으로 스며들지 못해 하천으로 빠르게 흘러든다. (나) 도시화로 인해 땅이 아스팔트와 콘크리트로 덮이면서 물 순환이 깨지고 있다. (다) 이 때문에 폭우가 내리면 하천 수위가 갑자기 올라가 침수 피해가 커진다. (라) 자연 상태에서는 빗물이 땅속에 스며들었다가 천천히 하천으로 흘러간다.",
    passageGl: "(a) But in cities rainwater cannot soak into the ground and flows quickly into streams. (b) As urbanization covers the land with asphalt and concrete, the water cycle is breaking. (c) Because of this, when heavy rain falls the river level suddenly rises and flood damage grows. (d) In nature, rainwater soaks into the ground and then slowly flows into streams.",
    options: [
      { t: "(나)-(가)-(라)-(다)", gl: "(b)-(a)-(d)-(c)" },
      { t: "(나)-(라)-(가)-(다)", gl: "(b)-(d)-(a)-(c)" },
      { t: "(라)-(나)-(다)-(가)", gl: "(d)-(b)-(c)-(a)" },
      { t: "(라)-(가)-(다)-(나)", gl: "(d)-(a)-(c)-(b)" }
    ], correct: 1,
    explain: "자연 상태의 물 순환(라) → 도시화로 인한 변화(나) → 도시에서 빗물이 스며들지 못함(가) → 그 결과 침수 피해(다)의 순서가 자연스럽다.",
    traps: ["① (라)가 (나)보다 먼저 와야 한다", "③ (다)는 (가)의 결과이므로 (가) 뒤에 온다", "④ (나)가 (가)보다 먼저 와야 원인이 먼저 제시된다"],
    tip: "순서 배열 문제는 접속사와 지시어가 단서입니다. '그런데'(대조), '이 때문에'(결과)를 따라 흐름을 잡으세요.",
    optExplain: [
      "①은 (나) 다음에 (라)가 아니라 (가)가 와서 순서가 어긋났어요. 자연 상태의 물 순환을 설명하는 (라)는 도시의 문제를 다루는 (가)보다 먼저 나와야 해요.",
      "②가 정답이에요. 도시화로 물 순환이 깨진다는 원인(나) → 자연 상태의 물 순환(라) → 도시에서는 빗물이 스며들지 못함(가) → 그 결과 침수 피해(다)의 흐름이 자연스러워요.",
      "③은 (다)가 (가)보다 앞에 나와요. '이 때문에'로 시작하는 (다)는 (가)의 결과이므로 반드시 (가) 뒤에 와야 해요.",
      "④는 원인인 (나)가 맨 뒤에 왔어요. (가)와 (다)의 내용이 성립하려면 그 원인인 도시화(나)가 먼저 제시되어야 해요."
    ],
    optExplainEn: [
      "① is out of order because (a) comes right after (b) instead of (d). The sentence explaining the natural water cycle (d) should come before (a), which deals with the urban problem.",
      "② is the correct answer. The flow — the cause of the broken water cycle through urbanization (b) → the natural water cycle (d) → rainwater failing to soak in cities (a) → the resulting flood damage (c) — is natural and logical.",
      "③ places (c) before (a). Since (c) begins with '이 때문에' (because of this), it is the RESULT of (a) and must come after (a).",
      "④ puts the cause (b) at the very end. For the contents of (a) and (c) to hold, the cause — urbanization (b) — must be presented first."
    ],
    tipEn: "In sentence-ordering problems, conjunctions and demonstratives are the clues. Follow the flow using '그런데' (contrast) and '이 때문에' (result)."
  },
  { id: "LV5R09", section: "reading", type: "main_idea", level: 5, points: 3,
    qGl: "Choose the writer's main point.",
    q: "다음을 읽고 글쓴이의 생각으로 가장 알맞은 것을 고르십시오.",
    passage: "우리는 흔히 실패를 피해야 할 대상으로 여긴다. 그러나 실패 속에는 자신의 부족한 점을 발견할 수 있는 소중한 기회가 숨어 있다. 실패를 통해 무엇이 잘못되었는지 돌아보지 않는다면 우리는 같은 실수를 반복할 수밖에 없다. 따라서 중요한 것은 실패하지 않는 것이 아니라 실패에서 배우는 태도라고 할 수 있다.",
    passageGl: "We usually regard failure as something to avoid. However, hidden within failure is a precious opportunity to discover one's own shortcomings. If we do not reflect on what went wrong through failure, we cannot help but repeat the same mistakes. Therefore, what matters is not avoiding failure but the attitude of learning from it.",
    options: [
      { t: "실패를 경험하지 않으려면 도전을 피해야 한다.", gl: "To avoid failure, we should avoid challenges." },
      { t: "실패에서 배우는 태도가 중요하다.", gl: "The attitude of learning from failure is important." },
      { t: "실패는 언제나 긍정적인 결과를 가져온다.", gl: "Failure always brings positive results." },
      { t: "실패를 하면 같은 실수를 반복하게 된다.", gl: "Once you fail, you end up repeating the same mistake." }
    ], correct: 1,
    explain: "글쓴이는 '중요한 것은 실패하지 않는 것이 아니라 실패에서 배우는 태도'라고 주장하므로 ②가 핵심 생각이다.",
    traps: ["① 도전을 피하라는 말은 어디에도 없다", "③ '언제나 긍정적'은 과장된 표현이다", "④ 돌아보지 않을 때 반복한다고 했지 실패 자체가 반복을 낳는다고 하지 않았다"],
    tip: "'따라서', '중요한 것은 ~이다' 뒤에 글쓴이의 주장이 나옵니다. 마지막 문장이 핵심인 경우가 많습니다.",
    optExplain: [
      "①은 글쓴이의 주장과 관련 없는 내용이에요. 실패를 피하기 위해 도전을 피하라고 말한 곳은 어디에도 없어요. 오히려 글은 실패를 배움의 기회로 보라고 권해요.",
      "②가 정답이에요. 글쓴이는 '중요한 것은 실패하지 않는 것이 아니라 실패에서 배우는 태도'라고 했으므로, 실패에서 배우는 태도가 중요하다는 것이 핵심 생각이에요.",
      "③은 '언제나 긍정적인 결과'라고 단정해 과장된 표현이에요. 글쓴이는 실패 속에 배울 기회가 숨어 있다고 했지, 항상 좋은 결과가 온다고 하지 않았어요.",
      "④는 조건이 빠져 있어요. 글쓴이는 실패를 통해 돌아보지 않을 때 같은 실수를 반복한다고 했지, 실패 자체가 곧바로 반복으로 이어진다고 하지 않았어요."
    ],
    optExplainEn: [
      "① is unrelated to the writer's argument. Nowhere does the passage say to avoid challenges in order to avoid failure; on the contrary, it encourages viewing failure as an opportunity to learn.",
      "② is the correct answer. The writer states 'what matters is not avoiding failure but the attitude of learning from it', so the attitude of learning from failure is the core idea.",
      "③ is an overstatement that asserts failure 'always' brings positive results. The writer says failure hides an opportunity to learn, not that it always produces good outcomes.",
      "④ leaves out the condition. The writer says we repeat the same mistakes when we do NOT reflect on them through failure — failure itself does not directly lead to repetition."
    ],
    tipEn: "The writer's argument appears after expressions like '따라서' (therefore) and '중요한 것은 ~이다' (what matters is ~). The final sentence is often the key."
  },
  { id: "LV5R10", section: "reading", type: "synonym", level: 5, points: 3,
    qGl: "Choose the word closest in meaning to the underlined word.",
    q: "다음을 읽고 밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오.",
    passage: "이번 조사는 전국 성인 남녀 1,500명을 대상으로 실시되었으며, 응답자의 절반 이상이 생활비 부담을 가장 크게 느끼는 것으로 나타났다. 특히 20대와 30대에서 이러한 부담감이 두드러졌다.",
    passageGl: "This survey was conducted on 1,500 adult men and women nationwide, and more than half of the respondents were found to feel the burden of living costs most strongly. This burden was especially prominent among people in their 20s and 30s.",
    options: [
      { t: "뚜렷했다", gl: "was distinct/clear" },
      { t: "사라졌다", gl: "disappeared" },
      { t: "줄어들었다", gl: "decreased" },
      { t: "비슷했다", gl: "was similar" }
    ], correct: 0,
    explain: "'두드러졌다'는 '특히 눈에 띄었다'는 뜻으로 '뚜렷했다'(분명하고 확실했다)와 의미가 가장 비슷하다.",
    traps: ["② 사라졌다 = 없어졌다 — 반대 의미다", "③ 줄어들었다 = 감소했다 — 부담이 줄었다는 뜻은 아니다", "④ 비슷했다 = 거의 같았다 — 두드러짐과 반대된다"],
    tip: "유의어 문제는 동사 하나하나를 사전적 의미로 바꿔 대입해 보세요. '두드러지다' = 눈에 띄다 = 뚜렷하다.",
    optExplain: [
      "①이 정답이에요. '두드러졌다'는 '특별히 눈에 띄었다'는 뜻이고, '뚜렷했다'는 '분명하고 확실했다'는 뜻으로 의미가 가장 비슷해요.",
      "② '사라졌다'는 '없어졌다'는 뜻이에요. 부담감이 두드러지게 나타났다는 내용이지 사라졌다는 내용이 아니므로 의미가 반대예요.",
      "③ '줄어들었다'는 '감소했다'는 뜻이에요. 생활비 부담이 줄었다는 내용이 아니라 20대와 30대에서 부담감이 특히 컸다는 내용이므로 맞지 않아요.",
      "④ '비슷했다'는 '거의 같았다'는 뜻이에요. 두드러진다는 것은 다른 것과 구별될 만큼 눈에 띈다는 뜻이므로 '비슷했다'와는 반대예요."
    ],
    optExplainEn: [
      "① is the correct answer. '두드러졌다' means 'was especially noticeable/prominent', and '뚜렷했다' means 'was distinct and clear' — the two are closest in meaning.",
      "② '사라졌다' means 'disappeared'. The passage says the burden stood out prominently, not that it disappeared, so the meaning is the opposite.",
      "③ '줄어들었다' means 'decreased'. The passage is about the burden being especially large among people in their 20s and 30s — not about it decreasing — so this does not fit.",
      "④ '비슷했다' means 'was similar/almost the same'. Being prominent (두드러지다) means standing out enough to be distinguished from others, which is the opposite of 'similar'."
    ],
    tipEn: "For synonym questions, substitute each verb with its dictionary meaning and test it in the sentence. '두드러지다' = to stand out (눈에 띄다) = distinct (뚜렷하다)."
  },

  // ============ LISTENING (10) ============
  { id: "LV5L01", section: "listening", type: "intent", level: 5, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르세요.",
    qGl: "Listen and choose what the woman will do next.",
    q: "다음을 듣고, 여자가 이어서 할 행동으로 알맞은 것을 고르십시오.",
    dialogue: "남자: 회의 자료 다 준비됐어? / 여자: 아직이에요. 표 하나를 더 넣어야 하는데 어제 밤늦게까지 데이터를 정리하느라 시간이 없었어요. / 남자: 그럼 지금이라도 빨리 마무리해. 세 시간 후에 시작하니까. / 여자: 네, 바로 수정해서 출력할게요.",
    options: [
      { t: "자료에 표를 추가하고 출력한다.", gl: "She will add a table to the materials and print them." },
      { t: "회의 시간을 세 시간 뒤로 미룬다.", gl: "She will postpone the meeting by three hours." },
      { t: "데이터 정리를 내일로 연기한다.", gl: "She will postpone organizing the data until tomorrow." },
      { t: "자료를 동료에게 맡기고 퇴근한다.", gl: "She will hand the materials to a colleague and leave work." }
    ], correct: 0,
    explain: "여자가 '표 하나를 더 넣어야 한다'고 했고, 남자가 빨리 마무리하라고 하자 '바로 수정해서 출력할게요'라고 답했으므로 표를 추가하고 출력하는 것이 이어서 할 행동이다.",
    traps: ["② 남자가 회의가 세 시간 후에 시작한다고 했지 미룬다고 하지 않았다", "③ 데이터 정리를 연기한다는 말은 없다", "④ 동료에게 맡기고 퇴근한다는 내용은 없다"],
    tip: "대화의 마지막 말이 행동의 단서입니다. '-ㄹ게요'로 끝나는 여자의 마지막 발화에 집중하세요.",
    optExplain: [
      "①이 정답이에요. 여자는 '표 하나를 더 넣어야 한다'고 했고, 남자가 빨리 마무리하라고 하자 '바로 수정해서 출력할게요'라고 답했으므로 표를 추가하고 출력하는 것이 이어서 할 행동이에요.",
      "②는 남자의 말을 오해한 거예요. 남자는 '세 시간 후에 시작하니까'라고 회의가 세 시간 뒤에 시작된다고 했지, 회의 시간을 미룬다고 하지 않았어요.",
      "③은 본문에 없는 내용이에요. 여자는 어제 데이터를 정리하느라 시간이 없었다고 했을 뿐, 정리를 내일로 연기한다고 하지 않았어요.",
      "④는 본문에 없는 내용이에요. 동료에게 자료를 맡기고 퇴근한다는 언급은 대화에 전혀 나오지 않아요."
    ],
    optExplainEn: [
      "① is the correct answer. The woman says she still needs to add one more table, and when the man tells her to finish quickly, she answers 'I'll fix it right away and print it'. So her next action is adding the table and printing the materials.",
      "② misreads the man's words. He says the meeting STARTS in three hours ('세 시간 후에 시작하니까'); he never says the meeting time is being postponed.",
      "③ is content that does not appear in the dialogue. The woman only says she had no time because she was organizing data late into the night; she never says she is postponing the organizing until tomorrow.",
      "④ is content that does not appear in the dialogue. There is no mention at all of handing the materials to a colleague and leaving work."
    ],
    tipEn: "The last thing said in the dialogue is the clue to the action. Focus on the woman's final utterance ending in '-ㄹ게요' (I will ~)."
  },
  { id: "LV5L02", section: "listening", type: "intent", level: 5, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 남자가 이렇게 말한 이유를 고르세요.",
    qGl: "Listen and choose why the man said this.",
    q: "다음을 듣고, 남자가 이렇게 말한 이유로 알맞은 것을 고르십시오.",
    dialogue: "여자: 저번에 보내 주신 견적서 잘 받았습니다. 그런데 단가가 예상보다 높아서 고민이에요. / 남자: 그렇다면 이렇게 하는 게 어떨까요? 수량을 늘리시면 단가를 10퍼센트 할인해 드릴 수 있습니다. / 여자: 정말요? 그럼 수량을 늘리는 쪽으로 검토하겠습니다.",
    options: [
      { t: "계약 조건을 더 유리하게 바꾸려고", gl: "to make the contract terms more favorable" },
      { t: "거래를 파기하려고", gl: "to break off the deal" },
      { t: "배송 날짜를 앞당기려고", gl: "to move up the delivery date" },
      { t: "단가 인상에 대해 사과하려고", gl: "to apologize for the price increase" }
    ], correct: 0,
    explain: "여자가 단가가 높다고 고민하자 남자는 수량을 늘리면 할인해 주겠다고 제안한다. 이는 고객을 잡아 계약 조건을 유리하게 만들기 위한 것이다.",
    traps: ["② 거래를 파기한다는 표현은 없다", "③ 배송 날짜에 대한 언급은 없다", "④ 할인 제안이지 인상 사과가 아니다"],
    tip: "화자의 의도는 제안의 내용에서 드러납니다. '~는 게 어떨까요?' 같은 권유 표현 뒤의 이득(할인)이 의도의 핵심입니다.",
    optExplain: [
      "①이 정답이에요. 여자가 단가가 높다고 고민하자 남자는 수량을 늘리면 10퍼센트 할인해 주겠다고 제안했어요. 이는 고객과의 거래를 유지하면서 계약 조건을 유리하게 만들기 위한 말이에요.",
      "②는 틀렸어요. 남자는 거래를 끊으려는 것이 아니라 오히려 조건을 조정해 거래를 성사시키려고 해요. 파기와 관련된 표현은 전혀 없어요.",
      "③은 본문에 없는 내용이에요. 대화에는 배송 날짜에 대한 언급이 전혀 없어요.",
      "④는 방향이 달라요. 남자는 단가 인상을 사과하는 것이 아니라, 수량을 늘리면 단가를 할인해 주겠다고 제안하고 있어요."
    ],
    optExplainEn: [
      "① is the correct answer. When the woman worries that the unit price is too high, the man proposes a 10 percent discount if she increases the quantity. This is said to keep the customer and make the contract terms more favorable.",
      "② is wrong. The man is not trying to break off the deal; on the contrary, he is adjusting the terms to close the deal. There is no expression related to cancellation at all.",
      "③ is content that does not appear in the dialogue. There is no mention whatsoever of the delivery date.",
      "④ has the direction wrong. The man is not apologizing for a price increase — he is offering a discount on the unit price if the quantity is increased."
    ],
    tipEn: "The speaker's intention is revealed in the content of the suggestion. The benefit that follows a recommendation expression like '~는 게 어떨까요?' (how about ~?) — here, the discount — is the core of the intention."
  },
  { id: "LV5L03", section: "listening", type: "intent", level: 5, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 여자의 심정으로 알맞은 것을 고르세요.",
    qGl: "Listen and choose the woman's feeling.",
    q: "다음을 듣고, 여자의 심정으로 가장 알맞은 것을 고르십시오.",
    dialogue: "여자: 이번 프로젝트 발표, 정말 잘했어요. 심사위원들 반응도 좋았잖아요. / 남자: 그래도 제가 준비한 부분이 다 나오지 못해서 아쉬웠어요. / 여자: 무슨 말씀이에요? 그동안 얼마나 고생하셨는데요. 그 노력 덕분에 오늘 성과가 나온 거예요. 저는 정말 자랑스러워요.",
    options: [
      { t: "자랑스럽고 만족스럽다", gl: "proud and satisfied" },
      { t: "억울하고 분하다", gl: "unfair and resentful" },
      { t: "걱정되고 불안하다", gl: "worried and anxious" },
      { t: "무관심하고 시큰둥하다", gl: "indifferent and lukewarm" }
    ], correct: 0,
    explain: "여자는 남자의 노력 덕분에 성과가 나왔다며 '정말 자랑스러워요'라고 말하므로 자랑스럽고 만족스러운 심정이다.",
    traps: ["② 억울함이나 분함을 나타내는 표현은 없다", "③ 걱정이나 불안은 언급되지 않는다", "④ 오히려 적극적으로 칭찬하고 있다"],
    tip: "심정 문제는 감정 형용사(자랑스럽다, 아쉽다, 안심되다)와 감탄사에 주목하세요. 칭찬과 격려의 맥락에서는 긍정 감정이 정답입니다.",
    optExplain: [
      "①이 정답이에요. 여자는 남자의 노력 덕분에 성과가 나왔다며 '저는 정말 자랑스러워요'라고 말해요. 노력을 칭찬하고 결과에 만족하는 긍정적인 심정이 드러나요.",
      "②는 틀렸어요. 여자는 남자를 적극적으로 칭찬하고 있어요. 억울함이나 분함을 나타내는 표현은 대화에 없어요.",
      "③은 틀렸어요. 여자는 걱정하거나 불안해하는 태도를 보이지 않고, 오히려 결과에 대해 자신감과 긍지를 드러내요.",
      "④는 틀렸어요. 무관심하거나 시큰둥한 태도와 반대로, 여자는 남자의 성과에 대해 매우 적극적이고 열정적으로 반응해요."
    ],
    optExplainEn: [
      "① is the correct answer. The woman says 'I'm really proud' because the results came from the man's efforts. Her positive feelings — praising his hard work and feeling satisfied with the outcome — are clearly revealed.",
      "② is wrong. The woman is actively praising the man. There are no expressions of feeling wronged or resentful in the dialogue.",
      "③ is wrong. The woman does not show a worried or anxious attitude; on the contrary, she displays confidence and pride in the result.",
      "④ is wrong. Contrary to an indifferent or lukewarm attitude, the woman responds to the man's achievement very actively and enthusiastically."
    ],
    tipEn: "For feeling questions, pay attention to emotion adjectives (proud, regretful, relieved) and exclamations. In a context of praise and encouragement, a positive emotion is the answer."
  },
  { id: "LV5L04", section: "listening", type: "detail", level: 5, points: 3,
    audioHint: "듣기: 안내 방송을 듣고 내용과 같은 것을 고르세요.",
    qGl: "Listen to the announcement and choose what matches its content.",
    q: "다음을 듣고, 안내 방송의 내용과 같은 것을 고르십시오.",
    dialogue: "안내 말씀 드립니다. 오늘 오후 3시부터 5시까지 본관 2층 전시실에서 보수 공사가 진행됩니다. 공사 시간 동안 해당 구역의 출입이 통제되오니, 관람객 여러분께서는 3층 임시 전시실을 이용해 주시기 바랍니다. 내일부터는 정상 운영됩니다.",
    options: [
      { t: "전시실 보수 공사는 오늘 오후에만 진행된다.", gl: "The exhibition hall repair work is done only this afternoon." },
      { t: "공사 시간 동안 2층 전시실은 정상 운영된다.", gl: "The 2nd floor hall operates normally during the work." },
      { t: "관람객은 공사 시간 동안 1층에서 대기해야 한다.", gl: "Visitors must wait on the 1st floor during the work." },
      { t: "전시실은 오늘부터 사흘 동안 닫힌다.", gl: "The hall will be closed for three days starting today." }
    ], correct: 0,
    explain: "공사가 오늘 오후 3시부터 5시까지이고 내일부터 정상 운영된다고 했으므로 오늘 오후에만 진행된다는 ①이 맞다.",
    traps: ["② 공사 시간 동안 출입이 통제된다고 했다", "③ 3층 임시 전시실을 이용하라고 했다", "④ 내일부터 정상 운영된다고 했다"],
    tip: "안내 방송은 시간과 장소가 핵심입니다. '몇 시부터 몇 시까지', '어느 층'을 메모하며 들으세요.",
    optExplain: [
      "①이 정답이에요. 안내 방송에서 공사가 오늘 오후 3시부터 5시까지 진행되고 내일부터는 정상 운영된다고 했으므로, 오늘 오후에만 공사가 진행된다는 내용이 일치해요.",
      "②는 본문과 반대예요. 공사 시간 동안 해당 구역의 출입이 통제된다고 했으므로 2층 전시실이 정상 운영된다는 것은 틀렸어요.",
      "③은 장소가 달라요. 관람객은 1층에서 대기하는 것이 아니라 3층 임시 전시실을 이용하라고 안내했어요.",
      "④는 기간이 틀려요. '내일부터는 정상 운영됩니다'라고 했으므로 사흘 동안 닫힌다는 것은 사실과 달라요."
    ],
    optExplainEn: [
      "① is the correct answer. The announcement says the repair work runs today from 3 to 5 PM and that normal operation resumes tomorrow, so the statement that the work happens only this afternoon matches the content.",
      "② is the opposite of the announcement. Since access to the area is controlled during the work, the 2nd floor hall is NOT operating normally.",
      "③ gets the location wrong. Visitors are told to use the temporary exhibition hall on the 3rd floor — not to wait on the 1st floor.",
      "④ gets the period wrong. The announcement says 'normal operation resumes tomorrow', so the claim that the hall is closed for three days is not true."
    ],
    tipEn: "In announcements, time and place are the key. Take notes on 'from what time to what time' and 'which floor' while listening."
  },
  { id: "LV5L05", section: "listening", type: "detail", level: 5, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 내용과 같은 것을 고르세요.",
    qGl: "Listen and choose what matches the dialogue.",
    q: "다음을 듣고, 대화의 내용과 같은 것을 고르십시오.",
    dialogue: "남자: 새로 이사한 집은 어때요? / 여자: 위치는 정말 만족해요. 지하철역까지 5분이니까요. 그런데 소음이 좀 문제예요. 큰길 옆이라서 창문을 닫아도 밤에 차 소리가 들려요. / 남자: 그럼 방음 창문으로 바꾸는 건 어때요? / 여자: 비용이 부담되지만 건강을 생각하면 바꾸는 게 좋을 것 같아요.",
    options: [
      { t: "여자는 지하철역에서 먼 곳에 산다.", gl: "The woman lives far from the subway station." },
      { t: "여자는 새 집의 소음 때문에 고민이다.", gl: "The woman is troubled by noise in the new house." },
      { t: "남자는 새 집의 위치가 마음에 안 든다.", gl: "The man is not happy with the new house's location." },
      { t: "여자는 방음 창문을 바꾸기로 결정하지 못했다.", gl: "The woman has not decided to change the windows." }
    ], correct: 1,
    explain: "여자가 큰길 옆이라 차 소리가 들린다며 소음을 문제로 꼽았으므로 ②가 맞다. 또한 비용이 부담되지만 바꾸는 게 좋을 것 같다고 했으므로 ④는 틀리다.",
    traps: ["① 지하철역까지 5분이라며 위치에 만족한다", "③ 위치에 불만인 것은 여자가 아니라 없다", "④ '바꾸는 게 좋을 것 같아요'로 결정 의사를 밝혔다"],
    tip: "대화의 내용과 같은 것 문제는 선택지 하나하나를 지문과 대조하세요. '그런데' 뒤에 나오는 문제점이 자주 출제 포인트입니다.",
    optExplain: [
      "①은 본문과 반대예요. 여자는 '지하철역까지 5분'이라며 위치에 만족한다고 했으므로 지하철역에서 먼 곳에 산다는 것은 틀렸어요.",
      "②가 정답이에요. 여자는 큰길 옆이라 창문을 닫아도 밤에 차 소리가 들린다며 소음을 문제로 꼽았으므로, 소음 때문에 고민이라는 내용이 일치해요.",
      "③은 틀렸어요. 위치에 대해 불만을 말한 사람은 없어요. 여자는 오히려 위치에 만족하고 있고, 남자는 위치에 대한 의견을 말하지 않아요.",
      "④는 틀렸어요. 여자는 '비용이 부담되지만 건강을 생각하면 바꾸는 게 좋을 것 같아요'라고 말해 방음 창문으로 바꾸기로 결정했어요."
    ],
    optExplainEn: [
      "① is the opposite of the dialogue. The woman says she is satisfied with the location because the subway station is 5 minutes away, so living far from the station is wrong.",
      "② is the correct answer. The woman cites noise as a problem — because the house is next to a main road, she can hear car sounds at night even with the windows closed — so the claim that she is troubled by noise matches.",
      "③ is wrong. No one expresses dissatisfaction with the location. The woman is actually satisfied with it, and the man gives no opinion about the location.",
      "④ is wrong. The woman says 'the cost is a burden, but considering my health, I think changing them is best', so she HAS decided to change to soundproof windows."
    ],
    tipEn: "For 'match the dialogue' questions, compare each option one by one against the passage. The problem mentioned after '그런데' (but/however) is often the test point."
  },
  { id: "LV5L06", section: "listening", type: "main_idea", level: 5, points: 3,
    audioHint: "듣기: 강연의 일부를 듣고 강연자의 생각을 고르세요.",
    qGl: "Listen and choose the speaker's opinion.",
    q: "다음을 듣고, 강연자의 생각으로 가장 알맞은 것을 고르십시오.",
    dialogue: "많은 사람이 공공장소에서 휴대전화로 통화하거나 영상을 볼 때 주변을 의식하지 않습니다. 그러나 소리는 개인에게만 속한 것이 아닙니다. 내가 듣는 소리는 누군가에게는 불편함이 될 수 있습니다. 서로를 배려하는 마음이 있다면 이어폰 하나만으로도 모두가 편안한 공간을 만들 수 있습니다.",
    options: [
      { t: "공공장소에서는 다른 사람을 배려해야 한다.", gl: "In public places we should consider others." },
      { t: "공공장소에서의 휴대전화 사용을 법으로 금지해야 한다.", gl: "Phone use in public places should be banned by law." },
      { t: "소음이 심한 곳에서는 이어폰을 사용해서는 안 된다.", gl: "We should not use earphones in noisy places." },
      { t: "휴대전화 영상 시청은 사적인 공간에서만 허용된다.", gl: "Watching videos on phones is allowed only in private spaces." }
    ], correct: 0,
    explain: "강연자는 소리가 타인에게 불편함이 될 수 있으므로 배려가 필요하다고 말한다. 법적 금지나 사적 공간 제한은 언급하지 않았다.",
    traps: ["② 법으로 금지하자는 내용은 없다", "③ 이어폰 사용을 반대하는 것이 아니라 권장한다", "④ 사적인 공간에서만 허용이라는 규정은 없다"],
    tip: "강연자의 주장은 '~해야 한다', '~할 수 있습니다' 같은 당위·가능 표현에 담깁니다. 예시보다 주장문을 먼저 찾으세요.",
    optExplain: [
      "①이 정답이에요. 강연자는 내가 듣는 소리가 누군가에게는 불편함이 될 수 있으므로 '서로를 배려하는 마음'이 필요하다고 말해요. 공공장소에서 타인을 배려해야 한다는 것이 핵심 생각이에요.",
      "②는 본문에 없는 내용이에요. 강연자는 법으로 금지하자고 주장하지 않고, 배려와 이어폰 사용 같은 개인의 노력을 강조해요.",
      "③은 방향이 반대예요. 강연자는 이어폰 사용을 반대하는 것이 아니라, 이어폰 하나만으로 모두가 편안한 공간을 만들 수 있다며 이어폰 사용을 권장해요.",
      "④는 본문에 없는 규정이에요. 사적인 공간에서만 영상 시청을 허용한다는 내용은 강연에 전혀 없어요."
    ],
    optExplainEn: [
      "① is the correct answer. The speaker says the sound you hear can be uncomfortable for someone else, so 'a heart that considers each other' is needed. Considering others in public places is the core idea.",
      "② is content that does not appear in the talk. The speaker does not argue for a legal ban; instead, he emphasizes individual efforts like consideration and using earphones.",
      "③ has the direction reversed. The speaker does not oppose earphone use; on the contrary, he recommends it, saying that with just one pair of earphones everyone can enjoy a comfortable space.",
      "④ is a rule that does not appear in the talk. There is no content at all about allowing video watching only in private spaces."
    ],
    tipEn: "The speaker's argument is carried by expressions of obligation or possibility like '~해야 한다' (must) and '~할 수 있습니다' (can). Find the claim sentence before the examples."
  },
  { id: "LV5L07", section: "listening", type: "main_idea", level: 5, points: 3,
    audioHint: "듣기: 뉴스를 듣고 무엇에 대한 내용인지 고르세요.",
    qGl: "Listen and choose the main content of the news.",
    q: "다음을 듣고, 뉴스의 내용으로 가장 알맞은 것을 고르십시오.",
    dialogue: "최근 몇 년 사이 택배 물량이 급증하면서 종이 상자와 완충재의 사용이 크게 늘었습니다. 이에 일부 업체는 재사용이 가능한 상자를 도입하고, 소비자에게 상자 반납 시 포인트를 지급하는 방안을 시행하고 있습니다. 업계에서는 이러한 노력이 포장 폐기물 문제를 해결하는 데 도움이 될 것으로 기대하고 있습니다.",
    options: [
      { t: "택배 물량 증가에 따른 포장 폐기물 문제와 대응", gl: "The packaging waste problem from increased parcel volume and responses to it" },
      { t: "택배 요금 인상에 대한 소비자들의 반발", gl: "Consumer backlash against parcel fee increases" },
      { t: "온라인 쇼핑 매출이 감소한 원인 분석", gl: "Analysis of the causes of declining online shopping sales" },
      { t: "포인트 제도 도입 이후 매장 방문객 증가", gl: "Increase in store visitors after the point system" }
    ], correct: 0,
    explain: "뉴스는 택배 물량 증가로 포장 폐기물이 늘어난 문제와 재사용 상자 도입 등 대응책을 다루고 있다.",
    traps: ["② 요금 인상이나 반발은 언급되지 않았다", "③ 온라인 쇼핑 매출 감소는 내용에 없다", "④ 포인트 제도는 소비자의 상자 반납을 유도하기 위한 것이다"],
    tip: "뉴스의 첫 문장에 주제가 나옵니다. '~문제와 대응'처럼 원인과 해결책 두 축을 잡으면 정답이 보입니다.",
    optExplain: [
      "①이 정답이에요. 뉴스는 택배 물량 급증으로 포장 폐기물이 늘어난 문제와, 재사용 상자 도입과 포인트 지급 같은 대응책을 함께 다루고 있어요.",
      "②는 본문에 없는 내용이에요. 택배 요금 인상이나 소비자들의 반발은 뉴스에 언급되지 않았어요.",
      "③은 본문과 반대예요. 온라인 쇼핑 매출이 감소했다는 내용은 없고, 오히려 택배 물량이 급증했다고 해요.",
      "④는 포인트 제도의 목적을 오해한 거예요. 포인트 제도는 소비자가 상자를 반납하도록 유도하기 위한 것으로, 매장 방문객 증가에 대한 내용은 없어요."
    ],
    optExplainEn: [
      "① is the correct answer. The news covers both the problem of packaging waste growing as parcel volume surges and the responses to it, such as introducing reusable boxes and giving points for box returns.",
      "② is content that does not appear in the news. There is no mention of parcel fee increases or consumer backlash.",
      "③ is the opposite of the news. There is no content about online shopping sales declining; on the contrary, the news says parcel volume has surged.",
      "④ misunderstands the purpose of the point system. The point system is designed to encourage consumers to return boxes — there is no content about an increase in store visitors."
    ],
    tipEn: "The topic appears in the first sentence of the news. Grasping the two axes — the cause and the response, like 'the problem and the response to it' — makes the answer visible."
  },
  { id: "LV5L08", section: "listening", type: "topic", level: 5, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 무엇에 대한 이야기인지 고르세요.",
    qGl: "Listen and choose what the conversation is about.",
    q: "다음을 듣고, 두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.",
    dialogue: "여자: 요즘 아침마다 공원에서 운동하는 사람들이 부쩍 늘었지요? / 남자: 맞아요. 저도 지난달부터 걷기 모임에 나가고 있어요. 같은 목표를 가진 사람들과 하니까 꾸준히 하게 되더라고요. / 여자: 저도 다음 달에 시작해 보려고요. 같이하실래요?",
    options: [
      { t: "공원 시설 개선", gl: "improving park facilities" },
      { t: "운동 습관 기르기", gl: "building exercise habits" },
      { t: "날씨 변화 대비", gl: "preparing for weather changes" },
      { t: "지역 봉사 활동", gl: "local volunteer activities" }
    ], correct: 1,
    explain: "두 사람은 걷기 모임과 운동을 꾸준히 하는 이야기를 나누고 있으므로 주제는 '운동 습관 기르기'다.",
    traps: ["① 공원 시설에 대한 이야기는 아니다", "③ 날씨 변화는 언급되지 않았다", "④ 봉사 활동은 대화에 나오지 않는다"],
    tip: "주제 찾기는 대화에 반복해서 나오는 낱말이 단서입니다. '운동, 걷기 모임, 꾸준히'가 반복되면 주제는 운동입니다.",
    optExplain: [
      "①은 틀렸어요. 두 사람은 공원 시설에 대해 이야기하지 않아요. 공원은 운동하는 장소로만 언급될 뿐이에요.",
      "②가 정답이에요. 두 사람은 아침 운동, 걷기 모임, 꾸준히 운동하는 이야기를 나누고 있어요. '운동, 걷기 모임, 꾸준히'가 반복되므로 주제는 운동 습관 기르기예요.",
      "③은 틀렸어요. 대화에는 날씨나 계절 변화에 대한 언급이 전혀 없어요.",
      "④는 틀렸어요. 지역 봉사 활동에 대한 내용은 대화에 나오지 않아요."
    ],
    optExplainEn: [
      "① is wrong. The two are not talking about park facilities. The park is only mentioned as a place to exercise.",
      "② is the correct answer. The two are talking about morning exercise, a walking group, and exercising consistently. Since 'exercise, walking group, consistently' are repeated, the topic is building exercise habits.",
      "③ is wrong. There is no mention of weather or seasonal changes in the dialogue.",
      "④ is wrong. There is no content about local volunteer activities in the dialogue."
    ],
    tipEn: "For topic questions, the words repeated in the conversation are the clue. If 'exercise, walking group, consistently' are repeated, the topic is exercise."
  },
  { id: "LV5L09", section: "listening", type: "reply", level: 5, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 남자의 이어질 말로 알맞은 것을 고르세요.",
    qGl: "Listen and choose the man's natural reply.",
    q: "다음을 듣고, 이어질 말로 알맞은 것을 고르십시오.",
    dialogue: "남자: 팀장님, 이번 보고서 검토는 다 끝나셨습니까? / 여자: 아직이에요. 오늘 안으로 마무리할게요. / 남자: ______",
    options: [
      { t: "그럼 내일까지 꼭 부탁드립니다.", gl: "Then please make sure to have it done by tomorrow." },
      { t: "바쁘신데 죄송하지만 최대한 빨리 부탁드립니다.", gl: "Sorry you're busy, but please do it as soon as possible." },
      { t: "제가 다른 일을 맡아 드릴 테니 천천히 하십시오.", gl: "I'll take on other work, so please take your time." },
      { t: "검토가 끝나면 보고서를 폐기하겠습니다.", gl: "When the review is done, I will discard the report." }
    ], correct: 1,
    explain: "상사에게 보고서 검토를 요청하는 상황에서 '바쁘신데 죄송하지만 최대한 빨리 부탁드립니다'가 가장 자연스럽고 예의 바른 응답이다.",
    traps: ["① 상사가 오늘 안으로 하겠다고 했는데 내일까지로 미루는 것은 어색하다", "③ 부하가 상사에게 일을 맡아 주겠다는 것은 예의에 어긋난다", "④ 검토가 끝난 보고서를 폐기한다는 것은 비현실적이다"],
    tip: "회사 상황의 응답 문제는 상하 관계를 확인하세요. 부하가 상사에게는 정중한 부탁 표현이 정답입니다.",
    optExplain: [
      "①은 어색해요. 팀장님이 '오늘 안으로 마무리할게요'라고 했는데, 부하가 '내일까지 꼭 부탁드립니다'라고 말하면 오히려 마감을 늦추는 셈이 돼요.",
      "②가 정답이에요. 팀장님께 보고서 검토를 부탁하는 상황에서 '바쁘신데 죄송하지만 최대한 빨리 부탁드립니다'라고 말하는 것이 가장 자연스럽고 예의 바른 응답이에요.",
      "③은 상하 관계에 어긋나요. 부하가 상사에게 '제가 다른 일을 맡아 드릴 테니 천천히 하십시오'라고 말하는 것은 예의에 맞지 않아요.",
      "④는 비현실적이에요. 검토가 끝난 보고서를 폐기하겠다는 말은 업무 상황에서 전혀 자연스럽지 않아요."
    ],
    optExplainEn: [
      "① is awkward. The team leader said she will finish it TODAY, so if the subordinate says 'please make sure to have it done by tomorrow', he is actually pushing the deadline back.",
      "② is the correct answer. In a situation of asking the team leader to review the report, 'Sorry you're busy, but please do it as soon as possible' is the most natural and polite response.",
      "③ violates the superior-subordinate relationship. It is not polite for a subordinate to tell a superior 'I'll take on other work, so please take your time'.",
      "④ is unrealistic. Saying he will discard the report once the review is done is completely unnatural in a work situation."
    ],
    tipEn: "For workplace reply questions, check the superior-subordinate relationship. When a subordinate speaks to a superior, a polite request expression is the answer."
  },
  { id: "LV5L10", section: "listening", type: "intent", level: 5, points: 3,
    audioHint: "듣기: 두 사람의 대화를 듣고 여자가 하는 말의 의도를 고르세요.",
    qGl: "Listen and choose the woman's intention.",
    q: "다음을 듣고, 여자가 이렇게 말한 의도로 알맞은 것을 고르십시오.",
    dialogue: "남자: 오늘 저녁에 새로 생긴 레스토랑에 갈래요? / 여자: 그 레스토랑, 예약 없이는 평균 두 시간을 기다려야 한다는 거 아세요? 게다가 오늘은 금요일이라 사람이 더 많을 거예요. / 남자: 아, 그럼 다른 데를 알아볼까요? / 여자: 미리 예약을 해 두면 좋을 것 같아요.",
    options: [
      { t: "레스토랑에 가지 않겠다고 거절하려고", gl: "to refuse to go to the restaurant" },
      { t: "미리 예약할 것을 제안하려고", gl: "to suggest making a reservation in advance" },
      { t: "남자가 음식을 고르는 것을 돕기 위해", gl: "to help the man choose food" },
      { t: "금요일에 약속이 있다는 것을 알리려고", gl: "to inform that she has an appointment on Friday" }
    ], correct: 1,
    explain: "여자는 대기 시간이 길다는 정보를 준 뒤 '미리 예약을 해 두면 좋을 것 같아요'라고 제안하므로 예약을 권하는 의도다.",
    traps: ["① 거절이 아니라 예약을 조건으로 가는 방향을 제시한다", "③ 음식 선택과는 무관하다", "④ 금요일 약속이 아니라 금요일의 혼잡을 언급한 것이다"],
    tip: "'~면 좋을 것 같아요'는 부드러운 제안 표현입니다. 화자의 마지막 제안문이 의도를 결정합니다.",
    optExplain: [
      "①은 틀렸어요. 여자는 가기를 거절하는 것이 아니라, '미리 예약을 해 두면 좋을 것 같아요'라고 하며 예약을 조건으로 가는 방향을 제시해요.",
      "②가 정답이에요. 여자는 예약 없이는 평균 두 시간을 기다려야 한다는 정보를 준 뒤 '미리 예약을 해 두면 좋을 것 같아요'라고 제안해요. 이는 미리 예약할 것을 권하는 말이에요.",
      "③은 틀렸어요. 대화에서 음식을 고르는 내용은 전혀 언급되지 않아요.",
      "④는 오해하기 쉬운 선택지예요. 여자가 언급한 것은 금요일의 혼잡이지, 본인의 약속이 아니에요."
    ],
    optExplainEn: [
      "① is wrong. The woman is not refusing to go; she says 'It would be good to make a reservation in advance', presenting a direction of going on the condition of reserving.",
      "② is the correct answer. After giving the information that without a reservation one must wait an average of two hours, the woman suggests 'It would be good to make a reservation in advance'. This is a recommendation to reserve ahead of time.",
      "③ is wrong. Choosing food is never mentioned anywhere in the dialogue.",
      "④ is an easy option to misunderstand. What the woman mentions is the crowd on Friday, not her own appointment."
    ],
    tipEn: "'~면 좋을 것 같아요' (it would be good if ~) is a soft suggestion expression. The speaker's final suggestion determines the intention."
  }
];
