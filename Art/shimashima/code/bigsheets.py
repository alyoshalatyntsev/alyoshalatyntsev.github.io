"""Big sheets for judging by eye: the original beside a drawing, each over its red-and-white plan.

    python code/bigsheets.py   ->  big-1-original-vs-redrawn.jpg, big-2.., big-3.. (new layouts, one tile as large as
                                   the whole scan), big-4.. (a new layout at the print's own repeat), big-5-close-up.jpg
"""
import json

import numpy as np
from PIL import Image, ImageDraw

import grow
import plan
import shima
from draw import HERE, render

tile = shima.load_tile().astype(np.uint8)
H, W, _ = tile.shape
original = np.tile(tile, (1, 3, 1))
L0 = json.loads((HERE / "layout-original.json").read_text())
plan0 = np.tile(np.asarray(plan.plan(L0)), (1, 3, 1))


def sheet(name, title, mine, mine_plan, caption):
    k = 0.3
    small = lambda a: Image.fromarray(a).resize((int(a.shape[1] * k), int(a.shape[0] * k)), Image.LANCZOS)
    pw, ph, gap, top = int(3 * W * k), int(H * k), 24, 70
    im = Image.new("RGB", (2 * pw + gap, 2 * (ph + top) + gap), "white")
    d = ImageDraw.Draw(im)
    for col, (label, pic, pl) in enumerate((("The original (its one tile, three across)", original, plan0), (title, mine, mine_plan))):
        x = col * (pw + gap)
        d.text((x + 4, 12), label, fill="black", font_size=38)
        im.paste(small(pic), (x, top))
        d.text((x + 4, top + ph + gap + 12), ("Its plan, read off the scan" if col == 0 else caption), fill="black", font_size=38)
        im.paste(small(pl), (x, 2 * top + ph + gap))
        d.rectangle((x, 2 * top + ph + gap, x + pw - 1, 2 * top + 2 * ph + gap - 1), outline=(170, 170, 170), width=2)
    im.save(HERE / name, quality=90)
    print("wrote", name, im.size)


redrawn = np.asarray(Image.open(HERE / "drawn-original.jpg"))
sheet("big-1-original-vs-redrawn.jpg", "Redrawn from the original's own plan", np.tile(redrawn, (1, 3, 1)), plan0, "The same plan (it is what both are drawn from)")
keep = {}
for n, seed in ((2, 31), (3, 32)):
    layout = grow.grow(seed, 3 * W, H)
    (HERE / f"layout-big-{seed}.json").write_text(json.dumps(layout))
    pic = render(layout, seed)
    keep[seed] = pic
    Image.fromarray(pic).save(HERE / f"drawn-big-{seed}.jpg", quality=92)
    sheet(f"big-{n}-original-vs-new-layout-seed{seed}.jpg", f"A new layout, one tile as large as the whole sheet (seed {seed})", pic, np.asarray(plan.plan(layout)), "The plan it was drawn from")
layout = grow.grow(33, W, H)
pic = render(layout, 33)
sheet("big-4-original-vs-new-layout-same-repeat.jpg", "A new layout at the print's own repeat, three across (seed 33)", np.tile(pic, (1, 3, 1)), np.tile(np.asarray(plan.plan(layout)), (1, 3, 1)), "The plan it was drawn from")
# close up, at two thirds of scan size: original above, new below, three places
k, cw, ch = 2 / 3, 1500, 1050
rows = []
for src in (original, keep[31]):
    parts = [np.asarray(Image.fromarray(src[y:y + ch, x:x + cw]).resize((int(cw * k), int(ch * k)), Image.LANCZOS)) for x, y in ((150, 300), (1500, 1700), (2500, 3000))]
    rows.append(np.concatenate([np.pad(p, ((0, 0), (0, 16), (0, 0)), constant_values=255) for p in parts], 1))
close = np.concatenate([rows[0], np.full((16, rows[0].shape[1], 3), 255, np.uint8), rows[1]], 0)
Image.fromarray(close).save(HERE / "big-5-close-up-original-above-new-below.jpg", quality=92)
print("wrote big-5-close-up-original-above-new-below.jpg", close.shape)
