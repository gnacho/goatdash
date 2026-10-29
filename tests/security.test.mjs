import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/security.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
	compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
const { normalizeServerUrl, isSafeHostname, isSafeBaseUrl, siteBaseUrl } = await import(moduleUrl);

test("accepts HTTPS hosts and localhost HTTP", () => {
	assert.equal(normalizeServerUrl("stats.example.com"), "https://stats.example.com");
	assert.equal(normalizeServerUrl("https://stats.example.com/"), "https://stats.example.com");
	assert.equal(normalizeServerUrl("http://localhost:8080"), "http://localhost:8080");
	assert.equal(normalizeServerUrl("http://127.0.0.1:8080"), "http://127.0.0.1:8080");
});

test("rejects plain HTTP outside localhost", () => {
	assert.throws(() => normalizeServerUrl("http://stats.example.com"), /https/);
	assert.throws(() => normalizeServerUrl("ftp://stats.example.com"), /url/);
	assert.throws(() => normalizeServerUrl("https://user:pass@stats.example.com"), /url/);
});

test("rejects malformed site hosts", () => {
	for (const host of ["", "evil.com/path", "evil.com:443", "user@evil.com", "a..b", "-bad.example", "bad-.example", "bad host"]) {
		assert.equal(isSafeHostname(host), false, host);
	}
	for (const host of ["stats.example.com", "sub-domain.example.com", "localhost", "xn--bcher-kva.example"]) {
		assert.equal(isSafeHostname(host), true, host);
	}
});

test("does not build a site base from an invalid cname", () => {
	assert.equal(siteBaseUrl("stats.example.com"), "https://stats.example.com");
	assert.equal(siteBaseUrl("evil.com/path"), null);
	assert.equal(siteBaseUrl(null), null);
	assert.equal(isSafeBaseUrl("http://stats.example.com"), false);
	assert.equal(isSafeBaseUrl("https://stats.example.com:8443"), true);
});
