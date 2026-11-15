---
layout: post
lang: en
date: 2026-11-14 23:45:00 -0400
title: "The layers now have a say"
description: "The planting advisor now reads the satellite: real NDVI and soil moisture at the point, plus the last six months weighed against the same stretch last year."
---

Until today the map layers were for looking at. NDVI, root-zone moisture, monthly rain: they painted the terrain nicely, but the planting advice was built from three numbers measured in a soil lab plus annual rainfall. Tonight I wired the two worlds together, and it deserves a diary entry, because crossing data by value and by time changed what the app can say.

The first part was technical. GIBS, the NASA service behind the layers, has no "give me the NDVI at this point" API; it only publishes images. The way out came from watching how a tile gets painted: each pixel color follows an official ramp NASA publishes as XML. So the backend walks that ramp backwards. It downloads the tile where the plot centroid falls, reads the exact pixel color, looks it up in the ramp and recovers the real number. For Santa Cruz it returned NDVI 0.21 and SMAP root moisture of 0.09 cm³/cm³, each with the tile's actual date. The layer stopped being decoration.

Then came time, because a lone value says little. From the daily POWER series I built two comparisons: rain over the last six months against the same stretch a year ago, and each month against its climatological mean. At the test point the season reads clearly dry: 47% less rain than the previous cycle.

With that, the advisor gained six signals. A dry season favors species that get by on little water and penalizes thirsty ones. Low or falling NDVI at the point, versus last year, lifts cover crops and nitrogen fixers. And the SoilGrids values already flowing in do their part: scarce nitrogen pushes legumes, poor nutrient retention holds back heavy feeders, and very dense soil favors thick-rooted covers.

What I like most is how the reasons sound: "the season is running dry and this one gets by on little water", "satellite shows weak vegetation: it brings the cover back", "your soil is short on nitrogen: this one rebuilds it on its own". These are things a field technician would say standing on the same plot.

Worth being honest about the limits. A MODIS pixel covers 250 meters: it is the signal of the plot's neighborhood, not the furrow. SoilGrids is a model estimate, and a measured soil test still wins when there is one. And comparing against past cycles shows what used to happen, it does not forecast the one coming. Even so, the advice now looks at the field with satellite, soil and memory, which was the idea behind this project all along.
