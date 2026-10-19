// Connect screen, disconnect and auth error handling.
import { deriveTokenScope } from "./bridge/sites-helpers";
import { loadDashboard } from "./dashboard";
import { showRateBanner } from "./bridge/status";
import { $ } from "./dom";
import { STORAGE_KEY, safeStore } from "./settings";
import { t } from "./i18n/index";
import { client, config, currentSite, demoMode, setClient, setConfig, setCurrentSite, setDemoMode } from "./state";
import { APIClient } from "./api";

export function initConnect() {
	$("#connect-form").addEventListener("submit", async (e: Event) => {
		e.preventDefault();
		const err = $("#connect-error") as HTMLElement;
		err.hidden = true;
		const btn = $("#connect-btn") as HTMLButtonElement;
		btn.disabled = true;
		btn.textContent = t("connect.connect").replace("→", "…");
		const urlRaw = ($("#gc-url") as HTMLInputElement).value.trim();
		const keyRaw = ($("#gc-key") as HTMLInputElement).value.trim();
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
			setConfig({ baseURL, apiKey: keyRaw, me });
			deriveTokenScope();
			setCurrentSite(config ? config.site || null : null);
			(config as any).siteBaseURL = currentSite ? "https://" + currentSite : null;
			c.onRateLimited = (e: any) => showRateBanner(e.retryAfter);
			setClient(c);
			safeStore(STORAGE_KEY, JSON.stringify(config));
			setDemoMode(false);
			loadDashboard();
		} catch (err2: any) {
			let msg: string = err2.message;
			if (err2 instanceof TypeError) msg = t("connect.netErr", { url: urlRaw });
			err.textContent = msg;
			err.hidden = false;
		} finally {
			btn.disabled = false;
			btn.textContent = t("connect.connect");
		}
	});

	$("#demo-btn").addEventListener("click", () => {
		setDemoMode(true);
		setConfig({ baseURL: "_demo_", apiKey: "_demo_", me: { site: { cname: "Demo site", code: "demo" } } });
		loadDashboard();
	});
}
