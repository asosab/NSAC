---
type: recurso
status: catalogado
created: 2026-11-14
dominio: [clima, humedad-suelo, evapotranspiracion]
cobertura: "NLDAS: Norteamérica · GLDAS: global"
acceso: earthdata
resolucion: "0.125° / 0.25°"
revisit: "horario / 3-horario"
tags: [graze-point, recurso, nasa]
---

# NLDAS / GLDAS — asimilación de datos terrestres

Combinan satélite y estaciones en series continuas sub-diarias:
temperatura, lluvia, humedad de suelo, ET proxy, radiación. GLDAS cubre
el mundo; NLDAS es más fino pero solo Norteamérica.

**Para GrazePoint:** rellena huecos de [[nasa-power]] con resolución
horaria; serie continua de humedad de suelo entre pasadas de [[smap]];
para el análogo EEUU es el fallback inmediato de POWER.

**Se cruza con:** [[nasa-power]] (mismo tipo de variable, otro modelo),
[[smap]], [[era5]] (tercer modelo del mismo fenómeno — triangulación),
[[gpm-imerg]] (lluvia de entrada).

**Acceso:** Earthdata Search → GES DISC, login. Formato NetCDF/GRIB
pesado → precarga y extracción de serie por punto.
