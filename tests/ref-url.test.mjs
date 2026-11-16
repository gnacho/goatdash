import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/render/ref-url.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
	compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
const { referrerURL } = await import(moduleUrl);

test("an http referrer with host and path becomes the source page", () => {
	assert.equal(
		referrerURL({ name: "www.reddit.com/r/Proxmox/comments/1xxdshu/my_homelab", ref_scheme: "h" }),
		"https://www.reddit.com/r/Proxmox/comments/1xxdshu/my_homelab",
	);
});

test("a host-only referrer becomes the domain root", () => {
	assert.equal(referrerURL({ name: "github.com", ref_scheme: "h" }), "https://github.com");
});

test("ports, queries and fragments survive", () => {
	assert.equal(referrerURL({ name: "netpulse.cloudless.club/#install", ref_scheme: "h" }), "https://netpulse.cloudless.club/#install");
	assert.equal(referrerURL({ name: "twitter.com/search?q=https%3A%2F%2Ft.co%2Fabc", ref_scheme: "h" }), "https://twitter.com/search?q=https%3A%2F%2Ft.co%2Fabc");
	assert.equal(referrerURL({ name: "example.com:8443/docs", ref_scheme: "h" }), "https://example.com:8443/docs");
});

test("only the http referer scheme has a URL", () => {
	assert.equal(referrerURL({ name: "Google", ref_scheme: "g" }), null);
	assert.equal(referrerURL({ name: "www.reddit.com", ref_scheme: "g" }), null);
	assert.equal(referrerURL({ name: "launch", ref_scheme: "c" }), null);
	assert.equal(referrerURL({ name: "", ref_scheme: "o" }), null);
	assert.equal(referrerURL({ name: "github.com" }), null);
});

test("names that are not a host are not linked", () => {
	assert.equal(referrerURL({ name: "localhost:8461", ref_scheme: "h" }), null);
	assert.equal(referrerURL({ name: "example", ref_scheme: "h" }), null);
	assert.equal(referrerURL({ name: "", ref_scheme: "h" }), null);
	assert.equal(referrerURL(null), null);
});

test("injection shapes never reach the href", () => {
	assert.equal(referrerURL({ name: "javascript:alert(1)", ref_scheme: "h" }), null);
	assert.equal(referrerURL({ name: 'foo.com/"><script>alert(1)</script>', ref_scheme: "h" }), null);
	assert.equal(referrerURL({ name: "foo.com/a b", ref_scheme: "h" }), null);
	assert.equal(referrerURL({ name: "foo.com/`x`", ref_scheme: "h" }), null);
	assert.equal(referrerURL({ name: "foo.com\\bar", ref_scheme: "h" }), null);
});

test("absurdly long names are dropped", () => {
	assert.equal(referrerURL({ name: "a.com/" + "x".repeat(2050), ref_scheme: "h" }), null);
});

test("uppercase hosts keep working", () => {
	assert.equal(referrerURL({ name: "Example.COM/Path", ref_scheme: "h" }), "https://Example.COM/Path");
});
