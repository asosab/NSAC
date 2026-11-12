---
type: investigacion
status: completo
created: 2026-11-11
tags: [reto, field-shift, nasa, datos, api]
---

# Qué aporta la NASA al reto Field Shift

Investigación del agente C para [[00-plan|Field Shift]]. Recursos
NASA/DAAC para una herramienta de rotación de cultivos con foco en
Bolivia.

**Nota de método:** los endpoints no se pudieron ejecutar en vivo desde
el agente; la estructura de POWER es la documentada. Conviene un `curl`
de verificación antes de la demo.

## 1. Vías de acceso transversales

- **Earthdata Login** (gratis, `urs.earthdata.nasa.gov`): necesario para
  descargas de cualquier DAAC, AppEEARS y credenciales S3. El CMR es
  público sin login.
- **CMR**: `https://cmr.earthdata.nasa.gov/search/granules.json?short_name=SPL3SMP_E&version=006&bounding_box=-69.6,-22.9,-57.5,-9.7&temporal=2024-06-01,2024-06-02`
- **STAC**: `https://cmr.earthdata.nasa.gov/stac/LPCLOUD`
  (`HLSL30_2.0`, `HLSS30_2.0`, `EMITL2BMIN`); `/cloudstac/` filtra lo
  alojado en nube.
- **`earthaccess`** (Python): login + `search_data` + `download()`.
- **AppEEARS** (`appeears.earthdatacloud.nasa.gov/api`): series por
  punto/polígono de productos LP DAAC. Asíncrono, login.
- **Harmony**: subconjunto/reproyección en la nube (GES DISC, NSIDC,
  PO.DAAC).
- **GIBS / Worldview**: tiles WMTS/WMS con `Access-Control-Allow-Origin: *`
  — **sí funcionan desde el navegador sin login**, ideal para Leaflet:
  `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{LayerId}/default/{YYYY-MM-DD}/GoogleMapsCompatible_Level{N}/{z}/{y}/{x}.png`
- **Giovanni** (`giovanni.gsfc.nasa.gov`): mapas y series sin programar.
- **Licencia**: EOSDIS abierto y gratuito; citar DOI. POWER declara
  CC BY 4.0.

## 2. Agroclima — POWER (LaRC)

La opción más fácil del hackathon: REST JSON **sin login**, global,
comunidad `AG` y formato ICASA para DSSAT.

- Variables: `T2M`, `T2M_MAX/MIN`, `PRECTOTCORR`,
  `ALLSKY_SFC_SW_DWN`, `RH2M`, `WS2M/WS10M`, `FROST_DAYS`, ET0, y
  **humedad de suelo modelada** `GWETTOP` (0–5 cm), `GWETROOT` (~0–1 m),
  `GWETPROF` (hasta lecho rocoso), `TSOIL*` por capas (MERRA-2, ~0.5°).
- Resolución 0.5°×0.625°, meteorología desde 1981; diario/mensual/
  horario/climatología.
- Endpoint:
  `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR,GWETROOT&community=AG&longitude=-63.18&latitude=-17.78&start=20241001&end=20241007&format=JSON`
- OpenAPI: `…/api/temporal/daily/openapi.json`; diccionario:
  `power.larc.nasa.gov/parameters/`.
- **CORS contradictorio** en reportes: probar el día del evento y tener
  un proxy ligero (worker/Netlify function) de plan B.

## 3. Precipitación — GPM IMERG (GES DISC)

- `precipitationCal` mm/h multi-satélite; 0.1°, semi-horario; agregados
  `GPM_3IMERGDF` diario y `GPM_3IMERGM` mensual. Desde 2000.
- Corridas: Early (~4 h), Late (~14 h), Final (~3.5 meses).
- Acceso: Earthdata, earthaccess `GPM_3IMERGHH`, Giovanni, Harmony;
  tiles NRT en GIBS. Alternativa sin login: `PRECTOTCORR` de POWER.

## 4. Humedad superficial — SMAP (NSIDC) y NISAR

- **SPL3SMP_E v6**: humedad volumétrica 0–5 cm, banda L, EASE-Grid 9 km,
  diario, 2015–. HDF5 con login.
- **SPL4SMGP (L4)**: asimilación — `sm_surface`, `sm_rootzone`
  (0–100 cm), `sm_profile` (a bedrock), más T suelo y ET. 9 km
  tri-horario. El mejor NASA «listo» de zona radicular.
- **NISAR SME2** (ASF): humedad L3 a **200 m**, ~cada 12 días. Beta/
  provisional desde oct-2025; para nov-2026 puede estar validado. Único
  producto NASA de humedad a escala de parcela.

## 5. Humedad de subsuelo y perfil

Ningún sensor mide a 1–2 m; lo cubren modelos:

- **GLDAS-2 Noah** (`GLDAS_NOAH025_3H`): `SoilMoi0_10cm_inst` …
  `SoilMoi100_200cm_inst` en 4 capas, 0.25°, tri-horario, 2000–.
- **FLDAS-Global** (`FLDAS_NOAH01_C_GL_M`): mensual, **0.1° ~10 km**,
  1982–, mismas capas. Mejor resolución que GLDAS para Bolivia.
- **POWER `GWETROOT`/`GWETPROF`**: vía rápida sin login.
- **GRACE/GRACE-FO** (PO.DAAC): agua terrestre total mensual ~1° (real
  ~300 km). Contexto de acuíferos, inútil a parcela.

## 6. Vegetación, ET, fenología (LP DAAC)

