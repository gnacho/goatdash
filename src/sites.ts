// Site switching, favicons, per-site settings dialog, token scope.
import { deriveTokenScope, homeSiteList, legibleSiteName, siteDomain } from "./bridge/sites-helpers";
import { $ } from "./dom";
import { STORAGE_KEY, safeStore } from "./settings";
import { t } from "./i18n/index";
import { getDateRange } from "./datetime";
import { allowedSiteIDs, client, config, currentPreset, currentSite, customEnd, customStart, demoMode, precacheToken, setCurrentSite, setPrecacheToken, setSettingsSiteId, setSitesList, settingsSiteId, sitesList } from "./state";
import { buildEndpointSet } from "./endpoints";
import { cacheKeyFor } from "./cache";

export const SERVICE_SUBDOMAINS = new Set(["stats", "analytics", "goatcounter", "count"]);
export const SITE_FAVICONS = {
	anaxu: "assets/favicons/anaxu.ico",
	deltos: "assets/favicons/deltos.svg",
	domatix: "assets/favicons/domatix.ico",
	easyzfs: "assets/favicons/easyzfs.svg",
	ghostbird: "assets/favicons/ghostbird.svg",
	goatdash: "assets/favicons/goatdash.svg",
	helios: "assets/favicons/helios.png",
	keynest: "assets/favicons/keynest.svg",
	netgrip: "assets/favicons/netgrip.svg",
	netpulse: "assets/favicons/netpulse.svg",
	nextsync: "assets/favicons/nextsync.svg",
	ocnews: "assets/favicons/ocnews.svg",
	openerpspain: "assets/favicons/openerpspain.ico",
	wiletics: "assets/favicons/wiletics.ico",
};

const SITE_COLORS = ["#3fb950", "#a371f7", "#e3b341", "#f778ba", "#56d4dd", "#ffa657", "#d29922", "#6e3fc2"];
export function siteColorIndex(slug: any) {
	let h = 0;
	for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
	return Math.abs(h) % SITE_COLORS.length;
}

function siteColorFor(slug: any) {
	return SITE_COLORS[siteColorIndex(slug)];
}

const COLLECT_FLAGS = [
	[2, "settings.collectReferrer"],
	[4, "settings.collectUserAgent"],
	[8, "settings.collectScreenSize"],
	[16, "settings.collectLocation"],
	[32, "settings.collectLocationRegion"],
	[64, "settings.collectLanguage"],
	[128, "settings.collectSessions"],
];

const COLLECT_MASK: number = COLLECT_FLAGS.reduce((acc: number, f: any) => acc | f[0], 0);

function tokenCanWriteSettings() {
	const p = config && config.me && config.me.token ? Number(config.me.token.permissions) : NaN;
	return Number.isFinite(p) && (p & 32) !== 0;
}
export async function openSiteSettings() {
	if (demoMode || !client) return;
	const entries = homeSiteList();
	const cur = entries.find((e) => (e.isAccount ? currentSite === null : e.cname === currentSite)) || entries[0];
	if (!cur || !cur.site || !cur.site.id) return;
	setSettingsSiteId(cur.site.id);
	const dom = $("#settings-domain");
	if (dom) dom.textContent = siteDomain(cur.site) || cur.cname;
	// Copia fresca de los settings: la lista puede traerla cacheada. Si la
	// respuesta no trae settings (respuesta inesperada), preferimos la de
	// la lista antes que pintar un formulario vacío: guardar sobre un
	// formulario vacío BORRARÍA la configuración real de recolecta.
	let site = cur.site;
	try {
		const fresh = await client.request("/api/v0/sites/" + cur.site.id, { site: null, forceRefresh: true, cacheKey: "s:@:site:" + cur.site.id });
		if (fresh && fresh.settings) site = fresh;
	} catch { /* nos quedamos con lo que trae la lista */ }
	if (!site || !site.settings) {
		const saved = $("#settings-saved") as HTMLElement;
		if (saved) {
			saved.hidden = false;
			saved.classList.add("error");
			saved.textContent = t("settings.saveError", { msg: "settings?" });
		}
		const saveBtn = $("#settings-save");
		if (saveBtn) saveBtn.hidden = true;
		const dlg = $("#settings-dialog") as HTMLDialogElement;
		if (dlg && !dlg.open) dlg.showModal();
		return;
	}
	fillSettingsForm(site);
	const dlg = $("#settings-dialog") as HTMLDialogElement;
	if (dlg && !dlg.open) dlg.showModal();
}

