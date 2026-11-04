// Link-preview card (WhatsApp, Facebook, iMessage…): the mural photo in an arch
// beside the real logo on a cream arch, on the café's turquoise.
import sharp from 'sharp';

const W = 1200;
const H = 630;
const FLOWERS = [
  [60, 560, '#E94F42'],
  [1130, 90, '#F6B83C'],
  [1150, 560, '#70418B'],
  [80, 70, '#F39A39'],
  [600, 600, '#E88AA6'],
];

/** An arch shape (round top, softly rounded bottom corners) as an SVG buffer. */
function arch(w, h, fill) {
  const r = w / 2;
  const c = 18;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<path d="M0 ${r} A${r} ${r} 0 0 1 ${w} ${r} V${h - c} Q${w} ${h} ${w - c} ${h} H${c} Q0 ${h} 0 ${h - c} Z" fill="${fill}"/>` +
      `</svg>`,
  );
}

function flower([x, y, color]) {
  const petals = [0, 72, 144, 216, 288]
    .map((r) => `<ellipse cx="0" cy="-16" rx="10" ry="17" transform="rotate(${r})"/>`)
    .join('');
  return `<g transform="translate(${x} ${y})" fill="${color}">${petals}<circle r="8" fill="#F6B83C" stroke="#17172F" stroke-width="2"/></g>`;
}

function background() {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
      `<defs>` +
      `<radialGradient id="g" cx="72%" cy="20%" r="80%"><stop offset="0" stop-color="#11a0a2"/><stop offset="1" stop-color="#065a5f"/></radialGradient>` +
      `<radialGradient id="w" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffc45a" stop-opacity=".35"/><stop offset="1" stop-color="#ffc45a" stop-opacity="0"/></radialGradient>` +
      `</defs>` +
      `<rect width="100%" height="100%" fill="url(#g)"/>` +
      `<circle cx="870" cy="150" r="330" fill="url(#w)"/>` +
      FLOWERS.map(flower).join('') +
      `</svg>`,
  );
}

export async function shareCard({ interior, logo, out }) {
  const aw = 400;
  const ah = 540;
  const top = 45;

  // left: the mural + lanterns, clipped to an arch inside a cream frame
  const photo = await sharp(interior)
    .extract({ left: 150, top: 120, width: 615, height: 830 })
    .resize(aw - 20, ah - 20, { fit: 'cover', position: 'top' })
    .composite([{ input: arch(aw - 20, ah - 20, '#fff'), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // right: the logo on a cream arch
  const logoW = 300;
  const logoBuf = await sharp(logo).resize({ width: logoW }).png().toBuffer();
  const { height: logoH } = await sharp(logoBuf).metadata();

  await sharp(background())
    .composite([
      { input: arch(aw, ah, '#FFF4E5'), left: 140, top },
      { input: photo, left: 150, top: top + 10 },
      { input: arch(aw, ah, '#FFF4E5'), left: 660, top },
      { input: logoBuf, left: 660 + (aw - logoW) / 2, top: top + Math.round((ah - logoH) / 2) + 24 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
}
