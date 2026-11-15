---
type: investigacion
status: propuesta
created: 2026-11-14
tags: [reto, field-shift, patino, forraje, cosecha, ndvi, diseño]
---

# Punto óptimo de cosecha de pasto / ensilaje — estudio de viabilidad

Respuesta al dolor #1 declarado por Sueleen Peña en
[[respuestas-sueleen-pena]] (preg. 1 y 3): «saber el punto óptimo de
cosecha de pasto, cuándo está listo para que ingresen los animales y el
pasto está en su mejor condición nutricional». Relacionado con los
aforos «morosos» y la reserva de forraje calculada a ojo.

## Qué pide la agronomía

En pasturas perennes (su caso: Brachiaria, Gatton Panic, polifíticas)
el «punto óptimo» es el equilibrio entre dos curvas que corren en
sentido contrario:

- **Biomasa**: crece con los días de rebrote; se aplana al cerrar dosel.
- **Calidad** (proteína, digestibilidad): máxima en rebrote joven; cae
  cuando la planta encaña y florece (lignina).

El corte o ingreso de animales en la ventana donde la acumulación ya es
alta pero la caña aún no lignifica: en la práctica tropical, ~3–4 hojas
nuevas por macollo, alturas de ~30–50 cm según cultivar, **28–35 días
de rebrote en época lluviosa y 40–60 en seca** para Brachiaria
brizantha. Para ensilaje de sorgo/maíz el objetivo no es rebrote sino
estado de grano (lechoso-pastoso), que se sigue con grados-día.

Lo importante: nadie puede ver eso desde el satélite directamente —
pero se puede estimar cruzando **cuánto tiempo lleva rebrotando × con
qué agua y calor lo hizo × qué dice el NDVI del potrero**.

## Datos que ya tenemos dentro de la app

| Pieza | Estado | Origen |
|---|---|---|
| NDVI real del píxel del potrero | ✅ desde 14-nov | `gibsValores.js` decodifica el tile MODIS 8d/250 m contra el colormap oficial |
| Serie diaria lluvia/temp/humedad raíz | ✅ | POWER daily (400 d) + `tiempo.js` por mes |
| Humedad de raíz satelital | ✅ | SMAP L4 por píxel (0.09 cm³/cm³ en SCZ) |
| Aforos con fecha y kg MS/ha | ✅ registrados | `aforoSchema` — hoy solo se guardan |
| Fecha de siembra actual por parcela | ✅ | `fechaSiembraActual` |
| Historial de siembras | ✅ | `historial` (inicio/fin) |
| Catálogo con cicloDias | ✅ parcial | Falta el campo «días de rebrote óptimo» por especie |
| Registro de cortes/pastoreos | ❌ falta | Hoy no hay dónde anotar «el potrero X se pastó/cortó el día Y» |

## El modelo: «reloj de rebrote» por potrero

Servicio nuevo `services/forraje.js`. Tres pasos por parcela:

### 1. Inicio del reloj (t₀)

Orden de preferencia, del más confiable al menos:

1. **Último corte/pastoreo registrado** (sub-registro nuevo `cortes`:
   fecha + tipo `pastoreo|corte|ensilaje|desbroce` + notas).
2. `fechaSiembraActual` si es la primera habilitación.
3. **Detección por NDVI**: caída brusca (>0.1 en un período de 8 días)
   seguida de recuperación = alguien pastó o cortó aunque no lo anotó.
   Sirve de respaldo y de aviso «parece que el potrero 4 se usó y no se
   registró».

### 2. Días efectivos de crecimiento

No basta contar días de calendario: en seca la planta casi no crece.
Cada día desde t₀ suma un factor:

```
díaEfectivo = fAgua × fTemp
fAgua = min(1, GWETROOT_día / umbralEspecie)        // o SMAP si falta POWER
fTemp = min(1, max(0, (T2M − Tbase)) / (Topt − Tbase))   // C4 tropical: base ~10 °C
```

`rebroteEfectivo = Σ díaEfectivo`. Una semana seca y fría cuenta como
tres días, no siete. Con esto el mismo rango «28–35 días» sirve todo el
año sin tablas por mes.

### 3. Estado y salida

Catálogo gana por especie: `rebrote: { optimo: [min, max], pasado: N }`
en días efectivos (Brachiaria: [28, 38] y >45 pasado; a afinar con el
técnico de la Hacienda — es el primer dato que validaría en campo).

Estados por potrero:

- `rebrote` — aún no entra; muestra días estimados que faltan
  (díasEfectivos faltantes ÷ ritmo medio reciente).
