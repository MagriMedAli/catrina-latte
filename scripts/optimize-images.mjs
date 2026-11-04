// Generates optimized web assets from the original reference files in /assets-src.
// Run with: npm run images
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { shareCard } from './share-card.mjs';

const OUT = 'public/images';
mkdirSync(OUT, { recursive: true });

/**
 * Removes the white background around the logo.
 * Flood-fills from the image border through near-white, low-saturation pixels only,
 * so enclosed whites (teeth, eyes) and the cream skin tones stay opaque.
 * Edge pixels get partial alpha and are "un-multiplied" from white to avoid halos.
 */
async function cutoutLogo() {
  const { data, info } = await sharp('assets-src/catrina-logo.jpeg')
    // trim the thin grey scan line on the right edge
    .extract({ left: 0, top: 0, width: 1168, height: 1439 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const px = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]];
  const isBg = (i) => {
    const [r, g, b] = px(i);
    const mn = Math.min(r, g, b);
    const mx = Math.max(r, g, b);
    return mn > 150 && mx - mn < 34;
  };

  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  // Also seed enclosed white pockets (letter loops, gaps in the hair),
  // but never inside the painted face, where the teeth and eyes are white.
  const inFace = (x, y) => x > 420 && x < 820 && y > 320 && y < 890;
  for (let i = 0; i < w * h; i++) {
    const [r, g, b] = px(i);
    if (Math.min(r, g, b) > 238 && !inFace(i % w, (i / w) | 0)) stack.push(i);
  }

  while (stack.length) {
    const i = stack.pop();
    if (seen[i] || !isBg(i)) continue;
    seen[i] = 1;
    const [r, g, b] = px(i);
    const mn = Math.min(r, g, b);
    const a = Math.max(0, Math.min(1, (245 - mn) / 95));
    if (a <= 0.001) {
      data[i * 4 + 3] = 0;
    } else {
      // un-multiply from white
      const um = (c) => Math.max(0, Math.min(255, Math.round((c - (1 - a) * 255) / a)));
      data[i * 4] = um(r);
      data[i * 4 + 1] = um(g);
      data[i * 4 + 2] = um(b);
      data[i * 4 + 3] = Math.round(a * 255);
    }
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) stack.push(i - 1);
    if (x < w - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - w);
    if (y < h - 1) stack.push(i + w);
  }

  const cut = sharp(data, { raw: { width: w, height: h, channels: 4 } }).png();
  const buf = await cut.toBuffer();
  const trimmed = await sharp(buf).trim({ threshold: 1 }).toBuffer();

  await sharp(trimmed).resize({ width: 900 }).webp({ quality: 88, alphaQuality: 95 }).toFile(`${OUT}/catrina-logo.webp`);
  await sharp(trimmed).resize({ width: 520 }).webp({ quality: 88, alphaQuality: 95 }).toFile(`${OUT}/catrina-logo-sm.webp`);

  // Face + flower-crown mark for small placements (nav, favicon)
  const mark = await sharp(buf).extract({ left: 185, top: 70, width: 880, height: 880 }).toBuffer();
  await sharp(mark).resize(192).webp({ quality: 90 }).toFile(`${OUT}/catrina-mark.webp`);
  const png = { compressionLevel: 9, palette: true };
  await sharp(mark).resize(64).png(png).toFile('public/favicon.png');
  await sharp(mark).resize(192).png(png).toFile('public/icon-192.png');
  await sharp(mark).resize(512).png(png).toFile('public/icon-512.png');
  await sharp(mark).resize(180).flatten({ background: '#FFF4E5' }).png(png).toFile('public/apple-touch-icon.png');
}

async function interior() {
  const src = 'assets-src/interior.webp';
  await sharp(src).webp({ quality: 84 }).toFile(`${OUT}/interior.webp`);
  await sharp(src).resize({ width: 480 }).webp({ quality: 80 }).toFile(`${OUT}/interior-480.webp`);

  const crops = {
    'interior-mural': { left: 300, top: 380, width: 465, height: 330 },
    'interior-lanterns': { left: 60, top: 0, width: 640, height: 420 },
    'interior-face': { left: 370, top: 400, width: 200, height: 220 },
  };
  for (const [name, region] of Object.entries(crops)) {
    await sharp(src).extract(region).webp({ quality: 84 }).toFile(`${OUT}/${name}.webp`);
  }
}

/**
 * The extra café photos are small, compressed phone/social images.
 * Soften JPEG blocking, upscale 2x with Lanczos, then sharpen and lift colour slightly.
 */
async function enhance(src, name, { crop, saturation = 1.08, brightness = 1.02 } = {}) {
  let img = sharp(src);
  if (crop) img = img.extract(crop);
  const meta = await sharp(await img.clone().toBuffer()).metadata();
  const buf = await img
    .blur(0.45)
    .resize({ width: meta.width * 2, kernel: 'lanczos3' })
    .sharpen({ sigma: 1.1, m1: 0.6, m2: 2.2 })
    .modulate({ saturation, brightness })
    .linear(1.04, -4)
    .toBuffer();
  await sharp(buf).webp({ quality: 86 }).toFile(`${OUT}/${name}.webp`);
}

async function extras() {
  await enhance('assets-src/neon-catrina.jpg', 'neon-catrina');
  // crop away the neighbouring business sign above the café
  await enhance('assets-src/storefront.jpg', 'storefront', {
    crop: { left: 0, top: 118, width: 335, height: 479 },
    saturation: 1.12,
  });
}

await Promise.all([cutoutLogo(), interior(), extras()]);
await shareCard({ interior: 'assets-src/interior.webp', logo: `${OUT}/catrina-logo.webp`, out: `${OUT}/og-image.jpg` });
console.log('Images written to', OUT);
