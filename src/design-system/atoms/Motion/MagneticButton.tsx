/**
 * MAGNETIC BUTTON MOTION COMPONENT
 *
 * A wrapper that adds magnetic hover effect to buttons.
 * The button subtly follows the cursor when hovered.
 *
 * Atomic Design Level: ATOM (motion primitive)
 *
 * Usage:
 *   <MagneticButton>
 *     <Button variant="primary">Click me</Button>
 *   </MagneticButton>
 */

'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { usePrefersReducedMotion, useIsClient } from '@/hooks/useScrollAnimation';

// ============================================================================
// TYPES
// ============================================================================

export interface MagneticButtonProps {
  children: ReactNode;
  /** Maximum distance the button can move in pixels */
  distance?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** Additional className */
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const MagneticButton = ({
  children,
  distance = 8,
  stiffness = 150,
  damping = 15,
  className,
}: MagneticButtonProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isClient = useIsClient();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth animation
  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });

  const shouldAnimate = isClient && !prefersReducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isHovered || !shouldAnimate) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Calculate the magnetic pull (scaled by distance parameter)
    const pullX = (deltaX / rect.width) * distance * 2;
    const pullY = (deltaY / rect.height) * distance * 2;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseEnter = () => {
    if (shouldAnimate) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Animate back to center
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: shouldAnimate ? springX : 0,
        y: shouldAnimate ? springY : 0,
        display: 'inline-block',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
