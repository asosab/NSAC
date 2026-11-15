---
layout: post
lang: en
date: 2026-11-14 22:40:00 -0400
title: "The Field Shift demo, in one minute"
description: "A vertical video runs the whole app: sign in, new farm, a real 976 ha parcel imported from KMZ, crop records, live NASA POWER analysis and the PDF report."
---

I wanted to see how the app tells its own story end to end, so I recorded it running: one minute, phone-sized screen, against the published site and the real backend.

{% include youtube.html id="DW0HczqFdCo" title="Field Shift demo" %}

The run: sign in with the test account, create the farm, import the KMZ of a real parcel (976 hectares, 61 vertices, in Santa Cruz), enter the current soybean and last season's campaign with its yield, then hit analyze. The app queries NASA POWER live and answers with the top 3 rotation picks, three Brachiaria brizantha cultivars for cattle pasture, plus the planting window verdict: we are inside the October to June window, but last month rained 30% below average.

The video ends showing the PDF report page by page, the piece that would reach the Hacienda over WhatsApp.

The recording itself is scripted: a small Playwright setup drives the real UI, taps included, so making more demos later costs almost nothing.
