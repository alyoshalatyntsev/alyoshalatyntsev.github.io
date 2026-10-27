"""Shared pieces for the shimashima study: the source scan, the one repeating tile in it, and the masks.

Everything is in scan pixels of `shimashima6_100.jpg` (tagged 300 dpi, 11.81 px/mm), turned 180 degrees so it is
the way up the website shows it. The scan is one strip repeated across, so only one tile is ever measured.
"""
import os
import pathlib

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

HERE = pathlib.Path(__file__).parent.parent
SRC = pathlib.Path(os.environ.get("SHIMA_SRC", pathlib.Path.home() / "Library/CloudStorage/Dropbox/alyoshalatyntsev.github.io/Art/shimashima6_100.jpg"))
X0, PERIOD = 357, 1344  # the tile: columns X0 .. X0 + PERIOD, cut where no stem or bud touches
PX_PER_MM = 300 / 25.4


def load_full():
    return np.asarray(Image.open(SRC).convert("RGB").rotate(180)).astype(np.float32)


def load_tile():
    return load_full()[:, X0:X0 + PERIOD]


def drop_small(mask, smallest):
    lab, n = ndi.label(mask)
    size = ndi.sum(mask, lab, range(1, n + 1))
    return np.isin(lab, np.nonzero(size >= smallest)[0] + 1)


def disc(r):
    y, x = np.ogrid[-r:r + 1, -r:r + 1]
    return x * x + y * y <= r * r


def masks(a):
    """ink: everything that is not the dark blue ground (stems and buds). paper: the bare white of the buds."""
    s = ndi.gaussian_filter(a, (2, 2, 0))
    ink = ndi.binary_fill_holes(drop_small(s[..., 1] > 125, 400))
    paper = drop_small(ink & (s[..., 0] > 208), 60)
    return ink, paper


def save(arr, path, **kw):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(path, **kw)
