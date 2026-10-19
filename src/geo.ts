import { DEVICE_LABELS } from "./api";
// Country/region/language/device naming and flags.
import { currentLang } from "./lang";
import { $ } from "./dom";
import { t } from "./i18n/index";

const COUNTRY_NAME_TO_CODE = {
	"United States": "US", "Spain": "ES", "Germany": "DE", "United Kingdom": "GB",
	"France": "FR", "Netherlands": "NL", "Canada": "CA", "Brazil": "BR",
	"India": "IN", "Poland": "PL", "Japan": "JP", "Australia": "AU",
	"Sweden": "SE", "Italy": "IT", "Mexico": "MX", "Switzerland": "CH",
	"Portugal": "PT", "Belgium": "BE", "Austria": "AT", "Denmark": "DK",
	"Norway": "NO", "Ireland": "IE", "Czechia": "CZ", "Argentina": "AR",
	"Chile": "CL", "Colombia": "CO", "Peru": "PE", "Romania": "RO",
	"Ukraine": "UA", "Greece": "GR", "Finland": "FI", "New Zealand": "NZ",
	"South Africa": "ZA", "Turkey": "TR", "United Arab Emirates": "AE",
	"Singapore": "SG", "Thailand": "TH", "South Korea": "KR", "Taiwan": "TW",
	"Russia": "RU",
};
export function countryNameToCode(name: any) {
	const NAME_TO_CODE: Record<string, string> = COUNTRY_NAME_TO_CODE;
	if (NAME_TO_CODE[name]) return NAME_TO_CODE[name];
	if (window.WORLD_MAP_NAMES && window.WORLD_MAP_NAMES[name]) return window.WORLD_MAP_NAMES[name];
	return null;
}

const COUNTRY_FLAGS = {
	"United States": "🇺🇸", "Spain": "🇪🇸", "Germany": "🇩🇪", "United Kingdom": "🇬🇧",
	"France": "🇫🇷", "Netherlands": "🇳🇱", "Canada": "🇨🇦", "Brazil": "🇧🇷",
	"India": "🇮🇳", "Poland": "🇵🇱", "Japan": "🇯🇵", "Australia": "🇦🇺",
	"Sweden": "🇸🇪", "Italy": "🇮🇹", "Mexico": "🇲🇽", "Switzerland": "🇨🇭",
	"Portugal": "🇵🇹", "Belgium": "🇧🇪", "Austria": "🇦🇹", "Denmark": "🇩🇰",
	"Norway": "🇳🇴", "Ireland": "🇮🇪", "Czechia": "🇨🇿", "Argentina": "🇦🇷",
	"Chile": "🇨🇱", "Colombia": "🇨🇴", "Peru": "🇵🇪", "Romania": "🇷🇴",
	"Ukraine": "🇺🇦", "Greece": "🇬🇷", "Finland": "🇫🇮", "New Zealand": "🇳🇿",
	"South Africa": "🇿🇦", "Turkey": "🇹🇷", "United Arab Emirates": "🇦🇪",
	"Singapore": "🇸🇬", "Thailand": "🇹🇭", "South Korea": "🇰🇷", "Taiwan": "🇹🇼",
	"Russia": "🇷🇺",
};
export function flagFor(name: any) { return (COUNTRY_FLAGS as Record<string, string>)[name] || "🌐"; }
export function languageName(code: any) {
	const norm = String(code || "").replace("_", "-");
	try {
		const dn = new Intl.DisplayNames([currentLang()], { type: "language" });
		const n = dn.of(norm);
		if (n && n.toLowerCase() !== norm.toLowerCase()) return n.charAt(0).toUpperCase() + n.slice(1);
	} catch { /* DisplayNames no soportado: cae al código */ }
	return code;
}

function flagEmoji(cc: any) {
	if (!/^[A-Za-z]{2}$/.test(cc || "")) return "";
	return String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1F1E6 + c.charCodeAt(0) - 65));
}

