import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/settings.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
	compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
const { readStore, safeStore, pruneCache } = await import(moduleUrl);

test("storage failures never escape", () => {
	globalThis.localStorage = {
		get length() { throw new Error("denied"); },
		getItem() { throw new Error("denied"); },
		setItem() { throw new Error("denied"); },
		removeItem() { throw new Error("denied"); },
		key() { throw new Error("denied"); },
	};
	assert.equal(readStore("gc-dashboard-theme-v1"), null);
	assert.doesNotThrow(() => safeStore("gc-dashboard-theme-v1", "dark"));
	assert.doesNotThrow(() => pruneCache());
});

test("storage still works when available", () => {
	const data = new Map();
	globalThis.localStorage = {
		get length() { return data.size; },
		getItem(key) { return data.has(key) ? data.get(key) : null; },
		setItem(key, value) { data.set(key, String(value)); },
		removeItem(key) { data.delete(key); },
		key(index) { return [...data.keys()][index] ?? null; },
	};
	assert.equal(readStore("missing"), null);
	safeStore("gc-dashboard-theme-v1", "light");
	assert.equal(readStore("gc-dashboard-theme-v1"), "light");
});
