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
  `humanamente` (`.devin/skills/`).

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

- Contenido del sitio: `_posts/`, `_data/`, `diario/`, `galeria/`, `assets/`.
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
