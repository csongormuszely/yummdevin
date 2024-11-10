import React from 'react';
import { Box, Button, Container, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const imageSize = useBreakpointValue({ base: "180px", md: "240px" });
  const containerHeight = useBreakpointValue({ base: "500px", md: "600px" });
  const spacing = useBreakpointValue({ base: "10%", md: "15%" });

  return (
    <Container maxW="container.xl" pt={4}>
      {/* Header */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={8}
        flexDir={{ base: 'column', md: 'row' }}
        gap={{ base: 4, md: 0 }}
      >
        <Image src="/images/logo.png" alt="Yumm Logo" h="50px" />
        <Button
          colorScheme="orange"
          size="lg"
          onClick={() => navigate('/browse')}
        >
          Order Now
        </Button>
      </Flex>

      {/* Main Content */}
      <Box textAlign="center" my={8}>
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={4}>
          Yumm... get something good
        </Text>
        <Button
          colorScheme="orange"
          size="lg"
          onClick={() => navigate('/browse')}
          mb={8}
        >
          Order Now
        </Button>
      </Box>

      {/* Food Images in Diamond Pattern */}
      <Flex
        position="relative"
        h={containerHeight}
        justifyContent="center"
        alignItems="center"
        mx="auto"
        maxW="800px"
      >
        {/* Top Image */}
        <Image
          src="/images/burger.png"
          alt="Burger"
          position="absolute"
          top="40px"
          left="50%"
          transform="translateX(-50%)"
          w={imageSize}
          h={imageSize}
          objectFit="cover"
          borderRadius="xl"
        />
        {/* Left Image */}
        <Image
          src="/images/pizza.png"
          alt="Pizza"
          position="absolute"
          left={spacing}
          top="50%"
          transform="translateY(-50%)"
          w={imageSize}
          h={imageSize}
          objectFit="cover"
          borderRadius="xl"
        />
        {/* Right Image */}
        <Image
          src="/images/onion-rings.png"
          alt="Onion Rings"
          position="absolute"
          right={spacing}
          top="50%"
          transform="translateY(-50%)"
          w={imageSize}
          h={imageSize}
          objectFit="cover"
          borderRadius="xl"
        />
        {/* Bottom Image */}
        <Image
          src="/images/spicy-burger.png"
          alt="Spicy Burger"
          position="absolute"
          bottom="40px"
          left="50%"
          transform="translateX(-50%)"
          w={imageSize}
          h={imageSize}
          objectFit="cover"
          borderRadius="xl"
        />
      </Flex>
    </Container>
  );
};

export default MainPage;
