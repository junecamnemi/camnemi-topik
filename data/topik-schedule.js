/* Camnemi TOPIK — 시험 일정 데이터 (2026)
   출처: NIIED 공식 일정 + TOPIK GUIDE 해외 시행 정보 (2026-09 기준)
   ※ 현지 사정에 따라 변경될 수 있음 — 반드시 topik.go.kr 또는 현지 공관으로 확인
*/
window.TOPIK_SCHEDULE = {
  year: 2026,
  updated: '2026-09',
  note: '일정은 현지 사정에 따라 변경될 수 있습니다. 접수는 topik.go.kr 또는 현지 한국대사관·한국교육원에서 진행됩니다.',
  // PBT (지필) 전 회차 — 회차, 시험일, 접수, 결과, 해외 시행 여부
  pbt: [
    { session: '104회', date: '2026-01-11', reg: '2025-12-09 ~ 12-15', result: '2026-02-12', overseas: false },
    { session: '105회', date: '2026-04-12', reg: '2026-01-27 ~ 02-02', result: '2026-05-29', overseas: true },
    { session: '106회', date: '2026-05-17', reg: '2026-03-10 ~ 03-16', result: '2026-06-25', overseas: true },
    { session: '107회', date: '2026-07-05', reg: '2026-05-12 ~ 05-18', result: '2026-08-13', overseas: true },
    { session: '108회', date: '2026-10-18', reg: '2026-08-04 ~ 08-10', result: '2026-12-10', overseas: true },
    { session: '109회', date: '2026-11-15', reg: '2026-09-01 ~ 09-07', result: '2026-12-22', overseas: true }
  ],
  // IBT (컴퓨터) — 한국 중심
  ibt: [
    { session: '11회 IBT', date: '2026-02-28', reg: '2025-12-16 ~ 12-22', result: '2026-03-20' },
    { session: '12회 IBT', date: '2026-03-21', reg: '2026-01-13 ~ 01-19', result: '2026-04-10' },
    { session: '13회 IBT', date: '2026-06-13', reg: '2026-04-07 ~ 04-13', result: '2026-07-03' },
    { session: '14회 IBT', date: '2026-09-12', reg: '2026-07-07 ~ 07-13', result: '2026-10-02' },
    { session: '15회 IBT', date: '2026-10-24', reg: '2026-08-18 ~ 08-24', result: '2026-11-13' },
    { session: '16회 IBT', date: '2026-11-28', reg: '2026-09-15 ~ 09-21', result: '2026-12-18' }
  ],
  // 국가별 시행 회차 + 도시 (PBT)
  countries: [
    { key: 'KR',  name: '대한민국', flag: '🇰🇷', sessions: [104, 105, 106, 107, 108, 109], cities: '전국', reg: 'topik.go.kr' },
    { key: 'JP',  name: '일본', flag: '🇯🇵', sessions: [105, 107, 108, 109], cities: '도쿄 등 전국', reg: '한국교육원' },
    { key: 'CN',  name: '중국', flag: '🇨🇳', sessions: [105, 107, 108, 109], cities: '베이징, 홍콩 등', reg: '한국교육원' },
    { key: 'VN',  name: '베트남', flag: '🇻🇳', sessions: [105, 106, 107, 108, 109], cities: '하노이, 호치민, 다낭, 하이퐁 등', reg: '주베트남 한국대사관' },
    { key: 'KH',  name: '캄보디아', flag: '🇰🇭', sessions: [105, 106, 107, 108, 109], cities: '프놈펜, 시엠립', reg: '주캄보디아 한국대사관' },
    { key: 'TH',  name: '태국', flag: '🇹🇭', sessions: [106, 107, 108, 109], cities: '방콕, 치앙마이, 송클라 등', reg: '주태국 한국대사관' },
    { key: 'PH',  name: '필리핀', flag: '🇵🇭', sessions: [105, 107, 108], cities: '마닐라, 세부', reg: '주필리핀 한국대사관' },
    { key: 'ID',  name: '인도네시아', flag: '🇮🇩', sessions: [106, 108], cities: '자카르타, 발리, 수라바야 등', reg: '주인도네시아 한국대사관' },
    { key: 'MN',  name: '몽골', flag: '🇲🇳', sessions: [105, 106, 108, 109], cities: '울란바토르', reg: '주몽골 한국대사관' },
    { key: 'UZ',  name: '우즈베키스탄', flag: '🇺🇿', sessions: [105, 106, 107, 108, 109], cities: '타슈켄트, 사마르칸트 등', reg: '주우즈베키스탄 한국대사관' },
    { key: 'IN',  name: '인도', flag: '🇮🇳', sessions: [105, 106, 107, 108, 109], cities: '델리, 벵갈루루, 푸네 등', reg: '한국문화원' },
    { key: 'MY',  name: '말레이시아', flag: '🇲🇾', sessions: [105, 108], cities: '쿠알라룸푸르', reg: '주말레이시아 한국대사관' },
    { key: 'SG',  name: '싱가포르', flag: '🇸🇬', sessions: [105, 108], cities: '싱가포르', reg: '주싱가포르 한국대사관' },
    { key: 'TW',  name: '대만', flag: '🇹🇼', sessions: [105, 108], cities: '타이베이, 가오슝, 타이중', reg: '주타이베이 대표부' },
    { key: 'RU',  name: '러시아', flag: '🇷🇺', sessions: [105, 106, 107, 108, 109], cities: '모스크바, 상트페테르부르크, 블라디보스톡 등', reg: '주러시아 한국대사관' },
    { key: 'KZ',  name: '카자흐스탄', flag: '🇰🇿', sessions: [105, 107, 108], cities: '알마티, 아스타나', reg: '주카자흐스탄 한국대사관' },
    { key: 'US',  name: '미국', flag: '🇺🇸', sessions: [105, 107, 108], cities: '뉴욕, LA, SF, 시애틀, 시카고, 워싱턴 등', reg: '한국교육원' },
    { key: 'CA',  name: '캐나다', flag: '🇨🇦', sessions: [105, 108], cities: '토론토, 밴쿠버, 에드먼턴', reg: '주캐나다 한국대사관' },
    { key: 'GB',  name: '영국', flag: '🇬🇧', sessions: [105, 108], cities: '런던, 셰필드, 요크 등', reg: '주영국 한국대사관' },
    { key: 'DE',  name: '독일', flag: '🇩🇪', sessions: [105, 108], cities: '프랑크푸르트, 베를린, 함부르크 등', reg: '주독일 한국대사관' },
    { key: 'FR',  name: '프랑스', flag: '🇫🇷', sessions: [105, 108], cities: '파리, 리옹, 보르도 등', reg: '주프랑스 한국대사관' },
    { key: 'AU',  name: '호주', flag: '🇦🇺', sessions: [105, 108], cities: '시드니, 멜번, 브리즈번, 퍼스 등', reg: '주호주 한국대사관' },
    { key: 'NZ',  name: '뉴질랜드', flag: '🇳🇿', sessions: [105, 108], cities: '오클랜드, 크라이스트처치', reg: '주뉴질랜드 한국대사관' },
    { key: 'BR',  name: '브라질', flag: '🇧🇷', sessions: [105, 107, 108], cities: '상파울루, 브라질리아, 리우 등', reg: '주브라질 한국대사관' },
    { key: 'MX',  name: '멕시코', flag: '🇲🇽', sessions: [105, 107, 108], cities: '멕시코시티, 몬테레이 등', reg: '주멕시코 한국대사관' },
    { key: 'TR',  name: '튀르키예', flag: '🇹🇷', sessions: [105, 108], cities: '앙카라, 이스탄불', reg: '주튀르키예 한국대사관' },
    { key: 'EG',  name: '이집트', flag: '🇪🇬', sessions: [105, 108], cities: '카이로', reg: '주이집트 한국대사관' },
    { key: 'ZA',  name: '남아프리카공화국', flag: '🇿🇦', sessions: [105], cities: '프리토리아', reg: '주남아공 한국대사관' },
    { key: 'AE',  name: '아랍에미리트', flag: '🇦🇪', sessions: [105, 108], cities: '아부다비', reg: '주UAE 한국대사관' },
    { key: 'SA',  name: '사우디아라비아', flag: '🇸🇦', sessions: [105, 108], cities: '리야드, 젯다', reg: '주사우디 한국대사관' },
    { key: 'PK',  name: '파키스탄', flag: '🇵🇰', sessions: [105, 106, 108], cities: '이슬라마바드', reg: '주파키스탄 한국대사관' },
    { key: 'BD',  name: '방글라데시', flag: '🇧🇩', sessions: [105, 108], cities: '다카', reg: '주방글라데시 한국대사관' },
    { key: 'LK',  name: '스리랑카', flag: '🇱🇰', sessions: [107, 108], cities: '콜롬보', reg: '주스리랑카 한국대사관' },
    { key: 'MM',  name: '미얀마', flag: '🇲🇲', sessions: [106, 108, 109], cities: '양곤, 만달레이', reg: '주미얀마 한국대사관' },
    { key: 'LA',  name: '라오스', flag: '🇱🇦', sessions: [107], cities: '비엔티안', reg: '주라오스 한국대사관' },
    { key: 'NP',  name: '네팔', flag: '🇳🇵', sessions: [109], cities: '카트만두', reg: '주네팔 한국대사관' },
    { key: 'KG',  name: '키르기즈공화국', flag: '🇰🇬', sessions: [105, 108], cities: '비슈케크, 오시', reg: '주키르기즈 한국대사관' },
    { key: 'TJ',  name: '타지키스탄', flag: '🇹🇯', sessions: [105, 108], cities: '두샨베', reg: '주타지키스탄 한국대사관' },
    { key: 'AZ',  name: '아제르바이잔', flag: '🇦🇿', sessions: [105, 108], cities: '바쿠', reg: '주아제르바이잔 한국대사관' },
    { key: 'IT',  name: '이탈리아', flag: '🇮🇹', sessions: [105, 108], cities: '로마, 나폴리, 베네치아', reg: '주이탈리아 한국대사관' },
    { key: 'ES',  name: '스페인', flag: '🇪🇸', sessions: [105, 107, 108], cities: '마드리드, 바르셀로나 등', reg: '주스페인 한국대사관' },
    { key: 'AR',  name: '아르헨티나', flag: '🇦🇷', sessions: [105, 108], cities: '부에노스아이레스', reg: '주아르헨티나 한국대사관' }
  ]
};
