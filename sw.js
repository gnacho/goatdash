"use strict";
(() => {
  const swSelf = self;
  const CACHE = "goatdash-v38";
  const SHELL = ["/", "/index.html", "/styles.css", "/theme.js", "/app.js", "/fixtures.js", "/update-check.js", "/version.json", "/assets/world-map.js"];
  self.addEventListener("install", ((e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => swSelf.skipWaiting()));
  }));
  self.addEventListener("activate", ((e) => {
    e.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => swSelf.clients.claim())
    );
  }));
  async function notifyUpdate() {
    await new Promise((r) => setTimeout(r, 1500));
    const clients = await swSelf.clients.matchAll({ type: "window" });
    clients.forEach((c) => c.postMessage({ type: "sw-updated" }));
  }
  self.addEventListener("message", ((e) => {
    if (!e.data || e.data.type !== "version-check") return;
    e.waitUntil((async () => {
      try {
        const res = await fetch("/index.html", { cache: "no-store" });
        if (!res.ok) {
          e.source.postMessage({ type: "version-check", changed: false });
          return;
        }
        const newText = await res.text();
        const cache = await caches.open(CACHE);
        const cached = await cache.match("/index.html");
        const oldText = cached ? await cached.text() : null;
        if (oldText === null) {
          await cache.put("/index.html", new Response(newText));
          e.source.postMessage({ type: "version-check", changed: false });
          return;
        }
        if (newText === oldText) {
          e.source.postMessage({ type: "version-check", changed: false });
          return;
        }
        await cache.put("/index.html", new Response(newText));
        e.source.postMessage({ type: "version-check", changed: true });
      } catch {
        e.source.postMessage({ type: "version-check", changed: false });
      }
    })());
  }));
  async function refreshHTML(request) {
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
    } catch {
    }
  }
  self.addEventListener("fetch", ((e) => {
    const url = new URL(e.request.url);
    if (e.request.method !== "GET" || url.origin !== location.origin) return;
    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/count")) return;
    if (e.request.mode === "navigate" || url.pathname === "/" || url.pathname === "/index.html") {
      e.respondWith((async () => {
        const cached = await caches.match("/index.html");
        const refreshing = refreshHTML(e.request);
        if (cached) return cached;
        try {
          return await refreshing.then(() => caches.match("/index.html")).then((r) => r || Response.error());
        } catch {
          return Response.error();
        }
      })());
      return;
    }
    e.respondWith(
      caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {
        });
        return res;
      }))
    );
  }));
})();
