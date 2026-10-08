---
title: "Cross-platform desktop shell for a browser game client"
summary: "A Go and Wails desktop application that embeds a TypeScript game client, proxies its network traffic, adds overlays such as an XP tracker and world map, and ships builds for Windows, macOS and Linux from CI."
weight: 5
featured: true
year: "2026"
status: released
statusNote: "13 tagged releases, v0.1.x to v0.2.3, April–May 2026"
attribution: "Derivative work (upstream by others)"
role: "Built the desktop shell and most features (26 of 36 commits); one contributor added Discord presence and compass fixes"
stack: ["Go", "Wails v3", "TypeScript", "Bun", "SQLite", "GitHub Actions"]
domains: ["web", "platform"]
metrics:
  - { k: "tagged releases", v: "13" }
  - { k: "release targets from one workflow", v: "Windows · macOS universal · Linux" }
links:
  - { label: "Repository", url: "https://github.com/johnson-cooper/2004sp-client" }
  - { label: "Releases", url: "https://github.com/johnson-cooper/2004sp-client/releases" }
attributionNote: "The game client being wrapped is an open-source TypeScript project by the Lost City community (MIT licensed). My work is the Go and Wails shell, its proxy and services, the overlays, and the build pipeline. The repository also bundles third-party game assets that I do not hold rights to, so I link the code but do not reproduce any screenshots or artwork on this site. No affiliation or endorsement is implied."
flow:
  - title: "WebView"
    sub: "native window"
    items: ["Hosts the bundled TypeScript client", "Overlays for XP, map, wiki, timers"]
  - title: "Go services"
    sub: "Wails v3 app"
    items: ["Embedded asset server", "HTTP asset proxy", "WebSocket proxy", "Local hiscores (SQLite), config"]
  - title: "Game server"
    sub: "any host from config"
    items: ["Origin checks avoided by proxying", "Host and ports are user-configurable"]
  - title: "Release pipeline"
    sub: "GitHub Actions"
    items: ["Windows exe with embedded icon", "macOS arm64 + amd64 merged into a universal app", "Linux tarball (WebKit/GTK)"]
flowCaption: "Condensed from the repository README and release workflow."
---

## What it is

A native desktop wrapper around a browser-based game client. The client is TypeScript compiled to a single bundle with Bun; the wrapper is a Go application using Wails v3 that serves the bundle from embedded files, proxies the connection to a game server, and adds features a plain browser tab does not have.

## What I built

- **A two-way proxy.** Asset requests are served from the embedded filesystem when the file is bundled and forwarded to the server otherwise. Game traffic goes through a local WebSocket proxy, which avoids Origin-header problems with the server.
- **Overlays and tools.** An XP tracker with XP drops, a world map, an in-app wiki panel, an AFK timer, shift-click handling, stretched rendering and local hiscores backed by SQLite. Fixes along the way included XP-drop timing and the compass.
- **Configurable connection.** Host and port selection moved into a config file so the client can connect to any compatible server.
- **A release pipeline.** One workflow builds the Windows executable with its icon embedded, builds macOS for arm64 and amd64 and merges them into a universal `.app`, and builds Linux against WebKit and GTK. It publishes all three on each tag. Several early releases were spent getting the macOS job right.

## Status

Released; commit activity runs from April to May 2026. The repository bundles a large amount of third-party content in its frontend folder, which is the main reason it is described here rather than shown.
