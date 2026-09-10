#!/usr/bin/env python3
"""Camnemi TOPIK — daily question bank generator.

Every day at 12:00 KST this script (spawned by daily_bank_cron.py) generates:
  1. Reading / Listening / Writing practice: PER_SECTION (5) per level (1-6).
  2. Vocabulary: VOCAB_TARGET (20) fresh multiple-choice vocab questions
     (10 TOPIK I + 10 TOPIK II).
  3. Mock tests: one compact TOPIK I mock + one compact TOPIK II mock
     (MOCK_PLAN below — sized to stay practical; raise the numbers for a
     full-length 70/104-question exam if you want longer generation runs).

Outputs (all gitignored / PC-only, served by ai_server.py):
  data/daily-bank.json    rolling practice questions (newest first)
  data/daily-vocab.json   today's 20 vocab questions
  data/daily-mocks.json   today's TOPIK I + TOPIK II mocks
  data/.daily-seen.json   global seen-hash store (dedupe across days)

Run standalone:  python daily_bank.py
"""
import hashlib
import json
import os
import time
import urllib.request

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(APP_ROOT, "data")
BANK_PATH = os.path.join(DATA, "daily-bank.json")
VOCAB_PATH = os.path.join(DATA, "daily-vocab.json")
MOCKS_PATH = os.path.join(DATA, "daily-mocks.json")
SEEN_PATH = os.path.join(DATA, ".daily-seen.json")
API = "http://127.0.0.1:9001/api/generate"
KEEP = 700            # rolling practice bank size
LEVELS = [1, 2, 3, 4, 5, 6]
SECTIONS = ["reading", "listening", "writing"]
PER_SECTION = 5       # 5 per level/section → 90 practice questions/day
VOCAB_TARGET = 20     # 20 vocab questions/day (10 TOPIK I + 10 TOPIK II)
# compact mock sizes — [listening, reading, writing] per test. Tunable.
MOCK_PLAN = {
    "I":  {"test": "TOPIK I",  "goal": "Level 1-2", "duration": "100 min", "plan": [("listening", 10), ("reading", 10)]},
    "II": {"test": "TOPIK II", "goal": "Level 3",   "duration": "180 min", "plan": [("listening", 10), ("reading", 8), ("writing", 2)]},
}


def log(*a):
    print(*a, flush=True)


def qhash(q):
    return hashlib.sha256(((q.get("q") or "") + "|" + (q.get("passage") or "")).encode("utf-8")).hexdigest()


def load_json(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)


def call_generate(level, section, count, qtype=""):
    body = {"level": level, "count": count, "section": section}
    if qtype:
        body["type"] = qtype
    req = urllib.request.Request(API, data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=900) as resp:
        d = json.loads(resp.read().decode())
    return d.get("questions", [])


def gen_into_seen(level, section, count, seen, qtype="", force_section=None, keep_order=False):
    """Generate `count` fresh (deduped) questions; returns the accepted list."""
    got, attempts = [], 0
    while len(got) < count and attempts < 4:
        try:
            qs = call_generate(level, section, min(count - len(got), 5), qtype)
        except Exception as e:
            log(f"  [warn] {level}/{section}{'/' + qtype if qtype else ''}: {e}")
            attempts += 1
            time.sleep(5)
            continue
        for q in qs:
            if force_section:
                q["section"] = force_section
            # QA gate — reject any question that would render broken
            try:
                import qa_lib
                if qa_lib.validate_question(q):
                    log(f"  [qa] dropped bad question: {qa_lib.validate_question(q)[:1]}")
                    continue
            except Exception:
                pass
            h = qhash(q)
            if h in seen:
                continue
            seen.add(h)
            got.append(q)
        attempts += 1
    return got


def main():
    bank = load_json(BANK_PATH, [])
    seen = set(load_json(SEEN_PATH, []))
    for q in bank:
        seen.add(qhash(q))
    # seed from the static curated banks so daily AI never re-creates them
    import glob, re
    static = glob.glob(os.path.join(DATA, "level*-bank.js"))
    static += [os.path.join(DATA, "topik1-bank.js"), os.path.join(DATA, "topik2-bank.js")]
    for f in static:
        try:
            txt = open(f, encoding="utf-8").read()
            for pat in (r'q:\s*"((?:[^"\\]|\\.)*)"', r'passage:\s*"((?:[^"\\]|\\.)*)"'):
                for m in re.finditer(pat, txt):
                    seen.add(hashlib.sha256(m.group(1).encode("utf-8")).hexdigest())
        except Exception:
            pass

    t0 = time.time()

    # 1) practice: reading/listening/writing per level
    fresh = []
    for lv in LEVELS:
        for sec in SECTIONS:
            got = gen_into_seen("I" if lv <= 2 else "II", sec, PER_SECTION, seen)
            fresh.extend(got)
            log(f"  L{lv} {sec}: +{len(got)}")

    # 2) vocabulary: 10 TOPIK I + 10 TOPIK II
    vocab = []
    vI = gen_into_seen("I", "reading", VOCAB_TARGET // 2, seen, qtype="vocab", force_section="vocab")
    vII = gen_into_seen("II", "reading", VOCAB_TARGET - len(vI), seen, qtype="vocab", force_section="vocab")
    vocab = vI + vII
    log(f"  vocab: +{len(vocab)} (I {len(vI)} / II {len(vII)})")

    # 3) mocks: one compact TOPIK I + one TOPIK II (each with embedded questions)
    today = time.strftime("%Y-%m-%d")
    mocks = []
    for key, spec in MOCK_PLAN.items():
        qs = []
        for sec, n in spec["plan"]:
            part = gen_into_seen(key, sec, n, seen)
            qs.extend(part)
            log(f"  mock {key} {sec}: +{len(part)}")
        mocks.append({
            "id": f"DM-{today}-{key}",
            "date": today,
            "name": f"Daily {spec['test']} Mock ({today})",
            "test": spec["test"],
            "goal": spec["goal"],
            "duration": spec["duration"],
            "sections": ["Listening", "Writing", "Reading"] if key == "II" else ["Listening", "Reading"],
            "questions": qs,           # self-contained (no qid lookup needed)
            "daily": True,
        })
    log(f"  mocks: {len(mocks)} ({', '.join(m['id'] for m in mocks)})")

    # persist
    bank = (fresh + bank)[:KEEP]
    save_json(BANK_PATH, bank)
    save_json(VOCAB_PATH, vocab)
    save_json(MOCKS_PATH, mocks)
    save_json(SEEN_PATH, sorted(seen))

    dur = int(time.time() - t0)
    log(f"\n[daily-bank] practice {len(fresh)} · vocab {len(vocab)} · mocks {len(mocks)} "
        f"| bank total {len(bank)} | {dur}s")


if __name__ == "__main__":
    main()
