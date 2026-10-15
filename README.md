# Swarnimam & Plabini — The Unwritten Chapter

A mobile-first Astro wedding invitation for 8–9 December 2026, Greater Rajwada Resort, Gaya.

The current design follows the couple's real story: VIT-AP, friendship in Bangalore, and two families coming together. Restored moonlit garden artwork, a monogrammed opening envelope, and animated invitation pages, per-event calendar downloads and a local-only response-message composer.

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

`src/data/invitation.ts` holds the event details. `src/pages/index.astro`, `src/styles/chapter.css`, `src/styles/regal.css` and `src/scripts/chapter.ts` implement the current experience. The older garden components remain unused for history; they are not loaded by the current page.

## Deployment

`.github/workflows/check.yml` verifies root and project-path builds for pull requests and codex branches. `.github/workflows/deploy.yml` builds and deploys main through GitHub Actions to GitHub Pages, using the Pages-provided URL and base path. Repository Settings → Pages must use GitHub Actions. No backend/secrets are required for this static website. Publishing a feature branch alone does not change the public Pages site; merge its PR to trigger deployment.

## Content, accessibility and privacy

See CONTENT_NOTES.md for approved details and DESIGN_RESEARCH.md for research, concept, asset provenance and verification limits. This revision uses no personal photographs. Motion runs by default without an on-page switch; the operating system’s reduced-motion preference is respected. GSAP ScrollTrigger drives reversible scene transitions with native scrolling; no scroll pinning or autoplay audio. Sangeet and Shubh Vivah use bespoke illustrated scenes of dancing and a red-and-gold mandap with agni. Full generation prompts are recorded in ASSET_PROMPTS.md. Guest-message generation happens in the browser; nothing is transmitted or persisted, and no recipient email is embedded. Food/accommodation sections are omitted.

Rendered browser/device QA could not be performed in the implementation environment. Build and content verification is not a substitute for that review.

The optional scene viewer expands each illustration into a native dialog with event details and next/previous navigation. Page information remains readable without opening it. Tilak and Haldi now use matching family illustrations; names appear only inside the opened letter. See ASSET_PROMPTS.md for provenance and full prompts.
