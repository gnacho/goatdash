import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/site-settings.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
	compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
const { siteSettings } = await import(moduleUrl);

test("the misspelled field real servers send is read", () => {
	assert.deepEqual(siteSettings({ setttings: { collect: 510 } }), { collect: 510 });
});

test("the documented spelling keeps working", () => {
	assert.deepEqual(siteSettings({ settings: { collect: 2 } }), { collect: 2 });
});

test("the documented spelling wins when both are present", () => {
	assert.deepEqual(siteSettings({ settings: { collect: 2 }, setttings: { collect: 9 } }), { collect: 2 });
});

test("a site without settings returns null", () => {
	assert.equal(siteSettings({ cname: "stats.example.com" }), null);
	assert.equal(siteSettings(null), null);
	assert.equal(siteSettings(undefined), null);
});
