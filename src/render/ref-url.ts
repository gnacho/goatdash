// Referrer rows: rebuild the source page URL from the stored referrer.
//
// GoatCounter stores the Referer header without the scheme and keeps host plus
// path (see cleanRefURL upstream), so "https://" plus the name is the original
// page in almost every case. Only ref_scheme "h" keeps a URL:
//
//   h  HTTP Referer header
//   g  generated group ("Google", "Email", "www.reddit.com" for reddit)
//   c  campaign, the utm_source value
//   o  direct or other
//
// The name comes from collected traffic, so it is validated before it becomes
// an href: nothing with spaces, quotes, angle brackets or a bare
// "javascript:" shape can pass.

const REF_NAME = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+(?::\d{1,5})?(?:[/?#][^\s"'<>\\^`{|}]*)?$/i;

export function referrerURL(item: any): string | null {
	if (!item || item.ref_scheme !== "h") return null;
	const name = String(item.name || "").trim();
	if (!name || name.length > 2048) return null;
	if (!REF_NAME.test(name)) return null;
	return "https://" + name;
}
