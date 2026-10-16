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
        "Our wedding celebrations open with Tilak / Lagan Chumai, bringing our families together in an atmosphere of affection, tradition and the blessings of our elders.",
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
        "Dance performances from both sides of the family, a lively dance floor, and a party for everyone. Join the bride’s and groom’s families for an evening of music, movement and celebration.",
      attire: "Elegant traditional wear or formal suits",
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
        "The morning begins with ceremonial Haldi, followed by games for our guests. Join us for the traditions, then stay for some friendly competition and time together before the wedding.",
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
        "With the blessings of our families, we invite you to witness our wedding ceremony and share in the joy of our union.",
      attire: "Elegant ethnic wear for the wedding evening",
    },
  ],
};
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
