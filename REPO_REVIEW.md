# Repository review — 11 October 2026

## Purpose and architecture

The repository is a static Astro wedding experience for Swarnimam and Plabini. The original implementation used component-local CSS, a JSON content store, GSAP registration, Lenis scrolling, canvas particles, a loader, synthesized audio, story and memory sections, gallery, events, countdown, venue and RSVP. There were no server endpoints, database, real RSVP delivery, automated checks or deployment workflow.

The intended experience is an emotional, polished wedding website that also gives guests practical event information. The redesign uses the couple's newer invitation direction: bilingual content, gold PS peacock branding, warm ivory and floral detail, and a connected four-event schedule. It preserves the Astro foundation and original reference components while replacing the live entry page.

## Findings and resolution

| Area | Original issue | Current resolution |
| --- | --- | --- |
| Published content | Generic relationship history from 2019 onward was presented as personal fact | Not published; requires verified history |
| Photos | Same six generic scenes repeated across 24 filenames, including a Udaipur palace | Not shown as the couple or venue; original supplied logo and new decorative artwork used |
| Venue | JSON says Rajwara Resort, missing venue image, map URL null; hard-coded text says Grand Taj Palace | Invitation source used consistently: Greater Rajwada Resort, Gaya; useful map-search link |
| Dates | Metadata and structured data still used 18–22 December; current JSON used 9 December | Metadata, visible schedule and countdown now use the invitation dates |
| Event times | Repo and invitation had conflicting times; seven repo entries versus four requested invitation events | Four invitation events published; all differences documented in CONTENT_NOTES.md |
| Calendar | Google Calendar links lacked date/time parameters | Downloadable per-event and whole-schedule ICS, from shared event data, in UTC |
| RSVP | Browser localStorage only, followed by a misleading confirmation; wrong initials and venue | Honest response composer; no false delivery claim, no unnecessary email collection or local storage |
| Navigation | Header component not mounted, and mobile links hidden | Visible sticky header and native mobile disclosure menu |
| CSS build | Layout referenced `/src/styles/global.css` as a public URL | CSS imported through Astro for correct production bundling |
| Resilience | Loader relied on sessionStorage and JS; multiple sections started invisible | Content visible by default, optional native Web Animations enhancement, no blocking loader |
| Accessibility | Repeated h1s, incomplete reduced-motion behavior, modal without focus trapping | Single h1, native details, labelled fields, skip link, visible focus, no modal, reduced-motion handling |
| Performance | Continuous canvas animation, scroll handlers, grain overlays and synthetic audio | No perpetual animation loop or large client framework; image in WebP; below-fold images lazy-loaded |
| Hosting | Guessed canonical domain and stale sitemap, no deployment configuration | Real origin/base configurable, no fake canonical; manual GitHub Pages workflow |
| Documentation | Local Windows file links, stale venue/time claims and unsupported Lighthouse claims | Current setup/content docs and explicit verification limits |

## Preserved, not published

Old cinematic components and JSON remain available for future adaptation. Retaining them does not certify their data or behavior. The original synthesized-audio implementation also has a rapid-toggle race during delayed cleanup; it is not loaded by the new page. The old gallery's “view” affordance did not open a gallery viewer; it is likewise not mounted.

## Remaining decisions

The finished invitation, detailed wedding-night ritual times, extra informal events, real personal photos/story, RSVP delivery destination, and a precise venue map pin still need confirmation. The website is ready for visual review as an invitation and schedule; it is not a backend guest-management system.

## Validation scope

Production builds and generated-output checks cover the root URL and the GitHub Pages base path. No browser QA or measured Lighthouse/accessibility score is claimed because the supported browser testing capability was unavailable. See the pull request for actual executed checks.
