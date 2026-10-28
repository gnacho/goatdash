import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../src/render/chart-tooltip.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
	compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
const { getChartTooltipPosition } = await import(moduleUrl);

const chart = { left: 15, top: 299, right: 375, bottom: 559 };
const tooltip = { width: 143.21875, height: 50.1875 };
const scroll = { x: 0, y: 703 };

function placement(anchor) {
	const position = getChartTooltipPosition(chart, tooltip, anchor, scroll);
	const client = {
		left: position.left - scroll.x,
		top: position.top - scroll.y,
		right: position.left - scroll.x + tooltip.width,
		bottom: position.top - scroll.y + tooltip.height,
	};
	assert.ok(client.left >= chart.left, `left ${client.left} is before ${chart.left}`);
	assert.ok(client.right <= chart.right, `right ${client.right} is after ${chart.right}`);
	assert.ok(client.top >= chart.top, `top ${client.top} is above ${chart.top}`);
	assert.ok(client.bottom <= chart.bottom, `bottom ${client.bottom} is below ${chart.bottom}`);
	assert.equal(position.left, client.left + scroll.x);
	assert.equal(position.top, client.top + scroll.y);
	return client;
}

test("keeps mobile tooltip inside the chart at both edges and in the middle", () => {
	for (const x of [34.075, 202.2, 370.325]) {
		const client = placement({ x, y: 420 });
		const centerX = client.left + tooltip.width / 2;
		assert.ok(Math.abs(centerX - x) <= 80, `tooltip center ${centerX} is too far from ${x}`);
	}
});

test("centers the tooltip on the selected point when there is room", () => {
	const client = placement({ x: 202.2, y: 420 });
	assert.ok(Math.abs(client.left + tooltip.width / 2 - 202.2) < 0.0001);
});

test("flips below a point near the top instead of leaving the chart", () => {
	const client = placement({ x: 202.2, y: 300 });
	assert.equal(client.top, 312);
	assert.ok(client.top > 300);
});
