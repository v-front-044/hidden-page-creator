// Turns the prerendered output in dist/client into a GitHub Pages-ready folder (docs/)
// that also works when index.html is opened directly from disk (file://).
import { cp, mkdir, rm, writeFile, readFile, access, readdir } from "node:fs/promises";
import path from "node:path";

const src = path.resolve("dist/client");
const out = path.resolve("docs");

await access(src).catch(() => {
  console.error("dist/client not found — run the static build first.");
  process.exit(1);
});

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(src, out, { recursive: true });

// GitHub Pages must not run Jekyll (it strips _-prefixed asset folders).
await writeFile(path.join(out, ".nojekyll"), "");

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

// Bootstraps hash routing before hydration when the page is opened from disk,
// so a prerendered subpage hydrates on the same route it was rendered for.
const hashBootstrap = (route) => `<script>(function(){if(location.protocol!=="file:")return;` +
  `if(!location.hash){location.replace(location.href.split("#")[0]+"#${route}");}` +
  `})();</script>`;

for (const file of await htmlFiles(out)) {
  const rel = path.relative(out, file);
  const depth = rel.split(path.sep).length - 1;
  const prefix = depth === 0 ? "./" : "../".repeat(depth);

  let html = await readFile(file, "utf8");

  // Absolute asset URLs break on file:// — make them relative to this document.
  html = html
    .replace(/(href|src)="\/(assets\/|favicon\.ico)/g, `$1="${prefix}$2`)
    .replace(/"\/assets\//g, `"${prefix}assets/`);

  const route = "/" + path.dirname(rel).replace(/\\/g, "/").replace(/^\.$/, "");
  html = html.replace("</head>", `${hashBootstrap(route === "/" ? "/" : route)}</head>`);

  await writeFile(file, html);
}

// SPA fallback for deep links / refreshes on unknown paths.
await writeFile(path.join(out, "404.html"), await readFile(path.join(out, "index.html")));

// Keep the site out of search indexes.
await writeFile(path.join(out, "robots.txt"), "User-agent: *\nDisallow: /\n");

console.log("Static site ready in ./docs");
