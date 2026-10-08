---
title: "Solara"
summary: "A VST3 rompler plugin in C++ and JUCE with a compressed soundfont format, a 128-voice sample engine, a multimode filter and a built-in effects chain. Seven tagged builds for Windows, macOS and Linux."
weight: 12
year: "2026"
status: released
statusNote: "v0.1.0 to v0.2.1, 30 June–1 July 2026"
attribution: "Original software (monorepo also holds other plugins)"
role: "Author of the Solara plugin; the repository history is a single commit by me"
stack: ["C++", "JUCE 8", "Visage UI", "CMake", "VST3"]
domains: ["audio", "systems"]
metrics:
  - { k: "tagged releases", v: "7" }
  - { k: "voices", v: "128" }
  - { k: "filter modes", v: "LP12 · LP24 · HP · BP" }
links:
  - { label: "Repository", url: "https://github.com/johnson-cooper/solara" }
  - { label: "Releases", url: "https://github.com/johnson-cooper/solara/releases" }
attributionNote: "The Solara plugin sources are in `plugins/Solara`. The same repository holds other plugin projects (CloudWash, gnarly) that I have not examined and do not claim. The factory presets are derived from sample libraries whose licences I have not audited, so I describe the engine and format work and make no claim about the preset content. The public history is one squashed commit, so authorship rests on that commit and the release record."
---

## What it is

A sample-playback synthesiser for producers: load a preset, shape it, play it. The interesting part is the size. Presets are stored in a custom `.slr` format, converted from SF2 and SFZ soundfonts by a bundled command-line tool, with user-selectable lossless or perceptual compression.

## Engine and format

- **Sample engine.** Up to 128 polyphonic voices, ADSR envelope per layer, LFO engine, a multimode filter with resonance, legato and portamento for mono play, and velocity and key scaling.
- **Effects.** A reverb, chorus and delay chain.
- **The `.slr` format.** A parser for a container holding velocity layers, loop points, sample maps and modulation envelopes, plus a sample cache and a preset database with precedence rules.
- **Native UI.** Written against Visage in C++ rather than a web view.
- **Release engineering.** Cross-platform builds shipped on each tag, from v0.1.0 to v0.2.1 in about 24 hours; each archive is around 290 MB because it includes the factory presets.

## Status

Released, early versions. The development folders for AI coding tools are present in the repository, so I will say plainly that this was built with an AI assistant. A later fix in the history corrects knob normalisation and reduces idle repaint load.
