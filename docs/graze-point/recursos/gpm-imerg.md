---
type: recurso
status: catalogado
created: 2026-11-14
dominio: precipitacion
cobertura: "global (60°S–60°N)"
acceso: earthdata
resolucion: "0.1°"
revisit: "30 min"
tags: [graze-point, recurso, nasa]
---

# GPM / IMERG — Global Precipitation Measurement

Estimación satelital de tasa y acumulado de lluvia. IMERG corre cada
30 min con rezagos Early (~4 h), Late (~14 h) y Final (~3.5 meses,
calibrado con pluviómetros).

**Para GrazePoint:** lluvia casi-real para detectar si una ventana de
siembra recibió la lluvia esperada; frecuencia de tormentas extremas y
riesgo de erosión; valida el PRECTOTCORR de [[nasa-power]]. Las capas
Worldview de IMERG se bajan como imagen lista para el informe.

**Se cruza con:** [[nasa-power]], [[cocorahs]] (validación terrestre,
solo Norteamérica), [[era5]], [[prism]] (normales), [[nldas-gldas]].

**Acceso:** Earthdata/GES DISC (login). Ráster pesado → precarga o
snapshot Worldview, no consulta por pixel en vivo.
