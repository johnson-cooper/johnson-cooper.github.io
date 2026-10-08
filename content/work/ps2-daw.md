---
title: "PS2 DAW"
summary: "A pattern-based digital audio workstation that runs natively on the PlayStation 2, with a software mixer, a synthesizer, a piano roll and an eight-track effects mixer."
weight: 1
featured: true
year: "2026"
status: active
statusNote: "Builds and runs in PCSX2. Not yet tested on real hardware."
attribution: "Original software"
role: "Repository author (6 of 7 commits; the first commit is by an AI assistant)"
stack: ["C++", "PS2SDK", "gsKit", "SPU2", "PCSX2 debugger"]
domains: ["systems", "audio"]
metrics:
  - { k: "lines of C++, source plus host tests", v: "≈22,000" }
  - { k: "mix format", v: "48 kHz stereo" }
  - { k: "audio thread block", v: "512 frames" }
  - { k: "effect slots per mixer track", v: "4" }
links:
  - { label: "Repository", url: "https://github.com/johnson-cooper/ps2-daw" }
  - { label: "Architecture notes", url: "https://github.com/johnson-cooper/ps2-daw/blob/HEAD/docs/ARCHITECTURE.md" }
flow:
  - title: "UI thread"
    sub: "EE priority 80"
    items: ["Pad input, 640×448 gsKit UI", "Edits the song through one Session API", "Never calls the audio library"]
  - title: "Command ring"
    sub: "lock-free SPSC, 1024 entries"
    items: ["8-byte commands", "At most 256 applied per block", "Audio thread keeps its own pattern grid"]
  - title: "Render thread"
    sub: "EE priority 64"
    items: ["512-frame blocks; no allocation, I/O or locks", "Blocks split on step boundaries", "Sequencer, mixer, 7 effects, synth"]
  - title: "Two output paths"
    sub: "SPU2"
    items: ["48 kHz stereo PCM stream (master bus)", "SPU2 hardware voices for short sounds", "Hardware notes timed against the heard frame"]
flowCaption: "Simplified from docs/ARCHITECTURE.md in the repository."
---

## What it is

A step-sequencer workstation in the tradition of channel rack, pattern and playlist editors, written from scratch for the PlayStation 2. The program, its code and its bitmap font are original; there are no third-party samples or artwork in the repository, and the drum kit is synthesised at boot. It is not affiliated with any commercial DAW.

## Why it is hard

The Emotion Engine has to render samples itself and hand them to the SPU2 sound processor, while the UI keeps drawing at 60 FPS on 32 MB of RAM. If the audio thread misses its deadline you hear it, so the design is built around never letting the UI and the mixer wait on each other.

## How it works

- **Strict thread roles.** The render thread (priority 64) preempts the UI thread (priority 80). Neither takes a lock. The UI sends 8-byte commands through a single-producer, single-consumer ring; the engine keeps its own copy of the pattern grid and never reads the UI's `Project`.
- **Transport clocked by audio frames, not video frames.** Tempo is integer arithmetic on a 96 PPQ grid, and each render block is split on step boundaries so a note starts on exactly the right frame. Host tests check step timing over 30 seconds at four tempos, including fractional BPM, with irregular block sizes.
- **Two ways to make sound.** A software mixer gives sample-accurate playback, metering and effects; SPU2 hardware voices cost almost no CPU. For hardware voices the engine computes the "heard" frame as frames written minus frames still queued, and fires voices when that frame arrives, so both paths stay aligned.
- **Sample lifecycle without races.** Imported samples move through `Empty → Ready → Releasing → Acked → Empty`. The audio thread stops every voice reading a sample before the UI is allowed to free its memory.
- **A written memory budget.** Effects pool, project document, undo history, file buffers and up to 12 MiB of imported samples are all accounted for in the architecture document.

## A bug worth describing

The output code retried a full PCM stream queue for up to 50 ms, and on a partial accept it dropped the tail of the block while still advancing the written-frame counter. That made the "heard frame" drift away from what the stream actually held, which would skew both the playhead and hardware voice timing. The fix keeps the unaccepted tail, resubmits it before rendering anything new, and advances the counter only by frames the stream really accepted.

## What is in the repository

Channel rack; pattern queueing at beat or bar; a 16-track, 128-bar playlist with pattern and audio clips; a piano roll with select, move, copy, quantize, transpose and undo; a native synthesizer (two oscillators, FM, sub, noise, filter, LFO); AHDSR sample envelopes; an eight-insert mixer with gain, filter, distortion, delay, compressor, EQ and reverb; WAV import from USB; offline WAV export; autosave with crash recovery from a backup file.

## What has and has not been verified

The README tracks this in three columns: builds, PCSX2, and real hardware. Most features are marked as running in PCSX2 under a debugger; USB storage cannot be tested there, and the hardware column is empty. PCSX2 shows that the code paths run, not that real-hardware timing and SPU2 behaviour match. Platform-independent code (timing, formats, sample lifecycle, scheduling, slot store) also has host unit tests built with ASan and UBSan.

<div class="note"><span class="mono">How it was built</span><p>The repository history shows AI-assisted development: the first commit is authored by the assistant and later commits are mine. I note that here so the credit is accurate.</p></div>
