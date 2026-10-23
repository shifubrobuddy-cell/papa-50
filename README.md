# 50 Years of Papa • Golden Jubilee (1976 — 2026)

A high-end, cinematic, and deeply emotional birthday progressive web app (PWA) crafted for **Mustafa (Abu-g)** by his son **Mohammad Tameem Mustafa**.

---

## 📸 How to Customize Photos & Content

All application text, milestones, photos, and reasons are centralized in **one single file**:

```
src/content.ts
```

### 1. Photos
All photos live in `/public/photos/`:
- `photo-now.jpg` (or `image_1124e117.png`): Main portrait in glowing circular frame and "Now" slider.
- `photo-young.jpg` (or `image_fe619735.png`): "Then" slider and childhood memory with Abu-g.
- `childhood-with-dad.jpg`: Polaroid memory of Abu-g holding toddler Tameem.
- `family-1.jpg` to `family-6.jpg`: Polaroid cards in the Family Gallery.

To change or update any picture, simply drop your new file into `/public/photos/` and update the paths in `src/content.ts`.

### 2. Personal Letter & Captions
Inside `src/content.ts`:
- `myLetter.bodyEnglish`: Son's heartfelt letter in English.
- `myLetter.bodyUrdu`: Roman Urdu translation.
- `fiftyReasons`: The 50 reasons why you love Abu-g.
- `timeline`: Milestones from 1976 to 2026 (Abha → Dammam → Khobar → Riyadh, the scooty story, etc.).

### 3. Background Music
- Located at `/public/music/song.mp3`.
- Currently loaded with the **Best of KK Mashup (Bollywood Evergreen Hits)** provided.
- Starts playing automatically upon opening the Gift Gate (with play/pause/mute controls on the top right).

---

## 🚀 How to Deploy on Vercel (Step-by-Step)

The project is completely Vercel-ready with `vercel.json` already configured for SPA routing and static caching.

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Select your repository from the list.
5. Vercel automatically detects:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. In under a minute, your website will be live with a secure HTTPS URL!

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel
```
Follow the interactive prompts and accept the defaults.

---

## 📱 PWA (Progressive Web App) Features
- **Android / Chrome / Desktop**: Tap the "Install Papa's Gift App" button in the finale or header to install to the home screen.
- **iOS Safari**: Tap the "Add to iPhone Home Screen" button for guided instructions (Share icon → Add to Home Screen).
- Works offline via Workbox service worker caching.
