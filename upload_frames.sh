#!/usr/bin/env bash
# Upload shot images to FAL storage, print file_url per image.
set -u
KEY="$(cat /tmp/fal_key.txt)"
upload() {
  local name="$1" path="$2"
  local init
  init="$(curl -s -X POST "https://rest.alpha.fal.ai/storage/upload/initiate" -H "Authorization: Key $KEY" -H "Content-Type: application/json" -d "{\"content_type\":\"image/png\",\"file_name\":\"$name.png\"}")"
  local furl uurl
  furl="$(echo "$init" | python -c "import sys,json;print(json.load(sys.stdin)['file_url'])")"
  uurl="$(echo "$init" | python -c "import sys,json;print(json.load(sys.stdin)['upload_url'])")"
  curl -s -X PUT "$uurl" -H "Content-Type: image/png" --data-binary @"$path"
  echo "$name=$furl"
}
upload shot2 "tammy-scripts/unit3-frames/shot2_geu_you.png"
upload shot3 "tammy-scripts/unit3-frames/shot3_jeo_far.png"
upload shot4 "tammy-scripts/unit3-frames/shot4_overview.png"
