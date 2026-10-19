"use strict";
(() => {
  (() => {
    "use strict";
    const I18N = {
      es: {
        "app.title": "Goatdash",
        "connect.title": "Analytics sin mirar a nadie.",
        "connect.sub": "Conecta tu instancia de GoatCounter y consulta tus estad\xEDsticas en una interfaz limpia. Sin cookies, sin scripts de terceros, sin servidor.",
        "connect.url": "URL de GoatCounter",
        "connect.key": "API key",
        "connect.connect": "Conectar \u2192",
        "connect.or": "o",
        "connect.demo": "Probar demo \u2192",
        "connect.helpTitle": "\xBFC\xF3mo creo una API key?",
        "connect.helpBody": "En tu instancia de GoatCounter: tu usuario (arriba a la derecha) \u2192 Settings \u2192 pesta\xF1a API \u2192 Create key. Dale permisos \xABCount & Read\xBB y copia la clave.",
        "connect.urlRequired": "Introduce la URL de tu GoatCounter.",
        "connect.urlBad": "Eso no parece una URL v\xE1lida. Prueba por ejemplo https://stats.cloudless.club",
        "connect.keyRequired": "Introduce tu API key.",
        "connect.netErr": "No se pudo contactar {url}. Comprueba que la URL es correcta y que el sitio permite CORS (la mayor\xEDa de instancias de GoatCounter lo permiten). Si usas un bloqueador de anuncios (uBlock Origin, Brave Shields, etc.), prueba a desactivarlo para esta p\xE1gina: los dominios de GoatCounter est\xE1n en las listas de bloqueo habituales.",
        "range.today": "Hoy",
        "range.yesterday": "Ayer",
        "range.realtime": "Tiempo real",
        "range.d7": "\xDAltimos 7 d\xEDas",
        "range.d30": "\xDAltimos 30 d\xEDas",
        "range.d90": "\xDAltimos 90 d\xEDas",
        "range.y1": "\xDAltimos 365 d\xEDas",
        "range.mtd": "Mes en curso",
        "range.ytd": "A\xF1o en curso",
        "range.all": "Siempre",
        "range.custom": "Personalizado",
        "menu.refresh": "\u21BB Actualizar datos",
        "menu.theme": "Tema: {tema}",
        "menu.lang": "Idioma: {idioma}",
        "theme.dark": "Oscuro",
        "theme.light": "Claro",
        "theme.auto": "Auto",
        "theme.toLight": "Cambiar a tema claro",
        "theme.toDark": "Cambiar a tema oscuro",
        "menu.disconnect": "Desconectar",
        "menu.export": "Exportar CSV",
        "export.pages": "P\xE1ginas",
        "export.referrers": "Referencias",
        "export.browsers": "Navegadores",
        "export.systems": "Sistemas",
        "export.devices": "Dispositivos",
        "export.geo": "Ubicaci\xF3n",
        "export.campaigns": "Campa\xF1as",
        "export.notLoaded": "A\xFAn no hay datos cargados para este conjunto",
        "menu.settings": "Ajustes",
        "menu.about": "Acerca de",
        "menu.checkUpdates": "Comprobar actualizaciones",
        "menu.updateToken": "Token de actualizaci\xF3n",
        "update.tokenPrompt": "Pega el token de actualizaci\xF3n del servidor (vac\xEDo para borrarlo):",
        "menu.autoRefresh": "Actualizaci\xF3n autom\xE1tica: {opt}",
        "refresh.off": "Desactivada",
        "refresh.1m": "Cada minuto",
        "refresh.5m": "Cada 5 min",
        "update.upToDate": "Ya est\xE1s al d\xEDa (v{v}).",
        "update.err": "No se pudo comprobar la \xFAltima versi\xF3n.",
        "about.version": "Versi\xF3n {v}",
        "about.repo": "Ver c\xF3digo fuente",
        "about.close": "Cerrar",
        "user.demo": "Demo",
        "topbar.theme": "Tema",
        "demo.banner": "\u{1F4CA} Viendo datos de demo \xB7 Conecta tu GoatCounter para ver anal\xEDtica real",
        "demo.connect": "Conectar \u2192",
        "card.traffic": "Visitantes en el tiempo",
        "card.pages": "P\xE1ginas principales",
        "card.languages": "Idiomas",
        "card.browsers": "Navegadores",
        "card.systems": "Sistemas",
        "card.devices": "Dispositivos",
        "card.countries": "Pa\xEDses",
        "card.campaigns": "Campa\xF1as",
        "card.referrers": "Referencias",
        "channel.direct": "Directo",
        "channel.search": "Buscadores",
        "channel.campaign": "Campa\xF1as",
        "channel.other": "Otros sitios",
        "event.badge": "evento",
        "kpi.events": "Eventos",
        "filter.placeholder": "Filtrar por ruta\u2026",
        "filter.clear": "Quitar filtro",
        "filter.noMatch": "Sin coincidencias",
        "filter.loading": "Buscando\u2026",
        "filter.section": "Secci\xF3n {q} ({n} rutas)",
        "filter.applied": "Filtrando por: {q}",
        "ref.empty": "Sin referencias en este rango.",
        "ref.emptyHint": "Ampl\xEDa el rango para ver de d\xF3nde vienen tus visitas.",
        "ref.widen": "Ampliar rango",
        "top.refPages": "P\xE1ginas desde {name}",
        "ref.noData": "Sin p\xE1ginas desde este referrer.",
        "kpi.visitors": "Visitantes \xFAnicos",
        "kpi.pageviews": "P\xE1ginas vistas",
        "kpi.lastHour": "Activos \xFAltima hora",
        "kpi.lastHourSub": "estimado por hora",
        "kpi.toppage": "P\xE1gina principal",
        "kpi.paths": "Rutas rastreadas",
        "kpi.vsPrev": "vs periodo anterior",
        "kpi.hits": "{n} visitas",
        "kpi.distinct": "URLs distintas en el rango",
        "preset.today": "hoy",
        "preset.yesterday": "ayer",
        "preset.realtime": "tiempo real",
        "preset.d7": "\xFAltimos 7 d\xEDas",
        "preset.d30": "\xFAltimos 30 d\xEDas",
        "preset.d90": "\xFAltimos 90 d\xEDas",
        "preset.y1": "\xFAltimo a\xF1o",
        "preset.mtd": "mes en curso",
        "preset.ytd": "a\xF1o en curso",
        "preset.all": "desde siempre",
        "preset.custom": "rango seleccionado",
        "kpi.perVisit": "por visita",
        "lang.hint": "Idioma del navegador del visitante",
        "chart.compare": "Comparar",
        "chart.current": "Periodo actual",
        "chart.previous": "Periodo anterior",
        "chart.compareNoRealtime": "La comparativa no est\xE1 disponible en tiempo real",
        "chart.tooltip": "P\xE1ginas vistas",
        "chart.empty": "Sin datos de tr\xE1fico para este periodo.",
        "top.showAll": "Ver todo ({n})",
        "top.showLess": "Ver menos",
        "top.referrers": "Principales referencias de {path}",
        "top.noRef": "Sin referencias rastreadas.",
        "top.direct": "(directo)",
        "top.unknown": "(desconocido)",
        "detail.breakdown": "Desglose de {name}",
        "detail.back": "Volver",
        "detail.noData": "Sin datos de detalle.",
        "err.failed": "No se pudo cargar",
        "err.retry": "\u21BB Reintentar",
        "err.banner": "Algunas secciones no cargaron: {keys}. Reintenta cada tarjeta con su bot\xF3n \u2014 una sola petici\xF3n suele funcionar cuando se rellena el l\xEDmite de peticiones.",
        "err.401": "La API key no es v\xE1lida. Comprueba que copiaste la clave completa sin espacios extra.",
        "err.403": "La API key no tiene permiso de lectura. Ve a ajustes de tu GoatCounter, pesta\xF1a API, y crea una clave con acceso \xABRead only\xBB o \xABCount & Read\xBB.",
        "err.forbidden": "Tu API key no tiene acceso a este sitio. Pide al administrador de GoatCounter que la habilite para \xE9l.",
        "err.notfound": "No encontrado: {endpoint}. Comprueba que la URL apunta a tu sitio de GoatCounter (no a una sub-ruta).",
        "err.rate": "L\xEDmite de peticiones alcanzado.",
        "err.rateBanner": "El servidor est\xE1 limitando las peticiones. Mostrando datos recientes; reintento en {sec} s.",
        "err.req": "Petici\xF3n fallida: {status}",
        "no.data": "Sin datos.",
        "no.pages": "Sin datos de p\xE1ginas.",
        "loading": "Cargando {n} de {total}\u2026",
        "updated": "Actualizado {t}",
        "updated.now": "justo ahora",
        "updated.s": "hace {s}s",
        "updated.m": "hace {m}m",
        "updated.h": "hace {h}h",
        "foot": "Goatdash \xB7 dashboard de GoatCounter \xB7 c\xF3digo abierto",
        "foot.star": "Dame una estrella",
        "device.phone": "Tel\xE9fonos",
        "device.tablet": "Tablets",
        "device.desktop": "Port\xE1til / sobremesa",
        "device.desktophd": "Pantalla HD",
        "device.unknown": "Desconocido",
        "lang.name": "Espa\xF1ol",
        "home.title": "Sitios",
        "home.searchPlaceholder": "Buscar sitio\u2026",
        "home.sortVisitors": "Visitantes",
        "home.sortName": "Nombre",
        "home.dirAsc": "Orden ascendente",
        "home.dirDesc": "Orden descendente",
        "home.visitors24": "Visitantes \xB7 \xFAltimas 24h",
        "home.vsPrev": "vs 24h anteriores",
        "home.noResults": "Ning\xFAn sitio coincide con la b\xFAsqueda.",
        "home.go": "Inicio",
        "home.back": "Volver",
        "home.account": "Cuenta",
        "menu.siteSettings": "Configuraci\xF3n del sitio",
        "settings.title": "Configuraci\xF3n del sitio",
        "settings.collect": "Qu\xE9 se recolecta",
        "settings.collectReferrer": "Referencias (referrer)",
        "settings.collectUserAgent": "User-Agent (navegador y sistema)",
        "settings.collectScreenSize": "Tama\xF1o de pantalla",
        "settings.collectLocation": "Ubicaci\xF3n (pa\xEDs)",
        "settings.collectLocationRegion": "Regiones (subdivisiones del pa\xEDs)",
        "settings.collectLanguage": "Idioma del navegador",
        "settings.collectSessions": "Sesiones",
        "settings.ignoreIps": "IPs ignoradas",
        "settings.ignoreIpsHint": "Una IP por l\xEDnea o separadas por comas. El tr\xE1fico desde estas IPs no se cuenta.",
        "settings.retention": "Retenci\xF3n de datos (d\xEDas)",
        "settings.retentionHint": "0 = sin l\xEDmite. Los hits m\xE1s antiguos se borran peri\xF3dicamente.",
        "settings.readonly": "Tu API key solo tiene permiso de lectura: puedes ver la configuraci\xF3n pero no editarla.",
        "settings.saved": "Guardado.",
        "settings.save": "Guardar",
        "settings.close": "Cerrar",
        "settings.saveError": "No se pudo guardar: {msg}",
        "map.zoomIn": "Acercar",
        "map.zoomOut": "Alejar",
        "map.reset": "Restablecer mapa",
        "map.dragHint": "Arrastra para mover \xB7 Rueda para zoom",
        "tab.map": "Mapa",
        "tab.list": "Lista",
        "card.traffic.visitors": "Visitantes en el tiempo",
        "card.traffic.pageviews": "P\xE1ginas vistas en el tiempo",
        "expand.open": "Expandir",
        "expand.close": "Cerrar",
        "group.sources": "Fuentes",
        "group.content": "Contenido",
        "group.devices": "Dispositivos",
        "group.geo": "Ubicaci\xF3n",
        "geo.noRegions": "Sin datos de regiones para este pa\xEDs.",
        "geo.regions": "Regiones de {name}"
      },
      en: {
        "app.title": "Goatdash",
        "connect.title": "Analytics without spying on anyone.",
        "connect.sub": "Connect your GoatCounter instance and browse your stats in a clean interface. No cookies, no third-party scripts, no server.",
        "connect.url": "GoatCounter URL",
        "connect.key": "API key",
        "connect.connect": "Connect \u2192",
        "connect.or": "or",
        "connect.demo": "Try Demo \u2192",
        "connect.helpTitle": "How do I create an API key?",
        "connect.helpBody": "In your GoatCounter instance: your user (top right) \u2192 Settings \u2192 API tab \u2192 Create key. Grant \u201CCount & Read\u201D and copy the key.",
        "connect.urlRequired": "Please enter your GoatCounter URL.",
        "connect.urlBad": "That doesn't look like a valid URL. Try e.g. https://stats.cloudless.club",
        "connect.keyRequired": "Please enter your API key.",
        "connect.netErr": "Could not reach {url}. Check the URL is correct and the site supports CORS (most GoatCounter instances do). If you have an ad blocker (uBlock Origin, Brave Shields, etc.), try disabling it for this page \u2014 GoatCounter domains are on common filter lists.",
        "range.today": "Today",
        "range.yesterday": "Yesterday",
        "range.realtime": "Realtime",
        "range.d7": "Last 7 days",
        "range.d30": "Last 30 days",
        "range.d90": "Last 90 days",
        "range.y1": "Last 365 days",
        "range.mtd": "Month to date",
        "range.ytd": "Year to date",
        "range.all": "All time",
        "range.custom": "Custom",
        "menu.refresh": "\u21BB Refresh data",
        "menu.theme": "Theme: {tema}",
        "menu.lang": "Language: {idioma}",
        "theme.dark": "Dark",
        "theme.light": "Light",
        "theme.auto": "Auto",
        "theme.toLight": "Switch to light theme",
        "theme.toDark": "Switch to dark theme",
        "menu.disconnect": "Disconnect",
        "menu.export": "Export CSV",
        "export.pages": "Pages",
        "export.referrers": "Referrers",
        "export.browsers": "Browsers",
        "export.systems": "Systems",
        "export.devices": "Devices",
        "export.geo": "Location",
        "export.campaigns": "Campaigns",
        "export.notLoaded": "No data loaded for this dataset yet",
        "menu.settings": "Settings",
        "menu.about": "About",
        "menu.checkUpdates": "Check for updates",
        "menu.updateToken": "Update token",
        "update.tokenPrompt": "Paste the server update token (empty to clear it):",
        "menu.autoRefresh": "Auto-refresh: {opt}",
        "refresh.off": "Off",
        "refresh.1m": "Every minute",
        "refresh.5m": "Every 5 min",
        "update.upToDate": "You are up to date (v{v}).",
        "update.err": "Could not check for the latest version.",
        "about.version": "Version {v}",
        "about.repo": "View source code",
        "about.close": "Close",
        "user.demo": "Demo",
        "topbar.theme": "Theme",
        "demo.banner": "\u{1F4CA} Viewing demo data \xB7 Connect your GoatCounter to see real analytics",
        "demo.connect": "Connect \u2192",
        "card.traffic": "Visitors over time",
        "card.pages": "Top pages",
        "card.languages": "Languages",
        "card.browsers": "Browsers",
        "card.systems": "Systems",
        "card.devices": "Devices",
        "card.countries": "Countries",
        "card.campaigns": "Campaigns",
        "card.referrers": "Referrers",
        "channel.direct": "Direct",
        "channel.search": "Search",
        "channel.campaign": "Campaigns",
        "channel.other": "Other sites",
        "event.badge": "event",
        "kpi.events": "Events",
        "filter.placeholder": "Filter by path\u2026",
        "filter.clear": "Clear filter",
        "filter.noMatch": "No matches",
        "filter.loading": "Searching\u2026",
        "filter.section": "Section {q} ({n} paths)",
        "filter.applied": "Filtering by: {q}",
        "ref.empty": "No referrers in this range.",
        "ref.emptyHint": "Widen the range to see where visitors come from.",
        "ref.widen": "Widen range",
        "top.refPages": "Pages from {name}",
        "ref.noData": "No pages from this referrer.",
        "kpi.visitors": "Total visitors",
        "kpi.pageviews": "Pageviews",
        "kpi.lastHour": "Active last hour",
        "kpi.lastHourSub": "hourly estimate",
        "kpi.toppage": "Top page",
        "kpi.paths": "Tracked paths",
        "kpi.vsPrev": "vs previous period",
        "kpi.hits": "{n} hits",
        "kpi.distinct": "distinct URLs in range",
        "preset.today": "today",
        "preset.yesterday": "yesterday",
        "preset.realtime": "realtime",
        "preset.d7": "last 7 days",
        "preset.d30": "last 30 days",
        "preset.d90": "last 90 days",
        "preset.y1": "last year",
        "preset.mtd": "month to date",
        "preset.ytd": "year to date",
        "preset.all": "all time",
        "preset.custom": "selected range",
        "kpi.perVisit": "per visit",
        "lang.hint": "Visitor's browser language",
        "chart.compare": "Compare",
        "chart.current": "Current period",
        "chart.previous": "Previous period",
        "chart.compareNoRealtime": "Comparison is not available in realtime",
        "chart.tooltip": "Pageviews",
        "chart.empty": "No traffic data for this period.",
        "top.showAll": "Show all ({n})",
        "top.showLess": "Show less",
        "top.referrers": "Top referrers for {path}",
        "top.noRef": "No referrers tracked.",
        "top.direct": "(direct)",
        "top.unknown": "(unknown)",
        "detail.breakdown": "{name} breakdown",
        "detail.back": "Back",
        "detail.noData": "No detail data.",
        "err.failed": "Failed to load",
        "err.retry": "\u21BB Retry",
        "err.banner": "Some sections couldn't load: {keys}. Retry each card individually below \u2014 single requests usually succeed once the rate limit refills.",
        "err.401": "API key not recognized. Please check you copied the full key with no extra spaces.",
        "err.403": "API key lacks read permission. Go to your GoatCounter settings, API tab, and create a key with \u201CRead only\u201D or \u201CCount & Read\u201D access.",
        "err.forbidden": "Your API key does not have access to this site. Ask your GoatCounter administrator to enable it.",
        "err.notfound": "Not found: {endpoint}. Check that the URL points to your GoatCounter site (not a sub-path).",
        "err.rate": "Rate limit hit.",
        "err.rateBanner": "The server is rate limiting requests. Showing recent data; retrying in {sec} s.",
        "err.req": "Request failed: {status}",
        "no.data": "No data.",
        "no.pages": "No page data.",
        "loading": "Loading {n} of {total}\u2026",
        "updated": "Updated {t}",
        "updated.now": "just now",
        "updated.s": "{s}s ago",
        "updated.m": "{m}m ago",
        "updated.h": "{h}h ago",
        "foot": "Goatdash \xB7 a GoatCounter dashboard \xB7 open source",
        "foot.star": "Give me a star",
        "device.phone": "Phones",
        "device.tablet": "Tablets",
        "device.desktop": "Laptop/Desktop",
        "device.desktophd": "HD Display",
        "device.unknown": "Unknown",
        "lang.name": "English",
        "home.title": "Sites",
        "home.searchPlaceholder": "Search sites\u2026",
        "home.sortVisitors": "Visitors",
        "home.sortName": "Name",
        "home.dirAsc": "Ascending order",
        "home.dirDesc": "Descending order",
        "home.visitors24": "Visitors \xB7 last 24h",
        "home.vsPrev": "vs previous 24h",
        "home.noResults": "No sites match your search.",
        "home.go": "Home",
        "home.back": "Back",
        "home.account": "Account",
        "menu.siteSettings": "Site settings",
        "settings.title": "Site settings",
        "settings.collect": "What is collected",
        "settings.collectReferrer": "Referrers",
        "settings.collectUserAgent": "User-Agent (browser and system)",
        "settings.collectScreenSize": "Screen size",
        "settings.collectLocation": "Location (country)",
        "settings.collectLocationRegion": "Regions (country subdivisions)",
        "settings.collectLanguage": "Browser language",
        "settings.collectSessions": "Sessions",
        "settings.ignoreIps": "Ignored IPs",
        "settings.ignoreIpsHint": "One IP per line or comma-separated. Traffic from these IPs is not counted.",
        "settings.retention": "Data retention (days)",
        "settings.retentionHint": "0 = no limit. Hits older than this are periodically deleted.",
        "settings.readonly": "Your API key is read-only: you can view this configuration but not edit it.",
        "settings.saved": "Saved.",
        "settings.save": "Save",
        "settings.close": "Close",
        "settings.saveError": "Could not save: {msg}",
        "map.zoomIn": "Zoom in",
        "map.zoomOut": "Zoom out",
        "map.reset": "Reset map",
        "map.dragHint": "Drag to pan \xB7 Wheel to zoom",
        "tab.map": "Map",
        "tab.list": "List",
        "card.traffic.visitors": "Visitors over time",
        "card.traffic.pageviews": "Pageviews over time",
        "expand.open": "Expand",
        "expand.close": "Close",
        "group.sources": "Sources",
        "group.content": "Content",
        "group.devices": "Devices",
        "group.geo": "Location",
        "geo.noRegions": "No region data for this country.",
        "geo.regions": "Regions of {name}"
      }
    };
    const $ = (sel) => document.querySelector(sel);
    const VERSION = "1.0.16";
    const REPO_URL = "https://github.com/gnacho/goatdash";
    const STORAGE_KEY = "gc-dashboard-config-v1";
    const HOME_SORT_KEY = "gc-home-sort-v1";
    const THEME_KEY = "gc-dashboard-theme-v1";
    const LANG_KEY = "gc-dashboard-lang-v1";
    const REFRESH_KEY = "gc-auto-refresh-v1";
    const CACHE_PREFIX = "gc-cache:";
    const CACHE_TTL_MS = 6e4;
    const CACHE_PRUNE_MS = 10 * 6e4;
    const REQUEST_SPACING_MS = 30;
    const REQUEST_SPACING_CROSS_ORIGIN = 30;
    const PRECACHE_SPACING_MS = 100;
    const RATE_LOW_WATERMARK = 6;
    const RATE_WAIT_CAP_MS = 3e4;
    const MAX_CONCURRENCY = 8;
    const DEVICE_LABELS = { phone: "device.phone", tablet: "device.tablet", desktop: "device.desktop", desktophd: "device.desktophd", unknown: "device.unknown" };
    let lang = localStorage.getItem(LANG_KEY) || "auto";
    let config = null;
    let demoMode = false;
    let demoPreset = "30d";
    let currentSite = null;
    let sitesList = [];
    let allowedSiteIDs = null;
    let theme = localStorage.getItem(THEME_KEY) || "dark";
    let autoRefreshSec = readAutoRefreshPref();
    let currentPreset = "30d";
    let customStart = "", customEnd = "";
    let lastUpdatedAt = null;
    let progress = { fired: 0, done: 0 };
    let inFlightRetries = /* @__PURE__ */ new Set();
    let cancelledRef = { current: false };
    let expandedPage = null;
    let detailData = {};
    let highlightCode = null;
    let mapTransformState = null;
    let mapDragMoved = false;
    let mapDragSuppressClick = false;
    let trafficCache = {};
    let chartMetric = localStorage.getItem("gd.chartMetric") || "visitors";
    let chartCompare = localStorage.getItem("gd.chartCompare") === "1";
    let lastChartData = null;
    let lastChartDays = 30;
    let lastPrevTotalData = null;
    let lastPrevHitsData = null;
    let prevHitsPromise = null;
    let realtimeTimer = null;
    let lastKPIArgs = null;
    let chartAnimState = null;
    let softTick = false;
    let homeView = false;
    let homeData = [];
    let homeQuery = "";
    let homeSort = (() => {
      try {
        return { by: "visitors", dir: "desc", ...JSON.parse(localStorage.getItem(HOME_SORT_KEY) || "{}") };
      } catch {
        return { by: "visitors", dir: "desc" };
      }
    })();
    let pathFilter = null;
    let donutState = /* @__PURE__ */ new WeakMap();
    let lastDatasets = {};
    const t = (key, vars) => {
      let s = I18N[currentLang()]?.[key] ?? I18N.es[key];
      if (s === void 0) s = key;
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
      return s;
    };
    const THEME_MQ = window.matchMedia("(prefers-color-scheme: dark)");
    const LANG_NATIVE = { es: "Espa\xF1ol", en: "English", auto: "Auto" };
    function resolveTheme() {
      return THEME_MQ.matches ? "dark" : "light";
    }
    function resolveLang() {
      return (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
    }
    function currentLang() {
      return lang === "auto" ? resolveLang() : lang;
    }
    function themeName() {
      return t("theme." + theme);
    }
    function langName() {
      return LANG_NATIVE[lang] || lang;
    }
    function readAutoRefreshPref() {
      const raw = parseInt(localStorage.getItem(REFRESH_KEY) || "", 10);
      if (raw === 0 || raw === 60 || raw === 300) return raw;
      return 300;
    }
    function autoRefreshName() {
      if (!autoRefreshSec) return t("refresh.off");
      if (autoRefreshSec >= 300) return t("refresh.5m");
      return t("refresh.1m");
    }
    function updateAutoRefreshUI() {
      const lbl = $("#autorefresh-btn");
      if (lbl) lbl.textContent = t("menu.autoRefresh", { opt: autoRefreshName() });
      document.querySelectorAll("[data-refresh-option]").forEach((btn) => {
        const active = parseInt(btn.dataset.refreshOption, 10) === autoRefreshSec;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-checked", String(active));
      });
    }
    function applyTheme() {
      const resolved = theme === "auto" ? resolveTheme() : theme;
      document.documentElement.setAttribute("data-theme", resolved);
      safeStore(THEME_KEY, theme);
      updateThemeUI();
    }
    function updateThemeUI() {
      const lbl = $("#theme-btn");
      if (lbl) lbl.textContent = t("menu.theme", { tema: themeName() });
      const group = $("#theme-menu");
      if (group) group.querySelectorAll("[data-theme-option]").forEach((btn) => {
        const active = btn.dataset.themeOption === theme;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-checked", String(active));
      });
    }
    function applyLang() {
      const resolved = currentLang();
      document.documentElement.lang = resolved;
      safeStore(LANG_KEY, lang);
      document.title = t("app.title");
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = t(el.dataset.i18n);
      });
      document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
        el.setAttribute("alt", t(el.dataset.i18nAlt));
      });
      updateLangUI();
      updateThemeUI();
      updateAutoRefreshUI();
      renderHomeControls();
      updateRangeUI();
      updateCompareUI();
      if (homeView) renderHome();
    }
    function updateLangUI() {
      const menuBtn = $("#lang-btn");
      if (menuBtn) menuBtn.textContent = t("menu.lang", { idioma: langName() });
      const toggle = $("#lang-toggle");
      if (toggle) toggle.textContent = langName();
      document.querySelectorAll("[data-lang-option]").forEach((btn) => {
        const active = btn.dataset.langOption === lang;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-checked", String(active));
      });
      const chip = $("#user-chip");
      if (chip) chip.setAttribute("title", t("menu.settings"));
      const aboutClose = $("#about-close");
      if (aboutClose) aboutClose.setAttribute("aria-label", t("about.close"));
      document.querySelectorAll(".expand-btn").forEach((b) => b.setAttribute("aria-label", t("expand.open")));
      const expandClose = $("#expand-close");
      if (expandClose) expandClose.setAttribute("aria-label", t("expand.close"));
      const pathInput = $("#path-filter-input");
      if (pathInput) {
        pathInput.setAttribute("placeholder", t("filter.placeholder"));
        pathInput.setAttribute("aria-label", t("filter.placeholder"));
      }
      const chipClear = $("#filter-chip-clear");
      if (chipClear) chipClear.setAttribute("aria-label", t("filter.clear"));
      if (pathFilter && pathFilter.label) {
        const chipLabel = $("#filter-chip-label");
        if (chipLabel) chipLabel.textContent = t("filter.applied", { q: pathFilter.label });
      }
      const homeSearch = $("#home-search");
      if (homeSearch) homeSearch.setAttribute("placeholder", t("home.searchPlaceholder"));
      const swSearch = $("#site-switch-search");
      if (swSearch) swSearch.setAttribute("placeholder", t("home.searchPlaceholder"));
      renderHomeControls();
      renderSiteSwitch();
    }
    function renderHomeControls() {
      const sel = $("#home-sort");
      if (!sel) return;
      const cur = sel.value || homeSort.by;
      sel.innerHTML = "";
      [["visitors", t("home.sortVisitors")], ["name", t("home.sortName")]].forEach(([v, label]) => {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = label;
        sel.appendChild(o);
      });
      sel.value = cur;
      const dir = $("#home-dir");
      if (dir) {
        const asc = homeSort.dir === "asc";
        dir.setAttribute("aria-label", asc ? t("home.dirAsc") : t("home.dirDesc"));
        dir.setAttribute("title", asc ? "\u2191" : "\u2193");
        dir.classList.toggle("desc", !asc);
      }
    }
    const SUBMENU_TRIGGERS = ["#theme-btn", "#lang-btn", "#lang-toggle", "#export-btn", "#autorefresh-btn"];
    function renderUser() {
      const chip = $("#user-chip");
      const avatar = $("#user-avatar");
      const email = $("#user-email");
      if (!chip) return;
      if (demoMode || !config || !config.me || !config.me.user || !config.me.user.email) {
        if (avatar) avatar.textContent = "D";
        if (email) email.textContent = t("user.demo");
        chip.title = t("user.demo");
        return;
      }
      const em = config.me.user.email;
      if (avatar) avatar.textContent = (em.charAt(0) || "?").toUpperCase();
      if (email) email.textContent = em;
      chip.title = em;
    }
    function closeSubmenus() {
      document.querySelectorAll(".submenu").forEach((el) => {
        el.hidden = true;
      });
      SUBMENU_TRIGGERS.forEach((sel) => {
        const el = $(sel);
        if (el) el.setAttribute("aria-expanded", "false");
      });
    }
    function toggleSubmenu(menuSel, btnSel) {
      const menu = $(menuSel);
      const btn = $(btnSel);
      const willOpen = menu.hidden;
      closeSubmenus();
      menu.hidden = !willOpen;
      btn.setAttribute("aria-expanded", String(willOpen));
    }
    function safeStore(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        try {
          pruneCache();
          localStorage.setItem(key, value);
        } catch {
        }
      }
    }
    function pruneCache() {
      try {
        const cutoff = Date.now() - CACHE_PRUNE_MS;
        const doomed = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (!k || !k.startsWith(CACHE_PREFIX)) continue;
          try {
            const raw = localStorage.getItem(k);
            if (!raw) {
              doomed.push(k);
              continue;
            }
            const { timestamp } = JSON.parse(raw);
            if (typeof timestamp !== "number" || timestamp < cutoff) doomed.push(k);
          } catch {
            doomed.push(k);
          }
        }
        doomed.forEach((k) => localStorage.removeItem(k));
      } catch {
      }
    }
    class APIClient {
      baseURL;
      apiKey;
      siteBaseURL;
      _knownBases;
      _inflight;
      _waitersHigh;
      _waitersLow;
      _nextStart;
      _nextStartLow;
      _remaining;
      _resetAt;
      onRateLimited = null;
      constructor(baseURL, apiKey) {
        this.baseURL = baseURL.replace(/\/+$/, "");
        this.apiKey = apiKey;
        this.siteBaseURL = null;
        this._knownBases = /* @__PURE__ */ new Set([this.baseURL]);
        this._inflight = 0;
        this._waitersHigh = [];
        this._waitersLow = [];
        this._nextStart = 0;
        this._nextStartLow = 0;
        this._remaining = null;
        this._resetAt = 0;
      }
      clearCache() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (!k || !k.startsWith(CACHE_PREFIX)) continue;
          if ([...this._knownBases].some((b) => k.startsWith(CACHE_PREFIX + b + ":"))) keys.push(k);
        }
        keys.forEach((k) => localStorage.removeItem(k));
      }
      // Resuelve la base de URL para un endpoint. `site`:
      //  - cname: subsitio concreto (precache) -> https://<cname>
      //  - null:  cuenta, siempre contra baseURL (/me, /sites)
      //  - undefined: sitio activo (siteBaseURL) o, si no hay, la cuenta.
      _baseFor(site) {
        let base;
        if (site === null) base = this.baseURL;
        else if (site) base = "https://" + site;
        else base = this.siteBaseURL || this.baseURL;
        this._knownBases.add(base);
        return base;
      }
      // `cacheKey` explícita: las URLs llevan timestamps al minuto y cambian
      // en cada recarga; con clave por preset la caché sobrevive recargas.
      _cacheKey(endpoint, site, cacheKey) {
        return CACHE_PREFIX + this._baseFor(site) + ":" + (cacheKey || endpoint);
      }
      _readCache(endpoint, site, allowStale = false, cacheKey) {
        try {
          const raw = localStorage.getItem(this._cacheKey(endpoint, site, cacheKey));
          if (!raw) return null;
          const { data, timestamp } = JSON.parse(raw);
          if (!allowStale && Date.now() - timestamp > CACHE_TTL_MS) return null;
          return data;
        } catch {
          return null;
        }
      }
      _writeCache(endpoint, data, site, cacheKey) {
        try {
          localStorage.setItem(this._cacheKey(endpoint, site, cacheKey), JSON.stringify({ data, timestamp: Date.now() }));
        } catch {
        }
      }
      async _fetchOnce(endpoint, site, method = "GET", body) {
        const headers = { Authorization: "Bearer " + this.apiKey };
        if (body !== void 0) headers["Content-Type"] = "application/json";
        const res = await fetch(this._baseFor(site) + endpoint, {
          method,
          headers,
          body: body !== void 0 ? JSON.stringify(body) : void 0
        });
        this._observeRate(res);
        if (res.status === 401) {
          const err = new Error(t("err.401"));
          err.kind = "auth";
          throw err;
        }
        if (res.status === 403) {
          const err = new Error(t("err.forbidden"));
          err.kind = "forbidden";
          throw err;
        }
        if (res.status === 404) {
          const err = new Error(t("err.notfound", { endpoint }));
          err.kind = "notfound";
          throw err;
        }
        if (res.status === 429) {
          const err = new Error(t("err.rate"));
          err.kind = "rate";
          const ra = res.headers.get("retry-after");
          if (ra !== null && ra !== "") {
            const n = parseFloat(ra);
            if (!Number.isNaN(n)) err.retryAfter = n;
          }
          throw err;
        }
        if (!res.ok) {
          let body2;
          try {
            body2 = await res.json();
          } catch {
            body2 = null;
          }
          const msg = body2 && body2.error ? body2.error : t("err.req", { status: res.status });
          throw new Error(msg);
        }
        return res.json();
      }
      _observeRate(res) {
        const rem = res.headers.get("x-rate-limit-remaining");
        if (rem !== null && rem !== "") {
          const n = parseInt(rem, 10);
          if (!Number.isNaN(n)) this._remaining = n;
        }
        const reset = res.headers.get("x-rate-limit-reset");
        if (reset !== null && reset !== "") {
          const n = parseInt(reset, 10);
          if (!Number.isNaN(n) && n > 0) this._resetAt = Date.now() + n * 1e3;
        }
        const ra = res.headers.get("retry-after");
        if (ra !== null && ra !== "") {
          const n = parseFloat(ra);
          if (!Number.isNaN(n) && n > 0) this._resetAt = Date.now() + n * 1e3;
        }
      }
      async _acquire(priority) {
        if (this._inflight >= MAX_CONCURRENCY) {
          const waiters = priority === "low" ? this._waitersLow : this._waitersHigh;
          await new Promise((resolve) => waiters.push(resolve));
        }
        this._inflight++;
      }
      _release() {
        this._inflight--;
        const next = this._waitersHigh.shift() || this._waitersLow.shift();
        if (next) next();
      }
      async _space(spacing, priority = "high") {
        const clock = priority === "low" ? "_nextStartLow" : "_nextStart";
        const now = Date.now();
        let effSpacing = spacing;
        if (this._remaining !== null && this._remaining <= RATE_LOW_WATERMARK) {
          effSpacing = spacing * 3;
        }
        let start = Math.max(this[clock], now);
        if (this._remaining === 0 && this._resetAt > start) {
          start = Math.min(this._resetAt, now + RATE_WAIT_CAP_MS);
        }
        this[clock] = start + effSpacing;
        const wait = start - Date.now();
        if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      }
      _backoff(e, attempt) {
        if (e && typeof e.retryAfter === "number" && e.retryAfter > 0) return e.retryAfter * 1e3;
        return 700 + attempt * 1e3 + Math.random() * 200;
      }
      async request(endpoint, { retries = 2, forceRefresh = false, site, priority = "high", signal, cacheKey, method = "GET", body } = {}) {
        const isWrite = method !== "GET";
        if (!isWrite && !forceRefresh) {
          const cached = this._readCache(endpoint, site, false, cacheKey);
          if (cached !== null) return cached;
        }
        if (signal && signal.cancelled) return null;
        await this._acquire(priority);
        try {
          if (signal && signal.cancelled) return null;
          const crossOrigin = this._baseFor(site) !== location.origin;
          const spacing = priority === "low" ? PRECACHE_SPACING_MS : crossOrigin ? REQUEST_SPACING_CROSS_ORIGIN : REQUEST_SPACING_MS;
          await this._space(spacing, priority);
          if (signal && signal.cancelled) return null;
          let lastErr;
          for (let attempt = 0; attempt <= retries; attempt++) {
            try {
              const data = await this._fetchOnce(endpoint, site, method, body);
              if (!isWrite) this._writeCache(endpoint, data, site, cacheKey);
              return data;
            } catch (e) {
              lastErr = e;
              const retriable = e instanceof TypeError || e.kind === "rate";
              if (!retriable || attempt === retries) break;
              await new Promise((r) => setTimeout(r, Math.min(this._backoff(e, attempt), RATE_WAIT_CAP_MS)));
            }
          }
          if (!isWrite && lastErr && lastErr.kind === "rate") {
            const stale = this._readCache(endpoint, site, true, cacheKey);
            if (stale !== null) {
              if (typeof this.onRateLimited === "function") this.onRateLimited(lastErr);
              return stale;
            }
            if (typeof this.onRateLimited === "function") this.onRateLimited(lastErr);
          }
          throw lastErr;
        } finally {
          this._release();
        }
      }
    }
    let client = null;
    function getDateRange(preset, cs, ce) {
      const now = /* @__PURE__ */ new Date();
      now.setSeconds(0, 0);
      let start, end = now;
      if (preset === "today" || preset === "realtime") {
        start = new Date(now);
        start.setHours(0, 0, 0, 0);
      } else if (preset === "yesterday") {
        start = new Date(now);
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setHours(23, 0, 0, 0);
      } else if (preset === "7d" || preset === "30d" || preset === "90d" || preset === "365d") {
        const days2 = parseInt(preset);
        start = new Date(now);
        start.setDate(start.getDate() - days2);
      } else if (preset === "mtd") {
        start = new Date(now);
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
      } else if (preset === "ytd") {
        start = new Date(now);
        start.setMonth(0, 1);
        start.setHours(0, 0, 0, 0);
      } else if (preset === "all") {
        start = new Date(2e3, 0, 1, 0, 0, 0, 0);
      } else {
        if (!cs || !ce) {
          return getDateRange("30d", null, null);
        }
        start = /* @__PURE__ */ new Date(cs + "T00:00:00");
        end = /* @__PURE__ */ new Date(ce + "T23:00:00");
      }
      const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 864e5));
      return { start, end, days };
    }
    function getPreviousRange(start, end) {
      const span = end - start;
      return { start: new Date(start.getTime() - span), end: new Date(end.getTime() - span) };
    }
    function pickGroup(days) {
      if (days <= 2) return "hour";
      if (days <= 92) return "day";
      if (days <= 731) return "week";
      return "month";
    }
    const RANGE_I18N = {
      today: "today",
      yesterday: "yesterday",
      realtime: "realtime",
      "7d": "d7",
      "30d": "d30",
      "90d": "d90",
      "365d": "y1",
      mtd: "mtd",
      ytd: "ytd",
      all: "all",
      custom: "custom"
    };
    const RANGE_I18N_MAP = RANGE_I18N;
    function presetLabel(p) {
      return t("preset." + (RANGE_I18N_MAP[p] || "custom"));
    }
    function rangeLabel(p) {
      return t("range." + (RANGE_I18N_MAP[p] || "custom"));
    }
    const ENDPOINTS = {
      total: "total",
      hits: "hits",
      browsers: "browsers",
      systems: "systems",
      sizes: "sizes",
      locations: "locations",
      languages: "languages",
      campaigns: "campaigns",
      toprefs: "toprefs"
    };
    function endpointFor(key, start, end, extra = "") {
      const iso = (d) => d.toISOString();
      const q = `?start=${encodeURIComponent(iso(start))}&end=${encodeURIComponent(iso(end))}`;
      let path = `/api/v0/stats/${ENDPOINTS[key]}`;
      if (key === "hits") path += pathFilterQS() ? "?limit=100" : "?limit=20";
      return path + (path.includes("?") ? "&" : "?") + q.replace(/^\?/, "") + extra;
    }
    function pathFilterQS() {
      if (!pathFilter || !pathFilter.names || !pathFilter.names.length) return "";
      return "&include_paths=" + encodeURIComponent(pathFilter.names.join(",")) + "&path_by_name=true";
    }
    function buildEndpointSet(range) {
      const prev = getPreviousRange(range.start, range.end);
      const f = pathFilterQS();
      return {
        total: endpointFor("total", range.start, range.end, f),
        hits: endpointFor("hits", range.start, range.end, f),
        prev: endpointFor("total", prev.start, prev.end, f),
        languages: endpointFor("languages", range.start, range.end),
        toprefs: endpointFor("toprefs", range.start, range.end, "&limit=50"),
        browsers: endpointFor("browsers", range.start, range.end),
        systems: endpointFor("systems", range.start, range.end),
        sizes: endpointFor("sizes", range.start, range.end),
        locations: endpointFor("locations", range.start, range.end),
        campaigns: endpointFor("campaigns", range.start, range.end)
      };
    }
    function cacheNS() {
      const base = currentPreset === "custom" ? `c:${customStart || ""}:${customEnd || ""}` : `p:${currentPreset}`;
      return base + (pathFilter ? ":f:" + pathFilter.names.join("|") : "");
    }
    function cacheKeyFor(kind, site) {
      return (site ? `s:${site}:` : "a:") + cacheNS() + ":" + kind;
    }
    function fmtNum(n) {
      if (n === null || n === void 0) return "\u2014";
      if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
      if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
      return String(Math.round(n));
    }
    function tween(dur, onFrame) {
      const t0 = performance.now();
      let raf = 0, dead = false;
      const cancel = () => {
        dead = true;
        cancelAnimationFrame(raf);
      };
      const step = (now) => {
        if (dead) return;
        const p = Math.min(1, (now - t0) / dur);
        onFrame(1 - Math.pow(1 - p, 3));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return cancel;
    }
    function animateNum(el, to, dur = 600) {
      const from = typeof el._numLast === "number" ? el._numLast : 0;
      to = Number(to) || 0;
      el._numLast = to;
      if (el._numTween) el._numTween();
      if (from === to) {
        el.textContent = fmtNum(to);
        return;
      }
      el._numTween = tween(dur, (e) => {
        el.textContent = fmtNum(Math.round(from + (to - from) * e));
      });
    }
    function fmtPct(n) {
      const v = n >= 0 ? "+" : "\u2212";
      return v + Math.abs(n).toFixed(1) + "%";
    }
    function relTime(ts) {
      const s = Math.max(0, Math.floor((Date.now() - ts) / 1e3));
      if (s < 5) return t("updated.now");
      if (s < 60) return t("updated.s", { s });
      if (s < 3600) return t("updated.m", { m: Math.floor(s / 60) });
      return t("updated.h", { h: Math.floor(s / 3600) });
    }
    const COUNTRY_NAME_TO_CODE = {
      "United States": "US",
      "Spain": "ES",
      "Germany": "DE",
      "United Kingdom": "GB",
      "France": "FR",
      "Netherlands": "NL",
      "Canada": "CA",
      "Brazil": "BR",
      "India": "IN",
      "Poland": "PL",
      "Japan": "JP",
      "Australia": "AU",
      "Sweden": "SE",
      "Italy": "IT",
      "Mexico": "MX",
      "Switzerland": "CH",
      "Portugal": "PT",
      "Belgium": "BE",
      "Austria": "AT",
      "Denmark": "DK",
      "Norway": "NO",
      "Ireland": "IE",
      "Czechia": "CZ",
      "Argentina": "AR",
      "Chile": "CL",
      "Colombia": "CO",
      "Peru": "PE",
      "Romania": "RO",
      "Ukraine": "UA",
      "Greece": "GR",
      "Finland": "FI",
      "New Zealand": "NZ",
      "South Africa": "ZA",
      "Turkey": "TR",
      "United Arab Emirates": "AE",
      "Singapore": "SG",
      "Thailand": "TH",
      "South Korea": "KR",
      "Taiwan": "TW",
      "Russia": "RU"
    };
    function countryNameToCode(name) {
      const NAME_TO_CODE = COUNTRY_NAME_TO_CODE;
      if (NAME_TO_CODE[name]) return NAME_TO_CODE[name];
      if (window.WORLD_MAP_NAMES && window.WORLD_MAP_NAMES[name]) return window.WORLD_MAP_NAMES[name];
      return null;
    }
    const COUNTRY_FLAGS = {
      "United States": "\u{1F1FA}\u{1F1F8}",
      "Spain": "\u{1F1EA}\u{1F1F8}",
      "Germany": "\u{1F1E9}\u{1F1EA}",
      "United Kingdom": "\u{1F1EC}\u{1F1E7}",
      "France": "\u{1F1EB}\u{1F1F7}",
      "Netherlands": "\u{1F1F3}\u{1F1F1}",
      "Canada": "\u{1F1E8}\u{1F1E6}",
      "Brazil": "\u{1F1E7}\u{1F1F7}",
      "India": "\u{1F1EE}\u{1F1F3}",
      "Poland": "\u{1F1F5}\u{1F1F1}",
      "Japan": "\u{1F1EF}\u{1F1F5}",
      "Australia": "\u{1F1E6}\u{1F1FA}",
      "Sweden": "\u{1F1F8}\u{1F1EA}",
      "Italy": "\u{1F1EE}\u{1F1F9}",
      "Mexico": "\u{1F1F2}\u{1F1FD}",
      "Switzerland": "\u{1F1E8}\u{1F1ED}",
      "Portugal": "\u{1F1F5}\u{1F1F9}",
      "Belgium": "\u{1F1E7}\u{1F1EA}",
      "Austria": "\u{1F1E6}\u{1F1F9}",
      "Denmark": "\u{1F1E9}\u{1F1F0}",
      "Norway": "\u{1F1F3}\u{1F1F4}",
      "Ireland": "\u{1F1EE}\u{1F1EA}",
      "Czechia": "\u{1F1E8}\u{1F1FF}",
      "Argentina": "\u{1F1E6}\u{1F1F7}",
      "Chile": "\u{1F1E8}\u{1F1F1}",
      "Colombia": "\u{1F1E8}\u{1F1F4}",
      "Peru": "\u{1F1F5}\u{1F1EA}",
      "Romania": "\u{1F1F7}\u{1F1F4}",
      "Ukraine": "\u{1F1FA}\u{1F1E6}",
      "Greece": "\u{1F1EC}\u{1F1F7}",
      "Finland": "\u{1F1EB}\u{1F1EE}",
      "New Zealand": "\u{1F1F3}\u{1F1FF}",
      "South Africa": "\u{1F1FF}\u{1F1E6}",
      "Turkey": "\u{1F1F9}\u{1F1F7}",
      "United Arab Emirates": "\u{1F1E6}\u{1F1EA}",
      "Singapore": "\u{1F1F8}\u{1F1EC}",
      "Thailand": "\u{1F1F9}\u{1F1ED}",
      "South Korea": "\u{1F1F0}\u{1F1F7}",
      "Taiwan": "\u{1F1F9}\u{1F1FC}",
      "Russia": "\u{1F1F7}\u{1F1FA}"
    };
    function flagFor(name) {
      return COUNTRY_FLAGS[name] || "\u{1F310}";
    }
    function languageName(code) {
      const norm = String(code || "").replace("_", "-");
      try {
        const dn = new Intl.DisplayNames([currentLang()], { type: "language" });
        const n = dn.of(norm);
        if (n && n.toLowerCase() !== norm.toLowerCase()) return n.charAt(0).toUpperCase() + n.slice(1);
      } catch {
      }
      return code;
    }
    function flagEmoji(cc) {
      if (!/^[A-Za-z]{2}$/.test(cc || "")) return "";
      return String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 127462 + c.charCodeAt(0) - 65));
    }
    const LANG_REGION_FALLBACK = {
      en: "GB",
      es: "ES",
      de: "DE",
      fr: "FR",
      pt: "PT",
      it: "IT",
      nl: "NL",
      ja: "JP",
      zh: "CN",
      ko: "KR",
      ru: "RU",
      ar: "SA",
      hi: "IN",
      pl: "PL",
      tr: "TR",
      uk: "UA",
      sv: "SE",
      cs: "CZ",
      da: "DK",
      fi: "FI",
      no: "NO",
      el: "GR",
      he: "IL",
      id: "ID",
      vi: "VN",
      th: "TH"
    };
    function langFlag(code) {
      const norm = String(code || "").replace("_", "-");
      const m = /-([A-Za-z]{2})(?:-|$)/.exec(norm);
      if (m) return flagEmoji(m[1]);
      const base = norm.toLowerCase().split("-")[0];
      const LRF = LANG_REGION_FALLBACK;
      return LRF[base] ? flagEmoji(LRF[base]) : "";
    }
    function deviceLabel(id) {
      return t(DEVICE_LABELS[id] || "device.unknown");
    }
    const ICON_BRAND_PATHS = {
      "googlechrome": "M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z",
      "firefoxbrowser": "M8.824 7.287c.008 0 .004 0 0 0zm-2.8-1.4c.006 0 .003 0 0 0zm16.754 2.161c-.505-1.215-1.53-2.528-2.333-2.943.654 1.283 1.033 2.57 1.177 3.53l.002.02c-1.314-3.278-3.544-4.6-5.366-7.477-.091-.147-.184-.292-.273-.446a3.545 3.545 0 01-.13-.24 2.118 2.118 0 01-.172-.46.03.03 0 00-.027-.03.038.038 0 00-.021 0l-.006.001a.037.037 0 00-.01.005L15.624 0c-2.585 1.515-3.657 4.168-3.932 5.856a6.197 6.197 0 00-2.305.587.297.297 0 00-.147.37c.057.162.24.24.396.17a5.622 5.622 0 012.008-.523l.067-.005a5.847 5.847 0 011.957.222l.095.03a5.816 5.816 0 01.616.228c.08.036.16.073.238.112l.107.055a5.835 5.835 0 01.368.211 5.953 5.953 0 012.034 2.104c-.62-.437-1.733-.868-2.803-.681 4.183 2.09 3.06 9.292-2.737 9.02a5.164 5.164 0 01-1.513-.292 4.42 4.42 0 01-.538-.232c-1.42-.735-2.593-2.121-2.74-3.806 0 0 .537-2 3.845-2 .357 0 1.38-.998 1.398-1.287-.005-.095-2.029-.9-2.817-1.677-.422-.416-.622-.616-.8-.767a3.47 3.47 0 00-.301-.227 5.388 5.388 0 01-.032-2.842c-1.195.544-2.124 1.403-2.8 2.163h-.006c-.46-.584-.428-2.51-.402-2.913-.006-.025-.343.176-.389.206-.406.29-.787.616-1.136.974-.397.403-.76.839-1.085 1.303a9.816 9.816 0 00-1.562 3.52c-.003.013-.11.487-.19 1.073-.013.09-.026.181-.037.272a7.8 7.8 0 00-.069.667l-.002.034-.023.387-.001.06C.386 18.795 5.593 24 12.016 24c5.752 0 10.527-4.176 11.463-9.661.02-.149.035-.298.052-.448.232-1.994-.025-4.09-.753-5.844z",
      "safari": "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm-.004.953h.006c.063 0 .113.05.113.113v1.842c0 .063-.05.113-.113.113h-.006a.112.112 0 0 1-.113-.113V1.066c0-.063.05-.113.113-.113zm-.941.041c.056.001.104.046.11.104l.077.918a.112.112 0 0 1-.101.12h-.01a.11.11 0 0 1-.12-.1l-.08-.919a.112.112 0 0 1 .102-.12h.01l.012-.003zm1.892 0H12.965a.113.113 0 0 1 .103.121l-.08.92a.111.111 0 0 1-.12.102h-.009a.111.111 0 0 1-.101-.121l.078-.92a.112.112 0 0 1 .111-.102zm-2.838.123a.11.11 0 0 1 .106.092l.32 1.818c.01.06-.03.119-.09.13l-.01.001a.111.111 0 0 1-.128-.09l-.32-1.818a.111.111 0 0 1 .09-.129l.01-.002a.103.103 0 0 1 .022-.002zm3.784.002h.021l.008.002c.061.01.102.07.092.131l-.32 1.814c-.011.062-.07.101-.132.09h-.005a.113.113 0 0 1-.092-.13l.32-1.815a.111.111 0 0 1 .108-.092zm-4.715.203c.048.002.09.035.103.084l.239.893a.112.112 0 0 1-.079.139l-.005.001a.114.114 0 0 1-.14-.08l-.237-.894a.11.11 0 0 1 .078-.137l.006-.002a.123.123 0 0 1 .035-.004zm5.644 0a.11.11 0 0 1 .033.004l.006.002c.06.016.097.079.08.139l-.24.892a.112.112 0 0 1-.137.08l-.005-.002a.114.114 0 0 1-.08-.138l.24-.893a.112.112 0 0 1 .103-.084zm-6.562.285a.11.11 0 0 1 .107.073L9 3.42a.107.107 0 0 1-.064.139l-.012.005a.11.11 0 0 1-.14-.066L8.15 1.76a.11.11 0 0 1 .065-.14l.014-.005a.106.106 0 0 1 .03-.008zm7.469.002c.014 0 .028.001.042.006l.012.006c.057.02.087.082.067.139l-.633 1.738a.11.11 0 0 1-.14.066l-.013-.003A.11.11 0 0 1 15 3.42l.633-1.738a.108.108 0 0 1 .096-.073zm-8.352.366a.112.112 0 0 1 .105.064l.393.838a.112.112 0 0 1-.055.148l-.008.004a.11.11 0 0 1-.146-.054l-.395-.838a.112.112 0 0 1 .055-.149l.008-.004a.11.11 0 0 1 .043-.01zm9.246 0a.11.11 0 0 1 .043.01l.006.003a.11.11 0 0 1 .053.149l-.391.838a.112.112 0 0 1-.148.054l-.006-.002a.112.112 0 0 1-.055-.148l.393-.84a.112.112 0 0 1 .105-.064zm-10.092.44c.04-.002.08.018.102.056l.922 1.597a.113.113 0 0 1-.041.155l-.006.002a.113.113 0 0 1-.154-.041l-.922-1.598a.113.113 0 0 1 .04-.154l.007-.002a.11.11 0 0 1 .052-.016zm10.94.001c.018 0 .035.004.052.014l.004.002a.114.114 0 0 1 .041.156l-.923 1.596a.114.114 0 0 1-.157.04l-.004-.001a.112.112 0 0 1-.04-.155l.925-1.595a.113.113 0 0 1 .102-.057zM5.729 2.93a.11.11 0 0 1 .093.047l.532.753a.114.114 0 0 1-.028.159l-.004.002a.114.114 0 0 1-.158-.028l-.531-.752a.114.114 0 0 1 .027-.158l.006-.002a.113.113 0 0 1 .063-.021zm12.542 0a.11.11 0 0 1 .063.02l.006.003a.112.112 0 0 1 .027.156l-.531.756a.112.112 0 0 1-.156.028l-.006-.004a.112.112 0 0 1-.028-.157l.532-.755a.11.11 0 0 1 .093-.047zm.747.578a.11.11 0 0 1 .08.027l.006.004c.047.04.053.111.013.158L17.932 5.11a.11.11 0 0 1-.157.016l-.005-.006a.11.11 0 0 1-.014-.156l1.185-1.414a.114.114 0 0 1 .077-.041zM4.984 3.51a.11.11 0 0 1 .077.039L6.244 4.96a.112.112 0 0 1-.014.158l-.003.004a.112.112 0 0 1-.159-.014L4.883 3.697a.112.112 0 0 1 .013-.158l.006-.004a.111.111 0 0 1 .082-.025zm-.714.64c.027 0 .055.01.076.032l.658.66a.107.107 0 0 1 0 .152l-.01.01a.107.107 0 0 1-.152 0l-.66-.658a.11.11 0 0 1 0-.155l.01-.01a.111.111 0 0 1 .078-.03zm15.462 0c.028 0 .055.01.077.032l.007.007a.109.109 0 0 1 0 .155l-.658.66a.109.109 0 0 1-.154 0l-.008-.008a.109.109 0 0 1 0-.154l.658-.66a.11.11 0 0 1 .078-.032zm.707.66c.038 0 .071.02.092.075a.112.112 0 0 1-.023.117l-7.606 8.08c-3.084 2.024-6.149 4.04-9.222 6.05-.078.051-.17.082-.211-.028a.112.112 0 0 1 .023-.118l7.594-8.08c3.084-2.023 6.161-4.039 9.234-6.049a.247.247 0 0 1 .12-.046zm-16.824.045a.109.109 0 0 1 .08.026l1.416 1.187a.11.11 0 0 1 .014.157l-.006.005a.11.11 0 0 1-.156.014L3.549 5.057a.109.109 0 0 1-.014-.155l.006-.007a.108.108 0 0 1 .074-.04zm17.336.756c.036 0 .072.017.094.05l.004.003a.114.114 0 0 1-.028.158l-.753.53a.112.112 0 0 1-.157-.028l-.004-.004a.114.114 0 0 1 .028-.158l.754-.53a.113.113 0 0 1 .062-.02zm-17.904.002c.02 0 .042.007.06.02l.76.531c.05.035.06.103.026.152l-.006.01a.109.109 0 0 1-.153.026l-.76-.532a.109.109 0 0 1-.025-.152l.006-.01a.108.108 0 0 1 .092-.045zm-.512.803c.018 0 .036.006.053.016l1.596.923a.111.111 0 0 1 .04.153l-.003.006a.111.111 0 0 1-.153.04L2.473 6.63a.111.111 0 0 1-.041-.152l.004-.006a.11.11 0 0 1 .1-.055zm18.932 0a.11.11 0 0 1 .1.055l.001.004a.113.113 0 0 1-.04.154l-1.596.926a.113.113 0 0 1-.155-.041l-.002-.004a.113.113 0 0 1 .041-.155l1.596-.925a.115.115 0 0 1 .055-.014zm-19.373.846c.014 0 .029.003.043.01l.838.392a.11.11 0 0 1 .052.147l-.004.01a.11.11 0 0 1-.146.052l-.838-.393a.11.11 0 0 1-.053-.146l.004-.01a.109.109 0 0 1 .104-.062zm19.81.002a.11.11 0 0 1 .106.062l.002.008a.11.11 0 0 1-.053.146l-.838.393a.11.11 0 0 1-.146-.053l-.004-.008a.11.11 0 0 1 .052-.146l.838-.393a.11.11 0 0 1 .043-.01zm-20.183.88c.014 0 .028.001.043.006l1.732.631a.112.112 0 0 1 .067.145l-.002.006a.11.11 0 0 1-.143.066l-1.732-.63a.113.113 0 0 1-.069-.145l.002-.004a.115.115 0 0 1 .102-.074zm20.549 0a.113.113 0 0 1 .11.075l.003.004a.115.115 0 0 1-.069.146l-1.732.629a.112.112 0 0 1-.145-.066l-.001-.006a.113.113 0 0 1 .068-.145l1.732-.63a.11.11 0 0 1 .034-.006zm-20.836.909a.11.11 0 0 1 .033.004l.892.24c.06.016.096.077.08.137l-.002.007a.11.11 0 0 1-.136.079l-.895-.239a.113.113 0 0 1-.078-.138l.002-.006a.113.113 0 0 1 .104-.084zm21.13.002a.115.115 0 0 1 .106.084v.004a.112.112 0 0 1-.078.138l-.893.239a.112.112 0 0 1-.138-.079v-.005a.112.112 0 0 1 .078-.14l.892-.237a.11.11 0 0 1 .033-.004zm-21.335.93.023.001 1.814.323c.062.01.101.069.09.13v.006a.111.111 0 0 1-.13.09l-1.815-.322a.113.113 0 0 1-.092-.131l.002-.006a.11.11 0 0 1 .108-.092zm21.519.001h.022c.052.002.1.038.109.092v.006c.01.062-.03.12-.092.13l-1.814.321a.113.113 0 0 1-.131-.092v-.005a.113.113 0 0 1 .092-.131l1.814-.32zm-21.644.944h.011l.922.084a.11.11 0 0 1 .102.119l-.002.01a.11.11 0 0 1-.121.1l-.922-.083a.11.11 0 0 1-.1-.12v-.009a.111.111 0 0 1 .11-.101zm21.779.002h.012c.056 0 .106.043.11.101v.008a.111.111 0 0 1-.1.121l-.923.08a.111.111 0 0 1-.12-.101v-.008a.111.111 0 0 1 .1-.121l.92-.08zm-11.82.73L6.091 16.95c2.02-1.324 4.039-2.646 6.066-3.976l-1.095-1.31zm11.87.219c.063 0 .114.05.114.113v.004c0 .063-.05.113-.113.113l-1.844.004a.113.113 0 0 1-.113-.113v-.004c0-.063.05-.113.113-.113l1.844-.004zm-21.869.002h1.844c.062 0 .112.05.112.111v.008c0 .062-.05.111-.112.111H1.064a.111.111 0 0 1-.11-.111v-.008c0-.061.049-.111.11-.111zm.952.875h.011a.11.11 0 0 1 .11.101v.006a.111.111 0 0 1-.102.121l-.922.08a.11.11 0 0 1-.119-.101l-.002-.006a.111.111 0 0 1 .102-.121l.922-.08zm19.955 0h.011l.922.08a.11.11 0 0 1 .102.119v.008a.112.112 0 0 1-.121.101l-.922-.08a.11.11 0 0 1-.102-.119v-.008a.111.111 0 0 1 .11-.101zm-18.924.705c.053.001.098.04.107.094l.002.004c.011.061-.03.12-.092.13l-1.812.32a.113.113 0 0 1-.13-.091v-.004a.115.115 0 0 1 .09-.133l1.811-.318a.117.117 0 0 1 .024-.002zm17.902 0c.008 0 .016 0 .024.002l1.816.32c.061.011.1.07.09.131v.004a.113.113 0 0 1-.131.092l-1.816-.32a.112.112 0 0 1-.09-.131v-.004a.113.113 0 0 1 .107-.094zM2.332 14.477a.11.11 0 0 1 .104.082l.002.005c.016.06-.02.121-.08.137l-.891.24a.112.112 0 0 1-.137-.08l-.002-.006a.112.112 0 0 1 .08-.136l.89-.239a.112.112 0 0 1 .034-.003zm19.332 0c.011 0 .024 0 .035.003l.893.239c.06.016.096.077.08.136l-.002.006a.111.111 0 0 1-.137.078l-.894-.238a.111.111 0 0 1-.078-.137l.002-.005a.109.109 0 0 1 .101-.082zm-18.213.517a.11.11 0 0 1 .11.074l.002.004a.112.112 0 0 1-.067.145l-1.732.63a.113.113 0 0 1-.145-.068l-.002-.004a.113.113 0 0 1 .069-.144L3.418 15a.11.11 0 0 1 .033-.006zm17.086 0c.015 0 .029 0 .043.006l1.734.63a.111.111 0 0 1 .067.143l-.002.008a.111.111 0 0 1-.143.067l-1.734-.631a.111.111 0 0 1-.066-.143l.002-.008a.111.111 0 0 1 .1-.072zM2.92 16.117a.109.109 0 0 1 .103.063l.004.01a.108.108 0 0 1-.052.144l-.838.393a.11.11 0 0 1-.147-.055l-.004-.008a.11.11 0 0 1 .053-.146l.838-.391a.112.112 0 0 1 .043-.01zm18.158 0a.11.11 0 0 1 .043.01l.838.39c.056.027.08.093.055.149l-.002.004a.112.112 0 0 1-.149.055l-.838-.391a.112.112 0 0 1-.054-.148l.002-.004a.112.112 0 0 1 .105-.065zm-16.957.315c.04-.001.078.02.1.056l.004.004a.11.11 0 0 1-.041.153l-1.596.921a.113.113 0 0 1-.154-.04l-.002-.005a.113.113 0 0 1 .04-.154l1.596-.922a.109.109 0 0 1 .053-.013zm15.756 0c.018 0 .036.004.053.013l1.597.924a.11.11 0 0 1 .041.152l-.002.004a.11.11 0 0 1-.152.041l-1.598-.921a.113.113 0 0 1-.04-.155l.001-.002a.111.111 0 0 1 .1-.056zm.328 1.193a.11.11 0 0 1 .06.021l.758.534c.05.035.061.102.026.152l-.004.008a.111.111 0 0 1-.154.027l-.756-.535a.109.109 0 0 1-.028-.152l.006-.008a.11.11 0 0 1 .092-.047zm-16.412.002c.035 0 .072.016.094.047l.004.008a.109.109 0 0 1-.028.152l-.756.531a.108.108 0 0 1-.152-.025l-.006-.008a.109.109 0 0 1 .028-.152l.755-.534a.107.107 0 0 1 .061-.019zm15.162.102a.112.112 0 0 1 .082.025l1.414 1.187a.11.11 0 0 1 .014.157l-.004.004a.113.113 0 0 1-.158.013L18.89 17.93a.11.11 0 0 1-.014-.157l.004-.005a.108.108 0 0 1 .074-.04zm-12.812 1.12a.11.11 0 0 1 .08.026l.007.008a.11.11 0 0 1 .014.154L5.06 20.451a.11.11 0 0 1-.155.012l-.008-.006a.11.11 0 0 1-.013-.154l1.185-1.414a.11.11 0 0 1 .075-.04zm11.703 0c.032 0 .065.015.088.042l1.181 1.41c.04.048.035.12-.013.16l-.002.002a.114.114 0 0 1-.16-.014l-1.182-1.41a.114.114 0 0 1 .013-.16l.002-.002a.115.115 0 0 1 .073-.027zm-12.928.114c.027 0 .054.01.074.031l.014.012a.107.107 0 0 1 0 .15l-.662.66a.105.105 0 0 1-.149 0l-.011-.011a.105.105 0 0 1 0-.149l.66-.662a.105.105 0 0 1 .074-.031zm14.164 0c.027 0 .053.01.074.031l.66.662a.106.106 0 0 1 0 .15l-.011.012a.106.106 0 0 1-.15-.002l-.66-.66a.106.106 0 0 1 .001-.15l.01-.012a.108.108 0 0 1 .076-.031zm-11.627.797c.018 0 .034.006.05.015l.007.004a.11.11 0 0 1 .04.15l-.921 1.598a.11.11 0 0 1-.15.041l-.008-.004a.111.111 0 0 1-.04-.152l.922-1.596a.113.113 0 0 1 .1-.056zm9.088.002a.11.11 0 0 1 .1.054l.925 1.596a.113.113 0 0 1-.04.154h-.005a.11.11 0 0 1-.152-.039l-.926-1.595a.113.113 0 0 1 .041-.155l.004-.002a.108.108 0 0 1 .053-.013zm-10.285.324c.021 0 .043.008.062.021l.004.002c.051.036.063.106.028.157l-.53.755a.112.112 0 0 1-.156.028l-.004-.002a.112.112 0 0 1-.027-.156l.53-.756a.113.113 0 0 1 .093-.05zm11.484.002c.036 0 .072.015.094.047l.53.756c.035.05.023.12-.028.156l-.004.002a.112.112 0 0 1-.156-.028l-.53-.755a.112.112 0 0 1 .028-.157l.004-.002a.112.112 0 0 1 .062-.02zm-8.863.342a.11.11 0 0 1 .043.006l.012.005c.056.02.084.081.064.137l-.633 1.74a.105.105 0 0 1-.136.063l-.014-.004a.106.106 0 0 1-.065-.137l.633-1.74a.107.107 0 0 1 .096-.07zm6.232 0a.107.107 0 0 1 .106.07l.633 1.738a.107.107 0 0 1-.065.137l-.015.006a.107.107 0 0 1-.137-.065L15 20.578a.107.107 0 0 1 .064-.137l.014-.005a.117.117 0 0 1 .033-.006zm-4.695.41c.008 0 .014 0 .021.002l.006.002c.062.01.101.067.09.129l-.318 1.812a.113.113 0 0 1-.131.092l-.004-.002a.111.111 0 0 1-.092-.129l.32-1.812a.113.113 0 0 1 .108-.094zm3.146.002c.008-.002.015 0 .022 0a.111.111 0 0 1 .107.092l.32 1.812c.012.061-.03.12-.091.131l-.004.002a.113.113 0 0 1-.13-.092l-.321-1.812a.113.113 0 0 1 .092-.131l.005-.002zm-5.79.119a.11.11 0 0 1 .042.01l.004.002a.114.114 0 0 1 .055.15l-.393.834a.112.112 0 0 1-.148.055l-.004-.002a.112.112 0 0 1-.055-.149l.393-.836a.112.112 0 0 1 .105-.064zm8.458 0a.108.108 0 0 1 .104.062l.39.84a.11.11 0 0 1-.052.147l-.008.004a.11.11 0 0 1-.146-.055l-.391-.838a.11.11 0 0 1 .053-.146l.008-.004a.11.11 0 0 1 .042-.01zm-4.236.018H12c.063 0 .115.05.115.113l.002 1.84c0 .063-.05.113-.113.113h-.006a.113.113 0 0 1-.113-.113l-.004-1.838c0-.063.05-.115.113-.115zm-2.592.578c.011 0 .022 0 .034.004l.005.002c.06.016.095.077.079.136l-.24.893a.111.111 0 0 1-.137.078l-.006-.002a.111.111 0 0 1-.078-.137l.24-.89a.113.113 0 0 1 .103-.084zm5.196.002a.11.11 0 0 1 .103.082l.24.89a.11.11 0 0 1-.078.137l-.006.002a.11.11 0 0 1-.136-.078l-.24-.89a.11.11 0 0 1 .078-.138l.005-.002a.112.112 0 0 1 .034-.003zm-3.475.302h.01l.008.002c.061.006.107.06.101.121l-.08.92a.112.112 0 0 1-.121.102h-.008a.11.11 0 0 1-.1-.121l.08-.922a.111.111 0 0 1 .11-.102zm1.736 0h.02a.11.11 0 0 1 .107.102l.08.924a.11.11 0 0 1-.101.119l-.008.002a.11.11 0 0 1-.12-.102l-.08-.924a.112.112 0 0 1 .102-.12z",
      "microsoftedge": "M21.86 17.86q.14 0 .25.12.1.13.1.25t-.11.33l-.32.46-.43.53-.44.5q-.21.25-.38.42l-.22.23q-.58.53-1.34 1.04-.76.51-1.6.91-.86.4-1.74.64t-1.67.24q-.9 0-1.69-.28-.8-.28-1.48-.78-.68-.5-1.22-1.17-.53-.66-.92-1.44-.38-.77-.58-1.6-.2-.83-.2-1.67 0-1 .32-1.96.33-.97.87-1.8.14.95.55 1.77.41.82 1.02 1.5.6.68 1.38 1.21.78.54 1.64.9.86.36 1.77.56.92.2 1.8.2 1.12 0 2.18-.24 1.06-.23 2.06-.72l.2-.1.2-.05zm-15.5-1.27q0 1.1.27 2.15.27 1.06.78 2.03.51.96 1.24 1.77.74.82 1.66 1.4-1.47-.2-2.8-.74-1.33-.55-2.48-1.37-1.15-.83-2.08-1.9-.92-1.07-1.58-2.33T.36 14.94Q0 13.54 0 12.06q0-.81.32-1.49.31-.68.83-1.23.53-.55 1.2-.96.66-.4 1.35-.66.74-.27 1.5-.39.78-.12 1.55-.12.7 0 1.42.1.72.12 1.4.35.68.23 1.32.57.63.35 1.16.83-.35 0-.7.07-.33.07-.65.23v-.02q-.63.28-1.2.74-.57.46-1.05 1.04-.48.58-.87 1.26-.38.67-.65 1.39-.27.71-.42 1.44-.15.72-.15 1.38zM11.96.06q1.7 0 3.33.39 1.63.38 3.07 1.15 1.43.77 2.62 1.93 1.18 1.16 1.98 2.7.49.94.76 1.96.28 1 .28 2.08 0 .89-.23 1.7-.24.8-.69 1.48-.45.68-1.1 1.22-.64.53-1.45.88-.54.24-1.11.36-.58.13-1.16.13-.42 0-.97-.03-.54-.03-1.1-.12-.55-.1-1.05-.28-.5-.19-.84-.5-.12-.09-.23-.24-.1-.16-.1-.33 0-.15.16-.35.16-.2.35-.5.2-.28.36-.68.16-.4.16-.95 0-1.06-.4-1.96-.4-.91-1.06-1.64-.66-.74-1.52-1.28-.86-.55-1.79-.89-.84-.3-1.72-.44-.87-.14-1.76-.14-1.55 0-3.06.45T.94 7.55q.71-1.74 1.81-3.13 1.1-1.38 2.52-2.35Q6.68 1.1 8.37.58q1.7-.52 3.58-.52Z",
      "opera": "M8.051 5.238c-1.328 1.566-2.186 3.883-2.246 6.48v.564c.061 2.598.918 4.912 2.246 6.479 1.721 2.236 4.279 3.654 7.139 3.654 1.756 0 3.4-.537 4.807-1.471C17.879 22.846 15.074 24 12 24c-.192 0-.383-.004-.57-.014C5.064 23.689 0 18.436 0 12 0 5.371 5.373 0 12 0h.045c3.055.012 5.84 1.166 7.953 3.055-1.408-.93-3.051-1.471-4.81-1.471-2.858 0-5.417 1.42-7.14 3.654h.003zM24 12c0 3.556-1.545 6.748-4.002 8.945-3.078 1.5-5.946.451-6.896-.205 3.023-.664 5.307-4.32 5.307-8.74 0-4.422-2.283-8.075-5.307-8.74.949-.654 3.818-1.703 6.896-.205C22.455 5.25 24 8.445 24 12z",
      "brave": "M15.68 0l2.096 2.38s1.84-.512 2.709.358c.868.87 1.584 1.638 1.584 1.638l-.562 1.381.715 2.047s-2.104 7.98-2.35 8.955c-.486 1.919-.818 2.66-2.198 3.633-1.38.972-3.884 2.66-4.293 2.916-.409.256-.92.692-1.38.692-.46 0-.97-.436-1.38-.692a185.796 185.796 0 01-4.293-2.916c-1.38-.973-1.712-1.714-2.197-3.633-.247-.975-2.351-8.955-2.351-8.955l.715-2.047-.562-1.381s.716-.768 1.585-1.638c.868-.87 2.708-.358 2.708-.358L8.321 0h7.36zm-3.679 14.936c-.14 0-1.038.317-1.758.69-.72.373-1.242.637-1.409.742-.167.104-.065.301.087.409.152.107 2.194 1.69 2.393 1.866.198.175.489.464.687.464.198 0 .49-.29.688-.464.198-.175 2.24-1.759 2.392-1.866.152-.108.254-.305.087-.41-.167-.104-.689-.368-1.41-.741-.72-.373-1.617-.69-1.757-.69zm0-11.278s-.409.001-1.022.206-1.278.46-1.584.46c-.307 0-2.581-.434-2.581-.434S4.119 7.152 4.119 7.849c0 .697.339.881.68 1.243l2.02 2.149c.192.203.59.511.356 1.066-.235.555-.58 1.26-.196 1.977.384.716 1.042 1.194 1.464 1.115.421-.08 1.412-.598 1.776-.834.364-.237 1.518-1.19 1.518-1.554 0-.365-1.193-1.02-1.413-1.168-.22-.15-1.226-.725-1.247-.95-.02-.227-.012-.293.284-.851.297-.559.831-1.304.742-1.8-.089-.495-.95-.753-1.565-.986-.615-.232-1.799-.671-1.947-.74-.148-.068-.11-.133.339-.175.448-.043 1.719-.212 2.292-.052.573.16 1.552.403 1.632.532.079.13.149.134.067.579-.081.445-.5 2.581-.541 2.96-.04.38-.12.63.288.724.409.094 1.097.256 1.333.256s.924-.162 1.333-.256c.408-.093.329-.344.288-.723-.04-.38-.46-2.516-.541-2.961-.082-.445-.012-.45.067-.579.08-.129 1.059-.372 1.632-.532.573-.16 1.845.009 2.292.052.449.042.487.107.339.175-.148.069-1.332.508-1.947.74-.615.233-1.476.49-1.565.986-.09.496.445 1.241.742 1.8.297.558.304.624.284.85-.02.226-1.026.802-1.247.95-.22.15-1.413.804-1.413 1.169 0 .364 1.154 1.317 1.518 1.554.364.236 1.355.755 1.776.834.422.079 1.08-.4 1.464-1.115.384-.716.039-1.422-.195-1.977-.235-.555.163-.863.355-1.066l2.02-2.149c.341-.362.68-.546.68-1.243 0-.697-2.695-3.96-2.695-3.96s-2.274.436-2.58.436c-.307 0-.972-.256-1.585-.461-.613-.205-1.022-.206-1.022-.206z",
      "vivaldi": "M12 0C6.75 0 3.817 0 1.912 1.904.007 3.81 0 6.75 0 12s0 8.175 1.912 10.08C3.825 23.985 6.75 24 12 24c5.25 0 8.183 0 10.088-1.904C23.993 20.19 24 17.25 24 12s0-8.175-1.912-10.08C20.175.015 17.25 0 12 0zm-.168 3a9 9 0 016.49 2.648 9 9 0 010 12.704A9 9 0 1111.832 3zM7.568 7.496a1.433 1.433 0 00-.142.004A1.5 1.5 0 006.21 9.75l1.701 3c.93 1.582 1.839 3.202 2.791 4.822a1.417 1.417 0 001.41.75 1.5 1.5 0 001.223-.81l4.447-7.762A1.56 1.56 0 0018 8.768a1.5 1.5 0 10-2.828.914 2.513 2.513 0 01.256 1.119v.246a2.393 2.393 0 01-2.52 2.13 2.348 2.348 0 01-1.965-1.214c-.307-.51-.6-1.035-.9-1.553-.42-.72-.826-1.41-1.246-2.16a1.433 1.433 0 00-1.229-.754Z",
      "windows": "M0,0H11.377V11.372H0ZM12.623,0H24V11.372H12.623ZM0,12.623H11.377V24H0Zm12.623,0H24V24H12.623",
      "apple": "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
      "android": "M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z",
      "linux": "M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z",
      "chromeos": "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
      "samsunginternet": "M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 4.5a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 12 7.5zM2.6 14.8c3.4 2 8.6 1.6 12.4-1.6-2.2 4.6-7 8-11.4 7.6z"
    };
    const ICON_STROKES = {
      "monitor": '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
      "smartphone": '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 18h.01"/>',
      "tablet": '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/>',
      "tv": '<rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/>',
      "unknown-device": '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
      "globe": '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
      "cpu": '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>'
    };
    function iconSVG(name, size = 15) {
      const BRAND_PATHS = ICON_BRAND_PATHS;
      if (BRAND_PATHS[name]) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" aria-hidden="true"><path d="${BRAND_PATHS[name]}"/></svg>`;
      }
      const STROKES = ICON_STROKES;
      const body = STROKES[name] || STROKES["globe"];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
    }
    function iconEl(name, size = 15, cls = "legend-icon") {
      const span = document.createElement("span");
      span.className = cls;
      span.innerHTML = iconSVG(name, size);
      return span;
    }
    function browserIcon(name) {
      const n = (name || "").toLowerCase();
      if (!n) return null;
      if (n.includes("samsung")) return "samsunginternet";
      if (n.includes("edg")) return "microsoftedge";
      if (n.includes("brave")) return "brave";
      if (n.includes("vivaldi")) return "vivaldi";
      if (n.includes("opera") || n.includes("opr")) return "opera";
      if (n.includes("firefox")) return "firefoxbrowser";
      if (n.includes("safari")) return "safari";
      if (n.includes("chrom")) return "googlechrome";
      return null;
    }
    function systemIcon(name) {
      const n = (name || "").toLowerCase();
      if (!n) return null;
      if (n.includes("windows")) return "windows";
      if (n.includes("android")) return "android";
      if (n.includes("chrome os") || n.includes("chromeos")) return "chromeos";
      if (n.includes("ios") || n.includes("mac") || n.includes("os x")) return "apple";
      if (n.includes("linux") || n.includes("ubuntu") || n.includes("debian") || n.includes("fedora") || n.includes("arch") || n.includes("bsd") || n.includes("gnu")) return "linux";
      return null;
    }
    function deviceIcon(name) {
      const n = (name || "").toLowerCase();
      if (!n) return "unknown-device";
      if (n.includes("phone") || n.includes("tel") || n.includes("mobile")) return "smartphone";
      if (n.includes("tablet")) return "tablet";
      if (n.includes("hd") || n.includes("pantalla") || n.includes("display") || n.includes("tv")) return "tv";
      if (n.includes("desktop") || n.includes("sobremesa") || n.includes("laptop")) return "monitor";
      if (n.includes("unknown") || n.includes("desconocido")) return "unknown-device";
      return null;
    }
    function donutIconFor(page) {
      if (page === "browsers") return (item) => browserIcon(item.name) || "globe";
      if (page === "systems") return (item) => systemIcon(item.name) || "cpu";
      if (page === "sizes") return (item) => deviceIcon(item.apiId || item.id || item.name);
      return null;
    }
    function detailIconFor(page) {
      if (page === "browsers") return browserIcon;
      if (page === "systems") return systemIcon;
      if (page === "sizes") return deviceIcon;
      return null;
    }
    function buildTrafficSeries(hitsData, group) {
      const map = /* @__PURE__ */ new Map();
      const all = hitsData.hits || [];
      all.forEach((h) => {
        (h.stats || []).forEach((s) => {
          let key;
          if (group === "hour") {
            if (!s.hourly) return;
            s.hourly.forEach((v, hour) => {
              if (v <= 0) return;
              const k = `${s.day}T${String(hour).padStart(2, "0")}:00:00Z`;
              map.set(k, (map.get(k) || 0) + v);
            });
            return;
          }
          if (group === "week") {
            const d = /* @__PURE__ */ new Date(s.day + "T00:00:00Z");
            d.setDate(d.getDate() - (d.getDay() + 6) % 7);
            key = d.toISOString().slice(0, 10) + "T00:00:00Z";
            map.set(key, (map.get(key) || 0) + (s.daily || 0));
            return;
          }
          if (group === "month") {
            key = s.day.slice(0, 7) + "-01T00:00:00Z";
            map.set(key, (map.get(key) || 0) + (s.daily || 0));
            return;
          }
          key = s.day + "T00:00:00Z";
          map.set(key, (map.get(key) || 0) + (s.daily || 0));
        });
      });
      return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([ts, count]) => ({ ts, count }));
    }
    function buildTotalSeries(totalData, group) {
      const map = /* @__PURE__ */ new Map();
      (totalData && totalData.stats || []).forEach((s) => {
        let key;
        if (group === "hour") {
          if (!Array.isArray(s.hourly)) return;
          s.hourly.forEach((v, hour) => {
            if (v <= 0) return;
            const k = `${s.day}T${String(hour).padStart(2, "0")}:00:00Z`;
            map.set(k, (map.get(k) || 0) + v);
          });
          return;
        }
        if (group === "week") {
          const d = /* @__PURE__ */ new Date(s.day + "T00:00:00Z");
          d.setDate(d.getDate() - (d.getDay() + 6) % 7);
          key = d.toISOString().slice(0, 10) + "T00:00:00Z";
        } else if (group === "month") {
          key = s.day.slice(0, 7) + "-01T00:00:00Z";
        } else {
          key = s.day + "T00:00:00Z";
        }
        map.set(key, (map.get(key) || 0) + (s.daily || 0));
      });
      return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([ts, count]) => ({ ts, count }));
    }
    function metricSeries(data, group) {
      if (chartMetric === "pageviews") return buildTrafficSeries(data.hits, group);
      const s = buildTotalSeries(data.total, group);
      return s.length ? s : buildTrafficSeries(data.hits, group);
    }
    function effectiveGroup() {
      if (currentPreset === "realtime") return "hour";
      return pickGroup(lastChartDays);
    }
    function setTrafficData(data, days) {
      lastChartData = data;
      if (typeof days === "number") lastChartDays = days;
      refreshTrafficChart();
    }
    function refreshTrafficChart() {
      if (!lastChartData) return;
      updateTrafficHead();
      renderTrafficChart(lastChartData, effectiveGroup());
    }
    function updateTrafficHead() {
      const h = $("#traffic-title");
      if (h) h.textContent = t("card.traffic." + chartMetric);
      updateCompareUI();
    }
    function setChartMetric(metric) {
      if (metric !== "visitors" && metric !== "pageviews") return;
      chartMetric = metric;
      safeStore("gd.chartMetric", chartMetric);
      refreshTrafficChart();
      if (lastKPIArgs) renderKPIs(...lastKPIArgs);
    }
    function xLabelLocale() {
      return currentLang() === "es" ? "es-ES" : "en-US";
    }
    function formatXTick(ts, group, opts = {}) {
      let o;
      if (group === "hour") o = { hour: "numeric", minute: "2-digit" };
      else if (group === "month") o = opts.withYear ? { month: "short", year: "numeric" } : { month: "short" };
      else o = { day: "numeric", month: "short" };
      o.timeZone = "UTC";
      try {
        return new Intl.DateTimeFormat(xLabelLocale(), o).format(new Date(ts));
      } catch {
        return ts.slice(0, 10);
      }
    }
    function formatTooltipDate(ts, group) {
      let o;
      if (group === "hour") o = { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" };
      else if (group === "month") o = { month: "long", year: "numeric" };
      else o = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
      o.timeZone = "UTC";
      try {
        return new Intl.DateTimeFormat(xLabelLocale(), o).format(new Date(ts));
      } catch {
        return ts.slice(0, 10);
      }
    }
    function lastHourVisitors(totalData) {
      const stats = totalData && totalData.stats || [];
      let best = null;
      stats.forEach((s) => {
        if (!Array.isArray(s.hourly)) return;
        if (!best || s.day > best.day) best = s;
      });
      if (!best) return "\u2014";
      const v = best.hourly[(/* @__PURE__ */ new Date()).getUTCHours()];
      return typeof v === "number" ? fmtNum(v) : "\u2014";
    }
    function skeletonCard(h) {
      const s = document.createElement("div");
      s.className = "skeleton skel-card" + (h === 280 ? " h280" : "");
      return s;
    }
    function errCard(key) {
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
    function emptyEl(text) {
      const d = document.createElement("div");
      d.className = "empty";
      d.textContent = text;
      return d;
    }
    function showTooltip(target, html) {
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
    function clearTooltips() {
      document.querySelectorAll(".tooltip").forEach((el) => el.remove());
    }
    function renderKPIs(data, prevTotal, group) {
      lastKPIArgs = [data, prevTotal, group];
      const grid = $("#grid-kpis");
      const totalNum = data.total.total ?? data.total.total_utc ?? 0;
      const series = buildTrafficSeries(data.hits, group);
      const pageviewSum = series.reduce((a, s) => a + s.count, 0);
      let trend = null;
      if (prevTotal !== null && prevTotal !== void 0) {
        if (prevTotal === 0 && totalNum > 0) trend = 100;
        else if (prevTotal > 0) trend = (totalNum - prevTotal) / prevTotal * 100;
      }
      let top = { name: "\u2014", count: 0 };
      if (data.hits.hits && data.hits.hits.length) {
        const sorted = [...data.hits.hits].sort((a, b) => (b.count || 0) - (a.count || 0));
        top = { name: sorted[0].path || "/", count: sorted[0].count || 0 };
      }
      const perVisit = totalNum > 0 ? (pageviewSum / totalNum).toFixed(1) : null;
      const kpis = [
        { label: t("kpi.visitors"), value: fmtNum(totalNum), num: totalNum, sub: `${trend !== null ? fmtPct(trend) + " " : ""}${t("kpi.vsPrev")} ${presetLabel(currentPreset)}`, trend, metric: "visitors" },
        { label: t("kpi.pageviews"), value: fmtNum(pageviewSum), num: pageviewSum, sub: presetLabel(currentPreset) + (perVisit !== null ? ` \xB7 ${perVisit} ${t("kpi.perVisit")}` : ""), metric: "pageviews" },
        { label: t("kpi.toppage"), value: top.name, string: true, sub: t("kpi.hits", { n: fmtNum(top.count) }) },
        { label: t("kpi.paths"), value: fmtNum((data.hits.hits || []).length), num: (data.hits.hits || []).length, sub: t("kpi.distinct") },
        { label: t("kpi.events"), value: fmtNum(data.total.total_events ?? 0), num: data.total.total_events ?? 0, sub: presetLabel(currentPreset) },
        { label: t("kpi.lastHour"), value: lastHourVisitors(data.total), num: Number(lastHourVisitors(data.total)) || 0, sub: t("kpi.lastHourSub"), live: true }
      ];
      const kids = grid.children;
      if (kids.length === kpis.length && [...kids].every((c, i) => c.dataset.label === kpis[i].label)) {
        kpis.forEach((k, i) => {
          const card = kids[i];
          const val = card.querySelector(".kpi-value");
          if (k.string) val.textContent = k.value;
          else animateNum(val, k.num);
          const sub = card.querySelector(".kpi-sub");
          sub.textContent = "";
          if (k.trend !== null && k.trend !== void 0 && !k.string) {
            const span = document.createElement("span");
            span.className = k.trend >= 0 ? "trend-up" : "trend-down";
            span.textContent = fmtPct(k.trend);
            sub.appendChild(span);
            sub.append(" " + k.sub.replace(/^[+−][\d.]+%\s*/, ""));
          } else {
            sub.textContent = k.sub;
          }
          if (k.metric) card.classList.toggle("kpi-active", chartMetric === k.metric);
        });
        return;
      }
      grid.innerHTML = "";
      kpis.forEach((k) => {
        const el = document.createElement("div");
        el.className = "kpi";
        el.dataset.label = k.label;
        const label = document.createElement("div");
        label.className = "kpi-label";
        if (k.live) {
          const dot = document.createElement("span");
          dot.className = "live-dot";
          dot.setAttribute("aria-hidden", "true");
          label.appendChild(dot);
        }
        label.append(k.label);
        const val = document.createElement("div");
        val.className = "kpi-value" + (k.string ? " string" : "");
        val.textContent = k.value;
        const sub = document.createElement("div");
        sub.className = "kpi-sub";
        if (k.trend !== null && k.trend !== void 0 && !k.string) {
          const span = document.createElement("span");
          span.className = k.trend >= 0 ? "trend-up" : "trend-down";
          span.textContent = fmtPct(k.trend);
          sub.appendChild(span);
          sub.append(" " + k.sub.replace(/^[+−][\d.]+%\s*/, ""));
        } else {
          sub.textContent = k.sub;
        }
        el.append(label, val, sub);
        if (k.metric) {
          el.classList.add("kpi-clickable");
          el.setAttribute("role", "button");
          el.tabIndex = 0;
          const on = chartMetric === k.metric;
          el.classList.toggle("kpi-active", on);
          el.setAttribute("aria-pressed", String(on));
          const act = () => setChartMetric(k.metric);
          el.addEventListener("click", act);
          el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              act();
            }
          });
        }
        grid.appendChild(el);
      });
    }
    function buildChartLegend() {
      const legend = document.createElement("div");
      legend.className = "chart-legend";
      const mk = (cls, key) => {
        const item = document.createElement("span");
        item.className = "chart-legend-item";
        const sw = document.createElement("span");
        sw.className = "chart-legend-swatch " + cls;
        item.append(sw, t(key));
        return item;
      };
      legend.append(mk("sw-current", "chart.current"), mk("sw-previous", "chart.previous"));
      return legend;
    }
    function renderTrafficChart(data, group) {
      const body = $("#traffic-body");
      const series = metricSeries(data, group);
      if (!series.length) {
        if (chartAnimState && chartAnimState.cancel) chartAnimState.cancel();
        chartAnimState = null;
        body.innerHTML = "";
        body.appendChild(emptyEl(t("chart.empty")));
        return;
      }
      const compareOn = chartCompare && compareAllowed();
      let prevSeries = compareOn ? comparePrevSeries(group) : null;
      if (prevSeries && !prevSeries.length) prevSeries = null;
      const prevOffset = prevSeries ? series.length - prevSeries.length : 0;
      const prevAt = (i) => {
        if (!prevSeries) return null;
        const j = i - prevOffset;
        return j >= 0 && j < prevSeries.length ? prevSeries[j] : null;
      };
      const max = Math.max(...series.map((s) => s.count), ...(prevSeries || []).map((s) => s.count), 1);
      const W = 900, H = 260, PAD = { top: 12, right: 10, bottom: 26, left: 46 };
      const iw = W - PAD.left - PAD.right, ih = H - PAD.top - PAD.bottom;
      const n = series.length;
      const x = (i) => PAD.left + (n === 1 ? iw / 2 : i / (n - 1) * iw);
      const y = (v) => PAD.top + ih - v / max * ih;
      const ns = "http://www.w3.org/2000/svg";
      const maxXTicks = 8;
      const kTicks = Math.min(maxXTicks, n);
      const spansYears = group === "month" && new Set(series.map((s) => s.ts.slice(0, 4))).size > 1;
      const xTickIdx = /* @__PURE__ */ new Set();
      if (kTicks === 1) xTickIdx.add(0);
      else for (let j = 0; j < kTicks; j++) xTickIdx.add(Math.round(j * (n - 1) / (kTicks - 1)));
      const pts = series.map((s, i) => [x(i), y(s.count)]);
      const prevPts = [];
      if (prevSeries) {
        for (let i = 0; i < n; i++) {
          const pv = prevAt(i);
          if (pv) prevPts.push([x(i), y(pv.count)]);
        }
        if (prevPts.length <= 1) prevPts.length = 0;
      }
      const prevState = chartAnimState;
      if (prevState && prevState.n === n && prevState.body === body && prevState.svg.isConnected && !!prevState.prevPts === !!prevSeries && (!prevSeries || prevState.prevPts && prevState.prevPts.length === prevPts.length)) {
        if (prevState.cancel) prevState.cancel();
        const from = prevState.pts;
        const draw = (e) => {
          const cur = pts.map((p, i) => [p[0], from[i][1] + (p[1] - from[i][1]) * e]);
          prevState.line.setAttribute("d", "M" + cur.map((p) => p[0] + "," + p[1]).join(" L"));
          prevState.area.setAttribute("d", "M" + cur[0][0] + "," + (PAD.top + ih) + " L" + cur.map((p) => p[0] + "," + p[1]).join(" L") + " L" + cur[cur.length - 1][0] + "," + (PAD.top + ih) + " Z");
        };
        prevState.cancel = tween(600, draw);
        for (let i = 0; i <= 4; i++) prevState.yTicks[i].textContent = fmtNum(Math.round(max - max / 4 * i));
        const newXT = series.map((s, i) => xTickIdx.has(i) ? formatXTick(s.ts, group, { withYear: spansYears }) : null);
        prevState.xTicks.forEach((tx, j) => {
          if (newXT[j] !== null) tx.textContent = newXT[j];
        });
        if (prevState.prevLine && prevPts.length) prevState.prevLine.setAttribute("d", "M" + prevPts.map((p) => p[0] + "," + p[1]).join(" L"));
        prevState.hover.pts = pts;
        prevState.hover.series = series;
        prevState.hover.prevAt = prevAt;
        prevState.hover.group = group;
        body.querySelectorAll(".chart-legend").forEach((l) => l.remove());
        if (prevSeries) body.appendChild(buildChartLegend());
        prevState.pts = pts;
        if (prevSeries) prevState.prevPts = prevPts;
        return;
      }
      if (chartAnimState && chartAnimState.cancel) chartAnimState.cancel();
      body.innerHTML = "";
      const svg = document.createElementNS(ns, "svg");
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("preserveAspectRatio", "none");
      svg.style.height = "260px";
      const defs = document.createElementNS(ns, "defs");
      const grad = document.createElementNS(ns, "linearGradient");
      grad.id = "trafficFill";
      grad.setAttribute("x1", "0");
      grad.setAttribute("y1", "0");
      grad.setAttribute("x2", "0");
      grad.setAttribute("y2", "1");
      const stop1 = document.createElementNS(ns, "stop");
      stop1.setAttribute("offset", "0%");
      stop1.setAttribute("stop-color", "var(--chart-line)");
      stop1.setAttribute("stop-opacity", "0.3");
      const stop2 = document.createElementNS(ns, "stop");
      stop2.setAttribute("offset", "100%");
      stop2.setAttribute("stop-color", "var(--chart-line)");
      stop2.setAttribute("stop-opacity", "0");
      grad.append(stop1, stop2);
      defs.appendChild(grad);
      svg.appendChild(defs);
      const yTicks = [];
      for (let i = 0; i <= 4; i++) {
        const gy = PAD.top + ih / 4 * i;
        const line2 = document.createElementNS(ns, "line");
        line2.setAttribute("x1", PAD.left);
        line2.setAttribute("y1", gy);
        line2.setAttribute("x2", W - PAD.right);
        line2.setAttribute("y2", gy);
        line2.setAttribute("stroke", "var(--chart-grid)");
        line2.setAttribute("stroke-dasharray", "3 4");
        svg.appendChild(line2);
        const tv = Math.round(max - max / 4 * i);
        const txt = document.createElementNS(ns, "text");
        txt.setAttribute("x", PAD.left - 8);
        txt.setAttribute("y", gy + 4);
        txt.setAttribute("text-anchor", "end");
        txt.setAttribute("font-size", "11");
        txt.setAttribute("fill", "var(--text-muted)");
        txt.textContent = fmtNum(tv);
        yTicks.push(txt);
        svg.appendChild(txt);
      }
      const xTicks = [];
      [...xTickIdx].sort((a, b) => a - b).forEach((i) => {
        const isLast = i === n - 1 && n > 1;
        const txt = document.createElementNS(ns, "text");
        txt.setAttribute("x", x(i));
        txt.setAttribute("y", H - 8);
        txt.setAttribute("text-anchor", isLast ? "end" : "middle");
        txt.setAttribute("font-size", "11");
        txt.setAttribute("fill", "var(--text-muted)");
        txt.setAttribute("class", "x-tick");
        txt.textContent = formatXTick(series[i].ts, group, { withYear: spansYears });
        xTicks.push(txt);
        svg.appendChild(txt);
      });
      const areaPath = "M" + pts[0][0] + "," + (PAD.top + ih) + " L" + pts.map((p) => p[0] + "," + p[1]).join(" L") + " L" + pts[pts.length - 1][0] + "," + (PAD.top + ih) + " Z";
      const area = document.createElementNS(ns, "path");
      area.setAttribute("d", areaPath);
      area.setAttribute("fill", "url(#trafficFill)");
      svg.appendChild(area);
      const linePath = "M" + pts.map((p) => p[0] + "," + p[1]).join(" L");
      const line = document.createElementNS(ns, "path");
      line.setAttribute("d", linePath);
      line.setAttribute("class", "traffic-line");
      svg.appendChild(line);
      let prevLine = null;
      if (prevPts.length) {
        prevLine = document.createElementNS(ns, "path");
        prevLine.setAttribute("d", "M" + prevPts.map((p) => p[0] + "," + p[1]).join(" L"));
        prevLine.setAttribute("class", "traffic-line-prev");
        svg.appendChild(prevLine);
      }
      const hover = { pts, series, prevAt, group };
      const overlay = document.createElementNS(ns, "rect");
      overlay.setAttribute("x", PAD.left);
      overlay.setAttribute("y", PAD.top);
      overlay.setAttribute("width", iw);
      overlay.setAttribute("height", ih);
      overlay.setAttribute("fill", "transparent");
      svg.appendChild(overlay);
      overlay.addEventListener("mousemove", (e) => {
        const h = hover;
        const rect = svg.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width * W;
        let best = 0, bestD = Infinity;
        h.pts.forEach((p, i) => {
          const d = Math.abs(p[0] - mx);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        clearTooltips();
        const s = h.series[best];
        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("cx", h.pts[best][0]);
        dot.setAttribute("cy", h.pts[best][1]);
        dot.setAttribute("r", "4");
        dot.setAttribute("fill", "var(--chart-line)");
        svg.appendChild(dot);
        setTimeout(() => dot.remove(), 50);
        let tipHtml = `<div class="tt-date">${formatTooltipDate(s.ts, h.group)}</div><span class="tt-num">${fmtNum(s.count)}</span> ${t(chartMetric === "pageviews" ? "kpi.pageviews" : "kpi.visitors")}`;
        const pv = h.prevAt(best);
        if (pv) tipHtml += `<br><span class="tt-num">${fmtNum(pv.count)}</span> ${t("chart.previous")}`;
        const tip = showTooltip(e.target, tipHtml);
        tip.style.left = e.clientX + 12 + "px";
        tip.style.top = e.clientY - 30 + "px";
      });
      overlay.addEventListener("mouseleave", clearTooltips);
      body.appendChild(svg);
      if (prevSeries) body.appendChild(buildChartLegend());
      chartAnimState = {
        svg,
        n,
        body,
        pts,
        line,
        area,
        prevLine,
        prevPts: prevPts.length ? prevPts : null,
        yTicks,
        xTicks,
        hover,
        cancel: null
      };
    }
    function renderTopList(container, items, { rank = true, formatName = (i) => i.name, nameSub = () => null, count = (i) => i.count, total, max = 8, showAll = true, page, demoDetails, onRowClick, prefix = () => "", badge = () => null, isSelected = () => false, rowTitle = null } = {}) {
      const topKey = currentLang() + "|" + String(total || 0) + "|" + (items || []).map((i) => formatName(i) + "=" + count(i)).join(",");
      if (softTick && container._softKey === topKey) return;
      container._softKey = topKey;
      if (softTick && items && items.length) {
        const listEl = container.querySelector(":scope > div");
        const rowsByName = {};
        if (listEl) [...listEl.children].forEach((r) => {
          const re = r;
          if (re.dataset && re.dataset.name) rowsByName[re.dataset.name] = re;
        });
        const wanted = items.map((i) => i.name);
        const usable = listEl && wanted.every((nm) => rowsByName[nm]) && Object.keys(rowsByName).length === wanted.length;
        if (usable) {
          const tm = total || Math.max(...items.map((i) => i.count), 1);
          items.forEach((item, idx) => {
            const row = rowsByName[item.name];
            listEl.appendChild(row);
            if (rank) {
              const rankEl = row.querySelector(".list-rank");
              if (rankEl) rankEl.textContent = idx + 1;
            }
            const bar = row.querySelector(".list-bar");
            if (bar) bar.style.width = count(item) / tm * 100 + "%";
            const cnt = row.querySelector(".list-count");
            if (cnt) animateNum(cnt, count(item));
            const pct = row.querySelector(".list-pct");
            const share = total ? count(item) / total * 100 : null;
            if (pct) pct.textContent = share !== null ? share.toFixed(1) + "%" : "";
          });
          return;
        }
      }
      container.innerHTML = "";
      if (!items || !items.length) {
        container.appendChild(emptyEl(t("no.data")));
        return;
      }
      const totalMax = total || Math.max(...items.map((i) => i.count), 1);
      const limited = max ? items.slice(0, max) : items;
      const list = document.createElement("div");
      items.forEach((item, idx) => {
        const row = document.createElement("div");
        row.className = "list-row" + (isSelected(item) ? " selected" : "");
        if (item.name) row.dataset.name = item.name;
        row.setAttribute("role", onRowClick ? "button" : void 0);
        row.setAttribute("tabindex", onRowClick ? 0 : void 0);
        const chev = document.createElement("span");
        chev.className = "chevron";
        if (onRowClick) chev.textContent = "\u25B8";
        if (rank) {
          const r = document.createElement("span");
          r.className = "list-rank";
          r.textContent = idx + 1;
          row.appendChild(r);
        }
        const pref = prefix(item);
        if (pref) {
          const p = document.createElement("span");
          p.style.cssText = "flex:none";
          p.textContent = pref;
          row.appendChild(p);
        }
        if (rowTitle) {
          const rt = rowTitle(item);
          if (rt) row.title = rt;
        }
        const name = document.createElement("span");
        name.className = "list-name";
        name.textContent = formatName(item);
        const sub = nameSub(item);
        if (sub) {
          const sm = document.createElement("small");
          sm.textContent = sub;
          name.appendChild(sm);
        }
        const barWrap = document.createElement("span");
        barWrap.className = "list-bar-wrap";
        const bar = document.createElement("span");
        bar.className = "list-bar";
        bar.style.width = count(item) / totalMax * 100 + "%";
        barWrap.appendChild(bar);
        const cnt = document.createElement("span");
        cnt.className = "list-count";
        cnt.textContent = fmtNum(count(item));
        const pct = document.createElement("span");
        pct.className = "list-pct";
        const share = total ? count(item) / total * 100 : null;
        if (share !== null) pct.textContent = share.toFixed(1) + "%";
        if (chev.textContent) row.appendChild(chev);
        row.append(name);
        const badgeTxt = badge(item);
        if (badgeTxt) {
          const bd = document.createElement("span");
          bd.className = "list-badge";
          bd.textContent = badgeTxt;
          row.appendChild(bd);
        }
        row.append(barWrap, cnt, pct);
        if (onRowClick) {
          row.addEventListener("click", () => onRowClick(item, row));
          row.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onRowClick(item, row);
            }
          });
        }
        list.appendChild(row);
      });
      container.appendChild(list);
      if (showAll && max && items.length > max) {
        const btn = document.createElement("button");
        btn.className = "list-action";
        btn.textContent = t("top.showAll", { n: items.length });
        btn.addEventListener("click", () => {
          const c = container;
          c.innerHTML = "";
          c.appendChild(renderAllRows(items, { rank, formatName, nameSub, count, total: totalMax, page, onRowClick, prefix, badge, isSelected, rowTitle }));
        });
        container.appendChild(btn);
      }
    }
    function renderAllRows(items, opts) {
      const frag = document.createDocumentFragment();
      items.forEach((item, idx) => {
        const row = document.createElement("div");
        row.className = "list-row" + (opts.isSelected && opts.isSelected(item) ? " selected" : "");
        if (item.name) row.dataset.name = item.name;
        row.setAttribute("role", opts.onRowClick ? "button" : void 0);
        row.setAttribute("tabindex", opts.onRowClick ? 0 : void 0);
        const chev = document.createElement("span");
        chev.className = "chevron";
        if (opts.onRowClick) chev.textContent = "\u25B8";
        if (opts.rank) {
          const r = document.createElement("span");
          r.className = "list-rank";
          r.textContent = idx + 1;
          row.appendChild(r);
        }
        const pref = opts.prefix ? opts.prefix(item) : "";
        if (pref) {
          const p = document.createElement("span");
          p.style.cssText = "flex:none";
          p.textContent = pref;
          row.appendChild(p);
        }
        if (opts.rowTitle) {
          const rt = opts.rowTitle(item);
          if (rt) row.title = rt;
        }
        const name = document.createElement("span");
        name.className = "list-name";
        name.textContent = opts.formatName(item);
        const sub = opts.nameSub ? opts.nameSub(item) : null;
        if (sub) {
          const sm = document.createElement("small");
          sm.textContent = sub;
          name.appendChild(sm);
        }
        const barWrap = document.createElement("span");
        barWrap.className = "list-bar-wrap";
        const bar = document.createElement("span");
        bar.className = "list-bar";
        bar.style.width = opts.count(item) / opts.total * 100 + "%";
        barWrap.appendChild(bar);
        const cnt = document.createElement("span");
        cnt.className = "list-count";
        cnt.textContent = fmtNum(opts.count(item));
        const pct = document.createElement("span");
        pct.className = "list-pct";
        pct.textContent = (opts.count(item) / opts.total * 100).toFixed(1) + "%";
        if (chev.textContent) row.appendChild(chev);
        row.append(name);
        const badgeTxt = opts.badge ? opts.badge(item) : null;
        if (badgeTxt) {
          const bd = document.createElement("span");
          bd.className = "list-badge";
          bd.textContent = badgeTxt;
          row.appendChild(bd);
        }
        row.append(barWrap, cnt, pct);
        if (opts.onRowClick) {
          row.addEventListener("click", () => opts.onRowClick(item, row));
          row.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              opts.onRowClick(item, row);
            }
          });
        }
        frag.appendChild(row);
      });
      return frag;
    }
    function renderDonut(container, items, { total, page, onDrill, iconFor = null, collapse = true }) {
      const donutKey = currentLang() + "|" + String(total || 0) + "|" + (items || []).map((i) => i.name + "=" + i.count).join(",");
      if (softTick && container._softKey === donutKey) return;
      container._softKey = donutKey;
      container.innerHTML = "";
      const totalCount = total || (items || []).reduce((a, i) => a + (i.count || 0), 0);
      if (!items || !items.length || totalCount <= 0) {
        container.appendChild(emptyEl(t("no.data")));
        return;
      }
      if (page === "browsers" || page === "systems" || page === "sizes") lastDatasets[page] = { items, total: totalCount };
      donutState.set(container, { items, opts: { total, page, onDrill, iconFor, collapse } });
      const palette = [
        ["#7eb2e0", "#2b5884"],
        ["#3fb950", "#1a7f37"],
        ["#e3b341", "#9e7b1c"],
        ["#d29922", "#9a6b11"],
        ["#a371f7", "#6e3fc2"],
        ["#f778ba", "#c4348a"],
        ["#56d4dd", "#1c7f86"],
        ["#ffa657", "#b05a1e"]
      ];
      let display = items;
      if (collapse && items.length > 6) {
        const top = items.slice(0, 5);
        const rest = items.slice(5).reduce((a, i) => a + i.count, 0);
        display = [...top, { name: "Other", id: "__other__", count: rest }];
      } else {
        display = items.map((i) => ({ ...i }));
      }
      const wrap = document.createElement("div");
      wrap.className = "donut-wrap";
      const chartWrap = document.createElement("div");
      chartWrap.style.cssText = "position:relative;width:200px;height:200px";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 200 200");
      const rOuter = 80, rInner = 55, cx = 100, cy = 100;
      const C = 2 * Math.PI * rOuter;
      let acc = 0;
      let activeIndex = -1;
      display.forEach((item, idx) => {
        const frac = item.count / Math.max(totalCount, 1);
        const len = frac * C;
        const offset = acc * C;
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", rOuter);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", palette[idx % palette.length][0]);
        circle.setAttribute("stroke-width", rOuter - rInner);
        circle.setAttribute("stroke-dasharray", `${len} ${C - len}`);
        circle.setAttribute("stroke-dashoffset", (-offset).toString());
        circle.setAttribute("transform", "rotate(-90 100 100)");
        circle.setAttribute("data-idx", idx);
        circle.style.transition = "stroke-width 0.2s var(--ease), opacity 0.15s var(--ease)";
        if (item.apiId === "__other__" || !onDrill) circle.style.cursor = "default";
        else circle.style.cursor = "pointer";
        circle.addEventListener("click", () => {
          if (item.apiId === "__other__" || !onDrill) return;
          onDrill(item, idx);
        });
        circle.addEventListener("mouseenter", () => {
          const pct = totalCount ? (item.count / totalCount * 100).toFixed(1) + "%" : "";
          showTooltip(chartWrap, `<span class="tt-num">${fmtNum(item.count)}</span> (${pct})`);
        });
        circle.addEventListener("mouseleave", clearTooltips);
        svg.appendChild(circle);
        acc += frac;
      });
      chartWrap.appendChild(svg);
      const center = document.createElement("div");
      center.className = "donut-center";
      center.style.cssText = "position:absolute;inset:0;display:grid;place-content:center;text-align:center";
      center.innerHTML = `<span>${fmtNum(totalCount)}</span><small>${t("kpi.pageviews")}</small>`;
      chartWrap.appendChild(center);
      wrap.appendChild(chartWrap);
      const legend = document.createElement("div");
      legend.className = "donut-legend";
      display.forEach((item, idx) => {
        const row = document.createElement("div");
        row.className = "legend-row";
        row.setAttribute("role", onDrill && item.apiId !== "__other__" ? "button" : void 0);
        row.setAttribute("tabindex", onDrill && item.apiId !== "__other__" ? 0 : void 0);
        const sw = document.createElement("span");
        sw.className = "legend-swatch";
        sw.style.background = palette[idx % palette.length][0];
        row.appendChild(sw);
        if (iconFor) {
          const ic = iconFor(item);
          if (ic) row.appendChild(iconEl(ic, 15));
        }
        const name = document.createElement("span");
        name.className = "legend-name";
        name.textContent = item.name;
        const num = document.createElement("span");
        num.className = "legend-num";
        num.textContent = fmtNum(item.count);
        const pct = document.createElement("span");
        pct.className = "legend-pct";
        pct.textContent = totalCount ? (item.count / totalCount * 100).toFixed(1) + "%" : "";
        row.append(name, num, pct);
        if (onDrill && item.apiId !== "__other__") {
          row.addEventListener("click", () => onDrill(item, idx));
          row.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onDrill(item, idx);
            }
          });
        }
        legend.appendChild(row);
      });
      wrap.appendChild(legend);
      container.appendChild(wrap);
    }
    function renderWorldMap(container, stats, total, onPathClick) {
      container.innerHTML = "";
      if (!window.WORLD_MAP_PATHS) return;
      const counts = {};
      let maxCount = 1;
      (stats || []).forEach((s2) => {
        const code = countryNameToCode(s2.name);
        if (code) {
          counts[code] = s2.count;
          if (s2.count > maxCount) maxCount = s2.count;
        }
      });
      const wrap = document.createElement("div");
      wrap.className = "map-wrap";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", window.WORLD_MAP_VIEWBOX || "0 0 1000 500");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "map-root");
      let s = 1;
      let tx = 0;
      let ty = 0;
      const minScale = 1;
      const maxScale = 8;
      if (mapTransformState && mapTransformState.s) {
        s = mapTransformState.s;
        tx = mapTransformState.tx;
        ty = mapTransformState.ty;
      }
      function applyTransform() {
        g.setAttribute("transform", `translate(${tx.toFixed(2)}, ${ty.toFixed(2)}) scale(${s.toFixed(4)})`);
        mapTransformState = { s, tx, ty };
      }
      applyTransform();
      function svgPointFromClient(cx, cy) {
        const rect = svg.getBoundingClientRect();
        const vb = (window.WORLD_MAP_VIEWBOX || "0 0 1000 500").split(/\s+/).map(Number);
        const vw = vb[2] || 1e3;
        const vh = vb[3] || 500;
        return {
          x: (cx - rect.left) / Math.max(1, rect.width) * vw,
          y: (cy - rect.top) / Math.max(1, rect.height) * vh
        };
      }
      function zoom(factor, cx, cy) {
        const ns = Math.min(maxScale, Math.max(minScale, s * factor));
        if (ns === s) return;
        let centerX = cx, centerY = cy;
        if (centerX == null || centerY == null) {
          const rect = svg.getBoundingClientRect();
          centerX = rect.left + rect.width / 2;
          centerY = rect.top + rect.height / 2;
        }
        const p = svgPointFromClient(centerX, centerY);
        tx = p.x - (p.x - tx) * (ns / s);
        ty = p.y - (p.y - ty) * (ns / s);
        s = ns;
        applyTransform();
      }
      function reset() {
        s = 1;
        tx = 0;
        ty = 0;
        applyTransform();
      }
      for (const code in window.WORLD_MAP_PATHS) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", window.WORLD_MAP_PATHS[code]);
        const has = code in counts;
        path.setAttribute("data-code", code);
        path.setAttribute("data-has", has ? "1" : "0");
        if (has) {
          const opacity = 0.25 + Math.sqrt(counts[code]) / Math.sqrt(maxCount) * 0.75;
          path.setAttribute("fill-opacity", opacity.toFixed(3));
        }
        if (code === highlightCode) path.setAttribute("class", "map-selected");
        if (has && onPathClick) {
          path.style.cursor = "pointer";
          path.addEventListener("click", (e) => {
            if (mapDragSuppressClick) {
              e.stopPropagation();
              mapDragSuppressClick = false;
              return;
            }
            onPathClick(code);
          });
        }
        path.addEventListener("mouseenter", (e) => {
          if (!has) return;
          const name = Object.keys(counts).find((k) => countryNameToCode(k) === code);
          const count = counts[code];
          const pct = total ? (count / total * 100).toFixed(1) + "%" : "";
          showTooltip(path, `${flagFor(name || code)} ${name || code} \xB7 <span class="tt-num">${fmtNum(count)}</span> ${pct}`);
        });
        path.addEventListener("mouseleave", clearTooltips);
        g.appendChild(path);
      }
      svg.appendChild(g);
      const controls = document.createElement("div");
      controls.className = "map-controls";
      function makeBtn(labelKey, text, action) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "map-btn";
        b.setAttribute("aria-label", t(labelKey));
        b.textContent = text;
        b.addEventListener("click", action);
        return b;
      }
      controls.appendChild(makeBtn("map.zoomIn", "+", () => zoom(1.3)));
      controls.appendChild(makeBtn("map.zoomOut", "\u2212", () => zoom(0.77)));
      controls.appendChild(makeBtn("map.reset", "\u27F2", reset));
      controls.addEventListener("pointerdown", (e) => e.stopPropagation());
      const pointers = /* @__PURE__ */ new Map();
      let pinchStartDist = 0;
      let pinchStartScale = 1;
      let pinchStartTx = 0;
      let pinchStartTy = 0;
      let pinchCenter = { x: 0, y: 0 };
      let panStart = { x: 0, y: 0, tx: 0, ty: 0 };
      let panRect = null;
      function onPointerMove(e) {
        if (!pointers.has(e.pointerId)) return;
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointers.size === 1) {
          const dx = e.clientX - panStart.x;
          const dy = e.clientY - panStart.y;
          if (Math.hypot(dx, dy) > 4) mapDragMoved = true;
          const vb = (window.WORLD_MAP_VIEWBOX || "0 0 1000 500").split(/\s+/).map(Number);
          const vw = vb[2] || 1e3;
          const vh = vb[3] || 500;
          tx = panStart.tx + dx / Math.max(1, panRect.width) * vw;
          ty = panStart.ty + dy / Math.max(1, panRect.height) * vh;
          applyTransform();
        } else if (pointers.size === 2) {
          const pts = [...pointers.values()];
          const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          if (pinchStartDist > 0) {
            const factor = dist / pinchStartDist;
            const ns = Math.min(maxScale, Math.max(minScale, pinchStartScale * factor));
            if (ns !== s) {
              tx = pinchCenter.x - (pinchCenter.x - pinchStartTx) * (ns / pinchStartScale);
              ty = pinchCenter.y - (pinchCenter.y - pinchStartTy) * (ns / pinchStartScale);
              s = ns;
              applyTransform();
            }
          }
        }
      }
      function onPointerUp(e) {
        if (!pointers.has(e.pointerId)) return;
        pointers.delete(e.pointerId);
        if (pointers.size === 0) {
          if (mapDragMoved) mapDragSuppressClick = true;
          mapDragMoved = false;
          wrap.classList.remove("grabbing");
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
          window.removeEventListener("pointercancel", onPointerUp);
        }
      }
      wrap.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointers.size === 1) {
          mapDragMoved = false;
          mapDragSuppressClick = false;
          panStart = { x: e.clientX, y: e.clientY, tx, ty };
          panRect = svg.getBoundingClientRect();
          wrap.classList.add("grabbing");
          window.addEventListener("pointermove", onPointerMove);
          window.addEventListener("pointerup", onPointerUp);
          window.addEventListener("pointercancel", onPointerUp);
        } else if (pointers.size === 2) {
          const pts = [...pointers.values()];
          pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          pinchStartScale = s;
          pinchStartTx = tx;
          pinchStartTy = ty;
          pinchCenter = svgPointFromClient((pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
        }
      });
      wrap.addEventListener("wheel", (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.15 : 0.87;
        zoom(factor, e.clientX, e.clientY);
      }, { passive: false });
      wrap.addEventListener("dblclick", (e) => {
        if (e.target.closest(".map-controls")) return;
        reset();
      });
      wrap.appendChild(svg);
      wrap.appendChild(controls);
      const legend = document.createElement("div");
      legend.className = "map-legend";
      legend.innerHTML = `<span class="lg-min">${fmtNum(maxCount / 8)}</span><span class="lg-swatch"></span><span>${fmtNum(maxCount)}</span>`;
      wrap.appendChild(legend);
      if (!window.matchMedia("(pointer: coarse)").matches) {
        const hint = document.createElement("div");
        hint.className = "map-hint";
        hint.textContent = t("map.dragHint");
        wrap.appendChild(hint);
      }
      container.appendChild(wrap);
    }
    function activateTab(tab) {
      const card = tab.closest(".panel-card");
      if (!card) return;
      const name = tab.dataset.tab;
      card.querySelectorAll(".tab").forEach((tb) => {
        const on = tb === tab;
        tb.classList.toggle("tab-active", on);
        tb.setAttribute("aria-selected", String(on));
      });
      card.querySelectorAll(".panel").forEach((p) => {
        p.hidden = p.dataset.panel !== name;
      });
    }
    function activatePanelTab(cardId, tabName) {
      const card = document.getElementById(cardId);
      const tab = card && card.querySelector(`.tab[data-tab="${tabName}"]`);
      if (tab) activateTab(tab);
    }
    function initCardTabs() {
      document.querySelectorAll(".panel-card").forEach((card) => {
        const tabs = [...card.querySelectorAll(".tab")];
        tabs.forEach((tab) => {
          tab.addEventListener("click", () => activateTab(tab));
          tab.addEventListener("keydown", (e) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();
            const visible = tabs.filter((tb) => !tb.hidden);
            const i = visible.indexOf(tab);
            if (i === -1) return;
            const step = e.key === "ArrowRight" ? 1 : visible.length - 1;
            const next = visible[(i + step) % visible.length];
            next.focus();
            activateTab(next);
          });
        });
      });
    }
    function renderGeo(mapContainer, listContainer, stats, total, clientOrDemo) {
      const geoKey = currentLang() + "|" + String(total || 0) + "|" + (stats || []).map((s) => (s.name || "") + "=" + (s.count ?? s.count_unique ?? 0)).join(",");
      if (softTick && mapContainer._softKey === geoKey) return;
      mapContainer._softKey = geoKey;
      mapContainer.innerHTML = "";
      listContainer.innerHTML = "";
      lastDatasets.geo = { items: stats || [], total };
      function openCountry(name, fromMap) {
        if (!clientOrDemo && !demoMode) return;
        const item = (stats || []).find((s) => s.name === name);
        if (!item) return;
        const code = countryNameToCode(name);
        if (!code) return;
        const row = listContainer.querySelector(`.list-row[data-name="${CSS.escape(name)}"]`);
        const isSame = highlightCode === code;
        listContainer.querySelectorAll(".list-row.selected").forEach((r) => r.classList.remove("selected"));
        listContainer.querySelectorAll(".list-row.open").forEach((r) => {
          r.querySelector(".detail-panel")?.remove();
          r.classList.remove("open");
        });
        if (isSame) {
          highlightCode = null;
        } else {
          highlightCode = code;
          if (row) {
            row.classList.add("selected");
            openRegionsPanel(row, item);
          }
        }
        clearTooltips();
        mapContainer.innerHTML = "";
        renderWorldMap(mapContainer, stats, total, (clickedCode) => {
          const clickedItem = (stats || []).find((s) => countryNameToCode(s.name) === clickedCode);
          if (clickedItem) openCountry(clickedItem.name, true);
        });
        if (fromMap === true) {
          activatePanelTab("geo-card", "list");
          if (row) row.scrollIntoView({ block: "nearest" });
        }
      }
      async function openRegionsPanel(row, item) {
        row.classList.add("open");
        const panel = document.createElement("div");
        panel.className = "detail-panel";
        const title = document.createElement("h4");
        title.textContent = t("geo.regions", { name: item.name });
        panel.appendChild(title);
        row.appendChild(panel);
        let rows;
        if (demoMode) {
          rows = (GOATDASH_DEMO.locationDetails || {})[item.name] || [];
        } else if (client) {
          try {
            const range = getDateRange(currentPreset, customStart, customEnd);
            const url = endpointFor("locations", range.start, range.end, "&limit=20");
            const path = `/api/v0/stats/locations/${encodeURIComponent(item.id || item.name)}${url.slice(url.indexOf("?"))}`;
            const res = await client.request(path);
            rows = res.stats || [];
          } catch (e) {
            if (e.kind === "auth") return handleAuthError(e.message);
            const err = document.createElement("div");
            err.className = "detail-err";
            err.textContent = e.message;
            panel.appendChild(err);
            return;
          }
        }
        if (!row.classList.contains("open")) return;
        if (!rows || !rows.length) {
          panel.appendChild(emptyEl(t("geo.noRegions")));
          return;
        }
        const max = Math.max(...rows.map((r) => r.count), 1);
        rows.slice(0, 10).forEach((r) => {
          const drow = document.createElement("div");
          drow.className = "detail-row region-row";
          const name = document.createElement("span");
          name.className = "dname";
          name.textContent = regionName(r.name);
          const barWrap = document.createElement("span");
          barWrap.className = "list-bar-wrap";
          const bar = document.createElement("span");
          bar.className = "list-bar";
          bar.style.width = r.count / max * 100 + "%";
          barWrap.appendChild(bar);
          const cnt = document.createElement("span");
          cnt.className = "dcount";
          cnt.textContent = fmtNum(r.count);
          drow.append(name, barWrap, cnt);
          panel.appendChild(drow);
        });
      }
      renderWorldMap(mapContainer, stats, total, (code) => {
        const item = (stats || []).find((s) => countryNameToCode(s.name) === code);
        if (item) openCountry(item.name, true);
      });
      const listItems = (stats || []).map((s) => ({ ...s }));
      renderTopList(listContainer, listItems, {
        total,
        prefix: (i) => flagFor(i.name),
        page: "locations",
        onRowClick: (item, row) => openCountry(item.name, false),
        isSelected: (i) => countryNameToCode(i.name) === highlightCode
      });
    }
    function refEmptyEl() {
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
        const b = document.querySelector('#range-menu [data-preset="90d"]');
        if (b) b.click();
      });
      d.append(p, hint, btn);
      return d;
    }
    function renderReferrers(stats, demoDetails) {
      renderReferrersInto($("#referrers-body"), stats, demoDetails);
    }
    function renderReferrersInto(body, stats, demoDetails, { full = false } = {}) {
      const refKey = currentLang() + "|" + (stats || []).map((s) => (s.ref_scheme || "o") + (s.name || "") + "=" + s.count).join(",");
      if (softTick && body._softKey === refKey) return;
      body._softKey = refKey;
      body.innerHTML = "";
      lastDatasets.referrers = { items: stats || [], total: (stats || []).reduce((a, s) => a + s.count, 0) };
      if (!stats || !stats.length) {
        body.appendChild(refEmptyEl());
        return;
      }
      const total = stats.reduce((a, s) => a + s.count, 0);
      const channels = [
        { key: "direct", scheme: "o" },
        { key: "search", scheme: "g" },
        { key: "campaign", scheme: "c" },
        { key: "other", scheme: "h" }
      ];
      const wrap = document.createElement("div");
      wrap.className = "ref-groups";
      channels.forEach((ch) => {
        const items = stats.filter((s) => (s.ref_scheme || "o") === ch.scheme);
        if (!items.length) return;
        const head = document.createElement("div");
        head.className = "ref-channel-head";
        const lbl = document.createElement("span");
        lbl.textContent = t("channel." + ch.key);
        const cnt = document.createElement("span");
        cnt.className = "ref-channel-count";
        cnt.textContent = fmtNum(items.reduce((a, i) => a + i.count, 0));
        head.append(lbl, cnt);
        wrap.appendChild(head);
        const sub = document.createElement("div");
        sub.className = "ref-channel-body";
        wrap.appendChild(sub);
        renderTopList(sub, items, {
          total,
          rank: false,
          max: full ? 0 : 8,
          formatName: (i) => i.name || t("top.direct"),
          onRowClick: ch.scheme === "o" ? null : (item, row) => {
            const demo = demoMode ? demoDetails && demoDetails[item.name] : null;
            toggleDetail(row, "toprefs", item.id || item.name, item.name, { demo, kind: "stats" });
          }
        });
      });
      body.appendChild(wrap);
    }
    async function toggleDetail(row, page, itemId, label, { demo, kind }) {
      const existing = row.querySelector(".detail-panel");
      if (existing) {
        existing.remove();
        row.classList.remove("open");
        return;
      }
      row.classList.add("open");
      const panel = document.createElement("div");
      panel.className = "detail-panel";
      const title = document.createElement("h4");
      title.textContent = t(page === "hits" ? "top.referrers" : page === "toprefs" ? "top.refPages" : "detail.breakdown", { path: label, name: label });
      panel.appendChild(title);
      row.appendChild(panel);
      let rows;
      if (demo) {
        rows = demo;
      } else if (client) {
        try {
          const range = getDateRange(currentPreset, customStart, customEnd);
          const url = endpointFor(page, range.start, range.end, `&limit=10`);
          const path = `/api/v0/stats/${page}/${encodeURIComponent(itemId)}${url.slice(url.indexOf("?"))}`;
          const res = await client.request(path);
          rows = kind === "stats" ? res.stats : res.refs;
        } catch (e) {
          if (e.kind === "auth") return handleAuthError(e.message);
          const err = document.createElement("div");
          err.className = "detail-err";
          err.textContent = e.message;
          panel.appendChild(err);
          return;
        }
      }
      if (!rows || !rows.length) {
        panel.appendChild(emptyEl(t(page === "hits" ? "top.noRef" : page === "toprefs" ? "ref.noData" : "detail.noData")));
        return;
      }
      const max = Math.max(...rows.map((r) => r.count), 1);
      rows.slice(0, 8).forEach((r) => {
        const drow = document.createElement("div");
        drow.className = "detail-row";
        const name = document.createElement("span");
        name.className = "dname";
        name.textContent = r.name || t("top.direct");
        const cnt = document.createElement("span");
        cnt.className = "dcount";
        cnt.textContent = fmtNum(r.count);
        drow.append(name, cnt);
        panel.appendChild(drow);
      });
    }
    const SERVICE_SUBDOMAINS = /* @__PURE__ */ new Set(["stats", "analytics", "goatcounter", "count"]);
    function displayDomain(cname) {
      const parts = (cname || "").split(".");
      if (parts.length > 2 && SERVICE_SUBDOMAINS.has(parts[0].toLowerCase())) {
        return parts.slice(1).join(".");
      }
      return cname || "";
    }
    function siteSlug(cname) {
      return displayDomain(cname).split(".")[0] || "";
    }
    function legibleSiteName(cname) {
      const slug = siteSlug(cname);
      const overrides = { easyzfs: "EasyZFS", netpulse: "NetPulse" };
      if (overrides[slug]) return overrides[slug];
      if (!slug) return "Site";
      return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
    const SITE_FAVICONS = {
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
      wiletics: "assets/favicons/wiletics.ico"
    };
    const SITE_COLORS = ["#3fb950", "#a371f7", "#e3b341", "#f778ba", "#56d4dd", "#ffa657", "#d29922", "#6e3fc2"];
    function siteColorIndex(slug) {
      let h = 0;
      for (let i = 0; i < slug.length; i++) h = h * 31 + slug.charCodeAt(i) | 0;
      return Math.abs(h) % SITE_COLORS.length;
    }
    function siteColorFor(slug) {
      return SITE_COLORS[siteColorIndex(slug)];
    }
    function homeAvailable() {
      return demoMode || sitesList.length > 1;
    }
    function homeSiteList() {
      const root = sitesList.find((s) => !s.parent);
      const children = sitesList.filter((s) => s.parent);
      const mk = (s, isAccount) => {
        const cname = s.cname || s.code || "";
        return { site: s, isAccount, cname, name: legibleSiteName(cname) };
      };
      return [...root ? [mk(root, true)] : [], ...children.map((s) => mk(s, false))];
    }
    function siteUrlKey(s) {
      return s ? displayDomain(s.cname || "") || s.code || "" : "";
    }
    function hashForSite(cname) {
      if (cname) return "#/" + (displayDomain(cname) || cname);
      const key = siteUrlKey(sitesList.find((s) => !s.parent));
      return key ? "#/" + key : "#/";
    }
    function siteFromHash() {
      const raw = (location.hash || "").replace(/^#\/?/, "").trim();
      if (!raw) return null;
      const key = decodeURIComponent(raw).toLowerCase();
      const s = sitesList.find((x) => (siteUrlKey(x) || "").toLowerCase() === key || (x.cname || "").toLowerCase() === key || (x.code || "").toLowerCase() === key);
      return s || false;
    }
    function applyHash() {
      if (demoMode) return;
      const s = siteFromHash();
      if (!s) {
        if (!homeView) showHome();
        return;
      }
      const target = s.parent ? s.cname : null;
      if (homeView || (currentSite || null) !== target) onSiteChange(target);
    }
    function showHome() {
      homeView = true;
      if (!demoMode) {
        if (!location.hash) {
          try {
            history.replaceState(null, "", "#/");
          } catch {
          }
        } else if (location.hash !== "#/") location.hash = "#/";
      }
      $("#site-shell").hidden = true;
      $("#home-view").hidden = false;
      updateBackButton();
      renderSiteSwitch();
      syncTopbarHeight();
      loadHome();
    }
    function showDashboard() {
      homeView = false;
      $("#home-view").hidden = true;
      $("#site-shell").hidden = false;
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
    function siteDomain(s) {
      const cname = s && s.cname || "";
      return (s && s.link_domain || displayDomain(cname) || cname).trim();
    }
    const REGIONS_ES = {
      // España (CCAA)
      "Andalusia": "Andaluc\xEDa",
      "Aragon": "Arag\xF3n",
      "Asturias": "Asturias",
      "Balearic Islands": "Islas Baleares",
      "Basque Country": "Pa\xEDs Vasco",
      "Canary Islands": "Canarias",
      "Cantabria": "Cantabria",
      "Castile and Le\xF3n": "Castilla y Le\xF3n",
      "Castille-La Mancha": "Castilla-La Mancha",
      "Castile-La Mancha": "Castilla-La Mancha",
      "Catalonia": "Catalu\xF1a",
      "Ceuta": "Ceuta",
      "Extremadura": "Extremadura",
      "Galicia": "Galicia",
      "La Rioja": "La Rioja",
      "Madrid": "Comunidad de Madrid",
      "Melilla": "Melilla",
      "Murcia": "Regi\xF3n de Murcia",
      "Navarre": "Navarra",
      "Valencia": "Comunidad Valenciana",
      // Reino Unido
      "England": "Inglaterra",
      "Scotland": "Escocia",
      "Wales": "Gales",
      "Northern Ireland": "Irlanda del Norte",
      // Alemania
      "Bavaria": "Baviera",
      "Baden-W\xFCrttemberg": "Baden-Wurtemberg",
      "Lower Saxony": "Baja Sajonia",
      "North Rhine-Westphalia": "Renania del Norte-Westfalia",
      "Hesse": "Hesse",
      "Saxony": "Sajonia",
      "Saxony-Anhalt": "Sajonia-Anhalt",
      "Thuringia": "Turingia",
      "Rhineland-Palatinate": "Renania-Palatinado",
      "Brandenburg": "Brandeburgo",
      "Mecklenburg-Vorpommern": "Mecklemburgo-Pomerania Occidental",
      "Hamburg": "Hamburgo",
      "Bremen": "Bremen",
      "Berlin": "Berl\xEDn",
      // Francia
      "\xCEle-de-France": "Isla de Francia",
      "Auvergne-Rh\xF4ne-Alpes": "Auvernia-R\xF3dano-Alpes",
      "Brittany": "Breta\xF1a",
      "Normandy": "Normand\xEDa",
      "Provence-Alpes-C\xF4te d'Azur": "Provenza-Alpes-Costa Azul",
      "Occitania": "Occitania",
      "Nouvelle-Aquitaine": "Nueva Aquitania",
      "Hauts-de-France": "Altos de Francia",
      "Pays de la Loire": "Pa\xEDses del Loira",
      "Bourgogne-Franche-Comt\xE9": "Borgo\xF1a-Franco Condado",
      "Grand Est": "Gran Este",
      "Centre-Loire Valley": "Valle del Loira",
      "Corsica": "C\xF3rcega",
      // Italia
      "Lombardy": "Lombard\xEDa",
      "Lazio": "Lacio",
      "Veneto": "V\xE9neto",
      "Piedmont": "Piamonte",
      "Tuscany": "Toscana",
      "Sicily": "Sicilia",
      "Sardinia": "Cerde\xF1a",
      "Emilia-Romagna": "Emilia-Roma\xF1a",
      "Campania": "Campania",
      "Liguria": "Liguria",
      "Apulia": "Apulia",
      "Trentino-Alto Adige": "Trentino-Alto Adigio",
      "Friuli-Venezia Giulia": "Friul-Venecia Julia",
      "Marche": "Marcas",
      "Umbria": "Umbr\xEDa",
      "Abruzzo": "Abruzos",
      "Molise": "Molise",
      "Basilicate": "Basilicata",
      "Calabria": "Calabria",
      // Países Bajos
      "North Holland": "Holanda Septentrional",
      "South Holland": "Holanda Meridional",
      "North Brabant": "Brabante Septentrional",
      "Gelderland": "G\xFCeldres",
      "Utrecht": "Utrecht",
      "Limburg": "Limburgo",
      "Overijssel": "Overijssel",
      "Friesland": "Frisia",
      "Groningen": "Groninga",
      "Drenthe": "Drente",
      "Zeeland": "Zelanda",
      "Flevoland": "Flevoland",
      // Bélgica / Austria / Suiza / Polonia / resto UE
      "Flanders": "Flandes",
      "Wallonia": "Valonia",
      "Brussels": "Bruselas",
      "Vienna": "Viena",
      "Tyrol": "Tirol",
      "Styria": "Estiria",
      "Upper Austria": "Alta Austria",
      "Lower Austria": "Baja Austria",
      "Salzburg": "Salzburgo",
      "Carinthia": "Carintia",
      "Vorarlberg": "Vorarlberg",
      "Burgenland": "Burgenland",
      "Zurich": "Z\xFArich",
      "Zug": "Zug",
      "Bern": "Berna",
      "Vaud": "Vaud",
      "Geneva": "Ginebra",
      "Ticino": "Ticino",
      "Grisons": "Graub\xFCnden",
      "Greater Poland": "Gran Polonia",
      "Lesser Poland": "Peque\xF1a Polonia",
      "Mazovia": "Mazovia",
      "Silesia": "Silesia",
      // América
      "California": "California",
      "Texas": "Texas",
      "Florida": "Florida",
      "New York": "Nueva York",
      "Washington": "Washington",
      "Oregon": "Oreg\xF3n",
      "Nevada": "Nevada",
      "Arizona": "Arizona",
      "Colorado": "Colorado",
      "Illinois": "Illinois",
      "Georgia": "Georgia",
      "North Carolina": "Carolina del Norte",
      "South Carolina": "Carolina del Sur",
      "Virginia": "Virginia",
      "Pennsylvania": "Pensilvania",
      "Ohio": "Ohio",
      "Michigan": "M\xEDchigan",
      "New Jersey": "Nueva Jersey",
      "Massachusetts": "Massachusetts",
      "Quebec": "Quebec",
      "Ontario": "Ontario",
      "British Columbia": "Columbia Brit\xE1nica",
      "Alberta": "Alberta",
      "State of Mexico": "Estado de M\xE9xico",
      "Mexico City": "Ciudad de M\xE9xico",
      "Jalisco": "Jalisco",
      "Nuevo Le\xF3n": "Nuevo Le\xF3n",
      "Puebla": "Puebla",
      "Guanajuato": "Guanajuato",
      "Yucat\xE1n": "Yucat\xE1n",
      "Brazil": "Brasil",
      "S\xE3o Paulo": "S\xE3o Paulo",
      "Rio de Janeiro": "R\xEDo de Janeiro",
      "Minas Gerais": "Minas Gerais",
      "Rio Grande do Sul": "R\xEDo Grande del Sur",
      "Paran\xE1": "Paran\xE1",
      "Buenos Aires": "Buenos Aires",
      "C\xF3rdoba": "C\xF3rdoba",
      "Mendoza": "Mendoza",
      "Chile": "Chile",
      "Santiago Metropolitan": "Santiago",
      "Valpara\xEDso": "Valpara\xEDso",
      "Colombia": "Colombia",
      "Bogota": "Bogot\xE1",
      "Antioquia": "Antioquia",
      "Valle del Cauca": "Valle del Cauca",
      "Peru": "Per\xFA",
      "Lima": "Lima",
      "Uruguay": "Uruguay",
      "Montevideo": "Montevideo",
      // Asia / resto
      "Tokyo": "Tokio",
      "Osaka": "Osaka",
      "Hokkaido": "Hokkaido",
      "Kyoto": "Kioto",
      "New South Wales": "Nueva Gales del Sur",
      "Victoria": "Victoria",
      "Queensland": "Queensland",
      "Western Australia": "Australia Occidental",
      "South Australia": "Australia Meridional",
      "Tamil Nadu": "Tamil Nadu",
      "Maharashtra": "Maharastra",
      "Karnataka": "Karnataka",
      "Delhi": "Delhi",
      "Gujarat": "Guyarat",
      "Rajasthan": "Rajast\xE1n",
      "Uttar Pradesh": "Uttar Pradesh",
      "West Bengal": "Bengala Occidental",
      "Punjab": "Punyab",
      "Telangana": "Telangana",
      "Kerala": "Kerala",
      "Moscow": "Mosc\xFA",
      "Moscow Oblast": "\xD3blast de Mosc\xFA",
      "Saint Petersburg": "San Petersburgo",
      "Istanbul": "Estambul",
      "Ankara": "Ankara",
      "Izmir": "Esmirna",
      "Bursa": "Bursa",
      "Seoul": "Se\xFAl",
      "Busan": "Busan",
      "Gyeonggi-do": "Gyeonggi",
      "Taiwan": "Taiw\xE1n",
      "Hong Kong": "Hong Kong"
    };
    function regionName(name) {
      if (!name) return t("top.unknown");
      if (currentLang() === "es") return REGIONS_ES[name] || name;
      return name;
    }
    function siteIcoEl(entry, cls) {
      const ico = document.createElement("span");
      const slug = siteSlug(entry.cname);
      ico.className = cls + (entry.isAccount ? " acct" : " c" + siteColorIndex(slug));
      ico.textContent = entry.name.charAt(0).toUpperCase();
      const local = slug && SITE_FAVICONS[slug];
      const dom = siteDomain(entry.site);
      if (local || !demoMode && (entry.cname || dom)) {
        const img = document.createElement("img");
        img.className = "favicon";
        img.alt = "";
        img.loading = "lazy";
        img.referrerPolicy = "no-referrer";
        img.addEventListener("error", () => img.remove());
        img.src = local || "https://" + (entry.cname || dom) + "/favicon.ico";
        ico.appendChild(img);
      }
      return ico;
    }
    let switchQuery = "";
    function renderSiteSwitch() {
      const wrap = $("#site-switch");
      if (!wrap) return;
      const show = !demoMode && !homeView && client && sitesList.length > 1;
      wrap.hidden = !show;
      if (!show) return;
      const list = homeSiteList();
      const curEntry = list.find((e) => e.isAccount ? currentSite === null : e.cname === currentSite) || list[0];
      const nameEl = $("#site-switch-name");
      if (nameEl) nameEl.textContent = siteDomain(curEntry.site) || curEntry.name;
      const icoEl = $("#site-switch-ico");
      if (icoEl) {
        icoEl.innerHTML = "";
        icoEl.appendChild(siteIcoEl(curEntry, "site-item-ico"));
      }
      const nav = $("#site-switch-list");
      if (!nav) return;
      const q = switchQuery.trim().toLowerCase();
      const items = list.filter((e) => !q || e.name.toLowerCase().includes(q) || siteDomain(e.site).toLowerCase().includes(q) || (e.cname || "").toLowerCase().includes(q));
      nav.innerHTML = "";
      if (!items.length) {
        nav.appendChild(emptyEl(t("home.noResults")));
        return;
      }
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
        dom.textContent = e.isAccount ? t("home.account") : siteDomain(e.site) || e.cname;
        txt.append(nm, dom);
        b.appendChild(txt);
        if (current) {
          const ck = document.createElement("span");
          ck.className = "site-check";
          ck.textContent = "\u2713";
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
    function closeSiteSwitch() {
      const m = $("#site-switch-menu");
      const b = $("#site-switch-btn");
      if (m) m.hidden = true;
      if (b) b.setAttribute("aria-expanded", "false");
      switchQuery = "";
      const si = $("#site-switch-search");
      if (si) si.value = "";
    }
    const COLLECT_FLAGS = [
      [2, "settings.collectReferrer"],
      [4, "settings.collectUserAgent"],
      [8, "settings.collectScreenSize"],
      [16, "settings.collectLocation"],
      [32, "settings.collectLocationRegion"],
      [64, "settings.collectLanguage"],
      [128, "settings.collectSessions"]
    ];
    const COLLECT_MASK = COLLECT_FLAGS.reduce((acc, f) => acc | f[0], 0);
    let settingsSiteId = null;
    function tokenCanWriteSettings() {
      const p = config && config.me && config.me.token ? Number(config.me.token.permissions) : NaN;
      return Number.isFinite(p) && (p & 32) !== 0;
    }
    async function openSiteSettings() {
      if (demoMode || !client) return;
      const entries = homeSiteList();
      const cur = entries.find((e) => e.isAccount ? currentSite === null : e.cname === currentSite) || entries[0];
      if (!cur || !cur.site || !cur.site.id) return;
      settingsSiteId = cur.site.id;
      const dom = $("#settings-domain");
      if (dom) dom.textContent = siteDomain(cur.site) || cur.cname;
      let site = cur.site;
      try {
        const fresh = await client.request("/api/v0/sites/" + cur.site.id, { site: null, forceRefresh: true, cacheKey: "s:@:site:" + cur.site.id });
        if (fresh && fresh.settings) site = fresh;
      } catch {
      }
      if (!site || !site.settings) {
        const saved = $("#settings-saved");
        if (saved) {
          saved.hidden = false;
          saved.classList.add("error");
          saved.textContent = t("settings.saveError", { msg: "settings?" });
        }
        const saveBtn = $("#settings-save");
        if (saveBtn) saveBtn.hidden = true;
        const dlg2 = $("#settings-dialog");
        if (dlg2 && !dlg2.open) dlg2.showModal();
        return;
      }
      fillSettingsForm(site);
      const dlg = $("#settings-dialog");
      if (dlg && !dlg.open) dlg.showModal();
    }
    function fillSettingsForm(site) {
      const s = site && site.settings || {};
      const canWrite = tokenCanWriteSettings();
      const fs = $("#settings-collect");
      if (fs) {
        fs.innerHTML = "";
        const legend = document.createElement("legend");
        legend.textContent = t("settings.collect");
        fs.appendChild(legend);
        const cur = Number(s.collect || 0);
        COLLECT_FLAGS.forEach((pair) => {
          const bit = pair[0];
          const key = pair[1];
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
      const ips = $("#settings-ignore-ips");
      if (ips) ips.value = (s.ignore_ips || []).join("\n");
      const ret = $("#settings-retention");
      if (ret) ret.value = String(Number(s.data_retention || 0));
      [ips, ret].forEach((el) => {
        if (el) el.disabled = !canWrite;
      });
      const saveBtn = $("#settings-save");
      if (saveBtn) {
        saveBtn.hidden = !canWrite;
        saveBtn.disabled = false;
      }
      const ro = $("#settings-readonly");
      if (ro) ro.hidden = canWrite;
      const saved = $("#settings-saved");
      if (saved) {
        saved.hidden = true;
        saved.classList.remove("error");
        saved.textContent = t("settings.saved");
      }
    }
    async function saveSiteSettings(e) {
      e.preventDefault();
      if (!tokenCanWriteSettings() || !settingsSiteId) return;
      let collect = 0;
      document.querySelectorAll("#settings-collect input[type=checkbox]").forEach((cb) => {
        if (cb.checked) collect |= Number(cb.dataset.collectBit);
      });
      const cur = sitesList.find((x) => x.id === settingsSiteId);
      collect |= Number(cur && cur.settings && cur.settings.collect || 0) & ~COLLECT_MASK;
      const ipsRaw = ($("#settings-ignore-ips").value || "").split(/[\n,]+/).map((x) => x.trim()).filter(Boolean);
      const retention = Math.max(0, parseInt($("#settings-retention").value, 10) || 0);
      const body = { settings: { collect, ignore_ips: ipsRaw, data_retention: retention } };
      const saveBtn = $("#settings-save");
      if (saveBtn) saveBtn.disabled = true;
      try {
        const updated = await client.request("/api/v0/sites/" + settingsSiteId, {
          site: null,
          method: "PATCH",
          body,
          forceRefresh: true,
          cacheKey: "s:@:site:" + settingsSiteId
        });
        const idx = sitesList.findIndex((x) => x.id === settingsSiteId);
        if (idx >= 0 && updated && updated.settings) sitesList[idx] = updated;
        const saved = $("#settings-saved");
        if (saved) {
          saved.hidden = false;
          saved.classList.remove("error");
          saved.textContent = t("settings.saved");
        }
        setTimeout(() => {
          const d = $("#settings-dialog");
          if (d && d.open) d.close();
        }, 900);
      } catch (err) {
        const saved = $("#settings-saved");
        if (saved) {
          saved.hidden = false;
          saved.classList.add("error");
          saved.textContent = t("settings.saveError", { msg: err && err.message ? err.message : "?" });
        }
      } finally {
        if (saveBtn) saveBtn.disabled = false;
      }
    }
    function initSiteSettings() {
      const btn = $("#site-settings-btn");
      if (btn) btn.addEventListener("click", () => {
        closeUserMenu();
        openSiteSettings();
      });
      const form = $("#settings-form");
      if (form) form.addEventListener("submit", saveSiteSettings);
      const close = $("#settings-close");
      if (close) close.addEventListener("click", () => {
        const d = $("#settings-dialog");
        if (d && d.open) d.close();
      });
      const cancel = $("#settings-cancel");
      if (cancel) cancel.addEventListener("click", () => {
        const d = $("#settings-dialog");
        if (d && d.open) d.close();
      });
    }
    function homeWindow() {
      const end = /* @__PURE__ */ new Date();
      end.setMinutes(0, 0, 0);
      const start = new Date(end.getTime() - 24 * 36e5);
      return { start, end };
    }
    function buildHourlySeries(hitsData, start, end) {
      const map = /* @__PURE__ */ new Map();
      (hitsData.hits || []).forEach((h) => {
        (h.stats || []).forEach((s) => {
          if (!s.hourly) return;
          s.hourly.forEach((v, hour) => {
            if (v <= 0) return;
            const k = `${s.day}T${String(hour).padStart(2, "0")}:00:00Z`;
            map.set(k, (map.get(k) || 0) + v);
          });
        });
      });
      const t0 = start.getTime(), t1 = end.getTime();
      return [...map.entries()].filter(([ts]) => {
        const d = new Date(ts).getTime();
        return d >= t0 && d < t1;
      }).sort((a, b) => a[0].localeCompare(b[0])).map(([ts, count]) => ({ ts, count }));
    }
    function sparklineSVG(series) {
      const ns = "http://www.w3.org/2000/svg";
      const W = 240, H = 44;
      const svg = document.createElementNS(ns, "svg");
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("preserveAspectRatio", "none");
      svg.setAttribute("class", "spark");
      if (!series || !series.length) return svg;
      const max = Math.max(...series.map((s) => s.count), 1);
      const n = series.length;
      const x = (i) => n === 1 ? W / 2 : i / (n - 1) * W;
      const y = (v) => H - 3 - v / max * (H - 8);
      const pts = series.map((s, i) => [x(i), y(s.count)]);
      const line = "M" + pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L");
      const area = line + ` L${pts[pts.length - 1][0].toFixed(1)},${H} L${pts[0][0].toFixed(1)},${H} Z`;
      const defs = document.createElementNS(ns, "defs");
      const grad = document.createElementNS(ns, "linearGradient");
      grad.id = "sparkFill";
      grad.setAttribute("x1", "0");
      grad.setAttribute("y1", "0");
      grad.setAttribute("x2", "0");
      grad.setAttribute("y2", "1");
      const stop1 = document.createElementNS(ns, "stop");
      stop1.setAttribute("offset", "0%");
      stop1.setAttribute("stop-color", "var(--chart-line)");
      stop1.setAttribute("stop-opacity", "0.25");
      const stop2 = document.createElementNS(ns, "stop");
      stop2.setAttribute("offset", "100%");
      stop2.setAttribute("stop-color", "var(--chart-line)");
      stop2.setAttribute("stop-opacity", "0");
      grad.append(stop1, stop2);
      defs.appendChild(grad);
      svg.appendChild(defs);
      const areaEl = document.createElementNS(ns, "path");
      areaEl.setAttribute("d", area);
      areaEl.setAttribute("fill", "url(#sparkFill)");
      svg.appendChild(areaEl);
      const lineEl = document.createElementNS(ns, "path");
      lineEl.setAttribute("d", line);
      lineEl.setAttribute("class", "spark-line");
      svg.appendChild(lineEl);
      return svg;
    }
    function deriveTokenScope() {
      allowedSiteIDs = null;
      const tok = config && config.me && config.me.token;
      if (!tok || !Array.isArray(tok.sites) || tok.sites.length === 0) return;
      const ids = tok.sites.map(Number);
      if (ids.length === 1 && ids[0] === -1) return;
      allowedSiteIDs = new Set(ids);
    }
    function refreshTokenScope() {
      if (!client || !config) return;
      const cfg = config;
      client.request("/api/v0/me", { retries: 1, forceRefresh: true, site: null }).then((me) => {
        if (!me || !me.token) return;
        const before = JSON.stringify(cfg.me && cfg.me.token && cfg.me.token.sites || null);
        const after = JSON.stringify(me.token.sites || null);
        cfg.me = me;
        safeStore(STORAGE_KEY, JSON.stringify(config));
        if (before !== after) {
          deriveTokenScope();
          loadSiteSelector();
        }
      }).catch(() => {
      });
    }
    async function loadSiteSelector() {
      if (demoMode || !client) return sitesList;
      try {
        const data = await client.request("/api/v0/sites", { forceRefresh: true, site: null });
        sitesList = data && data.sites || [];
        const scope = allowedSiteIDs;
        if (scope) sitesList = sitesList.filter((s) => scope.has(s.id));
        sitesList.sort(
          (a, b) => legibleSiteName(a.cname || a.code || "").toLowerCase().localeCompare(legibleSiteName(b.cname || b.code || "").toLowerCase()) || String(a.cname || "").localeCompare(String(b.cname || ""))
        );
      } catch {
        sitesList = [];
      }
      if (allowedSiteIDs && currentSite && !sitesList.some((s) => s.cname === currentSite)) {
        currentSite = null;
        if (client) client.siteBaseURL = null;
        if (config) {
          config.site = null;
          safeStore(STORAGE_KEY, JSON.stringify(config));
        }
      }
      return sitesList;
    }
    let precacheToken = null;
    async function precacheSites() {
      if (precacheToken) precacheToken.cancelled = true;
      if (demoMode || !client || !sitesList.length) return;
      const token = { cancelled: false };
      precacheToken = token;
      const range = getDateRange(currentPreset, customStart, customEnd);
      const eps = buildEndpointSet(range);
      const urls = [{ url: eps.total, kind: "total" }, { url: eps.hits, kind: "hits" }];
      const root = sitesList.find((s) => !s.parent);
      const active = currentSite || (root ? root.cname : "");
      const targets = sitesList.filter((s) => s.cname && s.cname !== active).map((s) => s.cname);
      for (const cname of targets) {
        if (token.cancelled) break;
        await Promise.allSettled(urls.map(
          ({ url, kind }) => client.request(url, { site: cname, priority: "low", signal: token, cacheKey: cacheKeyFor(kind, cname) }).catch((e) => {
            console.warn("[precache]", cname, kind, e && e.message ? e.message : e);
            return null;
          })
        ));
      }
      if (precacheToken === token) precacheToken = null;
    }
    function onSiteChange(cname) {
      currentSite = cname || null;
      if (!demoMode) {
        const h = hashForSite(cname);
        if (location.hash !== h) location.hash = h;
      }
      if (client) client.siteBaseURL = currentSite ? "https://" + currentSite : null;
      if (config) {
        config.site = currentSite;
        safeStore(STORAGE_KEY, JSON.stringify(config));
      }
      if (pathFilter) {
        pathFilter = null;
        $("#filter-chip").hidden = true;
        const input = $("#path-filter-input");
        if (input) input.value = "";
      }
      pathsCache.clear();
      if (precacheToken) precacheToken.cancelled = true;
      syncRealtime();
      if (homeToken) homeToken.cancelled = true;
      showDashboard();
      loadData();
    }
    let homeToken = null;
    const HOME_CACHE_KEY = "gc-home-cache-v1";
    const HOME_CACHE_MAX_AGE_MS = 7 * 24 * 36e5;
    function homeCacheKeyFor(e) {
      return e.isAccount ? "@" : e.cname;
    }
    function homeCacheRead() {
      try {
        const raw = localStorage.getItem(HOME_CACHE_KEY);
        if (!raw) return null;
        const obj = JSON.parse(raw);
        if (!obj || !obj.sites || Date.now() - (obj.ts || 0) > HOME_CACHE_MAX_AGE_MS) return null;
        return obj.sites;
      } catch {
        return null;
      }
    }
    function homeCacheWrite() {
      try {
        const sites = {};
        homeData.forEach((e) => {
          if (e.status !== "ready" || e.visitors === null) return;
          sites[homeCacheKeyFor(e)] = { visitors: e.visitors, prev: e.prev, series: e.series };
        });
        safeStore(HOME_CACHE_KEY, JSON.stringify({ ts: Date.now(), sites }));
      } catch {
      }
    }
    async function loadHome(force = false) {
      dataLoading = true;
      try {
        await loadHomeInner(force);
      } finally {
        dataLoading = false;
      }
    }
    async function loadHomeInner(force = false) {
      if (demoMode) {
        renderHomeDemo();
        return;
      }
      if (!client) return;
      const token = { cancelled: false };
      homeToken = token;
      const cached = force ? null : homeCacheRead();
      homeData = homeSiteList().map((e) => {
        const prev = homeData.find((h) => h.isAccount === e.isAccount && h.cname === e.cname);
        if (force && prev && (prev.status === "ready" || prev.status === "error")) {
          return { ...e, status: prev.status, visitors: prev.visitors, prev: prev.prev, series: prev.series, error: prev.error };
        }
        const c = cached && cached[homeCacheKeyFor(e)];
        if (c) return { ...e, status: "ready", visitors: c.visitors, prev: c.prev, series: c.series, error: null };
        return { ...e, status: "loading", visitors: null, prev: null, series: null, error: null };
      });
      renderHome();
      const { start, end } = homeWindow();
      await Promise.all(homeData.map((e) => loadHomeSite(e, start, end, token, force)));
      if (!token.cancelled) homeCacheWrite();
    }
    async function loadHomeSite(e, start, end, token, force) {
      const site = e.isAccount ? null : e.cname;
      const ck = (kind) => `s:${site || "@"}:home:${kind}`;
      const qs = (a, b) => `?start=${encodeURIComponent(a.toISOString())}&end=${encodeURIComponent(b.toISOString())}`;
      const pStart = new Date(start.getTime() - 24 * 36e5);
      const opt = (kind) => ({ site, cacheKey: ck(kind), forceRefresh: !!force });
      const fire = (p) => p.catch((err) => ({ __error: err }));
      try {
        const [total, prev, hits] = await Promise.all([
          fire(client.request(`/api/v0/stats/total${qs(start, end)}`, opt("total"))),
          fire(client.request(`/api/v0/stats/total${qs(pStart, start)}`, opt("prev"))),
          fire(client.request(`/api/v0/stats/hits${qs(start, end)}&limit=20`, opt("hits")))
        ]);
        if (token && token.cancelled) return;
        for (const r of [total, prev, hits]) {
          if (r && r.__error) {
            if (r.__error.kind === "auth") {
              handleAuthError(r.__error.message);
              return;
            }
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
        if (e.status === "ready" && e.visitors !== null) {
          e.error = err;
          return;
        }
        e.status = "error";
        e.error = err;
      }
      renderHome();
    }
    function renderHome() {
      const grid = $("#home-grid");
      if (!grid) return;
      const q = homeQuery.trim().toLowerCase();
      const items = homeData.filter((e) => !q || e.name.toLowerCase().includes(q) || (e.cname || "").toLowerCase().includes(q));
      const dir = homeSort.dir === "asc" ? 1 : -1;
      items.sort((a, b) => {
        if (homeSort.by === "name") {
          return dir * a.name.toLowerCase().localeCompare(b.name.toLowerCase()) || (b.visitors ?? -1) - (a.visitors ?? -1);
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
      const prev = {};
      [...grid.children].forEach((c) => {
        const ce = c;
        prev[ce.dataset.site ?? ""] = ce;
      });
      const els = items.map((e) => updateHomeCard(prev[e.cname || ""] || null, e));
      els.forEach((el) => grid.appendChild(el));
      [...grid.children].forEach((c) => {
        if (!els.includes(c)) c.remove();
      });
    }
    function updateHomeCard(old, e) {
      if (old && e.status === "ready" && !old.classList.contains("home-card-loading") && !old.classList.contains("home-card-error")) {
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
    function homeTrendEl(e) {
      const trendRow = document.createElement("span");
      trendRow.className = "home-trend";
      let trend = null;
      if (e.prev === 0 && e.visitors > 0) trend = 100;
      else if (e.prev > 0) trend = (e.visitors - e.prev) / e.prev * 100;
      if (trend !== null && isFinite(trend)) {
        const span = document.createElement("span");
        span.className = trend >= 0 ? "trend-up" : "trend-down";
        span.textContent = fmtPct(trend);
        trendRow.append(span, " " + t("home.vsPrev"));
      } else {
        trendRow.textContent = "\u2014";
      }
      return trendRow;
    }
    function homeCardEl(e) {
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
      sub.textContent = e.isAccount ? t("home.account") : siteDomain(e.site) || e.cname;
      names.append(nm, sub);
      head.append(names);
      if (e.status === "loading") {
        card.classList.add("home-card-loading");
        card.disabled = true;
        const body2 = document.createElement("span");
        body2.className = "home-card-body";
        body2.innerHTML = '<span class="skeleton sk-value home-skel-num"></span><span class="skeleton sk-label home-skel-cap"></span><span class="skeleton spark-skel"></span>';
        card.append(head, body2);
        return card;
      }
      if (e.status === "error") {
        card.classList.add("home-card-error");
        const body2 = document.createElement("span");
        body2.className = "home-card-body";
        const msg = document.createElement("span");
        msg.className = "home-error";
        msg.textContent = t("err.failed");
        const retry = document.createElement("span");
        retry.className = "home-retry";
        retry.textContent = t("err.retry");
        body2.append(msg, retry);
        card.append(head, body2);
        card.addEventListener("click", () => {
          e.status = "loading";
          renderHome();
          const { start, end } = homeWindow();
          loadHomeSite(e, start, end, homeToken, true);
        });
        return card;
      }
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
        card.addEventListener("click", () => {
          showDashboard();
          loadData();
        });
      }
      return card;
    }
    const DEMO_HOME_SITES = ["Aurora Store", "Northwind Docs", "Pixel Blog", "Atlas Landing", "Beacon Status", "Comet API"];
    function hash32(s) {
      let h = 0;
      for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
      return h >>> 0;
    }
    function mulberry32(a) {
      return function() {
        a |= 0;
        a = a + 1831565813 | 0;
        let t2 = Math.imul(a ^ a >>> 15, 1 | a);
        t2 = t2 + Math.imul(t2 ^ t2 >>> 7, 61 | t2) ^ t2;
        return ((t2 ^ t2 >>> 14) >>> 0) / 4294967296;
      };
    }
    function renderHomeDemo() {
      homeData = DEMO_HOME_SITES.map((name, i) => {
        const rng = mulberry32(hash32(name));
        const base = 80 + Math.floor(rng() * 900);
        const series = [];
        for (let h = 0; h < 24; h++) {
          const wave = 0.35 + 0.65 * Math.max(0, Math.sin((h - 6) / 24 * Math.PI * 2));
          series.push({ ts: `dT${String(h).padStart(2, "0")}:00:00Z`, count: Math.max(0, Math.round(base * wave * (0.6 + rng() * 0.8))) });
        }
        const visitors = Math.round(series.reduce((a, s) => a + s.count, 0) * (0.55 + rng() * 0.2));
        const prev = Math.round(visitors * (0.6 + rng() * 0.7));
        return {
          site: { code: "demo" + i },
          isAccount: false,
          cname: name.toLowerCase().replace(/[^a-z]+/g, "") + ".demo",
          name,
          status: "ready",
          visitors,
          prev,
          series,
          error: null
        };
      });
      renderHome();
    }
    function initHomeControls() {
      const search = $("#home-search");
      if (search) search.addEventListener("input", () => {
        homeQuery = search.value;
        renderHome();
      });
      const sort = $("#home-sort");
      if (sort) sort.addEventListener("change", () => {
        homeSort.by = sort.value;
        safeStore(HOME_SORT_KEY, JSON.stringify(homeSort));
        renderHome();
      });
      const dir = $("#home-dir");
      if (dir) dir.addEventListener("click", () => {
        homeSort.dir = homeSort.dir === "asc" ? "desc" : "asc";
        safeStore(HOME_SORT_KEY, JSON.stringify(homeSort));
        renderHomeControls();
        renderHome();
      });
      const back = $("#back-btn");
      if (back) back.addEventListener("click", () => {
        if (homeView) loadHome(true);
        else showHome();
      });
      const swBtn = $("#site-switch-btn");
      if (swBtn) swBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const m = $("#site-switch-menu");
        const open = m.hidden;
        m.hidden = !open;
        swBtn.setAttribute("aria-expanded", String(open));
        if (open) {
          renderSiteSwitch();
          const si = $("#site-switch-search");
          if (si) {
            si.value = "";
            switchQuery = "";
            si.focus();
          }
        }
      });
      const swSearch = $("#site-switch-search");
      if (swSearch) swSearch.addEventListener("input", () => {
        switchQuery = swSearch.value;
        renderSiteSwitch();
      });
    }
    function syncTopbarHeight() {
      const tb = $(".topbar");
      if (tb) document.documentElement.style.setProperty("--topbar-h", tb.offsetHeight + "px");
    }
    function loadDashboard() {
      $("#connect-screen").hidden = true;
      $("#dash-screen").hidden = false;
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
        refreshTick++;
        if (homeView) loadHome(true);
        else loadData();
      });
      initHomeControls();
      initSiteSettings();
      initFooter();
      syncAutoRefresh();
      const ssBtn = $("#site-settings-btn");
      if (ssBtn) ssBtn.hidden = demoMode;
      if (demoMode) {
        showHome();
        return;
      }
      window.addEventListener("hashchange", () => {
        applyHash();
      });
      loadSiteSelector().then(() => {
        const deepLink = location.hash && location.hash !== "#/";
        if (deepLink) applyHash();
        else if (sitesList.length > 1) showHome();
        else {
          showDashboard();
          loadData();
        }
      });
    }
    let refreshTick = 0;
    let autoTimer = null;
    let dataLoading = false;
    let rateTimer = null;
    function showRateBanner(retryAfterSec) {
      const banner = $("#error-banner");
      if (!banner) return;
      let remaining = Math.min(Math.max(Math.round(retryAfterSec || 30), 5), 90);
      const paint = () => {
        banner.textContent = t("err.rateBanner", { sec: remaining });
        banner.hidden = false;
      };
      paint();
      clearInterval(rateTimer);
      rateTimer = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearInterval(rateTimer);
          rateTimer = null;
          banner.hidden = true;
          if (!$("#dash-screen").hidden) loadData();
        } else paint();
      }, 1e3);
    }
    async function loadData(opts) {
      const soft = !!(opts && opts.soft);
      const force = !!(opts && opts.force);
      softTick = soft;
      dataLoading = true;
      cancelledRef.current = true;
      cancelledRef = { current: false };
      const current = cancelledRef;
      lastDatasets = {};
      lastPrevTotalData = null;
      lastPrevHitsData = null;
      progress = { fired: 0, done: 0 };
      $("#error-banner").hidden = true;
      if (!soft) {
        expandedPage = null;
        highlightCode = null;
        mapTransformState = null;
        closeExpand();
        if (chartAnimState && chartAnimState.cancel) chartAnimState.cancel();
        chartAnimState = null;
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
      const campsTab = $("#campaigns-tab");
      const campsBody = $("#campaigns-body");
      if (!soft && campsBody) campsBody.innerHTML = "";
      if (campsTab) {
        const campsPanel = document.querySelector('#content-card [data-panel="campaigns"]');
        if (!campsTab.hidden && campsPanel && !campsPanel.hidden) activatePanelTab("content-card", "pages");
        campsTab.hidden = true;
      }
      const range = getDateRange(currentPreset, customStart, customEnd);
      lastChartDays = range.days;
      const group = effectiveGroup();
      let prevTotal = null;
      let data = null;
      if (demoMode) {
        const preset = currentPreset === "custom" ? GOATDASH_DEMO.customFallback || "30d" : currentPreset;
        demoPreset = preset;
        const built = GOATDASH_DEMO.build(preset);
        data = built.data;
        prevTotal = built.prevTotal;
        lastPrevTotalData = built.prevTotalData || null;
        lastPrevHitsData = built.prevHitsData || null;
        lastUpdatedAt = Date.now();
        renderKPIs(data, prevTotal, group);
        setTrafficData(data);
        renderPagesDemo();
        renderLanguages(data.languages.stats);
        renderReferrers(data.toprefs ? data.toprefs.stats : [], GOATDASH_DEMO.refDetails);
        renderDonutsDemo(data);
        renderGeoDemo(data);
        if (data.campaigns.stats.length) {
          $("#campaigns-tab").hidden = false;
          renderCampaignsDemo(data.campaigns.stats);
        }
        updateFreshness();
        dataLoading = false;
        return;
      }
      try {
        const eps = buildEndpointSet(range);
        const ck = (kind) => cacheKeyFor(kind, currentSite);
        const staleTotal = client._readCache(eps.total, void 0, true, ck("total"));
        const staleHits = client._readCache(eps.hits, void 0, true, ck("hits"));
        if (!soft && staleTotal !== null) {
          const stalePrev = client._readCache(eps.prev, void 0, true, ck("prev"));
          if (stalePrev) lastPrevTotalData = stalePrev;
          renderKPIs(
            { total: staleTotal, hits: staleHits || { hits: [] } },
            stalePrev ? stalePrev.total ?? stalePrev.total_utc ?? null : null,
            group
          );
          if (staleHits) setTrafficData({ total: staleTotal, hits: staleHits });
          if (staleHits) renderPages(staleHits.hits || [], staleHits.more);
          lastUpdatedAt = Date.now();
        }
        const fire = (kind) => client.request(eps[kind], { cacheKey: ck(kind), forceRefresh: force }).catch((e) => ({ __error: e }));
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
        const [totalRes, hitsRes] = await Promise.allSettled([pTotal, pHits]);
        if (current.cancelled) return;
        if (totalRes.status === "rejected" && totalRes.reason.kind === "auth") return handleAuthError(totalRes.reason.message);
        if (hitsRes.status === "rejected" && hitsRes.reason.kind === "auth") return handleAuthError(hitsRes.reason.message);
        progress.fired = 5;
        progress.done = 2;
        data = {
          total: totalRes.status === "fulfilled" && !totalRes.value.__error ? totalRes.value : { total: 0 },
          hits: hitsRes.status === "fulfilled" && !hitsRes.value.__error ? hitsRes.value : { hits: [] }
        };
        renderKPIs(data, null, group);
        setTrafficData(data);
        renderPages(data.hits.hits, data.hits.more);
        lastUpdatedAt = Date.now();
        dataLoading = false;
        updateFreshness();
        const [prevRes, langRes, refRes] = await Promise.allSettled([pPrev, pLang, pRef]);
        if (current.cancelled) return;
        progress.done = 5;
        data.languages = langRes.status === "fulfilled" && !langRes.value.__error ? langRes.value : { stats: [] };
        prevTotal = prevRes.status === "fulfilled" && !prevRes.value.__error ? prevRes.value.total ?? prevRes.value.total_utc ?? null : null;
        lastPrevTotalData = prevRes.status === "fulfilled" && !prevRes.value.__error ? prevRes.value : lastPrevTotalData;
        renderKPIs(data, prevTotal, group);
        renderLanguages(data.languages.stats);
        renderReferrers(refRes.status === "fulfilled" && !refRes.value.__error ? refRes.value.stats : [], null);
        lastUpdatedAt = Date.now();
        const lazy = async (key, refId, renderFn) => {
          const target = $(refId);
          if (!target) {
            await renderFn();
            return;
          }
          await new Promise((resolve) => {
            if (!("IntersectionObserver" in window)) {
              renderFn().then(resolve);
              return;
            }
            const io = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                io.disconnect();
                renderFn().then(resolve);
              }
            }, { threshold: 0.1 });
            io.observe(target);
          });
        };
        await Promise.all([
          lazy("browsers", "#devices-card", async () => {
            if (current.cancelled) return;
            const [b, s, z] = await Promise.allSettled([pBrowsers, pSystems, pSizes]);
            if (current.cancelled) return;
            const err = (r) => r.status === "fulfilled" ? r.value.__error : r.reason;
            if (b.status === "fulfilled" && !b.value.__error) renderDonut($("#browsers-body"), b.value.stats, { total: b.value.total, page: "browsers", iconFor: donutIconFor("browsers"), onDrill: (item, idx) => drillDetail("browsers", item, idx) });
            else renderDonutErr("browsers", err(b));
            if (s.status === "fulfilled" && !s.value.__error) renderDonut($("#systems-body"), s.value.stats, { total: s.value.total, page: "systems", iconFor: donutIconFor("systems"), onDrill: (item, idx) => drillDetail("systems", item, idx) });
            else renderDonutErr("systems", err(s));
            if (z.status === "fulfilled" && !z.value.__error) renderDonut($("#sizes-body"), z.value.stats.map((i) => ({ ...i, name: deviceLabel(i.id || i.name) })), { total: z.value.total, page: "sizes", iconFor: donutIconFor("sizes"), onDrill: (item, idx) => drillDetail("sizes", item, idx) });
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
              if (camps.__error.kind === "notfound") {
                if (body) body.innerHTML = "";
                if (tab) tab.hidden = true;
                return;
              }
              throw camps.__error;
            }
            if (camps.stats && camps.stats.length) {
              tab.hidden = false;
              renderCampaignsInto(body, camps.stats, camps.total);
            } else if (body) {
              body.innerHTML = "";
            }
          })
        ]);
        precacheSites();
        updateFreshness();
      } catch (e) {
        dataLoading = false;
        if (e.kind === "auth") return handleAuthError(e.message);
        updateFreshness();
      }
    }
    function renderDonutErr(key, reason) {
      if (reason.kind === "auth") return handleAuthError(reason.message);
      const container = $({ browsers: "#browsers-body", systems: "#systems-body", sizes: "#sizes-body" }[key]);
      if (container) container.innerHTML = "", container.appendChild(errCard(key));
    }
    function donutContainer(page) {
      return $({ browsers: "#browsers-body", systems: "#systems-body", sizes: "#sizes-body" }[page]);
    }
    function drillDetail(page, item, idx, container) {
      container = container || donutContainer(page);
      if (!container) return;
      const apiId = item.apiId || item.id || item.name;
      const detailKey = page === "browsers" ? "browserDetails" : page === "systems" ? "systemDetails" : page === "sizes" ? "sizeDetails" : null;
      const demoDetails = demoMode && detailKey ? GOATDASH_DEMO[detailKey] : null;
      if (demoMode) {
        const rows = demoDetails ? demoDetails[item.apiId || item.name] : null;
        container.innerHTML = "";
        const d = document.createElement("div");
        d.className = "detail-panel detail-donut";
        const title = document.createElement("h4");
        title.textContent = t("detail.breakdown", { name: item.name });
        d.appendChild(title);
        if (rows && rows.length) {
          const max = Math.max(...rows.map((r) => r.count), 1);
          const dIcon = detailIconFor(page);
          rows.forEach((r) => {
            const ro = document.createElement("div");
            ro.className = "detail-row";
            if (dIcon) {
              const ic = dIcon(r.name);
              if (ic) ro.appendChild(iconEl(ic, 14, "dicon"));
            }
            const nm = document.createElement("span");
            nm.className = "dname";
            nm.textContent = r.name;
            const cnt = document.createElement("span");
            cnt.className = "dcount";
            cnt.textContent = fmtNum(r.count);
            ro.append(nm, cnt);
            d.appendChild(ro);
          });
        } else {
          d.appendChild(emptyEl(t("detail.noData")));
        }
        const back = document.createElement("button");
        back.type = "button";
        back.className = "detail-back";
        back.textContent = t("detail.back");
        back.addEventListener("click", () => closeDonutDetail(page, container));
        d.appendChild(back);
        container.appendChild(d);
        return;
      }
      toggleDetailForDonut(page, apiId, item.name, container);
    }
    async function toggleDetailForDonut(page, apiId, label, container) {
      container = container || donutContainer(page);
      if (!container) return;
      container.innerHTML = "";
      const panel = document.createElement("div");
      panel.className = "detail-panel detail-donut";
      const title = document.createElement("h4");
      title.textContent = t("detail.breakdown", { name: label });
      panel.appendChild(title);
      const back = document.createElement("button");
      back.type = "button";
      back.className = "detail-back";
      back.textContent = t("detail.back");
      back.addEventListener("click", () => closeDonutDetail(page, container));
      container.appendChild(panel);
      try {
        const range = getDateRange(currentPreset, customStart, customEnd);
        const url = endpointFor(page, range.start, range.end, "&limit=10");
        const path = `/api/v0/stats/${page}/${encodeURIComponent(apiId)}${url.slice(url.indexOf("?"))}`;
        const res = await client.request(path);
        const rows = res.stats || [];
        if (!rows.length) {
          panel.appendChild(emptyEl(t("detail.noData")));
          panel.appendChild(back);
          return;
        }
        const max = Math.max(...rows.map((r) => r.count), 1);
        const dIcon = detailIconFor(page);
        rows.slice(0, 8).forEach((r) => {
          const ro = document.createElement("div");
          ro.className = "detail-row";
          if (dIcon) {
            const ic = dIcon(r.name);
            if (ic) ro.appendChild(iconEl(ic, 14, "dicon"));
          }
          const nm = document.createElement("span");
          nm.className = "dname";
          nm.textContent = r.name || t("top.unknown");
          const cnt = document.createElement("span");
          cnt.className = "dcount";
          cnt.textContent = fmtNum(r.count);
          ro.append(nm, cnt);
          panel.appendChild(ro);
        });
        panel.appendChild(back);
      } catch (e) {
        if (e.kind === "auth") return handleAuthError(e.message);
        panel.appendChild(emptyEl(t("detail.noData")));
        panel.appendChild(back);
      }
    }
    function closeDonutDetail(page, container) {
      container = container || donutContainer(page);
      if (!container) return;
      const saved = donutState.get(container);
      if (!saved) return;
      renderDonut(container, saved.items, saved.opts);
    }
    function renderPages(hits, more) {
      renderPagesInto($("#pages-body"), hits, { more });
    }
    function renderPagesInto(body, hits, { more = false, max = 8 } = {}) {
      const items = (hits || []).map((h) => ({ name: h.path, id: h.path_id || h.id, title: h.title, count: h.count, event: h.event }));
      lastDatasets.pages = { hits: hits || [], items, total: items.reduce((a, i) => a + i.count, 0), more };
      if (!items.length) {
        body.innerHTML = "";
        body.appendChild(emptyEl(t("no.pages")));
        return;
      }
      renderTopList(body, items, {
        total: items.reduce((a, i) => a + i.count, 0),
        max,
        nameSub: (i) => i.title || "",
        badge: (i) => i.event ? t("event.badge") : null,
        page: "hits",
        onRowClick: (item, row) => {
          if (demoMode) {
            toggleDetail(row, "hits", item.name, item.name, { demo: GOATDASH_DEMO.refs[item.name] || [], kind: "refs" });
            return;
          }
          toggleDetail(row, "hits", item.id, item.name, { demo: null, kind: "refs" });
        }
      });
    }
    function renderPagesDemo() {
      const data = GOATDASH_DEMO.build(demoPreset);
      let hits = data.data.hits.hits;
      if (pathFilter) {
        const lower = pathFilter.names.map((n) => n.toLowerCase());
        hits = hits.filter((h) => lower.some((n) => (h.path || "").toLowerCase().includes(n)));
      }
      renderPages(hits);
    }
    let pathsCache = /* @__PURE__ */ new Map();
    async function getAllPaths() {
      const siteKey = currentSite || "_acct";
      const now = Date.now();
      const cached = pathsCache.get(siteKey);
      if (cached && now - cached.at < 6e4) return cached.paths;
      const all = [];
      let after = 0;
      for (let i = 0; i < 50; i++) {
        const url = `/api/v0/paths?limit=200` + (after ? `&after=${after}` : "");
        const res = await client.request(url, { site: currentSite, forceRefresh: true, cacheKey: "paths:" + siteKey + ":" + after });
        const list = res && res.paths || [];
        all.push(...list);
        if (!res || !res.more || !list.length) break;
        after = list[list.length - 1].id;
      }
      pathsCache.set(siteKey, { paths: all, at: now });
      return all;
    }
    function demoPathSuggestions(q) {
      const data = GOATDASH_DEMO.build(demoPreset);
      const seen = /* @__PURE__ */ new Set();
      const paths = [];
      (data.data.hits.hits || []).forEach((h) => {
        if (h.path && !seen.has(h.path)) {
          seen.add(h.path);
          paths.push(h.path);
        }
      });
      const lower = q.toLowerCase();
      return paths.filter((p) => p.toLowerCase().includes(lower)).slice(0, 8);
    }
    function renderFilterSuggestions(suggestions) {
      const box = $("#filter-suggest");
      box.innerHTML = "";
      if (!suggestions.length) {
        const it = document.createElement("div");
        it.className = "filter-suggest-item muted";
        it.textContent = t("filter.noMatch");
        box.appendChild(it);
        box.hidden = false;
        return;
      }
      suggestions.forEach((s) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "filter-suggest-item";
        b.textContent = s.path || s;
        if (s.event) {
          const bd = document.createElement("span");
          bd.className = "list-badge";
          bd.textContent = t("event.badge");
          b.appendChild(bd);
        }
        b.addEventListener("click", () => {
          applyPathFilter([s.path || s], s.path || s);
          box.hidden = true;
        });
        box.appendChild(b);
      });
      box.hidden = false;
    }
    function applyPathFilter(names, label) {
      pathFilter = { names, label };
      $("#filter-chip-label").textContent = t("filter.applied", { q: label });
      $("#filter-chip").hidden = false;
      loadData();
    }
    function clearPathFilter() {
      pathFilter = null;
      $("#filter-chip").hidden = true;
      $("#path-filter-input").value = "";
      loadData();
    }
    async function applyEnterFilter(q) {
      if (demoMode) {
        applyPathFilter([q], q);
        return;
      }
      try {
        const all = await getAllPaths();
        const lower = q.toLowerCase();
        const exact = all.find((p) => (p.path || "").toLowerCase() === lower);
        if (exact) {
          applyPathFilter([exact.path], exact.path);
          return;
        }
        const prefix = all.filter((p) => (p.path || "").toLowerCase().startsWith(lower)).slice(0, 200);
        if (prefix.length) applyPathFilter(prefix.map((p) => p.path), lower);
        else applyPathFilter([q], q);
      } catch {
        applyPathFilter([q], q);
      }
    }
    let filterDebounce = null;
    function initPathFilter() {
      const input = $("#path-filter-input");
      const suggest = $("#filter-suggest");
      const chipClear = $("#filter-chip-clear");
      if (!input || !suggest || !chipClear) return;
      input.addEventListener("input", () => {
        const q = input.value.trim();
        clearTimeout(filterDebounce);
        if (!q) {
          suggest.hidden = true;
          return;
        }
        filterDebounce = setTimeout(async () => {
          if (demoMode) {
            renderFilterSuggestions(demoPathSuggestions(q).map((p) => ({ path: p })));
            return;
          }
          try {
            const all = await getAllPaths();
            const lower = q.toLowerCase();
            const matches = all.filter((p) => (p.path || "").toLowerCase().includes(lower)).slice(0, 8);
            renderFilterSuggestions(matches);
          } catch {
            suggest.hidden = true;
          }
        }, 250);
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const q = input.value.trim();
          if (!q) return;
          applyEnterFilter(q);
          suggest.hidden = true;
        }
        if (e.key === "Escape") suggest.hidden = true;
      });
      input.addEventListener("blur", () => setTimeout(() => {
        suggest.hidden = true;
      }, 150));
      chipClear.addEventListener("click", clearPathFilter);
    }
    function renderLanguages(stats) {
      renderLanguagesInto($("#languages-body"), stats);
    }
    function renderLanguagesInto(body, stats, { full = false } = {}) {
      const items = (stats || []).map((s) => ({ name: s.name, count: s.count }));
      lastDatasets.languages = { items, total: items.reduce((a, i) => a + i.count, 0) };
      renderTopList(body, items, {
        total: items.reduce((a, i) => a + i.count, 0),
        rank: true,
        page: null,
        max: full ? 0 : 8,
        formatName: (i) => languageName(i.name),
        prefix: (i) => langFlag(i.name),
        rowTitle: () => t("lang.hint")
      });
    }
    function renderDonutsDemo(data) {
      renderDonut($("#browsers-body"), data.browsers.stats, { total: data.browsers.total, page: "browsers", iconFor: donutIconFor("browsers"), onDrill: (item) => drillDetail("browsers", item, 0) });
      renderDonut($("#systems-body"), data.systems.stats, { total: data.systems.total, page: "systems", iconFor: donutIconFor("systems"), onDrill: (item) => drillDetail("systems", item, 0) });
      renderDonut($("#sizes-body"), data.sizes.stats.map((i) => ({ ...i, name: deviceLabel(i.id || i.name), apiId: i.id || i.name })), { total: data.sizes.total, page: "sizes", iconFor: donutIconFor("sizes"), onDrill: (item) => drillDetail("sizes", item, 0) });
    }
    function renderGeoDemo(data) {
      renderGeo($("#geo-map-body"), $("#geo-list-body"), data.locations.stats, data.locations.total, null);
    }
    function renderCampaignsDemo(stats) {
      renderCampaignsInto($("#campaigns-body"), stats, stats.reduce((a, i) => a + i.count, 0));
    }
    function renderCampaignsInto(body, stats, total) {
      lastDatasets.campaigns = { items: stats || [], total };
      renderTopList(body, stats, {
        total,
        page: "campaigns",
        onRowClick: (item, row) => {
          const demo = demoMode ? GOATDASH_DEMO.campaignDetails[item.name] || [] : null;
          toggleDetail(row, "campaigns", item.id || item.name, item.name, { demo, kind: "stats" });
        }
      });
    }
    const EXPAND_TITLES = { sources: "group.sources", content: "group.content", devices: "group.devices", geo: "group.geo" };
    function openExpand(key) {
      const dlg = $("#expand-dialog");
      if (!dlg) return;
      $("#expand-title").textContent = t(EXPAND_TITLES[key] || key);
      fillExpandBody(key, $("#expand-body"));
      if (!dlg.open) dlg.showModal();
    }
    function closeExpand() {
      const dlg = $("#expand-dialog");
      if (dlg && dlg.open) dlg.close();
    }
    function expandSectionTitle(text) {
      const h = document.createElement("h3");
      h.className = "expand-section-title";
      h.textContent = text;
      return h;
    }
    function fillExpandBody(key, body) {
      body.innerHTML = "";
      if (key === "sources") {
        const cols = document.createElement("div");
        cols.className = "expand-cols";
        const left = document.createElement("div");
        left.appendChild(expandSectionTitle(t("card.referrers")));
        const refBox = document.createElement("div");
        renderReferrersInto(refBox, (lastDatasets.referrers || {}).items || [], demoMode ? GOATDASH_DEMO.refDetails : null, { full: true });
        left.appendChild(refBox);
        const right = document.createElement("div");
        right.appendChild(expandSectionTitle(t("card.languages")));
        const langBox = document.createElement("div");
        renderLanguagesInto(langBox, (lastDatasets.languages || {}).items || [], { full: true });
        right.appendChild(langBox);
        cols.append(left, right);
        body.appendChild(cols);
        return;
      }
      if (key === "content") {
        body.appendChild(expandSectionTitle(t("card.pages")));
        const pagesBox = document.createElement("div");
        body.appendChild(pagesBox);
        fillExpandPages(pagesBox);
        const camps = (lastDatasets.campaigns || {}).items || [];
        if (camps.length) {
          body.appendChild(expandSectionTitle(t("card.campaigns")));
          const campBox = document.createElement("div");
          renderCampaignsInto(campBox, camps, (lastDatasets.campaigns || {}).total);
          body.appendChild(campBox);
        }
        return;
      }
      if (key === "devices") {
        const grid = document.createElement("div");
        grid.className = "expand-donuts";
        [["browsers", "card.browsers"], ["systems", "card.systems"], ["sizes", "card.devices"]].forEach(([page, labelKey]) => {
          const col = document.createElement("div");
          col.appendChild(expandSectionTitle(t(labelKey)));
          const box = document.createElement("div");
          const ds = lastDatasets[page] || { items: [], total: 0 };
          renderDonut(box, ds.items, { total: ds.total, page, collapse: false, iconFor: donutIconFor(page), onDrill: (item, idx) => drillDetail(page, item, idx, box) });
          col.appendChild(box);
          grid.appendChild(col);
        });
        body.appendChild(grid);
        return;
      }
      if (key === "geo") {
        const wrap = document.createElement("div");
        wrap.className = "expand-geo";
        const mapCol = document.createElement("div");
        mapCol.className = "expand-geo-map";
        const listCol = document.createElement("div");
        wrap.append(mapCol, listCol);
        body.appendChild(wrap);
        const ds = lastDatasets.geo || { items: [], total: 0 };
        renderGeo(mapCol, listCol, ds.items, ds.total, demoMode ? null : client);
      }
    }
    async function fillExpandPages(box) {
      if (demoMode) {
        const data = GOATDASH_DEMO.build(demoPreset);
        let hits = data.data.hits.hits;
        if (pathFilter) {
          const lower = pathFilter.names.map((n) => n.toLowerCase());
          hits = hits.filter((h) => lower.some((n) => (h.path || "").toLowerCase().includes(n)));
        }
        renderPagesInto(box, hits, { max: 0 });
        return;
      }
      const ds = lastDatasets.pages || { hits: [] };
      if (!ds.more || !client) {
        renderPagesInto(box, ds.hits, { max: 0 });
        return;
      }
      box.innerHTML = "";
      box.appendChild(skeletonCard(200));
      try {
        const range = getDateRange(currentPreset, customStart, customEnd);
        const url = endpointFor("hits", range.start, range.end).replace("limit=20", "limit=100");
        const res = await client.request(url, { cacheKey: cacheKeyFor("hits100", currentSite) });
        renderPagesInto(box, res && res.hits || [], { max: 0, more: false });
      } catch (e) {
        if (e.kind === "auth") return handleAuthError(e.message);
        renderPagesInto(box, ds.hits, { max: 0 });
      }
    }
    function initExpand() {
      document.querySelectorAll(".expand-btn").forEach((btn) => {
        btn.addEventListener("click", () => openExpand(btn.dataset.expand));
      });
      const dlg = $("#expand-dialog");
      const closeBtn = $("#expand-close");
      if (closeBtn) closeBtn.addEventListener("click", closeExpand);
      if (dlg) dlg.addEventListener("click", (e) => {
        if (e.target === dlg) closeExpand();
      });
    }
    function updateFreshness() {
      const el = $("#freshness");
      if (demoMode) {
        el.textContent = t("updated", { t: t("updated.now") });
        updateExportMenu();
        return;
      }
      if (!lastUpdatedAt) {
        updateExportMenu();
        return;
      }
      el.textContent = t("updated", { t: relTime(lastUpdatedAt) });
      updateExportMenu();
    }
    const EXPORT_KEYS = { pages: "pages", referrers: "referrers", browsers: "browsers", systems: "systems", devices: "sizes", geo: "geo", campaigns: "campaigns" };
    function exportDataset(kind) {
      return lastDatasets[EXPORT_KEYS[kind] || kind];
    }
    function updateExportMenu() {
      const menu = $("#export-menu");
      if (!menu) return;
      menu.querySelectorAll("[data-export]").forEach((b) => {
        const ds = exportDataset(b.dataset.export);
        const ok = !!(ds && ds.items && ds.items.length);
        b.disabled = !ok;
        b.title = ok ? "" : t("export.notLoaded");
      });
    }
    function exportCSV(kind) {
      const ds = exportDataset(kind);
      if (!ds || !ds.items || !ds.items.length) return;
      const items = ds.items;
      const total = items.reduce((a2, i) => a2 + (i.count || 0), 0) || 1;
      const esc = (v) => {
        const s = String(v ?? "");
        return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      };
      const rows = ["name,count,percent"];
      items.forEach((i) => {
        const name = i.name ?? i.path ?? "";
        rows.push([esc(name || t("top.direct")), i.count || 0, ((i.count || 0) / total * 100).toFixed(1)].join(","));
      });
      const blob = new Blob(["\uFEFF" + rows.join("\r\n")], { type: "text/csv;charset=utf-8" });
      const rawSite = demoMode ? "demo" : currentSite || config && config.me && config.me.site && (config.me.site.cname || config.me.site.code) || "site";
      const fname = `goatdash-${String(rawSite).replace(/[^a-z0-9.-]+/gi, "_")}-${currentPreset}-${kind}.csv`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fname;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5e3);
    }
    function closeRangeMenu() {
      const menu = $("#range-menu");
      const btn = $("#range-btn");
      if (menu && !menu.hidden) menu.hidden = true;
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
    function updateRangeUI() {
      const lbl = $("#range-btn-label");
      if (lbl) lbl.textContent = rangeLabel(currentPreset);
      document.querySelectorAll("#range-menu [data-preset]").forEach((b) => {
        const on = b.dataset.preset === currentPreset;
        b.classList.toggle("active", on);
        b.setAttribute("aria-checked", String(on));
      });
      const live = $("#live-badge");
      if (live) live.hidden = currentPreset !== "realtime";
      const cr = $("#custom-range");
      if (cr) cr.hidden = currentPreset !== "custom";
    }
    function stopRealtime() {
      if (realtimeTimer) {
        clearInterval(realtimeTimer);
        realtimeTimer = null;
      }
    }
    function syncRealtime() {
      stopRealtime();
      if (currentPreset === "realtime" && !$("#dash-screen").hidden) {
        realtimeTimer = setInterval(() => {
          if (currentPreset === "realtime") loadData();
        }, 6e4);
      }
    }
    function stopAutoRefresh() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }
    function syncAutoRefresh() {
      stopAutoRefresh();
      if (demoMode || !autoRefreshSec || $("#dash-screen").hidden) return;
      autoTimer = setInterval(autoRefreshTick, autoRefreshSec * 1e3);
    }
    function autoRefreshTick() {
      if (document.hidden || dataLoading || rateTimer) return;
      refreshTick++;
      if (homeView) loadHome(true);
      else loadData({ force: true, soft: true });
    }
    function setAutoRefresh(sec) {
      autoRefreshSec = sec;
      safeStore(REFRESH_KEY, String(sec));
      updateAutoRefreshUI();
      syncAutoRefresh();
    }
    window.GoatdashAuto = { tick: autoRefreshTick, set: setAutoRefresh };
    function setPreset(p) {
      currentPreset = p;
      if (p === "custom") {
        const iso = (d) => d.toISOString().slice(0, 10);
        const csIn = $("#custom-start");
        if (!customStart) {
          customStart = iso(new Date(Date.now() - 29 * 864e5));
          csIn.value = customStart;
        }
        const ceIn = $("#custom-end");
        if (!customEnd) {
          customEnd = iso(/* @__PURE__ */ new Date());
          ceIn.value = customEnd;
        }
      }
      updateRangeUI();
      syncRealtime();
      loadData();
    }
    function initRangePicker() {
      const btn = $("#range-btn");
      const menu = $("#range-menu");
      if (!btn || !menu) return;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const willOpen = menu.hidden;
        closeRangeMenu();
        closeSubmenus();
        menu.hidden = !willOpen;
        btn.setAttribute("aria-expanded", String(willOpen));
      });
      menu.addEventListener("click", (e) => {
        const item = e.target.closest("[data-preset]");
        if (!item) return;
        setPreset(item.dataset.preset);
        if (currentPreset !== "custom") closeRangeMenu();
      });
      document.addEventListener("click", (e) => {
        if (!e.target.closest("#range-wrap")) closeRangeMenu();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeRangeMenu();
      });
      $("#custom-start").addEventListener("change", onCustomChange);
      $("#custom-end").addEventListener("change", onCustomChange);
      updateRangeUI();
    }
    function onCustomChange() {
      customStart = $("#custom-start").value;
      customEnd = $("#custom-end").value;
      if (customStart && customEnd) loadData();
    }
    function compareAllowed() {
      return currentPreset !== "realtime";
    }
    function updateCompareUI() {
      const btn = $("#compare-btn");
      if (!btn) return;
      const allowed = compareAllowed();
      btn.disabled = !allowed;
      btn.classList.toggle("compare-active", allowed && chartCompare);
      btn.setAttribute("aria-pressed", String(allowed && chartCompare));
      btn.title = allowed ? "" : t("chart.compareNoRealtime");
    }
    function initCompare() {
      const btn = $("#compare-btn");
      if (!btn) return;
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        chartCompare = !chartCompare;
        safeStore("gd.chartCompare", chartCompare ? "1" : "0");
        updateCompareUI();
        refreshTrafficChart();
      });
      updateCompareUI();
    }
    function comparePrevSeries(group) {
      if (chartMetric === "pageviews") {
        if (lastPrevHitsData) return buildTrafficSeries(lastPrevHitsData, group);
        ensurePrevHitsData();
        return null;
      }
      return lastPrevTotalData ? buildTotalSeries(lastPrevTotalData, group) : null;
    }
    function ensurePrevHitsData() {
      if (demoMode || lastPrevHitsData || prevHitsPromise || !client) return;
      const range = getDateRange(currentPreset, customStart, customEnd);
      const prev = getPreviousRange(range.start, range.end);
      const url = endpointFor("hits", prev.start, prev.end);
      prevHitsPromise = client.request(url, { cacheKey: cacheKeyFor("prevhits", currentSite) }).then((res) => {
        lastPrevHitsData = res;
        if (chartCompare && chartMetric === "pageviews") refreshTrafficChart();
      }).catch(() => {
      }).finally(() => {
        prevHitsPromise = null;
      });
    }
    function retryKey(key) {
      if (inFlightRetries.has(key)) return;
      inFlightRetries.add(key);
      loadData();
      inFlightRetries.delete(key);
    }
    function handleAuthError(msg) {
      if (demoMode) return;
      disconnect(msg);
    }
    function disconnect(msg) {
      stopRealtime();
      stopAutoRefresh();
      if (client) client.clearCache();
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(HOME_CACHE_KEY);
      try {
        history.replaceState(null, "", location.pathname + location.search);
      } catch {
      }
      config = null;
      demoMode = false;
      currentSite = null;
      sitesList = [];
      homeView = false;
      homeData = [];
      homeQuery = "";
      $("#dash-screen").hidden = true;
      $("#connect-screen").hidden = false;
      if (msg) {
        const err = $("#connect-error");
        err.textContent = msg;
        err.hidden = false;
      }
      applyLang();
    }
    function isDemoHost() {
      const h = location.hostname || "";
      return h === "demo.goatdash.cloudless.club" || h.endsWith(".demo.goatdash.cloudless.club");
    }
    function injectDemoTracker() {
      window.goatcounter = { path: (p) => "/demo" + p };
      const s = document.createElement("script");
      s.async = true;
      s.dataset.goatcounter = "https://stats.goatdash.cloudless.club/count";
      s.src = "https://stats.goatdash.cloudless.club/count.js";
      document.head.appendChild(s);
    }
    function enterDemoMode() {
      demoMode = true;
      config = { baseURL: "_demo_", apiKey: "_demo_", me: { site: { cname: "Demo site", code: "demo" } } };
    }
    function initConnect() {
      $("#connect-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const err = $("#connect-error");
        err.hidden = true;
        const btn = $("#connect-btn");
        btn.disabled = true;
        btn.textContent = t("connect.connect").replace("\u2192", "\u2026");
        const urlRaw = $("#gc-url").value.trim();
        const keyRaw = $("#gc-key").value.trim();
        try {
          let u = urlRaw;
          if (!/^https?:\/\//i.test(u)) u = "https://" + u;
          u = u.replace(/\/+$/, "");
          let parsed;
          try {
            parsed = new URL(u);
          } catch {
            throw new Error(t("connect.urlBad"));
          }
          const baseURL = parsed.protocol + "//" + parsed.host;
          if (!keyRaw) throw new Error(t("connect.keyRequired"));
          const c = new APIClient(baseURL, keyRaw);
          const me = await c.request("/api/v0/me", { retries: 1 });
          config = { baseURL, apiKey: keyRaw, me };
          deriveTokenScope();
          currentSite = config.site || null;
          c.siteBaseURL = currentSite ? "https://" + currentSite : null;
          c.onRateLimited = (e2) => showRateBanner(e2.retryAfter);
          client = c;
          safeStore(STORAGE_KEY, JSON.stringify(config));
          demoMode = false;
          loadDashboard();
        } catch (err2) {
          let msg = err2.message;
          if (err2 instanceof TypeError) msg = t("connect.netErr", { url: urlRaw });
          err.textContent = msg;
          err.hidden = false;
        } finally {
          btn.disabled = false;
          btn.textContent = t("connect.connect");
        }
      });
      $("#demo-btn").addEventListener("click", () => {
        demoMode = true;
        config = { baseURL: "_demo_", apiKey: "_demo_", me: { site: { cname: "Demo site", code: "demo" } } };
        loadDashboard();
      });
    }
    function initControls() {
      $("#lang-toggle").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSubmenu("#lang-toggle-menu", "#lang-toggle");
      });
      $("#lang-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSubmenu("#lang-menu", "#lang-btn");
      });
      $("#theme-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSubmenu("#theme-menu", "#theme-btn");
      });
      $("#export-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        updateExportMenu();
        toggleSubmenu("#export-menu", "#export-btn");
      });
      const autoBtn = $("#autorefresh-btn");
      if (autoBtn) autoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSubmenu("#autorefresh-menu", "#autorefresh-btn");
      });
      document.querySelectorAll("[data-refresh-option]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          setAutoRefresh(parseInt(btn.dataset.refreshOption, 10) || 0);
          closeSubmenus();
          closeUserMenu();
        });
      });
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden && autoTimer) autoRefreshTick();
      });
      document.querySelectorAll("[data-export]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (btn.disabled) return;
          exportCSV(btn.dataset.export);
          closeSubmenus();
          const menu = $("#menu");
          if (menu) closeUserMenu();
        });
      });
      document.querySelectorAll("[data-theme-option]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          theme = btn.dataset.themeOption;
          applyTheme();
          closeSubmenus();
        });
      });
      document.querySelectorAll("[data-lang-option]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          lang = btn.dataset.langOption;
          applyLang();
          closeSubmenus();
          if ($("#dash-screen").hidden) return;
          if (homeView) {
            renderHome();
            renderSiteSwitch();
          } else loadData();
        });
      });
      $("#disconnect-btn").addEventListener("click", () => disconnect());
      $("#demo-connect").addEventListener("click", () => disconnect());
      $("#about-btn").addEventListener("click", () => {
        closeUserMenu();
        const dialog = $("#about-dialog");
        const version = $("#about-version");
        const repo = $("#about-repo");
        if (version) version.textContent = t("about.version", { v: VERSION });
        if (repo) {
          repo.textContent = t("about.repo");
          repo.href = REPO_URL;
        }
        if (dialog && !dialog.open) dialog.showModal();
      });
      $("#about-close").addEventListener("click", () => {
        const dialog = $("#about-dialog");
        if (dialog && dialog.open) dialog.close();
      });
      $("#update-btn").addEventListener("click", () => {
        closeUserMenu();
        const upd = window.GoatdashUpdate;
        if (!upd || typeof upd.check !== "function") {
          if (upd && upd.showMessage) upd.showMessage(t("update.err"));
          return;
        }
        upd.check({
          force: true,
          onResult: (r) => {
            if (!r || r.error) {
              upd.showMessage(t("update.err"));
              return;
            }
            if (r.available) return;
            upd.showMessage(t("update.upToDate", { v: String(r.current || "") }), true);
          }
        });
      });
      $("#update-token-btn").addEventListener("click", () => {
        closeUserMenu();
        let cur = "";
        try {
          cur = localStorage.getItem("goatdash-update-token") || "";
        } catch {
        }
        const v = window.prompt(t("update.tokenPrompt"), cur);
        if (v === null) return;
        const upd = window.GoatdashUpdate;
        if (upd && typeof upd.setToken === "function") upd.setToken(v.trim());
      });
      const chip = $("#user-chip");
      if (chip) chip.addEventListener("click", (e) => {
        e.stopPropagation();
        const menu = $("#menu");
        const open = menu.hidden;
        menu.hidden = !open;
        chip.setAttribute("aria-expanded", String(open));
      });
      document.addEventListener("click", (e) => {
        const tgt = e.target;
        if (!tgt.closest(".submenu") && !tgt.closest("#theme-btn") && !tgt.closest("#lang-btn") && !tgt.closest("#lang-toggle") && !tgt.closest("#export-btn") && !tgt.closest("#autorefresh-btn")) {
          closeSubmenus();
        }
        const menu = $("#menu");
        if (menu && !menu.hidden && !tgt.closest(".user-wrap")) closeUserMenu();
        if (!tgt.closest(".site-switch")) closeSiteSwitch();
      });
    }
    function closeUserMenu() {
      const menu = $("#menu");
      const chip = $("#user-chip");
      if (menu) menu.hidden = true;
      if (chip) chip.setAttribute("aria-expanded", "false");
    }
    const FOOT_STARS_KEY = "gc-stars-v1";
    const FOOT_STARS_TTL_MS = 6 * 36e5;
    function initFooter() {
      const ver = $("#foot-version");
      if (ver) ver.textContent = "v" + VERSION;
      const starLink = $("#foot-star");
      if (starLink) starLink.href = REPO_URL;
      const starCount = $("#foot-stars");
      if (!starCount) return;
      let cached = null;
      try {
        const raw = localStorage.getItem(FOOT_STARS_KEY);
        if (raw) {
          const o = JSON.parse(raw);
          if (o && typeof o.count === "number") cached = o;
        }
      } catch {
      }
      if (cached) starCount.textContent = fmtNum(cached.count);
      if (cached && Date.now() - (cached.ts || 0) < FOOT_STARS_TTL_MS) return;
      fetchStars(starCount);
    }
    async function fetchStars(el) {
      try {
        const repo = REPO_URL.replace("https://github.com/", "");
        const r = await fetch("https://api.github.com/repos/" + repo, { headers: { Accept: "application/vnd.github+json" } });
        if (!r.ok) return;
        const j = await r.json();
        const n = j && j.stargazers_count;
        if (typeof n !== "number") return;
        el.textContent = fmtNum(n);
        safeStore(FOOT_STARS_KEY, JSON.stringify({ ts: Date.now(), count: n }));
      } catch {
      }
    }
    function boot() {
      pruneCache();
      applyLang();
      applyTheme();
      THEME_MQ.addEventListener("change", () => {
        if (theme === "auto") applyTheme();
      });
      window.addEventListener("languagechange", () => {
        if (lang === "auto") applyLang();
      });
      initControls();
      initPathFilter();
      initCardTabs();
      initExpand();
      initRangePicker();
      initCompare();
      setInterval(pruneCache, CACHE_PRUNE_MS);
      window.addEventListener("resize", syncTopbarHeight);
      if (isDemoHost()) {
        injectDemoTracker();
        enterDemoMode();
        loadDashboard();
        return;
      }
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const cfg = JSON.parse(saved);
          if (cfg && cfg.baseURL && cfg.apiKey && cfg.baseURL !== "_demo_") {
            config = cfg;
            deriveTokenScope();
            currentSite = cfg.site || null;
            client = new APIClient(cfg.baseURL, cfg.apiKey);
            client.siteBaseURL = currentSite ? "https://" + currentSite : null;
            client.onRateLimited = (e) => showRateBanner(e.retryAfter);
            demoMode = false;
            loadDashboard();
            refreshTokenScope();
            return;
          }
        }
      } catch {
      }
      $("#connect-screen").hidden = false;
      initConnect();
    }
    document.addEventListener("DOMContentLoaded", boot);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(() => {
      });
      navigator.serviceWorker.addEventListener("message", (ev) => {
        const d = ev.data || {};
        const update = d.type === "sw-updated" || d.type === "version-check" && d.changed;
        if (update && !sessionStorage.getItem("gc-sw-reloaded")) {
          sessionStorage.setItem("gc-sw-reloaded", "1");
          location.reload();
        }
      });
      navigator.serviceWorker.ready.then((reg) => {
        if (reg.active) reg.active.postMessage({ type: "version-check" });
      }).catch(() => {
      });
    }
  })();
})();
