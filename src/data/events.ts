export type WeddingEvent = {
  id: string;
  dateLabel: string;
  title: string;
  time: string;
  video: string;
  secondary?: { title: string; time: string };
  eyebrow?: string;
};

export const events: WeddingEvent[] = [
  {
    id: "mehendi",
    dateLabel: "22 November 2026",
    title: "Mehendi",
    time: "Afternoon · 1:30 PM",
    video: "/videos/events/01-mehendi.mp4",
    eyebrow: "A little colour, a lot of love",
  },
  {
    id: "haldi",
    dateLabel: "23 November 2026",
    title: "Haldi",
    time: "Morning · 10:00 AM",
    video: "/videos/events/02-haldi.mp4",
    eyebrow: "Sunshine, smiles & blessings",
  },
  {
    id: "wedding",
    dateLabel: "24 November 2026",
    title: "Bhaat & Wedding",
    time: "Bhaat · Morning 10:00 AM",
    secondary: { title: "Wedding", time: "7:30 PM onwards" },
    video: "/videos/events/03-wedding.mp4",
    eyebrow: "The beginning of forever",
  },
];

export const venue = {
  name: "Maheshwari Sewa Sadan",
  address: "Block E, CC Colony, Kalyan Vihar, Delhi – 110033",
  mapUrl: "https://share.google/HSt3v7WM95b1MMCDL",
};

export const rsvpContacts = [
  { name: "Arun Mohta", phone: "9810438997" },
  { name: "Pushpa Mohta", phone: "8010216885" },
];