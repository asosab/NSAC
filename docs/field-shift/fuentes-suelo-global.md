---
type: investigacion
status: completo
created: 2026-11-11
tags: [reto, field-shift, suelos, datos, api]
---

# Fuentes globales de datos de suelo y subsuelo

Investigación del agente A para [[00-plan|Field Shift]]. **Veto:** los
servicios y dominios chinos quedan fuera por restricción de la
competencia.

**Nota sobre la prueba en vivo:** ISRIC anuncia que la REST API de
SoilGrids está **pausada temporalmente**, sin fecha de restablecimiento
(https://docs.isric.org/globaldata/soilgrids/). Para el hackathon hay que
planear con WCS/COG como vía primaria.

## Tabla resumen

| Fuente | Cobertura | Qué mide | Resolución | Acceso | Auth | Query lat/lon | Bolivia |
|---|---|---|---|---|---|---|---|
| **SoilGrids 2.0** (ISRIC) | Global | Textura, pH, SOC, CIC, N, densidad, fragmentos, clase WRB | 250 m, 6 profundidades (0–200 cm) | REST (pausada), WMS/WCS, WebDAV, GEE | Ninguna | Sí (cuando vuelva) | Sí, incertidumbre alta en Andes |
| **WoSIS** (ISRIC) | Global | Perfiles medidos reales (química + física) | Puntos (~228k perfiles) | WFS, GraphQL | Ninguna | Vía WFS bbox | Pocos puntos |
| **HWSD v2** (FAO/IIASA) | Global | ~30k unidades, textura, pH, nutrientes, CIC | 1 km, 7 capas (0–200 cm) | Descarga GeoTIFF + .mdb/SQLite | Ninguna | Offline | Sí |
| **OpenLandMap** (OpenGeoHub) | Global | SOC, pH, textura, densidad, clase USDA | 250 m (algo a 30 m/1 km) | REST point query, STAC, WCS, COG | Ninguna | **Sí, activa** | Sí |
| **FAO GAEZ v4** | Global | Aptitud agrícola, restricciones de suelo, LGP | 9 km (algo a 0.9 km) | ArcGIS ImageServer + S3 GeoTIFF | Ninguna | Identify | Sí |
| **FAO GSP mapas** (GSOCmap, GSASmap, GSNmap) | Global | Carbono orgánico, salinidad, nutrientes | ~1 km, 0–30 y 30–100 cm | WMS/WMTS + GeoTIFF | Ninguna | GetFeatureInfo | Sí |
| **HiHydroSoil v2** (FutureWater) | Global | Ksat, agua disponible, grupo hidrológico | 250 m | GeoTIFF por formulario, GEE | Formulario | No | Sí |
| **SISLAC** (FAO/GSP) | Latinoamérica | Perfiles medidos + mapa WRB 1:1M | Puntos (~6100) | GloSIS, descarga | Registro | Parcial | **Sí, la mejor regional** |
| **GeoBolivia / SERGEOTECMIN** | Bolivia | Mapa geológico, fallas, cartas 1:100k/1:250k | Vectorial nacional | WMS/WFS GeoServer | Ninguna | GetFeatureInfo | **Nativo** |
| **EMBRAPA BDSolos + AgroAPI** | Brasil | Perfiles, SiBCS, mapa de suelos | 1:5M + perfiles | FeatureServer REST, API token | Token gratis | Sí | Solo Brasil |
| **INTA SisINTA + GeoINTA** | Argentina | ~7000 perfiles, cartas de suelos | Puntos + polígonos | WMS/WFS, paquete R | Ninguna | Vía WFS | Solo Argentina |
| **iSDAsoil** | África | 20+ propiedades a campo | 30 m | REST | Token gratis | Sí | No |
| **USDA NRCS SDA** | EE.UU. | SSURGO/gNATSGO | 1:24k / 30 m | REST SQL, WFS/WMS | Ninguna | Sí | No |
| **SLGA/ASRIS** (CSIRO) | Australia | Propiedades por tramos | 90 m | REST, COG | Ninguna | Sí | No |
| **ESDAC/LUCAS** | UE | Topsoil NPK, pH, OC, textura | ~20k puntos | CSV tras registro | Registro | No | No |
| **OneGeology** | Global federado | Mapas geológicos | Variable | WMS/WFS/CSW | Ninguna | GetFeatureInfo | Vía GeoBolivia |
| **GLiM / GLHYMPS** | Global | Litología (16 clases), permeabilidad | ~1:3.75M | Descarga, PANGAEA | Ninguna | Offline | Sí |
| **USGS MRDS / NGDB** | Global / EE.UU. | Yacimientos, geoquímica | Puntos | REST JSON, WMS/WFS | Ninguna | Sí | MRDS sí |
| **Copernicus CLMS** | Global | Soil Water Index (SWI) | 12.5 km | OData, S3, STAC | Registro CDSE | No directo | Sí |
| **LandPKS / Terraso** | Global | Soil ID por punto | Punto | API + portal | Cuenta | Sí | Sí |
| **WOCAT/QCAT** | Global | Prácticas de manejo | Cualitativa | API v2 token | Token | Filtros | Algunos casos |
| **Tellus** (GSI Irlanda) | Irlanda | Geoquímica topsoil, ~60 analitos | 1 muestra/4 km² | Zips | Ninguna | No | No (referencia) |
| **Open-Meteo** | Global | Temp. y humedad del suelo por hora | Modelo | REST JSON | **Ninguna, CORS abierto** | Sí | Sí |

## Fichas

### 1. ISRIC SoilGrids 2.0 — la columna vertebral

- **URLs:** info https://www.isric.org/explore/soilgrids · docs
  https://docs.isric.org/globaldata/soilgrids/ · REST
  https://rest.isric.org/soilgrids/v2.0/docs · WMS/WCS
  https://maps.isric.org · WebDAV
  https://files.isric.org/soilgrids/latest/data/
- **Qué mide:** `bdod` (densidad aparente), `cec`, `cfvo` (fragmentos),
  `clay`/`sand`/`silt`, `nitrogen`, `phh2o`, `soc`, `ocd`, `ocs`, clase
  WRB y USDA. **No** tiene P ni K explotables a nivel global.
- **Resolución:** 250 m; 6 tramos GlobalSoilMap: 0–5, 5–15, 15–30,
  30–60, 60–100, 100–200 cm, con cuantiles 0.05/0.5/0.95.
- **Acceso:**
  - REST point query (beta, **pausada**):
    `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=-63.18&lat=-17.78&property=clay&property=phh2o&depth=0-5cm&value=Q0.5`
    → JSON por capa. Fair use: 5 llamadas/minuto.
  - WCS: `https://maps.isric.org/mapserv?map=/map/clay.map&SERVICE=WCS&…`
    para recortes raster; WebDAV para GeoTIFF/VRT completos (~120 GB por
    propiedad).
  - GEE: assets comunitarios `projects/sat-io/open-datasets/ISRIC/*`.
- **Licencia:** CC-BY 4.0. WMS/WCS consumibles desde navegador.
- **Bolivia:** entrenado con ~230k perfiles WoSIS concentrados en EE.UU.
  y Europa; los Andes y Amazonía tienen pocos puntos de calibración. El
  propio FAQ advierte que sirve para análisis continental, no para
  decisión de parcela. Tratar valores bolivianos como estimaciones con
  intervalo amplio.

### 2. SoilGrids v1 (legado)

Muerto: REST `rest.soilgrids.org` apagado en junio 2020; solo quedan
GeoTIFFs en https://files.isric.org/soilgrids/former/2017-03-10/.

### 3. WoSIS — perfiles medidos reales

- https://docs.isric.org/globaldata/wosis/ · GraphQL
  https://graphql.isric.org/wosis/graphql · WFS
  `http://maps.isric.org/mapserv?map=/map/wosis_latest.map`
- ~228k perfiles, >6M registros, propiedades estandarizadas por
  horizonte. Sin auth; licencia por proveedor. WFS/GraphQL por bbox →
  «perfiles cercanos a mi parcela» para validar SoilGrids. En Bolivia la
  densidad es baja, pero son datos medidos, no modelados.

### 4. FAO HWSD v2.0

- https://www.fao.org/soils-portal/data-hub/soil-maps-and-databases/harmonized-world-soil-database-v20/en/
  · descarga S3: `HWSD2_RASTER.zip` y `HWSD2_DB.zip`.
- 1 km, 7 tramos (0–20 … 150–200 cm), ~30k unidades con composición por
  porcentaje: textura, pH, OC, CIC, CaCO₃, salinidad, profundidad, AWC.
  Sin API — consumo offline precargando Bolivia. Resolución gruesa pero
  **sí incluye nutrientes que SoilGrids no modela**; buen fallback.

### 5. OpenLandMap / OpenGeoHub

- Portal https://openlandmap.org · STAC https://stac.openlandmap.org ·
  REST https://api.openlandmap.org · WCS
  https://geoserver.opengeohub.org/landgisgeoserver/ows
- **API de punto — rota en la verificación del 11-11-2026:**
  `api.openlandmap.org` responde pero todo `coll`/`regex` devuelve
  «files could not be found». Usar en su lugar WCS de SoilGrids o los
  COGs en Wasabi. El endpoint documentado sería:
  `https://api.openlandmap.org/query/point?lat=-17.78&lon=-63.18&coll=layers1km&regex=sol_clay.wf_usda.*`
  devuelve GeoJSON/CSV con valor e incertidumbre por profundidad. COGs
  en S3 Wasabi → range-requests desde el navegador con geotiff.js, sin
  backend. Misma base WoSIS → mismas cautelas andinas.

### 6. FAO GAEZ v4

- Portal https://gaez.fao.org · ImageServer REST
  https://gaez-services.fao.org/server/rest/services/ · GeoTIFFs en S3
  `data.gaezdev.aws.fao.org`.
- Aptitud agroecológica: zona AEZ, días de periodo de crecimiento,
  restricciones de suelo/terreno, rendimiento potencial por cultivo.
  5′ (~9 km) y capas a 30″ (~0.9 km). `identify` por punto sin
  descargas. Licencia FAO, abierto. La capa de «recomendación de
  cultivo».

### 7. Mapas temáticos FAO/GSP (GloSIS)

- Catálogo https://data.apps.fao.org/catalog/organization/glosis ·
  GSOCmap (SOC t/ha, 30″, CC-BY 4.0) · GSASmap (salinidad: ECe, ESP, pH
  a 0–30 y 30–100 cm — clave para el altiplano y el Chaco)
  https://www.fao.org/global-soil-partnership/soil-data/global-map-of-salt-affected-soils-gsasmap/en
  · GSNmap (nutrientes) en producción. WMS/WMTS públicos.

### 8. HiHydroSoil v2 (FutureWater)

- https://www.futurewater.eu/projects/hihydrosoil-v2-0-global-maps-of-soil-hydraulic-properties-at-250m-resolution/
- Propiedades hidráulicas derivadas de SoilGrids: Ksat, capacidad de
  campo, punto de marchitez, van Genuchten, grupo hidrológico USDA.
  250 m, GeoTIFF tras formulario, también en GEE. Lo que falta para
  balance hídrico y riego.

### 9. Fuentes regionales latinoamericanas

- **SISLAC** (FAO/GSP + 20 países incl. Bolivia): ~6100+ perfiles reales
  armonizados + mapa WRB 1:1M; base 2024 (ESSD 16:1229,
  doi:10.5194/essd-16-1229-2024). **La fuente regional con mejor
  densidad para Bolivia** — usar para corregir sesgos de los grids
  globales.
- **SOTERLAC** (legado): unidades SOTER 1:5M, estratificación gruesa.
- **GeoBolivia (SERGEOTECMIN):** WMS/WFS
  `https://geo.gob.bo/geoserver/sergeotecmin/ows` — mapa geológico 2000,
  fallas, cartas 1:100k y 1:250k. Sin auth. **El único servicio
  geológico nativo boliviano.**
- **EMBRAPA (Brasil):** BDSolos https://www.bdsolos.cnptia.embrapa.br/ ·
  FeatureServer `geoportal.sgb.gov.br/server/rest/services/pronasolos/`
  · AgroAPI (token gratis) con SmartSolosExpert.
- **INTA (Argentina):** SisINTA ~7000 perfiles (paquete R `SISINTAR`),
  cartas en GeoServer geointa.inta.gob.ar.

### 10. Nortes de referencia (no aplican a Bolivia)

- **iSDAsoil** (África): `api.isda-africa.com/isdasoil/v2/soilproperty`,
  30 m, 20+ propiedades Mehlich-3 con nutrientes — el modelo de lo que
  falta en Sudamérica.
- **USDA NRCS SDA**: `sdmdataaccess.sc.egov.usda.gov/Tabular/post.rest`
  acepta SQL arbitrario POST sin auth; solo EE.UU.
- **SLGA/ASRIS** (Australia): REST `asris.csiro.au/ASRISApi/`, CC-BY.
- **ESDAC/LUCAS** (UE): topsoil con N, P, K, pH, OC — útil como diseño
  de esquema NPK.
- **Tellus** (Irlanda): geoquímica de topsoil ~60 analitos ICP.
- **LandPKS/Terraso**: https://landpotential.org/data-portal — Soil ID
  global, el «soil guess» que la app podría replicar.
- **WOCAT/QCAT**: API v2, contenido cualitativo de manejo.

### 11. Subsuelo / geología / geoquímica global

- **OneGeology** https://onegeology.org — federación WMS/WFS; Bolivia
  vía GeoBolivia. CORS varía por servidor.
- **GLiM** (Hartmann & Moosdorf 2012): 1.23M polígonos litológicos, 16
  clases; PANGAEA doi:10.1594/PANGAEA.788537; licencia de investigación
  — revisar antes de publicar. Compañero: **GLHYMPS 2.0**
  (permeabilidad). GeoParquet en HuggingFace `mgalib/GLIM_GLHYMPS`.
- **USGS MRDS/NGDB** https://mrdata.usgs.gov — MRDS cubre Bolivia;
  APIs JSON sin auth: `search-bbox.php`, `near-point.php`; WMS/WFS en
  `/services/mrds`.
- **Copernicus CLMS**: **Soil Water Index global 12.5 km diario**
  (Sentinel-1/ASCAT); Copernicus Data Space, OData + S3 + STAC;
  registro gratuito.
  https://land.copernicus.eu/en/products/soil-moisture

### 12. Complementos operativos

- **Open-Meteo** https://api.open-meteo.com/v1/forecast —
  `soil_temperature_{0,6,18,54}cm` y
  `soil_moisture_{0-1,1-3,3-9,9-27,27-81}cm` horarios; **sin API key,
  CORS abierto, CC-BY 4.0, 10k llamadas/día gratis**.
- **NASA SMAP/GLDAS/POWER** — detalle en [[datos-nasa-suelo]].

## Recomendaciones para la app (Bolivia/Santa Cruz)

1. **Cadena de consulta por punto:** ~~OpenLandMap REST~~ (roto hoy)
   → **SoilGrids WCS con SUBSETTINGCRS=4326** (verificado, ~25 MB por
   propiedad para todo Bolivia) o COGs/GEE; WoSIS WFS/GraphQL para
   «perfiles medidos cercanos» como ancla de confianza.
2. **Estratificación:** SISLAC + HWSD v2 precargados para Bolivia;
   GLiM para litología; GeoBolivia WMS para geología de detalle.
3. **Decisiones agrícolas:** GAEZ (aptitud/LGP) + HiHydroSoil (agua
   disponible) + Open-Meteo/SMAP (humedad actual) + GSASmap
   (salinidad, crítico en Santa Cruz/Chaco).
4. **Advertencia de calidad:** reportar siempre el intervalo de
   predicción; en cordillera y Amazonía los grids tienen calibración
   escasa — mostrarlo en UI, no esconderlo.
5. **Browser vs backend:** OpenLandMap, Open-Meteo, USGS y ArcGIS REST
   de FAO responden JSON con CORS razonable; descargas pesadas mejor
   pre-procesarlas a COG en un bucket propio.

## Relacionadas

[[00-plan]] · [[datos-nasa-suelo]] · [[datos-agro-bolivia-venezuela]] ·
[[arquitectura-datos]]
