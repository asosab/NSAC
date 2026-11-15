---
type: recurso
status: catalogado
created: 2026-11-14
dominio: agua-disponible
cobertura: eeuu
acceso: api-abierta
revisit: "15 min – diario, décadas de historia"
tags: [graze-point, recurso, usgs]
---

# USGS NWIS — agua superficial y subterránea

National Water Information System: niveles de pozo, caudales de río
y calidad de agua, con API JSON pública (`waterservices.usgs.gov`).

**Para GrazePoint:** disponibilidad hídrica real del análogo EEUU —
¿hay acuífero para regar la rotación propuesta? ¿el arroyo cercano
aguanta la demanda? Serie histórica para hablar de sequía con datos.

**Se cruza con:** [[smap]]/[[nldas-gldas]] (humedad de suelo vs nivel
freático), [[gpm-imerg]] (lluvia → caudal), [[openet]] (demanda vs
oferta).

**Acceso:** API REST abierta, JSON, sin key. De las fuentes más
rápidas de la lista — entra al router en vivo cuando aplique.
