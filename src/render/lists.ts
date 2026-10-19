// Generic list rows and referrer lists.
import { handleAuthError } from "../bridge/session";
import { currentLang } from "../lang";
import { endpointFor } from "../endpoints";
import { TopListOpts } from "../types";
import { $ } from "../dom";
import { t } from "../i18n/index";
import { animateNum, fmtNum, tween } from "../util";
import { countryNameToCode, flagFor, regionName } from "../geo";
import { getDateRange } from "../datetime";
import { client, currentPreset, customEnd, customStart, demoMode, highlightCode, lastDatasets, setHighlightCode, softTick } from "../state";
import { clearTooltips, emptyEl, refEmptyEl } from "./cards";
import { renderWorldMap } from "./worldmap";
import { activatePanelTab } from "./tabs";

function renderAllRows(items: any, opts: any) {
	const frag = document.createDocumentFragment();
	items.forEach((item: any, idx: any) => {
		const row = document.createElement("div");
		row.className = "list-row" + (opts.isSelected && opts.isSelected(item) ? " selected" : "");
		if (item.name) row.dataset.name = item.name;
		row.setAttribute("role", (opts.onRowClick ? "button" : undefined) as unknown as string);
		row.setAttribute("tabindex", (opts.onRowClick ? 0 : undefined) as unknown as string);
		const chev = document.createElement("span"); chev.className = "chevron";
		if (opts.onRowClick) chev.textContent = "▸";
		if (opts.rank) { const r = document.createElement("span"); r.className = "list-rank"; r.textContent = idx + 1; row.appendChild(r); }
		const pref = opts.prefix ? opts.prefix(item) : "";
		if (pref) { const p = document.createElement("span"); p.style.cssText = "flex:none"; p.textContent = pref; row.appendChild(p); }
		if (opts.rowTitle) { const rt = opts.rowTitle(item); if (rt) row.title = rt; }
		const name = document.createElement("span"); name.className = "list-name";
		name.textContent = opts.formatName(item);
		const sub = opts.nameSub ? opts.nameSub(item) : null;
		if (sub) { const sm = document.createElement("small"); sm.textContent = sub; name.appendChild(sm); }
		const barWrap = document.createElement("span"); barWrap.className = "list-bar-wrap";
		const bar = document.createElement("span"); bar.className = "list-bar";
		bar.style.width = ((opts.count(item) / opts.total) * 100) + "%";
		barWrap.appendChild(bar);
		const cnt = document.createElement("span"); cnt.className = "list-count"; cnt.textContent = fmtNum(opts.count(item));
		const pct = document.createElement("span"); pct.className = "list-pct";
		pct.textContent = ((opts.count(item) / opts.total) * 100).toFixed(1) + "%";
		if (chev.textContent) row.appendChild(chev);
		row.append(name);
		const badgeTxt = opts.badge ? opts.badge(item) : null;
		if (badgeTxt) { const bd = document.createElement("span"); bd.className = "list-badge"; bd.textContent = badgeTxt; row.appendChild(bd); }
		row.append(barWrap, cnt, pct);
		if (opts.onRowClick) {
			row.addEventListener("click", () => opts.onRowClick(item, row));
			row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); opts.onRowClick(item, row); } });
		}
		frag.appendChild(row);
	});
	return frag;
}
export function renderTopList(container: any, items: any, { rank = true, formatName = (i: any) => i.name, nameSub = () => null, count = (i: any) => i.count, total, max = 8, showAll = true, page, demoDetails, onRowClick, prefix = () => "", badge = () => null, isSelected = () => false, rowTitle = null }: TopListOpts = {}) {
		// En refresco en caliente con los mismos datos (mismo idioma, items y
		// conteos) no se toca el DOM: evita el parpadeo de la lista.
		const topKey = currentLang() + "|" + String(total || 0) + "|" + (items || []).map((i: any) => formatName(i) + "=" + count(i)).join(",");
		if (softTick && container._softKey === topKey) return;
		container._softKey = topKey;

		// Actualización en caliente con datos distintos: si el conjunto de
		// filas coincide por nombre (la orden puede cambiar), se reutilizan:
		// se reordenan con appendChild (mover no recrea ni reinicia nada) y se
		// actualizan rango, barra, conteo (tween) y porcentaje en su sitio.
		if (softTick && items && items.length) {
			const listEl = container.querySelector(":scope > div");
			const rowsByName: Record<string, HTMLElement> = {};
			if (listEl) [...listEl.children].forEach((r) => { const re = r as HTMLElement; if (re.dataset && re.dataset.name) rowsByName[re.dataset.name] = re; });
			const wanted = items.map((i: any) => i.name);
			const usable = listEl && wanted.every((nm: any) => rowsByName[nm]) && Object.keys(rowsByName).length === wanted.length;
			if (usable) {
				const tm = total || Math.max(...items.map((i: any) => i.count), 1);
				items.forEach((item: any, idx: any) => {
					const row = rowsByName[item.name];
					listEl.appendChild(row);
					if (rank) { const rankEl = row.querySelector(".list-rank"); if (rankEl) rankEl.textContent = idx + 1; }
					const bar = row.querySelector(".list-bar") as HTMLElement;
					if (bar) bar.style.width = ((count(item) / tm) * 100) + "%";
					const cnt = row.querySelector(".list-count");
					if (cnt) animateNum(cnt, count(item));
					const pct = row.querySelector(".list-pct");
					const share = total ? (count(item) / total) * 100 : null;
					if (pct) pct.textContent = share !== null ? share.toFixed(1) + "%" : "";
				});
				return;
			}
		}
		container.innerHTML = "";
		if (!items || !items.length) { container.appendChild(emptyEl(t("no.data"))); return; }
		const totalMax = total || Math.max(...items.map((i: any) => i.count), 1);
		const limited = max ? items.slice(0, max) : items;
		const list = document.createElement("div");
		items.forEach((item: any, idx: any) => {
			const row = document.createElement("div");
			row.className = "list-row" + (isSelected(item) ? " selected" : "");
			if (item.name) row.dataset.name = item.name;
			row.setAttribute("role", (onRowClick ? "button" : undefined) as unknown as string);
			row.setAttribute("tabindex", (onRowClick ? 0 : undefined) as unknown as string);
			const chev = document.createElement("span"); chev.className = "chevron";
			if (onRowClick) chev.textContent = "▸";
			if (rank) { const r = document.createElement("span"); r.className = "list-rank"; r.textContent = idx + 1; row.appendChild(r); }
			const pref = prefix(item);
			if (pref) { const p = document.createElement("span"); p.style.cssText = "flex:none"; p.textContent = pref; row.appendChild(p); }
			if (rowTitle) { const rt = rowTitle(item); if (rt) row.title = rt; }
			const name = document.createElement("span"); name.className = "list-name";
			name.textContent = formatName(item);
			const sub = nameSub(item);
			if (sub) { const sm = document.createElement("small"); sm.textContent = sub; name.appendChild(sm); }
			const barWrap = document.createElement("span"); barWrap.className = "list-bar-wrap";
			const bar = document.createElement("span"); bar.className = "list-bar";
			bar.style.width = ((count(item) / totalMax) * 100) + "%";
			barWrap.appendChild(bar);
			const cnt = document.createElement("span"); cnt.className = "list-count"; cnt.textContent = fmtNum(count(item));
			const pct = document.createElement("span"); pct.className = "list-pct";
			const share = total ? (count(item) / total) * 100 : null;
			if (share !== null) pct.textContent = share.toFixed(1) + "%";
			if (chev.textContent) row.appendChild(chev);
			row.append(name);
			const badgeTxt = badge(item);
			if (badgeTxt) { const bd = document.createElement("span"); bd.className = "list-badge"; bd.textContent = badgeTxt; row.appendChild(bd); }
			row.append(barWrap, cnt, pct);
			if (onRowClick) {
				row.addEventListener("click", () => onRowClick(item, row));
				row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRowClick(item, row); } });
			}
			list.appendChild(row);
		});
		container.appendChild(list);
		if (showAll && max && items.length > max) {
			const btn = document.createElement("button");
			btn.className = "list-action";
			btn.textContent = t("top.showAll", { n: items.length });
			btn.addEventListener("click", () => {
				const c = container;
				c.innerHTML = "";
				c.appendChild(renderAllRows(items, { rank, formatName, nameSub, count, total: totalMax, page, onRowClick, prefix, badge, isSelected, rowTitle }));
			});
			container.appendChild(btn);
		}
	}

