// In-app install entry for the PWA.
//
// Chrome fires `beforeinstallprompt` only when the app is installable and not
// installed yet. We keep the event, show every element marked with
// `data-install-prompt` and call prompt() on click, so the install is one tap
// instead of a trip through the browser menu. iOS Safari has no prompt: there
// the marked note (`data-install-hint`) explains the Share path. Everything is
// hidden once the app runs standalone.
interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export interface InstallEnv {
	standalone: boolean;
	ios: boolean;
	deferredPrompt: boolean;
}

// What the UI should show, isolated from the DOM so it can be tested without a
// browser.
export function installEntry(env: InstallEnv): "none" | "prompt" | "iosHint" {
	if (env.standalone) return "none";
	if (env.deferredPrompt) return "prompt";
	if (env.ios) return "iosHint";
	return "none";
}

const STANDALONE_MQ = "(display-mode: standalone)";

function isStandalone(): boolean {
	const displayStandalone = typeof window.matchMedia === "function" && window.matchMedia(STANDALONE_MQ).matches;
	const iosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone === true;
	return displayStandalone || iosStandalone;
}

// Safari is the only iOS browser that can add a site to the home screen.
function isIosSafari(): boolean {
	const ua = navigator.userAgent || "";
	if (!/iphone|ipad|ipod/i.test(ua)) return false;
	return !/(crios|fxios|edgios|opios|gsa\/)/i.test(ua);
}

export function initInstall() {
	const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-install-prompt]"));
	const hints = Array.from(document.querySelectorAll<HTMLElement>("[data-install-hint]"));
	if (triggers.length === 0) return;

	let deferred: BeforeInstallPromptEvent | null = null;

	const render = () => {
		const entry = installEntry({
			standalone: isStandalone(),
			ios: isIosSafari(),
			deferredPrompt: deferred !== null,
		});
		for (const el of triggers) el.hidden = entry !== "prompt";
		for (const el of hints) el.hidden = entry !== "iosHint";
	};

	window.addEventListener("beforeinstallprompt", (e) => {
		// Sin preventDefault Chrome muestra su propio mini-banner y el evento
		// solo se puede usar una vez: lo guardamos para el clic.
		e.preventDefault();
		deferred = e as BeforeInstallPromptEvent;
		render();
	});
	window.addEventListener("appinstalled", () => {
		deferred = null;
		render();
	});
	if (typeof window.matchMedia === "function") {
		const mq = window.matchMedia(STANDALONE_MQ);
		if (typeof mq.addEventListener === "function") mq.addEventListener("change", render);
	}
	for (const el of triggers) {
		el.addEventListener("click", async () => {
			if (!deferred) return;
			const event = deferred;
			deferred = null;
			try {
				await event.prompt();
				await event.userChoice;
			} catch { /* el navegador puede rechazar el prompt: se oculta y ya */ }
			render();
		});
	}
	render();
}
