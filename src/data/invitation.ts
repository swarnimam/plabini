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
      id: 'tilakotsav', number: '01', name: 'Tilak / Lagan Chumai', hindi: 'शुभारंभ',
      day: 'Tuesday', date: '8 December', iso: '2026-12-08T14:00:00+05:30', time: '2:00 pm',
      theme: 'rose', motif: 'flower',
      description: 'Our wedding celebrations open with Tilak / Lagan Chumai, bringing our families together in an atmosphere of affection, tradition and the blessings of our elders.',
      attire: 'Festive wear in vibrant colours', meal: '',
    },
    {
      id: 'sangeet', number: '02', name: 'Sangeet', hindi: 'शाम शानदार',
      day: 'Tuesday', date: '8 December', iso: '2026-12-08T19:30:00+05:30', time: '7:30 pm',
      theme: 'sage', motif: 'music',
      description: 'Join us for an evening of music and dance as family and friends come together to celebrate the wedding. We look forward to sharing this joyful occasion with you.',
      attire: 'Elegant traditional wear or formal suits', meal: '',
    },
    {
      id: 'haldi', number: '03', name: 'Haldi', hindi: 'रंग रसिया',
      day: 'Wednesday', date: '9 December', iso: '2026-12-09T11:30:00+05:30', time: '11:30 am',
      theme: 'saffron', motif: 'sun',
      description: 'We gather for Haldi in the company of family and friends, sharing a morning of tradition, warmth and celebration before the wedding.',
      attire: 'Festive wear in shades of yellow', meal: '',
    },
    {
      id: 'shubh-vivah', number: '04', name: 'Shubh Vivah', hindi: 'फेरे एंड फ़ॉरएवर',
      day: 'Wednesday', date: '9 December', iso: '2026-12-09T19:30:00+05:30', time: '7:30 pm',
      theme: 'wine', motif: 'rings',
      description: 'With the blessings of our families, we invite you to witness our wedding ceremony and share in the joy of our union.',
      attire: 'Elegant ethnic wear for the wedding evening', meal: '',
    },
  ],
};
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
