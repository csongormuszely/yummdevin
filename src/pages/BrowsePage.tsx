import type { FC } from 'react';
import { useRef, useState, useEffect } from 'react';
import { Box, Container, Flex, Image, Text, IconButton, Heading, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

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

/**
 * BrowsePage Component
 * Displays a horizontally scrollable list of burger items with navigation controls.
 * Implements responsive design and smooth scrolling behavior.
 */
const BrowsePage: FC = () => {
  // Ref for the scrollable container element
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // State for controlling navigation button visibility
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /**
   * Updates the scroll button states based on current scroll position
   * Uses a dynamic buffer calculation to ensure precise scroll limits
   * Buffer is calculated as max(2px, 0.5% of total width) for consistent behavior across screen sizes
   */
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const visibleBurgers = Math.floor(clientWidth / (clientWidth / 4));
      // Calculate buffer as 0.5% of scroll width, minimum 2px
      const buffer = Math.max(2, scrollWidth * 0.005);
      const remainingScroll = scrollWidth - (scrollLeft + clientWidth);

      // Debug logging for responsive testing
      console.log('Responsive Debug:', {
        viewport: { width: viewportWidth, height: viewportHeight },
        container: { scrollLeft, clientWidth, scrollWidth, visibleBurgers, totalBurgers: burgers.length },
        scroll: { buffer, remainingScroll, canScrollRight: remainingScroll > buffer }
      });

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(remainingScroll > buffer);
    }
  };

  useEffect(() => {
    updateScrollButtons();
  }, []);

  /**
   * Event handler for scroll events
   * Updates button states whenever the user scrolls the container
   */
  const handleScroll = () => {
    updateScrollButtons();
  };

  /**
   * Calculates the scroll increment based on container width
   * Returns one-fourth of the container width to ensure smooth transitions
   * between visible burger items
   * @returns {number} Scroll increment in pixels
   */
  const calculateScrollIncrement = () => {
    if (scrollContainerRef.current) {
      return scrollContainerRef.current.clientWidth / 4;
    }
    return 300; // fallback value for safety
  };

  /**
   * Handles scrolling to the left
   * Uses smooth scrolling behavior for a better user experience
   */
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const increment = calculateScrollIncrement();
      scrollContainerRef.current.scrollBy({
        left: -increment,
        behavior: 'smooth'
      });
    }
  };

  /**
  * Handles scrolling to the right
  * Uses smooth scrolling behavior for a better user experience
  */
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const increment = calculateScrollIncrement();
      scrollContainerRef.current.scrollBy({
        left: increment,
        behavior: 'smooth'
      });
    }
  };

  /**
   * Renders the BrowsePage component
   * Implements a responsive grid layout with:
   * - Mobile: 1 burger per view
   * - Tablet: 2 burgers per view
   * - Desktop: 4 burgers per view
   * Includes smooth scrolling navigation and dynamic button states
   */
  return (
    <Container maxW="container.xl" pt={4}>
      <VStack spacing={12} align="stretch">
        {/* Burgers Section */}
        <Box>
          <Heading as="h2" size="lg" mb={4} px={{ base: 8, md: 0 }}>
            Burgers
          </Heading>
          <Box position="relative" maxW="1200px" mx="auto" px={{ base: 8, md: 0 }}>
            <Flex
              ref={scrollContainerRef}
              overflowX="hidden"
              gap={4}
              py={4}
              w="100%"
              onScroll={handleScroll}
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                scrollbarWidth: 'none'
              }}
            >
              {burgers.map((burger) => (
                <Box
                  key={burger.id}
                  minW={{ base: "calc(100% - 16px)", sm: "calc(50% - 16px)", md: "calc(25% - 12px)" }}
                  maxW={{ base: "calc(100% - 16px)", sm: "calc(50% - 16px)", md: "calc(25% - 12px)" }}
                  textAlign="center"
                  p={4}
                >
                  <Image
                    src={burger.image}
                    alt={burger.name}
                    w="100%"
                    h={{ base: "200px", md: "240px" }}
                    objectFit="cover"
                    borderRadius="xl"
                    mb={3}
                  />
                  <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
                    {burger.name}
                  </Text>
                  <Text fontSize={{ base: "md", md: "lg" }} color="orange.500" fontWeight="semibold">
                    {burger.price} CHF
                  </Text>
                </Box>
              ))}
            </Flex>

            <IconButton
              aria-label="Scroll left"
              icon={<ChevronLeftIcon boxSize={{ base: 6, md: 8 }} />}
              position="absolute"
              left={{ base: -4, md: -20 }}
              top="50%"
              transform="translateY(-50%)"
              onClick={scrollLeft}
              isDisabled={!canScrollLeft}
              colorScheme="orange"
              size={{ base: "md", md: "lg" }}
              fontSize={{ base: "24px", md: "30px" }}
              w={{ base: "40px", md: "50px" }}
              h={{ base: "40px", md: "50px" }}
              zIndex={2}
              boxShadow="lg"
            />
          </Box>
        </Box>

        {/* Pizze Section */}
        <Box>
          <Heading as="h2" size="lg" mb={4} px={{ base: 8, md: 0 }}>
            Pizze
          </Heading>
          <Box position="relative" maxW="1200px" mx="auto" px={{ base: 8, md: 0 }}>
            <Flex
              overflowX="hidden"
              gap={4}
              py={4}
              w="100%"
              onScroll={handleScroll}
              css={{
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none'
              }}
            >
              {pizze.map((item) => (
                <Box
                  key={item.id}
                  minW={{ base: "calc(100% - 16px)", sm: "calc(50% - 16px)", md: "calc(25% - 12px)" }}
                  maxW={{ base: "calc(100% - 16px)", sm: "calc(50% - 16px)", md: "calc(25% - 12px)" }}
                  textAlign="center"
                  p={4}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    w="100%"
                    h={{ base: "200px", md: "240px" }}
                    objectFit="cover"
                    borderRadius="xl"
                    mb={3}
                  />
                  <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
                    {item.name}
                  </Text>
                  <Text fontSize={{ base: "md", md: "lg" }} color="orange.500" fontWeight="semibold">
                    {item.price} CHF
                  </Text>
                </Box>
              ))}
            </Flex>
            {/* Navigation buttons - same structure as burgers section */}
          </Box>
        </Box>

        {/* Sides Section */}
        <Box>
          <Heading as="h2" size="lg" mb={4} px={{ base: 8, md: 0 }}>
            Sides
          </Heading>
          <Box position="relative" maxW="1200px" mx="auto" px={{ base: 8, md: 0 }}>
            <Flex
              overflowX="hidden"
              gap={4}
              py={4}
              w="100%"
              onScroll={handleScroll}
              css={{
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none'
              }}
            >
              {sides.map((item) => (
                <Box
                  key={item.id}
                  minW={{ base: "calc(100% - 16px)", sm: "calc(50% - 16px)", md: "calc(25% - 12px)" }}
                  maxW={{ base: "calc(100% - 16px)", sm: "calc(50% - 16px)", md: "calc(25% - 12px)" }}
                  textAlign="center"
                  p={4}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    w="100%"
                    h={{ base: "200px", md: "240px" }}
                    objectFit="cover"
                    borderRadius="xl"
                    mb={3}
                  />
                  <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2}>
                    {item.name}
                  </Text>
                  <Text fontSize={{ base: "md", md: "lg" }} color="orange.500" fontWeight="semibold">
                    {item.price} CHF
                  </Text>
                </Box>
              ))}
            </Flex>
            {/* Navigation buttons - same structure as burgers section */}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
        <IconButton
          aria-label="Scroll right"
          icon={<ChevronRightIcon boxSize={{ base: 6, md: 8 }} />}
          position="absolute"
          right={{ base: -4, md: -20 }}
          top="50%"
          transform="translateY(-50%)"
          onClick={scrollRight}
          isDisabled={!canScrollRight}
          colorScheme="orange"
          size={{ base: "md", md: "lg" }}
          fontSize={{ base: "24px", md: "30px" }}
          w={{ base: "40px", md: "50px" }}
          h={{ base: "40px", md: "50px" }}
          zIndex={2}
          boxShadow="lg"
        />
      </Box>
    </Container>
  );
};

export default BrowsePage;
