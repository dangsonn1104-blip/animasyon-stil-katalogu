"""Estimate sentence timing from the original waveform; no AI model or word alignment."""
from pathlib import Path
import subprocess,json,re,math,hashlib
ROOT=Path(__file__).resolve().parent
source=ROOT/'narration.mp3'
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(source)]))
raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(source),'-f','s16le','-ac','1','-ar','44100','-'])
duration=len(raw)/2/44100
run=subprocess.run(['ffmpeg','-hide_banner','-nostdin','-i',str(source),'-af','silencedetect=noise=-32dB:d=0.30','-f','null','-'],capture_output=True,text=True,check=True)
starts=[float(v) for v in re.findall(r'silence_start: ([0-9.]+)',run.stderr)]
ends=[float(v) for v in re.findall(r'silence_end: ([0-9.]+)',run.stderr)]
pauses=list(zip(starts,ends))
lines=[s.strip() for s in (ROOT/'transcript.txt').read_text().splitlines() if s.strip()]
weights=[len(re.findall(r'\S+',s)) for s in lines]
# Candidate sentence boundaries sit in measured silence. Compare the speaking
# rate of complete sentence spans, not a fabricated per-word timing track.
def speech(a,b):return b-a-sum(max(0,min(b,y)-max(a,x)) for x,y in pauses)
rate=sum(weights)/speech(0,duration)
bounds=[0]+[(a+b)/2 for a,b in pauses]+[duration]
N=len(bounds);K=len(lines);cost={(0,0):0};back={}
for k in range(1,K+1):
 for j in range(k,N):
  if k==K and j!=N-1:continue
  if k<K and j==N-1:continue
  for i in range(k-1,j):
   if (k-1,i) not in cost:continue
   dt=speech(bounds[i],bounds[j]);expected=weights[k-1]/rate
   if dt<.35:continue
   mismatch=math.log(dt/expected)
   penalty=14*mismatch*mismatch
   if j<N-1:
    gap=pauses[j-1][1]-pauses[j-1][0]
    penalty-=.9*math.log(gap/.30)
   value=cost[k-1,i]+penalty
   if value<cost.get((k,j),float('inf')):cost[k,j]=value;back[k,j]=i
j=N-1;chosen=[]
for k in range(K,0,-1):
 i=back[k,j];chosen.append((i,j));j=i
chosen.reverse()
sentences=[]
for k,(i,j) in enumerate(chosen):
 a=0 if i==0 else pauses[i-1][1]
 b=duration if j==N-1 else pauses[j-1][0]
 sentences.append({'id':k,'text':lines[k],'start':round(a,6),'end':round(b,6),'timing':'estimated_sentence','word_count':weights[k]})
report={'status':'estimated','method':'Measured FFmpeg silences (-32dB, >=0.30s) + transcript-length / speaking-rate dynamic programming; no forced alignment or word timestamps','duration':duration,'ffprobe_duration':float(probe['format']['duration']),'fps':30,'frames':math.ceil(duration*30),'audio_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'silences':[{'start':a,'end':b} for a,b in pauses],'sentences':sentences,'limitations':'Sentence timing is approximate and user-approved for the first cut. Silence boundaries do not establish word-level recognition.'}
(ROOT/'alignment.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
for s in sentences:print(f"{s['id']+1:2} {s['start']:7.2f}–{s['end']:7.2f} ({s['word_count']:2} units): {s['text']}")
