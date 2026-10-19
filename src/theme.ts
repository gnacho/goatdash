// Theme preference (auto/light/dark) applied before paint.
import { $ } from "./dom";
import { THEME_KEY, safeStore } from "./settings";
import { t } from "./i18n/index";
import { theme } from "./state";

export const THEME_MQ = window.matchMedia("(prefers-color-scheme: dark)");

function resolveTheme() {
	return THEME_MQ.matches ? "dark" : "light";
}

function themeName() {
	return t("theme." + theme);
}
export function applyTheme() {
	const resolved = theme === "auto" ? resolveTheme() : theme;
	document.documentElement.setAttribute("data-theme", resolved);
	safeStore(THEME_KEY, theme);
	updateThemeUI();
}
export function updateThemeUI() {
	const lbl = $("#theme-btn");
	if (lbl) lbl.textContent = t("menu.theme", { tema: themeName() });
	const group = $("#theme-menu");
	if (group) group.querySelectorAll<HTMLElement>("[data-theme-option]").forEach((btn) => {
		const active = btn.dataset.themeOption === theme;
		btn.classList.toggle("active", active);
		btn.setAttribute("aria-checked", String(active));
	});
}
