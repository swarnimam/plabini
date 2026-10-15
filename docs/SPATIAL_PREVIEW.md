# Destination preview

`/experience/` now uses a cinematic image-based 2.5D treatment, replacing the rejected primitive Three.js architecture. The entrance image supplies the established art direction; a transparent architectural foreground travels toward the viewer while the corridor is revealed behind it. The corridor slowly advances with scrolling, then a red-and-gold mandap appears near the wedding chapter. Two short scenic intervals show the setting without text. This is not a freely navigable, reconstructed 3D destination.

The scene uses CSS perspective, transform and opacity; it does not depend on WebGL. The former SVG geometry review mode and Three.js dependencies were removed. The existing root invitation retains its layout and receives the new Tilak/Haldi assets.

Tilak and Haldi artwork now show empty prepared settings. Sangeet and Shubh Vivah event artwork remain unchanged. All generated images depict imagined settings, not the booked venue. No ceremony details were added to the approved text.

Event artwork and descriptions are wrapped in one animated sheet. Mobile images use the full portrait composition, including gifts and the foreground decor. Image and description widths are identical; desktop columns use equal tracks. Both move together rather than drifting out of alignment during the reveal.

## Validation and practical limits

- Root and `/plabini/` Astro builds and existing content/calendar/response checks pass.
- The new motion script passes TypeScript with DOM, DOM.Iterable and ES2022 libraries.
- All static content remains available without JavaScript. Reduced-motion preferences disable scale/depth transforms and sheet choreography; the successive background scenes remain available.
- The first entrance image has high loading priority. Scene and event images use compressed WebP variants; event images are lazy-loaded. Scroll work is coalesced into a single animation frame, with no perpetual render loop.
- The motion code is about 2.5 kB minified plus the existing shared GSAP/ScrollTrigger bundle. This is a build measurement, not a Core Web Vitals score.
- Browser checks use the actual deployed page and `/review/` iframe layouts. Iframe widths exercise responsive CSS, but do not emulate a physical phone's GPU, battery use, touch handling or network.

See DESTINATION_ASSETS.md for asset paths, prompts and provenance.
