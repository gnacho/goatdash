// Site settings object from the GoatCounter API.
//
// GoatCounter ships the field as "setttings" (three t's) in both
// /api/v0/sites and /api/v0/sites/{id} (see the Site struct tag upstream), so
// the site object arrives without the "settings" spelling. Accept both, or the
// settings dialog cannot read anything from a real server.

export function siteSettings(site: any): any {
	if (!site) return null;
	return site.settings || site.setttings || null;
}
