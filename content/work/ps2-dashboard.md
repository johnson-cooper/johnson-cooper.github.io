---
title: "PS2 Dashboard"
summary: "A PlayStation 2 launcher in C that scans storage devices, decodes native PS2 icons, plays hardware-looped music, and chain-loads ELF programs, all from a single self-contained ELF."
weight: 4
featured: true
year: "2026"
status: experimental
statusNote: "Developed and boot-tested in PCSX2; no hardware testing noted in the repository"
attribution: "Original software"
role: "Repository author (12 commits, 8–9 Sept 2026; commits carry an AI-assistant co-author trailer)"
stack: ["C", "PS2SDK", "gsKit", "audsrv", "FreeType", "IOP modules"]
domains: ["systems", "platform"]
metrics:
  - { k: "development milestones (M11 to M15 in git history)", v: "5" }
  - { k: "background music stored as PS-ADPCM, played by SPU2", v: "≈278 KB" }
links:
  - { label: "Repository", url: "https://github.com/johnson-cooper/ps2-dashboard" }
  - { label: "Icon format notes", url: "https://github.com/johnson-cooper/ps2-dashboard/blob/main/docs/icon-format.md" }
flow:
  - title: "Self-contained boot"
    sub: "one ELF"
    items: ["IOP modules embedded in the binary", "Loaded with SifExecModuleBuffer", "No dependency on host: or a modules folder"]
  - title: "Device manager"
    sub: "device_mgr.c"
    items: ["USB, memory card, HDD, disc, network", "Disc detection via SYSTEM.CNF", "Removed-storage detection"]
  - title: "Icon pipeline"
    sub: "ps2_icon.c → icon_cache.c"
    items: ["Parses icon.sys and 3D icon models", "Caches decoded thumbnails", "Fallback badges for apps with none"]
  - title: "UI + launch"
    sub: "dashboard_ui.c"
    items: ["Home, Library and System screens", "Ring-buffer logger and debug overlay", "Chain-loads the chosen ELF"]
flowCaption: "Based on the repository's source layout and commit messages."
---

## What it is

A launcher and dashboard for the PlayStation 2, written in C against the open PS2 SDK. It finds programs on the storage devices that are attached, shows them with their own icons, and starts them. The interface is built from original code; the visual style takes loose cues from the console's own menu system and is not affiliated with or endorsed by its maker.

## Problems that were worth solving

- **A real boot failure.** Loading drivers from a `host:` path worked until a launch configuration mapped `host:` somewhere else; `fileXioInit()` then hung before the first frame. I replaced every file-based driver load with modules embedded in the ELF, which removes that dependency.
- **A subtle audio trap.** Two PS2 audio-encoder tools produce similar-looking files, but only one matches what the audio library expects; the other plays as silence. I identified the correct official encoder, uploaded the looping music into SPU2's own memory so the hardware loops it, and chunked the menu blip across frames. Reading the audio server's IOP source showed that "stop" only clears a flag that gates the drain thread, so stopping while data was in flight froze the ring buffer for good. The fix is never to stop with unsent data.
- **Failure handling as a feature.** A systematic error-handling pass closed real gaps: unchecked VRAM allocations (the console's 4 MB ceiling is measured, not assumed), silent launch failures, undetected controller disconnects, and a ring-buffer logger that writes to the memory card only when switched on, to avoid wear.
- **Disc handling.** Disc-swap detection watched the wrong signal and could read stale `SYSTEM.CNF` data from the previous disc; it was rewritten.

## Status

Experimental. It was iterated in PCSX2, including a boot test of the final embedded-module build. Network and SMB support were added on a best-effort basis, and the commit history records a real driver-load failure found with Ethernet enabled. The repository has no license file yet, so it should be treated as all rights reserved until one is added.

<div class="note"><span class="mono">How it was built</span><p>The commits carry an AI-assistant co-author trailer. I note that here so the credit is accurate.</p></div>
