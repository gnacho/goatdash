// GoatCounter v0 API client: caching, rate limiting, error kinds.
import { APIError } from "./types";
import { $ } from "./dom";
import { CACHE_PREFIX, CACHE_TTL_MS } from "./settings";
import { t } from "./i18n/index";
import { isSafeBaseUrl, isSafeHostname } from "./security";

const REQUEST_SPACING_MS = 30;   // intervalo mínimo entre arranques (~33 req/s)
// Cross-origin (multi-sitio sin proxy): el preflight OPTIONS se cachea 24h
// (cabecera Access-Control-Max-Age añadida en nginx), por lo que el coste
// extra del cross-origin es mínimo y el espaciado puede igualar al local.
const REQUEST_SPACING_CROSS_ORIGIN = 30;


const PRECACHE_SPACING_MS = 100;

const RATE_LOW_WATERMARK = 6;

const RATE_WAIT_CAP_MS = 30_000;

const MAX_CONCURRENCY = 8;       // peticiones en vuelo simultáneas
const REQUEST_TIMEOUT_MS = 15_000;
export const DEVICE_LABELS = { phone: "device.phone", tablet: "device.tablet", desktop: "device.desktop", desktophd: "device.desktophd", unknown: "device.unknown" };


export class APIClient {
	baseURL: string;
	apiKey: string;
	siteBaseURL: string | null;
	_knownBases: Set<string>;
	_inflight: number;
	_waitersHigh: Array<() => void>;
	_waitersLow: Array<() => void>;
	_nextStart: number;
	_nextStartLow: number;
	_remaining: number | null;
	_resetAt: number;
	onRateLimited: ((err: unknown) => void) | null = null;
	constructor(baseURL: string, apiKey: string) {
		this.baseURL = baseURL.replace(/\/+$/, "");
		this.apiKey = apiKey;
		this.siteBaseURL = null; // base del sitio activo (https://<cname>) o null = cuenta (baseURL)
		this._knownBases = new Set([this.baseURL]); // bases vistas, para limpiar toda la caché de la conexión
		this._inflight = 0;      // peticiones en vuelo (semáforo de concurrencia)
		this._waitersHigh = [];  // cola de espera prioritaria (interacción)
		this._waitersLow = [];   // cola de espera en segundo plano (precache)
		this._nextStart = 0;     // instante mínimo para arrancar la siguiente petición high
		this._nextStartLow = 0;  // reloj independiente para el precache (nunca retrasa las high)
		this._remaining = null;  // última X-Rate-Limit-Remaining vista
		this._resetAt = 0;       // cuándo se rellena el límite (ms epoch)
	}

	clearCache() {
		// Limpia la caché de la cuenta (baseURL) y de todos los subsitios ya
		// cacheados (sus cnames). La clave incluye el prefijo de URL completo.
		try {
			const keys: string[] = [];
			for (let i = 0; i < localStorage.length; i++) {
				const k = localStorage.key(i);
				if (!k || !k.startsWith(CACHE_PREFIX)) continue;
				if ([...this._knownBases].some((b) => k.startsWith(CACHE_PREFIX + b + ":"))) keys.push(k);
			}
			keys.forEach((k) => localStorage.removeItem(k));
		} catch { /* private mode / denied storage: non-fatal */ }
	}

	// Resuelve la base de URL para un endpoint. `site`:
	//  - cname: subsitio concreto (precache) -> https://<cname>
	//  - null:  cuenta, siempre contra baseURL (/me, /sites)
	//  - undefined: sitio activo (siteBaseURL) o, si no hay, la cuenta.
	_baseFor(site?: string | null) {
		let base;
		if (site === null) base = this.baseURL;
		else if (site) {
			if (!isSafeHostname(site)) {
				const err = new Error("Invalid site host") as APIError;
				err.kind = "config";
				throw err;
			}
			base = "https://" + site;
		}
		else base = (this.siteBaseURL && isSafeBaseUrl(this.siteBaseURL)) ? this.siteBaseURL : this.baseURL;
		this._knownBases.add(base);
		return base;
	}

	// `cacheKey` explícita: las URLs llevan timestamps al minuto y cambian
	// en cada recarga; con clave por preset la caché sobrevive recargas.
	_cacheKey(endpoint: string, site?: string | null, cacheKey?: string) {
		return CACHE_PREFIX + this._baseFor(site) + ":" + (cacheKey || endpoint);
	}

	_readCache(endpoint: string, site?: string | null, allowStale = false, cacheKey?: string): any {
		try {
			const raw = localStorage.getItem(this._cacheKey(endpoint, site, cacheKey));
			if (!raw) return null;
			const { data, timestamp } = JSON.parse(raw);
			if (!allowStale && Date.now() - timestamp > CACHE_TTL_MS) return null;
			return data;
		} catch { return null; }
	}

	_writeCache(endpoint: string, data: unknown, site?: string | null, cacheKey?: string) {
		try {
			localStorage.setItem(this._cacheKey(endpoint, site, cacheKey), JSON.stringify({ data, timestamp: Date.now() }));
		} catch { /* quota/private mode: non-fatal */ }
	}

