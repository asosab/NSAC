---
type: recurso
status: catalogado
created: 2026-11-14
dominio: humedad-suelo
cobertura: global
acceso: earthdata
resolucion: "9 km (L3/L4)"
revisit: "2-3 días"
tags: [graze-point, recurso, nasa]
---

# SMAP — Soil Moisture Active Passive

Humedad del suelo superficial (0–5 cm) y estado congelado/descongelado,
global. Productos L3 (radar+radiómetro, ~9 km) y L4 (asimilado, incluye
humedad de raíz). Se distribuye por NSIDC vía Earthdata.

**Para GrazePoint:** valida el GWETROOT de [[nasa-power]] con medición
real; alimenta la ventana de siembra (¿hay humedad suficiente para
germinar?) y el indicador de estrés por sequía de la ficha de parcela.

**Se cruza con:** [[nasa-power]] (modelado vs medido), [[nldas-gldas]]
(continuidad temporal), [[era5]] (humedad de suelo de reanálisis).

**Acceso:** login Earthdata; subsets por polígono vía AppEEARS. Lento
para llamada en caliente → precarga por predio, no API en vivo.
