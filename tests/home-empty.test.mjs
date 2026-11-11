import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/render/home-empty.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
	compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
const { homeEmptyState } = await import(moduleUrl);

test("no message while there are cards", () => {
	assert.equal(homeEmptyState(3, false, false), null);
	assert.equal(homeEmptyState(1, true, true), null);
});

test("a failed site list is reported as a load error with retry", () => {
	assert.deepEqual(homeEmptyState(0, false, true), { key: "home.sitesError", retry: true });
	assert.deepEqual(homeEmptyState(0, true, true), { key: "home.sitesError", retry: true });
});

test("an empty search keeps the search message without retry", () => {
	assert.deepEqual(homeEmptyState(0, true, false), { key: "home.noResults", retry: false });
});

test("an account without sites offers a retry instead of a search message", () => {
	assert.deepEqual(homeEmptyState(0, false, false), { key: "home.noSites", retry: true });
});
