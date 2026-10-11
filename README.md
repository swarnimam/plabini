# Swarnimam & Plabini — #perfectlyPS

An invitation-inspired wedding website for 8–9 December 2026 at Greater Rajwada Resort, Gaya. Built with Astro as a portable static site.

## Run and build

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The production output is `dist/`. Upload that directory to any static host (for example, GitHub Pages, Netlify, Cloudflare Pages or Vercel configured for Astro static output). No server, database, or runtime secrets are required.

Set `SITE_URL` to the real deployed origin to generate canonical/social URLs. For a GitHub project URL, also set `BASE_PATH=/plabini`. All live assets and calendar links use the configured base path. Do not substitute an unregistered example domain.

```sh
SITE_URL=https://swarnimam.github.io BASE_PATH=/plabini npm run build
```

## GitHub Pages pipeline

Two workflows are included:

- **Check wedding website** (`.github/workflows/check.yml`): validates pull requests into `main` and pushes to `codex/**` branches. Builds and verifies both a root deployment and the `/plabini` project path. It has read-only permissions and cannot deploy.
- **Deploy wedding website** (`.github/workflows/deploy.yml`): runs on pushes/merges to `main`, or manually from Actions. Installs locked dependencies, reads the actual Pages origin/base path, builds, verifies, uploads `dist/`, and deploys only after success. Manual runs on other branches are intentionally skipped.

One-time setup:

1. In the repository's **Settings → Pages → Build and deployment**, set **Source: GitHub Actions**.
2. Merge the redesigned website and workflows into `main`.
3. Open **Actions → Deploy wedding website** to follow the first deployment. Subsequent pushes to `main` deploy automatically. To redeploy manually, select **Run workflow → main**.
4. The deployment job's environment link shows the actual URL. Without a custom domain, the expected URL is `https://swarnimam.github.io/plabini/`.

No personal access token or custom secrets are required; GitHub supplies the short-lived `GITHUB_TOKEN`. The deployment job alone has `pages: write` and `id-token: write`. Concurrent deployments are serialized. Existing repository/environment restrictions still apply.

The workflow must be merged into the default branch before GitHub shows its manual Run workflow button. No public deployment is claimed before a successful Actions run.


## Edit the invitation

- `src/data/invitation.ts` — authoritative published names, family, venue and ceremony information.
- `src/pages/index.astro` — invitation page structure.
- `src/components/events/WeddingEventsSection.astro` — alternating connected event timeline.
- `src/components/rsvp/RsvpPortal.astro` — response composer; does not claim to send an RSVP.
- `src/styles/invitation.css` — responsive ivory, rose, sage and antique-gold design.
- `src/scripts/invitation.ts` — countdown, mobile-menu behavior and response copy controls.
- `src/lib/calendar.ts` — UTF-8-safe RFC 5545 calendar generation from the same event data.
- `CONTENT_NOTES.md` — content sources, schedule conflicts, artwork provenance and remaining confirmations.
- `REPO_REVIEW.md` — findings from the original implementation and the redesign decisions.

The original story, timeline, gallery, ambient-audio and cinematic components, old JSON, and early planning documents are retained for reference. They are not imported into the current page and their placeholder facts are not authoritative. Do not republish them without replacing their content and verifying the behavior.

## Guest experience

The invitation, ceremony times, calendar downloads, venue link, FAQ and navigation work without JavaScript. JavaScript adds a countdown and a response composer. Reduced-motion visitors receive no entry animations or smooth scrolling. The mobile navigation uses native disclosure controls and works without JS.

RSVP messages are **not sent or stored** by this site. Guests prepare and copy their response, then send it directly to the family through their existing conversation. A confirmed destination and delivery integration are required before replacing this with a submission form. No uncertain phone number is used.

The map button opens a search for the exact venue name and locality; it is not a verified pin. The artwork is decorative, not an image of the actual resort.

## Verification

`npm run build` compiles the production site. `npm run verify` checks generated assets, internal anchors, metadata, exact calendar starts and UTF-8 line folding, and ensures no placeholder story, false venue, or fake RSVP success leaks into the live HTML. Run the build before verification. Check both root and `/plabini` base-path builds before GitHub Pages publication.

Browser rendering and interaction checks should be completed before sharing broadly; the current editing environment did not provide the supported browser QA tool.
