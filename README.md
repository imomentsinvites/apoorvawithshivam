# Apoorva & Shivam — Wedding Invitation Website

A responsive React + Vite wedding invitation site for 22–24 November 2026.

## Included updates

- Opening screen uses a subtle animated “Tap Anywhere to Open” pill. The opening video starts on the first tap, and the scroll cue appears after five seconds.
- Silver brushed-foil scratch card with smooth pointer/touch scratching. The date is revealed after approximately 65% of the foil is removed.
- Post-scratch message: “A JOURNEY OF LOVE & TRADITION / Let the Celebrations Begin / The Celebrations Diaries / One unforgettable journey”.
- Five code-rendered event overlays, in chronological order: Mehendi, Haldi, Tilak & Sangeet, Bhaat and Wedding. Each venue/address opens its supplied Google Maps link.
- No separate venue section. Arun Mohta's phone number is updated to 9810438897.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Media assets

- `public/videos/entry.mp4` — opening video
- `public/videos/events/01-mehendi.mp4` — Mehendi background
- `public/videos/events/02-haldi.mp4` — Haldi background (also used as a temporary Bhaat background until a dedicated Bhaat clip is supplied)
- `public/videos/events/03-engagement.mp4` — Tilak & Sangeet background
- `public/videos/events/03-wedding.mp4` — Wedding background
- `public/images/start-image.jpg` — opening poster
- `public/images/scratch-background.jpg` — scratch-section poster
- `public/videos/scratch-background.mp4` — optional background video; if absent, the section falls back to its CSS background and poster
- `public/audio/wedding-bg-music.mp3` — optional background music; add this file to enable music playback

Event titles, dates, schedules, venue names, addresses, Maps URLs and background-video paths are configured in `src/data/events.ts`. The text is rendered in the website code, not added to the MP4 files. The supplied Mehendi, Haldi and Wedding MP4s contain older text baked into the upper part of the footage; the event information panel is deliberately opaque and positioned over that area so the outdated text is hidden while the current event copy is rendered by the website.

## Event schedule configured

- 22 November 2026, 1:30 PM onwards — Mehendi, followed by lunch — Maheshwari Sewa Sadan
- 23 November 2026, 10:30 AM onwards — Haldi, followed by lunch — Maheshwari Sewa Sadan
- 23 November 2026, 7:00 PM onwards — Tilak & Sangeet, followed by dinner — Hotel City Park
- 24 November 2026, 10:30 AM onwards — Bhaat, followed by lunch — Maheshwari Sewa Sadan
- 24 November 2026 — Wedding: Baraat Swagat 8:00 PM, Dinner 9:30 PM, Vidaai “Taaron ki chhaon mein” — The Sherioan by Kawatra, Victoria Hall

## Deployment

The repository includes the GitHub Pages workflow in `.github/workflows/deploy.yml`. Push the project to the repository and allow the workflow to build and deploy the `dist` folder.
