export {};
const audio = document.querySelector<HTMLAudioElement>('#wedding-music');
const toggle = document.querySelector<HTMLButtonElement>('#music-toggle');
const label = document.querySelector<HTMLElement>('#music-label');
const status = document.querySelector<HTMLElement>('#music-status');
const gate = document.querySelector<HTMLButtonElement>('#gate-enter');
if (audio && toggle && label) {
  audio.volume = 0.35;
  let enabled = true;
  let entered = false;
  let entranceFinished = !gate;
  const sync = () => {
    toggle.hidden = !entered || !entranceFinished;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Turn music off' : 'Turn music on');
    label.textContent = enabled ? 'Music on' : 'Music off';
  };
  const play = () => {
    if (!entered || !enabled || document.hidden || !audio.paused) return;
    void audio.play().then(() => {
      if (!enabled || document.hidden) audio.pause();
      if (status) status.textContent = '';
    }).catch(() => {
      if (status) status.textContent = 'Tap the music button to start the soundtrack.';
    });
  };
  const enter = () => {
    entered = true;
    sync();
    play(); // Invoke play synchronously from the guest's opening gesture.
  };
  if (gate) {
    gate.addEventListener('click', enter, { once: true });
    const unavailable = () => { entered = true; enabled = false; entranceFinished = true; sync(); };
    document.addEventListener('gate:opened', () => { entranceFinished = true; sync(); }, { once: true });
    document.addEventListener('gate:unavailable', unavailable, { once: true });
    if (document.documentElement.dataset.gates === 'open' && gate.hidden) unavailable();
  } else enter();
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    sync();
    if (enabled) play();
    else { audio.pause(); if (status) status.textContent = ''; }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio.pause();
    // Do not resume automatically when the tab becomes visible again.
  });
  sync();
}
