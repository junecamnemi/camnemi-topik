#!/usr/bin/env python3
"""qa_lib.py — shared question QA for camnemi-topik generation & banks.

validate_question(q) -> list[str] of problems (empty == OK).
Mirrors scripts/qa_banks.js so generated questions are rejected at
generation time (never shipped broken).

Error codes:
  EMPTY_Q, BARE_INSTRUCTION, NO_OPTIONS, OPT_COUNT, EMPTY_OPTION, DUP_OPTION,
  BAD_CORRECT, UNDERLINE_MISSING, NO_PASSAGE, LISTENING_NO_SCRIPT,
  FREQ_LEVEL_MISMATCH, TYPO, NO_GIVEN, NO_EXPLAIN
"""
import re

TASK_WORDS = re.compile(r"(고르십시오|답하십시오|쓰십시오|무엇|무슨|어디|누구|언제|왜|어떻게|몇|맞는 것|같은 것|알맞은|들어갈|이유|중심|주제|밑줄|고르세요|선택)")
WRITING_TYPES = re.compile(r"writing")

READING_NEEDS_PASSAGE = re.compile(
    r"(comprehension|long|same_content|main_idea|insert_sentence|order|attitude|notice|headline|topic|detail)")

def validate_question(q):
    """Return a list of error strings for a question dict (empty = valid)."""
    problems = []
    if not isinstance(q, dict):
        return ["NOT_OBJECT"]

    sec = q.get("section") or ""
    typ = q.get("type") or ""
    qid = q.get("id") or q.get("q") or "?"
    is_writing = bool(WRITING_TYPES.search(typ)) or bool(q.get("answerModel")) or bool(q.get("writePrompt"))

    qtext = str(q.get("q") or "")
    passage = str(q.get("passage") or "")

    # 1) empty question
    if not qtext.strip():
        problems.append("EMPTY_Q: question text is empty (물음 없음)")

    # 2) bare instruction referencing 물음 but no subq
    if qtext and re.search(r"물음에\s*답하십시오", qtext):
        stripped = qtext.replace("물음에 답하십시오", "")
        if not TASK_WORDS.search(stripped) and not q.get("subq"):
            problems.append('BARE_INSTRUCTION: references 물음 but has no subq')

    # 3) options / correct
    if not is_writing:
        opts = q.get("options") or []
        if not isinstance(opts, list) or len(opts) < 2:
            problems.append(f"NO_OPTIONS: options missing/<2 ({len(opts) if isinstance(opts, list) else 'none'})")
        else:
            if len(opts) != 4:
                problems.append(f"OPT_COUNT: {len(opts)} options (expected 4)")
            texts = []
            for o in opts:
                t = (o.get("t") if isinstance(o, dict) else str(o)) or ""
                texts.append(str(t))
            if any(not t.strip() for t in texts):
                problems.append("EMPTY_OPTION: an option has empty text")
            dups = sorted({t for t in texts if t and texts.count(t) > 1})
            if dups:
                problems.append("DUP_OPTION: " + " / ".join(dups))
            c = q.get("correct")
            ci = c if isinstance(c, int) else (int(c) if str(c).isdigit() else None)
            if ci is None or not (0 <= ci < len(opts)):
                problems.append(f"BAD_CORRECT: correct={c} out of range(0..{len(opts)-1})")

    # 4) underline mention needs <u> (blank-fill ______ exempt)
    blob = passage + " " + qtext
    if re.search(r"밑줄|밑\s*친|[Uu]nderlin", qtext + passage):
        if "<u>" not in blob and not re.search(r"_{3,}", blob):
            problems.append("UNDERLINE_MISSING: mentions 밑줄 but no <u> tag")

    # 5) reading comprehension needs a passage; listening needs a script somewhere
    is_reading = (sec == "reading")
    if READING_NEEDS_PASSAGE.search(typ) and is_reading and not passage.strip():
        problems.append(f"NO_PASSAGE: reading type={typ} requires a passage")
    if sec == "listening":
        has_script = bool(str(q.get("dialogue") or "").strip()) or bool(str(q.get("audioHint") or "").strip()) \
            or bool(passage.strip()) or len(qtext.strip()) > 12
        if not has_script:
            problems.append("LISTENING_NO_SCRIPT: no dialogue/audioHint/passage/script")

    # 6) freqNote level mismatch
    fn = str(q.get("freqNote") or "")
    lv = q.get("level") or 0
    if fn and isinstance(lv, int):
        if re.search(r"TOPIK II", fn) and 0 < lv <= 2:
            problems.append(f"FREQ_LEVEL_MISMATCH: level {lv} carries freqNote '{fn}'")
        if re.search(r"TOPIK I(?!I)", fn) and lv >= 3:
            problems.append(f"FREQ_LEVEL_MISMATCH: level {lv} carries freqNote '{fn}'")

    # 7) typo "다음 읽고"
    if re.search(r"다음\s+읽고", qtext):
        problems.append('TYPO: "다음 읽고" (should be "다음을 읽고")')

    # 8) insert_sentence needs given
    if "insert_sentence" in typ and not str(q.get("given") or "").strip():
        problems.append("NO_GIVEN: insert_sentence type but no `given` sentence")

    # 9) explanation presence (non-writing)
    if not is_writing and not str(q.get("explain") or "").strip():
        problems.append("NO_EXPLAIN: explain is empty")

    return problems
