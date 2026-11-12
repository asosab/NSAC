---
type: decision
status: propuesta
created: 2026-11-12
tags: [reto, field-shift, patino, enfoques]
---

# Top 10 enfoques Field Shift para Fundación Patiño

Cruce de [[fundacion-patino]] (datos duros de sus informes 2022–2025)
con [[arquitectura-datos]] y las fuentes verificadas de [[00-plan]].
Ordenados por encaje con su trabajo × factibilidad en el hackathon.

| # | Enfoque | Trabajo Patiño que extiende | Datos |
|---|---|---|---|
| 1 | **Recomendador de rotación** «qué sembrar después de X»: 3 opciones rankeadas por N, ciclo vs ventana de lluvia, tolerancia pH | Rotación explícita en agroecología; suelos arenosos pobres de la Hacienda | POWER, SoilGrids WCS, su catálogo de polifíticas |
| 2 | **PRIAS digital**: ficha de parcela con serie climática + línea base edáfica + registro de sus mediciones | Proyecto PRIAS (monitoreo de suelo en parcelas demostrativas, desde 2023) | POWER, SoilGrids + WoSIS (perfiles medidos) |
| 3 | **Ventana de siembra forrajera**: cuándo sembrar pasturas o maíz para ensilaje | Ensilaje 42,5 t/ha en Pairumani; polifíticas en SCZ | POWER histórico, SMAP/GWET, GPM |
| 4 | **Diagnóstico de parcela**: 5 años de historial NDVI antes de la visita técnica | >300 productores/técnicos formados al año; red de 1.342 productores semilleros | HLS/Landsat 30 m, WorldCereal |
| 5 | **Alerta de estrés forrajero**: calor y estrés hídrico del dosel → anticipar reservas de forraje | Lácteos: 54.270 l SCZ, >1 M l Pairumani; pastoreo racional | POWER (calor), ECOSTRESS, GLDAS |
| 6 | **Selector de abonos verdes** según textura, pH y precipitación de la zona | Abonos verdes, ~1.500 t compost/año, línea de bioinsumos | SoilGrids, Köppen, especies ya validadas por ellos |
| 7 | **Análogos climáticos**: regiones gemelas del mundo y sus cultivos, como insumo de experimentación | Su misión es probar y difundir cultivos | [[analogos-mundiales]], MapSPAM, FAOSTAT |
| 8 | **Ventana Altiplano** para su piloto de semillas de cereales andinos | Estrategia 2024: proyecto piloto andino con alianza estratégica | POWER (lluvia + T2M mínima/heladas), SoilGrids |
| 9 | **Indicadores de regeneración**: tendencia de salud de suelo con SOC baseline + manejo + NDVI | Balance de carbono de Pairumani; Mesa Boliviana de Carne Sostenible | SoilGrids (SOC), NDVI, declaración de manejo |
| 10 | **Capa educativa** «explorador de mi provincia» para escolares | Bolivia Ecológica, laboratorios pedagógicos, 6.400 estudiantes del Paseo | NDVI, POWER, FAOSTAT por región |

## Prioridad sugerida para el demo del sábado

1 + 3 comparten el mismo pipeline (POWER + suelo + tabla de cultivos)
y son demo directa del reto. El #2 es el gancho de co-creación con la
Fundación: se les presenta como «su PRIAS, pero digital y con NASA
encima». Los demás son extensión si sobra tiempo o segunda fase.
