---
type: recurso
status: catalogado
created: 2026-11-14
dominio: mercado
cobertura: eeuu
acceso: api-key
revisit: "anual (censo/encuestas)"
tags: [graze-point, recurso, usda]
---

# USDA NASS QuickStats — estadística agrícola oficial

API del censo agropecuario: rendimiento, superficie sembrada,
producción y frecuencia de cultivo por condado y estado, décadas
atrás.

**Para GrazePoint:** calibra el recomendador con historia real — si en
ese condado la soya rindió X por 20 años, la sugerencia de soya llega
con respaldo estadístico. También dimensiona el argumento «la rotación
Y ya es practicada por N productores vecinos».

**Se cruza con:** [[cropscape-cdl]] (mapa vs cifra oficial), [[ams-market-news]]
(volumen vs precio), [[ag-data-commons]].

**Acceso:** API REST con key gratuita (`quickstats.nass.usda.gov/api`).
JSON por consulta — usable en vivo con timeout corto.
