---
type: investigacion
status: activo
created: 2026-11-08
tags: [reto, spherex, space-apps, datos]
---

# Reto «Planet X and SPHEREx» — estudio

Reto de nivel avanzado del NASA Space Apps Challenge 2026 (categorías:
astrofísica, planetas y lunas, software). El brief pide una herramienta web
pública que muestre imágenes del cielo de la misión SPHEREx y haga fácil ver
cómo cambia el cielo entre visitas: cometas, asteroides, estrellas y enanas
marrones se delatan por su desplazamiento entre exposiciones.

Página oficial: https://www.spaceappschallenge.org/2026/challenges/planet-x-and-spherex/
(no admite fetch directo; contenido tomado de espejos locales del evento y de
spacedata.swapniltamse.com, que reproduce el statement con datasets sugeridos).

## Lo que piden, leído en detalle

El verbo del enunciado es «display»: hay que construir un visor. Lo que
distingue un proyecto flojo de uno bueno aquí es que el visor deje ver el
*cambio*, no solo la imagen. El statement sugiere blinking (alternar visitas
en orden temporal) y menciona overlay de datos WISE para confirmar objetos en
movimiento.

Los blancos de prueba que nombra el reto no son casuales; cubren los dos
fenómenos que el juez va a comprobar:

- WISE 0855 y Epsilon Indi B: enanas marrones cercanas, movimiento propio alto.
- Estrella de Barnard: la estrella con mayor movimiento propio del cielo.
- RW Aurigae: estrella joven con estallidos de acreción y eventos de
  extinción. Variable de verdad.
- R Draconis: variable Mira, cambia de brillo en ciclos de meses.

Mitad se mueven, mitad varían. La herramienta tiene que detectar ambos.

## El dato SPHEREx

- La misión mapea todo el cielo cada ~6 meses en 102 bandas entre 0.75 y 5.0 µm,
  con 6 detectores (D1–D6) y filtros lineales variables (LVF). Misión
  2025–2027; operaciones científicas desde mayo de 2025.
- Consecuencia clave del LVF: cada exposición cubre *una* banda por píxel. Un
  punto del cielo tarda 1–2 semanas en acumular su espectro completo de 102
  canales. No existe «la foto del día» a todo color: cada banda llega en un
  instante distinto. Esto complica la fotometría instantánea y, a la vez, es
  la ventaja competitiva del dataset (ver más abajo).
- Productos: Spectral Image MEF FITS (varios cientos de MB; HDUs de imagen,
  varianza, flags, PSF y WCS espectral por píxel). Se consumen casi siempre
  como cutouts, no enteros.
- Releases: QR (jul 2025), QR2 (oct 2025), QR3 (sep 2026). Son *quick
  release*: los productos cambian entre releases; conviene registrar la
  versión (`DATAREL`) en todo lo que se cachee.
- Campos profundos en los polos eclípticos: decenas o cientos de visitas por
  punto. Si el hackathon necesita más cadencia que el barrido general, ahí
  está el material.

### Acceso

| Vía | Endpoint / herramienta | Nota |
|-----|------------------------|------|
| TAP | `https://irsa.ipac.caltech.edu/TAP` | Tablas `spherex.obscore`, `spherex.artifact`+`spherex.plane`. Datos nuevos en ~semanal, sin el retraso de SIA. |
| SIA2 | `https://irsa.ipac.caltech.edu/SIA?COLLECTION=spherex_*` | Más simple; ~1 día de retraso tras ingesta. |
| Cutouts | `?center=ra,dec&size=deg` sobre la URL de la imagen | Devuelve el MEF recortado; es lo razonable para un visor web. |
| Directorios | `https://irsa.ipac.caltech.edu/ibe/data/spherex/…` | Navegables; espejados en AWS S3. |
| GUI | SPHEREx Data Explorer (IRSA) | Útil para explorar a mano; no es el entregable. |
| Python | `pyvo`, `astroquery`, `astropy` | Pipeline normal: TAP → cutouts → fotometría. |

