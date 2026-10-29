// Registers the service worker after the app is usable. The worker is
// optional: unsupported browsers, private mode and registration errors must
// never block or break the dashboard.
export function registerServiceWorker() {
	if (!("serviceWorker" in navigator)) return;
	if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;

	window.addEventListener("load", () => {
		navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).catch((err) => {
			console.warn("[sw] registration failed", err);
		});
	});
}
