/** Approved wedding details and artwork. See docs/CONTENT.md. */
export const invitation = {
  names: { groom: "Swarnimam", bride: "Plabini" },
  hashtag: "#perfectlyPS",
  celebrationDates: "8–9 December 2026",
  venue: {
    name: "Greater Rajwada Resort",
    address: "Manpur, near Mehta Petrol Pump, Gaya, Bihar",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Greater%20Rajwada%20Resort%20Manpur%20Gaya%20Bihar",
  },
  events: [
    {
      id: "tilakotsav",
      image: "tilak",
      imageAlt:
        "A prepared Tilak setting with brass thalis, gifts and folded textiles; no people",
      name: "Tilak / Lagan Chumai",
      hindi: "शुभारंभ",
      day: "Tuesday",
      date: "8 December",
      iso: "2026-12-08T14:00:00+05:30",
      time: "2:00 pm",
      description:
        "Our wedding celebration starts off with Tilak / Lagan Chumai, bringing our families together in an atmosphere of affection, tradition and the blessings of our elders.",
      attire: "Festive wear in vibrant colours",
    },
    {
      id: "sangeet",
      image: "sangeet",
      imageAlt: "An imagined Sangeet with families dancing together",
      name: "Sangeet",
      hindi: "शाम शानदार",
      day: "Tuesday",
      date: "8 December",
      iso: "2026-12-08T19:30:00+05:30",
      time: "7:30 pm",
      description:
        "An evening of music, dance, and laughter awaits as we celebrate the joy of two hearts coming together.\n\nJoin us for a sparkling Sangeet night filled with rhythm, love, and unforgettable memories.",
      attire: "Elegant traditional, Indo-Western, or formal suits.",
    },
    {
      id: "haldi",
      image: "haldi",
      imageAlt:
        "An empty Haldi setting with marigold garlands, brass bowls and yellow decor",
      name: "Haldi",
      hindi: "रंग रसिया",
      day: "Wednesday",
      date: "9 December",
      iso: "2026-12-09T11:30:00+05:30",
      time: "11:30 am",
      description:
        "The morning begins with the age-old traditions of Haldi, a little turmeric, a lot of laughter, and the love of everyone we hold dear.\n\nPainted in yellow. Poured with love.",
      attire: "Festive wear in shades of yellow",
    },
    {
      id: "shubh-vivah",
      image: "vivah",
      imageAlt: "An imagined red-and-gold mandap with agni and pheras",
      name: "Shubh Vivah",
      hindi: "फेरे एंड फ़ॉरएवर",
      day: "Wednesday",
      date: "9 December",
      iso: "2026-12-09T19:30:00+05:30",
      time: "7:30 pm",
      description:
        "With the blessings of our families, we invite you to be part of the sacred vows that unite us in marriage and the beginning of our forever.",
      attire: "Elegant ethnic attire.",
    },
  ],
};
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
