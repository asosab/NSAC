---
layout: post
lang: es
date: 2026-11-14 23:45:00 -0400
permalink: /es/diario/capas-valores-tiempo-2345/
title: "Las capas ya opinan dentro del consejo"
description: "El recomendador de siembra ahora lee el satélite: NDVI y humedad real del punto, y los últimos seis meses medidos contra el mismo ciclo del año pasado."
---

Hasta hoy las capas del mapa eran para mirar. NDVI, humedad de raíz, lluvia mensual: pintaban el terreno, pero el consejo de qué sembrar se armaba con tres números del análisis de suelo hecho a mano más la lluvia anual. Esta noche conecté los dos mundos y el ejercicio vale una entrada, porque cruzar datos por valor y por tiempo cambió lo que la app alcanza a decir.

La primera parte fue técnica. GIBS, el servicio de la NASA detrás de las capas, no tiene una API que responda «dame el NDVI de este punto»; solo publica imágenes. La salida vino de mirar cómo se pinta cada tile: el color del píxel sigue una rampa oficial que la NASA publica en XML. El backend hace el camino inverso: baja el tile donde cae el centroide, lee el color del píxel exacto, lo busca en la rampa y recupera el número. Para Santa Cruz salió NDVI 0.21 y humedad de raíz SMAP de 0.09 cm³/cm³, cada uno con la fecha real de su tile. La capa dejó de ser decoración.

Después vino el tiempo, porque un valor suelto dice poco. Con la serie diaria de POWER armé dos comparaciones: la lluvia de los últimos seis meses contra el mismo tramo del año anterior, y cada mes contra su media climatológica. En el punto de prueba la temporada sale seca con claridad: un 47% menos de lluvia que el ciclo pasado.

Con eso el recomendador sumó seis señales. Si la temporada viene seca, favorece especies que aguantan con poca agua y castiga las que piden mucha lluvia. Si el NDVI del punto está bajo o cayendo frente al año anterior, suben los cultivos de servicio y las fijadoras de nitrógeno. Y los valores de SoilGrids que ya venían entrando hacen lo suyo: nitrógeno escaso empuja leguminosas, retención de nutrientes baja frena a las especies de alta extracción, y un suelo muy denso favorece coberturas de raíz gruesa.

Lo que más me gusta es cómo suenan las razones: «la temporada viene seca y esta aguanta con poca agua», «la vegetación se ve débil en el satélite: le devuelve cobertura», «tu suelo anda corto de nitrógeno: esta lo repone sola». Son las frases que un técnico diría parado en el mismo lote.

Vale ser honesto con los límites. El píxel de MODIS abarca 250 metros: es la señal del barrio de la parcela, no del surco. SoilGrids es una estimación de modelo y el análisis medido en laboratorio sigue ganando cuando existe. Y comparar con ciclos pasados es ver lo que solía pasar, no pronosticar el que viene. Aun así, el consejo ya mira el terreno con satélite, suelo y memoria, que era la idea del proyecto desde el principio.
