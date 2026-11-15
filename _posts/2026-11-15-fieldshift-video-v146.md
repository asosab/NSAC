---
layout: post
lang: en
date: 2026-11-15 01:50:00 -0400
title: "GrazePoint V1.46, the full tour"
description: "Almost four minutes of the real app: new farm, an imported parcel and one drawn by tapping, soil records, forage measurements, NASA layers, paddock status, analysis, PDF and the Telegram bot."
---

I wanted a demo that could explain itself. Saturday's ran one minute and went stale the same day: since then the app learned to estimate the paddock window, to open satellite layers, to weigh forage against the herd and to send the report over Telegram. This version shows all of it.

{% include youtube.html id="2-BdT6WG6Gg" title="GrazePoint V1.46" %}

No voiceover. The text is burned in at the top, at a calm reading pace: the point is someone watching on their phone with no headphones should follow anyway. This is the English cut; the Spanish one is on the same channel.

The run is what a real user would do: sign in, create the farm, import a parcel from a KMZ and draw another one by tapping. Then the full record sheet: lab soil, planting, last season with its yield, a forage measurement and a grazing record. On the map the NASA GIBS and SoilGrids layers come on, the focus mask darkens everything but the selected parcel, and the time stepper walks back six months or projects ahead with the same month of last year. It closes with the paddock sheet and the herd balance, the analysis, the PDF and the Telegram link.

Recording it cost two real bugs: the file picker emptied its list before reading it (the import button had never worked, only dragging onto the map did) and the crops seeded in the database lacked the new regrowth fields, so the forage status said "no species" even with Brachiaria loaded. Both got fixed along the way.

The whole tour runs on its own with a Playwright script over the published UI, taps and all. The next version means editing the script and pressing play.
