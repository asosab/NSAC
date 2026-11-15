---
type: recurso
status: catalogado
created: 2026-11-14
dominio: evapotranspiracion
cobertura: "oeste de EE.UU."
acceso: api-key
resolucion: "30 m"
revisit: "mensual/estacional"
tags: [graze-point, recurso]
---

# OpenET — evapotranspiración a escala de parcela

Consorcio NASA/USGS/ESA/EDF: ET satelital ensamblada de varios modelos,
a 30 m, para el oeste de EE.UU. Pensada para manejo de riego.

**Para GrazePoint:** demanda hídrica real del análogo — ¿la pastura
propuesta gasta más o menos agua que la actual? Compara directo con
[[ecostress]] y valida el balance lluvia–ET de la ventana de siembra.

**Se cruza con:** [[ecostress]] (medida vs ensamble de modelos),
[[usgs-nwis]] (oferta vs demanda), [[nasa-power]] (ET₀ de referencia),
[[smap]].

**Acceso:** API con key gratuita (`openetdata.org`), GeoJSON por
polígono — hecha para consultas de parcela como las nuestras.
