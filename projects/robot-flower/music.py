"""Original 15-second ambient score: warm pad, felt-like plucks, flower bells."""
import sys, wave
import numpy as np
SR=48000
DUR=15
out=np.zeros((SR*DUR,2),dtype=np.float64)
def note(start,duration,freq,amp,kind='pluck',pan=0):
    n=min(int(duration*SR),len(out)-int(start*SR))
    if n<=0:return
    t=np.arange(n)/SR
    if kind=='pad':
        env=np.minimum(t/.7,1)*np.minimum((duration-t)/1.1,1)
        sig=(np.sin(2*np.pi*freq*t)+.22*np.sin(2*np.pi*freq*2.002*t)+.1*np.sin(2*np.pi*freq*3*t))*env
    else:
        env=(1-np.exp(-t*180))*np.exp(-t/(1.0 if kind=='bell' else .48))
        sig=(np.sin(2*np.pi*freq*t)+.3*np.sin(2*np.pi*freq*2*t)*np.exp(-t*4)+.12*np.sin(2*np.pi*freq*3*t))*env
    sig*=amp
    i=int(start*SR)
    out[i:i+n,0]+=sig*np.sqrt((1-pan)/2)
    out[i:i+n,1]+=sig*np.sqrt((1+pan)/2)
def hz(midi):return 440*2**((midi-69)/12)
# D major -> B minor -> G major -> D(add9). No voice, noise, or stock audio.
for start,notes,d in [(0,[50,57,62,66],4.7),(3.8,[47,54,62,66],3.7),(6.7,[43,55,59,62],4.5),(10,[50,57,62,66,69],5)]:
    for j,m in enumerate(notes):note(start,d,hz(m),.042,'pad',(-1)**j*.3)
for start,m in [(1,74),(2.2,69),(3.5,78),(4.3,76),(5.2,74),(6.5,71),(7.5,74),(8.5,78),(9.35,81),(10.05,86),(10.5,81),(11,83),(11.6,78),(12.2,81),(13.2,78),(14,74)]:
    note(start,min(2.5,DUR-start),hz(m),.09 if start>=10 else .065,'bell' if start>=10 else 'pluck',np.sin(start)*.45)
# Gentle pulse follows the walking feet, then disappears at discovery.
for start in np.arange(.3,3.2,.54):note(float(start),.25,110,.023,'pluck',-.2)
for start,m in [(10,86),(10.25,90),(10.5,93),(10.8,98)]:note(start,2.4,hz(m),.03,'bell',.3)
t=np.arange(len(out))/SR
out*= (np.minimum(t/.9,1)*np.minimum((DUR-t)/1.4,1))[:,None]
out=np.tanh(out*1.4)
assert np.isfinite(out).all()
peak=np.max(np.abs(out))
with wave.open(sys.argv[1],'wb') as w:
    w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((out*32767).astype('<i2').tobytes())
print(f'Original music: {DUR}s stereo, peak {peak:.3f}')
