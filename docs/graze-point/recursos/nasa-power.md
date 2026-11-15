---
type: recurso
status: catalogado
created: 2026-11-14
dominio: [clima, precipitacion, humedad-suelo, radiacion]
cobertura: global
acceso: api-abierta
resolucion: "0.5°×0.625°"
revisit: "diario (rezago ~2-7 días)"
tags: [graze-point, recurso, nasa, integrado]
---

# NASA POWER — agroclimatología por API

API JSON sin auth: temperatura, humedad, radiación, lluvia corregida
(PRECTOTCORR), humedad de suelo modelada (GWETTOP/ROOT/PROF) y
climatología mensual multianual. Comunidad AG para agro.

**Para GrazePoint:** ya es la columna vertebral
(`backend/services/power.js`). `daily` alimenta el estado actual de la
ficha; `climatology` da la ventana de siembra y el ajuste de especies
por lluvia anual. Caché en memoria 6 h por coordenada redondeada.

**Se cruza con:** todo. Es el reemplazo rápido de [[era5]] (menos
resolución, sin cola), se valida contra [[gpm-imerg]] (lluvia medida),
[[smap]] (humedad medida) y [[prism]]/[[cocorahs]] en el análogo EEUU.

**Acceso:** GET directo, timeout ya configurado. Fuente primaria del
router para clima; si cae, fallback [[era5]]/[[nldas-gldas]].
