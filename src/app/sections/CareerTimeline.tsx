"use client";
import {
  Box,
  Text,
  VStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import {
  IoAdd,
  IoArrowUp,
  IoSchool,
  IoBriefcase,
} from "react-icons/io5";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React, { useEffect, useState } from "react";
import { careerAPI, type CareerEntry } from "@/api/careerAPI";
import { Button } from "@/design-system/atoms/Button/Button";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from "@/design-system/foundations";

export default function CareerTimeline() {
  const [careerEntries, setCareerEntries] = useState<CareerEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const INITIAL_DISPLAY_COUNT = 3;
  const SHOW_MORE_INCREMENT = 2;

  useEffect(() => {
    const fetchCareerEntries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await careerAPI.getAllCareerEntries();
        setCareerEntries(data);
      } catch (err) {
        console.error("Error fetching career entries:", err);
        setError("Failed to fetch career timeline");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareerEntries();
  }, []);

  if (isLoading)
    return (
      <Box textAlign="center" py={10} px={6} color="brand.secondary">
        <Spinner size="xl" />
        <Text mt={4}>Loading career timeline...</Text>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" py={10} px={6}>
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      </Box>
    );

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
          Career Timeline
        </Text>

        {/* Timeline Content */}
        <VerticalTimeline>
          {careerEntries.slice(0, visibleCount).map((item) => {
            const isEducation = item.entry_type === "education";

            return (
              <VerticalTimelineElement
                key={item.id}
                contentStyle={{
                  background: "var(--chakra-colors-brand-white) !important",
                  color: "var(--chakra-colors-brand-primary) !important",
                  border: "1px solid var(--chakra-colors-brand-divider) !important",
                  borderRadius: "md",
                  boxShadow: "none !important",
                }}
                
                
                contentArrowStyle={{
                  borderRight:
                    "7px solid var(--chakra-colors-brand-divider) !important",
                  borderRightColor:
                    "var(--chakra-colors-brand-divider) !important",
                }}
                date={item.date}
                dateClassName="timeline-date"
                iconStyle={{
                  background: "var(--chakra-colors-brand-white) !important",
                  color: "var(--chakra-colors-brand-secondary) !important",
                  border: "1px solid var(--chakra-colors-brand-divider) !important",
                  
                  
                }}
                icon={
                  <Icon fontSize="lg">
                    {isEducation ? <IoSchool /> : <IoBriefcase />}
                  </Icon>
                }
              >
                <VStack align="start" gap={1} w="full" mt="auto">
                  <Text fontSize="lg" color="brand.accent">
                    <Text as="span" fontWeight="700">{item.role}</Text>
                    <Text as="span" fontWeight="400" color="brand.secondary"> at {item.company}</Text>
                  </Text>
                </VStack>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>

        {/* Show More/Reset Button */}
        {careerEntries.length > INITIAL_DISPLAY_COUNT && (
          <Box textAlign="center" mt={8}>
            <Button
              variant="outline"
              icon={visibleCount >= careerEntries.length ? IoArrowUp : IoAdd}
              onClick={() => {
                if (visibleCount >= careerEntries.length) {
                  // All shown, reset to initial
                  setVisibleCount(INITIAL_DISPLAY_COUNT);
                } else {
                  // Show more entries
                  const newCount = Math.min(
                    visibleCount + SHOW_MORE_INCREMENT,
                    careerEntries.length
                  );
                  setVisibleCount(newCount);
                }
              }}
            >
              {visibleCount >= careerEntries.length
                ? "Show Less"
                : `Show ${Math.min(
                    SHOW_MORE_INCREMENT,
                    careerEntries.length - visibleCount
                  )} More`}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
