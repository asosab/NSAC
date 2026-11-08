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

## Diseño

- Dirección `name-as-monument` (design-taste-frontend): Chivo 900, carbón
  `#1c1c1c` + salvia `#8fa68e`. Toda tarea de UI carga esa skill y pasa su gate
  (`lint.mjs` + `inspect.mjs`), corre desde la raíz del repo (`.taste-skill/`
  está en `.gitignore`).

## SEO

- `index.html` lleva OG, Twitter Cards, canonical, geo, JSON-LD
  (Event + Person + WebSite). `sitemap.xml` y `robots.txt` propios.
- OG image: `assets/img/og-cover.jpg` (captura del hero). **Antes de cada
  commit** se regenera — junto con `imagen/nsac.jpg` (tarjeta del proyecto
  en asosab.github.io) — con una captura del hero en viewport de celular
  (390×844): planeta a la izquierda, cuenta completa y legible a la
  derecha. Las dimensiones reales van en `og:image:width/height`.
- `description`, `og:description` y `twitter:description` llevan el tiempo
  restante en palabras («Faltan N días…» hacia el sábado 14, 9:00 hora de
  Bolivia) y se refrescan con la OG image. Pasado `T1` cambian a pasado:
  «el hackathon fue el 14 y 15 de noviembre de 2026…».
