# Google Sheets RSVP

The site submits URL-encoded form fields to the couple’s deployed Apps Script endpoint, configured in `src/components/RsvpForm.astro`. `PUBLIC_RSVP_ENDPOINT` can override it for another deployment.

Fields: `name`, `joining`, `guests`, `tilak`, `sangeet`, `haldi`, `vivah`, `message`. Compatibility fields `attend`, `people` and `attendance` support the currently deployed template. The message includes the complete RSVP summary so all choices remain available even when a deployed script uses fewer columns.

Confirmation requires a readable JSON response containing `status: "success"`; opaque responses never count as success. Requests are not retried automatically because the couple’s append-only script does not deduplicate. An uncertain response asks the guest to check with the family before resubmitting. One in-flight submission is allowed at a time.

The source `Code.gs` documents the couple’s supplied eight-column script. Its current deployment saved fewer columns during testing; update the existing web-app deployment to that code to use all eight dedicated columns. No account connection to ChatGPT is necessary.

Browser verification used clearly labelled test entries in the destination sheet. These are not guest RSVPs.
