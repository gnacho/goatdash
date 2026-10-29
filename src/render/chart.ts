// Traffic chart: axes, hover overlay, hot reuse between refreshes.
import { chartAnimState, chartCompare, chartMetric, currentPreset, lastChartData, lastKPIArgs, lastPrevHitsData, lastPrevTotalData, setChartAnimState, setLastKPIArgs } from "../state";
import { ensurePrevHitsData } from "../params";
import { Kpi } from "../types";
import { $ } from "../dom";
import { safeStore } from "../settings";
import { t } from "../i18n/index";
import { animateNum, fmtNum, fmtPct, monotoneArea, monotoneLine, tween } from "../util";
import { formatTooltipDate, formatXTick, lastHourVisitors, presetLabel } from "../datetime";
import { buildTotalSeries, buildTrafficSeries, effectiveGroup, metricSeries } from "../series";
import { clearTooltips, emptyEl, showTooltip } from "./cards";
import type { TooltipPart } from "./cards";
import { getChartTooltipPosition } from "./chart-tooltip";

export function refreshTrafficChart() {
	if (!lastChartData) return;
	updateTrafficHead();
	renderTrafficChart(lastChartData, effectiveGroup());
}
export function updateTrafficHead() {
	const h = $("#traffic-title");
	if (h) h.textContent = t("card.traffic." + chartMetric);
	updateCompareUI();
}
export function setChartMetric(metric: any) {
	if (metric !== "visitors" && metric !== "pageviews") return;
	setChartMetric(metric);
	safeStore("gd.chartMetric", chartMetric);
	refreshTrafficChart();
	if (lastKPIArgs) renderKPIs(...lastKPIArgs);
}

