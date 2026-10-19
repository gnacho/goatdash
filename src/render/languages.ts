// Languages donut.
import { $ } from "../dom";
import { t } from "../i18n/index";
import { langFlag, languageName } from "../geo";
import { lang, lastDatasets } from "../state";
import { renderTopList } from "./lists";

export function renderLanguages(stats: any) {
	renderLanguagesInto($("#languages-body"), stats);
}
export function renderLanguagesInto(body: any, stats: any, { full = false }: { full?: boolean } = {}) {
	const items = (stats || []).map((s: any) => ({ name: s.name, count: s.count }));
	lastDatasets.languages = { items, total: items.reduce((a: any, i: any) => a + i.count, 0) };
	renderTopList(body, items, {
		total: items.reduce((a: any, i: any) => a + i.count, 0),
		rank: true,
		page: null,
		max: full ? 0 : 8,
		formatName: (i) => languageName(i.name),
		prefix: (i: any) => langFlag(i.name),
		rowTitle: () => t("lang.hint"),
	});
}
