"""Grow a few different arrangements and set each plan beside its print.

    python code/samples.py   ->  sample-<name>.json, sample-<name>-plan-and-print.jpg, samples-sheet.jpg
"""
import json

import numpy as np
from PIL import Image, ImageDraw

import grow
import plan
from draw import render, HERE

W, H = 1344, 2016
KINDS = [("as-the-print", dict(seed=11), "As the print: a third of the feet fork, one twig"),
         ("many-forks", dict(seed=12, forks=0.85, hooks=0), "Many forks, no twigs"),
         ("many-twigs", dict(seed=13, forks=0.1, hooks=7, bud_share=0.7), "Few forks, seven twigs, fewer buds"),
         ("bare-and-budded", dict(seed=14, forks=0.0, hooks=0, bud_share=2.2), "No forks at all, twice the buds")]
pairs = []
for name, kw, title in KINDS:
    seed = kw.pop("seed")
    layout = grow.grow(seed, W, H, **kw)
    while name == "as-the-print" and sum("parent" in s for s in layout["stems"]) < 3:  # a tile this size should show a fork or two
        seed += 10
        layout = grow.grow(seed, W, H, **kw)
    (HERE / f"sample-{name}.json").write_text(json.dumps(layout, indent=1))
    p = np.asarray(plan.plan(layout))
    r = render(layout, seed)
    pair = np.full((H + 90, 2 * W + 40, 3), 255, np.uint8)
    pair[90:, :W], pair[90:, W + 40:] = p, r
    im = Image.fromarray(pair)
    d = ImageDraw.Draw(im)
    d.text((10, 14), f"{title}   (branches: {sum('parent' in s for s in layout['stems'])}, buds: {len(layout['buds'])})", fill="black", font_size=54)
    d.rectangle((0, 90, W - 1, H + 89), outline=(170, 170, 170), width=3)
    im = im.resize((im.width // 2, im.height // 2), Image.LANCZOS)
    im.save(HERE / f"sample-{name}-plan-and-print.jpg", quality=90)
    pairs.append(im)
    print(name, "stems", len(layout["stems"]), "branches", sum("parent" in s for s in layout["stems"]), "buds", len(layout["buds"]))
sheet = Image.new("RGB", (pairs[0].width * 2 + 30, pairs[0].height * 2 + 30), "white")
for k, im in enumerate(pairs):
    sheet.paste(im, ((k % 2) * (im.width + 30), (k // 2) * (im.height + 30)))
sheet.save(HERE / "samples-sheet.jpg", quality=88)
