---
layout: post
lang: en
date: 2026-11-15 00:30:00 -0400
title: "The paddock clock"
description: "The app now estimates when a paddock is ready for the herd or the cutter: regrowth days that actually counted, the satellite guessing unlogged cuts, and a Telegram alert."
---

In the interview, Sueleen said it plainly: the data they were missing was not what to plant, but when the pasture is at its best point to move animals in or cut for silage. Today that call happens by walking the paddock and trusting the eye. Tonight the app learned to give an answer.

The core idea is a clock per paddock. Every time the herd goes in or the grass gets cut, regrowth starts, and each species has its window: for Brachiaria the good point sits roughly between 28 and 40 days. But counting calendar days lies: a dry week does not feed the grass like a wet one. So the clock adds up effective days. Each day gets weighted by root-zone moisture and temperature from NASA POWER: without water or without warmth, the day barely counts. With that, the same species works all year.

On top of that sit two satellite readings. If nobody logged when the paddock was used, the app walks the NDVI of the last three months looking for a sharp drop: the typical signature of grazing or a cut that never made it to the notebook. And if the clock says it is ready but the canopy never took off, the app says so as a warning instead of hiding it: either something is stressing the grass, or the date was logged wrong.

The aforos changed roles too. Measuring forage by hand is a chore, Sueleen said. Now every logged aforo calibrates a local line between NDVI and kilograms of dry matter per hectare. With two aforos the app already estimates how much forage stands in the paddock today, and summed across all parcels it gives the farm total: the reserve they used to keep in their heads.

The result reads like a corral question: where does the herd go tomorrow? A sheet sorts the paddocks green, yellow and red by their state. And when one reaches its point, the Telegram bot sends a heads-up on its own, once per cycle.

For species that get ensiled whole, like sorghum, the clock works differently: not regrowth but growing degree-days. The app accumulates heat since planting and warns when the grain reaches the soft-dough stage, the window for silage cutting.

What remains is the part that matters: letting the Patiño field tech tag a paddock at its point and compare. The catalog ranges are literature and good judgment, but the number that counts is the one from their field.
