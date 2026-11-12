---
type: investigacion
status: completo
created: 2026-11-11
tags: [reto, field-shift, arquitectura, datos, app]
---

# Arquitectura de datos para la app Field Shift

Síntesis del orquestador a partir de las siete investigaciones
([[fuentes-suelo-global]], [[datos-agro-bolivia-venezuela]],
[[datos-nasa-suelo]], [[bolivia-cultivos-regiones]],
[[analogos-mundiales]], [[comparativa-cultivos-potenciales]],
[[catalogo-nutricional-ciclos]]). La pregunta era qué base de
conocimiento abierta podemos cruzar **en caliente** para una app de uso
de tierras con Bolivia como alcance principal.

## La respuesta corta

El dato existe, pero repartido en tres velocidades distintas:

1. **En caliente, sin login, desde el navegador:** NASA POWER (clima +
   humedad modelada de perfil), Open-Meteo (suelo horario 0–81 cm),
   OpenLandMap (propiedades de suelo por punto), WFS de GeoBolivia
   (ZAE, geología SERGEOTECMIN), GIBS tiles (capas visuales NASA),
   FAOSTAT REST y USDA FDC REST (con key gratis).
2. **Precargable una vez y servir estático:** HWSD v2, SISLAC, GLiM,
   GSASmap salinidad, HiHydroSoil, MapSPAM, WorldCereal, calendarios
   GEOGLAM/MIRCA, mapas OAP, capas ZAE, GLDAS mensual Bolivia. Todo
   pequeño si se recorta a Bolivia; el repo puede llevarlo como
   GeoJSON/COG.
3. **Requiere Earthdata Login o backend:** SMAP/GLDAS granulados,
   ECOSTRESS, EMIT, AppEEARS (series NDVI por punto), Harmony.

Una app estática tipo Jekyll + Leaflet cubre los grupos 1 y 2 sin
servidor propio; el grupo 3 queda para el colofón si sobra tiempo.

## El cruce propuesto, por pregunta del usuario

| Pregunta del agricultor | Datos que la responden |
|---|---|
| ¿Cómo está mi suelo hoy? | POWER `GWETTOP/ROOT/PROF` + Open-Meteo `soil_moisture_*` + GIBS SMAP/NDVI |
| ¿Qué suelo tengo? | OpenLandMap point → clase USDA + pH + SOC + textura por tramos; ancla con perfiles WoSIS/SISLAC cercanos; litología GLiM; geología fina GeoBolivia |
| ¿Qué puede crecer aquí? | ZAE 2002/SDSN 2024 (aptitud por unidad de tierra) + GAEZ (LGP, restricciones, rendimiento potencial) + clima POWER histórico |
| ¿Qué se sembró aquí antes? | WorldCereal 2021 + MapSPAM 2020 como baseline + NDVI HLS/MOD13Q1 de 10 años (fenología = rotación inferida) + mapas OAP por municipio |
| ¿Qué rotación conviene? | Reglas por piso ecológico ([[bolivia-cultivos-regiones]]) + extracción N–P–K por cultivo ([[comparativa-cultivos-potenciales]]) + leguminosa tras cereal + calendario doble campaña |
| ¿Qué más podría sembrar que aún no siembro? | Motor de analogía: zonas BO ↔ análogos mundiales ([[analogos-mundiales]]) filtrado por pH/Al/salinidad/agua |
| ¿Vale la pena nutricional/económicamente? | FDC/BCA por cultivo ([[catalogo-nutricional-ciclos]]) + superficie/precio FAOSTAT |

## Ventanas que cierran el diseño

- **SoilGrids REST pausada** → OpenLandMap REST es la vía de punto;
  SoilGrids se consume por WCS/COG o GEE.
- **POWER CORS dudoso** → probar el día 1; plan B: worker de 10 líneas.
- **Earthdata Login en la demo** es fricción → todo lo granulado NASA
  mejor pre-descargado y estático.
- **Bolivia sin parcelas ni mapa anual de cultivos** → el vacío es una
  *feature*: la app puede mostrar «no hay dato público de rotación en
  Bolivia; esto es lo que el NDVI cuenta» y usar el historial
  fenológico como proxy. Honesto y demostrable.
- **Incertidumbre andina** en todos los grids globales → mostrar
  intervalos, no esconderlos.

## Secuencia «primera hora» alineada al brief

1. Clic en mapa Bolivia → POWER diario + OpenLandMap punto + ZAE WFS
   (3 fetches, 0 login). Ya hay clima, suelo y aptitud oficial.
