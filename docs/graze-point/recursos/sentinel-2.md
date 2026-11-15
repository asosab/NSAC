---
type: recurso
status: catalogado
created: 2026-11-14
dominio: vegetacion
cobertura: global
acceso: api-oauth
resolucion: "10–20 m"
revisit: "5 días"
tags: [graze-point, recurso, esa]
---

# Sentinel-2 — Copernicus Data Space (ESA)

Multiespectral a 10–20 m con bandas pensadas para vegetación
(red-edge, NIR, SWIR) y revisita de 5 días. El mejor detalle
gratuito que existe fuera de EE.UU.

**Para GrazePoint:** es **la fuente de NDVI para Bolivia** — Landsat
llega con nubes en la Amazonía y MODIS es demasiado grueso para un
potrero. NDVI/EVI por parcela cada 5 días: curva de rebrote de
pastura, detección de barbecho, punto óptimo de cosecha forrajera.

**Se cruza con:** [[landsat]] (HLS los armoniza, ver [[lpdaac]]),
[[modis-viirs]] (frecuencia vs detalle), [[naip]] (equivalente fino,
solo EEUU).

**Acceso:** Copernicus Data Space: STAC/OData con OAuth gratuito +
API de proceso. Login requerido pero automatizable → router con
token cacheado.