Detalle CORS a verificar el día del evento: si el navegador no puede leer los
FITS de IRSA directamente, hace falta un backend (o funciones serverless) que
descargue cutouts y sirva PNG/tiles. Presupuestar ese proxy desde el diseño.

## Recursos para cruzar

Por orden de utilidad esperada, según el statement y el atlas de datos:

1. **AllWISE** (`allwise_p3as_psd` en el mismo TAP de IRSA): posiciones y
   flujo IR de ~750 M de fuentes, época ~2010–2014. Cruzada con SPHEREx da una
   línea de base de >10 años para movimiento propio y variabilidad lenta. El
   propio statement la sugiere para confirmar movers.
2. **JPL Horizons** (`ssd.jpl.nasa.gov/api/horizons.api`): efemérides de
   planetas, asteroides y cometas para cualquier instante. Sirve para pintar
   la traza predicha de cuerpos conocidos sobre cada visita.
3. **JPL SBDB** (`ssd-api.jpl.nasa.gov/sbdb.api`): elementos orbitales y datos
   físicos de cuerpos menores; etiqueta los movers conocidos.
4. **Gaia DR3** (TAP en `gea.esac.esa.int`): movimientos propios y paralajes
   de ~1.8 G de estrellas. Permite propagar la posición esperada a la época
   SPHEREx y medir el residual.
5. **NEOWISE** (exposiciones sueltas en IRSA): fotometría en 3.4 y 4.6 µm en
   épocas anteriores; extiende la línea de base temporal para variables.
6. **ZTF / alert stream**: transientes ópticos; un evento ZTF con contraparte
   IR variable en SPHEREx es un caso cruzado potente.
7. **MPC y SIMBAD**: confirmación de candidatos y resolución de nombres.
8. **SPLICES**: catálogo SPHEREx de fuentes de hielo; útil como referencia de
   SEDs con rasgos de absorción.

## Análisis cruzados para variables poco comunes

Aquí está el filo del proyecto. El reto dice «ver cómo cambia el cielo»; la
versión barata es detectar flujo que cambia. Las combinaciones de abajo son
las que sacan cosas raras.

### Movimiento residual contra catálogo

Propagar la posición AllWISE o Gaia a la época de cada visita SPHEREx y medir
el residual. Tres resultados posibles: coincide (objeto estático), el
residual sigue el vector de movimiento propio del catálogo (movers conocidos,
caso WISE 0855) o el residual no lo explica nada conocido — ahí viven los
candidatos a enanas marrones nuevas, objetos interestelares y, en el espíritu
del reto, el «Planeta X». Un *score de desplazamiento inexplicado* por fuente
es un buen ranking para el visor.

### Trazas de efemérides sobre la imagen

Para cada `t_min`, pedir a Horizons las posiciones de cuerpos menores en el
campo. Los movers que caen sobre la traza son asteroides/cometas conocidos
(etiquetar con SBDB: clase orbital, NEO, PHA). Un mover que *no* cae sobre
ninguna traza predicha es un flag de descubrimiento. Ojo: ~40 % de los SSOs
en campo serán demasiado débiles para estar catalogados por magnitud; la
ausencia de traza no prueba novedad, la prioriza.

### Variabilidad fotométrica por banda

Cada `energy_bandpassname` (D1–D6) forma su propia serie temporal. Construir
la curva de luz por detector en vez de colapsar todo en una. Un objeto que
varía en D2 (1.1–1.6 µm) y no en D5 (3.8–4.4 µm) está diciendo algo físico:
variabilidad *cromática*, mucho más rara y discriminable que la acromática.

### Variabilidad de forma espectral — la perspectiva que casi nadie explota

La variable poco común por excelencia en SPHEREx no es «se puso más brillante»
sino «cambió de color». Entre visitas se puede comparar la SED acumulada:

- Aparición de absorción de hielo de agua ~3.0 µm o de CO₂ ~4.26 µm:
  desgasificación cometaria, o un disco que muestra su hielo al oscurecerse.
