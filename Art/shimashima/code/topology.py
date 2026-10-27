"""Read the topology off the scan: which stems there are, where each forks from its parent, where the buds sit.

    python code/topology.py   ->  layout-original.json, traced.json, clips/10-topology-overlay.jpg

The stems are close to vertical everywhere, so each row of the stem mask is cut into runs and the runs are linked
row to row. Where two runs become one (going down the page) a branch joins its parent. Each branch's curve is then
fitted with three numbers (reach, angle, radius) and each bud with an ellipse, and that is the layout.
"""
import json

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

import shima
from draw import branch_x, branch_upright_from, centre_x, width_at  # the same curve the renderer draws, so the fit and the drawing agree

SPUR = 14  # traces shorter than this that end in the open are bumps on an edge, not stems


def fit_ellipse(x, y):
    """Least-squares ellipse through points (Fitzgibbon's direct fit). Returns centre, semi-axes, tilt of the long axis."""
    mx, my = x.mean(), y.mean()
    x, y = x - mx, y - my
    D = np.vstack([x * x, x * y, y * y, x, y, np.ones_like(x)]).T
    S = D.T @ D
    C = np.zeros((6, 6))
    C[0, 2] = C[2, 0] = 2
    C[1, 1] = -1
    val, vec = np.linalg.eig(np.linalg.solve(S, C))
    A, B, Cc, Dd, E, F = np.real(vec[:, np.argmax(np.real(val))])
    M = np.array([[A, B / 2], [B / 2, Cc]])
    cx, cy = np.linalg.solve(2 * M, [-Dd, -E])
    k = -(F + Dd * cx / 2 + E * cy / 2)
    ev, evec = np.linalg.eigh(M / k)
    semi = 1 / np.sqrt(ev)  # ev ascending, so semi[0] is the long one
    long_axis = evec[:, 0] if evec[1, 0] < 0 else -evec[:, 0]  # pointing up the page
    return cx + mx, cy + my, semi[0], semi[1], np.degrees(np.arctan2(long_axis[0], -long_axis[1]))


def find_buds(ink, paper):
    """A bud is an oval of bare paper with the stem's pale band running through it. The oval is fitted to the
    part of its outline where paper meets the blue ground, which the stem does not disturb."""
    ground_near = ndi.binary_dilation(~ink, shima.disc(9))
    edge = paper & ~ndi.binary_erosion(paper) & ground_near
    groups, n = ndi.label(ndi.binary_dilation(paper, shima.disc(18)))  # a band down the middle splits a bud's paper in two
    buds = []
    for i in range(1, n + 1):
        ys, xs = np.nonzero(edge & (groups == i))
        if len(xs) < 40:
            continue
        cx, cy, a, b, tilt = fit_ellipse(xs.astype(float), ys.astype(float))
        py, px = np.nonzero(paper & (groups == i))
        buds.append({"x": cx, "y": cy, "length": 2 * a, "width": 2 * b, "tilt": tilt, "paper_x": px.mean(), "paper_area": len(px)})
    return buds


