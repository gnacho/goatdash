// Campaigns panel.
import { demoMode, lastDatasets } from "../state";
import { renderTopList, toggleDetail } from "./lists";

export function renderCampaignsInto(body: any, stats: any, total: any) {
	lastDatasets.campaigns = { items: stats || [], total };
	renderTopList(body, stats, {
		total,
		page: "campaigns",
		onRowClick: (item: any, row: any) => {
			const demo = demoMode ? (GOATDASH_DEMO.campaignDetails[item.name] || []) : null;
			toggleDetail(row, "campaigns", item.id || item.name, item.name, { demo, kind: "stats" });
		},
	});
}
