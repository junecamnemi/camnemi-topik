/* Camnemi TOPIK — Mock Test schedule (개념3: 날짜별 모의고사)
   Each mock test = a timed practice set with sections.
   qids reference question ids from TOPIK1_BANK / TOPIK2_BANK.
*/
window.MOCK_TESTS = [
  {
    id: 'MT001',
    date: '2026-09-01',
    name: 'Camnemi TOPIK II Mock #1',
    test: 'TOPIK II',           // TOPIK I | TOPIK II
    goal: 'Level 3',
    duration: '180 min',
    sections: ['Listening', 'Writing', 'Reading'],
    qids: ['T2L001','T2L002','T2R001','T2R002','T2R003','T2W001'],
    done: false
  },
  {
    id: 'MT002',
    date: '2026-09-02',
    name: 'Camnemi TOPIK II Mock #2',
    test: 'TOPIK II',
    goal: 'Level 3',
    duration: '180 min',
    sections: ['Listening', 'Writing', 'Reading'],
    qids: ['T2R004','T2R005','T2L001','T2W002','T2R001','T2R003'],
    done: false
  },
  {
    id: 'MT003',
    date: '2026-09-03',
    name: 'Camnemi TOPIK I Mock #1',
    test: 'TOPIK I',
    goal: 'Level 1–2',
    duration: '100 min',
    sections: ['Listening', 'Reading'],
    qids: ['L001','L002','L003','R001','R002','R003','R004','R005','R006','R007'],
    done: false
  }
];
