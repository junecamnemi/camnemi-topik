#!/usr/bin/env bash
# Download the photo-without-text frames and upload to FAL, then generate shot2/4 with Seedance.
set -u
cd "$(dirname "$0")"
KEY="$(cat /tmp/fal_key.txt)"
mkdir -p .ref/photo
curl -s -o .ref/photo/shot2.png "https://v3b.fal.media/files/b/0aa95423/rRfFEVK3F6GjLj0fDyVh6_zvzRL9Tb.png"
curl -s -o .ref/photo/shot4.png "https://v3b.fal.media/files/b/0aa9542b/0K0Mmh3jKCbwhXAqbbJUR_RyylUqMu.png"
echo "downloaded"
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
upload shot2 .ref/photo/shot2.png
upload shot4 .ref/photo/shot4.png
