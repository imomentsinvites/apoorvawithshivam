export type WeddingEvent = {
  id: "mehendi" | "haldi" | "sangeet" | "bhaat" | "baraat";
  dateLabel: string;
  title: string;
  time: string;
  meal: string;
  location: string;
  mapUrl: string;
  eyebrow: string;
  particle: "leaf" | "marigold" | "rose";
};

export const events: WeddingEvent[] = [
  {
    id: "mehendi",
    dateLabel: "22 November 2026",
    title: "Mehendi",
    time: "Afternoon · 1:30 PM",
    meal: "Followed by lunch",
    location: "Maheshwari Sewa Sadan",
    mapUrl: "https://share.google/wyvnhd2G9vBof66WU",
    eyebrow: "A little colour, a lot of love",
    particle: "rose",
  },
  {
    id: "haldi",
    dateLabel: "23 November 2026",
    title: "Haldi",
    time: "10:30 AM",
    meal: "Followed by lunch",
    location: "Maheshwari Sewa Sadan",
    mapUrl: "https://share.google/wyvnhd2G9vBof66WU",
    eyebrow: "Sunshine, smiles & blessings",
    particle: "marigold",
  },
  {
    id: "sangeet",
    dateLabel: "23 November 2026",
    title: "Tilak & Sangeet",
    time: "7:00 PM",
    meal: "Followed by dinner",
    location: "City Park",
    mapUrl: "https://share.google/GMkJULWXaG93Ktsdm",
    eyebrow: "An evening of music & celebration",
    particle: "rose",
  },
  {
    id: "bhaat",
    dateLabel: "24 November 2026",
    title: "Bhaat",
    time: "10:30 AM",
    meal: "Followed by lunch",
    location: "Maheshwari Sewa Sadan",
    mapUrl: "https://share.google/wyvnhd2G9vBof66WU",
    eyebrow: "Family, blessings & traditions",
    particle: "rose",
  },
  {
    id: "baraat",
    dateLabel: "24 November 2026",
    title: "Baraat Swagat",
    time: "8:00 PM",
    meal: "Dinner · 9:30 PM",
    location: "The Sherioan by Kawatra, Victoria Hall",
    mapUrl: "https://share.google/Exv7AX8eOqSMYkgcz",
    eyebrow: "The grand celebration",
    particle: "rose",
  },
];

export const rsvpContacts = [
  { name: "Arun Mohta", phone: "9810438897" },
  { name: "Pushpa Mohta", phone: "8010216885" },
];
