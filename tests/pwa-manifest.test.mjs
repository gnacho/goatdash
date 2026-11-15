// Installed PWA contract: the manifest is what makes Chrome build a WebAPK
// (standalone, no browser bar) instead of a bookmark shortcut opened in a
// Custom Tab. These checks fail if the manifest, its icons, the HTML wiring or
// the release tarball list drift apart.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root));
const text = (path) => read(path).toString("utf8");

const manifest = JSON.parse(text("manifest.webmanifest"));
const html = text("index.html");
const sw = text("src/sw.ts");
const release = text(".github/workflows/release.yml");

// width and height live in the IHDR chunk, right after the 8-byte signature
// and the 8-byte chunk header.
function pngSize(path) {
	const buf = read(path);
	const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
	assert.deepEqual(buf.subarray(0, 8), signature, `${path} is not a PNG`);
	return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

test("manifest makes the app standalone at the site root", () => {
	assert.equal(manifest.name, "Goatdash");
	assert.equal(manifest.short_name, "Goatdash");
	assert.equal(manifest.start_url, "/");
	assert.equal(manifest.scope, "/");
	assert.equal(manifest.id, "/");
	assert.equal(manifest.display, "standalone");
	assert.match(manifest.background_color, /^#[0-9a-f]{6}$/i);
	assert.match(manifest.theme_color, /^#[0-9a-f]{6}$/i);
});

test("manifest ships a 192 and a 512 icon plus one maskable", () => {
	const icons = manifest.icons || [];
	const bySize = (size, purpose) =>
		icons.filter((icon) => icon.sizes === size && (icon.purpose || "any").split(" ").includes(purpose));
	assert.equal(bySize("192x192", "any").length, 1, "192x192 any icon");
	assert.equal(bySize("512x512", "any").length, 1, "512x512 any icon");
	assert.ok(bySize("512x512", "maskable").length >= 1, "maskable icon");
	for (const icon of icons) {
		assert.ok(icon.src.startsWith("/"), `${icon.src} must be absolute so it resolves from any route`);
		const path = `.${icon.src}`;
		assert.ok(existsSync(new URL(path, root)), `${path} is missing`);
		if (icon.type === "image/png") {
			const [width, height] = icon.sizes.split("x").map(Number);
			assert.deepEqual(pngSize(path), { width, height }, `${path} size must match the manifest`);
		}
	}
});

test("index.html links the manifest and sets the PWA meta tags", () => {
	assert.match(html, /<link rel="manifest" href="manifest\.webmanifest\?v=\d+">/, "manifest link with cache bust");
	assert.match(html, /<meta name="theme-color" content="#[0-9a-f]{6}">/i, "theme-color meta");
	assert.match(html, /<link rel="apple-touch-icon" href="assets\/apple-touch-icon\.png\?v=\d+">/, "apple touch icon");
	assert.match(html, /<meta name="apple-mobile-web-app-capable" content="yes">/, "iOS standalone");
	assert.ok(existsSync(new URL("./assets/apple-touch-icon.png", root)), "apple touch icon file");
});

test("the service worker leaves the manifest to the network", () => {
	assert.match(sw, /url\.pathname === "\/manifest\.webmanifest"\) return/);
});

test("the release tarball includes the manifest", () => {
	assert.match(release, /cp -r [^\n]*manifest\.webmanifest[^\n]*/, "release.yml copies the manifest");
	assert.match(release, /^\s+assets\b/m, "release.yml copies the icons directory");
});
