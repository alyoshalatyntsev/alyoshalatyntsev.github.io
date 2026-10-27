"""Put the scan and a drawing of the layout read from it side by side.

    python code/compare.py   ->  clips/20..24-scan-vs-drawn-*.  Run code/draw.py layout-original.json first.
"""
import numpy as np
from PIL import Image

import shima

a = shima.load_tile()
d = np.asarray(Image.open(shima.HERE / "drawn-original.jpg")).astype(np.float32)
H, W, _ = a.shape
both = np.full((H, 2 * W + 20, 3), 255, np.float32)
both[:, :W], both[:, W + 20:] = a, d
Image.fromarray(both.astype(np.uint8)).resize(((2 * W + 20) // 3, H // 3), Image.LANCZOS).save(shima.HERE / "clips" / "20-scan-vs-drawn-tile.jpg", quality=90)
for name, x, y, w, h, z in (("21-scan-vs-drawn-fork-and-bud", 800, 1500, 420, 420, 2), ("22-scan-vs-drawn-stem-and-ground", 230, 1750, 300, 300, 3),
                            ("23-scan-vs-drawn-hook", 60, 2300, 420, 380, 2), ("24-scan-vs-drawn-merging-branch", 860, 3250, 420, 420, 2)):
    p = np.full((h, 2 * w + 8, 3), 255, np.float32)
    p[:, :w], p[:, w + 8:] = a[y:y + h, x:x + w], d[y:y + h, x:x + w]
    Image.fromarray(p.astype(np.uint8)).resize((p.shape[1] * z, p.shape[0] * z), Image.NEAREST).save(shima.HERE / "clips" / f"{name}.png")
LUM = np.array([0.299, 0.587, 0.114], np.float32)
print("mean colour  scan", a.mean((0, 1), dtype=np.float64).astype(np.float32).round(1), " drawn", d.mean((0, 1), dtype=np.float64).astype(np.float32).round(1))
print("brightness sd  scan", round(float((a @ LUM).std()), 1), " drawn", round(float((d @ LUM).std()), 1))

# every bud, scan above and drawn below
import json
buds = json.loads((shima.HERE / "layout-original.json").read_text())["buds"]
stems = {s["id"]: s for s in json.loads((shima.HERE / "layout-original.json").read_text())["stems"]}
from draw import centre_x
cell = 170
sheet = np.full((2 * cell + 6, len(buds) * (cell + 4), 3), 255, np.float32)
for k, b in enumerate(buds):
    cx = int(float(centre_x(stems[b["stem"]], stems, b["y"])) + b["offset"])
    x0, y0 = np.clip(cx - cell // 2, 0, W - cell), np.clip(int(b["y"]) - cell // 2, 0, H - cell)
    sheet[:cell, k * (cell + 4):k * (cell + 4) + cell] = a[y0:y0 + cell, x0:x0 + cell]
    sheet[cell + 6:, k * (cell + 4):k * (cell + 4) + cell] = d[y0:y0 + cell, x0:x0 + cell]
half = (len(buds) + 1) // 2 * (cell + 4)
Image.fromarray(np.concatenate([sheet[:, :half], np.full((12, half, 3), 255, np.float32), np.pad(sheet[:, half:], ((0, 0), (0, 2 * half - sheet.shape[1]), (0, 0)), constant_values=255)], 0).astype(np.uint8)).save(shima.HERE / "clips" / "25-scan-vs-drawn-every-bud.png")
