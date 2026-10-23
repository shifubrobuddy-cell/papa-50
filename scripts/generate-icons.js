import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Crisp Golden Jubilee SVG
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#1e1035"/>
      <stop offset="60%" stop-color="#0a0518"/>
      <stop offset="100%" stop-color="#030108"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3B0"/>
      <stop offset="35%" stop-color="#E2B144"/>
      <stop offset="70%" stop-color="#FFD700"/>
      <stop offset="100%" stop-color="#B8860B"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#dc2626" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#ffd700" flood-opacity="0.35"/>
    </filter>
  </defs>
  
  <!-- Outer circular background -->
  <rect width="512" height="512" rx="128" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="230" fill="none" stroke="url(#gold)" stroke-width="3" stroke-opacity="0.4"/>
  <circle cx="256" cy="256" r="210" fill="none" stroke="url(#gold)" stroke-width="1.5" stroke-dasharray="6 6" stroke-opacity="0.3"/>
  
  <!-- Glow Behind 50 -->
  <circle cx="256" cy="240" r="140" fill="url(#glow)"/>
  
  <!-- Golden Crown -->
  <path d="M206 140 L226 170 L256 125 L286 170 L306 140 L300 185 L212 185 Z" fill="url(#gold)" filter="url(#shadow)"/>
  
  <!-- Big 50 -->
  <text x="256" y="325" font-family="'Playfair Display', Georgia, serif" font-size="160" font-weight="bold" fill="url(#gold)" text-anchor="middle" filter="url(#shadow)">50</text>
  
  <!-- Subtitle -->
  <text x="256" y="380" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="600" letter-spacing="6" fill="#FDE68A" text-anchor="middle">PAPA</text>
  <text x="256" y="415" font-family="'Inter', -apple-system, sans-serif" font-size="14" font-weight="500" letter-spacing="4" fill="#D97706" text-anchor="middle">GOLDEN JUBILEE</text>
</svg>`;

const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgMask" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#1e1035"/>
      <stop offset="60%" stop-color="#0a0518"/>
      <stop offset="100%" stop-color="#030108"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3B0"/>
      <stop offset="35%" stop-color="#E2B144"/>
      <stop offset="70%" stop-color="#FFD700"/>
      <stop offset="100%" stop-color="#B8860B"/>
    </linearGradient>
  </defs>
  
  <!-- Full bleed for maskable safe zone -->
  <rect width="512" height="512" fill="url(#bgMask)"/>
  <circle cx="256" cy="256" r="180" fill="none" stroke="url(#gold)" stroke-width="2" stroke-opacity="0.3"/>
  <path d="M216 160 L232 185 L256 148 L280 185 L296 160 L290 198 L222 198 Z" fill="url(#gold)"/>
  <text x="256" y="315" font-family="'Playfair Display', Georgia, serif" font-size="135" font-weight="bold" fill="url(#gold)" text-anchor="middle">50</text>
  <text x="256" y="365" font-family="'Inter', -apple-system, sans-serif" font-size="20" font-weight="600" letter-spacing="5" fill="#FDE68A" text-anchor="middle">PAPA</text>
</svg>`;

async function run() {
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgIcon);
  
  const iconBuffer = Buffer.from(svgIcon);
  const maskableBuffer = Buffer.from(svgMaskable);

  await sharp(iconBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'));
  await sharp(iconBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'));
  await sharp(maskableBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(iconBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));

  console.log('PWA icons successfully generated!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
