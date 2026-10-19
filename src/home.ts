// Home view: one card per site, 24h window, sorting and search.
import { homeSiteList, onSiteChange, showDashboard, siteDomain, siteIcoEl } from "./bridge/sites-helpers";
import { loadData } from "./dashboard";
import { handleAuthError } from "./bridge/session";
import { $ } from "./dom";
import { safeStore } from "./settings";
import { t } from "./i18n/index";
import { animateNum, fmtNum, fmtPct } from "./util";
import { client, demoMode, homeData, homeQuery, homeSort, homeToken, setDataLoading, setHomeData, setHomeToken } from "./state";
import { emptyEl, renderHomeDemo } from "./render/cards";

function homeWindow() {
	const end = new Date();
	end.setMinutes(0, 0, 0);
	const start = new Date(end.getTime() - 24 * 3600_000);
	return { start, end };
}

function buildHourlySeries(hitsData: any, start: any, end: any) {
	const map = new Map();
	(hitsData.hits || []).forEach((h: any) => {
		(h.stats || []).forEach((s: any) => {
			if (!s.hourly) return;
			s.hourly.forEach((v: any, hour: any) => {
				if (v <= 0) return;
				const k = `${s.day}T${String(hour).padStart(2, "0")}:00:00Z`;
				map.set(k, (map.get(k) || 0) + v);
			});
		});
	});
	const t0 = start.getTime(), t1 = end.getTime();
	return [...map.entries()]
		.filter(([ts]) => { const d = new Date(ts).getTime(); return d >= t0 && d < t1; })
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([ts, count]) => ({ ts, count }));
}

