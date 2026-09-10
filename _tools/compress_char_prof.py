#!/usr/bin/env python
"""Compress newly generated character profile videos in place.

Finds assets/chars_prof/*.mp4 that are still large (uncompressed fal output),
re-encodes to a lean mobile bitrate (480p-ish vertical, H.264, faststart, no audio),
and prints a summary. Safe to re-run: already-small files are skipped.
"""
import os, subprocess, sys

ROOT = r"C:\Users\USER\camnemi-topik"
DIR = os.path.join(ROOT, "assets", "chars_prof")
FF = os.path.join(os.environ['LOCALAPPDATA'],
                  r"Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0-full_build\bin\ffmpeg.exe")
THRESH = 800 * 1024  # only compress files bigger than this

def size(p): return os.path.getsize(p)

def main():
    if not os.path.isdir(DIR):
        print("no dir", DIR); return
    files = sorted(f for f in os.listdir(DIR) if f.endswith('.mp4'))
    done = []
    for f in files:
        p = os.path.join(DIR, f)
        before = size(p)
        if before <= THRESH:
            continue
        tmp = p + ".opt.mp4"
        cmd = [FF, "-y", "-i", p, "-c:v", "libx264", "-crf", "30", "-preset", "slow",
               "-maxrate", "1800k", "-bufsize", "3600k", "-profile:v", "main",
               "-movflags", "+faststart", "-an", tmp]
        r = subprocess.run(cmd, capture_output=True)
        if r.returncode == 0 and os.path.exists(tmp) and size(tmp) > 0:
            os.replace(tmp, p)
            done.append((f, before // 1024, size(p) // 1024))
        else:
            if os.path.exists(tmp): os.remove(tmp)
            print("FAIL", f, r.stderr.decode(errors='ignore')[-200:])
    print(f"compressed {len(done)} / {len(files)} files")
    for f, b, a in done:
        print(f"  {f}: {b}KB -> {a}KB")

if __name__ == '__main__':
    main()
