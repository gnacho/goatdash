// Build: src/*.ts -> JS at repo root with the historical filenames, so the
// index.html references, the ?v= cache-bust scheme, the service worker and the
// server-side tarball updater keep working unchanged.
//
// - app.js: el grafo completo (main.ts), formato IIFE para cargarse con
//   <script src> sin type="module" (el CSP no cambia).
// - theme.js / sw.js: scripts clasicos (anti-FOUC y service worker), bundleados
//   y sin `export` final porque no los importa nadie.
// - fixtures.js / update-check.js: tambien clasicos.
import { build } from "esbuild";

const shared = {
  bundle: true,
  minify: false,
  sourcemap: false,
  target: "es2022",
  logLevel: "info",
};

await build({
  ...shared,
  entryPoints: { app: "src/main.ts" },
  outdir: ".",
  format: "iife",
  // los modulos internos no deben exponer export al final del bundle
  footer: { js: "" },
});

await build({
  ...shared,
  entryPoints: {
    theme: "src/theme.ts",
    sw: "src/sw.ts",
    fixtures: "src/fixtures.ts",
    "update-check": "src/update-check.ts",
  },
  outdir: ".",
  format: "iife",
});
