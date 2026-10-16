"""Original score, physical-model plucks, additive felt piano, bowed-string ensemble.
No samples, downloaded assets, voice or model. All cue locations are integer frames.
"""
from pathlib import Path
import json
import numpy as np
from scipy import signal
from scipy.io import wavfile
ROOT=Path(__file__).resolve().parent
TL=json.loads((ROOT/'timeline.json').read_text()); SR=TL['sample_rate']; FPS=TL['fps']; N=TL['frames']*SR//FPS
rng=np.random.default_rng(91)
music=np.zeros((N,2)); effects=np.zeros_like(music); notes=[]
def sec(cue): return TL['cues'][cue]/FPS
def hz(m): return 440*2**((m-69)/12)
def envelope(t,d,a,r): return np.minimum(t/a,1)*np.minimum(np.maximum(d-t,0)/r,1)
def synth(m,d,kind):
 t=np.arange(round(d*SR))/SR; f=hz(m)
 if kind=='piano':
  y=sum((1/k**1.6)*np.sin(2*np.pi*f*k*(1+0.00008*k*k)*t)*np.exp(-t*(.65+k*.28)) for k in range(1,9))
  y+=.06*rng.normal(size=len(t))*np.exp(-45*t)
  y*=envelope(t,d,.009,min(.7,d/3))
 elif kind=='bell':
  y=sum(a*np.sin(2*np.pi*f*k*t)*np.exp(-t*b) for k,a,b in [(1,1,1),(2.76,.34,1.8),(5.4,.12,3.2)])
  y*=envelope(t,d,.006,.7)
 elif kind=='pizz':
  # A filtered noise burst in a tuned feedback delay (Karplus-Strong).
  delay=max(2,round(SR/f)); burst=rng.uniform(-1,1,delay); burst-=burst.mean()
  excitation=np.zeros(len(t)); excitation[:min(delay,len(t))]=burst[:len(t)]
  den=np.zeros(delay+2); den[0]=1; den[delay]=-.493; den[delay+1]=-.493
  y=signal.lfilter([1],den,excitation); y=signal.lfilter([.4,.6],[1],y)
  y*=envelope(t,d,.003,min(.2,d/2)); y*=1.7
 else:
  y=np.zeros(len(t))
  for cents,ph in [(-6,.4),(0,1.8),(5,3.1)]:
   phase=2*np.pi*f*2**(cents/1200)*(t+.00055*np.sin(2*np.pi*4.8*t)/4.8)
   for k in range(1,9): y+=np.sin(k*phase+ph)/(k**1.4*3)
  y*=envelope(t,d,min(.6,d/4),min(1.2,d/3)); y*=.65
 return y

def add(frame,m,d,kind,amp=.12,pan=0):
 start=round(frame)*SR//FPS; y=synth(m,d,kind)*amp; end=min(N,start+len(y))
 if start>=N:return
 gains=np.sqrt([(1-pan)/2,(1+pan)/2]); music[start:end]+=y[:end-start,None]*gains
 notes.append(dict(frame=round(frame),midi=m,duration=d,instrument=kind))
# Five-note theme D-A-C-E-D; minor becomes luminous D dorian / F major.
# Act I: sparse 6/8, two spacious statements, harmony Dm9 -> Bbmaj7.
for b,chord in [(0,[38,53,57,60,64]),(180,[34,53,57,62,65])]:
 for j,m in enumerate(chord):add(b+j*8,m,5.8,'piano',.16 if j==0 else .105,(-.6+j*.27))
for start in [24,198]:
 for dt,m in zip([0,30,66,108,141],[74,81,84,88,86]):add(start+dt,m,2.4,'piano',.12,.12)
