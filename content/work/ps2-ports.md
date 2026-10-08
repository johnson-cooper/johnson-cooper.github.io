---
title: "Porting existing games and engines to the PlayStation 2"
summary: "Three native PS2 ports built on other people's open-source work: a Nintendo 64 fighting game, a Nintendo DS action RPG, and a Quake-derived engine. Each replaces a hardware platform layer rather than emulating it."
weight: 2
featured: true
year: "2026"
status: active
statusNote: "Four tagged releases across the three ports; documented as emulator-verified"
attribution: "Platform ports (upstream by others)"
role: "Wrote the PS2 platform layers, renderers, audio backends, build integration and hardware-boot fixes"
stack: ["C", "C++", "PS2SDK", "gsKit", "SPU2", "R5900 / EE", "PS2Build", "Python tooling"]
domains: ["systems", "platform"]
metrics:
  - { k: "ports in this group (a fourth, a network client, has its own page)", v: "3" }
  - { k: "tagged PS2 releases across all four ports", v: "12" }
  - { k: "NitroSDK / NitroSystem entry points reimplemented for the DS port", v: "523" }
  - { k: "DS game C files built for the EE", v: "≈23,000" }
links:
  - { label: "N64 port repository", url: "https://github.com/johnson-cooper/ssb-decomp-re" }
  - { label: "DS port, ps2-port branch", url: "https://github.com/johnson-cooper/khdays-decomp/tree/ps2-port" }
  - { label: "Engine port, ps2-port branch", url: "https://github.com/johnson-cooper/vril-engine/tree/ps2-port" }
attributionNote: "All three start from other people's projects: two community decompilations of commercial console games, and an open-source GPL engine. The decompilations and the games they describe belong to their authors and rights holders. These ports contain no game data; the two console ports need a legally obtained ROM from you, converted by the included tools. I claim only the PS2 platform work, which is in the commits described below. Licences follow each repository: the DS decompilation is CC0, the engine is GPL-2.0, and the N64 repository has none. No affiliation or endorsement is implied."
flow:
  - title: "Upstream code"
    sub: "unchanged where possible"
    items: ["Game logic compiled as-is for the 32-bit EE", "DS and N64 SDK calls left in place", "Overrides kept out of the upstream files"]
  - title: "Reimplemented platform"
    sub: "mine"
    items: ["N64 graphics commands to GS primitives", "DS SDK entry points on a PS2 layer", "Software replacement for DS and N64 audio drivers on SPU2"]
  - title: "Build and data"
    sub: "PS2Build + Python"
    items: ["One static ELF from thousands of files", "Asset packs built from the user's own ROM", "No game data in the repository"]
  - title: "Diagnosis"
    sub: "emulator first, then hardware"
    items: ["Debug overlays and memory reports", "Crash screens that preserve first evidence", "Real-hardware boot fixes"]
flowCaption: "Common shape of the three ports, from their docs and commit history."
---

## The common problem

A decompilation gives you portable C for a game that was written for someone else's hardware. Running it on a PS2 still means rebuilding everything underneath: how pixels are drawn, how sound reaches the speakers, how files are read, how a frame is paced, how the console boots. I write that layer, keep the upstream code as untouched as I can, and verify what I can in an emulator before it goes near a console.

## Port 1: a Nintendo 64 fighting game (decompilation base)

12 commits on the main branch plus a 25-commit hardware-boot branch (13 mine, 12 by an AI assistant). The main branch adds about 14,500 lines across 108 files.

