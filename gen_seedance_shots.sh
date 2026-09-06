#!/usr/bin/env bash
# Generate Unit3 shots 2/3/4 with Seedance 2.0 mini (image-to-video).
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
  for i in $(seq 1 70); do
    local st
    st="$(curl -s "$surl" -H "Authorization: Key $KEY" | python -c "import sys,json;print(json.load(sys.stdin).get('status','?'))" 2>/dev/null)"
    if [ "$st" = "COMPLETED" ]; then
      local vu
      vu="$(curl -s "$rurl" -H "Authorization: Key $KEY" | python -c "import sys,json;print(json.load(sys.stdin)['video']['url'])" 2>/dev/null)"
      curl -s -o "tammy-videos/samples/unit3_${outname}.mp4" "$vu"
      echo "OK $outname -> tammy-videos/samples/unit3_${outname}.mp4 ($(stat -c%s tammy-videos/samples/unit3_${outname}.mp4) bytes)"
      return 0
    fi
    if [ "$st" = "ERROR" ]; then echo "!! $outname ERROR: $(curl -s "$rurl" -H "Authorization: Key $KEY" | head -c 400)"; return 1; fi
    sleep 10
  done
  echo "!! $outname timeout"
}

PROMPT2="Two Korean idol girls in a K-pop merch booth. On the left Aran (long straight black hair, bangs, light blue denim jacket over white tank top) behind a counter cheerfully points toward the right. On the right at medium distance stands Chaea (shoulder-length brown wavy hair, beige cap, white crop top, olive cargo shorts) who holds up a single photocard near herself and smiles. Aran teaches that the photocard near the listener is 'that'. Smooth natural motion, subtle gestures, warm booth lighting, cinematic anime style. No on-screen text, no subtitles."
PROMPT3="A Korean idol girl Aran (long straight black hair with bangs, light blue denim jacket over white tank top) stands in the foreground of a K-pop merchandise store, reaches out her arm and points toward a distant back shelf holding albums and photocards, clearly far away from her. She smiles encouragingly as she teaches the word for an object far away. Gentle camera push toward the shelf. Strong depth, warm store lighting, cinematic anime style. No on-screen text, no subtitles."
PROMPT4="A wide K-pop merch booth scene teaching Korean distance words with three clear depth layers. Near: a glowing light stick on a counter in the foreground. Middle: Chaea (shoulder-length brown wavy hair, beige cap, white crop top, olive cargo shorts) standing a short way off holding up one photocard. Far: behind her a tall back shelf of albums. Foreground left: Aran (long straight black hair, bangs, light blue denim jacket over white tank top) sweeps an open hand from the near light stick toward the far shelf to show the distance order. Cinematic anime, warm booth lighting. No on-screen text, no subtitles."

# shot2 already submitted earlier (rid 01a075ee...), run 3&4
gen "shot3_저_seedance" "https://v3b.fal.media/files/b/0aa9510e/bD-X_zxDtoO7ixJMfolhl_shot3.png" "$PROMPT3"
gen "shot4_종합_seedance" "https://v3b.fal.media/files/b/0aa9510e/9hMa_OCQGPc-dcClgoE-s_shot4.png" "$PROMPT4"
echo "ALL DONE"