function fillSettingsForm(site: any) {
	const s = (site && site.settings) || {};
	const canWrite = tokenCanWriteSettings();
	const fs = $("#settings-collect");
	if (fs) {
		fs.innerHTML = "";
		const legend = document.createElement("legend");
		legend.textContent = t("settings.collect");
		fs.appendChild(legend);
		const cur = Number(s.collect || 0);
		COLLECT_FLAGS.forEach((pair: any) => {
			const bit: number = pair[0]; const key: string = pair[1];
			const label = document.createElement("label");
			label.className = "settings-check";
			const cb = document.createElement("input");
			cb.type = "checkbox";
			cb.dataset.collectBit = String(bit);
			cb.checked = (cur & bit) !== 0;
			cb.disabled = !canWrite;
			const span = document.createElement("span");
			span.textContent = t(key);
			label.append(cb, span);
			fs.appendChild(label);
		});
	}
	const ips = $("#settings-ignore-ips") as HTMLInputElement | null;
	if (ips) ips.value = (s.ignore_ips || []).join("\n");
	const ret = $("#settings-retention") as HTMLInputElement | null;
	if (ret) ret.value = String(Number(s.data_retention || 0));
	[ips, ret].forEach((el) => { if (el) el.disabled = !canWrite; });
	const saveBtn = $("#settings-save") as HTMLButtonElement;
	if (saveBtn) { saveBtn.hidden = !canWrite; saveBtn.disabled = false; }
	const ro = $("#settings-readonly") as HTMLElement;
	if (ro) ro.hidden = canWrite;
	const saved = $("#settings-saved") as HTMLElement;
	if (saved) { saved.hidden = true; saved.classList.remove("error"); saved.textContent = t("settings.saved"); }
}
export async function saveSiteSettings(e: any) {
	e.preventDefault();
	if (!tokenCanWriteSettings() || !settingsSiteId) return;
	let collect = 0;
	document.querySelectorAll<HTMLInputElement>("#settings-collect input[type=checkbox]").forEach((cb) => {
		if (cb.checked) collect |= Number(cb.dataset.collectBit);
	});
	// Los bits que no editamos (p. ej. CollectHits) se conservan tal cual.
	const cur = sitesList.find((x) => x.id === settingsSiteId);
	collect |= Number((cur && cur.settings && cur.settings.collect) || 0) & ~COLLECT_MASK;
	const ipsRaw = (($("#settings-ignore-ips") as HTMLInputElement).value || "").split(/[\n,]+/).map((x: any) => x.trim()).filter(Boolean);
	const retention = Math.max(0, parseInt(($("#settings-retention") as HTMLInputElement).value, 10) || 0);
	const body = { settings: { collect, ignore_ips: ipsRaw, data_retention: retention } };
	const saveBtn = $("#settings-save") as HTMLButtonElement;
	if (saveBtn) saveBtn.disabled = true;
	try {
		const updated = await client.request("/api/v0/sites/" + settingsSiteId, {
			site: null, method: "PATCH", body, forceRefresh: true, cacheKey: "s:@:site:" + settingsSiteId,
		});
		const idx = sitesList.findIndex((x) => x.id === settingsSiteId);
		if (idx >= 0 && updated && updated.settings) sitesList[idx] = updated;
		const saved = $("#settings-saved") as HTMLElement;
		if (saved) { saved.hidden = false; saved.classList.remove("error"); saved.textContent = t("settings.saved"); }
		setTimeout(() => { const d = $("#settings-dialog") as HTMLDialogElement | null; if (d && d.open) d.close(); }, 900);
	} catch (err) {
		const saved = $("#settings-saved") as HTMLElement;
		if (saved) {
			saved.hidden = false;
			saved.classList.add("error");
			saved.textContent = t("settings.saveError", { msg: err && (err as Error).message ? (err as Error).message : "?" });
		}
	} finally {
		if (saveBtn) saveBtn.disabled = false;
	}
}
export function refreshTokenScope() {
	if (!client || !config) return;
	const cfg: any = config;
	client.request("/api/v0/me", { retries: 1, forceRefresh: true, site: null }).then((me: any) => {
		if (!me || !me.token) return;
		const before = JSON.stringify((cfg.me && cfg.me.token && cfg.me.token.sites) || null);
		const after = JSON.stringify(me.token.sites || null);
		cfg.me = me;
		safeStore(STORAGE_KEY, JSON.stringify(config));
		if (before !== after) {
			deriveTokenScope();
			loadSiteSelector();
		}
	}).catch(() => { /* sin red o token caducado: se queda el me cacheado */ });
}

