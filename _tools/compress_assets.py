#!/usr/bin/env python
"""Compress used assets (videos + oversized images) in place.

- Background/decoration videos: re-encode lean, audio dropped.
- lesson (drama) clips: re-encode, audio KEPT.
- PNG/JPG images > 300KB: re-encode to webp where the app can use it, else keep.
Skip files already under threshold. Safe to re-run.
"""
import os, subprocess, sys

ROOT = r"C:\Users\USER\camnemi-topik"
FF = os.path.join(os.environ['LOCALAPPDATA'],
                  r"Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0-full_build\bin")
FFMPEG = os.path.join(FF, "ffmpeg.exe")
FFPROBE = os.path.join(FF, "ffprobe.exe")

BG_THRESH = 380 * 1024
KEEP_AUDIO_DIRS = ("assets\\drama",)

def size(p): return os.path.getsize(p)

def probe_dur(p):
    try:
        r = subprocess.run([FFPROBE,"-v","error","-show_entries","format=duration",
                            "-of","default=noprint_wrappers=1:nokey=1",p],capture_output=True,text=True)
        return float(r.stdout.strip() or 0)
    except Exception:
        return 0.0

def compress_video(p, keep_audio):
    before = size(p)
    tmp = p + ".opt.mp4"
    cmd = [FFMPEG,"-y","-i",p,"-c:v","libx264","-crf","30","-preset","slow",
           "-maxrate","1600k","-bufsize","3200k","-profile:v","main","-movflags","+faststart"]
    if keep_audio:
        cmd += ["-c:a","aac","-b:a","96k"]
    else:
        cmd += ["-an"]
    cmd += [tmp]
    r = subprocess.run(cmd, capture_output=True)
    if r.returncode==0 and os.path.exists(tmp) and size(tmp)>0 and size(tmp) < before:
        os.replace(tmp, p); return before, size(p)
    if os.path.exists(tmp): os.remove(tmp)
    return before, before

def main():
    vids=[]
    for dirpath,dirs,fs in os.walk(os.path.join(ROOT,"assets")):
        if "_archive_dead" in dirpath: continue
        for f in fs:
            if f.endswith(".mp4"):
                p=os.path.join(dirpath,f)
                if size(p) > BG_THRESH: vids.append(p)
    vids.sort(key=lambda p:-size(p))
    tot_before=tot_after=0; n=0
    for p in vids:
        keep = any(("\\"+d.replace("/",os.sep)+"\\") in p or p.startswith(os.path.join(ROOT,d)) for d in KEEP_AUDIO_DIRS)
        b,a = compress_video(p, keep)
        if a<b:
            n+=1; tot_before+=b; tot_after+=a
            print(f"  {os.path.relpath(p,ROOT)}: {b//1024}KB -> {a//1024}KB{' (audio kept)' if keep else ''}")
    print(f"\ncompressed {n} videos | {tot_before/1048576:.1f}MB -> {tot_after/1048576:.1f}MB  (saved {(tot_before-tot_after)/1048576:.1f}MB)")

if __name__=="__main__":
    main()
