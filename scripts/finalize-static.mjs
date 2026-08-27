// Turns the prerendered output in dist/client into a GitHub Pages-ready folder (docs/).
import { cp, mkdir, rm, writeFile, readFile, access } from "node:fs/promises";
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

// SPA fallback for deep links / refreshes on unknown paths.
await writeFile(path.join(out, "404.html"), await readFile(path.join(out, "index.html")));

// Keep the site out of search indexes.
await writeFile(path.join(out, "robots.txt"), "User-agent: *\nDisallow: /\n");

console.log("Static site ready in ./docs");
