/* Goatdash — anti-FOUC: aplica el tema antes de pintar estilos.
   Fichero externo servido por 'self' (el CSP de producción bloquea inline).
   Modo: "dark" | "light" | "auto". Ausente → dark (default retrocompatible). */
(function () {
	var mode = null;
	try { mode = localStorage.getItem("gc-dashboard-theme-v1"); } catch (e) {}
	var resolved;
	if (mode === "light" || mode === "dark") resolved = mode;
	else if (mode === "auto") resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	else resolved = "dark";
	document.documentElement.setAttribute("data-theme", resolved);
})();
