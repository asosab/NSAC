---
type: recurso
status: catalogado
created: 2026-11-14
dominio: terreno
cobertura: "global (60°S–60°N)"
acceso: portal-earthdata
resolucion: "30 m"
revisit: "estático (misión 2000)"
tags: [graze-point, recurso, nasa, usgs]
---

# SRTM — modelo de elevación global

Radar del transbordador Endeavour, febrero 2000. Elevación a 30 m para
casi toda la tierra habitada. De la elevación salen pendiente, escorrentía,
dirección de flujo y riesgo erosivo.

**Para GrazePoint:** pendiente de la parcela → riesgo de erosión y de
encharcamiento en la ficha; explica diferencias de humedad dentro del
mismo predio; filtra especies que no aguantan ladera.

**Se cruza con:** [[ssurgo-statsgo2]] (factor erosión K + pendiente),
[[web-soil-survey]], [[nasa-power]] (la lluvia cae distinto en ladera),
[[gaez]] (constraints de terreno).

**Acceso:** descarga por tile en [[earthexplorer]]/Earthdata; estático
→ se precarga una vez por predio y no se vuelve a pedir.
