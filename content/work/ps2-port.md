---
title: "PlayStation 2 port of an open-source game client"
summary: "Fitting a portable C client into 32 MB of RAM: Graphics Synthesizer rendering, network bring-up, a controller scheme with on-screen keyboard, and the memory and bounds bugs that only showed up on real hardware."
weight: 2
featured: true
year: "2026"
status: released
statusNote: "Eight tagged releases, v1.0 to v1.7, 18–25 Sept 2026"
attribution: "Platform port (upstream by others)"
role: "Wrote the PS2 platform layer and the memory, network and stability work (7 of 667 commits)"
stack: ["C", "PS2SDK", "gsKit", "ps2ip", "BDM/USB"]
domains: ["systems", "platform"]
metrics:
  - { k: "tagged releases", v: "8" }
  - { k: "EE RAM reclaimed by streaming one archive", v: "≈6 MB" }
  - { k: "RAM freed during login by lazy decoding", v: "≈1 MB" }
  - { k: "map files merged into one archive", v: "≈830" }
links:
  - { label: "Repository", url: "https://github.com/johnson-cooper/2004sp-ps2port" }
  - { label: "Releases", url: "https://github.com/johnson-cooper/2004sp-ps2port/releases" }
attributionNote: "The portable client this repository is built from is an open-source C99 project by lesleyrs and contributors; most of its history (648 of 667 commits) is theirs. My commits are the PlayStation 2 platform layer, a network protocol revision upgrade, and the memory, network and hardening work below. The game it connects to belongs to its rights holder and this site distributes none of its content. No affiliation or endorsement is implied."
flow:
  - title: "Portable client"
    sub: "upstream, C99"
    items: ["Scene, models, interfaces, protocol", "Single-threaded", "Platform hooks in platform.h"]
  - title: "PS2 platform layer"
    sub: "src/platform/ps2.c (mine)"
    items: ["gsKit rendering with GS scaling", "Pad input and virtual keyboard", "ps2ip network bring-up", "USB / HDD / MMCE storage"]
  - title: "Memory discipline"
    sub: "32 MB EE budget"
    items: ["Lazy decode of interface graphics", "Stream the on-demand archive from disk", "Bump allocator tuned on measured overflow"]
  - title: "Hardware"
    sub: "EE · GS · IOP · SIF"
    items: ["IOP drivers embedded in the ELF", "Real-hardware-only faults fixed", "Emulator for iteration, console for truth"]
flowCaption: "Layering as described in the commit history; the portable client is upstream's work."
---

## What I did

Took a portable single-threaded C client and made it run on the PlayStation 2. That meant writing the platform backend (`src/platform/ps2.c`), shrinking the client to fit the console's memory, getting the console online, and then chasing faults that appeared once it ran on real hardware instead of an emulator. I also upgraded the client's network protocol from one revision to a newer one: roughly 130 opcodes remapped, a new login handshake, and the on-demand archive system in place of a stale models archive.

## The constraints

The console has 32 MB of main RAM, a 640×480 output, no keyboard, and a network stack that lives on a separate I/O processor. The client was designed for a 765×503 canvas and for machines with far more memory.

## Decisions and fixes (from the commit record)

- **Rendering.** The first version cropped the logical canvas into the physical framebuffer. I replaced the crop with real Graphics Synthesizer hardware scaling: source and destination rectangles differ in the per-frame sprite draw, using a 768-wide padded source texture to satisfy GS tiling alignment, with uniform scaling so the picture is letterboxed rather than stretched.
- **Memory.** Interface components decoded every icon and model at login whether or not the interface was ever opened. Deferring the decode to first use freed about 1 MB during login. Streaming the on-demand archive from disk instead of holding it resident reclaimed about 6 MB. The post-login bump allocator was re-tuned from overflow data observed in live testing.
- **Storage.** About 830 individual map files were merged into one archive to cut USB directory lookups. Version 1.7 added loading from memory-card-emulation, HDD and other devices rather than USB only.
- **Network.** The console socket was never actually non-blocking, causing multi-second stalls in `recv()`; I added a poll before receive with `MSG_DONTWAIT` and stall diagnostics. DHCP bring-up was fixed by switching to the build tool's native IRX embedding and an alarm-based wait in the link loop. Boot order changed so USB and network initialisation stop contending for IOP resources.
- **Input.** A full DualShock 2 scheme with right-stick camera and shoulder-button tab cycling, plus an on-screen keyboard because the console has none.

## Bugs that only real hardware showed

- A misaligned weak `errno` symbol from the network library caused an Emotion Engine alignment crash.
- A sequence-frame table was read out of bounds, which can fault on real hardware where an emulator tolerates it.
- A freeze during scene construction led me to add diagnostics through boot, map load and scene build. They found a missing capacity check around a fixed-size decompression scratch buffer, unbounded packet reads in location decoding, and a level index that could index world arrays out of bounds when the stream desynced. All three were fixed.
- Unbounded `strcpy` calls into fixed-size interface text buffers were replaced with bounded copies.

<div class="note"><span class="mono">How it was built</span><p>My commits in this repository carry an AI-assistant co-author trailer. I note that here so the credit is accurate.</p></div>
