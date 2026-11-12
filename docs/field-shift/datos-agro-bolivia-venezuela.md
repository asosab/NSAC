---
type: investigacion
status: completo
created: 2026-11-11
tags: [reto, field-shift, datos, bolivia, estadisticas-agro]
---

# Datos de producción agrícola: Bolivia, Venezuela y benchmark mundial

Investigación del agente B para [[00-plan|Field Shift]]. Qué se sembró,
dónde, cuándo, cuánta superficie y con qué rendimiento.

> **Alcance:** el usuario descartó esfuerzos especiales sobre Venezuela
> (2026-11-11). Se conserva la comparativa ya levantada como contexto,
> sin profundizar más.

## 1) Bolivia — fuentes nacionales

| Fuente | URL | Georreferenciación | Años | Acceso | Licencia |
|---|---|---|---|---|---|
| **INE – Censo Nacional Agropecuario 2013** (único del país) | redatam.ine.gob.bo · anda.ine.gob.bo/catalog/229 · sice.ine.gob.bo | Municipio (fichas por depto→provincia→municipio). No hay capa de parcelas | 2013 | Redatam online, fichas PDF por municipio | Público |
| **INE – Estadísticas Agrícolas por Campaña (EAC)** | ine.gob.bo → agropecuaria/agricultura | Nacional y **departamental**, por campaña verano/invierno | 1984–2019 | Excel descargable; sin API | Público |
| **OAP – Observatorio Agroambiental y Productivo** | observatorioagro.gob.bo/mapas/ · oap.produccion.gob.bo | Mapas nacionales por cultivo (modelamiento multicriterio; GPS en parcelas interno no publicado) | ~2017–2020 | Mapas y PDFs; sin API | Público (acceso irregular) |
| **INIAF** | iniaf.gob.bo/datos-e-informacion-estadistica | Estaciones; reportes por depto | Continuo | PDFs | Público |
| **CAO – Cámara Agropecuaria del Oriente** | cao.org.bo/estadisticas/ · agrodatos.com.bo/siprem | Santa Cruz por zonas; **avance de siembra y cosecha por campaña** — el dato más operativo del país | Anual + boletines mensuales | Compendio público; SIPREM pago | Mixto |
| **SENASAG** | senasag.gob.bo | Permisos fitosanitarios, insumos | Corriente | Consolidados | Público |

**Lectura clave:** Bolivia tiene un censo a nivel municipio (2013, ya
viejo) y una serie departamental larga (1984–2019). **No existe capa
pública de parcelas ni mapa anual de cultivos por pixel.** Lo más fino:
mapas modelados del OAP y fichas de municipio del censo.

## 2) Fuentes globales que cubren Bolivia

| Fuente | URL | Granularidad | Años | Acceso |
|---|---|---|---|---|
| **FAOSTAT** (Crops) | fao.org/faostat/en/#data/QCL | Nacional | 1961– | API REST + CSV; CC BY-NC-SA |
| **MapSPAM / SPAM2020** | mapspam.info/data/ | **Pixel 10×10 km**: área, producción, rendimiento de 46 cultivos, secano/riego | 2000–2020 | GeoTIFF/CSV libre por país |
| **GAEZ v4/v5** (FAO-IIASA) | gaez.fao.org | Raster ~9 km; aptitud y rendimiento potencial ~70 cultivos | 1981–2020 | Descarga libre |
| **ESA WorldCereal** | esa-worldcereal.org · STAC dataspace.copernicus.eu | **10 m**, cultivos estacionales, maíz, riego | Solo 2021 | STAC, openEO, GEE; CC-BY-4.0 |
| **USDA FAS** | apps.fas.usda.gov/psdonline · cropexplorer | Nacional (PSD) + mapas NDVI | 1960– | API con key; tiles |
| **GEOGLAM Crop Monitor** | cropmonitor.org | **Calendarios de siembra/cosecha subnacionales** por cultivo | 2013– | ArcGIS REST, shapefiles; CC-BY |
| **Calendarios grillados** | MIRCA2000 · SAGE · GGCMI Ph3 | 5′ / 0.5°: fecha siembra/cosecha por cultivo y celda | ~2000 | Descarga libre |
| **HarvestChoice** | harvestchoice.org | Celdas 5′ | Cerrado ~2019; en Dataverse | Archivo |

