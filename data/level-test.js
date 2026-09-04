/* Camnemi TOPIK Preparation — placement quiz data
   12 original questions, 2 per difficulty band (1=absolute beginner … 6=advanced).
   Content mirrors the patterns taught in 서울대 한국어 1A–6B. All original.
   Correct answers are spread across ①②③ (never always the first option).
*/
window.QUIZ = [
  // ---- Band 1 · 1A ----
  { band: 1, q: "이것은 무엇입니까? — What is this? (Choose the correct particle answer)",
    options: [
      { t: "책은 이것이에요.", gl: "wrong order" },
      { t: "이것 책이에요.", gl: "missing particle" },
      { t: "이것은 책이에요.", gl: "This is a book." }
    ], correct: 2, explain: "은/는 follows the topic: 이것은 …이에요. — '이것은' is the topic with the particle attached to the noun, so ③ is correct." },
  { band: 1, q: "지금 몇 시예요? — Pick the natural answer:",
    options: [
      { t: "시 3예요.", gl: "wrong order" },
      { t: "3시예요.", gl: "It's 3 o'clock." },
      { t: "3예요 시.", gl: "wrong order" }
    ], correct: 1, explain: "Time = number + 시: 3시예요. The counter 시 comes right after the number, so ② is correct." },

  // ---- Band 2 · 1B ----
  { band: 2, q: "「내일 한국에 가요?」 — How do you say 'I will go to Korea tomorrow'?",
    options: [
      { t: "내일 한국에 갔어요.", gl: "past tense" },
      { t: "내일 한국에 가고 있어요.", gl: "progressive" },
      { t: "내일 한국에 갈 거예요.", gl: "future: ㄹ 거예요" }
    ], correct: 2, explain: "Future = verb stem + ㄹ 거예요: 갈 거예요. 가다 → 갈 거예요, so ③ is correct." },
  { band: 2, q: "「Please don't smoke here」 = ?",
    options: [
      { t: "여기에서 담배를 피우지 마세요.", gl: "지 마세요 = don't" },
      { t: "여기에서 담배를 피우세요.", gl: "please do" },
      { t: "여기에서 담배를 피우고 싶어요.", gl: "want to" }
    ], correct: 0, explain: "Negative command = V-지 마세요: 피우지 마세요, so ① is correct." },

  // ---- Band 3 · 2A/2B ----
  { band: 3, q: "「If you have time, let's meet」 = ?",
    options: [
      { t: "시간이 있어서 만나요.", gl: "because" },
      { t: "시간이 있으면 만나요.", gl: "으면 = if" },
      { t: "시간이 있지만 만나요.", gl: "but" }
    ], correct: 1, explain: "Conditional = V-(으)면: 있으면 = 'if (you) have', so ② is correct." },
  { band: 3, q: "「I have been to Korea before」 = ?",
    options: [
      { t: "한국에 가고 있어요.", gl: "progressive" },
      { t: "한국에 갈 거예요.", gl: "future" },
      { t: "한국에 가 본 적이 있어요.", gl: "ㄴ 적이 있다 = have done before" }
    ], correct: 2, explain: "Experience = V-아/어 보다 + ㄴ 적이 있다: 가 본 적이 있어요, so ③ is correct." },

  // ---- Band 4 · 3A/3B ----
  { band: 4, q: "「He said he is a student」 = ?",
    options: [
      { t: "학생이라고 했어요.", gl: "reported speech (라고 하다)" },
      { t: "학생인데요.", gl: "context" },
      { t: "학생이니까요.", gl: "reason" }
    ], correct: 0, explain: "Reported speech for nouns = N(이)라고 하다: 학생이라고 했어요, so ① is correct." },
  { band: 4, q: "「I'm afraid it will rain」 = ?",
    options: [
      { t: "비가 와서요.", gl: "because" },
      { t: "비가 올까 봐요.", gl: "ㄹ까 봐 = worried that" },
      { t: "비가 오면요.", gl: "if" }
    ], correct: 1, explain: "Concern = V-(으)ㄹ까 봐: 올까 봐요 = 'I'm afraid it will rain', so ② is correct." },

  // ---- Band 5 · 4A/4B ----
  { band: 5, q: "「Not only cheap but also delicious」 = ?",
    options: [
      { t: "싸고 맛있어요.", gl: "simpler, but wrong register here" },
      { t: "싸면 맛있어요.", gl: "if" },
      { t: "싸기만 할 뿐만 아니라 맛있어요.", gl: "ㄹ 뿐만 아니라 = not only…but also" }
    ], correct: 2, explain: "Addition = A/V-(으)ㄹ 뿐만 아니라: 싸기만 할 뿐만 아니라, so ③ is correct." },
  { band: 5, q: "「According to the news, …」 = ?",
    options: [
      { t: "뉴스에 의하면 …", gl: "에 의하면 = according to" },
      { t: "뉴스에 따라서 …", gl: "depending on" },
      { t: "뉴스에 대해서 …", gl: "about" }
    ], correct: 0, explain: "Attribution = N에 의하면: 뉴스에 의하면, so ① is correct." },

  // ---- Band 6 · 5A–6B ----
  { band: 6, q: "「It goes without saying that…」 = ?",
    options: [
      { t: "말할 수 있어서 …", gl: "can speak" },
      { t: "말할 것도 없이 …", gl: "말할 것도 없다 = needless to say" },
      { t: "말하고 나서 …", gl: "after speaking" }
    ], correct: 1, explain: "Fixed idiom: 말할 것도 없다 = 'it goes without saying', so ② is correct." },
  { band: 6, q: "「No matter how hard it is, I will do it」 = ?",
    options: [
      { t: "어려우니까 할 거예요.", gl: "because" },
      { t: "어려우면 할 거예요.", gl: "if" },
      { t: "아무리 어려워도 할 거예요.", gl: "아무리 ~아도 = no matter how" }
    ], correct: 2, explain: "Concession = 아무리 A/V-아도/어도: 아무리 어려워도, so ③ is correct." }
];
