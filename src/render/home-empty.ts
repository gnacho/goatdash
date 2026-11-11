// What the home grid shows when there are no cards: a search with no hits, a
// site list that could not be loaded, or an account without sites. Pure so the
// decision can be tested without a DOM.

export type HomeEmptyKey = "home.noResults" | "home.sitesError" | "home.noSites";

export interface HomeEmptyState {
	key: HomeEmptyKey;
	retry: boolean;
}

export function homeEmptyState(cards: number, query: boolean, sitesFailed: boolean): HomeEmptyState | null {
	if (cards > 0) return null;
	if (sitesFailed) return { key: "home.sitesError", retry: true };
	if (query) return { key: "home.noResults", retry: false };
	return { key: "home.noSites", retry: true };
}
