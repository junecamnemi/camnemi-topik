#!/usr/bin/env python3
"""Generate a per-character LEVEL-UP celebration video via FAL (Seedance 2.0 mini i2i).
Uploads the character anchor to FAL storage, submits i2i, polls, downloads to
assets/levelup/<id>.mp4 (portrait 9:16)."""
import os, sys, json, time, urllib.request, mimetypes

ROOT = r'C:\Users\USER\camnemi-topik'
ENV = r'C:\Users\USER\AppData\Local\hermes\.env'
OUT = os.path.join(ROOT, 'assets', 'levelup')

def fal_key():
    for line in open(ENV, encoding='utf-8', errors='ignore'):
        if line.strip().startswith('FAL_KEY'):
            return line.split('=', 1)[1].strip().strip('"').strip("'")
    raise SystemExit('FAL_KEY not found')

def upload(path, key):
    ctype = mimetypes.guess_type(path)[0] or 'image/webp'
    body = json.dumps({"content_type": ctype, "file_name": os.path.basename(path)}).encode()
    req = urllib.request.Request("https://rest.alpha.fal.ai/storage/upload/initiate",
        data=body, headers={"Authorization": f"Key {key}", "Content-Type": "application/json"})
    r = json.loads(urllib.request.urlopen(req, timeout=60).read())
    file_url, upload_url = r["file_url"], r["upload_url"]
    data = open(path, 'rb').read()
    req2 = urllib.request.Request(upload_url, data=data, method='PUT',
        headers={"Content-Type": ctype})
    urllib.request.urlopen(req2, timeout=120).read()
    return file_url

def submit(image_url, prompt, key, dur=5, ratio="9:16"):
    body = json.dumps({"image_url": image_url, "prompt": prompt,
        "duration": dur, "aspect_ratio": ratio, "resolution": "720p"}).encode()
    req = urllib.request.Request("https://queue.fal.run/bytedance/seedance-2.0/mini/image-to-video",
        data=body, headers={"Authorization": f"Key {key}", "Content-Type": "application/json"})
    return json.loads(urllib.request.urlopen(req, timeout=60).read())

def poll(job, key, timeout=600):
    status_url = job["status_url"]
    t0 = time.time()
    while time.time() - t0 < timeout:
        req = urllib.request.Request(status_url, headers={"Authorization": f"Key {key}"})
        s = json.loads(urllib.request.urlopen(req, timeout=60).read())
        st = s.get("status")
        if st == "COMPLETED":
            # fetch response_url
            rurl = job.get("response_url")
            req2 = urllib.request.Request(rurl, headers={"Authorization": f"Key {key}"})
            res = json.loads(urllib.request.urlopen(req2, timeout=60).read())
            return res
        if st in ("FAILED", "ERROR"):
            raise SystemExit(f"job failed: {s}")
        time.sleep(6)
    raise SystemExit("timeout")

def main():
    key = fal_key()
    os.makedirs(OUT, exist_ok=True)
    cid = sys.argv[1] if len(sys.argv) > 1 else 'f-01'
    anchor_src = {'f-01':'assets/glowsis/aran.webp','f-02':'assets/glowsis/chaea.webp',
                  'f-03':'assets/glowsis/dahee.webp','f-04':'assets/glowsis/roy.webp'}.get(cid)
    if not anchor_src:
        raise SystemExit('unknown char (use f-01..f-04 for now)')
    anchor = os.path.join(ROOT, anchor_src)
    print("uploading anchor", anchor)
    url = upload(anchor, key)
    print("file_url:", url)
    prompt = ("The same girl celebrates happily: she throws both hands up and laughs, "
              "colorful confetti and sparkles burst around her, she does a small joyful jump, "
              "bright purple and pink concert stage lights shimmer behind her. "
              "Keep her face, black hair and outfit exactly identical. Portrait framing, "
              "lower body not visible. No text, no letters, no watermark, no logos.")
    print("submitting i2i...")
    job = submit(url, prompt, key)
    print("job:", job.get("request_id"), job.get("status"))
    res = poll(job, key)
    vurl = (res.get("video") or {}).get("url")
    print("video url:", vurl)
    dst = os.path.join(OUT, f'{cid}.mp4')
    urllib.request.urlretrieve(vurl, dst)
    print("saved", dst, os.path.getsize(dst)//1024, "KB")

if __name__ == '__main__':
    main()
