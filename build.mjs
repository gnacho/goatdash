// Build: src/*.ts -> JS at repo root with IDENTICAL filenames to the historical
// layout (app.js, sw.js, theme.js, fixtures.js, update-check.js), so index.html
// references, the ?v= cache-bust scheme, the service worker scope and the
// server-side tarball updater all keep working unchanged.
import { build } from "esbuild";

const entries = {
  "app": "src/app.ts",
  "sw": "src/sw.ts",
  "theme": "src/theme.ts",
  "fixtures": "src/fixtures.ts",
  "update-check": "src/update-check.ts",
};

await build({
  entryPoints: entries,
  outdir: ".",
  bundle: false,
  minify: false,
  sourcemap: false,
  format: "iife",
  target: "es2022",
  logLevel: "info",
});
