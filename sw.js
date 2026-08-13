// Service worker de goatdash: recarga inmediata.
// Estrategia:
//  - Navegación (index.html): NETWORK-FIRST. Si hay red, HTML fresco siempre;
//    la caché es solo fallback offline. Esto evita servir una versión vieja
//    de la app (lección del incidente de caché mixta).
//  - Assets con ?v=N: CACHE-FIRST. Son inmutables (la versión va en la URL y
//    se sube en cada deploy), así que cachearlos es siempre correcto.
//  - /api/: NUNCA se cachea aquí; la app gestiona su propia caché en
//    localStorage (stale-while-revalidate por preset).
const CACHE = "goatdash-v1";
const SHELL = ["/", "/index.html", "/styles.css", "/theme.js", "/app.js", "/fixtures.js", "/assets/world-map.js"];

self.addEventListener("install", (e) => {
	e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
			.then(() => self.clients.claim())
	);
});

self.addEventListener("fetch", (e) => {
	const url = new URL(e.request.url);
	if (e.request.method !== "GET" || url.origin !== location.origin) return; // API cross-origin: fuera
	if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/count")) return;

	// Navegación (el documento HTML): red primero, caché como fallback.
	if (e.request.mode === "navigate" || (url.pathname === "/" || url.pathname === "/index.html")) {
		e.respondWith(
			fetch(e.request)
				.then((res) => {
					const copy = res.clone();
					caches.open(CACHE).then((c) => c.put("/index.html", copy)).catch(() => {});
					return res;
				})
				.catch(() => caches.match("/index.html"))
		);
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
});
