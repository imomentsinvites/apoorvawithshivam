# Apoorva & Shivam — Cinematic Wedding Invitation

Mobile-first React + TypeScript + Vite wedding invitation, designed around a 9:16 visual system.

## Entry experience
- The opening screen shows only the supplied entry-video poster and a small translucent `Tap to Open` pill.
- Tapping anywhere starts `public/videos/entry.mp4`.
- Scrolling stays locked for the first 6 seconds after the tap.
- The scroll arrow appears after those 6 seconds.

## Scratch card
- Original canvas-based scratch interaction is preserved.
- Original scratch background image is retained but faded softly behind the card.

## Illustrated event scenes
All event illustrations are original text-free 1080 × 1920 SVG backgrounds in `public/images/scenes/`.
They contain no loose falling petals; the small event-specific moving particles are generated separately in CSS.

- Mehendi — 22 November 2026, 1:30 PM; followed by lunch; Maheshwari Sewa Sadan.
- Haldi — 23 November 2026, 10:30 AM; followed by lunch; Maheshwari Sewa Sadan.
- Tilak & Sangeet — 23 November 2026, 7:00 PM; followed by dinner; City Park.
- Bhaat — 24 November 2026, 10:30 AM; followed by lunch; Maheshwari Sewa Sadan.
- Baraat Swagat — 24 November 2026, 8:00 PM; dinner at 9:30 PM; The Sherioan by Kawatra, Victoria Hall.

Each event has its own address, Google Maps link, soft translucent ivory text panel, scroll reveal, and blended top/bottom transitions. There is no separate Venue section.

## RSVP
- Arun Mohta — 9810438897
- Pushpa Mohta — 8010216885

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```
