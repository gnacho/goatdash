// Wires the shell controls (menus, About, update check).
import { disconnect } from "./bridge/session";
import { closeSiteSwitch, renderSiteSwitch } from "./bridge/sites-helpers";
import { loadData } from "./dashboard";
import { $ } from "./dom";
import { REPO_URL, VERSION } from "./settings";
import { t } from "./i18n/index";
import { autoTimer, homeView, lang, setLang, setTheme, theme } from "./state";
import { applyTheme } from "./theme";
import { exportCSV, updateExportMenu } from "./render/expand";
import { renderHome } from "./home";
import { closeSubmenus, toggleSubmenu } from "./user";
import { autoRefreshTick, setAutoRefresh } from "./params";
import { applyLang } from "./lang";

export function initControls() {
	$("#lang-toggle").addEventListener("click", (e) => {
		e.stopPropagation();
		toggleSubmenu("#lang-toggle-menu", "#lang-toggle");
	});
	$("#lang-btn").addEventListener("click", (e) => {
		e.stopPropagation();
		toggleSubmenu("#lang-menu", "#lang-btn");
	});
	$("#theme-btn").addEventListener("click", (e) => {
		e.stopPropagation();
		toggleSubmenu("#theme-menu", "#theme-btn");
	});
	$("#export-btn").addEventListener("click", (e) => {
		e.stopPropagation();
		updateExportMenu();
		toggleSubmenu("#export-menu", "#export-btn");
	});
	const autoBtn = $("#autorefresh-btn");
	if (autoBtn) autoBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		toggleSubmenu("#autorefresh-menu", "#autorefresh-btn");
	});
	document.querySelectorAll<HTMLElement>("[data-refresh-option]").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			setAutoRefresh(parseInt(btn.dataset.refreshOption as string, 10) || 0);
			closeSubmenus();
			closeUserMenu();
		});
	});
	// Al volver a la pestaña los datos pueden llevar horas quietos: refresco
	// inmediato en vez de esperar al siguiente tick del intervalo.
	document.addEventListener("visibilitychange", () => {
		if (!document.hidden && autoTimer) autoRefreshTick();
	});
	document.querySelectorAll<HTMLElement>("[data-export]").forEach((btn) => {
		btn.addEventListener("click", (e: MouseEvent) => {
			e.stopPropagation();
			if ((btn as HTMLButtonElement).disabled) return;
			exportCSV(btn.dataset.export as string);
			closeSubmenus();
			const menu = $("#menu");
			if (menu) closeUserMenu();
		});
	});
	document.querySelectorAll<HTMLElement>("[data-theme-option]").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			setTheme(btn.dataset.themeOption as string);
			applyTheme();
			closeSubmenus();
		});
	});
	document.querySelectorAll<HTMLElement>("[data-lang-option]").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.stopPropagation();
			setLang(btn.dataset.langOption as string);
			applyLang();
			closeSubmenus();
			if ($("#dash-screen").hidden) return;
			if (homeView) { renderHome(); renderSiteSwitch(); }
			else loadData();
		});
	});
	$("#disconnect-btn").addEventListener("click", () => disconnect());
	$("#demo-connect").addEventListener("click", () => disconnect());

	$("#about-btn").addEventListener("click", () => {
		closeUserMenu();
		const dialog = $("#about-dialog") as HTMLDialogElement;
		const version = $("#about-version");
		const repo = $("#about-repo") as HTMLAnchorElement | null;
		if (version) version.textContent = t("about.version", { v: VERSION });
		if (repo) { repo.textContent = t("about.repo"); repo.href = REPO_URL; }
		if (dialog && !dialog.open) dialog.showModal();
	});
	$("#about-close").addEventListener("click", () => {
		const dialog = $("#about-dialog") as HTMLDialogElement;
		if (dialog && dialog.open) dialog.close();
	});

	$("#update-btn").addEventListener("click", () => {
		closeUserMenu();
		const upd = window.GoatdashUpdate;
		if (!upd || typeof upd.check !== "function") { if (upd && upd.showMessage) upd.showMessage(t("update.err")); return; }
		upd.check({
			force: true,
			onResult: (r) => {
				if (!r || r.error) { upd.showMessage(t("update.err")); return; }
				if (r.available) return; // check() already raised the update banner with the release link
				upd.showMessage(t("update.upToDate", { v: String(r.current || "") }), true);
			},
		});
	});

	$("#update-token-btn").addEventListener("click", () => {
		closeUserMenu();
		let cur = "";
		try { cur = localStorage.getItem("goatdash-update-token") || ""; } catch {}
		const v = window.prompt(t("update.tokenPrompt"), cur);
		if (v === null) return;
		const upd = window.GoatdashUpdate;
		if (upd && typeof upd.setToken === "function") upd.setToken(v.trim());
	});

	// El menú de ajustes se despliega al pulsar el chip de usuario.
	const chip = $("#user-chip");
	if (chip) chip.addEventListener("click", (e) => {
		e.stopPropagation();
		const menu = $("#menu") as HTMLElement;
		const open = menu.hidden;
		menu.hidden = !open;
		chip.setAttribute("aria-expanded", String(open));
	});
	document.addEventListener("click", (e: MouseEvent) => {
		const tgt = e.target as HTMLElement;
		if (!tgt.closest(".submenu") && !tgt.closest("#theme-btn") && !tgt.closest("#lang-btn") && !tgt.closest("#lang-toggle") && !tgt.closest("#export-btn") && !tgt.closest("#autorefresh-btn")) {
			closeSubmenus();
		}
		const menu = $("#menu");
		if (menu && !menu.hidden && !tgt.closest(".user-wrap")) closeUserMenu();
		if (!tgt.closest(".site-switch")) closeSiteSwitch();
	});
}
export function closeUserMenu() {
	const menu = $("#menu");
	const chip = $("#user-chip");
	if (menu) menu.hidden = true;
	if (chip) chip.setAttribute("aria-expanded", "false");
}