def refine_bud(a, b, paper, bins=144):
    """The bud as the print has it: the patch with no blue ink on it, white paper and clean green together. Its
    outline is then visible all the way round, across the stem too, where clean green meets the mottled stem.
    Returns its centre, size and tilt (from its moments) and the outline as the distance to the edge in each of
    `bins` directions, as a share of the oval's own (1 = on the oval), starting on the side away from the stem."""
    H, W, _ = a.shape
    r = int(b["length"] / 2 + 45)
    x0, y0, x1, y1 = max(int(b["x"]) - r, 0), max(int(b["y"]) - r, 0), min(int(b["x"]) + r, W), min(int(b["y"]) + r, H)
    img = a[y0:y1, x0:x1]
    cover = np.clip((img[..., 2] - img[..., 0] + 3) / 89, -0.3, 1.3)  # blue ink: 0 on paper and clean green, 1 on the ground
    fine, broad = ndi.gaussian_filter(cover, 1.0), ndi.gaussian_filter(cover, 3.0)
    motif, clean = fine < 0.5, broad < 0.23
    rim = ndi.binary_dilation(clean, shima.disc(4)) & ndi.binary_dilation(~motif, shima.disc(4))  # the soft edge against the ground
    region = ndi.binary_opening(motif & (clean | rim), shima.disc(2))
    yy, xx = np.mgrid[y0:y1, x0:x1]
    th = np.radians(b["tilt"])
    u, v = (xx - b["x"]) * np.cos(th) + (yy - b["y"]) * np.sin(th), -(xx - b["x"]) * np.sin(th) + (yy - b["y"]) * np.cos(th)
    region &= np.hypot(u / (b["width"] / 2 * 1.9), v / (b["length"] / 2 * 1.35)) < 1  # not off along a clean stretch of stem
    lab, n = ndi.label(region)
    votes = ndi.sum(paper[y0:y1, x0:x1], lab, range(1, n + 1))
    region = ndi.binary_fill_holes(lab == 1 + int(np.argmax(votes)))
    ys, xs = np.nonzero(region)
    cx, cy = xs.mean() + x0, ys.mean() + y0
    val, vec = np.linalg.eigh(np.cov(np.vstack([xs + x0 - cx, ys + y0 - cy])))
    long_axis = vec[:, 1] if vec[1, 1] < 0 else -vec[:, 1]  # pointing up the page
    tilt = np.degrees(np.arctan2(long_axis[0], -long_axis[1]))
    la, sa = 2 * np.sqrt(val[1]), 2 * np.sqrt(val[0])  # the oval with the same spread
    sign = 1 if b["side"] == "right" else -1
    th = np.radians(tilt)
    t = (np.arange(bins) + 0.5) / bins * 2 * np.pi
    steps = np.arange(0.2, 1.9, 0.004)
    uu, vv = sa * np.cos(t)[:, None] * steps[None, :] * sign, la * np.sin(t)[:, None] * steps[None, :]
    px = np.rint(cx + uu * np.cos(th) - vv * np.sin(th)).astype(int) - x0
    py = np.rint(cy + uu * np.sin(th) + vv * np.cos(th)).astype(int) - y0
    inside = (px >= 0) & (px < x1 - x0) & (py >= 0) & (py < y1 - y0)
    inside[inside] = region[py[inside], px[inside]]
    out = steps[np.argmax(~inside, axis=1)] - 0.002  # the first step that is off the bud
    out = ndi.gaussian_filter1d(out, 0.8, mode="wrap")
    # Where the stem's green runs through the bud, row by row over the bud's middle: its two edges, and whether
    # each is a real edge against white or only where the bud itself stops.
    soft = ndi.gaussian_filter(img, (1.2, 1.2, 0))
    green = region & ((soft[..., 1] - soft[..., 0]) - 0.55 * (soft[..., 2] - soft[..., 0]) >= 15)  # about 2 on paper, 31 on green
    band = []
    for yr in range(int(cy - 0.45 * la) - y0, int(cy + 0.45 * la) - y0 + 1):
        if not 0 <= yr < green.shape[0] or not green[yr].any():
            continue
        d = np.diff(np.concatenate(([0], green[yr].astype(np.int8), [0])))
        runs = max(zip(np.nonzero(d == 1)[0], np.nonzero(d == -1)[0]), key=lambda r: r[1] - r[0])
        white = region[yr] & ~green[yr]
        band.append((runs[0] + x0, runs[1] + x0, bool(white[max(runs[0] - 4, 0):runs[0]].any()), bool(white[runs[1]:runs[1] + 4].any())))
    band = np.array(band, float) if band else np.zeros((0, 4))
    return {"band": band, "x": float(cx), "y": float(cy), "length": float(2 * la), "width": float(2 * sa), "tilt": float(tilt), "area": int(region.sum()),
            "outline": [round(float(v), 3) for v in out], "whole": bool(y0 > 0 and y1 < H and ys.min() > 0 and ys.max() < y1 - y0 - 1)}


def trace(stem):
    traces, active = [], {}
    for y in range(stem.shape[0]):
        d = np.diff(np.concatenate(([0], stem[y].astype(np.int8), [0])))
        runs = list(zip(np.nonzero(d == 1)[0].tolist(), np.nonzero(d == -1)[0].tolist()))
        parents = [[t for t, (u, v) in active.items() if p < v and u < q] for p, q in runs]
        kids = {t: sum(t in ps for ps in parents) for t in active}
        now = {}
        for run, ps in zip(runs, parents):
            if len(ps) == 1 and kids[ps[0]] == 1:
                t = ps[0]
            else:
                t = len(traces)
                traces.append({"rows": [], "up": ps, "down": []})
                for p in ps:
                    traces[p]["down"].append(t)
            traces[t]["rows"].append((y, *run))
            now[t] = run
        active = now
    return traces


