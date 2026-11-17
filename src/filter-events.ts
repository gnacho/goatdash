// Event-only filter: path names GoatCounter marked as events.
//
// Accepts both shapes that carry the flag: /api/v0/paths rows ({path, event})
// and /api/v0/stats/hits rows ({path, event}).

export function eventPathNames(paths: any): string[] {
	const seen = new Set<string>();
	const out: string[] = [];
	(paths || []).forEach((p: any) => {
		const name = String((p && (p.path || p.name)) || "").trim();
		if (!p || !p.event || !name || seen.has(name)) return;
		seen.add(name);
		out.push(name);
	});
	return out;
}
