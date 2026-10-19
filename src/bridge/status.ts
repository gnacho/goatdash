// Bridge functions shared by several views.
import { loadData } from "../dashboard";
import { $ } from "../dom";
import { t } from "../i18n/index";
import { relTime } from "../util";
import { demoMode, lastUpdatedAt, rateTimer, setRateTimer } from "../state";
import { updateExportMenu } from "../render/expand";

export function showRateBanner(retryAfterSec: any) {
	const banner = $("#error-banner");
	if (!banner) return;
	let remaining = Math.min(Math.max(Math.round(retryAfterSec || 30), 5), 90);
	const paint = () => { banner.textContent = t("err.rateBanner", { sec: remaining }); banner.hidden = false; };
	paint();
	clearInterval(rateTimer);
	setRateTimer(setInterval(() => {
		remaining -= 1;
		if (remaining <= 0) {
			clearInterval(rateTimer);
			setRateTimer(null);
			banner.hidden = true;
			if (!$("#dash-screen").hidden) loadData();
		} else paint();
	}, 1000));
}

export function updateFreshness() {
	const el = $("#freshness");
	if (demoMode) { el.textContent = t("updated", { t: t("updated.now") }); updateExportMenu(); return; }
	if (!lastUpdatedAt) { updateExportMenu(); return; }
	el.textContent = t("updated", { t: relTime(lastUpdatedAt) });
	updateExportMenu();
}
