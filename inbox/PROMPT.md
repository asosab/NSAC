# Publicación desde WhatsApp — grupo «Diario NSAC»

Eres la sesión que vuelca al sitio lo que llega al grupo de WhatsApp
«Diario NSAC» durante el hackathon. Trabajas en este repo (Jekyll en
GitHub Pages). Lee `AGENTS.md` antes de tocar nada.

## Entrada

En `inbox/` hay carpetas `lote-<epoch>/`. Cada una trae:

- `mensajes.json` — `[{ts, de, tipo, texto, archivo}]`; `archivo` es la
  ruta del adjunto dentro del mismo lote (puede faltar).
- los archivos de media copiados junto al lote.

Procesa todos los lotes sin marca `.hecho`, en orden de fecha.

## Filtro (obligatorio, antes de publicar)

El grupo puede traer contenido de terceros o enviado por error. Solo
publica material respetuoso y dentro de las normas de conducta del evento
(`docs/conducta-space-apps.md`): nada de acoso, burla, desnudez, datos
privados, spam ni suplantación. Si un mensaje o archivo no cumple, no lo
uses y anótalo en `.omitidos` del lote con el motivo. Si todo el lote se
rechaza, marca `.hecho`, registra por qué y termina sin commit.

## Qué hacer con el material aceptado

1. **Diario**: el texto es borrador del autor. Reescríbelo en primera
   persona y castellano, con la voz de los posts existentes (lee uno
   antes). Crea o edita `_posts/YYYY-MM-DD-slug.md` con la fecha del día
   en hora de Bolivia (UTC-4), `layout: post`, `title` y `description`
   cortos. Si ya hay post de ese día, anexa una sección `##` nueva con la
   hora. Las imágenes del post van en
   `assets/img/diario/YYYY-MM-DD-<n>.<ext>` y se referencian con
   `{{ '/assets/img/diario/…' | relative_url }}`.
2. **Galería de fotos**: copia cada foto aceptada a
   `assets/img/galeria/YYYY-MM-DD-<n>.<ext>` (mismo nombre que en el
   diario) y agrégala en `_data/galeria.yml` bajo `fotos:` con `src`
   absoluto (`/assets/img/galeria/…`), `alt` descriptivo y `pie` opcional.
   Videos cortos locales solo si pesan menos de 25 MB; si no, omítelos.
3. **Videos de YouTube**: actualiza la sección `videos:` de
   `_data/galeria.yml` con los videos del canal
   `https://www.youtube.com/@asosab` que lleven `#nasa` en título o
   descripción (usa `yt-dlp --flat-playlist --dump-single-json` sobre
   `@asosab/videos`, o el feed del canal). Cada entrada: `id`, `titulo`.
   No dupliques.
4. Marca cada lote procesado creando `inbox/lote-<ts>/.hecho`.
5. **OG y descripciones**: sigue la regla SEO de `AGENTS.md` — durante el
   evento los textos van «en curso, quedan N horas para el cierre». La
   regeneración de `og-cover.jpg` pide captura con navegador; si el
   entorno no lo permite, actualiza al menos los textos.
6. `git add -A`, commit con mensaje breve en minúsculas (estilo del repo)
   y `git push` a `master`.

## Reglas duras

- En duda sobre el filtro, omite el material: es preferible perder una
  foto que publicar algo indebido.
- No inventes hechos ni completes con datos que no llegaron al grupo.
- `inbox/` no se commitea (está en `.gitignore`); los `.hecho`/`.omitidos`
  quedan solo en local.
- Nada de force-push, ni borrar posts, ni tocar `docs/` ni la escena 3D.
- Si algo falla, deja constancia en `inbox/lote-<ts>/devin-nota.md` y
  termina sin commit parcial.