| Producto | Qué mide | Resolución/cadencia | Historia |
|---|---|---|---|
| MOD13Q1/MYD13Q1 | NDVI/EVI | 250 m / 16 d | 2000– |
| VNP13A1 | NDVI/EVI VIIRS | 500 m / 16 d | 2012– |
| MOD16A2 | ET/PET | 500 m / 8 d | 2000– |
| MOD17A2H/A3H | GPP/NPP | 500 m / 1 km anual | 2000– |
| MOD11A2 | LST | 1 km / 8 d | 2000– |
| MCD15A3H | LAI/FPAR | 500 m / 4 d | 2000– |
| MCD12Q1/Q2 | Cobertura IGBP / fenología | 500 m anual | 2001– |
| **HLS** (HLSS30/HLSL30) | Landsat+S2 armonizados | **30 m**, ~2–3 d | 2013– |
| **ECOSTRESS v2** (`ECO_L3T_JET`, `ECO_L4T_ESI`) | ET real y estrés hídrico | **70 m**, escenas oportunistas ISS | 2018– |

Notas: MODIS 250 m sirve para historial de cultivo en parcela grande;
para parcelas bolivianas pequeñas conviene HLS 30 m. ECOSTRESS cubre
±52° (Bolivia entra); usar v2, la v1 se descontinuó en sep-2025.
**GEDI**: biomasa/estructura (huellas 25 m, AGBD 1 km). **GFSAD**
(LGRIP30 regado/secano 30 m por continente): capa «dónde hay
agricultura». AppEEARS saca series NDVI por punto.

## 7. Mineralogía de superficie

- **EMIT** (ISS, LP DAAC): VSWIR 381–2493 nm, 285 bandas, **60 m**.
  `EMITL2BMIN` = identificación mineral por píxel (arcillas,
  carbonatos, sulfatos, óxidos de Fe). Cobertura ±52°; adquisiciones
  programadas a zonas áridas — el altiplano sur es plausible, el
  oriente húmedo menos. Portal VISIONS `earth.jpl.nasa.gov/emit/`.
- **ASTER**: `AST_07XT` (VNIR+SWIR) y `AST_05` (TIR). **El SWIR falló
  en 2008**: solo pre-2008. L2 bajo demanda, gratis.
- **AVIRIS-NG**: aéreo, solo campañas; referencia metodológica.

## 8. Propiedades estáticas del suelo bajo techo NASA

- **ORNL DAAC – HWSD v1.2 regrillado** (DOI
  `10.3334/ORNLDAAC/1247`): textura, OC top/sub, pH, CEC, saturación de
  bases, densidad; NetCDF 0.05°, global. El dataset edáfico más
  completo distribuido por un DAAC (origen FAO/IIASA/ISRIC).
- **SMAP L4** incluye `SPL4SMLM`: clase de textura, conductividad,
  profundidad radicular por celda 9 km.
- **SEDAC**: WMS/WCS `sedac.ciesin.columbia.edu/geoserver/wms`;
  Global Agricultural Lands, fertilizante N/P (viejo, 1994–2001),
  PEST-CHEMGRIDS, población.

## 9. Programas derivados

- **NASA Harvest / GEOGLAM Crop Monitor**: condición mensual por país,
  calendarios y máscaras de cultivo.
- **SERVIR-Amazonia** (hub CIAT): Bolivia cubierta; servicios de
  cobertura/agricultura regionales.
- **Crop-CASMA** (USDA+GMU, fondos NASA): SMAP a 1 km + NDVI — **solo
  CONUS**, método inspirador.
- **OpenET**: ET 30 m, solo oeste de EE.UU.
- **USDA NASS CDL**: el referente de «qué se plantó dónde» que Field
  Shift querría replicar — solo EE.UU.

## 10. Lo que la NASA NO mide — y quién llena el hueco

| Vacío | Mejor sustituto |
|---|---|
| Nutrientes N, P, K | **ISRIC SoilGrids** (N total, CEC, pH); laboratorio para P/K |
| Textura a nivel parcela | SoilGrids, HWSD/ORNL, mapas nacionales (en Bolivia escasos) |
| pH, salinidad, CEC finos | SoilGrids/HWSD; SMOS para salinidad superficial |
| Materia orgánica / SOC | SoilGrids (SOC), HWSD, MOD17 NPP como proxy |
| Geología detallada | **EMIT L2B**, EnMAP (DLR), PRISMA (ASI), SERGEOMIN/GeoBolivia |
| Humedad medida >5 cm | GLDAS/FLDAS/SMAP L4 (modelado), sondas locales |
| Tipo de cultivo sembrado (fuera de EE.UU.) | Clasificación propia sobre HLS + GFSAD; GEOGLAM |

**Para el pitch:** POWER + GLDAS/FLDAS + SMAP/NISAR + MODIS/HLS +
SoilGrids cubre casi toda la cadena; el eslabón que falta — química de
suelo a nivel parcela — es donde el usuario aporta su laboratorio.

## Stack mínimo recomendado para el evento

1. `fetch` a POWER diario (T2M, PRECTOTCORR, GWETROOT) — sin login;
   verificar CORS y tener proxy listo.
2. GIBS WMTS en Leaflet (NDVI 8-day, IMERG NRT, LST) — CORS
   garantizado.
3. GLDAS `SoilMoi*` mensual pre-descargado para Bolivia como
   GeoTIFF/JSON estático (evita Earthdata Login en la demo).
4. OpenLandMap REST para textura/pH/SOC por clic (SoilGrids REST
   pausada).
5. Extra: AppEEARS con NDVI MOD13Q1 de 10 años por coordenada para el
   «historial de rotación» de la parcela.

Pendiente: `curl` de verificación de POWER (respuesta y cabecera CORS)
y portal VISIONS para granulados EMIT sobre la zona elegida.

## Relacionadas

[[00-plan]] · [[fuentes-suelo-global]] · [[arquitectura-datos]]
