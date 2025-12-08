'use client';

import { useState, useEffect } from "react";
import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import { Text } from "@/design-system/atoms";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from "@/design-system/foundations";
import { aboutAPI, AboutData } from "@/api/aboutAPI";

export default function AboutMeSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

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
        {/* Section Title */}
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
          {/* Left Column - Text Content */}
          <GridItem>
            <Box
              display="flex"
              flexDirection="column"
              gap={SPACING.scale.lg}
            >
              {/* Section 1 */}
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

              {/* Section 2 */}
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

              {/* Section 3 */}
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
            </Box>
          </GridItem>

          {/* Right Column - Image */}
          <GridItem>
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
              <Image
                src={aboutData.image_url}
                alt="About me with my dog"
                objectFit="cover"
                w="full"
                h="full"
              />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
