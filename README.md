# Apoorva & Shivam — Wedding Invitation

A mobile-first React + Vite wedding invitation for GitHub Pages.

## Included
- Introductory invitation hero with scroll cue
- Interactive scratch-to-reveal card
- Three event sections with lazy, muted, looping 9:16 videos
- Soft video overlays and blended section edges
- Clickable venue directions
- Live countdown to 24 November 2026, 7:30 PM IST

## Replace videos
Add your vertical opening video as `public/videos/entry.mp4`.

Add your scratch-card background video as `public/videos/scratch-background.mp4`. It plays behind the interactive scratch canvas. The floral mandap image is used as its poster/fallback at `public/images/scratch-background.jpg`.

Put your replacement event videos in `public/videos/events/`:
- `01-mehendi.mp4`
- `02-haldi.mp4`
- `03-wedding.mp4`

The supplied sample videos are assigned in date order:
- `IMG_4452.mp4` → `01-mehendi.mp4`
- `IMG_4453.mp4` → `02-haldi.mp4`

The Wedding video slot is intentionally empty until you add it. Every event displays “Followed by Lunch” beneath its timings. The third section displays its poster/gradient background in the meantime.

For the scratch-card background, replace `public/images/scratch-background.jpg` with your floral mandap image. To use a moving background later, add a muted video layer in `ScratchCard`'s parent section.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy to GitHub Pages
1. Create a GitHub repository and upload this project.
2. In `package.json`, add a `homepage` only if you use a custom domain (not required for this relative-base Vite setup).
3. Run:
   ```bash
   npm install
   npm run build
   ```
4. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the build source.
5. Use the official Vite GitHub Pages workflow, or deploy the generated `dist` folder with the `gh-pages` package.

### Optional gh-pages deploy
```bash
npm run deploy
```
This publishes `dist` to the `gh-pages` branch. Ensure GitHub Pages is configured to serve that branch.

## RSVP contacts
Edit `rsvpContacts` in `src/data/events.ts` to change the two RSVP contacts. The page renders phone and WhatsApp links automatically.

## Editing event details
Edit `src/data/events.ts`. Venue address and map URL are in the same file.
