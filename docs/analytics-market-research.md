# goatdash · Investigación comparativa de analytics de mercado

**Fecha**: 13-Ago-2026 · **Alcance**: qué ofrecen los principales analytics vs qué tiene goatdash, y qué es realista traer encima de la API de GoatCounter v2.7.0 (patcheado `X-Goatcounter-Site`).

Convenciones:
- ✅ **YA lo tenemos** (verificado en `app.js`/`index.html`)
- ➕ **PODEMOS traerlo** con la API v0 de GoatCounter tal cual (fichero:línea del endpoint en `/tmp/opencode/goatcounter-src`)
- 🔧 **Posible con patch del backend** GoatCounter (toca Go/esquema; se valora coste)
- ❌ **NO viable** (GoatCounter no lo mide; alternativa realista si existe)

> **HECHO vs HIPÓTESIS**: todo lo marcado como "verificado" lo he contrastado hoy yo mismo (código de goatdash, código de GoatCounter en `/tmp/opencode/goatcounter-src`, o URL primaria leída). Lo etiquetado como "hipótesis" es inferencia razonable sin contraste directo.

---

## A. Inventario por producto (fuentes citadas)

### Google Analytics 4 — [features](https://marketingplatform.google.com/about/analytics/features/) (oficial Google)
Verificado en la página oficial de features:
- **Real-time reporting** (monitorizar actividad mientras ocurre).
- **Adquisición**: informes de adquisición de usuarios y tráfico (canales orgánicos/pago).
- **Engagement**: informes de *events*, conversiones, páginas/screens.
- **Monetización**: ecommerce, in-app purchases, revenue de ads.
- **Explorations**: free-form, **funnels**, segment overlap, **path exploration**, **cohorts**, user exploration, lifetime value, backwards pathing.
- **BigQuery export**, **custom dimensions/metrics**, data import, APIs de colección (JS/Android/iOS/Measurement Protocol), Tag Manager.
- Integraciones: Google Ads, Search Console, Display & Video 360, AdMob, Play.
- **Insights predictivos / proactivos** (ML): predecir compras/churn, detectar tendencias automáticamente.
- Analytics 360: sub-properties, roll-up reporting, data freshness intra-día.

### Plausible — [homepage](https://plausible.io) + [pricing](https://plausible.io/#pricing) + [docs: top-pages](https://plausible.io/docs/top-pages) + [docs: goals](https://plausible.io/docs/goal-conversions) (oficial)
- Dashboard de **una sola página**: visitantes, pageviews, **bounce rate**, **tiempo en página**, fuentes (verificado en la comparativa de Clicky y en docs).
- **Top pages, Entry pages y Exit pages** con métricas extra: bounce rate, time on page, **scroll depth** por página (docs top-pages).
- **Referrers/UTMs con channel grouping** (Paid Search, Affiliates, etc.) (homepage: "Measure paid ads and campaigns ... automatic channel grouping").
- **Real-time dashboard** (updates cada 30 s, mismo set de métricas) (homepage).
- **Goals codeless**: pageview goals, **funnels**, **user journeys**, custom events, outbound links, file downloads, form submissions, 404s, revenue tracking con moneda (docs goals + homepage).
- **Scroll depth** automático 1–100 % (homepage).
- **Custom properties**, **saved/shared segments**, **annotations**, **shared links**, **embedded dashboards** (pricing Growth/Business).
- **Consolidated View** multi-sitio (Business), **Stats API**, Data Studio connector (pricing).
- **AI traffic**: ver qué tráfico viene de ChatGPT/Perplexity/Claude y qué páginas atraen AI (homepage).
- Google Search Console integration (pricing).

### Umami — [README GitHub](https://github.com/umami-software/umami) (repo oficial, 38k stars)
- "Traffic, campaigns, **behavior, conversions, and revenue** in one place — no cookies" (README).
- **Funnels**, **retention/cohort analysis**, **user journeys**, custom dashboards, múltiples tipos de gráficas (topic tags del repo: cohort-analysis, user-journey, analytics).
- **Custom properties**, **user profiles** (topics).
- Self-hosted gratis (MIT), tracker ~2 KB, free tier cloud (comparativa Clicky, blog del propio Clicky).
- Sin visitor logs (agregado puro) — comparativa Clicky.

