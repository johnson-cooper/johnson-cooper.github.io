---
title: "PS2SP"
summary: "A static, Git-backed catalog of PlayStation 2 homebrew, kept current by scheduled GitHub Actions that sync known projects and discover new ones inside a fixed API budget."
weight: 4
featured: true
year: "2026"
status: active
statusNote: "Catalog currently holds ≈3,450 project records"
attribution: "Original software (shared repository)"
role: "Built the initial architecture, the sync and discovery scripts, and the JSON API; a co-maintainer has extended it since"
stack: ["Node.js", "Astro", "GitHub Actions", "GitHub REST API", "Markdown content collections"]
domains: ["web", "tooling"]
metrics:
  - { k: "project records in the catalog today (all contributors, mostly automated)", v: "≈3,450" }
  - { k: "deterministic shards for daily sync", v: "24" }
  - { k: "discovery cadence", v: "every 2 h" }
links:
  - { label: "Repository", url: "https://github.com/johnson-cooper/PS2SP" }
attributionNote: "I wrote the first version (15 commits on 28–29 Sept 2026: the Astro site, content schema, JSON API, sync and discovery scripts, the maturity gate and the promotion step). Another maintainer (NathanNeurotic) has contributed most of the commits since, and a bot account commits the automated catalog updates. The record count above is the combined result, not something I hand-wrote."
flow:
  - title: "Sources"
    sub: "config/"
    items: ["Trusted PS2 organisations and developers", "Incremental search with a stored watermark", "Resumable historical bootstrap by month"]
  - title: "Discovery"
    sub: "every 2 hours, hard request budget"
    items: ["Maturity gate on candidates", "Fork networks need PS2-specific identity", "Queued to discovery/pending/"]
  - title: "Promotion"
    sub: "scripts/promote-pending.mjs"
    items: ["Eligible candidates become Markdown", "Human-written fields kept separate from synced fields"]
  - title: "Sync + publish"
    sub: "24 shards, ETag caching"
    items: ["Each project checked about daily", "304 responses cost no processing", "Astro builds static pages and a JSON API"]
flowCaption: "Condensed from the repository README."
---

## The problem

The PlayStation 2 homebrew scene is spread across thousands of repositories, forks and abandoned experiments, and nothing keeps a list of it that is both browsable and current. A hand-edited list goes stale; a crawler that brute-forces GitHub burns through rate limits.

## Design

The rules I set at the start are in the README: records are plain, reviewable Markdown; Git is the durable source of truth; there is no application database and no always-on backend; the site deploys as static files. Human-written metadata stays separate from synchronised repository fields, so an automated job can refresh stars, releases and activity without overwriting a curated description.

## The interesting engineering

- **Rate-limit budget as a first-class input.** Discovery runs with a maximum request count, a reserve held back for the core and search quotas, and a delay between search calls. When the budget is spent it stops cleanly instead of failing.
- **Sharded sync with conditional requests.** Known projects are split into 24 deterministic shards, so an hourly job touches each project about once a day. Stored ETags go out as `If-None-Match`, so unchanged repositories return `304` and produce no commit.
- **Three discovery strategies combined.** Trusted owners, recent incremental searches that remember where they stopped, and a historical scan that walks backward in bounded monthly windows across runs.
- **A maturity gate.** A repository that merely mentions the console is not published. Candidates are queued and promoted only when they pass checks, and forks are stricter still: copied upstream README text does not count as identity.
- **Static output with a real API.** Astro generates the pages plus `projects.json`, `categories.json` and `releases.json` endpoints from the same content collection.

## Status

Live and being extended. Because most of the catalog is generated, the number to judge my work by is the architecture and the scripts above rather than the record count.
