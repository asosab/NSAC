---
type: investigacion
status: completo
created: 2026-11-11
tags: [reto, field-shift, space-apps, datos, plan]
---

# Field Shift — plan de investigación

Reto elegido: **Field Shift: Adapting Farms with NASA Data** (intermedio/
avanzado; Earth Science, Software). El statement pide una herramienta de
apoyo a la decisión que combine observaciones de la Tierra de la NASA con
datos locales de suelo, características de cultivo y prioridades del
agricultor para explorar **rotaciones** que protejan el suelo y ahorren
agua. Dato clave del brief: el suelo y los cultivos *no* son productos
NASA; hay que traerlos de socios o censos públicos.

Página oficial (no admite fetch directo):
https://www.spaceappschallenge.org/2026/challenges/adapting-farms-with-nasa-data/
Espejo con datasets sugeridos:
https://spacedata.swapniltamse.com/challenges/field-shift-adapting-farms/

## Pregunta que guía todo

¿Qué base de conocimiento abierta (APIs, servicios de mapas, datos
escrapeables) podemos cruzar en caliente para una app de uso de tierras
para cultivo, con **Bolivia como alcance principal** y el resto del mundo
si da?

## Orquestación

Siete agentes de investigación en paralelo (perfil read-only + web). Cada
uno devuelve un informe estructurado; la orquestación (esta sesión) lo
convierte en nota atómica del vault con frontmatter y wikilinks.

Los siete agentes devolvieron informe completo el mismo día. Venezuela
quedó descartada como línea propia a pedido del usuario (se conserva la
comparativa ya levantada). Notas resultantes:

- [[fuentes-suelo-global]] — suelo/subsuelo mundial, sin servicios chinos
- [[datos-agro-bolivia-venezuela]] — producción agrícola BO (+VE
  comparativo) y benchmark mundial (EE.UU. gana)
- [[datos-nasa-suelo]] — todo lo que la NASA aporta y lo que no mide
- [[bolivia-cultivos-regiones]] — qué se cultiva dónde, suelos, climas,
  calendario, ZAE
- [[analogos-mundiales]] — espejos edafoclimáticos de cada zona BO
- [[comparativa-cultivos-potenciales]] — cultivos ajenos a Bolivia con
  extracción NPK y ciclos
- [[catalogo-nutricional-ciclos]] — producción BO por nutrición y
  velocidad
- [[arquitectura-datos]] — síntesis: qué se cruza en caliente, qué se
  precarga, qué espera backend

| Agente | Encargo | Nota destino |
|--------|---------|--------------|
| A | Fuentes globales de datos de suelo y subsuelo (vetados servicios chinos) | `fuentes-suelo-global.md` |
| B | Datos de producción agrícola Bolivia vs Venezuela (qué, dónde, cuándo; comparación) + país con mejor dato de ciclos georreferenciado | `datos-agro-bolivia-venezuela.md` |
| C | Todo lo que la NASA aporta sobre suelo: humedad, perfiles, minerales, nutrientes | `datos-nasa-suelo.md` |
| D | Caso boliviano: qué se cultiva, dónde; tablas suelo × clima × cultivo | `bolivia-cultivos-regiones.md` |
| E | Análogos mundiales de suelo/clima boliviano y qué se cultiva ahí | `analogos-mundiales.md` |
| F | Cultivos que Bolivia no siembra pero sí sus análogos: nutrientes y velocidad | `comparativa-cultivos-potenciales.md` |
| G | Catálogo nutricional y de ciclos de la producción boliviana | `catalogo-nutricional-ciclos.md` |

Síntesis final (orquestador): `arquitectura-datos.md` con el cruce
propuesto de fuentes para la app.

## Datasets sugeridos por el reto (espejo)

El brief ordena los recursos por utilidad esperada:

1. `SPL3SMP_E` — SMAP Enhanced L3, humedad de suelo diaria 9 km (NSIDC,
   Earthdata Login, corre en navegador vía GIBS).
2. `ECO_L3T_JET` — ECOSTRESS evapotranspiración ~70 m (LP DAAC); el
   ESI `ECO_L4T_ESI` marca estrés hídrico.
3. `GPM_3IMERGDF` — precipitación diaria 0.1° desde 2000 (GES DISC).
4. `HLSL30`/`HLSS30` — Landsat+Sentinel-2 armonizados 30 m, COGs.
5. **NASA POWER API** — `power.larc.nasa.gov/api/temporal/daily/point`,
   JSON sin login, con CORS: la pieza «en caliente» más fácil.
6. `TELLUS_GRAC-GRFO_MASCON…` — GRACE mascons, agua total mensual 2002+.

Patrón de acceso común: `earthaccess.search_data(short_name, bbox,
temporal)` + login Earthdata gratis para descargar. POWER va sin auth.

«First hour» oficial: POWER por coordenadas → SMAP + ECOSTRESS + GPM
remuestreados a una grilla común → comparar ≥3 rotaciones con evidencia
y riesgos.

## Criterios de evaluación de cada fuente

- Cobertura (¿Bolivia adentro? ¿resolución?), acceso (API, WMS/WCS,
  descarga, scraping), autenticación, formato, licencia, si se puede
  llamar desde el navegador (CORS) o necesita proxy.
- Para datos de siembra: qué tan georreferenciado está (parcela, pixel,
  municipio), cobertura temporal, frecuencia.
