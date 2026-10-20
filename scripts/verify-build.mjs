import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8").replaceAll("&amp;", "&")
  .replace(/\s+/g, " ");
const expectedEvents = {
  tilakotsav: "20261208T083000Z",
  sangeet: "20261208T140000Z",
  haldi: "20261209T060000Z",
  "shubh-vivah": "20261209T140000Z",
};

// Independent content checks protect approved details during layout refactors.
for (const text of [
  "Swarnimam",
  "Plabini",
  "Greater Rajwada Resort",
  "Tilak / Lagan Chumawan",
  "Sangeet",
  "Haldi",
  "Shubh Vivah",
  "शुभारंभ",
  "शाम शानदार",
  "रंग रसिया",
  "फेरे एंड फ़ॉरएवर",
  "Festive wear in vibrant colours",
  "Elegant traditional, Indo-Western, or formal suits.",
  "Festive wear in shades of yellow",
  "Elegant ethnic attire.",
  "their beloved children",
  "He tolerates Taylor, and she vibes to Diljit.",
])
  assert.ok(html.includes(text), `Missing approved content: ${text}`);
assert.equal((html.match(/THE KUMAR FAMILY & THE NAYAK FAMILY/g) || []).length, 1);
assert.equal((html.match(/<h1\b/g) || []).length, 1, "One primary heading");
assert.equal((html.match(/data-chapter="[0-3]"/g) || []).length, 4);

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "Unique HTML IDs");
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(id), `Broken anchor: ${id}`);
}

// The gallery must discover every image from its one folder, without a hand-edited manifest.
const gallerySource = readFileSync("src/components/Memories.astro", "utf8");
assert.ok(gallerySource.includes("import.meta.glob"), "Memories must auto-discover photos");
assert.ok(html.includes('id="memories-open"'), "Memories navigation control");
assert.ok(html.includes('id="memories-overlay"'), "Memories overlay");
assert.ok(html.includes('aria-modal="true"'), "Accessible gallery dialog");
assert.ok(html.includes('id="memories-viewer"'), "Scrollable gallery viewer");
assert.ok(html.includes('id="memories-counter"'), "Gallery position indicator");
const memoryFolder = "src/assets/memories";
const photoCount = existsSync(memoryFolder)
  ? readdirSync(memoryFolder).filter((name) => /\.(jpe?g|png|webp|avif)$/i.test(name)).length
  : 0;
assert.equal((html.match(/class="memories-slide"/g) || []).length, photoCount,
  "Every folder photo appears in the vertical viewer");
assert.equal((html.match(/class="memories-thumb"/g) || []).length, photoCount,
  "Every folder photo has a grid thumbnail");

// Keep the ceremonial first impression clean during future hero refactors.
const opening = html.match(/<section class="opening"[\s\S]*?<\/section>/)?.[0];
assert.ok(opening, "Opening hero present");
assert.ok(!opening.includes("\\n"), "Hero must not render literal escaped newlines");
const gateControl = opening.match(/<button(?=[^>]*\bid="gate-enter")[^>]*>([\s\S]*?)<\/button>/);
assert.ok(gateControl, "Accessible wedding entrance control present");
assert.equal(gateControl[1].trim(), "", "Do not duplicate the PS seal already painted on the gate");

// Infer the build base so the same checks work at / and /plabini in CI.
const hero = html.match(/src="([^"]*images\/hero.webp)"/);
assert.ok(hero, "Hero resource present");
const base = hero[1].slice(0, -"images/hero.webp".length);
for (const panel of ["moonlit-gate-left.webp", "moonlit-gate-right.webp", "moonlit-gate-frame.webp"]) {
  assert.ok(html.includes(`src="${base}images/${panel}"`), `Required gate artwork: ${panel}`);
}
const resources = [...html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)].map(
  (m) => m[1],
);
for (const [, srcset] of html.matchAll(/srcset="([^"]+)"/g)) {
  resources.push(
    ...srcset.split(",").map((source) => source.trim().split(/\s+/)[0]),
  );
}
for (const resource of resources) {
  assert.ok(
    resource.startsWith(base),
    `Resource outside configured base: ${resource}`,
  );
  assert.ok(
    existsSync(`dist/${resource.slice(base.length)}`),
    `Missing resource: ${resource}`,
  );
}
const social = html.match(/property="og:image" content="([^"]+)"/);
assert.ok(social, "Social preview metadata");
const socialPath = new URL(social[1], "https://example.invalid").pathname;
assert.ok(socialPath.startsWith(base));
assert.ok(existsSync(`dist/${socialPath.slice(base.length)}`));

const combined = readFileSync("dist/celebrations.ics", "utf8");
assert.equal((combined.match(/BEGIN:VEVENT/g) || []).length, 4);
for (const [event, start] of Object.entries(expectedEvents)) {
  const raw = readFileSync(`dist/calendar/${event}.ics`, "utf8");
  assert.ok(raw.includes(`DTSTART:${start}\r\n`), `Wrong start time: ${event}`);
  assert.equal((raw.match(/BEGIN:VEVENT/g) || []).length, 1);
  assert.ok(combined.includes(`DTSTART:${start}`));
  assert.ok(!raw.includes("DTEND"), "Do not invent ceremony end times");
  for (const line of raw.split("\r\n")) {
    assert.ok(
      Buffer.byteLength(line, "utf8") <= 75,
      `Calendar line exceeds 75 octets: ${event}`,
    );
  }
  assert.ok(
    !raw.replace(/\r\n/g, "").includes("\n"),
    "Calendar line endings must be CRLF",
  );
}
const schema = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
);
assert.equal(schema.location.address.addressLocality, "Gaya");
assert.equal(schema.startDate, "2026-12-08T14:00:00+05:30");
assert.ok(html.includes('data-countdown="2026-12-08T14:00:00+05:30"'));
console.log(
  `Verified ${base}: approved content, anchors, responsive assets, metadata and four calendars.`,
);
