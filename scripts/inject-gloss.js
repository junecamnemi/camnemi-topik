/* One-time script: inject qGl (question EN translation) + passageGl into banks.
   Keeps original formatting — inserts fields right after q:/passage: lines. */
const fs = require('fs');
const path = require('path');
const ROOT = 'C:/Users/USER/camnemi-topik';

const GL = {
  // TOPIK I
  L001: { qGl: 'A: Do you have an umbrella?  B: ______' },
  L002: { qGl: 'A: What time do you go to school today?  B: ______' },
  L003: { qGl: 'A: What did you do last week?  B: ______' },
  L004: { qGl: 'Listen to the dialogue and choose where this conversation takes place.' },
  L005: { qGl: 'Listen to the dialogue and choose where this conversation takes place.' },
  L006: { qGl: 'What is this conversation about?' },
  L007: { qGl: 'What is this conversation about?' },
  L008: { qGl: 'Listen and choose why the woman called.' },
  L009: { qGl: 'Listen and choose the statement that matches the content.' },
  R001: { qGl: 'What is this passage about?', passageGl: 'I have a younger sister. My sister is a student.' },
  R002: { qGl: 'What is this passage about?', passageGl: 'Today is Sunday. Tomorrow is Monday.' },
  R003: { qGl: 'Choose the correct option for the underlined part.', passageGl: 'I have a book.' },
  R004: { qGl: 'Choose the correct option for the underlined part.', passageGl: 'In the morning, I eat a meal.' },
  R005: { qGl: 'Choose the correct word for the blank.', passageGl: 'I exercise every morning. (  ) I go to school. So I wake up early in the morning.' },
  R006: { qGl: 'Choose the word with the same meaning as the underlined part.', passageGl: 'This restaurant\u2019s food is delicious and the prices are cheap.' },
  R007: { qGl: 'Choose the statement that matches this notice.', passageGl: 'Library guide / Closed on Mondays. The library is open every day from 9 to 6.' },
  R008: { qGl: 'Choose the statement that matches this notice.', passageGl: 'Weekend sale! For two days, Saturday and Sunday, clothes are 30% off.' },
  R009: { qGl: 'Read the passage and answer the question.', passageGl: 'My friend Sujin cooks every weekend. And she shares the delicious food with her friends. Her friends really like Sujin\u2019s food.' },
  R010: { qGl: 'Read the passage and answer the question.', passageGl: 'Kim Minsu works at a Korean company. He wakes up at 6 every morning. And he gets to the company by 7:30. He eats lunch at a restaurant near the office. In the evening he studies Korean at home. He really wants to become good at Korean.' },
  R011: { qGl: 'Read the passage and choose the statement that matches.', passageGl: 'Tomorrow is our school festival. There is a sports day in the morning and a music performance in the afternoon. The music performance is at the park. If it rains, the sports day is cancelled.' },
  R012: { qGl: 'Choose the correct option for the underlined part.', passageGl: 'The weather is nice. So I go to the mountain.' },
  R013: { qGl: 'Choose the correct option for the underlined part.', passageGl: 'I like coffee. So I drink it every day.' },
  // TOPIK II
  T2R001: { qGl: 'Choose the correct one.', passageGl: 'It was so hot that I couldn\u2019t turn on the air conditioner.' },
  T2R002: { qGl: 'Choose the one closest in meaning to the underlined part.', passageGl: 'He explained roughly in the meeting, so his colleagues asked again.' },
  T2R003: { qGl: 'Choose the main idea of the passage.', passageGl: 'These days many people walk while looking at their smartphones. If you look at your smartphone while walking, you can\u2019t see your surroundings properly, so there is a high risk of accidents. Therefore, it is better not to look at your smartphone while walking.' },
  T2R004: { qGl: 'Arrange the following in the correct order.', passageGl: '(A) So I started exercising every morning from that day. (B) I was told at my health checkup that my body was in bad shape. (C) It was hard at first, but now my body feels light. (D) I learned that exercising is good for the body.' },
  T2R005: { qGl: 'Choose the sentence that fits the blank.', passageGl: 'These days many office workers eat lunch alone. (    ) Groups for people who eat alone have been created for them.' },
  T2L001: { qGl: 'Listen and choose the main point of what the man says.' },
  T2L002: { qGl: 'Listen and choose what the woman will do.' },
  T2W001: { qGl: 'Read the prompt and answer in 150\u2013200 characters.', passageGl: '\u201CWhat do you think is most important for protecting your health?\u201D Write one paragraph based on your own experience.' },
  T2W002: { qGl: 'Read the prompt and write a letter.', passageGl: 'Your friend sent you a book as a birthday present. Write a thank-you letter to your friend. (200\u2013300 characters)' }
};

function inject(file) {
  let src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  let count = 0;
  for (const [id, g] of Object.entries(GL)) {
    // find the block containing id: "XXX" or id: 'XXX'
    const idRe = new RegExp('(id:\\s*["\']' + id + '["\'],?)');
    if (!idRe.test(src)) { console.log('  !! id not found:', id); continue; }
    // locate the object start: the '{' before id
    const idIdx = src.indexOf('id: "' + id + '"') >= 0 ? src.indexOf('id: "' + id + '"') : src.indexOf("id: '" + id + "'");
    const objStart = src.lastIndexOf('{', idIdx);
    // object end: find the matching '}' — look for '},\n  {' or '}\n  ]' after idIdx
    const after = src.indexOf('},', idIdx);
    let objEnd = after >= 0 ? after + 1 : src.indexOf('}', idIdx);
    const block = src.slice(objStart, objEnd + 1);
    let newBlock = block;
    // skip if qGl already injected
    if (g.qGl && /qGl:/.test(block)) { continue; }
    // insert qGl after q: "..." (either quote style)
    const qRe = /(q:\s*"(?:[^"\\]|\\.)*")/;
    const qReS = /(q:\s*'(?:[^'\\]|\\.)*')/;
    if (g.qGl && qRe.test(block)) {
      newBlock = newBlock.replace(qRe, '$1, qGl: "' + g.qGl.replace(/"/g, '\\"') + '"');
    } else if (g.qGl && qReS.test(block)) {
      newBlock = newBlock.replace(qReS, '$1, qGl: "' + g.qGl.replace(/"/g, '\\"') + '"');
    } else if (g.qGl) { console.log('  !! q not matched in', id); }
    // insert passageGl after passage: "..." (only if passage exists)
    const pRe = /(passage:\s*"(?:[^"\\]|\\.)*")/;
    const pReS = /(passage:\s*'(?:[^'\\]|\\.)*')/;
    if (g.passageGl && pRe.test(newBlock)) {
      newBlock = newBlock.replace(pRe, '$1, passageGl: "' + g.passageGl.replace(/"/g, '\\"') + '"');
    } else if (g.passageGl && pReS.test(newBlock)) {
      newBlock = newBlock.replace(pReS, '$1, passageGl: "' + g.passageGl.replace(/"/g, '\\"') + '"');
    }
    if (newBlock !== block) {
      src = src.slice(0, objStart) + newBlock + src.slice(objEnd + 1);
      count++;
    }
  }
  fs.writeFileSync(path.join(ROOT, file), src, 'utf8');
  console.log(file, '→ injected', count, 'blocks');
}

inject('data/topik1-bank.js');
inject('data/topik2-bank.js');
console.log('done');
