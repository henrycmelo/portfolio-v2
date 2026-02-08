/**
 * TEXT REVEAL MOTION COMPONENT
 *
 * Letter-by-letter or word-by-word text reveal animation.
 *
 * Atomic Design Level: ATOM (motion primitive)
 *
 * Usage:
 *   <TextReveal type="letter" staggerDelay={0.03}>
 *     Hello World
 *   </TextReveal>
 */

'use client';

import { ReactNode, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInViewAnimation, usePrefersReducedMotion } from '@/hooks/useScrollAnimation';

// ============================================================================
// TYPES
// ============================================================================

export interface TextRevealProps {
  children: string;
  /** Type of reveal animation */
  type?: 'letter' | 'word';
  /** Delay between each character/word in seconds */
  staggerDelay?: number;
  /** Animation duration for each item */
  duration?: number;
  /** Initial delay before animation starts */
  delay?: number;
  /** Direction to reveal from */
  direction?: 'up' | 'down';
  /** Distance to travel */
  distance?: number;
  /** Whether to trigger only once */
  once?: boolean;
  /** Additional className for container */
  className?: string;
  /** HTML tag to render as */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants = (
  staggerDelay: number,
  delay: number
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delay,
    },
  },
});

const itemVariants = (direction: 'up' | 'down', distance: number): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? distance : -distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
});

// ============================================================================
// COMPONENT
// ============================================================================

export const TextReveal = ({
  children,
  type = 'letter',
  staggerDelay = 0.03,
  duration = 0.4,
  delay = 0,
  direction = 'up',
  distance = 20,
  once = true,
  className,
  as: Component = 'span',
}: TextRevealProps) => {
  const { isInView, ref } = useInViewAnimation({ once, margin: '-50px' });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Split text into words or letters
  const items = useMemo(() => {
    if (type === 'word') {
      return children.split(' ').map((word, i, arr) => ({
        text: word,
        hasSpace: i < arr.length - 1,
      }));
    }
    return children.split('').map((char) => ({
      text: char,
      hasSpace: false,
    }));
  }, [children, type]);

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    const Tag = Component;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants(staggerDelay, delay)}
      className={className}
      style={{ display: 'inline-block' }}
      aria-label={children}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants(direction, distance)}
          style={{
            display: 'inline-block',
            whiteSpace: item.text === ' ' ? 'pre' : 'normal',
          }}
        >
          {item.text === ' ' ? '\u00A0' : item.text}
          {item.hasSpace && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

export default TextReveal;
