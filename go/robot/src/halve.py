# Rewrites a KataGo .bin.gz net with half-float weights: each "@BIN@" + float32 block
# becomes "@B16@" + float16 block (read back by robotWorker.ts). Usage: halve.py in.bin.gz out.bin.gz
import gzip, json, subprocess, sys, os
import numpy as np
src, dst = sys.argv[1], sys.argv[2]
raw = gzip.open(src, 'rb').read()
open('model.bin', 'wb').write(raw)
subprocess.run(['node', 'dist/sections.cjs', 'model.bin', 'sections.json'], check=True)
secs = json.load(open('sections.json'))
out, pos, worst = [], 0, 0.0
for at, count in secs:
    assert raw[at:at + 5] == b'@BIN@', at
    f32 = np.frombuffer(raw, dtype='<f4', count=count, offset=at + 5)
    f16 = f32.astype('<f2')
    worst = max(worst, float(np.max(np.abs(f16.astype('<f4') - f32))) if count else 0.0)
    assert np.all(np.isfinite(f16)), 'overflow in a block at %d' % at
    out += [raw[pos:at], b'@B16@', f16.tobytes()]
    pos = at + 5 + 4 * count
out.append(raw[pos:])
with gzip.open(dst, 'wb', compresslevel=9) as f: f.write(b''.join(out))
os.remove('model.bin')
print('blocks', len(secs), 'largest absolute rounding error', worst, 'size', os.path.getsize(src), '->', os.path.getsize(dst))