- **Graphics.** The N64 display-list commands are translated to GS primitives on the EE. Textured, lit 3D, sprites, the N64 texture formats, clipping, fog, alpha blend and test, and depth all work in the emulator. Translation costs about 17–18 ms per frame in a match (around 3,200 commands and 470 triangles), and the status document names the next steps: caching translated display lists and moving transforms to VU1.
- **Audio.** An SPU2 backend plays the game's samples as hardware voices, including 4.1 MiB of PS-ADPCM converted from the game's own data.
- **A physics bug from endianness.** Hits launched fighters off-screen because the `sinf` and `cosf` constants were wrong on the little-endian EE. Fixing them restored normal knockback.
- **Memory.** 17.3 MB committed at boot against a 24 MB budget, with the scene arena using 1.5 of 6 MB in a match.
- **Hardware boot work.** The branch fixes a hang before GS init, loads the sound driver as a resident module, initialises GS state every frame, preserves SIF DMA state, and adds scan-out race guards and diagnostics that compile out of production builds.
- **Status.** Boots to gameplay in PCSX2. The status file lists what is not done: reverb, VS mode, HDD boot, memory-card saves tested on a real card, and a listening test. Release v1.0.

## Port 2: a Nintendo DS action RPG (decompilation base)

121 commits ahead of upstream (100 mine, 21 by an AI assistant), about 67,000 added lines. Most of that is generated linking glue; the substance is the platform layer, tooling and fixes.

- **Audit before code.** The architecture document is written from the decompiled sources. Syntax-only compilation of all 23,336 game files for the EE failed on only 10. Every symbol is unique across 303 overlays, so the whole game links statically into a single ELF. A full build compiles about 24,000 files.
- **Reimplement what is used.** Rather than port NitroSDK, the layer re-creates the 523 SDK and NitroSystem entry points the game actually calls, and overrides the roughly 400 game functions that touch DS hardware registers directly.
- **Alignment faults on the R5900.** Real hardware faults on unaligned 64-bit loads and stores that an emulator may forgive. I wrote an audit of emitted `ld`/`sd` instructions, fixed individual cases, then added alignment-safe 64-bit access and an automatic rewrite of direct 64-bit dereferences, with a second audit checking the rewritten functions.
- **Hardware debugging tools.** Crash handlers that keep the first piece of evidence, a non-destructive hang watchdog, opt-in expensive heap checking, and a lightweight debug build for the console.
- **Timing and teardown.** Frame pacing keeps the simulation at the DS's 59.83 Hz on both NTSC and PAL, using an accumulator on PAL. Several commits isolate stream teardown from the filesystem's scene queue to stop a New Game hang, and video playback needed its own VBlank service pump.
- **Status.** Release v1.0. The release notes say there are graphical issues and that crashes may occur later in the game. It requires a data pack of about 245 MiB that you build from your own cartridge image.

## Port 3: a Quake-derived engine (open source, GPL)

24 commits in two days (27–28 Sept 2026), about 18,700 added lines across 60 files, and two tagged releases.

- **GS renderer from scratch.** Textures use 8-bit and 4-bit palettes plus 16 and 32-bit formats, cached in a 2.4 MiB VRAM ring. Lightmaps render in an alpha-multiply pass. I fixed interlaced field mode, projection for 4:3 output, far-plane clipping and texture-coordinate swimming, and added per-vertex fog (still being verified).
- **Content paths.** Half-Life-format BSP v30 maps load, alias models decode with signed vertices, and QuakeC game logic runs rounds, zombies and damage.
- **Storage.** Multi-device bring-up for USB, memory-card emulation and HDD, embedded alternate storage drivers, recovery when block-device numbering shifts, and loading the memory-card stack only when the boot path needs it.
- **Audio.** A 24 kHz software mixer feeds a custom IOP sound module and the SPU2. Music is not done yet.
- **Numbers.** Locked 30 fps in menus and two maps, and about 10.7 MiB of EE RAM free after spawning, with a peak near 20.5 MiB.
- **Status.** v1.0 and v1.1 released; v1.1 is a hotfix for one gameplay feature. Documented as validated in PCSX2 only.

## What I would want a reader to know

Each repository's own status document says plainly what has and has not been checked. Where they say "not verified on real hardware", this page says the same. The numbers above are quoted from those documents and from git history, not measured by me for this page.

<div class="note"><span class="mono">How it was built</span><p>Some commits in these repositories are authored by an AI coding assistant, as noted per port. I used it as a collaborator and credit it where the history shows it.</p></div>
