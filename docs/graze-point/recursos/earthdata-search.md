---
type: recurso
status: catalogado
created: 2026-11-14
dominio: portal
cobertura: global
acceso: portal-earthdata
tags: [graze-point, recurso, nasa, portal]
---

# Earthdata Search — buscador unificado NASA

Un solo buscador sobre todos los DAAC: filtra por misión, fecha,
nube y rectángulo. De aquí salen los gránulos de [[smap]], [[gpm-imerg]],
[[modis-viirs]], [[nldas-gldas]], [[ecostress]] y [[gedi]].

**Para GrazePoint:** el «catálogo de catálogos»: cuando el router
necesita una fuente nueva, primero se busca aquí qué colección la
sirve y con qué latencia.

**Acceso:** web + CMR API (JSON, sin login para buscar; login para
bajar). El CMR sí es consultable en vivo para descubrir gránulos.
