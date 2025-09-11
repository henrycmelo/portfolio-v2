import { Box, Text, HStack, VStack, Button } from '@chakra-ui/react'
import { IoArrowForward, IoChatbubble, IoClose, IoRemove, IoAdd } from 'react-icons/io5'

export default function LandingSection() {
  return (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      p={8}
    >
      {/* Browser Card */}
      <Box
        maxW="5xl"
        w="full"
        bg="brand.white"
        borderRadius="xl"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.15)"
        overflow="hidden"
        border="1px solid"
        borderColor="#e5e7eb"
      >
       

        {/* Content Area */}
        <Box p={{ base: 8, md: 12, lg: 16 }}>
          <VStack spacing={8} align="flex-start">
            {/* Greeting */}
            <Text 
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} 
              color="#212529"
              fontWeight="400"
            >
              Hi, I'm Henry 👋
            </Text>

            {/* Main Headline */}
            <Text 
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="700"
              lineHeight="1.2"
              color="#212529"
            >
              <Text as="span" color="#107c7c">Designing Digital Solutions</Text>
              {" "}for Healthcare, Fintech & Social Impact
            </Text>

            {/* Description */}
            <Text 
              fontSize={{ base: "lg", md: "xl" }}
              color="#6c757d"
              lineHeight="1.6"
              maxW="2xl"
            >
              I help organizations deliver better patient outcomes, streamline financial workflows, and create accessible digital experiences.
            </Text>

            {/* CTA Buttons */}
            <HStack spacing={4} pt={4}>
              <Button 
                bg="#107c7c"
                color="white"
                size="lg"
                rightIcon={<IoArrowForward />}
                _hover={{ bg: "#0d6a6a", transform: "translateY(-2px)" }}
                transition="all 0.2s"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
              >
                See my work
              </Button>
              
              <Button 
                variant="outline"
                borderColor="#ced4da"
                color="#495057"
                size="lg"
                rightIcon={<IoChatbubble />}
                _hover={{ 
                  bg: "#f8f9fa", 
                  borderColor: "#107c7c",
                  color: "#107c7c"
                }}
                transition="all 0.2s"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
              >
                Let's talk
              </Button>
            </HStack>

            {/* Status Bar */}
            <HStack spacing={6} pt={8} color="#6c757d" fontSize="sm">
              <HStack spacing={2}>
                <Box w={2} h={2} bg="#27ca3f" borderRadius="full" />
                <Text>Available for projects</Text>
              </HStack>
              <HStack spacing={2}>
                <Box w={2} h={2} bg="#107c7c" borderRadius="full" />
                <Text>Based in NYC</Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}