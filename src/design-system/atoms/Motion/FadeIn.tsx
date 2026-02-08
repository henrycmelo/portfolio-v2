/**
 * FADE IN MOTION COMPONENT
 *
 * A reusable fade-in animation wrapper with configurable direction.
 *
 * Atomic Design Level: ATOM (motion primitive)
 *
 * Usage:
 *   <FadeIn direction="up" delay={0.2}>
 *     <Content />
 *   </FadeIn>
 */

'use client';

import { ReactNode } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { useInViewAnimation, usePrefersReducedMotion, useIsClient } from '@/hooks/useScrollAnimation';

// ============================================================================
// TYPES
// ============================================================================

export interface FadeInProps {
  children: ReactNode;
  /** Direction to fade in from */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Distance to travel in pixels */
  distance?: number;
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
  direction: FadeInProps['direction'],
  distance: number
): Variants => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
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
    },
  };
};

// ============================================================================
// COMPONENT
// ============================================================================

export const FadeIn = ({
  children,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  distance = 30,
  once = true,
  easing = 'easeOut',
  className,
}: FadeInProps) => {
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

export default FadeIn;
