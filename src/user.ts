// User chip and the settings/About menus.
import { $ } from "./dom";
import { t } from "./i18n/index";
import { config, demoMode, lang, theme } from "./state";

const SUBMENU_TRIGGERS = ["#theme-btn", "#lang-btn", "#lang-toggle", "#export-btn", "#autorefresh-btn"];

export function renderUser() {
	const chip = $("#user-chip");
	const avatar = $("#user-avatar");
	const email = $("#user-email");
	if (!chip) return;
	if (demoMode || !config || !config.me || !config.me.user || !config.me.user.email) {
		if (avatar) avatar.textContent = "D";
		if (email) email.textContent = t("user.demo");
		chip.title = t("user.demo");
		return;
	}
	const em = config.me.user.email;
	if (avatar) avatar.textContent = (em.charAt(0) || "?").toUpperCase();
	if (email) email.textContent = em;
	chip.title = em;
}
export function closeSubmenus() {
	document.querySelectorAll<HTMLElement>(".submenu").forEach((el) => { el.hidden = true; });
	SUBMENU_TRIGGERS.forEach((sel) => {
		const el = $(sel);
		if (el) el.setAttribute("aria-expanded", "false");
	});
}
export function toggleSubmenu(menuSel: string, btnSel: string) {
	const menu = $(menuSel) as HTMLElement;
	const btn = $(btnSel) as HTMLElement;
	const willOpen = menu.hidden;
	closeSubmenus();
	menu.hidden = !willOpen;
	btn.setAttribute("aria-expanded", String(willOpen));
}
