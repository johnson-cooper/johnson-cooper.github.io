---
title: "SlayerTasks and BalanceSigns"
summary: "Two lightweight server plugins for Minecraft 1.8.8: a GUI-driven mob-task and bounty system with economy rewards, and top-balance leaderboard signs."
weight: 23
year: "2023"
aliases: ["/en/posts/slayertasks/", "/en/posts/balancesigns/"]
status: released
attribution: "Plugins (original code; game by Mojang/Microsoft)"
role: "Author"
stack: ["Java", "Bukkit API", "Vault API"]
domains: ["games"]
links:
  - { label: "SlayerTasks source", url: "https://github.com/johnson-cooper/slayertasks" }
  - { label: "SlayerTasks on Modrinth", url: "https://modrinth.com/plugin/slayertasks" }
  - { label: "BalanceSigns on Modrinth", url: "https://modrinth.com/plugin/balancesigns" }
attributionNote: "Not official Minecraft products and not approved by or associated with Mojang or Microsoft."
---

Both plugins target Bukkit servers on Minecraft 1.8.8 and use Vault for economy rewards (tested with Vault 1.5.5).

## SlayerTasks

Assign players tasks to fight specific mobs, with bounties paid through Vault. It is a deliberately small quest system: no saved state, a chest-style GUI, and difficulty tiers with configurable mob counts and rewards.

- `/slayer` opens the task menu; `/skc` checks progress.
- Permissions: `slayertasks.slayer`, `slayertasks.skc`.

## BalanceSigns

Put `[topbalance]` on a sign and right-clicking it opens a GUI listing the richest players on the server. Behaviour is adjustable through the config.

- Permission: `balancesigns.createsign`.