def simplify(traces):
    """Drop spurs, then weld traces that are left meeting end to end."""
    alive = set(range(len(traces)))
    changed = True
    while changed:
        changed = False
        for t in list(alive):
            tr = traces[t]
            if len(tr["rows"]) < SPUR and bool(tr["up"]) != bool(tr["down"]):
                for o in tr["up"]:
                    traces[o]["down"].remove(t)
                for o in tr["down"]:
                    traces[o]["up"].remove(t)
                alive.discard(t)
                changed = True
        for t in list(alive):
            tr = traces[t]
            if t in alive and len(tr["down"]) == 1 and traces[tr["down"][0]]["up"] == [t]:
                o = tr["down"][0]
                tr["rows"] += traces[o]["rows"]
                tr["down"] = traces[o]["down"]
                for q in tr["down"]:
                    traces[q]["up"] = [t if v == o else v for v in traces[q]["up"]]
                alive.discard(o)
                changed = True
    return alive


def centre(rows, lo, hi):
    part = rows[lo:hi] or rows
    return float(np.median([(a + b) / 2 for _, a, b in part]))


def fit_branch(ys, cx, parent_x, node_y, hook, reach_known=None):
    """Fit the curve of a branch leaving its parent: where it joins, how far it reaches sideways, the angle it
    leaves at and the radius of the turn that brings it upright. This first fit follows the traced centre line."""
    use = ys > node_y - 700
    ys, cx = ys[use], cx[use]
    far = cx[ys < node_y - 350]
    reaches = [np.median(far) - parent_x] if len(far) > 30 and not hook else (cx[0] - parent_x) * np.linspace(1.0, 2.0, 11)
    if reach_known is not None:  # it runs into another stem, so it ends where that stem stands
        reaches = [reach_known]
    best = None
    for reach in reaches:
        for angle in range(20, 86, 5):
            for radius in (20, 30, 40, 50, 60, 80, 100, 125, 150, 200, 250, 300, 400, 500, 650, 800):
                if radius * (1 - np.cos(np.radians(angle))) > abs(reach):
                    continue
                for join in range(node_y, node_y + 200, 4):
                    err = np.mean((branch_x(ys, parent_x, reach, join, radius, angle) - cx) ** 2)
                    if best is None or err < best[0]:
                        best = (err, reach, angle, join, radius)
    return best


def refit_fork(ink, parent_x, half_parent, half_own, node_y, y_top, first, free_reach):
    """Improve a fork's fit against the shape itself. Below the row where branch and parent merge there is no
    centre line to follow, so the first fit is blind to how the branch runs into its parent; here each candidate
    curve is drawn as a plain stroke beside the parent and scored by how well the pair covers the scan's motif."""
    H, W = ink.shape
    x0, x1, y0, y1 = max(int(parent_x) - 240, 0), min(int(parent_x) + 240, W), max(node_y - 240, y_top, 0), min(node_y + 110, H)
    truth = ink[y0:y1, x0:x1]
    yy, xx = np.mgrid[y0:y1, x0:x1].astype(np.float32)
    rows = np.arange(y0, y1, dtype=float)
    parent = np.abs(xx - parent_x) <= half_parent
    reach0, angle0, join0, radius0 = first
    best = None
    for reach in (reach0 * np.linspace(0.8, 1.25, 7) if free_reach else [reach0]):
        for angle in range(max(20, angle0 - 25), min(88, angle0 + 26), 5):
            for radius in (20, 30, 40, 50, 60, 80, 100, 125, 150, 200, 250, 300, 400, 500, 650, 800):
                if radius * (1 - np.cos(np.radians(angle))) > abs(reach):
                    continue
                for join in range(node_y - 10, node_y + 140, 6):
                    line = branch_x(rows, parent_x, reach, join, radius, angle)
                    half = half_own * np.hypot(1, np.gradient(line))  # a slanting stroke is wider across the page
                    model = parent | ((np.abs(xx - line[:, None]) <= half[:, None]) & (yy <= join))
                    score = (model & truth).sum() / (model | truth).sum()
                    if best is None or score > best[0]:
                        best = (score, reach, angle, join, radius)
    return best


