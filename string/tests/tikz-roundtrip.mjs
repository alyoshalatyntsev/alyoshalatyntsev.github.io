// Run with: node tests/tikz-roundtrip.mjs
// Exercise the real exporter/parser without browser UI or local storage.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
const source = fs.readFileSync(
  new URL("../studio.js", import.meta.url),
  "utf8",
);
const boot = source.lastIndexOf(
  "  try {\n    const spacing = Number(localStorage",
);
assert.ok(boot > 0);
const context = vm.createContext({ document: { getElementById: () => ({}) } });
vm.runInContext(
  source.slice(0, boot) +
    `globalThis.audit={defaults,CM,TIKZ_COLOURS,generateTikZ,generatePreamble,parseTikZ,validateProject,load(value){model=value;crossings=computeCrossings();return crossings;}};})();`,
  context,
);
const api = context.audit;
const clone = (value) => JSON.parse(JSON.stringify(value));
const line = (id, z, points) => ({
  ...clone(api.defaults),
  id,
  z,
  kind: "line",
  name: "line",
  curve: "polyline",
  points,
});
const project = {
  version: 2,
  nextId: 3,
  objects: [
    line(1, 2, [
      { x: 0, y: 0 },
      { x: 200, y: 0 },
    ]),
    line(2, 1, [
      { x: 175, y: 50 },
      { x: 150, y: -50 },
      { x: 50, y: 50 },
      { x: 25, y: -50 },
    ]),
  ],
  overrides: { "1:2:0": 2 },
};
const before = clone(api.load(project));
const restored = api.parseTikZ(api.generateTikZ());
assert.deepEqual(clone(restored.dropped), []);
api.validateProject(restored.model);
const after = clone(api.load(restored.model));
assert.equal(after.length, before.length);
for (let i = 0; i < after.length; i++) {
  for (const k of ["key", "a", "b", "upper", "lower"])
    assert.equal(after[i][k], before[i][k]);
  assert.ok(
    Math.hypot(after[i].p.x - before[i].p.x, after[i].p.y - before[i].p.y) <
      0.001,
  );
}
console.log(
  "PASS Reordered paths retain the same individual crossing override",
);
const objects = [];
for (const style of ["solid", "dashed", "dotted", "squiggly"])
  for (const arrows of ["none", "start", "end", "both", "middle"]) {
    const id = objects.length + 1;
    objects.push({
      ...line(id, id, [
        { x: 0, y: id * 30 },
        { x: 100, y: id * 30 },
      ]),
      style,
      arrows,
      gap: id % 2 ? 7 : 15,
    });
  }
for (let i = 0; i < 2; i++) {
  const id = objects.length + 1;
  objects.push({
    ...clone(api.defaults),
    id,
    z: id,
    kind: "ellipse",
    name: "dot",
    x: i * 20,
    y: 0,
    rx: 2 / 0.75,
    ry: 2 / 0.75,
    dot: true,
    width: 0,
    opacity: 1,
    pattern: "solid",
    text: `d${i}`,
  });
}
objects.push({
  ...clone(api.defaults),
  id: 23,
  z: 23,
  kind: "text",
  name: "label",
  x: 50,
  y: 0,
  text: "last",
  fontSize: 18,
});
api.load({ version: 2, objects, overrides: {}, nextId: 24 });
const tex = api.generateTikZ();
const parsed = api.parseTikZ(tex);
assert.deepEqual(clone(parsed.dropped), []);
api.validateProject(parsed.model);
assert.equal(parsed.model.objects.length, objects.length);
for (let i = 0; i < objects.length; i++) {
  const expected = objects[i],
    actual = parsed.model.objects[i];
  assert.equal(actual.id, expected.id);
  if (expected.kind === "line")
    for (const key of ["style", "arrows", "gap"])
      assert.equal(actual[key], expected[key]);
  else assert.equal(actual.text, expected.text);
}
assert.equal((tex.match(/\\definecolor/g) || []).length, 0);
assert.match(tex, /draw=black/);
assert.match(tex, /fill=teal/);
assert.ok(tex.includes("decoration={snake"));
console.log(
  "PASS All stroke/arrow combinations, gaps, shared colours and labelled dots round-trip",
);

const colourObjects = Object.entries(api.TIKZ_COLOURS).map(
  ([name, color], i) => ({
    ...line(i + 1, i + 1, [
      { x: 0, y: i * api.CM },
      { x: api.CM, y: i * api.CM },
    ]),
    name,
    color,
  }),
);
api.load({
  version: 2,
  objects: colourObjects,
  overrides: {},
  nextId: colourObjects.length + 1,
});
const named = api.generateTikZ(),
  namedParsed = api.parseTikZ(named);
assert.deepEqual(clone(namedParsed.dropped), []);
assert.equal(namedParsed.model.objects.length, colourObjects.length);
assert.ok(!named.includes("definecolor"));
assert.ok(named.includes("(0,0) -- (1,0)"));
for (let i = 0; i < colourObjects.length; i++)
  assert.equal(namedParsed.model.objects[i].color, colourObjects[i].color);
assert.ok(!named.includes("usetikzlibrary"));
assert.match(named, /\\begin\{tikzpicture\}\[x=1cm,y=-1cm/);
assert.match(named, /;\n\n  \\draw/);
const legacy =
  api.parseTikZ(String.raw`\begin{tikzpicture}[x=1pt,y=-1pt,line cap=round,line join=round]
\draw[draw=white,line width=1.5pt] (75,150) -- (150,225);
\end{tikzpicture}`);
assert.equal(legacy.model.objects.length, 1);
assert.deepEqual(clone(legacy.model.objects[0].points), [
  { x: 100, y: 200 },
  { x: 200, y: 300 },
]);
api.load(legacy.model);
const migrated = api.parseTikZ(api.generateTikZ());
for (let i = 0; i < 2; i++)
  assert.ok(
    Math.hypot(
      migrated.model.objects[0].points[i].x -
        legacy.model.objects[0].points[i].x,
      migrated.model.objects[0].points[i].y -
        legacy.model.objects[0].points[i].y,
    ) < 0.001,
  );
console.log(
  "PASS All 19 named colours including white, centimetre coordinates, readable blocks and legacy point-unit diagrams",
);
