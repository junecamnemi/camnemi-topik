/* Glowsis AI TOPIK — 아이돌 성장 여정 (6 레벨 × 10 단계)
   XP(100단계)는 학습량 보상으로 유지하고, 이 '여정'은 공부시간·문제·정답률로
   별도 성장한다. Lv 진입 = 누적 (Lv-1)*100시간 & (Lv-1)*100문제 & 정답률 70%.
   Lv 안 10단계 = 그 레벨 구간의 100시간을 10시간/단계로 쪼갬. */
window.IDOL_JOURNEY = {
  levelUnitHours: 100,     // 레벨당 필요한 공부 시간(누적 기준)
  levelUnitQs: 100,        // 레벨당 필요한 문제 수(누적 기준)
  accGate: 70,             // 진입 정답률 게이트(%)

  // 6개 레벨 메타 (id: 1..6)
  levels: [
    { id: 1, stage: '팀 결성',            stageEn: 'Group Formation',
      reward: '팀을 결성해요 — 혼자 또는 최대 4명, 팀 이름을 정할 수 있어요',
      reqNote: '100시간 · 100문제 · 정답률 70%' },
    { id: 2, stage: '데뷔',               stageEn: 'Debut',
      reward: '코스튬을 장착할 수 있어요 (그 전까지는 전부 교복)',
      reqNote: '200시간 · 200문제 · 정답률 70%' },
    { id: 3, stage: '국내 음방 10위 진입', stageEn: 'Top 10 on Music Shows',
      reward: '팬클럽을 만들고 애칭을 정할 수 있어요',
      reqNote: '300시간 · 300문제 · 정답률 70%' },
    { id: 4, stage: '국내 음방 1위',       stageEn: '#1 on Music Shows',
      reward: '선후배 챌린지에 도전할 수 있어요',
      reqNote: '400시간 · 400문제 · 정답률 70%' },
    { id: 5, stage: '해외 진출',          stageEn: 'Going Global',
      reward: '도쿄돔 콘서트를 열어요',
      reqNote: '500시간 · 500문제 · 정답률 70%' },
    { id: 6, stage: '해외 1위',           stageEn: '#1 Worldwide',
      reward: 'NFL 하프타임 콘서트 — 최고의 아이돌!',
      reqNote: '600시간 · 600문제 · 정답률 70%' }
  ],

  // 레벨별 10단계 (성장 이름). 각 단계 = 해당 레벨 구간의 k×10시간 도달.
  stages: {
    1: ['오디션 합격', '첫 연습실', '기본기 트레이닝', '호흡 맞추기', '안무 익히기',
        '보컬 다듬기', '파트 배정', '리더 선출', '팀 이름 확정', '★ 팀 결성 완료'],
    2: ['데뷔 곡 선정', '안무 완성', '녹음 시작', '데뷔 쇼케이스 연습', '컨셉 확정',
        '코스튬 피팅', '뮤비 촬영', '리허설', '데뷔 무대 리허설', '★ 데뷔!'],
    3: ['첫 음방 출연', '차트 진입', '팬 반응 확인', '무대 브이로그', '컴백 준비',
        '안무 강화', '음방 2차 출연', '차트 30위', '차트 15위', '★ 음방 10위 진입'],
    4: ['팬클럽 확대', '음원 강세', '음방 5위', '차트 3위', '팬 사인회',
        '대형 무대', '음방 2위', '1위 후보', '팬 투표 1위', '★ 음방 1위'],
    5: ['해외 팬덤 확인', '글로벌 SNS', '해외 인터뷰', '월드 투어 준비', '첫 해외 공연',
        '글로벌 음원', '해외 음방 출연', '아시아 투어', '도쿄돔 확정', '★ 도쿄돔 콘서트'],
    6: ['월드 투어', '글로벌 1위 후보', '북미 공연', '스타디움 투어', '글로벌 차트 1위',
        '월드클래스 아이돌', '초대형 무대', 'NFL 확정', '하프타임 리허설', '★ NFL 하프타임 콘서트']
  }
};

/* 진입/단계 계산:
   totalH = 누적 공부(분→시간), totalQ = 누적 푼 문제, acc = 전체 정답률(%)
   returns { lv, stageIdx(0..9), stageName, intoLv(0..1), lvIntoH, lvNeedH,
             lvReached(레벨 보상 해금 여부), nextLv, ... } */
window.idolJourneyProgress = function (totalH, totalQ, acc) {
  var J = window.IDOL_JOURNEY, lv = 1;
  // Lv/단계는 시간·문제로 오른다 (성장이 항상 보이도록). 정답률은 보상 해금 게이트.
  for (var i = 6; i >= 1; i--) {
    var needH = (i - 1) * J.levelUnitHours;
    var needQ = (i - 1) * J.levelUnitQs;
    if (totalH >= needH && totalQ >= needQ) { lv = i; break; }
  }
  // 단계: 이번 레벨 구간에서 새로 쌓은 시간 (lv 진입 시점 ~ 다음 레벨)
  var lvBaseH = (lv - 1) * J.levelUnitHours;      // 이 레벨 시작 누적시간
  var intoH = Math.max(0, totalH - lvBaseH);      // 이 레벨에서 추가 시간
  var intoQ = Math.max(0, totalQ - (lv - 1) * J.levelUnitQs);
  var step = Math.min(9, Math.floor(intoH / (J.levelUnitHours / 10))); // 0..9
  var names = J.stages[lv] || [];
  var stageName = names[step] || names[names.length - 1];
  // 보상 해금: 이 레벨 구간을 시간·문제로 다 채우고 정답률 게이트 통과 시
  var accOK = acc >= J.accGate;
  var lvDone = intoH >= J.levelUnitHours && intoQ >= J.levelUnitQs && accOK;
  var lvAccBlocked = intoH >= J.levelUnitHours && intoQ >= J.levelUnitQs && !accOK;
  var nextLv = lv < 6 ? lv + 1 : null;
  return {
    lv: lv,
    stageIdx: step + 1,        // 1..10
    stageName: stageName,
    levelName: J.levels[lv - 1].stage,
    intoH: Math.round(intoH), intoQ: Math.round(intoQ),
    lvNeedH: J.levelUnitHours, lvNeedQ: J.levelUnitQs,
    totalH: Math.round(totalH), totalQ: Math.round(totalQ), acc: acc,
    lvDone: lvDone,            // 이 레벨 보상 해금
    lvAccBlocked: lvAccBlocked,// 시간·문제는 다 채웠지만 정답률 부족으로 보상 대기
    nextLv: nextLv,
    maxed: lv >= 6 && lvDone
  };
};
