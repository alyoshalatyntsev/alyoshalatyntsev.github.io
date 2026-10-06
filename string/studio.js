"use strict";
(() => {
  const $ = (id) => document.getElementById(id);
  const NS = "http://www.w3.org/2000/svg";
  const STORAGE = "string-studio-v2";
  const DRAWINGS_STORAGE = "string-drawings-v1";
  let drawingId = null;
  const INK = "#000000",
    RED = "#ff0000";
  // Existing world coordinates use 0.75 TeX pt per unit. Keep saved geometry
  // unchanged while exposing exact centimetres in the grid and TikZ output.
  const CM = 72.27 / 2.54 / 0.75;
  const GRID_STEPS = [0.1, 0.2, 0.25, 0.5, 1, 2, 5];
  const TIKZ_COLOURS = {
    black: "#000000",
    darkgray: "#404040",
    gray: "#808080",
    lightgray: "#bfbfbf",
    white: "#ffffff",
    red: "#ff0000",
    orange: "#ff8000",
    yellow: "#ffff00",
    lime: "#bfff00",
    green: "#00ff00",
    cyan: "#00ffff",
    teal: "#008080",
    blue: "#0000ff",
    violet: "#800080",
    magenta: "#ff00ff",
    pink: "#ffbfbf",
    purple: "#bf0040",
    brown: "#bf8040",
    olive: "#808000",
  };
  const colourNames = new Map(
    Object.entries(TIKZ_COLOURS).map(([name, hex]) => [hex, name]),
  );
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const fmt = (n) => Number(n.toFixed(3));
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const lerp = (a, b, t) => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  });
  const cross = (a, b) => a.x * b.y - a.y * b.x;
  const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
  const svg = (tag, attrs = {}, parent) => {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs))
      if (v !== undefined) el.setAttribute(k, v);
    if (parent) parent.append(el);
    return el;
  };
  const paths = (points) =>
    points.map((p, i) => `${i ? "L" : "M"}${fmt(p.x)},${fmt(p.y)}`).join(" ");
  const tools = [
    ["select", "Select objects", "V", "M4 3l5 15 3-6 6-3z"],
    ["direct", "Edit points", "A", "M4 3l5 15 3-6 6-3z"],
    [
      "lasso",
      "Freehand select",
      "Q",
      "M7 16C-2 11 4 2 13 3s10 10 2 13c-4 2-8-2-8-5 0-2 3-3 4-1s-2 8-5 9",
    ],
    [
      "freehand",
      "Freehand",
      "B",
      "M3 19l1-5L15 3l4 4L8 18zM12 6l4 4M4 14l4 4M3 19l3-1",
    ],
    ["line", "Straight line", "L", "M4 17L18 3"],
    [
      "polyline",
      "Dot-to-dot",
      "P",
      "M3 17L7 4l7 11 5-10M3 17h.01M7 4h.01M14 15h.01M19 5h.01",
    ],
    [
      "bezier",
      "Bézier curve",
      "C",
      "M3 18C18 18 4 4 19 4M5 18h10M17 4H7M1.5 16.5h3v3h-3zM17.5 2.5h3v3h-3zM14 17v2M8 3v2",
    ],
    [
      "fill",
      "Fill bucket",
      "F",
      "M4 10l7-7 8 8-7 7zM4 10h15M11 3L8 0m12 13s-4 5 0 5 0-5 0-5",
    ],
    [
      "region",
      "Filled region (draw or click points)",
      "R",
      "M3 15l4-12 12 5-4 10zM7 8l7 3m-8 2 6 2",
    ],
    ["rectangle", "Rectangle", "U", "M3 4h16v14H3z"],
    ["ellipse", "Ellipse / node", "O", "M20 11a9 7 0 1 1-18 0 9 7 0 1 1 18 0"],
    [
      "bezier-region",
      "Curved region",
      "G",
      "M4 16C-2 5 10 2 15 5s8 15-1 14S7 20 4 16zM4 14h3v3H4zM13 3h3v3h-3z",
    ],
    ["dot", "Dot · 2pt radius", "D", "M15 11a4 4 0 1 1-8 0 4 4 0 1 1 8 0"],
    ["text", "Text / label", "T", "M4 5V3h14v2M11 3v16m-4 0h8"],
    ["crossing", "Flip a crossing", "X", "M3 3l16 16M19 3l-5 5M8 14l-5 5"],
  ];
  let model = { version: 2, objects: [], overrides: {}, nextId: 1 };
  let selected = new Set(),
    history = [],
    future = [],
    clipboard = null;
  let tool = "select",
    draft = null,
    interaction = null,
    cursor = { x: 500, y: 350 },
    shift = false,
    space = false,
    editPoints = false;
  let defaults = {
    color: INK,
    fillColor: "#008080",
    width: 2,
    style: "solid",
    arrows: "none",
    gap: 7,
    pattern: "hatch",
    opacity: 0.45,
    fontSize: 18,
  };
  let view = { x: 0, y: 0, zoom: 1 },
    dimensions = { w: 800, h: 600 },
    crossings = [],
    geometry = new Map();
  let changedTimer,
    toastTimer,
    renderQueued = false,
    textTarget = null,
    codeDirty = false;
  const canvas = $("canvas"),
    viewport = $("viewport");

  function toast(message) {
    $("toast").textContent = message;
    $("toast").classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 2600);
  }
  function selectedObjects() {
    return model.objects.filter((o) => selected.has(o.id));
  }
  function snapshot() {
    return JSON.stringify(model);
  }
  function pushHistory(before = snapshot()) {
    history.push(before);
    if (history.length > 80) history.shift();
    future = [];
  }
  function change(fn) {
    pushHistory();
    fn();
    editPoints = false;
    finishChange();
  }
  function finishChange() {
    codeDirty = false;
    persist();
    render();
    updateInspector();
    updateCode();
  }
  function persist() {
    clearTimeout(changedTimer);
    $("save-state").textContent = "Saving…";
    changedTimer = setTimeout(saveDrawing, 250);
  }
  function readDrawings() {
    const entries = JSON.parse(localStorage.getItem(DRAWINGS_STORAGE) || "[]");
    if (!Array.isArray(entries)) throw new Error("Invalid drawing history");
    return entries
      .filter((entry) => {
        try {
          return (
            typeof entry.id === "string" &&
            Number.isFinite(entry.updated) &&
            (validateProject(entry.project).objects.length > 0 ||
              (entry.codeDirty &&
                typeof entry.code === "string" &&
                entry.code.trim()))
          );
        } catch {
          return false;
        }
      })
      .sort((a, b) => b.updated - a.updated)
      .slice(0, 20);
  }
  function saveDrawing() {
    clearTimeout(changedTimer);
    if (!model.objects.length && !(codeDirty && $("tikz").value.trim())) {
      $("save-state").textContent = "";
      return true;
    }
    try {
      const entries = readDrawings();
      const previous = entries.find((entry) => entry.id === drawingId);
      const code = codeDirty ? $("tikz").value : generateTikZ();
      if (
        previous &&
        JSON.stringify(previous.project) === snapshot() &&
        previous.code === code &&
        !!previous.codeDirty === codeDirty
      ) {
        $("save-state").textContent = "Saved in Load on this browser";
        return true;
      }
      drawingId ||= `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      const entry = {
        id: drawingId,
        updated: Date.now(),
        project: clone(model),
        code,
        codeDirty,
        preamble: generatePreamble(),
      };
      localStorage.setItem(
        DRAWINGS_STORAGE,
        JSON.stringify(
          [entry, ...entries.filter((item) => item.id !== drawingId)].slice(
            0,
            20,
          ),
        ),
      );
      $("save-state").textContent = "Saved in Load on this browser";
      return true;
    } catch {
      $("save-state").textContent =
        "History could not be saved. Use Save to download a project.";
      toast("History could not be saved. Use Save to download a project.");
      return false;
    }
  }
  function openDrawing(project, entry = null) {
    // Flush the pending autosave before replacing the document.
    if (!saveDrawing()) return false;
    cancelDrawing();
    model = clone(project);
    drawingId = entry?.id || null;
    selected.clear();
    history = [];
    future = [];
    view = { x: 0, y: 0, zoom: 1 };
    finishChange();
    if (entry?.codeDirty && typeof entry.code === "string") {
      $("tikz").value = entry.code;
      codeDirty = true;
    }
    $("import-report").hidden = true;
    setTool("select");
    if (model.objects.length) fit();
    showDrawings(false);
    return true;
  }
  function drawingPreview(project, prefix) {
    const root = svg("svg", { "aria-hidden": "true" });
    if (!project.objects.length) {
      root.setAttribute("viewBox", "0 0 116 70");
      svg(
        "text",
        {
          x: 58,
          y: 40,
          "text-anchor": "middle",
          fill: "#777",
          "font-size": 13,
        },
        root,
      ).textContent = "TikZ draft";
      return root;
    }
    const defs = svg("defs", {}, root),
      b = bounds(project.objects);
    const pad = Math.max(15, ...project.objects.map((o) => o.width + o.gap));
    root.setAttribute(
      "viewBox",
      `${b.x - pad} ${b.y - pad} ${b.w + 2 * pad} ${b.h + 2 * pad}`,
    );
    const scene = computeCrossings(project.objects, project.overrides);
    for (const kind of ["region", "line", "ellipse", "text"])
      for (const o of project.objects
        .filter((o) => o.kind === kind)
        .sort((a, b) => a.z - b.z))
        renderObject(o, root, defs, true, false, scene, prefix);
    return root;
  }
  function showDrawings(show) {
    $("drawing-strip").hidden = !show;
    $("load").classList.toggle("active", show);
    $("load").setAttribute("aria-expanded", String(show));
    if (!show) return;
    cancelTemplate();
    $("close-templates").click();
    saveDrawing();
    const list = $("drawings");
    list.replaceChildren();
    let entries;
    try {
      entries = readDrawings();
    } catch {
      $("drawings-empty").textContent = "Drawing history is unavailable.";
      entries = [];
    }
    $("drawings-empty").hidden = entries.length > 0;
    entries.forEach((entry, i) => {
      const button = document.createElement("button");
      button.className = "drawing-card";
      button.dataset.drawingId = entry.id;
      button.setAttribute(
        "aria-label",
        `Load drawing ${i + 1}, ${new Date(entry.updated).toLocaleString()}`,
      );
      const label = document.createElement("span");
      label.textContent = new Date(entry.updated).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      button.append(drawingPreview(entry.project, `saved-${i}-`), label);
      button.addEventListener("click", () => {
        if (!saveDrawing()) return;
        try {
          // The canvas can be edited while the gallery is open. Resolve the
          // latest record after saving, never the thumbnail's old snapshot.
          const latest = readDrawings().find((item) => item.id === entry.id);
          if (latest) openDrawing(latest.project, latest);
          else {
            showDrawings(true);
            toast("This drawing is no longer in recent history.");
          }
        } catch {
          toast("Drawing history is unavailable.");
        }
      });
      list.append(button);
    });
    list.scrollLeft = 0;
    requestAnimationFrame(updateDrawingArrows);
  }
  function updateDrawingArrows() {
    const list = $("drawings");
    const overflow = list.scrollWidth > list.clientWidth + 2;
    for (const id of ["drawings-prev", "drawings-next"])
      $(id).hidden = !overflow;
    $("drawings-prev").disabled = list.scrollLeft <= 1;
    $("drawings-next").disabled =
      list.scrollLeft + list.clientWidth >= list.scrollWidth - 2;
  }
  function scrollDrawings(direction) {
    $("drawings").scrollBy({
      left: direction * Math.max(150, $("drawings").clientWidth * 0.7),
      behavior: "smooth",
    });
  }
  function undo() {
    cancelDrawing();
    if (!history.length) return;
    future.push(snapshot());
    model = JSON.parse(history.pop());
    selected = new Set(
      [...selected].filter((id) => model.objects.some((o) => o.id === id)),
    );
    finishChange();
  }
  function redo() {
    cancelDrawing();
    if (!future.length) return;
    history.push(snapshot());
    model = JSON.parse(future.pop());
    selected.clear();
    finishChange();
  }
  function zNext(under = false) {
    const zs = model.objects.filter((o) => o.kind === "line").map((o) => o.z);
    return under ? Math.min(0, ...zs) - 1 : Math.max(0, ...zs) + 1;
  }
  function makeObject(kind, extra = {}, under = false) {
    const id = model.nextId++;
    return {
      id,
      name: `${kind === "line" ? "String" : kind === "region" ? "Region" : kind === "ellipse" ? "Node" : "Label"} ${id}`,
      kind,
      ...clone(defaults),
      z: zNext(under),
      ...extra,
    };
  }
  function addObject(o) {
    change(() => {
      model.objects.push(o);
      selected = new Set([o.id]);
    });
  }
  function cleanOverrides() {
    const ids = new Set(model.objects.map((o) => o.id));
    for (const key of Object.keys(model.overrides)) {
      const [a, b] = key.split(":").map(Number);
      if (!ids.has(a) || !ids.has(b)) delete model.overrides[key];
    }
  }
  function removeSelected() {
    if (!selected.size) return;
    change(() => {
      model.objects = model.objects.filter((o) => !selected.has(o.id));
      selected.clear();
      cleanOverrides();
    });
  }
  function copySelection() {
    const objects = selectedObjects();
    if (!objects.length) return;
    const ids = new Set(objects.map((o) => o.id));
    clipboard = {
      objects: clone(objects),
      overrides: Object.fromEntries(
        Object.entries(model.overrides).filter(([key]) =>
          key
            .split(":")
            .slice(0, 2)
            .every((id) => ids.has(+id)),
        ),
      ),
      pastes: 0,
    };

    updateButtons();
  }
  function pasteSelection() {
    if (!clipboard) return;
    cancelDrawing();
    change(() => {
      clipboard.pastes++;
      const map = new Map(),
        groupMap = new Map(),
        offset = 24 * clipboard.pastes;
      let nextGroup =
        Math.max(0, ...model.objects.map((o) => o.group || 0)) + 1;
      const base = zNext();
      const sorted = [...clipboard.objects].sort((a, b) => a.z - b.z);
      for (const o of [...clipboard.objects].sort((a, b) => a.id - b.id))
        map.set(o.id, model.nextId++);
      const pasted = sorted.map((o, i) => {
        const n = clone(o);
        n.id = map.get(o.id);
        if (o.group) {
          if (!groupMap.has(o.group)) groupMap.set(o.group, nextGroup++);
          n.group = groupMap.get(o.group);
        }
        n.name = `${o.name} copy`;
        n.z = base + i;
        moveObject(n, offset, offset);
        return n;
      });
      for (const [key, value] of Object.entries(clipboard.overrides)) {
        const [a, b, n] = key.split(":");
        model.overrides[`${map.get(+a)}:${map.get(+b)}:${n}`] = map.get(value);
      }
      model.objects.push(...pasted);
      selected = new Set(pasted.map((o) => o.id));
    });
  }
  function cutSelection() {
    copySelection();
    removeSelected();
  }
  function duplicate() {
    copySelection();
    pasteSelection();
  }
  function moveObject(o, dx, dy) {
    if (o.points)
      for (const p of o.points) {
        p.x += dx;
        p.y += dy;
      }
    if (o.c1) {
      o.c1.x += dx;
      o.c1.y += dy;
      o.c2.x += dx;
      o.c2.y += dy;
    }
    if (o.x !== undefined) {
      o.x += dx;
      o.y += dy;
    }
  }
  function allPoints(o) {
    if (o.kind === "text")
      return [
        {
          x: o.x - o.text.length * o.fontSize * 0.3,
          y: o.y - o.fontSize * 0.65,
        },
        {
          x: o.x + o.text.length * o.fontSize * 0.3,
          y: o.y + o.fontSize * 0.65,
        },
      ];
    if (o.kind === "ellipse")
      return [
        { x: o.x - o.rx, y: o.y - o.ry },
        { x: o.x + o.rx, y: o.y + o.ry },
      ];
    return ["bezier", "spline"].includes(o.curve) ? sampleBase(o) : o.points;
  }
  function bounds(objects = model.objects) {
    const points = objects.flatMap(allPoints);
    if (!points.length) return { x: 300, y: 200, w: 400, h: 300 };
    const xs = points.map((p) => p.x),
      ys = points.map((p) => p.y);
    const x = Math.min(...xs),
      y = Math.min(...ys);
    return {
      x,
      y,
      w: Math.max(1, Math.max(...xs) - x),
      h: Math.max(1, Math.max(...ys) - y),
    };
  }
  function flipSelection() {
    if (!selected.size) return;
    change(() => {
      const b = bounds(selectedObjects()),
        cx = b.x + b.w / 2;
      for (const o of selectedObjects()) {
        if (o.points) for (const p of o.points) p.x = 2 * cx - p.x;
        if (o.c1) {
          o.c1.x = 2 * cx - o.c1.x;
          o.c2.x = 2 * cx - o.c2.x;
        }
        if (o.tangents)
          for (const tangent of o.tangents) {
            tangent.in.x *= -1;
            tangent.out.x *= -1;
          }
        if (o.x !== undefined) o.x = 2 * cx - o.x;
      }
    });
  }
  function expandGroups(ids) {
    const result = new Set(ids),
      groups = new Set(
        model.objects
          .filter((o) => result.has(o.id) && o.group)
          .map((o) => o.group),
      );
    for (const o of model.objects)
      if (o.group && groups.has(o.group)) result.add(o.id);
    return result;
  }
  function groupSelection() {
    const ids = expandGroups(selected);
    if (ids.size < 2) return;
    change(() => {
      const group = Math.max(0, ...model.objects.map((o) => o.group || 0)) + 1;
      model.objects.forEach((o) => {
        if (ids.has(o.id)) o.group = group;
      });
      selected = ids;
    });
  }
  function ungroupSelection() {
    const groups = new Set(
      selectedObjects()
        .map((o) => o.group)
        .filter(Boolean),
    );
    if (!groups.size) return;
    change(() =>
      model.objects.forEach((o) => {
        if (groups.has(o.group)) delete o.group;
      }),
    );
  }
  let layerBefore = null;
  function layerState() {
    const lines = model.objects
        .filter((o) => o.kind === "line")
        .sort((a, b) => a.z - b.z),
      picked = lines.filter((o) => selected.has(o.id)),
      others = lines.filter((o) => !selected.has(o.id));
    return {
      lines,
      picked,
      others,
      index: picked.length
        ? others.filter((o) => lines.indexOf(o) < lines.indexOf(picked[0]))
            .length
        : 0,
    };
  }
  function updateLayerControl() {
    if (!$("layer-order")) return;
    const { picked, others, index } = layerState(),
      slider = $("layer-order");
    slider.disabled = !picked.length || !others.length;
    slider.max = others.length;
    slider.value = index;
    slider.setAttribute(
      "aria-valuetext",
      picked.length
        ? `${index + 1} of ${others.length + 1}, back to front`
        : "Select a line",
    );
    $("layer-position").textContent = picked.length
      ? `${index + 1}/${others.length + 1}`
      : "—";
    $("layer-control").classList.toggle("inactive", !picked.length);
  }
  function setLayerPosition(index) {
    const { picked, others } = layerState();
    if (!picked.length) return;
    index = Math.max(0, Math.min(others.length, index));
    const order = [
      ...others.slice(0, index),
      ...picked,
      ...others.slice(index),
    ];
    order.forEach((o, i) => (o.z = i + 1));
    for (const key of Object.keys(model.overrides)) {
      const [a, b] = key.split(":").map(Number);
      if (selected.has(a) || selected.has(b)) delete model.overrides[key];
    }
    finishChange();
  }
  function commitLayerOrder() {
    if (layerBefore && layerBefore !== snapshot()) pushHistory(layerBefore);
    layerBefore = null;
    updateButtons();
  }
  function reorder(front) {
    if (!selected.size) return;
    change(() => {
      const group = selectedObjects().sort((a, b) => a.z - b.z),
        zs = model.objects.map((o) => o.z);
      const base = front
        ? Math.max(0, ...zs) + 1
        : Math.min(0, ...zs) - group.length;
      group.forEach((o, i) => (o.z = base + i));
      for (const key of Object.keys(model.overrides)) {
        const [a, b] = key.split(":").map(Number);
        if (selected.has(a) || selected.has(b)) delete model.overrides[key];
      }
    });
  }
  function setTool(next) {
    if (textTarget) finishText();
    cancelDrawing();
    tool = next;
    if (["select", "lasso"].includes(tool)) selected = expandGroups(selected);
    editPoints = false;
    if (!["select", "direct", "lasso", "crossing"].includes(tool))
      selected.clear();
    document.querySelectorAll("[data-tool]").forEach((b) => {
      b.classList.toggle("active", b.dataset.tool === tool);
      b.setAttribute("aria-pressed", b.dataset.tool === tool);
    });
    canvas.style.cursor = ["select", "direct", "lasso"].includes(tool)
      ? "default"
      : tool === "text"
        ? "text"
        : "crosshair";
    if (
      ["fill", "region", "rectangle", "ellipse", "bezier-region"].includes(tool)
    )
      colourTarget = "fillColor";
    else if (["freehand", "line", "polyline", "bezier", "dot"].includes(tool))
      colourTarget = "color";
    render();
    updateInspector();
  }
  function cancelDrawing() {
    cancelTemplate();
    draft = null;
    snapTarget = null;
    if (interaction?.before) {
      model = JSON.parse(interaction.before);
      selected = new Set(interaction.selection || []);
    }
    interaction = null;
    editPoints = false;
    render();
  }
  let snapTarget = null,
    gridSpacing = CM;
  function setGridCM(cm) {
    gridSpacing = cm * CM;
    updateControlPreviews();
    render();
    try {
      localStorage.setItem("string-grid-cm", String(cm));
    } catch {}
  }
  function stepGrid(direction) {
    const at = GRID_STEPS.findIndex(
      (n) => Math.abs(n - gridSpacing / CM) < 1e-8,
    );
    setGridCM(
      GRID_STEPS[Math.max(0, Math.min(GRID_STEPS.length - 1, at + direction))],
    );
  }
  function snapPoint(p) {
    snapTarget = null;
    if ($("node-snap").checked) {
      const candidates = [];
      for (const o of model.objects) {
        if (interaction?.type === "move" && selected.has(o.id)) continue;
        if (o.points)
          o.points.forEach((q, i) => {
            if (
              interaction?.type === "handle" &&
              interaction.id === o.id &&
              (interaction.key === i ||
                (interaction.key === "start" && i === 0) ||
                (interaction.key === "end" && i === 1))
            )
              return;
            candidates.push(q);
          });
        else if (o.kind === "ellipse") candidates.push({ x: o.x, y: o.y });
      }
      if (draft) candidates.push(...draft.points);
      const nearest = candidates
        .map((q) => ({ q, d: dist(p, q) }))
        .sort((a, b) => a.d - b.d)[0];
      if (nearest && nearest.d <= 13 / view.zoom) {
        snapTarget = { ...nearest.q };
        return { ...nearest.q };
      }
    }
    if ($("snap").checked)
      return {
        x: Math.round(p.x / gridSpacing) * gridSpacing,
        y: Math.round(p.y / gridSpacing) * gridSpacing,
      };
    return p;
  }
  function toWorld(e, snap = false) {
    const r = canvas.getBoundingClientRect();
    const p = {
      x: view.x + (e.clientX - r.left) / view.zoom,
      y: view.y + (e.clientY - r.top) / view.zoom,
    };
    return snap ? snapPoint(p) : p;
  }
  function toScreen(p) {
    return { x: (p.x - view.x) * view.zoom, y: (p.y - view.y) * view.zoom };
  }
  function fit() {
    const b = bounds();
    const pad = 75;
    view.zoom = Math.max(
      0.15,
      Math.min(
        2,
        (dimensions.w - pad * 2) / (b.w || 1),
        (dimensions.h - pad * 2) / (b.h || 1),
      ),
    );
    view.x = b.x + b.w / 2 - dimensions.w / view.zoom / 2;
    view.y = b.y + b.h / 2 - dimensions.h / view.zoom / 2;
    render();
  }
  function zoomBy(
    factor,
    p = {
      x: view.x + dimensions.w / view.zoom / 2,
      y: view.y + dimensions.h / view.zoom / 2,
    },
  ) {
    const old = view.zoom;
    view.zoom = Math.min(6, Math.max(0.15, old * factor));
    view.x = p.x - ((p.x - view.x) * old) / view.zoom;
    view.y = p.y - ((p.y - view.y) * old) / view.zoom;
    render();
  }
  function resize() {
    const r = viewport.getBoundingClientRect();
    const center = {
      x: view.x + dimensions.w / view.zoom / 2,
      y: view.y + dimensions.h / view.zoom / 2,
    };
    dimensions = { w: r.width, h: r.height };
    view.x = center.x - r.width / view.zoom / 2;
    view.y = center.y - r.height / view.zoom / 2;
    render();
  }

  function naturalTangents(points, closed = false) {
    if (closed && points.length >= 3)
      return points.map((p, i) => {
        const v = sub(
          points[(i + 1) % points.length],
          points[(i + points.length - 1) % points.length],
        );
        return {
          in: { x: -v.x / 6, y: -v.y / 6 },
          out: { x: v.x / 6, y: v.y / 6 },
        };
      });
    const n = points.length;
    if (n < 2)
      return points.map(() => ({ in: { x: 0, y: 0 }, out: { x: 0, y: 0 } }));
    const solve = (axis) => {
      const lower = Array(n).fill(1),
        diagonal = Array(n).fill(4),
        upper = Array(n).fill(1),
        rhs = [];
      diagonal[0] = diagonal[n - 1] = 2;
      rhs[0] = 3 * (points[1][axis] - points[0][axis]);
      for (let i = 1; i < n - 1; i++)
        rhs[i] = 3 * (points[i + 1][axis] - points[i - 1][axis]);
      rhs[n - 1] = 3 * (points[n - 1][axis] - points[n - 2][axis]);
      for (let i = 1; i < n; i++) {
        const ratio = lower[i] / diagonal[i - 1];
        diagonal[i] -= ratio * upper[i - 1];
        rhs[i] -= ratio * rhs[i - 1];
      }
      const answer = Array(n);
      answer[n - 1] = rhs[n - 1] / diagonal[n - 1];
      for (let i = n - 2; i >= 0; i--)
        answer[i] = (rhs[i] - upper[i] * answer[i + 1]) / diagonal[i];
      return answer;
    };
    const x = solve("x"),
      y = solve("y");
    return points.map((_, i) => ({
      in: { x: -x[i] / 3, y: -y[i] / 3 },
      out: { x: x[i] / 3, y: y[i] / 3 },
    }));
  }
  function curveSegments(o) {
    if (o.curve === "bezier")
      return [{ a: o.points[0], b: o.points[1], c1: o.c1, c2: o.c2 }];
    if (o.curve !== "spline") return [];
    const endpoints = o.closed
      ? [...o.points.slice(1), o.points[0]]
      : o.points.slice(1);
    return endpoints.map((b, i) => ({
      a: o.points[i],
      b,
      c1: {
        x: o.points[i].x + o.tangents[i].out.x,
        y: o.points[i].y + o.tangents[i].out.y,
      },
      c2: {
        x: b.x + o.tangents[(i + 1) % o.points.length].in.x,
        y: b.y + o.tangents[(i + 1) % o.points.length].in.y,
      },
    }));
  }
  function regionPath(o) {
    return (o.curve === "spline" ? curvePath(o) : paths(o.points)) + " Z";
  }
  function curvePath(o) {
    return (
      `M${fmt(o.points[0].x)},${fmt(o.points[0].y)} ` +
      curveSegments(o)
        .map(
          ({ b, c1, c2 }) =>
            `C${fmt(c1.x)},${fmt(c1.y)} ${fmt(c2.x)},${fmt(c2.y)} ${fmt(b.x)},${fmt(b.y)}`,
        )
        .join(" ")
    );
  }

  // Geometry is shared by rendering, hit testing, crossings, selection and exports.
  function sampleBase(o) {
    if (!["bezier", "spline"].includes(o.curve)) return o.points;
    const result = [];
    for (const { a, b, c1, c2 } of curveSegments(o)) {
      const n = Math.min(
        160,
        Math.max(20, Math.ceil((dist(a, c1) + dist(c1, c2) + dist(c2, b)) / 7)),
      );
      for (let i = result.length ? 1 : 0; i <= n; i++) {
        const t = i / n,
          u = 1 - t;
        result.push({
          x:
            u * u * u * a.x +
            3 * u * u * t * c1.x +
            3 * u * t * t * c2.x +
            t * t * t * b.x,
          y:
            u * u * u * a.y +
            3 * u * u * t * c1.y +
            3 * u * t * t * c2.y +
            t * t * t * b.y,
        });
      }
    }
    return result;
  }

  function resample(points, step = 3) {
    const result = [points[0]];
    let travel = 0,
      next = step;
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1],
        b = points[i],
        length = dist(a, b);
      while (next <= travel + length) {
        result.push(lerp(a, b, (next - travel) / length));
        next += step;
      }
      travel += length;
    }
    if (dist(result.at(-1), points.at(-1)) > 0.01) result.push(points.at(-1));
    return result;
  }
  function lineGeometry(o) {
    const base = sampleBase(o);
    let points = base;
    if (o.style === "squiggly" && base.length > 1) {
      const evenly = resample(base, 2),
        total = evenly.reduce(
          (sum, p, i) => (i ? sum + dist(evenly[i - 1], p) : 0),
          0,
        );
      let along = 0;
      points = evenly.map((p, i) => {
        if (i) along += dist(evenly[i - 1], p);
        const a = evenly[Math.max(0, i - 1)],
          b = evenly[Math.min(evenly.length - 1, i + 1)],
          v = sub(b, a),
          len = Math.hypot(v.x, v.y) || 1;
        const amount =
          Math.sin((along / 18) * Math.PI * 2) *
          3.6 *
          Math.min(1, along / 9, (total - along) / 9);
        return { x: p.x - (v.y / len) * amount, y: p.y + (v.x / len) * amount };
      });
    }
    return {
      base,
      points,
      path:
        ["bezier", "spline"].includes(o.curve) && o.style !== "squiggly"
          ? curvePath(o)
          : paths(points),
    };
  }
  function pointSegment(p, a, b) {
    const v = sub(b, a),
      w = sub(p, a),
      l = v.x * v.x + v.y * v.y;
    const t = l ? Math.max(0, Math.min(1, (w.x * v.x + w.y * v.y) / l)) : 0;
    const q = lerp(a, b, t);
    return { d: dist(p, q), t, q };
  }
  function segmentIntersection(a, b, c, d) {
    const r = sub(b, a),
      s = sub(d, c),
      den = cross(r, s);
    if (Math.abs(den) < 1e-9) return null;
    const v = sub(c, a),
      t = cross(v, s) / den,
      u = cross(v, r) / den;
    if (t < -1e-7 || t > 1 + 1e-7 || u < -1e-7 || u > 1 + 1e-7) return null;
    return {
      p: lerp(a, b, t),
      t: Math.max(0, Math.min(1, t)),
      u: Math.max(0, Math.min(1, u)),
      angle:
        (Math.asin(
          Math.min(1, Math.abs(den) / (dist(a, b) * dist(c, d) || 1)),
        ) *
          180) /
        Math.PI,
    };
  }
  function pointInPolygon(p, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const a = polygon[i],
        b = polygon[j];
      if (pointSegment(p, a, b).d < 0.5) return true;
      if (
        a.y > p.y !== b.y > p.y &&
        p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x
      )
        inside = !inside;
    }
    return inside;
  }
  function tangentNear(points, p) {
    let best = Infinity,
      tangent = { x: 1, y: 0 };
    for (let i = 1; i < points.length; i++) {
      const d = pointSegment(p, points[i - 1], points[i]).d;
      if (d < best) {
        best = d;
        tangent = sub(points[i], points[i - 1]);
      }
    }
    return tangent;
  }
  function computeCrossings(
    objects = model.objects,
    overrides = model.overrides,
  ) {
    const cache = new Map();
    if (objects === model.objects) geometry = cache;
    const lines = objects
      .filter((o) => o.kind === "line")
      .sort((a, b) => a.id - b.id);
    for (const o of lines) cache.set(o.id, lineGeometry(o));
    const result = [];
    for (let i = 0; i < lines.length; i++)
      for (let j = i + 1; j < lines.length; j++) {
        const a = lines[i],
          b = lines[j],
          ap = cache.get(a.id).points,
          bp = cache.get(b.id).points,
          found = [];
        for (let m = 1; m < ap.length; m++)
          for (let n = 1; n < bp.length; n++) {
            const hit = segmentIntersection(ap[m - 1], ap[m], bp[n - 1], bp[n]);
            if (!hit) continue;
            if (a.style === "squiggly" || b.style === "squiggly") {
              const ta = tangentNear(cache.get(a.id).base, hit.p),
                tb = tangentNear(cache.get(b.id).base, hit.p);
              hit.angle =
                (Math.asin(
                  Math.min(
                    1,
                    Math.abs(cross(ta, tb)) /
                      (Math.hypot(ta.x, ta.y) * Math.hypot(tb.x, tb.y) || 1),
                  ),
                ) *
                  180) /
                Math.PI;
            }
            if (hit.angle < 30) continue;
            if (
              [ap[0], ap.at(-1), bp[0], bp.at(-1)].some(
                (p) => dist(p, hit.p) < 3,
              )
            )
              continue;
            if (found.some((h) => dist(h.p, hit.p) < 3)) continue;
            found.push({ ...hit, along: m - 1 + hit.t });
          }
        found
          .sort((x, y) => x.along - y.along)
          .forEach((h, k) => {
            const key = `${a.id}:${b.id}:${k}`;
            const chosen = overrides[key];
            const upper =
              chosen === a.id ? a : chosen === b.id ? b : a.z > b.z ? a : b;
            const lower = upper === a ? b : a;
            result.push({
              key,
              a: a.id,
              b: b.id,
              upper: upper.id,
              lower: lower.id,
              p: h.p,
              angle: h.angle,
              r:
                upper.gap > 0
                  ? upper.gap + Math.max(upper.width, lower.width) / 2
                  : 0,
            });
          });
      }
    return result;
  }
  function hitTest(p) {
    const threshold = 7 / view.zoom;
    const objects = [...model.objects].sort((a, b) => {
      const priority = (o) =>
        o.kind === "region" ? 0 : o.kind === "line" ? 1 : 2;
      return priority(b) - priority(a) || b.z - a.z;
    });
    for (const o of objects) {
      if (o.kind === "line") {
        const pts = geometry.get(o.id)?.points || lineGeometry(o).points;
        const nearest = pts
          .slice(1)
          .reduce(
            (best, b, i) => Math.min(best, pointSegment(p, pts[i], b).d),
            Infinity,
          );
        if (
          nearest < threshold + o.width / 2 &&
          !crossings.some((c) => c.lower === o.id && dist(p, c.p) < c.r)
        )
          return o;
      } else if (o.kind === "region") {
        if (pointInPolygon(p, sampleBase(o))) return o;
      } else if (o.kind === "ellipse") {
        if (
          ((p.x - o.x) / Math.max(1, o.rx + threshold)) ** 2 +
            ((p.y - o.y) / Math.max(1, o.ry + threshold)) ** 2 <=
          1
        )
          return o;
      } else if (o.kind === "text") {
        const b = bounds([o]);
        if (
          p.x >= b.x - threshold &&
          p.x <= b.x + b.w + threshold &&
          p.y >= b.y - threshold &&
          p.y <= b.y + b.h + threshold
        )
          return o;
      }
    }
    return null;
  }
  function simplify(points, tolerance = 1) {
    if (points.length <= 2) return points;
    const first = points[0],
      last = points.at(-1);
    let max = 0,
      index = 0;
    for (let i = 1; i < points.length - 1; i++) {
      const d = pointSegment(points[i], first, last).d;
      if (d > max) {
        max = d;
        index = i;
      }
    }
    if (max > tolerance)
      return [
        ...simplify(points.slice(0, index + 1), tolerance).slice(0, -1),
        ...simplify(points.slice(index), tolerance),
      ];
    return [first, last];
  }
  function selectionPolygon(polygon, append) {
    const ids = append ? new Set(selected) : new Set();
    for (const o of model.objects) {
      const points =
        o.kind === "line"
          ? geometry.get(o.id)?.points || sampleBase(o)
          : o.kind === "region"
            ? sampleBase(o)
            : o.kind === "ellipse"
              ? Array.from({ length: 32 }, (_, i) => ({
                  x: o.x + o.rx * Math.cos((i / 32) * 2 * Math.PI),
                  y: o.y + o.ry * Math.sin((i / 32) * 2 * Math.PI),
                }))
              : (() => {
                  const b = bounds([o]);
                  return [
                    { x: b.x, y: b.y },
                    { x: b.x + b.w, y: b.y },
                    { x: b.x + b.w, y: b.y + b.h },
                    { x: b.x, y: b.y + b.h },
                  ];
                })();
      let hit = points.some((p) => pointInPolygon(p, polygon));
      const closed = o.kind !== "line";
      if (closed && polygon.some((p) => pointInPolygon(p, points))) hit = true;
      for (
        let i = 0;
        !hit && i < (closed ? points.length : points.length - 1);
        i++
      )
        for (let j = 0; j < polygon.length; j++)
          if (
            segmentIntersection(
              points[i],
              points[(i + 1) % points.length],
              polygon[j],
              polygon[(j + 1) % polygon.length],
            )
          ) {
            hit = true;
            break;
          }
      if (hit) ids.add(o.id);
    }
    selected = tool === "direct" ? ids : expandGroups(ids);
    editPoints = false;
    render();
    updateInspector();
  }

  function patternDef(o, parent, prefix = "") {
    const id = `${prefix}pattern-${o.id}`;
    const pat = svg(
      "pattern",
      { id, width: 8, height: 8, patternUnits: "userSpaceOnUse" },
      parent,
    );
    const fillColor = o.fillColor || o.color;
    const attrs = { stroke: fillColor, "stroke-width": 0.85, fill: "none" };
    if (o.pattern === "dots")
      svg("circle", { cx: 2, cy: 2, r: 1, fill: fillColor }, pat);
    else {
      if (["hatch", "crosshatch"].includes(o.pattern))
        svg("path", { d: "M-2 2L2 -2M0 8L8 0M6 10L10 6", ...attrs }, pat);
      if (["backhatch", "crosshatch"].includes(o.pattern))
        svg("path", { d: "M-2 6L2 10M0 0L8 8M6 -2L10 2", ...attrs }, pat);
      if (o.pattern === "horizontal")
        svg("path", { d: "M0 4H8", ...attrs }, pat);
    }
    return `url(#${id})`;
  }
  function arrowPath(points, at, reverse = false) {
    let a, b;
    if (at === "middle") {
      const pts = resample(points, 4),
        i = Math.max(1, Math.floor(pts.length / 2));
      a = pts[i - 1];
      b = pts[i];
    } else if (reverse) {
      a = points[1];
      b = points[0];
    } else {
      a = points.at(-2);
      b = points.at(-1);
    }
    const v = sub(b, a),
      len = Math.hypot(v.x, v.y) || 1;
    return { p: b, x: v.x / len, y: v.y / len };
  }
  function drawArrows(o, points, parent) {
    if (o.arrows === "none" || points.length < 2) return;
    const ats = o.arrows === "both" ? ["start", "end"] : [o.arrows];
    for (const at of ats) {
      const { p, x, y } = arrowPath(points, at, at === "start");
      const size = Math.max(7, o.width * 3);
      svg(
        "path",
        {
          d: `M${p.x - x * size - y * size * 0.45},${p.y - y * size + x * size * 0.45} L${p.x},${p.y} L${p.x - x * size + y * size * 0.45},${p.y - y * size - x * size * 0.45}`,
          stroke: o.color,
          "stroke-width": o.width,
          fill: "none",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        },
        parent,
      );
    }
  }
  function renderObject(
    o,
    parent,
    defs,
    withMasks = true,
    diagnostics = false,
    sceneCrossings = crossings,
    prefix = "",
  ) {
    const group = svg("g", { "data-id": o.id }, parent);
    if (o.kind === "line") {
      const g =
        (sceneCrossings === crossings && geometry.get(o.id)) || lineGeometry(o);
      const holes = withMasks
        ? sceneCrossings.filter((c) => c.lower === o.id && c.r > o.width / 2)
        : [];
      if (holes.length) {
        const id = `${prefix}mask-${o.id}`,
          b = bounds([o]),
          pad = Math.max(50, o.width + o.gap);
        const extent = {
          x: b.x - pad,
          y: b.y - pad,
          width: b.w + pad * 2,
          height: b.h + pad * 2,
        };
        const mask = svg(
          "mask",
          {
            id,
            maskUnits: "userSpaceOnUse",
            ...extent,
            style: "mask-type:luminance",
          },
          defs,
        );
        svg("rect", { ...extent, fill: "white" }, mask);
        for (const h of holes)
          svg("circle", { cx: h.p.x, cy: h.p.y, r: h.r, fill: "black" }, mask);
        group.setAttribute("mask", `url(#${id})`);
      }
      const attrs = {
        d: g.path,
        stroke: o.color,
        "stroke-width": o.width,
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      };
      if (o.style === "dashed")
        attrs["stroke-dasharray"] = `${o.width * 4 + 4} ${o.width * 2 + 3}`;
      if (o.style === "dotted")
        attrs["stroke-dasharray"] = `.01 ${o.width * 2 + 4}`;
      const related =
        diagnostics &&
        !selected.has(o.id) &&
        crossings.some(
          (c) =>
            (c.a === o.id && selected.has(c.b)) ||
            (c.b === o.id && selected.has(c.a)),
        );
      if (related) attrs.stroke = RED;
      if (diagnostics && selected.has(o.id))
        svg(
          "path",
          {
            d: g.path,
            stroke: "#1976c9",
            "stroke-opacity": 0.28,
            "stroke-width": o.width + 4 / view.zoom,
            fill: "none",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          },
          group,
        );
      svg("path", attrs, group);
      drawArrows({ ...o, color: attrs.stroke }, g.points, group);
    } else if (o.kind === "region" || o.kind === "ellipse") {
      const fill =
        o.pattern === "none"
          ? "none"
          : o.pattern === "solid"
            ? o.fillColor || o.color
            : patternDef(o, defs, prefix);
      const attrs = {
        fill,
        "fill-rule": "evenodd",
        "fill-opacity": o.opacity,
        stroke: o.color,
        "stroke-width": o.width,
        "stroke-linejoin": "round",
      };
      if (o.kind === "region")
        svg("path", { d: regionPath(o), ...attrs }, group);
      else
        svg(
          "ellipse",
          { cx: o.x, cy: o.y, rx: o.rx, ry: o.ry, ...attrs },
          group,
        );
      if (o.kind === "ellipse" && o.text) {
        const label = svg(
          "text",
          {
            x: o.x,
            y: o.y,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            "font-size": o.fontSize || 18,
            "font-family": "Georgia, serif",
            fill: o.color,
          },
          group,
        );
        label.textContent = o.text;
      }
    } else {
      const el = svg(
        "text",
        {
          x: o.x,
          y: o.y,
          "text-anchor": "middle",
          "dominant-baseline": "central",
          "font-size": o.fontSize,
          "font-family": "Georgia, serif",
          fill: o.color,
        },
        group,
      );
      el.textContent = o.text;
    }
    return group;
  }
  function handlePoints(o) {
    if (o.curve === "spline") {
      const handles = o.points.map((p, i) => ({ p, key: i, anchor: true }));
      o.points.forEach((p, i) => {
        for (const side of ["in", "out"]) {
          if (
            !o.closed &&
            ((side === "in" && i === 0) ||
              (side === "out" && i === o.points.length - 1))
          )
            continue;
          const v = o.tangents[i][side];
          handles.push({
            p: { x: p.x + v.x, y: p.y + v.y },
            key: `tangent-${side}-${i}`,
            anchor: false,
            origin: p,
          });
        }
      });
      return handles;
    }
    if (o.kind === "line" && o.curve === "bezier")
      return [
        { p: o.points[0], key: "start", anchor: true },
        { p: o.points[1], key: "end", anchor: true },
        { p: o.c1, key: "c1", origin: o.points[0], anchor: false },
        { p: o.c2, key: "c2", origin: o.points[1], anchor: false },
      ];
    if (o.points) {
      const handles = o.points.map((p, i) => ({ p, key: i, anchor: true }));
      return o.drawing === "freehand" && !editPoints && tool !== "direct"
        ? [handles[0], handles.at(-1)]
        : handles;
    }
    if (o.kind === "ellipse" && o.dot)
      return [
        {
          p: { x: o.x + Math.max(o.rx, 18 / view.zoom), y: o.y },
          origin: { x: o.x, y: o.y },
          key: "radius",
          anchor: false,
        },
      ];
    if (o.kind === "ellipse")
      return [
        { p: { x: o.x + o.rx, y: o.y }, key: "rx", anchor: true },
        { p: { x: o.x, y: o.y + o.ry }, key: "ry", anchor: true },
      ];
    return [];
  }

  function handleHit(p, all = false) {
    const candidates = (
      all ? model.objects : selected.size === 1 ? selectedObjects() : []
    ).flatMap((o) =>
      handlePoints(o).map((h) => ({ ...h, id: o.id, d: dist(h.p, p) })),
    );
    const radius = (tool === "direct" ? 15 : 8) / view.zoom;
    return (
      candidates.filter((h) => h.d <= radius).sort((a, b) => a.d - b.d)[0] ||
      null
    );
  }

  function renderOverlay() {
    const parent = $("overlay-layer");
    parent.replaceChildren();
    if (selected.size) {
      if (selected.size > 1 || selectedObjects()[0].kind === "text") {
        const b = bounds(selectedObjects()),
          pad = 6 / view.zoom;
        svg(
          "rect",
          {
            x: b.x - pad,
            y: b.y - pad,
            width: b.w + pad * 2,
            height: b.h + pad * 2,
            fill: "none",
            stroke: "#1976c9",
            "stroke-width": 1 / view.zoom,
            "stroke-dasharray": `${4 / view.zoom} ${3 / view.zoom}`,
          },
          parent,
        );
      }
      if (selected.size === 1) {
        const o = selectedObjects()[0];
        if (o.kind === "region")
          svg(
            "path",
            {
              d: regionPath(o),
              stroke: "#1976c9",
              "stroke-width": 1.3 / view.zoom,
              fill: "none",
            },
            parent,
          );
        if (o.kind === "ellipse")
          svg(
            "ellipse",
            {
              cx: o.x,
              cy: o.y,
              rx: o.rx,
              ry: o.ry,
              stroke: "#1976c9",
              "stroke-width": 1.3 / view.zoom,
              fill: "none",
            },
            parent,
          );
        const handles = handlePoints(o);
        for (const h of handles)
          if (h.origin)
            svg(
              "path",
              {
                d: paths([h.origin, h.p]),
                stroke: "#1976c9",
                "stroke-width": 1 / view.zoom,
                fill: "none",
              },
              parent,
            );
        for (const h of handles) {
          const attrs = {
            fill: "white",
            stroke: "#1976c9",
            "stroke-width": 1.2 / view.zoom,
            "data-handle": String(h.key),
          };
          if (h.anchor)
            svg(
              "rect",
              {
                x: h.p.x - 3 / view.zoom,
                y: h.p.y - 3 / view.zoom,
                width: 6 / view.zoom,
                height: 6 / view.zoom,
                ...attrs,
              },
              parent,
            );
          else
            svg(
              "circle",
              { cx: h.p.x, cy: h.p.y, r: 3 / view.zoom, ...attrs },
              parent,
            );
        }
      }
    }
    if (draft) {
      const o = previewDraft();
      if (o) {
        geometry.delete(o.id);
        renderObject(o, parent, $("defs"), false).setAttribute(
          "opacity",
          ".65",
        );
      }
      if (
        ["polyline", "bezier", "region", "bezier-region", "line"].includes(
          draft.tool,
        )
      )
        for (const p of draft.points)
          svg(
            "circle",
            { cx: p.x, cy: p.y, r: 3 / view.zoom, fill: "#1976c9" },
            parent,
          );
    }
    if (interaction && ["marquee", "lasso"].includes(interaction.type)) {
      const pts =
        interaction.type === "marquee"
          ? rectanglePoints(interaction.start, cursor)
          : interaction.points;
      svg(
        "path",
        {
          d: paths(pts) + " Z",
          fill: "#1976c9",
          "fill-opacity": 0.06,
          stroke: "#1976c9",
          "stroke-width": 1 / view.zoom,
          "stroke-dasharray": `${4 / view.zoom} ${3 / view.zoom}`,
        },
        parent,
      );
    }
    if (snapTarget)
      svg(
        "circle",
        {
          cx: snapTarget.x,
          cy: snapTarget.y,
          r: 7 / view.zoom,
          fill: "none",
          stroke: "#1976c9",
          "stroke-width": 1.5 / view.zoom,
          "data-snap-target": "true",
        },
        parent,
      );
    if (tool === "crossing")
      for (const c of crossings)
        svg(
          "circle",
          {
            cx: c.p.x,
            cy: c.p.y,
            r: 8 / view.zoom,
            fill: "#ffffffb0",
            stroke: "#1976c9",
            "stroke-width": 1 / view.zoom,
          },
          parent,
        );
  }
  function render() {
    updateToolTip();
    crossings = computeCrossings();
    canvas.setAttribute(
      "viewBox",
      `${view.x} ${view.y} ${dimensions.w / view.zoom} ${dimensions.h / view.zoom}`,
    );
    const defs = $("defs");
    defs.replaceChildren();
    for (const id of ["region-layer", "line-layer", "node-layer", "grid-layer"])
      $(id).replaceChildren();
    if ($("grid").checked) {
      const spacing =
        gridSpacing *
        Math.max(1, 2 ** Math.ceil(Math.log2(8 / (gridSpacing * view.zoom))));
      const pat = svg(
        "pattern",
        {
          id: "grid-dots",
          x: -spacing / 2,
          y: -spacing / 2,
          width: spacing,
          height: spacing,
          patternUnits: "userSpaceOnUse",
        },
        defs,
        true,
        true,
      );
      svg(
        "circle",
        { cx: spacing / 2, cy: spacing / 2, r: 1 / view.zoom, fill: "#a9aeb4" },
        pat,
      );
      svg(
        "rect",
        {
          x: view.x,
          y: view.y,
          width: dimensions.w / view.zoom,
          height: dimensions.h / view.zoom,
          fill: "url(#grid-dots)",
        },
        $("grid-layer"),
      );
    }
    const sorted = [...model.objects].sort((a, b) => a.z - b.z);
    for (const o of sorted)
      renderObject(
        o,
        $(
          o.kind === "region"
            ? "region-layer"
            : o.kind === "line"
              ? "line-layer"
              : "node-layer",
        ),
        defs,
        true,
        true,
      );
    renderOverlay();
    if (pendingTemplate) moveTemplateGhost();
    $("zoom").textContent = `${Math.round(view.zoom * 100)}%`;
    updateButtons();
  }
  function requestRender() {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(() => {
      renderQueued = false;
      render();
    });
  }
  function updateButtons() {
    const has = selected.size > 0;
    for (const id of [
      "copy",
      "cut",
      "delete",
      "back",
      "front",
      "duplicate",
      "flip-x",
    ])
      if ($(id)) $(id).disabled = !has;
    $("paste").disabled = !clipboard;
    $("undo").disabled = !history.length;
    $("redo").disabled = !future.length;
    if ($("group")) $("group").disabled = selected.size < 2;
    if ($("ungroup"))
      $("ungroup").disabled = !selectedObjects().some((o) => o.group);
    updateLayerControl();
  }
  function updateInspector() {
    const o = selectedObjects()[0];
    if (o) {
      for (const key of ["color", "width", "style", "arrows", "gap", "pattern"])
        $(key).value = o[key] ?? defaults[key];
      $("opacity").value = Math.round(o.opacity * 100);
      $("fill-color").value = o.fillColor || o.color;
      $("font-size").value = o.fontSize || defaults.fontSize;
    } else syncDefaultControls();
    updateControlPreviews();
    updateButtons();
  }

  function syncDefaultControls() {
    for (const key of ["color", "width", "style", "arrows", "gap", "pattern"])
      $(key).value = defaults[key];
    $("opacity").value = Math.round(defaults.opacity * 100);
    $("fill-color").value = defaults.fillColor;
    $("font-size").value = defaults.fontSize;
    updateControlPreviews();
  }
  function applyProperty(key, value) {
    defaults[key] = value;
    if (draft) draft.settings[key] = value;
    const objects = selectedObjects()
      .filter(
        (o) => !["style", "arrows", "gap"].includes(key) || o.kind === "line",
      )
      .filter(
        (o) =>
          !["pattern", "opacity", "fillColor"].includes(key) ||
          ["region", "ellipse"].includes(o.kind),
      );
    if (objects.length) change(() => objects.forEach((o) => (o[key] = value)));
    updateControlPreviews();
    refreshTemplates();
    requestRender();
  }
  function swapCrossing(c) {
    change(() => (model.overrides[c.key] = c.lower));
  }
  function rectanglePoints(a, b) {
    return [
      { x: a.x, y: a.y },
      { x: b.x, y: a.y },
      { x: b.x, y: b.y },
      { x: a.x, y: b.y },
    ];
  }
  function beginDraft(kind, p, under) {
    draft = { tool: kind, points: [p], settings: clone(defaults), under };
  }
  function previewDraft() {
    if (!draft) return null;
    const d = draft,
      base = { id: "preview", name: "Preview", ...d.settings, z: 0 };
    if (["rectangle", "ellipse"].includes(d.tool)) {
      const end = d.end || cursor;
      if (d.tool === "rectangle")
        return {
          ...base,
          kind: "region",
          points: rectanglePoints(d.points[0], end),
        };
      return {
        ...base,
        kind: "ellipse",
        x: (d.points[0].x + end.x) / 2,
        y: (d.points[0].y + end.y) / 2,
        rx: Math.abs(d.points[0].x - end.x) / 2,
        ry: Math.abs(d.points[0].y - end.y) / 2,
      };
    }
    if (["bezier", "bezier-region"].includes(d.tool)) {
      const points = [...d.points];
      const tip = d.preview || cursor;
      if (dist(points.at(-1), tip) > 1) points.push(tip);
      return {
        ...base,
        kind: d.tool === "bezier-region" ? "region" : "line",
        closed: d.tool === "bezier-region",
        curve: "spline",
        points,
        tangents: naturalTangents(points, d.tool === "bezier-region"),
      };
    }
    const points = d.free ? d.points : [...d.points, d.preview || cursor];
    return {
      ...base,
      kind: d.tool === "region" ? "region" : "line",
      curve: "polyline",
      points,
    };
  }
  function finishDraft() {
    if (!draft) return;
    const d = draft;
    let o = previewDraft();
    if (["polyline", "region", "bezier", "bezier-region"].includes(d.tool))
      o.points = d.free ? simplify(d.points, 0.8) : d.points;
    if (["bezier", "bezier-region"].includes(d.tool))
      o.tangents = naturalTangents(o.points, o.closed);
    o.drawing = d.tool;
    if (d.tool === "freehand") o.points = simplify(d.points, 0.7);
    if (d.tool === "line") o.points = [d.points[0], d.end || cursor];
    if (
      o.kind === "line" &&
      (o.points.length < 2 || o.points.every((p) => dist(p, o.points[0]) < 1))
    ) {
      draft = null;
      render();
      return;
    }
    if (o.kind === "region" && o.points.length < 3) {
      toast("A filled region needs at least three points");
      return;
    }
    if (o.kind === "ellipse" && (o.rx < 1 || o.ry < 1)) {
      draft = null;
      render();
      return;
    }
    o = makeObject(
      o.kind,
      { ...o, id: model.nextId, name: undefined },
      d.under,
    );
    o.name = `${o.kind === "line" ? "String" : o.kind === "region" ? "Region" : "Node"} ${o.id}`;
    o.z = zNext(d.under);
    draft = null;
    addObject(o);
    if (["bezier", "bezier-region"].includes(d.tool)) setTool("direct");
    else if (d.tool === "polyline") setTool("select");
  }
  function draftClick(p, e) {
    if (!draft) {
      beginDraft(tool, p, e.shiftKey);
      return;
    }
    if (tool === "line") {
      draft.end = p;
      finishDraft();
      return;
    }
    if (
      ["region", "bezier-region"].includes(tool) &&
      draft.points.length >= 3 &&
      dist(p, draft.points[0]) < 10 / view.zoom
    ) {
      finishDraft();
      return;
    }
    if (dist(p, draft.points.at(-1)) > 1) draft.points.push(p);
  }
  function startMove(p) {
    interaction = {
      type: "move",
      start: p,
      before: snapshot(),
      selection: [...selected],
      original: clone(selectedObjects()),
    };
  }
  function pointerDown(e) {
    if (e.button === 2) return;
    e.preventDefault();
    if (textTarget) finishText();
    canvas.focus({ preventScroll: true });
    cursor = toWorld(e, !["select", "direct", "lasso"].includes(tool));
    const p = cursor;
    canvas.setPointerCapture(e.pointerId);
    if (e.button === 1 || space || e.altKey) {
      interaction = {
        type: "pan",
        start: { x: e.clientX, y: e.clientY },
        view: { ...view },
      };
      canvas.style.cursor = "grabbing";
      return;
    }
    if (pendingTemplate) {
      placeTemplate(pendingTemplate, toWorld(e, true), e.shiftKey);
      return;
    }
    if (["select", "direct", "lasso"].includes(tool)) {
      const handle = handleHit(p, tool === "direct");
      if (handle) {
        selected = new Set([handle.id]);
        interaction = {
          type: "handle",
          key: handle.key,
          id: handle.id,
          start: { ...p },
          original: clone(model.objects.find((o) => o.id === handle.id)),
          before: snapshot(),
          selection: [...selected],
        };
        render();
        updateInspector();
        return;
      }
      const hit = hitTest(p);
      if (hit) {
        const hitIds =
          tool === "direct" ? new Set([hit.id]) : expandGroups([hit.id]);
        if (e.shiftKey) {
          if (selected.has(hit.id)) hitIds.forEach((id) => selected.delete(id));
          else hitIds.forEach((id) => selected.add(id));
        } else if (
          !selected.has(hit.id) ||
          (tool !== "direct" && [...hitIds].some((id) => !selected.has(id)))
        ) {
          selected = hitIds;
          editPoints = false;
        }
        if (selected.has(hit.id) && tool !== "direct") startMove(p);
        render();
        updateInspector();
        return;
      }
      if (!e.shiftKey) selected.clear();
      interaction = {
        type: tool === "lasso" ? "lasso" : "marquee",
        start: p,
        points: [p],
        append: e.shiftKey,
      };
      editPoints = false;
      render();
      updateInspector();
      return;
    }
    if (tool === "crossing") {
      const c = [...crossings].sort((a, b) => dist(a.p, p) - dist(b.p, p))[0];
      if (c && dist(c.p, p) < 16 / view.zoom) swapCrossing(c);
      else toast("Click where two strings cross");
      return;
    }
    if (tool === "fill") {
      fillAt(p);
      return;
    }
    if (tool === "dot") {
      addObject(
        makeObject(
          "ellipse",
          {
            x: p.x,
            y: p.y,
            rx: 2 / 0.75,
            ry: 2 / 0.75,
            dot: true,
            width: 0,
            pattern: "solid",
            fillColor: defaults.color,
            opacity: 1,
            text: "",
          },
          e.shiftKey,
        ),
      );
      setTool("select");
      return;
    }
    if (tool === "text") {
      startText(p);
      return;
    }
    if (["polyline", "bezier", "bezier-region"].includes(tool)) {
      if (e.detail > 1) return;
      draftClick(p, e);
      render();
      return;
    }
    if (tool === "region" && draft) {
      draftClick(p, e);
      render();
      return;
    }
    if (tool === "line" && draft) {
      draftClick(p, e);
      render();
      return;
    }
    beginDraft(tool, p, e.shiftKey);
    interaction = { type: "draw", start: p, points: [p] };
    render();
  }
  function pointerMove(e) {
    if (pendingTemplate) return;
    cursor = toWorld(
      e,
      interaction?.type === "handle" ||
        (!["select", "direct", "lasso", "freehand"].includes(tool) &&
          interaction?.type !== "pan"),
    );
    if (draft) {
      draft.preview = cursor;
      draft.end = cursor;
    }
    if (!interaction) {
      if (["select", "direct", "lasso"].includes(tool))
        canvas.style.cursor = handleHit(cursor, tool === "direct")
          ? "crosshair"
          : hitTest(cursor) && tool !== "direct"
            ? "move"
            : "default";
      if (draft || $("node-snap").checked) requestRender();
      return;
    }
    const d = interaction;
    if (d.type === "pan") {
      view.x = d.view.x - (e.clientX - d.start.x) / view.zoom;
      view.y = d.view.y - (e.clientY - d.start.y) / view.zoom;
      requestRender();
      return;
    }
    if (d.type === "move") {
      const delta = sub(cursor, d.start);
      for (const original of d.original) {
        const o = model.objects.find((n) => n.id === original.id);
        Object.assign(o, clone(original));
        moveObject(o, delta.x, delta.y);
      }
      requestRender();
      return;
    }
    if (d.type === "handle") {
      const o = model.objects.find((n) => n.id === d.id);
      if (d.key === "radius") {
        o.rx = o.ry = Math.max(
          0.5,
          d.original.rx + dist(cursor, o) - dist(d.start, d.original),
        );
      } else if (String(d.key).startsWith("tangent-")) {
        const [, side, index] = d.key.split("-"),
          i = Number(index),
          v = sub(cursor, o.points[i]);
        o.tangents[i][side] = v;
        if (!e.ctrlKey && !e.metaKey) {
          const other = side === "in" ? "out" : "in",
            length = Math.hypot(o.tangents[i][other].x, o.tangents[i][other].y),
            magnitude = Math.hypot(v.x, v.y) || 1;
          o.tangents[i][other] = {
            x: (-v.x / magnitude) * length,
            y: (-v.y / magnitude) * length,
          };
        }
      } else if (d.key === "c1" || d.key === "c2") o[d.key] = { ...cursor };
      else if (d.key === "start") o.points[0] = { ...cursor };
      else if (d.key === "end") o.points[1] = { ...cursor };
      else if (d.key === "rx") o.rx = Math.max(2, Math.abs(cursor.x - o.x));
      else if (d.key === "ry") o.ry = Math.max(2, Math.abs(cursor.y - o.y));
      else o.points[d.key] = { ...cursor };
      requestRender();
      return;
    }
    if (d.type === "lasso") {
      if (dist(d.points.at(-1), cursor) > 2 / view.zoom)
        d.points.push({ ...cursor });
      requestRender();
      return;
    }
    if (d.type === "draw" && draft) {
      if (
        ["freehand", "region"].includes(draft.tool) &&
        dist(draft.points.at(-1), cursor) > 1.5 / view.zoom
      ) {
        draft.points.push({ ...cursor });
        draft.free = true;
      }
      requestRender();
      return;
    }
    requestRender();
  }
  function pointerUp(e) {
    if (!interaction) return;
    cursor = toWorld(
      e,
      !["select", "direct", "freehand", "lasso"].includes(tool),
    );
    const d = interaction;
    interaction = null;
    if (canvas.hasPointerCapture(e.pointerId))
      canvas.releasePointerCapture(e.pointerId);
    if (["move", "handle"].includes(d.type)) {
      if (snapshot() !== d.before) {
        pushHistory(d.before);
        finishChange();
      } else {
        render();
        updateInspector();
      }
      return;
    }
    if (d.type === "marquee") {
      if (dist(d.start, cursor) > 3 / view.zoom)
        selectionPolygon(rectanglePoints(d.start, cursor), d.append);
      else {
        render();
        updateInspector();
      }
      return;
    }
    if (d.type === "lasso") {
      if (d.points.length > 2) selectionPolygon(d.points, d.append);
      else render();
      return;
    }
    if (d.type === "draw") {
      if (!draft) return;
      draft.end = cursor;
      const moved = dist(d.start, cursor) > 3 / view.zoom;
      if (tool === "region" && !moved && !draft.free) {
        draft.points = [d.start];
        draft.free = false;
        render();
        return;
      }
      if (tool === "line" && !moved) {
        render();
        return;
      }
      finishDraft();
      return;
    }
    if (d.type === "pan") {
      canvas.style.cursor = space ? "grab" : "default";
      render();
    }
  }
  function doubleClick(e) {
    e.preventDefault();
    if (
      ["polyline", "region", "bezier", "bezier-region"].includes(tool) &&
      draft
    ) {
      finishDraft();
      return;
    }
    if (!["select", "direct", "lasso"].includes(tool)) return;
    const hit = hitTest(toWorld(e));
    if (!hit) return;
    selected = new Set([hit.id]);
    if (["text", "ellipse"].includes(hit.kind))
      startText({ x: hit.x, y: hit.y }, hit);
    else {
      editPoints = true;
      render();
      updateInspector();
    }
  }
  function startText(p, object = null) {
    const editor = $("text-editor");
    textTarget = { p, object };
    const screen = toScreen(p);
    editor.style.left = `${Math.max(0, Math.min(dimensions.w - 180, screen.x))}px`;
    editor.style.top = `${Math.max(0, Math.min(dimensions.h - 40, screen.y - 15))}px`;
    editor.value = object?.text || "";
    editor.hidden = false;
    editor.focus();
    editor.select();
  }
  function finishText(cancel = false) {
    if (!textTarget) return;
    const target = textTarget,
      value = $("text-editor").value;
    textTarget = null;
    $("text-editor").hidden = true;
    if (cancel) return;
    if (target.object) {
      if (value !== target.object.text)
        change(() => (target.object.text = value));
    } else if (value.trim())
      addObject(
        makeObject("text", {
          x: target.p.x,
          y: target.p.y,
          text: value,
          fontSize: defaults.fontSize,
        }),
      );
  }

  // Build a planar graph of string segments and walk bounded faces for the fill bucket.
  // These polygons live behind strings; crossing masks never touch their textures.
  function enclosedFace(p) {
    const segments = [];
    for (const o of model.objects.filter((o) => o.kind === "line")) {
      const pts = simplify(sampleBase(o), 0.5);
      for (let i = 1; i < pts.length; i++)
        if (dist(pts[i - 1], pts[i]) > 0.5)
          segments.push({ a: pts[i - 1], b: pts[i], cuts: [0, 1] });
      if (pts.length > 3 && dist(pts[0], pts.at(-1)) < 10)
        segments.push({ a: pts.at(-1), b: pts[0], cuts: [0, 1] });
    }
    if (segments.length > 2200) {
      toast("This drawing is large; use the filled-region tool to shade it");
      return null;
    }
    for (let i = 0; i < segments.length; i++)
      for (let j = i + 1; j < segments.length; j++) {
        const a = segments[i],
          b = segments[j],
          h = segmentIntersection(a.a, a.b, b.a, b.b);
        if (h) {
          a.cuts.push(h.t);
          b.cuts.push(h.u);
        }
      }
    const nodes = [],
      nodeMap = new Map(),
      edges = new Set();
    const node = (p) => {
      const key = `${Math.round(p.x * 2)},${Math.round(p.y * 2)}`;
      if (!nodeMap.has(key)) {
        nodeMap.set(key, nodes.length);
        nodes.push({ p, neighbors: [] });
      }
      return nodeMap.get(key);
    };
    for (const seg of segments) {
      const ts = [
        ...new Set(seg.cuts.map((t) => Math.round(t * 1e8) / 1e8)),
      ].sort((a, b) => a - b);
      for (let i = 1; i < ts.length; i++) {
        const a = node(lerp(seg.a, seg.b, ts[i - 1])),
          b = node(lerp(seg.a, seg.b, ts[i]));
        if (a === b) continue;
        const key = a < b ? `${a}:${b}` : `${b}:${a}`;
        if (edges.has(key)) continue;
        edges.add(key);
        nodes[a].neighbors.push(b);
        nodes[b].neighbors.push(a);
      }
    }
    nodes.forEach((n) =>
      n.neighbors.sort(
        (a, b) =>
          Math.atan2(nodes[a].p.y - n.p.y, nodes[a].p.x - n.p.x) -
          Math.atan2(nodes[b].p.y - n.p.y, nodes[b].p.x - n.p.x),
      ),
    );
    const visited = new Set(),
      faces = [];
    for (let start = 0; start < nodes.length; start++)
      for (const neighbor of nodes[start].neighbors) {
        if (visited.has(`${start}:${neighbor}`)) continue;
        let a = start,
          b = neighbor,
          poly = [],
          closed = false;
        for (let step = 0; step < edges.size * 2 + 1; step++) {
          const key = `${a}:${b}`;
          if (visited.has(key)) {
            closed = a === start && b === neighbor;
            break;
          }
          visited.add(key);
          poly.push(nodes[a].p);
          const ns = nodes[b].neighbors,
            index = ns.indexOf(a),
            next = ns[(index + ns.length - 1) % ns.length];
          a = b;
          b = next;
        }
        if (!closed || poly.length < 3) continue;
        const area =
          poly.reduce(
            (sum, a, i) => sum + cross(a, poly[(i + 1) % poly.length]),
            0,
          ) / 2;
        if (area > 4 && pointInPolygon(p, poly)) faces.push({ poly, area });
      }
    faces.sort((a, b) => a.area - b.area);
    return faces[0]?.poly || null;
  }
  function fillAt(p) {
    const existing = [...model.objects]
      .filter((o) => o.kind === "region" || o.kind === "ellipse")
      .sort((a, b) => b.z - a.z)
      .find((o) =>
        o.kind === "region"
          ? pointInPolygon(p, sampleBase(o))
          : ((p.x - o.x) / o.rx) ** 2 + ((p.y - o.y) / o.ry) ** 2 <= 1,
      );
    if (existing) {
      change(() => {
        existing.pattern = defaults.pattern;
        existing.fillColor = defaults.fillColor;
        existing.opacity = defaults.opacity;
        selected = new Set([existing.id]);
      });
      return;
    }
    const face = enclosedFace(p);
    if (!face) {
      toast("No closed area here. Close the outline or draw a filled region.");
      return;
    }
    addObject(makeObject("region", { points: face, width: 0 }));
  }
  const templateNames = {
    cup: "Cup",
    cap: "Cap",
    "cup-arc": "Semicircular cup",
    "cap-arc": "Semicircular cap",
    crossing: "Crossing",
    braid: "Three-strand braid",
    categories: "Regions A, B, C",
    sheet: "2D surface",
    box: "3D block",
    identity: "Identity",
    merge: "Merge",
    split: "Split",
    loop: "Loop",
    node: "Node",
    sheetSide: "Side surface",
  };
  function templateObjects(type) {
    const line = (points, extra = {}) => ({
      kind: "line",
      points,
      curve: "polyline",
      pattern: "none",
      ...extra,
    });
    const curve = (a, b, c1, c2) => line([a, b], { curve: "bezier", c1, c2 });
    const region = (points, extra = {}) => ({
      kind: "region",
      points,
      ...extra,
    });
    const p = (x, y) => ({ x, y });
    switch (type) {
      case "cup":
        return [curve(p(-55, -35), p(55, -35), p(-55, 65), p(55, 65))];
      case "cap":
        return [curve(p(-55, 35), p(55, 35), p(-55, -65), p(55, -65))];
      case "cup-arc":
      case "cap-arc": {
        const sign = type === "cup-arc" ? 1 : -1,
          k = 26.51;
        return [
          line([p(-48, 0), p(0, 48 * sign), p(48, 0)], {
            curve: "spline",
            tangents: [
              { in: p(0, 0), out: p(0, k * sign) },
              { in: p(-k, 0), out: p(k, 0) },
              { in: p(0, k * sign), out: p(0, 0) },
            ],
          }),
        ];
      }
      case "categories":
        return [
          ...[-72, -24, 24].map((x, i) =>
            region([p(x, -55), p(x + 48, -55), p(x + 48, 55), p(x, 55)], {
              width: 0,
              opacity: [0.2, 0.45, 0.7][i],
            }),
          ),
          line([p(-24, -55), p(-24, 55)]),
          line([p(24, -55), p(24, 55)]),
          ...["A", "B", "C"].map((text, i) => ({
            kind: "text",
            x: -48 + i * 48,
            y: 0,
            text,
            fontSize: 18,
          })),
        ];
      case "identity":
        return [line([p(-30, -55), p(-30, 55)]), line([p(30, -55), p(30, 55)])];
      case "crossing":
        return [line([p(-50, -50), p(50, 50)]), line([p(50, -50), p(-50, 50)])];
      case "braid":
        return [
          [-46, 0, 46, 46],
          [0, -46, -46, 0],
          [46, 46, 0, -46],
        ].map((xs, j) =>
          line(
            xs.map((x, i) => p(x, -66 + i * 44)),
            {
              curve: "spline",
              _layer: 3 - j,
              tangents: xs.map(() => ({ in: p(0, -22), out: p(0, 22) })),
            },
          ),
        );
      case "sheet":
        return [region([p(-65, -20), p(25, -50), p(65, 20), p(-25, 50)])];
      case "sheetSide":
        return [
          region([p(-65, 0), p(35, -35), p(65, 0), p(-35, 35)]),
          line([p(-65, 0), p(-65, 12), p(-35, 47), p(65, 12), p(65, 0)], {}),
          line([p(-35, 35), p(-35, 47)]),
        ];
      case "box":
        return [
          region([p(-50, -25), p(15, -50), p(55, -20), p(-10, 5)], {
            opacity: 0.3,
          }),
          region([p(-50, -25), p(-10, 5), p(-10, 55), p(-50, 25)], {
            opacity: 0.6,
          }),
          region([p(-10, 5), p(55, -20), p(55, 30), p(-10, 55)], {
            opacity: 0.5,
          }),
        ];
      case "merge":
        return [
          curve(p(-45, -55), p(0, 0), p(-45, -20), p(0, -30)),
          curve(p(45, -55), p(0, 0), p(45, -20), p(0, -30)),
          line([p(0, 0), p(0, 55)]),
          {
            kind: "ellipse",
            x: 0,
            y: 0,
            rx: 4,
            ry: 4,
            width: 0,
            pattern: "solid",
            opacity: 1,
          },
        ];
      case "split":
        return [
          curve(p(0, 0), p(-45, 55), p(0, 30), p(-45, 20)),
          curve(p(0, 0), p(45, 55), p(0, 30), p(45, 20)),
          line([p(0, -55), p(0, 0)]),
          {
            kind: "ellipse",
            x: 0,
            y: 0,
            rx: 4,
            ry: 4,
            width: 0,
            pattern: "solid",
            opacity: 1,
          },
        ];
      case "loop":
        return [
          curve(p(0, -45), p(0, 45), p(-85, -45), p(-85, 45)),
          curve(p(0, 45), p(0, -45), p(85, 45), p(85, -45)),
        ];
      case "node":
        return [
          line([p(0, -60), p(0, -24)]),
          line([p(0, 24), p(0, 60)]),
          {
            kind: "ellipse",
            x: 0,
            y: 0,
            rx: 30,
            ry: 24,
            pattern: "solid",
            opacity: 0.12,
            text: "f",
            fontSize: 22,
          },
        ];
      default:
        return [];
    }
  }
  let pendingTemplate = null,
    templatePointer = { x: 0, y: 0 };
  let templatePreviewSignature = "";
  function templatePieces(type) {
    const pieces = [],
      edges = new Set();
    for (const raw of templateObjects(type)) {
      const item = { ...clone(defaults), ...raw };
      if (raw.opacity !== undefined && raw.kind === "region")
        item.opacity = Math.min(1, (raw.opacity * defaults.opacity) / 0.45);
      if (item.kind === "region") {
        pieces.push({ ...item, width: 0 });
        if (raw.width !== 0)
          for (let i = 0; i < item.points.length; i++) {
            const a = item.points[i],
              b = item.points[(i + 1) % item.points.length];
            const key = [`${a.x},${a.y}`, `${b.x},${b.y}`].sort().join(":");
            if (!edges.has(key)) {
              edges.add(key);
              pieces.push({
                ...clone(defaults),
                kind: "line",
                curve: "polyline",
                points: [clone(a), clone(b)],
              });
            }
          }
      } else if (
        item.kind === "line" &&
        item.curve === "polyline" &&
        item.points.length > 2
      ) {
        for (let i = 1; i < item.points.length; i++)
          pieces.push({
            ...item,
            points: [clone(item.points[i - 1]), clone(item.points[i])],
          });
      } else pieces.push(item);
    }
    return pieces;
  }
  function templateScene(type) {
    return templatePieces(type).map((item, i) => ({
      ...item,
      id: i + 1,
      z: item._layer ?? i + 1,
    }));
  }
  function paintTemplate(target, type, prefix) {
    target.replaceChildren();
    const objects = templateScene(type),
      cs = computeCrossings(objects, {}),
      defs = svg("defs", {}, target);
    for (const kind of ["region", "line", "ellipse", "text"])
      for (const o of objects
        .filter((o) => o.kind === kind)
        .sort((a, b) => a.z - b.z))
        renderObject(o, target, defs, true, false, cs, prefix);
  }
  function refreshTemplates() {
    const signature = JSON.stringify(defaults);
    if (signature !== templatePreviewSignature) {
      templatePreviewSignature = signature;
      for (const button of document.querySelectorAll(".template-card"))
        paintTemplate(
          button.querySelector("svg"),
          button.dataset.template,
          `thumb-${button.dataset.template}-`,
        );
      if (pendingTemplate)
        paintTemplate($("template-ghost"), pendingTemplate, "ghost-");
    }
  }
  function cancelTemplate() {
    pendingTemplate = null;
    $("template-ghost")?.remove();
    document
      .querySelectorAll(".template-card")
      .forEach((b) => b.classList.remove("active"));
  }
  function moveTemplateGhost(e) {
    if (!pendingTemplate) return;
    if (e) templatePointer = { x: e.clientX, y: e.clientY };
    const ghost = $("template-ghost"),
      size = 180 * view.zoom;
    if (!ghost) return;
    let point = templatePointer;
    const rect = canvas.getBoundingClientRect();
    if (
      point.x >= rect.left &&
      point.x <= rect.right &&
      point.y >= rect.top &&
      point.y <= rect.bottom
    ) {
      const world = toWorld({ clientX: point.x, clientY: point.y }, true),
        screen = toScreen(world);
      point = { x: rect.left + screen.x, y: rect.top + screen.y };
    }
    ghost.style.width = ghost.style.height = size + "px";
    ghost.style.left = point.x - size / 2 + "px";
    ghost.style.top = point.y - size / 2 + "px";
  }
  function beginTemplate(type, e) {
    setTool("select");
    selected.clear();
    pendingTemplate = type;
    const ghost = svg(
      "svg",
      {
        id: "template-ghost",
        viewBox: "-90 -90 180 180",
        "aria-hidden": "true",
      },
      document.body,
    );
    paintTemplate(ghost, type, "ghost-");
    templatePointer = { x: e.clientX, y: e.clientY };
    document
      .querySelectorAll(".template-card")
      .forEach((b) =>
        b.classList.toggle("active", b.dataset.template === type),
      );
    moveTemplateGhost();
    render();
    updateInspector();
  }
  function placeTemplate(type, p, under = false) {
    cancelDrawing();
    change(() => {
      const objects = templateScene(type).sort((a, b) => a.z - b.z);
      const base = under
        ? Math.min(0, ...model.objects.map((o) => o.z)) - objects.length
        : zNext();
      for (const [i, item] of objects.entries()) {
        const { id, z, _layer, ...data } = item;
        const o = makeObject(item.kind, {
          ...data,
          name: templateNames[type],
          z: base + i,
        });
        moveObject(o, p.x, p.y);
        model.objects.push(o);
      }
      selected.clear();
    });
    setTool("select");
  }
  function scrollTemplates(direction) {
    $("templates").scrollBy({
      left: direction * Math.max(150, $("templates").clientWidth * 0.7),
      behavior: "smooth",
    });
  }
  function updateTemplateArrows() {
    const strip = $("templates");
    if (!strip) return;
    const overflow = strip.scrollWidth > strip.clientWidth + 2;
    for (const id of ["templates-prev", "templates-next"])
      $(id).hidden = !overflow;
    $("templates-prev").disabled = strip.scrollLeft <= 1;
    $("templates-next").disabled =
      strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2;
  }
  function buildTemplates() {
    for (const [type, name] of Object.entries(templateNames)) {
      const button = document.createElement("button");
      button.className = "template-card";
      button.draggable = true;
      button.title = name + " · click, then place";
      button.setAttribute("aria-label", name);
      button.dataset.template = type;
      button.append(
        svg("svg", { viewBox: "-90 -90 180 180", "aria-hidden": "true" }),
      );
      button.addEventListener("dragstart", (e) => {
        cancelTemplate();
        e.dataTransfer.setData("application/x-string-template", type);
        e.dataTransfer.setData("text/plain", type);
        e.dataTransfer.effectAllowed = "copy";
      });
      button.addEventListener("click", (e) => beginTemplate(type, e));
      $("templates").append(button);
    }
    $("templates-prev").addEventListener("click", () => scrollTemplates(-1));
    $("templates-next").addEventListener("click", () => scrollTemplates(1));
    $("templates").addEventListener("scroll", updateTemplateArrows);
    new ResizeObserver(updateTemplateArrows).observe($("templates"));
    document.addEventListener("pointermove", moveTemplateGhost);
    refreshTemplates();
  }
  function loadDemo() {
    cancelDrawing();
    change(() => {
      model.objects = [];
      model.overrides = {};
      const add = (kind, extra) => {
        const o = makeObject(kind, {
          color: INK,
          fillColor: "#7c9885",
          width: 2,
          style: "solid",
          arrows: "none",
          gap: 7,
          pattern: "none",
          opacity: 0.45,
          ...extra,
        });
        model.objects.push(o);
        return o;
      };
      add("region", {
        points: [
          { x: 290, y: 245 },
          { x: 540, y: 160 },
          { x: 705, y: 350 },
          { x: 455, y: 435 },
        ],
        pattern: "hatch",
        color: "#7c9885",
        width: 1.3,
        opacity: 0.5,
        name: "Shaded surface",
      });
      add("line", {
        points: [
          { x: 360, y: 105 },
          { x: 630, y: 515 },
        ],
        curve: "bezier",
        c1: { x: 330, y: 320 },
        c2: { x: 680, y: 290 },
        name: "String A",
        width: 2.5,
      });
      add("line", {
        points: [
          { x: 640, y: 95 },
          { x: 350, y: 515 },
        ],
        curve: "bezier",
        c1: { x: 665, y: 335 },
        c2: { x: 340, y: 275 },
        name: "String B",
        color: "#526f5c",
        width: 2.5,
        arrows: "middle",
      });
      add("text", { x: 318, y: 93, text: "A", fontSize: 20, name: "Label A" });
      add("text", { x: 682, y: 87, text: "B", fontSize: 20, name: "Label B" });
      selected.clear();
    });
    setTool("select");
    fit();
  }

  function exportSVG() {
    const root = svg("svg", { xmlns: NS }),
      defs = svg("defs", {}, root);
    const b = bounds(),
      pad = Math.max(25, ...model.objects.map((o) => o.width + o.gap));
    root.setAttribute(
      "viewBox",
      `${b.x - pad} ${b.y - pad} ${b.w + pad * 2} ${b.h + pad * 2}`,
    );
    root.setAttribute("width", Math.ceil(b.w + pad * 2));
    root.setAttribute("height", Math.ceil(b.h + pad * 2));
    for (const kind of ["region", "line", "ellipse", "text"])
      for (const o of model.objects
        .filter((o) => o.kind === kind)
        .sort((a, b) => a.z - b.z))
        renderObject(o, root, defs);
    return new XMLSerializer().serializeToString(root);
  }
  function download(data, type, name) {
    const blob = data instanceof Blob ? data : new Blob([data], { type });
    const url = URL.createObjectURL(blob),
      link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function exportFile(format) {
    closeMenus();
    if (format === "json") {
      download(
        JSON.stringify(model, null, 2),
        "application/json",
        "string-diagram.json",
      );
      toast("Project saved");
      return;
    }
    if (format === "tikz") {
      download(
        generatePreamble() + "\n\n" + generateTikZ(),
        "text/plain",
        "string-diagram.tex",
      );
      return;
    }
    const source = exportSVG();
    if (format === "svg") {
      download(source, "image/svg+xml", "string-diagram.svg");
      return;
    }
    const url = URL.createObjectURL(
      new Blob([source], { type: "image/svg+xml" }),
    );
    try {
      const image = new Image();
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = url;
      });
      const output = document.createElement("canvas"),
        scale = Math.min(2, 4096 / Math.max(image.width, image.height));
      output.width = Math.max(1, Math.ceil(image.width * scale));
      output.height = Math.max(1, Math.ceil(image.height * scale));
      output
        .getContext("2d")
        .drawImage(image, 0, 0, output.width, output.height);
      const blob = await new Promise((resolve) =>
        output.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("PNG encoding failed");
      download(blob, "image/png", "string-diagram.png");
    } catch {
      toast("PNG export failed. Try SVG instead.");
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  const cmCoord = (value) => Number((value / CM).toFixed(5));
  const tikzCoord = (p) => `(${cmCoord(p.x)},${cmCoord(p.y)})`;
  function tikzPath(o) {
    if (["bezier", "spline"].includes(o.curve))
      return (
        tikzCoord(o.points[0]) +
        " " +
        curveSegments(o)
          .map(
            ({ b, c1, c2 }) =>
              `.. controls ${tikzCoord(c1)} and ${tikzCoord(c2)} .. ${tikzCoord(b)}`,
          )
          .join(" ")
      );
    return o.points.map(tikzCoord).join(" -- ");
  }

  function texLabel(text) {
    if (text.includes("$") || /\\[a-zA-Z]/.test(text)) return text;
    return text.replace(
      /[\\{}%&#_^~]/g,
      (c) =>
        ({
          "\\": "\\textbackslash{}",
          "{": "\\{",
          "}": "\\}",
          "%": "\\%",
          "&": "\\&",
          "#": "\\#",
          _: "\\_",
          "^": "\\textasciicircum{}",
          "~": "\\textasciitilde{}",
        })[c],
    );
  }
  function generateTikZ() {
    const ordered = ["region", "line", "ellipse", "text"].flatMap((kind) =>
      model.objects.filter((o) => o.kind === kind).sort((a, b) => a.z - b.z),
    );
    const palette = new Map(),
      styles = new Map(),
      codes = [];
    const colour = (hex) => {
      hex = hex.toLowerCase();
      if (colourNames.has(hex)) return colourNames.get(hex);
      if (!palette.has(hex)) palette.set(hex, `c${palette.size + 1}`);
      return palette.get(hex);
    };
    const patterns = {
      hatch: "north east lines",
      backhatch: "north west lines",
      crosshatch: "crosshatch",
      dots: "dots",
      horizontal: "horizontal lines",
    };
    const options = (o) => {
      const opts = [
        `draw=${o.width || o.kind === "line" ? colour(o.color) : "none"}`,
      ];
      if (o.width) opts.push(`line width=${fmt(o.width * 0.75)}pt`);
      if (o.kind === "line") {
        if (o.style === "dashed")
          opts.push(
            `dash pattern=on ${fmt((o.width * 4 + 4) * 0.75)}pt off ${fmt((o.width * 2 + 3) * 0.75)}pt`,
          );
        if (o.style === "dotted")
          opts.push(
            `dash pattern=on 0.01pt off ${fmt((o.width * 2 + 4) * 0.75)}pt`,
          );
        if (o.style === "squiggly")
          opts.push(
            "decorate",
            "decoration={snake,amplitude=2.7pt,segment length=13.5pt}",
          );
        if (o.arrows === "end") opts.push("-{Stealth}");
        if (o.arrows === "start") opts.push("{Stealth}-");
        if (o.arrows === "both") opts.push("{Stealth}-{Stealth}");
      } else {
        opts.push("even odd rule");
        if (o.pattern === "solid")
          opts.push(`fill=${colour(o.fillColor || o.color)}`);
        else if (o.pattern !== "none")
          opts.push(
            `pattern=${patterns[o.pattern]}`,
            `pattern color=${colour(o.fillColor || o.color)}`,
          );
        if (o.pattern !== "none" && o.opacity !== 1)
          opts.push(`fill opacity=${o.opacity}`);
      }
      return opts.join(", ");
    };
    const objectOptions = new Map();
    for (const o of ordered) {
      if (o.kind === "text") {
        colour(o.color);
        continue;
      }
      if (o.text) colour(o.color);
      const opts = options(o);
      objectOptions.set(o.id, opts);
      styles.set(opts, (styles.get(opts) || 0) + 1);
    }
    const shared = new Map();
    for (const [opts, count] of styles)
      if (count > 1) shared.set(opts, `s${shared.size + 1}`);
    codes.push(
      "\\begin{tikzpicture}[x=1cm,y=-1cm,line cap=round,line join=round]",
    );
    if (palette.size) codes.push("");
    for (const [hex, name] of palette)
      codes.push(`\\definecolor{${name}}{HTML}{${hex.slice(1).toUpperCase()}}`);
    if (shared.size) codes.push("");
    for (const [opts, name] of shared)
      codes.push(`\\tikzset{${name}/.style={${opts}}}`);
    const preserveIds = Object.keys(model.overrides).length > 0;
    const b = bounds(),
      pad = 100,
      ids = new Map(ordered.map((o, i) => [o.id, preserveIds ? o.id : i + 1]));
    const extent = `${tikzCoord({ x: b.x - pad, y: b.y - pad })} rectangle ${tikzCoord({ x: b.x + b.w + pad, y: b.y + b.h + pad })}`;
    const textOptions = (o) =>
      `text=${colour(o.color)},font=\\fontsize{${fmt((o.fontSize || 18) * 0.75)}pt}{${fmt((o.fontSize || 18) * 0.9)}pt}\\selectfont`;
    for (const o of ordered) {
      codes.push("");
      // Crossing ordinals are measured along the lower-ID line. Preserve those
      // IDs when overrides exist so reordering paths cannot move an override.
      if (preserveIds)
        codes.push(`% string-id: ${o.id}; name: ${encodeURIComponent(o.name)}`);
      const opts =
        shared.get(objectOptions.get(o.id)) || objectOptions.get(o.id);
      if (o.kind === "line") {
        const holes = crossings.filter(
          (c) => c.lower === o.id && c.r > o.width / 2,
        );
        if (holes.length) {
          codes.push("\\begin{scope}[even odd rule]");
          for (const c of holes)
            codes.push(
              `\\clip ${extent} ${tikzCoord(c.p)} circle (${fmt(c.r * 0.75)}pt);`,
            );
        }
        codes.push(`\\draw[${opts}] ${tikzPath(o)};`);
        if (o.arrows === "middle") {
          const { p, x, y } = arrowPath(
              (geometry.get(o.id) || lineGeometry(o)).points,
              "middle",
            ),
            size = Math.max(7, o.width * 3);
          codes.push(
            `% string-arrow\n\\draw[draw=${colour(o.color)},line width=${fmt(o.width * 0.75)}pt] ${tikzCoord({ x: p.x - x * size - y * size * 0.45, y: p.y - y * size + x * size * 0.45 })} -- ${tikzCoord(p)} -- ${tikzCoord({ x: p.x - x * size + y * size * 0.45, y: p.y - y * size - x * size * 0.45 })};`,
          );
        }
        if (holes.length) codes.push("\\end{scope}");
        const meta = {};
        if (o.gap !== 7) meta.gap = o.gap;
        if (o.arrows === "middle") meta.arrows = "middle";
        if (Object.keys(meta).length)
          codes.push(
            `% string-settings: ${ids.get(o.id)} ${JSON.stringify(meta)}`,
          );
      } else if (o.kind === "text")
        codes.push(
          `\\node[${textOptions(o)}] at ${tikzCoord(o)} {${texLabel(o.text)}};`,
        );
      else {
        const shape =
          o.kind === "region"
            ? tikzPath(o) + " -- cycle"
            : o.dot
              ? `${tikzCoord(o)} circle (${fmt(o.rx * 0.75)}pt)`
              : `${tikzCoord(o)} ellipse (${fmt(o.rx * 0.75)}pt and ${fmt(o.ry * 0.75)}pt)`;
        codes.push(`\\path[${opts}] ${shape};`);
        if (o.kind === "ellipse" && o.text)
          codes.push(
            `% string-node-label\n\\node[${textOptions(o)}] at ${tikzCoord(o)} {${texLabel(o.text)}};`,
          );
      }
    }
    if (preserveIds)
      codes.push(`% string-overrides: ${JSON.stringify(model.overrides)}`);
    codes.push("", "\\end{tikzpicture}");
    let depth = 0;
    return codes
      .join("\n")
      .split("\n")
      .map((line) => {
        const text = line.trim();
        if (!text) return "";
        if (text.startsWith("\\end{")) depth = Math.max(0, depth - 1);
        const result = "  ".repeat(depth) + text;
        if (text.startsWith("\\begin{")) depth++;
        return result;
      })
      .join("\n");
  }
  function generatePreamble() {
    const libraries = [];
    if (
      model.objects.some(
        (o) =>
          ["region", "ellipse"].includes(o.kind) &&
          !["none", "solid"].includes(o.pattern),
      )
    )
      libraries.push("patterns");
    if (model.objects.some((o) => o.kind === "line" && o.arrows !== "none"))
      libraries.push("arrows.meta");
    if (model.objects.some((o) => o.kind === "line" && o.style === "squiggly"))
      libraries.push("decorations.pathmorphing");
    return (
      "\\usepackage{tikz}" +
      (libraries.length
        ? "\n\\usetikzlibrary{" + libraries.join(",") + "}"
        : "")
    );
  }
  function updateCode() {
    if (!codeDirty) $("tikz").value = generateTikZ();
    $("tikz-preamble").value = generatePreamble();
  }

  // Accept the editor's output and the original editor's ordinary TikZ paths.
  // Unrecognised commands are reported; no commands are evaluated as code.
  function parseTikZ(code) {
    const colors = { ...TIKZ_COLOURS, grey: TIKZ_COLOURS.gray };
    for (const match of code.matchAll(
      /\\definecolor\{([^}]+)\}\{HTML\}\{([\da-f]{6})\}/gi,
    ))
      colors[match[1]] = "#" + match[2].toLowerCase();
    const ownPT = /\\begin\{tikzpicture\}\[x=1pt,y=-1pt(?:,|\])/.test(code);
    const ownCM = /\\begin\{tikzpicture\}\[x=1cm,y=-1cm(?:,|\])/.test(code);
    const own = ownPT || ownCM;
    const factor = ownCM ? CM : ownPT ? 1 / 0.75 : 50,
      flip = own ? 1 : -1;
    const point = (x, y) => ({
      x: Number(x) * factor,
      y: Number(y) * factor * flip,
    });
    const color = (value) => {
      const v = (value || "black").trim();
      if (colors[v]) return colors[v];
      if (/^#[\da-f]{6}$/i.test(v)) return v;
      const mix = v.match(/^(\w+)!(\d+)$/);
      if (mix && colors[mix[1]]) {
        const rgb = colors[mix[1]]
          .slice(1)
          .match(/../g)
          .map((h) =>
            Math.round(
              (parseInt(h, 16) * Number(mix[2])) / 100 +
                255 * (1 - Number(mix[2]) / 100),
            ),
          );
        return "#" + rgb.map((n) => n.toString(16).padStart(2, "0")).join("");
      }
      return INK;
    };
    const sharedStyles = new Map(
      [...code.matchAll(/\\tikzset\{(\w+)\/\.style=\{(.*)\}\}/g)].map((m) => [
        m[1],
        m[2],
      ]),
    );
    const result = { version: 2, objects: [], overrides: {}, nextId: 1 },
      dropped = [];
    const settings = new Map();
    for (const m of code.matchAll(/^[ \t]*% string-settings: (\d+) (.+)$/gm)) {
      try {
        settings.set(+m[1], JSON.parse(m[2]));
      } catch {}
    }
    const override = code.match(/^[ \t]*% string-overrides: (.+)$/m);
    if (override) {
      try {
        result.overrides = JSON.parse(override[1]);
      } catch {}
    }
    let idHint = null,
      nameHint = null,
      labelNext = false,
      skipNext = false;
    let buffer = "";
    const commands = [];
    for (const raw of code.split("\n")) {
      const line = raw.trim();
      if (line.startsWith("%")) {
        commands.push(line);
        continue;
      }
      if (!line) continue;
      if (
        /^\\(?:begin|end|definecolor|usetikzlibrary|tikzset|usepackage)/.test(
          line,
        )
      ) {
        continue;
      }
      buffer += " " + line;
      while (buffer.includes(";")) {
        const index = buffer.indexOf(";");
        commands.push(buffer.slice(0, index).trim());
        buffer = buffer.slice(index + 1);
      }
    }
    if (buffer.trim()) dropped.push(buffer.trim());
    for (const command of commands) {
      if (command.startsWith("% string-id:")) {
        const m = command.match(/string-id: (\d+); name: (.*)/);
        if (m) {
          idHint = +m[1];
          try {
            nameHint = decodeURIComponent(m[2]);
          } catch {
            nameHint = m[2];
          }
        }
        continue;
      }
      if (command === "% string-node-label") {
        labelNext = true;
        continue;
      }
      if (command === "% string-arrow") {
        skipNext = true;
        continue;
      }
      if (command.startsWith("%")) continue;
      if (skipNext) {
        skipNext = false;
        continue;
      }
      if (command.startsWith("\\clip")) continue;
      const header = command.match(
        /^\\(draw|path|filldraw|fill|node)\s*(?:\[([^\]]*)\])?\s*(.*)$/s,
      );
      if (!header) {
        dropped.push(command);
        continue;
      }
      const [, verb, rawOpts = "", body] = header;
      const opts = sharedStyles.get(rawOpts) || rawOpts;
      const numberOpt = (name, fallback) => {
        const m = opts.match(new RegExp(name + "\\s*=\\s*([\\d.]+)"));
        return m ? +m[1] : fallback;
      };
      const getOpt = (name) =>
        opts.match(new RegExp("(?:^|,\\s*)" + name + "\\s*=\\s*([^,]+)"))?.[1];
      const stroke = color(
        getOpt("draw") || getOpt("text") || opts.split(",")[0],
      );
      const width = numberOpt("line\\s*width", 0.8) / 0.75;
      const patternName = getOpt("pattern");
      const pattern =
        {
          "north east lines": "hatch",
          "north west lines": "backhatch",
          crosshatch: "crosshatch",
          "crosshatch dots": "dots",
          dots: "dots",
          "horizontal lines": "horizontal",
        }[patternName] ||
        (getOpt("fill") || verb === "fill" ? "solid" : "none");
      const opacity = numberOpt("fill\\s*opacity", 1);
      const id = idHint || result.nextId;
      idHint = null;
      result.nextId = Math.max(result.nextId, id + 1);
      const base = {
        id,
        name: nameHint || `Object ${id}`,
        ...clone(defaults),
        gap: 7,
        color: stroke,
        fillColor: color(getOpt("pattern color") || getOpt("fill") || stroke),
        width: getOpt("draw") === "none" ? 0 : width,
        pattern,
        opacity,
        z: result.objects.length + 1,
      };
      nameHint = null;
      const coords = [
        ...body.matchAll(/\(\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\)/g),
      ].map((m) => point(m[1], m[2]));
      if (!coords.length) {
        dropped.push(command);
        continue;
      }
      let o;
      if (verb === "node") {
        const text = body.match(/\{(.*)\}\s*$/s)?.[1] ?? "",
          fontSize = numberOpt("unlikely", 18);
        const fs = opts.match(/fontsize\{([\d.]+)pt\}/);
        if (labelNext) {
          const last = result.objects.at(-1);
          if (last?.kind === "ellipse") {
            last.text = text;
            last.fontSize = fs ? +fs[1] / 0.75 : 18;
          }
          labelNext = false;
          result.nextId = id;
          continue;
        }
        if (
          /(?:circle|ellipse|rectangle)/.test(opts) &&
          /\bdraw\b/.test(opts)
        ) {
          o = {
            ...base,
            kind: "ellipse",
            x: coords[0].x,
            y: coords[0].y,
            rx: Math.max(18, text.length * 7),
            ry: 18,
            text,
            fontSize: fs ? +fs[1] / 0.75 : fontSize,
          };
          if (/rectangle/.test(opts)) {
            o.kind = "region";
            o.points = rectanglePoints(
              { x: o.x - o.rx, y: o.y - o.ry },
              { x: o.x + o.rx, y: o.y + o.ry },
            );
            const label = {
              ...base,
              id: result.nextId++,
              kind: "text",
              x: o.x,
              y: o.y,
              text,
              fontSize: fs ? +fs[1] / 0.75 : 18,
              name: "Node label",
            };
            result.objects.push(label);
          }
        } else
          o = {
            ...base,
            kind: "text",
            x: coords[0].x,
            y: coords[0].y,
            text: text.replace(/\\([%&#_{}])/g, "$1"),
            fontSize: fs ? +fs[1] / 0.75 : fontSize,
          };
      } else if (/\b(?:ellipse|circle)\b/.test(body)) {
        const ellipse = body.match(
          /ellipse\s*\(([\d.]+)(pt|cm)?\s+and\s+([\d.]+)(pt|cm)?\)/,
        );
        const circle = body.match(/circle\s*\(([\d.]+)(pt|cm)?\)/);
        if (!ellipse && !circle) {
          dropped.push(command);
          continue;
        }
        const unit = (value, suffix) =>
          +value * (suffix === "pt" ? 1 / 0.75 : suffix === "cm" ? CM : factor);
        o = {
          ...base,
          kind: "ellipse",
          x: coords[0].x,
          y: coords[0].y,
          rx: ellipse
            ? unit(ellipse[1], ellipse[2])
            : unit(circle[1], circle[2]),
          ry: ellipse
            ? unit(ellipse[3], ellipse[4])
            : unit(circle[1], circle[2]),
        };
        if (verb === "fill") {
          o.width = 0;
          o.pattern = "solid";
        }
      } else if (
        /\bcycle\b/.test(body) ||
        verb === "fill" ||
        verb === "filldraw"
      ) {
        if (coords.length < 3) {
          dropped.push(command);
          continue;
        }
        o = { ...base, kind: "region", points: coords };
        if (verb === "fill") o.width = 0;
      } else if (coords.length >= 2) {
        if (!own && /\bwhite\b/.test(opts)) continue;
        o = {
          ...base,
          kind: "line",
          points: coords,
          curve: "polyline",
          style: /snake|decorate/.test(opts)
            ? "squiggly"
            : /dash pattern=on 0\.01pt|\bdotted\b/.test(opts)
              ? "dotted"
              : /dashed|dash pattern/.test(opts)
                ? "dashed"
                : "solid",
          arrows: /Stealth\}-\{Stealth|<->/.test(opts)
            ? "both"
            : /-\{|->/.test(opts)
              ? "end"
              : /\}-|<-/.test(opts)
                ? "start"
                : "none",
        };
        if (
          /controls/.test(body) &&
          coords.length > 4 &&
          (coords.length - 1) % 3 === 0
        ) {
          const points = [coords[0]],
            tangents = [{ in: { x: 0, y: 0 }, out: { x: 0, y: 0 } }];
          for (let i = 1; i < coords.length; i += 3) {
            tangents.at(-1).out = sub(coords[i], points.at(-1));
            points.push(coords[i + 2]);
            tangents.push({
              in: sub(coords[i + 1], coords[i + 2]),
              out: { x: 0, y: 0 },
            });
          }
          o.points = points;
          o.tangents = tangents;
          o.curve = "spline";
        } else if (/controls/.test(body) && coords.length === 4) {
          o.points = [coords[0], coords[3]];
          o.c1 = coords[1];
          o.c2 = coords[2];
          o.curve = "bezier";
        } else if (/to\s*\[/.test(body) && coords.length === 2) {
          const angles = body.match(/to\s*\[([^\]]*)\]/)[1];
          const direction = Math.atan2(
            coords[1].y - coords[0].y,
            coords[1].x - coords[0].x,
          );
          const out = angles.match(/out\s*=\s*(-?[\d.]+)/),
            input = angles.match(/in\s*=\s*(-?[\d.]+)/);
          const a = out ? ((+out[1] * Math.PI) / 180) * flip : direction,
            b = input
              ? ((+input[1] * Math.PI) / 180) * flip
              : direction + Math.PI,
            len = dist(coords[0], coords[1]) / 3;
          o.c1 = {
            x: coords[0].x + Math.cos(a) * len,
            y: coords[0].y + Math.sin(a) * len,
          };
          o.c2 = {
            x: coords[1].x + Math.cos(b) * len,
            y: coords[1].y + Math.sin(b) * len,
          };
          o.curve = "bezier";
        }
      } else {
        dropped.push(command);
        continue;
      }
      if (
        o.kind === "region" &&
        /controls/.test(body) &&
        (coords.length - 1) % 3 === 0
      ) {
        const points = [coords[0]],
          tangents = [{ in: { x: 0, y: 0 }, out: { x: 0, y: 0 } }];
        for (let i = 1; i < coords.length; i += 3) {
          tangents.at(-1).out = sub(coords[i], points.at(-1));
          points.push(coords[i + 2]);
          tangents.push({
            in: sub(coords[i + 1], coords[i + 2]),
            out: { x: 0, y: 0 },
          });
        }
        if (dist(points[0], points.at(-1)) < 0.01) {
          tangents[0].in = tangents.pop().in;
          points.pop();
        } else {
          tangents.at(-1).out = { x: 0, y: 0 };
          tangents[0].in = { x: 0, y: 0 };
        }
        Object.assign(o, { curve: "spline", closed: true, points, tangents });
      }
      if (
        o.kind === "ellipse" &&
        /circle/.test(body) &&
        o.width === 0 &&
        o.pattern === "solid"
      )
        o.dot = true;
      if (settings.has(o.id)) {
        const metadata = settings.get(o.id);
        for (const key of ["gap", "z"])
          if (Number.isFinite(metadata[key])) o[key] = metadata[key];
        if (
          ["none", "start", "end", "both", "middle"].includes(metadata.arrows)
        )
          o.arrows = metadata.arrows;
        if (o.kind === "line" && own)
          o.style =
            metadata.style === "squiggly"
              ? /snake/.test(opts)
                ? "squiggly"
                : "solid"
              : ["solid", "dashed", "dotted"].includes(metadata.style)
                ? metadata.style
                : o.style;
      }
      result.objects.push(o);
    }
    return { model: result, dropped };
  }

  function validateProject(value) {
    if (
      !value ||
      value.version !== 2 ||
      !Array.isArray(value.objects) ||
      value.objects.length > 5000
    )
      throw new Error("Choose an editor project (.json)");
    const ids = new Set();
    for (const o of value.objects) {
      if (
        !Number.isInteger(o.id) ||
        ids.has(o.id) ||
        !["line", "region", "ellipse", "text"].includes(o.kind)
      )
        throw new Error("Invalid object in project");
      ids.add(o.id);
      if (
        o.group !== undefined &&
        (!Number.isSafeInteger(o.group) || o.group < 1)
      )
        throw new Error("Invalid movement group");
      o.fillColor ??= o.color;
      if (
        !/^#[\da-f]{6}$/i.test(o.color) ||
        !/^#[\da-f]{6}$/i.test(o.fillColor) ||
        !Number.isFinite(o.width) ||
        o.width < 0 ||
        o.width > 100 ||
        !Number.isFinite(o.gap) ||
        o.gap < 0 ||
        o.gap > 100 ||
        !Number.isFinite(o.z) ||
        !Number.isFinite(o.opacity) ||
        o.opacity < 0 ||
        o.opacity > 1 ||
        ![
          "none",
          "solid",
          "hatch",
          "backhatch",
          "crosshatch",
          "dots",
          "horizontal",
        ].includes(o.pattern) ||
        !["solid", "squiggly", "dashed", "dotted"].includes(o.style) ||
        !["none", "end", "start", "both", "middle"].includes(o.arrows) ||
        typeof o.name !== "string"
      )
        throw new Error("Invalid drawing settings");
      const validPoint = (p) =>
        p &&
        Number.isFinite(p.x) &&
        Number.isFinite(p.y) &&
        Math.abs(p.x) < 100000 &&
        Math.abs(p.y) < 100000;
      if (
        o.points &&
        (!Array.isArray(o.points) ||
          o.points.length > 20000 ||
          !o.points.every(validPoint))
      )
        throw new Error("Invalid path points");
      if (
        o.kind === "line" &&
        (!o.points ||
          o.points.length < 2 ||
          !["polyline", "bezier", "spline"].includes(o.curve))
      )
        throw new Error("Invalid string");
      if (
        o.kind === "line" &&
        o.curve === "bezier" &&
        (o.points.length !== 2 || !validPoint(o.c1) || !validPoint(o.c2))
      )
        throw new Error("Invalid curve");
      if (
        o.curve === "spline" &&
        (!Array.isArray(o.tangents) ||
          o.tangents.length !== o.points.length ||
          !o.tangents.every((t) => validPoint(t.in) && validPoint(t.out)))
      )
        throw new Error("Invalid curve tangents");
      if (o.kind === "region" && (!o.points || o.points.length < 3))
        throw new Error("Invalid region");
      if (["ellipse", "text"].includes(o.kind) && !validPoint(o))
        throw new Error("Invalid position");
      if (
        o.kind === "ellipse" &&
        (!Number.isFinite(o.rx) ||
          !Number.isFinite(o.ry) ||
          o.rx <= 0 ||
          o.ry <= 0 ||
          o.rx > 100000 ||
          o.ry > 100000)
      )
        throw new Error("Invalid ellipse");
      if (
        o.kind === "text" &&
        (typeof o.text !== "string" ||
          !Number.isFinite(o.fontSize) ||
          o.fontSize < 1 ||
          o.fontSize > 1000)
      )
        throw new Error("Invalid label");
    }
    if (
      !value.overrides ||
      typeof value.overrides !== "object" ||
      Array.isArray(value.overrides)
    )
      throw new Error("Invalid crossings");
    for (const [key, upper] of Object.entries(value.overrides)) {
      if (
        !/^\d+:\d+:\d+$/.test(key) ||
        !ids.has(upper) ||
        !key
          .split(":")
          .slice(0, 2)
          .every((id) => ids.has(+id))
      )
        throw new Error("Invalid crossing relationship");
    }
    value.nextId = Math.max(0, ...ids) + 1;
    return value;
  }
  function applyTikZ(code, asNew = false) {
    try {
      const parsed = parseTikZ(code);
      validateProject(parsed.model);
      const emptyPicture =
        /\\begin\{tikzpicture\}[\s\S]*\\end\{tikzpicture\}/.test(code) &&
        !parsed.dropped.length;
      if (!parsed.model.objects.length && !emptyPicture) {
        toast("No supported diagram commands found");
        $("import-report").hidden = false;
        $("import-report").textContent = parsed.dropped.join("\n");
        return;
      }
      if (asNew) {
        if (!openDrawing(parsed.model)) return;
      } else {
        cancelDrawing();
        change(() => {
          model = parsed.model;
          selected.clear();
        });
      }
      fit();
      $("import-report").hidden = !parsed.dropped.length;
      $("import-report").textContent =
        `Skipped ${parsed.dropped.length} unsupported command(s):\n${parsed.dropped.join("\n")}`;
      toast(
        `Imported ${model.objects.length} objects${parsed.dropped.length ? " · see skipped commands" : ""}`,
      );
    } catch (error) {
      toast(error.message);
    }
  }
  let openPopup = null,
    popupTrigger = null,
    colourTarget = "color";
  const menuSpecs = new Map();
  const icons = {
    new: "M5 3h9l5 5v13H5zM14 3v6h5",
    open: "M3 7V4h6l2 3h10v3M3 7h8l2 3h9l-4 10H2z",
    save: "M4 3h14l3 3v15H3V3zM7 3v6h10V3M7 21v-8h10v8",
    export: "M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6",
    undo: "M8 5 3 10l5 5M3 10h11a6 6 0 0 1 0 12",
    redo: "M16 5l5 5-5 5m5-5H10a6 6 0 0 0 0 12",
    cut: "M9 8l11 13M9 16 20 3M9 7a3 3 0 1 1-6 0 3 3 0 1 1 6 0M9 17a3 3 0 1 1-6 0 3 3 0 1 1 6 0",
    copy: "M8 8h12v13H8zM16 8V3H3v13h5",
    paste: "M8 5H4v17h16V5h-4M8 3h8v5H8zM8 12h8m-8 4h8",
    delete: "M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7",
    duplicate: "M3 3h13v13H3zM8 16v5h13V8h-5M9 6v7m-3-3h7",
    arrange: "M3 3h11v11H3zM10 10h11v11H10z",
    front: "M3 3h10v10H3zM10 16v5h11V10h-5",
    back: "M3 3h10v4M3 3v10h4M10 10h11v11H10z",
    flip: "M12 2v20M3 18V6l6 12zM21 18V6l-6 12z",
    group: "M2 7V2h5m10 0h5v5M2 17v5h5m10 0h5v-5M6 6h7v7H6zM11 11h7v7h-7z",
    ungroup: "M2 2h8v8H2zM14 14h8v8h-8zM14 3h7v7M3 14v7h7",
    templates: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    help: "M9 7a3 3 0 1 1 5 2c-2 1-2 2-2 4M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 1 1 18 0",
    nodeSnap:
      "M3 3v7a5 5 0 0 0 10 0V3h-3v7a2 2 0 0 1-4 0V3zM3 6h3m4 0h3M19 13v8m-4-4h8M21 17a2 2 0 1 1-4 0 2 2 0 1 1 4 0",
    grid: "M5 5h.01M12 5h.01M19 5h.01M5 12h.01M12 12h.01M19 12h.01M5 19h.01M12 19h.01M19 19h.01",
    snap: "M5 3v10a7 7 0 0 0 14 0V3h-5v10a2 2 0 0 1-4 0V3zM5 7h5m4 0h5",
    fit: "M3 9V3h6m6 0h6v6M3 15v6h6m6 0h6v-6M8 8h8v8H8z",
    code: "M8 6l-6 6 6 6m8-12 6 6-6 6M14 4l-4 16",
    close: "M6 6l12 12M18 6 6 18",
    check: "M4 12l5 5L20 6",
    minus: "M5 12h14",
    plus: "M5 12h14M12 5v14",
  };
  function icon(name) {
    const el = svg("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" });
    svg(
      "path",
      {
        d: icons[name] || icons.code,
        "stroke-width": name === "grid" ? 3 : 1.5,
      },
      el,
    );
    return el;
  }
  function actionButton(id, title, name, fn, parent) {
    const b = document.createElement("button");
    b.id = id;
    b.type = "button";
    b.className = "icon-button";
    b.title = title;
    b.setAttribute("aria-label", title);
    b.append(icon(name));
    b.addEventListener("click", fn);
    parent.append(b);
    return b;
  }
  function sampleIcon(key, value) {
    const el = svg("svg", {
        viewBox: "0 0 36 22",
        class: "preview-icon",
        "aria-hidden": "true",
      }),
      v = String(value);
    const line = (d, attrs = {}) =>
      svg(
        "path",
        {
          d,
          fill: "none",
          stroke: "currentColor",
          "stroke-width": 1.6,
          "stroke-linecap": "round",
          ...attrs,
        },
        el,
      );
    if (key === "style")
      line(
        v === "squiggly" ? "M3 11q3-8 6 0t6 0t6 0t6 0" : "M3 11H33",
        v === "dashed"
          ? { "stroke-dasharray": "6 4" }
          : v === "dotted"
            ? { "stroke-dasharray": ".1 4" }
            : {},
      );
    if (key === "width")
      line("M4 11H32", {
        "stroke-width": Math.max(0.5, Math.min(12, Number(v))),
      });
    if (key === "arrows") {
      line("M4 11H32");
      if (["start", "both"].includes(v)) line("M10 6l-6 5 6 5");
      if (["end", "both"].includes(v)) line("M26 6l6 5-6 5");
      if (v === "middle") line("M16 6l6 5-6 5");
    }
    if (key === "gap") {
      const gap = Math.min(7, Number(v) * 0.5);
      line(`M10 2v${9 - gap}M10 ${11 + gap}v${9 - gap}`);
      line("M3 11H31");
      if (gap)
        line(`M24 ${11 - gap}h6M27 ${11 - gap}v${gap * 2}M24 ${11 + gap}h6`, {
          "stroke-width": 0.8,
          stroke: "#777",
        });
    }
    if (key === "pattern") {
      const colour = $("fill-color").value;
      svg(
        "rect",
        {
          x: 10,
          y: 3,
          width: 16,
          height: 16,
          fill: v === "solid" ? colour : "none",
          stroke: "#555",
          "stroke-width": 0.8,
        },
        el,
      );
      if (["hatch", "crosshatch"].includes(v))
        line("M10 9l6-6M10 15 22 3M12 19 26 5M18 19l8-8M24 19l2-2", {
          stroke: colour,
          "stroke-width": 0.9,
        });
      if (["backhatch", "crosshatch"].includes(v))
        line("M10 13l6 6M10 7l12 12M12 3l14 14M18 3l8 8M24 3l2 2", {
          stroke: colour,
          "stroke-width": 0.9,
        });
      if (v === "dots")
        for (let x = 13; x < 26; x += 5)
          for (let y = 6; y < 19; y += 5)
            svg("circle", { cx: x, cy: y, r: 1, fill: colour }, el);
      if (v === "horizontal")
        line("M10 7h16M10 11h16M10 15h16", {
          stroke: colour,
          "stroke-width": 0.9,
        });
      if (v === "none")
        line("M10 19 26 3", { stroke: "#d22", "stroke-width": 1 });
    }
    if (key === "opacity") {
      for (let x = 9; x < 27; x += 4)
        for (let y = 3; y < 19; y += 4)
          svg(
            "rect",
            {
              x,
              y,
              width: 4,
              height: 4,
              fill: ((x - 9 + y - 3) / 4) % 2 ? "#ddd" : "#fff",
            },
            el,
          );
      svg(
        "rect",
        {
          x: 9,
          y: 3,
          width: 18,
          height: 16,
          fill: $("fill-color").value,
          "fill-opacity": Number(v) / 100,
          stroke: "#555",
          "stroke-width": 0.7,
        },
        el,
      );
    }
    if (key === "font-size") {
      const text = svg(
        "text",
        {
          x: 18,
          y: 17,
          "text-anchor": "middle",
          "font-family": "serif",
          "font-size": Math.min(22, Number(v)),
        },
        el,
      );
      text.textContent = "A";
    }
    if (key === "export") {
      line("M8 1h15l5 5v15H8zM23 1v6h5");
      svg(
        "rect",
        { x: 4, y: 8, width: 28, height: 10, fill: "#fafafa", stroke: "none" },
        el,
      );
      const text = svg(
        "text",
        {
          x: 18,
          y: 16,
          "text-anchor": "middle",
          "font-family": "sans-serif",
          "font-size": 8,
          fill: "currentColor",
          stroke: "none",
        },
        el,
      );
      text.textContent =
        v === "json" ? "JSON" : v === "tikz" ? "TeX" : v.toUpperCase();
    }
    return el;
  }
  function controlIcon(key) {
    if (!["style", "width", "arrows", "gap"].includes(key))
      return sampleIcon(key, $(key)?.value);
    const el = svg("svg", {
      viewBox: "0 0 36 24",
      class: "preview-icon",
      "aria-hidden": "true",
    });
    const path = (d, width = 1.5, extra = {}) =>
      svg(
        "path",
        {
          d,
          fill: "none",
          stroke: "currentColor",
          "stroke-width": width,
          "stroke-linecap": "round",
          ...extra,
        },
        el,
      );
    if (key === "style") {
      path("M3 4H33");
      path("M3 12H33", 1.5, { "stroke-dasharray": "4 3" });
      path("M3 21q3-6 6 0t6 0t6 0t6 0");
    }
    if (key === "width") {
      path("M4 4H32", 1);
      path("M4 11H32", 3);
      path("M4 20H32", 6);
    }
    if (key === "arrows") {
      path("M3 7H31M26 2l6 5-6 5");
      path("M5 19H32M10 14l-6 5 6 5");
    }
    if (key === "gap") {
      path("M10 1v5m0 12v5", 2);
      path("M3 12H22", 2);
      path("M27 6v12m-3-12h6m-6 12h6", 1, { stroke: "#1976c9" });
    }
    return el;
  }
  function updateToolTip() {
    if (!$("tool-tip")) return;
    const line = ["freehand", "line", "polyline", "bezier"].includes(tool),
      region = [
        "region",
        "rectangle",
        "ellipse",
        "bezier-region",
        "dot",
      ].includes(tool);
    let tip = "";
    if (line || region)
      tip = draft
        ? draft.under
          ? "Drawing underneath"
          : "Drawing on top"
        : "Hold Shift to draw underneath";
    if (
      draft &&
      ["polyline", "bezier", "region", "bezier-region"].includes(tool)
    )
      tip += " · Esc / double-click to finish";
    if (tool === "direct") tip = "Drag a point or tangent · V moves the object";
    if (tool === "dot") tip = "Click for a 2pt dot · drag its handle to resize";
    if (pendingTemplate)
      tip = "Click to place · Shift underneath · Esc cancels";
    $("tool-tip").textContent = tip;
  }
  function installTooltips() {
    const tip = document.createElement("div");
    tip.className = "quick-tooltip";
    tip.id = "quick-tooltip";
    tip.setAttribute("role", "tooltip");
    tip.hidden = true;
    document.body.append(tip);
    let timer, active;
    const hide = () => {
      clearTimeout(timer);
      tip.hidden = true;
      if (active) active.removeAttribute("aria-describedby");
      active = null;
    };
    document.addEventListener("pointerover", (e) => {
      const el = e.target.closest("[title],[data-tooltip]");
      if (!el || el === active) return;
      hide();
      if (el.title) {
        el.dataset.tooltip = el.title;
        el.removeAttribute("title");
      }
      active = el;
      timer = setTimeout(() => {
        if (!el.isConnected) return;
        tip.textContent = el.dataset.tooltip;
        tip.hidden = false;
        el.setAttribute("aria-describedby", tip.id);
        const r = el.getBoundingClientRect();
        tip.style.left =
          Math.max(5, Math.min(innerWidth - tip.offsetWidth - 5, r.left)) +
          "px";
        tip.style.top =
          Math.min(innerHeight - tip.offsetHeight - 5, r.bottom + 6) + "px";
      }, 120);
    });
    document.addEventListener("pointerout", (e) => {
      if (active && !active.contains(e.relatedTarget)) hide();
    });
    document.addEventListener("pointerdown", hide);
    document.addEventListener("keydown", hide);
    window.addEventListener("blur", hide);
  }
  function closeMenus() {
    openPopup?.remove();
    openPopup = null;
    popupTrigger?.setAttribute("aria-expanded", "false");
    popupTrigger = null;
  }
  function menuButton(id, title, options, fn, parent, graphic = null) {
    const b = document.createElement("button");
    b.id = id + "-menu";
    b.className = "menu-trigger";
    b.dataset.menu = id;
    b.title = title;
    b.setAttribute("aria-label", title);
    b.setAttribute("aria-haspopup", "menu");
    b.setAttribute("aria-expanded", "false");
    if (graphic) {
      const picture = icon(graphic);
      picture.classList.add("preview-icon");
      b.append(picture);
    } else b.append(controlIcon(id));
    const chevron = svg("svg", {
      viewBox: "0 0 8 8",
      class: "chevron",
      "aria-hidden": "true",
    });
    svg("path", { d: "M1 3l3 3 3-3" }, chevron);
    b.append(chevron);
    parent.append(b);
    const spec = { id, title, options, fn, b, graphic };
    menuSpecs.set(id, spec);
    b.addEventListener("click", (e) => {
      const previous = popupTrigger;
      closeMenus();
      if (previous === b) return;
      popupTrigger = b;
      b.setAttribute("aria-expanded", "true");
      const popup = document.createElement("div");
      popup.className = "menu-popup";
      popup.setAttribute("role", "menu");
      popup.setAttribute("aria-label", title);
      openPopup = popup;
      for (const option of options) {
        const choice = document.createElement("button");
        choice.className = "menu-choice";
        choice.title = option.title;
        choice.setAttribute("aria-label", option.title);
        choice.dataset.value = option.value;
        choice.dataset.control = id;
        choice.setAttribute("role", $(id) ? "menuitemradio" : "menuitem");
        const checked = $(id)?.value === String(option.value);
        choice.classList.toggle("active", checked);
        if ($(id)) choice.setAttribute("aria-checked", checked);
        choice.append(
          option.icon ? icon(option.icon) : sampleIcon(id, option.value),
        );
        choice.addEventListener("click", () => {
          fn(option.value);
          closeMenus();
        });
        popup.append(choice);
      }
      popup.addEventListener("keydown", (event) => {
        if (["ArrowDown", "ArrowUp"].includes(event.key)) {
          event.preventDefault();
          event.stopPropagation();
          const choices = [...popup.children],
            at = choices.indexOf(document.activeElement);
          choices[
            (at + choices.length + (event.key === "ArrowDown" ? 1 : -1)) %
              choices.length
          ].focus();
        }
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          closeMenus();
          b.focus();
        }
      });
      document.body.append(popup);
      const rect = b.getBoundingClientRect();
      popup.style.top =
        Math.min(innerHeight - popup.offsetHeight - 6, rect.bottom + 6) + "px";
      popup.style.left =
        Math.max(6, Math.min(rect.left, innerWidth - popup.offsetWidth - 6)) +
        "px";
      if (!e.detail) popup.firstElementChild.focus();
    });
    return b;
  }
  function updateControlPreviews() {
    if ($("grid-size")) {
      const cm = Number((gridSpacing / CM).toFixed(3));
      $("grid-size").textContent = `${cm} cm`;
      $("grid-minus").disabled = cm <= GRID_STEPS[0];
      $("grid-plus").disabled = cm >= GRID_STEPS.at(-1);
    }
    for (const [id, { b, graphic }] of menuSpecs)
      if (!graphic && $(id)) {
        b.querySelector(".preview-icon")?.replaceWith(controlIcon(id));
      }
    document
      .querySelector(".stroke-well")
      ?.classList.toggle("active", colourTarget === "color");
    document
      .querySelector(".fill-well")
      ?.classList.toggle("active", colourTarget === "fillColor");
    document
      .querySelectorAll(".swatch")
      .forEach((b) =>
        b.classList.toggle(
          "active",
          b.dataset.color ===
            (colourTarget === "color"
              ? $("color").value
              : $("fill-color").value),
        ),
      );
    $("stroke-chip").style.background = $("color").value;
    $("fill-chip").style.background = $("fill-color").value;
    document
      .querySelectorAll("[data-colour-target]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", b.dataset.colourTarget === colourTarget),
      );
    const fillActive =
      !!pendingTemplate ||
      ["fill", "region", "rectangle", "ellipse", "bezier-region"].includes(
        tool,
      ) ||
      selectedObjects().some((o) => ["region", "ellipse"].includes(o.kind));
    $("fill-controls").classList.toggle("inactive", !fillActive);
    for (const id of ["pattern-menu", "opacity-menu"])
      if ($(id)) $(id).disabled = !fillActive;
    if ($("font-size-menu"))
      $("font-size-menu").hidden =
        tool !== "text" &&
        !selectedObjects().some(
          (o) => o.kind === "text" || o.kind === "ellipse",
        );
  }
  function toggleSidebar() {
    const workspace = document.querySelector(".workspace");
    if (innerWidth <= 750) workspace.classList.toggle("sidebar-open");
    else workspace.classList.toggle("sidebar-hidden");
    $("sidebar-toggle").classList.toggle(
      "active",
      innerWidth <= 750
        ? workspace.classList.contains("sidebar-open")
        : !workspace.classList.contains("sidebar-hidden"),
    );
  }
  function showHelp(show) {
    if (show) {
      const workspace = document.querySelector(".workspace");
      workspace.classList.remove("sidebar-hidden");
      if (innerWidth <= 750) workspace.classList.add("sidebar-open");
      $("sidebar-toggle").classList.add("active");
    }
    $("code-panel").hidden = show;
    $("help-panel").hidden = !show;
  }
  function buildToolbar() {
    const file = $("file-actions"),
      historyBar = $("history-actions"),
      clip = $("clipboard-actions"),
      line = $("line-controls"),
      fill = $("fill-controls"),
      viewBar = $("view-actions"),
      documentBar = $("document-actions");
    actionButton(
      "new",
      "New (Ctrl/⌘ N)",
      "new",
      () => {
        if (openDrawing({ version: 2, objects: [], overrides: {}, nextId: 1 }))
          showDrawings(false);
      },
      file,
    );
    actionButton(
      "load",
      "Load recent drawing",
      "open",
      () => showDrawings($("drawing-strip").hidden),
      file,
    );
    $("load").setAttribute("aria-expanded", "false");
    actionButton(
      "open",
      "Open project or TikZ",
      "open",
      () => $("file-input").click(),
      file,
    );
    actionButton(
      "save",
      "Save project (Ctrl/⌘ S)",
      "save",
      () => exportFile("json"),
      file,
    );
    menuButton(
      "export",
      "Export",
      [
        { value: "svg", title: "SVG — vector" },
        { value: "png", title: "PNG — image" },
        { value: "tikz", title: "TikZ — LaTeX" },
        { value: "json", title: "JSON — editable project" },
      ],
      exportFile,
      file,
      "export",
    );
    actionButton("undo", "Undo (Ctrl/⌘ Z)", "undo", undo, historyBar);
    actionButton("redo", "Redo (Ctrl/⌘ Shift Z)", "redo", redo, historyBar);
    actionButton("cut", "Cut (Ctrl/⌘ X)", "cut", cutSelection, clip);
    actionButton("copy", "Copy (Ctrl/⌘ C)", "copy", copySelection, clip);
    actionButton("paste", "Paste (Ctrl/⌘ V)", "paste", pasteSelection, clip);
    actionButton("delete", "Delete", "delete", removeSelected, clip);
    const arrange = $("arrange-actions");
    actionButton(
      "front",
      "Bring to front",
      "front",
      () => reorder(true),
      arrange,
    );
    actionButton("back", "Send to back", "back", () => reorder(false), arrange);
    actionButton(
      "duplicate",
      "Duplicate (Ctrl/⌘ D)",
      "duplicate",
      duplicate,
      arrange,
    );
    actionButton("flip-x", "Flip horizontally", "flip", flipSelection, arrange);
    actionButton("group", "Group (Ctrl/⌘ G)", "group", groupSelection, arrange);
    actionButton(
      "ungroup",
      "Ungroup (Ctrl/⌘ Shift G)",
      "ungroup",
      ungroupSelection,
      arrange,
    );
    const options = {
      style: [
        ["solid", "Solid"],
        ["squiggly", "Squiggly"],
        ["dashed", "Dashed"],
        ["dotted", "Dotted"],
      ],
      width: [0.5, 1, 2, 3, 4, 6, 8, 12],
      arrows: [
        ["none", "No arrow"],
        ["start", "Arrow at start"],
        ["end", "Arrow at end"],
        ["both", "Arrows at both ends"],
        ["middle", "Arrow in middle"],
      ],
      gap: [0, 3, 5, 7, 10, 15, 20],
      pattern: [
        ["none", "No fill"],
        ["solid", "Solid fill"],
        ["hatch", "Diagonal hatch"],
        ["backhatch", "Reverse hatch"],
        ["crosshatch", "Crosshatch"],
        ["dots", "Dots"],
        ["horizontal", "Horizontal lines"],
      ],
      opacity: [15, 30, 45, 65, 80, 100],
      "font-size": [10, 12, 16, 18, 24, 32],
    };
    const titles = {
      style: "Line style",
      width: "Line thickness",
      arrows: "Arrowheads",
      gap: "Crossing gap",
      pattern: "Fill pattern",
      opacity: "Opacity",
      "font-size": "Text size",
    };
    for (const key of [
      "style",
      "width",
      "arrows",
      "gap",
      "font-size",
      "pattern",
      "opacity",
    ]) {
      const choices = options[key].map((value) =>
        Array.isArray(value)
          ? { value: value[0], title: value[1] }
          : {
              value,
              title:
                key === "opacity"
                  ? `${value}%`
                  : key === "font-size"
                    ? `${fmt(value * 0.75)} pt`
                    : `${Number((value / CM).toFixed(3))} cm`,
            },
      );
      const control = menuButton(
        key,
        titles[key],
        choices,
        (value) => {
          $(key).value = value;
          $(key).dispatchEvent(new Event("change"));
        },
        ["pattern", "opacity"].includes(key) ? fill : line,
      );
      const caption = document.createElement("span");
      caption.className = "control-caption";
      caption.textContent = {
        style: "Style",
        width: "Width",
        arrows: "Arrows",
        gap: "Gap",
        pattern: "Pattern",
        opacity: "Opacity",
        "font-size": "Type",
      }[key];
      control.append(caption);
    }
    actionButton(
      "templates-toggle",
      "Templates",
      "templates",
      () => {
        showDrawings(false);
        $("template-strip").hidden = !$("template-strip").hidden;
        $("templates-toggle").classList.toggle(
          "active",
          !$("template-strip").hidden,
        );
        $("templates-toggle").setAttribute(
          "aria-expanded",
          !$("template-strip").hidden,
        );
      },
      documentBar,
    );
    actionButton("top-help", "Help", "help", () => showHelp(true), documentBar);
    const labels = {
      new: "New",
      load: "Load",
      open: "Open",
      save: "Save",
      "export-menu": "Export",
      "templates-toggle": "Templates",
      "top-help": "Help",
    };
    for (const [id, label] of Object.entries(labels)) {
      const text = document.createElement("span");
      text.textContent = label;
      $(id).append(text);
    }
    $("layer-order").addEventListener("input", () => {
      if (layerBefore === null) layerBefore = snapshot();
      setLayerPosition(Number($("layer-order").value));
    });
    $("layer-order").addEventListener("change", commitLayerOrder);
    $("layer-order").addEventListener("blur", commitLayerOrder);
    const grid = actionButton(
      "grid-toggle",
      "Show grid",
      "grid",
      () => {
        $("grid").checked = !$("grid").checked;
        grid.classList.toggle("active", $("grid").checked);
        grid.setAttribute("aria-pressed", $("grid").checked);
        render();
      },
      viewBar,
    );
    grid.classList.add("active");
    grid.setAttribute("aria-pressed", "true");
    const snap = actionButton(
      "snap-toggle",
      "Snap to grid",
      "snap",
      () => {
        $("snap").checked = !$("snap").checked;
        snap.classList.toggle("active", $("snap").checked);
        snap.setAttribute("aria-pressed", $("snap").checked);
      },
      viewBar,
    );
    snap.setAttribute("aria-pressed", "false");
    const nodeSnap = actionButton(
      "node-snap-toggle",
      "Snap to nodes",
      "nodeSnap",
      () => {
        $("node-snap").checked = !$("node-snap").checked;
        nodeSnap.classList.toggle("active", $("node-snap").checked);
        nodeSnap.setAttribute("aria-pressed", $("node-snap").checked);
        snapTarget = null;
        render();
      },
      viewBar,
    );
    nodeSnap.setAttribute("aria-pressed", "false");
    actionButton("fit", "Fit drawing", "fit", fit, viewBar);
    actionButton(
      "zoom-out",
      "Zoom out",
      "minus",
      () => zoomBy(1 / 1.2),
      viewBar,
    );
    const zoom = document.createElement("button");
    zoom.id = "zoom-reset";
    zoom.className = "icon-button zoom-readout";
    zoom.title = "Reset zoom";
    zoom.innerHTML =
      '<span id="zoom">100%</span><span class="stepper-caption">Zoom</span>';
    zoom.addEventListener("click", () => zoomBy(1 / view.zoom));
    viewBar.append(zoom);
    actionButton("zoom-in", "Zoom in", "plus", () => zoomBy(1.2), viewBar);
    const gridControls = document.createElement("div");
    gridControls.className = "stepper";
    gridControls.setAttribute("aria-label", "Grid spacing");
    viewBar.append(gridControls);
    actionButton(
      "grid-minus",
      "Finer grid",
      "minus",
      () => stepGrid(-1),
      gridControls,
    );
    const gridReset = document.createElement("button");
    gridReset.id = "grid-reset";
    gridReset.className = "icon-button grid-readout";
    gridReset.title = "Reset grid to 1 cm";
    gridReset.setAttribute("aria-label", "Reset grid to 1 cm");
    gridReset.innerHTML =
      '<span id="grid-size">1 cm</span><span class="stepper-caption">Grid</span>';
    gridReset.addEventListener("click", () => setGridCM(1));
    gridControls.append(gridReset);
    actionButton(
      "grid-plus",
      "Coarser grid",
      "plus",
      () => stepGrid(1),
      gridControls,
    );
    actionButton(
      "sidebar-toggle",
      "TikZ sidebar (I)",
      "code",
      toggleSidebar,
      viewBar,
    );
    for (const [id, name] of [
      ["copy-code", "copy"],
      ["copy-preamble", "copy"],
      ["apply-code", "check"],
      ["close-help", "close"],
      ["close-templates", "close"],
      ["close-drawings", "close"],
    ])
      $(id).append(icon(name));
    const applyLabel = document.createElement("span");
    applyLabel.textContent = "Apply";
    $("apply-code").append(applyLabel);
    $("close-drawings").addEventListener("click", () => showDrawings(false));
    $("drawings-prev").addEventListener("click", () => scrollDrawings(-1));
    $("drawings-next").addEventListener("click", () => scrollDrawings(1));
    $("drawings").addEventListener("scroll", updateDrawingArrows);
    new ResizeObserver(updateDrawingArrows).observe($("drawings"));
    $("copy-preamble").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText($("tikz-preamble").value);
      } catch {
        $("tikz-preamble").focus();
        $("tikz-preamble").select();
      }
    });
    $("copy-code").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText($("tikz").value);
      } catch {
        $("tikz").focus();
        $("tikz").select();
      }
    });
    $("apply-code").addEventListener("click", () => applyTikZ($("tikz").value));
    $("help").addEventListener("click", () => showHelp(true));
    $("close-help").addEventListener("click", () => showHelp(false));
    $("close-templates").addEventListener("click", () => {
      cancelTemplate();
      render();
      $("template-strip").hidden = true;
      $("templates-toggle").classList.remove("active");
      $("templates-toggle").setAttribute("aria-expanded", "false");
    });
    document.addEventListener("pointerdown", (e) => {
      if (
        openPopup &&
        !openPopup.contains(e.target) &&
        !popupTrigger.contains(e.target)
      )
        closeMenus();
    });
    $("toolbar").addEventListener("scroll", closeMenus);
    window.addEventListener("resize", closeMenus);
  }

  function bind() {
    buildToolbar();
    const groups = [
      ["Selection", ["select", "direct", "lasso"]],
      ["Lines", ["freehand", "line", "polyline", "bezier"]],
      [
        "Regions",
        ["fill", "region", "rectangle", "ellipse", "bezier-region", "dot"],
      ],
      ["Text and crossings", ["text", "crossing"]],
    ];
    for (const [label, ids] of groups) {
      const group = document.createElement("div");
      group.className = "tool-section";
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", label);
      for (const id of ids) {
        const [, name, key, path] = tools.find((t) => t[0] === id);
        const button = document.createElement("button");
        button.className = "tool-button";
        button.dataset.tool = id;
        button.title = `${name} (${key})`;
        button.setAttribute("aria-label", name);
        button.setAttribute("aria-pressed", "false");
        const image = svg("svg", {
          viewBox: "0 0 22 22",
          "aria-hidden": "true",
        });
        svg(
          "path",
          {
            d: path,
            fill: ["select", "dot"].includes(id)
              ? "currentColor"
              : id === "direct"
                ? "white"
                : "none",
          },
          image,
        );
        button.append(image);
        button.addEventListener("click", () => setTool(id));
        group.append(button);
      }
      $("tools").append(group);
    }
    for (const [name, colour] of Object.entries(TIKZ_COLOURS)) {
      const button = document.createElement("button");
      button.className = "swatch";
      button.style.background = colour;
      button.dataset.color = colour;
      button.dataset.name = name;
      button.title = name;
      button.setAttribute("aria-label", name);
      const apply = (target) => {
        const id = target === "fillColor" ? "fill-color" : "color";
        $(id).value = colour;
        applyProperty(target, colour);
      };
      button.addEventListener("click", () => apply(colourTarget));
      button.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        colourTarget = "fillColor";
        apply("fillColor");
      });
      $("swatches").append(button);
    }
    for (const [className, target] of [
      ["stroke-well", "color"],
      ["fill-well", "fillColor"],
    ])
      document.querySelector("." + className).addEventListener("click", () => {
        colourTarget = target;
        updateControlPreviews();
      });
    $("custom-colour").addEventListener("click", () =>
      $(colourTarget === "color" ? "color" : "fill-color").click(),
    );
    for (const key of ["style", "arrows", "pattern", "color"])
      $(key).addEventListener("change", () => applyProperty(key, $(key).value));
    $("fill-color").addEventListener("change", () =>
      applyProperty("fillColor", $("fill-color").value),
    );
    for (const key of ["width", "gap", "opacity"])
      $(key).addEventListener("change", () => {
        const value = Number($(key).value);
        applyProperty(key, key === "opacity" ? value / 100 : value);
      });
    $("font-size").addEventListener("change", () => {
      const value = Number($("font-size").value);
      defaults.fontSize = value;
      const objects = selectedObjects().filter((o) =>
        ["text", "ellipse"].includes(o.kind),
      );
      if (objects.length)
        change(() => objects.forEach((o) => (o.fontSize = value)));
      updateControlPreviews();
    });
    $("grid").addEventListener("change", render);
    $("tikz").addEventListener("input", () => {
      codeDirty = true;
      persist();
    });
    $("tikz").addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        applyTikZ($("tikz").value);
      }
    });
    $("file-input").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      e.target.value = "";
      if (!file) return;
      if (file.size > 15 * 1024 * 1024) {
        toast("Project too large (15 MB maximum)");
        return;
      }
      try {
        const text = await file.text();
        if (file.name.endsWith(".json")) {
          const project = validateProject(JSON.parse(text));
          if (openDrawing(project)) toast("Project opened");
        } else applyTikZ(text, true);
      } catch (error) {
        toast(`Could not open file: ${error.message}`);
      }
    });
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", () => cancelDrawing());
    canvas.addEventListener("dblclick", doubleClick);
    canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (
        draft &&
        ["polyline", "region", "bezier", "bezier-region"].includes(tool)
      )
        finishDraft();
    });
    canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        zoomBy(Math.exp(-e.deltaY * 0.0015), toWorld(e));
      },
      { passive: false },
    );
    viewport.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });
    viewport.addEventListener("drop", (e) => {
      e.preventDefault();
      const type =
        e.dataTransfer.getData("application/x-string-template") ||
        e.dataTransfer.getData("text/plain");
      if (templateNames[type])
        placeTemplate(type, toWorld(e, true), e.shiftKey);
    });
    $("text-editor").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        finishText();
      } else if (e.key === "Escape") {
        e.preventDefault();
        finishText(true);
      }
      e.stopPropagation();
    });
    $("text-editor").addEventListener("blur", () => finishText());
    window.addEventListener("keydown", (e) => {
      if (e.key === "Shift") {
        shift = true;
      }
      const typing =
        /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) ||
        e.target.isContentEditable;
      if (typing) return;
      const cmd = e.metaKey || e.ctrlKey,
        key = e.key.toLowerCase();
      if (cmd) {
        const shortcuts = {
          z: e.shiftKey ? redo : undo,
          y: redo,
          c: copySelection,
          x: cutSelection,
          v: pasteSelection,
          a: () => {
            selected = new Set(model.objects.map((o) => o.id));
            render();
            updateInspector();
          },
          s: () => exportFile("json"),
          n: () => $("new").click(),
          d: duplicate,
          g: e.shiftKey ? ungroupSelection : groupSelection,
        };
        if (shortcuts[key]) {
          e.preventDefault();
          shortcuts[key]();
        }
        return;
      }
      if (e.key === " ") {
        e.preventDefault();
        space = true;
        canvas.style.cursor = "grab";
        return;
      }
      if (key === "escape" && openPopup) {
        closeMenus();
        return;
      }
      if (key === "escape") {
        if (pendingTemplate) {
          cancelDrawing();
          updateInspector();
          return;
        }
        if (
          draft &&
          ["polyline", "bezier", "region", "bezier-region"].includes(
            draft.tool,
          ) &&
          draft.points.length >=
            (["region", "bezier-region"].includes(draft.tool) ? 3 : 2)
        ) {
          finishDraft();
          return;
        }
        cancelDrawing();
        selected.clear();
        render();
        updateInspector();
        return;
      }
      if (key === "enter") {
        if (
          draft &&
          ["polyline", "region", "bezier", "bezier-region"].includes(tool)
        )
          finishDraft();
        return;
      }
      if (key === "delete" || key === "backspace") {
        e.preventDefault();
        removeSelected();
        return;
      }
      if (
        ["arrowleft", "arrowright", "arrowup", "arrowdown"].includes(key) &&
        selected.size
      ) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        change(() =>
          selectedObjects().forEach((o) =>
            moveObject(
              o,
              key === "arrowleft" ? -step : key === "arrowright" ? step : 0,
              key === "arrowup" ? -step : key === "arrowdown" ? step : 0,
            ),
          ),
        );
        return;
      }
      if ((key === "<" || key === ">") && !$("drawing-strip").hidden) {
        e.preventDefault();
        scrollDrawings(key === "<" ? -1 : 1);
        return;
      }
      if ((key === "<" || key === ">") && !$("template-strip").hidden) {
        e.preventDefault();
        scrollTemplates(key === "<" ? -1 : 1);
        return;
      }
      if (key === "i") {
        toggleSidebar();
        return;
      }
      const next = tools.find((t) => t[2].toLowerCase() === key);
      if (next) setTool(next[0]);
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "Shift") {
        shift = false;
      }
      if (e.key === " ") {
        space = false;
        canvas.style.cursor = ["select", "direct", "lasso"].includes(tool)
          ? "default"
          : "crosshair";
      }
    });
    window.addEventListener("blur", () => {
      shift = false;
      space = false;
      if (interaction) cancelDrawing();
    });
    window.addEventListener("pagehide", saveDrawing);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") saveDrawing();
    });
    installTooltips();
    new ResizeObserver(resize).observe(viewport);
  }
  try {
    const spacing = Number(localStorage.getItem("string-grid-cm"));
    if (GRID_STEPS.includes(spacing)) gridSpacing = spacing * CM;
    const saved = localStorage.getItem(STORAGE);
    if (saved) {
      // Move the old single autosave into history once, without reopening it.
      model = validateProject(JSON.parse(saved));
      crossings = computeCrossings();
      if (saveDrawing()) localStorage.removeItem(STORAGE);
    }
  } catch {
    $("save-state").textContent = "Start fresh or open a saved project";
  }
  model = { version: 2, objects: [], overrides: {}, nextId: 1 };
  drawingId = null;
  bind();
  buildTemplates();
  syncDefaultControls();
  setTool("select");
  resize();
  if (model.objects.length) fit();
  updateCode();
  // A small API also makes geometry and file compatibility independently verifiable.
  window.StringStudio = {
    get project() {
      return clone(model);
    },
    get crossings() {
      return clone(crossings);
    },
    get selection() {
      return [...selected];
    },
    get view() {
      return { ...view };
    },
    setTool,
    fit,
    undo,
    redo,
    parseTikZ,
    validateProject,
    exportSVG,
    generateTikZ,
    generatePreamble,
    enclosedFace,
    loadDemo,
    placeTemplate,
    load(project) {
      const valid = validateProject(clone(project));
      cancelDrawing();
      change(() => {
        model = valid;
        selected.clear();
      });
      fit();
    },
  };
})();
