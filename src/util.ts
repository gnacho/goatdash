// Formatting helpers (numbers, percentages, relative time, tween).
import { t } from "./i18n/index";

export function fmtNum(n: any) {
	if (n === null || n === undefined) return "—";
	if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
	if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
	return String(Math.round(n));
}
export function tween(dur: any, onFrame: any) {
	const t0 = performance.now();
	let raf = 0, dead = false;
	const cancel = () => { dead = true; cancelAnimationFrame(raf); };
	const step = (now: any) => {
		if (dead) return;
		const p = Math.min(1, (now - t0) / dur);
		onFrame(1 - Math.pow(1 - p, 3));
		if (p < 1) raf = requestAnimationFrame(step);
	};
	raf = requestAnimationFrame(step);
	return cancel;
}
export function animateNum(el: any, to: any, dur = 600) {
	const from = typeof el._numLast === "number" ? el._numLast : 0;
	to = Number(to) || 0;
	el._numLast = to;
	if (el._numTween) el._numTween();
	if (from === to) { el.textContent = fmtNum(to); return; }
	el._numTween = tween(dur, (e: any) => {
		el.textContent = fmtNum(Math.round(from + (to - from) * e));
	});
}
export function fmtPct(n: any) {
	const v = n >= 0 ? "+" : "−";
	return v + Math.abs(n).toFixed(1) + "%";
}
export function relTime(ts: any) {
	const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
	if (s < 5) return t("updated.now");
	if (s < 60) return t("updated.s", { s });
	if (s < 3600) return t("updated.m", { m: Math.floor(s / 60) });
	return t("updated.h", { h: Math.floor(s / 3600) });
}
