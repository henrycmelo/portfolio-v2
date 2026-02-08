'use client';

import { useState, useEffect, useRef } from "react";
import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import { Text, FadeIn } from "@/design-system/atoms";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from "@/design-system/foundations";
import { aboutAPI, AboutData } from "@/api/aboutAPI";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion, useIsClient } from "@/hooks/useScrollAnimation";

// Separate component for parallax image - only mounts on client
function ParallaxImage({ imageUrl }: { imageUrl: string }) {
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const rawParallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const parallaxY = useSpring(rawParallaxY, { stiffness: 100, damping: 30 });

  return (
    <Box
      ref={imageRef}
      position="relative"
      w="full"
      h={{
        base: "400px",
        md: "500px",
        lg: "600px"
      }}
      borderRadius={BORDERS.radius.lg}
      overflow="hidden"
      border={BORDERS.widths.thin}
      borderColor={COLORS.ui.containerBorder}
      boxShadow={SHADOWS.box.container}
    >
      <motion.div
        style={{
          width: '100%',
          height: '120%',
          position: 'absolute',
          top: '-10%',
          y: parallaxY,
        }}
      >
        <Image
          src={imageUrl}
          alt="About me with my dog"
          objectFit="cover"
          w="full"
          h="full"
        />
      </motion.div>
    </Box>
  );
}

// Static image for SSR and reduced motion
function StaticImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Box
      position="relative"
      w="full"
      h={{
        base: "400px",
        md: "500px",
        lg: "600px"
      }}
      borderRadius={BORDERS.radius.lg}
      overflow="hidden"
      border={BORDERS.widths.thin}
      borderColor={COLORS.ui.containerBorder}
      boxShadow={SHADOWS.box.container}
    >
      <Box
        position="absolute"
        top="-10%"
        w="full"
        h="120%"
      >
        <Image
          src={imageUrl}
          alt="About me with my dog"
          objectFit="cover"
          w="full"
          h="full"
        />
      </Box>
    </Box>
  );
}

export default function AboutMeSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await aboutAPI.getAboutData();
        if (data && data.length > 0) {
          setAboutData(data[0]);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // If no data is available, don't render anything
  if (!aboutData) {
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
        {/* Section Title - with text reveal */}
        <FadeIn direction="up" delay={0} duration={0.5}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes['3xl'],
              md: TYPOGRAPHY.sizes['4xl'],
              lg: TYPOGRAPHY.sizes['5xl']
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.primary}
            mb={SPACING.scale.xl}
          >
            About Me
          </Text>
        </FadeIn>

        {/* Two Column Layout - Article Style */}
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1fr 1fr"
          }}
          gap={{
            base: SPACING.scale.xl,
            lg: SPACING.scale['2xl']
          }}
          alignItems="start"
        >
          {/* Left Column - Text Content with staggered reveal */}
          <GridItem>
            <Box
              display="flex"
              flexDirection="column"
              gap={SPACING.scale.lg}
            >
              {/* Section 1 */}
              <FadeIn direction="up" delay={0.1} duration={0.5}>
                <Box>
                  {aboutData.subtitle_1 && (
                    <Text
                      fontSize={{
                        base: TYPOGRAPHY.sizes.lg,
                        md: TYPOGRAPHY.sizes['xl']
                      }}
                      fontWeight={TYPOGRAPHY.weights.semibold}
                      color={COLORS.brand.primary}
                      mb={SPACING.scale.sm}
                    >
                      {aboutData.subtitle_1}
                    </Text>
                  )}
                  <Text
                    fontSize={{
                      base: TYPOGRAPHY.sizes.sm,
                      md: TYPOGRAPHY.sizes.md
                    }}
                    color={COLORS.brand.text}
                    lineHeight={TYPOGRAPHY.lineHeights.relaxed}
                  >
                    {aboutData.paragraph_1}
                  </Text>
                </Box>
              </FadeIn>

              {/* Section 2 */}
              <FadeIn direction="up" delay={0.2} duration={0.5}>
                <Box>
                  {aboutData.subtitle_2 && (
                    <Text
                      fontSize={{
                        base: TYPOGRAPHY.sizes.md,
                        md: TYPOGRAPHY.sizes['xl']
                      }}
                      fontWeight={TYPOGRAPHY.weights.semibold}
                      color={COLORS.brand.primary}
                      mb={SPACING.scale.sm}
                    >
                      {aboutData.subtitle_2}
                    </Text>
                  )}
                  <Text
                    fontSize={{
                      base: TYPOGRAPHY.sizes.sm,
                      md: TYPOGRAPHY.sizes.md
                    }}
                    color={COLORS.brand.text}
                    lineHeight={TYPOGRAPHY.lineHeights.relaxed}
                  >
                    {aboutData.paragraph_2}
                  </Text>
                </Box>
              </FadeIn>

              {/* Section 3 */}
              <FadeIn direction="up" delay={0.3} duration={0.5}>
                <Box>
                  {aboutData.subtitle_3 && (
                    <Text
                      fontSize={{
                        base: TYPOGRAPHY.sizes.lg,
                        md: TYPOGRAPHY.sizes['xl']
                      }}
                      fontWeight={TYPOGRAPHY.weights.semibold}
                      color={COLORS.brand.primary}
                      mb={SPACING.scale.sm}
                    >
                      {aboutData.subtitle_3}
                    </Text>
                  )}
                  <Text
                    fontSize={{
                      base: TYPOGRAPHY.sizes.sm,
                      md: TYPOGRAPHY.sizes.md
                    }}
                    color={COLORS.brand.text}
                    lineHeight={TYPOGRAPHY.lineHeights.relaxed}
                  >
                    {aboutData.paragraph_3}
                  </Text>
                </Box>
              </FadeIn>
            </Box>
          </GridItem>

          {/* Right Column - Image with parallax effect */}
          <GridItem>
            <FadeIn direction="right" delay={0.2} duration={0.6}>
              {isClient && !prefersReducedMotion ? (
                <ParallaxImage imageUrl={aboutData.image_url} />
              ) : (
                <StaticImage imageUrl={aboutData.image_url} />
              )}
            </FadeIn>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
