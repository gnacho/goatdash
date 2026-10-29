// Startup fallback state. Kept free of app imports so it can run even when
// another module fails while loading.

function byId(id: string): HTMLElement | null {
	return document.getElementById(id);
}

let booted = false;
let failed = false;
let watchdog: ReturnType<typeof setTimeout> | null = null;

export function markBooted() {
	if (failed) return;
	booted = true;
	if (watchdog !== null) {
		clearTimeout(watchdog);
		watchdog = null;
	}
	const screen = byId("boot-screen");
	if (screen) screen.hidden = true;
	document.documentElement.dataset.booted = "1";
}

export function showBootError(error?: unknown) {
	if (failed) return;
	failed = true;
	booted = true;
	if (watchdog !== null) {
		clearTimeout(watchdog);
		watchdog = null;
	}

	const screen = byId("boot-screen");
	const text = byId("boot-text");
	const hint = byId("boot-hint");
	if (screen) {
		screen.hidden = false;
		screen.dataset.state = "error";
		screen.setAttribute("role", "alert");
	}
	if (text) text.textContent = "No se pudo iniciar Goatdash. / Goatdash could not start.";
	if (hint) hint.textContent = "Recarga la página. Si vuelve a pasar, abre la consola del navegador. / Reload the page. If it happens again, open the browser console.";
	console.error("[boot] startup failed", error);
}

export function isBooted() {
	return booted || failed;
}

export function startBootWatchdog(ms = 12_000) {
	if (watchdog !== null) clearTimeout(watchdog);
	watchdog = setTimeout(() => {
		if (!booted && !failed) showBootError(new Error("boot timeout"));
	}, ms);
}
