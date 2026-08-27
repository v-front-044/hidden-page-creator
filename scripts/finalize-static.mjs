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
    "--format=esm",
    "--minify",
    `--outfile=${bundlePath}`,
  ],
  { stdio: "inherit" },
);
const bundle = (await readFile(bundlePath, "utf8")).replace(/<\/script/gi, "<\\/script");
await rm(bundlePath);

// 2. Inline the stylesheet(s).
const cssName = indexHtml.match(/href="[^"]*?(assets\/styles-[^"]+\.css)"/)?.[1];
const css = cssName ? (await readFile(path.join(out, cssName), "utf8")).replace(/<\/style/gi, "<\\/style") : "";

const scriptTag = `<script type="module">${bundle}</script>`;

for (const file of pages) {
  const rel = path.relative(out, file);
  const dir = path.dirname(rel).replace(/\\/g, "/");
  const route = dir === "." ? "/" : `/${dir}`;

  let html = await readFile(file, "utf8");

  // Drop every external JS reference — the bundle below replaces all of them.
  html = html
    .replace(/<link[^>]+rel="modulepreload"[^>]*>/g, "")
    .replace(/<script[^>]+src="[^"]*assets\/[^"]+"[^>]*><\/script>/g, "");

  // Inline CSS instead of linking it.
  if (css) {
    html = html.replace(
      /<link[^>]+href="[^"]*assets\/styles-[^"]+\.css"[^>]*>/g,
      `<style>${css}</style>`,
    );
  }

  // Local icon reference must be relative for file:// to resolve it.
  const prefix = dir === "." ? "./" : "../".repeat(dir.split("/").length);
  html = html.replace(/(href|src)="\/favicon\.ico"/g, `$1="${prefix}favicon.ico"`);

  // When opened from disk the router uses hash history — make sure a
  // prerendered subpage hydrates on the route it was rendered for.
  const bootstrap =
    `<script>(function(){if(location.protocol!=="file:")return;` +
    `if(!location.hash){history.replaceState(null,"",location.href.split("#")[0]+"#${route}");}})();</script>`;

  html = html.replace("</head>", `${bootstrap}</head>`);
  html = html.replace("</body>", `${scriptTag}</body>`);

  await writeFile(file, html);
}

// SPA fallback for deep links / refreshes on unknown paths.
await writeFile(path.join(out, "404.html"), await readFile(path.join(out, "index.html")));

// Keep the site out of search indexes.
await writeFile(path.join(out, "robots.txt"), "User-agent: *\nDisallow: /\n");

console.log(`Static site ready in ./docs (${pages.length} pages, self-contained HTML)`);
