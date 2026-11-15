---
type: recurso
status: catalogado
created: 2026-11-14
dominio: suelo-edafico
cobertura: eeuu
acceso: api-descarga
tags: [graze-point, recurso, usda, nrcs]
---

# SSURGO / STATSGO2 — atributos de suelo NRCS

SSURGO: polígonos de suelo a escala de campo con textura, MO, pH,
drenaje, grupo hidrológico, capas restrictivas y capacidad de agua.
STATSGO2: la versión regional gruesa para donde SSURGO no llega.

**Para GrazePoint:** alimenta el recomendador en el análogo EEUU con
las mismas variables que en Bolivia saldrán del laboratorio — sirve
para probar el modelo «como si ya tuviéramos la muestra». El factor K
de erosión + pendiente [[srtm]] da el índice de erosión de la ficha.

**Se cruza con:** [[web-soil-survey]] (su interfaz), [[gaez]] (soil
constraints global), [[smap]] (humedad observada vs capacidad).

**Acceso:** Soil Data Access API (POST SQL, sin key) + descarga por
condado. En vivo para el análogo; Bolivia → fallback [[gaez]] o la
muestra propia.
