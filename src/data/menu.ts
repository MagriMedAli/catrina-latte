/**
 * Catrina Latte menu — transcribed from the café's full printed menu (Nov 2026 PDF).
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
  id: 'breakfast' | 'coffee' | 'drinks' | 'shakes' | 'sweets' | 'crepes' | 'savory';
  label: Text;
  categories: MenuCategory[];
};

const t = (fr: string, en: string): Text => ({ fr, en });

const withIceCream = t('Servi avec une boule de glace', 'Served with a scoop of ice cream');
const catrinaTrio = t('Nutella, pistache, fruits secs', 'Nutella, pistachio, nuts');

export const menu: MenuSection[] = [
  {
    id: 'breakfast',
    label: t('Petit-déj', 'Breakfast'),
    categories: [
      {
        id: 'formules',
        title: t('Petit-déjeuner', 'Breakfast'),
        script: 'Desayuno',
        note: t('Café au choix avec chaque formule', 'Coffee of your choice with every set'),
        items: [
          {
            name: 'The First',
            note: t(
              'Jus frais, eau 0,5 L, croissant ou mini-crêpe, ou mini-omelette, ou œufs brouillés',
              'Fresh juice, 0.5 L water, croissant or mini crêpe, or mini omelette, or scrambled eggs',
            ),
            price: 10,
          },
          {
            name: 'Spicy',
            note: t(
              'Jus frais, eau 0,5 L, œufs brouillés au fromage, champignons, légumes sautés, saucisse poêlée, ricotta, toast, charcuterie, brochette',
              'Fresh juice, 0.5 L water, cheesy scrambled eggs, mushrooms, sautéed vegetables, pan-fried sausage, ricotta, toast, cold cuts, skewer',
            ),
            price: 24.5,
          },
          {
            name: 'Sweety',
            note: t(
              'Jus frais, eau 0,5 L, croissant, fondant au chocolat, gaufre, pancake, pain perdu au caramel et fruits, smoothie bowl',
              'Fresh juice, 0.5 L water, croissant, chocolate fondant, waffle, pancake, caramel & fruit French toast, smoothie bowl',
            ),
            price: 26.5,
          },
          {
            name: 'Catrina Power',
            note: t(
              'Jus de fruits, eau 0,5 L, yaourt healthy, omelette, poulet, ricotta, dattes, healthy cookies, miel, fruits secs',
              'Fruit juice, 0.5 L water, healthy yoghurt, omelette, chicken, ricotta, dates, healthy cookies, honey, nuts',
            ),
            price: 28.5,
          },
          {
            name: t('Mexicain', 'Mexican'),
            note: t(
              'Croissant, eau 0,5 L, jus frais, toast, œuf au plat, tacos mexicains, brochette mixte, saucisse poêlée, légumes sautés',
              'Croissant, 0.5 L water, fresh juice, toast, fried egg, Mexican tacos, mixed skewer, pan-fried sausage, sautéed vegetables',
            ),
            price: 38.5,
          },
        ],
      },
      {
        id: 'brunch',
        title: t('Brunch', 'Brunch'),
        script: 'Brunch',
        items: [
          {
            name: t('Brunch · pour 2', 'Brunch · for 2'),
            note: t(
              '2 cafés au choix, jus frais, salade de fruits, eau 1 L, ricotta, fromage, charcuterie, viennoiseries, pancake, pain perdu, fried chicken, brochettes, saucisse poêlée, fondant, gaufre, œufs brouillés au fromage, légumes sautés, fromage sicilien',
              '2 coffees of your choice, fresh juice, fruit salad, 1 L water, ricotta, cheese, cold cuts, pastries, pancake, French toast, fried chicken, skewers, pan-fried sausage, fondant, waffle, cheesy scrambled eggs, sautéed vegetables, Sicilian cheese',
            ),
            price: 54,
          },
          {
            name: t('Brunch La Catrina · pour 3', 'Brunch La Catrina · for 3'),
            note: t(
              '3 cafés au choix, 3 jus frais, eau 1 L, salade de fruits, ricotta, fromages, fromage sicilien, charcuterie, 2 croissants, crêpe salée, pain perdu, fried chicken, saucisse poêlée, fondant, pancake, gaufre, œufs brouillés au fromage, légumes sautés, tacos mexicains, brochette mixte',
              '3 coffees of your choice, 3 fresh juices, 1 L water, fruit salad, ricotta, cheeses, Sicilian cheese, cold cuts, 2 croissants, savoury crêpe, French toast, fried chicken, pan-fried sausage, fondant, pancake, waffle, cheesy scrambled eggs, sautéed vegetables, Mexican tacos, mixed skewer',
            ),
            price: 78.5,
          },
        ],
      },
      {
        id: 'matinal',
        title: t('Matinal', 'Bakery'),
        script: 'Panadería',
        items: [
          { name: 'Croissant', price: 2.5 },
          { name: t('Pain au chocolat', 'Pain au chocolat'), price: 3 },
          { name: 'Croissant Spéculoos', price: 4.5 },
          { name: 'Croissant Nutella', price: 5.5 },
          { name: t('Gâteaux', 'Cakes'), price: 8.5 },
        ],
      },
      {
        id: 'omelette',
        title: t('Omelettes', 'Omelettes'),
        script: 'Huevos',
        items: [
          { name: t('Fromage', 'Cheese'), price: 9.5 },
          { name: t('Thon fromage', 'Tuna & cheese'), price: 12.5 },
          { name: t('Jambon fromage', 'Ham & cheese'), price: 12.5 },
          {
            name: t('Mexicaine', 'Mexican'),
            note: t('Fromage, poulet mexicain, pepperoni, légumes', 'Cheese, Mexican chicken, pepperoni, vegetables'),
            price: 14.5,
          },
          { name: t('Ricotta épinards', 'Ricotta & spinach'), price: 14.5 },
          { name: t('Poulet épinards', 'Chicken & spinach'), price: 14.5 },
          {
            name: t('Italienne', 'Italian'),
            note: t('Fromage, crevettes sautées, légumes', 'Cheese, sautéed shrimp, vegetables'),
            price: 14.5,
          },
          {
            name: t('Tunisienne', 'Tunisian'),
            note: t('Fromage, harissa, thon, olives, œuf', 'Cheese, harissa, tuna, olives, egg'),
            price: 14.5,
          },
          {
            name: 'Sportif',
            note: t('Fromage, ricotta, escalope, épinards, chia', 'Cheese, ricotta, chicken escalope, spinach, chia'),
            price: 14.5,
          },
        ],
      },
      {
        id: 'pain-perdu-sale',
        title: t('Pain perdu salé', 'Savoury French toast'),
        script: 'Salado',
        items: [
          {
            name: 'Chicken',
            note: t(
              'Pain brioché, poulet grillé, champignons sautés, salade, tomate, oignons caramélisés, fromage',
              'Brioche, grilled chicken, sautéed mushrooms, lettuce, tomato, caramelised onions, cheese',
            ),
            price: 15.5,
          },
          {
            name: 'Crispy',
            note: t(
              'Pain brioché, escalope panée, salade, tomate, oignons caramélisés, mozzarella panée, sauce BBQ',
              'Brioche, breaded escalope, lettuce, tomato, caramelised onions, breaded mozzarella, BBQ sauce',
            ),
            price: 16.5,
          },
          {
            name: 'Shrimp',
            note: t(
              'Pain brioché, crevettes panées, salade, tomate, oignons caramélisés, fromage',
              'Brioche, breaded shrimp, lettuce, tomato, caramelised onions, cheese',
            ),
            price: 18.5,
          },
          {
            name: 'Shrimp & egg',
            note: t(
              'Pain brioché, crevettes sautées, œuf brouillé, salade, tomate, oignons caramélisés, fromage',
              'Brioche, sautéed shrimp, scrambled egg, lettuce, tomato, caramelised onions, cheese',
            ),
            price: 19.5,
          },
          {
            name: t('Saumon', 'Salmon'),
            note: t(
              'Pain brioché, saumon, œuf mollet, salade, tomate, oignons caramélisés, fromage',
              'Brioche, salmon, soft-boiled egg, lettuce, tomato, caramelised onions, cheese',
            ),
            price: 20.5,
          },
        ],
      },
      {
        id: 'pain-perdu-sucre',
        title: t('Pain perdu sucré', 'Sweet French toast'),
        script: 'Dulce',
        note: withIceCream,
        items: [
          {
            name: t('Caramel banane', 'Caramel banana'),
            note: t('Pain brioché, banane, caramel, Spéculoos', 'Brioche, banana, caramel, Speculoos'),
            price: 14.5,
          },
          {
            name: t('Pistache framboise', 'Pistachio raspberry'),
            note: t('Pain brioché, framboise, pistache, chocolat blanc', 'Brioche, raspberry, pistachio, white chocolate'),
            price: 16.5,
          },
          {
            name: t('Nutella banane', 'Nutella banana'),
            note: t('Pain brioché, banane, Nutella, amandes', 'Brioche, banana, Nutella, almonds'),
            price: 17.5,
          },
          {
            name: 'Nutella Spéculoos',
            note: t('Pain brioché, Spéculoos, Nutella', 'Brioche, Speculoos, Nutella'),
            price: 17.5,
          },
        ],
      },
      {
        id: 'supplements',
        title: t('Suppléments', 'Extras'),
        script: 'Extras',
        items: [
          { name: t('Thon', 'Tuna'), price: 4.5 },
          { name: t('Jambon', 'Ham'), price: 4.5 },
          { name: t('Fromage', 'Cheese'), price: 4.5 },
          { name: 'Nutella', price: 4.5 },
          { name: t('Fruits secs', 'Nuts'), price: 4.5 },
        ],
      },
    ],
  },
  {
    id: 'coffee',
    label: t('Cafés', 'Coffee'),
    categories: [
      {
        id: 'cafes',
        title: t('Cafés', 'Coffee'),
        script: 'Café',
        note: t('Version Nespresso ou Nestlé : +1,5 DT', 'Nespresso or Nestlé version: +1.5 DT'),
        items: [
          { name: 'Espresso', price: 3.5 },
          { name: 'Americano', price: 3.6 },
          { name: 'Capucin', price: 3.6 },
          { name: t('Chocolat au lait', 'Chocolate with milk'), price: 4 },
          { name: 'Café crème', price: 4 },
          { name: 'Grand crème', price: 4.5 },
          { name: 'Nescafé', price: 4.5 },
          { name: 'Cappuccino', price: 6.4 },
        ],
      },
      {
        id: 'latte',
        title: t('Cafés latte', 'Café latte'),
        script: 'Latte',
        items: [
          { name: t('Vanille', 'Vanilla'), price: 6.5 },
          { name: 'Caramel', price: 6.5 },
          { name: t('Noisette', 'Hazelnut'), price: 6.5 },
          { name: 'Latte Nutella', price: 8.5 },
          { name: 'Latte Spéculoos', price: 8.5 },
          { name: 'Spanish Latte', price: 9.8 },
          { name: 'Pistachio Latte', price: 9.8 },
          { name: 'La Catrina', note: t('Nutella, pistache', 'Nutella, pistachio'), price: 13.5 },
        ],
      },
      {
        id: 'affogato',
        title: t('Affogato', 'Affogato'),
        script: 'Affogato',
        note: t('Espresso + boule de glace', 'Espresso + a scoop of ice cream'),
        items: [
          { name: t('Classique', 'Classic'), price: 5.8 },
          { name: t('Caramel vanille', 'Caramel vanilla'), price: 6.8 },
          { name: 'Nutella', price: 7.5 },
          { name: 'Pistachio', price: 7.8 },
        ],
      },
      {
        id: 'affogato-traditionnel',
        title: t('Affogato traditionnel', 'Traditional affogato'),
        script: 'Tradición',
        items: [
          { name: t('Caramel vanille', 'Caramel vanilla'), price: 7.5 },
          { name: 'Cheesecake', price: 8.5 },
          { name: 'Tiramisu', price: 8.5 },
          { name: 'Pistachio', price: 9.5 },
        ],
      },
      {
        id: 'chocolat',
        title: t('Chocolat chaud / glacé', 'Hot / iced chocolate'),
        script: 'Chocolate',
        items: [
          { name: t('Nature chantilly', 'Classic with whipped cream'), price: 7.5 },
          { name: 'Nutella', price: 9.5 },
          { name: 'Spéculoos', price: 9.5 },
          { name: 'Pistachio', price: 12.5 },
          { name: 'Nutella pistachio', price: 14.5 },
          { name: 'Nutella Spéculoos', price: 14.5 },
          { name: t('Nutella fruits secs', 'Nutella & nuts'), price: 15.5 },
          { name: 'Dubaï', price: 16.5 },
          { name: 'Catrina', note: catrinaTrio, price: 18.5 },
        ],
      },
      {
        id: 'ice-coffee',
        title: t('Ice coffee', 'Iced coffee'),
        script: 'Bien frío',
        items: [
          { name: t('Vanille', 'Vanilla'), price: 6.8 },
          { name: 'Caramel', price: 6.8 },
          { name: t('Noisette', 'Hazelnut'), price: 6.8 },
          { name: 'Spanish Latte', price: 6.8 },
          { name: 'Popcorn', price: 7.8 },
          { name: 'Blueberry', price: 7.8 },
          { name: 'Strawberry', price: 7.8 },
          { name: 'Nutella', price: 8.5 },
          { name: 'Pistachio', price: 9.5 },
        ],
      },
    ],
  },
  {
    id: 'drinks',
    label: t('Thés & jus', 'Teas & juices'),
    categories: [
      {
        id: 'chaudes',
        title: t('Boissons chaudes', 'Hot drinks'),
        script: 'Té',
        items: [
          { name: t('Thé à la menthe', 'Mint tea'), price: 3.5 },
          {
            name: t('Thé infusion', 'Herbal tea'),
            note: t('Verveine, thé noir, fruits rouges, camomille', 'Verbena, black tea, red berries, camomile'),
            price: 4,
          },
          { name: t('Thé Kuffi', 'Kuffi tea'), price: 4.2 },
          { name: t('Thé aux amandes', 'Tea with almonds'), price: 6.5 },
          { name: t('Thé aux pignons', 'Tea with pine nuts'), price: 7.8 },
          { name: t('Thé fruits secs', 'Tea with nuts'), price: 9.5 },
          {
            name: 'La Catrina',
            note: t('Thé, fruits secs, fruits de saison', 'Tea, nuts, seasonal fruit'),
            price: 14.5,
          },
        ],
      },
      {
        id: 'detox',
        title: t('Infusions détox', 'Detox infusions'),
        script: 'Hierbas',
        items: [
          {
            name: 'Green',
            note: t('Verveine, menthe, citron, gingembre', 'Verbena, mint, lemon, ginger'),
            price: 6.5,
          },
          {
            name: 'Relax',
            note: t('Thé vert, camomille, lavande, miel', 'Green tea, camomile, lavender, honey'),
            price: 7.5,
          },
          {
            name: 'Berry Detox',
            note: t('Fruits rouges, citron, anis', 'Red berries, lemon, anise'),
            price: 7.5,
          },
          {
            name: 'Energy',
            note: t('Cannelle, gingembre, anis, thé vert, citron', 'Cinnamon, ginger, anise, green tea, lemon'),
            price: 7.5,
          },
          {
            name: 'Golden Thé',
            note: t('Verveine, citron, camomille, gingembre, cannelle', 'Verbena, lemon, camomile, ginger, cinnamon'),
            price: 8.5,
          },
        ],
      },
      {
        id: 'jus',
        title: t('Jus frais', 'Fresh juices'),
        script: 'Jugos',
        items: [
          { name: t('Citronnade', 'Lemonade'), price: 5.8 },
          { name: 'Orange', price: 6.8 },
          { name: t('Fraise', 'Strawberry'), price: 7.8 },
          { name: t('Banane', 'Banana'), price: 9.5 },
          { name: t('Citronnade aux amandes', 'Almond lemonade'), price: 9.5 },
          { name: t('Citronnade au sorbet', 'Lemonade with sorbet'), price: 9.5 },
        ],
      },
      {
        id: 'mixte',
        title: t('Jus mixtes', 'Mixed juices'),
        script: 'Mezclas',
        items: [
          { name: t('Fraise banane', 'Strawberry banana'), price: 11.5 },
          { name: t('Kiwi banane', 'Kiwi banana'), price: 12.5 },
          { name: t('Banane dattes', 'Banana & dates'), price: 12.5 },
          { name: t('Banane & fruits secs', 'Banana & nuts'), price: 13.5 },
          { name: t('Banane, dattes & fruits secs', 'Banana, dates & nuts'), price: 15.5 },
          {
            name: 'Sportif',
            note: t('Banane, dattes, fruits secs, chia, flocons d’avoine', 'Banana, dates, nuts, chia, oat flakes'),
            price: 17.5,
          },
        ],
      },
      {
        id: 'boissons',
        title: t('Boissons', 'Soft drinks'),
        script: 'Bebidas',
        items: [
          { name: t('Eau 0,5 L', 'Water 0.5 L'), price: 1.8 },
          { name: t('Eau 1 L', 'Water 1 L'), price: 3.2 },
          { name: t('Eau gazeuse', 'Sparkling water'), price: 3.5 },
          { name: 'Soda', price: 4 },
          { name: 'Orangina', price: 4.5 },
          { name: t('Boisson énergétique', 'Energy drink'), price: 9 },
        ],
      },
    ],
  },
  {
    id: 'shakes',
    label: t('Mojitos & shakes', 'Mojitos & shakes'),
    categories: [
      {
        id: 'mojitos',
        title: t('Mojitos', 'Mojitos'),
        script: 'Mojitos',
        items: [
          { name: 'Virgin', price: 9.5 },
          { name: 'Strawberry', price: 11.5 },
          { name: 'Blueberry', price: 11.5 },
          { name: 'Kiwi', price: 11.5 },
          { name: t('Ananas, kiwi', 'Pineapple, kiwi'), price: 13.5 },
          { name: t('Mangue, ananas', 'Mango, pineapple'), price: 14.5 },
          { name: t('Fraise, framboise', 'Strawberry, raspberry'), price: 14.5 },
          { name: t('Litchi, fruits rouges', 'Lychee, red berries'), price: 14.5 },
          { name: 'Power Mojito', price: 14.5 },
        ],
      },
      {
        id: 'cocktails',
        title: t('Cocktails', 'Cocktails'),
        script: 'Cócteles',
        items: [
          { name: 'Paradise', note: t('Mangue, citron, Sprite, glace', 'Mango, lemon, Sprite, ice cream'), price: 14.5 },
          {
            name: 'Dragon Paradise',
            note: t('Fruit du dragon, citron, Sprite', 'Dragon fruit, lemon, Sprite'),
            price: 14.5,
          },
          {
            name: 'Sunset',
            note: t('Orange, ananas, fruits de la passion', 'Orange, pineapple, passion fruit'),
            price: 15.5,
          },
          { name: 'Green', note: t('Kiwi, pomme, citron, Sprite', 'Kiwi, apple, lemon, Sprite'), price: 15.5 },
          { name: 'Blueberry', note: t('Myrtille, citron, Sprite', 'Blueberry, lemon, Sprite'), price: 15.5 },
        ],
      },
      {
        id: 'smoothies',
        title: t('Smoothies', 'Smoothies'),
        script: 'Licuados',
        items: [
          { name: 'Piña Colada', note: t('Noix de coco, ananas', 'Coconut, pineapple'), price: 12.5 },
          { name: 'Strawberry', price: 12.5 },
          { name: 'Mixed Berry', price: 13.5 },
          { name: 'Paradise', note: t('Litchi, fruits rouges', 'Lychee, red berries'), price: 14.5 },
          { name: 'Sunrise', note: t('Pastèque, fraise, menthe', 'Watermelon, strawberry, mint'), price: 14.5 },
          { name: 'Sunset', note: t('Pêche, melon, fraise', 'Peach, melon, strawberry'), price: 16.5 },
          {
            name: 'Exotique',
            note: t('Mangue, ananas, fruits de la passion', 'Mango, pineapple, passion fruit'),
            price: 16.5,
          },
        ],
      },
      {
        id: 'healthy',
        title: t('Healthy smoothies', 'Healthy smoothies'),
        script: 'Sano',
        items: [
          {
            name: 'Green Detox',
            note: t('Concombre, citron, menthe, pomme', 'Cucumber, lemon, mint, apple'),
            price: 12.5,
          },
          {
            name: 'Pink Healthy',
            note: t('Fraise, banane, yaourt nature, graines de chia', 'Strawberry, banana, plain yoghurt, chia seeds'),
            price: 14.5,
          },
          {
            name: 'Fresh Detox',
            note: t('Banane, kiwi, pomme verte, citron, menthe', 'Banana, kiwi, green apple, lemon, mint'),
            price: 16.5,
          },
          {
            name: t('Protéine Detox', 'Protein Detox'),
            note: t('Dattes, miel, banane, sésame, cannelle', 'Dates, honey, banana, sesame, cinnamon'),
            price: 16.5,
          },
        ],
      },
      {
        id: 'milkshake',
        title: t('Milkshakes', 'Milkshakes'),
        script: 'Batidos',
        items: [
          { name: t('Vanille', 'Vanilla'), price: 8.5 },
          { name: 'Nutella', price: 12.5 },
          { name: 'Spéculoos', price: 12.5 },
          { name: 'Kinder Bueno', price: 13.5 },
          { name: 'Caramel Snickers', price: 13.5 },
          { name: 'Nutella Oreo', price: 14.5 },
          { name: 'Pistachio', price: 14.5 },
          { name: t('Caramel banane', 'Caramel banana'), price: 14.5 },
          { name: 'Nutella Spéculoos', price: 16.5 },
        ],
      },
      {
        id: 'frappuccino',
        title: t('Frappuccino', 'Frappuccino'),
        script: 'Frappé',
        items: [
          { name: 'Nutella', price: 12.5 },
          { name: 'Spéculoos', price: 12.5 },
          { name: 'Kinder Bueno', price: 13.5 },
          { name: 'Nutella Oreo', price: 14.5 },
          { name: 'Caramel Snickers', price: 14.5 },
          { name: 'Pistachio', price: 14.5 },
          { name: t('Noisette', 'Hazelnut'), price: 14.5 },
          { name: 'Nutella Brownie', price: 14.5 },
          { name: 'Nutella Spéculoos', price: 16.5 },
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
          { name: 'Nutella', price: 9.5 },
          { name: 'Spéculoos', price: 9.5 },
          { name: 'Oreo', price: 9.5 },
          { name: t('Framboise', 'Raspberry'), price: 9.5 },
          { name: t('Noisette', 'Hazelnut'), price: 9.5 },
          { name: t('Pistache', 'Pistachio'), price: 10.5 },
          { name: 'Dubaï', price: 12.5 },
          { name: 'Mini cheesecake', price: 6.5 },
          { name: 'Red Velvet', price: 9 },
        ],
      },
      {
        id: 'tiramisu',
        title: t('Tiramisu', 'Tiramisu'),
        script: 'Tiramisú',
        items: [
          { name: 'Nutella', price: 8.5 },
          { name: 'Spéculoos', price: 8.5 },
          { name: 'Oreo', price: 8.5 },
          { name: 'Pistachio', price: 10.5 },
          { name: t('Noisette', 'Hazelnut'), price: 10.5 },
          { name: 'Dubaï', price: 12.5 },
        ],
      },
      {
        id: 'san-sebastian',
        title: t('San Sebastián', 'San Sebastián cheesecake'),
        script: 'Vasco',
        items: [
          { name: t('Nature', 'Classic'), price: 8.5 },
          { name: 'Nutella', price: 12.5 },
          { name: 'Spéculoos', price: 12.5 },
          { name: t('Pistache', 'Pistachio'), price: 13.5 },
          { name: 'Nutella Spéculoos', price: 14.5 },
          { name: 'Nutella Pistachio', price: 15.5 },
          { name: 'Dubaï', price: 16.5 },
        ],
      },
      {
        id: 'brownies',
        title: t('Brownies', 'Brownies'),
        script: 'Brownies',
        items: [
          { name: 'Nutella', price: 8.5 },
          { name: 'Spéculoos', price: 8.5 },
          { name: 'Pistachio', price: 9.5 },
          { name: 'Dubaï', price: 11.5 },
        ],
      },
      {
        id: 'fondant',
        title: t('Fondants', 'Fondants'),
        script: 'Chocolate',
        note: withIceCream,
        items: [
          { name: t('Chocolat', 'Chocolate'), price: 8 },
          { name: 'Nutella', price: 9.5 },
          { name: 'Pistachio', price: 10.5 },
          { name: t('Noisette', 'Hazelnut'), price: 10.5 },
        ],
      },
      {
        id: 'cookies',
        title: t('Cookies', 'Cookies'),
        script: 'Galletas',
        items: [
          { name: t('Cookie classique', 'Classic cookie'), price: 4.5 },
          { name: t('Cookie chocolat', 'Chocolate cookie'), price: 5.5 },
          { name: 'Cookie Spéculoos', price: 5.5 },
          { name: 'Cookie Pistachio', price: 6.5 },
          { name: 'Healthy cookie', price: 6.5 },
        ],
      },
      {
        id: 'jwajem',
        title: t('Jwajem', 'Jwajem'),
        script: 'Copa',
        items: [
          { name: 'Mini', price: 10.5 },
          { name: 'Big', price: 13.5 },
          { name: 'Catrina', price: 15.5 },
        ],
      },
      {
        id: 'glace',
        title: t('Glaces', 'Ice cream'),
        script: 'Helado',
        items: [
          { name: 'Twins', note: t('2 boules de glace au choix', '2 scoops of your choice'), price: 7.5 },
          { name: 'Trio', note: t('3 boules de glace au choix', '3 scoops of your choice'), price: 9.5 },
          {
            name: 'Banana Split',
            note: t('3 boules de glace, banane, sauce', '3 scoops, banana, sauce'),
            price: 12.8,
          },
          { name: 'La Catrina', price: 16.5 },
        ],
      },
      {
        id: 'yaourt',
        title: t('Yaourt glacé', 'Frozen yoghurt'),
        script: 'Yogur',
        items: [
          { name: 'Nutella', price: 12.5 },
          { name: 'Spéculoos', price: 12.5 },
          { name: t('Noisette', 'Hazelnut'), price: 13.5 },
          { name: t('Caramel cookies', 'Caramel cookies'), price: 13.5 },
          { name: 'Pistachio', price: 14 },
          { name: t('Nutella fruits secs', 'Nutella & nuts'), price: 14.5 },
          { name: 'Nutella pistache', price: 16.5 },
          { name: t('Pistache framboise', 'Pistachio raspberry'), price: 16.5 },
        ],
      },
    ],
  },
  {
    id: 'crepes',
    label: t('Crêpes & gaufres', 'Crêpes & waffles'),
    categories: [
      {
        id: 'crepes-sucrees',
        title: t('Crêpes sucrées', 'Sweet crêpes'),
        script: 'Crepas',
        items: [
          { name: 'Nutella', price: 12.5 },
          { name: 'Spéculoos', price: 12.5 },
          { name: t('Caramel banane', 'Caramel banana'), price: 14.5 },
          { name: t('Nutella banane', 'Nutella banana'), price: 14.5 },
          { name: 'Nutella Brownie', price: 14.5 },
          { name: t('Nutella noisette', 'Nutella hazelnut'), price: 14.5 },
          { name: 'Nutella Spéculoos', price: 14.5 },
          { name: t('Nutella fruits', 'Nutella & fruit'), price: 14.5 },
          { name: t('Nutella fruits secs', 'Nutella & nuts'), price: 16.5 },
          { name: 'Nutella Pistachio', price: 16.5 },
          { name: 'Dubaï', price: 18.5 },
          { name: 'La Catrina', note: catrinaTrio, price: 19.5 },
        ],
      },
      {
        id: 'gaufres',
        title: t('Gaufres', 'Waffles'),
        script: 'Gofres',
        items: [
          { name: 'Nutella', price: 13.5 },
          { name: 'Spéculoos', price: 13.5 },
          { name: t('Nutella banane', 'Nutella banana'), price: 15.5 },
          { name: 'Nutella Brownie', price: 15.5 },
          { name: t('Nutella noisette', 'Nutella hazelnut'), price: 15.5 },
          { name: 'Nutella Spéculoos', price: 15.5 },
          { name: t('Nutella fruits', 'Nutella & fruit'), price: 15.5 },
          { name: t('Nutella fruits secs', 'Nutella & nuts'), price: 17.5 },
          { name: 'Nutella Pistachio', price: 17.5 },
          { name: 'Dubaï', price: 19.5 },
          { name: 'La Catrina', note: catrinaTrio, price: 20.5 },
        ],
      },
      {
        id: 'pancakes',
        title: t('Pancakes', 'Pancakes'),
        script: 'Pancakes',
        note: withIceCream,
        items: [
          { name: 'Nutella', price: 14.5 },
          { name: 'Spéculoos', price: 14.5 },
          { name: t('Nutella banane', 'Nutella banana'), price: 16.5 },
          { name: 'Nutella Brownie', price: 16.5 },
          { name: t('Nutella noisette', 'Nutella hazelnut'), price: 16.5 },
          { name: 'Nutella Spéculoos', price: 16.5 },
          { name: t('Nutella fruits', 'Nutella & fruit'), price: 16.5 },
          { name: t('Nutella fruits secs', 'Nutella & nuts'), price: 18.5 },
          { name: 'Nutella Pistachio', price: 18.5 },
          { name: 'Dubaï', price: 20.5 },
          { name: 'La Catrina', note: catrinaTrio, price: 21.5 },
        ],
      },
      {
        id: 'crepes-salees',
        title: t('Crêpes salées', 'Savoury crêpes'),
        script: 'Saladas',
        items: [
          { name: t('Fromage', 'Cheese'), price: 9.5 },
          { name: t('Thon fromage', 'Tuna & cheese'), price: 12.5 },
          { name: t('Jambon fromage', 'Ham & cheese'), price: 12.5 },
          {
            name: 'Crispy',
            note: t('Fromage, poulet pané, oignons caramélisés', 'Cheese, breaded chicken, caramelised onions'),
            price: 13.5,
          },
          {
            name: 'Pollo',
            note: t(
              'Fromage, poulet, champignons, oignons caramélisés',
              'Cheese, chicken, mushrooms, caramelised onions',
            ),
            price: 14.5,
          },
          {
            name: t('Tunisienne', 'Tunisian'),
            note: t('Fromage, harissa, thon, olives, œuf, oignons', 'Cheese, harissa, tuna, olives, egg, onions'),
            price: 14.5,
          },
          {
            name: t('Mexicaine', 'Mexican'),
            note: t(
              'Fromage, poulet mexicain, oignons caramélisés, harissa',
              'Cheese, Mexican chicken, caramelised onions, harissa',
            ),
            price: 14.5,
          },
          {
            name: 'Shrimp',
            note: t('Fromage, crevettes panées, oignons caramélisés', 'Cheese, breaded shrimp, caramelised onions'),
            price: 16.5,
          },
          {
            name: t('4 fromages', '4 cheeses'),
            note: t(
              'Sauce blanche, mozzarella, gruyère, parmesan, bleu',
              'White sauce, mozzarella, gruyère, parmesan, blue cheese',
            ),
            price: 17.5,
          },
        ],
      },
      {
        id: 'crepes-fourrees',
        title: t('Crêpes fourrées', 'Stuffed crêpes'),
        script: 'Rellenas',
        items: [
          { name: 'Chicken', price: 23.5 },
          { name: t('Mexicaine', 'Mexican'), price: 24.5 },
          { name: 'Bolognaise', price: 24.5 },
          { name: t('Roulé libanais', 'Lebanese roll'), price: 26.5 },
          { name: t('Fruits de mer', 'Seafood'), price: 28.5 },
        ],
      },
    ],
  },
  {
    id: 'savory',
    label: t('Salé', 'Savoury'),
    categories: [
      {
        id: 'pizza',
        title: t('Pizzas', 'Pizzas'),
        script: 'Pizza',
        items: [
          { name: 'Margherita', price: 14.5 },
          { name: t('Thon fromage', 'Tuna & cheese'), price: 18.5 },
          {
            name: t('À l’anchois', 'Anchovy'),
            note: t(
              'Sauce tomate, mozzarella, filets d’anchois, olives noires, câpres, oignons caramélisés',
              'Tomato sauce, mozzarella, anchovy fillets, black olives, capers, caramelised onions',
            ),
            price: 18.5,
          },
          { name: 'Pepperoni', price: 18.5 },
          {
            name: t('4 saisons', '4 seasons'),
            note: t(
              'Sauce tomate, mozzarella, jambon, thon, oignons, poivron, champignons',
              'Tomato sauce, mozzarella, ham, tuna, onions, pepper, mushrooms',
            ),
            price: 19.8,
          },
          {
            name: 'Bolognaise',
            note: t(
              'Sauce tomate, mozzarella, bolognaise, oignons, poivron',
              'Tomato sauce, mozzarella, bolognese, onions, pepper',
            ),
            price: 22.5,
          },
          {
            name: t('4 fromages', '4 cheeses'),
            note: t(
              'Sauce blanche, mozzarella, gruyère, parmesan, bleu',
              'White sauce, mozzarella, gruyère, parmesan, blue cheese',
            ),
            price: 22.5,
          },
          {
            name: t('Mexicaine', 'Mexican'),
            note: t(
              'Sauce tomate, mozzarella, poulet mexicain, oignons, piment de Cayenne',
              'Tomato sauce, mozzarella, Mexican chicken, onions, cayenne pepper',
            ),
            price: 23.5,
          },
          {
            name: t('Sicilienne', 'Sicilian'),
            note: t(
              'Sauce blanche, mozzarella, fromage sicilien, ricotta, jambon fumé',
              'White sauce, mozzarella, Sicilian cheese, ricotta, smoked ham',
            ),
            price: 23.5,
          },
          {
            name: t('Italienne', 'Italian'),
            note: t(
              'Sauce tomate, mozzarella, crevettes sautées, oignons caramélisés, légumes',
              'Tomato sauce, mozzarella, sautéed shrimp, caramelised onions, vegetables',
            ),
            price: 24.5,
          },
          {
            name: t('Fruits de mer', 'Seafood'),
            note: t(
              'Sauce tomate, mozzarella, fruits de mer, oignons caramélisés',
              'Tomato sauce, mozzarella, seafood, caramelised onions',
            ),
            price: 29.5,
          },
        ],
      },
      {
        id: 'pizza-tranche',
        title: t('Pizza à la part', 'Pizza by the slice'),
        script: 'Rebanada',
        items: [
          { name: t('Thon', 'Tuna'), price: 5 },
          { name: t('Mexicaine', 'Mexican'), price: 6 },
        ],
      },
      {
        id: 'burger',
        title: t('Burgers', 'Burgers'),
        script: 'Burgers',
        items: [
          {
            name: 'Crispy chicken burger',
            note: t(
              'Poulet pané, oignons caramélisés, laitue, tomate, sauce fromage, sauce tartare, sauce BBQ',
              'Breaded chicken, caramelised onions, lettuce, tomato, cheese sauce, tartare sauce, BBQ sauce',
            ),
            price: 14.5,
          },
          {
            name: 'French burger',
            note: t(
              'Viande de bœuf, fromage raclette, cornichons, oignons caramélisés, sauce hollandaise',
              'Beef, raclette cheese, gherkins, caramelised onions, hollandaise sauce',
            ),
            price: 17.5,
          },
          {
            name: t('Américain burger', 'American burger'),
            note: t(
              'Steak haché, laitue, fromage raclette, cornichons, oignons caramélisés, bacon, sauce BBQ',
              'Beef patty, lettuce, raclette cheese, gherkins, caramelised onions, bacon, BBQ sauce',
            ),
            price: 19.5,
          },
          {
            name: 'Catrina burger',
            note: t(
              'Double steak haché, fromage raclette, oignons caramélisés, champignons, œuf au plat, bacon',
              'Double beef patty, raclette cheese, caramelised onions, mushrooms, fried egg, bacon',
            ),
            price: 26.5,
          },
        ],
      },
      {
        id: 'pasta',
        title: t('Pâtes', 'Pasta'),
        script: 'Pasta',
        items: [
          { name: 'Arrabiata', price: 24.5 },
          { name: t('Mexicaine', 'Mexican'), price: 24.5 },
          { name: t('Penne poulet champignons', 'Penne, chicken & mushrooms'), price: 27.5 },
          { name: 'Bolognaise', price: 27.5 },
          { name: t('4 fromages', '4 cheeses'), price: 28.5 },
          { name: t('Poulet farci', 'Stuffed chicken'), price: 28.5 },
          { name: t('Fruits de mer', 'Seafood'), price: 36.5 },
        ],
      },
      {
        id: 'salade',
        title: t('Salades', 'Salads'),
        script: 'Ensaladas',
        items: [
          {
            name: t('César', 'Caesar'),
            note: t(
              'Laitue, tomate, poulet, fromage, sauce César, sauce balsamique, oignons séchés, croûtons',
              'Lettuce, tomato, chicken, cheese, Caesar dressing, balsamic, crispy onions, croutons',
            ),
            price: 19.5,
          },
          {
            name: t('Fraîcheur', 'Fraîcheur'),
            note: t(
              'Laitue, tomate, fromage, crevettes, sauce balsamique, vinaigrette aux agrumes, fruits de saison, fromage sicilien',
              'Lettuce, tomato, cheese, shrimp, balsamic, citrus vinaigrette, seasonal fruit, Sicilian cheese',
            ),
            price: 21,
          },
          {
            name: 'Sportif',
            note: t(
              'Laitue, tomate, fromage, poulet, flocons d’avoine, chia, ricotta, fruits secs',
              'Lettuce, tomato, cheese, chicken, oat flakes, chia, ricotta, nuts',
            ),
            price: 24,
          },
          {
            name: 'Crispy',
            note: t(
              'Laitue, tomate, roulé de poulet pané, fromage, piments, légumes grillés, parmesan',
              'Lettuce, tomato, breaded chicken roll, cheese, chillies, grilled vegetables, parmesan',
            ),
            price: 25,
          },
        ],
      },
      {
        id: 'chapata',
        title: t('Chapata', 'Chapata'),
        script: 'Pan',
        items: [
          { name: t('Poulet', 'Chicken'), price: 11.5 },
          { name: t('Poulet pané', 'Breaded chicken'), price: 12.5 },
          { name: t('Mexicaine', 'Mexican'), price: 12.5 },
          { name: 'Cordon bleu', price: 12.5 },
        ],
      },
      {
        id: 'tacos',
        title: t('Tacos', 'Tacos'),
        script: 'Tacos',
        items: [
          { name: t('Poulet', 'Chicken'), price: 11.5 },
          { name: t('Poulet pané', 'Breaded chicken'), price: 12.5 },
          { name: t('Mexicaine', 'Mexican'), price: 12.5 },
          { name: 'Cordon bleu', price: 12.5 },
          { name: 'Bolognaise', price: 13.5 },
        ],
      },
      {
        id: 'tacos-gratine',
        title: t('Tacos gratiné', 'Tacos gratin'),
        script: 'Gratinado',
        items: [
          { name: t('Poulet', 'Chicken'), price: 12.5 },
          { name: t('Poulet pané', 'Breaded chicken'), price: 13.5 },
          { name: t('Mexicaine', 'Mexican'), price: 13.5 },
          { name: 'Cordon bleu', price: 13.5 },
          { name: 'Bolognaise', price: 14.5 },
        ],
      },
      {
        id: 'cornet',
        title: t('Cornet libanais', 'Lebanese wrap'),
        script: 'Cono',
        items: [
          { name: t('Poulet', 'Chicken'), price: 11.5 },
          { name: t('Poulet pané', 'Breaded chicken'), price: 12.5 },
          { name: t('Mexicaine', 'Mexican'), price: 12.5 },
          { name: 'Cordon bleu', price: 12.5 },
          { name: 'Bolognaise', price: 13.5 },
        ],
      },
      {
        id: 'makloub',
        title: t('Makloub', 'Makloub'),
        script: 'Makloub',
        items: [
          { name: t('Makloub thon', 'Tuna makloub'), price: 11.5 },
          { name: t('Makloub escalope', 'Escalope makloub'), price: 12.5 },
          { name: t('Makloub escalope panée', 'Breaded escalope makloub'), price: 12.5 },
          { name: t('Makloub kebab', 'Kebab makloub'), price: 13.5 },
        ],
      },
      {
        id: 'box',
        title: t('Nos box', 'Our boxes'),
        script: 'Para compartir',
        items: [
          {
            name: t('Box Étudiant', 'Student box'),
            note: t(
              '2 sodas, tacos poulet, fried chicken, crêpe roulée au jambon, frites, sauce fromage',
              '2 sodas, chicken tacos, fried chicken, ham crêpe roll, fries, cheese sauce',
            ),
            price: 38,
          },
          {
            name: 'Catrina Box',
            note: t(
              '2 sodas, tacos mexicain, chapata poulet, frites, fried chicken, crêpe sucrée, fruits de saison',
              '2 sodas, Mexican tacos, chicken chapata, fries, fried chicken, sweet crêpe, seasonal fruit',
            ),
            price: 48,
          },
        ],
      },
      {
        id: 'kids',
        title: t('Menu kids', 'Kids’ menu'),
        script: 'Niños',
        items: [
          { name: 'Macha', note: t('Soda, mini pizza, frites', 'Soda, mini pizza, fries'), price: 15.5 },
          { name: 'Stitch', note: t('Soda, nuggets, frites', 'Soda, nuggets, fries'), price: 17.5 },
          { name: 'Labubu', note: t('Soda, burger, frites', 'Soda, burger, fries'), price: 22 },
        ],
      },
    ],
  },
];
