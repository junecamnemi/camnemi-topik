#!/usr/bin/env bash
# Final merge: 4 shots with CHARACTER (coral K-pop idol) voice narration.
set -u
cd "$(dirname "$0")"
FF="/c/Users/USER/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0-full_build/bin/ffmpeg.exe"
S="tammy-videos/samples"
rm -rf "$S/merged2"; mkdir -p "$S/merged2"

make_clip() {
  local out="$1" video="$2" narr="$3" dur="$4"
  "$FF" -y -v error \
    -i "$video" -i "$narr" \
    -filter_complex "[1:a]apad=whole_dur=${dur}[aud]" \
    -map 0:v -map "[aud]" \
    -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -ar 44100 \
    -t "$dur" -r 24 -video_track_timescale 24000 "$out"
}

# durations: narration length + 0.4s lead + small tail pad (capped at 8s)
d1=8.0; d2=8.0; d3=8.0; d4=7.7

make_clip "$S/merged2/c1.mp4" "$S/unit3_shot1_이_seedance2mini.mp4" "$S/narration/c1.mp3" "$d1"
make_clip "$S/merged2/c2.mp4" "$S/unit3_shot2_그_photo.mp4" "$S/narration/c2.mp3" "$d2"
make_clip "$S/merged2/c3.mp4" "$S/unit3_shot3_저_seedance_notext.mp4" "$S/narration/c3.mp3" "$d3"
make_clip "$S/merged2/c4.mp4" "$S/unit3_shot4_종합_photo.mp4" "$S/narration/c4.mp3" "$d4"

cd "$S/merged2" && printf "file 'c1.mp4'\nfile 'c2.mp4'\nfile 'c3.mp4'\nfile 'c4.mp4'\n" > list.txt && cd /c/Users/USER/camnemi-topik
"$FF" -y -v error -f concat -safe 0 -i "$S/merged2/list.txt" -c copy "$S/unit3_A2_이그저_final.mp4"
echo "=== final ==="
ls -la "$S/unit3_A2_이그저_final.mp4"
ffprobe -v error -show_entries format=duration -of default=nw=1:nokey=1 "$S/unit3_A2_이그저_final.mp4"
