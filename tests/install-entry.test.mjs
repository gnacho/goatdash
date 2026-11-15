import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const text = (path) => readFileSync(new URL(path, root), "utf8");

async function load(path) {
	const source = text(path);
	const compiled = ts.transpileModule(source, {
		compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
	});
	const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
	return import(moduleUrl);
}

const { installEntry } = await load("src/install.ts");
const { I18N } = await load("src/i18n/strings.ts");

const base = { standalone: false, ios: false, deferredPrompt: false };

test("no install entry once the app runs standalone", () => {
	assert.equal(installEntry({ ...base, standalone: true }), "none");
	assert.equal(installEntry({ ...base, standalone: true, deferredPrompt: true, ios: true }), "none");
});

test("a deferred prompt wins over the iOS hint", () => {
	assert.equal(installEntry({ ...base, deferredPrompt: true }), "prompt");
	assert.equal(installEntry({ ...base, deferredPrompt: true, ios: true }), "prompt");
});

test("iOS Safari without a prompt gets the share hint", () => {
	assert.equal(installEntry({ ...base, ios: true }), "iosHint");
});

test("a browser with neither prompt nor iOS stays clean", () => {
	assert.equal(installEntry(base), "none");
});

test("the markup wires both entries", () => {
	const html = text("index.html");
	const prompts = html.match(/data-install-prompt/g) || [];
	assert.equal(prompts.length, 2, "one trigger in the settings menu, one on the connect screen");
	assert.equal((html.match(/data-install-hint/g) || []).length, 1, "one iOS hint");
	assert.match(html, /id="install-btn"[^>]*data-i18n="menu\.install"/);
	assert.match(html, /id="install-connect-btn"[^>]*data-i18n="menu\.install"/);
});

test("both languages translate the install entries", () => {
	for (const lang of ["es", "en"]) {
		assert.ok(I18N[lang]["menu.install"], `${lang} menu.install`);
		assert.ok(I18N[lang]["menu.installIos"], `${lang} menu.installIos`);
	}
	assert.notEqual(I18N.es["menu.install"], I18N.en["menu.install"]);
});
