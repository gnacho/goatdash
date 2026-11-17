import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/link-domain.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
	compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
const { normalizeLinkDomain } = await import(moduleUrl);

test("the scheme and trailing slashes are stripped", () => {
	assert.equal(normalizeLinkDomain("https://www.example.com/"), "www.example.com");
	assert.equal(normalizeLinkDomain("http://example.com"), "example.com");
	assert.equal(normalizeLinkDomain("  example.com//  "), "example.com");
});

test("a bare domain is kept as typed", () => {
	assert.equal(normalizeLinkDomain("stats.example.com"), "stats.example.com");
});

test("empty values clear the setting", () => {
	assert.equal(normalizeLinkDomain(""), "");
	assert.equal(normalizeLinkDomain("   "), "");
	assert.equal(normalizeLinkDomain(null), "");
	assert.equal(normalizeLinkDomain(undefined), "");
});
