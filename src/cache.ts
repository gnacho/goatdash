// Cross-site cache namespacing and cache keys.
import { $ } from "./dom";
import { currentPreset, customEnd, customStart, pathFilter } from "./state";

function cacheNS() {
	const base = currentPreset === "custom" ? `c:${customStart || ""}:${customEnd || ""}` : `p:${currentPreset}`;
	return base + (pathFilter ? ":f:" + pathFilter.names.join("|") : "");
}
export function cacheKeyFor(kind: any, site: any) {
	return (site ? `s:${site}:` : "a:") + cacheNS() + ":" + kind;
}
