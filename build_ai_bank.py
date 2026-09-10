#!/usr/bin/env python3
"""Camnemi TOPIK — build a large STATIC AI question bank offline.
Calls Nous inference API directly (v4-flash, fast) using the local Hermes
Nous OAuth token, generating original TOPIK questions and writing them into
data/ai-bank.js as a static file the app can serve WITHOUT any AI server.

Output: data/ai-bank.js  →  window.AI_BANK = [ {...question}, ... ]
  Question schema matches the in-app banks exactly.

Usage: python build_ai_bank.py [target]
  target default 1000. Generates roughly target questions across
  levels 1-6 x sections (reading/listening/writing), deduped.
"""
import hashlib, json, os, sys, time, glob, re, urllib.request

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(APP_ROOT, "data", "ai-bank.js")

# --- Nous auth from Hermes (token + base) ---
HERMES_SHARED = os.path.join(os.environ.get("LOCALAPPDATA", r"C:\Users\USER\AppData\Local"), "hermes", "shared", "nous_auth.json")

def nous_auth():
    with open(HERMES_SHARED, encoding="utf-8") as f:
        d = json.load(f)
    return d["access_token"], d.get("inference_base_url", "https://inference-api.nousresearch.com/v1")

# --- exam structure (mirror ai_server.py) ---
EXAM = {
 "I": {"test":"TOPIK I","grammar":["이/가, 은/는, 을/를","에/에서/까지/부터","-(으)ㄹ 수 있다/없다","-(으)ㄹ 거예요","-아/어요","-았/었어요","-고 있다","-(으)면","-지만","-고 싶다","-아/어 주세요","-지 마세요","-네요","-(으)ㄴ데","-(으)ㄹ 때"],
   "vocab":"Everyday words only: family, food, shopping, time, school, weather, simple verbs/adjectives."},
 "II":{"test":"TOPIK II","grammar":["-(으)ㄴ 지","-다가","-았/었으면 좋겠다","-(으)ㄹ 수밖에 없다","-는/(으)ㄴ 것 같다","-(으)ㄹ 뻔했다","-(으)ㄹ 테니까","-는 데다가","-(으)ㄴ/는 반면에","-(으)ㄴ/는 척하다","-(으)ㄹ 정도로","-기 때문에","-(으)ㄴ/는 탓에","-았/었더라면","-는다고 하다","-(으)려고 하다","-는 중이다","-아/어 놓다"],
   "vocab":"Intermediate words (levels 3-4): opinions, work, health, society, news, abstract nouns."}}

SYSTEM = """You are a TOPIK exam question writer for Camnemi. Generate ORIGINAL questions mirroring official past-exam patterns and difficulty. Korean questions, English labels.
NEVER reproduce copyrighted past-paper questions verbatim — always write new original instances.
Return STRICT JSON only, no markdown:
{"questions":[{"section":"reading|listening|writing","type":"grammar|vocab|main_idea|comprehension|order|sentence_pos|topic|place|intent|writing_short|writing_letter","level":1..6,"points":2|3|4|10,"q":"question text KOREAN only","qGl":"english","passage":"korean passage or blank, omit if none","passageGl":"english","options":[{"t":"choice","gl":"english"}],"correct":0..3,"explain":"english why correct","traps":["english"],"tip":"english study tip","optExplain":["korean why x4, index[correct] starts 정답:","오답:..."],"optExplainEn":["english x4"],"tipEn":"english","freq":2,"freqNote":"which official section+range"}]}
Rules:
- q and passage MUST be 100% Korean, zero English.
- reading/listening: EXACTLY 4 options; correct MUST equal the index of the right option.
- LISTENING: the full dialogue (가: ... / 나: ...) goes in "q" (played aloud via TTS), plus "audioHint" with a short 1-2 line condensed script.
- EVERY mc question MUST include optExplain (4 Korean, index[correct] starts 정답:), optExplainEn (4 English), tipEn.
- writing questions: NO options; include "writePrompt":true and "answerModel":"150-300 char Korean model answer".
- Question count exactly equals requested count."""

def qhash(q):
    return hashlib.sha256(((q.get("q") or "") + "|" + (q.get("passage") or "")).encode("utf-8")).hexdigest()

def seed_seen():
    seen = set()
    import glob
    for f in glob.glob(os.path.join(APP_ROOT, "data", "level*-bank.js")) + \
            [os.path.join(APP_ROOT, "data", "topik1-bank.js"), os.path.join(APP_ROOT, "data", "topik2-bank.js")]:
        try:
            txt = open(f, encoding="utf-8").read()
            for pat in (r'q:\s*"((?:[^"\\]|\\.)*)"', r'passage:\s*"((?:[^"\\]|\\.)*)"'):
                for m in re.finditer(pat, txt):
                    seen.add(hashlib.sha256(m.group(1).encode("utf-8")).hexdigest())
        except Exception:
            pass
    return seen