for f,m in [(100,93),(265,88),(310,86)]:add(f,m,3,'bell',.045,.65)
# Act II: pulse tightens, theme fragmented; tension moves Dm -> Gm -> Asus.
for idx,start in enumerate(range(360,810,75)):
 chord=[[50,57,62,65],[43,55,58,62],[45,57,62,64]][idx//2]
 step=15 if idx<3 else 12
 for j,fr in enumerate(range(start,min(start+75,810),step)):
  add(fr,chord[j%4],.65,'pizz',.19,(-.5 if j%2 else .5))
for start in [372,510,660]:
 for dt,m in zip([0,24,48,66,93],[74,81,84,88,86]):add(start+dt,m,1.3,'piano',.12)
add(750,57,2,'strings',.13,-.3);add(768,64,1.4,'strings',.10,.3)
# Act III: long phrases / 3-second bars, recurring theme with widened register.
for i,chord in enumerate([[38,57,60,65],[41,57,60,67],[43,58,62,69],[48,55,62,67],[46,57,62,65],[45,57,61,64]]):
 start=810+i*90
 for j,m in enumerate(chord):add(start,m,4.1,'strings',.12 if j==0 else .075,-.7+j*.35)
 for j in range(6):add(start+j*15,chord[1+j%(len(chord)-1)]+12,1.4,'piano',.055,(-.4+j*.14))
for start,trans in [(810,0),(990,5),(1170,12)]:
 for dt,m in zip([0,30,66,105,144],[74,81,84,88,86]):add(start+dt,m+trans,2.1,'strings',.14,.05)
for f,m in [(900,93),(1080,96),(1200,98),(1280,100)]:add(f,m,3.5,'bell',.04,.6)
# Act IV: gentle culmination, then slow final motif and a single ringing D.
for start,chord in [(1350,[38,57,62,66,69]),(1470,[43,58,62,65,69]),(1590,[38,57,62,66,69])]:
 for j,m in enumerate(chord):add(start+j*3,m,5.4 if start<1590 else 6.8,'strings',.09,-.7+j*.35)
for f,m in zip([1350,1395,1440,1500,1560,1620],[74,81,84,88,86,86]):add(f,m,4.8,'piano',.13,.05)
add(1710,98,3,'bell',.095,.15)
# Low, band-limited wind and paper friction, constructed from noise.
noise=rng.normal(size=N)
wind=signal.sosfilt(signal.butter(2,[170,1200],fs=SR,btype='bandpass',output='sos'),noise)
T=np.arange(N)/SR
wind_env=np.clip((T-10)/6,0,1)*np.clip((29-T)/5,0,1)*(.75+.25*np.sin(T*.7))
effects[:,0]+=wind*.018*wind_env;effects[:,1]+=np.roll(wind,391)*.018*wind_env
for f in [300,360,450,570,660,750,810,1080,1350,1470,1515,1560,1620]:
 start=f*SR//FPS; dur=.48 if f<1350 else .32; n=int(dur*SR);tt=np.arange(n)/SR
 friction=signal.sosfilt(signal.butter(2,[1300,5700],fs=SR,btype='bandpass',output='sos'),rng.normal(size=n))
 env=np.sin(np.pi*tt/dur)**2*np.exp(-tt*5); y=friction*env*.018
 effects[start:start+n]+=y[:,None]*[.8,.65]
# Stereo room: multi-tap early reflections plus diffused late reflections.
wet=np.zeros_like(music)
for delay,gain in [(.073,.12),(.127,.10),(.211,.09),(.347,.07),(.521,.06),(.733,.045),(.991,.03), (1.313,.02)]:
 k=int(delay*SR);wet[k:]+=music[:-k,::-1]*gain
music+=wet
# End envelope preserves a full final ringing note, reaches zero at exact sample end.
end=np.clip((60-T)/.65,0,1); music*=end[:,None];effects*=end[:,None]
# Normalize the score and mix with shared gain; conservative peak and no limiter clipping.
peak=np.max(np.abs(music+effects));gain=.82/peak
score=music*gain;mix=(music+effects)*gain
for name,data in [('score.wav',score),('soundtrack.wav',mix)]:wavfile.write(ROOT/name,SR,(np.clip(data,-1,1)*32767).astype(np.int16))
report={'sample_rate':SR,'samples':N,'duration':N/SR,'peak_dbfs':float(20*np.log10(np.max(np.abs(mix)))),'rms_dbfs':float(20*np.log10(np.sqrt(np.mean(mix**2)))),'notes':notes,'source':'All instruments and effects synthesized by music.py; no sampled recordings.'}
(ROOT/'music-events.json').write_text(json.dumps(report,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='notes'},indent=2))
