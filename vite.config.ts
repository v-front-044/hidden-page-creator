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

// `npm run build:static` produces a fully static GitHub Pages build (no SSR).
const STATIC_EXPORT = process.env["STATIC_EXPORT"] === "1";
// For project pages (https://user.github.io/repo/) set BASE_PATH=/repo/.
const BASE_PATH = process.env["BASE_PATH"];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this. The static export uses the default entry so the
    // prerender preview server can boot it.
    ...(STATIC_EXPORT ? {} : { server: { entry: "server" } }),
    // Prerendering only runs for the static export; the normal Lovable/SSR build
    // uses the custom server entry, which the prerender preview server can't boot.
    ...(STATIC_EXPORT
      ? {
          prerender: { enabled: true, crawlLinks: true },
          pages: PAGES.map((path) => ({ path, prerender: { enabled: true } })),
        }
      : {}),
  },

  // Static export skips the Cloudflare/Nitro server bundle entirely.
  ...(STATIC_EXPORT ? { nitro: false as const } : {}),
  ...(BASE_PATH ? { vite: { base: BASE_PATH } } : {}),
});

