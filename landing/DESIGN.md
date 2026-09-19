# DESIGN.md — landing de goatdash (goatdash.cloudless.club)

Landing de producto del dashboard goatdash, el visor ligero y privado para
GoatCounter. Estática sin build (HTML+CSS+JS puro), i18n ES/EN, tema
claro/oscuro. Vive en `landing/` dentro del repo `gnacho/goatdash`.

> Reescrito el 10-Sep-2026 tras un critique de diseño: el DESIGN.md anterior
> describía un sistema (ámbar sobre papel, display Space Grotesk, "sin
> bounce") que fue sustituido durante la iteración y ya no correspondía con
> lo desplegado. Este fichero documenta el sistema REAL. Decisión tomada con
> el usuario: se mantiene la identidad teal/Exo actual; los restos de
> template (gradiente rosa del hero, glow y sombras anchas) se irán depurando
> en pasas futuras.

## Fase 0 · Descubrimiento

- **Artefacto:** landing de producto self-hosted (herramienta de analítica),
  con demo en vivo, comparativa honesta y SEO.
- **Audiencia:** dos perfiles. (1) Usuarios de GoatCounter que quieren una
  interfaz de consulta más amable, sobre todo perfiles de marketing, sin
  renunciar a la privacidad ni al control de datos. (2) Desarrolladores
  self-hosters que respetan el stack mínimo del proyecto y valoran que no
  haya backend propio, build ni dependencias.
- **Posicionamiento:** complementario, no sustituto. GoatCounter es el motor;
  goatdash es la vista.
- **Adjetivos comprometidos:** claro, honesto, ligero, vivo.

## Fase 1 · Sistema de diseño (tal como está desplegado)

- **Dirección estética:** patrón app-landing (template "Alice") con paleta
  teal/azul sobre blanco frío. Estructura: nav fija, hero a dos columnas con
  mockup del producto, 3 cards de principios, 2 bloques alternados, grids de
  features 6+6, banda de contadores honestos, slider de capturas, matriz
  comparativa, pricing de una tarjeta gratis, instalación, FAQ, footer.
- **Tipografía:** display **Exo** (700/800, letter-spacing -0.02em) para
  titulares y cifras destacadas; body **Space Grotesk** 400/500/600;
  **JetBrains Mono** para datos, rangos, chips y código. Tres familias
  cargadas desde Google Fonts (se sabe, es un punto pendiente de dieta).
- **Color (tokens RGB en `:root`, semánticos por tema):**
  - Claro: fondo `#fafbfd`, superficie `#ffffff`, texto `#17202a`,
    secundario `#525f6e`, acento dato teal `#0e7490`, acento marca azul
    `#2b5884`, borde `#e1e7ef`.
  - Oscuro: fondo `#0f1419`, superficie `#161d24`, acento dato `#2dd4bf`,
    acento marca `#7eb2e0`, borde `#2a353f`.
  - **Regla de contraste (fix #43):** todo elemento con fondo
    `--accent-brand` usa texto `rgb(var(--accent-fg))` (blanco en claro,
    `#0f1419` en oscuro, 8.1:1). Nunca `#fff` fijo: en oscuro daba 2.25:1.
  - Los iconos de features/cards usan una paleta de 6 colores fijos
    (`#2b5884, #0e7490, #7c3aed, #db2777, #059669, #0891b2`). Es una
    decisión heredada del template, documentada aquí como deuda: el sistema
    ideal reduce a los dos acentos.
- **Espaciado:** secciones 96px (64px en móvil), radios 8-14px, una sombra
  base + sombras de color en iconos.
- **Signature move:** el **panel de cifras vivo** del hero: mini-dashboard
  con contadores que cuentan al entrar, gráfica de barras SVG que se dibuja
  sola y dot de "datos vivos" parpadeante. Etiquetado como "Datos de demo ·
  30 días" (el mock del navegador muestra `demo.goatdash.cloudless.club`).
  Se reimprime en el footer como strip mono, también etiquetado como datos
  de demo. El ticker de frescura ("actualizado hace Ns") se retiró (fix
  #43): contaba segundos sobre cifras estáticas.
- **Adapter:** CSS custom properties, sin build.

## Fase 2 · Craft

- **Nav:** logo, 5 enlaces de sección (Funciones/Capturas/Comparativa/
  Precio/FAQ), select ES/EN, toggle de tema, CTA demo. En <900px los
  enlaces viven en un panel desplegable con hamburguesa (`#navToggle`,
  aria-expanded, Esc cierra y devuelve el foco, click en enlace cierra);
  en <640px el CTA demo de la nav se oculta (el hero tiene el suyo).
- **Botones:** primario (fondo marca, texto `--accent-fg`), ghost (borde).
  Focus-visible global (outline 2px marca, offset 2px), skip-link.
- **Estados honestos:** botón Copiar con tres estados i18n
  (`Copiar` / `Copiado ✓` transitorio / `No se pudo copiar`), portapapeles
  con `.catch` y fallback `execCommand` verificado.
- **Slider/lightbox:** flechas + miniaturas con aria-label i18n, lightbox
  con Esc, flechas, click en fondo y foco devuelto.
- **Tabla comparativa:** `min-width 480px` dentro de un scroll horizontal
  con gradiente-pista a la derecha (`.table-scroll.scrollable`) que
  desaparece al llegar al final (`.at-end`).
- **Instalación:** codebox con botón Copiar; en <640px el comando se parte
  (`pre-wrap`) en vez de desbordar.
- **Motion:** reveals al scroll SOLO con JS (gate `html.js`: sin JavaScript
  nada queda en `opacity:0`), contadores, barras que crecen, tilt del mock
  en puntero fino, partículas del hero (14, paleta de 6). Todo congelado
  con `prefers-reduced-motion`.
- **Iconografía:** lucide inline (stroke 1.75-2).
- **Imágenes:** 16 capturas WebP reales del dashboard (4 vistas × es/en ×
  light/dark) servidas por idioma+tema.
- **Accesibilidad:** contraste AA en ambos temas (incluido el fix del CTA
  oscuro), un `<h1>`, aria-labels traducidos vía `data-i18n-aria`,
  teclado operable.

## Fase 3 · Deuda conocida (no tocar sin decisión)

- Gradiente rosa `rgba(219,39,119,.08)` en el hero y arcoíris de 6 colores
  en iconos: restos del template; la depuración de identidad queda en
  pasas futuras (decisión del usuario 10-Sep-2026: mantener teal).
- Rebotes `cubic-bezier(0.22,1.4,...)` en entradas del hero (el detector
  los marca; el antiguo doc decía "sin bounce": ya no aplica).
- 3 familias tipográficas cargadas; line-length de párrafos lead hasta
  ~170 chars en desktop ancho.

## Cambios

- 10-Sep-2026: fix bundle #43 (contraste CTA oscuro con `--accent-fg`,
  botón Copiar honesto, menú móvil, aria-labels i18n, etiquetado demo en
  footer y mock, sin ticker, reveals gated por `.js`, claves i18n muertas
  fuera, pista de scroll en la tabla, codebox responsive). Reescritura de
  este DESIGN.md al sistema real (teal/Exo).
- 17-Ago-2026: rediseño al patrón de app-landing (Alice): mockup del hero,
  blocks alternados, contadores, pricing gratuito, nav con Precio/FAQ.
- 16-Ago-2026: creación (sistema ámbar/papel, sustituido después).
