// URL and host validation for API connections. Pure functions so they can be
// tested without a DOM.

export function isLocalHost(hostname: string): boolean {
	const h = hostname.toLowerCase();
	return h === "localhost" || h === "127.0.0.1" || h === "::1" || h === "[::1]";
}

export function isSafeHostname(hostname: string): boolean {
	if (!hostname || hostname.length > 253) return false;
	if (hostname.startsWith(".") || hostname.endsWith(".")) return false;
	if (/[/:@?#\s]/.test(hostname)) return false;
	const labels = hostname.split(".");
	return labels.every((label) =>
		label.length > 0 &&
		label.length <= 63 &&
		/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label)
	);
}

export function isSafeBaseUrl(value: string): boolean {
	try {
		const url = new URL(value);
		if (url.username || url.password) return false;
		if (url.protocol !== "https:" && !(url.protocol === "http:" && isLocalHost(url.hostname))) return false;
		return isSafeHostname(url.hostname);
	} catch {
		return false;
	}
}

export function normalizeServerUrl(raw: string): string {
	let value = raw.trim();
	if (!value) throw new Error("url");
	if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) value = "https://" + value;
	let parsed: URL;
	try { parsed = new URL(value); }
	catch { throw new Error("url"); }
	if (parsed.username || parsed.password) throw new Error("url");
	if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error("url");
	if (parsed.protocol === "http:" && !isLocalHost(parsed.hostname)) throw new Error("https");
	if (!isSafeHostname(parsed.hostname)) throw new Error("url");
	return parsed.protocol + "//" + parsed.host;
}

export function siteBaseUrl(cname: string | null): string | null {
	if (!cname || !isSafeHostname(cname)) return null;
	return "https://" + cname;
}
