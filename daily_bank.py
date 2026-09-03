#!/usr/bin/env python3
"""Camnemi TOPIK — daily question bank generator.

Every day at 12:00 KST this script:
  1. Loads the existing bank (data/daily-bank.json) and a seen-hash store.
  2. Generates ~100 NEW questions across levels 1-6 × sections
     (reading/listening/writing) by calling the local ai_server on :9001.
  3. Dedupes by (q + passage) hash so a question never repeats across days.
  4. Writes back data/daily-bank.json (keeps the last 700 for the rolling bank).
  5. Prints a short summary (delivered to the user by the cron job).

Run standalone:  python daily_bank.py
"""
import hashlib
import json
import os
import sys
import time
import urllib.request

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
BANK_PATH = os.path.join(APP_ROOT, "data", "daily-bank.json")
SEEN_PATH = os.path.join(APP_ROOT, "data", ".daily-seen.json")
API = "http://127.0.0.1:9001/api/generate"
TARGET = 100          # questions per day
KEEP = 700            # rolling bank size (≈ 1 week of questions)
LEVELS = [1, 2, 3, 4, 5, 6]
SECTIONS = ["reading", "listening", "writing"]
# distribute 100 across levels/sections evenly
PER_LEVEL = TARGET // len(LEVELS)        # 16 per level
PER_SECTION = PER_LEVEL // len(SECTIONS)  # ~5 per level/section


def log(*a):
    log(*a, flush=True)


def qhash(q):
    return hashlib.sha256(((q.get("q") or "") + "|" + (q.get("passage") or "")).encode("utf-8")).hexdigest()


def load_json(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default


def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)


def call_generate(level, section, count):
    body = json.dumps({"level": "I" if level <= 2 else "II", "count": count, "section": section}).encode()
    req = urllib.request.Request(API, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=600) as resp:
        d = json.loads(resp.read().decode())
    return d.get("questions", [])


def main():
    bank = load_json(BANK_PATH, [])
    seen = set(load_json(SEEN_PATH, []))
    # seed the seen-hash store from the existing bank (so day 2+ never repeats day 1)
    for q in bank:
        seen.add(qhash(q))
    # also seed from the static curated banks so daily AI never re-creates bank questions
    import glob, re
    static = glob.glob(os.path.join(APP_ROOT, "data", "level*-bank.js"))
    static += [os.path.join(APP_ROOT, "data", "topik1-bank.js"),
               os.path.join(APP_ROOT, "data", "topik2-bank.js")]
    for f in static:
        try:
            txt = open(f, encoding="utf-8").read()
            for pat in (r'q:\s*"((?:[^"\\]|\\.)*)"', r'passage:\s*"((?:[^"\\]|\\.)*)"'):
                for m in re.finditer(pat, txt):
                    seen.add(hashlib.sha256(m.group(1).encode("utf-8")).hexdigest())
        except Exception:
            pass

    fresh, dupes = [], 0
    t0 = time.time()
    for lv in LEVELS:
        for sec in SECTIONS:
            got = []
            attempts = 0
            while len(got) < PER_SECTION and attempts < 4:
                try:
                    qs = call_generate(lv, sec, min(PER_SECTION - len(got), 5))
                except Exception as e:
                    log(f"  [warn] L{lv} {sec}: {e}")
                    attempts += 1
                    time.sleep(5)
                    continue
                for q in qs:
                    h = qhash(q)
                    if h in seen:
                        dupes += 1
                        continue
                    seen.add(h)
                    got.append(q)
                attempts += 1
            fresh.extend(got)
            log(f"  L{lv} {sec}: +{len(got)}")

    # rolling bank: newest first, keep last KEEP
    bank = fresh + bank
    bank = bank[:KEEP]

    save_json(BANK_PATH, bank)
    save_json(SEEN_PATH, sorted(seen))
    dur = int(time.time() - t0)
    log(f"\n[daily-bank] {len(fresh)} new questions (dupes skipped: {dupes}) | bank total: {len(bank)} | {dur}s")


if __name__ == "__main__":
    main()
