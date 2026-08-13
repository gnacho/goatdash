# goatdash

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.es.md">Español</a>
</p>

<p align="center">
  <a href="https://stats.cloudless.club"><img alt="Live demo" src="https://img.shields.io/badge/live%20demo-stats.cloudless.club-2b5884"></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/hero-en-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero-en-light.png">
    <img alt="goatdash dashboard showing the main analytics view: five KPI cards, a traffic chart and the referrers card" src="assets/hero-en-light.png" width="800">
  </picture>
</p>

goatdash is a privacy-friendly dashboard for [GoatCounter](https://www.goatcounter.com/) analytics. It runs entirely in the browser as plain JavaScript: no framework, no CDN, no build step, just a few static files that talk to the GoatCounter v0 API. It started as a rewrite of [abhishekhsingh/goatcounter-dashboard](https://github.com/abhishekhsingh/goatcounter-dashboard) (MIT) and grew into a multi-site dashboard for several landings served from one domain.

## Why does this exist?

I run a small set of self-hosted open source projects, each with its own landing page (cloudless.club and five apps: deltos, easyzfs, keynest, netpulse, helios). I wanted analytics to match that setup: self-hosted, light, no cloud account, in the same visual style as the landings. GoatCounter was the obvious backend, one small binary with SQLite and a v0 API that covers everything. The missing piece was the frontend.

Abhishekh Singh's goatcounter-dashboard had exactly the layout I wanted, but it loaded React, Recharts and Babel from a CDN. For a page that just reads a JSON API that felt heavy, so I rewrote it in vanilla JS with my own tokens, added ES/EN and a demo mode, and later the part that started all this: multi-site. GoatCounter's v0 API resolves the site from the Host header alone, which breaks behind a reverse proxy where every site arrives with the same Host. I patched GoatCounter to accept an `X-Goatcounter-Site` header and proposed it upstream in [PR #915](https://github.com/arp242/goatcounter/pull/915). goatdash is what I ended up with, and it has been tracking the whole hub since August 2026.

## Why this stack?

- **Vanilla JS, no framework, no CDN**: the original loaded React, Recharts and Babel from unpkg. For a page that reads one JSON API and draws a few charts, that is weight it does not need. Five static files, nothing to build, nothing to break when a CDN bumps a version.
- **No backend of my own**: goatdash speaks the GoatCounter API directly from the browser. There is no server to patch, no database to back up, no service to keep alive. Deployment is copying files.
- **GoatCounter as the backend**: a single lightweight binary with SQLite, privacy-first by design and trivial to self-host. The v0 API already exposes everything the dashboard shows: totals, pages, referrers, browsers, systems, sizes, locations, languages and campaigns.
- **One small patch for multi-site**: the v0 API only resolves the site from the Host header, so behind a reverse proxy every site shows up as the same one. The `X-Goatcounter-Site` header fixes that and is proposed upstream. Until it lands, multi-site needs a GoatCounter built from the patched branch.
- **What I did not pick**: a backend of my own (another thing to maintain), a SaaS analytics product (the data would live on someone else's server), or the original's React stack (overkill for this).

## Features

- **Multi-site dashboard**: sidebar with the account and its subsites from `/api/v0/sites`, switched with the `X-Goatcounter-Site` header. Works for one site too, no patch required.
- **Five KPI cards**: unique visitors (with trend vs the previous period), pageviews, top page, tracked paths and total events.
- **Top referrers by channel**: global referrers grouped into direct, search engines, campaigns and other sites, with a drill-down from each referrer to the pages it brought.
- **Drill-down on every card**: pages to their referrers, browsers/systems/devices to versions, countries to regions, campaigns to their referrer URLs.
- **Choropleth world map**: countries shaded by visits with a square-root scale so small markets stay visible, plus hover tooltips and a gradient legend.
- **Flexible ranges**: today, 7d, 30d, 90d or a custom start/end date.
- **Theme and language**: dark, light or auto (follows `prefers-color-scheme`), and ES/EN/Auto UI, persisted in localStorage.
- **Demo mode**: one click loads the full dashboard with realistic sample data, no API key needed.
- **Polite to the API**: 60-second response cache, a strictly sequential request queue with a 500 ms gap, per-card retry and a "updated Xs ago" freshness indicator.

## Screenshots

**Referrers: top referrers grouped by channel with a drill-down**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/screenshot-referrers-en-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/screenshot-referrers-en-light.png">
  <img alt="Referrers card with the Direct, Search engines, Campaigns and Other sites channels, each listing its top referrers" src="assets/screenshot-referrers-en-light.png" width="800">
</picture>

**Countries: world map and top country list**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/geo-en-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/geo-en-light.png">
  <img alt="Choropleth world map shaded by visit count next to a list of top countries" src="assets/geo-en-light.png" width="800">
</picture>

## What to expect?

This is a personal project that I use every day, not a product. It stays MIT, and I answer issues and PRs at my own pace, with no SLA. The multi-site header patch is proposed upstream and may take a while to land; until then, multi-site requires a GoatCounter built from the patched branch. With contributions or support it might grow faster, but I cannot promise anything.

## Installation

There is no install script and nothing to compile: goatdash is a handful of static files. Put them on any static host and open the page.

```sh
# Try it locally
python3 -m http.server 8000
# open http://localhost:8000
```

The live instance at [stats.cloudless.club](https://stats.cloudless.club) runs the same way: nginx serves the files and proxies the GoatCounter API through the same origin, so there is no CORS involved. A minimal server block:

```
server {
  listen 80;
  server_name stats.example.com;

  root /var/www/goatdash;
  index index.html;

  location /api/ {
    proxy_pass http://127.0.0.1:8080;   # your GoatCounter
    proxy_set_header Host $host;
  }
}
```

Requirements: any static web server and a GoatCounter instance with the v0 API reachable over HTTPS. No Docker, no Node, no build tools.

## Configuration

goatdash has no config file. On first load the connect screen asks for two things:

- the **GoatCounter URL** of your site (for example `https://stats.cloudless.club`),
- an **API key** created in GoatCounter under your user, Settings, API tab, with at least Count and Read statistics permissions.

Both are kept in the browser's localStorage and only travel to your GoatCounter instance over HTTPS. Theme, language, selected site and date range are persisted the same way.

### Multi-site and the X-Goatcounter-Site header

For several sites on one GoatCounter account, the dashboard needs the backend to tell the sites apart. The v0 API only resolves the site from the Host header, which is always the same behind a reverse proxy. goatdash sends an `X-Goatcounter-Site` header naming the site on every API request; GoatCounter must accept it for the multi-site mode to work.

That header is implemented in a [fork of GoatCounter](https://github.com/gnacho/goatcounter) and proposed upstream in [PR #915](https://github.com/arp242/goatcounter/pull/915). Until it is merged, build GoatCounter from the `feat/site-select` branch to use goatdash with multiple sites. Without the patch, goatdash still works perfectly for a single site, the one that matches the Host header.

## Usage

Open the page and click **Try Demo** to explore with sample data, or enter your GoatCounter URL and API key to connect. The sidebar lists the account and its subsites, the segmented control switches between today/7d/30d/90d/custom, and the gear menu holds refresh, theme, language and disconnect.

Click almost anything to drill down: a page shows its referrers, a referrer shows the pages it brought, a browser shows versions, a country shows regions, a campaign shows the referrer URLs. The refresh menu clears the cache and fetches everything again.

## Development

goatdash is plain HTML, CSS and JavaScript. No package.json, no bundler, no test harness in the repo; the demo data lives in `fixtures.js` and mirrors the real API response shape.

```sh
# Serve the repo and open http://localhost:8000
python3 -m http.server 8000
```

The world map data in `assets/world-map.js` is a generated asset kept from the original project; the generator lives upstream in the `scripts/` folder of abhishekhsingh/goatcounter-dashboard and only needs to run when the country dataset changes.

## Thanks

goatdash would not look the way it does without [Abhishekh Singh's goatcounter-dashboard](https://github.com/abhishekhsingh/goatcounter-dashboard) (MIT): the layout, the drill-down pattern and the demo mode idea all come from there. The world map asset (`assets/world-map.js`) is kept verbatim from that project. The rest is a clean vanilla rewrite, but the reference deserves the credit.

## License

MIT, see [LICENSE](LICENSE). The LICENSE retains the original copyright notice of Abhishekh Singh's goatcounter-dashboard, which goatdash builds on.

Built by gnacho as a personal self-hosted project; issues and PRs are welcome.