### Matomo — [features](https://matomo.org/features/) (oficial)
- 30+ informes estándar: visitantes, acciones, referrers, **goals**, **ecommerce**, **site search**, entry/exit pages, downloads (verificado: "top entry/exit pages, downloaded files ... Goals/Ecommerce").
- **Real-time**, dashboards personalizables, **All Websites Dashboard** (multi-sitio), **Row Evolution**, **Annotaciones**, **Custom Alerts**.
- **Event tracking**, content tracking, custom dimensions, geolocalización con mapa por país/región/ciudad.
- **Segmentation** (110+ condiciones, AND/OR), **Transitions** (antes/después de una página), **Page Overlay**, page speed, **Visits Log** (sesiones individuales), **Visitor Profile**.
- **Scheduled reports** por email (pdf/html/csv/tsv), OAuth2, API completa, SQL access.
- Premium (plugins de pago): **heatmaps**, **session recording**, **A/B testing**, **custom reports**, **form analytics**, **media analytics**, **funnels**, **user flow**, multi-channel attribution, roll-up, cohorts.
- User ID para medir usuarios cross-device; anonimización IP; cookieless.

### Fathom — [features](https://usefathom.com/features) (oficial)
- Dashboard de una página: pages, referrers, sources, devices, browsers, countries, **events**, UTMs.
- **Real-time metrics** (frente a 24–48 h de GA) + **live visitors** (quién está en la web ahora, desde dónde, qué página) + "site totals" con avg time on site y bounce rate.
- **Instant filters** en cualquier dato (drill-down), **details view** (lista larga por dato), **event conversions** (con revenue y moneda), **UTMs & campaigns**.
- **All sites view** (totales de todas las webs de la cuenta en una pantalla), **one-click CSV export**, **email reports** semanales/mensuales, **dark mode**, **multi-domains**, dashboard sharing (público o con contraseña).
- IP/country blocking, allowed domains, SPA mode, no cookies.
- **No self-hosted** (solo SaaS), GA importer.

