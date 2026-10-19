// Bridge functions shared by several views.
import { $ } from "../dom";
import { HOME_SORT_KEY, safeStore } from "../settings";
import { t } from "../i18n/index";
import { chartCompare, currentPreset, demoMode, filterDebounce, homeQuery, homeSort, homeView, setChartCompare, setFilterDebounce, setHomeQuery, setSwitchQuery, switchQuery } from "../state";
import { activateTab } from "../render/tabs";
import { refreshTrafficChart, updateCompareUI } from "../render/chart";
import { applyEnterFilter, clearPathFilter, demoPathSuggestions, getAllPaths, renderFilterSuggestions } from "../render/pages";
import { closeExpand, openExpand } from "../render/expand";
import { loadHome, renderHome } from "../home";
import { closeSubmenus } from "../user";
import { closeRangeMenu, onCustomChange, setPreset, updateRangeUI } from "../params";
import { openSiteSettings, saveSiteSettings } from "../sites";
import { closeUserMenu } from "../controls";
import { renderSiteSwitch, showHome } from "./sites-helpers";

export function renderHomeControls() {
	const sel = $("#home-sort") as HTMLSelectElement | null;
	if (!sel) return;
	const cur = sel.value || homeSort.by;
	sel.innerHTML = "";
	[["visitors", t("home.sortVisitors")], ["name", t("home.sortName")]].forEach(([v, label]) => {
		const o = document.createElement("option");
		o.value = v; o.textContent = label;
		sel.appendChild(o);
	});
	sel.value = cur;
	const dir = $("#home-dir");
	if (dir) {
		const asc = homeSort.dir === "asc";
		dir.setAttribute("aria-label", asc ? t("home.dirAsc") : t("home.dirDesc"));
		dir.setAttribute("title", asc ? "↑" : "↓");
		dir.classList.toggle("desc", !asc);
	}
}
export function initHomeControls() {
	const search = $("#home-search") as HTMLInputElement | null;
	if (search) search.addEventListener("input", () => { setHomeQuery(search.value); renderHome(); });
	const sort = $("#home-sort") as HTMLSelectElement | null;
	if (sort) sort.addEventListener("change", () => {
		homeSort.by = sort.value;
		safeStore(HOME_SORT_KEY, JSON.stringify(homeSort));
		renderHome();
	});
	const dir = $("#home-dir");
	if (dir) dir.addEventListener("click", () => {
		homeSort.dir = homeSort.dir === "asc" ? "desc" : "asc";
		safeStore(HOME_SORT_KEY, JSON.stringify(homeSort));
		renderHomeControls();
		renderHome();
	});
	const back = $("#back-btn");
	if (back) back.addEventListener("click", () => {
		if (homeView) loadHome(true);
		else showHome();
	});
	const swBtn = $("#site-switch-btn");
	if (swBtn) swBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		const m = $("#site-switch-menu") as HTMLElement;
		const open = m.hidden;
		m.hidden = !open;
		swBtn.setAttribute("aria-expanded", String(open));
		if (open) {
			renderSiteSwitch();
			const si = $("#site-switch-search") as HTMLInputElement | null;
			if (si) { si.value = ""; setSwitchQuery(""); si.focus(); }
		}
	});
	const swSearch = $("#site-switch-search") as HTMLInputElement | null;
	if (swSearch) swSearch.addEventListener("input", () => {
		setSwitchQuery(swSearch.value);
		renderSiteSwitch();
	});
}
export function initSiteSettings() {
	const btn = $("#site-settings-btn");
	if (btn) btn.addEventListener("click", () => { closeUserMenu(); openSiteSettings(); });
	const form = $("#settings-form");
	if (form) form.addEventListener("submit", saveSiteSettings);
	const close = $("#settings-close");
	if (close) close.addEventListener("click", () => { const d = $("#settings-dialog") as HTMLDialogElement | null; if (d && d.open) d.close(); });
	const cancel = $("#settings-cancel");
	if (cancel) cancel.addEventListener("click", () => { const d = $("#settings-dialog") as HTMLDialogElement | null; if (d && d.open) d.close(); });
}
export function initPathFilter() {
	const input = $("#path-filter-input") as HTMLInputElement;
	const suggest = $("#filter-suggest");
	const chipClear = $("#filter-chip-clear");
	if (!input || !suggest || !chipClear) return;

	input.addEventListener("input", () => {
		const q = input.value.trim();
		clearTimeout(filterDebounce);
		if (!q) { suggest.hidden = true; return; }
		setFilterDebounce(setTimeout(async () => {
			if (demoMode) {
				renderFilterSuggestions(demoPathSuggestions(q).map((p: any) => ({ path: p })));
				return;
			}
			try {
				const all = await getAllPaths();
				const lower = q.toLowerCase();
				const matches = all.filter((p: any) => (p.path || "").toLowerCase().includes(lower)).slice(0, 8);
				renderFilterSuggestions(matches);
			} catch { suggest.hidden = true; }
		}, 250));
	});

	input.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const q = input.value.trim();
			if (!q) return;
			applyEnterFilter(q);
			suggest.hidden = true;
		}
		if (e.key === "Escape") suggest.hidden = true;
	});

	input.addEventListener("blur", () => setTimeout(() => { suggest.hidden = true; }, 150));
	chipClear.addEventListener("click", clearPathFilter);
}
export function initExpand() {
	document.querySelectorAll<HTMLElement>(".expand-btn").forEach((btn) => {
		btn.addEventListener("click", () => openExpand(btn.dataset.expand));
	});
	const dlg = $("#expand-dialog");
	const closeBtn = $("#expand-close");
	if (closeBtn) closeBtn.addEventListener("click", closeExpand);
	if (dlg) dlg.addEventListener("click", (e) => { if (e.target === dlg) closeExpand(); });
}
export function initCardTabs() {
	document.querySelectorAll<HTMLElement>(".panel-card").forEach((card) => {
		const tabs = [...card.querySelectorAll<HTMLElement>(".tab")];
		tabs.forEach((tab) => {
			tab.addEventListener("click", () => activateTab(tab));
			tab.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
				e.preventDefault();
				// role=tablist: ←/→ recorre las pestañas visibles (la de
				// campaigns puede estar oculta hasta que lleguen datos).
				const visible = tabs.filter((tb) => !tb.hidden);
				const i = visible.indexOf(tab);
				if (i === -1) return;
				const step = e.key === "ArrowRight" ? 1 : visible.length - 1;
				const next = visible[(i + step) % visible.length];
				next.focus();
				activateTab(next);
			});
		});
	});
}
export function initRangePicker() {
	const btn = $("#range-btn");
	const menu = $("#range-menu");
	if (!btn || !menu) return;
	btn.addEventListener("click", (e: MouseEvent) => {
		e.stopPropagation();
		const willOpen = menu.hidden;
		closeRangeMenu();
		closeSubmenus();
		menu.hidden = !willOpen;
		btn.setAttribute("aria-expanded", String(willOpen));
	});
	menu.addEventListener("click", (e: MouseEvent) => {
		const item = (e.target as HTMLElement).closest<HTMLElement>("[data-preset]");
		if (!item) return;
		setPreset(item.dataset.preset as string);
		// Con "Personalizado" el menú se queda abierto para usar los inputs
		// de fecha que lleva dentro.
		if (currentPreset !== "custom") closeRangeMenu();
	});
	document.addEventListener("click", (e: MouseEvent) => {
		if (!(e.target as HTMLElement).closest("#range-wrap")) closeRangeMenu();
	});
	document.addEventListener("keydown", (e: KeyboardEvent) => {
		if (e.key === "Escape") closeRangeMenu();
	});
	($("#custom-start") as HTMLInputElement).addEventListener("change", onCustomChange);
	($("#custom-end") as HTMLInputElement).addEventListener("change", onCustomChange);
	updateRangeUI();
}
export function initCompare() {
	const btn = $("#compare-btn") as HTMLButtonElement | null;
	if (!btn) return;
	btn.addEventListener("click", () => {
		if (btn.disabled) return;
		setChartCompare(!chartCompare);
		safeStore("gd.chartCompare", chartCompare ? "1" : "0");
		updateCompareUI();
		refreshTrafficChart();
	});
	updateCompareUI();
}
