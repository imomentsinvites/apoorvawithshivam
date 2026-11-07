# Apoorva & Shivam — Cinematic Wedding Invitation

A single continuous, mobile-first React + TypeScript + Vite wedding invitation in the pink, rose, peach and antique-gold illustrated theme from the supplied reference.

## What is implemented
- Original opening video retained at `public/videos/entry.mp4`.
- Original canvas scratch-to-reveal interaction retained and restyled as an ornate gold foil plaque.
- All text is live HTML, never baked into artwork.
- Each event is a full-bleed scene with its own background image slot, animated typography, and event-specific floating elements.
- Mehendi: floating green leaves.
- Haldi: floating marigold particles.
- Wedding: drifting rose petals and warm glowing particles.
- No static petals are expected in any background image. All petals/leaves/particles are generated separately by the website.
- Continuous page flow, scroll-triggered text entrances/exits, venue scene, RSVP and countdown.

## Background images to add later
The code is already wired to these exact paths. Place your generated, text-free backgrounds here:
- `public/images/scenes/scratch-garden.jpg`
- `public/images/scenes/mehendi-garden.jpg`
- `public/images/scenes/haldi-courtyard.jpg`
- `public/images/scenes/wedding-mandap.jpg`
- `public/images/scenes/venue-palace.jpg`

Image guidance: 1920x1200 landscape (or 16:10), illustrated Indian palace garden / floral mandap style, pink-peach-gold palette, no text, no people, no petals, no leaves floating in the air, no lantern sparks. Keep open space in the central area for live HTML text. Static architectural florals and garlands are fine.

## Customize content
Edit `src/data/events.ts` for event dates, names, times, venue and RSVP contacts.
Edit the target timestamp in `src/App.tsx` if the wedding date/time changes.
Replace `public/videos/entry.mp4` to use another opening video.

## Run
```bash
npm install
npm run dev
```
Build:
```bash
npm run build
```
