// Goatdash update check: lightweight vanilla-JS banner for new releases.
// Fetches GitHub releases/latest once per week and shows a dismissible banner.
// Also listens to the service worker when a new version is already deployed.
(() => {
	"use strict";

	const REPO = "gnacho/goatdash";
	const CHECK_KEY = "goatdash-last-update-check";
	const DISMISS_KEY = "goatdash-update-dismissed";
	const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

	const STRINGS = {
		es: {
			available: "Hay una versión nueva ({v}).",
			notes: "Ver novedades",
			reload: "Hay una versión nueva desplegada. Recarga para usarla.",
			reloadBtn: "Recargar",
			close: "Cerrar"
		},
		en: {
			available: "Version {v} is available.",
			notes: "See release notes",
			reload: "A new version is deployed. Reload to use it.",
			reloadBtn: "Reload",
			close: "Close"
		}
	};

	function lang() {
		const htmlLang = document.documentElement.lang;
		return htmlLang && htmlLang.startsWith("en") ? "en" : "es";
	}

	function t(key, version) {
		const l = STRINGS[lang()];
		const s = l[key] || STRINGS.en[key] || key;
		return version ? s.replace("{v}", version) : s;
	}

	function compareSemver(a, b) {
		const parse = (s) => String(s).replace(/^v/, "").split(".").map((n) => parseInt(n, 10) || 0);
		const pa = parse(a);
		const pb = parse(b);
		for (let i = 0; i < 3; i++) {
			const da = pa[i] || 0;
			const db = pb[i] || 0;
			if (da > db) return 1;
			if (da < db) return -1;
		}
		return 0;
	}

	async function currentVersion() {
		try {
			const res = await fetch("version.json", { cache: "no-store" });
			if (!res.ok) return null;
			const data = await res.json();
			return data.version;
		} catch {
			return null;
		}
	}

	async function latestRelease() {
		const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { cache: "no-store" });
		if (!res.ok) throw new Error(`GitHub ${res.status}`);
		const data = await res.json();
		return data.tag_name;
	}

	function showBanner(tag, reload) {
		const banner = document.getElementById("update-banner");
		const text = document.getElementById("update-banner-text");
		const link = document.getElementById("update-banner-link");
		const reloadBtn = document.getElementById("update-banner-reload");
		const closeBtn = document.getElementById("update-banner-close");
		if (!banner || !text) return;

		if (reload) {
			text.textContent = t("reload");
			link.hidden = true;
			reloadBtn.hidden = false;
			reloadBtn.textContent = t("reloadBtn");
			reloadBtn.onclick = () => window.location.reload();
			closeBtn.hidden = true;
		} else {
			const version = tag.replace(/^v/, "");
			text.textContent = t("available", version);
			link.href = `https://github.com/${REPO}/releases/tag/${tag}`;
			link.textContent = t("notes");
			link.hidden = false;
			reloadBtn.hidden = true;
			closeBtn.hidden = false;
			closeBtn.setAttribute("aria-label", t("close"));
			closeBtn.onclick = () => {
				banner.hidden = true;
				try { localStorage.setItem(DISMISS_KEY, tag); } catch {}
			};
		}

		banner.hidden = false;
	}

	async function check() {
		const current = await currentVersion();
		if (!current) return;

		let last = 0;
		try { last = parseInt(localStorage.getItem(CHECK_KEY), 10) || 0; } catch {}
		const now = Date.now();
		if (last && now - last < WEEK_MS) return;

		let tag;
		try {
			tag = await latestRelease();
		} catch (e) {
			// eslint-disable-next-line no-console
			if (typeof console !== "undefined") console.warn("goatdash update check failed:", e);
			return;
		}

		try { localStorage.setItem(CHECK_KEY, String(now)); } catch {}

		let dismissed = null;
		try { dismissed = localStorage.getItem(DISMISS_KEY); } catch {}
		if (dismissed === tag) return;

		if (compareSemver(tag, current) > 0) {
			showBanner(tag, false);
		}
	}

	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.addEventListener("message", (e) => {
			if (e.data && e.data.type === "sw-updated") {
				showBanner(null, true);
			}
		});
	}

	// Wait until DOM is ready.
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", check);
	} else {
		check();
	}
})();
