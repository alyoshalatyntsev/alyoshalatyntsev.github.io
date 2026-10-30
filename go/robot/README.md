The robot players of the Go page.

- `human-net.bin.gz`: KataGo's human SL network `b18c384nbt-humanv0` (from the KataGo v1.15.0 release, github.com/lightvector/KataGo), with its weights stored as half floats by `src/halve.py` (49.6 MB instead of 99 MB; move probabilities agree with the original to within 0.0002).
- `robot.js`: a Web Worker that runs that network with TensorFlow.js (Apache 2.0) and returns move probabilities and ownership for a position. Built by `src/build.mjs` from `src/robotWorker.ts` and the engine code of Web KaTrain (MIT, github.com/Sir-Teo/web-katrain, commit a6a67d6), which `robotWorker.ts` imports from `../engine/katago/` in a checkout of that repo.

KataGo and its networks are by David J. Wu (lightvector) and contributors.
