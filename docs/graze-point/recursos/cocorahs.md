---
type: recurso
status: catalogado
created: 2026-11-14
dominio: precipitacion
cobertura: norteamerica
acceso: portal
revisit: "diario (mañanas)"
tags: [graze-point, recurso, comunidad]
---

# CoCoRaHS — lluvia medida por voluntarios

Community Collaborative Rain, Hail and Snow: miles de pluviómetros de
voluntarios en Norteamérica reportando cada mañana. Observación
hiper-local que el satélite no ve.

**Para GrazePoint:** validación de [[gpm-imerg]] en el análogo EEUU —
¿la tormenta que IMERG estimó cayó de verdad en ese condado? Útil para
explicar diferencias satélite vs campo cuando el agricultor dice
«aquí no llovió eso».

**Se cruza con:** [[gpm-imerg]], [[nasa-power]], [[prism]] (los tres
estiman; CoCoRaHS mide), [[usgs-nwis]] (efecto río abajo).

**Acceso:** mapas web por estado/condado y descarga CSV. Sin API
oficial rápida → consulta manual o scrape ligero para validación,
no para router en vivo.
