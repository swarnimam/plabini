# Google Sheets RSVP endpoint

This integration is prepared but **not activated** until a deployed endpoint has been authorized and tested against the couple’s Google Sheet. The site keeps its message composer when `PUBLIC_RSVP_ENDPOINT` is unset.

The public form sends only name, attendance, guest count, chosen celebrations, an optional message and a random submission ID. The sheet is not exposed to guests. The endpoint writes to a dedicated `Wedding RSVPs` tab, preserves other tabs, rejects unexpected headers, validates submissions, neutralizes formula-like text and uses a lock plus submission ID to avoid duplicate rows on retries. It exposes no read endpoint.

## Activation requirements

Anonymous editing of the supplied spreadsheet was verified. However, opening Extensions → Apps Script requires Google sign-in. Link-based editor permission does not provide an authenticated API or a deployable web-app endpoint. The endpoint must be deployed by an authorized Google user; connecting that account to ChatGPT is not required.

1. Inspect the destination spreadsheet and confirm edit access. Do not replace any existing data.
2. Create an Apps Script project for the sheet and add `Code.gs` from this directory.
3. Review and authorize the script’s spreadsheet access as the sheet owner. Deploy it as a web app, running as the owner and accepting guest submissions. Keep the spreadsheet itself private; do not enable public sheet editing.
4. Set `PUBLIC_RSVP_ENDPOINT` to the deployment’s `https://script.google.com/macros/s/.../exec` URL, then rebuild. It is a public write endpoint, not a credential. Never place Google access tokens or service-account keys in frontend code.
5. On GitHub Pages, set the repository Actions variable `PUBLIC_RSVP_ENDPOINT`. For another static host, set the same build environment variable.
6. Submit one clearly labelled test RSVP from the actual hosted site. Confirm the row in Google Sheets, then retry the same submission ID to verify no duplicate. Verify a rejection/network failure does not show success. Remove the test row only with authorization.

The browser uses a simple text/plain POST and reads the JSON response after Google's redirect. It displays success only for `ok: true` with the matching submission ID. CORS and account deployment permissions must be tested on the real endpoint; do not use `no-cors` or an iframe load event as evidence of a saved response. If the browser cannot read Google's response, use an authenticated server-side relay or Google-hosted form instead of claiming success.

Apps Script quotas and public-endpoint spam are operational limits. The honeypot is a light deterrent, not a replacement for stronger abuse controls if the URL receives significant unsolicited traffic.
