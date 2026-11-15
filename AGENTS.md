# AGENTS.md — NSAC

Landing + diario para la participación de Alejandro Sosa en el **NASA Space Apps
Challenge 2026** (14–15 de noviembre). Sitio Jekyll servido por GitHub Pages como
project page del repo `NSAC`: **https://asosab.github.io/NSAC/**

## Stack

- Jekyll en GitHub Pages, sin Gemfile ni CI. `baseurl: /NSAC` en `_config.yml`.
- `index.html` es **100% estático** (sin Liquid, sin front matter): se copia
  tal cual y se puede inspeccionar abriéndolo directo en el navegador.
- El resto del sitio (diario, posts) sí usa Liquid: `_layouts/`, `_includes/`.
- Escena 3D: Three.js r147 por CDN (`jsdelivr`) + `assets/js/planet.js`
  (planeta de bloques estilo voxel/Minecraft, cohete, estrellas). Sin build tools.

## El cohete y la cuenta regresiva

En `assets/js/planet.js`:

- `LAUNCH` → `T0` (14 nov, 09:00 local): el cohete desciende hacia Sudamérica
  en proporción al tiempo restante; aterriza cuando la cuenta llega a cero.
- `T0` → `T1` (15 nov, 23:59:59 local): muestra «¡Estamos desarrollando
  software!» y nueva cuenta al cierre; la nave despega gradualmente y desaparece.
- Después de `T1`: la nave no vuelve; el planeta sigue girando solo.
- El planeta es fondo fijo; el scroll orbita la cámara para mostrar más.
- `prefers-reduced-motion`: escena estática, cuenta regresiva sigue viva.

## Diario

- Posts en `_posts/YYYY-MM-DD-slug.md` con `layout: post`; listados en
  `/diario/`. Permalink `/diario/:title/`.
- Videos: `{% include youtube.html id="VIDEO_ID" %}` embebe de youtube.com/@asosab.
- Primera persona, castellano. Toda prosa nueva pasa por el skill
  `humanamente` (`.devin/skills/`) — incluidos textos para pegar fuera
  del sitio (respuestas de foro, mensajes, etc.), que se redactan en
  castellano con la skill y luego se traducen naturales al inglés.
- Los textos en inglés pasan por `humanamente-en` (`.devin/skills/`,
  mismo motor y rúbrica): banco de tics inglés y regla dura — **cero
  em dashes** por defecto, se reemplazan por coma, punto, dos puntos o
  paréntesis.

## Internacionalización (EN + ES)

Sitio bilingüe sin plugins (GitHub Pages): **el inglés es el idioma por
defecto** y vive en la raíz; el español vive en el árbol `/es/`. El
suiche ES/EN va en el nav de todas las páginas
(`_includes/langswitch.html`). Las viejas URLs `/en/` son stubs HTML con
`meta refresh` + canonical hacia la versión de la raíz — no borrarlas.

Regla permanente: **todo texto nuevo que se muestre en el sitio debe
existir en los dos idiomas** (páginas, posts, captions, cadenas de UI,
notas del gafete). Si se agrega algo en un idioma, en el mismo cambio
va su traducción; nada visible queda en un solo idioma.

- Idiomas: `langs: [en, es]` en `_config.yml` con defaults por scope:
  páginas bajo `es/` y posts bajo `_posts/es/` llevan `lang: es`; el
  resto, `en`.
- Cadenas de la interfaz en `_data/i18n.yml` (nav, og:locale, meses para
  fechas ES — `%B` de strftime sale en inglés, por eso existe
  `_includes/fdate.html`).
- `es/index.html` es estático como su par EN; usa rutas `../assets/...`
  y enlaces internos propios (`es/diario/`, `es/galeria/`, `es/gafete/`).
- Posts ES: `_posts/es/` con el **mismo nombre de archivo** que el EN →
  mismo slug → el suiche los empareja solo. Front matter: `lang: es` +
  `permalink: /es/diario/<slug>/` (explícito, no depender del placeholder).
- Cada página declara `hreflang` en/es/x-default (x-default = inglés);
  `og:locale` + `og:locale:alternate` salen de `i18n.yml`.
- Captions de galería: `_data/galeria.yml` lleva `alt`/`pie` (inglés,
  primario) y `alt_es`/`pie_es` (español); el layout serializa
  `NSAC_GALERIA` ya traducido.
- JS (`planet.js`, `cine.js`, `gafete.js`): diccionario interno por
  `document.documentElement.lang`, con EN por defecto — sin pasar
  strings por markup.
