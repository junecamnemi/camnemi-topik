#!/usr/bin/env bash
# Convert AV1 mp4 -> H.264+AAC. 3 parallel via background + wait. Overwrites originals.
set -u
cd "$(dirname "$0")"
FF="/c/Users/USER/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0-full_build/bin/ffmpeg.exe"

conv() {
  local f="$1"
  local tmp="${f%.mp4}.h264tmp.mp4"
  echo ">>> $f"
  "$FF" -y -hide_banner -loglevel error -i "$f" \
    -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart \
    "$tmp"
  local rc=$?
  if [ $rc -eq 0 ] && [ -f "$tmp" ]; then
    mv -f "$tmp" "$f"
    echo "OK: $f"
  else
    echo "FAIL(rc=$rc): $f"
    rm -f "$tmp"
  fi
}

# run with up to 3 concurrent background jobs
count=0
pids=()
while IFS= read -r f; do
  [ -n "$f" ] || continue
  conv "$f" &
  pids+=($!)
  count=$((count+1))
  if [ "$count" -ge 3 ]; then
    for p in "${pids[@]}"; do wait "$p"; done
    count=0; pids=()
  fi
done < /tmp/av1_list.txt
for p in "${pids[@]}"; do wait "$p"; done
echo "ALL DONE"