## 3) Venezuela (contexto, sin profundizar)

La estadística agrícola oficial colapsó: último censo 2007–2008, series
ministeriales cortadas ~2014–15, INE prácticamente inactivo en agro,
MINPPAU reducido a agricultura urbana. FAOSTAT Venezuela lleva banderas
de imputación FAO; la fuente práctica hoy es USDA FAS (PSD + GAIN) y
los grillados globales (MapSPAM, WorldCereal, GEOGLAM), que cubren ambos
países igual. Referencias: microdata.fao.org/catalog/1618 (censo 2008),
ine.gov.ve, apps.fas.usda.gov.

## 4) El mejor país del mundo

| País/sistema | Granularidad | Historia | Abierto | API |
|---|---|---|---|---|
| **EE.UU. – USDA NASS Cropland Data Layer** | Pixel **30 m** (10 m desde 2023), ~120 clases | Anual 1997→2025 + Crop Sequence Boundaries (rotación por parcela) | Total | CropScape/CroplandCROS API + **QuickStats** (condado) |
| **Dinamarca – Marker/GSAA** | **Parcela declarada** con cultivo | Anual 2008→2026, preliminar en curso | **CC0** | WFS/WMS + GeoParquet |
| **Francia – RPG** | **Parcela declarada** | Anual 2010→2025 | Licence Ouverte | Shapefile + API Carto GeoJSON |
| **Países Bajos – BRP** | Parcela declarada, corte 15-may | 2009→2025 | Dominio público | OGC API Features, WFS, WMS |
| **Canadá – AAFC ACI** | Pixel 30 m, ~40 clases | Anual 2009→2025 | OGL-2.0 | GeoTIFF + GEE `AAFC/ACI` |
| **Argentina – MAGyP** | Partido/departamento | **1969→hoy**, por campaña | Abierto | CSV + API CKAN |
| **Brasil – IBGE PAM + MapBiomas** | Municipio (PAM, desde 1974); pixel 30 m MapBiomas | Larga | Abiertos | SIDRA REST + GEE |
| **India – ICRISAT VDSA** | Distrito | 1966–2020 | Registro | Excel/CSV |
| **Australia – ABARES** | 250 m–1 km + regional | 1992–2021 discontinuo | Abierto | WMS/GeoTIFF |

**Ganador: Estados Unidos (USDA NASS).** Única combinación de serie
larga (28 años) + pixel 30/10 m + clasificación por cultivo +
estadística por condado en QuickStats + todo libre sin registro. El CDL
es el estándar de facto. Top 3: EE.UU., Dinamarca (parcela, CC0),
Francia (parcela, API Carto).

Nota honesta: los LPIS/GSAA europeos son parcela real (mejor que pixel),
pero solo Francia, Dinamarca y Países Bajos los abrieron de forma
completa. Alemania (InVeKos) no publica la suya.

## 5) Bolivia vs Venezuela

| Dimensión | Bolivia | Venezuela |
|---|---|---|
| Último censo | **2013**, Redatam a nivel municipio | **2007–2008**, ~18 años sin renovar |
| Serie anual superficie/producción | **1984–2019** departamental (INE-EAC) | Discontinuada ~2014–15 |
| Georreferenciado propio | Mapas OAP modelados | Nada vigente |
| Dato operativo de campaña | CAO/SIPREM (parcialmente pago) | Solo USDA FAS |
| Institución activa | INE publica y mantiene portales | INE/MINPPAU casi inactivos |
| Veredicto | Cantidad media, calidad aceptable hasta ~2019; sin parcela ni pixel | Cantidad baja, calidad deteriorada; depender de grillados globales |

**Recomendación:** para Bolivia, INE-EAC (departamento, 1984–2019)
como verdad tabular + censo 2013 (municipio) + SPAM2020/WorldCereal
(pixel) + calendarios GEOGLAM/MIRCA (cuándo) + CAO (dinámica de
campaña). Si el reto permite elegir país, EE.UU. (CDL+QuickStats) o
Dinamarca (Marker) dan datos de clase mundial a costo cero.

## Relacionadas

[[00-plan]] · [[fuentes-suelo-global]] · [[bolivia-cultivos-regiones]] ·
[[arquitectura-datos]]
