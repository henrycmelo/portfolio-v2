'use client';

import { useState, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Text } from "@/design-system/atoms";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from "@/design-system/foundations";
import {
  IoArrowForward,
  IoChatbubble,
} from "react-icons/io5";
import { landingAPI, LandingPageData } from "@/api/landingAPI";
import {Button} from "@/design-system/atoms/Button/Button";

export default function LandingSection() {
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const data = await landingAPI.getLandingPageData();
        if (data && data.length > 0) {
          setLandingData(data[0]);
        }
      } catch (error) {
        console.error('Error fetching landing page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
  }, []);

  // If no data is available, don't render anything
  if (!landingData) {
    return null;
  }

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
              base: TYPOGRAPHY.sizes['lg'],
              md: TYPOGRAPHY.sizes['xl'],
              lg: TYPOGRAPHY.sizes['2xl']
            }}
            color={COLORS.brand.secondary}
            fontWeight={TYPOGRAPHY.weights.normal}
          >
            {landingData.hero_subtitle}
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
            {landingData.hero_title}
          </Text>

          {/* Description */}
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.sm,
              md: TYPOGRAPHY.sizes.md
            }}
            color={COLORS.brand.textMuted}
            lineHeight={TYPOGRAPHY.lineHeights.relaxed}
            maxW="2xl"
          >
            {landingData.hero_paragraph}
          </Text>

          {/* Action Buttons */}
          <VStack gap={SPACING.scale.sm} align="flex-start" w="full">
            <HStack gap={SPACING.component.gap.md}>
              <Button variant="primary" icon={IoArrowForward}>
                See my work
              </Button>
              <Button variant="outline" icon={IoChatbubble}>
                Let's talk
              </Button>
            </HStack>

            {/* Caption below buttons */}
            {landingData.hero_caption && (
              <Text
                fontSize={TYPOGRAPHY.sizes.xs}
                color={COLORS.brand.textMuted}
                fontStyle="italic"
                mt={SPACING.scale.xs}
              >
                {landingData.hero_caption}
              </Text>
            )}
          </VStack>

        </VStack>
      </Box>
    </Box>
  );
}
