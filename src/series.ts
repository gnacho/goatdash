// Aggregate /api/v0 stats into daily, weekly, monthly series.
import { $ } from "./dom";
import { pickGroup } from "./datetime";
import { chartMetric, currentPreset, lastChartDays } from "./state";

export function buildTrafficSeries(hitsData: any, group: any) {
	const map = new Map<string, number>();
	const all = hitsData.hits || [];
	all.forEach((h: any) => {
		(h.stats || []).forEach((s: any) => {
			let key;
			if (group === "hour") {
				if (!s.hourly) return;
				s.hourly.forEach((v: any, hour: any) => {
					if (v <= 0) return;
					const k = `${s.day}T${String(hour).padStart(2, "0")}:00:00Z`;
					map.set(k, (map.get(k) || 0) + v);
				});
				return;
			}
			if (group === "week") {
				const d = new Date(s.day + "T00:00:00Z");
				d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
				key = d.toISOString().slice(0, 10) + "T00:00:00Z";
				map.set(key, (map.get(key) || 0) + (s.daily || 0));
				return;
			}
			if (group === "month") {
				key = s.day.slice(0, 7) + "-01T00:00:00Z";
				map.set(key, (map.get(key) || 0) + (s.daily || 0));
				return;
			}
			key = s.day + "T00:00:00Z";
			map.set(key, (map.get(key) || 0) + (s.daily || 0));
		});
	});
		return [...map.entries()]
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([ts, count]) => ({ ts, count }));
}
export function buildTotalSeries(totalData: any, group: any) {
	const map = new Map<string, number>();
	((totalData && totalData.stats) || []).forEach((s: any) => {
		let key;
		if (group === "hour") {
			if (!Array.isArray(s.hourly)) return;
			s.hourly.forEach((v: any, hour: any) => {
				if (v <= 0) return;
				const k = `${s.day}T${String(hour).padStart(2, "0")}:00:00Z`;
				map.set(k, (map.get(k) || 0) + v);
			});
			return;
		}
		if (group === "week") {
			const d = new Date(s.day + "T00:00:00Z");
			d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // semana empieza en lunes
			key = d.toISOString().slice(0, 10) + "T00:00:00Z";
		} else if (group === "month") {
			key = s.day.slice(0, 7) + "-01T00:00:00Z";
		} else {
			key = s.day + "T00:00:00Z";
		}
		map.set(key, (map.get(key) || 0) + (s.daily || 0));
	});
	return [...map.entries()]
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([ts, count]) => ({ ts, count }));
}
export function metricSeries(data: any, group: any) {
	if (chartMetric === "pageviews") return buildTrafficSeries(data.hits, group);
	const s = buildTotalSeries(data.total, group);
	return s.length ? s : buildTrafficSeries(data.hits, group);
}
export function effectiveGroup() {
	// Realtime = siempre por hora (hoy + auto-refresco).
	if (currentPreset === "realtime") return "hour";
	return pickGroup(lastChartDays);
}
