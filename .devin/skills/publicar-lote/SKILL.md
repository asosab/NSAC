---
name: publicar-lote
description: Publica en el diario y la galería de NSAC los lotes que llegan por WhatsApp a inbox/. Filtra contenido indebido, redacta el post del día, alimenta _data/galeria.yml, actualiza OG y commitea. Úsalo cuando dispare el puente del grupo «Diario NSAC» o cuando el usuario pida procesar el inbox.
---

# Publicar lotes del inbox

El monitor WhatsApp vuelca lotes a `inbox/lote-<epoch>/` con
`mensajes.json` (`[{ts, de, tipo, texto, archivo}]`) y la media copiada.
Trabajas en este repo Jekyll (GitHub Pages). Lee `AGENTS.md` primero.

## Pasos

1. Lista los `inbox/lote-*/` sin marca `.hecho`, en orden.
2. Por cada lote, aplica el **filtro** (obligatorio): solo material
   respetuoso y dentro de `docs/conducta-space-apps.md`. Nada de acoso,
   burla, desnudez, datos privados, spam ni suplantación. Lo rechazado se
   anota en `.omitidos` del lote con el motivo. Si todo se rechaza,
   marca `.hecho` y pasa al siguiente sin commit.
3. **Diario**: reescribe los textos en primera persona y castellano con
   la voz de los posts existentes (lee uno antes). Crea o edita
   `_posts/YYYY-MM-DD-slug.md` (fecha en hora Bolivia, UTC-4;
   `layout: post`, `title`, `description`). Si ya hay post del día, anexa
   una sección `##` con la hora — nunca dupliques contenido ya escrito.
4. **Fotos**: nómbralas por hash de contenido
   `assets/img/galeria/YYYY-MM-DD-<sha1[:8]>.<ext>` — así un reenvío o una
   corrida repetida produce el mismo nombre y nada se duplica. Antes de
   agregar a `_data/galeria.yml` (`fotos:` con `src`, `alt`, `pie`
   opcional) verifica que ese `src` no exista ya en el YAML. Videos
   locales solo < 25 MB. Las imágenes que ilustran el post se copian
   también a `assets/img/diario/` con el mismo criterio.
5. **Videos YouTube**: `videos:` en `_data/galeria.yml` = videos del canal
   `https://www.youtube.com/@asosab` con `#nasa` en título o descripción
   (usa `yt-dlp --flat-playlist --dump-single-json "@asosab/videos"` o el
   feed del canal). `id` + `titulo`, sin duplicar.
6. Marca cada lote con `inbox/lote-<ts>/.hecho`.
7. **OG**: regla de `AGENTS.md` — actualiza `description`/`og:description`/
   `twitter:description` al estado del evento; regenera `og-cover.jpg` si
   el entorno lo permite.
8. `git add -A`, commit breve en minúsculas (estilo del repo), push a
   `master`.

## Cierre verificado

Antes de dar por terminado el turno:

- `git log -1` muestra tu commit y `git status` queda limpio (salvo
  `inbox/` que está ignorado).
- Cada lote tiene `.hecho` — sin excepción, así todo se haya rechazado.
- Si algo falló a medias, deja la causa en `inbox/lote-<ts>/devin-nota.md`
  y el repo sin cambios parciales (`git checkout` / `git stash` si hace
  falta). Un lote sin `.hecho` y sin nota se reintentará en la próxima
  corrida — no dejes trabajo a medias.

## Límites del turno

- Ve directo al trabajo: lee `AGENTS.md`, este skill, `mensajes.json` y
  los textos de `docs/conducta-space-apps.md`; no recorras skills ni
  explores el repo más allá de lo necesario.
- Un turno tiene ~30 min de vida y se mata si pasa ~12 min sin emitir
  nada: no te pongas a mejorar código ajeno ni a dejar todo perfecto —
  procesa, verifica, commitea, cierra.

## Reglas duras

- **Nada se publica dos veces**: nombres por hash + chequeo de `src` en el
  YAML + anexar sin duplicar en el post del día.
- En duda sobre el filtro, omite el material.
- No inventes hechos: el diario cuenta solo lo que llegó al grupo.
- `inbox/` no se commitea (`.gitignore`); `.hecho`/`.omitidos` son locales.
- Nada de force-push ni de tocar la escena 3D ni `docs/`.
- Si algo falla: nota en `inbox/lote-<ts>/devin-nota.md`, sin commit
  parcial.
