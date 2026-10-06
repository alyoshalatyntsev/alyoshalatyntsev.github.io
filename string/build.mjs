import { readFile, writeFile } from "node:fs/promises";

// Keep the editor directly usable as a single local HTML file.
const read = (name) => readFile(new URL(name, import.meta.url), "utf8");
const [shell, css, js] = await Promise.all([
  read("studio.html"),
  read("studio.css"),
  read("studio.js"),
]);
const html = shell
  .replace(
    '<link rel="stylesheet" href="studio.css" />',
    () => `<style>\n${css.replace(/<\/style/gi, "<\\/style")}\n</style>`,
  )
  .replace(/^[\t ]*<script src="studio.js" defer><\/script>\r?\n/m, "")
  .replace(
    "</body>",
    () =>
      `<script>\n${js.replace(/<\/script/gi, "<\\/script")}\n</script>\n</body>`,
  );
await writeFile(new URL("index.html", import.meta.url), html);
console.log("Built standalone index.html");
