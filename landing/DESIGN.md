# DESIGN.md — landing de goatdash (goatdash.cloudless.club)

Landing de producto del dashboard goatdash, el visor ligero y privado para
GoatCounter. Estática sin build (HTML+CSS+JS puro), i18n ES/EN por navegador,
tema claro/oscuro. Vive en `landing/` dentro del repo `gnacho/goatdash`.

## Fase 0 · Descubrimiento

- **Artefacto:** landing de producto self-hosted (herramienta de analítica),
  con demo en vivo, comparativa honesta y SEO.
- **Audiencia:** dos perfiles. (1) Usuarios de GoatCounter que quieren una
  interfaz de consulta más amable, sobre todo perfiles de marketing, sin
  renunciar a la privacidad ni al control de datos. (2) Desarrolladores
  self-hosters que respetan el stack mínimo del proyecto y valoran que no
  haya backend propio, build ni dependencias.
- **Posicionamiento:** complementario, no sustituto. GoatCounter es el motor
  (genial, ligero, respetuoso con la privacidad); goatdash es la vista. La
  landing respeta y celebra el stack técnico de GoatCounter y explica por qué
  goatdash existe como capa de consulta.
- **Adjetivos comprometidos:** luminoso, claro, honesto, ligero, vivo.

## Fase 1 · Sistema de diseño

- **Dirección estética:** "Analítica luminosa". El dato protagonista: una
  gráfica viva en el hero con números que cuentan, heredera del dashboard
  real. Fondo claro cálido (papel luminoso, sin crema pastel), acento cálido
  ámbar para los datos en vivo, azul oscuro de marca para enlaces y acentos
  técnicos. Nada de blobs ni degradados índigo.
- **Tipografía:** display **Space Grotesk** (h1 hasta clamp(2.8rem,7vw,5rem),
  letter-spacing negativo) + body Space Grotesk 400/500 + **JetBrains Mono**
  para cifras, rangos y código. Coherente con la casa (cloudless, easyzfs).
- **Color:** 
  - Claro (luminoso, cálido): fondo `#faf7f2`, superficie `#fffdf9`, texto
    `#1f1b16`, secundario `#5f584e`, acento dato **ámbar `#c2571a`** (AA ≥4.5:1),
    acento marca azul `#2b5884`, borde `#e4dccb`.
  - Oscuro (noche azulada, diseñado no invertido): fondo `#0f1419`,
    superficie `#161d24`, texto `#eef2f5`, secundario `#a8b4bf`, acento dato
    `#e88a4a`, acento marca `#7eb2e0`, borde `#2a353f`.
  - **Acento de dato vs acento de marca:** el ámbar es para cifras/gráficos
    vivos (visitantes, contadores); el azul es para enlaces y CTAs. Dos roles
    diferenciados, nunca compiten en el mismo elemento.
- **Espaciado:** base 4px. Secciones generosas (96-120px), compacto dentro de
  grupos.
- **Radio:** bajo (máx 10px en tarjetas, 8px en chips). Una sola sombra
  definida suave (borde, no doble difuminado).
- **Signature move:** el **panel de cifras vivo** del hero: un mini-dashboard
  con las métricas demo de goatdash (visitantes únicos, páginas vistas,
  mapa/lenguas) cuyos números cuentan al entrar y una **gráfica de barras SVG
  que se dibuja sola**, más un puntero de "actualizado hace Xs" parpadeante.
  Es la esencia del producto: la analítica que respira. Se reimprime en el
  footer como strip de métricas mono.
- **Adapter:** CSS custom properties (tokens RGB, patrón de la casa), sin
  build.

## Fase 2 · Craft

- **Layout:** una columna centrada (max-width ~64rem) con secciones apiladas;
  hero a dos columnas (texto + panel vivo) en desktop, apilado en móvil.
  Comparativa en tabla por bloques, lado honesto al final.
- **Estado de componentes:** botones con hover/focus visible; slider con
  flechas + miniaturas clicables y `aria-label`; toggle tema e idioma.
- **Motion:** reveal sutil al scroll (IntersectionObserver), contadores,
  dibujado de la gráfica, parpadeo del freshness. Respeto estricto de
  `prefers-reduced-motion` (todo congelado). Sin bounce.
- **Iconografía:** lucide inline (stroke 1.75), coherente con la casa.
- **Imágenes:** capturas REALES del dashboard goatdash (16 WebP: 4 vistas
  × es/en × light/dark), servidas por slider con idioma+tema.
- **Dark mode:** noche azulada diseñada (no invertida), tokens semánticos.
- **Accesibilidad:** contraste AA en ambos temas, un solo `<h1>`, `aria-label`
  en controles, teclado operable, `prefers-reduced-motion`.

## Fase 3 · Slop-audit

- Sin Inter/Roboto/Arial como fuente principal (Space Grotesk + JetBrains Mono).
- Sin degradados índigo/violeta, sin gradientes en titulares.
- Sin "hero + 3 cards + testimonios" genérico: la estructura es hero con panel
  vivo, por qué existe, pilares, funcionalidades, capturas, comparativa
  honesta, instalación, acerca de.
- Sin glassmorphism, sin blobs decorativos, sin stock.
- Firma única: panel de cifras vivo con gráfica que se dibuja.

## Cambios

- 16-Ago-2026: creación.
