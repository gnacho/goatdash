// Wires every view once the DOM is ready.
import { initCardTabs, initCompare, initExpand, initPathFilter, initRangePicker } from "./bridge/home-controls";
import { deriveTokenScope } from "./bridge/sites-helpers";
import { loadDashboard } from "./dashboard";
import { showRateBanner } from "./bridge/status";
import { $ } from "./dom";
import { CACHE_PRUNE_MS, STORAGE_KEY, pruneCache } from "./settings";
import { client, config, currentSite, demoMode, lang, setClient, setConfig, setCurrentSite, setDemoMode, theme } from "./state";
import { THEME_MQ, applyTheme } from "./theme";
import { APIClient } from "./api";
import { isSafeBaseUrl, isSafeHostname, siteBaseUrl } from "./security";
import { syncTopbarHeight } from "./home";
import { applyLang } from "./lang";
import { refreshTokenScope } from "./sites";
import { enterDemoMode, injectDemoTracker, isDemoHost, loadFixtures } from "./demo";
import { initConnect } from "./connect";
import { initControls } from "./controls";
import { markBooted, showBootError } from "./boot-status";

export function boot() {
	try {
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
		// Sesiones largas: poda periódica para que la caché no llene la cuota
		// mientras la pestaña lleva horas abierta.
		setInterval(pruneCache, CACHE_PRUNE_MS);
		window.addEventListener("resize", syncTopbarHeight);
		if (isDemoHost()) {
			injectDemoTracker();
			void loadFixtures()
				.then(() => { enterDemoMode(); loadDashboard(); })
				.catch((err) => showBootError(err));
			return;
		}
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const cfg = JSON.parse(saved);
				if (cfg && cfg.baseURL && cfg.apiKey && cfg.baseURL !== "_demo_" && isSafeBaseUrl(cfg.baseURL)) {
					setConfig(cfg);
					deriveTokenScope();
					setCurrentSite(cfg.site && isSafeHostname(cfg.site) ? cfg.site : null);
					setClient(new APIClient(cfg.baseURL, cfg.apiKey));
					client.siteBaseURL = siteBaseUrl(currentSite);
					client.onRateLimited = (e: any) => showRateBanner(e.retryAfter);
					setDemoMode(false);
					loadDashboard();
					refreshTokenScope();
					return;
				}
			}
		} catch { /* corrupt config: start clean */ }
		$("#connect-screen").hidden = false;
		markBooted();
		initConnect();
	} catch (err) {
		showBootError(err);
	}
}
