/**
 * TILT CARD MOTION COMPONENT
 *
 * A wrapper that adds 3D tilt effect to cards on hover.
 * The card tilts based on cursor position using perspective transform.
 *
 * Atomic Design Level: ATOM (motion primitive)
 *
 * Usage:
 *   <TiltCard maxTilt={10}>
 *     <Card>Content</Card>
 *   </TiltCard>
 */

'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion, useIsClient } from '@/hooks/useScrollAnimation';

// ============================================================================
// TYPES
// ============================================================================

export interface TiltCardProps {
  children: ReactNode;
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Perspective distance in pixels */
  perspective?: number;
  /** Scale on hover */
  scale?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** Show gold glow on hover */
  glowOnHover?: boolean;
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: React.CSSProperties;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const TiltCard = ({
  children,
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  stiffness = 400,
  damping = 30,
  glowOnHover = true,
  className,
  style,
}: TiltCardProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Spring physics for smooth animation
  const springRotateX = useSpring(rotateX, { stiffness, damping });
  const springRotateY = useSpring(rotateY, { stiffness, damping });

  const shouldAnimate = isClient && !prefersReducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !shouldAnimate) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate mouse position relative to center (-1 to 1)
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    // Apply tilt (inverted for natural feel)
    rotateX.set(-mouseY * maxTilt);
    rotateY.set(mouseX * maxTilt);
  };

  const handleMouseEnter = () => {
    if (shouldAnimate) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset tilt
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: shouldAnimate ? perspective : undefined,
        transformStyle: shouldAnimate ? 'preserve-3d' : undefined,
        ...style,
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX: shouldAnimate ? springRotateX : 0,
          rotateY: shouldAnimate ? springRotateY : 0,
          transformStyle: shouldAnimate ? 'preserve-3d' : undefined,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          boxShadow: shouldAnimate && isHovered && glowOnHover
            ? '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)'
            : 'none',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
        animate={shouldAnimate ? {
          scale: isHovered ? scale : 1,
        } : undefined}
        transition={shouldAnimate ? {
          scale: { duration: 0.2 },
        } : undefined}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
