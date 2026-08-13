# goatdash

<p align="center">
  <a href="README.es.md">Español</a> |
  <a href="README.md">English</a>
</p>

<p align="center">
  <a href="https://stats.cloudless.club"><img alt="Demo en vivo" src="https://img.shields.io/badge/live%20demo-stats.cloudless.club-2b5884"></a>
  <a href="LICENSE"><img alt="Licencia: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/hero-es-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero-es-light.png">
    <img alt="Dashboard de goatdash con la vista principal: cinco tarjetas de KPI, el gráfico de tráfico y la tarjeta de referencias" src="assets/hero-es-light.png" width="800">
  </picture>
</p>

goatdash es un dashboard respetuoso con la privacidad para la analítica de [GoatCounter](https://www.goatcounter.com/). Funciona entero en el navegador como JavaScript plano: sin framework, sin CDN, sin paso de build, solo unos pocos ficheros estáticos que hablan con la API v0 de GoatCounter. Empezó como un rewrite de [abhishekhsingh/goatcounter-dashboard](https://github.com/abhishekhsingh/goatcounter-dashboard) (MIT) y creció hasta ser un dashboard multi-sitio para varias landings servidas desde un solo dominio.

## ¿Por qué existe esto?

Mantengo un puñado de proyectos open source autohospedados, cada uno con su landing (cloudless.club y cinco apps: deltos, easyzfs, keynest, netpulse, helios). Quería analítica a juego con ese montaje: en casa, ligera, sin cuenta en la nube y con el mismo estilo visual que las landings. GoatCounter era el backend evidente, un binario pequeño con SQLite y una API v0 que cubre todo. Lo que faltaba era el frontend.

El goatcounter-dashboard de Abhishekh Singh tenía exactamente el layout que quería, pero cargaba React, Recharts y Babel desde un CDN. Para una página que solo lee una API JSON me pareció un peso innecesario, así que lo reescribí en vanilla JS con mis propios tokens, le añadí ES/EN y un modo demo, y después vino la parte que originó todo esto: el multi-sitio. La API v0 de GoatCounter resuelve el sitio solo con el header Host, cosa que se rompe detrás de un reverse proxy donde todos los sitios llegan con el mismo Host. Parcheé GoatCounter para que acepte un header `X-Goatcounter-Site` y lo propuse aguas arriba en el [PR #915](https://github.com/arp242/goatcounter/pull/915). goatdash es lo que me quedó, y desde agosto de 2026 está midiendo todo el hub.

## ¿Por qué este stack?

- **Vanilla JS, sin framework, sin CDN**: el original cargaba React, Recharts y Babel desde unpkg. Para una página que lee una API JSON y pinta un par de gráficas, ese es peso que no necesita. Cinco ficheros estáticos, nada que compilar, nada que se rompa cuando un CDN cambia de versión.
- **Sin backend propio**: goatdash habla con la API de GoatCounter directamente desde el navegador. No hay servidor que parchear, ni base de datos que respaldar, ni servicio que mantener vivo. Desplegar es copiar ficheros.
- **GoatCounter como backend**: un único binario ligero con SQLite, privacy-first por diseño y trivial de autohospedar. La API v0 ya expone todo lo que muestra el dashboard: totales, páginas, referrers, navegadores, sistemas, tamaños, ubicaciones, idiomas y campañas.
- **Un patch pequeño para el multi-sitio**: la API v0 solo resuelve el sitio con el header Host, así que detrás de un reverse proxy todos los sitios parecen el mismo. El header `X-Goatcounter-Site` lo arregla y está propuesto aguas arriba. Hasta que se acepte, el multi-sitio necesita un GoatCounter compilado desde la rama parcheada.
- **Lo que descarté**: un backend propio (otra cosa que mantener), un producto SaaS de analítica (los datos vivirían en el servidor de otro), o el stack React del original (excesivo para esto).

## Características

- **Dashboard multi-sitio**: barra lateral con la cuenta y sus subsitios desde `/api/v0/sites`, conmutados con el header `X-Goatcounter-Site`. También funciona con un solo sitio, sin patch.
- **Cinco tarjetas de KPI**: visitantes únicos (con tendencia vs el periodo anterior), páginas vistas, página principal, rutas rastreadas y total de eventos.
- **Referrers principales por canal**: referrers globales agrupados en directo, buscadores, campañas y otros sitios, con drill desde cada referrer a las páginas que trajo.
- **Drill en cada tarjeta**: de páginas a sus referrers, de navegadores/sistemas/dispositivos a versiones, de países a regiones, de campañas a sus URLs de referrer.
- **Mapa mundial coroplético**: países sombreados por visitas con escala de raíz cuadrada para que los mercados pequeños sigan visibles, tooltips y leyenda con degradado.
- **Rangos flexibles**: hoy, 7d, 30d, 90d o un rango personalizado con fecha de inicio y fin.
- **Tema e idioma**: oscuro, claro o auto (sigue `prefers-color-scheme`), y UI en ES/EN/Auto, todo persistido en localStorage.
- **Modo demo**: un clic carga el dashboard completo con datos de ejemplo realistas, sin necesidad de API key.
- **Respeto a la API**: caché de respuesta de 60 segundos, cola de peticiones estrictamente secuencial con 500 ms entre llamadas, reintento por tarjeta e indicador de "actualizado hace Xs".

## Capturas

**Referencias: principales referrers agrupados por canal con drill**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/screenshot-referrers-es-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/screenshot-referrers-es-light.png">
  <img alt="Tarjeta de referencias con los canales Directo, Buscadores, Campañas y Otros sitios, cada uno con sus principales referrers" src="assets/screenshot-referrers-es-light.png" width="800">
</picture>

**Países: mapa mundial y lista de países principales**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/geo-es-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/geo-es-light.png">
  <img alt="Mapa mundial coroplético sombreado por número de visitas junto a la lista de países principales" src="assets/geo-es-light.png" width="800">
</picture>

## ¿Qué debes esperar?

Es un proyecto personal que uso a diario, no un producto. Sigue siendo MIT y contesto issues y PRs a mi ritmo, sin SLA. El patch del header para multi-sitio está propuesto aguas arriba y puede tardar en entrar; hasta entonces, el multi-sitio requiere un GoatCounter compilado desde la rama parcheada. Con colaboraciones o apoyo quizás podría crecer más rápido, pero no puedo prometer nada.

## Instalación

No hay script de instalación ni nada que compilar: goatdash son unos pocos ficheros estáticos. Ponlos en cualquier host estático y abre la página.

```sh
# Prueba en local
python3 -m http.server 8000
# abre http://localhost:8000
```

La instancia en vivo de [stats.cloudless.club](https://stats.cloudless.club) funciona igual: nginx sirve los ficheros y proxya la API de GoatCounter por el mismo origen, así no hay CORS de por medio. Un server block mínimo:

```
server {
  listen 80;
  server_name stats.example.com;

  root /var/www/goatdash;
  index index.html;

  location /api/ {
    proxy_pass http://127.0.0.1:8080;   # tu GoatCounter
    proxy_set_header Host $host;
  }
}
```

Requisitos: cualquier servidor web estático y una instancia de GoatCounter con la API v0 accesible por HTTPS. Sin Docker, sin Node, sin herramientas de build.

## Configuración

goatdash no tiene fichero de configuración. En la primera carga, la pantalla de conexión pide dos cosas:

- la **URL de GoatCounter** de tu sitio (por ejemplo `https://stats.cloudless.club`),
- una **API key** creada en GoatCounter en tu usuario, pestaña Settings, sección API, con al menos permisos de Count y Read statistics.

Ambas se guardan en el localStorage del navegador y solo viajan a tu instancia de GoatCounter por HTTPS. El tema, el idioma, el sitio seleccionado y el rango se persisten igual.

### Multi-sitio y el header X-Goatcounter-Site

Para varios sitios en una misma cuenta de GoatCounter, el dashboard necesita que el backend distinga los sitios. La API v0 solo resuelve el sitio con el header Host, que detrás de un reverse proxy es siempre el mismo. goatdash envía un header `X-Goatcounter-Site` con el nombre del sitio en cada petición a la API; GoatCounter tiene que aceptarlo para que funcione el modo multi-sitio.

Ese header está implementado en un [fork de GoatCounter](https://github.com/gnacho/goatcounter) y propuesto aguas arriba en el [PR #915](https://github.com/arp242/goatcounter/pull/915). Hasta que se acepte, compila GoatCounter desde la rama `feat/site-select` para usar goatdash con varios sitios. Sin el patch, goatdash funciona igual de bien con un solo sitio, el que coincide con el header Host.

## Uso

Abre la página y pulsa **Probar demo** para explorarla con datos de ejemplo, o introduce tu URL de GoatCounter y tu API key para conectar. La barra lateral lista la cuenta y sus subsitios, el control segmentado cambia entre hoy/7d/30d/90d/personalizado, y el menú de engranaje guarda actualizar, tema, idioma y desconectar.

Pulsa casi cualquier cosa para hacer drill: una página muestra sus referrers, un referrer muestra las páginas que trajo, un navegador muestra versiones, un país muestra regiones, una campaña muestra sus URLs. El menú de actualizar limpia la caché y vuelve a pedirlo todo.

## Desarrollo

goatdash es HTML, CSS y JavaScript planos. Sin package.json, sin bundler, sin harness de tests en el repo; los datos de demo viven en `fixtures.js` y reflejan la forma real de las respuestas de la API.

```sh
# Sirve el repo y abre http://localhost:8000
python3 -m http.server 8000
```

Los datos del mapa mundial en `assets/world-map.js` son un asset generado que se conserva del proyecto original; el generador vive aguas arriba en la carpeta `scripts/` de abhishekhsingh/goatcounter-dashboard y solo hay que ejecutarlo cuando cambie el dataset de países.

## Agradecimientos

goatdash no se vería como se ve sin el [goatcounter-dashboard de Abhishekh Singh](https://github.com/abhishekhsingh/goatcounter-dashboard) (MIT): el layout, el patrón de drill y la idea del modo demo vienen de allí. El asset del mapa mundial (`assets/world-map.js`) se conserva tal cual de ese proyecto. El resto es un rewrite limpio en vanilla, pero la referencia merece el crédito.

## Licencia

MIT, ver [LICENSE](LICENSE). El LICENSE conserva el aviso de copyright original del goatcounter-dashboard de Abhishekh Singh, sobre el que se construye goatdash.

Construido por gnacho como proyecto personal autohospedado; issues y PRs son bienvenidos.
