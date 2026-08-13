/* ============================================================
   Goatdash — lógica (vanilla JS, sin dependencias)
   Dashboard para la API REST v0 de GoatCounter.
   ============================================================ */

(() => {
	"use strict";

	// ------------------------------------------------------------------ i18n
	const I18N = {
		es: {
			"app.title": "Goatdash",
			"connect.title": "Analytics sin mirar a nadie.",
			"connect.sub": "Conecta tu instancia de GoatCounter y consulta tus estadísticas en una interfaz limpia. Sin cookies, sin scripts de terceros, sin servidor.",
			"connect.url": "URL de GoatCounter",
			"connect.key": "API key",
			"connect.connect": "Conectar →",
			"connect.or": "o",
			"connect.demo": "Probar demo →",
			"connect.helpTitle": "¿Cómo creo una API key?",
			"connect.helpBody": "En tu instancia de GoatCounter: tu usuario (arriba a la derecha) → Settings → pestaña API → Create key. Dale permisos «Count & Read» y copia la clave.",
			"connect.urlRequired": "Introduce la URL de tu GoatCounter.",
			"connect.urlBad": "Eso no parece una URL válida. Prueba por ejemplo https://stats.cloudless.club",
			"connect.keyRequired": "Introduce tu API key.",
			"connect.netErr": "No se pudo contactar {url}. Comprueba que la URL es correcta y que el sitio permite CORS (la mayoría de instancias de GoatCounter lo permiten). Si usas un bloqueador de anuncios (uBlock Origin, Brave Shields, etc.), prueba a desactivarlo para esta página: los dominios de GoatCounter están en las listas de bloqueo habituales.",
			"range.today": "Hoy",
			"range.d7": "7d",
			"range.d30": "30d",
			"range.d90": "90d",
			"range.custom": "Personalizado",
			"menu.refresh": "↻ Actualizar datos",
			"menu.theme": "Tema: {tema}",
			"menu.lang": "Idioma: {idioma}",
			"theme.dark": "Oscuro",
			"theme.light": "Claro",
			"theme.auto": "Auto",
			"menu.disconnect": "Desconectar",
			"demo.banner": "📊 Viendo datos de demo · Conecta tu GoatCounter para ver analítica real",
			"demo.connect": "Conectar →",
			"card.traffic": "Visitantes en el tiempo",
			"card.pages": "Páginas principales",
			"card.languages": "Idiomas",
			"card.browsers": "Navegadores",
			"card.systems": "Sistemas",
			"card.devices": "Dispositivos",
			"card.countries": "Países",
			"card.campaigns": "Campañas",
			"card.referrers": "Referencias",
			"channel.direct": "Directo",
			"channel.search": "Buscadores",
			"channel.campaign": "Campañas",
			"channel.other": "Otros sitios",
			"event.badge": "evento",
			"kpi.events": "Eventos",
			"ref.empty": "Sin referencias en este rango.",
			"ref.emptyHint": "Amplía el rango para ver de dónde vienen tus visitas.",
			"ref.widen": "Ampliar rango",
			"top.refPages": "Páginas desde {name}",
			"ref.noData": "Sin páginas desde este referrer.",
			"kpi.visitors": "Visitantes únicos",
			"kpi.pageviews": "Páginas vistas",
			"kpi.toppage": "Página principal",
			"kpi.paths": "Rutas rastreadas",
			"kpi.vsPrev": "vs periodo anterior",
			"kpi.hits": "{n} visitas",
			"kpi.distinct": "URLs distintas en el rango",
			"preset.today": "hoy",
			"preset.d7": "últimos 7 días",
			"preset.d30": "últimos 30 días",
			"preset.d90": "últimos 90 días",
			"preset.custom": "rango seleccionado",
			"chart.tooltip": "Páginas vistas",
			"chart.empty": "Sin datos de tráfico para este periodo.",
			"top.showAll": "Ver todo ({n})",
			"top.showLess": "Ver menos",
			"top.referrers": "Principales referencias de {path}",
			"top.noRef": "Sin referencias rastreadas.",
			"top.direct": "(directo)",
			"top.unknown": "(desconocido)",
			"detail.breakdown": "Desglose de {name}",
			"detail.noData": "Sin datos de detalle.",
			"err.failed": "No se pudo cargar",
			"err.retry": "↻ Reintentar",
			"err.banner": "Algunas secciones no cargaron: {keys}. Reintenta cada tarjeta con su botón — una sola petición suele funcionar cuando se rellena el límite de peticiones.",
			"err.401": "La API key no es válida. Comprueba que copiaste la clave completa sin espacios extra.",
			"err.403": "La API key no tiene permiso de lectura. Ve a ajustes de tu GoatCounter, pestaña API, y crea una clave con acceso «Read only» o «Count & Read».",
			"err.notfound": "No encontrado: {endpoint}. Comprueba que la URL apunta a tu sitio de GoatCounter (no a una sub-ruta).",
			"err.rate": "Límite de peticiones alcanzado.",
			"err.req": "Petición fallida: {status}",
			"no.data": "Sin datos.",
			"no.pages": "Sin datos de páginas.",
			"loading": "Cargando {n} de {total}…",
			"updated": "Actualizado {t}",
			"updated.now": "justo ahora",
			"updated.s": "hace {s}s",
			"updated.m": "hace {m}m",
			"updated.h": "hace {h}h",
			"foot": "Goatdash · dashboard de GoatCounter · código abierto",
			"device.phone": "Teléfonos",
			"device.tablet": "Tablets",
			"device.desktop": "Portátil / sobremesa",
			"device.desktophd": "Pantalla HD",
			"device.unknown": "Desconocido",
			"lang.name": "Español",
			"sidebar.account": "Cuenta",
			"sidebar.sites": "Sitios",
			"sidebar.open": "Abrir menú de sitios",
		},
		en: {
			"app.title": "Goatdash",
			"connect.title": "Analytics without spying on anyone.",
			"connect.sub": "Connect your GoatCounter instance and browse your stats in a clean interface. No cookies, no third-party scripts, no server.",
			"connect.url": "GoatCounter URL",
			"connect.key": "API key",
			"connect.connect": "Connect →",
			"connect.or": "or",
			"connect.demo": "Try Demo →",
			"connect.helpTitle": "How do I create an API key?",
			"connect.helpBody": "In your GoatCounter instance: your user (top right) → Settings → API tab → Create key. Grant “Count & Read” and copy the key.",
			"connect.urlRequired": "Please enter your GoatCounter URL.",
			"connect.urlBad": "That doesn't look like a valid URL. Try e.g. https://stats.cloudless.club",
			"connect.keyRequired": "Please enter your API key.",
			"connect.netErr": "Could not reach {url}. Check the URL is correct and the site supports CORS (most GoatCounter instances do). If you have an ad blocker (uBlock Origin, Brave Shields, etc.), try disabling it for this page — GoatCounter domains are on common filter lists.",
			"range.today": "Today",
			"range.d7": "7d",
			"range.d30": "30d",
			"range.d90": "90d",
			"range.custom": "Custom",
			"menu.refresh": "↻ Refresh data",
			"menu.theme": "Theme: {tema}",
			"menu.lang": "Language: {idioma}",
			"theme.dark": "Dark",
			"theme.light": "Light",
			"theme.auto": "Auto",
			"menu.disconnect": "Disconnect",
			"demo.banner": "📊 Viewing demo data · Connect your GoatCounter to see real analytics",
			"demo.connect": "Connect →",
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
			"ref.empty": "No referrers in this range.",
			"ref.emptyHint": "Widen the range to see where visitors come from.",
			"ref.widen": "Widen range",
			"top.refPages": "Pages from {name}",
			"ref.noData": "No pages from this referrer.",
			"kpi.visitors": "Total visitors",
			"kpi.pageviews": "Pageviews",
			"kpi.toppage": "Top page",
			"kpi.paths": "Tracked paths",
			"kpi.vsPrev": "vs previous period",
			"kpi.hits": "{n} hits",
			"kpi.distinct": "distinct URLs in range",
			"preset.today": "today",
			"preset.d7": "last 7 days",
			"preset.d30": "last 30 days",
			"preset.d90": "last 90 days",
			"preset.custom": "selected range",
			"chart.tooltip": "Pageviews",
			"chart.empty": "No traffic data for this period.",
			"top.showAll": "Show all ({n})",
			"top.showLess": "Show less",
			"top.referrers": "Top referrers for {path}",
			"top.noRef": "No referrers tracked.",
			"top.direct": "(direct)",
			"top.unknown": "(unknown)",
			"detail.breakdown": "{name} breakdown",
			"detail.noData": "No detail data.",
			"err.failed": "Failed to load",
			"err.retry": "↻ Retry",
			"err.banner": "Some sections couldn't load: {keys}. Retry each card individually below — single requests usually succeed once the rate limit refills.",
			"err.401": "API key not recognized. Please check you copied the full key with no extra spaces.",
			"err.403": "API key lacks read permission. Go to your GoatCounter settings, API tab, and create a key with “Read only” or “Count & Read” access.",
			"err.notfound": "Not found: {endpoint}. Check that the URL points to your GoatCounter site (not a sub-path).",
			"err.rate": "Rate limit hit.",
			"err.req": "Request failed: {status}",
			"no.data": "No data.",
			"no.pages": "No page data.",
			"loading": "Loading {n} of {total}…",
			"updated": "Updated {t}",
			"updated.now": "just now",
			"updated.s": "{s}s ago",
			"updated.m": "{m}m ago",
			"updated.h": "{h}h ago",
			"foot": "Goatdash · a GoatCounter dashboard · open source",
			"device.phone": "Phones",
			"device.tablet": "Tablets",
			"device.desktop": "Laptop/Desktop",
			"device.desktophd": "HD Display",
			"device.unknown": "Unknown",
			"lang.name": "English",
			"sidebar.account": "Account",
			"sidebar.sites": "Sites",
			"sidebar.open": "Open sites menu",
		},
	};

	// ------------------------------------------------------------------ state
	const $ = (sel) => document.querySelector(sel);

	const STORAGE_KEY = "gc-dashboard-config-v1";
	const THEME_KEY = "gc-dashboard-theme-v1";
	const LANG_KEY = "gc-dashboard-lang-v1";
	const CACHE_PREFIX = "gc-cache:";
	const CACHE_TTL_MS = 60_000;
	const RATE_LIMIT_MS = 500;
	const DEVICE_LABELS = { phone: "device.phone", tablet: "device.tablet", desktop: "device.desktop", desktophd: "device.desktophd", unknown: "device.unknown" };

	let lang = localStorage.getItem(LANG_KEY) || "auto";   // modo: es | en | auto (auto = default actual)
 	let config = null;        // { baseURL, apiKey, me }
 	let demoMode = false;
 	let demoPreset = "30d";
 	let currentSite = null;   // X-Goatcounter-Site selector: cname or null (Host)
 	let sitesList = [];       // [{id, cname}] from /api/v0/sites
	let theme = localStorage.getItem(THEME_KEY) || "dark";
	let currentPreset = "30d";
	let customStart = "", customEnd = "";
	let lastUpdatedAt = null;
	let progress = { fired: 0, done: 0 };
	let inFlightRetries = new Set();
	let cancelledRef = { current: false };
	let expandedPage = null;
	let detailData = {};      // { key: [{name,count}] }
	let highlightCode = null;
	let trafficCache = {};    // preset -> { points, total }
	let sidebarOpen = false;  // móvil: sheet desplegado
	const t = (key, vars) => {
		let s = (I18N[currentLang()] || I18N.es)[key];
		if (s === undefined) s = key;
		if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
		return s;
	};

	// ---------------------------------------------------------------- themes
	const THEME_MQ = window.matchMedia("(prefers-color-scheme: dark)");
	const LANG_NATIVE = { es: "Español", en: "English", auto: "Auto" };

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

	function applyTheme() {
		const resolved = theme === "auto" ? resolveTheme() : theme;
		document.documentElement.setAttribute("data-theme", resolved);
		localStorage.setItem(THEME_KEY, theme);
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
		localStorage.setItem(LANG_KEY, lang);
		document.title = t("app.title");
		document.querySelectorAll("[data-i18n]").forEach((el) => {
			el.textContent = t(el.dataset.i18n);
		});
		document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
			el.setAttribute("alt", t(el.dataset.i18nAlt));
		});
		updateLangUI();
		updateThemeUI();
		const st = $("#sidebar-toggle");
		if (st) st.setAttribute("aria-label", t("sidebar.open"));
		const sn = $("#sidebar-nav");
		if (sn) sn.setAttribute("aria-label", t("sidebar.sites"));
		renderSidebar();
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
	}

	const SUBMENU_TRIGGERS = ["#theme-btn", "#lang-btn", "#lang-toggle"];

	function closeSubmenus() {
		document.querySelectorAll(".submenu").forEach((el) => { el.hidden = true; });
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

	// ------------------------------------------------------------- API client
	class APIClient {
		constructor(baseURL, apiKey) {
			this.baseURL = baseURL.replace(/\/+$/, "");
			this.apiKey = apiKey;
			this.site = null; // optional X-Goatcounter-Site (sub)site selector
			this.queue = Promise.resolve();
			this.lastCompleted = 0;
		}

		static clearCache(baseURL) {
			const prefix = CACHE_PREFIX + baseURL + ":";
			const keys = [];
			for (let i = 0; i < localStorage.length; i++) {
				const k = localStorage.key(i);
				if (k && k.startsWith(prefix)) keys.push(k);
			}
			keys.forEach((k) => localStorage.removeItem(k));
		}

		_cacheKey(endpoint) {
			return CACHE_PREFIX + this.baseURL + ":" + (this.site || "") + ":" + endpoint;
		}

		_readCache(endpoint) {
			try {
				const raw = localStorage.getItem(this._cacheKey(endpoint));
				if (!raw) return null;
				const { data, timestamp } = JSON.parse(raw);
				if (Date.now() - timestamp > CACHE_TTL_MS) return null;
				return data;
			} catch { return null; }
		}

		_writeCache(endpoint, data) {
			try {
				localStorage.setItem(this._cacheKey(endpoint), JSON.stringify({ data, timestamp: Date.now() }));
			} catch { /* quota/private mode: non-fatal */ }
		}

		async _fetchOnce(endpoint) {
			const headers = { Authorization: "Bearer " + this.apiKey };
			if (this.site) headers["X-Goatcounter-Site"] = this.site;
			const res = await fetch(this.baseURL + endpoint, { headers });
			if (res.status === 401) {
				const err = new Error(t("err.401")); err.kind = "auth"; throw err;
			}
			if (res.status === 403) {
				const err = new Error(t("err.403")); err.kind = "auth"; throw err;
			}
			if (res.status === 404) {
				const err = new Error(t("err.notfound", { endpoint })); err.kind = "notfound"; throw err;
			}
			if (res.status === 429) {
				const err = new Error(t("err.rate")); err.kind = "rate"; throw err;
			}
			if (!res.ok) {
				let body;
				try { body = await res.json(); } catch { body = null; }
				const msg = body && body.error ? body.error : t("err.req", { status: res.status });
				throw new Error(msg);
			}
			return res.json();
		}

		async request(endpoint, { retries = 2, forceRefresh = false } = {}) {
			if (!forceRefresh) {
				const cached = this._readCache(endpoint);
				if (cached !== null) return cached;
			}
			const run = async () => {
				const wait = RATE_LIMIT_MS - (Date.now() - this.lastCompleted);
				if (wait > 0) await new Promise((r) => setTimeout(r, wait));
				let lastErr;
				for (let attempt = 0; attempt <= retries; attempt++) {
					try {
						const data = await this._fetchOnce(endpoint);
						this._writeCache(endpoint, data);
						return data;
					} catch (e) {
						lastErr = e;
						const retriable = e instanceof TypeError || e.kind === "rate";
						if (!retriable || attempt === retries) break;
						const backoff = 700 + attempt * 1000 + Math.random() * 200;
						await new Promise((r) => setTimeout(r, backoff));
					}
				}
				throw lastErr;
			};
			const next = this.queue.then(run, run);
			this.queue = next.catch(() => {});
			const data = await next;
			this.lastCompleted = Date.now();
			return data;
		}
	}

	let client = null;

	// ------------------------------------------------------------- date range
	function getDateRange(preset, cs, ce) {
		const now = new Date();
		now.setSeconds(0, 0);
		let start, end = now;
		if (preset === "today") {
			start = new Date(now); start.setHours(0, 0, 0, 0);
		} else if (preset === "7d" || preset === "30d" || preset === "90d") {
			const days = parseInt(preset);
			start = new Date(now); start.setDate(start.getDate() - days);
		} else {
			if (!cs || !ce) { return getDateRange("7d", null, null); }
			start = new Date(cs + "T00:00:00");
			end = new Date(ce + "T23:00:00");
		}
		const days = Math.max(1, Math.round((end - start) / 86400000));
		return { start, end, days };
	}

	function getPreviousRange(start, end) {
		const span = end - start;
		return { start: new Date(start.getTime() - span), end: new Date(end.getTime() - span) };
	}

	function pickGroup(days) {
		if (days <= 1) return "hour";
		if (days <= 60) return "day";
		if (days <= 365) return "week";
		return "month";
	}

	function presetLabel(p) {
		return t("preset." + (p === "7d" || p === "30d" || p === "90d" || p === "today" || p === "custom" ? p : "custom"));
	}

	// -------------------------------------------------------------- endpoints
	const ENDPOINTS = {
		total: "total",
		hits: "hits",
		browsers: "browsers",
		systems: "systems",
		sizes: "sizes",
		locations: "locations",
		languages: "languages",
		campaigns: "campaigns",
		toprefs: "toprefs",
	};

	function endpointFor(key, start, end, extra = "") {
		const iso = (d) => d.toISOString();
		const q = `?start=${encodeURIComponent(iso(start))}&end=${encodeURIComponent(iso(end))}`;
		let path = `/api/v0/stats/${ENDPOINTS[key]}`;
		if (key === "hits") path += "?limit=20";
		return path + (path.includes("?") ? "&" : "?") + q.replace(/^\?/, "") + extra;
	}

	// --------------------------------------------------------------- helpers
	function fmtNum(n) {
		if (n === null || n === undefined) return "—";
		if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
		if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
		return String(Math.round(n));
	}
	function fmtPct(n) {
		const v = n >= 0 ? "+" : "−";
		return v + Math.abs(n).toFixed(1) + "%";
	}
	function relTime(ts) {
		const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
		if (s < 5) return t("updated.now");
		if (s < 60) return t("updated.s", { s });
		if (s < 3600) return t("updated.m", { m: Math.floor(s / 60) });
		return t("updated.h", { h: Math.floor(s / 3600) });
	}

	const COUNTRY_NAME_TO_CODE = {
		"United States": "US", "Spain": "ES", "Germany": "DE", "United Kingdom": "GB",
		"France": "FR", "Netherlands": "NL", "Canada": "CA", "Brazil": "BR",
		"India": "IN", "Poland": "PL", "Japan": "JP", "Australia": "AU",
		"Sweden": "SE", "Italy": "IT", "Mexico": "MX", "Switzerland": "CH",
		"Portugal": "PT", "Belgium": "BE", "Austria": "AT", "Denmark": "DK",
		"Norway": "NO", "Ireland": "IE", "Czechia": "CZ", "Argentina": "AR",
		"Chile": "CL", "Colombia": "CO", "Peru": "PE", "Romania": "RO",
		"Ukraine": "UA", "Greece": "GR", "Finland": "FI", "New Zealand": "NZ",
		"South Africa": "ZA", "Turkey": "TR", "United Arab Emirates": "AE",
		"Singapore": "SG", "Thailand": "TH", "South Korea": "KR", "Taiwan": "TW",
		"Russia": "RU",
	};

	function countryNameToCode(name) {
		if (COUNTRY_NAME_TO_CODE[name]) return COUNTRY_NAME_TO_CODE[name];
		if (window.WORLD_MAP_NAMES && window.WORLD_MAP_NAMES[name]) return window.WORLD_MAP_NAMES[name];
		return null;
	}

	const COUNTRY_FLAGS = {
		"United States": "🇺🇸", "Spain": "🇪🇸", "Germany": "🇩🇪", "United Kingdom": "🇬🇧",
		"France": "🇫🇷", "Netherlands": "🇳🇱", "Canada": "🇨🇦", "Brazil": "🇧🇷",
		"India": "🇮🇳", "Poland": "🇵🇱", "Japan": "🇯🇵", "Australia": "🇦🇺",
		"Sweden": "🇸🇪", "Italy": "🇮🇹", "Mexico": "🇲🇽", "Switzerland": "🇨🇭",
		"Portugal": "🇵🇹", "Belgium": "🇧🇪", "Austria": "🇦🇹", "Denmark": "🇩🇰",
		"Norway": "🇳🇴", "Ireland": "🇮🇪", "Czechia": "🇨🇿", "Argentina": "🇦🇷",
		"Chile": "🇨🇱", "Colombia": "🇨🇴", "Peru": "🇵🇪", "Romania": "🇷🇴",
		"Ukraine": "🇺🇦", "Greece": "🇬🇷", "Finland": "🇫🇮", "New Zealand": "🇳🇿",
		"South Africa": "🇿🇦", "Turkey": "🇹🇷", "United Arab Emirates": "🇦🇪",
		"Singapore": "🇸🇬", "Thailand": "🇹🇭", "South Korea": "🇰🇷", "Taiwan": "🇹🇼",
		"Russia": "🇷🇺",
	};
	function flagFor(name) { return COUNTRY_FLAGS[name] || "🌐"; }

	function deviceLabel(id) { return t(DEVICE_LABELS[id] || "device.unknown"); }

	// ------------------------------------------------------------ data build
	function buildTrafficSeries(hitsData, group) {
		const map = new Map();
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
					const d = new Date(s.day + "T00:00:00Z");
					d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
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
		return [...map.entries()]
			.sort((a, b) => a[0].localeCompare(b[0]))
			.map(([ts, count]) => ({ ts, count }));
	}

	// ----------------------------------------------------------- skeleton/err
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

	// ----------------------------------------------------------------- render
	function renderKPIs(data, prevTotal, group) {
		const grid = $("#grid-kpis");
		grid.innerHTML = "";
		const totalNum = data.total.total ?? data.total.total_utc ?? 0;
		const series = buildTrafficSeries(data.hits, group);
		const pageviewSum = series.reduce((a, s) => a + s.count, 0);
		let trend = null;
		if (prevTotal !== null && prevTotal !== undefined) {
			if (prevTotal === 0 && totalNum > 0) trend = 100;
			else if (prevTotal > 0) trend = ((totalNum - prevTotal) / prevTotal) * 100;
		}
		let top = { name: "—", count: 0 };
		if (data.hits.hits && data.hits.hits.length) {
			const sorted = [...data.hits.hits].sort((a, b) => (b.count || 0) - (a.count || 0));
			top = { name: sorted[0].path || "/", count: sorted[0].count || 0 };
		}

		const kpis = [
			{ label: t("kpi.visitors"), value: fmtNum(totalNum), sub: `${trend !== null ? fmtPct(trend) + " " : ""}${t("kpi.vsPrev")} ${presetLabel(currentPreset)}`, trend },
			{ label: t("kpi.pageviews"), value: fmtNum(pageviewSum), sub: presetLabel(currentPreset) },
			{ label: t("kpi.toppage"), value: top.name, string: true, sub: t("kpi.hits", { n: fmtNum(top.count) }) },
			{ label: t("kpi.paths"), value: fmtNum((data.hits.hits || []).length), sub: t("kpi.distinct") },
			{ label: t("kpi.events"), value: fmtNum(data.total.total_events ?? 0), sub: presetLabel(currentPreset) },
		];
		kpis.forEach((k) => {
			const el = document.createElement("div");
			el.className = "kpi";
			const label = document.createElement("div"); label.className = "kpi-label"; label.textContent = k.label;
			const val = document.createElement("div");
			val.className = "kpi-value" + (k.string ? " string" : "");
			val.textContent = k.value;
			const sub = document.createElement("div"); sub.className = "kpi-sub";
			if (k.trend !== null && k.trend !== undefined && !k.string) {
				const span = document.createElement("span");
				span.className = k.trend >= 0 ? "trend-up" : "trend-down";
				span.textContent = fmtPct(k.trend);
				sub.appendChild(span);
				sub.append(" " + k.sub.replace(/^[+−][\d.]+%\s*/, ""));
			} else {
				sub.textContent = k.sub;
			}
			el.append(label, val, sub);
			grid.appendChild(el);
		});
	}

	function renderTrafficChart(data, group) {
		const body = $("#traffic-body");
		body.innerHTML = "";
		const series = buildTrafficSeries(data.hits, group);
		if (!series.length) { body.appendChild(emptyEl(t("chart.empty"))); return; }

		const max = Math.max(...series.map((s) => s.count), 1);
		const W = 900, H = 260, PAD = { top: 12, right: 10, bottom: 26, left: 46 };
		const iw = W - PAD.left - PAD.right, ih = H - PAD.top - PAD.bottom;
		const n = series.length;
		const x = (i) => PAD.left + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
		const y = (v) => PAD.top + ih - (v / max) * ih;

		const ns = "http://www.w3.org/2000/svg";
		const svg = document.createElementNS(ns, "svg");
		svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
		svg.setAttribute("preserveAspectRatio", "none");
		svg.style.height = "260px";

		const defs = document.createElementNS(ns, "defs");
		const grad = document.createElementNS(ns, "linearGradient");
		grad.id = "trafficFill";
		grad.setAttribute("x1", "0"); grad.setAttribute("y1", "0");
		grad.setAttribute("x2", "0"); grad.setAttribute("y2", "1");
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

		// grid
		const ticks = 4;
		for (let i = 0; i <= ticks; i++) {
			const gy = PAD.top + (ih / ticks) * i;
			const line = document.createElementNS(ns, "line");
			line.setAttribute("x1", PAD.left); line.setAttribute("y1", gy);
			line.setAttribute("x2", W - PAD.right); line.setAttribute("y2", gy);
			line.setAttribute("stroke", "var(--chart-grid)");
			line.setAttribute("stroke-dasharray", "3 4");
			svg.appendChild(line);
			const tv = Math.round(max - (max / ticks) * i);
			const txt = document.createElementNS(ns, "text");
			txt.setAttribute("x", PAD.left - 8); txt.setAttribute("y", gy + 4);
			txt.setAttribute("text-anchor", "end");
			txt.setAttribute("font-size", "11");
			txt.setAttribute("fill", "var(--text-muted)");
			txt.textContent = fmtNum(tv);
			svg.appendChild(txt);
		}

		// area
		const pts = series.map((s, i) => [x(i), y(s.count)]);
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

		// overlay + tooltip
		const overlay = document.createElementNS(ns, "rect");
		overlay.setAttribute("x", PAD.left); overlay.setAttribute("y", PAD.top);
		overlay.setAttribute("width", iw); overlay.setAttribute("height", ih);
		overlay.setAttribute("fill", "transparent");
		svg.appendChild(overlay);

		overlay.addEventListener("mousemove", (e) => {
			const rect = svg.getBoundingClientRect();
			const mx = ((e.clientX - rect.left) / rect.width) * W;
			let best = 0, bestD = Infinity;
			pts.forEach((p, i) => {
				const d = Math.abs(p[0] - mx);
				if (d < bestD) { bestD = d; best = i; }
			});
			clearTooltips();
			const s = series[best];
			const dot = document.createElementNS(ns, "circle");
			dot.setAttribute("cx", pts[best][0]); dot.setAttribute("cy", pts[best][1]);
			dot.setAttribute("r", "4");
			dot.setAttribute("fill", "var(--chart-line)");
			svg.appendChild(dot);
			setTimeout(() => dot.remove(), 50);
			const tip = showTooltip(e.target, `<span class="tt-num">${fmtNum(s.count)}</span> ${t("chart.tooltip")}`);
			tip.style.left = (e.clientX + 12) + "px";
			tip.style.top = (e.clientY - 30) + "px";
		});
		overlay.addEventListener("mouseleave", clearTooltips);

		body.appendChild(svg);
	}

	function renderTopList(container, items, { rank = true, formatName = (i) => i.name, nameSub = () => null, count = (i) => i.count, total, max = 8, showAll = true, page, demoDetails, onRowClick, prefix = () => "", badge = () => null } = {}) {
		container.innerHTML = "";
		if (!items || !items.length) { container.appendChild(emptyEl(t("no.data"))); return; }
		const totalMax = total || Math.max(...items.map((i) => i.count), 1);
		const limited = max ? items.slice(0, max) : items;
		const list = document.createElement("div");
		items.forEach((item, idx) => {
			const row = document.createElement("div");
			row.className = "list-row";
			row.setAttribute("role", onRowClick ? "button" : undefined);
			row.setAttribute("tabindex", onRowClick ? 0 : undefined);
			const chev = document.createElement("span"); chev.className = "chevron";
			if (onRowClick) chev.textContent = "▸";
			if (rank) { const r = document.createElement("span"); r.className = "list-rank"; r.textContent = idx + 1; row.appendChild(r); }
			const pref = prefix(item);
			if (pref) { const p = document.createElement("span"); p.style.cssText = "flex:none"; p.textContent = pref; row.appendChild(p); }
			const name = document.createElement("span"); name.className = "list-name";
			name.textContent = formatName(item);
			const sub = nameSub(item);
			if (sub) { const sm = document.createElement("small"); sm.textContent = sub; name.appendChild(sm); }
			const barWrap = document.createElement("span"); barWrap.className = "list-bar-wrap";
			const bar = document.createElement("span"); bar.className = "list-bar";
			bar.style.width = ((count(item) / totalMax) * 100) + "%";
			barWrap.appendChild(bar);
			const cnt = document.createElement("span"); cnt.className = "list-count"; cnt.textContent = fmtNum(count(item));
			const pct = document.createElement("span"); pct.className = "list-pct";
			const share = total ? (count(item) / total) * 100 : null;
			if (share !== null) pct.textContent = share.toFixed(1) + "%";
			if (chev.textContent) row.appendChild(chev);
			row.append(name);
			const badgeTxt = badge(item);
			if (badgeTxt) { const bd = document.createElement("span"); bd.className = "list-badge"; bd.textContent = badgeTxt; row.appendChild(bd); }
			row.append(barWrap, cnt, pct);
			if (onRowClick) {
				row.addEventListener("click", () => onRowClick(item, row));
				row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRowClick(item, row); } });
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
				c.appendChild(renderAllRows(items, { rank, formatName, nameSub, count, total: totalMax, page, onRowClick, prefix, badge }));
			});
			container.appendChild(btn);
		}
	}

	function renderAllRows(items, opts) {
		const frag = document.createDocumentFragment();
		items.forEach((item, idx) => {
			const row = document.createElement("div");
			row.className = "list-row";
			row.setAttribute("role", opts.onRowClick ? "button" : undefined);
			row.setAttribute("tabindex", opts.onRowClick ? 0 : undefined);
			const chev = document.createElement("span"); chev.className = "chevron";
			if (opts.onRowClick) chev.textContent = "▸";
			if (opts.rank) { const r = document.createElement("span"); r.className = "list-rank"; r.textContent = idx + 1; row.appendChild(r); }
			const pref = opts.prefix ? opts.prefix(item) : "";
			if (pref) { const p = document.createElement("span"); p.style.cssText = "flex:none"; p.textContent = pref; row.appendChild(p); }
			const name = document.createElement("span"); name.className = "list-name";
			name.textContent = opts.formatName(item);
			const sub = opts.nameSub ? opts.nameSub(item) : null;
			if (sub) { const sm = document.createElement("small"); sm.textContent = sub; name.appendChild(sm); }
			const barWrap = document.createElement("span"); barWrap.className = "list-bar-wrap";
			const bar = document.createElement("span"); bar.className = "list-bar";
			bar.style.width = ((opts.count(item) / opts.total) * 100) + "%";
			barWrap.appendChild(bar);
			const cnt = document.createElement("span"); cnt.className = "list-count"; cnt.textContent = fmtNum(opts.count(item));
			const pct = document.createElement("span"); pct.className = "list-pct";
			pct.textContent = ((opts.count(item) / opts.total) * 100).toFixed(1) + "%";
			if (chev.textContent) row.appendChild(chev);
			row.append(name);
			const badgeTxt = opts.badge ? opts.badge(item) : null;
			if (badgeTxt) { const bd = document.createElement("span"); bd.className = "list-badge"; bd.textContent = badgeTxt; row.appendChild(bd); }
			row.append(barWrap, cnt, pct);
			if (opts.onRowClick) {
				row.addEventListener("click", () => opts.onRowClick(item, row));
				row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); opts.onRowClick(item, row); } });
			}
			frag.appendChild(row);
		});
		return frag;
	}

	function renderDonut(container, items, { total, page, onDrill }) {
		container.innerHTML = "";
		if (!items || !items.length) { container.appendChild(emptyEl(t("no.data"))); return; }
		const palette = [
			["#7eb2e0", "#2b5884"], ["#3fb950", "#1a7f37"], ["#e3b341", "#9e7b1c"],
			["#d29922", "#9a6b11"], ["#a371f7", "#6e3fc2"], ["#f778ba", "#c4348a"],
			["#56d4dd", "#1c7f86"], ["#ffa657", "#b05a1e"],
		];
		let display = items;
		if (items.length > 6) {
			const top = items.slice(0, 5);
			const rest = items.slice(5).reduce((a, i) => a + i.count, 0);
			display = [...top, { name: "Other", id: "__other__", count: rest }];
		} else {
			display = items.map((i) => ({ ...i }));
		}
		const totalCount = total || display.reduce((a, i) => a + i.count, 0);

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
			circle.setAttribute("cx", cx); circle.setAttribute("cy", cy);
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
				const pct = totalCount ? ((item.count / totalCount) * 100).toFixed(1) + "%" : "";
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
		center.innerHTML = `<span>${fmtNum(totalCount)}</span><small>${t("card.pageviews")}</small>`;
		chartWrap.appendChild(center);
		wrap.appendChild(chartWrap);

		const legend = document.createElement("div");
		legend.className = "donut-legend";
		display.forEach((item, idx) => {
			const row = document.createElement("div");
			row.className = "legend-row";
			row.setAttribute("role", onDrill && item.apiId !== "__other__" ? "button" : undefined);
			row.setAttribute("tabindex", onDrill && item.apiId !== "__other__" ? 0 : undefined);
			const sw = document.createElement("span"); sw.className = "legend-swatch";
			sw.style.background = palette[idx % palette.length][0];
			const name = document.createElement("span"); name.className = "legend-name"; name.textContent = item.name;
			const num = document.createElement("span"); num.className = "legend-num"; num.textContent = fmtNum(item.count);
			const pct = document.createElement("span"); pct.className = "legend-pct";
			pct.textContent = totalCount ? ((item.count / totalCount) * 100).toFixed(1) + "%" : "";
			row.append(sw, name, num, pct);
			if (onDrill && item.apiId !== "__other__") {
				row.addEventListener("click", () => onDrill(item, idx));
				row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onDrill(item, idx); } });
			}
			legend.appendChild(row);
		});
		wrap.appendChild(legend);
		container.appendChild(wrap);
	}

	function renderWorldMap(container, stats, total) {
		container.innerHTML = "";
		if (!window.WORLD_MAP_PATHS) return;
		const counts = {};
		let maxCount = 1;
		(stats || []).forEach((s) => {
			const code = countryNameToCode(s.name);
			if (code) { counts[code] = s.count; if (s.count > maxCount) maxCount = s.count; }
		});
		const wrap = document.createElement("div");
		wrap.className = "map-wrap";
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", window.WORLD_MAP_VIEWBOX || "0 0 1000 500");
		svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

		for (const code in window.WORLD_MAP_PATHS) {
			const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
			path.setAttribute("d", window.WORLD_MAP_PATHS[code]);
			const has = code in counts;
			path.setAttribute("data-code", code);
			path.setAttribute("data-has", has ? "1" : "0");
			if (has) {
				const opacity = 0.25 + (Math.sqrt(counts[code]) / Math.sqrt(maxCount)) * 0.75;
				path.setAttribute("fill-opacity", opacity.toFixed(3));
			}
			if (code === highlightCode) path.setAttribute("class", "map-selected");
			path.addEventListener("mouseenter", (e) => {
				if (!has) return;
				const name = Object.keys(counts).find((k) => countryNameToCode(k) === code);
				const count = counts[code];
				const pct = total ? ((count / total) * 100).toFixed(1) + "%" : "";
				showTooltip(path, `${flagFor(name || code)} ${name || code} · <span class="tt-num">${fmtNum(count)}</span> ${pct}`);
			});
			path.addEventListener("mouseleave", clearTooltips);
			svg.appendChild(path);
		}
		wrap.appendChild(svg);
		const legend = document.createElement("div");
		legend.className = "map-legend";
		legend.innerHTML = `<span style="opacity:0.3">${fmtNum(maxCount / 8)}</span><span class="lg-swatch" style="background:linear-gradient(90deg,color-mix(in srgb,var(--accent) 25%,transparent),var(--accent))"></span><span>${fmtNum(maxCount)}</span>`;
		wrap.appendChild(legend);
		container.appendChild(wrap);
	}

	function renderGeo(container, stats, total, clientOrDemo) {
		container.innerHTML = "";
		const geo = document.createElement("div");
		geo.className = "geo-grid";
		const mapCol = document.createElement("div");
		const listCol = document.createElement("div");

		renderWorldMap(mapCol, stats, total);
		geo.appendChild(mapCol);

		const listItems = (stats || []).map((s) => ({ ...s }));
		renderTopList(listCol, listItems, {
			total,
			prefix: (i) => flagFor(i.name),
			page: "locations",
			onRowClick: (item, row) => {
				if (!clientOrDemo && !demoMode) return;
				const apiId = item.id || item.name;
				toggleDetail(row, "locations", apiId, item.name, { demo: demoMode ? GOATDASH_DEMO.locationDetails[item.name] : null, kind: "stats" });
				highlightCode = countryNameToCode(item.name);
				mapCol.innerHTML = "";
				renderWorldMap(mapCol, stats, total);
			},
		});
		geo.appendChild(listCol);
		container.appendChild(geo);
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
			const b = document.querySelector('#range-seg [data-preset="90d"]');
			if (b) b.click();
		});
		d.append(p, hint, btn);
		return d;
	}

	function renderReferrers(stats, demoDetails) {
		const body = $("#referrers-body");
		body.innerHTML = "";
		if (!stats || !stats.length) { body.appendChild(refEmptyEl()); return; }
		const total = stats.reduce((a, s) => a + s.count, 0);
		const channels = [
			{ key: "direct", scheme: "o" },
			{ key: "search", scheme: "g" },
			{ key: "campaign", scheme: "c" },
			{ key: "other", scheme: "h" },
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
				formatName: (i) => i.name || t("top.direct"),
				onRowClick: ch.scheme === "o" ? null : (item, row) => {
					const demo = demoMode ? (demoDetails && demoDetails[item.name]) : null;
					toggleDetail(row, "toprefs", item.id || item.name, item.name, { demo, kind: "stats" });
				},
			});
		});
		body.appendChild(wrap);
	}

	async function toggleDetail(row, page, itemId, label, { demo, kind }) {
		const existing = row.querySelector(".detail-panel");
		if (existing) { existing.remove(); row.classList.remove("open"); return; }
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
			const name = document.createElement("span"); name.className = "dname";
			name.textContent = r.name || t("top.direct");
			const cnt = document.createElement("span"); cnt.className = "dcount"; cnt.textContent = fmtNum(r.count);
			drow.append(name, cnt);
			panel.appendChild(drow);
		});
	}

	// ------------------------------------------------------------ site selector
	// Helpers de nombre/color para el sidebar.
	function siteSlug(cname) {
		const parts = (cname || "").split(".");
		if (parts.length >= 2 && parts[0] === "stats") return parts[1];
		return parts[0] || "";
	}
	function legibleSiteName(cname) {
		const slug = siteSlug(cname);
		const overrides = { easyzfs: "EasyZFS", netpulse: "NetPulse" };
		if (overrides[slug]) return overrides[slug];
		if (!slug) return "Site";
		return slug.charAt(0).toUpperCase() + slug.slice(1);
	}
	const SITE_COLORS = ["#3fb950", "#a371f7", "#e3b341", "#f778ba", "#56d4dd", "#ffa657", "#d29922", "#6e3fc2"];
	function siteColorFor(slug) {
		let h = 0;
		for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
		return SITE_COLORS[Math.abs(h) % SITE_COLORS.length];
	}

	function sidebarItemEl(site, isAccount) {
		const cname = site.cname || site.code || "";
		const name = legibleSiteName(cname);
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "sidebar-item" + (isAccount ? " sidebar-item-account" : "");
		btn.dataset.site = isAccount ? "" : cname;
		const active = isAccount
			? (currentSite === null || currentSite === cname || currentSite === (site.code || ""))
			: (currentSite === cname);
		if (active) btn.setAttribute("aria-current", "page");

		const icon = document.createElement("span");
		icon.className = "sidebar-icon";
		icon.textContent = name.charAt(0).toUpperCase();
		if (isAccount) {
			icon.style.background = "var(--accent)";
			icon.style.color = "var(--accent-fg)";
		} else {
			icon.style.background = siteColorFor(siteSlug(cname));
			icon.style.color = "#fff";
		}

		const text = document.createElement("span");
		text.className = "sidebar-text";
		const nm = document.createElement("span");
		nm.className = "sidebar-name";
		nm.textContent = name;
		const sub = document.createElement("small");
		sub.className = "sidebar-cname";
		sub.textContent = cname;
		text.append(nm, sub);

		btn.append(icon, text);
		return btn;
	}

	function renderSidebar() {
		const nav = $("#sidebar-nav");
		const aside = $("#sidebar");
		const toggle = $("#sidebar-toggle");
		if (!nav || !aside || !toggle) return;

		if (demoMode || !client) {
			nav.innerHTML = "";
			aside.hidden = true;
			toggle.hidden = true;
			return;
		}

		const root = sitesList.find((s) => !s.parent);
		const children = sitesList.filter((s) => s !== root);

		if ((root ? 1 : 0) + children.length <= 1) {
			nav.innerHTML = "";
			aside.hidden = true;
			toggle.hidden = true;
			return;
		}

		const prevFocusSite = (() => {
			const el = nav.querySelector(".sidebar-item:focus");
			return el ? el.dataset.site : null;
		})();

		const frag = document.createDocumentFragment();
		if (root) {
			const g = document.createElement("div");
			g.className = "sidebar-group";
			const label = document.createElement("div");
			label.className = "sidebar-group-label";
			label.textContent = t("sidebar.account");
			g.append(label, sidebarItemEl(root, true));
			frag.appendChild(g);
			if (children.length) {
				const div = document.createElement("div");
				div.className = "sidebar-divider";
				frag.appendChild(div);
			}
		}
		if (children.length) {
			const g = document.createElement("div");
			g.className = "sidebar-group";
			const label = document.createElement("div");
			label.className = "sidebar-group-label";
			label.textContent = t("sidebar.sites");
			g.appendChild(label);
			children.forEach((s) => g.appendChild(sidebarItemEl(s, false)));
			frag.appendChild(g);
		}

		nav.innerHTML = "";
		nav.appendChild(frag);
		nav.setAttribute("aria-label", t("sidebar.sites"));
		aside.hidden = false;
		toggle.hidden = false;

		if (prevFocusSite !== null && prevFocusSite !== undefined) {
			const next = [...nav.querySelectorAll(".sidebar-item")].find((el) => el.dataset.site === prevFocusSite);
			if (next) next.focus();
		}
	}

	async function loadSiteSelector() {
		if (demoMode || !client) { renderSidebar(); return; }
		try {
			const data = await client.request("/api/v0/sites", { forceRefresh: true });
			sitesList = (data && data.sites) || [];
		} catch {
			sitesList = [];
		}
		renderSidebar();
	}

	function onSiteChange(cname) {
		currentSite = cname || null;
		if (client) client.site = currentSite;
		if (config) {
			config.site = currentSite;
			localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
		}
		if (config && !demoMode) APIClient.clearCache(config.baseURL);
		closeSidebar();
		renderSidebar();
		loadData();
	}

	function openSidebar() {
		const aside = $("#sidebar");
		const toggle = $("#sidebar-toggle");
		const backdrop = $("#sidebar-backdrop");
		sidebarOpen = true;
		if (aside) aside.classList.add("open");
		if (toggle) toggle.setAttribute("aria-expanded", "true");
		if (backdrop) backdrop.hidden = false;
		const first = $("#sidebar-nav .sidebar-item");
		if (first) first.focus();
	}

	function closeSidebar() {
		if (!sidebarOpen) return;
		sidebarOpen = false;
		const aside = $("#sidebar");
		const toggle = $("#sidebar-toggle");
		const backdrop = $("#sidebar-backdrop");
		if (aside) aside.classList.remove("open");
		if (toggle) toggle.setAttribute("aria-expanded", "false");
		if (backdrop) backdrop.hidden = true;
		if (toggle) toggle.focus();
	}

	function initSidebar() {
		const toggle = $("#sidebar-toggle");
		const backdrop = $("#sidebar-backdrop");
		const nav = $("#sidebar-nav");
		if (toggle) toggle.addEventListener("click", () => { sidebarOpen ? closeSidebar() : openSidebar(); });
		if (backdrop) backdrop.addEventListener("click", closeSidebar);
		if (nav) nav.addEventListener("click", (e) => {
			const btn = e.target.closest(".sidebar-item");
			if (!btn) return;
			onSiteChange(btn.dataset.site || null);
		});
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && sidebarOpen) closeSidebar();
		});
	}

	function syncTopbarHeight() {
		const tb = $(".topbar");
		if (tb) document.documentElement.style.setProperty("--topbar-h", tb.offsetHeight + "px");
	}

	// --------------------------------------------------------------- main load
	function loadDashboard() {
		$("#connect-screen").hidden = true;
		$("#dash-screen").hidden = false;
		$("#demo-banner").hidden = !demoMode;
		applyLang();
		applyTheme();
		syncTopbarHeight();
		$("#range-seg").addEventListener("click", onRangeChange);
		$("#custom-start").addEventListener("change", onCustomChange);
		$("#custom-end").addEventListener("change", onCustomChange);
		$("#refresh-btn").addEventListener("click", () => {
			if (config && !demoMode) APIClient.clearCache(config.baseURL);
			refreshTick++;
			loadData();
		});
		loadSiteSelector();
		loadData();
	}

	let refreshTick = 0;

	async function loadData() {
		cancelledRef.current = true;
		cancelledRef = { current: false };
		const current = cancelledRef;
		expandedPage = null;
		progress = { fired: 0, done: 0 };
		$("#error-banner").hidden = true;
		$("#traffic-body").innerHTML = "";
		$("#traffic-body").appendChild(skeletonCard(280));
		$("#grid-kpis").innerHTML = "";
		for (let i = 0; i < 5; i++) {
			const s = document.createElement("div");
			s.className = "kpi kpi-skel";
			s.innerHTML = '<div class="skeleton sk-label"></div><div class="skeleton sk-value"></div>';
			$("#grid-kpis").appendChild(s);
		}
		["pages-body", "languages-body", "referrers-body", "browsers-body", "systems-body", "sizes-body", "geo-body", "campaigns-body"].forEach((id) => {
			$("#" + id).innerHTML = "";
			$("#" + id).appendChild(skeletonCard(id === "geo-body" ? 280 : 200));
		});

		const range = getDateRange(currentPreset, customStart, customEnd);
		const group = pickGroup(range.days);

		let prevTotal = null;
		let data = null;
		if (demoMode) {
			const preset = currentPreset === "custom" ? (GOATDASH_DEMO.customFallback || "30d") : currentPreset;
			demoPreset = preset;
			const built = GOATDASH_DEMO.build(preset);
			data = built.data;
			prevTotal = built.prevTotal;
			lastUpdatedAt = Date.now();
			renderKPIs(data, prevTotal, group);
			renderTrafficChart(data, group);
			renderPagesDemo();
			renderLanguages(data.languages.stats);
			renderReferrers(data.toprefs ? data.toprefs.stats : [], GOATDASH_DEMO.refDetails);
			renderDonutsDemo(data);
			renderGeoDemo(data);
			if (data.campaigns.stats.length) { $("#campaigns-card").hidden = false; renderCampaignsDemo(data.campaigns.stats); }
			updateFreshness();
			return;
		}

		// real mode
		try {
			const [totalRes, hitsRes, prevRes, langRes, refRes] = await Promise.allSettled([
				client.request(endpointFor("total", range.start, range.end)),
				client.request(endpointFor("hits", range.start, range.end)),
				client.request(endpointFor("total", getPreviousRange(range.start, range.end).start, getPreviousRange(range.start, range.end).end)),
				client.request(endpointFor("languages", range.start, range.end)),
				client.request(endpointFor("toprefs", range.start, range.end, "&limit=50")),
			]);
			if (current.cancelled) return;
			progress.fired = 5; progress.done = 5;

			data = {
				total: totalRes.status === "fulfilled" ? totalRes.value : { total: 0 },
				hits: hitsRes.status === "fulfilled" ? hitsRes.value : { hits: [] },
				languages: langRes.status === "fulfilled" ? langRes.value : { stats: [] },
			};
			if (totalRes.status === "rejected" && totalRes.reason.kind === "auth") return handleAuthError(totalRes.reason.message);
			if (hitsRes.status === "rejected" && hitsRes.reason.kind === "auth") return handleAuthError(hitsRes.reason.message);
			prevTotal = prevRes.status === "fulfilled" ? (prevRes.value.total ?? prevRes.value.total_utc ?? null) : null;

			renderKPIs(data, prevTotal, group);
			renderTrafficChart(data, group);
			renderPages(data.hits.hits);
			renderLanguages(data.languages.stats);
			renderReferrers(refRes.status === "fulfilled" ? refRes.value.stats : [], null);
			lastUpdatedAt = Date.now();

			// lazy tiers
			const lazy = async (key, refId, renderFn) => {
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

			await lazy("browsers", "#donut-row", async () => {
				if (current.cancelled) return;
				const [b, s, z] = await Promise.allSettled([
					client.request(endpointFor("browsers", range.start, range.end)),
					client.request(endpointFor("systems", range.start, range.end)),
					client.request(endpointFor("sizes", range.start, range.end)),
				]);
				if (current.cancelled) return;
				if (b.status === "fulfilled") renderDonut($("#browsers-body"), b.value.stats, { total: b.value.total, page: "browsers", onDrill: (item, idx) => drillDetail("browsers", item, idx) });
				else renderDonutErr("browsers", b.reason);
				if (s.status === "fulfilled") renderDonut($("#systems-body"), s.value.stats, { total: s.value.total, page: "systems", onDrill: (item, idx) => drillDetail("systems", item, idx) });
				else renderDonutErr("systems", s.reason);
				if (z.status === "fulfilled") renderDonut($("#sizes-body"), z.value.stats.map((i) => ({ ...i, name: deviceLabel(i.name) })), { total: z.value.total, page: "sizes", onDrill: (item, idx) => drillDetail("sizes", item, idx) });
				else renderDonutErr("sizes", z.reason);
			});

			await lazy("locations", "#geo-card", async () => {
				if (current.cancelled) return;
				const loc = await client.request(endpointFor("locations", range.start, range.end));
				if (current.cancelled) return;
				renderGeo($("#geo-body"), loc.stats, loc.total, client);
			});

			await lazy("campaigns", "#campaigns-card", async () => {
				if (current.cancelled) return;
				let camps;
				try { camps = await client.request(endpointFor("campaigns", range.start, range.end)); }
				catch (e) { if (e.kind === "notfound") { return; } throw e; }
				if (current.cancelled) return;
				if (camps.stats && camps.stats.length) {
					$("#campaigns-card").hidden = false;
					renderTopList($("#campaigns-body"), camps.stats, { total: camps.total, page: "campaigns", onRowClick: (item, row) => toggleDetail(row, "campaigns", item.id || item.name, item.name, { demo: null, kind: "stats" }) });
				}
			});
			updateFreshness();
		} catch (e) {
			if (e.kind === "auth") return handleAuthError(e.message);
			updateFreshness();
		}
	}

	function renderDonutErr(key, reason) {
		if (reason.kind === "auth") return handleAuthError(reason.message);
		const container = $({ browsers: "#browsers-body", systems: "#systems-body", sizes: "#sizes-body" }[key]);
		if (container) container.innerHTML = "", container.appendChild(errCard(key));
	}

	function drillDetail(page, item, idx) {
		const container = $({ browsers: "#browsers-body", systems: "#systems-body", sizes: "#sizes-body" }[page]);
		if (!container) return;
		const apiId = item.apiId || item.id || item.name;
		const demoDetails = demoMode ? GOATDASH_DEMO[page === "browsers" ? "browserDetails" : page === "systems" ? "systemDetails" : page === "sizes" ? "sizeDetails" : null] : null;
		if (demoMode) {
			const rows = demoDetails ? demoDetails[item.name] : null;
			container.innerHTML = "";
			const d = document.createElement("div");
			d.className = "detail-panel";
			d.innerHTML = `<h4>${t("detail.breakdown", { name: item.name })}</h4>`;
			if (rows && rows.length) {
				const max = Math.max(...rows.map((r) => r.count), 1);
				rows.forEach((r) => {
					const ro = document.createElement("div");
					ro.className = "detail-row";
					ro.innerHTML = `<span class="dname">${r.name}</span><span class="dcount">${fmtNum(r.count)}</span>`;
					d.appendChild(ro);
				});
			} else {
				d.appendChild(emptyEl(t("detail.noData")));
			}
			container.appendChild(d);
			return;
		}
		toggleDetailForDonut(page, apiId, item.name);
	}

	async function toggleDetailForDonut(page, apiId, label) {
		const container = $({ browsers: "#browsers-body", systems: "#systems-body", sizes: "#sizes-body" }[page]);
		if (!container) return;
		container.innerHTML = "";
		const panel = document.createElement("div");
		panel.className = "detail-panel";
		panel.innerHTML = `<h4>${t("detail.breakdown", { name: label })}</h4>`;
		container.appendChild(panel);
		try {
			const range = getDateRange(currentPreset, customStart, customEnd);
			const url = endpointFor(page, range.start, range.end, "&limit=10");
			const path = `/api/v0/stats/${page}/${encodeURIComponent(apiId)}${url.slice(url.indexOf("?"))}`;
			const res = await client.request(path);
			const rows = res.stats || [];
			if (!rows.length) { panel.appendChild(emptyEl(t("detail.noData"))); return; }
			const max = Math.max(...rows.map((r) => r.count), 1);
			rows.slice(0, 8).forEach((r) => {
				const ro = document.createElement("div");
				ro.className = "detail-row";
				const nm = document.createElement("span"); nm.className = "dname"; nm.textContent = r.name || t("top.unknown");
				const cnt = document.createElement("span"); cnt.className = "dcount"; cnt.textContent = fmtNum(r.count);
				ro.append(nm, cnt);
				panel.appendChild(ro);
			});
		} catch (e) {
			if (e.kind === "auth") return handleAuthError(e.message);
			panel.appendChild(emptyEl(t("detail.noData")));
		}
	}

	function renderPages(hits) {
		const items = (hits || []).map((h) => ({ name: h.path, id: h.path_id || h.id, title: h.title, count: h.count, event: h.event }));
		if (!items.length) { $("#pages-body").innerHTML = ""; $("#pages-body").appendChild(emptyEl(t("no.pages"))); return; }
		renderTopList($("#pages-body"), items, {
			total: items.reduce((a, i) => a + i.count, 0),
			nameSub: (i) => i.title || "",
			badge: (i) => (i.event ? t("event.badge") : null),
			page: "hits",
			onRowClick: (item, row) => {
				if (demoMode) {
					toggleDetail(row, "hits", item.name, item.name, { demo: GOATDASH_DEMO.refs[item.name] || [], kind: "refs" });
					return;
				}
				toggleDetail(row, "hits", item.id, item.name, { demo: null, kind: "refs" });
			},
		});
	}

	function renderPagesDemo() {
		const data = GOATDASH_DEMO.build(demoPreset);
		renderPages(data.data.hits.hits);
	}

	function renderLanguages(stats) {
		const items = (stats || []).map((s) => ({ name: s.name, count: s.count }));
		renderTopList($("#languages-body"), items, { total: items.reduce((a, i) => a + i.count, 0), rank: true, page: null });
	}

	function renderDonutsDemo(data) {
		renderDonut($("#browsers-body"), data.browsers.stats, { total: data.browsers.total, page: "browsers", onDrill: (item) => drillDetail("browsers", item, 0) });
		renderDonut($("#systems-body"), data.systems.stats, { total: data.systems.total, page: "systems", onDrill: (item) => drillDetail("systems", item, 0) });
		renderDonut($("#sizes-body"), data.sizes.stats.map((i) => ({ ...i, name: deviceLabel(i.name) })), { total: data.sizes.total, page: "sizes", onDrill: (item) => drillDetail("sizes", item, 0) });
	}

	function renderGeoDemo(data) {
		renderGeo($("#geo-body"), data.locations.stats, data.locations.total, null);
	}

	function renderCampaignsDemo(stats) {
		renderTopList($("#campaigns-body"), stats, { total: stats.reduce((a, i) => a + i.count, 0), page: "campaigns", onRowClick: (item, row) => toggleDetail(row, "campaigns", item.id || item.name, item.name, { demo: GOATDASH_DEMO.campaignDetails[item.name] || [], kind: "stats" }) });
	}

	function updateFreshness() {
		const el = $("#freshness");
		if (demoMode) { el.textContent = t("updated", { t: t("updated.now") }); return; }
		if (!lastUpdatedAt) return;
		el.textContent = t("updated", { t: relTime(lastUpdatedAt) });
	}

	function onRangeChange(e) {
		const btn = e.target.closest(".seg-btn");
		if (!btn) return;
		document.querySelectorAll(".seg-btn").forEach((b) => b.classList.remove("seg-active"));
		btn.classList.add("seg-active");
		currentPreset = btn.dataset.preset;
		$("#custom-range").hidden = currentPreset !== "custom";
		if (currentPreset === "custom") {
			const range = getDateRange("custom", customStart, customEnd);
			const iso = (d) => d.toISOString().slice(0, 10);
			if (!customStart) $("#custom-start").value = iso(new Date(Date.now() - 29 * 86400000));
			if (!customEnd) $("#custom-end").value = iso(new Date());
		}
		loadData();
	}

	function onCustomChange() {
		customStart = $("#custom-start").value;
		customEnd = $("#custom-end").value;
		if (customStart && customEnd) loadData();
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
		if (config) APIClient.clearCache(config.baseURL);
		localStorage.removeItem(STORAGE_KEY);
		config = null; demoMode = false; currentSite = null; sitesList = [];
		$("#dash-screen").hidden = true;
		$("#connect-screen").hidden = false;
		if (msg) {
			const err = $("#connect-error");
			err.textContent = msg;
			err.hidden = false;
		}
		applyLang();
	}

	// ----------------------------------------------------------------- connect
	function initConnect() {
		$("#connect-form").addEventListener("submit", async (e) => {
			e.preventDefault();
			const err = $("#connect-error");
			err.hidden = true;
			const btn = $("#connect-btn");
			btn.disabled = true;
			btn.textContent = t("connect.connect").replace("→", "…");
			const urlRaw = $("#gc-url").value.trim();
			const keyRaw = $("#gc-key").value.trim();
			try {
				let u = urlRaw;
				if (!/^https?:\/\//i.test(u)) u = "https://" + u;
				u = u.replace(/\/+$/, "");
				let parsed;
				try { parsed = new URL(u); } catch { throw new Error(t("connect.urlBad")); }
				const baseURL = parsed.protocol + "//" + parsed.host;
				if (!keyRaw) throw new Error(t("connect.keyRequired"));
				const c = new APIClient(baseURL, keyRaw);
				const me = await c.request("/api/v0/me", { retries: 1 });
				config = { baseURL, apiKey: keyRaw, me };
				currentSite = config.site || null;
				c.site = currentSite;
				client = c;
				localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
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
				if (!$("#dash-screen").hidden) loadData();
			});
		});
		$("#disconnect-btn").addEventListener("click", () => disconnect());
		$("#demo-connect").addEventListener("click", () => disconnect());

		$("#menu-btn").addEventListener("click", (e) => {
			e.stopPropagation();
			const menu = $("#menu");
			menu.hidden = !menu.hidden;
			$("#menu-btn").setAttribute("aria-expanded", String(!menu.hidden));
		});
		document.addEventListener("click", (e) => {
			if (!e.target.closest(".submenu") && !e.target.closest("#theme-btn") && !e.target.closest("#lang-btn") && !e.target.closest("#lang-toggle")) {
				closeSubmenus();
			}
			const menu = $("#menu");
			if (menu && !menu.hidden && !e.target.closest(".menu-wrap")) { menu.hidden = true; $("#menu-btn").setAttribute("aria-expanded", "false"); }
		});
	}

	// --------------------------------------------------------------- startup
	function boot() {
		applyLang();
		applyTheme();
		THEME_MQ.addEventListener("change", () => {
			if (theme === "auto") applyTheme();
		});
		window.addEventListener("languagechange", () => {
			if (lang === "auto") applyLang();
		});
		initSidebar();
		window.addEventListener("resize", syncTopbarHeight);
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const cfg = JSON.parse(saved);
				if (cfg && cfg.baseURL && cfg.apiKey && cfg.baseURL !== "_demo_") {
					config = cfg;
					currentSite = cfg.site || null;
					client = new APIClient(cfg.baseURL, cfg.apiKey);
					client.site = currentSite;
					demoMode = false;
					loadDashboard();
					return;
				}
			}
		} catch { /* corrupt config: start clean */ }
		$("#connect-screen").hidden = false;
		initConnect();
	}

	document.addEventListener("DOMContentLoaded", boot);
})();
