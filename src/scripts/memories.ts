const trigger = document.querySelector<HTMLButtonElement>("#memories-open");
const overlay = document.querySelector<HTMLElement>("#memories-overlay");
const panel = overlay?.querySelector<HTMLElement>(".memories-panel");
const closeButton = document.querySelector<HTMLButtonElement>("#memories-close");
const viewer = document.querySelector<HTMLElement>("#memories-viewer");
const counter = document.querySelector<HTMLElement>("#memories-counter");
const thumbnails = Array.from(document.querySelectorAll<HTMLButtonElement>(".memories-thumb"));
const slides = Array.from(document.querySelectorAll<HTMLElement>(".memories-slide"));
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

if (trigger && overlay && panel && closeButton) {
  let active = 0;
  let lastFocused: HTMLElement | null = null;
  let previousOverflow = "";
  let scheduled = false;
  const inertStates = new Map<HTMLElement, boolean>();

  const setActive = (index: number) => {
    if (!slides.length) return;
    active = Math.max(0, Math.min(index, slides.length - 1));
    thumbnails.forEach((button, i) => {
      if (i === active) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
    if (counter) {
      counter.textContent = String(active + 1).padStart(2, "0") + " / " +
        String(slides.length).padStart(2, "0");
    }
  };

  const goTo = (index: number) => {
    if (!viewer || !slides.length) return;
    const target = Math.max(0, Math.min(index, slides.length - 1));
    setActive(target);
    viewer.scrollTo({
      top: slides[target].offsetTop - slides[0].offsetTop,
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
  };

  const open = () => {
    if (!overlay.hidden) return;
    lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : trigger;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // The invitation stays visible, but is inaccessible until the dialog closes.
    Array.from(document.body.children).forEach((element) => {
      if (element instanceof HTMLElement && element !== overlay) {
        inertStates.set(element, element.inert);
        element.inert = true;
      }
    });
    overlay.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    if (viewer) viewer.scrollTop = 0;
    setActive(0);
    closeButton.focus();
  };

  const close = () => {
    if (overlay.hidden) return;
    overlay.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = previousOverflow;
    inertStates.forEach((wasInert, element) => { element.inert = wasInert; });
    inertStates.clear();
    (lastFocused?.isConnected ? lastFocused : trigger).focus();
  };

  trigger.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  thumbnails.forEach((button, index) => button.addEventListener("click", () => goTo(index)));
  viewer?.addEventListener("scroll", () => {
    if (scheduled || !slides.length) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      const top = viewer.scrollTop;
      const firstTop = slides[0].offsetTop;
      let nearest = 0;
      let distance = Infinity;
      slides.forEach((slide, index) => {
        const delta = Math.abs(slide.offsetTop - firstTop - top);
        if (delta < distance) { distance = delta; nearest = index; }
      });
      setActive(nearest);
    });
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (overlay.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (!slides.length) return;
      event.preventDefault();
      goTo(active + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "Tab") {
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}
