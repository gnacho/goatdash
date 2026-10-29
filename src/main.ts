// Entry point: boots the app once the DOM is ready.
import "./types";
import "./i18n/strings";
import "./state";
import "./theme";
import "./api";
import "./render/cards";
import "./render/chart";
import "./render/lists";
import "./render/pages";
import "./render/languages";
import "./dashboard";
import "./sites";
import "./params";
import "./home";
import "./bridge/load";
import "./bridge/session";
import "./bridge/status";
import "./bridge/sites-helpers";
import "./bridge/home-controls";
import "./demo";
import "./connect";
import "./controls";
import "./footer";
import { boot } from "./boot";
import { isBooted, showBootError, startBootWatchdog } from "./boot-status";
import { registerServiceWorker } from "./sw-register";

startBootWatchdog();
window.addEventListener("error", (event) => {
	if (!isBooted()) showBootError(event.error || event.message);
});
window.addEventListener("unhandledrejection", (event) => {
	if (!isBooted()) showBootError(event.reason);
});

try {
	boot();
} catch (err) {
	showBootError(err);
}
registerServiceWorker();