### Pirsch — [README GitHub](https://github.com/pirsch-analytics/pirsch) (repo oficial, AGPLv3)
- **Server-side tracking sin cookies**: fingerprint (hash de IP+UA+fecha+salt), GDPR/CCPA/PECR.
- Open-source core en Go; dashboard demo en [pirsch.pirsch.io](https://pirsch.pirsch.io).
- No he podido verificar el listado completo de features del SaaS (pirsch.io no respondió); la base open-source es agregado por página/referrer/campaigns como los demás. Hipótesis: similar a Plausible/Fathom (es su competidor directo), sin verificar.

### Clicky — [homepage](https://www.clicky.com/) + [blog comparativa](https://clicky.com/blog/best-google-analytics-alternatives) (oficial, con sesgo comercial)
- **Real-time visitor logs y actions** (cada visitante individual, páginas vistas, tiempo, dispositivo, origen) — solo Clicky y Matomo ofrecen logs de visitante según su propia comparativa.
- **Spy**: mapa en vivo con puntos por visitante actual + log de los últimos ~40.
- **Trend analysis**: comparar cada reporte vs día/semana/mes/año anterior.
- **Heatmaps** (página y visitante), **uptime alerts**, **proxy tracking** (anticoadblock), **custom data logging** (usernames/emails en sesión), AI analytics (visitantes de chatbots separados).
- **Advanced filtering & segmentation** (combinar filtros, ej. "Google con ≥2 páginas vistas").
- Multi-site (hasta 1000 webs), freemium, GDPR por defecto.
- UI anticuada (lo admiten en su propio blog), sin self-hosted.

---

## B. Comparativa por capacidades

### B1. Métricas / KPIs

| Feature de mercado | Estado | Cómo / Fuente |
|---|---|---|
| Visitantes únicos | ✅ | KPI en `renderKPIs` (`app.js:527`) vía `/api/v0/stats/total` |
| Pageviews | ✅ | KPI, suma de series (`app.js:532`) |
| Página principal (top page) | ✅ | KPI (`app.js:538-542`) |
| Nº de rutas rastreadas | ✅ | KPI (`app.js:548`) |
| Trend vs periodo anterior | ✅ (parcial) | `getPreviousRange` + `prevTotal` (`app.js:352,1071`). Solo en el KPI de visitantes |
| **Total de eventos** (`total_events`) | ➕ | `/api/v0/stats/total` ya devuelve `total_events` (`api.go:1089-1090`; hardcoded a true en `api.go:1143`). KPI nuevo trivial |
| Bounce rate | ❌ | GoatCounter no mide rebote (requiere duración de sesión). **Alternativa**: ninguno sin patch |
| Tiempo en página / sesión | ❌ | No se registra duración. GA/Plausible/Fathom lo derivan de beacons de salida |
| Returning vs new visitors | 🔧 | `first_visit` existe por hit (`hit.go:43`) y en el export (`exportcsv.go:399`), pero **no hay endpoint agregado**. Patch pequeño o procesar el export JSON (ver C5) |
| Días con más tráfico (día-semana mejor) | ➕ | Fácil de calcular en cliente desde las series diarias que ya llegan |
| Visitas "en vivo" / última hora | ➕ (limitado) | `stats/total` devuelve `stats[].hourly[]` (`api.go:1097`; `hit_list.go:72-...`). Se puede pintar "última hora" sin endpoint nuevo. No es un live feed real |

### B2. Páginas / contenido

| Feature de mercado | Estado | Cómo / Fuente |
|---|---|---|
| Lista de páginas con drill refs | ✅ | `renderPages` + `/api/v0/stats/hits/{path_id}` (`app.js:1213,939`; `api.go:1024`) |
| Entry / exit pages | ❌ | GoatCounter no guarda orden de sesión navegable. Plausible/Matomo/Clicky sí |
| Scroll depth por página | ❌ | No se mide. Plausible lo hace automático en el tracker |
| **Filtro de páginas por sección** (incluir/excluir rutas) | ➕ | `include_paths`/`exclude_paths`/`path_by_name` en `/api/v0/stats/hits`, `stats/{page}`, `stats/total` (`api.go:920-930,1074-1082,1168-1176`). Muy útil para aislar `/blog/`, `/docs/`, o una landing concreta |
| Búsqueda/búsqueda en sitio (site search) | ❌ | GoatCounter no registra queries de búsqueda interna |

### B3. Referrers / adquisición / campañas

| Feature de mercado | Estado | Cómo / Fuente |
|---|---|---|
| **Top referrers GLOBAL** (no solo por página) | ➕ (P0) | **`/api/v0/stats/toprefs`** ya existe (`api.go:1201-1202,1248-1249`) — goatdash no lo llama. Cada fila trae `ref_scheme` |
| **Canal del referrer** (directo/buscador/campaña/otro) | ➕ (P0) | `ref_scheme` h/g/c/o en `HitStat` (`hit_stats.go:118`; `ref.go:15-18`). Es el equivalente al "channel grouping" de Plausible/Fathom/Matomo |
| **Drill ref→páginas** (qué páginas trae ese referrer) | ➕ (P0) | `/api/v0/stats/toprefs/{id}` → `ListTopRef` (`api.go:1324-1325`). goatdash ya tiene el patrón de drill, solo hay que añadir el caso |
| Drill página→refs | ✅ | `/api/v0/stats/hits/{path_id}` (`api.go:1024`) |
| Campañas UTM | ✅ | `/api/v0/stats/campaigns` + drill (`api.go:1202,1327`; `app.js:377`) |
| Campañas **en el panel de referrers** (unidas) | ➕ | El `ref_scheme=c` agrupa campañas en toprefs; se pueden presentar unificados |
| Informes de "adquisición de usuario vs tráfico" | ❌ | GA4 los separa por modelo de datos de usuario; GoatCounter es agregado por visita |

### B4. Segmentación / filtros / datos demográficos

| Feature de mercado | Estado | Cómo / Fuente |
|---|---|---|
| Idiomas | ✅ | `stats/languages` (`app.js:377,1072`) |
| Browsers | ✅ | `stats/browsers` + drill (`app.js:371`) |
| Sistemas | ✅ | `stats/systems` (`app.js:372`) |
| Tamaños de pantalla | ✅ | `stats/sizes` (`app.js:373`) |
| Geo (mapa) | ✅ | `stats/locations` + world-map (`app.js:374,1126`) |
| **Filtro por país/browser/etc. combinado** (segmentación tipo "Google con ≥2 páginas") | ➕ (parcial) | La API filtra por **página** (`include_paths`) pero **no por segmento demográfico**. Segmentación demográfica = descartada; filtro por página = viable |
| Custom dimensions/properties (matomo/umami/plausible) | ❌ | GoatCounter no tiene dimensiones personalizadas en el esquema |

### B5. Eventos / conversiones / objetivos

| Feature de mercado | Estado | Cómo / Fuente |
|---|---|---|
| **Eventos por ruta** (flag `event`) | ➕ | El campo `event` existe por path (`hit.go:33`; `hit_list.go:83`; `exportjson.go` ExportPath.Event). La API distingue pageviews de eventos en `stats/total` (`total_events`). Marcar rutas como evento se hace desde `/api/v0/count` (`event: true`) o la UI de GoatCounter |
| **Panel de "eventos/conversiones" separado** | ➕ (P1) | Con `event` por ruta + `total_events`, goatdash puede listar rutas marcadas como evento (equivalente ligero a goals de Plausible/Fathom) |
| Funnels | ❌ | No existe el concepto de secuencia de pasos. Plausible/Matomo/GA4 lo tienen. **Alternativa realista**: no viable sin tracking de orden de sesión; ver D |
| Goals de página (pageview goal) | ➕ (parcial) | Se puede simular: marcar la ruta de agradecimiento como `event` y mostrarla como conversión. Plausible lo hace codeless igual |
| Revenue / ecommerce | ❌ | No se mide valor monetario |
| Objetivos con condiciones (tiempo, clics, descargas) | ❌ | No existe. Fathom events tienen revenue; GoatCounter solo flag event |

### B6. Real-time / UX / operativa

| Feature de mercado | Estado | Cómo / Fuente |
|---|---|---|
| **Export CSV/JSON (backup)** | ➕ (P1) | `/api/v0/export` (POST) → `/api/v0/export/{id}` (poll) → `/api/v0/export/{id}/download` (`api.go:117-119,330-470`). Formato csv/json, con `FirstVisit` y ref_scheme por hit |
| Multi-site selector | ✅ | `/api/v0/sites` + `X-Goatcounter-Site` (`app.js:192,239,276,972`; `api.go:712`) |
| **Vista consolidada multi-site** (totales de todas las webs) | ➕ (P1) | `/api/v0/sites` devuelve el sitio + subsites (`api.go:722-728`); goatdash ya los lista. Sumar KPIs de varios sitios en paralelo = "All sites view" de Fathom/Matomo/Plausible |
| **Anotaciones** (notas en el gráfico) | ➕ (P2) | No hay endpoint, pero se puede guardar en `localStorage` de goatdash y pintar marcas en el chart (equivalente client-side a Matomo/Plausible annotations) |
| Email/scheduled reports | ❌ (en goatdash) | No es rol de un frontend. Posible con un cron externo que lea la API (no en goatdash) |
| **Cambio de granularidad del gráfico** (hour/day/week/month) | ➕ | El param `group` ya existe (`api.go:915`; valores hour/day/week/month en `hit_list.go:26-40`). goatdash hoy re-agrupa en cliente (`buildTrafficSeries`, `app.js:445`) y ya elige grupo por rango (`pickGroup`, `app.js:357`); se puede pedir al servidor para payload menor y serie exacta |
| **Rango custom con fecha de inicio/fin** | ✅ | `custom-start`/`custom-end` (`index.html:63-65`) |
| Bot/refspam filtering | ✅ | Server-side de GoatCounter (refspam + bot detection) |
| **Página compartida pública** (share link) | ➕ (P2) | goatdash pide credenciales; un "modo lectura" sin clave (solo UI) sería copy de Plausible/Fathom, **pero la API v0 exige token**. Alternativa: enlazar con token en localStorage (hipótesis, ver C6) |

### B7. Qué ofrece el mercado y NO conviene (detalle en D)

Heatmaps, session recording, A/B testing, funnels, user flow/transitions, page overlay, time-on-site/bounce, ecommerce, custom dimensions, site search, page speed/Web Vitals, cohorts reales, predictive insights (ML).

---

## C. Top recomendaciones realistas (priorizadas)

### P0 — Alto valor, coste bajo, API lista

**1. Panel de "Top referrers" global con agrupación por canal (directo/buscador/campaña/otro)**
- Endpoint: `GET /api/v0/stats/toprefs?start=…&end=…&limit=N` (`api.go:1201,1248`) y drill `GET /api/v0/stats/toprefs/{id}` (`api.go:1324-1325`).
- Cada fila trae `ref_scheme`: `h` (HTTP referrer), `g` (generado: Google agrupado), `c` (campaña), `o` (otro/directo) (`ref.go:15-18`).
- En goatdash: nueva card "Referencias" (como la de campañas, `app.js:1131-1141`), agrupando por canal a nivel de cabecera y listando referrers por canal, con el mismo patrón de drill `toggleDetail` ya existente (`app.js:921`).
- **Por qué**: es el reporte que todo el mercado tiene (Plausible/Fathom/Matomo/Clicky/Umami) y que más falta le hace a un dashboard de landing pages: saber de dónde viene la gente globalmente, no solo página a página. Coste ~1 card + 1 endpoint.
- Nota: hoy goatdash solo ve refs al hacer drill por página; el panel global no existe (verificado, `ENDPOINTS` en `app.js:369-378` no incluye toprefs).

**2. KPI "Eventos" + separar pageviews de eventos**
- Endpoint: `/api/v0/stats/total` ya devuelve `total` y `total_events` (`api.go:1086-1090`); el backend los calcula siempre (`api.go:1143`).
- En goatdash: 4º/5º KPI con total de eventos, y en la lista de páginas marcar visualmente las rutas con flag `event` (el campo viene en los hits si está). Si más adelante las landings marcan "click en botón de descarga / GitHub" como evento, goatdash ya lo mostrará.
- **Por qué**: es la puerta a "conversiones" sin backend nuevo; Fathom/Plausible se apoyan en lo mismo (events = goals).

### P1 — Buen valor, algo más de trabajo

**3. Vista consolidada multi-site (totales de todas las landings)**
- Endpoint: `/api/v0/sites` devuelve la cuenta + subsites (`api.go:722-728`), y goatdash ya los puebla en `#site-select` (`app.js:972`).
- En goatdash: opción "Todos los sitios" en el selector que lance las peticiones de KPIs en paralelo por cada subsite y sume. Copia del "All sites view" de Fathom / "All Websites Dashboard" de Matomo / "Consolidated View" de Plausible.
- **Por qué**: el caso real es exactamente este (cloudless.club + netpulse/easyzfs/deltos/keynest/helios). Hoy el usuario cambia de sitio uno a uno; la suma da la visión del club completa.

**4. Export CSV/JSON (backup / análisis externo)**
- Endpoint: `POST /api/v0/export` (`{format: "csv"|"json"}`) → poll `GET /api/v0/export/{id}` → `GET /api/v0/export/{id}/download` (`api.go:117-119,330-470`). Respuesta 202 mientras se genera; los ficheros viven 24 h.
- En goatdash: botón "Exportar" en el menú (junto a "Actualizar datos", `index.html:73`) que lance el flujo y descargue el fichero.
- Requiere token con permiso `APIPermExport` (`api.go:333`). Verificar el permiso del token actual del usuario.
- **Por qué**: "one-click exports" lo tiene Fathom; barato y útil para no depender del panel de GoatCounter. Alternativa a un panel de raw data.

**5. Returning vs new visitors (vía export, sin patch)**
- El dato existe por hit (`first_visit`, `exportcsv.go:399`), pero **no hay endpoint agregado** (verificado: ni en `/stats/total` ni en `/stats/hits`). Opciones:
  - **Sin patch (recomendada primero)**: generar el export JSON del rango (endpoint de C4) y contar `firstVisit` en goatdash. Coste: más lento y pesado; para tráfico bajo de landings es viable bajo demanda.
  - **Con patch (P2)**: añadir a `GetTotalCount`/`api.go:1143` una variante `first_visit` agregada (un campo más en `apiCountTotalResponse`). Es un cambio pequeño en Go + SQL.
- **Por qué**: "new vs returning" es métrica estándar (Matomo/GA4). Vale la pena primero sin tocar backend, y si se hace pesado, el patch es menor.
- ⚠️ Distingue HECHO (el campo existe y se exporta) de la opción con patch (hipótesis de coste: no he tocado el SQL de agregación).

**6. Filtro de páginas por sección (include_paths / path_by_name)**
- Endpoint: `include_paths`/`exclude_paths`/`path_by_name` en `stats/hits`, `stats/{page}` y `stats/total` (`api.go:920-930,1074-1082,1168-1176`).
- En goatdash: un input "Filtrar por ruta" (p.ej. `/blog/*`, `/docs/`) que se añade como query param y refresca. Opción "por nombre" para no depender de IDs (`path_by_name`).
- **Por qué**: aisla secciones de una landing grande; es el "filter by page" de Plausible, y desbloquea drill "qué páginas concretas dentro de una sección".

### P2 — Nice-to-have

**7. Anotaciones en el gráfico (localStorage)**
- Sin endpoint: goatdash guarda `{fecha, texto}` en localStorage y pinta marcadores + tooltip en el chart SVG (`renderTrafficChart`, `app.js:572`). Copia barata de Matomo/Plausible. Útil para marcar lanzamientos de releases.

**8. Día-semana mejor / insights deterministas**
- Calcular en cliente: mejor día de la semana (media por weekday de las series), página que más creció en el periodo (dos llamadas a `stats/hits`, periodo actual vs anterior — patrón ya usado para `prevTotal` en `app.js:1071`), referrer nuevo destacado. Sin IA: reglas simples, "top page creció X%" como pide Plausible con sus insights.

**9. Granularidad del gráfico pedida al servidor (`group`)**
- Enviar `group=hour|day|week|month` (`api.go:915`) según rango (`pickGroup`, `app.js:357`) para payload menor y curvas exactas para rangos de 90d/1y (weekly/monthly ya disponibles en el API). Hoy `buildTrafficSeries` re-agrupa en cliente sobre series diarias (`app.js:445`); pedir al servidor ahorra datos y da el `Max` correcto del eje.

**10. Última hora "en vivo" (frescor)**
- `stats/total` devuelve `stats[].hourly[]` (`api.go:1097`); pintar "visitas esta última hora" en el header. No es un live feed, pero transmite frescor como Fathom sin backend nuevo.

---

## D. Lo que NO conviene intentar (y por qué)

1. **Duración de sesión / tiempo en página / bounce rate** — GoatCounter no registra duración (no hay beacon de salida ni timestamps de fin de visita). Añadirlo = cambiar el modelo de datos y el tracker (rompe el "privacy-first" y toca el esquema). **Alternativa**: ninguno honesto; asumirlo como fuera de alcance (igual que Fathom/Plausible en su capa gratuita son "agregado puro").
2. **Funnels / user journeys / transitions / user flow** — requieren orden de pasos por sesión. GoatCounter guarda `session` en cada hit (`hit.go:27`) pero no hay endpoint que reconstruya secuencias ni UI para ello. Patch grande, poco encaje con la filosofía del producto. **Alternativa realista**: los "eventos por ruta" (P0/P1) sirven de proxy de conversión (página de gracias = goal), sin flujo.
3. **Heatmaps / session recording / page overlay / A/B testing** — requieren recolectar clicks/scroll/posición (otro tracker + almacenamiento masivo). Fuera de la filosofía y del coste. **Alternativa**: herramientas dedicadas (Hotjar) si algún día hiciera falta; no tiene sentido en goatdash.
4. **Ecommerce / revenue** — GoatCounter no modela importes. No hay forma honesta.
5. **Custom dimensions / properties / site search / page speed (Web Vitals)** — no existen en el esquema; añadirlos es rehacer el backend.
6. **Cohorts/retention reales y segmentación demográfica combinada** (ej. "usuarios de Google que vieron ≥2 páginas") — sin user IDs persistentes ni visitor logs no hay base. Clicky/Matomo lo hacen porque guardan sesiones individuales; GoatCounter es agregado por diseño.
7. **Predictive/ML insights a lo GA4** — es producto de Google con big data detrás. En tráfico bajo de landings no tiene sentido ni hay datos para entrenar nada. **Alternativa**: insights deterministas (C8) bastan y sobran.
8. **"Visitor logs" individuales (Clicky/Matomo)** — incompatible con el diseño agregado de GoatCounter y con su privacy model; no intentarlo.
9. **Email reports desde goatdash** — es un frontend estático; el envío de email requiere servidor/cron. No es rol de goatdash; si se quiere, un cron externo sobre la API (fuera del alcance de este informe).

---

## E. Ideas de mercado de UX/presentación (baratas de copiar en goatdash)

1. **Jerarquía visual "escaneable"** (Plausible/Fathom/Umami): KPIs arriba en grande → gráfico → listas con barras de proporción. goatdash ya sigue este patrón (`grid-kpis` → `traffic-card` → cards). Mantener.
2. **Porcentajes relativos en cada fila** (share % del total): Plausible muestra el % al lado de cada barra; goatdash ya dibuja barras (`renderTopList`, `app.js:674`) — añadir el número de % explícito es trivial.
3. **Comparativa vs periodo anterior visible en cada sección**, no solo en el KPI: Plausible pone "↑ X% vs 30 days ago" en el header de cada bloque. En goatdash, repetir el patrón de `prevTotal` (`app.js:1071`) para páginas y referrers (dos llamadas al endpoint del bloque con el rango previo).
4. **Empty states accionables** (Plausible/Umami): cuando una card está vacía, mensaje claro + sugerencia ("aún no hay datos en este rango", "conecta el tracker para empezar a medir"). goatdash ya tiene `emptyEl` (`app.js:952`) y `errCard`; pulir el texto y añadir CTA donde aplique.
5. **Frescor del dato (relTime)**: goatdash ya lo muestra (`app.js:399`); es un patrón de Fathom ("updated X s ago") bien resuelto — mantenerlo destacado.
6. **"Última hora / hoy" siempre visible**: Fathom pone live visitors arriba. El equivalente barato en goatdash es el KPI de hoy + badge "última hora" (C10).
7. **Insight de una línea arriba del gráfico** ("El lunes es tu mejor día · /docs/ creció 34% este periodo"): patrones de GA4 (insights) y Simple Analytics (AI insights); en goatdash con reglas deterministas (C8). No requiere IA.
8. **Filtros con retroalimentación visible** (Plausible filter bar): al filtrar por ruta/sección, mostrar un chip "Filtrando: /blog/* ✕". Transparencia de estado barata.
9. **Selector de rango con comparativo solapado**: Plausible permite comparar periodos dibujando la serie anterior atenuada sobre la actual. En goatdash, segunda serie SVG en `renderTrafficChart` con `--text-muted` (patrón ya de doble llamada a `stats/total`).
10. **Dark mode bien definido**: ya existe (`applyTheme`); los productos modernos lo dan por hecho, así que mantener consistencia de tokens.
11. **Keyboard shortcuts** (Plausible): `1/7/30/90` para rangos, `r` para refresh. Barato y con caché ya implementada (`_readCache`, `app.js:258`).
12. **Rutas con icono de "evento"** y separador visual de eventos/pageviews en la lista de páginas (como Fathom distingue events). Señala que ya hay "conversiones" sin explicarlo.

---

## Fuentes (credibilidad)

**Oficial / primer nivel**
- GA4 features: https://marketingplatform.google.com/about/analytics/features/ (Google oficial)
- Plausible homepage: https://plausible.io ; pricing: https://plausible.io/#pricing
- Plausible docs top-pages: https://plausible.io/docs/top-pages ; goals: https://plausible.io/docs/goal-conversions
- Matomo features: https://matomo.org/features/ (oficial)
- Fathom features: https://usefathom.com/features (oficial)
- Umami repo: https://github.com/umami-software/umami (oficial)
- Pirsch repo: https://github.com/pirsch-analytics/pirsch (oficial)
- Clicky homepage: https://www.clicky.com/ ; comparativa (blog oficial, sesgo comercial): https://clicky.com/blog/best-google-analytics-alternatives

**Backend GoatCounter v2.7.0 (código verificado hoy)**
- API routes: `/tmp/opencode/goatcounter-src/handlers/api.go:112-137`
- `toprefs` y `ref_scheme`: `api.go:1201-1202,1248-1249,1324-1325` · `hit_stats.go:118` · `ref.go:15-18`
- `group`: `api.go:915` · `hit_list.go:26-40`
- `include_paths`/`exclude_paths`/`path_by_name`: `api.go:920-930,1074-1082,1168-1176`
- Export: `api.go:117-119,330-470` · `exportcsv.go:399` (first_visit)
- `/api/v0/sites`: `api.go:712-728` · `/api/v0/paths`: `api.go:855-893`
- `total_events`: `api.go:1086-1090,1143` · `event` por path: `hit.go:33` · `hit_list.go:83`

**goatdash (código verificado hoy)**
- `/home/nacho/Documentos/Mi Nube/Proyectos/repos/goatdash-git/app.js` (ENDPOINTS: líneas 369-378; KPIs: 527; prevTotal: 352,1071; drill: 921,939; toprefs: AUSENTE)
