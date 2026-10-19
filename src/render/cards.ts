// Card primitives: skeletons, error/empty states, tooltips, demo fixtures.
import { retryKey } from "../bridge/session";
import { renderHome } from "../home";
import { t } from "../i18n/index";
import { homeData, setHomeData } from "../state";

export function skeletonCard(h: any) {
	const s = document.createElement("div");
	s.className = "skeleton skel-card" + (h === 280 ? " h280" : "");
	return s;
}
export function errCard(key: any) {
	const wrap = document.createElement("div");
	wrap.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:8px;padding:24px;color:var(--text-muted)";
	const txt = document.createElement("div");
	txt.textContent = t("err.failed");
	const btn = document.createElement("button");
	btn.className = "btn-secondary";
	btn.style.cssText = "width:auto;padding:7px 14px";
	btn.textContent = t("err.retry");
	btn.addEventListener("click", () => retryKey(key));
	wrap.append(txt, btn);
	return wrap;
}
export function emptyEl(text: any) {
	const d = document.createElement("div");
	d.className = "empty";
	d.textContent = text;
	return d;
}
export function showTooltip(target: any, html: any) {
	const tip = document.createElement("div");
	tip.className = "tooltip";
	tip.innerHTML = html;
	document.body.appendChild(tip);
	const rect = target.getBoundingClientRect();
	const pad = 8;
	let left = rect.left + rect.width / 2;
	let top = rect.top - tip.offsetHeight - pad;
	const maxLeft = window.innerWidth - tip.offsetWidth - 8;
	left = Math.min(Math.max(left, 8), maxLeft);
	if (top < 8) top = rect.bottom + pad;
	tip.style.left = left + "px";
	tip.style.top = top + "px";
	return tip;
}
export function clearTooltips() {
	document.querySelectorAll<HTMLElement>(".tooltip").forEach((el) => el.remove());
}
export function refEmptyEl() {
	const d = document.createElement("div");
	d.className = "empty";
	const p = document.createElement("p");
	p.className = "empty-text";
	p.textContent = t("ref.empty");
	const hint = document.createElement("p");
	hint.className = "empty-hint";
	hint.textContent = t("ref.emptyHint");
	const btn = document.createElement("button");
	btn.className = "btn-secondary";
	btn.style.cssText = "width:auto;padding:7px 14px;margin-top:6px";
	btn.textContent = t("ref.widen");
	btn.addEventListener("click", () => {
		const b = document.querySelector('#range-menu [data-preset="90d"]') as HTMLElement | null;
		if (b) b.click();
	});
	d.append(p, hint, btn);
	return d;
}

const DEMO_HOME_SITES = ["Aurora Store", "Northwind Docs", "Pixel Blog", "Atlas Landing", "Beacon Status", "Comet API"];

function hash32(s: any) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
	return h >>> 0;
}

function mulberry32(a: any) {
	return function () {
		a |= 0; a = (a + 0x6D2B79F5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
export function renderHomeDemo() {
	setHomeData(DEMO_HOME_SITES.map((name, i) => {
		const rng = mulberry32(hash32(name));
		const base = 80 + Math.floor(rng() * 900);
		const series: { ts: string; count: number }[] = [];
		for (let h = 0; h < 24; h++) {
			// Patrón diario: valle de madrugada, pico por la tarde (UTC).
			const wave = 0.35 + 0.65 * Math.max(0, Math.sin(((h - 6) / 24) * Math.PI * 2));
			series.push({ ts: `dT${String(h).padStart(2, "0")}:00:00Z`, count: Math.max(0, Math.round(base * wave * (0.6 + rng() * 0.8))) });
		}
		const visitors = Math.round(series.reduce((a, s) => a + s.count, 0) * (0.55 + rng() * 0.2));
		const prev = Math.round(visitors * (0.6 + rng() * 0.7));
		return {
			site: { code: "demo" + i }, isAccount: false,
			cname: name.toLowerCase().replace(/[^a-z]+/g, "") + ".demo",
			name, status: "ready", visitors, prev, series, error: null,
		};
	}));
	renderHome();
}
