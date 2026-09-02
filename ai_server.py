"""Camnemi TOPIK — AI question generator (local test server).
Calls the same Nous LLM endpoint Hermes uses (device_code OAuth in this venv)
to generate original TOPIK questions as JSON.

Run:  python ai_server.py   (serves on :9001, CORS open for local dev)
Contract:
  POST /api/generate  {level:"I"|"II", count:5, section:"reading"|"listening"|"writing"|"all"}
  -> {questions:[{id,section,type,level,points,q,passage?,options:[{t,gl?}],correct,explain,traps[],tip,freq,freqNote}], ai:true}
"""
import json, os, sys, uuid, time
import httpx
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# Nous endpoint (same as Hermes config.yaml model block)
NOUS_BASE = os.environ.get("NOUS_BASE", "https://inference-api.nousresearch.com/v1")
NOUS_MODEL = os.environ.get("NOUS_MODEL", "deepseek/deepseek-v4-flash")

app = FastAPI(title="Camnemi TOPIK AI Generator")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# =========================================================================
# 기출 분석 데이터 (TOPIK GUIDE 무료 노트 + 공식 기출 유형 분석 기반)
# - 매 회차 고정 유형/문항 수 (TOPIK I: 듣기30+읽기40, TOPIK II: 듣기50+쓰기4+읽기50)
# - 급수별 대표 문법 포인트 (3급 목표에 필요한 중급 문법)
# - 급수별 어휘 난이도 지침
# 이 데이터는 LLM 프롬프트에 주입되어 "기출을 닮은" 문제를 생성하게 한다.
# =========================================================================
EXAM_STRUCTURE = {
    "I": {
        "test": "TOPIK I (levels 1-2)",
        "listening_count": 30, "reading_count": 40, "writing_count": 0,
        "type_weights": {
            "listening": {"topic": 4, "place": 4, "intent": 3, "comprehension": 3, "grammar": 4},
            "reading": {"grammar": 6, "vocab": 5, "main_idea": 3, "comprehension": 8, "order": 2, "sentence_pos": 2}
        },
        "grammar_pool": [
            "이/가, 은/는, 을/를 (particles)", "에/에서/까지/부터 (location & time)",
            "-(으)ㄹ 수 있다/없다 (can/cannot)", "-(으)ㄹ 거예요 (future/intention)",
            "-아/어요 (present polite)", "-았/었어요 (past)", "-고 있다 (progressive)",
            "-(으)면 (if)", "-지만 (but)", "-고 싶다 (want to)", "-아/어 주세요 (please)",
            "-지 마세요 (don't)", "-네요 (exclamation)", "-나요? (question)", "-께서 (honorific)"
        ],
        "vocab_guide": "Everyday words only: family, food, shopping, time, school, weather, simple verbs/adjectives (level 1-2 of TOPIK I 1671-word list)."
    },
    "II": {
        "test": "TOPIK II (levels 3-6, focus level 3)",
        "listening_count": 50, "reading_count": 50, "writing_count": 4,
        "type_weights": {
            "listening": {"topic": 8, "place": 6, "intent": 6, "comprehension": 10, "grammar": 8},
            "reading": {"grammar": 8, "vocab": 6, "main_idea": 6, "comprehension": 12, "order": 2, "sentence_pos": 2},
            "writing": {"writing_short": 1, "writing_letter": 1}
        },
        "grammar_pool": [
            "-(으)ㄴ 지 (time since)", "-다가 (interrupted action)", "-았/었으면 좋겠다 (wish)",
            "-(으)ㄹ 수밖에 없다 (no choice)", "-는/(으)ㄴ 것 같다 (seems like)", "-(으)ㄹ 뻔했다 (almost did)",
            "-(으)ㄹ 테니까 (since/assume)", "-는 데다가 (in addition)", "-(으)ㄴ/는 반면에 (whereas)",
            "-(으)ㄴ/는 척하다 (pretend)", "-(으)ㄹ 정도로 (to the extent)", "-기 때문에 (because)",
            "-(으)ㄴ/는 탓에 (due to bad reason)", "-았/었더라면 (if had done)", "-는다고 하다 (hearsay)",
            "-(으)려고 하다 (intend to)", "-는 중이다 (in the middle of)", "-아/어 놓다 (do in advance)"
        ],
        "vocab_guide": "Intermediate words (level 3-4): opinions, work, health, society, news, abstract nouns, compound verbs."
    }
}