2. Capa estática precargada: HWSD/SISLAC recortado + WorldCereal +
   GSASmap salinidad → restricciones edáficas.
3. Motor de rotación: piso ecológico por coordenada → tabla de
   cultivos viables → comparar ≥3 rotaciones con extracción NPK,
   agua (HiHydroSoil + POWER rain) y velocidad de ciclo.
4. Botón «¿y si?» → análogo mundial + cultivo potencial con su
   paquete tecnológico (encalado, goteo, secano).
5. Plus si hay tiempo: NDVI histórico AppEEARS pre-generado por
   municipio, y GIBS para la capa «ahora».

## Verificaciones en vivo (2026-11-11, hechas desde esta máquina)

**Lo que funciona en caliente:**

- **POWER**: `GET` real con coordenadas de Santa Cruz devuelve JSON
  (T2M, PRECTOTCORR, GWETROOT, GWETTOP). Con `Origin:` responde
  **`access-control-allow-origin: *`** → funciona `fetch` directo
  desde el navegador, sin proxy. Resuelta la duda del agente C.
- **SoilGrids WCS 2.0.1**: vivo. `SUBSETTINGCRS=EPSG:4326` +
  `SUBSET=Long/Lat` devuelve GeoTIFF recortado de Bolivia a ~250 m
  (ej. `COVERAGEID=clay_0-5cm_mean`, ~25 MB por propiedad).
- **WoSIS GraphQL** (`graphql.isric.org/wosis/graphql`): vivo.
- **FAOSTAT Bolivia** por HDX: CSV directo (con `-L`), 22.675 filas
  1961–.

**Lo que está caído o roto (estado real hoy):**

- **SoilGrids REST**: 503 confirmado (pausada).
- **OpenLandMap REST** (`api.openlandmap.org`): el backend responde
  pero *todos* los `coll`/`regex` devuelven «files could not be
  found» — está **roto**, no es la vía de punto que creíamos.
  Fallback real: WCS de SoilGrids o los COGs en Wasabi.
- **GeoBolivia**: `geo.gob.bo` ni siquiera resuelve DNS;
  `geobolivia.planificacion.gob.bo` da 502 en todo (WMS/WFS y web).
  La ZAE solo quedó como JPGs en cdrnbolivia.com. **Regla de oro:
  nada del diseño puede depender de geoservicios estatales en vivo.**
- **INE «descarga»**: los links del gestor de archivos (wpfd) dan
  404 con y sin cookies/referer; el flujo real va por JS/AJAX (403).
  Réplica Alphacast (dataset 52086) pide API key (401). La EAC
  1984–2019 habrá que pedirla por otro canal o usar FAOSTAT.
- **GEOGLAM CropCalendars**: Bolivia solo aparece en el servicio
  Early Warning y solo con polígonos «Out of Season». No sirve para
  calendario boliviano; usar MIRCA/INE/GAEZ.
- **WorldCereal**: los zips globales en Zenodo pesan 15–25 GB —
  inviables en laptop; el recorte por Bolivia sale por OpenEO/cuenta.
  El `WorldCereal_AEZ.geojson` (762 KB) sí está bajado y trae las
  ventanas de temporada por zona agroecológica.

**Precarga hecha** (`.tmp/field-shift-data/`, ~170 MB, gitignored):

- `rasters/sg_{clay,sand,silt,phh2o,soc,cec,nitrogen}_0-5_bolivia.tif`
  — SoilGrids 0–5 cm media, 250 m, EPSG:4326 (vía WCS, receta
  repetible para otras profundidades/cuantiles).
- `rasters/hwsd2_bolivia.tif` — clip del grid SMU de HWSD v2 (170 KB)
  + `hwsd2_db/HWSD2.mdb` con los atributos (7 tramos de perfil).
- `rasters/WorldCereal_AEZ.geojson` — zonas AEZ con ventanas de
  temporada (sos/eos por producto).
- `tablas/bol_faostat_crops.csv` — FAOSTAT completo Bolivia.
- `zae/` — 9 JPG nacionales (zae, uso actual, precipitación,
  temperatura, heladas, sequía, granizo, altitudes) de cdrnbolivia.

## Lo que falta inventariar (próxima pasada si hace falta)

- Portal EMIT VISIONS sobre la zona elegida.
- Recorte WorldCereal/MapBiomas por OpenEO o cuenta GEE; MapSPAM por
  país desde Dataverse.
- MIRCA2000 o capa GAEZ de calendarios de cultivo para el «cuándo»
  (GEOGLAM no cubre Bolivia).
- API key FDC (api.data.gov, gratis) si se consultan nutrientes en
  caliente.
