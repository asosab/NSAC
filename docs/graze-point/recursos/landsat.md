---
type: recurso
status: catalogado
created: 2026-11-14
dominio: vegetacion
cobertura: global
acceso: portal-earthdata
resolucion: "30 m"
revisit: "16 días (8 combinando L8/L9)"
tags: [graze-point, recurso, usgs]
---

# Landsat — reflectancia e índices de vegetación

Reflectancia corregida de superficie a 30 m; de ahí salen NDVI, EVI,
suelo desnudo y transiciones de temporada. Serie histórica desde 1984:
la memoria de qué se sembró en cada parcela.

**Para GrazePoint:** historial de cultivo por parcela («qué hubo aquí
antes», input del recomendador), vigor forrajero entre aforos, detección
de barbecho.

**Se cruza con:** [[sentinel-2]] (misma banda espectral, más resolución),
[[modis-viirs]] (menos detalle, más frecuencia), [[naip]] (solo EEUU,
1 m), [[cropscape-cdl]] (clasificación ya hecha).

**Acceso:** [[earthexplorer]] y Earthdata; escenas descargables.
También vía STAC (Microsoft Planetary Computer, sin login) — camino
rápido para NDVI en caliente.
