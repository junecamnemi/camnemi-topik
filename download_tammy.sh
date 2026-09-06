#!/usr/bin/env bash
# Download all Tammy Korean lesson videos at 720p (mp4).
# Input: .ref/download_list.tsv  "<outpath>\t<ytid>\t<title>"
# Skips already-downloaded. Parallel via xargs -P.
set -u
cd "$(dirname "$0")"
mkdir -p "tammy-videos/elementary" "tammy-videos/intermediate"

download_one() {
  local out yt title
  IFS=$'\t' read -r out yt title <<<"$1"
  if [ -f "$out" ]; then
    echo "SKIP(exists): $out"
    return 0
  fi
  echo ">>> $title"
  yt-dlp \
    --newline \
    --no-overwrites \
    --download-archive "tammy-videos/.archive" \
    -f "bv*[height<=720]+ba/b[height<=720]/b" \
    --merge-output-format mp4 \
    -o "$out" \
    "https://www.youtube.com/watch?v=$yt" \
    >> "tammy-videos/.download.log" 2>&1
  local rc=$?
  if [ $rc -eq 0 ] && [ -f "$out" ]; then
    echo "OK: $out"
  else
    echo "FAIL(rc=$rc): $title"
  fi
  return $rc
}
export -f download_one

# parallel over newline-delimited lines (no NUL)
cut -f1-3 .ref/download_list.tsv | xargs -P 4 -d '\n' -I{} bash -c 'download_one "$@"' _ '{}'
echo "ALL DONE"
