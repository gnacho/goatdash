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

// Monotone cubic interpolation (Fritsch-Carlson), the same curve as
// d3-shape's curveMonotoneX and Recharts' <Area type="monotone">: smooth
// segments that never overshoot the data points. Returns an SVG path.
const r2 = (v: number) => Math.round(v * 100) / 100;

export function monotoneLine(pts: [number, number][]): string {
	const n = pts.length;
	if (!n) return "";
	if (n === 1) return "M" + r2(pts[0][0]) + "," + r2(pts[0][1]);
	const d = ["M" + r2(pts[0][0]) + "," + r2(pts[0][1])];
	if (n > 2) {
		const h: number[] = [], s: number[] = [];
		for (let i = 0; i < n - 1; i++) {
			h[i] = pts[i + 1][0] - pts[i][0];
			s[i] = (pts[i + 1][1] - pts[i][1]) / (h[i] || 1e-9);
		}
		const m: number[] = new Array(n).fill(0);
		for (let i = 1; i < n - 1; i++) {
			if (s[i - 1] * s[i] <= 0) continue;
			const p = (s[i - 1] * h[i] + s[i] * h[i - 1]) / (h[i - 1] + h[i]);
			m[i] = (Math.sign(s[i - 1]) + Math.sign(s[i])) * Math.min(Math.abs(s[i - 1]), Math.abs(s[i]), Math.abs(p) / 2);
		}
		m[0] = (3 * s[0] - m[1]) / 2;
		m[n - 1] = (3 * s[n - 2] - m[n - 2]) / 2;
		for (let i = 0; i < n - 1; i++) {
			const t = h[i] / 3;
			d.push("C" + r2(pts[i][0] + t) + "," + r2(pts[i][1] + m[i] * t)
				+ " " + r2(pts[i + 1][0] - t) + "," + r2(pts[i + 1][1] - m[i + 1] * t)
				+ " " + r2(pts[i + 1][0]) + "," + r2(pts[i + 1][1]));
		}
	} else {
		d.push("L" + r2(pts[1][0]) + "," + r2(pts[1][1]));
	}
	return d.join(" ");
}

export function monotoneArea(pts: [number, number][], base: number): string {
	if (!pts.length) return "";
	const line = monotoneLine(pts);
	const last = pts[pts.length - 1];
	return "M" + r2(pts[0][0]) + "," + r2(base) + " " + line.slice(1)
		+ " L" + r2(last[0]) + "," + r2(base) + " Z";
}
