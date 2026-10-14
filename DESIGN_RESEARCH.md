# Editorial and event-illustration revision — 14 October 2026

The approved palette and silk opening remain. Copy has been rewritten throughout in a consistent, gracious invitation voice. Short decorative slogans have been replaced by factual storytelling and clear descriptions. Event descriptions are now shared between the website and calendar downloads. The guest form and generated response also use the revised tone.

Abstract event motifs have been replaced with original, code-native SVG illustrations:
- Tilak / Lagan Chumai: a platter with kumkum and flowers, softly illuminated. It references Tilak without illustrating a specific sequence of the family's Lagan Chumai rites.
- Sangeet: a dholak with restrained rhythmic resonance and musical notation. It illustrates music; it does not promise a particular musician or performance.
- Haldi: a brass bowl of turmeric, spoon and marigolds; the colour reveal relates to the material of the ceremony.
- Shubh Vivah: a ceremonial fire with a subtle natural flame movement. It references the approved Phere title respectfully, with no click-to-light, extinguishing, game mechanics or ritual-count claims.

Cultural sources checked: [Hindu American Foundation wedding primer](https://www.hinduamerican.org/hindu-wedding-primer) describes the sacred fire and emphasises variation by community and family; [HAF basic questions](https://www.hinduamerican.org/learn/hinduism-faq) describes kumkum among materials used for tilak. These support the broad references, not a claim that all described rites occur at this wedding. No new ceremonies, mantras or ritual instructions appear on the site.

No new image-generation assets were needed: SVG objects support precise independent animation and retain the approved colours. Browser QA remains unavailable; build, content, calendar and TypeScript checks are run. Prior design history follows; this revision supersedes descriptions of the abstract fan, orbital and sunburst event scenes.

---

# Latest revision — celebratory motion, 14 October 2026

User rejected the restrained editorial result and reported the opening portrait obscuring Swarnimam's name. This revision replaces that opening entirely: original generated silk background, isolated foreground typography, no personal photographs. A luminous lightweight canvas layer, scroll-linked silk movement, an unfolding fan, animated Sangeet orbits, a Haldi sunburst and a flowing union line study create stronger motion and colour. These are contemporary decorative art, not claims about regional rituals.

The exact PS emblem is now in the header. The invitation is from the Kumar & Nayak families celebrating their children. Individual parents and the card-only family footer are removed. The separate schedule/calendar section is removed; calendar links remain inside each event. Guest shortcuts go directly to celebrations and directions.

The prior version and analysis below are retained as design history; this paragraph and CONTENT_NOTES.md supersede them where different.

## Latest generated asset
Built-in image generation created `public/images/chapter/celebration-silk-640.webp` and `celebration-silk-1280.webp` (the latter retains the original 1024px width).
Prompt: Portrait cinematic artwork with sculptural vermilion, fuchsia and saffron silk framing dark plum negative space; luminous gold threads, theatrical light and tactile folds. Bold joyful celebration. No palace, architecture, people, religious symbols, text or logos. Atmospheric original artwork, not actual wedding decor.

## Verification limits
Content/link/calendar/response tests pass for root and GitHub Pages base paths. TypeScript passes. Browser QA remains unavailable; no claim of tested frame rate, mobile rendering or Core Web Vitals. Foreground names and decorative scenery now occupy explicit separate z-index layers. OS reduced motion and an explicit motion switch stop all nonessential movement; the canvas is capped near 30fps at max 1.5 DPR, pauses offscreen/hidden, and is disabled by default on constrained devices. CSS ambient effects pause outside the viewport.

---

# The Unwritten Chapter

## Existing implementation critique
The previous garden site centred on imagined palace scenery, had little personal story, repeated event structures on phones, used surface-level atmospheric motion, and included a generic symbolic diya interaction. These conclusions came from source/asset inspection, not live-browser testing.

## Research and access
Pages and documentation below were read directly. Their interactive demos were NOT tested in a browser or on a phone. Lusion is a published case study including creator comments; the original designer site returned 403. Mobile implications are engineering/design judgments, not measured performance of those references.

| Reference | Adaptation | Phone suitability / cost |
|---|---|---|
| [Cartier Love Is All, Immersive Garden](https://immersive-g.com/projects/cartier-love-is-all/) | Vertical progression through distinct scenes; event-specific rhythm. | Natural scrolling, no 3D requirement; images must be lazy loaded. |
| [Lusion, Communication Arts](https://www.commarts.com/project/36283/lusion) | A visual motif evolves as the narrative advances. | Two SVG paths replace persistent real-time 3D; no tilt gesture required. |
| [Codrops expanding image typography](https://tympanus.net/codrops/2024/04/02/on-scroll-expanding-image-animation-within-typography/) | Interplay of portrait and expressive names. | Author notes responsiveness is tricky; separate portrait composition, no width-animated layout. |
| [Codrops text highlights](https://tympanus.net/codrops/2024/04/17/some-on-scroll-text-highlight-animations/) | Emphasis at a story turning point. | Full readable text remains; brief observer-triggered reveal rather than obscuring words. |
| [84—24 creator case study](https://tympanus.net/codrops/2024/04/08/case-study-84-24/) | Clear editorial hierarchy and normal vertical scroll alongside expressive motion. | Avoid the 3D payload, keep content HTML. |
| [Amanwana celebrations](https://www.aman.com/resorts/amanwana/celebrations) | Quiet place-led copy and clear practical destination. | No heavy map embed; direct directions link. |
| [Bihar Museum Kohbar](https://www.biharmuseum.org/kohbar/) | Cultural boundary: Mithila-specific wedding imagery is not universal Bihar imagery. | Do not copy ritual compositions into this Aliganj family wedding without confirmation. |
| [Impart Odisha Ikat](https://imp-art.org/articles/odisha-ikat/) | Alignment of threads as an artistic metaphor for lives meeting. | Lightweight line work, not a reproduction of sacred textiles or claim about family custom. |
| [Chrome scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) / [W3C motion](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | Scroll responsiveness, complete static content and motion control. | One rAF per scroll event; no idle render loop; OS reduced-motion and explicit switch. |

## Three directions considered
1. **The Unwritten Chapter (selected):** shared campus, Bangalore friendship, family invitation, four wedding chapters. Strongest verified personal connection and phone feasibility. Portrait/paper reveal; converging story paths; distinct event motion. Cultural meaning comes from family blessings and approved celebrations, not speculative symbolism.
2. **Woven Together:** a textile grows from two strands; strong craft reference to Odisha weaving, less directly tied to the couple's everyday story and higher decorative-overload risk.
3. **Bangalore, Then Forever:** touchable city scrapbook of food/movies/friendship; warm and mobile-friendly, but more memory photographs needed to avoid invented place imagery. Risks becoming a travel diary.

## Motion, original art and implementation
- Opening: two panels part over an original portrait in 1.45 seconds. Text and navigation never blocked. No loading screen or audio.
- Story: two SVG paths draw toward Bangalore as that section enters view. This is a metaphor, not a ritual symbol or map.
- Sangeet: staggered rising/falling ribbons run once; no flashing or continuous animation.
- Haldi: a warm gouache still life creates a different pace and texture; a gentle entrance, rather than night-scene motion reused.
- Shubh Vivah: two joining curves draw slowly once; decorative line art, not mangalsutra, sacred knot, or invented ritual.
- Motion off cancels running animations. OS changes are honored; data saver/low device memory defaults to static mode. No content starts permanently hidden.
- Mobile-first CSS at 320px+, 600px and 900px. Natural vertical scroll. Persistent guest shortcuts, safe area inset, native forms, 44px targets, 16px inputs, explicit image dimensions, responsive WebP originals. No WebGL/video required.

### Bespoke asset
Built-in image generation used for `public/images/chapter/haldi-art.webp` only. Prompt: "Portrait editorial still life, tactile gouache and paper grain; folded pale yellow cotton cloth across mustard background, three marigold heads and turmeric pigment in lower foreground; late morning sunlight, negative space above; ochre/butter yellow/orange/cream; no text, people, faces, deity, religious symbol, palace, border or frame. Abstract celebratory still life, not a specific ceremony."

## Verification and second pass
- Both supplied invitation pages and selected original photographs viewed directly.
- Static content, all anchor links, generated asset paths, exact calendar IST conversions and UTF-8 calendar folding checked by build verifier.
- Message scenarios cover attendance/decline/uncertain and event choices; no transport or recipient address.
- TypeScript checked without emission.
- Second source/layout pass added compact 320px rules, extracted original transparent emblems instead of boxed logo, removed old hospitality lines, and made dates accessible independently of animation.
- Supported browser QA is unavailable in this managed environment. No browser screenshots, touch testing, screen-reader testing, measured Core Web Vitals, or animation frame-rate claims are made. Real-device visual approval remains necessary.
