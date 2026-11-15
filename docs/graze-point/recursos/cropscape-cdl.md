---
type: recurso
status: catalogado
created: 2026-11-14
dominio: uso-suelo-cultivo
cobertura: eeuu
acceso: api-abierta
resolucion: "30 m"
revisit: "anual"
tags: [graze-point, recurso, usda]
---

# CropScape / CDL — mapa anual de cultivos de EE.UU.

Cropland Data Layer: clasificación de 30 m que dice qué cultivo hay en
cada pixel, cada año desde 2008. Maíz, soya, trigo, alfalfa, algodón…

**Para GrazePoint:** el historial «qué se sembró aquí» del análogo
EEUU sale ya clasificado — sin tener que inferirlo de NDVI. Rotaciones
reales de la zona (maíz→soya, alfalfa de años) sirven de referencia
para el recomendador.

**Se cruza con:** [[landsat]] (la fuente espectral del CDL), [[nlcd]]
(cobertura general), [[quickstats]] (superficie sembrada por condado),
[[ag-data-commons]].

**Acceso:** CropScape tiene API REST sin key para consulta por punto/
polígono y por año — de las pocas fuentes USDA usables en vivo.
