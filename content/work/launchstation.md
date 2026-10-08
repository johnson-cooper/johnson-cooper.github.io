---
title: "Launchstation"
summary: "A controller-first PlayStation 2 dashboard and file manager. I wrote its theme engine, with 19 presets and a themed UI toolkit, plus audio, device-aware app visibility and CI fixes."
weight: 5
featured: true
contribution: true
year: "2026"
status: active
statusNote: "Maintained by NathanNeurotic; frequent automated releases"
attribution: "Contribution to another maintainer's project"
role: "Contributor: 27 of 462 commits (26 Sept 2026), including the merged theme-engine pull request"
stack: ["C", "PS2SDK", "PS2Build", "SPU2", "GitHub Actions"]
domains: ["systems", "platform"]
metrics:
  - { k: "lines added by the merged theme-engine PR (25 files, 12 commits)", v: "+4,287" }
  - { k: "built-in themes", v: "19" }
  - { k: "my commits / total", v: "27 / 462" }
links:
  - { label: "Project documentation site", url: "https://nathanneurotic.github.io/Launchstation/" }
attributionNote: "Launchstation is NathanNeurotic's project, built on the long-running wLaunchELF line of PlayStation 2 file managers. He wrote most of it (435 of 462 commits). My part is the work described below. The source repository is private at the moment, so there is no code link here and this page is written from my own commit and pull-request history; the project's public documentation site is linked instead."
flow:
  - title: "Theme model"
    sub: "one struct drives the UI"
    items: ["Background, colours, font, icons, clock", "19 presets as small deltas over a base", "Palette no longer a compile-time constant"]
  - title: "Themed primitives"
    sub: "panels, cards, selection"
    items: ["Four highlight styles", "Corner radius applied in one place", "Lists, tabs, modals and toasts all use them"]
  - title: "Classic screens"
    sub: "file browser, HDD manager, editor"
    items: ["Colours derived from the active theme", "Text kept readable over bright artwork"]
  - title: "Audio and devices"
    sub: "SPU2 + storage"
    items: ["Persistent music across screens", "Interface sounds independent of music", "Apps hidden when their device is gone"]
flowCaption: "From the merged pull request and my commit history in the repository."
---

## What it is

A dashboard for the PlayStation 2 that doubles as a file manager and launcher: home, apps, files, devices, tools and settings, all driven from the controller, with artwork, favourites and recents, and support for a wide range of storage and network devices. It is maintained by NathanNeurotic.

## What I contributed

- **A theme engine.** One `DashTheme` structure holds every visual value: background kind and colours, text and accent colours, corner style, highlight style, glow, font face and size, icon tint, default app icon, clock options and an artwork-wallpaper mode. The palette that used to be constant now fills from the active theme. I defined 19 built-in presets as small differences from a base theme, and added settings screens to edit them from the controller. The change was reviewed and merged as one pull request of 12 commits.
- **Reusable drawing blocks.** Panels, cards, selection highlights (four styles) and accent glow replaced hard-coded colours across lists, chips, tabs, modals, toasts, scrollbars and settings. The classic screens (file browser, HDD manager, editor, configuration) take their colours from the theme as well, and text stays readable over bright app artwork.
- **Audio behaviour.** Music persists across dashboard navigation, interface sounds are preloaded without coupling to music state, cursor sounds are throttled correctly, and device hot-plug sounds are suppressed while storage is still being mounted at boot.
- **Device-aware app list.** The app list is refreshed when devices change, and shortcuts and apps from unmounted devices are hidden.
- **CI.** The PS2Build install step was made resilient to transient download failures and verifies the tool from the installer's path.
- **Documentation** for custom themes.

## What I did not do

A second pull request of mine, moving music playback to hardware-looped ADPCM, was closed without merging, so I do not count it here.
