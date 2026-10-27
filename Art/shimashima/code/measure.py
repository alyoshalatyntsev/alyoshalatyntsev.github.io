"""Measure the print's colours and textures and cut the texture files out of the scan.

    python code/measure.py   ->  measurements.json, textures/*, clips/*

Needs traced.json (run code/topology.py first). Everything is measured on the one tile, in scan pixels.
"""
import json

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

import shima

OUT = shima.HERE
RNG = np.random.default_rng(6)
LUM = np.array([0.299, 0.587, 0.114], np.float32)


def mblur(x, m, sigma):
    """Gaussian blur that only looks at pixels inside the mask m."""
    return ndi.gaussian_filter(x * m, sigma) / np.maximum(ndi.gaussian_filter(m.astype(np.float32), sigma), 1e-3)


def bands(lum, m, inner, sigmas=(0.7, 1.4, 2.8, 5.6, 11, 22, 45)):
    """Contrast (standard deviation) of the texture at each size, and how much stronger it varies across than down."""
    out, prev = [], lum
    for s in sigmas:
        cur = mblur(lum, m, s)
        band = (prev - cur)
        gx = np.diff(band, axis=1)[:, :-1][inner[:, 1:-1] & inner[:, 2:]] if False else (band[:, 1:] - band[:, :-1])[inner[:, 1:] & inner[:, :-1]]
        gy = (band[1:] - band[:-1])[inner[1:] & inner[:-1]]
        out.append({"finer_than_px": round(s * 2.5, 1), "contrast": round(float(band[inner].std()), 2), "across_over_down": round(float(gx.std() / gy.std()), 2)})
        prev = cur
    out.append({"coarser_than_px": round(sigmas[-1] * 2.5, 1), "contrast": round(float(prev[inner].std()), 2)})
    return out


def lag_corr(x, m, lags=(1, 2, 4, 8, 16, 32, 64, 128)):
    """How alike two points are, a given distance apart, across the page and down it."""
    x = np.where(m, x - x[m].mean(), 0)
    var = (x[m] ** 2).mean()
    res = {}
    for k in lags:
        ax = m[:, k:] & m[:, :-k]
        ay = m[k:] & m[:-k]
        res[k] = (round(float((x[:, k:] * x[:, :-k])[ax].mean() / var), 3) if ax.sum() > 5000 else None,
                  round(float((x[k:] * x[:-k])[ay].mean() / var), 3) if ay.sum() > 5000 else None)
    return res


def vp_blend(a, b, w, mean):
    """Cross-fade two textures without washing out their contrast (w is the weight of a)."""
    w = w[..., None]
    return mean + ((a - mean) * w + (b - mean) * (1 - w)) / np.sqrt(w * w + (1 - w) ** 2)


def quilt(strips, overlap, mean):
    """Join strips left to right with cross-faded overlaps, the last wrapping onto the first."""
    out = strips[0]
    ramp = np.linspace(1, 0, overlap, dtype=np.float32)[None, :]
    for s in strips[1:]:
        join = vp_blend(out[:, -overlap:], s[:, :overlap], ramp, mean)
        out = np.concatenate([out[:, :-overlap], join, s[:, overlap:]], 1)
    join = vp_blend(out[:, -overlap:], out[:, :overlap], ramp, mean)
    return np.concatenate([join, out[:, overlap:-overlap]], 1)


def wrap_down(t, overlap, mean):
    ramp = np.linspace(1, 0, overlap, dtype=np.float32)[:, None]
    join = vp_blend(t[-overlap:], t[:overlap], ramp, mean)
    return np.concatenate([join, t[overlap:-overlap]], 0)


def zoom(a, box, z):
    x, y, w, h = box
    return np.asarray(Image.fromarray(a[y:y + h, x:x + w].astype(np.uint8)).resize((w * z, h * z), Image.NEAREST)).astype(np.float32)


