// Donut/legend rendering.
import { currentLang } from "../lang";
import { $ } from "../dom";
import { t } from "../i18n/index";
import { fmtNum } from "../util";
import { iconEl } from "../icons";
import { donutState, lastDatasets, softTick } from "../state";
import { clearTooltips, emptyEl, showTooltip } from "./cards";

export function renderDonut(container: any, items: any, { total, page, onDrill, iconFor = null, collapse = true }: {
	total?: number;
	page?: string;
	onDrill?: ((item: any, idx: number) => void) | null;
	iconFor?: ((item: any) => string | null) | null;
	collapse?: boolean;
}) {
		const donutKey = currentLang() + "|" + String(total || 0) + "|" + (items || []).map((i: any) => i.name + "=" + i.count).join(",");
		if (softTick && container._softKey === donutKey) return;
		container._softKey = donutKey;
		container.innerHTML = "";
		const totalCount = total || (items || []).reduce((a: any, i: any) => a + (i.count || 0), 0);
		if (!items || !items.length || totalCount <= 0) { container.appendChild(emptyEl(t("no.data"))); return; }
		if (page === "browsers" || page === "systems" || page === "sizes") lastDatasets[page] = { items, total: totalCount };
		donutState.set(container, { items, opts: { total, page, onDrill, iconFor, collapse } });
		const palette = [
			["#7eb2e0", "#2b5884"], ["#3fb950", "#1a7f37"], ["#e3b341", "#9e7b1c"],
			["#d29922", "#9a6b11"], ["#a371f7", "#6e3fc2"], ["#f778ba", "#c4348a"],
			["#56d4dd", "#1c7f86"], ["#ffa657", "#b05a1e"],
		];
		let display = items;
		if (collapse && items.length > 6) {
			const top = items.slice(0, 5);
			const rest = items.slice(5).reduce((a: any, i: any) => a + i.count, 0);
			display = [...top, { name: "Other", id: "__other__", count: rest }];
		} else {
			display = items.map((i: any) => ({ ...i }));
		}

		const wrap = document.createElement("div");
		wrap.className = "donut-wrap";
		const chartWrap = document.createElement("div");
		chartWrap.style.cssText = "position:relative;width:200px;height:200px";
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg") as any;
		svg.setAttribute("viewBox", "0 0 200 200");
		const rOuter = 80, rInner = 55, cx = 100, cy = 100;
		const C = 2 * Math.PI * rOuter;
		let acc = 0;
		let activeIndex = -1;

		display.forEach((item: any, idx: any) => {
			const frac = item.count / Math.max(totalCount, 1);
			const len = frac * C;
			const offset = acc * C;
			const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle") as any;
			circle.setAttribute("cx", cx); circle.setAttribute("cy", cy);
			circle.setAttribute("r", rOuter);
			circle.setAttribute("fill", "none");
			circle.setAttribute("stroke", palette[idx % palette.length][0]);
			circle.setAttribute("stroke-width", rOuter - rInner);
			circle.setAttribute("stroke-dasharray", `${len} ${C - len}`);
			circle.setAttribute("stroke-dashoffset", (-offset).toString());
			circle.setAttribute("transform", "rotate(-90 100 100)");
			circle.setAttribute("data-idx", idx);
			circle.style.transition = "stroke-width 0.2s var(--ease), opacity 0.15s var(--ease)";
			if (item.apiId === "__other__" || !onDrill) circle.style.cursor = "default";
			else circle.style.cursor = "pointer";
			circle.addEventListener("click", () => {
				if (item.apiId === "__other__" || !onDrill) return;
				onDrill(item, idx);
			});
			circle.addEventListener("mouseenter", () => {
				const pct = totalCount ? ((item.count / totalCount) * 100).toFixed(1) + "%" : "";
				showTooltip(chartWrap, `<span class="tt-num">${fmtNum(item.count)}</span> (${pct})`);
			});
			circle.addEventListener("mouseleave", clearTooltips);
			svg.appendChild(circle);
			acc += frac;
		});
		chartWrap.appendChild(svg);

		const center = document.createElement("div");
		center.className = "donut-center";
		center.style.cssText = "position:absolute;inset:0;display:grid;place-content:center;text-align:center";
		center.innerHTML = `<span>${fmtNum(totalCount)}</span><small>${t("kpi.pageviews")}</small>`;
		chartWrap.appendChild(center);
		wrap.appendChild(chartWrap);

		const legend = document.createElement("div");
		legend.className = "donut-legend";
		display.forEach((item: any, idx: any) => {
			const row = document.createElement("div");
			row.className = "legend-row";
			row.setAttribute("role", (onDrill && item.apiId !== "__other__" ? "button" : undefined) as unknown as string);
			row.setAttribute("tabindex", (onDrill && item.apiId !== "__other__" ? 0 : undefined) as unknown as string);
			const sw = document.createElement("span"); sw.className = "legend-swatch";
			sw.style.background = palette[idx % palette.length][0];
			row.appendChild(sw);
			if (iconFor) { const ic = iconFor(item); if (ic) row.appendChild(iconEl(ic, 15)); }
			const name = document.createElement("span"); name.className = "legend-name"; name.textContent = item.name;
			const num = document.createElement("span"); num.className = "legend-num"; num.textContent = fmtNum(item.count);
			const pct = document.createElement("span"); pct.className = "legend-pct";
			pct.textContent = totalCount ? ((item.count / totalCount) * 100).toFixed(1) + "%" : "";
			row.append(name, num, pct);
			if (onDrill && item.apiId !== "__other__") {
				row.addEventListener("click", () => onDrill(item, idx));
				row.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onDrill(item, idx); } });
			}
			legend.appendChild(row);
		});
		wrap.appendChild(legend);
		container.appendChild(wrap);
	}
