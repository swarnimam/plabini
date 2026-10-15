# Spatial wedding preview

The existing invitation remains at `/`. The separate `/experience/` route introduces a Three.js arcade with a scroll-driven camera, column fluting, wall screens, paving inlays, a water channel, brass lamps and a red canopy. This is an imagined setting, not a representation of the booked venue or a claim about unconfirmed regional rituals.

All four event facts and calendar files use the existing invitation data. The family names appear only in the opened letter. The original site no longer exposes the rejected Explore scene buttons or viewer. No audio or guest-facing motion switch was added.

## Verification

- Astro builds and existing calendar/content/response checks pass for root and `/plabini/` deployments.
- TypeScript checks pass with DOM, DOM.Iterable and ES2022 libraries.
- Cloud-browser checks cover the desktop page, letter disclosure, schedule navigation and 390/360-pixel iframe viewports. Those are real layout widths, not hardware/touch emulation.
- Initial browser inspection found horizontal overflow from incoming artwork and a flap overlapping the invitation heading; both were corrected. Event copy received an opaque background for readability over the fallback illustration.
- This cloud browser reports GL_VENDOR/GL_RENDERER Disabled and cannot create a WebGL context. The static illustrated fallback was exercised. GPU lighting, visual quality, frame rate and physical mobile performance remain unverified.
- `/experience/?renderer=svg` is a developer review route using Three's SVG renderer to inspect the same geometry and camera. It differs from WebGL in lighting, depth sorting and material rendering; it is not a substitute for GPU validation. `/review/` embeds this at selectable portrait widths.
- Reduced motion disables the card choreography and freezes the 3D camera. CSS suppresses letter animation. OS preference emulation was not available in this browser, so that branch was reviewed in code rather than exercised through system settings.

The production route caps pixel ratio, limits rendering cadence, pauses drawing while hidden, and lowers pixel ratio after repeated slow frames. No Core Web Vitals or hardware performance scores are claimed. The Three.js scene is isolated to the new route; the established invitation does not download it.
