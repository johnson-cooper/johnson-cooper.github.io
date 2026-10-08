---
title: "Trap Runner (GBA)"
summary: "A side-scrolling avoidance game for the Game Boy Advance, built in 2022 on a small engine. My first finished game, including its soundtrack."
weight: 20
year: "2022"
aliases: ["/en/posts/trap-runner-gba/"]
status: archived
statusNote: "Complete; not under development"
attribution: "Original game on a third-party engine"
role: "Game design, code and soundtrack"
stack: ["BP Core Engine", "Game Boy Advance"]
domains: ["games"]
---

## Overview

Trap Runner is a Game Boy Advance game made with the BP Core Engine. It was one of my first coding projects, written in 2022. A character runs forward continuously and you steer up and down to avoid enemies and walls. A timer measures how far you get; crashing resets it, so the loop is to beat your last attempt. The idea comes from classic *Copter*-style games.

## How I built it

I picked the engine for its simplicity and GBA support so I could concentrate on gameplay rather than low-level hardware. I wrote the timer and reset logic, the enemy patterns and wall collisions, balanced speed and obstacle spacing until it was fair, and added a basic UI. I also composed the soundtrack.

## Play it

You can try it in the browser: [play Trap Runner](/emulator.html). It loads an emulator from a third-party CDN.
