---
layout: post
lang: en
date: 2026-11-15 07:15:00 -0400
permalink: /diario/grazepoint-explicado/
title: "GrazePoint explained without jargon"
description: "What the app does, for someone who knows nothing about farming: when and where to put the herd on each paddock, with numbers from NASA satellites."
---

Several people have asked me what GrazePoint actually does and I always end up tangled in acronyms. Here is the written version for next time.

In one sentence: **it tells a rancher when and where to put the cattle on each paddock**.

The context: a cattle ranch divides its land into paddocks. Grass grows, the cows eat it and the paddock needs rest to grow back. Bring the herd in too early and you ruin the pasture; too late and the grass goes past maturity and loses value. Hitting that moment is the most important daily decision, and today it is made by eye, walking the field.

What the app does, step by step:

1. **You draw your farm on a satellite map** (or import the file you already have). It runs in the browser, nothing to install.
2. **You tell it what you know about your land**: which grass is in each paddock, when you last grazed or cut it, how many head the herd has, your soil data if you have it.
3. **The app crosses that with NASA satellite data**: daily rain and temperature (POWER), pasture health seen from space every eight days (MODIS NDVI), moisture at root depth (SMAP) and soil properties (SoilGrids).
4. **It gives you decisions, not charts**: which paddock is ready to enter ("about 10 days left"), which one is past its point, how many days of feed the herd has left before grass runs out and which forage to plant given your soil and the coming weather.
5. **The result travels over WhatsApp**, the channel they already use in the field, or as an automatic Telegram alert when a paddock reaches its point. It also produces a technical PDF report.

The fact that inspires it: at Hacienda Patiño, in Santa Cruz, that decision today is made by the trained eye of a technician with years of experience. GrazePoint turns that eye into a number anyone can check from a phone, measured on their own land, not on a generic average.

It is open source, works for any ranch in the world the satellites pass over, and was born this weekend at the NASA Space Apps Challenge 2026.
