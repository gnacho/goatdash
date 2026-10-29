// Dashboard load pipeline (KPIs, chart, panels) and rate banner.
import { initFooter } from "./footer";
import { renderUser } from "./user";
import { renderCampaignsDemo, renderDonutsDemo, renderGeoDemo } from "./demo";
import { loadSiteSelector, precacheSites } from "./sites";
import { cancelledRef, chartAnimState, client, currentPreset, currentSite, customEnd, customStart, dataLoading, demoMode, demoPreset, expandedPage, highlightCode, homeView, lastChartDays, lastDatasets, lastPrevHitsData, lastPrevTotalData, lastUpdatedAt, mapTransformState, progress, refreshTick, setCancelledRef, setChartAnimState, setDataLoading, setDemoPreset, setExpandedPage, setHighlightCode, setLastChartDays, setLastDatasets, setLastPrevHitsData, setLastPrevTotalData, setLastUpdatedAt, setMapTransformState, setProgress, setRefreshTick, setSoftTick, setTrafficData, sitesList, softTick } from "./state";
import { $ } from "./dom";
import { updateFreshness } from "./bridge/status";
import { handleAuthError } from "./bridge/session";
import { drillDetail, renderDonutErr } from "./donut-drill";
import { syncAutoRefresh, syncRealtime, updateRangeUI } from "./params";
import { buildEndpointSet } from "./endpoints";
import { applyLang } from "./lang";
import { initHomeControls, initSiteSettings } from "./bridge/home-controls";
import { applyHash, showDashboard, showHome } from "./bridge/sites-helpers";
import { applyTheme } from "./theme";
import { loadHome, syncTopbarHeight } from "./home";
import { deviceLabel } from "./geo";
import { donutIconFor } from "./icons";
import { getDateRange } from "./datetime";
import { effectiveGroup } from "./series";
import { skeletonCard } from "./render/cards";
import { renderDonut } from "./render/donut";
import { renderGeo, renderReferrers } from "./render/lists";
import { renderKPIs, updateCompareUI } from "./render/chart";
import { renderPages, renderPagesDemo } from "./render/pages";
import { renderLanguages } from "./render/languages";
import { renderCampaignsInto } from "./render/campaigns";
import { closeExpand } from "./render/expand";
import { activatePanelTab } from "./render/tabs";
import { cacheKeyFor } from "./cache";
import { markBooted } from "./boot-status";

