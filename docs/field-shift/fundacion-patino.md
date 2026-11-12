---
type: investigacion
status: completo
created: 2026-11-11
updated: 2026-11-12
tags: [reto, field-shift, patino, aliados, entrevistas]
---

# Fundación Patiño y el reto Field Shift

Investigación del agente H para [[00-plan|Field Shift]]. Aliado
potencial en Santa Cruz: usuarios reales, banco de pruebas y
entrevistas para afinar la herramienta.

## Contexto institucional

Dos entidades con el mismo apellido: la **Fundación Simón I. Patiño
(FSIP)**, creada en Ginebra en 1958 por los herederos del magnate del
estaño, que financia; y la **Fundación Universitaria Simón I. Patiño
(FUSIP)**, creada en Bolivia en 1931, que ejecuta. Cuatro áreas: salud
pediátrica, educación, cultura y **agroecología**. ~400 colaboradores,
presencia en Cochabamba, La Paz, El Alto, Santa Cruz y Potosí. El pilar
agropecuario es un cuarto de la misión, con infraestructura propia.

Fuentes: Informe de Actividades 2024
(patino.org/wp-content/uploads/2025/09/Fundacion-Patino-Informe-de-Actividades-2024.pdf)
· patino.org/es/nuestro-compromiso-fundacional · Informe 2021.

## 1. Índice de proyectos vinculados a agricultura

