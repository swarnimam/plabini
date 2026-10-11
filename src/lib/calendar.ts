import { invitation } from '../data/invitation';
type Ceremony = (typeof invitation.events)[number];
const escape = (text: string) => text.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
const stamp = (date: string) => new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
// RFC 5545 folds by UTF-8 octets, not JS character count.
function fold(line: string): string {
  const lines: string[] = []; let part = ''; let bytes = 0;
  for (const char of line) {
    const size = new TextEncoder().encode(char).length;
    if (bytes + size > 75) { lines.push(part); part = ' '; bytes = 1; }
    part += char; bytes += size;
  }
  lines.push(part); return lines.join('\r\n');
}
export function calendar(events: Ceremony[]): string {
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//PerfectlyPS//Wedding Celebrations//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    ...events.flatMap(event => [
      'BEGIN:VEVENT', `UID:perfectlyps-${event.id}-202612@wedding`, 'DTSTAMP:20261011T000000Z',
      `DTSTART:${stamp(event.iso)}`,
      // No invented ceremony end times: DTSTART-only timed VEVENT is valid RFC 5545.
      `SUMMARY:${escape(`Swarnimam & Plabini — ${event.name}`)}`,
      `LOCATION:${escape(`${invitation.venue.name}, ${invitation.venue.address}`)}`,
      `DESCRIPTION:${escape(`${event.hindi}\n${event.description}\n${event.attire || ''}\n${event.meal || ''}\nAll invitation times are IST. Ceremony end time is not specified.`)}`,
      'END:VEVENT',
    ]), 'END:VCALENDAR', '',
  ].map(fold).join('\r\n');
}
