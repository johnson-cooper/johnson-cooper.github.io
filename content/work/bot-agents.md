---
title: "Autonomous bot system for a game-server mod"
summary: "A TypeScript goal planner, needs model and task library that lets scripted players progress through a persistent game world on their own."
weight: 14
year: "2026"
status: experimental
statusNote: "Early access; the repository has no license file"
attribution: "Mod of an open-source server (upstream by others)"
role: "Author of the bot system (93 commits, 1 Apr–15 May 2026, all mine in this repository)"
stack: ["TypeScript", "Bun", "Node.js"]
domains: ["systems"]
links:
  - { label: "Repository", url: "https://github.com/johnson-cooper/lost-city-progressive" }
attributionNote: "This repository layers a bot system on top of an open-source game-server engine and content scripts by the Lost City community. The engine and game content are upstream's, and the content scripts describe a commercial game. The code under `engine/src/engine/bot/` is the part that is mine. The repository carries no license of its own, so I describe it here and do not recommend redistributing it."
---

## What it is

A set of autonomous players for a single-player server. Each bot picks goals, tracks its own needs, and carries out tasks through the server's normal player actions, so it progresses through the game like a person would and shows up on the hiscores.

## Structure

The bot code in `engine/src/engine/bot/` is split into a manager, a player class, a goal planner that selects what to do next, a needs model, a task base class, a large library of per-skill tasks (combat, cooking, crafting, fishing, fletching, herblore and more), and data files for appearance, chat phrases and bot configuration.

## Status

Experimental. It is the largest single body of code in my account that is entirely mine by commit history, but it depends on an engine and on content I did not write, which is why it sits in the archive rather than the featured work.
