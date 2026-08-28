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
    // Prerendering only runs for the static export; the normal Lovable/SSR build
    // uses TanStack Start's standard server entry for reliable Worker bundling.
    ...(STATIC_EXPORT
      ? {
          prerender: { enabled: true, crawlLinks: true },
          pages: PAGES.map((path) => ({ path, prerender: { enabled: true } })),
          // One bundle instead of per-route chunks, so the static build can be
          // inlined into each HTML file and opened straight from disk (file://).
          router: { autoCodeSplitting: false },
        }
      : {}),
  },

  // Static export skips the Cloudflare/Nitro server bundle entirely.
  ...(STATIC_EXPORT ? { nitro: false as const } : {}),
  ...(BASE_PATH
    ? { vite: { base: BASE_PATH } }
    : STATIC_EXPORT
      ? {
          vite: {
            build: {
              // Inline images/fonts as data URIs so nothing has to be fetched.
              assetsInlineLimit: 100 * 1024 * 1024,
            },
          },
        }
      : {}),
});


