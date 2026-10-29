// Auto-refresh preference (off/1m/5m).
import { $ } from "./dom";
import { REFRESH_KEY, readStore } from "./settings";
import { t } from "./i18n/index";
import { autoRefreshSec } from "./state";

export function readAutoRefreshPref() {
	const raw = parseInt(readStore(REFRESH_KEY) || "", 10);
	if (raw === 0 || raw === 60 || raw === 300) return raw;
	return 300;
}

export function autoRefreshName() {
	if (!autoRefreshSec) return t("refresh.off");
	if (autoRefreshSec >= 300) return t("refresh.5m");
	return t("refresh.1m");
}
export function updateAutoRefreshUI() {
	const lbl = $("#autorefresh-btn");
	if (lbl) lbl.textContent = t("menu.autoRefresh", { opt: autoRefreshName() });
	document.querySelectorAll<HTMLElement>("[data-refresh-option]").forEach((btn) => {
		const active = parseInt(btn.dataset.refreshOption as string, 10) === autoRefreshSec;
		btn.classList.toggle("active", active);
		btn.setAttribute("aria-checked", String(active));
	});
}
