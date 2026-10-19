// Full-screen expand modal for any list panel.
import { cacheKeyFor } from "../cache";
import { EXPORT_KEYS } from "../export";
import { drillDetail } from "../donut-drill";
import { handleAuthError } from "../bridge/session";
import { endpointFor } from "../endpoints";
import { $ } from "../dom";
import { t } from "../i18n/index";
import { donutIconFor } from "../icons";
import { getDateRange } from "../datetime";
import { client, config, currentPreset, currentSite, customEnd, customStart, demoMode, demoPreset, lastDatasets, pathFilter } from "../state";
import { skeletonCard } from "./cards";
import { renderDonut } from "./donut";
import { renderGeo, renderReferrersInto } from "./lists";
import { renderPagesInto } from "./pages";
import { renderLanguagesInto } from "./languages";
import { renderCampaignsInto } from "./campaigns";

const EXPAND_TITLES = { sources: "group.sources", content: "group.content", devices: "group.devices", geo: "group.geo" };
export function openExpand(key: any) {
	const dlg = $("#expand-dialog") as HTMLDialogElement;
	if (!dlg) return;
	$("#expand-title").textContent = t((EXPAND_TITLES as Record<string, string>)[key] || key);
	fillExpandBody(key, $("#expand-body"));
	if (!dlg.open) dlg.showModal();
}
export function closeExpand() {
	const dlg = $("#expand-dialog") as HTMLDialogElement;
	if (dlg && dlg.open) dlg.close();
}

function expandSectionTitle(text: any) {
	const h = document.createElement("h3");
	h.className = "expand-section-title";
	h.textContent = text;
	return h;
}

export function fillExpandBody(key: any, body: any) {
	body.innerHTML = "";
	if (key === "sources") {
		const cols = document.createElement("div");
		cols.className = "expand-cols";
		const left = document.createElement("div");
		left.appendChild(expandSectionTitle(t("card.referrers")));
		const refBox = document.createElement("div");
		renderReferrersInto(refBox, (lastDatasets.referrers || {}).items || [], demoMode ? GOATDASH_DEMO.refDetails : null, { full: true });
		left.appendChild(refBox);
		const right = document.createElement("div");
		right.appendChild(expandSectionTitle(t("card.languages")));
		const langBox = document.createElement("div");
		renderLanguagesInto(langBox, (lastDatasets.languages || {}).items || [], { full: true });
		right.appendChild(langBox);
		cols.append(left, right);
		body.appendChild(cols);
		return;
	}
	if (key === "content") {
		body.appendChild(expandSectionTitle(t("card.pages")));
		const pagesBox = document.createElement("div");
		body.appendChild(pagesBox);
		fillExpandPages(pagesBox);
		const camps = (lastDatasets.campaigns || {}).items || [];
		if (camps.length) {
			body.appendChild(expandSectionTitle(t("card.campaigns")));
			const campBox = document.createElement("div");
			renderCampaignsInto(campBox, camps, (lastDatasets.campaigns || {}).total);
			body.appendChild(campBox);
		}
		return;
	}
	if (key === "devices") {
		const grid = document.createElement("div");
		grid.className = "expand-donuts";
		[["browsers", "card.browsers"], ["systems", "card.systems"], ["sizes", "card.devices"]].forEach(([page, labelKey]) => {
			const col = document.createElement("div");
			col.appendChild(expandSectionTitle(t(labelKey)));
			const box = document.createElement("div");
			const ds = lastDatasets[page] || { items: [], total: 0 };
			renderDonut(box, ds.items, { total: ds.total, page, collapse: false, iconFor: donutIconFor(page), onDrill: (item: any, idx: any) => drillDetail(page, item, idx, box) });
			col.appendChild(box);
			grid.appendChild(col);
		});
		body.appendChild(grid);
		return;
	}
	if (key === "geo") {
		const wrap = document.createElement("div");
		wrap.className = "expand-geo";
		const mapCol = document.createElement("div");
		mapCol.className = "expand-geo-map";
		const listCol = document.createElement("div");
		wrap.append(mapCol, listCol);
		body.appendChild(wrap);
		const ds = lastDatasets.geo || { items: [], total: 0 };
		renderGeo(mapCol, listCol, ds.items, ds.total, demoMode ? null : client);
	}
}

export async function fillExpandPages(box: any) {
	// Hasta 100 páginas con el MISMO filtro por ruta. Si la respuesta
	// original venía truncada (more), refetch de stats/hits con limit=100
	// reusando la caché del cliente (clave propia "hits100").
	if (demoMode) {
		const data = GOATDASH_DEMO.build(demoPreset);
		let hits = data.data.hits.hits;
		if (pathFilter) {
			const lower = pathFilter.names.map((n) => n.toLowerCase());
			hits = hits.filter((h: any) => lower.some((n) => (h.path || "").toLowerCase().includes(n)));
		}
		renderPagesInto(box, hits, { max: 0 });
		return;
	}
	const ds = lastDatasets.pages || { hits: [] };
	if (!ds.more || !client) { renderPagesInto(box, ds.hits, { max: 0 }); return; }
	box.innerHTML = "";
	box.appendChild(skeletonCard(200));
	try {
		const range = getDateRange(currentPreset, customStart, customEnd);
		const url = endpointFor("hits", range.start, range.end).replace("limit=20", "limit=100");
		const res = await client.request(url, { cacheKey: cacheKeyFor("hits100", currentSite) });
		renderPagesInto(box, (res && res.hits) || [], { max: 0, more: false });
	} catch (e: any) {
		if (e.kind === "auth") return handleAuthError(e.message);
		renderPagesInto(box, ds.hits, { max: 0 });
	}
}

function exportDataset(kind: any) {
	return lastDatasets[(EXPORT_KEYS as Record<string, string>)[kind] || kind];
}
export function updateExportMenu() {
	const menu = $("#export-menu") as HTMLElement;
	if (!menu) return;
	menu.querySelectorAll<HTMLElement>("[data-export]").forEach((b) => {
		const ds = exportDataset(b.dataset.export as string);
		const ok = !!(ds && ds.items && ds.items.length);
		(b as HTMLButtonElement).disabled = !ok;
		b.title = ok ? "" : t("export.notLoaded");
	});
}
export function exportCSV(kind: any) {
	const ds = exportDataset(kind);
	if (!ds || !ds.items || !ds.items.length) return;
	const items = ds.items;
	const total = items.reduce((a: any, i: any) => a + (i.count || 0), 0) || 1;
	const esc = (v: any) => {
		const s = String(v ?? "");
		return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
	};
	const rows = ["name,count,percent"];
	items.forEach((i: any) => {
		const name = i.name ?? i.path ?? "";
		rows.push([esc(name || t("top.direct")), i.count || 0, (((i.count || 0) / total) * 100).toFixed(1)].join(","));
	});
	const blob = new Blob(["\uFEFF" + rows.join("\r\n")], { type: "text/csv;charset=utf-8" });
	const rawSite = demoMode ? "demo" : (currentSite || (config && config.me && config.me.site && (config.me.site.cname || config.me.site.code)) || "site");
	const fname = `goatdash-${String(rawSite).replace(/[^a-z0-9.-]+/gi, "_")}-${currentPreset}-${kind}.csv`;
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = fname;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 5000);
}
