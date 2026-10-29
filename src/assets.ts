// Cache-bust suffix shared by assets loaded on demand. The app script is the
// source of truth: whatever ?v= the HTML used for app.js is reused for the
// lazy chunks, so a deploy only needs to bump index.html.
export function assetUrl(path: string): string {
	const scripts = Array.from(document.scripts);
	const app = scripts.find((s) => /(?:^|\/)app\.js(?:\?|$)/.test(s.src));
	const version = app?.src.match(/[?&]v=([^&]+)/)?.[1];
	return version ? `${path}?v=${version}` : path;
}
