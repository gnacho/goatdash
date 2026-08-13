/* Goatdash — datos de demo mode.
   Forma idéntica a la API real de GoatCounter (/api/v0/stats/*). */

window.GOATDASH_DEMO = (() => {
	const DEMO_PATHS = [
		{ path: "/", title: "Home", weight: 22 },
		{ path: "/docs", title: "Documentation", weight: 14 },
		{ path: "/blog/self-hosting-analytics", title: "Self-hosting analytics without spying", weight: 11 },
		{ path: "/blog/why-we-left-google-analytics", title: "Why we left Google Analytics", weight: 9 },
		{ path: "/pricing", title: "Pricing", weight: 7 },
		{ path: "/changelog", title: "Changelog", weight: 5 },
		{ path: "/about", title: "About", weight: 4 },
		{ path: "/privacy", title: "Privacy policy", weight: 4 },
		{ path: "/blog/privacy-first-by-design", title: "Privacy-first by design", weight: 4 },
		{ path: "/contact", title: "Contact", weight: 3 },
		{ path: "/install", title: "Install", weight: 3 },
		{ path: "/faq", title: "FAQ", weight: 3 },
		{ path: "/blog/simple-web-analytics", title: "Simple web analytics", weight: 3 },
		{ path: "/oss", title: "Open source", weight: 3 },
		{ path: "/jobs", title: "Jobs", weight: 2 },
		{ path: "download", title: "Download clicked", weight: 2, event: true },
		{ path: "signup", title: "Signup", weight: 2, event: true },
	];

	const DEMO_REFS = {
		"/": [ { name: "news.ycombinator.com", count: 231 }, { name: "twitter.com", count: 87 }, { name: "(direct)", count: 64 }, { name: "reddit.com", count: 41 }, { name: "lobste.rs", count: 18 } ],
		"/docs": [ { name: "google.com", count: 66 }, { name: "(direct)", count: 31 }, { name: "github.com", count: 12 } ],
		"/blog/self-hosting-analytics": [ { name: "news.ycombinator.com", count: 142 }, { name: "twitter.com", count: 39 }, { name: "reddit.com", count: 24 } ],
		"/pricing": [ { name: "(direct)", count: 29 }, { name: "google.com", count: 21 }, { name: "blog/self-hosting-analytics", count: 15 } ],
		"/blog/why-we-left-google-analytics": [ { name: "news.ycombinator.com", count: 96 }, { name: "reddit.com", count: 22 }, { name: "lobste.rs", count: 14 } ],
		"/about": [ { name: "(direct)", count: 17 }, { name: "github.com", count: 8 } ],
		"/install": [ { name: "google.com", count: 23 }, { name: "(direct)", count: 11 } ],
	};

	const DEMO_BROWSER_DETAILS = {
		"Chrome": [ { name: "Chrome 126", count: 412 }, { name: "Chrome 125", count: 288 }, { name: "Chrome 124", count: 154 } ],
		"Firefox": [ { name: "Firefox 127", count: 91 }, { name: "Firefox 126", count: 64 }, { name: "Firefox 125", count: 38 } ],
		"Safari": [ { name: "Safari 17.5", count: 96 }, { name: "Safari 17.4", count: 71 }, { name: "Safari 17.3", count: 23 } ],
		"Edge": [ { name: "Edge 126", count: 52 }, { name: "Edge 125", count: 31 } ],
		"Other": [ { name: "Samsung Internet", count: 14 }, { name: "Opera", count: 9 } ],
	};

	const DEMO_SYSTEM_DETAILS = {
		"Windows": [ { name: "Windows 11", count: 388 }, { name: "Windows 10", count: 221 }, { name: "Windows 7", count: 12 } ],
		"macOS": [ { name: "macOS 14", count: 214 }, { name: "macOS 13", count: 87 }, { name: "macOS 12", count: 33 } ],
		"Linux": [ { name: "Ubuntu", count: 121 }, { name: "Debian", count: 42 }, { name: "Arch", count: 39 }, { name: "Fedora", count: 18 } ],
		"Android": [ { name: "Android 14", count: 84 }, { name: "Android 13", count: 41 } ],
		"iOS": [ { name: "iOS 17", count: 68 }, { name: "iOS 16", count: 22 } ],
		"Other": [ { name: "FreeBSD", count: 6 }, { name: "ChromeOS", count: 4 } ],
	};

	const DEMO_SIZE_DETAILS = {
		"desktop": [ { name: "↔ 1920px", count: 244 }, { name: "↔ 1536px", count: 129 }, { name: "↔ 1440px", count: 87 } ],
		"tablet": [ { name: "↔ 1024px", count: 46 }, { name: "↔ 834px", count: 28 } ],
		"phone": [ { name: "↔ 390px", count: 118 }, { name: "↔ 393px", count: 97 }, { name: "↔ 412px", count: 64 } ],
		"desktophd": [ { name: "↔ 2560px", count: 41 }, { name: "↔ 3440px", count: 22 } ],
		"unknown": [ { name: "(unknown)", count: 7 } ],
	};

	const DEMO_LOCATION_DETAILS = {
		"United States": [ { name: "California", count: 142 }, { name: "New York", count: 96 }, { name: "Texas", count: 71 } ],
		"Spain": [ { name: "Madrid", count: 44 }, { name: "Catalonia", count: 36 }, { name: "Andalusia", count: 21 } ],
		"Germany": [ { name: "Berlin", count: 38 }, { name: "Bavaria", count: 26 } ],
		"United Kingdom": [ { name: "England", count: 47 }, { name: "Scotland", count: 11 } ],
		"France": [ { name: "Île-de-France", count: 33 }, { name: "Provence-Alpes-Côte d'Azur", count: 14 } ],
	};

	const DEMO_CAMPAIGN_DETAILS = {
		"launch": [ { name: "https://news.ycombinator.com/item?id=123456", count: 212 }, { name: "https://twitter.com/x/status/123", count: 48 } ],
		"summer": [ { name: "https://newsletter.example.com/summer-2026", count: 87 }, { name: "https://twitter.com/x/status/456", count: 22 } ],
		"docs": [ { name: "https://twitter.com/x/status/789", count: 34 } ],
	};

	const DEMO_TOPREFS = [
		{ name: "news.ycombinator.com", count: 231, ref_scheme: "h" },
		{ name: "twitter.com", count: 87, ref_scheme: "h" },
		{ name: "github.com", count: 54, ref_scheme: "h" },
		{ name: "lobste.rs", count: 41, ref_scheme: "h" },
		{ name: "reddit.com", count: 38, ref_scheme: "h" },
		{ name: "Google", count: 312, ref_scheme: "g" },
		{ name: "launch", count: 96, ref_scheme: "c" },
		{ name: "summer", count: 44, ref_scheme: "c" },
		{ name: "", count: 210, ref_scheme: "o" },
	];

	const DEMO_REF_DETAILS = {
		"news.ycombinator.com": [ { name: "/", count: 142 }, { name: "/blog/self-hosting-analytics", count: 89 } ],
		"twitter.com": [ { name: "/", count: 60 }, { name: "/pricing", count: 27 } ],
		"github.com": [ { name: "/docs", count: 41 }, { name: "/install", count: 13 } ],
		"lobste.rs": [ { name: "/blog/why-we-left-google-analytics", count: 29 }, { name: "/", count: 12 } ],
		"reddit.com": [ { name: "/", count: 22 }, { name: "/about", count: 16 } ],
		"Google": [ { name: "/docs", count: 201 }, { name: "/install", count: 111 } ],
		"launch": [ { name: "/", count: 96 } ],
		"summer": [ { name: "/pricing", count: 44 } ],
	};

	const WEIGHTS = {
		browsers: [ { name: "Chrome", weight: 58 }, { name: "Safari", weight: 18 }, { name: "Firefox", weight: 13 }, { name: "Edge", weight: 7 }, { name: "Other", weight: 4 } ],
		systems: [ { name: "Windows", weight: 36 }, { name: "macOS", weight: 26 }, { name: "Linux", weight: 18 }, { name: "Android", weight: 11 }, { name: "iOS", weight: 8 }, { name: "Other", weight: 1 } ],
		sizes: [ { name: "desktop", weight: 44 }, { name: "phone", weight: 36 }, { name: "tablet", weight: 9 }, { name: "desktophd", weight: 9 }, { name: "unknown", weight: 2 } ],
		languages: [ { name: "en", weight: 51 }, { name: "es", weight: 17 }, { name: "de", weight: 9 }, { name: "fr", weight: 8 }, { name: "pt", weight: 6 }, { name: "nl", weight: 4 }, { name: "it", weight: 5 } ],
		campaigns: [ { name: "launch", weight: 62 }, { name: "summer", weight: 26 }, { name: "docs", weight: 12 } ],
	};

	const DEMO_COUNTRIES = [
		{ name: "United States", weight: 31 },
		{ name: "Spain", weight: 12 },
		{ name: "Germany", weight: 11 },
		{ name: "United Kingdom", weight: 9 },
		{ name: "France", weight: 8 },
		{ name: "Netherlands", weight: 5 },
		{ name: "Canada", weight: 4 },
		{ name: "Brazil", weight: 4 },
		{ name: "India", weight: 3 },
		{ name: "Poland", weight: 3 },
		{ name: "Japan", weight: 2 },
		{ name: "Australia", weight: 2 },
		{ name: "Sweden", weight: 2 },
		{ name: "Italy", weight: 2 },
		{ name: "Mexico", weight: 1 },
		{ name: "Switzerland", weight: 1 },
		{ name: "Portugal", weight: 1 },
		{ name: "Belgium", weight: 1 },
		{ name: "Austria", weight: 1 },
		{ name: "Denmark", weight: 1 },
		{ name: "Norway", weight: 1 },
		{ name: "Ireland", weight: 1 },
		{ name: "Czechia", weight: 1 },
		{ name: "Argentina", weight: 1 },
		{ name: "Chile", weight: 1 },
		{ name: "Colombia", weight: 1 },
		{ name: "Peru", weight: 1 },
		{ name: "Romania", weight: 1 },
		{ name: "Ukraine", weight: 1 },
		{ name: "Greece", weight: 1 },
		{ name: "Finland", weight: 1 },
		{ name: "New Zealand", weight: 1 },
		{ name: "South Africa", weight: 1 },
		{ name: "Turkey", weight: 1 },
		{ name: "United Arab Emirates", weight: 1 },
		{ name: "Singapore", weight: 1 },
		{ name: "Thailand", weight: 1 },
		{ name: "South Korea", weight: 1 },
		{ name: "Taiwan", weight: 1 },
		{ name: "Russia", weight: 1 },
	];

	const DEMO_RANGE_TOTALS = {
		today: { visitors: 487, prev: 412, days: 1, group: "hour" },
		"7d": { visitors: 3842, prev: 3156, days: 7, group: "day" },
		"30d": { visitors: 14873, prev: 11249, days: 30, group: "day" },
		"90d": { visitors: 41247, prev: 28934, days: 90, group: "week" },
	};

	// Helpers ------------------------------------------------------------------

	function distributeByWeight(items, total) {
		const sum = items.reduce((a, i) => a + i.weight, 0);
		let acc = 0;
		return items.map((it, idx) => {
			let v;
			if (idx === items.length - 1) {
				v = total - acc;
			} else {
				v = Math.round((it.weight / sum) * total);
				acc += v;
			}
			return { ...it, count: Math.max(v, 0) };
		});
	}

	function demoDailyShape(numDays) {
		const out = [];
		const today = new Date();
		for (let i = numDays - 1; i >= 0; i--) {
			const d = new Date(today);
			d.setDate(d.getDate() - i);
			const dow = d.getDay();
			const weekend = dow === 0 || dow === 6 ? 0.55 : 1;
			const trend = 1 + ((numDays - i) / numDays) * 0.3;
			const noise = 0.85 + Math.random() * 0.3;
			out.push({ day: d.toISOString().slice(0, 10), daily: Math.round(80 * weekend * trend * noise) });
		}
		return out;
	}

	function demoHourlyShape() {
		const base = [2,1,1,1,1,1,2,4,7,9,11,13,14,13,12,12,11,9,8,7,6,5,4,3];
		return base.map((b, h) => ({ hour: h, hourly: Math.round(b * 30 * (0.8 + Math.random() * 0.4)) }));
	}

	function demoWeeklyShape(numWeeks) {
		const out = [];
		const today = new Date();
		for (let i = numWeeks - 1; i >= 0; i--) {
			const d = new Date(today);
			d.setDate(d.getDate() - 7 * i);
			d.setDate(d.getDate() - d.getDay()); // snap to Sunday
			const trend = 0.7 + ((numWeeks - i) / numWeeks) * 0.6;
			out.push({ day: d.toISOString().slice(0, 10), daily: Math.round(2100 * trend * (0.9 + Math.random() * 0.2)) });
		}
		return out;
	}

	function buildDemoData(preset) {
		const meta = DEMO_RANGE_TOTALS[preset] || DEMO_RANGE_TOTALS["30d"];
		const visitors = meta.visitors;
		const pageviews = Math.round(visitors * 1.25);

		let timeSeries;
		if (meta.group === "hour") {
			timeSeries = demoHourlyShape();
		} else if (meta.group === "week") {
			timeSeries = demoWeeklyShape(meta.days / 7);
		} else {
			timeSeries = demoDailyShape(meta.days);
		}

		const hits = distributeByWeight(DEMO_PATHS, pageviews).map((p, i) => ({
			path: p.path,
			title: p.title,
			path_id: 1001 + i,
			count: p.count,
			event: !!p.event,
			stats: timeSeries.map((s) => ({
				day: s.day,
				...(s.hourly ? { hourly: s.hourly } : { daily: s.daily }),
			})),
		}));
		const totalEvents = hits.filter((h) => h.event).reduce((a, h) => a + h.count, 0);

		const mkStats = (weights, total) => distributeByWeight(weights, total).map((w) => ({
			name: w.name, count: w.count,
		}));

		return {
			data: {
				total: { total: visitors, total_utc: visitors, total_events: totalEvents },
				hits: { hits, total: pageviews, more: false },
				browsers: { stats: mkStats(WEIGHTS.browsers, visitors) },
				systems: { stats: mkStats(WEIGHTS.systems, visitors) },
				sizes: { stats: mkStats(WEIGHTS.sizes, visitors) },
				locations: { stats: mkStats(DEMO_COUNTRIES, visitors), total: visitors },
				languages: { stats: mkStats(WEIGHTS.languages, pageviews) },
				campaigns: { stats: mkStats(WEIGHTS.campaigns, Math.round(visitors * 0.15)) },
				toprefs: { stats: DEMO_TOPREFS, more: false },
			},
			prevTotal: meta.prev,
		};
	}

	return {
		build: buildDemoData,
		refs: DEMO_REFS,
		browserDetails: DEMO_BROWSER_DETAILS,
		systemDetails: DEMO_SYSTEM_DETAILS,
		sizeDetails: DEMO_SIZE_DETAILS,
		locationDetails: DEMO_LOCATION_DETAILS,
		campaignDetails: DEMO_CAMPAIGN_DETAILS,
		refDetails: DEMO_REF_DETAILS,
		customFallback: "30d",
	};
})();
