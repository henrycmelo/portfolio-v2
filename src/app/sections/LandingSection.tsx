'use client';

import { useState, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Text, FadeIn, TextReveal, GoldGradientText, MagneticButton } from "@/design-system/atoms";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from "@/design-system/foundations";
import {
  IoArrowForward,
  IoChatbubble,
} from "react-icons/io5";
import { landingAPI, LandingPageData } from "@/api/landingAPI";
import { Button } from "@/design-system/atoms/Button/Button";
import { usePrefersReducedMotion } from "@/hooks/useScrollAnimation";

export default function LandingSection() {
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

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

  // Render headline with or without animation based on preference
  const renderHeadline = () => {
    const headlineContent = landingData.hero_title;

    if (prefersReducedMotion) {
      return (
        <GoldGradientText as="h1">
          {headlineContent}
        </GoldGradientText>
      );
    }

    return (
      <TextReveal
        type="word"
        staggerDelay={0.08}
        delay={0.3}
        as="h1"
      >
        {headlineContent}
      </TextReveal>
    );
  };

  return (
    <Box
      maxW={SIZES.container['5xl']}
      w="100%"
      bg={COLORS.ui.containerBg}
      borderRadius={BORDERS.radius.md}
      boxShadow={SHADOWS.box.container}
      overflow="hidden"
      border={BORDERS.widths.thin}
      borderColor={COLORS.ui.containerBorder}
      mx="auto"
      p={{
        base: SPACING.scale.md,
        md: SPACING.container.padding.md,
        lg: SPACING.container.padding.lg
      }}
    >
      <VStack
        gap={{
          base: SPACING.scale.md,
          md: SPACING.component.gap.lg
        }}
        align="flex-start"
        w="100%"
      >
        {/* Greeting - animated fade in */}
        <FadeIn direction="up" delay={0} duration={0.5}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.md,
              md: TYPOGRAPHY.sizes['xl'],
              lg: TYPOGRAPHY.sizes['2xl']
            }}
            color={COLORS.brand.secondary}
            fontWeight={TYPOGRAPHY.weights.normal}
            w="100%"
          >
            {landingData.hero_subtitle}
          </Text>
        </FadeIn>

        {/* Main Headline - with text reveal and gold gradient */}
        <Box
          fontSize={{
            base: TYPOGRAPHY.sizes['3xl'],
            md: TYPOGRAPHY.sizes['5xl'],
            lg: '6xl'
          }}
          fontWeight={TYPOGRAPHY.weights.bold}
          lineHeight={TYPOGRAPHY.lineHeights.tight}
          w="100%"
          wordBreak="break-word"
          overflowWrap="break-word"
          css={{
            // Gold gradient text styling
            background: 'linear-gradient(135deg, #B8962F 0%, #D4AF37 30%, #F4E5B8 50%, #D4AF37 70%, #B8962F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {renderHeadline()}
        </Box>

        {/* Description - animated fade in */}
        <FadeIn direction="up" delay={0.5} duration={0.5}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes.sm,
              md: TYPOGRAPHY.sizes.md
            }}
            color={COLORS.brand.textMuted}
            lineHeight={TYPOGRAPHY.lineHeights.relaxed}
            maxW="2xl"
            w="100%"
          >
            {landingData.hero_paragraph}
          </Text>
        </FadeIn>

        {/* Action Buttons - animated fade in */}
        <FadeIn direction="up" delay={0.7} duration={0.5}>
          <VStack gap={SPACING.scale.sm} align="flex-start" w="100%">
            <HStack
              gap={SPACING.component.gap.md}
              flexWrap="wrap"
              w="100%"
            >
              <MagneticButton distance={6}>
                <Button variant="primary" icon={IoArrowForward}>
                  See my work
                </Button>
              </MagneticButton>
              <MagneticButton distance={6}>
                <Button variant="outline" icon={IoChatbubble}>
                  Let&apos;s talk
                </Button>
              </MagneticButton>
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
        </FadeIn>
      </VStack>
    </Box>
  );
}
