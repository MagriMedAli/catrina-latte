/**
 * Business details. Visible labels and wording live in src/i18n/strings.ts.
 * Anything with `placeholder: true` is NOT verified — replace before launch.
 */

/** Google plus code for the café's location. */
const PLUS_CODE = 'QR8H+5CH Monastir';
const q = encodeURIComponent(PLUS_CODE);

export const site = {
  name: 'Catrina Latte',

  address: { plusCode: 'QR8H+5CH', placeholder: false },

  phone: {
    value: '+216 56 874 550',
    href: 'tel:+21656874550',
    placeholder: false,
  },

  instagram: {
    value: '@catrina_latte',
    href: 'https://www.instagram.com/catrina_latte/',
    placeholder: false,
  },

  /** One entry per line of `visit.days` in the translations. */
  hours: ['07:00 – 01:00'],
  hoursPlaceholder: false,

  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${q}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${q}&z=17&output=embed`,
};

export const navIds = ['about', 'signatures', 'menu', 'gallery', 'visit'] as const;