export function renderKPIs(data: any, prevTotal: any, group: any) {
	setLastKPIArgs([data, prevTotal, group]);
	const grid = $("#grid-kpis") as HTMLElement;
	const totalNum = data.total.total ?? data.total.total_utc ?? 0;
	const series = buildTrafficSeries(data.hits, group);
	const pageviewSum = series.reduce((a, s) => a + s.count, 0);
	let trend: number | null = null;
	if (prevTotal !== null && prevTotal !== undefined) {
		if (prevTotal === 0 && totalNum > 0) trend = 100;
		else if (prevTotal > 0) trend = ((totalNum - prevTotal) / prevTotal) * 100;
	}
	let top = { name: "—", count: 0 };
	if (data.hits.hits && data.hits.hits.length) {
		const sorted = [...data.hits.hits].sort((a, b) => (b.count || 0) - (a.count || 0));
		top = { name: sorted[0].path || "/", count: sorted[0].count || 0 };
	}

	// Ratio vistas/visita con los totales ya cargados (guard div/0).
	const perVisit = totalNum > 0 ? (pageviewSum / totalNum).toFixed(1) : null;

	const kpis: Kpi[] = [
		{ label: t("kpi.visitors"), value: fmtNum(totalNum), num: totalNum, sub: `${trend !== null ? fmtPct(trend) + " " : ""}${t("kpi.vsPrev")} ${presetLabel(currentPreset)}`, trend, metric: "visitors" },
		{ label: t("kpi.pageviews"), value: fmtNum(pageviewSum), num: pageviewSum, sub: presetLabel(currentPreset) + (perVisit !== null ? ` · ${perVisit} ${t("kpi.perVisit")}` : ""), metric: "pageviews" },
		{ label: t("kpi.toppage"), value: top.name, string: true, sub: t("kpi.hits", { n: fmtNum(top.count) }) },
		{ label: t("kpi.paths"), value: fmtNum((data.hits.hits || []).length), num: (data.hits.hits || []).length, sub: t("kpi.distinct") },
		{ label: t("kpi.events"), value: fmtNum(data.total.total_events ?? 0), num: data.total.total_events ?? 0, sub: presetLabel(currentPreset) },
		{ label: t("kpi.lastHour"), value: lastHourVisitors(data.total), num: Number(lastHourVisitors(data.total)) || 0, sub: t("kpi.lastHourSub"), live: true },
	];

	// Refresco en caliente: si la estructura ya existe (mismos KPIs, mismas
	// etiquetas), NO se reconstruye nada. Solo se actualizan los valores con
	// cuenta animada y el texto del subtítulo; nombre, tarjeta y contenedor
	// quedan intactos (evita el parpadeo del auto-refresh).
	const kids = grid.children;
	if (kids.length === kpis.length && ([...kids] as HTMLElement[]).every((c, i) => c.dataset.label === kpis[i].label)) {
		kpis.forEach((k, i) => {
			const card = kids[i] as HTMLElement;
			const val = card.querySelector(".kpi-value") as HTMLElement;
			if (k.string) val.textContent = k.value;
			else animateNum(val, k.num);
			const sub = card.querySelector(".kpi-sub") as HTMLElement;
			sub.textContent = "";
			if (k.trend !== null && k.trend !== undefined && !k.string) {
				const span = document.createElement("span");
				span.className = k.trend >= 0 ? "trend-up" : "trend-down";
				span.textContent = fmtPct(k.trend);
				sub.appendChild(span);
				sub.append(" " + k.sub.replace(/^[+−][\d.]+%\s*/, ""));
			} else {
				sub.textContent = k.sub;
			}
			if (k.metric) card.classList.toggle("kpi-active", chartMetric === k.metric);
		});
		return;
	}

	grid.innerHTML = "";
	kpis.forEach((k) => {
		const el = document.createElement("div");
		el.className = "kpi";
		el.dataset.label = k.label;
		const label = document.createElement("div"); label.className = "kpi-label";
		if (k.live) {
			const dot = document.createElement("span");
			dot.className = "live-dot";
			dot.setAttribute("aria-hidden", "true");
			label.appendChild(dot);
		}
		label.append(k.label);
		const val = document.createElement("div");
		val.className = "kpi-value" + (k.string ? " string" : "");
		val.textContent = k.value;
		const sub = document.createElement("div"); sub.className = "kpi-sub";
		if (k.trend !== null && k.trend !== undefined && !k.string) {
			const span = document.createElement("span");
			span.className = k.trend >= 0 ? "trend-up" : "trend-down";
			span.textContent = fmtPct(k.trend);
			sub.appendChild(span);
			sub.append(" " + k.sub.replace(/^[+−][\d.]+%\s*/, ""));
		} else {
			sub.textContent = k.sub;
		}
		el.append(label, val, sub);
		if (k.metric) {
			// KPI → métrica del gráfico de tráfico (botón real, accesible).
			el.classList.add("kpi-clickable");
			el.setAttribute("role", "button");
			el.tabIndex = 0;
			const on = chartMetric === k.metric;
			el.classList.toggle("kpi-active", on);
			el.setAttribute("aria-pressed", String(on));
			const act = () => setChartMetric(k.metric);
			el.addEventListener("click", act);
			el.addEventListener("keydown", (e) => {
				if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); }
			});
		}
		grid.appendChild(el);
	});
}

function comparePrevSeries(group: any) {
	if (chartMetric === "pageviews") {
		if (lastPrevHitsData) return buildTrafficSeries(lastPrevHitsData, group);
		ensurePrevHitsData();
		return null;
	}
	return lastPrevTotalData ? buildTotalSeries(lastPrevTotalData, group) : null;
}

function compareAllowed() {
	return currentPreset !== "realtime";
}
export function updateCompareUI() {
	const btn = $("#compare-btn") as HTMLButtonElement | null;
	if (!btn) return;
	const allowed = compareAllowed();
	btn.disabled = !allowed;
	btn.classList.toggle("compare-active", allowed && chartCompare);
	btn.setAttribute("aria-pressed", String(allowed && chartCompare));
	btn.title = allowed ? "" : t("chart.compareNoRealtime");
}

