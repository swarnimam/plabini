export {};
const audio = document.querySelector<HTMLAudioElement>('#wedding-music');
const toggle = document.querySelector<HTMLButtonElement>('#music-toggle');
const label = document.querySelector<HTMLElement>('#music-label');
const status = document.querySelector<HTMLElement>('#music-status');
if (audio && toggle && label) {
  toggle.hidden = false;
  audio.volume = 0.35;
  let enabled = true;
  const sync = () => {
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Turn music off' : 'Turn music on');
    label.textContent = enabled ? 'Music on' : 'Music off';
  };
  const play = async () => {
    if (!enabled || document.hidden || !audio.paused) return;
    try { await audio.play(); if (!enabled) audio.pause(); if (status) status.textContent = ''; }
    catch { if (status) status.textContent = 'Music is enabled and will start when you interact with the invitation.'; }
  };
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    sync();
    if (enabled) void play(); else { audio.pause(); if (status) status.textContent = ''; }
  });
  const unlock = (event: Event) => {
    if (event.target instanceof Node && toggle.contains(event.target)) return;
    void play();
  };
  document.addEventListener('pointerdown', unlock);
  document.addEventListener('keydown', unlock);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio.pause(); else void play();
  });
  sync();
  void play();
}
