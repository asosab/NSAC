---
type: moc
status: activo
created: 2026-11-06
tags: [indice]
---

# NSAC — vault

Sitio del proyecto para el NASA Space Apps Challenge 2026. La raíz del repo es
el vault; `docs/` no se publica (está en `exclude`).

## Sesiones

- [[2026-11-06]] — creación del repo, diseño y primera versión de la landing
- [[2026-11-07]] — aterrizaje calibrado sobre Bolivia (arriba al centro) y cuenta a la derecha en móvil
- [[2026-11-08]] — reloj del sitio anclado a UTC-4: misma cuenta, rotación y aterrizaje en cualquier zona horaria
- [[2026-11-11]] — reto elegido (Field Shift) y equipo «elay puej» creado; post y OG frescos

## Notas

- [[conducta-space-apps]] — normas de comportamiento del evento (filtro de publicación del puente WhatsApp)
- [[reto-planet-x-spherex]] — estudio del reto Planet X and SPHEREx: datos, recursos para cruzar y análisis para variables raras

## Field Shift (reto elegido)

Investigación orquestada 2026-11-11, carpeta `docs/field-shift/`:

- [[00-plan]] — encargo, orquestación por agentes y datasets sugeridos del reto
- [[fuentes-suelo-global]] — fuentes de suelo/subsuelo mundial (sin servicios chinos)
- [[datos-agro-bolivia-venezuela]] — datos de siembra BO (+VE comparativo) y mejor país (EE.UU.)
- [[datos-nasa-suelo]] — catálogo NASA/DAAC para suelo, agua y cultivos
- [[bolivia-cultivos-regiones]] — qué se cultiva dónde, suelos, climas, calendario, ZAE
- [[analogos-mundiales]] — espejos edafoclimáticos de cada zona boliviana
- [[comparativa-cultivos-potenciales]] — cultivos ausentes en BO con extracción NPK y ciclos
- [[catalogo-nutricional-ciclos]] — producción BO por nutrición y velocidad de cosecha
- [[arquitectura-datos]] — síntesis: cruce en caliente vs precargado vs backend (con verificaciones en vivo y precarga hecha en `.tmp/field-shift-data/`)
- [[fundacion-patino]] — aliado potencial: proyectos agro, fit con el reto, fichas de contacto y guion de entrevista (con cifras de sus informes anuales)
- [[top10-enfoques-patino]] — 10 enfoques del reto rankeados que extienden el trabajo de la Fundación

## Notas rápidas

- El sitio vive en `asosab.github.io/NSAC` (project page de este repo).
- La escena del cohete está en `assets/js/planet.js`; los tiempos oficiales del
  evento están ahí como constantes `T0` y `T1`.
- El diario se alimenta de `_posts/`; videos con `{% include youtube.html %}`.
