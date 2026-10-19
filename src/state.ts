// Runtime state shared across views (one module owner per variable).
import { refreshTrafficChart } from "./render/chart";
import { readAutoRefreshPref } from "./refresh";
import { HOME_SORT_KEY, LANG_KEY, THEME_KEY } from "./settings";
import { tween } from "./util";
import { pickGroup } from "./datetime";

export let lang = localStorage.getItem(LANG_KEY) || "auto";   // modo: es | en | auto (auto = default actual)
export let config: null | { baseURL: string; apiKey: string; me?: any; site?: string | null } = null;        // { baseURL, apiKey, me }
export let demoMode = false;
export let demoPreset = "30d";
export let currentSite: string | null = null;   // selector de sitio: cname o null (cuenta/Host)
export let sitesList: any[] = [];       // [{id, cname}] from /api/v0/sites
export let allowedSiteIDs: Set<number> | null = null; // Set de site_id permitidos por el token ([−1] o ausente = todos)
export let theme = localStorage.getItem(THEME_KEY) || "dark";
export let autoRefreshSec = readAutoRefreshPref();
export let currentPreset = "30d";
export let customStart = "", customEnd = "";
export let lastUpdatedAt: number | null = null;
export let progress = { fired: 0, done: 0 };
export let inFlightRetries = new Set<string>();
export let cancelledRef: { current: boolean; cancelled?: boolean } = { current: false };
export let expandedPage: string | null = null;
export let detailData: Record<string, any[]> = {};      // { key: [{name,count}] }
export let highlightCode: string | null = null;
export let mapTransformState: { s: number; tx: number; ty: number } | null = null; // { s, tx, ty } del mapa visible
export let mapDragMoved = false;
export let mapDragSuppressClick = false;
export let trafficCache: Record<string, any> = {};    // preset -> { points, total }
export let chartMetric = localStorage.getItem("gd.chartMetric") || "visitors"; // visitors | pageviews
export let chartCompare = localStorage.getItem("gd.chartCompare") === "1";     // comparativa con periodo anterior
export let lastChartData: any = null; // { total, hits } último dataset del gráfico (re-render sin refetch)
export let lastChartDays = 30;   // días del rango actual (para pickGroup en auto)
export let lastPrevTotalData: any = null; // respuesta stats/total del periodo anterior (tendencia + comparativa)
export let lastPrevHitsData: any = null;  // respuesta stats/hits del periodo anterior (comparativa de pageviews, lazy)
export let prevHitsPromise: Promise<any> | null = null;   // fetch en vuelo de lastPrevHitsData
export let realtimeTimer: ReturnType<typeof setInterval> | null = null;     // intervalo de auto-refresco del preset realtime
export let lastKPIArgs: [any, any, string] | null = null;   // [data, prevTotal, group] para re-pintar KPIs al cambiar métrica
export let chartAnimState: any = null; // puntos del gráfico de tráfico ya dibujados (tween entre refrescos)
export let softTick = false;      // true mientras dura un refresco en caliente (auto-refresh soft)
export let homeView = false;     // true = la vista activa es el home de tarjetas
export let homeData: any[] = [];        // [{site, isAccount, name, cname, status, visitors, prev, series}]
export let homeQuery = "";       // filtro de búsqueda del home
export let homeSort = (() => {   // orden de las tarjetas (persistido)
	try { return { by: "visitors", dir: "desc", ...JSON.parse(localStorage.getItem(HOME_SORT_KEY) || "{}") }; }
	catch { return { by: "visitors", dir: "desc" }; }
})();
export let pathFilter: { names: string[]; label: string } | null = null;    // { names: string[], label: string } o null (todas las rutas)
export let donutState = new WeakMap<HTMLElement, any>(); // container -> { items, opts } último render de cada dona
export let lastDatasets: Record<string, any> = {};    // kind -> { items, total, more } último dataset renderizado (modal expandir + export CSV)

export function setTrafficData(data: any, days?: any) {
	lastChartData = data;
	if (typeof days === "number") lastChartDays = days;
	refreshTrafficChart();
}

