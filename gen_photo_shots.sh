#!/usr/bin/env bash
# Generate shot2/4 (photo, no-text frames) with Seedance 2.0 mini.
set -u
cd "$(dirname "$0")"
KEY="$(cat /tmp/fal_key.txt)"
EP="bytedance/seedance-2.0/mini/image-to-video"
POLLPATH="bytedance/seedance-2.0"

gen() {
  local outname="$1" img="$2" prompt="$3"
  echo ">>> $outname submit"
  local resp rid
  resp="$(curl -s -X POST "https://queue.fal.run/$EP" -H "Authorization: Key $KEY" -H "Content-Type: application/json" -d "{\"image_url\":\"$img\",\"prompt\":\"$prompt\",\"duration\":8,\"aspect_ratio\":\"16:9\",\"resolution\":\"720p\"}")"
  rid="$(echo "$resp" | python -c "import sys,json;print(json.load(sys.stdin).get('request_id',''))" 2>/dev/null)"
  if [ -z "$rid" ]; then echo "!! $outname submit fail: $(echo "$resp"|head -c 300)"; return 1; fi
  echo ">> $outname rid=$rid"
  local surl="https://queue.fal.run/$POLLPATH/requests/$rid/status" rurl="https://queue.fal.run/$POLLPATH/requests/$rid"
  for i in $(seq 1 80); do
    local st
    st="$(curl -s "$surl" -H "Authorization: Key $KEY" | python -c "import sys,json;print(json.load(sys.stdin).get('status','?'))" 2>/dev/null)"
    if [ "$st" = "COMPLETED" ]; then
      local vu
      vu="$(curl -s "$rurl" -H "Authorization: Key $KEY" | python -c "import sys,json;print(json.load(sys.stdin)['video']['url'])" 2>/dev/null)"
      curl -s -o "tammy-videos/samples/unit3_${outname}.mp4" "$vu"
      echo "OK $outname -> $(stat -c%s tammy-videos/samples/unit3_${outname}.mp4) bytes"
      return 0
    fi
    if [ "$st" = "ERROR" ]; then echo "!! $outname ERROR"; return 1; fi
    sleep 10
  done
  echo "!! $outname timeout"
}

KEEP="Keep the objects exactly as shown: the photocard shows only its printed photo, the CD album covers show only their photos or plain color, no text, no letters, no logos, no gibberish appearing on any surface, no subtitles."

PROMPT2="Two Korean idol girls in a K-pop merch booth, gentle natural motion. Left Aran (long straight black hair, bangs, light blue denim jacket over white tank) behind a counter cheerfully points toward the right. Right at medium distance Chaea (shoulder-length brown wavy hair, beige cap, white crop top, olive cargo shorts) holds up a photocard showing a printed photo of a smiling girl and smiles. Aran teaches that the card near the listener is 'that'. Smooth subtle gestures, warm booth lighting, cinematic anime. $KEEP"
PROMPT4="Wide K-pop merch booth scene teaching distance, three clear depth layers, gentle natural motion. Near: a glowing plain light stick on a counter foreground. Middle: Chaea (shoulder-length brown wavy hair, beige cap, white crop top, olive cargo shorts) holding up one photocard with a printed photo. Far: a back shelf of CD albums whose covers show only photos of girls, no text. Foreground left Aran (long straight black hair, bangs, light blue denim jacket over white tank) sweeps an open hand from the near light stick toward the far shelf. Cinematic anime, warm booth lighting. $KEEP"

gen "shot2_그_photo" "https://v3b.fal.media/files/b/0aa95433/JKKryTaRW2aSGTJraXv97_shot2.png" "$PROMPT2"
gen "shot4_종합_photo" "https://v3b.fal.media/files/b/0aa95434/qWhvgO9i-BppWTKDG4RyG_shot4.png" "$PROMPT4"
echo "ALL DONE"
