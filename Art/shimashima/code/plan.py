"""Draw a layout as a plan: white paper, red lines for the stems, a dot where a branch joins, an outline for each bud.

    python code/plan.py layout-grown-1.json [out.png]   ->  plan-grown-1.png
"""
import json
import pathlib
import sys

import numpy as np
from PIL import Image, ImageDraw

from draw import bud_outline, centre_x, load_shapes

HERE = pathlib.Path(__file__).parent.parent
RED = (200, 30, 30)


def plan(layout):
    W, H = layout["tile"]["width"], layout["tile"]["height"]
    by_id = {s["id"]: s for s in layout["stems"]}
    shifts = [(dx, dy) for dx in ((0, -W, W) if layout["tile"].get("wrap_x", True) else (0,)) for dy in ((0, -H, H) if layout["tile"].get("wrap_y", False) else (0,))]
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im)
    for s in layout["stems"]:
        y = np.arange(s["y_top"], s.get("join_y", s["y_bottom"]) + 1, 3.0)
        x = centre_x(s, by_id, y)
        for dx, dy in shifts:
            d.line([(a + dx, b + dy) for a, b in zip(x, y)], fill=RED, width=7, joint="curve")
            if "parent" in s:  # where it leaves its parent
                d.ellipse((x[-1] + dx - 15, y[-1] + dy - 15, x[-1] + dx + 15, y[-1] + dy + 15), fill=RED)
            for end, (ex, ey) in ((s["top"], (x[0], y[0])), (s["bottom"], (x[-1], y[-1]))):
                if end == "tip":  # a free end
                    d.line((ex + dx - 16, ey + dy, ex + dx + 16, ey + dy), fill=RED, width=5)
    shapes = load_shapes()
    for b in layout["buds"]:
        outline = bud_outline(b, by_id, shapes)
        for dx, dy in shifts:
            pts = [(p + dx, q + dy) for p, q in outline]
            d.polygon(pts, fill=(255, 236, 236))
            d.line(pts + pts[:1], fill=RED, width=5)
    return im


if __name__ == "__main__":
    src = pathlib.Path(sys.argv[1])
    out = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else HERE / (src.stem.replace("layout-", "plan-") + ".png")
    plan(json.loads(src.read_text())).save(out)
    print("wrote", out)
