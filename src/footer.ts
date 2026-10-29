// Footer: version and GitHub stars counter.
import { $ } from "./dom";
import { REPO_URL, VERSION, readStore, safeStore } from "./settings";
import { fmtNum } from "./util";

const FOOT_STARS_KEY = "gc-stars-v1";

const FOOT_STARS_TTL_MS = 6 * 3600_000;

export function initFooter() {
	const ver = $("#foot-version");
	if (ver) ver.textContent = "v" + VERSION;
	const starLink = $("#foot-star") as HTMLAnchorElement | null;
	if (starLink) starLink.href = REPO_URL;
	const starCount = $("#foot-stars");
	if (!starCount) return;
	let cached: { count?: number; ts?: number } | null = null;
	try {
		const raw = readStore(FOOT_STARS_KEY);
		if (raw) { const o = JSON.parse(raw); if (o && typeof o.count === "number") cached = o; }
	} catch { /* ignore */ }
	if (cached) starCount.textContent = fmtNum(cached.count);
	if (cached && (Date.now() - (cached.ts || 0)) < FOOT_STARS_TTL_MS) return;
	fetchStars(starCount);
}

async function fetchStars(el: any) {
	try {
		const repo = REPO_URL.replace("https://github.com/", "");
		const r = await fetch("https://api.github.com/repos/" + repo, { headers: { Accept: "application/vnd.github+json" } });
		if (!r.ok) return;
		const j = await r.json();
		const n = j && j.stargazers_count;
		if (typeof n !== "number") return;
		el.textContent = fmtNum(n);
		safeStore(FOOT_STARS_KEY, JSON.stringify({ ts: Date.now(), count: n }));
	} catch { /* sin red o bloqueado por CSP: queda lo cacheado */ }
}
