// Endpoint building and cache keys for the stats API.
import { $ } from "./dom";
import { getPreviousRange } from "./datetime";
import { pathFilter } from "./state";

const ENDPOINTS = {
	total: "total",
	hits: "hits",
	browsers: "browsers",
	systems: "systems",
	sizes: "sizes",
	locations: "locations",
	languages: "languages",
	campaigns: "campaigns",
	toprefs: "toprefs",
};
export function endpointFor(key: any, start: any, end: any, extra = "") {
	const iso = (d: any) => d.toISOString();
	const q = `?start=${encodeURIComponent(iso(start))}&end=${encodeURIComponent(iso(end))}`;
	let path = `/api/v0/stats/${(ENDPOINTS as Record<string, string>)[key]}`;
	if (key === "hits") path += pathFilterQS() ? "?limit=100" : "?limit=20";
	return path + (path.includes("?") ? "&" : "?") + q.replace(/^\?/, "") + extra;
}

function pathFilterQS() {
	if (!pathFilter || !pathFilter.names || !pathFilter.names.length) return "";
	return "&include_paths=" + encodeURIComponent(pathFilter.names.join(",")) + "&path_by_name=true";
}
export function buildEndpointSet(range: any) {
	const prev = getPreviousRange(range.start, range.end);
	const f = pathFilterQS();
	return {
		total: endpointFor("total", range.start, range.end, f),
		hits: endpointFor("hits", range.start, range.end, f),
		prev: endpointFor("total", prev.start, prev.end, f),
		languages: endpointFor("languages", range.start, range.end),
		toprefs: endpointFor("toprefs", range.start, range.end, "&limit=50"),
		browsers: endpointFor("browsers", range.start, range.end),
		systems: endpointFor("systems", range.start, range.end),
		sizes: endpointFor("sizes", range.start, range.end),
		locations: endpointFor("locations", range.start, range.end),
		campaigns: endpointFor("campaigns", range.start, range.end),
	};
}
