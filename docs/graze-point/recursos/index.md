---
type: moc
status: activo
created: 2026-11-14
tags: [indice, graze-point, recursos]
---

# Recursos NASA y aliados — GrazePoint

Catálogo de los 28 recursos que NASA lista para el reto (más socios
USDA, USGS, ESA, ECMWF y FAO). Cada nota dice qué da, para qué sirve
en la app y con quién se cruza. La estrategia de suicheo entre fuentes
está en [[router-fuentes]].

## Por dominio

| Dominio | Fuentes |
|---|---|
| Clima y lluvia | [[nasa-power]] (API, ya integrada) · [[gpm-imerg]] · [[prism]] · [[era5]] · [[nldas-gldas]] · [[cocorahs]] |
| Humedad de suelo | [[nasa-power]] (GWETROOT) · [[smap]] · [[nldas-gldas]] · [[era5]] |
| Vegetación / NDVI | [[sentinel-2]] · [[landsat]] · [[modis-viirs]] · [[naip]] |
| Evapotranspiración | [[ecostress]] · [[openet]] · [[nasa-power]] (ET₀) · [[era5]] |
| Suelo edáfico | [[web-soil-survey]] · [[ssurgo-statsgo2]] · [[gaez]] · muestra propia (16 nov) |
| Terreno | [[srtm]] |
| Uso de suelo / cultivos | [[cropscape-cdl]] · [[nlcd]] · [[landfire]] |
| Agua disponible | [[usgs-nwis]] |
| Mercado | [[ams-market-news]] · [[quickstats]] |
| Contexto ecosistémico | [[landfire]] · [[gedi]] · [[nlcd]] |
| Aptitud por cultivo | [[gaez]] |
| Portales / catálogos | [[earthdata-search]] · [[earthexplorer]] · [[lpdaac]] · [[ag-data-commons]] |

## Por modo de acceso (base del router)

- **API abierta sin auth** (en vivo): [[nasa-power]], [[usgs-nwis]],
  [[cropscape-cdl]].
- **API con key gratuita** (en vivo con timeout): [[quickstats]],
  [[ams-market-news]], [[openet]], [[era5]] (con cola → fallback lento),
  [[sentinel-2]] (OAuth).
- **Earthdata login / descarga pesada** (precarga): [[smap]],
  [[gpm-imerg]], [[landsat]], [[modis-viirs]], [[ecostress]], [[gedi]],
  [[nldas-gldas]].
- **Portal / manual** (precarga o validación): [[earthexplorer]],
  [[lpdaac]], [[earthdata-search]], [[web-soil-survey]], [[ag-data-commons]],
  [[prism]], [[cocorahs]], [[nlcd]], [[naip]], [[landfire]], [[gaez]].

## Cobertura

- **Global (valen para Bolivia):** [[nasa-power]], [[smap]], [[gpm-imerg]],
  [[landsat]], [[modis-viirs]], [[srtm]], [[ecostress]], [[nldas-gldas]]
  (GLDAS), [[sentinel-2]], [[era5]], [[gaez]], [[gedi]].
- **Solo EE.UU./Norteamérica** (sirven para el análogo de
  [[analogos-mundiales]]): WSS, SSURGO, CDL, NAIP, NLCD, PRISM,
  CoCoRaHS, NWIS, OpenET, LANDFIRE, AMS, QuickStats, Ag Data Commons,
  NLDAS.
