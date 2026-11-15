---
type: recurso
status: catalogado
created: 2026-11-14
dominio: vegetacion
cobertura: eeuu
acceso: portal-descarga
resolucion: "~1 m"
revisit: "cada 2-3 años (temporada de cultivo)"
tags: [graze-point, recurso, usda]
---

# NAIP — fotografía aérea de temporada de cultivo

National Agriculture Imagery Program: ortofotos a ~1 m tomadas en
plena temporada de crecimiento en EE.UU.

**Para GrazePoint:** verdad de campo a escala sub-parcela en el
análogo — bordes de potrero, franjas de pastura, suelo desnudo entre
surcos. Sirve para validar lo que NDVI de [[landsat]] sugiere y como
entrada fina si el modelo visión por imagen crece.

**Se cruza con:** [[landsat]]/[[sentinel-2]] (mismo fenómeno, otra
escala), [[cropscape-cdl]] (clasificación vs foto), [[nlcd]].

**Acceso:** [[earthexplorer]], USDA Geospatial Gateway y servicios
ArcGIS (`naip-usdaonline.hub.arcgis.com` tiene ImageServer público).
Precarga; el ImageServer sí responde rápido como tiles.