SYSTEM = """You are a TOPIK exam question writer for Camnemi, an app that helps students worldwide
pass the TOPIK test. You generate ORIGINAL questions that mirror the OFFICIAL past exams'
patterns and difficulty — same question types, same section order, same grading weights.
Korean questions, English labels.
NEVER reproduce actual copyrighted past-paper questions verbatim — always write new, original
instances of the same patterns.

Given structure: the caller passes you the real exam structure (section counts, type weights,
level-appropriate grammar pool, vocabulary guide). Use it to pick realistic types.

Return STRICT JSON only, no markdown, no commentary:
{"questions":[{"section":"reading|listening|writing","type":"one of: grammar|vocab|main_idea|order|sentence_pos|topic|place|intent|comprehension|writing_short|writing_letter","level":1..6,"points":2|3|4|10|20,"q":"question text in Korean","passage":"passage or blank-sentence (Korean), omit if none","options":[{"t":"choice","gl":"english gloss"}],"correct":0..3,"explain":"why correct (English)","traps":["why each wrong (English)"],"tip":"study tip (English)","freq":2,"freqNote":"which official section + Q-range it mirrors"}]}
Rules:
- reading/listening questions have EXACTLY 4 options; correct MUST be the index of the right option (0-3). ALWAYS set correct explicitly and match it to the option text.
- Choose question types according to the provided type_weights (weighted random).
- Use the provided grammar_pool / vocab_guide so difficulty matches the level.
- writing questions (type writing_short/writing_letter) have NO options; include "writePrompt":true and "answerModel":"a 150-300 char model Korean answer".
- freqNote should name the real official section, e.g. "TOPIK II 읽기 34~39 · 연결어미" or "TOPIK I 듣기 1~3 · 대답 고르기".
- questions count exactly equals the requested count."""

def _ask_llm(prompt: str) -> dict:
    """Call Nous via openai-compatible endpoint using the local venv's auth."""
    from openai import OpenAI
    # Hermes stores its Nous device_code OAuth token in the credential pool.
    api_key = None
    try:
        import sys
        HERMES_AGENT = os.environ.get("HERMES_AGENT_DIR", r"C:\Users\USER\AppData\Local\hermes\hermes-agent")
        if HERMES_AGENT not in sys.path:
            sys.path.insert(0, HERMES_AGENT)
        from agent.credential_pool import load_pool
        pool = load_pool("nous")
        if pool and pool.has_credentials():
            entry = pool.peek()
            if entry:
                api_key = str(getattr(entry, "access_token", "") or getattr(entry, "runtime_api_key", "")).strip()
    except Exception as e:
        print("[ai_server] pool lookup failed:", e)
    if not api_key:
        # fall back to env
        api_key = os.environ.get("NOUS_API_KEY") or os.environ.get("OPENAI_API_KEY") or ""
    client = OpenAI(base_url=NOUS_BASE, api_key=api_key or "dummy")
    r = client.chat.completions.create(
        model=NOUS_MODEL,
        messages=[{"role": "system", "content": SYSTEM},
                  {"role": "user", "content": prompt}],
        temperature=0.9,
        max_tokens=4000,
    )
    txt = r.choices[0].message.content or ""
    return _parse_json(txt)

def _parse_json(txt: str):
    """Robustly parse LLM JSON output even if truncated/fenced."""
    txt = txt.strip()
    if txt.startswith("```"):
        # remove first line (language tag) and trailing ```
        txt = txt.split("\n", 1)[1]
        if txt.endswith("```"):
            txt = txt[:-3].rstrip()
    try:
        return json.loads(txt)
    except Exception:
        pass
    # brute-force repair: find the outermost {...} and try to close it
    start = txt.find("{")
    if start >= 0:
        # strip trailing garbage: cut at last '}' or ']' that lets json.loads succeed
        for end in range(len(txt), start, -1):
            if txt[end-1] in "}]":
                try:
                    return json.loads(txt[start:end])
                except Exception:
                    continue
    # final fallback: try to fix common truncation (add closing braces)
    for extra in ["}]", '"]}', "}"]:
        try:
            return json.loads(txt + extra)
        except Exception:
            continue
    raise ValueError("Could not parse LLM JSON: " + txt[:120])

