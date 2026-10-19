// Card tabs (client-side panel switching inside a card).
import { $ } from "../dom";

export function activateTab(tab: any) {
	const card = tab.closest(".panel-card") as HTMLElement | null;
	if (!card) return;
	const name = tab.dataset.tab;
	card.querySelectorAll(".tab").forEach((tb: any) => {
		const on = tb === tab;
		tb.classList.toggle("tab-active", on);
		tb.setAttribute("aria-selected", String(on));
	});
	card.querySelectorAll(".panel").forEach((p: any) => { p.hidden = p.dataset.panel !== name; });
}
export function activatePanelTab(cardId: any, tabName: any) {
	const card = document.getElementById(cardId);
	const tab = card && card.querySelector(`.tab[data-tab="${tabName}"]`);
	if (tab) activateTab(tab);
}
