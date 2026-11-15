---
type: recurso
status: catalogado
created: 2026-11-14
dominio: clima
cobertura: global
acceso: api-key-cola
resolucion: "0.25° (~30 km)"
revisit: "horario, 1940–hoy"
tags: [graze-point, recurso, ecmwf]
---

# ERA5 — reanálisis climático ECMWF

Reconstrucción horaria del clima global desde 1940: temperatura,
lluvia, viento, humedad, temperatura de suelo, radiación. La serie
continua más completa que existe.

**Para GrazePoint:** donde no hay estación (Bolivia rural), ERA5
rellena: temperatura horaria para riesgo de helada, viento para
deriva de riego, serie de 40 años para anomalías. Es el fallback
profundo de [[nasa-power]] cuando POWER falta.

**Se cruza con:** [[nasa-power]] (mismo rol, más grueso pero sin cola),
[[nldas-gldas]] (otro asimilado), [[prism]] (equivalente fino EEUU),
[[gaez]] (clima como input de aptitud).

**Acceso:** CDS API con key; **las peticiones entran en cola** — puede
tardar minutos. Nunca en el camino en vivo: precarga o fallback lento
con promesa al usuario.