const LANG_REGION_FALLBACK = {
	en: "GB", es: "ES", de: "DE", fr: "FR", pt: "PT", it: "IT", nl: "NL",
	ja: "JP", zh: "CN", ko: "KR", ru: "RU", ar: "SA", hi: "IN", pl: "PL",
	tr: "TR", uk: "UA", sv: "SE", cs: "CZ", da: "DK", fi: "FI", no: "NO",
	el: "GR", he: "IL", id: "ID", vi: "VN", th: "TH",
};
export function langFlag(code: any) {
	const norm = String(code || "").replace("_", "-");
	const m = /-([A-Za-z]{2})(?:-|$)/.exec(norm);
	if (m) return flagEmoji(m[1]);
	const base = norm.toLowerCase().split("-")[0];
	const LRF: Record<string, string> = LANG_REGION_FALLBACK;
	return LRF[base] ? flagEmoji(LRF[base]) : "";
}
export function deviceLabel(id: any) { return t((DEVICE_LABELS as Record<string, string>)[id] || "device.unknown"); }

const REGIONS_ES = {
	// España (CCAA)
	"Andalusia": "Andalucía", "Aragon": "Aragón", "Asturias": "Asturias", "Balearic Islands": "Islas Baleares",
	"Basque Country": "País Vasco", "Canary Islands": "Canarias", "Cantabria": "Cantabria", "Castile and León": "Castilla y León",
	"Castille-La Mancha": "Castilla-La Mancha", "Castile-La Mancha": "Castilla-La Mancha", "Catalonia": "Cataluña",
	"Ceuta": "Ceuta", "Extremadura": "Extremadura", "Galicia": "Galicia", "La Rioja": "La Rioja",
	"Madrid": "Comunidad de Madrid", "Melilla": "Melilla", "Murcia": "Región de Murcia", "Navarre": "Navarra",
	"Valencia": "Comunidad Valenciana",
	// Reino Unido
	"England": "Inglaterra", "Scotland": "Escocia", "Wales": "Gales", "Northern Ireland": "Irlanda del Norte",
	// Alemania
	"Bavaria": "Baviera", "Baden-Württemberg": "Baden-Wurtemberg", "Lower Saxony": "Baja Sajonia",
	"North Rhine-Westphalia": "Renania del Norte-Westfalia", "Hesse": "Hesse", "Saxony": "Sajonia",
	"Saxony-Anhalt": "Sajonia-Anhalt", "Thuringia": "Turingia", "Rhineland-Palatinate": "Renania-Palatinado",
	"Brandenburg": "Brandeburgo", "Mecklenburg-Vorpommern": "Mecklemburgo-Pomerania Occidental", "Hamburg": "Hamburgo", "Bremen": "Bremen", "Berlin": "Berlín",
	// Francia
	"Île-de-France": "Isla de Francia", "Auvergne-Rhône-Alpes": "Auvernia-Ródano-Alpes", "Brittany": "Bretaña",
	"Normandy": "Normandía", "Provence-Alpes-Côte d'Azur": "Provenza-Alpes-Costa Azul", "Occitania": "Occitania",
	"Nouvelle-Aquitaine": "Nueva Aquitania", "Hauts-de-France": "Altos de Francia", "Pays de la Loire": "Países del Loira",
	"Bourgogne-Franche-Comté": "Borgoña-Franco Condado", "Grand Est": "Gran Este", "Centre-Loire Valley": "Valle del Loira",
	"Corsica": "Córcega",
	// Italia
	"Lombardy": "Lombardía", "Lazio": "Lacio", "Veneto": "Véneto", "Piedmont": "Piamonte", "Tuscany": "Toscana",
	"Sicily": "Sicilia", "Sardinia": "Cerdeña", "Emilia-Romagna": "Emilia-Romaña", "Campania": "Campania",
	"Liguria": "Liguria", "Apulia": "Apulia", "Trentino-Alto Adige": "Trentino-Alto Adigio", "Friuli-Venezia Giulia": "Friul-Venecia Julia",
	"Marche": "Marcas", "Umbria": "Umbría", "Abruzzo": "Abruzos", "Molise": "Molise", "Basilicate": "Basilicata", "Calabria": "Calabria",
	// Países Bajos
	"North Holland": "Holanda Septentrional", "South Holland": "Holanda Meridional", "North Brabant": "Brabante Septentrional",
	"Gelderland": "Güeldres", "Utrecht": "Utrecht", "Limburg": "Limburgo", "Overijssel": "Overijssel", "Friesland": "Frisia",
	"Groningen": "Groninga", "Drenthe": "Drente", "Zeeland": "Zelanda", "Flevoland": "Flevoland",
	// Bélgica / Austria / Suiza / Polonia / resto UE
	"Flanders": "Flandes", "Wallonia": "Valonia", "Brussels": "Bruselas", "Vienna": "Viena", "Tyrol": "Tirol",
	"Styria": "Estiria", "Upper Austria": "Alta Austria", "Lower Austria": "Baja Austria", "Salzburg": "Salzburgo",
	"Carinthia": "Carintia", "Vorarlberg": "Vorarlberg", "Burgenland": "Burgenland", "Zurich": "Zúrich",
	"Zug": "Zug", "Bern": "Berna", "Vaud": "Vaud", "Geneva": "Ginebra", "Ticino": "Ticino", "Grisons": "Graubünden",
	"Greater Poland": "Gran Polonia", "Lesser Poland": "Pequeña Polonia", "Mazovia": "Mazovia", "Silesia": "Silesia",
	// América
	"California": "California", "Texas": "Texas", "Florida": "Florida", "New York": "Nueva York", "Washington": "Washington",
	"Oregon": "Oregón", "Nevada": "Nevada", "Arizona": "Arizona", "Colorado": "Colorado", "Illinois": "Illinois",
	"Georgia": "Georgia", "North Carolina": "Carolina del Norte", "South Carolina": "Carolina del Sur", "Virginia": "Virginia",
	"Pennsylvania": "Pensilvania", "Ohio": "Ohio", "Michigan": "Míchigan", "New Jersey": "Nueva Jersey", "Massachusetts": "Massachusetts",
	"Quebec": "Quebec", "Ontario": "Ontario", "British Columbia": "Columbia Británica", "Alberta": "Alberta",
	"State of Mexico": "Estado de México", "Mexico City": "Ciudad de México", "Jalisco": "Jalisco", "Nuevo León": "Nuevo León",
	"Puebla": "Puebla", "Guanajuato": "Guanajuato", "Yucatán": "Yucatán",
	"Brazil": "Brasil", "São Paulo": "São Paulo", "Rio de Janeiro": "Río de Janeiro", "Minas Gerais": "Minas Gerais",
	"Rio Grande do Sul": "Río Grande del Sur", "Paraná": "Paraná", "Buenos Aires": "Buenos Aires", "Córdoba": "Córdoba",
	"Mendoza": "Mendoza", "Chile": "Chile", "Santiago Metropolitan": "Santiago", "Valparaíso": "Valparaíso",
	"Colombia": "Colombia", "Bogota": "Bogotá", "Antioquia": "Antioquia", "Valle del Cauca": "Valle del Cauca",
	"Peru": "Perú", "Lima": "Lima", "Uruguay": "Uruguay", "Montevideo": "Montevideo",
	// Asia / resto
	"Tokyo": "Tokio", "Osaka": "Osaka", "Hokkaido": "Hokkaido", "Kyoto": "Kioto",
	"New South Wales": "Nueva Gales del Sur", "Victoria": "Victoria", "Queensland": "Queensland", "Western Australia": "Australia Occidental",
	"South Australia": "Australia Meridional", "Tamil Nadu": "Tamil Nadu", "Maharashtra": "Maharastra", "Karnataka": "Karnataka",
	"Delhi": "Delhi", "Gujarat": "Guyarat", "Rajasthan": "Rajastán", "Uttar Pradesh": "Uttar Pradesh", "West Bengal": "Bengala Occidental",
	"Punjab": "Punyab", "Telangana": "Telangana", "Kerala": "Kerala", "Moscow": "Moscú", "Moscow Oblast": "Óblast de Moscú",
	"Saint Petersburg": "San Petersburgo", "Istanbul": "Estambul", "Ankara": "Ankara", "Izmir": "Esmirna", "Bursa": "Bursa",
	"Seoul": "Seúl", "Busan": "Busan", "Gyeonggi-do": "Gyeonggi", "Taiwan": "Taiwán", "Hong Kong": "Hong Kong",
};
export function regionName(name: any) {
	if (!name) return t("top.unknown");
	if (currentLang() === "es") return (REGIONS_ES as Record<string, string>)[name] || name;
	return name;
}
