# Robot & Flower

An original 15-second Canvas animation inspired by the existing Kurzgesagt
sample's geometric vector shapes, dark space palette, crescent lighting,
layered scenery, warm accents, and eased motion. No original style files were
changed. All artwork is drawn procedurally; no stock imagery, fonts, or audio.

## Story

- 0–3s: small teal robot walks across a barren violet planet; gentle tracking.
- 3–6s: robot stops beside a pink flower and tilts its head.
- 6–10s: continuous camera push-in; robot bends and extends articulated fingers.
- 10–13s: flower glows, light particles rise, eyes widen then smile.
- 13–15s: robot settles into a seated pose as the camera pulls back.

Motion is a deterministic function of time. Limbs use two-link inverse
kinematics, with alternating steps, foot lift, body bob, a pivoted torso and
head, and a separately eased hand path. Camera moves use quintic easing.
Background mountains and stars have different pan factors for parallax.

## Build in the prepared Linux environment

From `/workspace/animasyon-stil-katalogu`:

```sh
bash projects/robot-flower/build.sh
```

Requires Node.js, system Chromium at `/usr/bin/chromium`, Playwright installed
under `/workspace/cloud-setup/animation`, Python with NumPy, and FFmpeg with
libx264/AAC. The renderer temporarily serves the input directory on loopback,
uses one headless browser page, and closes the server after rendering. No
long-running service is needed. Intermediate frames and audio are stored in a
unique temporary directory and removed on exit.

`anim.html` exposes `window.ready` and `window.draw({t})`, like the style
catalog. `render.mjs` renders 450 sequential JPEG frames at 30 FPS. `music.py`
synthesizes an original stereo instrumental score at 48 kHz, with soft pads,
plucked tones, and bells timed to the flower's light. `build.sh` encodes H.264
(yuv420p, CRF 18) plus AAC and prints ffprobe verification.

Output: `output/robot-flower-15s.mp4`, 1920×1080, 30 FPS, exactly 15 seconds.
The build replaces only this project's output video.
