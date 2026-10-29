// Demo mode: fixture data for the public demo host.
import { $ } from "./dom";
import { deviceLabel } from "./geo";
import { donutIconFor } from "./icons";
import { config, demoMode, setConfig, setDemoMode } from "./state";
import { renderDonut } from "./render/donut";
import { renderGeo } from "./render/lists";
import { renderCampaignsInto } from "./render/campaigns";
import { drillDetail } from "./donut-drill";
import { assetUrl } from "./assets";

let fixturesPromise: Promise<void> | null = null;

export function loadFixtures(): Promise<void> {
	if ((window as any).GOATDASH_DEMO) return Promise.resolve();
	if (fixturesPromise) return fixturesPromise;
	fixturesPromise = new Promise<void>((resolve, reject) => {
		const s = document.createElement("script");
		s.src = assetUrl("fixtures.js");
		s.onload = () => (window as any).GOATDASH_DEMO ? resolve() : reject(new Error("fixtures.js loaded without data"));
		s.onerror = () => reject(new Error("fixtures.js failed to load"));
		document.body.appendChild(s);
	});
	fixturesPromise.catch(() => { fixturesPromise = null; });
	return fixturesPromise;
}

export function isDemoHost() {
	const h = location.hostname || "";
	return h === "demo.goatdash.cloudless.club" || h.endsWith(".demo.goatdash.cloudless.club");
}
export function injectDemoTracker() {
	(window as any).goatcounter = { path: (p: any) => "/demo" + p }; // any: goatcounter.js global
	const s = document.createElement("script");
	s.async = true;
	s.dataset.goatcounter = "https://stats.goatdash.cloudless.club/count";
	s.src = "https://stats.goatdash.cloudless.club/count.js";
	document.head.appendChild(s);
}
export function enterDemoMode() {
	setDemoMode(true);
	setConfig({ baseURL: "_demo_", apiKey: "_demo_", me: { site: { cname: "Demo site", code: "demo" } } });
}

export function renderGeoDemo(data: any) {
	renderGeo($("#geo-map-body"), $("#geo-list-body"), data.locations.stats, data.locations.total, null);
}

export function renderDonutsDemo(data: any) {
	renderDonut($("#browsers-body"), data.browsers.stats, { total: data.browsers.total, page: "browsers", iconFor: donutIconFor("browsers"), onDrill: (item: any) => drillDetail("browsers", item, 0) });
	renderDonut($("#systems-body"), data.systems.stats, { total: data.systems.total, page: "systems", iconFor: donutIconFor("systems"), onDrill: (item: any) => drillDetail("systems", item, 0) });
	renderDonut($("#sizes-body"), data.sizes.stats.map((i: any) => ({ ...i, name: deviceLabel(i.id || i.name), apiId: i.id || i.name })), { total: data.sizes.total, page: "sizes", iconFor: donutIconFor("sizes"), onDrill: (item: any) => drillDetail("sizes", item, 0) });
}

export function renderCampaignsDemo(stats: any) {
	renderCampaignsInto($("#campaigns-body"), stats, stats.reduce((a: any, i: any) => a + i.count, 0));
}
