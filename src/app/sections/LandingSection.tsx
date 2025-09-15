import { Box, Text, HStack, VStack} from "@chakra-ui/react";
import {
  IoArrowForward,
  IoChatbubble,
} from "react-icons/io5";
import FlexibleButton from "@/components/button/FlexibleButton";

export default function LandingSection() {
  return (
    <Box
      maxW="5xl"
      w="full"
      bg="brand.white"
      borderRadius="md"
      boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      border="1px solid"
      borderColor="brand.divider"
      mx="auto"
    >
      {/* Content Area */}
      <Box p={{ base: 8, md: 12, lg: 16 }}>
        <VStack gap={6} align="flex-start">
          {/* Greeting */}
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            color="brand.secondary"
            fontWeight="400"
          >
            Hi, I'm Henry 👋
          </Text>

          {/* Main Headline */}
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="700"
            lineHeight="1.2"
            color="brand.primary"
          >
            <Text as="span" color="brand.accent">
              Designing Digital Solutions
            </Text>{" "}
            for Healthcare, Fintech & Social Impact
          </Text>

          {/* Description */}
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="brand.textMuted"
            lineHeight="1.6"
            maxW="2xl"
          >
            I help organizations deliver better patient outcomes, streamline
            financial workflows, and create accessible digital experiences.
          </Text>
          <HStack>
            <FlexibleButton variant="solid" icon={IoArrowForward}>
              See my work
            </FlexibleButton>
            <FlexibleButton variant="outline" icon={IoChatbubble}>
              Let's talk
            </FlexibleButton>
          </HStack>
          <Text fontSize="sm" color="#6c757d" fontStyle="italic" pt={2}>
            I enjoy prototyping and built this portfolio myself w/ React,
            Next.js & Chakra UI.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
