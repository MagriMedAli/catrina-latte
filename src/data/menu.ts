/**
 * Catrina Latte menu — transcribed from the café's printed menu (photos in /assets-src/menu).
 * Prices in Tunisian dinars (DT). Item names stay as printed (French) unless an
 * English name is given; obvious spelling slips on the print were corrected.
 */
import type { Lang } from '../i18n/strings';

export type Text = Record<Lang, string>;

export type MenuItem = {
  name: string | Text;
  note?: Text;
  price: number;
};

export type MenuCategory = {
  id: string;
  title: Text;
  script: string;
  note?: Text;
  items: MenuItem[];
};

export type MenuSection = {
  id: 'coffee' | 'drinks' | 'sweets';
  label: Text;
  categories: MenuCategory[];
};

const t = (fr: string, en: string): Text => ({ fr, en });

export const menu: MenuSection[] = [
  {
    id: 'coffee',
    label: t('Cafés', 'Coffee'),
    categories: [
      {
        id: 'cafes',
        title: t('Cafés', 'Coffee'),
        script: 'Café',
        note: t('Version Nespresso : +1 DT', 'Nespresso version: +1 DT'),
        items: [
          { name: 'Expresso', price: 3.2 },
          { name: 'Americano', price: 3.4 },
          { name: 'Capucin', price: 3.4 },
          { name: 'Café crème', price: 3.8 },
          { name: t('Chocolat au lait', 'Chocolate with milk'), price: 3.8 },
          { name: 'Cappuccino', price: 5.8 },
          { name: 'Affogato', note: t('Expresso + glace vanille', 'Espresso + vanilla ice cream'), price: 4.4 },
          { name: 'Affogato Pistachio', price: 5.8 },
          { name: 'Affogato Nutella', price: 5.8 },
        ],
      },
      {
        id: 'latte',
        title: t('Café latte', 'Café latte'),
        script: 'Latte',
        items: [
          { name: t('Vanille', 'Vanilla'), price: 5.8 },
          { name: 'Caramel', price: 5.8 },
          { name: t('Noisette', 'Hazelnut'), price: 5.8 },
          { name: 'Oreo Latte', price: 7.5 },
          { name: 'Latte Nutella', price: 7.8 },
          { name: 'Latte Spéculoos', price: 7.8 },
          { name: 'Pistachio Latte', price: 8.5 },
        ],
      },
      {
        id: 'chocolat',
        title: t('Chocolat chaud / glacé', 'Hot / iced chocolate'),
        script: 'Chocolate',
        items: [
          { name: t('Nature', 'Classic'), price: 6.2 },
          { name: 'Nutella', price: 8.5 },
          { name: 'Spéculoos', price: 8.5 },
          { name: 'Nutella Oreo', price: 9.5 },
          { name: 'Nutella Spéculoos', price: 12.5 },
        ],
      },
      {
        id: 'ice-coffee',
        title: t('Café glacé', 'Iced coffee'),
        script: 'Bien frío',
        items: [
          { name: t('Vanille', 'Vanilla'), price: 6.5 },
          { name: t('Noisette', 'Hazelnut'), price: 6.5 },
          { name: 'Nutella', price: 6.5 },
          { name: 'Pistachio Macchiato', price: 8.0 },
          { name: 'Mocha Macchiato', price: 8.0 },
          { name: 'Spanish Latte', price: 8.0 },
        ],
      },
    ],
  },
  {
    id: 'drinks',
    label: t('Boissons', 'Drinks'),
    categories: [
      {
        id: 'chaudes',
        title: t('Boissons chaudes', 'Hot drinks'),
        script: 'Té',
        items: [
          { name: t('Thé à la menthe', 'Mint tea'), price: 3.0 },
          { name: t('Infusion au choix', 'Herbal tea of your choice'), price: 3.8 },
          { name: t('Thé aux amandes', 'Tea with almonds'), price: 5.2 },
          { name: t('Thé aux pignons', 'Tea with pine nuts'), price: 6.8 },
        ],
      },
      {
        id: 'boissons',
        title: t('Boissons', 'Soft drinks'),
        script: 'Bebidas',
        items: [
          { name: t('Eau 0,5 L', 'Water 0.5 L'), price: 1.5 },
          { name: t('Eau 1 L', 'Water 1 L'), price: 2.8 },
          { name: t('Eau gazeuse', 'Sparkling water'), price: 2.8 },
          { name: 'Soda', price: 3.5 },
          { name: t('Boisson énergétique', 'Energy drink'), price: 8.5 },
        ],
      },
      {
        id: 'jus',
        title: t('Jus frais', 'Fresh juices'),
        script: 'Jugos',
        items: [
          { name: t('Citronnade', 'Lemonade'), price: 4.8 },
          { name: 'Orange', price: 5.2 },
          { name: t('Fraise', 'Strawberry'), price: 6.8 },
          { name: t('Banane', 'Banana'), price: 8.5 },
          { name: 'Kiwi', price: 8.5 },
        ],
      },
      {
        id: 'mixte',
        title: t('Jus mixtes', 'Mixed juices'),
        script: 'Mezclas',
        items: [
          { name: t('Fraise banane', 'Strawberry banana'), price: 9.5 },
          { name: t('Kiwi banane', 'Kiwi banana'), price: 10.5 },
          { name: t('Banane fruits secs', 'Banana & dried fruits'), price: 10.5 },
          { name: t('Banane datte fruits secs', 'Banana, dates & dried fruits'), price: 12.5 },
        ],
      },
      {
        id: 'mojitos',
        title: t('Mojitos', 'Mojitos'),
        script: 'Mojitos',
        items: [
          { name: 'Virgin Mojito', price: 8.5 },
          { name: 'Mint Blue Mojito', price: 9.5 },
          { name: 'Strawberry Mojito', price: 9.5 },
          { name: 'Blueberry Mojito', price: 9.5 },
          { name: 'Kiwi Mojito', price: 9.5 },
          { name: 'Power Mojito', price: 12.5 },
        ],
      },
      {
        id: 'cocktails',
        title: t('Cocktails', 'Cocktails'),
        script: 'Cócteles',
        items: [
          { name: 'Paradise', note: t('Orange, citron, curaçao bleu', 'Orange, lemon, blue curaçao'), price: 12.0 },
          { name: 'Tropical', note: t('Mangue, kiwi, ananas', 'Mango, kiwi, pineapple'), price: 13.5 },
          { name: 'Exotique', note: t('Myrtille, fraise, pêche', 'Blueberry, strawberry, peach'), price: 13.5 },
          { name: 'Asiatique', note: t('Fruit du dragon, litchi, cerise', 'Dragon fruit, lychee, cherry'), price: 13.5 },
        ],
      },
    ],
  },
  {
    id: 'sweets',
    label: t('Douceurs', 'Sweets'),
    categories: [
      {
        id: 'cheesecakes',
        title: t('Cheesecakes', 'Cheesecakes'),
        script: 'Dulces',
        items: [
          { name: 'Nutella', price: 8.5 },
          { name: 'Spéculoos', price: 8.5 },
          { name: t('Pistache', 'Pistachio'), price: 9.5 },
          { name: t('Noisette', 'Hazelnut'), price: 9.5 },
          { name: 'Mini cheesecake', price: 5.8 },
        ],
      },
      {
        id: 'fondants',
        title: t('Fondants & red velvet', 'Fondants & red velvet'),
        script: 'Chocolate',
        items: [
          { name: t('Fondant chocolat', 'Chocolate fondant'), price: 7.5 },
          { name: t('Fondant Nutella', 'Nutella fondant'), price: 8.5 },
          { name: t('Fondant pistache', 'Pistachio fondant'), price: 8.5 },
          { name: t('Fondant noisette', 'Hazelnut fondant'), price: 8.5 },
          { name: 'Red velvet', price: 8.0 },
        ],
      },
      {
        id: 'tiramisu',
        title: t('Tiramisu', 'Tiramisu'),
        script: 'Tiramisú',
        items: [
          { name: 'Tiramisu Nutella', price: 7.5 },
          { name: 'Tiramisu Spéculoos', price: 7.5 },
          { name: 'Tiramisu Nutella Oreo', price: 8.5 },
          { name: t('Tiramisu pistache', 'Pistachio tiramisu'), price: 9.5 },
        ],
      },
      {
        id: 'san-sebastian',
        title: t('San Sebastián', 'San Sebastián cheesecake'),
        script: 'Vasco',
        items: [
          { name: t('Nature', 'Classic'), price: 8.5 },
          { name: 'Nutella', price: 11.5 },
          { name: 'Spéculoos', price: 11.5 },
          { name: t('Pistache', 'Pistachio'), price: 12.5 },
          { name: 'Nutella Spéculoos', price: 14.5 },
        ],
      },
      {
        id: 'brownies',
        title: t('Brownies', 'Brownies'),
        script: 'Brownies',
        items: [
          { name: 'Nutella', price: 8.5 },
          { name: 'Spéculoos', price: 8.5 },
          { name: t('Pistache', 'Pistachio'), price: 9.5 },
        ],
      },
    ],
  },
];
