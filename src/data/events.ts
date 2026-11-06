export type WeddingEvent = { id: string; video: string };
export const events: WeddingEvent[] = [
  { id: "mehendi", video: `${import.meta.env.BASE_URL}videos/events/01-mehendi.mp4` },
  { id: "haldi", video: `${import.meta.env.BASE_URL}videos/events/02-haldi.mp4` },
  { id: "wedding", video: `${import.meta.env.BASE_URL}videos/events/03-wedding.mp4` },
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