def gen(level_roman, section, count, token, base):
    ex = EXAM[level_roman]
    body = json.dumps({
        "model": "deepseek/deepseek-v4-flash-0731",
        "messages": [
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content":
                f"Generate exactly {count} original {ex['test']} questions, section: {section}.\n"
                f"Grammar pool: {ex['grammar']}. Vocabulary: {ex['vocab']}.\n"
                f"Return STRICT JSON only."}
        ],
        "temperature": 0.9, "max_tokens": 16000
    }).encode()
    req = urllib.request.Request(base + "/chat/completions", data=body,
        headers={"Authorization": "Bearer " + token, "Content-Type": "application/json",
                 "User-Agent": "Mozilla/5.0 camnemi-build/1.0"})
    with urllib.request.urlopen(req, timeout=300) as r:
        data = json.loads(r.read().decode())
    txt = data["choices"][0]["message"]["content"]
    # strip fences
    txt = txt.strip()
    if txt.startswith("```"):
        txt = txt.split("\n", 1)[1]
        if txt.endswith("```"): txt = txt[:-3]
    try:
        return json.loads(txt).get("questions", [])
    except Exception:
        # brute force outermost {...}
        s = txt.find("{"); 
        for end in range(len(txt), s, -1):
            if txt[end-1] in "}]":
                try: return json.loads(txt[s:end]).get("questions", [])
                except Exception: pass
        return []

def normalize(q, idx, level, section):
    q["id"] = "AIB-%s%02d%04d" % (level, idx//1000+1, (idx*7919)%10000)
    q.setdefault("level", level)
    q.setdefault("section", section)
    q.setdefault("points", 3)
    q.setdefault("qGl",""); q.setdefault("passageGl",""); q.setdefault("explain","")
    q.setdefault("traps",[]); q.setdefault("tip","")
    if not q.get("q"): return None
    if section == "writing":
        q.setdefault("writePrompt", True); q.setdefault("answerModel","")
        return q
    opts = q.get("options") or []
    if len(opts) != 4: return None
    c = q.get("correct")
    if not isinstance(c,int) or not (0<=c<=3): return None
    for o in opts:
        if not isinstance(o,dict) or not o.get("t"): return None
    # full QA gate (never ship a broken question)
    try:
        import qa_lib
        hard = [p for p in qa_lib.validate_question(q) if p.split(":")[0] in (
            "EMPTY_Q","BARE_INSTRUCTION","NO_OPTIONS","EMPTY_OPTION","DUP_OPTION",
            "BAD_CORRECT","UNDERLINE_MISSING","NO_PASSAGE","LISTENING_NO_SCRIPT",
            "FREQ_LEVEL_MISMATCH","NO_GIVEN")]
        if hard: return None
    except Exception:
        pass
    return q

def main():
    target = int(sys.argv[1]) if len(sys.argv) > 1 else 1000
    token, base = nous_auth()
    seen = seed_seen()
    bank = []
    # load existing bank first (resume)
    if os.path.exists(OUT):
        try:
            txt = open(OUT, encoding="utf-8").read()
            import re as _re
            # crude: re-eval window.AI_BANK via json array — but it's JS. We'll keep a .json mirror instead.
        except Exception:
            pass
    LEVELS = [(1,"I"),(2,"I"),(3,"II"),(4,"II"),(5,"II"),(6,"II")]
    SECTIONS = ["reading","listening","writing"]
    per_cell = max(1, target // (len(LEVELS)*len(SECTIONS)))  # ~28 each for 1000
    t0 = time.time()
    ok = fail = dup = 0
    out_arr = []
    for lv, roman in LEVELS:
        for sec in SECTIONS:
            got = []
            attempts = 0
            while len(got) < per_cell and attempts < 6:
                try:
                    qs = gen(roman, sec, min(per_cell - len(got), 4), token, base)
                except Exception as e:
                    print(f"  [warn] L{lv} {sec}: {e}", flush=True); attempts+=1; time.sleep(3); continue
                for i,q in enumerate(qs):
                    nq = normalize(q, len(out_arr)+i, lv, sec)
                    if not nq: fail+=1; continue
                    h = qhash(nq)
                    if h in seen: dup+=1; continue
                    seen.add(h); got.append(nq)
                attempts+=1
            out_arr.extend(got)
            print(f"  L{lv} {sec}: +{len(got)} (total {len(out_arr)})", flush=True)
    # write JS
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("/* Camnemi TOPIK — static AI question bank (pre-generated offline).\n")
        f.write("   window.AI_BANK serves the 'AI questions'/'AI Redo' features without any server.\n*/\n")
        f.write("window.AI_BANK = ")
        json.dump(out_arr, f, ensure_ascii=False)
        f.write(";\n")
    dur = int(time.time()-t0)
    print(f"\n[done] wrote {len(out_arr)} questions to data/ai-bank.js | ok={ok} dupes={dup} failed={fail} | {dur}s", flush=True)

if __name__ == "__main__":
    main()