function buildChartLegend() {
	const legend = document.createElement("div");
	legend.className = "chart-legend";
	const mk = (cls: any, key: any) => {
		const item = document.createElement("span");
		item.className = "chart-legend-item";
		const sw = document.createElement("span");
		sw.className = "chart-legend-swatch " + cls;
		item.append(sw, t(key));
		return item;
	};
	legend.append(mk("sw-current", "chart.current"), mk("sw-previous", "chart.previous"));
	return legend;
}

function renderTrafficChart(data: any, group: any) {
	const body = $("#traffic-body") as HTMLElement;
	const series = metricSeries(data, group);
	if (!series.length) {
		if (chartAnimState && chartAnimState.cancel) chartAnimState.cancel();
		setChartAnimState(null);
		body.innerHTML = "";
		body.appendChild(emptyEl(t("chart.empty")));
		return;
	}

	// Comparativa con el periodo anterior (línea discontinua). Las series
	// tienen el mismo span, así que se alinean por índice desde el final.
	const compareOn = chartCompare && compareAllowed();
	let prevSeries = compareOn ? comparePrevSeries(group) : null;
	if (prevSeries && !prevSeries.length) prevSeries = null;
	const prevOffset = prevSeries ? series.length - prevSeries.length : 0;
	const prevAt = (i: any) => {
		if (!prevSeries) return null;
		const j = i - prevOffset;
		return j >= 0 && j < prevSeries.length ? prevSeries[j] : null;
	};

	const max = Math.max(...series.map((s) => s.count), ...(prevSeries || []).map((s) => s.count), 1);
	const W = 900, H = 260, PAD = { top: 12, right: 10, bottom: 26, left: 46 };
	const iw = W - PAD.left - PAD.right, ih = H - PAD.top - PAD.bottom;
	const n = series.length;
	const x = (i: any) => PAD.left + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
	const y = (v: any) => PAD.top + ih - (v / max) * ih;

	const ns = "http://www.w3.org/2000/svg";

	// Reuso en caliente: con los mismos buckets y la misma comparativa NO
	// se reconstruye el SVG. Se interpolan los paths (tween) y se refrescan
	// las etiquetas de ejes; overlay y tooltip leen el estado mutable
	// chartAnimState.hover, que se actualiza aquí.
	const maxXTicks = 8;
	const kTicks = Math.min(maxXTicks, n);
	const spansYears = group === "month" && new Set(series.map((s) => s.ts.slice(0, 4))).size > 1;
	const xTickIdx = new Set<number>();
	if (kTicks === 1) xTickIdx.add(0);
	else for (let j = 0; j < kTicks; j++) xTickIdx.add(Math.round((j * (n - 1)) / (kTicks - 1)));

	// Serie del periodo anterior (línea discontinua), en coordenadas del
	// trazado actual. Se calcula antes del bloque de reutilización porque
	// condiciona si el SVG previo sirve tal cual o hay que reconstruirlo.
	const pts: [number, number][] = series.map((s, i) => [x(i), y(s.count)]);
	const prevPts: [number, number][] = [];
	if (prevSeries) {
		for (let i = 0; i < n; i++) {
			const pv = prevAt(i);
			if (pv) prevPts.push([x(i), y(pv.count)]);
		}
		if (prevPts.length <= 1) prevPts.length = 0;
	}

	// Reuso en caliente: con los mismos buckets y la misma comparativa NO
	// se reconstruye el SVG. Se interpolan los paths (tween) y se refrescan
	// las etiquetas de ejes; overlay y tooltip leen el estado mutable
	// chartAnimState.hover, que se actualiza aquí.
	const prevState = chartAnimState;
	if (prevState && prevState.n === n && prevState.body === body && prevState.svg.isConnected
		&& !!prevState.prevPts === !!prevSeries
		&& (!prevSeries || (prevState.prevPts && prevState.prevPts.length === prevPts.length))) {
		if (prevState.cancel) prevState.cancel();
		const from = prevState.pts;
		const draw = (e: any) => {
			const cur: [number, number][] = pts.map((p, i) => [p[0], from[i][1] + (p[1] - from[i][1]) * e]);
			prevState.line.setAttribute("d", monotoneLine(cur));
			prevState.area.setAttribute("d", monotoneArea(cur, PAD.top + ih));
		};
		prevState.cancel = tween(600, draw);
		for (let i = 0; i <= 4; i++) prevState.yTicks[i].textContent = fmtNum(Math.round(max - (max / 4) * i));
		const newXT = series.map((s, i) => xTickIdx.has(i) ? formatXTick(s.ts, group, { withYear: spansYears }) : null);
		prevState.xTicks.forEach((tx: any, j: any) => { if (newXT[j] !== null) tx.textContent = newXT[j]; });
		if (prevState.prevLine && prevPts.length) prevState.prevLine.setAttribute("d", monotoneLine(prevPts));
		prevState.hover.pts = pts;
		prevState.hover.series = series;
		prevState.hover.prevAt = prevAt;
		prevState.hover.group = group;
		body.querySelectorAll<HTMLElement>(".chart-legend").forEach((l) => l.remove());
		if (prevSeries) body.appendChild(buildChartLegend());
		prevState.pts = pts;
		if (prevSeries) prevState.prevPts = prevPts;
		return;
	}

	if (chartAnimState && chartAnimState.cancel) chartAnimState.cancel();
	body.innerHTML = "";
	const svg = document.createElementNS(ns, "svg") as any;
	svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
	svg.setAttribute("preserveAspectRatio", "none");
	svg.style.height = "260px";

	const defs = document.createElementNS(ns, "defs") as any;
	const grad = document.createElementNS(ns, "linearGradient") as any;
	grad.id = "trafficFill";
	grad.setAttribute("x1", "0"); grad.setAttribute("y1", "0");
	grad.setAttribute("x2", "0"); grad.setAttribute("y2", "1");
	const stop1 = document.createElementNS(ns, "stop") as any;
	stop1.setAttribute("offset", "0%");
	stop1.setAttribute("stop-color", "var(--chart-line)");
	stop1.setAttribute("stop-opacity", "0.3");
	const stop2 = document.createElementNS(ns, "stop") as any;
	stop2.setAttribute("offset", "100%");
	stop2.setAttribute("stop-color", "var(--chart-line)");
	stop2.setAttribute("stop-opacity", "0");
	grad.append(stop1, stop2);
	defs.appendChild(grad);
	svg.appendChild(defs);

	// grid
	const yTicks: Element[] = [];
	for (let i = 0; i <= 4; i++) {
		const gy = PAD.top + (ih / 4) * i;
		const line = document.createElementNS(ns, "line") as any;
		line.setAttribute("x1", PAD.left); line.setAttribute("y1", gy);
		line.setAttribute("x2", W - PAD.right); line.setAttribute("y2", gy);
		line.setAttribute("stroke", "var(--chart-grid)");
		line.setAttribute("stroke-dasharray", "3 4");
		svg.appendChild(line);
		const tv = Math.round(max - (max / 4) * i);
		const txt = document.createElementNS(ns, "text") as any;
		txt.setAttribute("x", PAD.left - 8); txt.setAttribute("y", gy + 4);
		txt.setAttribute("text-anchor", "end");
		txt.setAttribute("font-size", "11");
		txt.setAttribute("fill", "var(--text-muted)");
		txt.textContent = fmtNum(tv);
		yTicks.push(txt);
		svg.appendChild(txt);
	}

	const xTicks: any = [];
	[...xTickIdx].sort((a, b) => a - b).forEach((i) => {
		const isLast = i === n - 1 && n > 1;
		const txt = document.createElementNS(ns, "text") as any;
		txt.setAttribute("x", x(i));
		txt.setAttribute("y", H - 8);
		txt.setAttribute("text-anchor", isLast ? "end" : "middle");
		txt.setAttribute("font-size", "11");
		txt.setAttribute("fill", "var(--text-muted)");
		txt.setAttribute("class", "x-tick");
		txt.textContent = formatXTick(series[i].ts, group, { withYear: spansYears });
		xTicks.push(txt);
		svg.appendChild(txt);
	});

	// area
	const area = document.createElementNS(ns, "path") as any;
	area.setAttribute("d", monotoneArea(pts, PAD.top + ih));
	area.setAttribute("fill", "url(#trafficFill)");
	svg.appendChild(area);

	const line = document.createElementNS(ns, "path") as any;
	line.setAttribute("d", monotoneLine(pts));
	line.setAttribute("class", "traffic-line");
	svg.appendChild(line);

	// Serie del periodo anterior: línea discontinua tenue, alineada por el
	// final del periodo (mismos buckets: día/hora/semana/mes equivalentes).
	let prevLine: any = null;
	if (prevPts.length) {
		prevLine = document.createElementNS(ns, "path") as any;
		prevLine.setAttribute("d", monotoneLine(prevPts));
		prevLine.setAttribute("class", "traffic-line-prev");
		svg.appendChild(prevLine);
	}

	// overlay + tooltip. El handler lee `hover` (estado mutable): en un
	// refresco en caliente se actualizan sus campos y el tooltip muestra
	// los datos nuevos sin reconstruir el overlay.
	const hover = { pts, series, prevAt, group };
	const overlay = document.createElementNS(ns, "rect") as any;
	overlay.setAttribute("x", PAD.left); overlay.setAttribute("y", PAD.top);
	overlay.setAttribute("width", iw); overlay.setAttribute("height", ih);
	overlay.setAttribute("fill", "transparent");
	svg.appendChild(overlay);

	overlay.addEventListener("mousemove", (e: MouseEvent) => {
		const h = hover;
		const rect = svg.getBoundingClientRect();
		const mx = ((e.clientX - rect.left) / rect.width) * W;
		let best = 0, bestD = Infinity;
		h.pts.forEach((p, i) => {
			const d = Math.abs(p[0] - mx);
			if (d < bestD) { bestD = d; best = i; }
		});
		clearTooltips();
		const s = h.series[best];
		const point = h.pts[best];
		const dot = document.createElementNS(ns, "circle") as any;
		dot.setAttribute("cx", point[0]); dot.setAttribute("cy", point[1]);
		dot.setAttribute("r", "4");
		dot.setAttribute("fill", "var(--chart-line)");
		svg.appendChild(dot);
		setTimeout(() => dot.remove(), 50);
		const parts: TooltipPart[] = [
			{ text: formatTooltipDate(s.ts, h.group), className: "tt-date", tag: "div" },
			{ text: fmtNum(s.count), className: "tt-num" },
			` ${t(chartMetric === "pageviews" ? "kpi.pageviews" : "kpi.visitors")}`,
		];
		const pv = h.prevAt(best);
		if (pv) parts.push({ br: true }, { text: fmtNum(pv.count), className: "tt-num" }, ` ${t("chart.previous")}`);
		const tip = showTooltip(e.target, parts);
		tip.classList.add("chart-tooltip");
		tip.style.maxWidth = `${Math.max(0, rect.width - 16)}px`;
		const anchor = {
			x: rect.left + (point[0] / W) * rect.width,
			y: rect.top + (point[1] / H) * rect.height,
		};
		const position = getChartTooltipPosition(rect, tip.getBoundingClientRect(), anchor, { x: window.scrollX, y: window.scrollY });
		tip.style.left = position.left + "px";
		tip.style.top = position.top + "px";
	});
	overlay.addEventListener("mouseleave", clearTooltips);

	body.appendChild(svg);

	// Leyenda mínima actual vs anterior (solo con la comparativa activa).
	if (prevSeries) body.appendChild(buildChartLegend());

	setChartAnimState({
		svg, n, body, pts, line, area, prevLine,
		prevPts: prevPts.length ? prevPts : null,
		yTicks, xTicks, hover, cancel: null,
	});
}
