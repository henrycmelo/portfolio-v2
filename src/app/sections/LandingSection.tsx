import { Box, HStack, VStack } from "@chakra-ui/react";
import { Text } from "@/design-system/atoms";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from "@/design-system/foundations";
import {
  IoArrowForward,
  IoChatbubble,
} from "react-icons/io5";
import FlexibleButton from "@/components/button/FlexibleButton";

export default function LandingSection() {
  return (
    <Box
      maxW={SIZES.container['5xl']}
      w="full"
      bg={COLORS.ui.containerBg}
      borderRadius={BORDERS.radius.md}
      boxShadow={SHADOWS.box.container}
      overflow="hidden"
      border={BORDERS.widths.thin}
      borderColor={COLORS.ui.containerBorder}
      mx="auto"
    >
      {/* Content Area */}
      <Box p={{
        base: SPACING.container.padding.base,
        md: SPACING.container.padding.md,
        lg: SPACING.container.padding.lg
      }}>
        <VStack gap={SPACING.component.gap.lg} align="flex-start">
          {/* Greeting */}
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes['2xl'],
              md: TYPOGRAPHY.sizes['3xl'],
              lg: TYPOGRAPHY.sizes['4xl']
            }}
            color={COLORS.brand.secondary}
            fontWeight={TYPOGRAPHY.weights.normal}
          >
            Hi, I'm Henry 👋
          </Text>

          {/* Main Headline */}
          <Text
            fontSize={{
              base: '4xl',
              md: '5xl',
              lg: '6xl'
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            lineHeight={TYPOGRAPHY.lineHeights.tight}
            color={COLORS.brand.primary}
          >
            <span style={{ color: COLORS.brand.accent }}>
              Designing Digital Solutions
            </span>{" "}
            for Healthcare, Fintech & Social Impact
          </Text>

          {/* Description */}
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.lg,
              md: TYPOGRAPHY.sizes.xl
            }}
            color={COLORS.brand.textMuted}
            lineHeight={TYPOGRAPHY.lineHeights.relaxed}
            maxW="2xl"
          >
            I help organizations deliver better patient outcomes, streamline
            financial workflows, and create accessible digital experiences.
          </Text>
          <HStack gap={SPACING.component.gap.md}>
            <FlexibleButton variant="solid" icon={IoArrowForward}>
              See my work
            </FlexibleButton>
            <FlexibleButton variant="outline" icon={IoChatbubble}>
              Let's talk
            </FlexibleButton>
          </HStack>
          
        </VStack>
      </Box>
    </Box>
  );
}
