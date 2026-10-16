# Swarnimam & Plabini · #perfectlyPS

A mobile-first wedding invitation for **8–9 December 2026** at **Greater Rajwada Resort, Manpur, Gaya, Bihar**. Built with Astro and TypeScript, with GSAP for the opening, envelope and scroll animations. The output is a static website; no application server or database is needed.

## Run locally

Use **Node.js 22.6 or later** (Node 22 is used in CI) and npm. `.nvmrc` selects Node 22 for nvm users.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. To review the production build:

```sh
npm run build
npm run verify
npm run preview
```

The preview command prints its local URL. `/review/` provides 360px, 390px and 768px iframe layouts for quick responsive checks; it is marked `noindex`. These are layout previews, not physical-device emulation.

## Project structure

| Path | Responsibility |
| --- | --- |
| `src/data/invitation.ts` | Approved event names, dates, times, dress codes, venue and artwork mapping |
| `src/pages/index.astro` | Page composition and navigation |
| `src/components/` | Named page sections, countdown, envelope, event details and RSVP form |
| `src/layouts/BaseLayout.astro` | Document shell, fonts, metadata and structured data |
| `src/styles/site.css` | Shared typography, layout, responsive styling and motion fallbacks |
| `src/scripts/animations.ts` | GSAP opening, reversible event reveals and envelope interactions |
| `src/scripts/rsvp.ts` | Form validation, message preview, editing and copying |
| `src/lib/` | Calendar serialization and guest-message formatting |
| `src/pages/calendar/[event].ics.ts` | Individual downloadable event calendars |
| `src/pages/celebrations.ics.ts` | Combined four-event calendar |
| `public/images/` | Only the artwork and identity assets used by this website |
| `scripts/` | Build integrity and guest-message checks |
| `.github/workflows/` | Pull-request validation and GitHub Pages deployment |
| `docs/CONTENT.md` | Approved content and editing rules |
| `docs/ASSETS.md` | Current artwork provenance and usage |

`/experience/` is a small redirect to the invitation, retained for existing shared links. It has no separate implementation or assets.

## Edit the wedding content

Start with `src/data/invitation.ts`. Each event’s `iso` value includes the `+05:30` offset; calendars convert it to UTC. Keep the visible `day`, `date` and `time` consistent with that timestamp. The countdown uses the first event automatically. Keep event IDs stable because they are also section anchors and calendar URLs.

The family invitation is in `src/components/Envelope.astro`; the story is in `src/components/Story.astro`. See [approved content](docs/CONTENT.md) before changing either. Asset URLs must use the `asset()` helper so the site works under both `/` and a GitHub Pages repository path.

## Verification

`npm run verify` runs two small dependency-free check scripts after a build:

- Build checks: approved content, unique IDs, internal anchors, local resources (including responsive images), metadata, four calendar events and exact start times, UTF-8 calendar folding and CRLF line endings.
- Message checks: attending, declining, unconfirmed responses, event selection and whitespace handling.

CI builds and verifies both `/` and `/plabini`. These checks do not measure visual quality or Core Web Vitals. After changing layout or animation, also inspect mobile and desktop, open and close the letter, prepare/edit/copy a guest message, and check reduced-motion behaviour.

## Deploy to GitHub Pages

1. In the repository’s **Settings → Pages**, select **GitHub Actions** as the source.
2. Merge the reviewed changes into `main`.
3. The **Deploy wedding website** workflow installs locked dependencies, reads the Pages configuration, builds, verifies and deploys `dist/`.

A feature-branch push runs checks but does not update the public Pages site. Deployment can also be started manually from Actions on `main`. GitHub’s built-in token is used; no custom deployment secret is required. The workflow sets the real origin and repository base path from Pages configuration.

For a manual project-path build (Bash):

```sh
BASE_PATH=/plabini SITE_URL=https://swarnimam.github.io npm run build
npm run verify
```

PowerShell equivalent:

```powershell
$env:BASE_PATH = '/plabini'
$env:SITE_URL = 'https://swarnimam.github.io'
npm run build
npm run verify
```

For root hosting, set `BASE_PATH=/` and `SITE_URL` to the destination origin. Upload the **contents of `dist/`** to a static host. `SITE_URL` controls canonical/social URLs; `BASE_PATH` controls resource and calendar paths. Do not commit generated `dist/`, `.astro/`, credentials or environment files.

## Behaviour, accessibility and privacy

- Essential content is server-rendered. The letter uses native `<details>` as its no-JavaScript fallback; the form provides a no-script explanation.
- Animations run by default and respect the operating system’s reduced-motion preference. Scrolling is native; there is no audio autoplay.
- Event artwork uses responsive WebP images and lazy loading. The opening image is prioritized. Decorative images are hidden from assistive technology where appropriate.
- The countdown stops at zero, shows the celebrations message, and avoids unnecessary updates while the page is hidden.
- RSVP **prepares a message only**. Guests copy and share it themselves. No guest data is submitted, stored or emailed by this site.
- Fonts load from Google Fonts, with local serif/sans-serif fallbacks. There are no analytics or tracking scripts in the application.
- Artwork is illustrative; it is not photography of the actual couple or booked venue.
