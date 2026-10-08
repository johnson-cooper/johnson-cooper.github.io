---
title: "ironplanner.men"
summary: "A live planning tool for small teams in a multiplayer RPG: Kanban board, goals, wishlist, timeline and progress chart, running entirely in the browser with shareable state."
weight: 6
featured: true
year: "2025"
aliases: ["/en/posts/ironplanner.men/"]
status: released
statusNote: "Live at ironplanner.men"
attribution: "Original software"
role: "Designed and built it"
stack: ["JavaScript", "HTML/CSS", "Bootstrap 5", "SortableJS", "Chart.js", "localStorage"]
domains: ["web"]
links:
  - { label: "Live site", url: "https://ironplanner.men" }
  - { label: "Repository", url: "https://github.com/johnson-cooper/osrs-twilight" }
flow:
  - title: "Planner state"
    sub: "one JSON document"
    items: ["Members, tasks, goals, wishlist, notes", "Stored in localStorage"]
  - title: "Views"
    sub: "client-side"
    items: ["Kanban board with drag and drop", "Interactive timeline with zoom", "Doughnut progress chart"]
  - title: "Sharing"
    sub: "no server"
    items: ["Share link encodes the planner", "JSON export and import for backup"]
flowCaption: "Based on the feature list and technology notes in the original write-up."
---

## What it does

A group of players coordinating a long shared goal needs the same few things: who is doing what, what is blocked, what the group is aiming for next, and what loot they still want. ironplanner.men puts those in one page that needs no account and no server.

## Features

- **Members** with roles and colour coding.
- **Kanban task board** with Backlog, In Progress and Done columns, drag-and-drop between columns, and filtering by member or type.
- **Goals** with targets, deadlines and notes.
- **Wishlist** with quantities and an acquired flag.
- **Notes and strategies** stored with the planner.
- **Timeline** of tasks with due dates, zoom controls, a today marker and horizontal scrolling.
- **Progress chart** showing how tasks split across the three columns.
- **Share and export.** A link carries the whole planner state, and JSON export and import cover backup and collaboration.

## Engineering notes

It is intentionally a static client-side app. Everything is held in `localStorage`, so it hosts for free, loads fast and has nothing to leak; the trade-off is that sharing works by copying state rather than by live sync. Drag-and-drop uses SortableJS and the chart uses Chart.js.
