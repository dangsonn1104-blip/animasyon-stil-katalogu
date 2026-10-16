#!/usr/bin/env bash
set -euo pipefail
project_dir=$(cd -- "$(dirname -- "$0")" && pwd)
repo_dir=$(cd -- "$project_dir/../.." && pwd)
frames_dir=$(mktemp -d /tmp/robot-flower.XXXXXX)
trap 'rm -rf -- "$frames_dir"' EXIT
node "$project_dir/render.mjs" "$project_dir/anim.html" "$frames_dir" 15 30
python3 "$project_dir/music.py" "$frames_dir/music.wav"
mkdir -p "$repo_dir/output"
ffmpeg -nostdin -v error -y -framerate 30 -i "$frames_dir/%05d.jpg" -i "$frames_dir/music.wav" -map 0:v:0 -map 1:a:0 -vf 'scale=in_range=full:out_range=tv,format=yuv420p' -c:v libx264 -threads 2 -crf 18 -r 30 -c:a aac -b:a 192k -ar 48000 -t 15 -movflags +faststart "$repo_dir/output/robot-flower-15s.mp4"
ffprobe -v error -count_frames -show_entries stream=codec_name,width,height,r_frame_rate,nb_read_frames:format=duration,size -of json "$repo_dir/output/robot-flower-15s.mp4"
