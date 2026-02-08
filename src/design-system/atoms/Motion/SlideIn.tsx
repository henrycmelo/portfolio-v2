/**
 * SLIDE IN MOTION COMPONENT
 *
 * A reusable slide-in animation wrapper with configurable direction and distance.
 *
 * Atomic Design Level: ATOM (motion primitive)
 *
 * Usage:
 *   <SlideIn direction="left" distance={100}>
 *     <Content />
 *   </SlideIn>
 */

'use client';

import { ReactNode } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { useInViewAnimation, usePrefersReducedMotion, useIsClient } from '@/hooks/useScrollAnimation';

// ============================================================================
// TYPES
// ============================================================================

export interface SlideInProps {
  children: ReactNode;
  /** Direction to slide in from */
  direction?: 'left' | 'right' | 'up' | 'down';
  /** Distance to travel in pixels */
  distance?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Whether to trigger only once */
  once?: boolean;
  /** Easing function */
  easing?: Easing;
  /** Additional className */
  className?: string;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const getVariants = (
  direction: SlideInProps['direction'],
  distance: number
): Variants => {
  const directionMap = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
  };

  return {
    hidden: {
      opacity: 0,
      ...directionMap[direction || 'left'],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

// ============================================================================
// COMPONENT
// ============================================================================

export const SlideIn = ({
  children,
  direction = 'left',
  distance = 50,
  duration = 0.6,
  delay = 0,
  once = true,
  easing = 'easeOut',
  className,
}: SlideInProps) => {
  const { isInView, ref } = useInViewAnimation({ once, margin: '-50px' });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();

  const variants = getVariants(direction, distance);
  const shouldAnimate = isClient && !prefersReducedMotion;

  return (
    <motion.div
      ref={ref}
      initial={shouldAnimate ? "hidden" : false}
      animate={shouldAnimate ? (isInView ? 'visible' : 'hidden') : undefined}
      variants={shouldAnimate ? variants : undefined}
      transition={shouldAnimate ? {
        duration,
        delay,
        ease: easing,
      } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
