/**
 * STAGGER CONTAINER MOTION COMPONENT
 *
 * A container that staggers the animation of its children.
 * Uses Framer Motion's staggerChildren feature.
 *
 * Atomic Design Level: ATOM (motion primitive)
 *
 * Usage:
 *   <StaggerContainer staggerDelay={0.1}>
 *     <StaggerItem><Card /></StaggerItem>
 *     <StaggerItem><Card /></StaggerItem>
 *   </StaggerContainer>
 */

'use client';

import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInViewAnimation, usePrefersReducedMotion, useIsClient } from '@/hooks/useScrollAnimation';

// ============================================================================
// TYPES
// ============================================================================

export interface StaggerContainerProps {
  children: ReactNode;
  /** Delay between each child animation in seconds */
  staggerDelay?: number;
  /** Initial delay before stagger starts */
  delayChildren?: number;
  /** Animation duration for each child */
  duration?: number;
  /** Whether to trigger only once */
  once?: boolean;
  /** Additional className */
  className?: string;
  /** HTML tag to render as */
  as?: React.ElementType;
}

export interface StaggerItemProps {
  children: ReactNode;
  /** Direction for item to animate from */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Distance to travel */
  distance?: number;
  /** Additional className */
  className?: string;
  /** Custom index for alternating directions */
  index?: number;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const getItemVariants = (
  direction: StaggerItemProps['direction'],
  distance: number
): Variants => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
  };

  return {
    hidden: {
      opacity: 0,
      ...directionMap[direction || 'up'],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
};

// ============================================================================
// COMPONENTS
// ============================================================================

export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  once = true,
  className,
  as: Component = 'div',
}: StaggerContainerProps) => {
  const { isInView, ref } = useInViewAnimation({ once, margin: '-50px' });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();

  const shouldAnimate = isClient && !prefersReducedMotion;

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  // Create motion component dynamically
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      initial={shouldAnimate ? "hidden" : false}
      animate={shouldAnimate ? (isInView ? 'visible' : 'hidden') : undefined}
      variants={shouldAnimate ? variants : undefined}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export const StaggerItem = ({
  children,
  direction = 'up',
  distance = 30,
  className,
  index,
}: StaggerItemProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();

  const shouldAnimate = isClient && !prefersReducedMotion;

  // Alternate direction based on index if provided
  let actualDirection = direction;
  if (index !== undefined && (direction === 'left' || direction === 'right')) {
    actualDirection = index % 2 === 0 ? 'left' : 'right';
  }

  const variants = getItemVariants(actualDirection, distance);

  return (
    <motion.div variants={shouldAnimate ? variants : undefined} className={className}>
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
