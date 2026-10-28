type ChartRect = { left: number; top: number; right: number; bottom: number };
type TooltipSize = { width: number; height: number };
type Point = { x: number; y: number };

export function getChartTooltipPosition(chart: ChartRect, tooltip: TooltipSize, anchor: Point, scroll: Point) {
	const pad = 8;
	const gap = 12;
	const minLeft = chart.left + pad;
	const maxLeft = Math.max(minLeft, chart.right - tooltip.width - pad);
	const left = Math.min(Math.max(anchor.x - tooltip.width / 2, minLeft), maxLeft);
	const minTop = chart.top + pad;
	const maxTop = Math.max(minTop, chart.bottom - tooltip.height - pad);
	let top = anchor.y - tooltip.height - gap;
	if (top < minTop) top = anchor.y + gap;
	top = Math.min(Math.max(top, minTop), maxTop);
	return { left: left + scroll.x, top: top + scroll.y };
}