def main():
    a = shima.load_tile()
    H, W, _ = a.shape
    ink, paper = shima.masks(a)
    buds = find_buds(ink, paper)
    (shima.HERE / "textures").mkdir(exist_ok=True)
    in_bud = np.zeros_like(ink)
    yy, xx = np.mgrid[:H, :W]
    for b in buds:
        in_bud |= np.hypot(xx - b["x"], yy - b["y"]) < b["length"] / 2 + 6
    stem = shima.drop_small(ndi.binary_opening(ink & ~ndi.binary_dilation(paper, shima.disc(5)), shima.disc(2)), 200)
    traces = trace(stem)
    alive = simplify(traces)

    # Going up the page, a trace with two above it forks: the one that carries straight on is the same stem, the
    # other is a branch. A trace with two below it is a branch that runs into another stem and merges with it.
    stem_of, stems = {}, []
    for t in sorted(alive, key=lambda t: -traces[t]["rows"][-1][0]):  # from the bottom of the page up
        if t in stem_of:
            continue
        chain, cur, merges = [t], t, None
        while traces[cur]["up"]:
            below = centre(traces[cur]["rows"], 60, 160)
            nxt = min(traces[cur]["up"], key=lambda u: abs(centre(traces[u]["rows"], -260, -120) - below))
            if nxt in stem_of:
                merges = stem_of[nxt]
                break
            chain.append(nxt)
            cur = nxt
        for c in chain:
            stem_of[c] = len(stems)
        stems.append({"chain": chain, "merges": merges})
    out = []
    for s, st in enumerate(stems):
        rows = sorted((r for c in st["chain"] for r in traces[c]["rows"]), key=lambda r: r[0])
        down = traces[st["chain"][0]]["down"]
        ys = np.array([r[0] for r in rows])
        cx = np.array([(r[1] + r[2]) / 2 for r in rows])
        wd = np.array([r[2] - r[1] for r in rows])
        out.append({"id": s, "ys": ys, "cx": cx, "wd": wd, "parent": stem_of[down[0]] if down else None, "merges": st["merges"]})
    by_id = {r["id"]: r for r in out}
    for r in out:
        ys, cx, wd = r["ys"], r["cx"], r["wd"]
        r["y_top"], r["y_bottom"] = int(ys[0]), int(ys[-1])
        r["top"] = "edge" if ys[0] < 4 else "merge" if r["merges"] is not None else "tip"
        r["bottom"] = "edge" if ys[-1] > H - 5 else "tip"
        clear = ~in_bud[ys, np.clip(cx.astype(int), 0, W - 1)]
        straight = np.ones(len(ys), bool)
        if r["parent"] is not None:
            p = by_id[r["parent"]]
            node = int(ys[-1])
            below = (p["ys"] > node + 80) & (p["ys"] < node + 260)
            above = (p["ys"] < node - 200) & (p["ys"] > node - 500)
            parent_x = float(np.median(p["cx"][below])) if below.sum() > 20 else float(np.median(p["cx"][above]))
            hook = len(ys) < 300 and r["merges"] is None
            into = by_id[r["merges"]] if r["merges"] is not None else None
            err, reach, angle, join, radius = fit_branch(ys, cx, parent_x, node, hook, None if into is None else into["x"] - parent_x)
            near = (p["ys"] > node - 400) & (p["ys"] < node + 400)
            own = wd / np.hypot(1, np.gradient(ndi.uniform_filter1d(cx, 15)))
            r["first_fit"] = [round(float(reach), 1), int(angle), int(join), int(radius)]
            if into is None:  # a branch that merges into another stem is pinned at both ends already
                score, reach, angle, join, radius = refit_fork(ink & ~in_bud, parent_x, float(np.percentile(p["wd"][near], 30)) / 2, float(np.median(own)) / 2,
                                                               node, int(ys[0]) if hook else 0, (reach, int(angle), int(join), int(radius)), hook)
                r["shape_fit_overlap"] = round(float(score), 3)
            r.update(bottom="join", join_y=int(join), radius=int(radius), angle=int(angle), side="left" if reach < 0 else "right", reach=round(abs(float(reach)), 1),
                     fit_rms=round(float(np.sqrt(err)), 2), parent_x=parent_x)
            upright = branch_upright_from(reach, join, radius, angle)
            straight = ys < upright
            r["x"] = parent_x + float(reach)  # where it ends up; the layout leaves this out, since it follows from the parent
            if r["merges"] is not None:  # the arc runs into another stem: that stem owns everything above
                r["y_top"] = int(upright)
        if r["parent"] is None:  # a hand-cut line is never quite upright: x is where it stands at mid-height, lean how far it drifts
            sel = clear & (ys > ys[0] + 30) & (ys < ys[-1] - 30) & (wd < 1.5 * np.median(wd))
            slope, icpt = np.polyfit(ys[sel], cx[sel], 1) if sel.sum() > 200 else (0.0, float(np.median(cx)))
            r["x"] = float(slope * (ys[0] + ys[-1]) / 2 + icpt)
            r["lean"] = float(slope * 1000)  # px to the right per 1000 px down the page
        # width: the stems are a little wider at the foot than at the head, so fit a straight taper away from the ends
        body = straight & clear & (ys > ys[0] + 120) & (ys < ys[-1] - 60)
        body &= wd < 1.5 * np.median(wd[body] if body.sum() else wd)  # not where a branch is joining
        if body.sum() > 80:
            slope, icpt = np.polyfit(ys[body], wd[body], 1)
            r["width"] = float(slope * ys[-1] + icpt)
            r["width_top"] = float(slope * ys[0] + icpt)
        else:  # all curve: a slanting stroke cuts a row wider than it is, so take the slant out
            lean = np.arctan(np.abs(np.gradient(ndi.uniform_filter1d(cx, 15))))
            r["width"] = r["width_top"] = float(np.median((wd * np.cos(lean))[clear] if clear.sum() > 5 else wd * np.cos(lean)))
            if r["merges"] is not None:  # too little of it stands clear to measure: take the stem it runs into
                r["width"] = r["width_top"] = by_id[r["merges"]]["width"]
    # The course of each stem: how far its real centre strays from the model's straight line or curve, and its
    # real width, every 100 px. Slow bends and swellings only; the quick ones come with the ribbons.
    ideal = {r["id"]: r for r in out}
    blue = np.clip((a[..., 2] - a[..., 0] + 3) / 89, 0, 1.3)  # blue ink: 0 on paper and clean green, 1 on the ground
    for r in sorted(out, key=lambda r: r["parent"] is not None):  # parents first: a branch hangs off its parent's course
        ys, cx, wd = r["ys"], r["cx"], r["wd"].astype(float)
        short = len(ys) < 250  # a hook: too short to smooth much, but it still swells towards its parent
        if r["merges"] is not None:
            continue
        model = centre_x(r, ideal, ys)
        true_wd = wd / np.hypot(1, np.gradient(model))  # a slanting stroke cuts a row wider than it is
        t = np.clip((ys - ys[0]) / max(ys[-1] - ys[0], 1), 0, 1)
        usual = r["width_top"] * (1 - t) + r["width"] * t  # the plain taper: rows far wider than it are where a branch joins
        good = ~in_bud[ys, np.clip(cx.astype(int), 0, W - 1)] & (true_wd < (1.7 if short else 1.3) * usual) & (true_wd > 0.5 * usual)
        good &= (ys > ys[0] + ((30 if short else 60) if r["top"] == "tip" else 0)) & (ys < ys[-1] - (60 if r["bottom"] == "tip" else 0))
        if r["parent"] is not None:  # the last rows before it merges are part parent already
            good &= ys < ys[-1] - (12 if short else 50)
        if good.sum() < (40 if short else 150):
            continue
        dx = ndi.gaussian_filter1d(np.interp(ys, ys[good], (cx - model)[good]), 25, mode="nearest")
        w = ndi.gaussian_filter1d(np.interp(ys, ys[good], true_wd[good]), 25, mode="nearest")
        ink_on = np.array([blue[y, int(c - max(h / 2 - 4, 2)):int(c + max(h / 2 - 4, 2)) + 1].mean() for y, c, h in zip(ys, cx, wd)])
        ink_on = ndi.gaussian_filter1d(np.interp(ys, ys[good], ink_on[good]), 25, mode="nearest")
        at = np.unique(np.concatenate([np.arange(ys[0], ys[-1], 100), [ys[-1]]]))
        r["course"] = [[int(y), round(float(np.interp(y, ys, dx)), 1), round(float(np.interp(y, ys, w)), 1), round(float(np.interp(y, ys, ink_on)), 2)] for y in at]
        if r["parent"] is not None:  # at the join it is on its parent's line: no sideways shift left, and its own width
            last = [v for v in r["course"] if v[0] < r["join_y"] - 5]
            r["course"] = last + [[int(r["join_y"]), 0.0, last[-1][2], last[-1][3]]]
    # buds: which stem each sits on, to which side of it the paper shows, and its real shape
    for b in buds:
        best = None
        for r in out:
            if r["ys"][0] - 60 <= b["y"] <= r.get("join_y", r["ys"][-1]) + 60:
                sx = float(centre_x(r, ideal, b["y"]))
                if best is None or abs(sx - b["x"]) < abs(best[1] - b["x"]):
                    best = (r["id"], sx)
        b["stem"], sx = best
        b["side"] = "left" if b["paper_x"] < sx else "right"
        b.update(refine_bud(a, b, paper))
        # Pin the stem's course to where its green really runs through this bud. Across a bud the trace cannot
        # see the stem, so until now its place and width there were carried over from above and below.
        st, band = ideal[b["stem"]], b.pop("band")
        if st.get("course") and len(band) > 10:
            sign = 1 if b["side"] == "right" else -1
            now_x, now_w = float(centre_x(st, ideal, b["y"])), float(width_at(st, b["y"]))
            both = (band[:, 2] > 0) & (band[:, 3] > 0)
            near = band[:, 3] > 0 if sign > 0 else band[:, 2] > 0  # the edge towards the bud's white
            if both.mean() > 0.6:
                want_w = float(np.median(band[both, 1] - band[both, 0]))
                want_x = float(np.median(band[both, 1] + band[both, 0])) / 2
            elif near.mean() > 0.6:  # only one edge shows: keep the width, move the stem so that edge is right
                want_w = now_w
                want_x = float(np.median(band[near, 1] if sign > 0 else band[near, 0])) - sign * now_w / 2
            else:
                want_w, want_x = now_w, now_x
            c = np.asarray(st["course"], float)
            here = [b["y"], float(np.interp(b["y"], c[:, 0], c[:, 1])) + want_x - now_x, want_w, float(np.interp(b["y"], c[:, 0], c[:, 3]))]
            c = np.vstack([c[np.abs(c[:, 0] - b["y"]) > 70], here])
            st["course"] = [[int(v[0]), round(float(v[1]), 1), round(float(v[2]), 1), round(float(v[3]), 2)] for v in c[np.argsort(c[:, 0])]]
            b["band_pinned"] = "both edges" if both.mean() > 0.6 else "one edge" if near.mean() > 0.6 else "no"
        b["offset"] = b["x"] - float(centre_x(ideal[b["stem"]], ideal, b["y"]))  # bud centre from the stem's centre line

    def tidy(d, keys):
        return {k: (round(d[k], 1) if isinstance(d[k], float) else d[k]) for k in keys if k in d and d[k] is not None}

    stem_keys = ("id", "x", "lean", "y_top", "y_bottom", "top", "bottom", "width", "width_top", "parent", "side", "join_y", "reach", "angle", "radius", "merges", "course")
    traced = {"tile": {"width": W, "height": H, "x0_in_scan": shima.X0},
              "stems": [dict(tidy(r, stem_keys + ("fit_rms",)), line=[[int(y), round(float(x), 1), int(w)] for y, x, w in zip(r["ys"], r["cx"], r["wd"])]) for r in out],
              "buds": [tidy(b, b.keys()) for b in buds]}
    (shima.HERE / "traced.json").write_text(json.dumps(traced))
    layout = {"note": "Edit freely, then: python code/draw.py layout-original.json. Units are pixels of the 300 dpi scan; y runs down the page. A stem stands at x (at its mid-height) and drifts lean px to the right per 1000 px down. "
                      "A bud's shape is the number of the real bud whose outline it borrows (textures/bud-shapes.json); A stem's course is a list of [y, sideways shift, width, ink]: where its real line strays from straight, how wide it really is there, and how heavily the blue lies on it (0 clean green, about 0.45 usual, 0.6 heavy); leave it out for a plain tapering stem. A stem with a parent leaves it at join_y, sets off at angle (degrees from the parent's direction) and turns upright on an arc of the given radius, ending reach to the side.",
              "tile": {"width": W, "height": H},
              "stems": [tidy(r, tuple(k for k in stem_keys if k != "x" or r["parent"] is None)) for r in out],
              "buds": [{"stem": b["stem"], "y": round(b["y"]), "side": b["side"], "offset": round(b["offset"], 1), "tilt": round(b["tilt"]),
                        "length": round(b["length"]), "width": round(b["width"]), "shape": k} for k, b in enumerate(sorted(buds, key=lambda b: b["y"]))]}
    # the outlines themselves, numbered as the buds are (down the page), for the renderer to draw any bud with
    (shima.HERE / "textures" / "bud-shapes.json").write_text(json.dumps(
        {"note": "Each real bud's outline: the distance from its centre to its edge in 144 directions, as a share of the same distance on its fitted oval (1 = on the oval). "
                 "It starts on the side away from the stem and turns towards the foot of the bud. whole is false for a bud cut by the tile's edge.",
         "shapes": [{"outline": b["outline"], "whole": b["whole"]} for b in sorted(buds, key=lambda b: b["y"])]}))
    text = json.dumps(layout, indent=1)
    for key in ("stems", "buds"):  # one object per line, so the file is easy to read and edit
        items = ",\n  ".join(json.dumps(o) for o in layout[key])
        text = text.replace(json.dumps(layout[key], indent=1).replace("\n", "\n "), "[\n  " + items + "\n ]")
    (shima.HERE / "layout-original.json").write_text(text + "\n")

    # check by eye: the scan, and the layout's own idea of it (straight stems, fitted curves, fitted ovals) over the scan
    sheet = Image.new("RGB", (2 * W + 20, H), "white")
    sheet.paste(Image.fromarray(a.astype(np.uint8)), (0, 0))
    sheet.paste(Image.fromarray((a * 0.4).astype(np.uint8)), (W + 20, 0))
    d = ImageDraw.Draw(sheet)
    pal = [(255, 110, 110), (255, 205, 70), (130, 255, 130), (255, 130, 255), (130, 225, 255), (255, 170, 100)]
    ox = W + 20
    for r in layout["stems"]:
        col = pal[r["id"] % len(pal)]
        yv = np.arange(r["y_top"], r.get("join_y", r["y_bottom"]) + 1, 4)
        xv = centre_x(ideal[r["id"]], ideal, yv)
        if "parent" in r:
            px = float(centre_x(ideal[r["parent"]], ideal, r["join_y"]))
            d.ellipse((ox + px - 18, r["join_y"] - 18, ox + px + 18, r["join_y"] + 18), outline="white", width=5)
        d.line([(ox + x, y) for x, y in zip(xv, yv)], fill=col, width=7)
        d.text((ox + xv[len(xv) // 2] + 14, yv[len(yv) // 2]), str(r["id"]), fill="white", font_size=46)
    for b in buds:
        t = (np.arange(len(b["outline"]) + 1) + 0.5) / len(b["outline"]) * 2 * np.pi
        rho = np.asarray(b["outline"] + b["outline"][:1])
        th = np.radians(b["tilt"])
        ex, ey = b["width"] / 2 * np.cos(t) * rho * (1 if b["side"] == "right" else -1), b["length"] / 2 * np.sin(t) * rho
        d.line([(ox + b["x"] + u * np.cos(th) - v * np.sin(th), b["y"] + u * np.sin(th) + v * np.cos(th)) for u, v in zip(ex, ey)], fill="white", width=5)
    sheet.resize((sheet.width // 2, sheet.height // 2), Image.LANCZOS).save(shima.HERE / "clips" / "10-topology-overlay.jpg", quality=88)

    print("tile", W, "x", H, " stems", len(out), " of which branches", sum(r["parent"] is not None for r in out), " buds", len(buds))
    for r in traced["stems"]:
        print({k: v for k, v in r.items() if k != "line"})
    for b in layout["buds"]:
        print(b)


if __name__ == "__main__":
    main()