def main():
    a = shima.load_tile()
    H, W, _ = a.shape
    lum = a @ LUM
    ink, paper = shima.masks(a)
    traced = json.loads((OUT / "traced.json").read_text())
    stems, buds = traced["stems"], traced["buds"]
    M = {"source": str(shima.SRC.name), "tile_px": [W, H], "px_per_mm_if_300dpi": round(shima.PX_PER_MM, 2)}
    (OUT / "clips").mkdir(exist_ok=True)
    (OUT / "textures" / "buds").mkdir(parents=True, exist_ok=True)

    yy, xx = np.mgrid[:H, :W]
    in_bud = np.zeros((H, W), bool)
    for b in buds:
        in_bud |= np.hypot(xx - b["x"], yy - b["y"]) < b["length"] / 2 + 10

    # ---- which pixels are safely ground, stem interior, paper, and the pale band through a bud
    ground = ndi.binary_erosion(~ink, shima.disc(8))
    stem_core = np.zeros((H, W), bool)
    strips = []  # straightened stems: (stem id, rows y, strip of colour 49 wide, half width)
    for s in stems:
        line = np.array(s["line"], float)
        ys, cx, wd = line[:, 0].astype(int), line[:, 1], line[:, 2]
        med = np.median(wd)
        ok = (wd < 1.4 * med) & (wd > 0.6 * med) & ~in_bud[ys, np.clip(cx.astype(int), 0, W - 1)]
        ok &= (ys > ys[0] + 60) & (ys < ys[-1] - 40)
        if "parent" in s:
            ok &= np.abs(cx - s["x"]) < 4
        smooth = ndi.uniform_filter1d(cx, 31)
        for y, c, w in zip(ys[ok], smooth[ok], wd[ok]):
            h = int(w / 2 - 5)
            if h > 2:
                stem_core[y, int(round(c)) - h:int(round(c)) + h + 1] = True
        s["_rows"] = (ys, cx, wd, ok, smooth)
    paper_core = ndi.binary_erosion(paper, shima.disc(6))
    # the clean green inside the buds: within each traced outline, drawn in a little, and not paper
    in_oval = np.zeros((H, W), bool)
    for b in buds:
        th = np.radians(b["tilt"])
        u = ((xx - b["x"]) * np.cos(th) + (yy - b["y"]) * np.sin(th)) * (1 if b["side"] == "right" else -1)
        v = -(xx - b["x"]) * np.sin(th) + (yy - b["y"]) * np.cos(th)
        o = np.asarray(b["outline"])
        rho = o[(np.arctan2(v / b["length"], u / b["width"]) % (2 * np.pi) / (2 * np.pi) * len(o)).astype(int) % len(o)]
        in_oval |= np.hypot(u / (b["width"] / 2), v / (b["length"] / 2)) < rho * 0.8
    band = in_oval & ink & ~ndi.binary_dilation(paper, shima.disc(6))

    # ---- colours
    def colour(mask):
        px = a[mask]
        return {"mean": px.mean(0, dtype=np.float64).round(1).tolist(), "sd": px.std(0, dtype=np.float64).round(1).tolist(), "hex": "#%02X%02X%02X" % tuple(int(round(v)) for v in px.mean(0, dtype=np.float64)), "pixels": int(mask.sum())}

    def spread(mask):
        """The colour's main line of variation: its dark end, middle and light end (2nd, 50th, 98th percentile along it)."""
        px = a[mask][::3]
        mean = px.mean(0, dtype=np.float64).astype(np.float32)
        _, _, vt = np.linalg.svd(px - mean, full_matrices=False)
        axis = vt[0] * np.sign(vt[0].sum())
        t = (px - mean) @ axis
        ends = {k: (mean + np.percentile(t, q) * axis).round(1).tolist() for k, q in (("dark", 2), ("middle", 50), ("light", 98))}
        ends["share_of_variance_on_the_line"] = round(float(np.var(t) / np.var(px - mean, axis=0, dtype=np.float64).sum()), 3)
        return ends

    C = {"paper": colour(paper_core), "pale_band_in_bud": colour(band), "stem": colour(stem_core), "ground": colour(ground)}
    C["pale_band_in_bud"]["median"] = np.median(a[band], 0).round(1).tolist()
    C["stem"]["spread"] = spread(stem_core)
    C["ground"]["spread"] = spread(ground)
    # Is the dark mottle on the stems the ground's blue lying thinly over the pale green? If the blue is a
    # transparent ink, a share c of it over a base gives base * (ground / base_under_ground) ** c per channel.
    P, G, S_dark, S_light, GR = (np.array(v) for v in (C["paper"]["mean"], C["pale_band_in_bud"]["mean"], C["stem"]["spread"]["dark"], C["stem"]["spread"]["light"], C["ground"]["spread"]["middle"]))
    fits = {}
    for name, base, target in (("stem dark end = pale green under part-strength ground blue", G, S_dark), ("stem light end = pale green under part-strength ground blue", G, S_light),
                               ("ground's light flecks = paper under part-strength ground blue", P, np.array(C["ground"]["spread"]["light"])),
                               ("ground's light flecks = pale green under part-strength ground blue", G, np.array(C["ground"]["spread"]["light"]))):
        T = GR / P  # what full-strength blue does to bare paper
        best = min(((float(np.abs(base * T ** c - target).max()), c) for c in np.linspace(0, 1.2, 121)))
        fits[name] = {"strength": round(best[1], 2), "predicted": (base * T ** best[1]).round(1).tolist(), "measured": target.round(1).tolist(), "worst_channel_error": round(best[0], 1)}
    C["overprint_test"] = fits
    C["website_version"] = {"what": "shimashima6_5.jpg is this scan turned 180 degrees, recoloured, then saved at JPEG quality 5",
                            "recolour_matrix_rows_R_G_B_1": [[1.763, -0.040, 0.013], [-0.834, 1.058, -0.014], [0.090, 0.020, 0.993], [2.858, -7.218, 3.113]]}
    M["colours"] = C

    # ---- ground texture
    Gd = {"contrast_by_size": bands(lum, (~ink).astype(np.float32), ground)}
    mid = mblur(lum, (~ink).astype(np.float32), 1.0) - mblur(lum, (~ink).astype(np.float32), 12)
    Gd["alikeness_at_distance_px_(across, down)"] = lag_corr(mid, ground)
    z = (mblur(lum, (~ink).astype(np.float32), 0.8) - mblur(lum, (~ink).astype(np.float32), 20)) / lum[ground].std()
    for name, sel in (("light_flecks", (z > 2.2) & ground), ("dark_specks", (z < -2.2) & ground)):
        lab, n = ndi.label(sel)
        idx = np.arange(1, n + 1)
        area = ndi.sum(sel, lab, idx)
        big = idx[area >= 6]
        elong, steep = [], []
        for sl, i in zip([ndi.find_objects(lab)[j - 1] for j in big[:4000]], big[:4000]):
            ys, xs = np.nonzero(lab[sl] == i)
            if len(xs) < 6:
                continue
            ev, evec = np.linalg.eigh(np.cov(np.vstack([xs, ys])) + np.eye(2) * 0.08)
            elong.append(np.sqrt(ev[1] / ev[0]))
            steep.append(abs(np.degrees(np.arctan2(evec[0, 1], evec[1, 1]))) % 180)
        steep = np.array(steep)
        steep = np.minimum(steep, 180 - steep)  # 0 = upright, 90 = lying flat
        cm2 = ground.sum() / (shima.PX_PER_MM * 10) ** 2
        Gd[name] = {"per_cm2": round(len(big) / cm2, 1), "share_of_ground": round(float(sel.sum() / ground.sum()), 4),
                    "area_px_quartiles": np.percentile(area[area >= 6], [25, 50, 75, 95]).round().tolist(),
                    "length_over_width_median": round(float(np.median(elong)), 2),
                    "share_long_ones_upright_within_30deg": round(float((steep[np.array(elong) > 2] < 30).mean()), 2),
                    "share_long_ones_flat_within_30deg": round(float((steep[np.array(elong) > 2] > 60).mean()), 2)}
    # slow unevenness: mean of each 96 px block of ground
    blocks = [lum[y:y + 96, x:x + 96][ground[y:y + 96, x:x + 96]].mean() for y in range(0, H - 96, 96) for x in range(0, W - 96, 96) if ground[y:y + 96, x:x + 96].mean() > 0.5]
    Gd["block_96px_means_sd"] = round(float(np.std(blocks)), 2)
    Gd["pixel_sd"] = round(float(lum[ground].std()), 2)
    M["ground"] = Gd

    # ---- stems: mottle, edges, wobble, tips
    St = {}
    core_f = stem_core.astype(np.float32)
    St["mottle_contrast_by_size"] = bands(lum, ndi.binary_dilation(stem_core, shima.disc(3)).astype(np.float32), stem_core, sigmas=(0.7, 1.4, 2.8, 5.6))
    St["alikeness_at_distance_px_(across, down)"] = lag_corr(lum - mblur(lum, core_f, 8), stem_core, lags=(1, 2, 3, 4, 6, 8, 12))
    dark, light = (np.array(C["stem"]["spread"][k]) @ LUM for k in ("dark", "light"))
    St["share_darker_than_midway"] = round(float((lum[stem_core] < (dark + light) / 2).mean()), 3)
    St["pixel_sd"] = round(float(lum[stem_core].std()), 2)
    seg_means, per_stem = [], {}
    edge_res, lr_corr, wob, lean, widths, edge_len = [], [], [], [], [], []
    for s in stems:
        ys, cx, wd, ok, smooth = s["_rows"]
        if ok.sum() < 300:
            continue
        runs = np.split(np.nonzero(ok)[0], np.nonzero(np.diff(np.nonzero(ok)[0]) > 1)[0] + 1)
        mine = []
        for r in runs:
            for k in range(0, len(r) - 100, 100):
                rows = r[k:k + 100]
                vals = [lum[ys[i], int(round(smooth[i])) - 5:int(round(smooth[i])) + 6].mean() for i in rows]
                mine.append(float(np.mean(vals)))
            if len(r) > 200:
                left, right = cx[r] - wd[r] / 2, cx[r] + wd[r] / 2
                dl, dr = left - ndi.median_filter(left, 81, mode="nearest"), right - ndi.median_filter(right, 81, mode="nearest")
                edge_res += [dl.std(), dr.std()]
                lr_corr.append(np.corrcoef(dl, dr)[0, 1])
                ac = [np.corrcoef(dl[:-k], dl[k:])[0, 1] for k in range(1, 40)]
                edge_len.append(next((k + 1 for k, v in enumerate(ac) if v < 0.37), 40))
                fit = np.polyfit(ys[r], cx[r], 1)
                wob.append((cx[r] - np.polyval(fit, ys[r])).std())
                lean.append(fit[0])
                widths.append(np.median(wd[r]))
        seg_means += mine
        per_stem[s["id"]] = round(float(np.mean(mine)), 1) if mine else None
    St["edge_roughness_px_sd"] = round(float(np.median(edge_res)), 2)
    St["edge_roughness_runs_alike_for_px"] = float(np.median(edge_len))
    St["left_right_edge_correlation"] = round(float(np.median(lr_corr)), 2)
    St["centre_line_wander_px_sd"] = round(float(np.median(wob)), 2)
    St["lean_px_per_1000"] = [round(float(v * 1000), 1) for v in sorted(lean)]
    St["body_width_px"] = {"min": float(min(widths)), "median": float(np.median(widths)), "max": float(max(widths))}
    wide = {k: [] for k in (10, 30, 100, 300)}
    for s in stems:
        ys, cx, wd, ok, smooth = s["_rows"]
        idx = np.nonzero(ok)[0]
        for r in np.split(idx, np.nonzero(np.diff(idx) > 1)[0] + 1):
            if len(r) >= 700:
                res = wd[r] - np.polyval(np.polyfit(ys[r], wd[r], 1), ys[r])
                for k in wide:
                    wide[k].append(ndi.uniform_filter1d(res, k)[k:-k])
    St["width_about_its_taper_sd_px_by_window_px"] = {str(k): round(float(np.concatenate(v).std()), 2) for k, v in wide.items()}
    St["patchiness_100px_segment_means_sd"] = round(float(np.std(seg_means)), 2)
    # how the brightness of a stem's middle varies along it, averaged over windows of different lengths
    along = {k: [] for k in (1, 10, 30, 100, 300)}
    for s in stems:
        ys, cx, wd, ok, smooth = s["_rows"]
        idx = np.nonzero(ok)[0]
        for r in np.split(idx, np.nonzero(np.diff(idx) > 1)[0] + 1):
            if len(r) < 600:
                continue
            m = np.array([lum[ys[i], int(round(smooth[i])) - 5:int(round(smooth[i])) + 6].mean() for i in r])
            for k in along:
                along[k].append(ndi.uniform_filter1d(m, k)[k:-k or None] - lum[stem_core].mean())
    St["brightness_along_stem_sd_by_window_px"] = {str(k): round(float(np.sqrt(np.mean(np.concatenate(v) ** 2))), 2) for k, v in along.items()}
    St["mean_brightness_by_stem"] = per_stem
    # tips: width against distance from the end, as a share of the body width
    prof = {"top": [], "bottom": []}
    for s in stems:
        ys, cx, wd, ok, smooth = s["_rows"]
        if len(ys) < 500:
            continue
        body_top, body_bottom = np.median(wd[150:400]), np.median(wd[-400:-150])
        if s["top"] == "tip" and not in_bud[ys[:160], np.clip(cx[:160].astype(int), 0, W - 1)].any():
            prof["top"].append(wd[:160] / body_top)
        if s["bottom"] == "tip" and not in_bud[ys[-160:], np.clip(cx[-160:].astype(int), 0, W - 1)].any():
            prof["bottom"].append(wd[::-1][:160] / body_bottom)
    St["tips"] = {k: {"count": len(v), "width_share_at_px_from_end": {str(d): round(float(np.median([p[d] for p in v])), 2) for d in (0, 2, 5, 10, 20, 40, 80, 150)}} for k, v in prof.items() if v}
    # edge sharpness: how many pixels the step from ground to stem takes (20% to 80%), row by row on straight stems
    sharp = []
    for s in stems:
        ys, cx, wd, ok, smooth = s["_rows"]
        for i in np.nonzero(ok)[0][::9]:
            x0 = int(round(cx[i] - wd[i] / 2))
            p = ndi.gaussian_filter1d(lum[ys[i], x0 - 9:x0 + 9], 0.6)
            if len(p) < 18:
                continue
            lo, hi = p[:4].mean(), p[-4:].mean()
            if hi - lo < 40:
                continue
            q = (p - lo) / (hi - lo)
            c20, c80 = np.argmax(q > 0.2), np.argmax(q > 0.8)
            if 0 < c20 <= c80:
                f = lambda c, v: c - 1 + (v - q[c - 1]) / max(q[c] - q[c - 1], 1e-3)
                sharp.append(f(c80, 0.8) - f(c20, 0.2))
    St["edge_step_20_to_80_px"] = round(float(np.median(sharp)), 2)
    M["stems"] = St

    # ---- buds
    Bd = {"count": len(buds), "paper_pixel_sd": round(float(lum[paper_core].std()), 2), "pale_band_pixel_sd": round(float(lum[band].std()), 2),
          "paper_contrast_by_size": bands(lum, paper.astype(np.float32), paper_core, sigmas=(0.7, 1.4, 2.8))}
    ring = []  # brightness against distance from the fitted oval's edge, on the side where paper meets ground
    for b in buds:
        th = np.radians(b["tilt"])
        u = (xx - b["x"]) * np.cos(th) + (yy - b["y"]) * np.sin(th)
        v = -(xx - b["x"]) * np.sin(th) + (yy - b["y"]) * np.cos(th)
        rr = np.hypot(u / (b["width"] / 2), v / (b["length"] / 2))
        dist = (rr - 1) * np.sqrt(b["width"] * b["length"]) / 2  # px outside the oval, roughly
        away = (np.sign(u) == np.sign(b["paper_x"] - b["x"] + 1e-6)) & (np.abs(u) > 12)
        ring.append([lum[away & (dist >= d - 0.5) & (dist < d + 0.5)].mean() for d in range(-10, 13)])
    ring = np.nanmedian(np.array(ring), 0)
    Bd["brightness_across_edge_px_from_oval"] = {str(d): round(float(v), 1) for d, v in zip(range(-10, 13), ring)}
    q = (ring - ring[-4:].mean()) / (ring[:4].mean() - ring[-4:].mean())
    Bd["edge_step_20_to_80_px"] = round(float(np.interp(0.2, q[::-1], np.arange(-10, 13)[::-1]) - np.interp(0.8, q[::-1], np.arange(-10, 13)[::-1])), 2)
    for k in ("length", "width", "tilt", "offset"):
        v = np.array([b[k] for b in buds])
        Bd[k] = {"min": round(float(v.min()), 1), "median": round(float(np.median(v)), 1), "max": round(float(v.max()), 1)}
    M["buds"] = Bd

    # ---- texture files cut from the scan
    T = {}
    gmean = a[ground].mean(0, dtype=np.float64)
    # ground: tall clean strips between the stems, levelled to one mean and joined
    clear = ndi.binary_erosion(~ink, shima.disc(6))
    found = []
    for hs in (1024, 768):
        for y in range(0, H - hs + 1, 64):
            col = clear[y:y + hs].all(0)
            d = np.diff(np.concatenate(([0], col.astype(np.int8), [0])))
            for x0, x1 in zip(np.nonzero(d == 1)[0], np.nonzero(d == -1)[0]):
                if x1 - x0 >= 72:
                    found.append((x1 - x0, y, x0, x1))
        if sum(f[0] - 24 for f in found) > 4000:
            break
    found.sort(reverse=True)
    chosen = []
    for wdt, y, x0, x1 in found:
        if all(x1 <= c[2] or x0 >= c[3] or y + hs <= c[1] or y >= c[1] + hs for c in chosen):
            chosen.append((wdt, y, x0, x1))
    order = RNG.permutation(len(chosen))
    pieces, total = [], 0
    for i in order:
        wdt, y, x0, x1 = chosen[i]
        p = a[y:y + hs, x0:x1]
        pieces.append(p - p.mean((0, 1), dtype=np.float64).astype(np.float32) + gmean)
        total += wdt - 24
        if total >= 1024:
            break
    gt = wrap_down(quilt(pieces, 24, gmean), 48, gmean)
    shima.save(gt, OUT / "textures" / "ground-tile.png")
    T["ground-tile.png"] = {"size": list(gt.shape[1::-1]), "made_from": f"{len(pieces)} clean strips of ground {hs} px tall, each levelled to the mean ground colour, cross-faded over 24 px; wraps both ways",
                            "mean": gt.mean((0, 1), dtype=np.float64).astype(np.float32).round(1).tolist(), "pixel_sd_lum": round(float((gt @ LUM).std()), 2)}
    best = max(found)
    shima.save(a[best[1]:best[1] + hs, best[2]:best[3]], OUT / "textures" / "ground-patch-largest.png")
    T["ground-patch-largest.png"] = {"size": [int(best[0]), hs], "at_tile_xy": [int(best[2]), int(best[1])], "made_from": "untouched scan"}

    # stems: straightened strips, and a fill texture made of their middles
    smean = a[stem_core].mean(0, dtype=np.float64)
    cores, long_strips = [], []
    for s in stems:
        ys, cx, wd, ok, smooth = s["_rows"]
        idx = np.nonzero(ok)[0]
        for r in np.split(idx, np.nonzero(np.diff(idx) > 1)[0] + 1):
            if len(r) < 256:
                continue
            strip = np.stack([a[ys[i], int(round(smooth[i])) - 24:int(round(smooth[i])) + 25] for i in r if 24 <= round(smooth[i]) < W - 25])
            half = int(np.percentile(wd[r], 10) / 2 - 5)
            long_strips.append((len(strip), s["id"], strip))
            for k in range(0, len(strip) - 255, 256):
                c = strip[k:k + 256, 24 - half:24 + half + 1]
                if c.shape[1] >= 9:
                    cores.append(c - c.mean((0, 1), dtype=np.float64).astype(np.float32) + smean)
    long_strips.sort(key=lambda t: -t[0])
    hmax = min(1600, long_strips[0][0])
    sheet = np.full((hmax, 8 * 55 - 6, 3), 255, np.float32)
    for k, (n, sid, strip) in enumerate(long_strips[:8]):
        sheet[:min(n, hmax), k * 55:k * 55 + 49] = strip[:hmax]
    shima.save(sheet, OUT / "textures" / "stem-strips-straightened.png")
    T["stem-strips-straightened.png"] = {"what": "the eight longest clean runs of stem, straightened, 49 px wide with ground either side", "stems": [t[1] for t in long_strips[:8]]}
    # The mottle is the same in every direction and forgets itself within 6 px, so the fill is built of small
    # squares taken at random from the stems' middles; strips side by side would show as stripes.
    blocks = [c[k:k + 12, j:j + 12] for c in cores if c.shape[1] >= 12 for k in range(0, 244, 12) for j in range(0, c.shape[1] - 11, 12)]
    # The blue lies thick on some stretches of stem and thin on others, so there are three fills: the lightest,
    # middle and darkest thirds of the squares. Levelling all squares to one mean would grey the thin ones and
    # bleach the thick ones.
    by_tone = sorted(blocks, key=lambda b: -float((b @ LUM).mean()))
    third = len(by_tone) // 3
    for name, group in (("thin", by_tone[:third]), ("middling", by_tone[third:2 * third]), ("thick", by_tone[2 * third:])):
        gm = np.mean([b.mean((0, 1), dtype=np.float64).astype(np.float32) for b in group], 0)
        group = [b - b.mean((0, 1), dtype=np.float64).astype(np.float32) + gm for b in group]
        pick = RNG.integers(len(group), size=28 * 28)
        rows = [quilt([group[i] for i in pick[r * 28:(r + 1) * 28]], 3, gm) for r in range(28)]
        st = quilt([r.transpose(1, 0, 2) for r in rows], 3, gm).transpose(1, 0, 2)
        shima.save(st, OUT / "textures" / f"stem-fill-{name}.png")
        T[f"stem-fill-{name}.png"] = {"size": list(st.shape[1::-1]), "mean": st.mean((0, 1), dtype=np.float64).astype(np.float32).round(1).tolist(), "pixel_sd_lum": round(float((st @ LUM).std()), 2)}
    pieces = blocks
    T["stem-fill-*.png"] = {"size": list(st.shape[1::-1]), "made_from": f"each is 784 squares of 12 px drawn at random from one third of the {len(pieces)} squares cut from the middles of straight stems (sorted by brightness), cross-faded over 3 px; wraps both ways"}

    # ribbons: real stretches of stem lifted whole (colour, how solid the ink is, the shape of both edges), each
    # straightened only for its lean, so its bends, bulges and pinches stay. The renderer lays these along new stems.
    import shutil
    shutil.rmtree(OUT / "textures" / "ribbons", ignore_errors=True)
    (OUT / "textures" / "ribbons").mkdir(parents=True)
    solid = ndi.gaussian_filter(ink.astype(np.float32), 1.2)

    def ribbon(rows, centre, lo, hi):
        out = np.zeros((len(rows), 64, 4), np.float32)
        for i, (y, c, l, h) in enumerate(zip(rows, centre, lo, hi)):
            c0 = int(round(c)) - 32
            if not (0 <= y < H and c0 >= 0 and c0 + 64 <= W):
                continue
            rgb, al = a[y, c0:c0 + 64].copy(), solid[y, c0:c0 + 64].copy()
            cols = np.arange(c0, c0 + 64)
            al[(cols < l - 4) | (cols > h + 4)] = 0  # nothing but this stem
            inside = np.nonzero(al >= 0.85)[0]
            if len(inside):  # edge pixels are part ground in the scan: give them the nearest solid colour instead
                near = inside[np.abs(np.arange(64)[:, None] - inside[None, :]).argmin(1)]
                rgb[al < 0.85] = rgb[near[al < 0.85]]
            out[i, :, :3], out[i, :, 3] = rgb, al * 255
        return out

    ribbons = []
    for s in stems:
        ys, cx, wd, ok, smooth = s["_rows"]
        idx = np.nonzero(ok)[0]
        for r in np.split(idx, np.nonzero(np.diff(idx) > 1)[0] + 1):
            if len(r) >= 200:  # straightened along its slow line, so only the quick wander stays in the ribbon
                line = ndi.gaussian_filter1d(cx[r], 25, mode="nearest")
                slow = ndi.gaussian_filter1d(wd[r].astype(float), 25, mode="nearest")
                ribbons.append(("body", s["id"], slow, ribbon(ys[r], line, cx[r] - wd[r] / 2, cx[r] + wd[r] / 2)))
        if len(ys) < 420 or "parent" in s and s["top"] == "merge":
            continue
        clear = lambda sl: not in_bud[ys[sl], np.clip(cx[sl].astype(int), 0, W - 1)].any() and wd[sl].max() < 1.5 * np.median(wd)
        if s["top"] == "tip" and clear(slice(0, 200)):  # the head: 14 rows of ground, then the first 180 of the stem
            fit = np.polyfit(ys[20:180], cx[20:180], 1)
            rows = np.arange(ys[0] - 14, ys[0] + 180)
            lo = np.concatenate([np.full(14, 1e9), cx[:180] - wd[:180] / 2])
            hi = np.concatenate([np.full(14, -1e9), cx[:180] + wd[:180] / 2])
            slow = ndi.gaussian_filter1d(wd[:180].astype(float), 25, mode="nearest")
            slow = np.concatenate([np.full(14 + 60, slow[60]), slow[60:]])  # held steady into the tip: the narrowing there is the ribbon's own
            ribbons.append(("head", s["id"], slow, ribbon(rows, np.polyval(fit, rows), lo, hi)))
        if s["bottom"] == "tip" and clear(slice(-200, None)):  # the foot, likewise
            fit = np.polyfit(ys[-180:-20], cx[-180:-20], 1)
            rows = np.arange(ys[-1] - 179, ys[-1] + 15)
            lo = np.concatenate([cx[-180:] - wd[-180:] / 2, np.full(14, 1e9)])
            hi = np.concatenate([cx[-180:] + wd[-180:] / 2, np.full(14, -1e9)])
            slow = ndi.gaussian_filter1d(wd[-180:].astype(float), 25, mode="nearest")
            slow = np.concatenate([slow[:-60], np.full(60 + 14, slow[-61])])
            ribbons.append(("foot", s["id"], slow, ribbon(rows, np.polyval(fit, rows), lo, hi)))
    index = []
    for k, (kind, sid, width, img) in enumerate(ribbons):
        name = f"{kind}-{k:02d}.png"
        Image.fromarray(img.clip(0, 255).astype(np.uint8), "RGBA").save(OUT / "textures" / "ribbons" / name)
        index.append({"file": name, "kind": kind, "from_stem": sid, "width": round(float(np.median(width)), 1), "length": len(img), "widths": [round(float(v), 1) for v in width]})
    (OUT / "textures" / "ribbons" / "index.json").write_text(json.dumps(index))
    T["ribbons/*.png"] = {"what": "real stretches of stem, 64 px wide, with a clear background: the body runs, and the first or last 180 px of stems that end free. "
                                  "Straightened only for lean, so every bend, bulge and thin patch of ink is as printed",
                          "body": sum(i["kind"] == "body" for i in index), "body_px_in_all": sum(i["length"] for i in index if i["kind"] == "body"),
                          "head": sum(i["kind"] == "head" for i in index), "foot": sum(i["kind"] == "foot" for i in index)}
    show = Image.new("RGB", (70 * min(len(ribbons), 24), 1200), (60, 60, 60))
    for k, (kind, sid, width, img) in enumerate(sorted(ribbons, key=lambda r: (r[0] != "head", r[0] != "foot", -len(r[3])))[:24]):
        im = Image.fromarray(img[:1200].clip(0, 255).astype(np.uint8), "RGBA")
        show.paste(im, (k * 70 + 3, 0), im)
    show.save(OUT / "clips" / "08-stem-ribbons.png")

    # paper: the largest upright rectangles of bare paper inside the buds, joined
    pmean = a[paper_core].mean(0, dtype=np.float64)
    pieces = []
    lab, n = ndi.label(paper_core)
    for sl in ndi.find_objects(lab):
        sub = paper_core[sl]
        cols = np.nonzero(sub.sum(0) >= 48)[0]
        if len(cols) < 14:
            continue
        runs = np.split(cols, np.nonzero(np.diff(cols) > 1)[0] + 1)
        cols = max(runs, key=len)
        rows = np.nonzero(sub[:, cols].all(1))[0]
        rr = np.split(rows, np.nonzero(np.diff(rows) > 1)[0] + 1)
        rows = max(rr, key=len)
        if len(rows) >= 40 and len(cols) >= 14:
            p = a[sl][rows[0]:rows[0] + 40, cols[0]:cols[-1] + 1]
            pieces.append(p - p.mean((0, 1), dtype=np.float64).astype(np.float32) + pmean)
    rows_out = []
    k = 0
    while len(rows_out) < 4 and pieces:
        line, total = [], 0
        while total < 140:
            line.append(pieces[k % len(pieces)])
            total += line[-1].shape[1] - 4
            k += 1
        rows_out.append(quilt(line, 4, pmean))
    wmin = min(r.shape[1] for r in rows_out)
    pt = np.concatenate([r[:, :wmin] for r in rows_out], 0)
    ramp = np.linspace(1, 0, 8, dtype=np.float32)[:, None]
    for r in (40, 80, 120):  # soften the joins between the rows of pieces
        pt[r - 4:r + 4] = vp_blend(pt[r - 4:r + 4], pt[r - 4:r + 4][::-1], np.abs(ramp * 2 - 1) * 0.5 + 0.5, pmean)
    pt = wrap_down(pt, 8, pmean)
    shima.save(pt, OUT / "textures" / "paper-tile.png")
    T["paper-tile.png"] = {"size": list(pt.shape[1::-1]), "made_from": f"{len(pieces)} small rectangles of bare paper from inside the buds; too small a sample to show more than the grain",
                           "mean": pt.mean((0, 1), dtype=np.float64).astype(np.float32).round(1).tolist(), "pixel_sd_lum": round(float((pt @ LUM).std()), 2)}

    # buds: each one cut out, with the stem's band, on a clear background
    thumbs = []
    soft = ndi.gaussian_filter(ink.astype(np.float32), 1.0)
    for k, b in enumerate(sorted(buds, key=lambda b: b["y"]), 1):
        r = int(b["length"] / 2 + 14)
        x0, y0 = int(b["x"]) - r, int(b["y"]) - r
        x1, y1 = x0 + 2 * r, y0 + 2 * r
        xs, ys = max(x0, 0), max(y0, 0)
        rgb = a[ys:min(y1, H), xs:min(x1, W)]
        th = np.radians(b["tilt"])
        u = (xx[ys:min(y1, H), xs:min(x1, W)] - b["x"]) * np.cos(th) + (yy[ys:min(y1, H), xs:min(x1, W)] - b["y"]) * np.sin(th)
        v = -(xx[ys:min(y1, H), xs:min(x1, W)] - b["x"]) * np.sin(th) + (yy[ys:min(y1, H), xs:min(x1, W)] - b["y"]) * np.cos(th)
        inside = np.clip((1.12 - np.hypot(u / (b["width"] / 2), v / (b["length"] / 2))) * 12, 0, 1)
        alpha = soft[ys:min(y1, H), xs:min(x1, W)] * inside
        Image.fromarray(np.dstack([rgb, alpha * 255]).clip(0, 255).astype(np.uint8), "RGBA").save(OUT / "textures" / "buds" / f"bud-{k:02d}.png")
        t = Image.new("RGB", (150, 150), (40, 40, 40))
        im = Image.fromarray(np.dstack([rgb, alpha * 255]).clip(0, 255).astype(np.uint8), "RGBA")
        t.paste(im, ((150 - im.width) // 2, (150 - im.height) // 2), im)
        thumbs.append(t)
    sheet = Image.new("RGB", (150 * 7, 150 * 3), (40, 40, 40))
    for k, t in enumerate(thumbs):
        sheet.paste(t, ((k % 7) * 150, (k // 7) * 150))
    sheet.save(OUT / "textures" / "buds-sheet.png")
    T["buds/bud-NN.png"] = {"count": len(buds), "what": "every bud cut out at scan size with a clear background, numbered down the page, with the stem's pale band through it"}
    # the three plates of the tile, as masks
    stem_plate = ink & ~ndi.binary_dilation(paper, shima.disc(3))
    for name, m in (("plate-stems.png", stem_plate), ("plate-bare-paper.png", paper), ("plate-ground.png", ~ink)):
        Image.fromarray((m * 255).astype(np.uint8)).save(OUT / "textures" / name)
    T["plate-*.png"] = "the tile split into three masks: stems (pale green and its mottle), bare paper (the buds), ground (dark blue)"
    shima.save(a, OUT / "textures" / "tile.jpg", quality=95)
    T["tile.jpg"] = "the one repeating tile, untouched: scan columns %d to %d, turned the way up the website shows it" % (shima.X0, shima.X0 + shima.PERIOD)
    M["texture_files"] = T

    # ---- clips to look at
    Image.fromarray(a.astype(np.uint8)).resize((W // 3, H // 3), Image.LANCZOS).save(OUT / "clips" / "00-tile-overview.jpg", quality=90)
    shima.save(zoom(a, (best[2], best[1] + 200, 150, 150), 6), OUT / "clips" / "01-zoom6x-ground.png")
    s0 = max(stems, key=lambda s: len(s["line"]))
    ys, cx, wd, ok, smooth = s0["_rows"]
    i = np.nonzero(ok)[0][len(np.nonzero(ok)[0]) // 2]
    shima.save(zoom(a, (int(cx[i]) - 60, int(ys[i]) - 75, 120, 150), 6), OUT / "clips" / "02-zoom6x-stem-mottle-and-edges.png")
    b0 = sorted(buds, key=lambda b: b["y"])[5]
    shima.save(zoom(a, (int(b0["x"]) - 90, int(b0["y"]) - 100, 180, 200), 5), OUT / "clips" / "03-zoom5x-bud-paper-and-band.png")
    forks = [s for s in stems if "parent" in s]
    cells = []
    for s in forks:
        px = s["x"] - s["reach"] * (1 if s["side"] == "right" else -1)
        xc, yc = int((px + s["x"]) / 2), min(int(s["join_y"]) - 120, H - 261)
        cells.append(a[max(yc - 260, 0):max(yc - 260, 0) + 520, np.clip(xc - 170, 0, W - 340):np.clip(xc - 170, 0, W - 340) + 340])
    sheet = np.full((520, 350 * len(cells) - 10, 3), 255, np.float32)
    for k, c in enumerate(cells):
        sheet[:c.shape[0], k * 350:k * 350 + c.shape[1]] = c
    shima.save(sheet, OUT / "clips" / "04-all-forks.jpg", quality=92)
    tips = []
    for s in stems:
        ys, cx, wd, ok, smooth = s["_rows"]
        if s["top"] == "tip":
            tips.append(("top", a[max(ys[0] - 40, 0):ys[0] + 200, int(cx[0]) - 45:int(cx[0]) + 45]))
        if s["bottom"] == "tip":
            tips.append(("bottom", a[ys[-1] - 200:ys[-1] + 40, int(cx[-1]) - 45:int(cx[-1]) + 45]))
    for kind in ("top", "bottom"):
        sel = [t for k, t in tips if k == kind and t.shape[:2] == (240, 90)]
        sheet = np.full((240, 96 * len(sel) - 6, 3), 255, np.float32)
        for k, t in enumerate(sel):
            sheet[:, k * 96:k * 96 + 90] = t
        shima.save(sheet, OUT / "clips" / f"05-{kind}-ends.jpg" if kind == "top" else OUT / "clips" / "06-bottom-ends.jpg", quality=92)
    # the texture files side by side at scan size
    cat = np.full((600, 600 + 10 + 400 + 10 + 300, 3), 255, np.float32)
    cat[:, :600] = np.tile(gt, (2, 2, 1))[gt.shape[0] - 300:gt.shape[0] + 300, gt.shape[1] - 300:gt.shape[1] + 300]  # across the wrap, to show the joins
    for k, name in enumerate(("thin", "middling", "thick")):
        t = np.asarray(Image.open(OUT / "textures" / f"stem-fill-{name}.png").convert("RGB")).astype(np.float32)
        cat[:, 610 + k * 135:610 + k * 135 + 130] = np.tile(t, (3, 1, 1))[:600, :130]
    cat[:, 1020:1320] = np.tile(pt, (5, 4, 1))[:600, :300]
    shima.save(cat, OUT / "clips" / "07-texture-files.png")

    for s in stems:
        s.pop("_rows", None)
    (OUT / "measurements.json").write_text(json.dumps(M, indent=1))
    print(json.dumps({k: v for k, v in M.items() if k != "texture_files"}, indent=1))
    print(json.dumps(T, indent=1))


if __name__ == "__main__":
    main()
