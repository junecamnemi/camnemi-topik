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
        ],
        sections: {
          objectives: [
            "Introduce yourself and others politely (저는 …이에요/예요)",
            "Ask and answer 'Are you …?' with 네 / 아니요",
            "Name countries and nationalities",
            "Use formal and informal speech levels appropriately"
          ],
          vocabExt: [
            { ko: "어디", rom: "eodi", gl: "where", kh: "ទីណា" },
            { ko: "어느 나라", rom: "eoneu nara", gl: "which country", kh: "ប្រទេសណា" },
            { ko: "미국", rom: "miguk", gl: "USA", kh: "អាមេរិក" },
            { ko: "일본", rom: "ilbon", gl: "Japan", kh: "ជប៉ុន" },
            { ko: "베트남", rom: "betnam", gl: "Vietnam", kh: "វៀតណាម" },
            { ko: "태국", rom: "taeguk", gl: "Thailand", kh: "ថៃ" },
            { ko: "직업", rom: "jigeop", gl: "job/occupation", kh: "អាជីព" },
            { ko: "회사원", rom: "hoesawon", gl: "office worker", kh: "បុគ្គលិក" },
            { ko: "가수", rom: "gasu", gl: "singer", kh: "អ្នកច្រៀង" },
            { ko: "요리사", rom: "yorisa", gl: "chef", kh: "ចុងភៅ" },
            { ko: "운동선수", rom: "undongseonsu", gl: "athlete", kh: "អត្តពលិក" },
            { ko: "의사", rom: "uisa", gl: "doctor", kh: "ពេទ្យ" }
          ],
          dialogue: [
            { ko: "안녕하세요? 저는 수아예요.", rom: "annyeonghaseyo? jeoneun sua-yeyo.", gl: "Hello! I'm Sua.", kh: "សួស្តី! ខ្ញុំឈ្មោះ ស៊ូអា។" },
            { ko: "안녕하세요? 저는 민준이에요.", rom: "annyeonghaseyo? jeoneun minjun-ieyo.", gl: "Hello! I'm Minjun.", kh: "សួស្តី! ខ្ញុំឈ្មោះ មីនជុន។" },
            { ko: "민준 씨는 학생이에요?", rom: "minjun ssi-neun haksaeng-ieyo?", gl: "Minjun, are you a student?", kh: "មីនជុន តើអ្នកជាសិស្សមែនទេ?" },
            { ko: "네, 학생이에요. 수아 씨는요?", rom: "ne, haksaeng-ieyo. sua ssi-neun-yo?", gl: "Yes, I'm a student. How about you, Sua?", kh: "បាទ ខ្ញុំជាសិស្ស។ ស៊ូអាវិញ?" },
            { ko: "저도 학생이에요.", rom: "jeodo haksaeng-ieyo.", gl: "I'm a student too.", kh: "ខ្ញុំក៏ជាសិស្សដែរ។" }
          ],
          listening: [
            "A: 안녕하세요? 이름이 뭐예요?",
            "B: 저는 다니엘이에요.",
            "A: 다니엘 씨는 어느 나라 사람이에요?",
            "B: 저는 캄보디아 사람이에요.",
            "A: 아, 그래요! 만나서 반가워요."
          ],
          listenTask: "Where is Daniel from? (어느 나라 사람이에요?)",
          reading: "제 이름은 소피아예요. 저는 미국 사람이에요. 지금 한국에서 한국어를 공부해요. 저는 학생이에요.",
          readingQ: "Is Sofia a student? Where is she from?",
          readingA: "Yes, she is a student. She is from the USA.",
          writing: "Write a 3-line self-introduction using 저는 …이에요/예요 and 어느 나라 사람이에요.",
          writingTip: "Start with your name, then your country, then your job or '학생이에요'.",
          speaking: [
            "Pair up: greet each other and exchange names and countries",
            "Introduce your partner to the class: '이 사람은 …이에요'",
            "Role-play: meet someone at a K-pop fan meet and introduce yourself"
          ],
          culture: "In Korea, greetings use a bow. 안녕하세요 is used in formal situations, while 안녕 is only for close friends. Use the polite form with people you meet for the first time.",
          review: [
            { q: "저는 학생 ___ (이에요/예요)?", a: "이에요 (after consonant 학생)" },
            { q: "'선생님' is a teacher; how do you say 'teacher' politely?", a: "선생님" },
            { q: "네, 학생입니다 — what speech level is this?", a: "Formal (합니다)" },
            { q: "저는 캄보디아 사람이에요 — what does this mean?", a: "I am Cambodian." }
          ]
        }
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
        ],
        sections: {
          objectives: [
            "Say what you have / don't have (이/가 있어요/없어요)",
            "Point to things: 이거/그거/저거",
            "Ask for things politely (주세요)",
            "Combine items with 하고 / 와/과"
          ],
          vocabExt: [
            { ko: "커피", rom: "keopi", gl: "coffee", kh: "កាហ្វេ" },
            { ko: "차", rom: "cha", gl: "tea", kh: "តែ" },
            { ko: "노트", rom: "noteu", gl: "notebook", kh: "សៀវភៅកត់ត្រា" },
            { ko: "연필", rom: "yeonpil", gl: "pencil", kh: "ខ្មៅដៃ" },
            { ko: "휴대폰", rom: "hyudaepon", gl: "cell phone", kh: "ទូរស័ព្ទ" },
            { ko: "컴퓨터", rom: "keompyuteo", gl: "computer", kh: "កុំព្យូទ័រ" },
            { ko: "열쇠", rom: "yeolsoe", gl: "key", kh: "សោ" },
            { ko: "우유", rom: "uyu", gl: "milk", kh: "ទឹកដោះគោ" },
            { ko: "쿠키", rom: "kuki", gl: "cookie", kh: "ខូឃី" }
          ],
          dialogue: [
            { ko: "이거 뭐예요?", rom: "igeo mwo-yeyo?", gl: "What is this?", kh: "នេះជាអ្វី?" },
            { ko: "이거는 커피예요.", rom: "igeoneun keopi-yeyo.", gl: "This is coffee.", kh: "នេះជាកាហ្វេ។" },
            { ko: "물 있어요?", rom: "mul isseoyo?", gl: "Is there water?", kh: "តើមានទឹកទេ?" },
            { ko: "네, 물이 있어요.", rom: "ne, mul-i isseoyo.", gl: "Yes, there's water.", kh: "បាទ មានទឹក។" },
            { ko: "물 한 병 주세요.", rom: "mul han byeong juseyo.", gl: "One bottle of water, please.", kh: "សូមទឹកមួយដប។" }
          ],
          listening: [
            "A: 이거 뭐예요?",
            "B: 저거는 사전이에요.",
            "A: 노트하고 연필 있어요?",
            "B: 네, 있어요. 여기 있어요."
          ],
          listenTask: "What is over there (저거)?",
          reading: "제 방에 책이 있어요. 노트하고 연필도 있어요. 컴퓨터하고 휴대폰도 있어요. 그런데 우유는 없어요.",
          readingQ: "Does the room have milk? What does it have?",
          readingA: "No milk. It has books, notebooks, pencils, a computer and a phone.",
          writing: "Describe your bag: '가방에 … 있어요 / 없어요' (5 items).",
          writingTip: "List 4 things you have and 1 thing you don't have.",
          speaking: [
            "Show a classmate 3 items and ask '이거 뭐예요?'",
            "Ask for a drink politely: '… 주세요'",
            "Describe what's in your desk using 있어요/없어요"
          ],
          culture: "When giving or receiving something in Korea, use both hands (or support with the other hand) as a sign of respect. Never hand money or objects with one hand to an elder.",
          review: [
            { q: "'책이 있어요' — how do you say 'there is no book'?", a: "책이 없어요" },
            { q: "이거 vs 저거 — which means 'that over there'?", a: "저거" },
            { q: "'주세요' means 'please give me'. How do you ask for water?", a: "물 주세요" },
            { q: "Combine 책 and 공책 with 'and'.", a: "책하고 공책" }
          ]
        }
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
        ],
        sections: {
          objectives: [
            "Describe daily routines with -아요/어요 present tense",
            "Mark the object of an action with 을/를",
            "Say where an action happens with 에서",
            "Negate actions with 안"
          ],
          vocabExt: [
            { ko: "일어나다", rom: "ireonada", gl: "to wake up", kh: "ក្រោកឡើង" },
            { ko: "아침", rom: "achim", gl: "morning", kh: "ព្រឹក" },
            { ko: "점심", rom: "jeomsim", gl: "lunch", kh: "អាហារថ្ងៃត្រង់" },
            { ko: "저녁", rom: "jeonyeok", gl: "dinner/evening", kh: "ល្ងាច" },
            { ko: "집", rom: "jip", gl: "home/house", kh: "ផ្ទះ" },
            { ko: "회사", rom: "hoesa", gl: "company", kh: "ក្រុមហ៊ុន" },
            { ko: "마시다", rom: "masida", gl: "to drink", kh: "ផឹក" },
            { ko: "읽다", rom: "ikda", gl: "to read", kh: "អាន" },
            { ko: "쓰다", rom: "sseuda", gl: "to write", kh: "សរសេរ" },
            { ko: "운동하다", rom: "undonghada", gl: "to exercise", kh: "ហាត់ប្រាណ" }
          ],
          dialogue: [
            { ko: "매일 뭐 해요?", rom: "maeil mwo haeyo?", gl: "What do you do every day?", kh: "រាល់ថ្ងៃអ្នកធ្វើអ្វី?" },
            { ko: "아침에 밥을 먹어요.", rom: "achime bap-eul meogeoyo.", gl: "I eat breakfast in the morning.", kh: "ព្រឹកខ្ញុំញ៉ាំបាយ។" },
            { ko: "학교에서 공부해요.", rom: "hakgyo-eseo gongbuhaeyo.", gl: "I study at school.", kh: "ខ្ញុំរៀននៅសាលា។" },
            { ko: "오늘 안 가요?", rom: "oneul an gayo?", gl: "You're not going today?", kh: "ថ្ងៃនេះអ្នកមិនទៅទេ?" },
            { ko: "네, 오늘 안 가요. 집에서 쉬어요.", rom: "ne, oneul an gayo. jib-eseo swieoyo.", gl: "No, I'm not going today. I rest at home.", kh: "បាទ ថ្ងៃនេះខ្ញុំមិនទៅទេ។ ខ្ញុំសម្រាកនៅផ្ទះ។" }
          ],
          listening: [
            "A: 아침에 뭐 해요?",
            "B: 아침에 운동을 해요.",
            "A: 도서관에서 뭐 해요?",
            "B: 도서관에서 책을 읽어요."
          ],
          listenTask: "What does B do in the morning? What does B do at the library?",
          reading: "민준 씨는 매일 아침 7시에 일어나요. 아침에 밥을 먹어요. 학교에서 한국어를 공부해요. 오후에 집에서 쉬어요.",
          readingQ: "When does Minjun wake up? What does he do at school?",
          readingA: "He wakes up at 7. He studies Korean at school.",
          writing: "Write your daily routine (아침/점심/저녁) using -아요/어요.",
          writingTip: "Use 에 (time), 에서 (place), 을/를 (object).",
          speaking: [
            "Ask a partner '매일 뭐 해요?' and answer with your routine",
            "Say one thing you don't do today using 안",
            "Tell the class where you study (…에서 공부해요)"
          ],
          culture: "Meals are central to Korean daily life. 반찬 (side dishes) are shared, and it's polite to wait for elders to start eating. '잘 먹겠습니다' is said before a meal.",
          review: [
            { q: "Conjugate 가다 in present polite.", a: "가요" },
            { q: "공부하다 → present polite?", a: "공부해요" },
            { q: "'밥을 먹어요' — what does 을 mark?", a: "the object (rice)" },
            { q: "How do you say 'I don't go' with 안?", a: "안 가요" }
          ]
        }
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
        ],
        sections: {
          objectives: [
            "Say where places are (여기가 …이에요/예요)",
            "Use 에 있어요 to state location of things",
            "Express direction with 에 가요/와요",
            "Use 위치 words: 앞/뒤/옆/위/아래"
          ],
          vocabExt: [
            { ko: "거기", rom: "geogi", gl: "there", kh: "ទីនោះ" },
            { ko: "저기", rom: "jeogi", gl: "over there", kh: "ទីនោះឆ្ងាយ" },
            { ko: "뒤", rom: "dwi", gl: "behind", kh: "ខាងក្រោយ" },
            { ko: "위", rom: "wi", gl: "on top", kh: "ខាងលើ" },
            { ko: "아래", rom: "arae", gl: "below", kh: "ខាងក្រោម" },
            { ko: "식당", rom: "sikdang", gl: "restaurant", kh: "ភោជនីយដ្ឋាន" },
            { ko: "병원", rom: "byeongwon", gl: "hospital", kh: "មន្ទីរពេទ្យ" },
            { ko: "학교", rom: "hakgyo", gl: "school", kh: "សាលារៀន" },
            { ko: "오른쪽", rom: "oreunjjok", gl: "right side", kh: "ខាងស្តាំ" },
            { ko: "왼쪽", rom: "oenjjok", gl: "left side", kh: "ខាងឆ្វេង" }
          ],
          dialogue: [
            { ko: "여기가 어디예요?", rom: "yeogiga eodi-yeyo?", gl: "Where is this place?", kh: "ទីនេះជាកន្លែងណា?" },
            { ko: "여기가 도서관이에요.", rom: "yeogiga doseogwan-ieyo.", gl: "This is the library.", kh: "ទីនេះជាបណ្ណាល័យ។" },
            { ko: "화장실이 어디에 있어요?", rom: "hwajangsil-i eodi-e isseoyo?", gl: "Where is the restroom?", kh: "បន្ទប់ទឹកនៅឯណា?" },
            { ko: "식당 옆에 있어요.", rom: "sikdang yeop-e isseoyo.", gl: "It's next to the restaurant.", kh: "វានៅក្បែរភោជនីយដ្ឋាន។" },
            { ko: "여기에서 시장에 가요.", rom: "yeogi-eseo sijang-e gayo.", gl: "From here I go to the market.", kh: "ពីទីនេះខ្ញុំទៅផ្សារ។" }
          ],
          listening: [
            "A: 은행이 어디에 있어요?",
            "B: 병원 앞에 있어요.",
            "A: 화장실은요?",
            "B: 화장실은 식당 옆에 있어요."
          ],
          listenTask: "Where is the bank? Where is the restroom?",
          reading: "여기가 우리 학교예요. 학교 앞에 은행이 있어요. 학교 옆에 도서관이 있어요. 도서관 위에 식당이 있어요.",
          readingQ: "What is in front of the school? What is next to the school?",
          readingA: "A bank is in front. A library is next to it.",
          writing: "Describe your school/neighborhood using 위치 words (앞/옆/뒤/위/아래).",
          writingTip: "Use …에 있어요 to state where each place is.",
          speaking: [
            "Ask and answer where places are (…어디에 있어요?)",
            "Describe your desk: what's 위/옆/아래",
            "Give directions using 앞/옆/뒤"
          ],
          culture: "Public signs in Korea (화장실, 은행, 병원) are often color-coded and bilingual. Knowing 위치 words helps you find your way in subway stations and buildings.",
          review: [
            { q: "'여기가 …예요' — how do you say 'This is a bank'?", a: "여기가 은행이에요" },
            { q: "How do you say 'next to' with 옆?", a: "… 옆에" },
            { q: "'화장실이 어디에 있어요?' means?", a: "Where is the restroom?" },
            { q: "거기 vs 저기 — which is farther?", a: "저기 (over there)" }
          ]
        }
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
        ],
        sections: {
          objectives: [
            "Say what happened in the past with -았/었-",
            "Talk about time with 에 (시간)",
            "Connect sequential actions with -고",
            "Describe your yesterday"
          ],
          vocabExt: [
            { ko: "어제", rom: "eoje", gl: "yesterday", kh: "ម្សិលមិញ" },
            { ko: "그저께", rom: "geujeokke", gl: "day before yesterday", kh: "មុនម្សិលមិញ" },
            { ko: "지난주", rom: "jinanju", gl: "last week", kh: "សប្តាហ៍មុន" },
            { ko: "주말", rom: "jumal", gl: "weekend", kh: "ចុងសប្តាហ៍" },
            { ko: "만나다", rom: "mannada", gl: "to meet", kh: "ជួប" },
            { ko: "가다", rom: "gada", gl: "to go", kh: "ទៅ" },
            { ko: "오다", rom: "oda", gl: "to come", kh: "មក" },
            { ko: "쉬다", rom: "swida", gl: "to rest", kh: "សម្រាក" },
            { ko: "재미있다", rom: "jaemiitda", gl: "to be fun", kh: "គួរឱ្យចាប់អារម្មណ៍" },
            { ko: "시작하다", rom: "sijakhada", gl: "to start", kh: "ចាប់ផ្តើម" }
          ],
          dialogue: [
            { ko: "어제 뭐 했어요?", rom: "eoje mwo haesseoyo?", gl: "What did you do yesterday?", kh: "ម្សិលមិញអ្នកធ្វើអ្វី?" },
            { ko: "친구를 만났어요.", rom: "chingu-reul mannasseoyo.", gl: "I met a friend.", kh: "ខ្ញុំបានជួបមិត្ត។" },
            { ko: "뭐 했어요?", rom: "mwo haesseoyo?", gl: "What did you do?", kh: "អ្នកធ្វើអ្វី?" },
            { ko: "영화를 봤어요. 재미있었어요.", rom: "yeonghwa-reul bwasseoyo. jaemiisseosseoyo.", gl: "I watched a movie. It was fun.", kh: "ខ្ញុំមើលរឿង។ គួរឱ្យចាប់អារម្មណ៍។" },
            { ko: "좋았어요!", rom: "joasseoyo!", gl: "That's great!", kh: "ល្អណាស់!" }
          ],
          listening: [
            "A: 주말에 뭐 했어요?",
            "B: 시장에 갔어요.",
            "A: 뭐 샀어요?",
            "B: 사과하고 우유를 샀어요."
          ],
          listenTask: "Where did B go on the weekend? What did B buy?",
          reading: "지난주 주말에 한강공원에 갔어요. 친구를 만나서 밥을 먹었어요. 그리고 영화를 봤어요. 아주 재미있었어요.",
          readingQ: "Where did they go last weekend? What did they do after eating?",
          readingA: "They went to Hangang Park. After eating, they watched a movie.",
          writing: "Write 3 sentences about your yesterday using -았/었어요.",
          writingTip: "Use 시간 에 (아침 7시에), -고 to connect actions.",
          speaking: [
            "Tell a partner what you did yesterday",
            "Ask '어제 뭐 했어요?' to 3 classmates and note answers",
            "Share the most fun thing you did last week"
          ],
          culture: "한강공원 (Hangang Park) is a popular weekend spot in Seoul — people picnic, bike, and watch the river. It's a great place to practice Korean with locals.",
          review: [
            { q: "가다 → past?", a: "갔어요" },
            { q: "먹다 → past?", a: "먹었어요" },
            { q: "하다 → past?", a: "했어요" },
            { q: "'어제 영화를 봤어요' means?", a: "I watched a movie yesterday." }
          ]
        }
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
        ],
        sections: {
          objectives: [
            "Order food politely with -세요 / 주세요",
            "Count items with counters (개/병/잔/그릇)",
            "Describe food taste with 이/가 + adjective",
            "Say 'also' with 도"
          ],
          vocabExt: [
            { ko: "비빔밥", rom: "bibimbap", gl: "bibimbap", kh: "ប៊ីប៊ីមបាប់" },
            { ko: "떡볶이", rom: "tteokbokki", gl: "rice cakes (spicy)", kh: "តតគប៉ុកគី" },
            { ko: "라면", rom: "ramyeon", gl: "instant noodles", kh: "មីរ៉ាមេន" },
            { ko: "물", rom: "mul", gl: "water", kh: "ទឹក" },
            { ko: "주스", rom: "juseu", gl: "juice", kh: "ទឹកផ្លែឈើ" },
            { ko: "매워요", rom: "maewoyo", gl: "it's spicy", kh: "ហឹរ" },
            { ko: "달아요", rom: "darayo", gl: "it's sweet", kh: "ផ្អែម" },
            { ko: "짜요", rom: "jjayo", gl: "it's salty", kh: "ប្រៃ" },
            { ko: "시원해요", rom: "siwonhaeyo", gl: "it's refreshing", kh: "ត្រជាក់ស្រួល" },
            { ko: "먹다", rom: "meokda", gl: "to eat", kh: "ញ៉ាំ" }
          ],
          dialogue: [
            { ko: "뭐 드시겠어요?", rom: "mwo deusigesseoyo?", gl: "What would you like to eat?", kh: "តើអ្នកចង់ញ៉ាំអ្វី?" },
            { ko: "비빔밥 주세요.", rom: "bibimbap juseyo.", gl: "Bibimbap, please.", kh: "សូមប៊ីប៊ីមបាប់។" },
            { ko: "물 한 잔 주세요.", rom: "mul han jan juseyo.", gl: "One glass of water, please.", kh: "សូមទឹកមួយកែវ។" },
            { ko: "불고기가 맛있어요?", rom: "bulgogi-ga masisseoyo?", gl: "Is the bulgogi delicious?", kh: "ប៊ុលកូគីឆ្ងាញ់ទេ?" },
            { ko: "네, 아주 맛있어요!", rom: "ne, aju masisseoyo!", gl: "Yes, it's very delicious!", kh: "បាទ ឆ្ងាញ់ណាស់!" }
          ],
          listening: [
            "A: 뭘 먹을까요?",
            "B: 떡볶이 먹고 싶어요.",
            "A: 떡볶이는 매워요. 라면은 어때요?",
            "B: 네, 라면 주세요."
          ],
          listenTask: "What does B order? Why not tteokbokki?",
          reading: "오늘 친구하고 식당에 갔어요. 불고기하고 비빔밥을 먹었어요. 불고기는 맛있었어요. 그리고 물 한 병을 마셨어요.",
          readingQ: "What did they eat? How was the bulgogi?",
          readingA: "They ate bulgogi and bibimbap. The bulgogi was delicious.",
          writing: "Write what you would order at a Korean restaurant and describe the taste.",
          writingTip: "Use 주세요 to order, and 이/가 + adjective (맛있어요/매워요) to describe.",
          speaking: [
            "Role-play ordering food at a restaurant",
            "Ask a partner '뭐가 맛있어요?' and recommend dishes",
            "Describe your favorite food and its taste"
          ],
          culture: "Korean restaurants are often no-tip. Water (물) is self-served or free. Many dishes are shared (밥, 반찬), and it's common to order 함께 (together).",
          review: [
            { q: "Count 'two apples' with 개.", a: "사과 두 개" },
            { q: "How do you order bibimbap politely?", a: "비빔밥 주세요" },
            { q: "'매워요' means?", a: "It's spicy" },
            { q: "Say 'I also eat kimchi' with 도.", a: "저도 김치를 먹어요" }
          ]
        }
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
        ],
        sections: {
          objectives: [
            "Contrast two ideas with -지만 (but)",
            "Use formal statements -습니다/ㅂ니다",
            "List qualities with -고 (and)",
            "Compare and describe things"
          ],
          vocabExt: [
            { ko: "작다", rom: "jakda", gl: "to be small", kh: "តូច" },
            { ko: "예쁘다", rom: "yeppeuda", gl: "to be pretty", kh: "ស្អាត" },
            { ko: "좋다", rom: "jota", gl: "to be good", kh: "ល្អ" },
            { ko: "나쁘다", rom: "nappeuda", gl: "to be bad", kh: "អាក្រក់" },
            { ko: "덥다", rom: "deopda", gl: "to be hot (weather)", kh: "ក្តៅ" },
            { ko: "춥다", rom: "chupda", gl: "to be cold", kh: "ត្រជាក់" },
            { ko: "방", rom: "bang", gl: "room", kh: "បន្ទប់" },
            { ko: "집", rom: "jip", gl: "house", kh: "ផ្ទះ" },
            { ko: "조용하다", rom: "joyonghada", gl: "to be quiet", kh: "ស្ងាត់" },
            { ko: "시끄럽다", rom: "sikkeureopda", gl: "to be noisy", kh: "រំខាន" }
          ],
          dialogue: [
            { ko: "이 방은 어때요?", rom: "i bang-eun eottaeyo?", gl: "How is this room?", kh: "បន្ទប់នេះយ៉ាងម៉េច?" },
            { ko: "방은 크지만 조금 시끄러워요.", rom: "bang-eun keujiman jogeum sikkeureowoyo.", gl: "The room is big but a bit noisy.", kh: "បន្ទប់ធំ ប៉ុន្តែរំខានបន្តិច។" },
            { ko: "가격은 어때요?", rom: "gagyeok-eun eottaeyo?", gl: "How's the price?", kh: "តម្លៃយ៉ាងម៉េច?" },
            { ko: "좋지만 너무 비싸요.", rom: "jojiman neomu bissayo.", gl: "It's good but too expensive.", kh: "ល្អ ប៉ុន្តែថ្លៃពេក។" },
            { ko: "집이 크고 깨끗해요.", rom: "jib-i keugo kkaekkeuthaeyo.", gl: "The house is big and clean.", kh: "ផ្ទះធំ ហើយស្អាត។" }
          ],
          listening: [
            "A: 이 옷 어때요?",
            "B: 예쁘지만 비싸요.",
            "A: 저 옷은요?",
            "B: 저 옷은 싸고 좋아요."
          ],
          listenTask: "Why doesn't B buy the first outfit? How is the second?",
          reading: "이 가방은 예쁘지만 비싸요. 저 가방은 싸지만 작아요. 그 가방은 크고 좋아요. 그런데 너무 비싸요.",
          readingQ: "Which bag is big and good? Which is too expensive?",
          readingA: "그 가방 is big and good. That one is too expensive.",
          writing: "Describe two things (a phone, a room) using -지만 and -고 to contrast them.",
          writingTip: "Use -지만 for 'but' and -고 for 'and' in lists.",
          speaking: [
            "Compare two products with a partner using -지만",
            "Describe your ideal room with -고 (big and clean)",
            "Express a formal opinion using -습니다/ㅂ니다"
          ],
          culture: "Koreans often soften criticism with 격식체 (formal speech) in public. Using -습니다/ㅂ니다 shows respect in stores, banks, and official settings.",
          review: [
            { q: "'예쁘지만 비싸요' means?", a: "It's pretty but expensive" },
            { q: "Formal form of 먹다?", a: "먹습니다" },
            { q: "'크고 좋아요' means?", a: "It's big and good" },
            { q: "Opposite of 싸다?", a: "비싸다" }
          ]
        }
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
        ],
        sections: {
          objectives: [
            "Suggest or guess with -ㄹ까요?",
            "Point at things with 이/그/저 + noun",
            "Express surprise with -네요",
            "React naturally in conversations"
          ],
          vocabExt: [
            { ko: "날씨가 좋다", rom: "nalssi-ga jota", gl: "the weather is good", kh: "អាកាសធាតុល្អ" },
            { ko: "비가 오다", rom: "bi-ga oda", gl: "it rains", kh: "ភ្លៀង" },
            { ko: "눈이 오다", rom: "nun-i oda", gl: "it snows", kh: "ធ្លាក់ព្រិល" },
            { ko: "바람이 불다", rom: "baram-i bulda", gl: "the wind blows", kh: "ខ្យល់បក់" },
            { ko: "조금", rom: "jogeum", gl: "a little", kh: "បន្តិច" },
            { ko: "너무", rom: "neomu", gl: "too / very", kh: "ពេក" },
            { ko: "정말", rom: "jeongmal", gl: "really", kh: "ពិតជា" },
            { ko: "예쁘다", rom: "yeppeuda", gl: "to be pretty", kh: "ស្អាត" },
            { ko: "덥다", rom: "deopda", gl: "to be hot", kh: "ក្តៅ" },
            { ko: "춥다", rom: "chupda", gl: "to be cold", kh: "ត្រជាក់" }
          ],
          dialogue: [
            { ko: "날씨가 좋네요!", rom: "nalssi-ga johneyo!", gl: "The weather is nice!", kh: "អាកាសធាតុល្អណាស់!" },
            { ko: "네, 정말 좋네요.", rom: "ne, jeongmal johneyo.", gl: "Yes, it's really nice.", kh: "បាទ ល្អពិតជាមែន។" },
            { ko: "뭐 먹을까요?", rom: "mwo meogeulkkayo?", gl: "What shall we eat?", kh: "តើយើងញ៉ាំអ្វី?" },
            { ko: "이 음식 어때요?", rom: "i eumsik eottaeyo?", gl: "How about this food?", kh: "អាហារនេះយ៉ាងម៉េច?" },
            { ko: "좋아요! 그거 먹어요.", rom: "joayo! geugeo meogeoyo.", gl: "Good! Let's eat that.", kh: "ល្អ! យើងញ៉ាំនោះ។" }
          ],
          listening: [
            "A: 내일 날씨가 어떨까요?",
            "B: 아마 비가 올 거예요.",
            "A: 정말요? 그러면 집에 있을까요?",
            "B: 네, 좋은 생각이에요."
          ],
          listenTask: "What will tomorrow's weather be? What will they do?",
          reading: "오늘은 날씨가 좋네요. 하늘이 정말 예뻐요. 친구하고 공원에 갈까요? 공원에서 커피를 마실까요?",
          readingQ: "Why might they go to the park? What might they drink?",
          readingA: "Because the weather is nice. They might drink coffee.",
          writing: "Write a short dialogue where you react to the weather with -네요 and make a suggestion with -ㄹ까요?.",
          writingTip: "Use -네요 for surprise, -ㄹ까요? for suggestions.",
          speaking: [
            "React to the weather today with -네요",
            "Make a weekend suggestion with -ㄹ까요?",
            "Point at objects with 이/그/저 and describe them"
          ],
          culture: "Reacting with -네요 (e.g., 좋네요!) is a natural way to show you're engaged in a Korean conversation. It's polite and friendly — a key to natural fluency.",
          review: [
            { q: "'뭐 먹을까요?' means?", a: "What shall we eat?" },
            { q: "이 가방 vs 저 가방 — which is 'this bag'?", a: "이 가방" },
            { q: "'좋네요!' expresses?", a: "surprise/realization (Oh, it's nice!)" },
            { q: "Suggest 'shall we go to the park?'", a: "공원에 갈까요?" }
          ]
        }
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
