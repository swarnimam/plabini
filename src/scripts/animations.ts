import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
const media = gsap.matchMedia();
const envelope =
  document.querySelector<HTMLDetailsElement>("#wedding-envelope");
let letterTimeline: gsap.core.Timeline | undefined;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const gateButton = document.querySelector<HTMLButtonElement>("#gate-enter");
// The approved gate is enabled only if all three image layers load successfully.
// Missing image assets cannot block access to the invitation.
if (gateButton) {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>(".gate-artwork"));
  Promise.all(images.map((image) => { const source = image.dataset.gateImage; if (!source) return Promise.reject(new Error("Missing gate image path")); image.src = source; return image.decode(); })).then(() => {
    document.documentElement.dataset.gates = "closed";
    gateButton.hidden = false;
  }).catch(() => { document.documentElement.dataset.gates = "open"; document.dispatchEvent(new Event("gate:unavailable")); });
  gateButton.addEventListener("click", () => {
    gateButton.hidden = true;
    document.documentElement.dataset.gates = reduced.matches ? "open" : "opening";
  }, { once: true });
}
function refresh() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
let changingLetter = false;
const summary = envelope?.querySelector("summary");
summary?.addEventListener("click", (event) => {
  if (!envelope || reduced.matches) return;
  event.preventDefault();
  if (changingLetter) return;
  changingLetter = true;
  letterTimeline?.revert();
  const startHeight = envelope.getBoundingClientRect().height;
  const opening = !envelope.open;
  // Measure the native end state, then animate the container to it. The native
  // details control remains the no-script and reduced-motion fallback.
  envelope.open = opening;
  const targetHeight = envelope.getBoundingClientRect().height;
  if (!opening) envelope.open = true;
  gsap.set(envelope, { height: startHeight, overflow: "clip" });
  const letter = envelope.querySelector(".letter-paper");
  letterTimeline = gsap.timeline({
    onComplete: () => {
      if (!opening) envelope.open = false;
      gsap.set(envelope, { clearProps: "height,overflow" });
      changingLetter = false;
      refresh();
    },
  });
  letterTimeline.to(
    envelope,
    {
      height: targetHeight,
      duration: opening ? 1.5 : 0.8,
      ease: "power3.inOut",
    },
    0,
  );
  if (opening) {
    letterTimeline
      .fromTo(
        letter,
        {
          y: -150,
          scale: 0.82,
          rotationX: -18,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          y: 0,
          scale: 1,
          rotationX: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.25,
          ease: "power3.inOut",
        },
        0.2,
      )
      .fromTo(
        envelope.querySelectorAll(
          ".letter-paper>p,.letter-paper>a,.letter-ganesha,.letter-divider",
        ),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power2.out" },
        0.9,
      );
  } else
    letterTimeline.to(
      letter,
      { y: -110, scale: 0.85, opacity: 0, duration: 0.65, ease: "power2.in" },
      0,
    );
});
envelope?.addEventListener("toggle", () => {
  if (!changingLetter) refresh();
});
reduced.addEventListener("change", () => {
  letterTimeline?.revert();
  changingLetter = false;
  if (envelope) gsap.set(envelope, { clearProps: "height,overflow" });
  refresh();
});
media.add("(prefers-reduced-motion: no-preference)", () => {
  document.documentElement.dataset.motion = "on";
  const desktop = matchMedia("(min-width:800px)").matches;
  const intro = gsap.timeline({
    paused: true,
    onComplete: () => { document.documentElement.dataset.gates = "open"; },
  });
  intro
    .to(".gate-leaf--left", { rotationY: -108, duration: 2.3, ease: "power3.inOut" }, 0)
    .to(".gate-leaf--right", { rotationY: 108, duration: 2.3, ease: "power3.inOut" }, 0)
    .fromTo(".hero-copy h1>span",
      { yPercent: 32, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.13, duration: 0.85, ease: "power2.out" },
      1.2)
    .to(".gate-frame", { opacity: 0, duration: 0.6 }, 2.05)
    .to(".gate-theatre", { opacity: 0, duration: 0.5 }, 2.4);
  gateButton?.addEventListener("click", () => intro.play(), { once: true });
  const hero = gsap.timeline({
    scrollTrigger: {
      trigger: ".opening",
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
    },
  });
  hero
    .to(".hero-scenery", { scale: 1.28, yPercent: 16, ease: "none" }, 0)
    .to(".hero-copy", { y: 130, scale: 0.86, opacity: 0.12, ease: "none" }, 0);
  gsap.utils.toArray<HTMLElement>(".folio-event").forEach((event, i) => {
    const art = event.querySelector(".folio-art"),
      sheet = event.querySelector(".folio-sheet"),
      copy = event.querySelector(".event-main");
    const dir = i % 2 ? -1 : 1;
    const scene = gsap.timeline({
      scrollTrigger: {
        trigger: event,
        start: "top 92%",
        end: desktop ? "top 12%" : "top 8%",
        scrub: 0.45,
        invalidateOnRefresh: true,
      },
    });
    scene
      .fromTo(
        sheet,
        {
          rotationY: dir * (desktop ? 12 : 5),
          rotationZ: dir * 3,
          y: 100,
          scale: 0.88,
        },
        { rotationY: 0, rotationZ: 0, y: 0, scale: 1, ease: "power2.out" },
        0,
      )
      .fromTo(
        art,
        { clipPath: "inset(16% 18% 16% 18% round 180px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut" },
        0,
      )
      .fromTo(
        copy,
        { x: dir * (desktop ? 65 : 0), y: 35, opacity: 0.45 },
        { x: 0, y: 0, opacity: 1, ease: "power2.out" },
        0.15,
      );
    const image = event.querySelector(".folio-art>img");
    if (image)
      gsap.fromTo(
        image,
        { scale: 1.3, yPercent: -5 },
        {
          scale: 1.05,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: art,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
  });
  gsap.utils
    .toArray<HTMLElement>(
      "[data-reveal],.letter-heading h2,.celebration-intro h2",
    )
    .forEach((el) =>
      gsap.from(el, {
        y: 55,
        opacity: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }),
    );
  gsap.utils
    .toArray<SVGPathElement>(".draw-path")
    .forEach((p, i) =>
      gsap.fromTo(
        p,
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          delay: i * 0.15,
          scrollTrigger: { trigger: p, start: "top 85%" },
        },
      ),
    );
  gsap.fromTo(
    ".city-type",
    { xPercent: -7 },
    {
      xPercent: 7,
      ease: "none",
      scrollTrigger: {
        trigger: ".city-scene",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
  return () => {
    document.documentElement.dataset.motion = "off";
  };
});
document.fonts.ready.then(refresh);
window.addEventListener("load", refresh, { once: true });
document
  .querySelectorAll<HTMLImageElement>('img[loading="lazy"]')
  .forEach((img) => img.addEventListener("load", refresh, { once: true }));
document.addEventListener("visibilitychange", () => {
  if (document.hidden) gsap.ticker.sleep();
  else {
    gsap.ticker.wake();
    ScrollTrigger.update();
  }
});
// A restrained optical response for fine pointers; touch uses the scroll timeline.
media.add(
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  () => {
    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>(".folio-art").forEach((art) => {
      const glint = art.querySelector<HTMLElement>(".art-glint");
      const rx = gsap.quickTo(art, "rotationX", {
        duration: 0.65,
        ease: "power3.out",
      });
      const ry = gsap.quickTo(art, "rotationY", {
        duration: 0.65,
        ease: "power3.out",
      });
      const move = (event: PointerEvent) => {
        const r = art.getBoundingClientRect();
        rx((-(event.clientY - r.top - r.height / 2) / r.height) * 5);
        ry(((event.clientX - r.left - r.width / 2) / r.width) * 7);
        if (glint)
          gsap.to(glint, {
            opacity: 0.75,
            xPercent: ((event.clientX - r.left) / r.width) * 25 - 12.5,
            duration: 0.5,
            overwrite: true,
          });
      };
      const leave = () => {
        rx(0);
        ry(0);
        if (glint)
          gsap.to(glint, { opacity: 0, duration: 0.6, overwrite: true });
      };
      art.addEventListener("pointermove", move);
      art.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        art.removeEventListener("pointermove", move);
        art.removeEventListener("pointerleave", leave);
      });
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  },
);