export async function loadSiteSelector() {
	if (demoMode || !client) return sitesList;
	try {
		const data = await client.request("/api/v0/sites", { forceRefresh: true, site: null });
		setSitesList((data && data.sites) || []);
		const scope: Set<number> | null = allowedSiteIDs;
if (scope) setSitesList(sitesList.filter((s: any) => scope.has(s.id)));
		// Orden alfabético por el nombre visible (issue #37), aplicado tras el
		// filtro de scope para que orden y permisos queden separados. La cuenta
		// (root) se detecta por !parent y sigue pintándose en su propio grupo.
		sitesList.sort((a, b) =>
			legibleSiteName(a.cname || a.code || "").toLowerCase()
				.localeCompare(legibleSiteName(b.cname || b.code || "").toLowerCase()) ||
			String(a.cname || "").localeCompare(String(b.cname || ""))
		);
	} catch {
		setSitesList([]);
	}
	if (allowedSiteIDs && currentSite && !sitesList.some((s) => s.cname === currentSite)) {
		// El sitio guardado ya no lo permite este token: volver a la cuenta.
		setCurrentSite(null);
		if (client) client.siteBaseURL = null;
		if (config) { config.site = null; safeStore(STORAGE_KEY, JSON.stringify(config)); }
	}
	return sitesList;
}

export async function precacheSites() {
	if (precacheToken) precacheToken.cancelled = true;
	if (demoMode || !client || !sitesList.length) return;
	const token = { cancelled: false };
	setPrecacheToken(token);
	const range = getDateRange(currentPreset, customStart, customEnd);
	// Solo lo esencial (KPIs + gráfico). Las mismas URLs que usa loadData,
	// así el precache rellena exactamente las mismas claves de caché.
	const eps: any = buildEndpointSet(range);
	const urls = [{ url: eps.total, kind: "total" }, { url: eps.hits, kind: "hits" }];
	const root = sitesList.find((s) => !s.parent);
	const active = currentSite || (root ? root.cname : "");
	const targets = sitesList
		.filter((s) => s.cname && s.cname !== active)
		.map((s) => s.cname);
	for (const cname of targets) {
		if (token.cancelled) break;
		await Promise.allSettled(urls.map(({ url, kind }) =>
			client.request(url, { site: cname, priority: "low", signal: token, cacheKey: cacheKeyFor(kind, cname) }).catch((e: any) => {
				// Precache defensivo: un fallo no debe molestar al usuario.
				console.warn("[precache]", cname, kind, e && e.message ? e.message : e);
				return null;
			})
		));
	}
	if (precacheToken === token) setPrecacheToken(null);
}
