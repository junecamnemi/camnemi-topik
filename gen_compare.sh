#!/usr/bin/env bash
# Generate shot1 (이/near) with multiple cheap FAL video models for comparison.
set -u
cd "$(dirname "$0")"
KEY="$(cat /tmp/fal_key.txt)"
IMG="https://v3b.fal.media/files/b/0aa94c26/0i113QGeDnhUac65PNxs9_8lvAWklG.png"
PROMPT="The Korean idol girl Aran with long straight black hair and bangs, in a light blue denim jacket over a white tank top, stands behind a white counter in a K-pop merch booth. She points her index finger down at a single glowing light stick on the counter close beside her, then lifts her head to the camera and smiles warmly as she gently teaches the Korean word for this object near her. Smooth natural motion, subtle head turn and hand gesture. Cinematic anime style, warm booth lighting. No on-screen text, no subtitles."

gen() {
  local name="$1" ep="$2" payload="$3"
  echo ">>> $name submit"
  local resp rid
  resp="$(curl -s -X POST "https://queue.fal.run/$ep" -H "Authorization: Key $KEY" -H "Content-Type: application/json" -d "$payload")"
  rid="$(echo "$resp" | python -c "import sys,json;print(json.load(sys.stdin).get('request_id',''))" 2>/dev/null)"
  if [ -z "$rid" ]; then echo "!! $name submit failed: $(echo "$resp"|head -c 300)"; return 1; fi
  echo ">> $name request_id=$rid"
  # poll
  local surl="https://queue.fal.run/$ep/requests/$rid/status" rurl="https://queue.fal.run/$ep/requests/$rid"
  for i in $(seq 1 60); do
    local st
    st="$(curl -s "$surl" -H "Authorization: Key $KEY" | python -c "import sys,json;print(json.load(sys.stdin).get('status','?'))" 2>/dev/null)"
    if [ "$st" = "COMPLETED" ]; then
      local vu
      vu="$(curl -s "$rurl" -H "Authorization: Key $KEY" | python -c "import sys,json;print(json.load(sys.stdin)['video']['url'])" 2>/dev/null)"
      curl -s -o "tammy-videos/samples/unit3_shot1_이_${name}.mp4" "$vu"
      echo "OK $name -> tammy-videos/samples/unit3_shot1_이_${name}.mp4 ($(stat -c%s tammy-videos/samples/unit3_shot1_이_${name}.mp4) bytes)"
      return 0
    fi
    if [ "$st" = "ERROR" ]; then echo "!! $name ERROR"; return 1; fi
    sleep 8
  done
  echo "!! $name timeout"
}

# 3 models in parallel
gen "seedance2mini" "bytedance/seedance-2.0/mini/image-to-video" "{\"image_url\":\"$IMG\",\"prompt\":\"$PROMPT\",\"duration\":8,\"resolution\":\"720p\"}" &
gen "pixverse6" "fal-ai/pixverse/v6/image-to-video" "{\"image_url\":\"$IMG\",\"prompt\":\"$PROMPT\",\"duration\":8,\"ratio\":\"16:9\",\"resolution\":\"720p\"}" &
gen "ltx23" "fal-ai/ltx-2.3-22b/image-to-video" "{\"image_url\":\"$IMG\",\"prompt\":\"$PROMPT\",\"duration\":8,\"resolution\":\"720p\"}" &
wait
echo "ALL DONE"
