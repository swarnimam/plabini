import { prepareResponse } from "../lib/response";
const form = document.querySelector<HTMLFormElement>("#response-form");
const result = document.querySelector<HTMLElement>("#response-result");
const message = document.querySelector<HTMLTextAreaElement>("#response-text");
const attendance = document.querySelector<HTMLSelectElement>("#attendance");
const guests = document.querySelector<HTMLInputElement>("#guests");
const events = document.querySelector<HTMLFieldSetElement>("#event-options");
if (form) form.hidden = false;
attendance?.addEventListener("change", () => {
  const declined = attendance.value === "decline";
  if (guests) {
    guests.disabled = declined;
    guests.required = !declined;
  }
  if (events) events.disabled = declined;
});
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity() || !result || !message) return;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const nameInput = form.querySelector<HTMLInputElement>("#guest-name");
  if (!name) {
    nameInput?.setCustomValidity("Please enter your name.");
    nameInput?.reportValidity();
    return;
  }
  message.value = prepareResponse(
    name,
    String(data.get("attendance")),
    String(data.get("guests") || ""),
    data.getAll("events").map(String),
    String(data.get("message") || ""),
  );
  form.hidden = true;
  result.hidden = false;
  result.focus();
});
form
  ?.querySelector("#guest-name")
  ?.addEventListener("input", (event) =>
    (event.target as HTMLInputElement).setCustomValidity(""),
  );
document.querySelector("#edit-response")?.addEventListener("click", () => {
  if (!form || !result) return;
  form.hidden = false;
  result.hidden = true;
  document.querySelector<HTMLElement>("#guest-name")?.focus();
  const status = document.querySelector("#copy-status");
  if (status) status.textContent = "";
});
document
  .querySelector("#copy-response")
  ?.addEventListener("click", async () => {
    if (!message) return;
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText(message.value);
      if (status)
        status.textContent =
          "Copied. Paste it into your usual conversation with the family. Nothing has been sent automatically.";
    } catch {
      message.focus();
      message.select();
      if (status)
        status.textContent =
          "Select and copy the message above, then send it to the family.";
    }
  });
