// Bridge functions shared by several views.
import { loadData } from "../dashboard";
import { $ } from "../dom";
import { STORAGE_KEY, safeStore } from "../settings";
import { t } from "../i18n/index";
import { allowedSiteIDs, client, config, currentPreset, currentSite, demoMode, homeToken, homeView, pathFilter, pathsCache, precacheToken, setAllowedSiteIDs, setCurrentSite, setHomeView, setPathFilter, setSwitchQuery, sitesList, switchQuery } from "../state";
import { emptyEl } from "../render/cards";
import { loadHome, syncTopbarHeight } from "../home";
import { syncRealtime } from "../params";
import { SERVICE_SUBDOMAINS, SITE_FAVICONS, siteColorIndex } from "../sites";

function displayDomain(cname: any) {
	const parts = (cname || "").split(".");
	if (parts.length > 2 && SERVICE_SUBDOMAINS.has(parts[0].toLowerCase())) {
		return parts.slice(1).join(".");
	}
	return cname || "";
}

function siteSlug(cname: any) {
	return displayDomain(cname).split(".")[0] || "";
}
export function legibleSiteName(cname: any) {
	const slug = siteSlug(cname);
	const overrides: Record<string, string> = { easyzfs: "EasyZFS", netpulse: "NetPulse" };
	if (overrides[slug]) return overrides[slug];
	if (!slug) return "Site";
	return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function homeAvailable() {
	return demoMode || sitesList.length > 1;
}
export function homeSiteList() {
	const root = sitesList.find((s) => !s.parent);
	const children = sitesList.filter((s) => s.parent);
	const mk = (s: any, isAccount: any) => {
		const cname = s.cname || s.code || "";
		return { site: s, isAccount, cname, name: legibleSiteName(cname) };
	};
	return [...(root ? [mk(root, true)] : []), ...children.map((s) => mk(s, false))];
}

function siteUrlKey(s: any) {
	return s ? (displayDomain(s.cname || "") || s.code || "") : "";
}

function hashForSite(cname: any) {
	if (cname) return "#/" + (displayDomain(cname) || cname);
	// La cuenta (sitio raíz) también tiene URL propia.
	const key = siteUrlKey(sitesList.find((s) => !s.parent));
	return key ? "#/" + key : "#/";
}

function siteFromHash() {
	const raw = (location.hash || "").replace(/^#\/?/, "").trim();
	if (!raw) return null;
	const key = decodeURIComponent(raw).toLowerCase();
	const s = sitesList.find((x) =>
		(siteUrlKey(x) || "").toLowerCase() === key ||
		(x.cname || "").toLowerCase() === key ||
		(x.code || "").toLowerCase() === key);
	return s || false;
}

export function applyHash() {
	if (demoMode) return;
	const s = siteFromHash();
	if (!s) { if (!homeView) showHome(); return; }
	const target = s.parent ? s.cname : null;
	if (homeView || (currentSite || null) !== target) onSiteChange(target);
}
export function showHome() {
	setHomeView(true);
	if (!demoMode) {
		// Sin hash aún (primera carga): fijar #/ sin añadir una entrada
		// extra al historial. Con otro hash: navegación normal.
		if (!location.hash) { try { history.replaceState(null, "", "#/"); } catch { /* ignore */ } }
		else if (location.hash !== "#/") location.hash = "#/";
	}
	$("#site-shell").hidden = true;
	$("#home-view").hidden = false;
	updateBackButton();
	renderSiteSwitch();
	syncTopbarHeight();
	loadHome();
}
export function showDashboard() {
	setHomeView(false);
	$("#home-view").hidden = true;
	$("#site-shell").hidden = false;
	// Los filtros de rango viven en la cabecera de la tarjeta de tráfico
	// (issue #50): solo existen dentro de esa vista.
	$("#custom-range").hidden = currentPreset !== "custom";
	updateBackButton();
	renderSiteSwitch();
	syncTopbarHeight();
}

function updateBackButton() {
	const btn = $("#back-btn");
	if (!btn) return;
	const inSite = !homeView;
	const home = $("#back-icon-home");
	const back = $("#back-icon-back");
	if (home) home.hidden = inSite;
	if (back) back.hidden = !inSite;
	btn.setAttribute("aria-label", inSite ? t("home.back") : "Goatdash");
}
export function siteDomain(s: any) {
	const cname = (s && s.cname) || "";
	return ((s && s.link_domain) || displayDomain(cname) || cname).trim();
}
export function siteIcoEl(entry: any, cls: any) {
	const ico = document.createElement("span");
	const slug = siteSlug(entry.cname);
	ico.className = cls + (entry.isAccount ? " acct" : " c" + siteColorIndex(slug));
	ico.textContent = entry.name.charAt(0).toUpperCase();
	// Favicon: 1) asset local (assets/favicons/<slug>): CSP-safe, mismo
	// origen, lo que la línea v1 ya servía en prod; 2) fallback al
	// /favicon.ico del dominio real. Listeners (no inline): si falla, la
	// imagen se elimina y queda la inicial con su color.
	const local = slug && (SITE_FAVICONS as Record<string, string>)[slug];
	const dom = siteDomain(entry.site);
	// En demo los cnames son ficticios: no intentar el favicon remoto (evita
	// errores de red en consola). Solo assets locales.
	if (local || (!demoMode && (entry.cname || dom))) {
		const img = document.createElement("img");
		img.className = "favicon";
		img.alt = "";
		img.loading = "lazy";
		img.referrerPolicy = "no-referrer";
		img.addEventListener("error", () => img.remove());
		// El favicon remoto se pide al cname del contador (stats.*), que la
		// CSP img-src sí permite; el dominio "real" (apex) solo se muestra
		// como texto (issue #55, punto 4).
		img.src = local || ("https://" + (entry.cname || dom) + "/favicon.ico");
		ico.appendChild(img);
	}
	return ico;
}
export function renderSiteSwitch() {
	const wrap = $("#site-switch");
	if (!wrap) return;
	const show = !demoMode && !homeView && client && sitesList.length > 1;
	wrap.hidden = !show;
	if (!show) return;
	const list = homeSiteList();
	const curEntry = list.find((e) => (e.isAccount ? currentSite === null : e.cname === currentSite)) || list[0];
	const nameEl = $("#site-switch-name");
	if (nameEl) nameEl.textContent = siteDomain(curEntry.site) || curEntry.name;
	const icoEl = $("#site-switch-ico");
	if (icoEl) { icoEl.innerHTML = ""; icoEl.appendChild(siteIcoEl(curEntry, "site-item-ico")); }
	const nav = $("#site-switch-list");
	if (!nav) return;
	const q = switchQuery.trim().toLowerCase();
	const items = list.filter((e) => !q
		|| e.name.toLowerCase().includes(q)
		|| siteDomain(e.site).toLowerCase().includes(q)
		|| (e.cname || "").toLowerCase().includes(q));
	nav.innerHTML = "";
	if (!items.length) { nav.appendChild(emptyEl(t("home.noResults"))); return; }
	const frag = document.createDocumentFragment();
	items.forEach((e) => {
		const current = e === curEntry;
		const b = document.createElement("button");
		b.type = "button";
		b.className = "site-item";
		if (current) b.setAttribute("aria-current", "true");
		b.appendChild(siteIcoEl(e, "site-item-ico"));
		const txt = document.createElement("span");
		txt.className = "site-item-text";
		const nm = document.createElement("span");
		nm.className = "site-item-name";
		nm.textContent = e.name;
		const dom = document.createElement("span");
		dom.className = "site-item-domain";
		dom.textContent = e.isAccount ? t("home.account") : (siteDomain(e.site) || e.cname);
		txt.append(nm, dom);
		b.appendChild(txt);
		if (current) {
			const ck = document.createElement("span");
			ck.className = "site-check";
			ck.textContent = "✓";
			b.appendChild(ck);
			}
		b.addEventListener("click", () => {
			closeSiteSwitch();
			if (!current) onSiteChange(e.isAccount ? null : e.cname);
		});
		frag.appendChild(b);
	});
	nav.appendChild(frag);
}
export function closeSiteSwitch() {
	const m = $("#site-switch-menu");
	const b = $("#site-switch-btn");
	if (m) m.hidden = true;
	if (b) b.setAttribute("aria-expanded", "false");
	setSwitchQuery("");
	const si = $("#site-switch-search") as HTMLInputElement | null;
	if (si) si.value = "";
}
export function onSiteChange(cname: any) {
	setCurrentSite(cname || null);
	if (!demoMode) {
		const h = hashForSite(cname);
		if (location.hash !== h) location.hash = h;
	}
	if (client) client.siteBaseURL = currentSite ? "https://" + currentSite : null;
	if (config) {
		config.site = currentSite;
		safeStore(STORAGE_KEY, JSON.stringify(config));
	}
	// El filtro de rutas es específico del sitio: se limpia al cambiar.
	if (pathFilter) {
		setPathFilter(null);
		$("#filter-chip").hidden = true;
		const input = $("#path-filter-input") as HTMLInputElement | null;
		if (input) input.value = "";
	}
	pathsCache.clear();
	// Cancela el precache en curso: el sitio clicado tiene prioridad.
	if (precacheToken) precacheToken.cancelled = true;
	// Reinicia el auto-refresco realtime para el sitio nuevo (o lo cancela
	// si el preset activo ya no es realtime).
	syncRealtime();
	if (homeToken) homeToken.cancelled = true;
	showDashboard();
	loadData();
}
export function deriveTokenScope() {
	setAllowedSiteIDs(null);
	const tok = config && config.me && config.me.token;
	if (!tok || !Array.isArray(tok.sites) || tok.sites.length === 0) return;
	const ids = tok.sites.map(Number);
	if (ids.length === 1 && ids[0] === -1) return; // acceso total
	setAllowedSiteIDs(new Set(ids));
}
