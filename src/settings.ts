// LocalStorage helpers and version metadata.

export const STORAGE_KEY = "gc-dashboard-config-v1";
export const VERSION = "1.0.27";
export const REPO_URL = "https://github.com/gnacho/goatdash";
export const HOME_SORT_KEY = "gc-home-sort-v1";
export const THEME_KEY = "gc-dashboard-theme-v1";
export const LANG_KEY = "gc-dashboard-lang-v1";
export const REFRESH_KEY = "gc-auto-refresh-v1";
export function readStore(key: string): string | null {
	try { return localStorage.getItem(key); }
	catch { return null; }
}
export function safeStore(key: string, value: string) {
	try { localStorage.setItem(key, value); }
	catch {
		// Quota llena: libera caché vieja y reintenta una vez antes de rendirse.
		try {
			pruneCache();
			localStorage.setItem(key, value);
		} catch { /* private mode / quota: non-fatal */ }
	}
}
export function pruneCache() {
	try {
		const cutoff = Date.now() - CACHE_PRUNE_MS;
		const doomed: string[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			const k = localStorage.key(i);
			if (!k || !k.startsWith(CACHE_PREFIX)) continue;
			try {
				const raw = localStorage.getItem(k);
				if (!raw) { doomed.push(k); continue; }
				const { timestamp } = JSON.parse(raw);
				if (typeof timestamp !== "number" || timestamp < cutoff) doomed.push(k);
			} catch { doomed.push(k); }
		}
		doomed.forEach((k) => localStorage.removeItem(k));
	} catch { /* private mode / quota: best-effort */ }
}
export const CACHE_PREFIX = "gc-cache:";
export const CACHE_TTL_MS = 60_000;
export const CACHE_PRUNE_MS = 10 * 60_000;