export function renderReferrers(stats: any, demoDetails: any) {
	renderReferrersInto($("#referrers-body"), stats, demoDetails);
}
export function renderReferrersInto(body: any, stats: any, demoDetails: any, { full = false } = {}) {
	const refKey = currentLang() + "|" + (stats || []).map((s: any) => (s.ref_scheme || "o") + (s.name || "") + "=" + s.count).join(",");
	if (softTick && body._softKey === refKey) return;
	body._softKey = refKey;
	body.innerHTML = "";
	lastDatasets.referrers = { items: stats || [], total: (stats || []).reduce((a: any, s: any) => a + s.count, 0) };
	if (!stats || !stats.length) { body.appendChild(refEmptyEl()); return; }
	const total = stats.reduce((a: any, s: any) => a + s.count, 0);
	const channels = [
		{ key: "direct", scheme: "o" },
		{ key: "search", scheme: "g" },
		{ key: "campaign", scheme: "c" },
		{ key: "other", scheme: "h" },
	];
	const wrap = document.createElement("div");
	wrap.className = "ref-groups";
	channels.forEach((ch) => {
		const items = stats.filter((s: any) => (s.ref_scheme || "o") === ch.scheme);
		if (!items.length) return;
		const head = document.createElement("div");
		head.className = "ref-channel-head";
		const lbl = document.createElement("span");
		lbl.textContent = t("channel." + ch.key);
		const cnt = document.createElement("span");
		cnt.className = "ref-channel-count";
		cnt.textContent = fmtNum(items.reduce((a: any, i: any) => a + i.count, 0));
		head.append(lbl, cnt);
		wrap.appendChild(head);
		const sub = document.createElement("div");
		sub.className = "ref-channel-body";
		wrap.appendChild(sub);
		renderTopList(sub, items, {
			total,
			rank: false,
			max: full ? 0 : 8,
			formatName: (i) => i.name || t("top.direct"),
			onRowClick: ch.scheme === "o" ? null : (item: any, row: any) => {
				const demo = demoMode ? (demoDetails && demoDetails[item.name]) : null;
				toggleDetail(row, "toprefs", item.id || item.name, item.name, { demo, kind: "stats" });
			},
		});
	});
	body.appendChild(wrap);
}
export async function toggleDetail(row: any, page: any, itemId: any, label: any, { demo, kind }: { demo?: any; kind?: string }) {
	const existing = row.querySelector(".detail-panel");
	if (existing) { existing.remove(); row.classList.remove("open"); return; }
	row.classList.add("open");
	const panel = document.createElement("div");
	panel.className = "detail-panel";
	const title = document.createElement("h4");
	title.textContent = t(page === "hits" ? "top.referrers" : page === "toprefs" ? "top.refPages" : "detail.breakdown", { path: label, name: label });
	panel.appendChild(title);
	row.appendChild(panel);

	let rows;
	if (demo) {
		rows = demo;
	} else if (client) {
		try {
			const range = getDateRange(currentPreset, customStart, customEnd);
			const url = endpointFor(page, range.start, range.end, `&limit=10`);
			const path = `/api/v0/stats/${page}/${encodeURIComponent(itemId)}${url.slice(url.indexOf("?"))}`;
			const res = await client.request(path);
			rows = kind === "stats" ? res.stats : res.refs;
		} catch (e: any) {
			if (e.kind === "auth") return handleAuthError(e.message);
			const err = document.createElement("div");
			err.className = "detail-err";
			err.textContent = e.message;
			panel.appendChild(err);
			return;
		}
	}
	if (!rows || !rows.length) {
		panel.appendChild(emptyEl(t(page === "hits" ? "top.noRef" : page === "toprefs" ? "ref.noData" : "detail.noData")));
		return;
	}
	const max = Math.max(...rows.map((r: any) => r.count), 1);
	rows.slice(0, 8).forEach((r: any) => {
		const drow = document.createElement("div");
		drow.className = "detail-row";
		const name = document.createElement("span"); name.className = "dname";
		name.textContent = r.name || t("top.direct");
		const cnt = document.createElement("span"); cnt.className = "dcount"; cnt.textContent = fmtNum(r.count);
		drow.append(name, cnt);
		panel.appendChild(drow);
	});
}
export function renderGeo(mapContainer: any, listContainer: any, stats: any, total: any, clientOrDemo: any) {
	const geoKey = currentLang() + "|" + String(total || 0) + "|" + (stats || []).map((s: any) => (s.name || "") + "=" + (s.count ?? s.count_unique ?? 0)).join(",");
	if (softTick && mapContainer._softKey === geoKey) return;
	mapContainer._softKey = geoKey;
	mapContainer.innerHTML = "";
	listContainer.innerHTML = "";
	lastDatasets.geo = { items: stats || [], total };

	function openCountry(name: any, fromMap: any) {
		if (!clientOrDemo && !demoMode) return;
		const item = (stats || []).find((s: any) => s.name === name);
		if (!item) return;
		const code = countryNameToCode(name);
		if (!code) return;
		const row = listContainer.querySelector(`.list-row[data-name="${CSS.escape(name)}"]`);
		const isSame = highlightCode === code;

		// Quitar cualquier resalte/detalle previo de la lista.
		listContainer.querySelectorAll(".list-row.selected").forEach((r: any) => r.classList.remove("selected"));
		listContainer.querySelectorAll(".list-row.open").forEach((r: any) => {
			r.querySelector(".detail-panel")?.remove();
			r.classList.remove("open");
		});

		if (isSame) {
			setHighlightCode(null);
		} else {
			setHighlightCode(code);
			if (row) {
				row.classList.add("selected");
				openRegionsPanel(row, item);
			}
		}

		// El re-render destruye el path bajo el cursor sin disparar
		// mouseleave, así que el tooltip del mapa quedaría colgado.
		clearTooltips();

		mapContainer.innerHTML = "";
		renderWorldMap(mapContainer, stats, total, (clickedCode: any) => {
			const clickedItem = (stats || []).find((s: any) => countryNameToCode(s.name) === clickedCode);
			if (clickedItem) openCountry(clickedItem.name, true);
		});

		// Click en el mapa: saltar a la pestaña de lista y llevar la fila
		// a vista. Desde la lista solo se re-renderiza el mapa (arriba),
		// sin cambiar de pestaña.
		if (fromMap === true) {
			activatePanelTab("geo-card", "list");
			if (row) row.scrollIntoView({ block: "nearest" });
		}
	}

	// Drill país → regiones: GET /api/v0/stats/locations/{id} (mismo patrón
	// que los drills de browsers/systems/sizes). En demo usa fixtures.
	async function openRegionsPanel(row: any, item: any) {
		row.classList.add("open");
		const panel = document.createElement("div");
		panel.className = "detail-panel";
		const title = document.createElement("h4");
		title.textContent = t("geo.regions", { name: item.name });
		panel.appendChild(title);
		row.appendChild(panel);
		let rows;
		if (demoMode) {
			rows = (GOATDASH_DEMO.locationDetails || {})[item.name] || [];
		} else if (client) {
			try {
				const range = getDateRange(currentPreset, customStart, customEnd);
				const url = endpointFor("locations", range.start, range.end, "&limit=20");
				const path = `/api/v0/stats/locations/${encodeURIComponent(item.id || item.name)}${url.slice(url.indexOf("?"))}`;
				const res = await client.request(path);
				rows = res.stats || [];
			} catch (e: any) {
				if (e.kind === "auth") return handleAuthError(e.message);
				const err = document.createElement("div");
				err.className = "detail-err";
				err.textContent = e.message;
				panel.appendChild(err);
				return;
			}
		}
		// Si la fila ya no es la seleccionada (otro país clicado entre
		// tanto), descartar el panel tardío.
		if (!row.classList.contains("open")) return;
		if (!rows || !rows.length) { panel.appendChild(emptyEl(t("geo.noRegions"))); return; }
		const max = Math.max(...rows.map((r: any) => r.count), 1);
		rows.slice(0, 10).forEach((r: any) => {
			const drow = document.createElement("div");
			drow.className = "detail-row region-row";
			const name = document.createElement("span"); name.className = "dname"; name.textContent = regionName(r.name);
			const barWrap = document.createElement("span"); barWrap.className = "list-bar-wrap";
			const bar = document.createElement("span"); bar.className = "list-bar";
			bar.style.width = ((r.count / max) * 100) + "%";
			barWrap.appendChild(bar);
			const cnt = document.createElement("span"); cnt.className = "dcount"; cnt.textContent = fmtNum(r.count);
			drow.append(name, barWrap, cnt);
			panel.appendChild(drow);
		});
	}

	renderWorldMap(mapContainer, stats, total, (code: any) => {
		const item = (stats || []).find((s: any) => countryNameToCode(s.name) === code);
		if (item) openCountry(item.name, true);
	});

	const listItems = (stats || []).map((s: any) => ({ ...s }));
	renderTopList(listContainer, listItems, {
		total,
		prefix: (i: any) => flagFor(i.name),
		page: "locations",
		onRowClick: (item: any, row: any) => openCountry(item.name, false),
		isSelected: (i: any) => countryNameToCode(i.name) === highlightCode,
	});
}
