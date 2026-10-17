/** Deploy as an Apps Script web app running as the sheet owner. */
const RSVP_SHEET_ID = '1C-BdFmJqzc8lefels75S9QJmoVCCs5q-n-3MWD0mmIs';
const RSVP_TAB = 'Wedding RSVPs';
const RSVP_HEADERS = ['Received at', 'Name', 'Attendance', 'Guests', 'Celebrations', 'Message', 'Submission ID'];
const RSVP_EVENTS = ['Tilak / Lagan Chumai', 'Sangeet', 'Haldi', 'Shubh Vivah'];

function doPost(e) {
  let lock;
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > 10000) throw new Error('Please check your response and try again.');
    const data = JSON.parse(raw);
    const name = String(data.name || '').trim();
    const note = String(data.note || '').trim();
    const id = String(data.id || '');
    if (!/^[a-f0-9-]{36}$/i.test(id) || !name || name.length > 100 || note.length > 1000) throw new Error('Please check your name and message.');
    if (!['accept', 'decline', 'unsure'].includes(data.attendance)) throw new Error('Please choose your attendance.');
    if (!Array.isArray(data.events) || data.events.length > 4 || data.events.some(event => !RSVP_EVENTS.includes(event))) throw new Error('Please check your celebrations.');
    const guests = data.attendance === 'decline' ? 0 : Number(data.guests);
    if (!Number.isInteger(guests) || guests < 0 || guests > 100 || (data.attendance !== 'decline' && guests < 1)) throw new Error('Please check your guest count.');
    if (data.website) throw new Error('Unable to save this response.');
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) throw new Error('We’re receiving several replies. Please try again in a moment.');
    const book = SpreadsheetApp.openById(RSVP_SHEET_ID);
    let sheet = book.getSheetByName(RSVP_TAB);
    if (!sheet) sheet = book.insertSheet(RSVP_TAB);
    if (!sheet.getLastRow()) {
      sheet.appendRow(RSVP_HEADERS);
      sheet.setFrozenRows(1);
    }
    const headers = sheet.getRange(1, 1, 1, RSVP_HEADERS.length).getValues()[0];
    if (JSON.stringify(headers) !== JSON.stringify(RSVP_HEADERS)) throw new Error('RSVP is temporarily unavailable. Please contact the family.');
    if (sheet.getLastRow() > 1) {
      const ids = sheet.getRange(2, 7, sheet.getLastRow() - 1, 1).getValues();
      if (ids.some(row => row[0] === id)) return rsvpJson({ok: true, id: id});
    }
    const status = {accept: 'Attending', decline: 'Unable to attend', unsure: 'Yet to confirm'}[data.attendance];
    const events = data.attendance === 'decline' ? '' : [...new Set(data.events)].join(', ');
    sheet.appendRow([new Date(), rsvpCell(name), status, guests, rsvpCell(events), rsvpCell(note), id]);
    SpreadsheetApp.flush();
    return rsvpJson({ok: true, id: id});
  } catch (error) {
    // Do not reveal spreadsheet internals or account information to public visitors.
    return rsvpJson({ok: false, error: 'We couldn’t confirm your RSVP. Please check your details and try again. If this continues, contact the family.'});
  } finally {
    if (lock) lock.releaseLock();
  }
}
function rsvpCell(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}
function rsvpJson(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
