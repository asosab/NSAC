---
type: arquitectura
status: propuesta
created: 2026-11-14
tags: [graze-point, recursos, router, failover]
---

# Router de fuentes — suicheo entre APIs por capacidad

El reto premia cruzar la mayor cantidad de recursos posibles, y el
tiempo corre en contra: algunos servicios son lentos, tienen cola o
caen. La app no debería preguntar «¿qué API uso?» sino «¿qué dato
necesito?». Cada **capacidad** (lluvia, humedad, NDVI…) tiene una
lista ordenada de proveedores; el router elige el primero que responda
bien y a tiempo.

## Tres modos de acceso

El catálogo ([[index|índice de recursos]]) se divide por latencia, no
por agencia:

1. **En vivo** — API abierta o con key, respuesta en segundos. El
   router los consulta en caliente por parcela.
2. **Precarga** — Earthdata, portales de descarga, NetCDF pesado. Se
   bajan una vez por predio a `.tmp/graze-point-data/` (o a un bucket)
   y la app lee el recorte local. Suman al «cruce de fuentes» sin
   costar latencia.
3. **Validación** — portales manuales (CoCoRaHS, WSS visual). No entran
   al pipeline automático; sirven para defender cifras ante el jurado
   y en el informe.

## Cadenas de failover por capacidad

Orden: primero el más rápido que cubra la parcela. `→` = fallback
secuencial; `⚡` = carrera en paralelo (`Promise.any`-like, gana el
primero válido).

| Necesidad | Cadena | Comentario |
|---|---|---|
| Clima actual (T, HR, lluvia) | [[nasa-power]] → [[nldas-gldas]] ⚡ [[era5]] | POWER ya corre. Si cae, GLDAS (precargado) o ERA5 (cola → responder con último caché + aviso). |
| Lluvia medida (no modelada) | [[gpm-imerg]] (precarga) → [[cocorahs]] (solo análogo EEUU) | IMERG Early ~4 h de rezago; CoCoRaHS valida a la mañana siguiente. |
| Humedad de suelo | [[nasa-power]] GWETROOT → [[smap]] (precarga) → [[nldas-gldas]] ⚡ [[era5]] | Hoy POWER es el único en vivo; SMAP/GLDAS/ERA5 triangulan la misma variable — eso *es* el cruce. |
| NDVI / vigor | [[sentinel-2]] → [[landsat]] (HLS) → [[modis-viirs]] | Bolivia: S2 primario por detalle y revisita; nubes → HLS; fallback MODIS. EEUU: añade [[naip]] como zoom fino precargado. |
| Evapotranspiración | [[openet]] (análogo EEUU) → [[ecostress]] (precarga) → ET₀ derivada de [[nasa-power]] | En Bolivia no hay OpenET: ECOSTRESS precargada + ET₀ de POWER (Penman con T, HR, viento, radiación). |
| Suelo edáfico | muestra laboratorio propia → [[web-soil-survey]]/[[ssurgo-statsgo2]] (EEUU) → [[gaez]] constraints (global) | La muestra del 16 manda; en el análogo la SDA API responde en vivo; GAEZ cubre Bolivia. |
| Aptitud por cultivo | [[gaez]] → [[quickstats]]+[[cropscape-cdl]] (EEUU) | GAEZ ya cruzó clima+suelo por especie; en el análogo, «qué se siembra y cuánto rinde» es evidencia empírica. |
| Terreno / erosión | [[srtm]] (precarga única) + factor K de [[ssurgo-statsgo2]]/[[gaez]] | Estático: se baja una vez por polígono y vive en la ficha. |
| Historial de cultivo | [[cropscape-cdl]] (EEUU, API viva) → serie NDVI de [[sentinel-2]]/[[landsat]] (clasificación propia, Bolivia) | En EEUU está resuelto; en Bolivia se infiere de la curva fenológica + MapBiomas/WorldCereal (fase 2 del plan). |
| Agua disponible | [[usgs-nwis]] (EEUU, API viva) → [[smap]]/[[nldas-gldas]] (proxy global) | Solo relevante si la rotación propone riego. |
| Viabilidad de mercado | [[ams-market-news]] (precio) + [[quickstats]] (producción) | Ambas con key gratuita, JSON rápido. Solo análogo EEUU; en Bolivia marca el patrón para ferias. |
| Contexto ecosistémico | [[nlcd]] → [[landfire]] → [[gedi]] (precarga) | Qué rodea la parcela: bosque, humedal, combustible. |

