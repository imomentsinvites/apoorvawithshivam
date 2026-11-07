# Apoorva & Shivam — Cinematic Wedding Invitation

A mobile-first React + TypeScript + Vite wedding invitation redesigned as one continuous illustrated experience.

## What changed
- The supplied opening video remains as the hero entry.
- Event videos and the scratch-section background video have been removed.
- Three custom SVG event illustrations are used for Mehendi, Haldi, and Wedding.
- Scroll-triggered text reveals animate in and out as the visitor moves through the page.
- A shared falling-petal layer, subtle swaying ornaments, soft parallax-like scene movement, and smooth section transitions create continuity.
- Existing invitation copy, event details, venue, map link, RSVP contacts, scratch-to-reveal interaction, and countdown are retained.

## Replace the opening video
Replace `public/videos/entry.mp4` with your preferred opening video, keeping the same filename.

## Customize event illustrations
The event scenes are:
- `public/images/events/mehendi.svg`
- `public/images/events/haldi.svg`
- `public/images/events/wedding.svg`

Replace these SVGs with your own artwork if desired. Keep the same filenames or update `EventSection.tsx`.

## Edit invitation content
Edit `src/data/events.ts` for event dates, titles, times, venue, and RSVP contacts.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy
Build the project and deploy the generated `dist` folder using your existing GitHub Pages workflow.
