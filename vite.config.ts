// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Every page of the site — prerendered to static HTML.
const PAGES = [
  "/",
  "/app",
  "/registration",
  "/bonuses",
  "/casino",
  "/cricket-betting",
  "/payment-methods",
];

// `STATIC_EXPORT=1 npm run build:static` produces a fully static GitHub Pages build.
const STATIC_EXPORT = process.env["STATIC_EXPORT"] === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this. The static export uses the default entry so the
    // prerender preview server can boot it.
    ...(STATIC_EXPORT ? {} : { server: { entry: "server" } }),
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
    pages: PAGES.map((path) => ({ path, prerender: { enabled: true } })),
  },
  ...(STATIC_EXPORT ? { nitro: false as const } : {}),
});
