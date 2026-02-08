/**
 * GOLD SHIMMER MOTION COMPONENT
 *
 * Animated gold gradient shimmer effect for text or backgrounds.
 *
 * Atomic Design Level: ATOM (motion primitive)
 *
 * Usage:
 *   <GoldShimmer>Premium Text</GoldShimmer>
 *   <GoldShimmer variant="background" />
 */

'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useScrollAnimation';

// ============================================================================
// TYPES
// ============================================================================

export interface GoldShimmerProps {
  children?: ReactNode;
  /** Variant of shimmer effect */
  variant?: 'text' | 'background' | 'border';
  /** Animation duration in seconds */
  duration?: number;
  /** Whether animation should loop infinitely */
  infinite?: boolean;
  /** Gold color palette */
  colors?: {
    primary: string;
    light: string;
    dark: string;
  };
  /** Additional className */
  className?: string;
  /** HTML tag to render as (for text variant) */
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_GOLD_COLORS = {
  primary: '#D4AF37',
  light: '#F4E5B8',
  dark: '#B8962F',
};

// ============================================================================
// COMPONENT
// ============================================================================

export const GoldShimmer = ({
  children,
  variant = 'text',
  duration = 3,
  infinite = true,
  colors = DEFAULT_GOLD_COLORS,
  className,
  as: Component = 'span',
}: GoldShimmerProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Build gradient based on gold colors
  const gradient = `linear-gradient(
    120deg,
    ${colors.dark} 0%,
    ${colors.primary} 25%,
    ${colors.light} 50%,
    ${colors.primary} 75%,
    ${colors.dark} 100%
  )`;

  // Static gold gradient for reduced motion
  const staticGradient = `linear-gradient(
    120deg,
    ${colors.dark} 0%,
    ${colors.primary} 50%,
    ${colors.dark} 100%
  )`;

  // If user prefers reduced motion, render static gradient
  if (prefersReducedMotion) {
    if (variant === 'text') {
      return (
        <span
          className={className}
          style={{
            background: staticGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {children}
        </span>
      );
    }

    if (variant === 'background') {
      return (
        <div
          className={className}
          style={{
            background: staticGradient,
          }}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        className={className}
        style={{
          borderImage: `${staticGradient} 1`,
        }}
      >
        {children}
      </div>
    );
  }

  // Text shimmer effect
  if (variant === 'text') {
    const MotionComponent = motion.create(Component);

    return (
      <MotionComponent
        className={className}
        style={{
          background: gradient,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: infinite ? Infinity : 0,
        }}
      >
        {children}
      </MotionComponent>
    );
  }

  // Background shimmer effect
  if (variant === 'background') {
    return (
      <motion.div
        className={className}
        style={{
          background: gradient,
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: infinite ? Infinity : 0,
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Border shimmer effect
  return (
    <motion.div
      className={className}
      style={{
        position: 'relative',
        background: 'transparent',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: gradient,
          backgroundSize: '200% 100%',
          borderRadius: 'inherit',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: infinite ? Infinity : 0,
        }}
      />
      <div style={{ position: 'relative' }}>{children}</div>
    </motion.div>
  );
};

// ============================================================================
// UTILITY COMPONENT: Gold Gradient Text (static)
// ============================================================================

export interface GoldGradientTextProps {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export const GoldGradientText = ({
  children,
  className,
  as: Component = 'span',
}: GoldGradientTextProps) => {
  const gradient = `linear-gradient(
    135deg,
    ${DEFAULT_GOLD_COLORS.dark} 0%,
    ${DEFAULT_GOLD_COLORS.primary} 30%,
    ${DEFAULT_GOLD_COLORS.light} 50%,
    ${DEFAULT_GOLD_COLORS.primary} 70%,
    ${DEFAULT_GOLD_COLORS.dark} 100%
  )`;

  return (
    <Component
      className={className}
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </Component>
  );
};

export default GoldShimmer;
