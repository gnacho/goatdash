// Range picker, chart metric/compare toggles, realtime + auto refresh.
import { refreshTrafficChart } from "./render/chart";
import { loadData } from "./dashboard";
import { $ } from "./dom";
import { REFRESH_KEY, safeStore } from "./settings";
import { getDateRange, getPreviousRange, rangeLabel } from "./datetime";
import { autoRefreshSec, autoTimer, chartCompare, chartMetric, client, currentPreset, currentSite, customEnd, customStart, dataLoading, demoMode, homeView, lastPrevHitsData, prevHitsPromise, rateTimer, realtimeTimer, refreshTick, setAutoRefreshSec, setAutoTimer, setCurrentPreset, setCustomEnd, setCustomStart, setLastPrevHitsData, setPrevHitsPromise, setRealtimeTimer, setRefreshTick } from "./state";
import { updateAutoRefreshUI } from "./refresh";
import { endpointFor } from "./endpoints";
import { loadHome } from "./home";
import { cacheKeyFor } from "./cache";

export function closeRangeMenu() {
	const menu = $("#range-menu");
	const btn = $("#range-btn");
	if (menu && !menu.hidden) menu.hidden = true;
	if (btn) btn.setAttribute("aria-expanded", "false");
}
export function updateRangeUI() {
	const lbl = $("#range-btn-label");
	if (lbl) lbl.textContent = rangeLabel(currentPreset);
	document.querySelectorAll<HTMLElement>("#range-menu [data-preset]").forEach((b) => {
		const on = b.dataset.preset === currentPreset;
		b.classList.toggle("active", on);
		b.setAttribute("aria-checked", String(on));
	});
	const live = $("#live-badge");
	if (live) live.hidden = currentPreset !== "realtime";
	const cr = $("#custom-range");
	if (cr) cr.hidden = currentPreset !== "custom";
}
export function stopRealtime() {
	if (realtimeTimer) { clearInterval(realtimeTimer); setRealtimeTimer(null); }
}
export function syncRealtime() {
	stopRealtime();
	if (currentPreset === "realtime" && !$("#dash-screen").hidden) {
		setRealtimeTimer(setInterval(() => {
			if (currentPreset === "realtime") loadData();
		}, 60_000));
	}
}
export function stopAutoRefresh() {
	if (autoTimer) { clearInterval(autoTimer); setAutoTimer(null); }
}

export function syncAutoRefresh() {
	stopAutoRefresh();
	if (demoMode || !autoRefreshSec || $("#dash-screen").hidden) return;
	setAutoTimer(setInterval(autoRefreshTick, autoRefreshSec * 1000));
}
export function autoRefreshTick() {
	if (document.hidden || dataLoading || rateTimer) return;
	setRefreshTick((refreshTick as number) + 1);
	if (homeView) loadHome(true);
	else loadData({ force: true, soft: true });
}
export function ensurePrevHitsData() {
	if (demoMode || lastPrevHitsData || prevHitsPromise || !client) return;
	const range = getDateRange(currentPreset, customStart, customEnd);
	const prev = getPreviousRange(range.start, range.end);
	const url = endpointFor("hits", prev.start, prev.end);
	setPrevHitsPromise(client.request(url, { cacheKey: cacheKeyFor("prevhits", currentSite) })
		.then((res: any) => {
			setLastPrevHitsData(res);
			if (chartCompare && chartMetric === "pageviews") refreshTrafficChart();
		})
		.catch(() => { /* sin serie previa de hits: comparativa oculta */ })
		.finally(() => { setPrevHitsPromise(null); }));
}
export function setAutoRefresh(sec: any) {
	setAutoRefreshSec(sec);
	safeStore(REFRESH_KEY, String(sec));
	updateAutoRefreshUI();
	syncAutoRefresh();
}
export function setPreset(p: string) {
	setCurrentPreset(p);
	if (p === "custom") {
		const iso = (d: any) => d.toISOString().slice(0, 10);
		const csIn = $("#custom-start") as HTMLInputElement;
		if (!customStart) { setCustomStart(iso(new Date(Date.now() - 29 * 86400000))); csIn.value = customStart; }
		const ceIn = $("#custom-end") as HTMLInputElement;
		if (!customEnd) { setCustomEnd(iso(new Date())); ceIn.value = customEnd; }
	}
	updateRangeUI();
	syncRealtime();
	loadData();
}
export function onCustomChange() {
	setCustomStart(($("#custom-start") as HTMLInputElement).value);
	setCustomEnd(($("#custom-end") as HTMLInputElement).value);
	if (customStart && customEnd) loadData();
}
