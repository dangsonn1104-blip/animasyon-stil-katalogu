"""Validate the completed MP4 and extract review frames; no model dependencies."""
from pathlib import Path
import subprocess,json,hashlib,sys,math
import numpy as np
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parent
VIDEO=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else ROOT.parent.parent/'output/globalization.mp4'
REVIEW=Path(sys.argv[2]) if len(sys.argv)>2 else Path('/workspace/cloud-setup/globalization-review')
REVIEW.mkdir(parents=True,exist_ok=True)
a=json.loads((ROOT/'alignment.json').read_text())
cmd=['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(VIDEO)]
probe=json.loads(subprocess.check_output(cmd))
v=next(s for s in probe['streams'] if s['codec_type']=='video')
sound=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['width'],v['height'],v['avg_frame_rate'],v['pix_fmt'])==('h264',1920,1080,'30/1','yuv420p')
assert int(v['nb_read_frames'])==a['frames']
assert float(v['duration'])>=a['duration'] and float(v['duration'])-a['duration']<1/30+.002
assert sound['codec_name']=='aac' and float(sound['duration'])>=a['duration']-.003
assert hashlib.sha256((ROOT/'narration.mp3').read_bytes()).hexdigest()==a['audio_sha256']
def pcm(file):
 raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(file),'-map','0:a:0','-f','s16le','-ac','1','-ar','44100','-'])
 return np.frombuffer(raw,dtype='<i2').astype(np.float64)
original=pcm(ROOT/'narration.mp3');encoded=pcm(VIDEO);n=min(len(original),len(encoded));corr=float(np.corrcoef(original[:n],encoded[:n])[0,1]);assert corr>.98,f'Unexpected narration waveform mismatch: {corr}'
# Capture key story beats, plus a frame immediately before and after every
# sentence boundary. Save frames outside source paths to avoid committing caches.
beats=[1,5,9,16,24,34,45,57,64,70,79,86,92,101]
indices={round(t*30) for t in beats}
for s in a['sentences'][1:]:
 frame=round(s['start']*30)
 indices.update([max(0,frame-1),min(a['frames']-1,frame+1)])
indices=sorted(indices)
select='+'.join(f'eq(n,{i})' for i in indices)
subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i',str(VIDEO),'-vf',f"select='{select}',scale=960:540",'-fps_mode','vfr',str(REVIEW/'frame-%03d.jpg')],check=True)
lookup={n:REVIEW/f'frame-{j+1:03d}.jpg' for j,n in enumerate(indices)}
sheet=Image.new('RGB',(1440,5*294),'#09112d');painter=ImageDraw.Draw(sheet)
for j,t in enumerate(beats):
 im=Image.open(lookup[round(t*30)]);im.thumbnail((480,270));x=j%3*480;y=j//3*294;sheet.paste(im,(x,y));painter.text((x+10,y+275),f'{t:5.1f}s',fill='white')
sheet.save(REVIEW/'contact-sheet.jpg')
# Adjacent-frame change at each sentence boundary helps flag a camera/scene
# jump; visual review is still needed and is not replaced by this number.
changes=[]
for s in a['sentences'][1:]:
 f=round(s['start']*30);lo=max(0,f-1);hi=min(a['frames']-1,f+1)
 x=np.asarray(Image.open(lookup[lo]).resize((240,135)),dtype=float)
 y=np.asarray(Image.open(lookup[hi]).resize((240,135)),dtype=float)
 changes.append({'sentence':s['id']+1,'time':s['start'],'mean_absolute_pixel_change':round(float(np.mean(np.abs(x-y))),4)})
result={'status':'passed','timing':'estimated_sentence','width':v['width'],'height':v['height'],'fps':v['avg_frame_rate'],'frames':int(v['nb_read_frames']),'video_duration':float(v['duration']),'container_duration':float(probe['format']['duration']),'original_audio_duration':a['duration'],'encoded_audio_duration':float(sound['duration']),'narration_waveform_correlation':corr,'size_bytes':int(probe['format']['size']),'sha256':hashlib.sha256(VIDEO.read_bytes()).hexdigest(),'review_frames':len(indices),'boundary_frame_changes':changes}
(ROOT/'validation.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:v for k,v in result.items() if k!='boundary_frame_changes'},indent=2))
print('Review images:',REVIEW)
