# The Garden of Forever

## Concept

The website is a journey into four imagined gardens: afternoon blessings, a lantern-lit Sangeet, a golden Haldi morning, and a moonlit wedding. It retains the PS peacock identity and the invitation's exact ceremony start times, attire and venue. The imagery establishes atmosphere; it does not depict the actual resort or fabricate a personal relationship history.

## Experience

- Full-screen moonlit arch with live HTML typography, a very slight pointer/scroll camera response, and drifting points of light.
- A PS-sealed invitation guests can open. Native HTML disclosure keeps it usable without JavaScript.
- Four full ceremony chapters. On large screens, a sticky art panel changes with the chapter closest to the viewing centre. A chapter compass supports direct navigation. On phones, images and event text form a vertical illustrated story.
- Quick schedule in a native dialog, with keyboard focus management, Escape dismissal, exact dress codes and calendar downloads. The same information is always available inline.
- An optional symbolic diya-lighting moment. It is a local visual interaction; it does not save or send a wish.
- A live countdown, an editorial destination ticket, and the existing honest response composer.
- Sound is off by default. The optional quiet synthesized chord starts only on an explicit click, uses one AudioContext, and suspends when the tab is hidden. No external audio assets or implied licensed soundtrack.
- Optional motion can be disabled at any time. System reduced-motion preferences are respected. No scroll trapping, forced intro wait, cursor replacement or dependency on a 3D runtime.

## Original artwork

Generated using the built-in image-generation tool, then encoded as WebP. All four scenes are 1536 × 1024 pixels. Source assets are in `public/images/garden/`:

| File | Use |
| --- | --- |
| `forever-night.webp` | Opening scene and Shubh Vivah world |
| `tilak-garden.webp` | Tilakotsav afternoon world |
| `sangeet-garden.webp` | Sangeet lantern world |
| `haldi-garden.webp` | Haldi sunlit world |

Shared generation prompt: Original art for a premium Indian wedding website called The Garden of Forever; landscape 3:2; contemporary Indian miniature painting fused with cinematic matte painting; fine painterly botanical detail, tactile foliage, deliberate architectural symmetry, atmospheric depth, a central receding path and restrained magical realism; no text, letters, watermark or people; a fictional ornamental setting, never a photograph of an actual venue.

Scene prompts:

1. **Forever night:** Moonlit emerald garden seen through a monumental scalloped stone arch with carved gold vines; distant golden wedding mandap across a reflective lotus pool; pale full moon, midnight teal sky, warm candles, ivory magnolias and tropical leaves, a stately peacock; dark central negative space for live gold names; deep teal, antique gold and soft ivory.
2. **Tilak:** Rose-stone ceremonial courtyard in warm afternoon sunlight, carved Mughal arches, blush bougainvillea, a small brass thali with kumkum and pink flowers, reflecting fountain, flowering garden; dusty rose, sandstone, olive and antique gold; soft shafts of light.
3. **Sangeet:** Indigo garden after dusk, an old tree hung with warm brass lanterns, moonlit pavilion reflected in a tiled pool, jasmine garlands and a discreet sitar against a low carved bench; starry sapphire sky, copper light and luminous blue foliage.
4. **Haldi:** Radiant morning courtyard with an ivory scalloped pavilion, marigold garlands, pale yellow silk, warm ivory/ochre stone, a shallow brass urli filled with marigold petals, lotus pond and banana palms; saffron, ivory and sage, sunbeams and morning mist.

The original supplied PS logo is unchanged. The previous floral stationery artwork is retained for reference. New scene assets total about 1.6 MiB; only the opening scene is preloaded and below-fold artwork is lazy-loaded.

## Verification

The production verifier covers generated assets and anchors, authoritative dress codes/times, calendar encoding and dates, one h1, and the presence of all four readable chapters and key accessible controls. Focused pure-logic tests cover chapter switching at boundaries and reading-progress clamping. The site builds and verifies both at `/` and at the `/plabini` project path used by GitHub Pages.

Browser visual and interaction QA is not claimed: the supported browser-control capability was unavailable in this editing environment. A human should still check the final composition, native dialog behavior, sound and scroll experience on their devices before public release.
