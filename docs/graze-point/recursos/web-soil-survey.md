---
type: recurso
status: catalogado
created: 2026-11-14
dominio: suelo-edafico
cobertura: eeuu
acceso: portal-api
tags: [graze-point, recurso, usda, nrcs]
---

# Web Soil Survey (WSS) — suelos oficiales de EE.UU.

Aplicación del NRCS con los mapas y atributos oficiales de suelo
(SSURGO dentro). Por parcela devuelve textura, drenaje, materia
orgánica, capacidad de agua, riesgo erosivo y aptitud de uso.

**Para GrazePoint:** en el análogo EEUU es la línea base edáfica del
PRIAS sin laboratorio — el equivalente de la muestra de suelo que la
Hacienda prometió para el 16. La comparación «suelo USDA vs suelo
medido» es un buen argumento de validación.

**Se cruza con:** [[ssurgo-statsgo2]] (el dataset detrás), [[srtm]]
(pendiente), [[gaez]] (mismo concepto, escala global).

**Acceso:** portal WSS + API Soil Data Access (SQL-like, POST, sin key).
Consultable en vivo para el análogo; no cubre Bolivia.