def _normalize(q, idx, level, section):
    """Validate & repair a generated question. Returns (question, error).
    - Never silently guess `correct` — an invalid question is rejected instead.
    - Assign unique ids (uuid-based so chunks never collide)."""
    q.setdefault("id", "AI%s-%s" % (level, uuid.uuid4().hex[:6]))
    q["level"] = q.get("level", 3 if level == "II" else 1)
    q["section"] = q.get("section", section)
    q.setdefault("points", 3)
    q.setdefault("explain", "")
    q.setdefault("traps", [])
    q.setdefault("tip", "")
    # validate required text
    if not q.get("q"):
        return None, "missing q text"
    if q["section"] == "writing":
        q.setdefault("writePrompt", True)
        q.setdefault("answerModel", "")
        return q, None
    # non-writing: MUST have 4 options and a valid correct index
    opts = q.get("options") or []
    if len(opts) != 4:
        return None, "must have exactly 4 options"
    c = q.get("correct")
    if not isinstance(c, int) or not (0 <= c <= 3):
        return None, "missing/invalid correct index"
    # ensure option texts exist
    for i, o in enumerate(opts):
        if not isinstance(o, dict) or not o.get("t"):
            return None, f"option {i} missing text"
    return q, None

def _pick_types(level, section, n):
    """Weighted-random type selection mirroring real past-exam distribution."""
    import random
    w = EXAM_STRUCTURE[level]["type_weights"].get(section, {})
    keys = list(w.keys()); weights = list(w.values())
    if not keys:
        return ["grammar"] * n
    return random.choices(keys, weights=weights, k=n)

def _build_prompt(level, section, n, types):
    ex = EXAM_STRUCTURE[level]
    type_str = ", ".join(types)
    return (
        f"Generate exactly {n} original {ex['test']} questions, section: {section}.\n"
        f"Use these question types (in this order, one per question): {type_str}.\n"
        f"Real exam structure — {section}: {ex['listening_count'] if section=='listening' else ex['reading_count'] if section=='reading' else ex['writing_count']} items/section; "
        f"type weights: {ex['type_weights'].get(section, {})}.\n"
        f"Level-appropriate grammar pool (use some of these): {ex['grammar_pool']}.\n"
        f"Vocabulary guide: {ex['vocab_guide']}.\n"
        f"Return STRICT JSON only."
    )

@app.post("/api/generate")
async def generate(req: Request):
    body = await req.json()
    level = (body.get("level") or "II").upper()
    if level not in ("I", "II"):
        level = "II"
    count = max(1, min(int(body.get("count", 5)), 10))
    section = (body.get("section") or "all").lower()
    if section not in ("reading", "listening", "writing", "all"):
        section = "all"
    # split requested count across sections when "all", matching real exam ratio.
    # TOPIK I: 듣기30:읽기40 (no writing). TOPIK II: 듣기50:쓰기4:읽기50.
    if section == "all":
        if level == "I":
            plan = [("reading", (count * 4 + 2) // 7), ("listening", count - (count * 4 + 2) // 7)]
        else:
            # listening:reading = 1:1, writing ~8% (small but present)
            wr = max(1, round(count * 0.08)) if count >= 8 else (1 if count >= 5 else 0)
            rest = count - wr
            half = rest // 2
            plan = [("listening", half), ("reading", rest - half), ("writing", wr)]
    else:
        plan = [(section, count)]
    try:
        import asyncio
        chunk = 3

        async def one_chunk(prompt):
            for attempt in range(3):
                try:
                    data = await asyncio.to_thread(_ask_llm, prompt)
                    qs = data.get("questions", data if isinstance(data, list) else [])
                    if qs:
                        return qs
                except Exception:
                    pass
                await asyncio.sleep(1.0)
            return []

        tasks = []
        for sec, n in plan:
            if n <= 0:
                continue
            types = _pick_types(level, sec, n)
            for start in range(0, n, chunk):
                types_chunk = types[start:start + chunk]
                p = _build_prompt(level, sec, len(types_chunk), types_chunk)
                tasks.append((sec, one_chunk(p)))

        results = await asyncio.gather(*(t for _, t in tasks))
        # validate every question; drop invalid ones instead of guessing answers
        out, errors = [], []
        for (sec, _), qs in zip(tasks, results):
            for i, q in enumerate(qs):
                qn, err = _normalize(q, i, level, sec)
                if qn:
                    out.append(qn)
                else:
                    errors.append(err)
        out = out[:count]
        return {"questions": out, "ai": True, "model": NOUS_MODEL, "dropped": errors}
    except Exception as e:
        return {"error": str(e), "ai": False}

@app.get("/health")
async def health():
    return {"ok": True, "model": NOUS_MODEL}

if __name__ == "__main__":
    import uvicorn
    print("Camnemi AI generator on :9001 —", NOUS_BASE, NOUS_MODEL)
    uvicorn.run(app, host="0.0.0.0", port=9001)