export let switchQuery = "";
export let precacheToken: any = null;
// (customEnd ya se declara arriba junto a customStart)
export let client: any = null;
export let pathsCache = new Map();   // siteKey -> { paths: [...], at: ts }
export let filterDebounce: any = null;
export let autoTimer: any = null;   // intervalo de auto-actualización de los datos (issue #59)
export let homeToken: { cancelled?: boolean } | null = null;
export let settingsSiteId: any = null;
export let refreshTick = 0;
export let rateTimer: any = null;
export let dataLoading = false; // hay una carga (dashboard o home) en curso: no encolar otra

// --- setters (ESM: los bindings importados no se reasignan)
export function setLang(value: any) { lang = value; }
export function setConfig(value: any) { config = value; }
export function setDemoMode(value: any) { demoMode = value; }
export function setDemoPreset(value: any) { demoPreset = value; }
export function setCurrentSite(value: any) { currentSite = value; }
export function setSitesList(value: any) { sitesList = value; }
export function setAllowedSiteIDs(value: any) { allowedSiteIDs = value; }
export function setTheme(value: any) { theme = value; }
export function setAutoRefreshSec(value: any) { autoRefreshSec = value; }
export function setCurrentPreset(value: any) { currentPreset = value; }
export function setCustomStart(value: any) { customStart = value; }
export function setLastUpdatedAt(value: any) { lastUpdatedAt = value; }
export function setInFlightRetries(value: any) { inFlightRetries = value; }
export function setHighlightCode(value: any) { highlightCode = value; }
export function setMapTransformState(value: any) { mapTransformState = value; }
export function setMapDragMoved(value: any) { mapDragMoved = value; }
export function setMapDragSuppressClick(value: any) { mapDragSuppressClick = value; }
export function setChartMetric(value: any) { chartMetric = value; }
export function setChartCompare(value: any) { chartCompare = value; }
export function setLastChartData(value: any) { lastChartData = value; }
export function setLastChartDays(value: any) { lastChartDays = value; }
export function setLastPrevTotalData(value: any) { lastPrevTotalData = value; }
export function setLastPrevHitsData(value: any) { lastPrevHitsData = value; }
export function setPrevHitsPromise(value: any) { prevHitsPromise = value; }
export function setRealtimeTimer(value: any) { realtimeTimer = value; }
export function setLastKPIArgs(value: any) { lastKPIArgs = value; }
export function setChartAnimState(value: any) { chartAnimState = value; }
export function setSoftTick(value: any) { softTick = value; }
export function setHomeView(value: any) { homeView = value; }
export function setHomeData(value: any) { homeData = value; }
export function setHomeQuery(value: any) { homeQuery = value; }
export function setHomeSort(value: any) { homeSort = value; }
export function setPathFilter(value: any) { pathFilter = value; }
export function setDonutState(value: any) { donutState = value; }
export function setLastDatasets(value: any) { lastDatasets = value; }
export function setCustomEnd(value: any) { customEnd = value; }
export function setPrecacheToken(value: any) { precacheToken = value; }
export function setDataLoading(value: any) { dataLoading = value; }
export function setSettingsSiteId(value: any) { settingsSiteId = value; }
export function setRateTimer(value: any) { rateTimer = value; }
export function setAutoTimer(value: any) { autoTimer = value; }
export function setSwitchQuery(value: any) { switchQuery = value; }
export function setPathsCache(value: any) { pathsCache = value; }
export function setFilterDebounce(value: any) { filterDebounce = value; }
export function setHomeToken(value: any) { homeToken = value; }
export function setRefreshTick(value: any) { refreshTick = value; }
export function setClient(value: any) { client = value; }
export function setCancelledRef(value: any) { cancelledRef = value; }
export function setDetailData(value: any) { detailData = value; }
export function setExpandedPage(value: any) { expandedPage = value; }
export function setProgress(value: any) { progress = value; }
export function setTrafficCache(value: any) { trafficCache = value; }
