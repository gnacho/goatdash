// Date range presets, labels and small time helpers.
import { currentLang } from "./lang";
import { t } from "./i18n/index";
import { fmtNum } from "./util";

export function getDateRange(preset: any, cs: any, ce: any) {
	const now = new Date();
	now.setSeconds(0, 0);
	let start, end = now;
	if (preset === "today" || preset === "realtime") {
		start = new Date(now); start.setHours(0, 0, 0, 0);
	} else if (preset === "yesterday") {
		start = new Date(now); start.setDate(start.getDate() - 1); start.setHours(0, 0, 0, 0);
		end = new Date(start); end.setHours(23, 0, 0, 0);
	} else if (preset === "7d" || preset === "30d" || preset === "90d" || preset === "365d") {
		const days = parseInt(preset);
		start = new Date(now); start.setDate(start.getDate() - days);
	} else if (preset === "mtd") {
		start = new Date(now); start.setDate(1); start.setHours(0, 0, 0, 0);
	} else if (preset === "ytd") {
		start = new Date(now); start.setMonth(0, 1); start.setHours(0, 0, 0, 0);
	} else if (preset === "all") {
		start = new Date(2000, 0, 1, 0, 0, 0, 0);
	} else {
		if (!cs || !ce) { return getDateRange("30d", null, null); }
		start = new Date(cs + "T00:00:00");
		end = new Date(ce + "T23:00:00");
	}
	const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
	return { start, end, days };
}
export function getPreviousRange(start: any, end: any) {
	const span = end - start;
	return { start: new Date(start.getTime() - span), end: new Date(end.getTime() - span) };
}
export function pickGroup(days: any) {
	if (days <= 2) return "hour";
	if (days <= 92) return "day";
	if (days <= 731) return "week";
	return "month";
}

const RANGE_I18N = {
	today: "today", yesterday: "yesterday", realtime: "realtime",
	"7d": "d7", "30d": "d30", "90d": "d90", "365d": "y1",
	mtd: "mtd", ytd: "ytd", all: "all", custom: "custom",
};

const RANGE_I18N_MAP: Record<string, string> = RANGE_I18N;
export function presetLabel(p: any) {
	return t("preset." + (RANGE_I18N_MAP[p] || "custom"));
}
export function rangeLabel(p: any) {
	return t("range." + (RANGE_I18N_MAP[p] || "custom"));
}
export function lastHourVisitors(totalData: any) {
	const stats = (totalData && totalData.stats) || [];
	let best: any = null;
	stats.forEach((s: any) => {
		if (!Array.isArray(s.hourly)) return;
		if (!best || s.day > best.day) best = s;
	});
	if (!best) return "—";
	const v = best.hourly[new Date().getUTCHours()];
	return typeof v === "number" ? fmtNum(v) : "—";
}

function xLabelLocale() {
	return currentLang() === "es" ? "es-ES" : "en-US";
}
export function formatXTick(ts: any, group: any, opts: { withYear?: boolean } = {}) {
	let o: Record<string, string>;
	if (group === "hour") o = { hour: "numeric", minute: "2-digit" };
	else if (group === "month") o = opts.withYear ? { month: "short", year: "numeric" } : { month: "short" };
	else o = { day: "numeric", month: "short" };
	o.timeZone = "UTC";
	try { return new Intl.DateTimeFormat(xLabelLocale(), o).format(new Date(ts)); }
	catch { return ts.slice(0, 10); }
}
export function formatTooltipDate(ts: any, group: any) {
	let o: Record<string, string>;
	if (group === "hour") o = { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" };
	else if (group === "month") o = { month: "long", year: "numeric" };
	else o = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
	o.timeZone = "UTC";
	try { return new Intl.DateTimeFormat(xLabelLocale(), o).format(new Date(ts)); }
	catch { return ts.slice(0, 10); }
}
