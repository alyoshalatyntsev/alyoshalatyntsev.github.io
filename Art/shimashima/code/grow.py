"""Make a new layout in the manner of the print, from the habits in rules.json.

    python code/grow.py [--seed 1] [--width 1344] [--height 2688] [--forks 0.33] [--hooks 1] [--buds 1.0] [out.json]   ->  layout-grown-<seed>.json
    python code/draw.py layout-grown-1.json

The result is an ordinary layout file: edit it by hand before drawing. It repeats both across and down.
"""
import json
import pathlib
import sys

import numpy as np
from scipy.ndimage import gaussian_filter1d

from draw import branch_x

HERE = pathlib.Path(__file__).parent.parent


def opt(name, default):
    return type(default)(sys.argv[sys.argv.index(name) + 1]) if name in sys.argv else default


def grow(seed, W, H, forks=None, hooks=None, bud_share=1.0, apart=False):
    """forks: the share of stem feet that join a neighbour (the print's is a third). hooks: how many short twigs.
    bud_share: how many buds, as a multiple of the print's. apart: for animation. Lanes joined by a fork make one
    group, each stem is marked with its group, and no bud or twig reaches towards a lane of another group, so
    that every group can slide up the page at its own speed without touching the others."""
    R = json.loads((HERE / "rules.json").read_text())
    rng = np.random.default_rng(seed)
    pick = lambda pool: float(rng.choice(pool)) * rng.uniform(0.92, 1.08)

    # lanes across the tile, spaced as on the print and stretched to fill the width exactly
    gaps = []
    while sum(gaps) < W - 60:
        gaps.append(pick(R["lanes"]["spacing_px"]))
    gaps = np.maximum(np.array(gaps) * W / sum(gaps), min(R["lanes"]["spacing_px"]))  # stretched to fit, but never closer than the print's closest pair
    xs = np.cumsum(gaps * W / gaps.sum())
    xs = xs - xs[0] + rng.uniform(40, 120)

    # each lane is filled, head to foot, with stems parted by short gaps; now and then a long blank instead
    lengths = R["stem_length_px"]["whole_stems"] + [v for v in R["stem_length_px"]["cut_by_the_tile_edge_at_least"] if v > 1500]
    stems, lanes = [], []
    for li, x in enumerate(xs):
        y, start, mine = rng.uniform(0, H), None, []
        start = y
        while y - start < H - 200:
            blank = rng.random() < 0.3
            y += rng.uniform(380, 900) if blank else pick(R["gap_between_stems_in_a_lane_px"])
            room = start + H - y - 70
            if room < 500:
                break
            length = min(pick(lengths), room)
            foot = pick(R["width_px"]["at_foot"])
            s = {"id": len(stems), "x": round(float(x), 1), "lean": 0.0, "y_top": int(y), "y_bottom": int(y + length), "top": "tip", "bottom": "tip",
                 "width": round(foot, 1), "width_top": round(max(13.0, foot - pick(R["width_px"]["narrowing_per_1000px"]) * length / 1000), 1), "lane": li}
            stems.append(s)
            mine.append(s)
            y += length
        lanes.append(mine)

    def covers(s, y, margin=0):
        """The copy of height y (in the repeating tile) that falls inside stem s, or None."""
        for k in (-2, -1, 0, 1, 2):
            if s["y_top"] + margin <= y + k * H <= s["y_bottom"] - margin:
                return y + k * H
        return None

    # about a third of the feet join the neighbouring lane's stem instead of ending free
    f = R["foot"]
    carries = set()  # stems that already carry a branch stay where they are
    for li, lane in enumerate(lanes):
        for s in lane:
            if s["id"] in carries or rng.random() > (f["joins_a_neighbour"] / (f["joins_a_neighbour"] + f["free"]) if forks is None else forks):
                continue
            for side, lj in rng.permutation([("right", (li - 1) % len(lanes)), ("left", (li + 1) % len(lanes))]).tolist():
                lj = int(lj)
                reach = (s["x"] - xs[lj]) % W if side == "right" else (xs[lj] - s["x"]) % W
                if not 95 <= reach <= 215:
                    continue
                for p in lanes[lj]:
                    at = covers(p, s["y_bottom"], 150)
                    if at is not None and "parent" not in p:
                        shift = at - s["y_bottom"]
                        angle = pick(R["forks"]["angle_deg"])
                        radius = min(pick(R["forks"]["radius_px"]), 0.98 * reach / (1 - np.cos(np.radians(angle))))
                        s.update(y_top=int(s["y_top"] + shift), y_bottom=int(at), bottom="join", parent=p["id"], side=side, join_y=int(at),
                                 reach=round(float(reach), 1), angle=round(angle), radius=round(radius))
                        del s["x"], s["lean"]
                        carries.add(p["id"])
                        break
                if "parent" in s:
                    break

    # lanes joined by a fork hang together
    group = list(range(len(lanes)))
    for s in stems:
        if "parent" in s:
            a, b = group[s["lane"]], group[stems[s["parent"]]["lane"]]
            group = [a if g == b else g for g in group]
    # a hook or two: a short branch that ends before it has turned upright
    twig_boxes = []
    for _ in range(max(1, round(W * H / (1344 * 4248))) if hooks is None else hooks):
        for _ in range(40):
            p = stems[int(rng.integers(len(stems)))]
            if "parent" in p or p["y_bottom"] - p["y_top"] < 700:
                continue
            y = rng.uniform(p["y_top"] + 300, p["y_bottom"] - 200)
            side = rng.choice(["left", "right"])
            li = p["lane"]
            lj = (li - 1) % len(lanes) if side == "left" else (li + 1) % len(lanes)
            free = (p["x"] - xs[lj]) % W if side == "left" else (xs[lj] - p["x"]) % W
            tall, angle, reach = rng.uniform(130, 230), round(rng.uniform(50, 68)), 189.0 * rng.uniform(0.75, 1.0)
            spread = abs(float(branch_x(y - tall, 0.0, reach, y, 300, angle)))  # how far sideways its tip gets
            if free < spread + 60 and (apart and group[lj] != group[li] or any(covers(q, y - k, -60) is not None for q in lanes[lj] for k in (0, tall / 2, tall))):
                continue
            if any(t.get("parent") == p["id"] and abs(t["join_y"] - y) < 350 for t in stems):
                continue
            tip = p["x"] + spread * (-1 if side == "left" else 1)
            box = (min(p["x"], tip) - 40, max(p["x"], tip) + 40, y - tall - 40, y + 40)
            if any(box[0] < b[1] and b[0] < box[1] and box[2] < b[3] and b[2] < box[3] for b in twig_boxes):  # two twigs must not cross
                continue
            twig_boxes.append(box)
            stems.append({"id": len(stems), "y_top": int(y - tall), "y_bottom": int(y), "top": "tip", "bottom": "join", "width": 31.0, "width_top": 31.0,
                          "parent": p["id"], "side": str(side), "join_y": int(y), "reach": round(reach, 1), "angle": angle, "radius": 300, "lane": None})
            break

    # buds: spaced along the stems, sitting to one side and leaning away, never crowding a neighbour
    B, buds, spots = R["buds"], [], []
    by_id = {s["id"]: s for s in stems}

    def x_of(s):
        return s["x"] if "x" in s else (x_of(by_id[s["parent"]]) + s["reach"] * (1 if s["side"] == "right" else -1)) % W

    def try_bud(s, y, side=None, only=False):
        if s["lane"] is None:
            return
        side = side or ("left" if rng.random() < B["side"]["left"] / B["count"] else "right")
        for sd in ((side,) if only else (side, "left" if side == "right" else "right")):
            sign = -1 if sd == "left" else 1
            lj = (s["lane"] + sign) % len(lanes)
            room = (xs[lj] - xs[s["lane"]]) * sign % W
            other = apart and group[lj] != group[s["lane"]]  # that lane will be sliding past: keep clear of it at every height
            crowded = room < (125 if other else 105) and (other or any(covers(q, y, -70) is not None for q in lanes[lj]))
            px, py = (x_of(s) + sign * 20) % W, y % H
            close = any(np.hypot(min(abs(px - a), W - abs(px - a)), min(abs(py - b), H - abs(py - b))) < B["nearest_other_bud_px"]["min"] for a, b in spots)
            if crowded or close:
                continue
            length = pick(B["length_px"])
            width = length * pick(B["width_over_length"])
            off = min(pick(B["centre_off_the_stem_px"]), width / 2 + 4)  # never so far out that it lets go of the stem
            buds.append({"stem": s["id"], "y": int(y), "side": sd, "offset": round(sign * off, 1),
                         "tilt": round(sign * pick(B["leans_away_from_stem_deg"])), "length": round(length), "width": round(width),
                         "shape": int(rng.choice(B["whole_shapes"]))})
            spots.append((px, py))
            return

    for s in stems:  # at some forks a bud sits on the parent just above the join, on the far side from the branch
        if "parent" in s and rng.random() < B["sitting_at_a_fork"] / B["forks"]:
            try_bud(by_id[s["parent"]], s["join_y"] - rng.uniform(30, 80), "left" if s["side"] == "right" else "right", only=True)  # never on the branch's own side: it would sit on the fork and show all green
    for s in stems:
        top = s["y_top"] if "parent" not in s else s["y_top"]
        y = top + rng.uniform(60, B["stem_px_per_bud"] / bud_share)
        foot = s["y_bottom"] - (260 if "parent" in s else 60)
        while y < foot:
            try_bud(s, y)
            y += B["stem_px_per_bud"] / bud_share * rng.uniform(0.45, 1.5)
    # no stem is ruled: each gets a course of slow bends and swellings of the size the print's stems have
    C = R["stem_course"]
    for s in stems:
        if apart:
            s["group"] = int(group[s["lane"] if s["lane"] is not None else by_id[s["parent"]]["lane"]])
    for s in stems:
        s.pop("lane")
        top, foot = s["y_top"], s.get("join_y", s["y_bottom"])
        if foot - top < 250:
            continue
        ys = np.arange(top, foot + 1, 100.0)
        def wave(sd):  # a slow, smooth wander of the given size; nothing sharp enough to read as a kink
            v = gaussian_filter1d(rng.normal(size=len(ys) + 24), 4)[12:-12]
            return v / (v.std() + 1e-9) * min(sd, 3.0)
        t = (ys - top) / (foot - top)
        wide = s["width_top"] * (1 - t) + s["width"] * t + wave(pick(C["width_about_its_taper_sd_px_by_stem"]))
        s["course"] = [[int(y), round(float(d), 1), round(float(max(w, 12)), 1)] for y, d, w in zip(ys, wave(pick(C["sideways_shift_sd_px_by_stem"])), wide)]
    return {"note": "Grown by code/grow.py from rules.json (seed %d). Edit freely, then: python code/draw.py <this file>. Same fields as layout-original.json; "
                    "a stem may run past the bottom edge, and comes back in at the top." % seed,
            "tile": {"width": W, "height": H, "wrap_x": True, "wrap_y": True}, "stems": stems, "buds": buds}


if __name__ == "__main__":
    seed, W, H = opt("--seed", 1), opt("--width", 1344), opt("--height", 2688)
    names = [a for a in sys.argv[1:] if a.endswith(".json")]
    out = pathlib.Path(names[0]) if names else HERE / f"layout-grown-{seed}.json"
    layout = grow(seed, W, H, opt("--forks", -1.0) if "--forks" in sys.argv else None, opt("--hooks", 0) if "--hooks" in sys.argv else None, opt("--buds", 1.0))
    text = json.dumps(layout, indent=1)
    for key in ("stems", "buds"):  # one object per line, so the file is easy to read and edit
        text = text.replace(json.dumps(layout[key], indent=1).replace("\n", "\n "), "[\n  " + ",\n  ".join(json.dumps(o) for o in layout[key]) + "\n ]")
    out.write_text(text + "\n")
    print("wrote", out, " stems", len(layout["stems"]), " branches", sum("parent" in s for s in layout["stems"]), " buds", len(layout["buds"]))
