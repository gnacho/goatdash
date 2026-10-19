// Tiny DOM helpers shared by every view.

export const $ = (sel: string): HTMLElement => document.querySelector(sel) as HTMLElement;
