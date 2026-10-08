---
title: "Bots and server tooling for a community game server"
summary: "Contributions to a community-maintained single-player server distribution: a move of the runtime from Bun to Node, bot behaviour and performance fixes, memory-leak fixes and launcher changes."
weight: 20
contribution: true
year: "2026"
status: active
statusNote: "Maintained by a small team; 13 GitHub stars"
attribution: "Contribution to a team project (upstream engine by others)"
role: "Contributor: 150 of about 560 commits; author of the merged Node migration pull request"
stack: ["TypeScript", "Node.js", "Bun", "JavaScript"]
domains: ["systems", "tooling"]
metrics:
  - { k: "lines changed by the merged Node-migration PR (61 files, 62 commits)", v: "+26,450 / −14,220" }
  - { k: "my commits / total", v: "150 / ≈560" }
links:
  - { label: "Repository", url: "https://github.com/2004sp/2004sp-progressive" }
  - { label: "Merged pull request", url: "https://github.com/2004sp/2004sp-progressive/pull/1" }
attributionNote: "This is a team repository in which another contributor, gradwahl, wrote most of the commits (395). Several of my commit messages carry another team member's first name, which suggests I committed some work that others wrote, so my 150 commits probably overstate my share. The engine and the game content it runs are an open-source community project's and describe a commercial game; the bot system is built on top of them. See also my earlier, solo version of this idea in the archive."
---

## What it is

A single-player server distribution in which scripted players progress through a persistent world on their own, with hiscores, trading and combat. The engine underneath is an open-source community reimplementation; the team's contribution is the bot system and the tooling around it.

## What I worked on

- **Runtime migration.** A merged pull request of 62 commits moved the server from Bun to Node.js, ending with "remove bun dependency completely", and updated the launcher scripts for Windows and Linux (including nvm).
- **Bot performance and correctness.** Fixes for memory leaks in the bot code, bot performance work (a commit message cites around 500 bots running without lag), bots that fought incorrectly or failed to unequip armour, agility-task updates and bots ignoring "make X" settings.
- **Economy and content.** Tradable quest items and vendors that sell them, coin rewards when a player kills a bot, and bots dropping items to other bots.
- **Launcher.** Environment patching so custom content can be loaded by the launcher.
- **Project website.** In a separate repository I wrote all 10 commits of the project's marketing site, including the SEO setup, mobile sizing, logo, and a forum link.
