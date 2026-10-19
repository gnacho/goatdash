// Translator bound to the active language.
import { currentLang } from "../lang";
import { $ } from "../dom";
import { I18N } from "./strings";

export type I18nKey = string;

export const t = (key: I18nKey, vars?: Record<string, string | number>) => {
	let s = (I18N as Record<string, Record<string, string>>)[currentLang()]?.[key] ?? (I18N.es as Record<string, string>)[key];
	if (s === undefined) s = key;
	if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
	return s;
};
