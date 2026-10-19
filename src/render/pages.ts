// Pages panel: paths list, filter suggestions, path filter.
import { loadData } from "../dashboard";
import { $ } from "../dom";
import { t } from "../i18n/index";
import { client, currentSite, demoMode, demoPreset, lastDatasets, pathFilter, pathsCache, setPathFilter } from "../state";
import { emptyEl } from "./cards";
import { renderTopList, toggleDetail } from "./lists";

export function renderPages(hits: any, more?: any) {
	renderPagesInto($("#pages-body"), hits, { more });
}
export function renderPagesInto(body: any, hits: any, { more = false, max = 8 } = {}) {
	const items = (hits || []).map((h: any) => ({ name: h.path, id: h.path_id || h.id, title: h.title, count: h.count, event: h.event }));
	lastDatasets.pages = { hits: hits || [], items, total: items.reduce((a: any, i: any) => a + i.count, 0), more };
	if (!items.length) { body.innerHTML = ""; body.appendChild(emptyEl(t("no.pages"))); return; }
	renderTopList(body, items, {
		total: items.reduce((a: any, i: any) => a + i.count, 0),
		max,
		nameSub: (i: any) => i.title || "",
		badge: (i: any) => (i.event ? t("event.badge") : null),
		page: "hits",
		onRowClick: (item: any, row: any) => {
			if (demoMode) {
				toggleDetail(row, "hits", item.name, item.name, { demo: GOATDASH_DEMO.refs[item.name] || [], kind: "refs" });
				return;
			}
			toggleDetail(row, "hits", item.id, item.name, { demo: null, kind: "refs" });
		},
	});
}

export function renderPagesDemo() {
	const data = GOATDASH_DEMO.build(demoPreset);
	let hits = data.data.hits.hits;
	if (pathFilter) {
		const lower = pathFilter.names.map((n) => n.toLowerCase());
		hits = hits.filter((h: any) => lower.some((n) => (h.path || "").toLowerCase().includes(n)));
	}
	renderPages(hits);
}
export async function getAllPaths() {
	const siteKey = currentSite || "_acct";
	const now = Date.now();
	const cached = pathsCache.get(siteKey);
	if (cached && now - cached.at < 60_000) return cached.paths;
	const all: any[] = [];
	let after = 0;
	for (let i = 0; i < 50; i++) {
		const url = `/api/v0/paths?limit=200` + (after ? `&after=${after}` : "");
		const res = await client.request(url, { site: currentSite, forceRefresh: true, cacheKey: "paths:" + siteKey + ":" + after });
		const list = (res && res.paths) || [];
		all.push(...list);
		if (!res || !res.more || !list.length) break;
		after = list[list.length - 1].id;
	}
	pathsCache.set(siteKey, { paths: all, at: now });
	return all;
}
export function demoPathSuggestions(q: any) {
	const data = GOATDASH_DEMO.build(demoPreset);
	const seen = new Set();
	const paths: any = [];
	(data.data.hits.hits || []).forEach((h: any) => {
		if (h.path && !seen.has(h.path)) { seen.add(h.path); paths.push(h.path); }
	});
	const lower = q.toLowerCase();
	return paths.filter((p: any) => p.toLowerCase().includes(lower)).slice(0, 8);
}
export function renderFilterSuggestions(suggestions: any) {
	const box = $("#filter-suggest");
	box.innerHTML = "";
	if (!suggestions.length) {
		const it = document.createElement("div");
		it.className = "filter-suggest-item muted";
		it.textContent = t("filter.noMatch");
		box.appendChild(it);
		box.hidden = false;
		return;
	}
	suggestions.forEach((s: any) => {
		const b = document.createElement("button");
		b.type = "button";
		b.className = "filter-suggest-item";
		b.textContent = s.path || s;
		if (s.event) {
			const bd = document.createElement("span"); bd.className = "list-badge"; bd.textContent = t("event.badge");
			b.appendChild(bd);
		}
		b.addEventListener("click", () => { applyPathFilter([s.path || s], s.path || s); box.hidden = true; });
		box.appendChild(b);
	});
	box.hidden = false;
}

function applyPathFilter(names: any, label: any) {
	setPathFilter({ names, label });
	$("#filter-chip-label").textContent = t("filter.applied", { q: label });
	$("#filter-chip").hidden = false;
	loadData();
}
export function clearPathFilter() {
	setPathFilter(null);
	$("#filter-chip").hidden = true;
	($("#path-filter-input") as HTMLInputElement).value = "";
	loadData();
}
export async function applyEnterFilter(q: any) {
	if (demoMode) { applyPathFilter([q], q); return; }
	try {
		const all = await getAllPaths();
		const lower = q.toLowerCase();
		const exact = all.find((p: any) => (p.path || "").toLowerCase() === lower);
		if (exact) { applyPathFilter([exact.path], exact.path); return; }
		const prefix = all.filter((p: any) => (p.path || "").toLowerCase().startsWith(lower)).slice(0, 200);
		if (prefix.length) applyPathFilter(prefix.map((p: any) => p.path), lower);
		else applyPathFilter([q], q);
	} catch { applyPathFilter([q], q); }
}
