import type { FC } from 'react';
import { Container, VStack } from '@chakra-ui/react';
import ScrollableSection from '../components/ScrollableSection';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const burgers: FoodItem[] = [
  { id: 1, name: 'BBQ Bacon Burger', price: 14, image: '/images/bbq-bacon-burger.png' },
  { id: 2, name: 'Classic Cheeseburger', price: 12, image: '/images/classic-cheeseburger.png' },
  { id: 3, name: 'Double XXL Bacon Burger', price: 18, image: '/images/double-xxl-burger.png' },
  { id: 4, name: 'Spicy Jalapeno Burger', price: 16, image: '/images/spicy-jalapeno-burger.png' },
  { id: 5, name: 'Mushroom Swiss Burger', price: 16, image: '/images/mushroom-swiss-burger.png' },
  { id: 6, name: 'Veggie Delight Burger', price: 14, image: '/images/veggie-delight-burger.png' },
];

const pizze: FoodItem[] = [
  { id: 1, name: 'Margherita', price: 12, image: '/images/margherita.png' },
  { id: 2, name: 'Quattro Formaggi', price: 14, image: '/images/quattro-formaggi.png' },
  { id: 3, name: 'Prosciutto Crudo', price: 16, image: '/images/prosciutto-crudo.png' },
  { id: 4, name: 'Pepperoni Passion', price: 16, image: '/images/pepperoni-passion.png' },
  { id: 5, name: 'Pizza Tonno', price: 16, image: '/images/pizza-tonno.png' },
  { id: 6, name: 'Vegetariana', price: 14, image: '/images/vegetariana.png' },
];

const sides: FoodItem[] = [
  { id: 1, name: 'French Fries', price: 6, image: '/images/french-fries.png' },
  { id: 2, name: 'Sweet Potato Fries', price: 8, image: '/images/sweet-potato-fries.png' },
  { id: 3, name: 'Curly Fries', price: 6, image: '/images/curly-fries.png' },
  { id: 4, name: 'Onion Rings', price: 8, image: '/images/onion-rings-side.png' },
  { id: 5, name: 'Mozzarella Sticks', price: 8, image: '/images/mozzarella-sticks.png' },
  { id: 6, name: 'Chicken Wings (BBQ)', price: 10, image: '/images/bbq-wings.png' },
  { id: 7, name: 'Chicken Wings (Spicy)', price: 10, image: '/images/spicy-wings.png' },
  { id: 8, name: 'Caprese Salad', price: 12, image: '/images/caprese-salad.png' },
  { id: 9, name: 'Panzanella Salad', price: 12, image: '/images/panzanella-salad.png' },
];

const BrowsePage: FC = () => {
  return (
    <Container maxW="container.xl" pt={4}>
      <VStack spacing={12} align="stretch">
        <ScrollableSection title="Burgers" items={burgers} />
        <ScrollableSection title="Pizze" items={pizze} />
        <ScrollableSection title="Sides" items={sides} />
      </VStack>
    </Container>
  );
};

export default BrowsePage;
