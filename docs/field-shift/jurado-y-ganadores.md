---
type: investigacion
status: completo
created: 2026-11-14
tags: [reto, field-shift, space-apps, jurado, ganadores, estrategia]
---

# Cómo se elige al ganador del Space Apps — y qué tienen en común los que ganan

Investigación sobre el judging del NASA Space Apps Challenge: quién juzga,
cómo escala un proyecto de Santa Cruz al premio global, y qué comparten
los ganadores de años anteriores. Fuentes al final.

## Quiénes son los jurados

El proceso tiene tres pisos:

1. **Jurado local.** Cada sede tiene el suyo, armado por el Local Lead
   (en Santa Cruz históricamente la UCB; en La Paz el Bolivia Tech
   Hub/UMSA; en Cochabamba Jala University/UMSS). Perfiles típicos:
   profesores universitarios, gente de industria tech, representantes de
   agencias espaciales y sponsors. El jurado local aplica los criterios
   oficiales de NASA y elige los **Global Nominees** de la sede (cupos
   proporcionales al número de equipos) más un **Local People's Choice**.
2. **Global Judging.** Los nominees del mundo pasan a **Subject Matter
   Experts de NASA y de las agencias socias** (ESA, JAXA, CNES, CSA, AEB,
   entre otras). De ahí salen los **Global Finalists** (~40–45 equipos) y
   las Honorable Mentions. Escala 2025: 11.500+ proyectos → 1.294
   nominees → 45 finalistas → 10 ganadores.
3. **Executive Judging.** Un comité de líderes de NASA y agencias socias
   reparte los 10 Global Awards entre los finalistas.

**La decisión del ganador es global.** La sede local solo postula; NASA
decide. Los People's Choice desde ~2024 son premios puramente locales y
no son elegibles para premios globales.

Las 10 categorías de Global Award: Best Use of Science, Best Use of
Data, Best Use of Technology, Galactic Impact, Best Mission Concept,
Most Inspirational, Best Use of Storytelling, Global Connection,
Art & Technology y **Local Impact**.

## Ganadores globales recientes

**2025** (11.500+ proyectos): entre otros, Zumorroda-X (El Cairo) ganó
Art & Technology con el reto agrícola NASA Farm Navigators; QUEÑARIS
(Arequipa, Perú) ganó Local Impact con fenología de floración.

**2024** (9.996 proyectos): el reto agrícola «Leveraging Earth
Observation Data for Informed Agricultural Decision-Making» —gemelo del
nuestro— produjo **dos** ganadores globales: Waterwise (gestión hídrica
para agricultores, Best Use of Data) y NVS-knot (condiciones de siembra
con humedad de suelo y evapotranspiración, Galactic Impact).

**2023**: ASTROGENESIS (Lima) ganó Best Mission Concept; Space Quest
Maidens (Campinas, Brasil, equipo de chicas) Most Inspirational.

Patrón geográfico: NASA reparte los 10 premios en países distintos;
Sudamérica gana seguido (Argentina, Perú, Paraguay, Brasil).

**Bolivia:** nunca ha tenido Global Winner. Techo histórico: RoboScope
(UMSS, 2014) y Sensor Your Swarm (UMSA, 2015) llegaron a top-25 global.
Desde 2018 Bolivia llega hasta Global Nominee (CodeDinamina SCZ 2024,
CloudCatchers/WIRA Cbba 2025, varios LP 2025).

## Criterios oficiales (los mismos en local y global)

1. **Impact** — ¿resuelve un problema grande? ¿ayuda a muchos?
2. **Creativity** — ¿novedoso o mejora real de algo existente?
3. **Validity** — ¿científicamente válido? ¿funcionaría en el mundo real?
4. **Relevance** — ¿responde al reto, completo, factible, usable?
5. **Presentation** — ¿cuentan bien la historia?

## Qué tienen en común los ganadores

- **Datasets NASA nombrados y visibles.** Requisito de elegibilidad y
  corazón de «Best Use of Data»: citan misiones concretas (Landsat,
  TEMPO, POWER, SMAP).
- **Demo que corre.** Web apps y pipelines funcionando en vivo; no
  exigen producto terminado, pero algo que se vea andar pesa mucho.
- **Historia con persona concreta**, no lista de features. NASA: las
  soluciones con buen storytelling llegan más lejos.
- **Impacto local anclado y escalable.** Un problema real de la
  comunidad con proyección amplia.
- **Open source público** y página de proyecto completa en inglés.
- **Equipos multidisciplinarios ≤6**: código + datos + storytelling.

## Errores que descalifican

- No responder a un reto oficial; no marcar «submit for judging».
- Links rotos o privados (video, demo, repo) — causa #1 de descarte.
- No usar datos NASA/agencias socias.
- Página o video sin inglés.
- IA generativa no declarada (casilla obligatoria; marca de agua en
  imágenes/video generados).
- Empezar a desarrollar antes del hackathon.
- Pasar el deadline (domingo 15, 23:59 hora local de la sede).

## Conclusiones para fieldShift

Lo que nuestro proyecto debe cubrir para ser elegible y competitivo:

1. **Apuntar a Local Impact o Best Use of Data.** El reto agrícola con
   EO ya dio dos ganadores en 2024; Bolivia con un aliado real como la
   Fundación Patiño y respuestas de entrevista verificables es un caso
   de impacto local difícil de igualar.
2. **Cada número en pantalla nombra su dataset NASA** (POWER, SMAP,
   GPM, HLS) con versión — nada de «datos del satélite» genéricos.
3. **Demo corriendo en el navegador** con coordenadas reales de la
   Hacienda Patiño y sus polifíticas reales — no un ejemplo genérico.
4. **La historia es Sueleen y el ojímetro del técnico**: el dato que
   falta (punto óptimo de cosecha, humedad de suelo) ya está documentado
   en [[respuestas-sueleen-pena]]. Eso es oro para Presentation y para
   Most Inspirational.
5. **Repo público desde ya** con licencia open source y README en
   inglés citando datasets.
6. **Video ≤30 s** con guion: agricultor → problema → herramienta en
   acción → dato NASA → impacto. Subtítulos en inglés.
7. Declarar el uso de IA en la casilla; verificar todos los links en
   incógnito; submit antes de las 23:59.

## Fuentes

- spaceappschallenge.org/2025/awards/ — estructura de premios
- spaceappschallenge.org/resources/participant-faqs/ — cronograma 2026
  (nominados/finalistas en diciembre, ganadores en enero)
- nasa.gov — anuncio Global Winners 2024
- earthdata.nasa.gov — ganadores 2022
- Guía oficial de judging (criterios Impact/Creativity/Validity/
  Relevance/Presentation)
- bolivia.com y La Razón — finalistas bolivianos 2014/2015
- UCB SCZ — ganador local Santa Cruz 2024 (CodeDinamina)
- 2020.spaceappschallenge.org — guía de submission
- HackAthlone y DevStory — análisis del pipeline de judging
