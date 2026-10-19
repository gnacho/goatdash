// Build con Vite: src/*.ts -> JS en la raíz del repo con los nombres
// históricos. El resto de la cadena (index.html, ?v=, service worker y
// updater del servidor) no cambia: los ficheros se siguen sirviendo planos.
//
// Vite no permite outDir = root (se sobrescribiría el propio proyecto), así
// que compilamos a un directorio temporal y movemos los ficheros.
import { build } from "vite";
import { mkdirSync, rmSync, renameSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname);
const out = resolve(root, ".build");

const ENTRIES = {
  app: "src/main.ts",
  theme: "src/theme.ts",
  sw: "src/sw.ts",
  fixtures: "src/fixtures.ts",
  "update-check": "src/update-check.ts",
};

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const [name, entry] of Object.entries(ENTRIES)) {
  await build({
    root,
    logLevel: "warn",
    configFile: false,
    build: {
      target: "es2022",
      minify: false,
      sourcemap: false,
      emptyOutDir: false,
      reportCompressedSize: false,
      copyPublicDir: false,
      outDir: out,
      lib: {
        entry: resolve(root, entry),
        // nombres históricos, sin hash: el cache-bust es el ?v= manual
        fileName: () => `${name}.js`,
        // IIFE: se carga con <script src> clásico, el CSP no cambia
        formats: ["iife"],
        name: "Goatdash_" + name.replace(/[^a-zA-Z0-9]/g, "_"),
      },
    },
  });
}

for (const name of Object.keys(ENTRIES)) {
  const from = resolve(out, `${name}.js`);
  if (!existsSync(from)) {
    throw new Error(`[vite] no se generó ${name}.js`);
  }
  renameSync(from, resolve(root, `${name}.js`));
}
rmSync(out, { recursive: true, force: true });
console.log("[vite] app.js, theme.js, sw.js, fixtures.js y update-check.js generados");