- Cambio de pendiente del continuo en objetos jóvenes: estallido de acreción
  (RW Aur es el blanco de prueba justo por esto; familia de las variables
  UXor, que se atenúan por polvo que pasa por delante).
- Eventos de extinción: el objeto cae más en el azul que en el rojo → polvo
  cruzando la línea de visión; candidatos a tránsitos de exocometas tipo β Pic.
- Rasgos PAH ~3.3 µm que aparecen o cambian.

Un «índice de variabilidad espectral» (dispersión entre épocas por canal,
normalizada por el flujo medio) agruparía los objetos por *firma de
variabilidad*, no por amplitud: eso es un eje nuevo para el clustering y para
la interfaz (colorear el mapa por «qué banda varía»).

### Movers que además varían

El cruce de los dos ejes anteriores: un objeto que se desplaza y cambia de
brillo entre visitas apunta a rotación de asteroide (curva de luz por forma),
actividad cometaria intermitente o binaridad. Clase rara, fácil de rankear:
cruzar el catálogo de movers con el de variables y mirar la intersección.

### Transientes puros

Sustracción de imágenes entre visitas (alineadas por WCS): los residuales
puntuales que no están en ninguna visita anterior ni posterior son novae,
supernovas, TDEs o flare stars. Con cadencia semestral solo se cazan eventos
largos, pero los campos profundos de los polos tienen cadencia mucho más fina
y ahí la sustracción sí pesca eventos cortos.

### Línea de base década con WISE

AllWISE ~2010–2014 + NEOWISE hasta 2024 + SPHEREx 2025–2027: ~15 años de
fotometría IR en bandas solapadas. Variables de periodo muy largo (Miras como
R Dra en distintas fases, estrellas AGB, YSOs con ciclos de acreción largos)
solo se ven cruzando las misiones.

## Práctica recomendada (primera hora del evento)

1. TAP sobre `spherex.obscore` alrededor de WISE 0855
   (RA 08h55m10.8s, Dec −07°14′42.5″) con `CONTAINS(POINT, s_region)` y orden
   por `t_min`.
2. Descargar cutouts de cada visita, alinear por WCS, blink en orden temporal.
3. Comparar la posición por época con AllWISE: debería verse el movimiento
   propio.
4. Repetir con Barnard, Eps Indi B, RW Aur y R Dra — cubren mover rápido,
   binaria de enanas marrones, variable de acreción y Mira.

## Riesgos y letritas pequeñas

- Los datos son quick release: entre QR2 y QR3 cambian productos y headers.
  Fijar la versión y no asumir estabilidad.
- Las bandas llegan escalonadas en el tiempo (LVF): comparar «épocas» exige
  agrupar por ventana, no por visita.
- Respetar los mapas de flags/varianza; sin enmascarar artefactos el blink
  parece lleno de movers falsos.
- La PSF vive en una extensión propia del MEF con WCS distinta; fotometría seria
  requiere leerla (hay tutorial de IRSA) o usar apertura con fondo anular.
- Horizons tiene rate limits; cachear efemérides por (cuerpo, época).
- La lista oficial de recursos del reto abre el 13 de noviembre; conviene
  revisarla antes de cerrar el diseño.

## Enlaces

- Statement: https://www.spaceappschallenge.org/2026/challenges/planet-x-and-spherex/
- Espejo con datasets y starter code: https://spacedata.swapniltamse.com/challenges/planet-x-and-spherex/
- Archivo SPHEREx en IRSA: https://irsa.ipac.caltech.edu/Missions/spherex.html
- Tutoriales IRSA (cutouts, PSF, cloud): https://caltech-ipac.github.io/irsa-tutorials/
- Pipeline de fotometría espectral existente: https://github.com/fkiwy/spexpi
- Horizons API: https://ssd-api.jpl.nasa.gov/doc/horizons.html
- SBDB API: https://ssd-api.jpl.nasa.gov/doc/sbdb.html
- Paper de la misión (cadencia, ciencia de dominio temporal): arXiv:2511.02985
