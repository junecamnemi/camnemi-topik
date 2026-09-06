/* Camnemi TOPIK — TOPIK test schedule data (2026)
   Source: NIIED official schedule + TOPIK GUIDE overseas info (as of 2026-09)
   ※ Subject to change — always confirm at topik.go.kr or your local Korean embassy
*/
window.TOPIK_SCHEDULE = {
  year: 2026,
  updated: '2026-09',
  note: 'Schedules may change. Register via topik.go.kr or your local Korean embassy / education center.',
  // PBT (paper) — session, test date, registration, result, overseas?
  pbt: [
    { session: '104회', date: '2026-01-11', reg: '2025-12-09 ~ 12-15', result: '2026-02-12', overseas: false },
    { session: '105회', date: '2026-04-12', reg: '2026-01-27 ~ 02-02', result: '2026-05-29', overseas: true },
    { session: '106회', date: '2026-05-17', reg: '2026-03-10 ~ 03-16', result: '2026-06-25', overseas: true },
    { session: '107회', date: '2026-07-05', reg: '2026-05-12 ~ 05-18', result: '2026-08-13', overseas: true },
    { session: '108회', date: '2026-10-18', reg: '2026-08-04 ~ 08-10', result: '2026-12-10', overseas: true },
    { session: '109회', date: '2026-11-15', reg: '2026-09-01 ~ 09-07', result: '2026-12-22', overseas: true }
  ],
  // IBT (computer) — Korea-centered
  ibt: [
    { session: '11회 IBT', date: '2026-02-28', reg: '2025-12-16 ~ 12-22', result: '2026-03-20' },
    { session: '12회 IBT', date: '2026-03-21', reg: '2026-01-13 ~ 01-19', result: '2026-04-10' },
    { session: '13회 IBT', date: '2026-06-13', reg: '2026-04-07 ~ 04-13', result: '2026-07-03' },
    { session: '14회 IBT', date: '2026-09-12', reg: '2026-07-07 ~ 07-13', result: '2026-10-02' },
    { session: '15회 IBT', date: '2026-10-24', reg: '2026-08-18 ~ 08-24', result: '2026-11-13' },
    { session: '16회 IBT', date: '2026-11-28', reg: '2026-09-15 ~ 09-21', result: '2026-12-18' }
  ],
  // Sessions + cities per country (PBT)
  countries: [
    { key: 'KR',  name: 'South Korea', flag: '🇰🇷', sessions: [104, 105, 106, 107, 108, 109], cities: 'Nationwide', reg: 'topik.go.kr' },
    { key: 'JP',  name: 'Japan', flag: '🇯🇵', sessions: [105, 107, 108, 109], cities: 'Tokyo & nationwide', reg: 'Korean Education Center' },
    { key: 'CN',  name: 'China', flag: '🇨🇳', sessions: [105, 107, 108, 109], cities: 'Beijing, Hong Kong, etc.', reg: 'Korean Education Center' },
    { key: 'VN',  name: 'Vietnam', flag: '🇻🇳', sessions: [105, 106, 107, 108, 109], cities: 'Hanoi, Ho Chi Minh, Da Nang, Hai Phong, etc.', reg: 'Korean Embassy in Vietnam' },
    { key: 'KH',  name: 'Cambodia', flag: '🇰🇭', sessions: [105, 106, 107, 108, 109], cities: 'Phnom Penh, Siem Reap', reg: 'Korean Embassy in Cambodia' },
    { key: 'TH',  name: 'Thailand', flag: '🇹🇭', sessions: [106, 107, 108, 109], cities: 'Bangkok, Chiang Mai, Songkhla, etc.', reg: 'Korean Embassy in Thailand' },
    { key: 'PH',  name: 'Philippines', flag: '🇵🇭', sessions: [105, 107, 108], cities: 'Manila, Cebu', reg: 'Korean Embassy in the Philippines' },
    { key: 'ID',  name: 'Indonesia', flag: '🇮🇩', sessions: [106, 108], cities: 'Jakarta, Bali, Surabaya, etc.', reg: 'Korean Embassy in Indonesia' },
    { key: 'MN',  name: 'Mongolia', flag: '🇲🇳', sessions: [105, 106, 108, 109], cities: 'Ulaanbaatar', reg: 'Korean Embassy in Mongolia' },
    { key: 'UZ',  name: 'Uzbekistan', flag: '🇺🇿', sessions: [105, 106, 107, 108, 109], cities: 'Tashkent, Samarkand, etc.', reg: 'Korean Embassy in Uzbekistan' },
    { key: 'IN',  name: 'India', flag: '🇮🇳', sessions: [105, 106, 107, 108, 109], cities: 'Delhi, Bengaluru, Pune, etc.', reg: 'Korean Cultural Center' },
    { key: 'MY',  name: 'Malaysia', flag: '🇲🇾', sessions: [105, 108], cities: 'Kuala Lumpur', reg: 'Korean Embassy in Malaysia' },
    { key: 'SG',  name: 'Singapore', flag: '🇸🇬', sessions: [105, 108], cities: 'Singapore', reg: 'Korean Embassy in Singapore' },
    { key: 'TW',  name: 'Taiwan', flag: '🇹🇼', sessions: [105, 108], cities: 'Taipei, Kaohsiung, Taichung', reg: 'Taipei Mission' },
    { key: 'RU',  name: 'Russia', flag: '🇷🇺', sessions: [105, 106, 107, 108, 109], cities: 'Moscow, St. Petersburg, Vladivostok, etc.', reg: 'Korean Embassy in Russia' },
    { key: 'KZ',  name: 'Kazakhstan', flag: '🇰🇿', sessions: [105, 107, 108], cities: 'Almaty, Astana', reg: 'Korean Embassy in Kazakhstan' },
    { key: 'US',  name: 'USA', flag: '🇺🇸', sessions: [105, 107, 108], cities: 'New York, LA, SF, Seattle, Chicago, Washington, etc.', reg: 'Korean Education Center' },
    { key: 'CA',  name: 'Canada', flag: '🇨🇦', sessions: [105, 108], cities: 'Toronto, Vancouver, Edmonton', reg: 'Korean Embassy in Canada' },
    { key: 'GB',  name: 'United Kingdom', flag: '🇬🇧', sessions: [105, 108], cities: 'London, Sheffield, York, etc.', reg: 'Korean Embassy in the UK' },
    { key: 'DE',  name: 'Germany', flag: '🇩🇪', sessions: [105, 108], cities: 'Frankfurt, Berlin, Hamburg, etc.', reg: 'Korean Embassy in Germany' },
    { key: 'FR',  name: 'France', flag: '🇫🇷', sessions: [105, 108], cities: 'Paris, Lyon, Bordeaux, etc.', reg: 'Korean Embassy in France' },
    { key: 'AU',  name: 'Australia', flag: '🇦🇺', sessions: [105, 108], cities: 'Sydney, Melbourne, Brisbane, Perth, etc.', reg: 'Korean Embassy in Australia' },
    { key: 'NZ',  name: 'New Zealand', flag: '🇳🇿', sessions: [105, 108], cities: 'Auckland, Christchurch', reg: 'Korean Embassy in New Zealand' },
    { key: 'BR',  name: 'Brazil', flag: '🇧🇷', sessions: [105, 107, 108], cities: 'São Paulo, Brasília, Rio, etc.', reg: 'Korean Embassy in Brazil' },
    { key: 'MX',  name: 'Mexico', flag: '🇲🇽', sessions: [105, 107, 108], cities: 'Mexico City, Monterrey, etc.', reg: 'Korean Embassy in Mexico' },
    { key: 'TR',  name: 'Türkiye', flag: '🇹🇷', sessions: [105, 108], cities: 'Ankara, Istanbul', reg: 'Korean Embassy in Türkiye' },
    { key: 'EG',  name: 'Egypt', flag: '🇪🇬', sessions: [105, 108], cities: 'Cairo', reg: 'Korean Embassy in Egypt' },
    { key: 'ZA',  name: 'South Africa', flag: '🇿🇦', sessions: [105], cities: 'Pretoria', reg: 'Korean Embassy in South Africa' },
    { key: 'AE',  name: 'UAE', flag: '🇦🇪', sessions: [105, 108], cities: 'Abu Dhabi', reg: 'Korean Embassy in the UAE' },
    { key: 'SA',  name: 'Saudi Arabia', flag: '🇸🇦', sessions: [105, 108], cities: 'Riyadh, Jeddah', reg: 'Korean Embassy in Saudi Arabia' },
    { key: 'PK',  name: 'Pakistan', flag: '🇵🇰', sessions: [105, 106, 108], cities: 'Islamabad', reg: 'Korean Embassy in Pakistan' },
    { key: 'BD',  name: 'Bangladesh', flag: '🇧🇩', sessions: [105, 108], cities: 'Dhaka', reg: 'Korean Embassy in Bangladesh' },
    { key: 'LK',  name: 'Sri Lanka', flag: '🇱🇰', sessions: [107, 108], cities: 'Colombo', reg: 'Korean Embassy in Sri Lanka' },
    { key: 'MM',  name: 'Myanmar', flag: '🇲🇲', sessions: [106, 108, 109], cities: 'Yangon, Mandalay', reg: 'Korean Embassy in Myanmar' },
    { key: 'LA',  name: 'Laos', flag: '🇱🇦', sessions: [107], cities: 'Vientiane', reg: 'Korean Embassy in Laos' },
    { key: 'NP',  name: 'Nepal', flag: '🇳🇵', sessions: [109], cities: 'Kathmandu', reg: 'Korean Embassy in Nepal' },
    { key: 'KG',  name: 'Kyrgyzstan', flag: '🇰🇬', sessions: [105, 108], cities: 'Bishkek, Osh', reg: 'Korean Embassy in Kyrgyzstan' },
    { key: 'TJ',  name: 'Tajikistan', flag: '🇹🇯', sessions: [105, 108], cities: 'Dushanbe', reg: 'Korean Embassy in Tajikistan' },
    { key: 'AZ',  name: 'Azerbaijan', flag: '🇦🇿', sessions: [105, 108], cities: 'Baku', reg: 'Korean Embassy in Azerbaijan' },
    { key: 'IT',  name: 'Italy', flag: '🇮🇹', sessions: [105, 108], cities: 'Rome, Naples, Venice', reg: 'Korean Embassy in Italy' },
    { key: 'ES',  name: 'Spain', flag: '🇪🇸', sessions: [105, 107, 108], cities: 'Madrid, Barcelona, etc.', reg: 'Korean Embassy in Spain' },
    { key: 'AR',  name: 'Argentina', flag: '🇦🇷', sessions: [105, 108], cities: 'Buenos Aires', reg: 'Korean Embassy in Argentina' }
  ]
};
