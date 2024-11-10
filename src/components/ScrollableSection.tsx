import { FC, useRef, useState, useEffect } from 'react';
import { Box, Flex, Image, Text, IconButton, Heading } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ScrollableSectionProps {
  title: string;
  items: FoodItem[];
}

const ScrollableSection: FC<ScrollableSectionProps> = ({ title, items }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const buffer = Math.max(2, scrollWidth * 0.005);
      const remainingScroll = scrollWidth - (scrollLeft + clientWidth);

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(remainingScroll > buffer);
    }
  };

  useEffect(() => {
    updateScrollButtons();
  }, []);

  const handleScroll = () => {
    updateScrollButtons();
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const increment = scrollContainerRef.current.clientWidth / 4;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -increment : increment,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box mb={8}>
      <Heading as="h2" size="lg" mb={4} px={{ base: 8, md: 0 }}>
        {title}
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
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none'
          }}
        >
          {items.map((item) => (
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

        <IconButton
          aria-label="Scroll left"
          icon={<ChevronLeftIcon boxSize={{ base: 6, md: 8 }} />}
          position="absolute"
          left={{ base: -4, md: -20 }}
          top="50%"
          transform="translateY(-50%)"
          onClick={() => scroll('left')}
          isDisabled={!canScrollLeft}
          colorScheme="orange"
          size={{ base: "md", md: "lg" }}
          fontSize={{ base: "24px", md: "30px" }}
          w={{ base: "40px", md: "50px" }}
          h={{ base: "40px", md: "50px" }}
          zIndex={2}
          boxShadow="lg"
        />

        <IconButton
          aria-label="Scroll right"
          icon={<ChevronRightIcon boxSize={{ base: 6, md: 8 }} />}
          position="absolute"
          right={{ base: -4, md: -20 }}
          top="50%"
          transform="translateY(-50%)"
          onClick={() => scroll('right')}
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
    </Box>
  );
};

export default ScrollableSection;
