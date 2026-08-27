// Turns the prerendered output in dist/client into a folder (docs/) that works
// both on a static host (GitHub Pages) and when index.html is opened straight
// from disk (file://). Browsers refuse to load external ES modules over
// file://, so every page gets its JS and CSS inlined into the HTML itself.
import { cp, mkdir, rm, writeFile, readFile, access, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
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

const pages = await htmlFiles(out);

// 1. Re-bundle the client entry (and every chunk it imports) into one file.
const indexHtml = await readFile(path.join(out, "index.html"), "utf8");
const entryMatch = indexHtml.match(/src="[^"]*?(assets\/index-[^"]+\.js)"/);
if (!entryMatch) {
  console.error("Could not find the client entry script in index.html");
  process.exit(1);
}
const bundlePath = path.join(out, "assets", "bundle.js");
execFileSync(
  "bunx",
  [
    "esbuild",
    path.join(out, entryMatch[1]),
    "--bundle",
    "--format=iife",
    "--minify",
    // import.meta does not exist in a classic script; the value is only used by
    // Vite's (now unused) chunk-preload helper.
    '--define:import.meta.url="file:///"',
    "--define:import.meta.resolve=undefined",
    `--outfile=${bundlePath}`,
  ],
  { stdio: "inherit" },
);
// Everything is in one file now, but Vite's dependency map still lists the
// original chunk names and would try to preload them. Point those entries at
// an inert data URL so nothing is requested from disk.
{
  const patched = (await readFile(bundlePath, "utf8")).replace(
    /"assets\/[^"]+\.(?:js|css)"/g,
    '"data:text/javascript,"',
  );
  await writeFile(bundlePath, patched);
}

// The bundle stays an external classic script: browsers block ES modules over
// file://, but plain scripts and stylesheets load fine from disk.
const cssName = indexHtml.match(/href="[^"]*?(assets\/styles-[^"]+\.css)"/)?.[1];

for (const file of pages) {
  const rel = path.relative(out, file);
  const dir = path.dirname(rel).replace(/\\/g, "/");
  const route = dir === "." ? "/" : `/${dir}`;
  const prefix = dir === "." ? "./" : "../".repeat(dir.split("/").length);

  let html = await readFile(file, "utf8");

  // Drop every module reference — the single classic bundle replaces them all.
  html = html
    .replace(/<link[^>]+rel="modulepreload"[^>]*>/g, "")
    .replace(/<script[^>]+src="[^"]*assets\/[^"]+"[^>]*><\/script>/g, "");

  // The router manifest still lists the original module chunks; loading them
  // is impossible (and unnecessary) once everything ships in one bundle.
  html = html
    .replace(/preloads:(\$R\[\d+\]=)?\[[^\]]*\]/g, "preloads:[]")
    .replace(/scripts:(\$R\[\d+\]=)?\[[\s\S]*?\}\]/g, "scripts:[]");

  // Local URLs must be relative so they also resolve from disk.
  if (cssName) {
    html = html.replace(
      /(href=")[^"]*(assets\/styles-[^"]+\.css")/g,
      `$1${prefix}$2`,
    );
  }
  html = html.replace(/(href|src)="\/favicon\.ico"/g, `$1="${prefix}favicon.ico"`);

  // When opened from disk the router uses hash history — make sure a
  // prerendered subpage hydrates on the route it was rendered for.
  const bootstrap =
    `<script>(function(){if(location.protocol!=="file:")return;` +
    `if(!location.hash){history.replaceState(null,"",location.href.split("#")[0]+"#${route}");}})();</script>`;

  html = html.replace("</head>", `${bootstrap}</head>`);
  html = html.replace("</body>", `<script src="${prefix}assets/bundle.js"></script></body>`);


  await writeFile(file, html);
}

// Original per-chunk modules are no longer referenced.
for (const f of await readdir(path.join(out, "assets"))) {
  if (f.endsWith(".js") && f !== "bundle.js") await rm(path.join(out, "assets", f));
}

// SPA fallback for deep links / refreshes on unknown paths.
await writeFile(path.join(out, "404.html"), await readFile(path.join(out, "index.html")));

// Keep the site out of search indexes.
await writeFile(path.join(out, "robots.txt"), "User-agent: *\nDisallow: /\n");

console.log(`Static site ready in ./docs (${pages.length} pages, self-contained HTML)`);
