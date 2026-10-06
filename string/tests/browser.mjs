// Run with a local server on :8765 and an isolated headless Chrome on CDP :9222.
// This suite changes the isolated browser’s project and local storage.
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const CM = 72.27 / 2.54 / 0.75;
const pages = await (await fetch("http://127.0.0.1:9222/json/list")).json();
const socket = new WebSocket(
  pages.find((p) => p.type === "page").webSocketDebuggerUrl,
);
await new Promise((resolve) =>
  socket.addEventListener("open", resolve, { once: true }),
);
let nextId = 0;
const pending = new Map(),
  errors = [];
socket.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id) {
    const q = pending.get(m.id);
    pending.delete(m.id);
    m.error
      ? q.reject(new Error(JSON.stringify(m.error)))
      : q.resolve(m.result);
  }
  if (m.method === "Runtime.exceptionThrown")
    errors.push(
      m.params.exceptionDetails.exception?.description ||
        m.params.exceptionDetails.text,
    );
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const r = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (r.exceptionDetails)
    throw new Error(
      r.exceptionDetails.exception?.description || r.exceptionDetails.text,
    );
  return r.result.value;
}
async function pause(ms = 50) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
async function mouse(type, x, y, options = {}) {
  await send("Input.dispatchMouseEvent", { type, x, y, ...options });
}
async function clickControl(selector) {
  const p = await evaluate(
    `(()=>{const el=document.querySelector(${JSON.stringify(selector)});el.scrollIntoView({block:'nearest',inline:'nearest'});const r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()`,
  );
  await mouse("mousePressed", p.x, p.y, { button: "left", clickCount: 1 });
  await mouse("mouseReleased", p.x, p.y, { button: "left", clickCount: 1 });
  await pause();
}
async function clickWorld(x, y, modifiers = 0) {
  const p = await screen(x, y);
  await mouse("mousePressed", p.x, p.y, {
    button: "left",
    clickCount: 1,
    modifiers,
  });
  await mouse("mouseReleased", p.x, p.y, {
    button: "left",
    clickCount: 1,
    modifiers,
  });
  await pause();
}
async function dragWorld(a, b, modifiers = 0) {
  const s = await screen(a.x, a.y),
    t = await screen(b.x, b.y);
  await mouse("mousePressed", s.x, s.y, {
    button: "left",
    clickCount: 1,
    modifiers,
  });
  for (let i = 1; i <= 8; i++)
    await mouse(
      "mouseMoved",
      s.x + ((t.x - s.x) * i) / 8,
      s.y + ((t.y - s.y) * i) / 8,
      { button: "left", buttons: 1, modifiers },
    );
  await mouse("mouseReleased", t.x, t.y, {
    button: "left",
    clickCount: 1,
    modifiers,
  });
  await pause();
}
async function screen(x, y) {
  return evaluate(
    `(()=>{const v=StringStudio.view,r=document.getElementById('canvas').getBoundingClientRect();return {x:r.left+(${x}-v.x)*v.zoom,y:r.top+(${y}-v.y)*v.zoom}})()`,
  );
}
async function traceWorld(points, modifiers = 0) {
  const coords = [];
  for (const p of points) coords.push(await screen(p.x, p.y));
  await mouse("mousePressed", coords[0].x, coords[0].y, {
    button: "left",
    clickCount: 1,
    modifiers,
  });
  for (const p of coords.slice(1))
    await mouse("mouseMoved", p.x, p.y, {
      button: "left",
      buttons: 1,
      modifiers,
    });
  const end = coords.at(-1);
  await mouse("mouseReleased", end.x, end.y, {
    button: "left",
    clickCount: 1,
    modifiers,
  });
  await pause();
}
async function key(key, code, modifiers = 0) {
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key,
    code,
    modifiers,
  });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, modifiers });
  await pause();
}
function report(name) {
  console.log("PASS", name);
}
try {
  await send("Runtime.enable");
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 960,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", {
    url: process.argv[2] || "http://127.0.0.1:8765/index.html",
  });
  await pause(600);
  assert.equal(await evaluate("typeof StringStudio"), "object");
  assert.equal(
    await evaluate('document.querySelectorAll("[data-tool]").length'),
    15,
  );
  assert.equal(
    await evaluate('document.querySelectorAll(".template-card").length'),
    15,
  );
  report("Editor loads with all tools and templates");
  await evaluate(
    'document.getElementById("new").click();document.getElementById("grid-reset").click()',
  );
  assert.equal(await evaluate("StringStudio.project.objects.length"), 0);
  assert.equal(
    await evaluate('document.querySelector("[data-menu=arrange]")'),
    null,
  );
  assert.equal(
    await evaluate(
      'document.querySelectorAll(".toolbox #arrange-actions button").length',
    ),
    6,
  );
  for (const id of [
    "cut",
    "copy",
    "paste",
    "front",
    "back",
    "duplicate",
    "flip-x",
    "group",
    "ungroup",
  ])
    assert.equal(
      await evaluate(`document.getElementById(${JSON.stringify(id)}).disabled`),
      true,
    );
  const centres = await evaluate(
    '(()=>{const b=document.getElementById("width-menu"),i=b.querySelector("svg").getBoundingClientRect(),t=b.querySelector(".control-caption").getBoundingClientRect();return{i:i.left+i.width/2,t:t.left+t.width/2}})()',
  );
  assert.ok(Math.abs(centres.i - centres.t) < 0.5);
  assert.equal(
    await evaluate('document.getElementById("grid-size").textContent'),
    "1 cm",
  );
  assert.equal(
    await evaluate('document.querySelectorAll("#swatches button").length'),
    19,
  );
  assert.equal(
    await evaluate('document.getElementById("tikz-preamble").value'),
    String.raw`\usepackage{tikz}`,
  );
  assert.ok(
    !(await evaluate('document.getElementById("tikz").value')).includes(
      "usetikzlibrary",
    ),
  );
  report(
    "Contextual sidebar actions, centred width caption, 1 cm grid, named palette and separate preamble",
  );

  assert.equal(
    await evaluate(
      'document.querySelector(".brand, .empty-state, #properties-panel, .statusbar")',
    ),
    null,
  );
  assert.equal(
    await evaluate('document.getElementById("template-strip").hidden'),
    true,
  );
  assert.equal(
    await evaluate('document.querySelectorAll("#tools [role=group]").length'),
    4,
  );
  const blank = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    "/private/tmp/string-redesign-blank.png",
    Buffer.from(blank.data, "base64"),
  );
  await evaluate('document.getElementById("templates-toggle").click()');
  assert.equal(
    await evaluate('document.getElementById("template-strip").hidden'),
    false,
  );
  const strip = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    "/private/tmp/string-redesign-templates.png",
    Buffer.from(strip.data, "base64"),
  );
  await evaluate(
    'document.getElementById("close-templates").click();document.getElementById("help").click()',
  );
  assert.equal(
    await evaluate('document.getElementById("code-panel").hidden'),
    true,
  );
  assert.equal(
    await evaluate('document.getElementById("help-panel").hidden'),
    false,
  );
  await evaluate('document.getElementById("close-help").click()');
  assert.equal(
    await evaluate('document.getElementById("code-panel").hidden'),
    false,
  );
  report(
    "Compact icon toolbar, blank canvas, template strip and replaceable Help sidebar",
  );
  await evaluate("StringStudio.loadDemo()");
  assert.equal(await evaluate("StringStudio.project.objects.length"), 5);
  assert.equal(await evaluate("StringStudio.crossings.length"), 1);
  assert.equal(
    await evaluate('document.querySelectorAll("#defs mask circle").length'),
    1,
  );
  assert.equal(
    await evaluate('document.querySelectorAll("#region-layer path").length'),
    1,
  );
  report(
    "Crossing mask clips the lower string, separately from the shaded surface",
  );
  const crossing = await evaluate("StringStudio.crossings[0]");
  await evaluate('StringStudio.setTool("crossing")');
  await clickWorld(crossing.p.x, crossing.p.y);
  assert.equal(
    await evaluate("StringStudio.crossings[0].upper"),
    crossing.lower,
  );
  await evaluate("StringStudio.undo()");
  assert.equal(
    await evaluate("StringStudio.crossings[0].upper"),
    crossing.upper,
  );
  report("Individual crossing swap and undo");
  let tikz = await evaluate("StringStudio.generateTikZ()");
  let parsed = await evaluate(
    "StringStudio.parseTikZ(StringStudio.generateTikZ())",
  );
  assert.equal(parsed.model.objects.length, 5);
  assert.deepEqual(parsed.dropped, []);
  assert.equal(
    await evaluate(
      "StringStudio.validateProject(StringStudio.parseTikZ(StringStudio.generateTikZ()).model).objects.length",
    ),
    5,
  );
  report("TikZ export and import with shaded surfaces, curves, and labels");
  await evaluate(
    'StringStudio.load({version:2,objects:[],overrides:{},nextId:1});StringStudio.setTool("line")',
  );
  await dragWorld({ x: 350, y: 250 }, { x: 650, y: 450 });
  assert.equal(await evaluate("StringStudio.project.objects.length"), 1);
  await dragWorld({ x: 650, y: 250 }, { x: 350, y: 450 }, 8);
  assert.equal(await evaluate("StringStudio.crossings[0].upper"), 1);
  assert.equal(await evaluate("StringStudio.project.objects[1].z"), -1);
  report("Straight drawing and Shift-under ordering");
  await evaluate('StringStudio.setTool("select")');
  await clickWorld(400, 283.3);
  assert.deepEqual(await evaluate("StringStudio.selection"), [1]);
  for (const id of ["cut", "copy", "front", "back", "duplicate", "flip-x"])
    assert.equal(
      await evaluate(`document.getElementById(${JSON.stringify(id)}).disabled`),
      false,
    );

  const selectedBefore = await evaluate(
    "StringStudio.project.objects[0].points[0]",
  );
  await dragWorld({ x: 400, y: 283.3 }, { x: 430, y: 313.3 });
  const moved = await evaluate("StringStudio.project.objects[0].points[0]");
  assert.ok(Math.abs(moved.x - selectedBefore.x - 30) < 1);
  report("Click selection and dragging");
  assert.equal(
    await evaluate(
      `document.querySelectorAll('#line-layer path[stroke="#ff0000"]').length`,
    ),
    1,
  );
  assert.ok(
    !(await evaluate("StringStudio.exportSVG()")).includes('stroke="#ff0000"'),
  );
  await clickWorld(690, 510);
  assert.equal(
    await evaluate(
      `document.querySelectorAll('#line-layer path[stroke="#ff0000"]').length`,
    ),
    0,
  );
  report(
    "Crossing neighbours are pure red only during selection and exports stay unchanged",
  );
  await key("a", "KeyA", 2);
  assert.equal(await evaluate("StringStudio.selection.length"), 2);
  await key("c", "KeyC", 2);
  await key("v", "KeyV", 2);
  assert.equal(await evaluate("StringStudio.project.objects.length"), 4);
  assert.equal(await evaluate("StringStudio.selection.length"), 2);
  await key("x", "KeyX", 2);
  assert.equal(await evaluate("StringStudio.project.objects.length"), 2);
  await key("v", "KeyV", 2);
  assert.equal(await evaluate("StringStudio.project.objects.length"), 4);
  await key("z", "KeyZ", 2);
  assert.equal(await evaluate("StringStudio.project.objects.length"), 2);
  report("Multi-object copy, paste, cut and undo keyboard shortcuts");
  await evaluate(
    'StringStudio.load({version:2,objects:[],overrides:{},nextId:1});StringStudio.setTool("polyline")',
  );
  await clickWorld(380, 250);
  await clickWorld(600, 250);
  await clickWorld(600, 450);
  await clickWorld(380, 450);
  await clickWorld(380, 250);
  await key("Enter", "Enter");
  assert.equal(
    await evaluate("StringStudio.project.objects[0].points.length"),
    5,
  );
  await evaluate('StringStudio.setTool("fill")');
  await clickWorld(490, 350);
  assert.equal(
    await evaluate(
      'StringStudio.project.objects.filter(o=>o.kind==="region").length',
    ),
    1,
  );
  assert.equal(await evaluate("StringStudio.project.objects[1].width"), 0);
  report("Dot-to-dot drawing and enclosed-area pattern bucket");
  await evaluate('StringStudio.setTool("select")');
  await dragWorld({ x: 320, y: 200 }, { x: 660, y: 510 });
  assert.equal(await evaluate("StringStudio.selection.length"), 2);
  report("Rectangle selection includes multiple objects");
  await clickWorld(700, 550);
  await evaluate('StringStudio.setTool("lasso")');
  await traceWorld([
    { x: 340, y: 210 },
    { x: 640, y: 210 },
    { x: 650, y: 490 },
    { x: 335, y: 490 },
    { x: 340, y: 210 },
  ]);
  assert.equal(await evaluate("StringStudio.selection.length"), 2);
  report("Closed freehand lasso selects strings and regions");
  await evaluate('StringStudio.setTool("lasso")');
  await dragWorld({ x: 300, y: 180 }, { x: 690, y: 180 });
  await evaluate('StringStudio.setTool("bezier")');
  await clickWorld(380, 290);
  await clickWorld(460, 350);
  await clickWorld(540, 270);
  await clickWorld(620, 390);
  await key("Escape", "Escape");
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).curve"),
    "spline",
  );
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).points.length"),
    4,
  );
  assert.equal(
    await evaluate('document.querySelectorAll("[data-handle]").length'),
    10,
  );
  const curveBefore = await evaluate(
    "(()=>{const o=StringStudio.project.objects.at(-1);return {x:o.points[1].x+o.tangents[1].out.x,y:o.points[1].y+o.tangents[1].out.y}})()",
  );
  const vectorBefore = await evaluate(
    "StringStudio.project.objects.at(-1).tangents[1].out",
  );
  await dragWorld(curveBefore, {
    x: curveBefore.x + 18,
    y: curveBefore.y - 20,
  });
  const vectorAfter = await evaluate(
    "StringStudio.project.objects.at(-1).tangents[1].out",
  );
  assert.ok(Math.abs(vectorAfter.x - vectorBefore.x - 18) < 1);
  assert.ok(Math.abs(vectorAfter.y - vectorBefore.y + 20) < 1);
  const roundTrip = await evaluate(
    "StringStudio.parseTikZ(StringStudio.generateTikZ())",
  );
  const imported = roundTrip.model.objects.at(-1);
  assert.equal(imported.curve, "spline");
  assert.equal(imported.points.length, 4);
  assert.deepEqual(roundTrip.dropped, []);
  assert.ok(Math.abs(imported.tangents[1].out.x - vectorAfter.x) < 0.01);
  const curveImage = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    "/private/tmp/string-redesign-curve.png",
    Buffer.from(curveImage.data, "base64"),
  );
  report(
    "Curve clicks create one smooth path; Escape finishes; every knot has editable tangents; TikZ round-trip preserves them",
  );
  await evaluate(
    'StringStudio.load({version:2,objects:[],overrides:{},nextId:1});StringStudio.placeTemplate("identity",{x:500,y:350})',
  );
  assert.equal(await evaluate("StringStudio.selection.length"), 0);
  await clickWorld(470, 320);
  assert.equal(await evaluate("StringStudio.selection.length"), 1);
  const fixed = await evaluate("StringStudio.project.objects[1].points");
  await dragWorld({ x: 470, y: 320 }, { x: 490, y: 335 });
  assert.deepEqual(
    await evaluate("StringStudio.project.objects[1].points"),
    fixed,
  );
  await evaluate('StringStudio.placeTemplate("box",{x:500,y:350})');
  assert.equal(await evaluate("StringStudio.selection.length"), 0);
  assert.equal(
    await evaluate(
      'StringStudio.project.objects.filter(o=>o.kind==="region").length',
    ),
    3,
  );
  assert.equal(
    await evaluate(
      'StringStudio.project.objects.filter(o=>o.kind==="line").length',
    ),
    11,
  );
  report(
    "Templates insert independent lines, including separate surface boundaries",
  );

  await evaluate(
    'StringStudio.load({version:2,objects:[],overrides:{},nextId:1});StringStudio.setTool("freehand")',
  );
  await traceWorld([
    { x: 360, y: 300 },
    { x: 390, y: 270 },
    { x: 420, y: 320 },
    { x: 460, y: 280 },
    { x: 490, y: 330 },
    { x: 530, y: 290 },
    { x: 570, y: 330 },
  ]);
  assert.ok(
    (await evaluate("StringStudio.project.objects[0].points.length")) > 4,
  );
  report("Freehand retains the drawn bends");
  await evaluate(
    'document.getElementById("style").value="dotted";document.getElementById("style").dispatchEvent(new Event("change"));document.getElementById("arrows").value="both";document.getElementById("arrows").dispatchEvent(new Event("change"));',
  );
  assert.equal(
    await evaluate("StringStudio.project.objects[0].style"),
    "dotted",
  );
  assert.equal(
    await evaluate(
      "StringStudio.parseTikZ(StringStudio.generateTikZ()).model.objects[0].style",
    ),
    "dotted",
  );
  assert.equal(
    await evaluate(
      "StringStudio.parseTikZ(StringStudio.generateTikZ()).model.objects[0].arrows",
    ),
    "both",
  );
  report("Dotted stroke and both arrows survive TikZ round-trip");
  await evaluate('StringStudio.loadDemo();StringStudio.setTool("select")');
  await pause(100);
  const screenshot = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    "/private/tmp/string-studio-preview.png",
    Buffer.from(screenshot.data, "base64"),
  );
  report("Desktop screenshot captured");
  const exported = await evaluate("StringStudio.exportSVG()");
  assert.ok(exported.includes("<mask"));
  assert.ok(exported.includes("<pattern"));
  assert.ok(!exported.includes("grid-dots"));
  assert.ok(!exported.includes("overlay-layer"));
  report(
    "SVG export contains transparent crossing masks and patterns without the editing UI",
  );
  const raster = await evaluate(
    `(async()=>{const source=StringStudio.exportSVG(),url=URL.createObjectURL(new Blob([source],{type:'image/svg+xml'})),image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=url});const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);const alpha=ctx.getImageData(0,0,1,1).data[3];const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));URL.revokeObjectURL(url);return {alpha,size:blob.size}})()`,
  );
  assert.equal(raster.alpha, 0);
  assert.ok(raster.size > 1000);
  report("SVG rasterises to a PNG with a transparent background");
  const project = await evaluate("StringStudio.project");
  const fixture = "/private/tmp/string-studio-test-project.json";
  await fs.writeFile(fixture, JSON.stringify(project));
  await evaluate('document.getElementById("new").click()');
  assert.equal(await evaluate("StringStudio.project.objects.length"), 0);
  const doc = await send("DOM.getDocument");
  const fileInput = await send("DOM.querySelector", {
    nodeId: doc.root.nodeId,
    selector: "#file-input",
  });
  await send("DOM.setFileInputFiles", {
    nodeId: fileInput.nodeId,
    files: [fixture],
  });
  await pause(400);
  assert.deepEqual(await evaluate("StringStudio.project"), project);
  await send("Page.reload");
  await pause(400);
  assert.equal(await evaluate("StringStudio.project.objects.length"), 0);
  await clickControl("#load");
  assert.ok(
    await evaluate('document.querySelectorAll(".drawing-card svg").length > 0'),
  );
  await clickControl(".drawing-card");
  assert.deepEqual(await evaluate("StringStudio.project"), project);
  report(
    "Reload opens blank; Load thumbnails restore the complete saved project",
  );
  await evaluate(
    '(()=>{const original=StringStudio.project;const base=original.objects.find(o=>o.kind==="line");const a={...base,id:1,name:"A",curve:"polyline",points:[{x:330,y:350},{x:670,y:350}],z:2};delete a.c1;delete a.c2;const b={...a,id:2,name:"B",points:[{x:330,y:323},{x:670,y:377}],z:1};StringStudio.load({version:2,objects:[a,b],overrides:{},nextId:3});})()',
  );
  assert.equal(await evaluate("StringStudio.crossings.length"), 0);
  assert.equal(
    await evaluate('document.querySelectorAll("#defs mask").length'),
    0,
  );
  report("Shallow crossings do not cut gaps");
  await evaluate(
    '(()=>{const project=StringStudio.project;project.objects.forEach(o=>o.style="squiggly");StringStudio.load(project)})()',
  );
  assert.equal(await evaluate("StringStudio.crossings.length"), 0);
  report(
    "Squiggly decoration does not turn shallow overlaps into clipped crossings",
  );
  await evaluate(
    '(()=>{const project=StringStudio.project;project.objects.forEach(o=>o.style="solid");project.objects[1].points=[{x:500,y:210},{x:500,y:490}];project.objects[0].width=12;project.objects[0].gap=0;StringStudio.load(project)})()',
  );
  assert.equal(await evaluate("StringStudio.crossings.length"), 1);
  assert.equal(
    await evaluate('document.querySelectorAll("#defs mask").length'),
    0,
  );
  report("Zero berth disables clipping even when string widths differ");
  await evaluate(
    "(()=>{const project=StringStudio.project;project.objects[0].width=2;project.objects[0].gap=7;project.objects[1].width=30;StringStudio.load(project)})()",
  );
  assert.ok((await evaluate("StringStudio.crossings[0].r")) > 15);
  assert.equal(
    await evaluate('document.querySelectorAll("#defs mask").length'),
    1,
  );
  report("Crossing gaps remain visible under thick strings");
  await evaluate(
    '(()=>{const project=StringStudio.project;project.objects[1].width=2;project.objects[1].points=[{x:500,y:210},{x:500,y:490}];project.overrides={"1:2:0":2};StringStudio.load(project);StringStudio.setTool("select");})()',
  );
  assert.equal(await evaluate("StringStudio.crossings[0].upper"), 2);
  await key("a", "KeyA", 2);
  await key("c", "KeyC", 2);
  await key("v", "KeyV", 2);
  assert.equal(
    await evaluate("StringStudio.crossings.find(c=>c.a===3&&c.b===4).upper"),
    4,
  );
  report(
    "Copy/paste preserves individual crossing overrides even when layer order differs",
  );
  await evaluate(
    'StringStudio.load({version:2,objects:[],overrides:{},nextId:1});StringStudio.setTool("bezier")',
  );
  await clickWorld(360, 250);
  await clickWorld(400, 430);
  await clickWorld(600, 230);
  const last = await screen(600, 230);
  await mouse("mousePressed", last.x, last.y, {
    button: "left",
    clickCount: 2,
  });
  await mouse("mouseReleased", last.x, last.y, {
    button: "left",
    clickCount: 2,
  });
  await pause();
  assert.equal(
    await evaluate("StringStudio.project.objects[0].curve"),
    "spline",
  );
  assert.equal(
    await evaluate("StringStudio.project.objects[0].points.length"),
    3,
  );
  report(
    "Double-clicking the last curve knot finishes without adding duplicate points",
  );
  for (const [control, value, property, expected] of [
    ["width", "6", "width", 6],
    ["style", "dashed", "style", "dashed"],
    ["arrows", "end", "arrows", "end"],
  ]) {
    await clickControl(`#${control}-menu`);
    await clickControl(`[data-control="${control}"][data-value="${value}"]`);
    assert.equal(
      await evaluate(
        `StringStudio.project.objects[0][${JSON.stringify(property)}]`,
      ),
      expected,
    );
    assert.equal(await evaluate('document.querySelector(".menu-popup")'), null);
  }
  report(
    "Graphical dropdowns change selected stroke thickness, style and arrows",
  );
  const splineTikZ = await evaluate("StringStudio.generateTikZ()");
  await evaluate('StringStudio.setTool("polyline")');
  await clickWorld(380, 280);
  await clickWorld(450, 350);
  await key("Escape", "Escape");
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).points.length"),
    2,
  );
  await evaluate('StringStudio.setTool("polyline")');
  await clickWorld(450, 250);
  await clickWorld(550, 350);
  const pathEnd = await screen(550, 350);
  await mouse("mousePressed", pathEnd.x, pathEnd.y, {
    button: "left",
    clickCount: 2,
  });
  await mouse("mouseReleased", pathEnd.x, pathEnd.y, {
    button: "left",
    clickCount: 2,
  });
  await pause();
  assert.equal(await evaluate("StringStudio.project.objects.length"), 3);
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).points.length"),
    2,
  );
  report(
    "Dot-to-dot paths finish with Escape or double-click without duplicate points",
  );
  await evaluate('StringStudio.setTool("region")');
  await traceWorld([
    { x: 390, y: 290 },
    { x: 490, y: 260 },
    { x: 590, y: 310 },
    { x: 550, y: 420 },
    { x: 430, y: 430 },
    { x: 390, y: 290 },
  ]);
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).kind"),
    "region",
  );
  report("Freehand filled-region drawing");
  await clickControl("#pattern-menu");
  await clickControl('[data-control="pattern"][data-value="dots"]');
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).pattern"),
    "dots",
  );
  report("Graphical fill menu changes the selected region pattern");
  await evaluate(
    'document.getElementById("color").value="#587c9b";document.getElementById("color").dispatchEvent(new Event("change"));document.getElementById("fill-color").value="#b95650";document.getElementById("fill-color").dispatchEvent(new Event("change"));',
  );
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).color"),
    "#587c9b",
  );
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).fillColor"),
    "#b95650",
  );
  assert.equal(
    await evaluate(
      'StringStudio.parseTikZ(StringStudio.generateTikZ()).model.objects.find(o=>o.kind==="region").fillColor',
    ),
    "#b95650",
  );
  report("Independent outline and fill colours survive TikZ export and import");
  // Refinements requested after the first redesign.
  assert.equal(
    await evaluate('document.getElementById("top-help").textContent'),
    "Help",
  );
  await clickControl("#sidebar-toggle");
  await clickControl("#top-help");
  assert.equal(
    await evaluate(
      'getComputedStyle(document.getElementById("sidebar")).display',
    ),
    "flex",
  );
  await clickControl("#close-help");
  await evaluate('StringStudio.setTool("line")');
  assert.equal(
    await evaluate('document.getElementById("pattern-menu").disabled'),
    true,
  );
  assert.match(
    await evaluate('document.getElementById("tool-tip").textContent'),
    /Shift/,
  );
  await clickControl('[data-tool="fill"]');
  assert.equal(
    await evaluate('document.getElementById("pattern-menu").disabled'),
    false,
  );
  assert.equal(
    await evaluate(
      'document.querySelector(".fill-well").getAttribute("aria-pressed")',
    ),
    "true",
  );
  await clickControl(".stroke-well");
  assert.equal(
    await evaluate(
      'document.querySelector(".stroke-well").getAttribute("aria-pressed")',
    ),
    "true",
  );
  const hover = await evaluate(
    '(()=>{const r=document.querySelector("[data-tool=bezier]").getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()',
  );
  await mouse("mouseMoved", hover.x, hover.y);
  await pause(180);
  assert.equal(
    await evaluate('document.getElementById("quick-tooltip").hidden'),
    false,
  );
  assert.match(
    await evaluate('document.getElementById("quick-tooltip").textContent'),
    /Bézier/,
  );
  assert.ok(
    Math.abs(
      Number(
        await evaluate(
          'document.querySelector("#grid-dots circle").getAttribute("cx")',
        ),
      ) -
        CM / 2,
    ) < 1e-8,
  );
  assert.ok(
    await evaluate(
      'Number(document.querySelector("#grid-dots circle").getAttribute("r"))*StringStudio.view.zoom >= .99',
    ),
  );
  await clickControl("#grid-toggle");
  assert.equal(
    await evaluate('document.getElementById("grid-layer").children.length'),
    0,
  );
  await clickControl("#grid-toggle");
  assert.equal(
    await evaluate('document.getElementById("grid-layer").children.length'),
    1,
  );
  report(
    "Labelled file commands, visible grid toggle, 120ms tooltips, colour targets and contextual patterns",
  );

  await evaluate(
    '(()=>{const source=StringStudio.project.objects.find(o=>o.kind==="line");StringStudio.load({version:2,nextId:2,overrides:{},objects:[{...source,id:1,name:"Anchor",curve:"polyline",style:"solid",points:[{x:417,y:313},{x:650,y:430}]}]});StringStudio.setTool("line")})()',
  );
  await clickControl("#node-snap-toggle");
  await clickControl("#snap-toggle");
  const snapZoom = await evaluate("StringStudio.view.zoom");
  await dragWorld(
    { x: 417 + 6 / snapZoom, y: 313 + 5 / snapZoom },
    { x: 520, y: 220 },
  );
  assert.deepEqual(
    await evaluate("StringStudio.project.objects.at(-1).points[0]"),
    { x: 417, y: 313 },
  );
  assert.deepEqual(
    await evaluate("StringStudio.project.objects.at(-1).points[1]"),
    { x: Math.round(520 / CM) * CM, y: Math.round(220 / CM) * CM },
  );
  await clickControl("#snap-toggle");
  await clickControl("#node-snap-toggle");
  await evaluate('StringStudio.setTool("direct")');
  const fixedEnd = await evaluate("StringStudio.project.objects[0].points[1]");
  await dragWorld({ x: 417 - 10 / snapZoom, y: 313 }, { x: 387, y: 330 });
  assert.deepEqual(
    await evaluate("StringStudio.project.objects[0].points[1]"),
    fixedEnd,
  );
  assert.ok(
    Math.abs(
      (await evaluate("StringStudio.project.objects[0].points[0].x")) - 387,
    ) < 0.1,
  );
  const directBefore = await evaluate("StringStudio.project.objects[0]");
  const midpoint = {
    x: (directBefore.points[0].x + fixedEnd.x) / 2,
    y: (directBefore.points[0].y + fixedEnd.y) / 2,
  };
  await dragWorld(midpoint, { x: midpoint.x + 30, y: midpoint.y + 20 });
  assert.deepEqual(
    await evaluate("StringStudio.project.objects[0]"),
    directBefore,
  );
  report(
    "Node snap wins over grid snap; point editing grabs within 15px and never drags the whole path",
  );

  await evaluate(
    'StringStudio.load({version:2,objects:[],overrides:{},nextId:1});StringStudio.setTool("bezier-region")',
  );
  for (const p of [
    { x: 380, y: 280 },
    { x: 560, y: 230 },
    { x: 650, y: 360 },
    { x: 450, y: 450 },
  ])
    await clickWorld(p.x, p.y);
  await key("Escape", "Escape");
  assert.equal(
    await evaluate("StringStudio.project.objects[0].kind"),
    "region",
  );
  assert.equal(await evaluate("StringStudio.project.objects[0].closed"), true);
  assert.equal(
    await evaluate("StringStudio.project.objects[0].points.length"),
    4,
  );
  assert.equal(
    await evaluate('document.querySelectorAll("[data-handle]").length'),
    12,
  );
  assert.equal(
    (
      await evaluate(
        'document.querySelector("#region-layer path").getAttribute("d")',
      )
    ).match(/C/g).length,
    4,
  );
  const curved = await evaluate(
    "StringStudio.parseTikZ(StringStudio.generateTikZ())",
  );
  assert.deepEqual(curved.dropped, []);
  assert.equal(curved.model.objects[0].closed, true);
  assert.equal(curved.model.objects[0].points.length, 4);
  await evaluate(
    "StringStudio.validateProject(StringStudio.parseTikZ(StringStudio.generateTikZ()).model)",
  );
  await evaluate('StringStudio.setTool("dot")');
  await clickWorld(500, 350);
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).rx*0.75"),
    2,
  );
  assert.match(await evaluate("StringStudio.generateTikZ()"), /circle \(2pt\)/);
  const dotZoom = await evaluate("StringStudio.view.zoom");
  await dragWorld(
    { x: 500 + 18 / dotZoom, y: 350 },
    { x: 500 + 48 / dotZoom, y: 350 },
  );
  const dot = await evaluate("StringStudio.project.objects.at(-1)");
  assert.ok(dot.rx > 2 / 0.75);
  assert.equal(dot.rx, dot.ry);
  await key("z", "KeyZ", 2);
  assert.equal(
    await evaluate("StringStudio.project.objects.at(-1).rx*0.75"),
    2,
  );
  const refinedShapes = await evaluate("StringStudio.generateTikZ()");
  const dots = await evaluate(
    "StringStudio.parseTikZ(StringStudio.generateTikZ())",
  );
  assert.equal(dots.model.objects.at(-1).dot, true);
  await fs.writeFile(
    "/private/tmp/string-refined-shapes.png",
    Buffer.from(
      (await send("Page.captureScreenshot", { format: "png" })).data,
      "base64",
    ),
  );
  report(
    "Closed Bézier region has all tangent handles; 2pt dot resizes circularly and supports undo and TikZ",
  );

  await evaluate('StringStudio.setTool("bezier")');
  await clickWorld(370, 300);
  await clickWorld(490, 240);
  await clickWorld(620, 380);
  await key("Escape", "Escape");
  await clickControl("#style-menu");
  await clickControl('[data-control="style"][data-value="squiggly"]');
  await key("c", "KeyC", 2);
  await key("v", "KeyV", 2);
  const compact = await evaluate("StringStudio.generateTikZ()");
  const preamble = await evaluate(
    'document.getElementById("tikz-preamble").value',
  );
  assert.match(preamble, /\\usetikzlibrary\{.*decorations.pathmorphing/);
  assert.equal(preamble, await evaluate("StringStudio.generatePreamble()"));
  assert.ok(!compact.includes("usetikzlibrary"));
  assert.match(compact, /\n\n  \\draw/);

  assert.match(compact, /decoration=\{snake/);
  assert.match(compact, /\\tikzset/);
  assert.equal((compact.match(/\\definecolor/g) || []).length, 2);
  assert.ok(
    compact.length < 3000,
    `Compact fixture unexpectedly large: ${compact.length}`,
  );
  const restoredCompact = await evaluate(
    "StringStudio.parseTikZ(StringStudio.generateTikZ())",
  );
  assert.deepEqual(restoredCompact.dropped, []);
  assert.equal(
    restoredCompact.model.objects.filter(
      (o) => o.style === "squiggly" && o.kind === "line",
    ).length,
    2,
  );
  assert.equal(
    restoredCompact.model.objects.filter((o) => o.kind === "line").at(-1).curve,
    "spline",
  );
  assert.equal(
    restoredCompact.model.objects.filter((o) => o.kind === "line").at(-1).points
      .length,
    3,
  );
  await evaluate(
    "StringStudio.validateProject(StringStudio.parseTikZ(StringStudio.generateTikZ()).model)",
  );
  await fs.writeFile("/private/tmp/string-compact-example.tex", compact);
  report(
    `Native waves and shared styles keep the four-object fixture at ${compact.length} characters`,
  );

  // Template placement, groups, grid spacing and layer controls.
  await evaluate(
    'StringStudio.load({version:2,objects:[],overrides:{},nextId:1});StringStudio.setTool("line");document.getElementById("color").value="#ff0000";document.getElementById("color").dispatchEvent(new Event("change"));document.getElementById("style").value="dashed";document.getElementById("style").dispatchEvent(new Event("change"));document.getElementById("width").value="2";document.getElementById("width").dispatchEvent(new Event("change"));',
  );
  await clickControl("#templates-toggle");
  assert.ok(
    await evaluate(
      `document.querySelector('[data-template=cup] path[stroke="#ff0000"][stroke-dasharray]')!==null`,
    ),
  );
  await clickControl('[data-template="cup-arc"]');
  assert.equal(await evaluate("StringStudio.project.objects.length"), 0);
  assert.equal(
    await evaluate('document.querySelectorAll("#template-ghost").length'),
    1,
  );
  const deposit = await screen(520, 330);
  await mouse("mouseMoved", deposit.x, deposit.y);
  await pause();
  const ghost = await evaluate(
    '(()=>{const r=document.getElementById("template-ghost").getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()',
  );
  assert.ok(
    Math.abs(ghost.x - deposit.x) < 1 && Math.abs(ghost.y - deposit.y) < 1,
  );
  await clickWorld(520, 330);
  const placed = await evaluate("StringStudio.project.objects[0]");
  assert.equal(placed.color, "#ff0000");
  assert.equal(placed.style, "dashed");
  assert.deepEqual(placed.points[0], { x: 472, y: 330 });
  assert.equal(
    await evaluate('document.getElementById("template-ghost")'),
    null,
  );
  await clickControl('[data-template="cap-arc"]');
  await key("Escape", "Escape");
  assert.equal(await evaluate("StringStudio.project.objects.length"), 1);
  assert.equal(
    await evaluate('document.getElementById("template-ghost")'),
    null,
  );
  await clickControl('[data-template="identity"]');
  await clickControl(".stroke-well");
  await clickControl('[data-color="#0000ff"]');
  assert.ok(
    await evaluate(
      `document.querySelector('#template-ghost path[stroke="#0000ff"]')!==null`,
    ),
  );
  await clickWorld(580, 380, 8);
  assert.ok(
    await evaluate(
      "StringStudio.project.objects.slice(1).every(o=>o.z<StringStudio.project.objects[0].z)",
    ),
  );
  await clickControl('[data-template="categories"]');
  assert.equal(
    await evaluate('document.getElementById("pattern-menu").disabled'),
    false,
  );
  await clickControl("#pattern-menu");
  await clickControl('[data-control="pattern"][data-value="crosshatch"]');
  assert.ok(
    await evaluate(
      'document.querySelectorAll("#template-ghost pattern path").length>=6',
    ),
  );
  await clickControl(".fill-well");
  await clickControl('[data-color="#00ff00"]');
  assert.ok(
    await evaluate(
      `document.querySelector('#template-ghost pattern path[stroke="#00ff00"]')!==null`,
    ),
  );
  await key("Escape", "Escape");
  assert.equal(await evaluate("StringStudio.project.objects.length"), 3);
  await clickControl("#close-templates");
  report(
    "Templates follow the pointer, inherit live stroke/fill/pattern settings, place on click, cancel with Escape and support Shift-under",
  );

  await clickControl("#grid-reset");
  assert.equal(
    await evaluate('document.getElementById("grid-size").textContent'),
    "1 cm",
  );
  await clickControl("#grid-minus");
  assert.equal(
    await evaluate('document.getElementById("grid-size").textContent'),
    "0.5 cm",
  );
  assert.ok(
    Math.abs(
      Number(
        await evaluate(
          'document.querySelector("#grid-dots").getAttribute("width")',
        ),
      ) -
        CM * 0.5,
    ) < 1e-8,
  );
  await clickControl("#snap-toggle");
  await evaluate('StringStudio.setTool("line")');
  await dragWorld({ x: 383, y: 267 }, { x: 557, y: 434 });
  const spacing = CM * 0.5;
  assert.deepEqual(
    await evaluate("StringStudio.project.objects.at(-1).points"),
    [
      {
        x: Math.round(383 / spacing) * spacing,
        y: Math.round(267 / spacing) * spacing,
      },
      {
        x: Math.round(557 / spacing) * spacing,
        y: Math.round(434 / spacing) * spacing,
      },
    ],
  );
  await clickControl("#snap-toggle");
  await clickControl("#grid-plus");
  assert.equal(
    await evaluate('document.getElementById("grid-size").textContent'),
    "1 cm",
  );
  report(
    "Grid − / + controls use centimetres, default to 1 cm, and update snapping",
  );

  await evaluate(
    'StringStudio.load({version:2,objects:[],overrides:{},nextId:1});StringStudio.placeTemplate("identity",{x:500,y:350});StringStudio.setTool("select")',
  );
  await key("a", "KeyA", 2);
  await key("g", "KeyG", 2);
  const groupId = await evaluate("StringStudio.project.objects[0].group");
  assert.ok(groupId);
  assert.equal(
    await evaluate("StringStudio.project.objects[1].group"),
    groupId,
  );
  await clickWorld(690, 480);
  await clickWorld(470, 350);
  assert.equal(await evaluate("StringStudio.selection.length"), 2);
  const groupBefore = await evaluate("StringStudio.project.objects");
  await dragWorld({ x: 470, y: 350 }, { x: 500, y: 370 });
  const groupAfter = await evaluate("StringStudio.project.objects");
  for (let i = 0; i < 2; i++) {
    assert.ok(
      Math.abs(groupAfter[i].points[0].x - groupBefore[i].points[0].x - 30) <
        0.1,
    );
    assert.ok(
      Math.abs(groupAfter[i].points[0].y - groupBefore[i].points[0].y - 20) <
        0.1,
    );
  }
  await key("c", "KeyC", 2);
  await key("v", "KeyV", 2);
  const pastedGroup = await evaluate("StringStudio.project.objects.slice(2)");
  assert.equal(pastedGroup[0].group, pastedGroup[1].group);
  assert.notEqual(pastedGroup[0].group, groupId);
  await clickWorld(700, 510);
  await clickWorld(524, 394);
  assert.equal(await evaluate("StringStudio.selection.length"), 2);
  await key("g", "KeyG", 10);
  assert.ok(
    await evaluate("StringStudio.project.objects.slice(2).every(o=>!o.group)"),
  );
  assert.ok(
    await evaluate("StringStudio.project.objects.slice(0,2).every(o=>o.group)"),
  );
  const groupedProject = await evaluate("StringStudio.project");
  await evaluate(`StringStudio.load(${JSON.stringify(groupedProject)})`);
  await clickWorld(500, 370);
  assert.equal(await evaluate("StringStudio.selection.length"), 2);
  report(
    "Ctrl+G groups movement; copies get separate groups; Ctrl+Shift+G ungroups; project reload preserves grouping",
  );

  await evaluate(
    '(()=>{const source=StringStudio.project.objects[0];const points=[[{x:350,y:350},{x:650,y:350}],[{x:500,y:220},{x:500,y:480}],[{x:350,y:450},{x:650,y:250}]];StringStudio.load({version:2,nextId:4,overrides:{},objects:points.map((p,i)=>({...source,id:i+1,z:i+1,group:undefined,style:"solid",arrows:"none",points:p}))});StringStudio.setTool("select")})()',
  );
  await clickWorld(400, 350);
  const layerBefore = await evaluate("StringStudio.project");
  await evaluate('document.getElementById("layer-order").focus()');
  await key("End", "End");
  assert.equal(await evaluate("StringStudio.project.objects[0].z"), 3);
  assert.equal(
    await evaluate('document.getElementById("layer-position").textContent'),
    "3/3",
  );
  assert.ok(
    await evaluate(
      "StringStudio.crossings.filter(c=>c.a===1||c.b===1).every(c=>c.upper===1)",
    ),
  );
  await evaluate('document.getElementById("canvas").focus()');
  await key("z", "KeyZ", 2);
  assert.deepEqual(await evaluate("StringStudio.project"), layerBefore);
  // A continuous pointer drag also records only one undo step.
  const slider = await evaluate(
    '(()=>{const r=document.getElementById("layer-order").getBoundingClientRect();return {left:r.left+8,right:r.right-8,y:r.top+r.height/2}})()',
  );
  await mouse("mousePressed", slider.left, slider.y, {
    button: "left",
    clickCount: 1,
  });
  for (let i = 1; i <= 8; i++)
    await mouse(
      "mouseMoved",
      slider.left + ((slider.right - slider.left) * i) / 8,
      slider.y,
      { button: "left", buttons: 1 },
    );
  await mouse("mouseReleased", slider.right, slider.y, {
    button: "left",
    clickCount: 1,
  });
  await pause();
  assert.equal(await evaluate("StringStudio.project.objects[0].z"), 3);
  await evaluate('document.getElementById("canvas").focus()');
  await key("z", "KeyZ", 2);
  assert.deepEqual(await evaluate("StringStudio.project"), layerBefore);
  report(
    "Back–Front slider updates crossing order and records one undo step per drag",
  );

  await evaluate(
    'StringStudio.load({version:2,objects:[],overrides:{},nextId:1});document.getElementById("style").value="solid";document.getElementById("style").dispatchEvent(new Event("change"));StringStudio.placeTemplate("braid",{x:450,y:350})',
  );
  assert.equal(await evaluate("StringStudio.project.objects.length"), 3);
  assert.equal(await evaluate("StringStudio.crossings.length"), 3);
  assert.ok(
    await evaluate(
      "StringStudio.project.objects.every(o=>o.points.every((p,i,points)=>i===0||p.y>points[i-1].y))",
    ),
  );
  await evaluate('StringStudio.placeTemplate("categories",{x:650,y:350})');
  assert.equal(
    await evaluate(
      'StringStudio.project.objects.filter(o=>o.kind==="region").length',
    ),
    3,
  );
  assert.deepEqual(
    await evaluate(
      'StringStudio.project.objects.filter(o=>o.kind==="text").map(o=>o.text)',
    ),
    ["A", "B", "C"],
  );
  assert.equal(
    await evaluate(
      'new Set(StringStudio.project.objects.filter(o=>o.kind==="region").map(o=>o.opacity)).size',
    ),
    3,
  );
  assert.ok(await evaluate("StringStudio.project.objects.every(o=>!o.group)"));
  await evaluate("StringStudio.fit()");
  const templateExample = await evaluate("StringStudio.generateTikZ()");
  await fs.writeFile(
    "/private/tmp/string-templates-example.png",
    Buffer.from(
      (await send("Page.captureScreenshot", { format: "png" })).data,
      "base64",
    ),
  );
  report(
    "Braid has three monotone strands and three crossings; category regions remain distinct and individually editable",
  );

  await send("Emulation.setDeviceMetricsOverride", {
    width: 900,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await pause(100);
  await clickControl("#templates-toggle");
  await pause(100);
  assert.equal(
    await evaluate('document.getElementById("templates-next").hidden'),
    false,
  );
  await clickControl("#templates-next");
  await pause(400);
  assert.ok(
    await evaluate('document.getElementById("templates").scrollLeft>0'),
  );
  await key("<", "Comma", 8);
  await pause(400);
  assert.equal(
    await evaluate('document.getElementById("templates").scrollLeft'),
    0,
  );
  await key(">", "Period", 8);
  await pause(400);
  assert.ok(
    await evaluate('document.getElementById("templates").scrollLeft>0'),
  );
  await clickControl("#close-templates");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 960,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await pause(100);
  report("Overflowing templates can be paged with buttons and < / > keys");

  const legacyTikZ = String.raw`\begin{tikzpicture}
\draw[line width=0.8pt] (0,0) to[out=90, in=-90] (1,2);
\filldraw[pattern=north west lines, pattern color=black!30, line width=0.8pt] (0,0) -- (2,0) -- (2,2) -- cycle;
\node[draw, fill=white, circle, line width=0.8pt] at (1,1) {f};
\fill[black] (2,2) circle (2pt);
\end{tikzpicture}`;
  const legacy = await evaluate(
    `StringStudio.parseTikZ(${JSON.stringify(legacyTikZ)})`,
  );
  assert.deepEqual(legacy.dropped, []);
  assert.equal(legacy.model.objects.length, 4);
  assert.equal(legacy.model.objects[2].fillColor, "#ffffff");
  assert.equal(legacy.model.objects[2].color, "#000000");
  assert.equal(legacy.model.objects[3].fillColor, "#000000");
  assert.equal(
    await evaluate(
      `StringStudio.validateProject(StringStudio.parseTikZ(${JSON.stringify(legacyTikZ)}).model).objects.length`,
    ),
    4,
  );
  report(
    "Legacy TikZ curves, shaded regions, white nodes and point nodes import correctly",
  );
  await evaluate(
    '(()=>{const source=StringStudio.project.objects.find(o=>o.kind==="line");const a={...source,id:1,name:"Horizontal",style:"solid",arrows:"none",curve:"polyline",points:[{x:330,y:350},{x:670,y:350}],z:1,gap:7};const b={...a,id:2,name:"Vertical",points:[{x:500,y:210},{x:500,y:490}],z:2};const c={...a,id:3,name:"Diagonal",points:[{x:380,y:230},{x:620,y:470}],z:3};StringStudio.load({version:2,objects:[a,b,c],overrides:{},nextId:4})})()',
  );
  const overlapping = await evaluate("StringStudio.generateTikZ()");
  assert.equal((overlapping.match(/\\clip /g) || []).length, 3);
  report(
    "TikZ exports overlapping crossing gaps as separate clipping operations",
  );
  await evaluate("StringStudio.loadDemo()");
  const compileSource = String.raw`\documentclass{article}
\usepackage[margin=1cm]{geometry}
\usepackage{tikz}
\usetikzlibrary{patterns,arrows.meta,decorations.pathmorphing}
\pagestyle{empty}
\begin{document}
${await evaluate("StringStudio.generateTikZ()")}
\newpage
${overlapping}
\newpage
${splineTikZ}
\newpage
${refinedShapes}
\newpage
${compact}
\newpage
${templateExample}
\end{document}`;
  await fs.writeFile(
    "/private/tmp/string-studio-validation.tex",
    compileSource,
  );

  // Exercise history transitions without waiting for the debounced autosave.
  await evaluate(
    'document.getElementById("new").click();localStorage.removeItem("string-drawings-v1")',
  );
  const savedA = await evaluate("StringStudio.loadDemo();StringStudio.project");
  await evaluate('document.getElementById("new").click()');
  assert.equal(
    await evaluate(
      'JSON.parse(localStorage.getItem("string-drawings-v1")).length',
    ),
    1,
  );
  await evaluate('document.getElementById("new").click()');
  assert.equal(
    await evaluate(
      'JSON.parse(localStorage.getItem("string-drawings-v1")).length',
    ),
    1,
  );
  const savedB = structuredClone(savedA);
  savedB.objects.find((o) => o.kind === "line").color = "#ff0000";
  await evaluate(`StringStudio.load(${JSON.stringify(savedB)})`);
  await clickControl("#load");
  assert.equal(
    await evaluate('document.querySelectorAll(".drawing-card").length'),
    2,
  );
  const ids = await evaluate(
    'Array.from(document.querySelectorAll(".drawing-card"),e=>e.dataset.drawingId)',
  );
  // Gallery SVG identifiers must not collide with the live canvas or other thumbnails.
  assert.equal(
    await evaluate(
      '(()=>{const ids=Array.from(document.querySelectorAll("svg [id]"),e=>e.id);return ids.length===new Set(ids).size})()',
    ),
    true,
  );
  await clickControl(`.drawing-card[data-drawing-id="${ids[1]}"]`);
  assert.deepEqual(await evaluate("StringStudio.project"), savedA);
  await clickControl("#load");
  await clickControl(`.drawing-card[data-drawing-id="${ids[0]}"]`);
  assert.deepEqual(await evaluate("StringStudio.project"), savedB);
  await clickControl("#load");
  const galleryImage = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    "/private/tmp/string-history-gallery.png",
    Buffer.from(galleryImage.data, "base64"),
  );
  savedB.objects.find((o) => o.kind === "line").width = 4;
  await evaluate(`StringStudio.load(${JSON.stringify(savedB)})`);
  await clickControl(`.drawing-card[data-drawing-id="${ids[0]}"]`);
  assert.deepEqual(await evaluate("StringStudio.project"), savedB);
  report(
    "New and gallery switching save nonempty drawings immediately; blanks and reopening do not duplicate history",
  );
  report(
    "Opening a thumbnail after editing with the gallery open uses the latest drawing, not its stale preview",
  );

  const editable = String.raw`\begin{tikzpicture}[x=1cm,y=-1cm,line cap=round,line join=round]
  \draw[draw=red, line width=1.5pt] (0,0) -- (2,1);
\end{tikzpicture}`;
  await evaluate(
    `(()=>{const code=document.getElementById("tikz");code.value=${JSON.stringify(editable)};code.dispatchEvent(new Event("input"));code.focus()})()`,
  );
  await key("Enter", "Enter", 2);
  assert.equal(await evaluate("StringStudio.project.objects.length"), 1);
  assert.equal(
    await evaluate("StringStudio.project.objects[0].color"),
    "#ff0000",
  );
  assert.ok(
    Math.abs(
      (await evaluate("StringStudio.project.objects[0].points[1].x")) - 2 * CM,
    ) < 0.001,
  );
  await evaluate("StringStudio.undo()");
  assert.deepEqual(await evaluate("StringStudio.project"), savedB);
  await evaluate(
    `document.getElementById("tikz").value=${JSON.stringify(editable)};document.getElementById("tikz").dispatchEvent(new Event("input"))`,
  );
  await clickControl("#apply-code");
  assert.equal(
    await evaluate("StringStudio.project.objects[0].color"),
    "#ff0000",
  );
  const applied = await evaluate("StringStudio.project");
  const draftCode = editable.replace("(2,1)", "(3,1)");
  await evaluate(
    `document.getElementById("tikz").value=${JSON.stringify(draftCode)};document.getElementById("tikz").dispatchEvent(new Event("input"))`,
  );
  await send("Page.reload");
  await pause(400);
  assert.equal(await evaluate("StringStudio.project.objects.length"), 0);
  await clickControl("#load");
  await clickControl(".drawing-card");
  assert.deepEqual(await evaluate("StringStudio.project"), applied);
  assert.equal(
    await evaluate('document.getElementById("tikz").value'),
    draftCode,
  );
  report(
    "Apply and Ctrl+Enter update TikZ geometry/colour with undo; unapplied edits survive reload in history",
  );

  await evaluate(
    'document.getElementById("new").click();localStorage.removeItem("string-drawings-v1")',
  );
  await evaluate(
    `(()=>{for(let i=0;i<23;i++){const project=${JSON.stringify(savedA)};project.objects[0].name="Saved "+i;StringStudio.load(project);document.getElementById("new").click()}})()`,
  );
  const last20 = await evaluate(
    'JSON.parse(localStorage.getItem("string-drawings-v1"))',
  );
  assert.equal(last20.length, 20);
  assert.equal(last20[0].project.objects[0].name, "Saved 22");
  assert.equal(last20.at(-1).project.objects[0].name, "Saved 3");
  assert.ok(
    last20.every(
      (entry) =>
        entry.code.includes("\\begin{tikzpicture}") &&
        entry.preamble.includes("\\usepackage{tikz}"),
    ),
  );
  await clickControl("#load");
  assert.equal(
    await evaluate('document.getElementById("drawings-next").hidden'),
    false,
  );
  await clickControl("#drawings-next");
  await pause(400);
  assert.ok(await evaluate('document.getElementById("drawings").scrollLeft>0'));
  await clickControl("#close-drawings");
  await evaluate(
    `document.getElementById("tikz").value=${JSON.stringify(editable)};document.getElementById("tikz").dispatchEvent(new Event("input"));document.getElementById("new").click()`,
  );
  await clickControl("#load");
  await clickControl(".drawing-card");
  assert.equal(await evaluate("StringStudio.project.objects.length"), 0);
  assert.equal(
    await evaluate('document.getElementById("tikz").value'),
    editable,
  );
  await clickControl("#apply-code");
  assert.equal(await evaluate("StringStudio.project.objects.length"), 1);
  await evaluate('document.getElementById("new").click()');
  report(
    "Unapplied TikZ entered on a blank canvas is kept as a recoverable draft",
  );
  // Migrate the previous editor's single autosave without putting it on the canvas.
  await evaluate(
    `localStorage.removeItem("string-drawings-v1");localStorage.setItem("string-studio-v2",${JSON.stringify(JSON.stringify(savedA))})`,
  );
  await send("Page.reload");
  await pause(400);
  assert.equal(await evaluate("StringStudio.project.objects.length"), 0);
  assert.equal(
    await evaluate('localStorage.getItem("string-studio-v2")'),
    null,
  );
  assert.equal(
    await evaluate(
      'JSON.parse(localStorage.getItem("string-drawings-v1")).length',
    ),
    1,
  );
  await send("Page.reload");
  await pause(400);
  assert.equal(
    await evaluate(
      'JSON.parse(localStorage.getItem("string-drawings-v1")).length',
    ),
    1,
  );
  await clickControl("#load");
  await clickControl(".drawing-card");
  assert.deepEqual(await evaluate("StringStudio.project"), savedA);
  report(
    "History keeps exactly the last 20 drawings, pages horizontally, and migrates the old autosave only once",
  );

  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await pause(150);
  assert.ok(
    await evaluate(
      'document.getElementById("canvas").getBoundingClientRect().width>200',
    ),
  );
  const mobile = await send("Page.captureScreenshot", { format: "png" });
  await fs.writeFile(
    "/private/tmp/string-studio-mobile.png",
    Buffer.from(mobile.data, "base64"),
  );
  report("Mobile layout keeps a usable drawing canvas");
  await evaluate('document.getElementById("sidebar-toggle").click()');
  assert.equal(
    await evaluate(
      'getComputedStyle(document.querySelector(".sidebar")).display',
    ),
    "flex",
  );
  report("Mobile TikZ panel can be opened");
  assert.deepEqual(errors, []);
  report("No browser runtime errors");
} finally {
  socket.close();
}