export function loadDashboard() {
	$("#connect-screen").hidden = true;
	$("#dash-screen").hidden = false;
	markBooted();
	$("#demo-banner").hidden = !demoMode;
	applyLang();
	applyTheme();
	renderUser();
	syncTopbarHeight();
	updateRangeUI();
	updateCompareUI();
	syncRealtime();
	$("#refresh-btn").addEventListener("click", () => {
		if (client && !demoMode) client.clearCache();
		setRefreshTick((refreshTick as number) + 1);
		if (homeView) loadHome(true);
		else loadData();
	});
	initHomeControls();
	initSiteSettings();
	initFooter();
	syncAutoRefresh();
	const ssBtn = $("#site-settings-btn");
	if (ssBtn) ssBtn.hidden = demoMode;
	if (demoMode) { showHome(); return; }
	window.addEventListener("hashchange", () => { applyHash(); });
	loadSiteSelector().then(() => {
		const deepLink = location.hash && location.hash !== "#/";
		if (deepLink) applyHash();
		else if (sitesList.length > 1) showHome();
		else { showDashboard(); loadData(); }
	}).catch((err) => {
		console.error("[dashboard] site selector failed", err);
	});
}
export async function loadData(opts?: any) {
	// soft = refresco en caliente (auto-refresh): los datos se actualizan en
	// su sitio sin skeletons ni colapsar lo expandido; force = saltarse el
	// TTL de caché de TODOS los endpoints (sin vaciar la caché, que también
	// sirve al precache y a otros sitios).
	const soft = !!(opts && opts.soft);
	const force = !!(opts && opts.force);
	setSoftTick(soft);
	// El flag libera en la FASE CRÍTICA (justo tras pintar KPIs+gráfico+
	// páginas): las tarjetas lazy de abajo esperan al scroll con un
	// IntersectionObserver y la función no vuelve hasta entonces, así que
	// esperar al final dejaría dataLoading pillado para siempre y el
	// auto-refresh nunca saltaría.
	setDataLoading(true);
	cancelledRef.current = true;
	setCancelledRef({ current: false });
	const current = cancelledRef;
	setLastDatasets({});
	setLastPrevTotalData(null);
	setLastPrevHitsData(null);
	setProgress({ fired: 0, done: 0 });
	$("#error-banner").hidden = true;
	if (!soft) {
		setExpandedPage(null);
		setHighlightCode(null);
		setMapTransformState(null);
		closeExpand();
		if (chartAnimState && chartAnimState.cancel) chartAnimState.cancel();
		setChartAnimState(null); // el SVG se va a vaciar: invalida el reuse
		$("#traffic-body").innerHTML = "";
		$("#traffic-body").appendChild(skeletonCard(280));
		$("#grid-kpis").innerHTML = "";
		for (let i = 0; i < 6; i++) {
			const s = document.createElement("div");
			s.className = "kpi kpi-skel";
			s.innerHTML = '<div class="skeleton sk-label"></div><div class="skeleton sk-value"></div>';
			$("#grid-kpis").appendChild(s);
		}
		["pages-body", "languages-body", "referrers-body", "browsers-body", "systems-body", "sizes-body", "geo-map-body", "geo-list-body"].forEach((id) => {
			$("#" + id).innerHTML = "";
			$("#" + id).appendChild(skeletonCard(id === "geo-map-body" ? 280 : 200));
		});
	}
	// Campañas: la pestaña solo existe si el sitio tiene campañas. Se oculta y
	// se limpia en cada carga; si no, al pasar de un sitio con campañas a uno
	// sin ellas la pestaña seguía visible con el skeleton ("cargando" eterno).
	const campsTab = $("#campaigns-tab");
	const campsBody = $("#campaigns-body");
	if (!soft && campsBody) campsBody.innerHTML = "";
	if (campsTab) {
		const campsPanel = document.querySelector('#content-card [data-panel="campaigns"]') as HTMLElement | null;
		if (!campsTab.hidden && campsPanel && !campsPanel.hidden) activatePanelTab("content-card", "pages");
		campsTab.hidden = true;
	}

	const range = getDateRange(currentPreset, customStart, customEnd);
	setLastChartDays(range.days);
	const group = effectiveGroup();

	let prevTotal = null;
	let data: any = null;
	if (demoMode) {
		const preset = currentPreset === "custom" ? (GOATDASH_DEMO.customFallback || "30d") : currentPreset;
		setDemoPreset(preset);
		const built = GOATDASH_DEMO.build(preset);
		data = built.data;
		prevTotal = built.prevTotal;
		setLastPrevTotalData(built.prevTotalData || null);
		setLastPrevHitsData(built.prevHitsData || null);
		setLastUpdatedAt(Date.now());
		renderKPIs(data, prevTotal, group);
		setTrafficData(data);
		renderPagesDemo();
		renderLanguages(data.languages.stats);
		renderReferrers(data.toprefs ? data.toprefs.stats : [], GOATDASH_DEMO.refDetails);
		renderDonutsDemo(data);
		renderGeoDemo(data);
		if (data.campaigns.stats.length) { $("#campaigns-tab").hidden = false; renderCampaignsDemo(data.campaigns.stats); }
		updateFreshness();
		setDataLoading(false);
		return;
	}

	// real mode
	try {
		const eps: any = buildEndpointSet(range);
		const ck = (kind: any) => cacheKeyFor(kind, currentSite);

		// Fase 0 (stale-while-revalidate): si una visita anterior dejó datos
		// de este sitio+rango en caché, se pintan AL INSTANTE (aunque viejos)
		// y la red los refresca en las fases siguientes. Recarga = 0 ms.
		const staleTotal = client._readCache(eps.total, undefined, true, ck("total"));
		const staleHits = client._readCache(eps.hits, undefined, true, ck("hits"));
		if (!soft && staleTotal !== null) {
			const stalePrev = client._readCache(eps.prev, undefined, true, ck("prev"));
			if (stalePrev) setLastPrevTotalData(stalePrev);
			renderKPIs({ total: staleTotal, hits: staleHits || { hits: [] } },
				stalePrev ? (stalePrev.total ?? stalePrev.total_utc ?? null) : null, group);
			if (staleHits) setTrafficData({ total: staleTotal, hits: staleHits });
			if (staleHits) renderPages(staleHits.hits || [], staleHits.more);
			setLastUpdatedAt(Date.now());
		}

		// Lanza TODAS las peticiones del sitio activo en paralelo desde el
		// arranque. Cada tarjeta pinta en cuanto llega SU dato (no hay fases
		// encadenadas): KPIs/gráfico/páginas esperan solo total+hits, la
		// tendencia/idiomas/referencias su grupo, y las tarjetas inferiores
		// (donas/geo/campaigns) ya tienen la petición EN VUELO y su render
		// lazy espera a esa promesa, que suele estar resuelta al scrollear.
		const fire = (kind: any) => client.request(eps[kind], { cacheKey: ck(kind), forceRefresh: force })
			.catch((e: any) => ({ __error: e }));
		const pTotal = fire("total");
		const pHits = fire("hits");
		const pPrev = fire("prev");
		const pLang = fire("languages");
		const pRef = fire("toprefs");
		const pBrowsers = fire("browsers");
		const pSystems = fire("systems");
		const pSizes = fire("sizes");
		const pLocations = fire("locations");
		const pCampaigns = fire("campaigns");

		// Fase crítica: KPIs + gráfico + páginas, solo con total + hits. Para un
		// sitio precacheado ambas están en caché y el cambio de sitio es inmediato.
		const [totalRes, hitsRes] = await Promise.allSettled([pTotal, pHits]);
		if (current.cancelled) return;
		if (totalRes.status === "rejected" && totalRes.reason.kind === "auth") return handleAuthError(totalRes.reason.message);
		if (hitsRes.status === "rejected" && hitsRes.reason.kind === "auth") return handleAuthError(hitsRes.reason.message);
		progress.fired = 5; progress.done = 2;

		data = {
			total: totalRes.status === "fulfilled" && !totalRes.value.__error ? totalRes.value : { total: 0 },
			hits: hitsRes.status === "fulfilled" && !hitsRes.value.__error ? hitsRes.value : { hits: [] },
		};
		renderKPIs(data, null, group);
		setTrafficData(data);
		renderPages(data.hits.hits, data.hits.more);
		setLastUpdatedAt(Date.now());
		// Fase crítica lista: el siguiente auto-refresh puede lanzarse aunque
		// las tarjetas lazy de abajo sigan esperando al scroll.
		setDataLoading(false);
		updateFreshness();

		// Fase secundaria: tendencia (periodo anterior), idiomas y referencias.
		const [prevRes, langRes, refRes] = await Promise.allSettled([pPrev, pLang, pRef]);
		if (current.cancelled) return;
		progress.done = 5;
		data.languages = langRes.status === "fulfilled" && !langRes.value.__error ? langRes.value : { stats: [] };
		prevTotal = prevRes.status === "fulfilled" && !prevRes.value.__error ? (prevRes.value.total ?? prevRes.value.total_utc ?? null) : null;
		setLastPrevTotalData(prevRes.status === "fulfilled" && !prevRes.value.__error ? prevRes.value : lastPrevTotalData);
		renderKPIs(data, prevTotal, group);
		renderLanguages(data.languages.stats);
		renderReferrers(refRes.status === "fulfilled" && !refRes.value.__error ? refRes.value.stats : [], null);
		setLastUpdatedAt(Date.now());
		// lazy tiers
		const lazy = async (key: any, refId: any, renderFn: any) => {
			const target = $(refId);
			if (!target) { await renderFn(); return; }
			await new Promise((resolve) => {
				if (!("IntersectionObserver" in window)) { renderFn().then(resolve); return; }
				const io = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting) {
						io.disconnect();
						renderFn().then(resolve);
					}
				}, { threshold: 0.1 });
				io.observe(target);
			});
		};

		// Tiers lazy en PARALELO entre sí: en un escritorio grande todas las
		// tarjetas son visibles y encadenarlas alarga el pintado completo.
		// La petición ya está en vuelo desde el arranque (fire), así que el
		// render solo espera a que llegue el dato ya solicitado.
		await Promise.all([
			lazy("browsers", "#devices-card", async () => {
				if (current.cancelled) return;
				const [b, s, z] = await Promise.allSettled([pBrowsers, pSystems, pSizes]);
				if (current.cancelled) return;
				const err = (r: any) => (r.status === "fulfilled" ? r.value.__error : r.reason);
				if (b.status === "fulfilled" && !b.value.__error) renderDonut($("#browsers-body"), b.value.stats, { total: b.value.total, page: "browsers", iconFor: donutIconFor("browsers"), onDrill: (item: any, idx: any) => drillDetail("browsers", item, idx) });
				else renderDonutErr("browsers", err(b));
				if (s.status === "fulfilled" && !s.value.__error) renderDonut($("#systems-body"), s.value.stats, { total: s.value.total, page: "systems", iconFor: donutIconFor("systems"), onDrill: (item: any, idx: any) => drillDetail("systems", item, idx) });
				else renderDonutErr("systems", err(s));
				if (z.status === "fulfilled" && !z.value.__error) renderDonut($("#sizes-body"), z.value.stats.map((i: any) => ({ ...i, name: deviceLabel(i.id || i.name) })), { total: z.value.total, page: "sizes", iconFor: donutIconFor("sizes"), onDrill: (item: any, idx: any) => drillDetail("sizes", item, idx) });
				else renderDonutErr("sizes", err(z));
			}),

			lazy("locations", "#geo-card", async () => {
				if (current.cancelled) return;
				const loc = await pLocations;
				if (current.cancelled) return;
				if (loc.__error) {
					if (loc.__error.kind === "auth") return handleAuthError(loc.__error.message);
					throw loc.__error;
				}
				renderGeo($("#geo-map-body"), $("#geo-list-body"), loc.stats, loc.total, client);
			}),

			lazy("campaigns", "#content-card", async () => {
				if (current.cancelled) return;
				const camps = await pCampaigns;
				if (current.cancelled) return;
				const body = $("#campaigns-body");
				const tab = $("#campaigns-tab");
				if (camps.__error) {
					if (camps.__error.kind === "notfound") { if (body) body.innerHTML = ""; if (tab) tab.hidden = true; return; }
					throw camps.__error;
				}
				if (camps.stats && camps.stats.length) {
					tab.hidden = false;
					renderCampaignsInto(body, camps.stats, camps.total);
				} else if (body) {
					body.innerHTML = "";
				}
			}),
		]);

		// Tras pintar el sitio activo (incluidas las tarjetas lazy), calienta
		// en segundo plano la caché del resto de sitios. Va al FINAL
		// a propósito: el precache comparte el rate-limit del servidor y, si se
		// lanza antes, roba slots de arranque a las tarjetas visibles (medido:
		// ~+300ms en las donas). Su reloj de espaciado es independiente (low) y
		// es cancelable al cambiar de sitio.
		precacheSites();
		updateFreshness();
	} catch (e: any) {
		setDataLoading(false);
		if (e.kind === "auth") return handleAuthError(e.message);
		updateFreshness();
	}
}
