---
layout: post
lang: es
date: 2026-11-15 01:50:00 -0400
permalink: /es/diario/fieldshift-video-v146/
title: "fieldShift V1.46, la demo completa"
description: "Casi cuatro minutos de app real: predio nuevo, parcela importada y otra dibujada a toques, suelo, aforos, capas NASA, estado de potreros, análisis, PDF y el bot de Telegram."
---

Quería una demo que se explicara sola. La del sábado duraba un minuto y quedó vieja el mismo día: desde entonces la app aprendió a estimar el punto del potrero, a abrir capas de satélite, a cruzar el forraje con el hato y a mandar el informe por Telegram. Esta versión lo muestra todo.

{% include youtube.html id="2-BdT6WG6Gg" title="fieldShift V1.46" %}

Va sin voz. Los textos quedaron quemados arriba, a ritmo de lectura tranquila: la idea es que alguien lo vea en el celular sin auriculares y entienda igual. Quedó una versión por idioma, grabadas las dos esta noche.

El recorrido es el de un usuario de verdad: entrar, crear el predio, importar una parcela desde KMZ y dibujar otra a toques. Después la ficha completa: suelo de laboratorio, siembra, campaña anterior con su rinde, aforo y registro de pastoreo. En el mapa se prenden las capas de NASA GIBS y SoilGrids, la máscara de enfoque oscurece todo menos la parcela elegida y el paso de tiempo retrocede seis meses o proyecta con el mismo mes del año pasado. Cierran la sábana de potreros con el balance del hato, el análisis, el PDF y el vínculo con el bot.

Grabarla costó dos bugs reales: el selector de archivos vaciaba la lista antes de leerla (el botón de importar nunca había funcionado, solo el arrastre al mapa) y los cultivos ya sembrados en la base no tenían los campos nuevos de rebrote, así que el estado forrajero decía «sin especie» aunque hubiera Brachiaria cargada. Los dos quedaron arreglados de paso.

Todo el tour corre solo con un script de Playwright sobre la UI publicada, toques y todo. La próxima versión es editar el guion y apretar play.
