"""Draw a layout (stems, forks, buds) as a print, with the parts cut from the scan.

    python code/draw.py layout-original.json [out.jpg] [--seed 3] [--site-colours]

The layout says where things go; this file only decides how they look. Stems are not invented: real stretches of
stem from the scan (textures/ribbons) are laid along each new centre line, so their bends, bulges, ragged edges and
uneven ink are the print's own. Buds take the outline of a real bud (textures/bud-shapes.json).
"""
import json
import pathlib
import sys

import numpy as np

HERE = pathlib.Path(__file__).parent.parent
BUD_SOFT = 1.7  # blur (sigma) that, with the halo, gives the 2.2 px step measured at a bud's edge
HALO, HALO_REACH = 0.27, 6.0  # the ground is darker close to a bud: by this share at its edge, fading over this many px
COLLAR, COLLAR_REACH = 0.9, 5.0  # a stem carries a little more blue just where it meets a bud
INK_SHIFT = np.array([-144.0, -95.0, -58.0], np.float32)  # what one more unit of blue ink does to a stem's colour
CROTCH = 24  # radius of the web that fills the inside of a fork
EDGE_GRAIN = 0.15  # how far the paper's grain frays an edge
PAD = 14  # rows of clear ground a head or foot ribbon carries beyond the stem's end
SITE = np.array([[1.763, -0.040, 0.013], [-0.834, 1.058, -0.014], [0.090, 0.020, 0.993], [2.858, -7.218, 3.113]])  # scan colours -> website colours


def branch_x(y, parent_x, reach, join_y, radius, angle):
    """Centre line of a branch. It leaves the parent at join_y, runs straight at `angle` degrees from the parent's
    direction, then turns upright on a circular arc of the given radius, ending `reach` to the side (signed)."""
    th = np.radians(angle)
    r = min(radius, abs(reach) / (1 - np.cos(th)))  # a turn too wide for the reach is drawn as wide as fits
    straight = (abs(reach) - r * (1 - np.cos(th))) / np.sin(th)
    arc_top = join_y - straight * np.cos(th) - r * np.sin(th)
    s = np.clip(np.asarray(y, float) - arc_top, 0, None)
    on_arc = r - np.sqrt(np.clip(r * r - np.minimum(s, r * np.sin(th)) ** 2, 0, None))
    past = np.clip(s - r * np.sin(th), 0, None) * np.tan(th)
    return parent_x + np.sign(reach) * np.clip(abs(reach) - on_arc - past, 0, None)


def branch_upright_from(reach, join_y, radius, angle):
    """The height at which a branch has finished turning."""
    th = np.radians(angle)
    r = min(radius, abs(reach) / (1 - np.cos(th)))
    return join_y - (abs(reach) - r * (1 - np.cos(th))) / np.tan(th) - r * np.sin(th)


def centre_x(stem, by_id, y):
    """Where a stem's centre line is at height y."""
    y = np.asarray(y, float)
    if stem.get("parent") is None:
        x = stem["x"] + stem.get("lean", 0) / 1000 * (y - (stem["y_top"] + stem["y_bottom"]) / 2)
    else:
        parent_x = float(centre_x(by_id[stem["parent"]], by_id, stem["join_y"]))
        x = branch_x(y, parent_x, stem["reach"] * (-1 if stem["side"] == "left" else 1), stem["join_y"], stem["radius"], stem["angle"])
    if stem.get("course"):  # its slow bends, as [y, sideways shift, width]
        c = np.asarray(stem["course"], float)
        x = x + np.interp(y, c[:, 0], c[:, 1])
    return x


def width_at(stem, y):
    """How wide a stem is at height y: along its course if it has one, else a straight taper from head to foot."""
    y = np.asarray(y, float)
    if stem.get("course"):
        c = np.asarray(stem["course"], float)
        return np.interp(y, c[:, 0], c[:, 2])
    t = np.clip((y - stem["y_top"]) / max(stem.get("join_y", stem["y_bottom"]) - stem["y_top"], 1), 0, 1)
    return stem.get("width_top", stem["width"]) * (1 - t) + stem["width"] * t


