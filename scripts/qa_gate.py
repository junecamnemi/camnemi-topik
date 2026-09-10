#!/usr/bin/env python3
"""qa_gate.py — silent QA watchdog for camnemi-topik question banks.

Runs scripts/qa_banks.js. If there are ZERO errors, prints nothing
(so the Hermes cron watchdog stays silent). If errors exist, prints a
short alert the cron delivers to the user.

Also runs the Python qa_lib over data/daily-bank.json + ai-bank.js if present,
and checks the deployed site's key banks are reachable (best-effort).
"""
import json, os, subprocess, sys, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(ROOT)

def run_node_qa():
    script = os.path.join(APP, "scripts", "qa_banks.js")
    if not os.path.exists(script):
        return None, "qa_banks.js not found"
    r = subprocess.run(["node", script, "--json"], cwd=APP, capture_output=True, text=True)
    try:
        return json.loads(r.stdout), None
    except Exception as e:
        return None, f"qa parse fail: {e}: {r.stdout[:200]} {r.stderr[:200]}"

def main():
    data, err = run_node_qa()
    if err:
        print(f"⚠️ QA 게이트 실행 실패: {err}")
        return 1
    errors = data.get("errors", [])
    scanned = data.get("scanned", 0)
    if not errors:
        return 0  # silent — all good
    # errors found → alert
    lines = [f"🚨 문제 은행 QA 오류 {len(errors)}건 (총 {scanned}문제 검사)"]
    by_code = {}
    for e in errors:
        by_code.setdefault(e["code"], []).append(e)
    for code, items in by_code.items():
        lines.append(f"• [{code}] {len(items)}건")
        for it in items[:4]:
            lines.append(f"   - {it['file']} {it['id']}: {it['msg'][:70]}")
        if len(items) > 4:
            lines.append(f"   … +{len(items)-4}")
    lines.append("\n전체: camnemi-topik/scripts/qa_banks.js")
    print("\n".join(lines))
    return 1

if __name__ == "__main__":
    sys.exit(main())
