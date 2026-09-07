/* Glowsis AI TOPIK — 아이돌 성장 여정 (Lv0 + Lv1~6, 각 레벨 10단계)
   모델: 누적 100시간·100문제마다 한 레벨씩 오른다.
     Lv0 [0h)   Lv1 [100h)  Lv2 [200h)  Lv3 [300h)
     Lv4 [400h) Lv5 [500h)  Lv6 [600h = 최고/완료]
   레벨 안 10단계 = 그 레벨 구간(100시간)을 10시간/단계로 조금씩 성장.
   보상은 해당 레벨 구간의 시간·문제를 채우고 정답률 70%면 해금(lvDone).
     Lv0 오디션·준비   Lv1 팀결성   Lv2 데뷔   Lv3 음방10위
     Lv4 음방1위       Lv5 해외진출  Lv6 해외1위(NFL)
   홈 'My Level' 카드는 이번 레벨에서 다음 보상까지 남은 조건을 보여준다. */
window.IDOL_JOURNEY = {
  levelUnitHours: 100,     // 레벨 구간 공부 시간
  levelUnitQs: 100,        // 레벨 구간 문제 수
  accGate: 70,             // 보상 해금 정답률(%)
  totalLevels: 7,          // Lv0..Lv6

  levels: [
    { id: 0, stage: '오디션 · 준비', stageEn: 'Audition · Prep',
      reward: '팀 결성 준비 — 첫 100시간·100문제를 채워 데뷔팀으로!',
      rewardEn: 'Prep for debut — hit 100h & 100 questions to form your team!',
      nextStage: 'Lv1 · 팀 결성', nextStageEn: 'Lv1 · Group Formation' },
    { id: 1, stage: '팀 결성', stageEn: 'Group Formation',
      reward: '팀을 결성해요 — 혼자 또는 최대 4명, 팀 이름을 정할 수 있어요',
      rewardEn: 'Form your team — solo or up to 4 members, and name it!',
      nextStage: 'Lv2 · 데뷔', nextStageEn: 'Lv2 · Debut' },
    { id: 2, stage: '데뷔', stageEn: 'Debut',
      reward: '코스튬을 장착할 수 있어요 (그 전까지는 전부 교복)',
      rewardEn: 'Unlock costumes to wear (uniforms until now)',
      nextStage: 'Lv3 · 국내 음방 10위', nextStageEn: 'Lv3 · Top 10 on Music Shows' },
    { id: 3, stage: '국내 음방 10위 진입', stageEn: 'Top 10 on Music Shows',
      reward: '팬클럽을 만들고 애칭을 정할 수 있어요',
      rewardEn: 'Create a fan club and give it a nickname',
      nextStage: 'Lv4 · 국내 음방 1위', nextStageEn: 'Lv4 · #1 on Music Shows' },
    { id: 4, stage: '국내 음방 1위', stageEn: '#1 on Music Shows',
      reward: '선후배 챌린지에 도전할 수 있어요',
      rewardEn: 'Take on senior/junior challenges',
      nextStage: 'Lv5 · 해외 진출', nextStageEn: 'Lv5 · Going Global' },
    { id: 5, stage: '해외 진출', stageEn: 'Going Global',
      reward: '도쿄돔 콘서트를 열어요',
      rewardEn: 'Hold a Tokyo Dome concert',
      nextStage: 'Lv6 · 해외 1위', nextStageEn: 'Lv6 · #1 Worldwide' },
    { id: 6, stage: '해외 1위', stageEn: '#1 Worldwide',
      reward: 'NFL 하프타임 콘서트 — 최고의 아이돌!',
      rewardEn: 'An NFL halftime show — the ultimate idol!',
      nextStage: null, nextStageEn: null }
  ],

  stages: {
    0: ['오디션 지원', '서류 준비', '기본기 점검', '첫 트레이닝', '호흡 연습',
        '안무 입문', '보컬 레슨', '오디션 리허설', '무대 적응', '★ 데뷔팀 후보'],
    1: ['오디션 합격', '첫 연습실', '기본기 트레이닝', '호흡 맞추기', '안무 익히기',
        '보컬 다듬기', '파트 배정', '리더 선출', '팀 이름 확정', '★ 팀 결성 완료'],
    2: ['데뷔 곡 선정', '안무 완성', '녹음 시작', '쇼케이스 연습', '컨셉 확정',
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

/* 진행 계산 (누적 100시간/100문제당 1레벨):
   lv = 현재 진행 중인 레벨(보상 대상). totalH가 600 이상이면 Lv6(최고).
   반환: lv(0..6), lvName, lvReward, nextStage, stageIdx(1..10), stageName,
         segH/segQ = 이 레벨 구간에서 쓴 양(0..100), segPct,
         remH/remQ = 이 레벨(다음 보상)까지 남은 시간·문제,
         lvDone(보상 해금) = seg 채움 + 정답률, lvAccBlocked, maxed */
window.idolJourneyProgress = function (totalH, totalQ, acc) {
  var J = window.IDOL_JOURNEY;
  var maxLv = J.totalLevels - 1;                  // 6
  var H = Math.max(0, Math.floor(totalH / J.levelUnitHours));  // 완료한 100시간 묶음
  var Q = Math.max(0, Math.floor(totalQ / J.levelUnitQs));
  // 완료 묶음이 많은 쪽 기준으로 lv를 정하되, 시간·문제 중 적게 채운 쪽이 레벨을 결정(진행 허들)
  var lv = Math.min(maxLv, H < Q ? H : Q);
  // 그런데 최고레벨(Lv6)은 totalH>=600(완료 묶음 6)일 때 이미 도달. 
  // lv는 '현재 받는 보상 레벨': 완료 묶음이 m이면 다음(m+1) 보상을 향해 진행 중.
  // 표시 레벨 = 이미 채운 묶음 수(0..6). Lv6=NFL은 6묶음(600h) 채우면 해금.
  var segH = Math.max(0, totalH - lv * J.levelUnitHours);
  var segQ = Math.max(0, totalQ - lv * J.levelUnitQs);
  var step = Math.max(0, Math.min(9, Math.floor(segH / (J.levelUnitHours / 10))));
  var names = J.stages[lv] || J.stages[maxLv];
  var accOK = acc >= J.accGate;
  // 이 레벨 보상 해금: lv가 이미 '채운 묶음'이므로, lv>0이면 채운 묶음 달성 = 시간·문제 충족.
  // 정답률만 게이트. Lv0은 보상없는 시작.
  var lvDone = (lv === 0 ? false : accOK);
  var lvAccBlocked = (lv === 0 ? false : !accOK);
  var segPct = Math.min(100, Math.round(Math.min(segH / J.levelUnitHours, segQ / J.levelUnitQs) * 100));
  var L = J.levels[lv];
  var nextLv = lv < maxLv ? lv + 1 : null;
  return {
    lv: lv,
    lvName: L.stage,
    lvNameEn: L.stageEn,
    lvReward: L.reward,
    lvRewardEn: L.rewardEn || L.reward,
    nextStage: L.nextStage || null,
    nextStageEn: L.nextStageEn || null,
    stageIdx: step + 1,
    stageName: names[step],
    stageNameEn: (EN_STAGES[lv] || [])[step] || names[step],
    segH: Math.round(segH), segQ: Math.round(segQ),
    segHNeed: J.levelUnitHours, segQNeed: J.levelUnitQs,
    // 다음 보상(Lv+1)까지 남은 것
    remH: nextLv === null ? 0 : Math.max(0, nextLv * J.levelUnitHours - totalH),
    remQ: nextLv === null ? 0 : Math.max(0, nextLv * J.levelUnitQs - totalQ),
    segPct: segPct,
    totalH: Math.round(totalH), totalQ: Math.round(totalQ),
    acc: acc, accGate: J.accGate,
    lvDone: lvDone, lvAccBlocked: lvAccBlocked,
    maxed: lv >= maxLv,
    nextLv: nextLv
  };
};

/* English 10-stage names per level (for en display) */
var EN_STAGES = {
  0: ['Audition entry','Paperwork','Skill check','First training','Breath work',
      'Dance basics','Vocal lesson','Audition rehearsal','Stage ready','★ Debut hopeful'],
  1: ['Audition passed','First practice room','Basics training','Finding rhythm','Learning choreo',
      'Polishing vocals','Parts assigned','Leader chosen','Team name set','★ Team formed'],
  2: ['Debut song picked','Choreo complete','Recording','Showcase practice','Concept locked',
      'Costume fitting','MV shoot','Rehearsal','Debut rehearsal','★ Debut!'],
  3: ['First music show','Chart entry','Fan reaction','Stage vlog','Comeback prep',
      'Stronger choreo','2nd music show','Chart top 30','Chart top 15','★ Music-show top 10'],
  4: ['Fan club grows','Strong chart run','Music-show top 5','Chart top 3','Fan signing',
      'Big stage','Music-show top 2','#1 nominee','Fan vote #1','★ Music-show #1'],
  5: ['Global fandom','Global SNS','Overseas interview','World tour prep','First overseas show',
      'Global release','Overseas music show','Asia tour','Tokyo Dome booked','★ Tokyo Dome concert'],
  6: ['World tour','Global #1 nominee','North America','Stadium tour','Global chart #1',
      'World-class idol','Super stage','NFL booked','Halftime rehearsal','★ NFL halftime show']
};