def bud_outline(bud, by_id, shapes=None, n=288):
    """The outline of a bud: its oval, pushed in and out as a real bud's outline is."""
    cx = float(centre_x(by_id[bud["stem"]], by_id, bud["y"])) + bud["offset"]
    t = np.linspace(0, 2 * np.pi, n, endpoint=False)
    rho = 1.0
    if shapes and bud.get("shape") is not None:
        o = np.asarray(shapes[bud["shape"] % len(shapes)]["outline"])
        at = (np.arange(len(o) + 2) - 0.5) / len(o) * 2 * np.pi  # the values sit at the middle of each step
        rho = np.interp(t, at, np.concatenate([o[-1:], o, o[:1]]))
    u = bud["width"] / 2 * np.cos(t) * rho * (1 if bud["side"] == "right" else -1)  # the outlines are kept facing away from the stem
    v = bud["length"] / 2 * np.sin(t) * rho
    th = np.radians(bud["tilt"])
    return np.column_stack([cx + u * np.cos(th) - v * np.sin(th), bud["y"] + u * np.sin(th) + v * np.cos(th)])


def load_shapes():
    f = HERE / "textures" / "bud-shapes.json"
    return json.loads(f.read_text())["shapes"] if f.exists() else None


def load_ribbons():
    from PIL import Image
    pool = {"body": [], "head": [], "foot": []}
    for r in json.loads((HERE / "textures" / "ribbons" / "index.json").read_text()):
        img = np.asarray(Image.open(HERE / "textures" / "ribbons" / r["file"]).convert("RGBA")).astype(np.float32)
        inside = ndi_blur(ink_of(img), img[..., 3] >= 250)  # how heavily the blue lies on it, row by row
        pool[r["kind"]].append((img, np.asarray(r["widths"], np.float32), inside))  # with its own slow width, row by row
    return pool


def ink_of(rgb):
    """Blue ink on a pixel: 0 on paper and clean green, 1 on the ground."""
    return np.clip((rgb[..., 2] - rgb[..., 0] + 3) / 89, 0, 1.3)


def ndi_blur(ink, solid):
    """The mean ink across each row of a ribbon, well inside its edges, smoothed along it."""
    from scipy import ndimage as ndi
    core = ndi.binary_erosion(solid, np.ones((1, 7), bool))
    rows = np.where(core.sum(1) > 2, (ink * core).sum(1) / np.maximum(core.sum(1), 1), np.nan)
    known = np.nonzero(~np.isnan(rows))[0]
    rows = np.interp(np.arange(len(rows)), known, rows[known]) if len(known) else np.full(len(rows), 0.45)
    return ndi.gaussian_filter1d(rows, 25, mode="nearest").astype(np.float32)


def choose(pool, width, rng):
    """A ribbon of about the wanted width, so that it need not be stretched much."""
    w = np.array([float(np.median(p[1])) for p in pool])
    weight = np.exp(-np.abs(w - width) / 4)
    img, wd, ink = pool[int(rng.choice(len(pool), p=weight / weight.sum()))]
    return (img[:, ::-1] if rng.random() < 0.5 else img), wd, ink  # as often mirrored as not


def stem_ribbon(length, width, head, foot, pool, rng, ink_wanted=None, lap=24):
    """One long ribbon for a stem: a real head, real body stretches cross-faded end to end, a real foot.
    Returns it with, row by row, the width of the real stem it came from. Where the layout says how heavily
    inked the stem is (ink_wanted, row by row), stretches of about that inking are preferred and then toned to it."""
    strip = np.zeros((length, 64, 4), np.float32)
    real, inked = np.zeros(length, np.float32), np.zeros(length, np.float32)
    filled = 0

    def lay(piece, wd, ink, at):
        nonlocal filled
        at = max(at, 0)
        piece, wd, ink = piece[:length - at], wd[:length - at], ink[:length - at]
        n = len(piece)
        if n <= 0:
            return
        fade = np.clip((np.arange(n) + 1) / lap, 0, 1) if at < filled and at > 0 else np.ones(n)
        fade = np.where(np.arange(at, at + n) < filled, fade, 1)[:, None, None]
        strip[at:at + n] = strip[at:at + n] * (1 - fade) + piece * fade
        real[at:at + n] = real[at:at + n] * (1 - fade[:, 0, 0]) + wd * fade[:, 0, 0]
        inked[at:at + n] = inked[at:at + n] * (1 - fade[:, 0, 0]) + ink * fade[:, 0, 0]
        filled = max(filled, at + n)

    if head:
        lay(*choose(pool["head"], width, rng), 0)
    stop = length - (150 if foot else 0)
    while filled < stop:
        tries = []
        for _ in range(10 if ink_wanted is not None else 1):
            img, wd, ink = choose(pool["body"], width, rng)
            take = int(rng.integers(250, 900))
            start = int(rng.integers(0, max(len(img) - take, 1)))
            at = max(filled - lap, 0)
            miss = abs(float(ink[start:start + take].mean()) - float(ink_wanted[at:at + take].mean())) if ink_wanted is not None else 0
            tries.append((miss, len(tries), img[start:start + take], wd[start:start + take], ink[start:start + take], at))
        _, _, img, wd, ink, at = min(tries)
        lay(img, wd, ink, at)
    if foot:
        lay(*choose(pool["foot"], width, rng), length - len(pool["foot"][0][0]))
    if ink_wanted is not None:  # what difference is left is made up by deepening or lightening the mottle
        gain = np.clip(ink_wanted / np.maximum(inked, 0.05), 0.55, 1.8)[:, None, None]
        mottle = np.clip(ink_of(strip[..., :3]) - 0.03, 0, None)[..., None]
        strip[..., :3] = np.clip(strip[..., :3] + mottle * (gain - 1) * INK_SHIFT, 0, 255)
    return strip, real


