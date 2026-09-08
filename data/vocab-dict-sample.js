/* Vocabulary Dictionary — FINAL schema. Per word fields:
   k, e, r(roman), pos(품사), sub(자동/타동·보통/의존/고유명사 etc), form(불규칙활용·하다동사),
   usg(용법라벨), def(영문 용법 설명), ex/exE(예문 한/영), syn/ant/rel,
   lv(TOPIK I/II), star(중요도 1-3: ★★★=고빈도 필수, 실측 출현 빈도 기준),
   cat(주제 카테고리 id)
   This is the authoritative sample for the whole 4286-word book. */
window.VOCAB_DICT_SAMPLE = [
  { k:"가다", e:"to go", r:"gada", lv:1, star:3, cat:"action",
    pos:"v", sub:"vi", form:"regular",
    usg:"자동사 (intransitive verb)",
    def:"Move to a place. Takes -에/-으로 for the destination; no object.",
    ex:"집에 가요.", exE:"I go home.",
    syn:[], ant:["오다"], rel:["가고 싶다","돌아가다","들어가다","나가다"] },

  { k:"먹다", e:"to eat", r:"meokda", lv:1, star:3, cat:"action",
    pos:"v", sub:"vt", form:"regular",
    usg:"타동사 (transitive verb)",
    def:"Takes a direct object with -을/-를.",
    ex:"밥을 먹어요.", exE:"I eat rice.",
    syn:[], ant:[], rel:["마시다","먹고 싶다"] },

  { k:"공부", e:"study", r:"gongbu", lv:1, star:3, cat:"school",
    pos:"n", sub:"common", form:"하다-verb",
    usg:"명사 · +하다 → 공부하다",
    def:"Activity noun; with -하다 makes 공부하다 'to study'.",
    ex:"한국어 공부를 해요.", exE:"I'm studying Korean.",
    syn:[], ant:[], rel:["공부하다","공부방"] },

  { k:"예쁘다", e:"to be pretty", r:"yeppeuda", lv:1, star:2, cat:"emotion",
    pos:"a", sub:"", form:"ㅂ-irreg",
    usg:"형용사 · ㅂ불규칙 (예쁘다→예뻐요)",
    def:"Descriptive adjective for appearance. ㅂ drops before -아/어.",
    ex:"꽃이 예뻐요.", exE:"The flowers are pretty.",
    syn:["아름답다"], ant:["못생기다"], rel:["예쁘게"] },

  { k:"선생님", e:"teacher", r:"seonsaengnim", lv:1, star:3, cat:"person",
    pos:"n", sub:"common", form:"",
    usg:"명사 · 존칭 (honorific title)",
    def:"Teacher, also a polite title for any respected adult.",
    ex:"선생님, 질문 있어요.", exE:"Teacher, I have a question.",
    syn:[], ant:[], rel:["선생","가르치다","학생"] },

  { k:"밥", e:"rice; meal", r:"bap", lv:1, star:2, cat:"food",
    pos:"n", sub:"common", form:"",
    usg:"명사 (보통명사)",
    def:"Cooked rice or a meal.",
    ex:"밥을 먹었어요.", exE:"I ate a meal.",
    syn:[], ant:[], rel:["밥솥","아침밥","저녁밥"] },

  { k:"기쁘다", e:"to be glad/happy", r:"gippeuda", lv:1, star:1, cat:"emotion",
    pos:"a", sub:"", form:"ㅂ-irreg",
    usg:"형용사 · ㅂ불규칙",
    def:"Feeling joy about something. Conjugated 기뻐요.",
    ex:"합격해서 기뻐요.", exE:"I'm glad I passed.",
    syn:["즐겁다"], ant:["슬프다"], rel:["기쁨","기뻐하다"] },

  { k:"어제", e:"yesterday", r:"eoje", lv:1, star:3, cat:"time",
    pos:"adv", sub:"", form:"",
    usg:"시간 부사",
    def:"Time word for yesterday; pairs with past tense.",
    ex:"어제 영화를 봤어요.", exE:"I watched a movie yesterday.",
    syn:[], ant:["내일"], rel:["어젯밤","그저께"] }
];
