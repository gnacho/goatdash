import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/filter-events.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
	compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
const { eventPathNames } = await import(moduleUrl);

test("only paths flagged as events are returned", () => {
	assert.deepEqual(
		eventPathNames([
			{ path: "/", event: false },
			{ path: "download", event: true },
			{ path: "signup", event: true },
		]),
		["download", "signup"],
	);
});

test("hits rows and paths rows both work", () => {
	assert.deepEqual(eventPathNames([{ name: "buy", event: true }]), ["buy"]);
	assert.deepEqual(eventPathNames([{ path: "buy", event: true }]), ["buy"]);
});

test("duplicates and empty names are dropped", () => {
	assert.deepEqual(
		eventPathNames([
			{ path: "download", event: true },
			{ path: "download", event: true },
			{ path: "", event: true },
			null,
		]),
		["download"],
	);
});

test("no paths means no filter", () => {
	assert.deepEqual(eventPathNames([]), []);
	assert.deepEqual(eventPathNames(null), []);
	assert.deepEqual(eventPathNames(undefined), []);
});