def lay_stem(stem, by_id, pool, rng):
    """A stem as a patch of picture: colour and solidity, and where the patch's corner goes."""
    top, bottom = stem["y_top"], stem.get("join_y", stem["y_bottom"])
    past = {"edge": 40, "tip": PAD, "merge": PAD, "join": 0}  # how far to draw beyond each end; a join stops on its parent's line
    y = np.arange(top - past[stem["top"]], bottom + past[stem["bottom"]] + 1.0)
    x = centre_x(stem, by_id, y)
    along = np.concatenate([[0], np.cumsum(np.hypot(np.diff(x), np.diff(y)))])
    s = np.arange(0, along[-1], 0.5)  # every half pixel along the stroke
    xs, ys = np.interp(s, along, x), np.interp(s, along, y)
    tx, ty = np.gradient(xs, s), np.gradient(ys, s)
    nx, ny = ty, -tx  # across the stroke
    want = width_at(stem, ys) + 1.0  # measured: without the extra pixel the drawn stems come out that much narrow
    n = int(along[-1]) + 1
    ink_wanted = None
    c = np.asarray(stem.get("course") or [[0, 0, 0]], float)
    if c.shape[1] > 3:
        ink_wanted = np.interp(np.interp(np.arange(n), along, y), c[:, 0], c[:, 3]).astype(np.float32)
    strip, real = stem_ribbon(n, (stem["width"] + stem.get("width_top", stem["width"])) / 2, stem["top"] == "tip", stem["bottom"] == "tip", pool, rng, ink_wanted)
    row = np.minimum(s.astype(int), len(strip) - 1)
    scale = np.clip(real[row] / want, 0.7, 1.45)  # the ribbon is squeezed or spread to the width the layout asks for
    across = np.arange(-44, 44.01, 0.5)
    col = np.rint(32 + across[None, :] * scale[:, None]).astype(int)
    ok = (col >= 0) & (col < 64)
    px = np.rint(xs[:, None] + across[None, :] * nx[:, None]).astype(int)
    py = np.rint(ys[:, None] + across[None, :] * ny[:, None]).astype(int)
    val = strip[row[:, None], np.clip(col, 0, 63)]
    val[~ok] = 0
    x0, y0 = px.min(), py.min()
    patch = np.zeros((py.max() - y0 + 1, px.max() - x0 + 1, 4), np.float32)
    keep = val[..., 3] > 0
    patch[py[keep] - y0, px[keep] - x0] = val[keep]
    return patch, int(x0), int(y0)


def put(rgb, solid, patch, x0, y0):
    """Lay a patch over what is already there."""
    H, W = solid.shape
    xa, ya, xb, yb = max(x0, 0), max(y0, 0), min(x0 + patch.shape[1], W), min(y0 + patch.shape[0], H)
    if xb <= xa or yb <= ya:
        return
    p = patch[ya - y0:yb - y0, xa - x0:xb - x0]
    al = p[..., 3:] / 255
    rgb[ya:yb, xa:xb] = rgb[ya:yb, xa:xb] * (1 - al) + p[..., :3] * al
    solid[ya:yb, xa:xb] = 1 - (1 - solid[ya:yb, xa:xb]) * (1 - al[..., 0])


def vp_blend(a, b, w, mean):
    w = w[..., None]
    return mean + ((a - mean) * w + (b - mean) * (1 - w)) / np.sqrt(w * w + (1 - w) ** 2)


