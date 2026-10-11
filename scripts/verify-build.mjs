import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const html = readFileSync('dist/index.html', 'utf8');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'One primary heading');
for (const text of ['Tilakotsav', 'Sangeet', 'Haldi', 'Shubh Vivah', 'Greater Rajwada', '2026-12-09T19:30:00+05:30']) assert.ok(html.includes(text), `Missing ${text}`);
for (const stale of ['Grand Taj Palace', '2019', 'Udaipur', 'A ♥ M', '18.12.2026', '/src/styles/', 'Your Presence Is A Blessing', 'localStorage']) assert.ok(!html.includes(stale), `Stale content ${stale}`);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Unique HTML ids');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Broken anchor ${match[1]}`);
// Astro's base is inferred from a known asset so checks work in CI without extra env.
const imagePath = html.match(/src="([^"]*images\/invitation-garden.webp)"/)[1];
const base = imagePath.slice(0, -'images/invitation-garden.webp'.length);
for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
  const url = match[1];
  assert.ok(url.startsWith(base), `Asset outside base: ${url}`);
  const file = 'dist/' + url.slice(base.length);
  assert.ok(existsSync(file), `Missing generated asset ${file}`);
}
for (const dress of ['Festive attire in vibrant colours', 'Traditional elegance or formal suits', 'Festive attire in shades of yellow', 'Elegant ethnic wear']) assert.ok(html.includes(dress), `Missing invitation dress code: ${dress}`);
const starts = { tilakotsav: '20261208T083000Z', sangeet: '20261208T140000Z', haldi: '20261209T060000Z', 'shubh-vivah': '20261209T140000Z' };
const combined = readFileSync('dist/celebrations.ics', 'utf8');
assert.equal((combined.match(/BEGIN:VEVENT/g) || []).length, 4);
for (const [event, start] of Object.entries(starts)) {
  const raw = readFileSync(`dist/calendar/${event}.ics`, 'utf8');
  assert.ok(raw.includes(`DTSTART:${start}\r\n`), `Wrong time for ${event}`);
  assert.equal((raw.match(/BEGIN:VEVENT/g) || []).length, 1);
  assert.ok(!raw.includes('DTEND'), 'No invented end time');
  assert.ok(combined.includes(`DTSTART:${start}`));
  for (const line of raw.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75, `ICS line too long: ${event}`);
  assert.ok(!raw.replace(/\r\n/g, '').includes('\n'), 'ICS uses CRLF');
}
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(schema.location.address.addressLocality, 'Gaya');
assert.equal(schema.startDate, '2026-12-08T14:00:00+05:30');
console.log(`Verified: assets under ${base}, internal links, metadata, four IST calendar events, UTF-8 calendar folding, and placeholder exclusion.`);
