// Interactive world map (pan/zoom, country drill).
import { $ } from "../dom";
import { t } from "../i18n/index";
import { fmtNum } from "../util";
import { countryNameToCode, flagFor } from "../geo";
import { highlightCode, mapDragMoved, mapDragSuppressClick, mapTransformState, setMapDragMoved, setMapDragSuppressClick, setMapTransformState } from "../state";
import { clearTooltips, showTooltip } from "./cards";
import { assetUrl } from "../assets";

let worldMapPromise: Promise<void> | null = null;

function loadWorldMap(): Promise<void> {
	if (window.WORLD_MAP_PATHS) return Promise.resolve();
	if (worldMapPromise) return worldMapPromise;
	worldMapPromise = new Promise<void>((resolve, reject) => {
		const script = document.createElement("script");
		script.src = assetUrl("assets/world-map.js");
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("world-map.js failed to load"));
		document.body.appendChild(script);
	});
	worldMapPromise.catch(() => { worldMapPromise = null; });
	return worldMapPromise;
}

export async function renderWorldMap(container: any, stats: any, total: any, onPathClick: any) {
	const token = Symbol("worldmap");
	container._worldMapToken = token;
	try {
		await loadWorldMap();
	} catch (err) {
		if (container._worldMapToken !== token) return;
		container.innerHTML = "";
		const failed = document.createElement("div");
		failed.className = "empty";
		failed.textContent = t("err.failed");
		container.appendChild(failed);
		return;
	}
	if (container._worldMapToken !== token) return;
	container.innerHTML = "";
	if (!window.WORLD_MAP_PATHS) return;
	const counts: Record<string, number> = {};
	let maxCount = 1;
	(stats || []).forEach((s: any) => {
		const code = countryNameToCode(s.name);
		if (code) { counts[code] = s.count; if (s.count > maxCount) maxCount = s.count; }
	});
	const wrap = document.createElement("div");
	wrap.className = "map-wrap";

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg") as any;
	svg.setAttribute("viewBox", window.WORLD_MAP_VIEWBOX || "0 0 1000 500");
	svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

	const g = document.createElementNS("http://www.w3.org/2000/svg", "g") as any;
	g.setAttribute("class", "map-root");

	let s = 1;
	let tx = 0;
	let ty = 0;
	const minScale = 1;
	const maxScale = 8;
	if (mapTransformState && mapTransformState.s) {
		s = mapTransformState.s;
		tx = mapTransformState.tx;
		ty = mapTransformState.ty;
	}
	function applyTransform() {
		g.setAttribute("transform", `translate(${tx.toFixed(2)}, ${ty.toFixed(2)}) scale(${s.toFixed(4)})`);
		setMapTransformState({ s, tx, ty });
	}
	applyTransform();

	function svgPointFromClient(cx: any, cy: any) {
		const rect = svg.getBoundingClientRect();
		const vb = (window.WORLD_MAP_VIEWBOX || "0 0 1000 500").split(/\s+/).map(Number);
		const vw = vb[2] || 1000;
		const vh = vb[3] || 500;
		return {
			x: ((cx - rect.left) / Math.max(1, rect.width)) * vw,
			y: ((cy - rect.top) / Math.max(1, rect.height)) * vh,
		};
	}
	function zoom(factor: any, cx?: any, cy?: any) {
		const ns = Math.min(maxScale, Math.max(minScale, s * factor));
		if (ns === s) return;
		let centerX = cx, centerY = cy;
		if (centerX == null || centerY == null) {
			const rect = svg.getBoundingClientRect();
			centerX = rect.left + rect.width / 2;
			centerY = rect.top + rect.height / 2;
		}
		const p = svgPointFromClient(centerX, centerY);
		tx = p.x - (p.x - tx) * (ns / s);
		ty = p.y - (p.y - ty) * (ns / s);
		s = ns;
		applyTransform();
	}
	function reset() { s = 1; tx = 0; ty = 0; applyTransform(); }

	for (const code in window.WORLD_MAP_PATHS) {
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path") as any;
		path.setAttribute("d", window.WORLD_MAP_PATHS[code]);
		const has = code in counts;
		path.setAttribute("data-code", code);
		path.setAttribute("data-has", has ? "1" : "0");
		if (has) {
			const opacity = 0.25 + (Math.sqrt(counts[code]) / Math.sqrt(maxCount)) * 0.75;
			path.setAttribute("fill-opacity", opacity.toFixed(3));
		}
		if (code === highlightCode) path.setAttribute("class", "map-selected");
		if (has && onPathClick) {
			path.style.cursor = "pointer";
			path.addEventListener("click", (e: MouseEvent) => {
				if (mapDragSuppressClick) { e.stopPropagation(); setMapDragSuppressClick(false); return; }
				onPathClick(code);
			});
		}
		path.addEventListener("mouseenter", (e: MouseEvent) => {
			if (!has) return;
			const name = Object.keys(counts).find((k) => countryNameToCode(k) === code);
			const count = counts[code];
			const pct = total ? ((count / total) * 100).toFixed(1) + "%" : "";
			showTooltip(path, [
				`${flagFor(name || code)} ${name || code} · `,
				{ text: fmtNum(count), className: "tt-num" },
				` ${pct}`,
			]);
		});
		path.addEventListener("mouseleave", clearTooltips);
		g.appendChild(path);
	}
	svg.appendChild(g);

	// Controles
	const controls = document.createElement("div");
	controls.className = "map-controls";
	function makeBtn(labelKey: any, text: any, action: any) {
		const b = document.createElement("button");
		b.type = "button";
		b.className = "map-btn";
		b.setAttribute("aria-label", t(labelKey));
		b.textContent = text;
		b.addEventListener("click", action);
		return b;
	}
	controls.appendChild(makeBtn("map.zoomIn", "+", () => zoom(1.3)));
	controls.appendChild(makeBtn("map.zoomOut", "−", () => zoom(0.77)));
	controls.appendChild(makeBtn("map.reset", "⟲", reset));
	controls.addEventListener("pointerdown", (e) => e.stopPropagation());

	// Pan / zoom interactivo
	const pointers = new Map();
	let pinchStartDist = 0;
	let pinchStartScale = 1;
	let pinchStartTx = 0;
	let pinchStartTy = 0;
	let pinchCenter = { x: 0, y: 0 };
	let panStart = { x: 0, y: 0, tx: 0, ty: 0 };
	let panRect: any = null;
	function onPointerMove(e: any) {
		if (!pointers.has(e.pointerId)) return;
		pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
		if (pointers.size === 1) {
			const dx = e.clientX - panStart.x;
			const dy = e.clientY - panStart.y;
			if (Math.hypot(dx, dy) > 4) setMapDragMoved(true);
			const vb = (window.WORLD_MAP_VIEWBOX || "0 0 1000 500").split(/\s+/).map(Number);
			const vw = vb[2] || 1000;
			const vh = vb[3] || 500;
			tx = panStart.tx + (dx / Math.max(1, panRect.width)) * vw;
			ty = panStart.ty + (dy / Math.max(1, panRect.height)) * vh;
			applyTransform();
		} else if (pointers.size === 2) {
			const pts = [...pointers.values()];
			const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
			if (pinchStartDist > 0) {
				const factor = dist / pinchStartDist;
				const ns = Math.min(maxScale, Math.max(minScale, pinchStartScale * factor));
				if (ns !== s) {
					tx = pinchCenter.x - (pinchCenter.x - pinchStartTx) * (ns / pinchStartScale);
					ty = pinchCenter.y - (pinchCenter.y - pinchStartTy) * (ns / pinchStartScale);
					s = ns;
					applyTransform();
				}
			}
		}
	}
	function onPointerUp(e: any) {
		if (!pointers.has(e.pointerId)) return;
		pointers.delete(e.pointerId);
		if (pointers.size === 0) {
			if (mapDragMoved) setMapDragSuppressClick(true);
			setMapDragMoved(false);
			wrap.classList.remove("grabbing");
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);
		}
	}
	wrap.addEventListener("pointerdown", (e) => {
		if (e.button !== 0) return;
		pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
		if (pointers.size === 1) {
			setMapDragMoved(false);
			setMapDragSuppressClick(false);
			panStart = { x: e.clientX, y: e.clientY, tx, ty };
			panRect = svg.getBoundingClientRect();
			wrap.classList.add("grabbing");
			window.addEventListener("pointermove", onPointerMove);
			window.addEventListener("pointerup", onPointerUp);
			window.addEventListener("pointercancel", onPointerUp);
		} else if (pointers.size === 2) {
			const pts = [...pointers.values()];
			pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
			pinchStartScale = s;
			pinchStartTx = tx;
			pinchStartTy = ty;
			pinchCenter = svgPointFromClient((pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
		}
	});
	wrap.addEventListener("wheel", (e: WheelEvent) => {
		e.preventDefault();
		const factor = e.deltaY < 0 ? 1.15 : 0.87;
		zoom(factor, e.clientX, e.clientY);
	}, { passive: false });
	wrap.addEventListener("dblclick", (e: MouseEvent) => {
		if ((e.target as HTMLElement).closest(".map-controls")) return;
		reset();
	});

	wrap.appendChild(svg);
	wrap.appendChild(controls);

	const legend = document.createElement("div");
	legend.className = "map-legend";
	legend.innerHTML = `<span class="lg-min">${fmtNum(maxCount / 8)}</span><span class="lg-swatch"></span><span>${fmtNum(maxCount)}</span>`;
	wrap.appendChild(legend);

	// Pista sutil para descubrir interacción (desktop)
	if (!window.matchMedia("(pointer: coarse)").matches) {
		const hint = document.createElement("div");
		hint.className = "map-hint";
		hint.textContent = t("map.dragHint");
		wrap.appendChild(hint);
	}

	container.appendChild(wrap);
}
