#!/usr/bin/env bash
# Run Sync Lipsync on each shot (ASCII-named copies) with ElevenLabs narration.
set -u
cd "$(dirname "$0")"
KEY="$(cat /tmp/fal_key.txt)"
FF="/c/Users/USER/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0-full_build/bin/ffmpeg.exe"
S="tammy-videos/samples"
mkdir -p "$S/lipsync_in"
LIPSYNC_EP="fal-ai/sync-lipsync"

# narration URLs (already uploaded)
declare -A NARRURL=( [1]="https://v3b.fal.media/files/b/0aa9549d/afSCRn88IpTfz82yZxK8O_narr1.mp3" [2]="https://v3b.fal.media/files/b/0aa9549d/1ZUCuQSd3oMsFBpBID_K9_narr2.mp3" [3]="https://v3b.fal.media/files/b/0aa9549e/xfrMish9g7k3J-8T8Dbtb_narr3.mp3" [4]="https://v3b.fal.media/files/b/0aa9549e/Umg0JXRXI16vW50G4mKFX_narr4.mp3" )
# narration durations (sec)
declare -A DUR=( [1]=2.92 [2]=3.70 [3]=3.63 [4]=6.19 )

lipsync() {
  local n="$1"
  local dur="${DUR[$n]}"
  local tl
  tl="$(python -c "print(round($dur+0.4,2) if ($dur+0.4)<8 else 8.0)")"
  local vin="$S/lipsync_in/s$n.mp4"
  "$FF" -y -v error -i ".ref/ascii/s$n.mp4" -t "$tl" -an -c:v libx264 -preset fast -crf 19 -pix_fmt yuv420p -r 24 -video_track_timescale 24000 "$vin"
  if [ ! -s "$vin" ]; then echo "!! s$n trim failed"; return 1; fi
  echo ">> s$n trimmed to ${tl}s ($(stat -c%s "$vin") bytes)"
  # upload trimmed video
  local init furl uurl
  init="$(curl -s -X POST "https://rest.alpha.fal.ai/storage/upload/initiate" -H "Authorization: Key $KEY" -H "Content-Type: application/json" -d "{\"content_type\":\"video/mp4\",\"file_name\":\"s${n}ok.mp4\"}")"
  furl="$(echo "$init" | python -c "import sys,json;print(json.load(sys.stdin)['file_url'])")"
  uurl="$(echo "$init" | python -c "import sys,json;print(json.load(sys.stdin)['upload_url'])")"
  curl -s -X PUT "$uurl" -H "Content-Type: video/mp4" --data-binary @"$vin"
  echo ">> s$n uploaded: $furl"
  # submit lipsync
  local resp rid
  resp="$(curl -s -X POST "https://queue.fal.run/$LIPSYNC_EP" -H "Authorization: Key $KEY" -H "Content-Type: application/json" -d "{\"video_url\":\"$furl\",\"audio_url\":\"${NARRURL[$n]}\",\"model\":\"lipsync-1.9.0-beta\",\"sync_mode\":\"remap\"}")"
  rid="$(echo "$resp" | python -c "import sys,json;print(json.load(sys.stdin).get('request_id',''))" 2>/dev/null)"
  if [ -z "$rid" ]; then echo "!! s$n submit fail: $(echo "$resp"|head -c 300)"; return 1; fi
  echo ">> s$n rid=$rid"
  echo "$rid" > ".ref/lipsync_s${n}_rid2.txt"
  local surl="https://queue.fal.run/$LIPSYNC_EP/requests/$rid/status" rurl="https://queue.fal.run/$LIPSYNC_EP/requests/$rid"
  for i in $(seq 1 60); do
    local st
    st="$(curl -s "$surl" -H "Authorization: Key $KEY" | python -c "import sys,json;print(json.load(sys.stdin).get('status','?'))" 2>/dev/null)"
    if [ "$st" = "COMPLETED" ]; then
      local vu
      vu="$(curl -s "$rurl" -H "Authorization: Key $KEY" | python -c "import sys,json;print(json.load(sys.stdin)['video']['url'])" 2>/dev/null)"
      curl -s -o "$S/unit3_shot${n}_lipsync.mp4" "$vu"
      echo "OK s$n -> $(stat -c%s $S/unit3_shot${n}_lipsync.mp4) bytes"
      return 0
    fi
    if [ "$st" = "ERROR" ]; then echo "!! s$n ERROR: $(curl -s "$rurl" -H "Authorization: Key $KEY" | head -c 300)"; return 1; fi
    sleep 10
  done
  echo "!! s$n timeout"
}

#lipsync 1
lipsync 2
lipsync 3
lipsync 4
echo "ALL DONE"