function sparklineSVG(series: any) {
	const ns = "http://www.w3.org/2000/svg";
	const W = 240, H = 44;
	const svg = document.createElementNS(ns, "svg") as any;
	svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
	svg.setAttribute("preserveAspectRatio", "none");
	svg.setAttribute("class", "spark");
	if (!series || !series.length) return svg;
	const max = Math.max(...series.map((s: any) => s.count), 1);
	const n = series.length;
	const x = (i: any) => (n === 1 ? W / 2 : (i / (n - 1)) * W);
	const y = (v: any) => H - 3 - (v / max) * (H - 8);
	const pts = series.map((s: any, i: any) => [x(i), y(s.count)]);
	const line = "M" + pts.map((p: any) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L");
	const area = line + ` L${pts[pts.length - 1][0].toFixed(1)},${H} L${pts[0][0].toFixed(1)},${H} Z`;
	const defs = document.createElementNS(ns, "defs") as any;
	const grad = document.createElementNS(ns, "linearGradient") as any;
	grad.id = "sparkFill";
	grad.setAttribute("x1", "0"); grad.setAttribute("y1", "0");
	grad.setAttribute("x2", "0"); grad.setAttribute("y2", "1");
	const stop1 = document.createElementNS(ns, "stop") as any;
	stop1.setAttribute("offset", "0%");
	stop1.setAttribute("stop-color", "var(--chart-line)");
	stop1.setAttribute("stop-opacity", "0.25");
	const stop2 = document.createElementNS(ns, "stop") as any;
	stop2.setAttribute("offset", "100%");
	stop2.setAttribute("stop-color", "var(--chart-line)");
	stop2.setAttribute("stop-opacity", "0");
	grad.append(stop1, stop2);
	defs.appendChild(grad);
	svg.appendChild(defs);
	const areaEl = document.createElementNS(ns, "path") as any;
	areaEl.setAttribute("d", area);
	areaEl.setAttribute("fill", "url(#sparkFill)");
	svg.appendChild(areaEl);
	const lineEl = document.createElementNS(ns, "path") as any;
	lineEl.setAttribute("d", line);
	lineEl.setAttribute("class", "spark-line");
	svg.appendChild(lineEl);
	return svg;
}
export const HOME_CACHE_KEY = "gc-home-cache-v1";

const HOME_CACHE_MAX_AGE_MS = 7 * 24 * 3600_000;

function homeCacheKeyFor(e: any) { return e.isAccount ? "@" : e.cname; }

function homeCacheRead() {
	try {
		const raw = localStorage.getItem(HOME_CACHE_KEY);
		if (!raw) return null;
		const obj = JSON.parse(raw);
		if (!obj || !obj.sites || (Date.now() - (obj.ts || 0)) > HOME_CACHE_MAX_AGE_MS) return null;
		return obj.sites;
	} catch { return null; }
}

function homeCacheWrite() {
	try {
		const sites: Record<string, unknown> = {};
		homeData.forEach((e) => {
			if (e.status !== "ready" || e.visitors === null) return;
			sites[homeCacheKeyFor(e)] = { visitors: e.visitors, prev: e.prev, series: e.series };
		});
		safeStore(HOME_CACHE_KEY, JSON.stringify({ ts: Date.now(), sites }));
	} catch { /* cuota u otro: la caché es best-effort */ }
}
export async function loadHome(force = false) {
	setDataLoading(true);
	try {
		await loadHomeInner(force);
	} finally {
		setDataLoading(false);
	}
}

async function loadHomeInner(force = false) {
	if (demoMode) { renderHomeDemo(); return; }
	if (!client) return;
	const token = { cancelled: false };
	setHomeToken(token);

	// Pintado inmediato desde la caché (si la hay): en una recarga se ven
	// los datos al instante y el refresco llega en segundo plano. En un
	// refresco (force) se conservan los datos ya mostrados: volver a
	// poner "loading" aquí hacía que TODAS las tarjetas parpadearan con
	// skeletons en cada auto-refresh.
	const cached = force ? null : homeCacheRead();
	setHomeData(homeSiteList().map((e) => {
		const prev = homeData.find((h) => h.isAccount === e.isAccount && h.cname === e.cname);
		if (force && prev && (prev.status === "ready" || prev.status === "error")) {
			return { ...e, status: prev.status, visitors: prev.visitors, prev: prev.prev, series: prev.series, error: prev.error };
		}
		const c = cached && cached[homeCacheKeyFor(e)];
		if (c) return { ...e, status: "ready", visitors: c.visitors, prev: c.prev, series: c.series, error: null };
		return { ...e, status: "loading", visitors: null, prev: null, series: null, error: null };
	}));
	renderHome();
	const { start, end } = homeWindow();
	await Promise.all(homeData.map((e) => loadHomeSite(e, start, end, token, force)));
	if (!token.cancelled) homeCacheWrite();
}

async function loadHomeSite(e: any, start: any, end: any, token: any, force: any) {
	const site = e.isAccount ? null : e.cname;
	const ck = (kind: any) => `s:${site || "@"}:home:${kind}`;
	const qs = (a: any, b: any) => `?start=${encodeURIComponent(a.toISOString())}&end=${encodeURIComponent(b.toISOString())}`;
	const pStart = new Date(start.getTime() - 24 * 3600_000);
	const opt = (kind: any) => ({ site, cacheKey: ck(kind), forceRefresh: !!force });
	const fire = (p: any) => p.catch((err: any) => ({ __error: err }));
	try {
		const [total, prev, hits] = await Promise.all([
			fire(client.request(`/api/v0/stats/total${qs(start, end)}`, opt("total"))),
			fire(client.request(`/api/v0/stats/total${qs(pStart, start)}`, opt("prev"))),
			fire(client.request(`/api/v0/stats/hits${qs(start, end)}&limit=20`, opt("hits"))),
		]);
		if (token && token.cancelled) return;
		for (const r of [total, prev, hits]) {
			if (r && r.__error) {
				if (r.__error.kind === "auth") { handleAuthError(r.__error.message); return; }
				throw r.__error;
			}
		}
		e.visitors = total.total ?? total.total_utc ?? 0;
		e.prev = prev.total ?? prev.total_utc ?? 0;
		e.series = buildHourlySeries(hits, start, end);
		e.error = null;
		e.status = "ready";
	} catch (err) {
		if (token && token.cancelled) return;
		// Si ya había datos (caché pintada al instante), no la sustituimos
		// por un error: se mantiene lo cacheado hasta que el refresco vaya.
		if (e.status === "ready" && e.visitors !== null) { e.error = err; return; }
		e.status = "error";
		e.error = err;
	}
	renderHome();
}
export function renderHome() {
	const grid = $("#home-grid");
	if (!grid) return;
	const q = homeQuery.trim().toLowerCase();
	const items = homeData.filter((e) => !q || e.name.toLowerCase().includes(q) || (e.cname || "").toLowerCase().includes(q));
	const dir = homeSort.dir === "asc" ? 1 : -1;
	items.sort((a, b) => {
		if (homeSort.by === "name") {
			return dir * a.name.toLowerCase().localeCompare(b.name.toLowerCase())
				|| (b.visitors ?? -1) - (a.visitors ?? -1);
		}
		const av = a.status === "ready" ? a.visitors : -1;
		const bv = b.status === "ready" ? b.visitors : -1;
		return dir * (av - bv) || a.name.toLowerCase().localeCompare(b.name.toLowerCase());
	});
	if (!items.length) {
		[...grid.children].forEach((c) => c.remove());
		grid.appendChild(emptyEl(t("home.noResults")));
		return;
	}
	// Refresco en caliente: se reutilizan las tarjetas existentes (cabecera
	// con icono/nombre/URL intactos) y solo se anima el número, la tendencia
	// y el sparkline. Mover un nodo ya existente no reinicia sus animaciones.
	const prev: Record<string, HTMLElement> = {};
	[...grid.children].forEach((c) => { const ce = c as HTMLElement; prev[ce.dataset.site ?? ""] = ce; });
	const els = items.map((e) => updateHomeCard(prev[e.cname || ""] || null, e));
	els.forEach((el) => grid.appendChild(el));
	[...grid.children].forEach((c) => { if (!els.includes(c)) c.remove(); });
}

function updateHomeCard(old: any, e: any) {
	if (old && e.status === "ready"
		&& !old.classList.contains("home-card-loading")
		&& !old.classList.contains("home-card-error")) {
		const numEl = old.querySelector(".home-num");
		if (numEl) animateNum(numEl, e.visitors);
		const trendRow = old.querySelector(".home-trend");
		if (trendRow) trendRow.replaceWith(homeTrendEl(e));
		const spark = old.querySelector("svg.spark");
		if (spark) spark.replaceWith(sparklineSVG(e.series));
		return old;
	}
	if (old) old.remove();
	return homeCardEl(e);
}

function homeTrendEl(e: any) {
	const trendRow = document.createElement("span");
	trendRow.className = "home-trend";
	let trend: number | null = null;
	if (e.prev === 0 && e.visitors > 0) trend = 100;
	else if (e.prev > 0) trend = ((e.visitors - e.prev) / e.prev) * 100;
	if (trend !== null && isFinite(trend)) {
		const span = document.createElement("span");
		span.className = trend >= 0 ? "trend-up" : "trend-down";
		span.textContent = fmtPct(trend);
		trendRow.append(span, " " + t("home.vsPrev"));
	} else {
		trendRow.textContent = "—";
	}
	return trendRow;
}

function homeCardEl(e: any) {
	const card = document.createElement("button");
	card.type = "button";
	card.className = "home-card";
	card.dataset.site = e.cname || "";

	const head = document.createElement("span");
	head.className = "home-card-head";
	head.appendChild(siteIcoEl(e, "home-icon"));
	const names = document.createElement("span");
	names.className = "home-names";
	const nm = document.createElement("span");
	nm.className = "home-name";
	nm.textContent = e.name;
	const sub = document.createElement("small");
	sub.className = "home-cname";
	sub.textContent = e.isAccount ? t("home.account") : (siteDomain(e.site) || e.cname);
	names.append(nm, sub);
	head.append(names);

	if (e.status === "loading") {
		card.classList.add("home-card-loading");
		card.disabled = true;
		const body = document.createElement("span");
		body.className = "home-card-body";
		body.innerHTML = '<span class="skeleton sk-value home-skel-num"></span><span class="skeleton sk-label home-skel-cap"></span><span class="skeleton spark-skel"></span>';
		card.append(head, body);
		return card;
	}

	if (e.status === "error") {
		card.classList.add("home-card-error");
		const body = document.createElement("span");
		body.className = "home-card-body";
		const msg = document.createElement("span");
		msg.className = "home-error";
		msg.textContent = t("err.failed");
		const retry = document.createElement("span");
		retry.className = "home-retry";
		retry.textContent = t("err.retry");
		body.append(msg, retry);
		card.append(head, body);
		card.addEventListener("click", () => {
			e.status = "loading";
			renderHome();
			const { start, end } = homeWindow();
			loadHomeSite(e, start, end, homeToken, true);
		});
		return card;
	}

	// ready
	card.setAttribute("aria-label", e.name);
	const body = document.createElement("span");
	body.className = "home-card-body";
	const num = document.createElement("span");
	num.className = "home-num";
	num.textContent = fmtNum(e.visitors);
	const cap = document.createElement("span");
	cap.className = "home-cap";
	cap.textContent = t("home.visitors24");
	body.append(num, cap, sparklineSVG(e.series), homeTrendEl(e));
	card.append(head, body);
	if (!demoMode) {
		card.addEventListener("click", () => onSiteChange(e.isAccount ? null : e.cname));
	} else {
		card.addEventListener("click", () => { showDashboard(); loadData(); });
	}
	return card;
}
export function syncTopbarHeight() {
	const tb = $(".topbar");
	if (tb) document.documentElement.style.setProperty("--topbar-h", tb.offsetHeight + "px");
}
