// Shared types for Goatdash. Pure type declarations: esbuild erases them at
// build time, so the runtime output is identical to the historical JS.

export interface UpdateCheckResult {
	current?: string;
	latest?: string;
	available?: boolean;
	tag?: string;
	error?: unknown;
}

export interface GoatdashUpdateApi {
	check(opts?: {
		force?: boolean;
		onResult?: (result: UpdateCheckResult) => void;
	}): Promise<void>;
	showMessage(text: string, autoHide?: boolean): void;
	apply(): Promise<{ ok: boolean; version?: string; error?: unknown }>;
	setToken(v: string): void;
}

declare global {
	interface Window {
		GoatdashUpdate?: GoatdashUpdateApi;
		// any: the demo fixture object shape is defined in fixtures.ts and only
		// consumed dynamically by app.ts; keeping it loosely typed here.
		GOATDASH_DEMO?: any;
		// Globals injected by assets/world-map.js before app.js runs.
		WORLD_MAP_NAMES?: Record<string, string>;
		WORLD_MAP_PATHS?: Record<string, string>;
		WORLD_MAP_VIEWBOX?: string;
	}
}

export {};
