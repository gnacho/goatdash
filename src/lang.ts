// Language preference (es/en/auto) and re-render on change.
import { renderHomeControls } from "./bridge/home-controls";
import { renderSiteSwitch } from "./bridge/sites-helpers";
import { $ } from "./dom";
import { LANG_KEY, safeStore } from "./settings";
import { t } from "./i18n/index";
import { homeView, lang, pathFilter } from "./state";
import { updateThemeUI } from "./theme";
import { updateAutoRefreshUI } from "./refresh";
import { updateCompareUI } from "./render/chart";
import { renderHome } from "./home";
import { updateRangeUI } from "./params";

const LANG_NATIVE = { es: "Español", en: "English", auto: "Auto" };

function resolveLang() {
	return (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
}
export function currentLang() {
	return lang === "auto" ? resolveLang() : lang;
}

function langName() {
	return (LANG_NATIVE as Record<string, string>)[lang] || lang;
}
export function applyLang() {
	const resolved = currentLang();
	document.documentElement.lang = resolved;
	safeStore(LANG_KEY, lang);
	document.title = t("app.title");
	document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
		el.textContent = t(el.dataset.i18n as string);
	});
	document.querySelectorAll<HTMLElement>("[data-i18n-alt]").forEach((el) => {
		el.setAttribute("alt", t(el.dataset.i18nAlt as string));
	});
	updateLangUI();
	updateThemeUI();
	updateAutoRefreshUI();
	renderHomeControls();
	updateRangeUI();
	updateCompareUI();
	if (homeView) renderHome();
}

export function updateLangUI() {
	const menuBtn = $("#lang-btn");
	if (menuBtn) menuBtn.textContent = t("menu.lang", { idioma: langName() });
	const toggle = $("#lang-toggle");
	if (toggle) toggle.textContent = langName();
	document.querySelectorAll<HTMLElement>("[data-lang-option]").forEach((btn) => {
		const active = btn.dataset.langOption === lang;
		btn.classList.toggle("active", active);
		btn.setAttribute("aria-checked", String(active));
	});
	const chip = $("#user-chip");
	if (chip) chip.setAttribute("title", t("menu.settings"));
	const aboutClose = $("#about-close");
	if (aboutClose) aboutClose.setAttribute("aria-label", t("about.close"));
	document.querySelectorAll<HTMLElement>(".expand-btn").forEach((b) => b.setAttribute("aria-label", t("expand.open")));
	const expandClose = $("#expand-close");
	if (expandClose) expandClose.setAttribute("aria-label", t("expand.close"));
	const pathInput = $("#path-filter-input");
	if (pathInput) { pathInput.setAttribute("placeholder", t("filter.placeholder")); pathInput.setAttribute("aria-label", t("filter.placeholder")); }
	const chipClear = $("#filter-chip-clear");
	if (chipClear) chipClear.setAttribute("aria-label", t("filter.clear"));
	if (pathFilter && pathFilter.label) {
		const chipLabel = $("#filter-chip-label");
		if (chipLabel) chipLabel.textContent = t("filter.applied", { q: pathFilter.label });
	}
	const homeSearch = $("#home-search");
	if (homeSearch) homeSearch.setAttribute("placeholder", t("home.searchPlaceholder"));
	const swSearch = $("#site-switch-search");
	if (swSearch) swSearch.setAttribute("placeholder", t("home.searchPlaceholder"));
	renderHomeControls();
	renderSiteSwitch();
}
