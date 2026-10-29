// Bridge functions shared by several views.
import { loadData } from "../dashboard";
import { $ } from "../dom";
import { STORAGE_KEY } from "../settings";
import { client, config, currentSite, demoMode, homeData, homeQuery, homeView, inFlightRetries, setConfig, setCurrentSite, setDemoMode, setHomeData, setHomeQuery, setHomeView, setSitesList, sitesList } from "../state";
import { HOME_CACHE_KEY } from "../home";
import { stopAutoRefresh, stopRealtime } from "../params";
import { applyLang } from "../lang";

export function disconnect(msg?: any) {
	stopRealtime();
	stopAutoRefresh();
	try { if (client) client.clearCache(); } catch { /* denied storage: non-fatal */ }
	try {
		localStorage.removeItem(STORAGE_KEY);
		localStorage.removeItem(HOME_CACHE_KEY);
	} catch { /* private mode / denied storage: non-fatal */ }
	try { history.replaceState(null, "", location.pathname + location.search); } catch { /* ignore */ }
	setConfig(null); setDemoMode(false); setCurrentSite(null); setSitesList([]);
	setHomeView(false); setHomeData([]); setHomeQuery("");
	$("#dash-screen").hidden = true;
	$("#connect-screen").hidden = false;
	if (msg) {
		const err = $("#connect-error");
		err.textContent = msg;
		err.hidden = false;
	}
	applyLang();
}
export function handleAuthError(msg: any) {
	if (demoMode) return;
	disconnect(msg);
}
export function retryKey(key: any) {
	if (inFlightRetries.has(key)) return;
	inFlightRetries.add(key);
	loadData();
	inFlightRetries.delete(key);
}
