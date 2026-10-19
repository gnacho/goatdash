// Donut drill-down: click a slice to list its items.
import { handleAuthError } from "./bridge/session";
import { $ } from "./dom";
import { t } from "./i18n/index";
import { fmtNum } from "./util";
import { detailIconFor, iconEl } from "./icons";
import { getDateRange } from "./datetime";
import { client, currentPreset, customEnd, customStart, demoMode, donutState } from "./state";
import { emptyEl, errCard } from "./render/cards";
import { renderDonut } from "./render/donut";
import { endpointFor } from "./endpoints";

export function renderDonutErr(key: any, reason: any) {
	if (reason.kind === "auth") return handleAuthError(reason.message);
	const container = $((({ browsers: "#browsers-body", systems: "#systems-body", sizes: "#sizes-body" }) as Record<string, string>)[key]);
	if (container) container.innerHTML = "", container.appendChild(errCard(key));
}

function donutContainer(page: any) {
	return $((({ browsers: "#browsers-body", systems: "#systems-body", sizes: "#sizes-body" }) as Record<string, string>)[page]);
}
export function drillDetail(page: any, item: any, idx: any, container?: any) {
	container = container || donutContainer(page);
	if (!container) return;
	const apiId = item.apiId || item.id || item.name;
	const detailKey = page === "browsers" ? "browserDetails" : page === "systems" ? "systemDetails" : page === "sizes" ? "sizeDetails" : null;
	const demoDetails = demoMode && detailKey ? GOATDASH_DEMO[detailKey] : null;
	if (demoMode) {
		const rows = demoDetails ? demoDetails[item.apiId || item.name] : null;
		container.innerHTML = "";
		const d = document.createElement("div");
		d.className = "detail-panel detail-donut";
		const title = document.createElement("h4");
		title.textContent = t("detail.breakdown", { name: item.name });
		d.appendChild(title);
		if (rows && rows.length) {
			const max = Math.max(...rows.map((r: any) => r.count), 1);
			const dIcon = detailIconFor(page);
			rows.forEach((r: any) => {
				const ro = document.createElement("div");
				ro.className = "detail-row";
				if (dIcon) { const ic = dIcon(r.name); if (ic) ro.appendChild(iconEl(ic, 14, "dicon")); }
				const nm = document.createElement("span"); nm.className = "dname"; nm.textContent = r.name;
				const cnt = document.createElement("span"); cnt.className = "dcount"; cnt.textContent = fmtNum(r.count);
				ro.append(nm, cnt);
				d.appendChild(ro);
			});
		} else {
			d.appendChild(emptyEl(t("detail.noData")));
		}
		const back = document.createElement("button");
		back.type = "button";
		back.className = "detail-back";
		back.textContent = t("detail.back");
		back.addEventListener("click", () => closeDonutDetail(page, container));
		d.appendChild(back);
		container.appendChild(d);
		return;
	}
	toggleDetailForDonut(page, apiId, item.name, container);
}

async function toggleDetailForDonut(page: any, apiId: any, label: any, container: any) {
	container = container || donutContainer(page);
	if (!container) return;
	container.innerHTML = "";
	const panel = document.createElement("div");
	panel.className = "detail-panel detail-donut";
	const title = document.createElement("h4");
	title.textContent = t("detail.breakdown", { name: label });
	panel.appendChild(title);
	const back = document.createElement("button");
	back.type = "button";
	back.className = "detail-back";
	back.textContent = t("detail.back");
	back.addEventListener("click", () => closeDonutDetail(page, container));
	container.appendChild(panel);
	try {
		const range = getDateRange(currentPreset, customStart, customEnd);
		const url = endpointFor(page, range.start, range.end, "&limit=10");
		const path = `/api/v0/stats/${page}/${encodeURIComponent(apiId)}${url.slice(url.indexOf("?"))}`;
		const res = await client.request(path);
		const rows = res.stats || [];
		if (!rows.length) {
			panel.appendChild(emptyEl(t("detail.noData")));
			panel.appendChild(back);
			return;
		}
		const max = Math.max(...rows.map((r: any) => r.count), 1);
		const dIcon = detailIconFor(page);
		rows.slice(0, 8).forEach((r: any) => {
			const ro = document.createElement("div");
			ro.className = "detail-row";
			if (dIcon) { const ic = dIcon(r.name); if (ic) ro.appendChild(iconEl(ic, 14, "dicon")); }
			const nm = document.createElement("span"); nm.className = "dname"; nm.textContent = r.name || t("top.unknown");
			const cnt = document.createElement("span"); cnt.className = "dcount"; cnt.textContent = fmtNum(r.count);
			ro.append(nm, cnt);
			panel.appendChild(ro);
		});
		panel.appendChild(back);
	} catch (e: any) {
		if (e.kind === "auth") return handleAuthError(e.message);
		panel.appendChild(emptyEl(t("detail.noData")));
		panel.appendChild(back);
	}
}

function closeDonutDetail(page: any, container: any) {
	container = container || donutContainer(page);
	if (!container) return;
	const saved = donutState.get(container);
	if (!saved) return;
	renderDonut(container, saved.items, saved.opts);
}
