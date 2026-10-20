/** The album is built from public/memories at build time; this script only controls viewing. */
const trigger = document.querySelector<HTMLButtonElement>("#memories-trigger");
const dialog = document.querySelector<HTMLElement>("#memories-dialog");
const closeButton = document.querySelector<HTMLButtonElement>("#memories-close");
const stage = document.querySelector<HTMLElement>("#memories-stage");
const counter = document.querySelector<HTMLElement>("#memories-counter");
const slides = Array.from(document.querySelectorAll<HTMLElement>(".memory-slide"));
const thumbs = Array.from(document.querySelectorAll<HTMLButtonElement>(".memory-thumb"));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
let lastFocused: HTMLElement | null = null;
let previousInert = new Map<HTMLElement, boolean>();
let activeIndex = -1;
let scrollFrame = 0;

function selectPhoto(index: number) {
  if (!counter || index < 0 || index >= slides.length || index === activeIndex) return;
  activeIndex = index;
  counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("is-active", i === index);
    thumb.setAttribute("aria-pressed", String(i === index));
  });
  // Keep the active thumbnail visible in the small grid without moving the page.
  const selected = thumbs[index];
  const rail = selected?.parentElement;
  if (selected && rail) {
    const left = selected.offsetLeft;
    const right = left + selected.offsetWidth;
    if (left < rail.scrollLeft) rail.scrollLeft = left;
    else if (right > rail.scrollLeft + rail.clientWidth) rail.scrollLeft = right - rail.clientWidth;
    const top = selected.offsetTop;
    const bottom = top + selected.offsetHeight;
    if (top < rail.scrollTop) rail.scrollTop = top;
    else if (bottom > rail.scrollTop + rail.clientHeight) rail.scrollTop = bottom - rail.clientHeight;
  }
}

function goToPhoto(index: number) {
  if (!stage || !slides.length) return;
  const next = Math.max(0, Math.min(index, slides.length - 1));
  selectPhoto(next);
  stage.scrollTo({ top: slides[next].offsetTop, behavior: reduceMotion.matches ? "auto" : "smooth" });
}

function openMemories() {
  if (!dialog || !closeButton || !stage || !dialog.hidden) return;
  lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  dialog.hidden = false;
  trigger?.setAttribute("aria-expanded", "true");
  previousInert = new Map();
  for (const child of Array.from(document.body.children)) {
    if (child instanceof HTMLElement && child !== dialog && child.tagName !== "SCRIPT") {
      previousInert.set(child, child.inert);
      child.inert = true;
    }
  }
  document.body.classList.add("memories-is-open");
  stage.scrollTop = 0;
  activeIndex = -1;
  selectPhoto(0);
  closeButton.focus({ preventScroll: true });
}

function closeMemories() {
  if (!dialog || dialog.hidden) return;
  dialog.hidden = true;
  trigger?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("memories-is-open");
  previousInert.forEach((value, element) => { element.inert = value; });
  previousInert.clear();
  lastFocused?.focus({ preventScroll: true });
}

trigger?.addEventListener("click", openMemories);
closeButton?.addEventListener("click", closeMemories);
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) closeMemories();
});
thumbs.forEach((thumb, index) => thumb.addEventListener("click", () => goToPhoto(index)));
stage?.addEventListener("scroll", () => {
  if (scrollFrame) cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    if (stage.clientHeight) selectPhoto(Math.max(0, Math.min(slides.length - 1, Math.round(stage.scrollTop / stage.clientHeight))));
  });
}, { passive: true });

dialog?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeMemories();
    return;
  }
  if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === "ArrowRight") {
    event.preventDefault();
    goToPhoto(activeIndex + 1);
  } else if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    goToPhoto(activeIndex - 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    goToPhoto(0);
  } else if (event.key === "End") {
    event.preventDefault();
    goToPhoto(slides.length - 1);
  } else if (event.key === "Tab") {
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )).filter((element) => element.getClientRects().length > 0);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});