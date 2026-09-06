#!/usr/bin/env bash
# Download the no-text frames then upload to FAL, then generate with Seedance mini.
set -u
cd "$(dirname "$0")"
KEY="$(cat /tmp/fal_key.txt)"
mkdir -p .ref/notext
curl -s -o .ref/notext/shot2.png "https://v3b.fal.media/files/b/0aa951c1/t4O6S13OaLaSsSJP8xzTU_G60r1MqY.png"
curl -s -o .ref/notext/shot3.png "https://v3b.fal.media/files/b/0aa951cc/SlNmznkBEzyYGJ40bzfBY_FXlx2EKC.png"
curl -s -o .ref/notext/shot4.png "https://v3b.fal.media/files/b/0aa951ce/aFKUexTV73QKEQqWU5Vp9_N5txIQ7X.png"
echo "downloaded: $(ls -la .ref/notext/ | grep png | wc -l) frames"

# upload each
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
upload shot2 .ref/notext/shot2.png
upload shot3 .ref/notext/shot3.png
upload shot4 .ref/notext/shot4.png
