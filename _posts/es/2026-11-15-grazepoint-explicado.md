---
layout: post
lang: es
date: 2026-11-15 07:15:00 -0400
permalink: /es/diario/grazepoint-explicado/
title: "GrazePoint explicado sin jerga"
description: "Para qué sirve la app, contado para alguien que no sabe nada de agro: cuándo y dónde meter el lote al potrero, con números de satélites de la NASA."
---

Me han preguntado varias veces qué hace exactamente GrazePoint y siempre termino enredándome con siglas. Dejo la explicación escrita para la próxima.

En una frase: **le dice a un ganadero cuándo y dónde meter las vacas al potrero**.

El contexto: una hacienda ganadera divide su terreno en potreros. El pasto crece, las vacas se lo comen y el potrero necesita descansar para rebrotar. Meter el lote demasiado pronto arruina el pasto; demasiado tarde, el pasto se pasa de maduro y pierde valor. Acertar ese momento es la decisión diaria más importante, y hoy se toma a ojo, caminando el campo.

Lo que hace la app, paso a paso:

1. **Dibujas tu predio en un mapa satelital** (o importas el archivo que ya tengas). Corre en el navegador, nada que instalar.
2. **Le cuentas lo que sabes de tu tierra**: qué pasto hay en cada potrero, cuándo pastaste o cortaste por última vez, cuántas cabezas tiene el hato, datos de suelo si los tienes.
3. **La app cruza eso con datos de satélites de la NASA**: lluvia y temperatura diarias (POWER), salud del pasto vista desde el espacio cada ocho días (NDVI de MODIS), humedad de la tierra a la profundidad de las raíces (SMAP) y características del suelo (SoilGrids).
4. **Te devuelve decisiones, no gráficas**: qué potrero está listo para entrar («faltan unos 10 días»), cuál ya se pasó, cuántos días de comida le quedan al hato antes de que falte pasto y qué forrajo conviene sembrar según tu suelo y el clima que viene.
5. **El resultado viaja por WhatsApp**, el canal que ya usan en el campo, o como alerta automática de Telegram cuando un potrero llega a su punto. También genera un informe PDF técnico.

El dato que la inspira: en la Hacienda Patiño, en Santa Cruz, esa decisión hoy la toma el ojo entrenado de un técnico con años de experiencia. GrazePoint convierte ese ojo en un número que cualquiera puede consultar desde el celular, medido sobre su propia tierra, no en un promedio genérico.

Es código abierto, funciona para cualquier hacienda del mundo donde pasen los satélites y nació este fin de semana en el NASA Space Apps Challenge 2026.
