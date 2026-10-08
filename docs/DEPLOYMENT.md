# Deployment and maintenance notes

## What changed

* The Hermit V2 theme was removed; the site now uses its own layouts in `layouts/`, one stylesheet (`assets/css/main.css`) and one 1 KB script (`assets/js/filter.js`, progressive enhancement for the project filter). No webfonts, no third-party requests.
* `baseURL` is `https://johnson-cooper.github.io/` and the site is served from the root. It was previously `/en/...`; those URLs are kept alive with Hugo `aliases` (meta-refresh redirect pages).
* `.github/workflows/hugo.yml`: removed the Dart Sass install (no Sass any more) and turned off recursive submodule checkout (there are none). The workflow still deploys on push to `main` with the official Pages actions, using `--baseURL` from `configure-pages`.
* The old `/ps2/` project site (repo `johnson-cooper/ps2`) is a separate GitHub Pages project and is not affected.

## Release checklist

1. Review the branch `redesign/portfolio-v2` (`hugo server`, then open http://localhost:1313).
2. Merge to `main`; Actions builds and deploys. Pages source must be "GitHub Actions" (it already is: `build_type: workflow`).
3. After deploy, spot-check `/`, `/work/`, `/work/ps2-daw/`, `/en/posts/panzer/` (redirect) and `/sitemap.xml`.

## Adding a project

Create `content/work/<slug>.md` with front matter: `title, summary, weight, featured (true shows on the home page), year, status (released|active|experimental|archived), attribution, role, stack, links, metrics, attributionNote, flow`. Keep `featured` to six or fewer and always state what is upstream.

## Optional next steps

* Self-host a text face (e.g. via Fontsource) and swap the `--serif` / `--sans` custom properties.
* Add a résumé PDF to `static/` and link it from `contact-list.html` once one exists.
* Replace `static/og.png` if the design changes (1200×630).
