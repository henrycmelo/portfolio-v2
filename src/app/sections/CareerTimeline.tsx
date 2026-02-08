"use client";
import {
  Box,
  VStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { Text, FadeIn, SlideIn, MagneticButton } from "@/design-system/atoms";
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
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { careerAPI, type CareerEntry } from "@/api/careerAPI";
import { Button } from "@/design-system/atoms/Button/Button";
import { COLORS, SPACING, BORDERS, SHADOWS, TYPOGRAPHY, SIZES } from "@/design-system/foundations";
import { usePrefersReducedMotion, useIsClient } from "@/hooks/useScrollAnimation";

// Animated timeline node component
const AnimatedTimelineNode = ({ isEducation, index }: { isEducation: boolean; index: number }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <Icon fontSize="lg" color="#D4AF37">
        {isEducation ? <IoSchool /> : <IoBriefcase />}
      </Icon>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        type: "spring",
        stiffness: 200,
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(212, 175, 55, 0)',
            '0 0 0 8px rgba(212, 175, 55, 0.3)',
            '0 0 0 0 rgba(212, 175, 55, 0)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
        }}
      >
        <Icon fontSize="lg" color="#D4AF37">
          {isEducation ? <IoSchool /> : <IoBriefcase />}
        </Icon>
      </motion.div>
    </motion.div>
  );
};

// Static progress line for SSR and reduced motion
const StaticProgressLine = () => (
  <Box
    position="absolute"
    left="50%"
    transform="translateX(-50%)"
    top={0}
    bottom={0}
    w="4px"
    bg={COLORS.brand.accent}
    borderRadius="full"
  />
);

// Animated scroll progress line - only mounts on client
const AnimatedScrollProgressLine = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <Box
      ref={containerRef}
      position="absolute"
      left="50%"
      transform="translateX(-50%)"
      top={0}
      bottom={0}
      w="4px"
    >
      {/* Background line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={COLORS.brand.border}
        borderRadius="full"
      />
      {/* Animated progress line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          background: `linear-gradient(180deg, ${COLORS.brand.accent} 0%, ${COLORS.brand.accentLight} 100%)`,
          borderRadius: '9999px',
          scaleY: scaleY,
          transformOrigin: 'top',
          height: '100%',
        }}
      />
    </Box>
  );
};

// Wrapper that conditionally renders animated or static version
const ScrollProgressLine = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();

  if (!isClient || prefersReducedMotion) {
    return <StaticProgressLine />;
  }

  return <AnimatedScrollProgressLine />;
};

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
      bg={COLORS.brand.bgSecondary}
      borderRadius={BORDERS.radius.lg}
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
      overflow="hidden"
      border="1px solid"
      borderColor={COLORS.brand.border}
      mx="auto"
    >
      {/* Content Area */}
      <Box p={{
        base: SPACING.container.padding.base,
        md: SPACING.container.padding.md,
        lg: SPACING.container.padding.lg
      }}>
        {/* Section Title */}
        <FadeIn direction="up" delay={0} duration={0.5}>
          <Text
            fontSize={{
              base: TYPOGRAPHY.sizes['3xl'],
              md: TYPOGRAPHY.sizes['4xl'],
              lg: TYPOGRAPHY.sizes['5xl']
            }}
            fontWeight={TYPOGRAPHY.weights.bold}
            color={COLORS.brand.text}
            mb={SPACING.scale.xl}
          >
            Career Timeline
          </Text>
        </FadeIn>

        {/* Timeline Content */}
        <VerticalTimeline>
          {careerEntries.slice(0, visibleCount).map((item, index) => {
            const isEducation = item.entry_type === "education";
            const isEven = index % 2 === 0;

            return (
              <VerticalTimelineElement
                key={item.id}
                contentStyle={{
                  background: "#1A1714",
                  color: "#F5F5F0",
                  border: "1px solid #3A3632",
                  borderRadius: "8px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid #3A3632",
                }}
                date={item.date}
                dateClassName="timeline-date"
                iconStyle={{
                  background: "#0D0B09",
                  color: "#D4AF37",
                  border: "3px solid #D4AF37",
                  boxShadow: "0 0 0 4px rgba(212, 175, 55, 0.2)",
                }}
                icon={<AnimatedTimelineNode isEducation={isEducation} index={index} />}
              >
                <SlideIn
                  direction={isEven ? 'left' : 'right'}
                  distance={30}
                  delay={index * 0.1}
                >
                  <VStack align="start" gap={1} w="full" mt="auto">
                    <Text fontSize="lg" color={COLORS.brand.text}>
                      <Text as="span" fontWeight="700" color={COLORS.brand.accent}>{item.role}</Text>
                      <Text as="span" fontWeight="400" color={COLORS.brand.textSecondary}> at {item.company}</Text>
                    </Text>
                  </VStack>
                </SlideIn>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>

        {/* Show More/Reset Button */}
        {careerEntries.length > INITIAL_DISPLAY_COUNT && (
          <FadeIn direction="up" delay={0.3}>
            <Box textAlign="center" mt={8}>
              <MagneticButton distance={6}>
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
              </MagneticButton>
            </Box>
          </FadeIn>
        )}
      </Box>
    </Box>
  );
}
