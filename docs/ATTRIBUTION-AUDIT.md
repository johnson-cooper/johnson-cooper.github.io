# Project attribution audit (internal, not published)

Method: `gh api` and shallow-history clones of each repository; commit authorship, README/docs, licences, release lists. Facts below are as of 8 Oct 2026. Re-check before changing any claim on the site.

| Repo | Visibility / origin | Commits by Cooper | Decision | Notes |
| --- | --- | --- | --- | --- |
| ps2-daw | public, original | 6 of 7 (1 by "Claude") | **Featured** | README states nothing is confirmed on real hardware; site repeats that. No licence file. Default branch is `claude/nifty-albattani-42b9hp`, not `main`. |
| 2004sp-ps2port | public; history imported from lesleyrs' C99 client (not marked as a GitHub fork) | 7 of 667 (≈19.7k lines added incl. vendored miniz and a generated 2.4k-line header) | **Featured as a port** | Credits upstream. Commits carry Claude co-author trailers. No licence file on the repo, so redistribution terms are unclear. 20 stars, 8 releases. |
| PS2SP | public, original, shared | 15 of 386 (209 by bot, ~162 by NathanNeurotic) | **Featured, scoped to my part** | I wrote the foundation + discovery/sync scripts (first 15 commits). Record count (~3,450) is combined, mostly automated; wording says so. No licence file. |
| ps2-dashboard | public, original | 12 of 12 (Claude co-author trailers) | **Featured (experimental)** | Embeds prebuilt IRX drivers from ps2sdk (open source) and user-supplied music/SFX; no licence file. Verified only in PCSX2 per commits. |
| 2004sp-client | public, MIT | 26 of 36 (+gradwahl 6) | **Archive, top (was featured; demoted because of bundled third-party assets)** | Bundles third-party game fonts, wiki images and a game-data SQLite DB in `lostcity-client/frontend/dist` and `db.sqlite`. Site shows no screenshots and uses neutral wording. Consider removing those assets from the repo. |
| lost-city-progressive | public, no licence | 93 of 93 | Archive (experimental) | Mod on top of upstream server engine + content scripts for a commercial game. |
| project-goat | public, no licence | 24 of 24 | Archive (experimental) | Uses a third-party duel engine, card DB and art; see its THIRD_PARTY_NOTICES.md. No card art on site. |
| osrs-twilight (ironplanner.men) | public | not itemised | Featured (web) | Content taken from the previous portfolio post; the repo README is only the URL. |
| retrorevisions, slayertasks | public | author | Archive | BalanceSigns has no public repo (Modrinth link only). |
| YGO-NEXUS-REVIVAL | public release page | not itemised | Archive | Fan patch for a commercial game. Role described as release-page maintainer; patch credits carried over from the old post. Removed hotlinked third-party title-screen image. |
| Panzer VST | no repo | unverifiable | Archive, flagged | Role carried over from old portfolio; no public source to cite. Removed hotlinked store image. |
| ssb-decomp-re (fork of VetriTheRetri/ssb-decomp-re) | fork; no licence | 12 on main (+14.5k lines) and 25 on `fix/ps2-hardware-iop-boot` (13 mine, 12 "Claude") | **Featured in "PS2 ports"** (re-evaluated 8 Oct after user pointed to branches/releases) | Port of a decompilation of a commercial N64 game. Release v1.0 ships an ELF only; user must supply ROM. Game not named on the site. Docs say nothing verified on real hardware as of 29 Sept. |
| khdays-decomp (fork of Yokimitsuro/khdays-decomp) | fork; CC0 upstream | 121 ahead of upstream on `ps2-port`: 100 mine, 21 "Claude" (+67k lines, mostly generated link glue) | **Featured in "PS2 ports"** | Port of a decompilation of a commercial DS game. Release v1.0 PS2 ELF only; user-built ~245 MiB data pack from own ROM. Game not named on the site. |
| vril-engine (fork of nzp-team/vril-engine) | fork; GPL-2.0 | 24 on `ps2-port` (19 + 5 under two author names) | **Featured in "PS2 ports"** | Quake-derived engine; releases v1.0, v1.1 (≈64 MB zip includes game content from the upstream project; not audited). |
| solara | public, MIT, one squashed commit | 1 | **Archive, released** | Plugin sources in `plugins/Solara`; repo also holds CloudWash/gnarly plugins (not claimed) and ~290 MB of preset content with unaudited licences. `.claude`/`.agent` folders indicate AI-assisted development. |
| easyrpg-ps2 | public, GPL-3 (EasyRPG Player history) | 1 (a Windows diagnostic build) | **Excluded** | The PS2 port work in the repo is upstream's (MaxSignal et al.). |
| OpenTESArena | fork | 1 on `mipmapping`, 1 on main | **Excluded** | Too small to claim. |
| pokered-remastered | public | 1 of 87 (86 by "codex" bot) | **Excluded** | |
| fmpx, react-crypto, image-upscaler, esrgan-upscaler, + 15 others | **private** | – | **Excluded** | Private repos must not be linked or described. |

## Claims intentionally left out

* "Produced for Lil Peep": could not be substantiated from public sources (a web search found no connection to the AttackIsHere name). Removed from the About page. Add back only with a verifiable credit link.
* Any employment history, résumé, LinkedIn, metrics such as downloads or users: none found.

## Third-party assets removed from the old site

* Yu-Gi-Oh! title screen hotlinked from romhacking.net (nexusrevival post).
* Logo images hotlinked from payhip.com / forgecdn / modrinth CDN (panzer, slayertasks, balancesigns, retrorevisions posts).

## Still in `static/` (unchanged, preserved)

`game.gba` (Trap Runner, the author's own game), `emulator.html` (loads EmulatorJS from its CDN), `fbxu.html`, `text-gen.html`, `bootstrap.html`, `list.html`, `fonts/`, `gif.worker.js`.
