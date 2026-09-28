#!/usr/bin/env python3
"""Make an authentic 3-second forward + 3-second reverse silent MP4 preview.

Usage: python3 scripts/media-boomerang.py SOURCE_FILE ASSET_ID [--start SECONDS]
Requires ffmpeg/ffprobe. Only processes a supplied local source file; never
attempts to bypass a video's access restrictions. Output is H.264/yuv420p,
24fps, 960px wide, fast-start, with a matching still in assets/images.
"""
import argparse
import json
from pathlib import Path
import subprocess
import tempfile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', type=Path)
parser.add_argument('asset_id')
parser.add_argument('--start', type=float, default=0)
args = parser.parse_args()
if not args.asset_id or any(c not in 'abcdefghijklmnopqrstuvwxyz0123456789-' for c in args.asset_id):
    parser.error('asset_id must contain only lowercase letters, digits and hyphens')
if args.start < 0:
    parser.error('--start must not be negative')
root = Path(__file__).resolve().parents[1]
output = root / 'assets/media' / f'{args.asset_id}.mp4'
poster = root / 'assets/images' / f'{args.asset_id}-preview.webp'
output.parent.mkdir(parents=True, exist_ok=True)
poster.parent.mkdir(parents=True, exist_ok=True)
source_info = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries',
    'format=duration','-of','json',str(args.source)]))
if float(source_info['format']['duration']) < args.start + 3:
    parser.error('source must contain a full three seconds from the chosen offset')
filters = ('[0:v]trim=duration=3,setpts=PTS-STARTPTS,fps=24,scale=960:-2,setsar=1,'
           'split=2[f][r];[r]reverse,setpts=PTS-STARTPTS[back];'
           '[f][back]concat=n=2:v=1:a=0,format=yuv420p[v]')
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-ss',str(args.start),
    '-i',str(args.source),'-filter_complex',filters,'-map','[v]','-an','-c:v','libx264',
    '-crf','24','-preset','slow','-movflags','+faststart',str(output)],check=True)
with tempfile.TemporaryDirectory(prefix='portfolio-poster-') as temp:
    frame = Path(temp) / 'first-frame.png'
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(output),
        '-frames:v','1',str(frame)],check=True)
    subprocess.run(['cwebp','-quiet','-q','88',str(frame),'-o',str(poster)],check=True)
info = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries',
    'format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate,nb_frames',
    '-of','json',str(output)]))
assert abs(float(info['format']['duration']) - 6) < 0.05
assert len(info['streams']) == 1 and info['streams'][0]['codec_type'] == 'video'
assert info['streams'][0]['nb_frames'] == '144'
info.update(preview=str(output.relative_to(root)), poster=str(poster.relative_to(root)),
            source_file=args.source.name, source_offset=args.start,
            forward_seconds=3,reverse_seconds=3)
print(json.dumps(info,indent=2))
