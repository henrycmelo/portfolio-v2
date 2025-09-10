// components/sections/LandingSection.tsx
import { Box, Text, HStack, VStack, Button } from '@chakra-ui/react'
import { IoArrowForward, IoChatbubble } from 'react-icons/io5'

export default function LandingSection() {
  return (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <VStack  align="flex-start" maxW="2xl">
        {/* Greeting */}
        <Text 
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} 
          color="brand.primary"
          fontWeight="400"
        >
          Hi, I'm Henry 👋
        </Text>

        {/* Main Headline */}
        <Text 
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          lineHeight="1.2"
          color="brand.accent"
        >
          <Text as="span" color="brand.primary">Designing Digital Solutions for</Text>
          {" "} Healthcare, Fintech & Social Impact
        </Text>

        {/* Description */}
        <Text 
          fontSize={{ base: "lg", md: "xl" }}
          color="brand.secondary"
          lineHeight="1.6"
          maxW="lg"
        >
          I help organizations deliver better patient outcomes, streamline financial workflows, and create accessible digital experiences.
        </Text>

        {/* CTA Buttons */}
        <HStack  pt={4} border={"1px solid red"}>
          <Button  disabled>Button</Button>
        </HStack>
      </VStack>
    </Box>
  )
}