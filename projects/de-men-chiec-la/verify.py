"""Validate delivery and extract actual encoded frames, not source previews."""
from pathlib import Path
import subprocess,json,hashlib
import numpy as np
from scipy.io import wavfile
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parent;REPO=ROOT.parent.parent
VIDEO=REPO/'output/de-men-chiec-la-60s.mp4'
CHECK=REPO/'output/de-men-chiec-la-contact-sheet.jpg'
FRAMES=Path('/workspace/cloud-setup/de-men-final-frames');FRAMES.mkdir(parents=True,exist_ok=True)
TL=json.loads((ROOT/'timeline.json').read_text())
def run(args):return subprocess.check_output(args)
def probe(p):return json.loads(run(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(p)]))
p=probe(VIDEO);v=next(x for x in p['streams'] if x['codec_type']=='video');a=next(x for x in p['streams'] if x['codec_type']=='audio')
assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_read_frames']))==(1920,1080,'30/1',1800)
assert v['codec_name']=='h264' and a['codec_name']=='aac' and v['pix_fmt']=='yuv420p'
assert abs(float(v['duration'])-60)<.00001 and abs(float(p['format']['duration'])-60)<.001
assert abs(float(a['duration'])-60)<.001
wav_reports={}
for name in ['score.wav','soundtrack.wav']:
 sr,y=wavfile.read(ROOT/name);assert sr==48000 and y.shape==(2880000,2)
 wav_reports[name]={'samples':len(y),'channels':2,'duration':len(y)/sr,'peak_dbfs':float(20*np.log10(np.max(np.abs(y.astype(float)))/32768))}
 assert np.max(np.abs(y.astype(float)))<32767
# Full decode, numerical continuity and absence of empty/black frames.
raw=run(['ffmpeg','-v','error','-i',str(VIDEO),'-map','0:v','-vf','scale=96:54','-f','rawvideo','-pix_fmt','rgb24','pipe:1'])
f=np.frombuffer(raw,np.uint8).reshape((-1,54,96,3));assert len(f)==1800
change=np.abs(np.diff(f.astype(float),axis=0)).mean(axis=(1,2,3));brightness=f.mean(axis=(1,2,3))
assert brightness.min()>15
assert change.max()<5, f"Unexpected frame discontinuity: {change.max()} at {change.argmax()+1}"
# The film contains held emotional beats; this reports rather than mistakes them for errors.
transition={str(fr):float(change[fr-1]) for fr in TL['cues'].values() if 0<fr<1800}
# Audio survives AAC encoding, no voice replacement or shifted mix.
y=run(['ffmpeg','-v','error','-i',str(VIDEO),'-map','0:a','-f','f32le','-acodec','pcm_f32le','-ar','48000','-ac','2','pipe:1'])
y=np.frombuffer(y,np.float32).reshape(-1,2)
_,src=wavfile.read(ROOT/'soundtrack.wav');n=min(len(y),len(src));corr=float(np.corrcoef(y[:n].ravel(),src[:n].ravel())[0,1]);assert corr>.98
frames=[0,180,270,360,480,600,780,840,930,1080,1200,1350,1440,1530,1620,1710,1799]
# Include frames either side of emotional cues for seam review.
for fr in sorted(set(frames+[q+d for q in [360,720,810,1350,1470,1710] for d in [-1,0,1]])):
 run(['ffmpeg','-v','error','-y','-ss',str(fr/30),'-i',str(VIDEO),'-frames:v','1','-vf','scale=960:540',str(FRAMES/f'{fr:04d}.jpg')])
contact=Image.new('RGB',(1600,((len(frames)+3)//4)*249),'#17242d');d=ImageDraw.Draw(contact)
for i,fr in enumerate(frames):
 im=Image.open(FRAMES/f'{fr:04d}.jpg');im=im.resize((400,225),Image.Resampling.LANCZOS);x=i%4*400;y=i//4*249;contact.paste(im,(x,y));d.text((x+12,y+229),f'{fr/30:.2f}s / frame {fr}',fill='#eadcc1')
contact.save(CHECK,quality=94)
report={'status':'passed','title':TL['title'],'video':{'width':1920,'height':1080,'fps':30,'frames':1800,'duration':60,'video_codec':'h264','audio_codec':'aac','audio_duration':float(a['duration']),'size_bytes':VIDEO.stat().st_size,'sha256':hashlib.sha256(VIDEO.read_bytes()).hexdigest()},'wav':wav_reports,'decoded_narration':False,'aac_mix_correlation':corr,'continuity':{'adjacent_frame_mean_difference':float(change.mean()),'max_adjacent_difference':float(change.max()),'max_difference_frame':int(change.argmax()+1),'cue_adjacent_differences':transition,'minimum_brightness':float(brightness.min())},'review_frames':len(list(FRAMES.glob('*.jpg'))),'frame_location':str(FRAMES),'contact_sheet':str(CHECK.relative_to(REPO))}
(ROOT/'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False,indent=2))
