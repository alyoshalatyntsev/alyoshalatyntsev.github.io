"""A small, fast-loading background tile for a web page, repeating exactly across and down.

    python code/webtile.py [--seed 121]   ->  web/shimashima-<seed>*.webp / .avif, web/test-page.html to look at it tiled

The tile is a new layout (1344 x 2016 scan pixels) shown 600 px wide, the width the website's present background
uses. It is shrunk with its own far edges wrapped round it, so the shrinking does not break the repeat.
"""
import json
import sys

import numpy as np
from PIL import Image

import grow
from draw import HERE, SITE, render

seed = int(sys.argv[sys.argv.index("--seed") + 1]) if "--seed" in sys.argv else 121
W, H, WIDE = 1344, 2016, 600
OUT = HERE / "web"
OUT.mkdir(exist_ok=True)
layout = grow.grow(seed, W, H)
(OUT / f"layout-{seed}.json").write_text(json.dumps(layout))
scan = render(layout, seed)


def shrink(pic, wide):
    pad = W // 6
    big = np.pad(pic, ((pad, pad), (pad, pad), (0, 0)), mode="wrap")
    k = wide / W
    out = np.asarray(Image.fromarray(big).resize((round(big.shape[1] * k), round(big.shape[0] * k)), Image.LANCZOS))
    p = round(pad * k)
    return out[p:p + round(H * k), p:p + wide]


for tag, pic in (("", scan), ("-site", np.clip(np.concatenate([scan.astype(np.float32), np.ones((H, W, 1), np.float32)], 2) @ SITE, 0, 255).astype(np.uint8))):
    name = f"shimashima-{seed}{tag}"
    one, two = Image.fromarray(shrink(pic, WIDE)), Image.fromarray(shrink(pic, 2 * WIDE))
    one.save(OUT / f"{name}.webp", quality=50, method=6)
    one.save(OUT / f"{name}.avif", quality=45, speed=3)
    two.save(OUT / f"{name}@2x.avif", quality=35, speed=3)
    mean = "#%02X%02X%02X" % tuple(int(round(v)) for v in np.asarray(one).reshape(-1, 3).mean(0, dtype=np.float64))
    for f in (f"{name}.webp", f"{name}.avif", f"{name}@2x.avif"):
        print(f"{f:32s} {Image.open(OUT / f).size}  {(OUT / f).stat().st_size / 1024:6.1f} KB")
    css = (f"body {{\n    background: {mean} url('{name}.webp') repeat;   /* {mean} shows at once, while the picture loads */\n"
           f"    background-image: image-set(url('{name}.avif') type('image/avif') 1x, url('{name}@2x.avif') type('image/avif') 2x, url('{name}.webp') type('image/webp') 1x);\n"
           f"    background-size: {WIDE}px;\n}}")
    page = (f"<!doctype html><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><title>{name}</title>\n<style>\n"
            f"html {{ margin: 0 }}\nbody {{ margin: 0; font-family: Arial, sans-serif }}\n{css}\n"
            "header { padding: 2em 4em; background-color: rgba(255, 255, 255, 0.9) }\nmain { margin: 2em 5%; min-height: 220vh }\n"
            "section { background: white; padding: 1.5em; max-width: 46em }\npre { white-space: pre-wrap }\n</style>\n"
            f"<header><h1>{name}</h1>The tile repeats every {WIDE} px across and {one.height} px down. Scroll to look for a seam.</header>\n"
            f"<main><section>To use it, copy the image files beside the page and put this in its style:<pre>{css}</pre></section></main>\n")
    (OUT / f"test-page{tag}.html").write_text(page)  # not called index: this folder sits inside a website and should have no index page
    print(css, "\n")
