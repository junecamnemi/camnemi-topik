/* Camnemi TOPIK Preparation — curriculum data
   Lessons follow the 서울대 한국어 (SNU) 1A–6B grammar ORDER as a structure blueprint.
   All explanations, examples, and translations are ORIGINAL Camnemi content.
   Structure: LESSONS[book] = { meta, lessons: [ { id, title, theme, grammar[], vocab[] } ] }
*/
window.LESSONS = {
  "1a": {
    title: "Seoul National University Korean 1A",
    book: "서울대 한국어 1A",
    topik: "TOPIK 1 · Beginner",
    cefr: "A1",
    tag: "beginner",
    intro: "Absolute beginner: Hangul, greetings, identity, daily life.",
    lessons: [
      {
        id: "1a-01", title: "자기소개 — Self Introduction", theme: "자기소개",
        grammar: [
          { point: "N은/는 N이에요/예요", name: "Noun + is/am (polite informal)", rule: "Use 은/는 after a consonant, 는 after a vowel. 이에요 after a consonant, 예요 after a vowel.",
            examples: [
              { ko: "저는 스레일린이에요.", rom: "jeoneun seureillin-ieyo", gl: "I am Sreylin.", kh: "ខ្ញុំឈ្មោះ ស្រេយលីន។" },
              { ko: "이것은 책이에요.", rom: "igeoseun chaeg-ieyo", gl: "This is a book.", kh: "នេះជាសៀវភៅ។" }
            ] },
          { point: "N입니까? / N입니다", name: "Is it N? / It is N (formal)", rule: "Formal-polite question and statement form. 입니까 = question, 입니다 = statement.",
            examples: [
              { ko: "학생입니까?", rom: "haksaeng-imnikka", gl: "Are you a student?", kh: "តើអ្នកជាសិស្សមែនទេ?" },
              { ko: "네, 학생입니다.", rom: "ne, haksaeng-imnida", gl: "Yes, I am a student.", kh: "បាទ ខ្ញុំជាសិស្ស។" }
            ] },
          { point: "N이/가 아닙니다", name: "It is not N (formal)", rule: "이/가 attaches to the noun; 아닙니다 = is not.",
            examples: [
              { ko: "저는 학생이 아닙니다.", rom: "jeoneun haksaeng-i animnida", gl: "I am not a student.", kh: "ខ្ញុំមិនមែនជាសិស្សទេ។" }
            ] }
        ],
        vocab: [
          { ko: "저", rom: "jeo", gl: "I (humble)", kh: "ខ្ញុំ" },
          { ko: "이름", rom: "ireum", gl: "name", kh: "ឈ្មោះ" },
          { ko: "학생", rom: "haksaeng", gl: "student", kh: "សិស្ស" },
          { ko: "선생님", rom: "seonsaengnim", gl: "teacher", kh: "គ្រូ" },
          { ko: "나라", rom: "nara", gl: "country", kh: "ប្រទេស" },
          { ko: "캄보디아", rom: "kambodia", gl: "Cambodia", kh: "កម្ពុជា" },
          { ko: "한국", rom: "hanguk", gl: "Korea", kh: "កូរ៉េ" },
          { ko: "사람", rom: "saram", gl: "person", kh: "មនុស្ស" },
          { ko: "친구", rom: "chingu", gl: "friend", kh: "មិត្ត" }
        ]
      },
      {
        id: "1a-02", title: "물건 — Things", theme: "물건 (things)",
        grammar: [
          { point: "N이/가 있어요[없어요]", name: "There is / isn't N", rule: "이 after consonant, 가 after vowel. 있어요 = exists/have, 없어요 = doesn't exist.",
            examples: [
              { ko: "책이 있어요.", rom: "chaeg-i isseoyo", gl: "There is a book / I have a book.", kh: "មានសៀវភៅ។" },
              { ko: "시간이 없어요.", rom: "sigan-i eopseoyo", gl: "I don't have time.", kh: "គ្មានពេលទេ។" }
            ] },
          { point: "이거는/그거는/저거는 N이에요/예요", name: "This/That/That-over-there is N", rule: "이거 = this, 그거 = that (near listener), 저거 = that over there.",
            examples: [
              { ko: "이거는 사전이에요.", rom: "igeoneun sajeon-ieyo", gl: "This is a dictionary.", kh: "នេះជាវចនានុក្រម។" }
            ] },
          { point: "N 주세요", name: "Please give me N", rule: "주세요 = please give me.",
            examples: [
              { ko: "물 주세요.", rom: "mul juseyo", gl: "Please give me water.", kh: "សូមអោយទឹក។" }
            ] },
          { point: "N하고 N, N와/과 N", name: "N and N", rule: "하고 is casual 'and'; 와 after vowel, 과 after consonant.",
            examples: [
              { ko: "빵하고 우유를 샀어요.", rom: "ppang-hago uyu-reul sasseoyo", gl: "I bought bread and milk.", kh: "ខ្ញុំបានទិញនំប៉័ង និងទឹកដោះគោ។" }
            ] }
        ],
        vocab: [
          { ko: "물", rom: "mul", gl: "water", kh: "ទឹក" },
          { ko: "빵", rom: "ppang", gl: "bread", kh: "នំប៉័ង" },
          { ko: "사전", rom: "sajeon", gl: "dictionary", kh: "វចនានុក្រម" },
          { ko: "가방", rom: "gabang", gl: "bag", kh: "កាបូប" },
          { ko: "책", rom: "chaek", gl: "book", kh: "សៀវភៅ" },
          { ko: "시간", rom: "sigan", gl: "time", kh: "ពេលវេលា" }
        ]
      },
      {
        id: "1a-03", title: "일상 — Daily Life", theme: "일상 (daily)",
        grammar: [
          { point: "V-아요/어요", name: "Present polite form", rule: "아요 after vowels ㅏ/ㅗ, 어요 otherwise; 하다 → 해요.",
            examples: [
              { ko: "매일 학교에 가요.", rom: "maeil hakgyo-e gayo", gl: "I go to school every day.", kh: "ខ្ញុំទៅសាលារៀនរាល់ថ្ងៃ។" },
              { ko: "한국어를 공부해요.", rom: "hangugeo-reul gongbuhaeyo", gl: "I study Korean.", kh: "ខ្ញុំរៀនភាសាកូរ៉េ។" }
            ] },
          { point: "N을/를", name: "Object particle", rule: "을 after consonant, 를 after vowel.",
            examples: [
              { ko: "밥을 먹어요.", rom: "bab-eul meogeoyo", gl: "I eat rice/meal.", kh: "ខ្ញុំញ៉ាំបាយ។" }
            ] },
          { point: "N에서", name: "at / in (place of action)", rule: "에서 marks where an action happens.",
            examples: [
              { ko: "도서관에서 공부해요.", rom: "doseogwan-eseo gongbuhaeyo", gl: "I study at the library.", kh: "ខ្ញុំរៀននៅបណ្ណាល័យ។" }
            ] },
          { point: "안 V", name: "don't V (negation)", rule: "안 comes before the verb: 안 가요 = don't go.",
            examples: [
              { ko: "오늘 안 가요.", rom: "oneul an gayo", gl: "I don't go today.", kh: "ថ្ងៃនេះខ្ញុំមិនទៅទេ។" }
            ] }
        ],
        vocab: [
          { ko: "밥", rom: "bap", gl: "rice / meal", kh: "បាយ" },
          { ko: "학교", rom: "hakgyo", gl: "school", kh: "សាលារៀន" },
          { ko: "도서관", rom: "doseogwan", gl: "library", kh: "បណ្ណាល័យ" },
          { ko: "매일", rom: "maeil", gl: "every day", kh: "រាល់ថ្ងៃ" },
          { ko: "오늘", rom: "oneul", gl: "today", kh: "ថ្ងៃនេះ" },
          { ko: "공부하다", rom: "gongbuhada", gl: "to study", kh: "រៀន" }
        ]
      },
      {
        id: "1a-04", title: "위치 — Location", theme: "위치 (location)",
        grammar: [
          { point: "여기가 N이에요/예요", name: "Here is N", rule: "여기 = here, 거기 = there, 저기 = over there.",
            examples: [
              { ko: "여기가 학교예요.", rom: "yeogiga hakgyo-yeyo", gl: "Here is the school.", kh: "ទីនេះជាសាលារៀន។" }
            ] },
          { point: "N에 있어요[없어요]", name: "N is at/in (place)", rule: "에 marks location of existence.",
            examples: [
              { ko: "화장실이 2층에 있어요.", rom: "hwajangsil-i icheung-e isseoyo", gl: "The restroom is on the 2nd floor.", kh: "បន្ទប់ទឹកនៅជាន់ទី២។" }
            ] },
          { point: "N에 가요[와요]", name: "go to / come to N", rule: "에 marks direction; 가요 = go, 와요 = come.",
            examples: [
              { ko: "시장에 가요.", rom: "sijang-e gayo", gl: "I go to the market.", kh: "ខ្ញុំទៅផ្សារ។" }
            ] },
          { point: "N 앞[뒤, 옆]", name: "in front of / behind / next to N", rule: "앞 = front, 뒤 = back, 옆 = side.",
            examples: [
              { ko: "은행이 옆에 있어요.", rom: "eunhaeng-i yeop-e isseoyo", gl: "The bank is next to it.", kh: "ធនាគារនៅក្បែរនោះ។" }
            ] }
        ],
        vocab: [
          { ko: "여기", rom: "yeogi", gl: "here", kh: "ទីនេះ" },
          { ko: "시장", rom: "sijang", gl: "market", kh: "ផ្សារ" },
          { ko: "은행", rom: "eunhaeng", gl: "bank", kh: "ធនាគារ" },
          { ko: "화장실", rom: "hwajangsil", gl: "restroom", kh: "បន្ទប់ទឹក" },
          { ko: "앞", rom: "ap", gl: "front", kh: "ខាងមុខ" },
          { ko: "옆", rom: "yeop", gl: "side", kh: "ខាងក្រោយ/ក្បែរ" }
        ]
      },
      {
        id: "1a-05", title: "과거 — Past Tense", theme: "과거 (past)",
        grammar: [
          { point: "N에 (time)", name: "at (time)", rule: "에 marks time: 3시에 = at 3 o'clock.",
            examples: [
              { ko: "아침 7시에 일어나요.", rom: "achim ilgop-si-e ireonayo", gl: "I wake up at 7 in the morning.", kh: "ខ្ញុំក្រោកនៅម៉ោង៧ព្រឹក។" }
            ] },
          { point: "V-았/었-", name: "Past tense", rule: "았/었 replaces 아요/어요: 가요 → 갔어요, 먹어요 → 먹었어요.",
            examples: [
              { ko: "어제 영화를 봤어요.", rom: "eoje yeonghwa-reul bwasseoyo", gl: "I watched a movie yesterday.", kh: "ម្សិលមិញខ្ញុំបានមើលរឿង។" },
              { ko: "어디에 갔어요?", rom: "eodi-e gasseoyo", gl: "Where did you go?", kh: "តើអ្នកបានទៅណា?" }
            ] },
          { point: "V-고", name: "and then (sequential)", rule: "고 connects actions in sequence: 밥을 먹고 = eat and then…",
            examples: [
              { ko: "밥을 먹고 학교에 갔어요.", rom: "bab-eul meokgo hakgyo-e gasseoyo", gl: "I ate and then went to school.", kh: "ខ្ញុំញ៉ាំបាយ រួចទៅសាលា។" }
            ] }
        ],
        vocab: [
          { ko: "어제", rom: "eoje", gl: "yesterday", kh: "ម្សិលមិញ" },
          { ko: "영화", rom: "yeonghwa", gl: "movie", kh: "រឿង" },
          { ko: "아침", rom: "achim", gl: "morning / breakfast", kh: "ពេលព្រឹក" },
          { ko: "일어나다", rom: "ireonada", gl: "to wake up", kh: "ក្រោក" },
          { ko: "먹다", rom: "meokda", gl: "to eat", kh: "ញ៉ាំ" },
          { ko: "보다", rom: "boda", gl: "to see/watch", kh: "មើល" }
        ]
      },
      {
        id: "1a-06", title: "음식 — Food", theme: "음식 (food)",
        grammar: [
          { point: "V-(으)세요", name: "Please do V (polite request)", rule: "세요 attaches to verb stem: 주세요, 먹으세요.",
            examples: [
              { ko: "김치를 드세요.", rom: "gimchi-reul deuseyo", gl: "Please eat the kimchi.", kh: "សូមញ៉ាំគីមឈី។" }
            ] },
          { point: "N 개[병, 잔, 그릇]", name: "Counters (pieces/bottles/cups/bowls)", rule: "개 = items, 병 = bottles, 잔 = cups, 그릇 = bowls.",
            examples: [
              { ko: "물 한 병 주세요.", rom: "mul han byeong juseyo", gl: "One bottle of water, please.", kh: "សូមទឹកមួយដប។" },
              { ko: "사과 두 개 샀어요.", rom: "sagwa du gae sasseoyo", gl: "I bought two apples.", kh: "ខ្ញុំបានទិញផ្លែប៉ោមពីរ។" }
            ] },
          { point: "N이/가 A-아요/어요", name: "N is + adjective", rule: "Adjectives conjugate like verbs: 맛있어요 = is delicious.",
            examples: [
              { ko: "불고기가 맛있어요.", rom: "bulgogi-ga masisseoyo", gl: "Bulgogi is delicious.", kh: "ប៊ុលកូគីឆ្ងាញ់។" }
            ] },
          { point: "N도", name: "also / too", rule: "도 replaces particles: 저도 = me too.",
            examples: [
              { ko: "저도 한국어를 배워요.", rom: "jeodo hangugeo-reul baewoyo", gl: "I also learn Korean.", kh: "ខ្ញុំក៏រៀនភាសាកូរ៉េដែរ។" }
            ] }
        ],
        vocab: [
          { ko: "김치", rom: "gimchi", gl: "kimchi", kh: "គីមឈី" },
          { ko: "불고기", rom: "bulgogi", gl: "bulgogi", kh: "ប៊ុលកូគី" },
          { ko: "사과", rom: "sagwa", gl: "apple", kh: "ផ្លែប៉ោម" },
          { ko: "맛있다", rom: "masitda", gl: "to be delicious", kh: "ឆ្ងាញ់" },
          { ko: "배우다", rom: "baewooda", gl: "to learn", kh: "រៀន" }
        ]
      },
      {
        id: "1a-07", title: "대조 — Contrast", theme: "대조 (contrast)",
        grammar: [
          { point: "A/V-지만", name: "but", rule: "지만 adds 'but': 좋지만 비싸요 = nice but expensive.",
            examples: [
              { ko: "맛있지만 너무 비싸요.", rom: "masitjiman neomu bissayo", gl: "It's delicious but too expensive.", kh: "ឆ្ងាញ់ ប៉ុន្តែថ្លៃពេក។" }
            ] },
          { point: "A/V-습니다/ㅂ니다", name: "Formal statement", rule: "습니다 after consonant, ㅂ니다 after vowel.",
            examples: [
              { ko: "저는 학생입니다.", rom: "jeoneun haksaeng-imnida", gl: "I am a student.", kh: "ខ្ញុំជាសិស្ស។" }
            ] },
          { point: "A/V-고", name: "and (listing)", rule: "고 lists two qualities/actions: 크고 좋아요 = big and nice.",
            examples: [
              { ko: "방이 크고 깨끗해요.", rom: "bang-i keugo kkaekkeuthaeyo", gl: "The room is big and clean.", kh: "បន្ទប់ធំ ហើយស្អាត។" }
            ] }
        ],
        vocab: [
          { ko: "비싸다", rom: "bissada", gl: "to be expensive", kh: "ថ្លៃ" },
          { ko: "싸다", rom: "ssada", gl: "to be cheap", kh: "ថោក" },
          { ko: "크다", rom: "keuda", gl: "to be big", kh: "ធំ" },
          { ko: "깨끗하다", rom: "kkaekkeuthada", gl: "to be clean", kh: "ស្អាត" }
        ]
      },
      {
        id: "1a-08", title: "추측 & 감탄 — Guess & Exclaim", theme: "추측/감탄",
        grammar: [
          { point: "V-(으)ㄹ까요?", name: "Shall we…? / Do you think…?", rule: "ㄹ까요 after vowel, 을까요 after consonant.",
            examples: [
              { ko: "뭐 먹을까요?", rom: "mwo meogeulkkayo", gl: "What shall we eat?", kh: "តើយើងញ៉ាំអ្វី?" }
            ] },
          { point: "이[그, 저] N", name: "this / that / that-over-there N", rule: "이 N = this N, 그 N = that N, 저 N = that N over there.",
            examples: [
              { ko: "이 가방이 좋아요.", rom: "i gabang-i johayo", gl: "This bag is nice.", kh: "កាបូបនេះល្អ។" }
            ] },
          { point: "A/V-네요", name: "Oh, it's…! (exclamation)", rule: "네요 shows surprise/realization.",
            examples: [
              { ko: "날씨가 좋네요!", rom: "nalssi-ga johneyo", gl: "The weather is nice!", kh: "អាកាសធាតុល្អណាស់!" }
            ] }
        ],
        vocab: [
          { ko: "날씨", rom: "nalssi", gl: "weather", kh: "អាកាសធាតុ" },
          { ko: "좋다", rom: "jota", gl: "to be good", kh: "ល្អ" },
          { ko: "가방", rom: "gabang", gl: "bag", kh: "កាបូប" }
        ]
      }
    ]
  },

  "1b": {
    title: "Seoul National University Korean 1B",
    book: "서울대 한국어 1B",
    topik: "TOPIK 1→2 · Beginner+",
    cefr: "A1–A2",
    tag: "beginner",
    intro: "Work, ability, plans, desire, and giving/receiving.",
    lessons: [
      {
        id: "1b-01", title: "가족 & 능력 — Family & Ability", theme: "가족 / ability",
        grammar: [
          { point: "N(의) N", name: "N's N (possessive)", rule: "의 links possessor to noun: 저의 = my.",
            examples: [
              { ko: "이것은 제 책이에요.", rom: "igeoseun je chaeg-ieyo", gl: "This is my book.", kh: "នេះជាសៀវភៅរបស់ខ្ញុំ។" }
            ] },
          { point: "N을/를 잘하다[잘 못하다]", name: "be good / bad at N", rule: "잘하다 = be good at, 잘 못하다 = be bad at.",
            examples: [
              { ko: "저는 한국어를 잘해요.", rom: "jeoneun hangugeo-reul jalhaeyo", gl: "I am good at Korean.", kh: "ខ្ញុំពូកែភាសាកូរ៉េ។" },
              { ko: "저는 노래를 잘 못해요.", rom: "jeoneun norae-reul jal mothaeyo", gl: "I am not good at singing.", kh: "ខ្ញុំមិនពូកែច្រៀងទេ។" }
            ] },
          { point: "N(이)세요 · A/V-(으)시-", name: "Honorific (teacher/grandparent)", rule: "세요 = honorific of 이에요; 으시- is the honorific infix.",
            examples: [
              { ko: "선생님이세요?", rom: "seonsaengnim-iseyo", gl: "Are you a teacher?", kh: "តើអ្នកជាគ្រូមែនទេ?" }
            ] }
        ],
        vocab: [
          { ko: "가족", rom: "gajok", gl: "family", kh: "គ្រួសារ" },
          { ko: "노래", rom: "norae", gl: "song/singing", kh: "ចម្រៀង" },
          { ko: "잘하다", rom: "jalhada", gl: "to be good at", kh: "ពូកែ" }
        ]
      },
      {
        id: "1b-02", title: "계획 — Plans", theme: "plans & time",
        grammar: [
          { point: "N부터 N까지", name: "from N to N", rule: "부터 = from, 까지 = to/until.",
            examples: [
              { ko: "9시부터 5시까지 일해요.", rom: "ahop-si-buteo daseot-si-kkaji ilhaeyo", gl: "I work from 9 to 5.", kh: "ខ្ញុំធ្វើការពីម៉ោង៩ដល់ម៉ោង៥។" }
            ] },
          { point: "V-아서/어서 (order)", name: "and then (do)…", rule: "아서/어서 links actions in order: 가서 = go and then…",
            examples: [
              { ko: "가게에 가서 빵을 샀어요.", rom: "gage-e gaseo ppang-eul sasseoyo", gl: "I went to the store and bought bread.", kh: "ខ្ញុំទៅហាង ហើយទិញនំប៉័ង។" }
            ] },
          { point: "V-(으)ㄹ 거예요", name: "will (future)", rule: "ㄹ 거예요 after vowel, 을 거예요 after consonant.",
            examples: [
              { ko: "내일 한국에 갈 거예요.", rom: "naeil hanguk-e gal geoyeyo", gl: "I will go to Korea tomorrow.", kh: "ថ្ងៃស្អែកខ្ញុំនឹងទៅកូរ៉េ។" }
            ] }
        ],
        vocab: [
          { ko: "내일", rom: "naeil", gl: "tomorrow", kh: "ថ្ងៃស្អែក" },
          { ko: "일하다", rom: "ilhada", gl: "to work", kh: "ធ្វើការ" },
          { ko: "계획", rom: "gyehoek", gl: "plan", kh: "ផែនការ" }
        ]
      },
      {
        id: "1b-03", title: "금지 & 의무 — Prohibition & Obligation", theme: "rules & obligations",
        grammar: [
          { point: "V-지 마세요", name: "Don't do V", rule: "지 마세요 = negative command.",
            examples: [
              { ko: "여기에서 담배를 피우지 마세요.", rom: "yeogi-eseo dambae-reul piuji maseyo", gl: "Don't smoke here.", kh: "សូមកុំជក់បារីនៅទីនេះ។" }
            ] },
          { point: "N만", name: "only N", rule: "만 = only.",
            examples: [
              { ko: "한국어만 공부해요.", rom: "hangugeo-man gongbuhaeyo", gl: "I study only Korean.", kh: "ខ្ញុំរៀនតែភាសាកូរ៉េប៉ុណ្ណោះ។" }
            ] },
          { point: "V-아야/어야 되다", name: "must / have to", rule: "아야/어야 되다 = must do.",
            examples: [
              { ko: "TOPIK을 봐야 돼요.", rom: "topik-eul bwaya dwaeyo", gl: "I have to take TOPIK.", kh: "ខ្ញុំត្រូវប្រឡង TOPIK។" }
            ] }
        ],
        vocab: [
          { ko: "담배", rom: "dambae", gl: "cigarette", kh: "បារី" },
          { ko: "피우다", rom: "piuda", gl: "to smoke", kh: "ជក់" },
          { ko: "TOPIK", rom: "topik", gl: "TOPIK test", kh: "TOPIK" }
        ]
      },
      {
        id: "1b-04", title: "확인 & 상태 — Confirm & State", theme: "confirm / ongoing state",
        grammar: [
          { point: "A/V-지요? / N(이)지요?", name: "…, right? (confirmation)", rule: "지요? seeks agreement.",
            examples: [
              { ko: "한국어가 재미있지요?", rom: "hangugeo-ga jaemiitjiyo", gl: "Korean is fun, right?", kh: "ភាសាកូរ៉េគួរឱ្យចាប់អារម្មណ៍មែនទេ?" }
            ] },
          { point: "V-고 있다", name: "is -ing (progressive)", rule: "고 있다 = currently doing.",
            examples: [
              { ko: "지금 한국어를 공부하고 있어요.", rom: "jigeum hangugeo-reul gongbuhago isseoyo", gl: "I am studying Korean now.", kh: "ឥឡូវនេះខ្ញុំកំពុងរៀនភាសាកូរ៉េ។" }
            ] },
          { point: "못 V", name: "can't V", rule: "못 before verb = cannot (ability/circumstance).",
            examples: [
              { ko: "오늘 못 가요.", rom: "oneul mot gayo", gl: "I can't go today.", kh: "ថ្ងៃនេះខ្ញុំមិនអាចទៅបានទេ។" }
            ] },
          { point: "A/V-아서/어서 (reason)", name: "because / so", rule: "아서/어서 states reason: 바빠서 = because busy.",
            examples: [
              { ko: "바빠서 못 갔어요.", rom: "bappaseo mot gasseoyo", gl: "I couldn't go because I was busy.", kh: "ខ្ញុំមិនអាចទៅបានទេ ព្រោះរវល់។" }
            ] }
        ],
        vocab: [
          { ko: "지금", rom: "jigeum", gl: "now", kh: "ឥឡូវនេះ" },
          { ko: "재미있다", rom: "jaemiitda", gl: "to be fun", kh: "គួរឱ្យចាប់អារម្មណ៍" },
          { ko: "바쁘다", rom: "bappeuda", gl: "to be busy", kh: "រវល់" }
        ]
      },
      {
        id: "1b-05", title: "의도 & 부탁 — Intention & Requests", theme: "intention / requests",
        grammar: [
          { point: "V-(으)려고 하다", name: "intend to V", rule: "려고 하다 = plan/intend to do.",
            examples: [
              { ko: "한국에 가려고 해요.", rom: "hanguk-e garyeogo haeyo", gl: "I intend to go to Korea.", kh: "ខ្ញុំមានគម្រោងទៅកូរ៉េ។" }
            ] },
          { point: "V-아/어 주다", name: "do V for someone", rule: "주다 = give; 아/어 주다 = do a favour.",
            examples: [
              { ko: "알려 주세요.", rom: "allyeo juseyo", gl: "Please tell me.", kh: "សូមប្រាប់ខ្ញុំ។" }
            ] },
          { point: "N(으)로", name: "by means of / to", rule: "으로 after consonant, 로 after vowel: 버스로 = by bus.",
            examples: [
              { ko: "버스로 왔어요.", rom: "beoseu-ro wasseoyo", gl: "I came by bus.", kh: "ខ្ញុំមកដោយឡានក្រុង។" }
            ] }
        ],
        vocab: [
          { ko: "버스", rom: "beoseu", gl: "bus", kh: "ឡានក្រុង" },
          { ko: "알다", rom: "alda", gl: "to know", kh: "ដឹង" },
          { ko: "부탁", rom: "butak", gl: "request", kh: "ការសុំ" }
        ]
      },
      {
        id: "1b-06", title: "경험 — Experience", theme: "experience",
        grammar: [
          { point: "A-(으)ㄴ N", name: "adjective + noun (modifier)", rule: "ㄴ after vowel, 은 after consonant: 좋은 책 = a good book.",
            examples: [
              { ko: "좋은 친구예요.", rom: "joeun chingu-yeyo", gl: "(He/she is) a good friend.", kh: "ជាមិត្តល្អ។" }
            ] },
          { point: "N한테[께]", name: "to N (recipient)", rule: "한테 = to (casual), 께 = honorific.",
            examples: [
              { ko: "친구한테 선물을 줬어요.", rom: "chingu-hante seonmul-eul jwosseoyo", gl: "I gave a present to my friend.", kh: "ខ្ញុំឲ្យអំណោយទៅមិត្ត។" }
            ] },
          { point: "V-아/어 보세요", name: "try doing V", rule: "아/어 보다 = try; 보세요 = polite suggestion.",
            examples: [
              { ko: "이거 먹어 보세요.", rom: "igeo meogeo boseyo", gl: "Try eating this.", kh: "សូមសាកល្បងញ៉ាំមើល។" }
            ] }
        ],
        vocab: [
          { ko: "선물", rom: "seonmul", gl: "present/gift", kh: "អំណោយ" },
          { ko: "주다", rom: "juda", gl: "to give", kh: "ឲ្យ" },
          { ko: "시도", rom: "sido", gl: "attempt/try", kh: "ការសាកល្បង" }
        ]
      },
      {
        id: "1b-07", title: "조건 & 소망 — Conditions & Wishes", theme: "conditions / wishes",
        grammar: [
          { point: "A/V-(으)면", name: "if…", rule: "면 after vowel, 으면 after consonant.",
            examples: [
              { ko: "시간이 있으면 같이 가요.", rom: "sigan-i isseumyeon gachi gayo", gl: "If you have time, let's go together.", kh: "បើមានពេល យើងទៅជាមួយគ្នា។" }
            ] },
          { point: "V-고 싶다", name: "want to V", rule: "고 싶다 = want to do.",
            examples: [
              { ko: "한국 친구를 만들고 싶어요.", rom: "hanguk chingu-reul mandeulgosipeoyo", gl: "I want to make a Korean friend.", kh: "ខ្ញុំចង់បង្កើតមិត្តកូរ៉េ។" }
            ] },
          { point: "V-는 N", name: "verb + noun (modifier)", rule: "는 attaches to action verbs: 읽는 책 = the book (I'm) reading.",
            examples: [
              { ko: "공부하는 학생이에요.", rom: "gongbuhaneun haksaeng-ieyo", gl: "I am a student who studies.", kh: "ជាសិស្សដែលរៀន។" }
            ] }
        ],
        vocab: [
          { ko: "만들다", rom: "mandeulda", gl: "to make", kh: "បង្កើត" },
          { ko: "같이", rom: "gachi", gl: "together", kh: "ជាមួយគ្នា" },
          { ko: "소망", rom: "somang", gl: "wish", kh: "បំណង" }
        ]
      },
      {
        id: "1b-08", title: "능력 & 동시동작 — Ability & Simultaneous Actions", theme: "ability / -ing while",
        grammar: [
          { point: "V-(으)ㄹ 수 있다[없다]", name: "can / can't V", rule: "ㄹ 수 있다 = can, ㄹ 수 없다 = can't.",
            examples: [
              { ko: "한국어를 읽을 수 있어요.", rom: "hangugeo-reul ilgeul su isseoyo", gl: "I can read Korean.", kh: "ខ្ញុំអាចអានភាសាកូរ៉េបាន។" }
            ] },
          { point: "V-(으)ㄹ게요", name: "I will (promise/offer)", rule: "ㄹ게요 = future intent/offer to the listener.",
            examples: [
              { ko: "제가 도와줄게요.", rom: "jega dowajulgeyo", gl: "I will help you.", kh: "ខ្ញុំនឹងជួយអ្នក។" }
            ] },
          { point: "V-(으)면서", name: "while doing V", rule: "면서 = doing two actions at once.",
            examples: [
              { ko: "음악을 들으면서 공부해요.", rom: "eumak-eul deureumyeonseo gongbuhaeyo", gl: "I study while listening to music.", kh: "ខ្ញុំរៀនខណៈស្តាប់តន្ត្រី។" }
            ] }
        ],
        vocab: [
          { ko: "읽다", rom: "ikda", gl: "to read", kh: "អាន" },
          { ko: "음악", rom: "eumak", gl: "music", kh: "តន្ត្រី" },
          { ko: "듣다", rom: "deutda", gl: "to listen", kh: "ស្តាប់" },
          { ko: "돕다", rom: "dopda", gl: "to help", kh: "ជួយ" }
        ]
      }
    ]
  }
};

/* ---------- Helpers ---------- */
window.getLesson = function (book, lessonId) {
  const b = window.LESSONS[book];
  if (!b) return null;
  return b.lessons.find(l => l.id === lessonId) || null;
};
window.getBook = function (book) { return window.LESSONS[book] || null; };
