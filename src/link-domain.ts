// Site link domain: what the user types, normalized to what GoatCounter stores.
//
// GoatCounter trims the scheme and trailing slashes itself, but normalizing
// here keeps the form stable after a reload and avoids storing two spellings of
// the same domain.

export function normalizeLinkDomain(value: any): string {
	return String(value || "")
		.trim()
		.replace(/^https?:\/\//i, "")
		.replace(/\/+$/, "")
		.trim();
}
