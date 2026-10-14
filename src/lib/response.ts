export function prepareResponse(name: string, attendance: string, guests: string, events: string[], note: string) {
  const status = attendance === 'accept' ? 'Attending' : attendance === 'decline' ? 'Unable to attend' : 'Yet to confirm';
  const intro = attendance === 'decline' ? 'Sending you both love and warm wishes for your celebrations.' : attendance === 'unsure' ? 'We’re looking forward to your celebrations and will confirm our plans soon.' : 'We’re delighted to celebrate with you.';
  const party = attendance === 'decline' ? '' : `\nNumber of guests, including me: ${guests}\nCelebrations attending: ${events.length ? events.join(', ') : 'Yet to confirm'}`;
  return `Hi Swarnimam & Plabini!\n${intro}\n\nName: ${name.trim()}\nAttendance: ${status}${party}${note.trim() ? `\n\nA little note for you: ${note.trim()}` : ''}`;
}