| Proyecto | Sede | Qué hace | Estado |
|---|---|---|---|
| **Hacienda Patiño / CEASIP** | Santa Cruz, Lomas de Arena | Centro experimental ~400 ha (80% conservación): horticultura, fruticultura, apicultura, ganadería regenerativa, lácteos (~880.000 l/año). Pruebas para suelos arenosos pobres y clima tropical; reserva de bovino criollo. | **Activo** |
| **Granja Modelo Pairumani** | Cochabamba (500 ha) | Lácteos orgánicos, **rotación de cultivos**, recuperación de suelos, gestión del agua, capacitación anual a pequeños productores. | Activo |
| **Centro Fitotécnico y de Semillas** | Pairumani | Desde 1970: banco de germoplasma (731 accesiones de ají, maíz, haba, arveja, vainita), mejoramiento, fitopatología, cultivo de tejidos, semilla mejorada a productores. | Activo |
| **Programa nacional de agroecología** | Nacional | >1.000 productores acompañados; >3.000 formados/año en agroforestería, **rotación de cultivos**, compostaje; circuitos cortos. | Activo |
| **Días de Campo y talleres** | Hacienda Patiño | Jornadas abiertas + talleres pagados para técnicos (ej. Nutrición Animal jun-2026). | Activo |
| **Pasantías preprofesionales** | Hacienda Patiño | Convocatoria anual: ganadería regenerativa, agricultura sostenible, lácteos, educación ambiental. | Activo |
| **Seminario Int. de Ganadería Sostenible** | Santa Cruz | III edición **13–14 nov 2026** (¡el finde del Space Apps!), con UEB. Día 2 de campo en la Hacienda: PRV, polifíticas, silvopastoreo. | En curso |
| **Ediciones Patiño / Bolivia Ecológica** | Santa Cruz | Editorial ambiental y agropecuaria. | Activo |
| **Becas Patiño** | Bolivia→Europa | Maestrías completas desde 1931; becario vuelve a aportar. | Activo |
| **Espacios Patiño + Lab. Pedagógicos** | SCZ (Independencia #89), Cbba, LP | Centros educativos; laboratorios con impresión 3D/láser (2024); el cruceño con enfoque ecología para jóvenes. | Activo |
| **Convenio INIAF–UAGRM–FUSIP (maíz)** | Nacional | Convenio 2014 de investigación aplicada. | Histórico (verificar) |
| **Startups agroecología** | La Paz | Piloto con Solydes/Pista8 + Unifranz. | Parcial / verificar |
| **Finca La Vizcaína** | Cochabamba | Vivero-semillero histórico de la familia; función probablemente absorbida por la Granja Modelo. | Histórico / no verificado |

Color útil: recibieron el **Premio Sombra del Tajibo** en agricultura
regenerativa, y la directora presenta indicadores y métricas de gestión
ganadera — les interesan los datos.

## 2. Fit del reto con sus programas

Encaje casi directo: la rotación de cultivos es práctica explícita en
su página de agroecología, y su problema declarado — suelos arenosos
pobres, clima tropical extremo, monocultivo agotador — es la decisión
edafoclimática que resuelve NASA POWER + NDVI + suelo.

- **Hacienda Patiño como banco de pruebas:** la ecohuerta prueba
  variedades cada temporada; la app puede correr en sus parcelas
  demostrativas y mostrarse en Días de Campo.
- **Extensión a ~1.000 productores:** el cuello de botella es
  personalizar por parcela; una recomendación «qué sembrar después de
  X dado tu suelo y tu ventana de lluvia» escala el trabajo del técnico.
- **Suelos de Santa Cruz:** el CEASIP trabaja sobre arenosos
  degradados por soya; la rotación con cultivos de servicio es su
  discurso (ecosistema PRIAS/CREA).
- **Educación:** NDVI de la propia región como material didáctico en
  los Laboratorios Pedagógicos.
- **Datos para indicadores:** ya usan métricas ganaderas; series
  climáticas gratuitas les sirven sin estaciones propias.
- **Advertencia honesta:** su sesgo es ganadero (leche) y hortícola —
  la app debe contemplar **pasturas y cultivos de servicio**, no solo
  granos.

## 2b. Datos duros extraídos de los informes anuales

PDF en `.tmp/field-shift-data/patino/` (2022, 2023 y 2025 en fr/es;
texto extraído en `.txt` al lado). La «Hacienda Patiño» se llamaba
**CEASIP hasta 2023**, año en que se renombró e integró
agroecoturismo.

### Hacienda Patiño — Santa Cruz (~400 ha, suelos arenosos)

| Año | Producción | Capacidad instalada / indicadores |
|---|---|---|
| 2023 | 12.466 kg hortalizas (25 variedades) · 14.396 kg fruta (12 especies) · 34.827 kg compost+lombricompost · 355 kg miel · ~24.600 kg yogurt, 6.500 kg queso | SPG ecológica renovada · 50 ha bosque secundario silvopastoral · polifíticas: Brachiaria (Mombaza, Tanzania, Decumbens, Humidícola), Gatton Panic + Glycine, Desmodium, Stylosanthes, Calopogonium, Archer · 35 cursos / 876 personas · sendero regenerador 2,6 km · pozo nuevo de agua · planta de ensilaje |
| 2024 | Mismas cosechas reportadas · 1.631 compradores/mes en venta directa | PRIAS + lab. genética reproductiva bovina + biotipo criollo cárnico · 35 cursos / 977 participantes · 8.724 beneficiarios (+32 %) · ingresos: +91 % ecoturismo, +48 % ganadería, +150 % lácteos · ejecución presupuestaria 75 % |
| 2025 | **54.270 l leche (+45 %)** · 10 puntos de venta | >300 productores/técnicos en pastoreo racional, ensilaje, bioinsumos, cercas eléctricas · 475 personas en huertos/preparados biológicos · 4.700+ visitas pedagógicas · 6.400 estudiantes (Paseo Producción Sostenible) · prácticas replicadas en fincas de >100 ha hasta 2.000 ha |

Temas de experimentación citados (2023–2025): abonos verdes, costo de
producción de 10 hortalizas, control alternativo de mosca blanca en
cítricos, forraje verde hidropónico de sorgo y maíz, cría de reinas,
cultivares de frijol, control de saúva y hormigas, **biochar
artesanal**, control biológico de garrapatas, biodigestores,
probióticos, riego, mejoramiento genético.

**PRIAS** (Prácticas Regenerativas para la Innovación Agrícola
Sostenible): desde 2023, parcelas demostrativas con **seguimiento y
análisis de características del suelo** en producción regenerativa —
ya existe un protocolo de medición edáfica donde enchufar la app.

### Granja Modelo Pairumani — Cochabamba (~480 ha, valle)

| Año | Producción | Extensión / investigación |
|---|---|---|
| 2023 | ~1.038 t compost en 111 ha · 339.000 l lisier · 721.741 l leche transformada (65 % pasteurizada) · ensilaje 1.728 t en 40,6 ha (**42,53 t/ha**) · semillas certificadas a productores | Red de >40 pequeños productores orgánicos · ensayos de dosis de compost en maíz |
| 2024 | 975.753 l leche · 921.235 l transformados (52 % pasteurizada, 43 % yogurt, 5 % queso, 0,34 % mantequilla) | 13 experimentos in situ (insumos en biocontrol, sustratos carbonosos, veza para C/N; ensayos regionales maíz/leguminosas, ADN de maní, caracterización de germoplasma; **balance de carbono de la granja**) · 11 talleres / 350 líderes de 8 comunidades · 6 cursos / 196 personas · 2 ferias / 2.500 visitantes |
| 2025 | >1,067 M l leche cruda · >1,001 M l transformados · **72 t semilla certificada** (maíz, arveja, haba) · ~1.500 t compost · 69,3 t semilla vendida | Semilla a **1.342 productores** (potencial 6.710 beneficiarios, 7 deptos., 18 municipios, 1.547 ha cubiertas) · 6 investigaciones aplicadas + 5 pasantías + 8 cursos / 150 participantes · 12 talleres / 251 productores · ecoparque 113.000+ visitantes |

### Estrategia declarada del programa agroecológico (informe 2024)

- Misión: agricultura regenerativa adaptada al contexto local,
  «rehabilitar los suelos y mantenerlos productivos» para no expandir
  a nuevas zonas — el mismo problema que resuelve Field Shift.
- En Santa Cruz: «producción de frutas y hortalizas de alta calidad en
  el marco de la **agricultura 4.0**, certificación ecológica» — la
  adopción de tecnología/datos es objetivo escrito, no una venta fría.
- Genómica del banco de germoplasma de Pairumani → colección «núcleo»
  de variedades prioritarias.
- Piloto con alianza estratégica para **semillas de cereales andinos
  en el Altiplano** (tercera zona agroecológica para la app).
- Curso de agricultura familiar climáticamente responsable con la
  **Universidad Zamorano** (Honduras) para replicar en ambas granjas.
- «Pilier»: brazo de distribución de productos agro sostenibles.
- Oferta de **servicios de laboratorio** a terceros (tienen capacidad
  analítica propia de suelos/tejidos).
- Mesa Boliviana de Carne Sostenible: miembro activo (2025).
- Bolivia Ecológica: plataforma digital de contenido agroecológico.

### Implicancias para estructurar el proyecto

1. **Ya miden suelo:** PRIAS corre un protocolo de análisis edáfico en
   parcelas demostrativas → la app no empieza de cero; puede
   visualizar/continuar su serie.
2. **Registran producción por parcela** (kg por cultivo, por año) →
   el feature «historial de parcela» calca con su práctica real.
3. **Catálogo de rotación concreto:** su lista de polifíticas
   (brachiarias + leguminosas forrajeras) da el set inicial de
   «cultivos de servicio» para la zona tropical.
4. **Decisión climática real:** ensilaje, forraje verde y siembra de
   praderas dependen de ventanas de lluvia → POWER responde una
   necesidad declarada.
5. **Escala de difusión probada:** 1.342 productores semilleros +
   >300 capacitados/año + fincas réplica de hasta 2.000 ha = canal de
   adopción real para una herramienta validada con ellos.
6. **Agricultura 4.0 es objetivo escrito** → la presentación debe
   hablar de decisiones con datos satelitales, no de «experimento
   tecnológico».

## 3. Fichas de personaje para entrevistar

### Sueleen Peña Medina — Directora, Hacienda Patiño (SCZ) — contacto principal
Dirige la sede agrícola cruceña; antes coordinó pecuaria (2013–2020).
Habla en público de indicadores y datos. Aporta: sistemas reales de la
hacienda, decisiones de rotación y pastoreo, qué datos manejan y
cuáles faltan. Canal: LinkedIn sueleen-pena-medina-803060284 ·
**WhatsApp de la Hacienda/CEASIP +591 76322066** (línea oficial:
inscripciones de talleres y convocatorias institucionales) ·
info@patino.org · el fijo +591 3 370 1905 es línea local, no útil para
WhatsApp.

### Alejandro Arispe — equipo técnico (forrajes/pasturas)
Expone sobre polifíticas y silvopastoreo en el seminario. Aporta:
rotaciones de pasturas, reservas forrajeras, ventanas de siembra.
Canal: vía Hacienda o info@patino.org pidiendo «equipo de forrajes».

### Rodrigo Daza Mendizábal — Gerente General Bolivia (Cbba)
Agrónomo (Zamorano) + máster ambiental; desde jul-2025 tras el
traspaso de Thonon. Decide alianzas; impulsó el programa de startups.
Aporta: visión estratégica, entrada de la herramienta a programas.
Canal: LinkedIn rodrigo-daza-mendizábal-ph-d-78a56b5a · oficina
+591 77428820, Calle Patiño 1450, Cochabamba.

### José Félix Sánchez Ponce — Director, Hacienda Pairumani
Dirige la granja donde la rotación es práctica cotidiana. Aporta:
contraste valle interandino vs llanos. Canal: info@patino.org /
+591 77428820.

### Centro Fitotécnico y de Semillas (investigadores)
Banco de germoplasma y variedades adaptadas: «proveedores de verdad»
sobre qué cultivos rotar. Nombres en publicaciones: Ximena Reyes
Colque, Teresa Avila Alba (estudio de ajíes, Univalle). Canal:
info@patino.org.

### Jorge Arzabe — referente de educación
La puerta si la app quiere vertiente educativa (pasantes,
laboratorios). Canal: info@patino.org (citado en Los Tiempos jul-2024).

Canales cortos cruceños (verificados 11-11): **+591 76322066**
(WhatsApp oficial Hacienda/CEASIP — el mejor para pedir cita) ·
**+591 78184898** (WhatsApp de inscripciones del seminario, operado
por los organizadores MBCS/Fegasacruz — sirve para el día de campo y
para pedir contacto, no es línea Patiño directa) · +591 76530004
(reservas Día de Campo) · a.salguero@patino.org (email institucional
real) · Espacio Patiño SCZ, Independencia #89, espacio.sc@patino.org ·
info@patino.org.

## 4. Marco contextual para presentarse

**Quién presenta:** Alejandro Sosa Briceño — constructor
multidisciplinario: ingeniería de software y transformación digital,
emprendimiento (Statetty), laboratorio de ciencia alimentaria
(ekvilibroLab, fermentación y alimentos funcionales), sistemas
públicos (dirección de call center municipal, consultoría en
Venezuela) y producción de medios (podcast Somos 10⁷). La ficha
alimentaria y el trabajo de I+D propio son buen gancho con la línea
agroecológica de la Fundación. Contacto: **WhatsApp +591 74189700** ·
asosab@gmail.com · linkedin.com/in/alejandrososa · github.com/asosab ·
CV completo: asosab.github.io/cv/

Mensaje:

> Hola, mi nombre es Alejandro Sosa Briceño y soy parte de un equipo
> que participa en el NASA Space Apps Challenge 2026, un hackathon
> internacional que este año se juega el 14 y 15 de noviembre,
> también aquí en Santa Cruz.
>
> El reto que elegimos se llama «Field Shift»: construir una
> herramienta que ayude a los agricultores a decidir qué sembrar y
> cuándo rotar sus cultivos, combinando datos públicos de la NASA —
> lluvias, temperatura, salud de la vegetación vistos desde el
> satélite — con información del suelo y las prioridades de cada
> productor. La idea es que una persona con una parcela pueda mirar su
> teléfono y tener una recomendación concreta: qué cultivo le conviene
> después del que acaba de cosechar, y en qué ventana de lluvia.
>
> Les escribo a ustedes porque la Hacienda Patiño y el CEASIP trabajan
> justo sobre esto: prueban técnicas agrícolas para suelos difíciles
> del oriente boliviano y las transmiten a pequeños productores. Antes
> de diseñar cualquier pantalla, quisiéramos entender cómo se toman
> hoy esas decisiones en la práctica: qué cultivos manejan, qué datos
> tienen, cuáles les faltan, y qué forma tendría que tener una
> herramienta para que de verdad la usara un técnico de extensión o
> un productor.
>
> No venimos a vender nada: lo que construyamos será abierto, y nos
> encantaría que salga diseñado pensando en gente como su equipo.
> Como el hackathon es el 14 y 15, nos vendría perfecto una
> conversación corta el **viernes 13** — media hora alcanza — en
> persona, por llamada o coincidiendo en el seminario de la UEB,
> donde estaremos. Si ese día no es posible, con gusto coordinamos
> por WhatsApp cuando les acomode.
>
> — Alejandro Sosa Briceño · WhatsApp +591 74189700 ·
> asosab.github.io/NSAC

## 5. Preguntas de entrevista

Set afinado 2026-11-12 cruzando los informes: no se pregunta lo que ya
publicaron (cultivos, especies forrajeras, indicadores). `*` marca las
8 imprescindibles para una conversación corta (~30 min) el viernes 13
en el seminario.

### A. Dónde duele

1.* ¿Qué decisión agronómica toman hoy con menos información? (¿qué
    sembrar, cuándo, cuánto forraje reservar, cómo recuperar un suelo?)
2.  Si mañana tuvieran una herramienta nueva, ¿qué les ahorraría más
    tiempo o más pérdidas?
3.  Piense en la última siembra o rotación que salió mal. ¿Qué dato
    les habría ayudado?

### B. Cómo deciden hoy

4.* ¿Quién decide qué se siembra en cada parcela y cuándo? ¿Plan de
    rotación escrito o decisión en campo?
5.* Vimos que manejan polifíticas —Brachiaria, Gatton Panic,
    Stylosanthes, Calopogonium— y maíz para ensilaje. ¿Qué dispara la
    fecha de siembra: pronóstico, experiencia, humedad del suelo?
6.  Cuando la lluvia llega tarde o se corta, ¿qué hacen?
7.  De su lista de especies, ¿cómo asignan cada una a cada zona?
    ¿Están probando alguna nueva?

### C. Datos que ya tienen

8.* ¿Llevan registro por parcela —cultivos, manejo, mediciones?
    ¿Papel, Excel o software?
9.* El informe dice que PRIAS hace seguimiento del suelo en parcelas
    demostrativas: ¿qué parámetros miden —pH, MO, N, textura—, con qué
    frecuencia y dónde se guarda? ¿Podrían compartir una muestra
    anonimizada para probar la herramienta con datos reales?
10. ¿Tienen estación meteorológica propia o usan registros externos?
    ¿Qué dato climático les falta?
11. ¿Han usado imágenes satelitales o NDVI? ¿Para qué les sirvió o por
    qué lo dejaron?

### D. Usuarios y adopción

12.* ¿Quién la usaría primero: el equipo de la Hacienda, técnicos de
    extensión, los 300+ productores que capacitan al año, o
    estudiantes?
13.* En campo, ¿qué conectividad y dispositivos hay? ¿Qué formato
    funciona mejor: alerta por WhatsApp, app, mapa o informe en PDF?
14. ¿Qué herramientas digitales probaron antes y por qué se dejaron de
    usar?

### E. Indicadores

15. Sus informes ya reportan litros de leche, beneficiarios y el
    balance de carbono de Pairumani. ¿Qué indicador les cuesta más
    levantar hoy?
16. ¿Les serviría estimar la tendencia del suelo entre análisis de
    laboratorio?

### F. Experimentación y educación

17. ¿Cómo eligen qué cultivos o variedades probar? ¿Les serviría ver
    qué se siembra en regiones gemelas —Cerrado brasileño, Llanos de
    Colombia— para evaluar candidatos?
18. ¿Ven valor en una versión educativa para los laboratorios
    pedagógicos? ¿Quién lo decide?

### G. Cierre

19.* Tarjetas A–F, ¿cuáles usarían primero y cuáles descartarían?
    A. Qué sembrar después de tu último cultivo, según suelo y lluvia
    B. Ficha digital de cada parcela: clima, suelo base y tus mediciones
    C. Mejor fecha de siembra de pasturas y maíz según lluvia y humedad
    D. Informe de 5 años de vegetación de una parcela antes de visitarla
    E. Alerta de estrés del forraje para decidir reservas de ensilaje
    F. Vista educativa: la vegetación de tu provincia y qué se siembra allí
20.* ¿Podemos probarlo en una parcela demostrativa y mostrarlo en un
    Día de Campo? ¿Con quién más conviene hablar —el equipo de
    forrajes, el Fitotécnico?
21. Si el prototipo funciona, ¿quién podría alimentarlo con datos de
    parcela después del hackathon?

## Notas

- **Coincidencia de fechas:** III Seminario de Ganadería Sostenible
  (MBCS/Fegasacruz/Gobernación, hospeda Fundación Patiño), 13–14 nov
  2026, mismo finde del Space Apps. **El día útil es el viernes 13**
  (exposiciones en UEB, ~500 asistentes del sector; el equipo Patiño
  estará ahí promoviendo su jornada) — el 14 es jornada de campo en la
  Hacienda pero coincide con el día 1 del hackathon. Inscripciones:
  +591 78184898 (preguntar si hay entrada solo-día-13). Bonus: el
  evento también sirve para reclutar agrónomos para el equipo.
- **Por verificar en vivo:** estado de la Finca La Vizcaína y del
  convenio INIAF/UAGRM (marcados histórico/no verificado).
- Personas citadas de fuentes públicas (sitio, LinkedIn, prensa).
  Canales verificados en la sección 3.

## Relacionadas

[[00-plan]] · [[arquitectura-datos]] · [[bolivia-cultivos-regiones]] · [[top10-enfoques-patino]]
