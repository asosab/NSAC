---
type: recurso
status: catalogado
created: 2026-11-14
dominio: [evapotranspiracion, estres-termico]
cobertura: "±53° latitud (órbita ISS)"
acceso: earthdata
resolucion: "~70 m"
revisit: "irregular (1–7 días)"
tags: [graze-point, recurso, nasa]
---

# ECOSTRESS — temperatura de superficie y evapotranspiración

Radiómetro térmico en la ISS. Da LST y ET a ~70 m, resolución de
parcela. Detecta estrés hídrico días antes de que se note en NDVI:
la planta se calienta antes de ponerse amarilla.

**Para GrazePoint:** alerta temprana de estrés en pasturas (el dolor #1
de la Hacienda es forrajero), mapa de microclimas dentro del predio,
contraste con el GWETROOT de [[nasa-power]].

**Se cruza con:** [[openet]] (ET modelada, oeste EEUU), [[smap]]
(causa: sin agua), [[modis-viirs]] (efecto tardío en verdor),
[[landsat]] (misma escala, otra banda).

**Acceso:** Earthdata/AppEEARS; revisita irregular → precarga cuando
pase sobre el predio, no consulta en vivo.