## Cómo se ejecuta el suicheo

```text
capacidad.humedadSuelo = [
  { fuente: power,   enVivo: true,  timeout: 8000,  cobertura: global },
  { fuente: smap,    enVivo: false, cache: ".tmp/graze-point-data/smap" },
  { fuente: gldas,   enVivo: false, cache: ".tmp/graze-point-data/gldas" },
  { fuente: era5,    enVivo: true,  timeout: 120000, lento: true },
]
```

Reglas:

- **Secuencial con timeout** cuando la primera fuente suele bastar
  (POWER, NWIS): pedir, esperar `timeoutMs`, si falla o devuelve vacío
  pasar al siguiente. Es lo que ya hace `power.js` con `AbortController`.
- **Carrera en paralelo** cuando dos fuentes tardan parecido y cualquiera
  sirve (GLDAS ⚡ ERA5 para serie histórica): disparar ambas, tomar la
  primera válida, cancelar la otra. Ahorra segundos cuando el proveedor
  está degradado sin estar caído.
- **Normalización**: cada proveedor devuelve su formato; el router lo
  traduce a un esquema común (`{ valor, unidad, fecha, fuente,
  confianza }`). El campo `fuente` viaja hasta el informe — el jurado
  quiere ver de dónde salió cada cifra.
- **Cobertura como puerta**: fuentes EEUU ni siquiera se intentan para
  coordenadas fuera de su rango. `cobertura(lat, lon)` decide antes de
  gastar un request.
- **Caché y degradado elegante**: toda respuesta se cachea por
  coordenada redondeada (POWER ya lo hace, 6 h). Si toda la cadena
  falla, se devuelve el último dato cacheado marcado `stale: true` —
  la ficha nunca queda en blanco en plena demo.
- **Cola larga fuera del camino**: ERA5/CDS y Earthdata jamás bloquean
  una pantalla. Van por precarga o se prometen («la serie histórica
  llega al informe por WhatsApp»).

## Qué suma cada fuente al relato del jurado

El «Best Use of Data» no se gana listando APIs: se gana mostrando que
la misma variable cruzada por tres fuentes independientes dice lo
mismo — o explicando por qué difiere. Ejemplos ya disponibles:

- Lluvia del último mes: POWER (modelo) vs IMERG (satélite) vs estación
  propia de la Hacienda (terreno) → triangulación modelo/medición/campo.
- Humedad de suelo: GWETROOT vs SMAP vs «tanteo del técnico» → la
  historia del ojímetro con números detrás.
- Aptitud de la rotación sugerida: GAEZ (global, agnóstico) vs
  QuickStats/CDL (qué hacen los vecinos del análogo) vs la muestra de
  suelo del 16.

## Pendientes de implementación

1. Extraer el patrón proveedor de `power.js` a `services/fuentes/` con
   el contrato `{ nombre, cobertura, timeout, fetch, normaliza }`.
2. Keys gratuitas por registrar: QuickStats, AMS, OpenET, CDS (ERA5),
   Earthdata (descargas), Copernicus Data Space.
3. Script de precarga por predio: SRTM tile + HLS/S2 recorte + GAEZ
   por especie del catálogo → `.tmp/graze-point-data/<predio>/`.
4. Decidir el análogo EEUU definitivo para activar la rama USDA
   ([[analogos-mundiales]] tiene los candidatos).
