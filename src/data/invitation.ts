/** Verified invitation content. See CONTENT_NOTES.md for sources and unresolved details. */
export const invitation = {
  names: { groom: 'Swarnimam', bride: 'Plabini' },
  hashtag: '#perfectlyPS',
  groomParents: 'Mrs. Sunita Devi & Prof. Vinod Kumar',
  brideParents: 'Mrs. Smruti Rekha Nayak & Dr. Braja Bandhu Nayak',
  date: '9 December 2026',
  celebrationDates: '8–9 December 2026',
  weddingISO: '2026-12-09T19:30:00+05:30',
  venue: {
    name: 'Greater Rajwada Resort',
    address: 'Manpur, near Mehta Petrol Pump, Gaya, Bihar',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Greater%20Rajwada%20Resort%20Manpur%20Gaya%20Bihar',
  },
  // Set only after the couple confirms the receiving email. Never pretend to submit locally.
  rsvpEmail: '',
  events: [
    {
      id: 'tilakotsav', number: '01', name: 'Tilakotsav', hindi: 'तिलक अभिषेक',
      day: 'Tuesday', date: '8 December', iso: '2026-12-08T14:00:00+05:30', time: '2:00 pm',
      theme: 'rose', motif: 'flower',
      description: 'A beautiful beginning, with blessings, cherished traditions, and the coming together of our families.',
      attire: 'Festive attire in vibrant colours', meal: '',
    },
    {
      id: 'sangeet', number: '02', name: 'Sangeet', hindi: 'सुरों की बारात',
      day: 'Tuesday', date: '8 December', iso: '2026-12-08T19:30:00+05:30', time: '7:30 pm',
      theme: 'sage', motif: 'music',
      description: 'An evening of music, dancing, and laughter. Bring your favourite moves and a heart ready to celebrate.',
      attire: 'Traditional elegance or formal suits', meal: 'Followed by dinner',
    },
    {
      id: 'haldi', number: '03', name: 'Haldi', hindi: 'रंग रसिया',
      day: 'Wednesday', date: '9 December', iso: '2026-12-09T11:30:00+05:30', time: '11:30 am',
      theme: 'saffron', motif: 'sun',
      description: 'A little turmeric, a lot of laughter, and the warmth of everyone we love. Join us for a joyful morning.',
      attire: 'Festive attire in shades of yellow', meal: 'Followed by lunch',
    },
    {
      id: 'shubh-vivah', number: '04', name: 'Shubh Vivah', hindi: 'फेरे एंड फॉरएवर',
      day: 'Wednesday', date: '9 December', iso: '2026-12-09T19:30:00+05:30', time: '7:30 pm',
      theme: 'wine', motif: 'rings',
      description: 'With sacred vows and your blessings, we begin our forever. Your presence will make this evening even more special.',
      attire: 'Elegant ethnic wear', meal: 'Followed by dinner',
    },
  ],
};
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