- `punto_optimo` — dentro del rango **y** NDVI recuperado ≥ ~90 % de su
  base propia (mediana del potrero en el ciclo anterior). Si los días
  dicen «listo» pero el NDVI no repuntó, avisa «revisar: puede haber
  estrés o daño» — ese desacuerdo es información, no error.
- `pasado` — superó el máximo: «baja calidad, considerar corte para
  heno/reserva o desbroce».

Salida para ensilaje (sorgo): variante del mismo reloj con grados-día a
estado de grano + el veredicto «ensilar ahora» — caso Pairumani, no
SCZ; baja prioridad.

### Estimación de forraje disponible (la pieza del aforo)

Aquí los aforos dejan de ser solo archivo:

- Con **≥2 aforos** en una parcela: regresión `kgMS/ha ≈ a + b·NDVI`
  calibrada con los pares (fecha de aforo ↔ NDVI de esa fecha). Cada
  aforo nuevo afina la recta — el aforo moroso pasa a hacerse cada
  tanto, no cada vez.
- Sin aforos: rango rústico por especie marcado como «estimación sin
  calibrar» (Brachiaria en suelos arenosos SCZ: 1.5–4 t MS/ha según
  rebrote — número a validar con su técnico).
- Con eso el predio puede listar «forraje total disponible» sumando
  hectáreas × kgMS/ha por potrero → base de la reserva que calculan a
  ojo hoy.

## Integración en la app

- **Modelo**: `corteSchema` nuevo en parcela (`cortes: []`); endpoint
  `POST /predios/:id/parcelas/:pid/cortes` igual a los de suelos/aforos.
- **Catálogo**: campo `rebrote` por especie (embebido + cultivoModel).
- **Servicio**: `forraje.js` consume `power.diario`, `gibs.valorBuscando`
  y los aforos; sale `estado`, `diasFaltantes`, `kgMSHaEst`, `ndvi`,
  `desacuerdo`.
- **API**: `/analisis` suma `forraje` por parcela; y una vista nueva
  «mapa de potreros» donde cada parcela se pinta verde/amarillo/rojo
  según estado — esa vista responde directo a la decisión colegiada de
  los vaqueros («¿a dónde entra el lote mañana?»).
- **Informe PDF**: sección «Estado de potreros» con el ranking.
- **UI**: chip de estado en la ficha de parcela + botón «registrar
  pastoreo/corte» (el dato nuevo que más va a costar capturar).
- **i18n**: estados y razones en ES/EN; espejo en nodeLab.

## Límites honestos

- El NDVI satura en dosel cerrado (~0.85): discrimina mal entre
  «listo» y «pasado» — por eso el reloj de días efectivos manda y el
  NDVI solo confirma/alerta.
- Nubes: el compuesto de 8 días ayuda, pero en época lluviosa un tile
  puede salir malo dos períodos seguidos — `valorBuscando` ya camina
  fechas.
- 250 m de píxel: en potreros de <2 ha la señal mezcla bordes. Avisar
  en la ficha si la parcela es chica.
- La calidad nutritiva no se ve: el modelo infiere *madurez* (proxy de
  lignificación), no proteína. Hay que decirlo en la sábana.
- Depende de que registren cortes — mismo problema de adopción que
  todo el PRIAS digital; el botón tiene que costar 3 toques.
- La detección de pastoreo por caída de NDVI puede confundirse con
  quema, granizo o sombra de nube persistente: por eso es respaldo y
  aviso, no verdad.

## Plan por fases

| Fase | Contenido | Depende de |
|---|---|---|
| **v1 — reloj** | `cortes` (modelo + endpoint + botón UI), `forraje.js` con días efectivos + estados, chip en ficha y sección en análisis/PDF | Catálogo `rebrote` (números validables con Patiño) |
| **v2 — calibración** | Regresión aforo↔NDVI por parcela → kgMS/ha estimado; detección de caídas NDVI como pastoreo no registrado; forraje total del predio | v1 + aforos existentes |
| **v3 — operación** | Ranking «a dónde rotar el lote» (estado × forraje disponible × tamaño de hato si lo cargan), variante ensilaje por grados-día, alertas por bot de Telegram | Datos de uso real |

La v1 es autónoma y ya responde la pregunta de Sueleen; v2 es donde
los aforos dejan de ser un trámite.

## Riesgo agronómico principal

Los números `rebrote` del catálogo son la suposición que más pesa. La
forma correcta de validarlos es justamente lo que la Hacienda hace a
ojo hoy: pedirle al técnico que marque «este potrero está en punto»
durante un ciclo y comparar contra el reloj. Esa conversación además
abre la validación de campo que el proyecto necesita.