def spread_texture(name, H, W, rng, lap=48):
    """A texture file repeated to cover the picture from a random start, its far edges cross-faded onto its near
    ones so that the picture itself can be repeated."""
    from PIL import Image
    t = np.asarray(Image.open(HERE / "textures" / name).convert("RGB")).astype(np.float32)
    t = np.roll(t, (int(rng.integers(t.shape[0])), int(rng.integers(t.shape[1]))), (0, 1))
    big = np.tile(t, (-(-(H + lap) // t.shape[0]), -(-(W + lap) // t.shape[1]), 1))[:H + lap, :W + lap]
    mean = t.mean((0, 1), dtype=np.float64).astype(np.float32)
    ramp = np.linspace(1, 0, lap, dtype=np.float32)
    big = np.concatenate([vp_blend(big[:, -lap:], big[:, :lap], ramp[None, :], mean), big[:, lap:-lap]], 1)
    return np.concatenate([vp_blend(big[-lap:], big[:lap], ramp[:, None], mean), big[lap:-lap]], 0)


def render(layout, seed=0, site_colours=False, ground=None):
    from PIL import Image, ImageDraw
    from scipy import ndimage as ndi
    rng = np.random.default_rng(seed)
    W, H = layout["tile"]["width"], layout["tile"]["height"]
    by_id = {s["id"]: s for s in layout["stems"]}
    M = json.loads((HERE / "measurements.json").read_text())["colours"]
    shapes, pool = load_shapes(), load_ribbons()
    shifts = [(dx, dy) for dx in ((0, -W, W) if layout["tile"].get("wrap_x", True) else (0,)) for dy in ((0, -H, H) if layout["tile"].get("wrap_y", False) else (0,))]

    # stems: real ribbons laid along the layout's lines, parents first so that a branch lies over its parent
    stem_rgb, S = np.zeros((H, W, 3), np.float32), np.zeros((H, W), np.float32)
    laid = {}
    for s in sorted(layout["stems"], key=lambda s: s.get("parent") is not None):
        patch, x0, y0 = lay_stem(s, by_id, pool, rng)
        laid[s["id"]] = (patch[..., 3] > 127, x0, y0)
        for dx, dy in shifts:
            put(stem_rgb, S, patch, x0 + dx, y0 + dy)
    thick = spread_texture("stem-fill-thick.png", H, W, rng, lap=12)
    yy, xx = np.ogrid[-CROTCH:CROTCH + 1, -CROTCH:CROTCH + 1]
    for s in layout["stems"]:  # the inside of each fork is webbed over, as a knife leaves it
        if s.get("parent") is None:
            continue
        px = float(centre_x(by_id[s["parent"]], by_id, s["join_y"]))
        for dx, dy in shifts:
            xa, ya, xb, yb = max(int(px + dx) - 150, 0), max(int(s["join_y"] + dy) - 210, 0), min(int(px + dx) + 150, W), min(int(s["join_y"] + dy) + 90, H)
            if xb - xa > 30 and yb - ya > 30:
                solid = np.zeros((yb - ya, xb - xa), bool)  # only the branch and its parent: a third stem standing near is no part of the fork
                for mask, x0, y0 in (laid[s["id"]], laid[s["parent"]]):
                    x0, y0 = x0 + dx, y0 + dy
                    ua, va, ub, vb = max(x0, xa), max(y0, ya), min(x0 + mask.shape[1], xb), min(y0 + mask.shape[0], yb)
                    if ub > ua and vb > va:
                        solid[va - ya:vb - ya, ua - xa:ub - xa] |= mask[va - y0:vb - y0, ua - x0:ub - x0]
                web = ndi.gaussian_filter((ndi.binary_closing(solid, xx * xx + yy * yy <= CROTCH * CROTCH) & ~solid).astype(np.float32), 1.0)[..., None]
                stem_rgb[ya:yb, xa:xb] = stem_rgb[ya:yb, xa:xb] * (1 - web) + thick[ya:yb, xa:xb] * web
                S[ya:yb, xa:xb] = 1 - (1 - S[ya:yb, xa:xb]) * (1 - web[..., 0])
    stem = stem_rgb / np.maximum(S, 0.05)[..., None]

    def plate(outlines, soft):
        im = Image.new("L", (2 * W, 2 * H), 0)  # drawn at twice the size, for smooth edges
        d = ImageDraw.Draw(im)
        for pts in outlines:
            for dx, dy in shifts:
                q = (pts + (dx, dy)) * 2
                if len(q) > 2 and q[:, 0].max() > -50 and q[:, 0].min() < 2 * W + 50 and q[:, 1].max() > -50 and q[:, 1].min() < 2 * H + 50:
                    d.polygon([tuple(p) for p in q], fill=255)
        return ndi.gaussian_filter(np.asarray(im, np.float32) / 255, 2 * soft).reshape(H, 2, W, 2).mean((1, 3))

    outlines = []
    for b in layout["buds"]:
        outlines.append(bud_outline(b, by_id, shapes))
    B = plate(outlines, BUD_SOFT)

    textured = spread_texture("ground-tile.png", H, W, rng)
    ground = textured if ground is None else ground  # a flat ground can be given, to lift the motif off it as a layer
    paper = spread_texture("paper-tile.png", H, W, rng, lap=8)
    fine = spread_texture("stem-fill-middling.png", H, W, rng, lap=12)
    grain = (fine - fine.mean((0, 1), dtype=np.float64).astype(np.float32)).mean(2)
    grain = grain / grain.std()
    band = np.array(M["pale_band_in_bud"]["mean"], np.float32) + 6 * grain[..., None] + (paper - paper.mean((0, 1), dtype=np.float64).astype(np.float32))
    # edges fray along the grain rather than running smooth
    S = np.clip(0.5 + (S - 0.5 + EDGE_GRAIN * grain * (S > 0.02) * (S < 0.98)) * 1.25, 0, 1)
    B = np.clip(0.5 + (B - 0.5 + 0.5 * EDGE_GRAIN * grain * (B > 0.02) * (B < 0.98)) * 1.3, 0, 1)
    # inside a bud the green has a soft edge of its own, softer than a stem's edge against the ground
    G = ndi.gaussian_filter(S, 1.0)
    # A sliver of white thinner than a few pixels between the stem's far edge and the bud's own edge is not in
    # the print: there the green runs out to the edge.
    for b in layout["buds"]:
        s = by_id[b["stem"]]
        sign = 1 if b["side"] == "right" else -1
        for dx, dy in shifts:
            cx, cy, r = float(centre_x(s, by_id, b["y"])) + b["offset"] + dx, b["y"] + dy, int(b["length"] / 2 + 12)
            xa, ya, xb, yb = max(int(cx) - r, 0), max(int(cy) - r, 0), min(int(cx) + r, W), min(int(cy) + r, H)
            if xb - xa < 8 or yb - ya < 8:
                continue
            yy2, xx2 = np.mgrid[ya:yb, xa:xb]
            far = (xx2 - dx - centre_x(s, by_id, yy2 - dy)) * sign < 0
            white = (B[ya:yb, xa:xb] > 0.5) & (G[ya:yb, xa:xb] < 0.5) & far
            thin = white & ~ndi.binary_opening(white, np.ones((3, 3), bool))
            G[ya:yb, xa:xb] = np.maximum(G[ya:yb, xa:xb], ndi.gaussian_filter(ndi.binary_dilation(thin).astype(np.float32), 0.8))
    S3, B3, G3 = S[..., None], B[..., None], G[..., None]
    # the blue is heaviest right round a bud: the ground is darker there, and the stem carries a little more mottle
    away = ndi.distance_transform_edt(B < 0.5).astype(np.float32)[..., None]
    collar = COLLAR * np.exp(-away / COLLAR_REACH)
    out = (ground * (1 - HALO * np.exp(-away / HALO_REACH)) * (1 - S3) + (stem * (1 - collar) + thick * collar) * S3) * (1 - B3) + (paper * (1 - G3) + band * G3) * B3
    if site_colours:
        out = np.concatenate([out, np.ones_like(out[..., :1])], 2) @ SITE
    return np.clip(out, 0, 255).astype(np.uint8)


if __name__ == "__main__":
    from PIL import Image
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    seed = int(sys.argv[sys.argv.index("--seed") + 1]) if "--seed" in sys.argv else 0
    if "--seed" in sys.argv:
        args.remove(str(seed))
    src = pathlib.Path(args[0])
    out = pathlib.Path(args[1]) if len(args) > 1 else HERE / (src.stem.replace("layout-", "drawn-") + ("-site" if "--site-colours" in sys.argv else "") + ".jpg")
    Image.fromarray(render(json.loads(src.read_text()), seed, "--site-colours" in sys.argv)).save(out, quality=93)
    print("wrote", out)
