import { nearestChapter, scrollFraction } from '../lib/garden-state';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = !reducedMotion.matches;
let motionOverride = false;
const motionButton = document.querySelector<HTMLButtonElement>('#motion-toggle');
const heroArt = document.querySelector<HTMLElement>('#hero-art');
const hero = document.querySelector<HTMLElement>('.garden-hero');
const status = document.querySelector<HTMLElement>('#experience-status');

function updateMotion() {
  document.body.dataset.motion = motionEnabled ? 'on' : 'off';
  motionButton?.setAttribute('aria-pressed', String(motionEnabled));
  if (motionButton) motionButton.textContent = motionEnabled ? 'Motion on' : 'Motion off';
  if (!motionEnabled) {
    document.getAnimations().forEach(animation => animation.cancel());
    heroArt?.style.setProperty('--px', '0px');
    heroArt?.style.setProperty('--hero-y', '0px');
  }
}
updateMotion();
document.querySelector<HTMLElement>('.experience-controls')?.removeAttribute('hidden');
motionButton?.addEventListener('click', () => { motionOverride = true; motionEnabled = !motionEnabled; updateMotion(); });
reducedMotion.addEventListener('change', () => { if (!motionOverride) { motionEnabled = !reducedMotion.matches; updateMotion(); } });

const header = document.querySelector('.garden-header');
const progress = document.querySelector<HTMLElement>('#reading-progress');
const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
const art = Array.from(document.querySelectorAll<HTMLElement>('[data-scene-art]'));
const chapterLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter-link]'));
let activeChapter = -1;
let scrollFrame = 0;
if (chapters.length && art.length === chapters.length) document.body.classList.add('story-ready');
function renderScroll() {
  scrollFrame = 0;
  header?.classList.toggle('scrolled', window.scrollY > 40);
  progress?.style.setProperty('transform', `scaleX(${scrollFraction(window.scrollY, document.documentElement.scrollHeight, window.innerHeight)})`);
  if (heroArt && hero && motionEnabled) {
    const bounds = hero.getBoundingClientRect();
    if (bounds.bottom > 0) heroArt.style.setProperty('--hero-y', `${Math.max(0, -bounds.top) * .14}px`);
  }
  const centres = chapters.map(element => { const rect = element.getBoundingClientRect(); return rect.top + rect.height / 2; });
  const next = nearestChapter(centres, (window.innerHeight + 84) / 2);
  if (next !== activeChapter && next >= 0) {
    activeChapter = next;
    art.forEach((element, index) => element.classList.toggle('active', index === next));
    chapterLinks.forEach((element, index) => {
      if (index === next) element.setAttribute('aria-current', 'step');
      else element.removeAttribute('aria-current');
    });
    const mood = document.querySelector('#scene-mood');
    const poetry = document.querySelector('#scene-poetry');
    const number = document.querySelector('#scene-number');
    if (mood) mood.textContent = chapters[next].dataset.mood || '';
    if (poetry) poetry.textContent = chapters[next].dataset.poetry || '';
    if (number) number.textContent = String(next + 1).padStart(2, '0');
  }
}
function requestScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(renderScroll); }
window.addEventListener('scroll', requestScroll, { passive: true });
window.addEventListener('resize', requestScroll, { passive: true });
window.addEventListener('load', requestScroll, { once: true });
renderScroll();

// A slight camera response on precise pointers; no custom cursor or touch interception.
let pointerFrame = 0;
let pointerX = 0;
hero?.addEventListener('pointermove', event => {
  if (!motionEnabled || event.pointerType !== 'mouse') return;
  pointerX = (event.clientX / window.innerWidth - .5) * -12;
  if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
    pointerFrame = 0;
    if (motionEnabled) heroArt?.style.setProperty('--px', `${pointerX}px`);
  });
});
hero?.addEventListener('pointerleave', () => { heroArt?.style.setProperty('--px', '0px'); });

const menu = document.querySelector<HTMLDetailsElement>('.garden-menu');
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.open) { menu.open = false; menu.querySelector('summary')?.focus(); }
});
document.addEventListener('click', event => {
  if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
});

