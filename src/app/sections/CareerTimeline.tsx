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
import FlexibleButton from "@/components/button/FlexibleButton";

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
      maxW="6xl"
      w="full"
      borderRadius="md"
      overflow="hidden"
      
      mx="auto"
    >
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
                  border: "1px solid ",
                  borderRadius: "md",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
                contentArrowStyle={{
                  borderRight:
                    "7px solid var(--chakra-colors-brand-white) !important",
                  borderRightColor:
                    "var(--chakra-colors-brand-divider) !important",
                }}
                date={item.date}
                dateClassName="timeline-date"
                iconStyle={{
                  background: "var(--chakra-colors-brand-white) !important",
                  color: "var(--chakra-colors-brand-secondary) !important",
                  
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
            <FlexibleButton
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
            </FlexibleButton>
          </Box>
        )}
      </Box>
   
  );
}
