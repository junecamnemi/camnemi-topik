#!/usr/bin/env python3
"""Camnemi TOPIK — daily bank cron wrapper.

The full generation of ~100 questions takes ~1 hour with the reasoning model,
so this wrapper spawns daily_bank.py as a DETACHED background process and
exits immediately — the cron tick is never blocked, and generation continues
even if the scheduler restarts. Progress is appended to data/daily-bank.log.

Run by the Hermes cron job every day at 12:00 KST (no_agent script).
"""
import os
import subprocess
import sys
import time

ROOT = os.path.dirname(os.path.abspath(__file__))
TARGET = os.path.join(ROOT, "daily_bank.py")
LOG = os.path.join(ROOT, "data", "daily-bank.log")

# DETACHED_PROCESS | CREATE_NEW_PROCESS_GROUP — survive the cron session on Windows
FLAGS = 0x00000008 | 0x00000200

def main():
    os.makedirs(os.path.dirname(LOG), exist_ok=True)
    with open(LOG, "a", encoding="utf-8") as lf:
        lf.write(f"\n=== spawn {time.strftime('%Y-%m-%d %H:%M:%S')} ===\n")
    try:
        out = open(LOG, "ab")
        p = subprocess.Popen(
            [sys.executable, TARGET],
            cwd=ROOT,
            stdout=out,
            stderr=subprocess.STDOUT,
            creationflags=FLAGS,
            close_fds=True,
        )
        print(f"[daily-bank] generation started (pid {p.pid}) — ~100 fresh questions, log: data/daily-bank.log")
    except Exception as e:
        print(f"[daily-bank] FAILED to start: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
