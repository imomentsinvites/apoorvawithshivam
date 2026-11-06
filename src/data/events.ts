const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export type WeddingEvent = {
  id: string;
  title: string;
  date: string;
  schedule: string[];
  note: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  video: string;
};

const maheshwari = {
  venueName: "Maheshwari Sewa Sadan",
  venueAddress: "Block E, CC Colony, Kalyan Vihar, Delhi – 110033",
  mapUrl: "https://share.google/wyvnhd2G9vBof66WU",
};
const cityPark = {
  venueName: "Hotel City Park",
  venueAddress: "City Park Hotel, Pitampura, Delhi",
  mapUrl: "https://share.google/GMkJULWXaG93Ktsdm",
};
const weddingVenue = {
  venueName: "The Sherioan by Kawatra, Victoria Hall",
  venueAddress: "The Sherioan by Kawatra, Victoria Hall",
  mapUrl: "https://share.google/Exv7AX8eOqSMYkgcz",
};

export const events: WeddingEvent[] = [
  {
    id: "mehendi", title: "Mehendi", date: "22 November 2026",
    schedule: ["1:30 PM onwards"], note: "Followed by Lunch", ...maheshwari,
    video: publicAsset("videos/events/01-mehendi.mp4"),
  },
  {
    id: "haldi", title: "Haldi", date: "23 November 2026",
    schedule: ["10:30 AM onwards"], note: "Followed by Lunch", ...maheshwari,
    video: publicAsset("videos/events/02-haldi.mp4"),
  },
  {
    id: "tilak-sangeet", title: "Tilak & Sangeet", date: "23 November 2026",
    schedule: ["7:00 PM onwards"], note: "Followed by Dinner", ...cityPark,
    video: publicAsset("videos/events/03-engagement.mp4"),
  },
  {
    id: "bhaat", title: "Bhaat", date: "24 November 2026",
    schedule: ["10:30 AM onwards"], note: "Followed by Lunch", ...maheshwari,
    video: publicAsset("videos/events/02-haldi.mp4"),
  },
  {
    id: "wedding", title: "Wedding", date: "24 November 2026",
    schedule: ["Baraat Swagat · 8:00 PM", "Dinner · 9:30 PM", "Vidaai · Taaron ki chhaon mein"],
    note: "", ...weddingVenue,
    video: publicAsset("videos/events/03-wedding.mp4"),
  },
];

export const rsvpContacts = [
  { name: "Arun Mohta", phone: "9810438897" },
  { name: "Pushpa Mohta", phone: "8010216885" },
];