const plan = document.querySelector<HTMLDialogElement>('#plan-dialog');
const planButton = document.querySelector<HTMLButtonElement>('[data-open-plan]');
if (plan && typeof plan.showModal === 'function' && planButton) {
  planButton.hidden = false;
  document.querySelector<HTMLElement>('.details-fallback')?.setAttribute('hidden', '');
  planButton.addEventListener('click', () => plan.showModal());
  plan.addEventListener('close', () => planButton.focus());
  plan.addEventListener('click', event => {
    if (event.target !== plan) return;
    const rect = plan.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) plan.close();
  });
}

const envelope = document.querySelector<HTMLDetailsElement>('#wedding-envelope');
envelope?.addEventListener('toggle', () => {
  if (envelope.open && motionEnabled) envelope.querySelector('.letter-paper')?.animate([
    { opacity: 0, transform: 'translateY(-12px)' }, { opacity: 1, transform: 'translateY(0)' },
  ], { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)' });
  requestScroll();
});

const diya = document.querySelector('#diya-scene');
const lightButton = document.querySelector<HTMLButtonElement>('#light-diya');
if (diya && lightButton) {
  lightButton.hidden = false;
  lightButton.addEventListener('click', () => {
    const lit = diya.classList.toggle('lit');
    lightButton.setAttribute('aria-pressed', String(lit));
    lightButton.innerHTML = `${lit ? 'Keep the wish, dim the light' : 'Light a diya'} <span aria-hidden="true">✧</span>`;
    const note = document.querySelector('#diya-status');
    if (note) note.textContent = lit ? 'A little light. A beautiful wish. Thank you.' : 'A quiet wish for a beautiful beginning.';
  });
}

// Enhancement-only entrances. The default HTML is never hidden awaiting JavaScript.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (motionEnabled) entry.target.animate([
        { opacity: .45, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 850, easing: 'cubic-bezier(.22,1,.36,1)' });
      observer.unobserve(entry.target);
    });
  }, { threshold: .14 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
}

// A quiet synthetic garden ambience, off until explicitly requested. One context only.
const soundButton = document.querySelector<HTMLButtonElement>('#sound-toggle');
const soundLabel = document.querySelector('#sound-label');
let context: AudioContext | null = null;
let playing = false;
let audioBusy = false;
function displaySound() {
  soundButton?.setAttribute('aria-pressed', String(playing));
  if (soundLabel) soundLabel.textContent = playing ? 'Sound on' : 'Sound off';
}
soundButton?.addEventListener('click', async () => {
  if (audioBusy) return;
  audioBusy = true;
  try {
    if (!context) {
      if (!window.AudioContext) throw new Error('Audio is unavailable');
      context = new AudioContext();
      const master = context.createGain();
      master.gain.value = .035;
      master.connect(context.destination);
      [130.81, 196, 261.63, 329.63].forEach((frequency, index) => {
        const voice = context!.createOscillator();
        const gain = context!.createGain();
        voice.type = 'sine';
        voice.frequency.value = frequency;
        voice.detune.value = index % 2 ? 2 : -2;
        gain.gain.value = .16;
        voice.connect(gain); gain.connect(master); voice.start();
        const breath = context!.createOscillator();
        const depth = context!.createGain();
        breath.frequency.value = .08 + index * .013;
        depth.gain.value = .045;
        breath.connect(depth); depth.connect(gain.gain); breath.start();
      });
    }
    if (playing) { await context.suspend(); playing = false; }
    else {
      await context.resume();
      playing = !document.hidden;
      if (!playing) await context.suspend();
    }
    displaySound();
  } catch {
    playing = false;
    displaySound();
    if (status) status.textContent = 'Sound could not start in this browser. You can enjoy the garden silently.';
  } finally { audioBusy = false; }
});
// Leaving the tab always pauses sound. Resuming requires another intentional click.
document.addEventListener('visibilitychange', () => {
  if (document.hidden && context) {
    playing = false;
    void context.suspend().catch(() => {});
    displaySound();
  }
});