	async _fetchOnce(endpoint: string, site?: string | null, method = "GET", body?: unknown): Promise<any> {
		const headers: Record<string, string> = { Authorization: "Bearer " + this.apiKey };
		if (body !== undefined) headers["Content-Type"] = "application/json";
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
		let res: Response;
		try {
			res = await fetch(this._baseFor(site) + endpoint, {
				method,
				headers,
				body: body !== undefined ? JSON.stringify(body) : undefined,
				signal: controller.signal,
			});
		} catch (e: any) {
			if (e && e.name === "AbortError") {
				const err = new Error(t("err.timeout")) as APIError;
				err.kind = "timeout";
				throw err;
			}
			throw e;
		} finally {
			clearTimeout(timeout);
		}
		this._observeRate(res);
		if (res.status === 401) {
			const err = new Error(t("err.401")) as APIError; err.kind = "auth"; throw err;
		}
		if (res.status === 403) {
			const err = new Error(t("err.forbidden")) as APIError; err.kind = "forbidden"; throw err;
		}
		if (res.status === 404) {
			const err = new Error(t("err.notfound", { endpoint })) as APIError; err.kind = "notfound"; throw err;
		}
		if (res.status === 429) {
			const err = new Error(t("err.rate")) as APIError; err.kind = "rate";
			const ra = res.headers.get("retry-after");
			if (ra !== null && ra !== "") { const n = parseFloat(ra); if (!Number.isNaN(n)) err.retryAfter = n; }
			throw err;
		}
		if (!res.ok) {
			let body: any;
			try { body = await res.json(); } catch { body = null; }
			const msg = body && body.error ? body.error : t("err.req", { status: res.status });
			throw new Error(msg);
		}
		return res.json();
	}

	_observeRate(res: Response) {
		const rem = res.headers.get("x-rate-limit-remaining");
		if (rem !== null && rem !== "") {
			const n = parseInt(rem, 10);
			if (!Number.isNaN(n)) this._remaining = n;
		}
		const reset = res.headers.get("x-rate-limit-reset");
		if (reset !== null && reset !== "") {
			const n = parseInt(reset, 10);
			if (!Number.isNaN(n) && n > 0) this._resetAt = Date.now() + n * 1000;
		}
		const ra = res.headers.get("retry-after");
		if (ra !== null && ra !== "") {
			const n = parseFloat(ra);
			if (!Number.isNaN(n) && n > 0) this._resetAt = Date.now() + n * 1000;
		}
	}

	async _acquire(priority: string) {
		if (this._inflight >= MAX_CONCURRENCY) {
			const waiters = priority === "low" ? this._waitersLow : this._waitersHigh;
			await new Promise((resolve) => waiters.push(resolve as () => void));
		}
		this._inflight++;
	}

	_release() {
		this._inflight--;
		const next = this._waitersHigh.shift() || this._waitersLow.shift();
		if (next) next();
	}

	async _space(spacing: number, priority = "high") {
		// Reserva atómicamente el siguiente turno de arranque ANTES de dormir,
		// para que peticiones concurrentes no lean el mismo instante. El precache
		// (low) usa su propio reloj: no adelanta el turno de las tarjetas visibles.
		// Si el cubo del rate-limit está bajo, amplía el espaciado (factor 3) para
		// no agotarlo entre varios consumidores (pestañas, precache) y evitar 429.
		const clock = priority === "low" ? "_nextStartLow" : "_nextStart";
		const now = Date.now();
		let effSpacing = spacing;
		if (this._remaining !== null && this._remaining <= RATE_LOW_WATERMARK) {
			effSpacing = spacing * 3;
		}
		let start = Math.max(this[clock as "_nextStart" | "_nextStartLow"], now);
		if (this._remaining === 0 && this._resetAt > start) {
			// Tope: no congelar la cola entera si el servidor pide esperar minutos.
			start = Math.min(this._resetAt, now + RATE_WAIT_CAP_MS);
		}
		this[clock as "_nextStart" | "_nextStartLow"] = start + effSpacing;
		const wait = start - Date.now();
		if (wait > 0) await new Promise((r) => setTimeout(r, wait));
	}

	_backoff(e: any, attempt: number) {
		if (e && typeof e.retryAfter === "number" && e.retryAfter > 0) return e.retryAfter * 1000;
		return 700 + attempt * 1000 + Math.random() * 200;
	}

	async request(endpoint: string, { retries = 2, forceRefresh = false, site, priority = "high", signal, cacheKey, method = "GET", body }: {
	retries?: number;
	forceRefresh?: boolean;
	site?: string | null;
	priority?: string;
	signal?: { cancelled: boolean } | null;
	cacheKey?: string;
	method?: string;
	body?: unknown;
} = {}): Promise<any> {
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
			const spacing = priority === "low"
				? PRECACHE_SPACING_MS
				: (crossOrigin ? REQUEST_SPACING_CROSS_ORIGIN : REQUEST_SPACING_MS);
			await this._space(spacing, priority);
			if (signal && signal.cancelled) return null;
			let lastErr: any;
			for (let attempt = 0; attempt <= retries; attempt++) {
				try {
					const data = await this._fetchOnce(endpoint, site, method, body);
					if (!isWrite) this._writeCache(endpoint, data, site, cacheKey);
					return data;
				} catch (e: any) {
					lastErr = e;
					const retriable = e instanceof TypeError || e.kind === "rate" || e.kind === "timeout";
					if (!retriable || attempt === retries) break;
					await new Promise((r) => setTimeout(r, Math.min(this._backoff(e, attempt), RATE_WAIT_CAP_MS)));
				}
			}
			// Rate-limit persistente: si hay caché (aunque sea antigua) se pinta
			// esa antes que fallar; el banner de rate informa al usuario. Solo
			// lecturas: una escritura NUNCA debe "confirmarse" con caché vieja.
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
