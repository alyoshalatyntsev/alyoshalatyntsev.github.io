"""Read the habits of the pattern off the traced layout: lanes, stem lengths, gaps, forks, buds.

    python code/rules.py   ->  rules.json

One tile is a small sample (20 stems, 6 branches, 19 buds), so these are pools of what was seen, not laws.
"""
import json

import numpy as np

import shima
from draw import centre_x

L = json.loads((shima.HERE / "layout-original.json").read_text())
W, H = L["tile"]["width"], L["tile"]["height"]
stems = {s["id"]: s for s in L["stems"]}
R = {"sample": {"tile_px": [W, H], "stems": len(stems), "branches": sum("parent" in s for s in stems.values()), "buds": len(L["buds"])}}


def stands_at(s):
    plain = {k: v for k, v in s.items() if k != "course"}  # where its lane is, not where a slow bend has carried its head
    return s["x"] if "parent" not in s else float(centre_x(plain, stems, s["y_top"]))


# lanes: upright stems share a small number of vertical lines
upright = [s for s in stems.values() if not ("parent" in s and (s["top"] == "merge" or s["y_bottom"] - s["y_top"] < 300))]
lanes = []
for s in sorted(upright, key=stands_at):
    x = stands_at(s)
    if lanes and x - np.mean([stands_at(t) for t in lanes[-1]]) < 45:
        lanes[-1].append(s)
    else:
        lanes.append([s])
xs = [float(np.mean([stands_at(t) for t in lane])) for lane in lanes]
R["lanes"] = {"x": [round(x) for x in xs], "spacing_px": [round(b - a) for a, b in zip(xs, xs[1:] + [xs[0] + W])],
              "stems_in_each": [[t["id"] for t in sorted(lane, key=lambda t: t["y_top"])] for lane in lanes]}
gaps, blanks = [], []
for lane in lanes:
    seq = sorted(lane, key=lambda t: t["y_top"])
    for a, b in zip(seq, seq[1:]):
        g = b["y_top"] - a["y_bottom"]
        (gaps if g < 150 else blanks).append(int(g))
    if seq[0]["top"] == "tip":
        blanks.append(int(seq[0]["y_top"]))  # at least this much empty above
R["gap_between_stems_in_a_lane_px"] = sorted(gaps)
R["longer_blanks_in_a_lane_px_at_least"] = sorted(blanks)
whole = [s for s in upright if s["top"] != "edge" and s["bottom"] != "edge"]
R["stem_length_px"] = {"whole_stems": sorted(int(s.get("join_y", s["y_bottom"]) - s["y_top"]) for s in whole),
                       "cut_by_the_tile_edge_at_least": sorted(int(s["y_bottom"] - s["y_top"]) for s in upright if s not in whole)}
R["foot"] = {"free": sum(s["bottom"] == "tip" for s in upright), "joins_a_neighbour": sum(s["bottom"] == "join" for s in upright), "cut_by_edge": sum(s["bottom"] == "edge" for s in upright)}
R["width_px"] = {"at_foot": sorted(round(s["width"]) for s in upright), "at_head": sorted(round(s["width_top"]) for s in upright),
                 "narrowing_per_1000px": sorted(round((s["width"] - s["width_top"]) / max(s.get("join_y", s["y_bottom"]) - s["y_top"], 1) * 1000, 1) for s in upright)}
forks = [s for s in stems.values() if "parent" in s]
R["forks"] = {"count": len(forks), "side": {k: sum(s["side"] == k for s in forks) for k in ("left", "right")},
              "reach_px": sorted(s["reach"] for s in forks), "angle_deg": sorted(s["angle"] for s in forks), "radius_px": sorted(s["radius"] for s in forks),
              "each": [{k: s[k] for k in ("id", "parent", "side", "reach", "angle", "radius")} | {"kind": "merges into a neighbour" if s["top"] == "merge" else "hook" if s["y_bottom"] - s["y_top"] < 300 else "branch"} for s in forks]}
buds = L["buds"]
total = sum(s.get("join_y", s["y_bottom"]) - s["y_top"] for s in stems.values())
out = [b["tilt"] * (1 if b["side"] == "right" else -1) for b in buds]
per_stem = {}
for b in buds:
    per_stem.setdefault(b["stem"], []).append(b["y"])
steps = sorted(int(b - a) for ys in per_stem.values() for a, b in zip(sorted(ys), sorted(ys)[1:]))
pos = np.array([[float(centre_x(stems[b["stem"]], stems, b["y"])) + b["offset"], b["y"]] for b in buds])
near = [float(np.sort(np.hypot(*(pos - p).T))[1]) for p in pos]
joins = [(s["parent"], s["join_y"], s["side"]) for s in forks]
at_fork = [b for b in buds if any(b["stem"] == p and -160 < b["y"] - j < 40 for p, j, _ in joins)]
whole = [k for k, sh in enumerate(json.loads((shima.HERE / "textures" / "bud-shapes.json").read_text())["shapes"]) if sh["whole"]]  # not cut by the tile's edge
R["buds"] = {"count": len(buds), "stem_px_per_bud": round(total / len(buds)), "side": {k: sum(b["side"] == k for b in buds) for k in ("left", "right")},
             "step_to_next_on_same_stem_px": steps, "nearest_other_bud_px": {"min": round(min(near)), "median": round(float(np.median(near)))},
             "centre_off_the_stem_px": sorted(round(abs(b["offset"])) for b in buds), "leans_away_from_stem_deg": sorted(out),
             "length_px": sorted(b["length"] for b in buds if b["shape"] in whole), "width_over_length": sorted(round(b["width"] / b["length"], 2) for b in buds if b["shape"] in whole),
             "length_against_height_on_page_correlation": round(float(np.corrcoef([b["y"] for b in buds], [b["length"] for b in buds])[0, 1]), 2),
             "sitting_at_a_fork": len(at_fork), "forks": len(forks),
             "whole_shapes": whole}
courses = [np.asarray(s["course"], float) for s in stems.values() if s.get("course")]
courses = [c for c in courses if len(c) > 4]
R["stem_course"] = {"sideways_shift_sd_px_by_stem": sorted(round(float(c[:, 1].std()), 1) for c in courses), "largest_shift_px": round(float(max(np.abs(c[:, 1]).max() for c in courses)), 1),
                    "width_about_its_taper_sd_px_by_stem": sorted(round(float((c[:, 2] - np.polyval(np.polyfit(c[:, 0], c[:, 2], 1), c[:, 0])).std()), 1) for c in courses)}
R["cover"] = {"stem_px_per_tile": int(total), "stem_length_per_area_px_per_1000px2": round(total / (W * H) * 1000, 2)}
(shima.HERE / "rules.json").write_text(json.dumps(R, indent=1))
print(json.dumps(R, indent=1))
