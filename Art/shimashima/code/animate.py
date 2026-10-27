"""An animation: a new layout, periodic up the page, whose groups of stems each slide upward at their own slow speed.

    python code/animate.py [--seed 41] [--slower 10] [--seconds 60]   ->  animation/drift.html (open it in a browser), animation/preview.mp4

Stems joined by a fork move together; every other lane moves by itself. Each group is drawn once and lifted off
the ground as a see-through layer; the page then slides the layers. Because each layer repeats exactly after one
tile height, the motion never has a seam, whatever the speeds.
"""
import json
import pathlib
import subprocess
import sys

import numpy as np
from PIL import Image

import grow
from draw import HERE, render, spread_texture

opt = lambda name, default: type(default)(sys.argv[sys.argv.index(name) + 1]) if name in sys.argv else default
seed, slower, seconds = opt("--seed", 41), opt("--slower", 10.0), opt("--seconds", 60)
W, H = 2688, 2016  # scan pixels; shown at half that
OUT = HERE / "animation"
OUT.mkdir(exist_ok=True)
layout = grow.grow(seed, W, H, forks=0.3, hooks=4, apart=True)
(OUT / "layout.json").write_text(json.dumps(layout))
by_id = {s["id"]: s for s in layout["stems"]}
groups = sorted({s["group"] for s in layout["stems"]})
rng = np.random.default_rng(seed)
speeds = rng.permutation(np.linspace(7, 22, len(groups))) / slower  # px per second on the page, at half scan size

ground = np.clip(spread_texture("ground-tile.png", H, W, np.random.default_rng(seed)), 0, 255).astype(np.uint8)
Image.fromarray(ground).save(OUT / "ground.jpg", quality=92)
black, white = np.zeros((H, W, 3), np.float32), np.full((H, W, 3), 255, np.float32)
layers = []
for k, g in enumerate(groups):
    part = dict(layout, stems=[s for s in layout["stems"] if s["group"] == g], buds=[b for b in layout["buds"] if by_id[b["stem"]]["group"] == g])
    # Drawn once on black and once on white: what is the same in both is the motif itself, and the difference is
    # how much ground shows through (less than all of it in the halo round a bud).
    on_black = render(part, seed + k, ground=black).astype(np.float32)
    on_white = render(part, seed + k, ground=white).astype(np.float32)
    through = np.clip((on_white - on_black).mean(2) / 255, 0, 1)
    alpha = 1 - through
    rgb = np.where(alpha[..., None] > 0.004, on_black / np.maximum(alpha, 0.004)[..., None], 0)
    Image.fromarray(np.dstack([np.clip(rgb, 0, 255), alpha * 255]).astype(np.uint8), "RGBA").save(OUT / f"layer-{k:02d}.png", optimize=True)
    layers.append((on_black, through))
    print(f"group {k}: {len(part['stems'])} stems, {len(part['buds'])} buds, {speeds[k]:.2f} px/s, once round in {H / 2 / speeds[k] / 60:.1f} min")

page = ["<!doctype html><meta charset='utf-8'><title>Shimashima, drifting</title><style>",
        "html,body{margin:0;height:100%;overflow:hidden;background:#19406F}",
        f".g,.l{{position:fixed;left:0;top:0;width:100%;background-repeat:repeat;background-size:{W // 2}px {H // 2}px}}",
        ".g{height:100%;background-image:url(ground.jpg)}",
        f".l{{height:calc(100% + {H // 2}px);animation:up linear infinite;will-change:transform}}",
        f"@keyframes up{{from{{transform:translateY(0)}}to{{transform:translateY(-{H // 2}px)}}}}",
        "</style><div class='g'></div>"]
page += [f"<div class='l' style='background-image:url(layer-{k:02d}.png);animation-duration:{H / 2 / speeds[k]:.2f}s'></div>" for k in range(len(groups))]
(OUT / "drift.html").write_text("\n".join(page) + "\n")  # not called index: this folder sits inside a website and should have no index page

# a video of the same thing, half scan size: each layer is slid by a fraction of a pixel per frame without blur
half = lambda a: a.reshape(H // 2, 2, W // 2, 2, -1).mean((1, 3))
base = half(ground.astype(np.float32))
small = []
for on_black, through in layers:
    both = half(np.dstack([on_black, through]))
    cols = np.nonzero((both[..., 3] < 0.999).any(0))[0]
    small.append((cols, np.fft.rfft(both[:, cols], axis=0)))
fps, n = 30, H // 2
freq = np.arange(n // 2 + 1)[:, None, None]
ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W // 2}x{H // 2}", "-r", str(fps), "-i", "-",
                       "-c:v", "libx264", "-crf", "19", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUT / "preview.mp4")], stdin=subprocess.PIPE)
for f in range(fps * seconds):
    frame = base.copy()
    for (cols, spec), v in zip(small, speeds):
        moved = np.fft.irfft(spec * np.exp(2j * np.pi * freq * (v * f / fps) / n), n=n, axis=0)
        frame[:, cols] = frame[:, cols] * np.clip(moved[..., 3:], 0, 1) + np.clip(moved[..., :3], 0, None)
    ff.stdin.write(np.clip(frame, 0, 255).astype(np.uint8).tobytes())
ff.stdin.close()
ff.wait()
Image.fromarray(np.clip(frame, 0, 255).astype(np.uint8)).save(OUT / "last-frame.jpg", quality=90)
print("wrote", OUT / "drift.html", "and", OUT / "preview.mp4")