- `assets/js/lang.js` (sincrónico en el `<head>` de todas las páginas):
  guarda la elección del suiche en `localStorage` (`nsac-lang`) y, al
  entrar, redirige a la versión alternativa (vía link `hreflang`) si el
  idioma guardado difiere del de la página. No hay autodetección por
  `navigator.language`: solo manda lo que el usuario eligió.

## Pruebas

- Sin Docker ni Jekyll local: se sube a producción y se verifica en
  caliente con Playwright (smoke). Para capturas locales, `index.html`
  y `en/index.html` son estáticos: `python -m http.server` alcanza.

## Puente WhatsApp → diario y galería

- El monitor `D:\proyectos\whatsapp` vigila el grupo «Diario NSAC»,
  empaqueta lotes en `inbox/lote-<ts>/` (`mensajes.json` + media) y dispara
  una sesión Devin local vía driver ACP (`bin/nsac-devin.mjs` allá:
  `devin.exe acp` + `authenticate` con la API key de `credentials.toml`,
  sesión en `D:\proyectos\NSAC`, modo bypass, prompt = `inbox/PROMPT.md`).
- `inbox/PROMPT.md` es el contrato de procesamiento: filtro de decencia +
  normas del evento (`docs/conducta-space-apps.md`), un post por lote,
  fotos a `assets/img/galeria/` + `_data/galeria.yml`, videos `#nasa` de
  YouTube, commit + push, y `.publicado` con la URL del post para que el
  monitor avise por Telegram. Los lotes crudos no se versionan.
- Galería: página `/galeria/` (`layout: default`) alimentada por
  `_data/galeria.yml` (`fotos:` y `videos:`).

## Diseño

- Dirección `name-as-monument` (design-taste-frontend): Chivo 900, carbón
  `#1c1c1c` + salvia `#8fa68e`. Toda tarea de UI carga esa skill y pasa su gate
  (`lint.mjs` + `inspect.mjs`), corre desde la raíz del repo (`.taste-skill/`
  está en `.gitignore`).

## Orden de archivos

La raíz solo admite archivos del sitio y su configuración: `index.html`,
`_config.yml`, `sitemap.xml`, `robots.txt`, `AGENTS.md`, `README.md`. Cualquier
otra cosa tiene un lugar:

- Contenido del sitio: `_posts/` (`_posts/es/` para español), `_data/`,
  `diario/`, `galeria/`, `gafete/`, `en/` (árbol EN), `assets/`.
- Notas y conocimiento del proyecto: `docs/` (vault Obsidian, no se publica).
- Entrada del puente WhatsApp: `inbox/` (`PROMPT.md` + `lote-*`, los lotes no se
  versionan).
- Scripts de un solo uso, salidas de prueba, capturas de depuración, respuestas
  de API guardadas: `.tmp/` (gitignored). Si un script temporal madura y se
  vuelve herramienta, se mueve a `bin/` o a `docs/` según su naturaleza; no se
  queda en `.tmp/` ni en la raíz.

Regla práctica: antes de crear un archivo en la raíz, preguntarse a cuál de
esos dominios pertenece. Ninguno → `.tmp/`.

## SEO

- `index.html` lleva OG, Twitter Cards, canonical, geo, JSON-LD
  (Event + Person + WebSite). `sitemap.xml` y `robots.txt` propios.
- En `_layouts/default.html`, `og:image`/`twitter:image` se resuelven por
  página: `page.image` si existe, si no la **primera `<img>` del contenido
  renderizado** (los posts comparten su primera foto), y si no hay, el
  `og-cover.jpg` general.
- OG image: `assets/img/og-cover.jpg` (captura del hero). **Antes de cada
  commit** se regenera — junto con `imagen/nsac.jpg` (tarjeta del proyecto
  en asosab.github.io) — con una captura del hero en viewport de celular
  (390×844): planeta a la izquierda, cuenta completa y legible a la
  derecha. Las dimensiones reales van en `og:image:width/height`.
- Con cada cambio de código se regenera la OG image **y** los textos
  `description`, `og:description` y `twitter:description`, para que el
  comentario concuerde con el momento del evento: antes de `T0`, «Faltan N
  días / N horas…» hacia el sábado 14, 9:00 (hora de Bolivia); entre `T0`
  y `T1`, «en curso, quedan N horas para el cierre» (domingo 15, 23:59:59);
  después de `T1`, en pasado: «el hackathon fue el 14 y 15 de noviembre
  de 2026…».
