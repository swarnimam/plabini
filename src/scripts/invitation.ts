// Progressive enhancement: the invitation, schedule, navigation and calendar links work without JS.
const timer = document.querySelector<HTMLElement>('[data-wedding-date]');
if (timer) {
  const target = Date.parse(timer.dataset.weddingDate || '');
  if (Number.isFinite(target)) {
    const update = () => {
      const seconds = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const values = { days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60 };
      Object.entries(values).forEach(([unit, value]) => {
        const field = timer.querySelector(`[data-unit="${unit}"]`);
        if (field) field.textContent = String(value).padStart(2, '0');
      });
      if (seconds === 0) {
        document.querySelector('#countdown-title')!.textContent = 'Forever has begun.';
      }
      return seconds;
    };
    if (update() > 0) {
      const interval = window.setInterval(() => { if (update() === 0) clearInterval(interval); }, 1000);
    }
  }
}
const menu = document.querySelector<HTMLDetailsElement>('.mobile-nav');
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu?.open) { menu.open = false; menu.querySelector('summary')?.focus(); } });

const form = document.querySelector<HTMLFormElement>('#response-form');
const result = document.querySelector<HTMLElement>('#response-result');
const message = document.querySelector<HTMLTextAreaElement>('#response-text');
const attendance = document.querySelector<HTMLSelectElement>('#attendance');
const guests = document.querySelector<HTMLInputElement>('#guests');
attendance?.addEventListener('change', () => {
  if (guests) { guests.disabled = attendance.value === 'decline'; guests.required = !guests.disabled; }
});
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity() || !result || !message) return;
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const nameInput = form.querySelector<HTMLInputElement>('#guest-name');
  if (!name) { nameInput?.setCustomValidity('Please enter your name.'); nameInput?.reportValidity(); return; }
  const accepting = data.get('attendance') === 'accept';
  const note = String(data.get('message') || '').trim();
  message.value = `Dear Swarnimam & Plabini,\n\n${accepting ? `I would love to join your wedding celebrations on 8–9 December 2026. Our party will include ${data.get('guests')} guest(s), including me.` : 'I’m sorry I won’t be able to attend your wedding celebrations. Sending you both love and warm wishes.'}${note ? `\n\n${note}` : ''}\n\nWith love,\n${name}`;
  form.hidden = true; result.hidden = false; result.focus();
});
form?.querySelector('#guest-name')?.addEventListener('input', event => (event.target as HTMLInputElement).setCustomValidity(''));
document.querySelector('#edit-response')?.addEventListener('click', () => {
  if (!form || !result) return;
  form.hidden = false; result.hidden = true;
  document.querySelector<HTMLElement>('#guest-name')?.focus();
  const status = document.querySelector('#copy-status'); if (status) status.textContent = '';
});
document.querySelector('#copy-response')?.addEventListener('click', async () => {
  if (!message) return;
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(message.value);
    if (status) status.textContent = 'Copied. Now paste and send it to the family in your chat.';
  } catch {
    message.focus(); message.select();
    if (status) status.textContent = 'Select and copy the message above, then send it to the family.';
  }
});

// Animate visible content without ever making content dependent on an observer or script.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.animate([{ transform: 'translateY(20px)', opacity: 0.6 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 700, easing: 'cubic-bezier(.22,1,.36,1)' });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
