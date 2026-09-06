#!/usr/bin/env bash
# Merge 4 no-text shots with English narration into one video.
set -u
cd "$(dirname "$0")"
FF="/c/Users/USER/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0-full_build/bin/ffmpeg.exe"
S="tammy-videos/samples"
mkdir -p "$S/merged"

# Normalize each shot to 1920x1080? No, they are 720p landscape. Keep 1280x720 @24fps.
# Each clip: video 8.0s (shot4 extend to 8.6s to fit n4=8.13s), audio = narration mp3 padded, then 0.3s silence + fade.
# We'll produce per-clip mp4 with narration mixed over a low-volume room tone is overkill; just narration + silence.

make_clip() {
  local out="$1" video="$2" narr="$3" dur="$4"
  # audio track: narr (as-is) then pad to full dur with silence
  "$FF" -y -v error \
    -i "$video" -i "$narr" \
    -filter_complex "[1:a]apad=whole_dur=${dur}[aud]" \
    -map 0:v -map "[aud]" \
    -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -ar 44100 \
    -t "$dur" -r 24 -video_track_timescale 24000 "$out"
}

# shot durations (sec)
d1=8.0; d2=8.0; d3=8.0; d4=8.6

make_clip "$S/merged/c1.mp4" "$S/unit3_shot1_이_seedance2mini.mp4" "$S/narration/n1.mp3" "$d1"
make_clip "$S/merged/c2.mp4" "$S/unit3_shot2_그_seedance_notext.mp4" "$S/narration/n2.mp3" "$d2"
make_clip "$S/merged/c3.mp4" "$S/unit3_shot3_저_seedance_notext.mp4" "$S/narration/n3.mp3" "$d3"
make_clip "$S/merged/c4.mp4" "$S/unit3_shot4_종합_seedance_notext.mp4" "$S/narration/n4.mp3" "$d4"

# concat
printf "file '%s/merged/c1.mp4'\nfile '%s/merged/c2.mp4'\nfile '%s/merged/c3.mp4'\nfile '%s/merged/c4.mp4'\n" "$S" "$S" "$S" "$S" > "$S/merged/list.txt"
"$FF" -y -v error -f concat -safe 0 -i "$S/merged/list.txt" -c copy "$S/unit3_A2_이그저_merged.mp4"
echo "=== result ==="
ls -la "$S/unit3_A2_이그저_merged.mp4"
