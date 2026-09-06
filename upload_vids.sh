#!/usr/bin/env bash
# Upload the 4 shot videos to FAL storage.
set -u
KEY="$(cat /tmp/fal_key.txt)"
S="tammy-videos/samples"
upload() {
  local name="$1" path="$2"
  local init
  init="$(curl -s -X POST "https://rest.alpha.fal.ai/storage/upload/initiate" -H "Authorization: Key $KEY" -H "Content-Type: application/json" -d "{\"content_type\":\"video/mp4\",\"file_name\":\"$name.mp4\"}")"
  local furl uurl
  furl="$(echo "$init" | python -c "import sys,json;print(json.load(sys.stdin)['file_url'])")"
  uurl="$(echo "$init" | python -c "import sys,json;print(json.load(sys.stdin)['upload_url'])")"
  curl -s -X PUT "$uurl" -H "Content-Type: video/mp4" --data-binary @"$path"
  echo "$name=$furl"
}
upload vid1 "$S/unit3_shot1_이_seedance2mini.mp4"
upload vid2 "$S/unit3_shot2_그_photo.mp4"
upload vid3 "$S/unit3_shot3_저_seedance_notext.mp4"
upload vid4 "$S/unit3_shot4_종합_photo.mp4"
