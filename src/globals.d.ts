// Globals injected by other scripts bundled with the app.
interface Window {
	GOATDASH_DEMO?: any;
	WORLD_MAP_NAMES?: Record<string, string>;
	WORLD_MAP_PATHS?: Record<string, string>;
	WORLD_MAP_VIEWBOX?: string;
	GoatdashUpdate?: {
		check(opts?: { force?: boolean; onResult?: (r: any) => void }): Promise<void>;
		showMessage(text: string, autoHide?: boolean): void;
		apply(): Promise<any>;
		setToken(v: string): void;
	};
}
declare const GOATDASH_DEMO: any;
