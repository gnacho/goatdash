// Shared types: state shapes, API payloads and DOM helpers.

export interface Kpi {
	label: string;
	value: string;
	num?: number;
	sub: string;
	string?: boolean;
	trend?: number | null;
	metric?: string;
	live?: boolean;
}

type I18nKey = string;

	export interface APIError extends Error {
	kind?: string;
	retryAfter?: number;
}

	export interface TopListOpts {
	rank?: boolean;
	formatName?: (i: any) => string;
	nameSub?: (i: any) => string | null;
	count?: (i: any) => number;
	total?: number;
	max?: number;
	showAll?: boolean;
	page?: string | null;
	demoDetails?: any;
	onRowClick?: ((item: any, row: HTMLElement) => void) | null;
	prefix?: (i: any) => string;
	badge?: (i: any) => string | null;
	isSelected?: (i: any) => boolean;
	rowTitle?: ((i: any) => string) | null;
}

export interface UpdateCheckResult {
	current?: string;
	latest?: string;
	available?: boolean;
	tag?: string;
	error?: unknown;
}
