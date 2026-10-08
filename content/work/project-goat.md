---
title: "Project GOAT"
summary: "A cross-platform C++ and raylib desktop client for a card-game simulator, driven by an open-source duel engine running as a separate process, with a CMake build and release workflow for three operating systems."
weight: 11
year: "2026"
status: experimental
statusNote: "Releases up to v0.1.7 (Aug 2026)"
attribution: "Client on third-party engine and data"
role: "Author of the client, campaign layer and port (24 commits)"
stack: ["C++", "raylib", "CMake", "GitHub Actions", "PowerShell"]
domains: ["systems", "tooling"]
links:
  - { label: "Repository", url: "https://github.com/johnson-cooper/project-goat" }
attributionNote: "The duel engine is an open-source project by others and is fetched at build time. The card database, rules lists and art in the repository belong to their respective rights holders; the repository's own `THIRD_PARTY_NOTICES.md` is the place to check attribution. This site shows no card art. No affiliation or endorsement is implied."
---

## What it is

A desktop simulator where the engine, not the client, decides which actions are legal, and the client only renders what the engine advertises and sends the player's choice back. The engine runs as a separate headless process, `goat-sim`, which also makes it testable on its own.

## The parts I wrote

- **A port from Win32 to raylib.** The first client was Windows-only (GDI and WIC). I rebuilt it on raylib until it had feature parity, including the duel board and engine IPC, and then promoted it to the primary client. The reasoning and the known verification gaps are written up in the repository's `docs/CROSS_PLATFORM_CLIENT.md`.
- **A file-based IPC bridge** that streams state from the engine process to the client and carries decisions back.
- **A campaign layer:** hub screens, a shop with an animated pack-opening flow, a collection browser, a deck editor with live legality checking against a banlist, twelve opponents unlocked in tiers, and saved progression.
- **Tests and release automation.** `ctest` covers an engine smoke duel, the decision bridge, database resolution, banlist parsing, deck round-tripping and roster validation. A tagged-release workflow publishes Windows, Linux and macOS builds.

## Status

Experimental, and the one project here where third-party content is central, which is why it is not featured.
