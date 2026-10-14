# Swarnimam & Plabini — The Unwritten Chapter

A mobile-first Astro wedding invitation for 8–9 December 2026, Greater Rajwada Resort, Gaya.

The current design follows the couple's real story: VIT-AP, friendship in Bangalore, and two families coming together. Original silk artwork, animated Hindi/English event scenes, lightweight canvas and SVG motion, per-event calendar downloads and a local-only response-message composer.

## Develop and verify

```sh
npm ci
npm run dev
npm run build
npm run verify
```

For the GitHub Pages project path:

```sh
BASE_PATH=/plabini SITE_URL=https://swarnimam.github.io npm run build
npm run verify
```

`src/data/invitation.ts` holds the event details. `src/pages/index.astro`, `src/styles/chapter.css`, `src/styles/celebration.css` and `src/scripts/chapter.ts` implement the current experience. The older garden components remain unused for history; they are not loaded by the current page.

## Deployment

`.github/workflows/check.yml` verifies root and project-path builds for pull requests and codex branches. `.github/workflows/deploy.yml` builds and deploys main through GitHub Actions to GitHub Pages, using the Pages-provided URL and base path. Repository Settings → Pages must use GitHub Actions. No backend/secrets are required for this static website. Publishing a feature branch alone does not change the public Pages site; merge its PR to trigger deployment.

## Content, accessibility and privacy

See CONTENT_NOTES.md for approved details and DESIGN_RESEARCH.md for research, concept, asset provenance and verification limits. This revision uses no personal photographs. Reduced-motion and a visible motion switch are supported. Guest-message generation happens in the browser; nothing is transmitted or persisted, and no recipient email is embedded. Food/accommodation sections are omitted.

Rendered browser/device QA could not be performed in the implementation environment. Build and content verification is not a substitute for that review.
