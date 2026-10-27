// Service worker de goatdash: recarga inmediata.
// Estrategia:
//  - Navegación (index.html): STALE-WHILE-REVALIDATE. Se sirve la copia en
//    caché al instante (F5 = 0 ms de red) y se comprueba en segundo plano si
//    el servidor tiene otra versión; si difiere, se actualiza la caché y se
//    avisa a la página, que se autorecarga UNA vez (guard con sessionStorage).
//    Así un deploy nunca deja al usuario con la versión antigua (lección del
//    incidente de caché mixta), pero tampoco le cuesta una espera de red.
//  - Assets con ?v=N: CACHE-FIRST. Son inmutables (la versión va en la URL y
//    se sube en cada deploy), así que cachearlos es siempre correcto.
//  - /api/: NUNCA se cachea aquí; la app gestiona su propia caché en
//    localStorage (stale-while-revalidate por preset).
// Types for the service worker surface (lib.dom types `self` as Window and has
// no FetchEvent/ServiceWorkerGlobalScope, so the pieces used here are declared
// locally; no behavior change, same runtime calls).
interface SWClient {
	postMessage(message: unknown): void;
}
interface SWSelf {
	skipWaiting(): Promise<void>;
	clients: {
		claim(): Promise<void>;
		matchAll(options: { type: string }): Promise<SWClient[]>;
	};
}
interface SWLifecycleEvent extends Event {
	waitUntil(promise: Promise<unknown>): void;
}
interface SWMessageEvent extends MessageEvent {
	waitUntil(promise: Promise<unknown>): void;
}
interface SWFetchEvent extends Event {
	request: Request;
	respondWith(response: Promise<Response> | Response): void;
}
const swSelf = self as unknown as SWSelf;
const CACHE = "goatdash-v47";
const SHELL = ["/", "/index.html", "/styles.css", "/theme.js", "/app.js", "/fixtures.js", "/update-check.js", "/version.json", "/assets/world-map.js"];

self.addEventListener("install", ((e: SWLifecycleEvent) => {
	e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => swSelf.skipWaiting()));
}) as unknown as EventListener);

self.addEventListener("activate", ((e: SWLifecycleEvent) => {
	e.waitUntil(
		caches.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
			.then(() => swSelf.clients.claim())
	);
}) as unknown as EventListener);

async function notifyUpdate() {
	// Retraso: asegura que la página ya ejecutó su listener (evita la carrera
	// del mensaje perdido en recargas muy rápidas).
	await new Promise((r) => setTimeout(r, 1500));
	const clients = await swSelf.clients.matchAll({ type: "window" });
	clients.forEach((c: SWClient) => c.postMessage({ type: "sw-updated" }));
}

// La página pregunta al arrancar si hay versión nueva (determinista, sin
// carrera): el SW compara su caché con la red y contesta.
self.addEventListener("message", ((e: SWMessageEvent) => {
	if (!e.data || e.data.type !== "version-check") return;
	e.waitUntil((async () => {
		try {
			const res = await fetch("/index.html", { cache: "no-store" });
			if (!res.ok) { (e.source as SWClient).postMessage({ type: "version-check", changed: false }); return; }
			const newText = await res.text();
			const cache = await caches.open(CACHE);
			const cached = await cache.match("/index.html");
			const oldText = cached ? await cached.text() : null;
			if (oldText === null) { await cache.put("/index.html", new Response(newText)); (e.source as SWClient).postMessage({ type: "version-check", changed: false }); return; }
			if (newText === oldText) { (e.source as SWClient).postMessage({ type: "version-check", changed: false }); return; }
			await cache.put("/index.html", new Response(newText));
			(e.source as SWClient).postMessage({ type: "version-check", changed: true });
		} catch { (e.source as SWClient).postMessage({ type: "version-check", changed: false }); }
	})());
}) as unknown as EventListener);

async function refreshHTML(request: Request) {
	try {
		const res = await fetch(request);
		if (!res || !res.ok) return;
		const copy = res.clone();
		const newText = await res.text();
		const cache = await caches.open(CACHE);
		const cached = await cache.match("/index.html");
		const oldText = cached ? await cached.text() : null;
		await cache.put("/index.html", copy);
		if (oldText !== null && newText !== oldText) await notifyUpdate();
	} catch { /* offline: la copia en caché sigue sirviendo */ }
}

self.addEventListener("fetch", ((e: SWFetchEvent) => {
	const url = new URL(e.request.url);
	if (e.request.method !== "GET" || url.origin !== location.origin) return; // API cross-origin: fuera
	if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/count")) return;

	// Navegación (el documento HTML): caché al instante + revalidación en background.
	if (e.request.mode === "navigate" || url.pathname === "/" || url.pathname === "/index.html") {
		e.respondWith((async () => {
			const cached = await caches.match("/index.html");
			const refreshing = refreshHTML(e.request);
			if (cached) return cached;
			try { return await refreshing.then(() => caches.match("/index.html")).then(r => r || Response.error()); }
			catch { return Response.error(); }
		})());
		return;
	}

	// Assets estáticos (?v=N los versiona): caché primero.
	e.respondWith(
		caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
			const copy = res.clone();
			caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
			return res;
		}))
	);
}) as unknown as EventListener);
