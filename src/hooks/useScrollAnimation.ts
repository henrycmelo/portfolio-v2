/**
 * SCROLL ANIMATION HOOKS
 *
 * Reusable hooks for scroll-driven animations using Framer Motion.
 *
 * Exports:
 *   - useScrollFade: Fade-in animations on scroll
 *   - useParallax: Parallax scroll effects
 *   - useScrollProgress: Track scroll progress (0-1)
 *   - useInViewAnimation: Detect viewport entry with animation support
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import {
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

export interface ScrollFadeOptions {
  /** Offset range for scroll detection ["start end", "end start"] */
  offset?: [string, string];
  /** Initial Y translation in pixels */
  yOffset?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
}

export interface ParallaxOptions {
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
}

export interface ScrollProgressOptions {
  /** Offset range for scroll detection */
  offset?: [string, string];
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
}

export interface InViewOptions {
  /** Once in view, stay in view */
  once?: boolean;
  /** Margin around the element */
  margin?: string;
  /** Percentage of element that must be visible (0-1) */
  amount?: 'some' | 'all' | number;
}

// ============================================================================
// useScrollFade
// ============================================================================

/**
 * Hook for fade-in animations triggered by scroll position.
 *
 * @param options - Configuration options
 * @returns Object with opacity and y transform MotionValues
 *
 * @example
 * const { opacity, y, ref } = useScrollFade({ yOffset: 50 });
 * <motion.div ref={ref} style={{ opacity, y }}>Content</motion.div>
 */
export function useScrollFade(options: ScrollFadeOptions = {}) {
  const {
    offset = ['0 1', '0.3 1'],
    yOffset = 40,
    stiffness = 100,
    damping = 30,
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end" | "end start", "start end" | "end start"],
  });

  // Transform scroll progress to opacity (0 to 1)
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Transform scroll progress to Y position (yOffset to 0)
  const rawY = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);

  // Apply spring physics for smooth animation
  const opacity = useSpring(rawOpacity, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });

  return { opacity, y, ref, scrollYProgress };
}

// ============================================================================
// useParallax
// ============================================================================

/**
 * Hook for parallax scroll effects.
 *
 * @param distance - The parallax distance in pixels
 * @param options - Configuration options
 * @returns MotionValue for transform and ref for the container
 *
 * @example
 * const { y, ref } = useParallax(100);
 * <motion.div ref={ref} style={{ y }}>Content</motion.div>
 */
export function useParallax(
  distance: number = 100,
  options: ParallaxOptions = {}
) {
  const {
    stiffness = 100,
    damping = 30,
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to Y position (-distance/2 to distance/2)
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [-distance / 2, distance / 2]
  );

  const y = useSpring(rawY, { stiffness, damping });

  return { y, ref, scrollYProgress };
}

// ============================================================================
// useScrollProgress
// ============================================================================

/**
 * Hook to track scroll progress (0-1) for an element.
 *
 * @param options - Configuration options
 * @returns Progress MotionValue (0-1) and ref
 *
 * @example
 * const { progress, ref } = useScrollProgress();
 * <motion.div style={{ scaleX: progress }}>Progress bar</motion.div>
 */
export function useScrollProgress(options: ScrollProgressOptions = {}) {
  const {
    offset = ['start end', 'end start'],
    stiffness = 100,
    damping = 30,
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end" | "end start", "start end" | "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness, damping });

  return { progress, ref, scrollYProgress };
}

/**
 * Hook to track page-level scroll progress (0-1).
 *
 * @param options - Configuration options
 * @returns Progress MotionValue (0-1)
 *
 * @example
 * const { progress } = usePageScrollProgress();
 */
export function usePageScrollProgress(options: Omit<ScrollProgressOptions, 'offset'> = {}) {
  const {
    stiffness = 100,
    damping = 30,
  } = options;

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, { stiffness, damping });

  return { progress, scrollYProgress };
}

// ============================================================================
// useInViewAnimation
// ============================================================================

/**
 * Hook to detect when an element enters the viewport.
 * Wrapper around Framer Motion's useInView with additional options.
 *
 * @param options - Configuration options
 * @returns Boolean indicating if element is in view and ref
 *
 * @example
 * const { isInView, ref } = useInViewAnimation({ once: true });
 * <motion.div
 *   ref={ref}
 *   animate={isInView ? { opacity: 1 } : { opacity: 0 }}
 * >
 *   Content
 * </motion.div>
 */
export function useInViewAnimation(options: InViewOptions = {}) {
  const {
    once = true,
    margin = '-100px',
    amount = 'some',
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once,
    // @ts-expect-error - margin type is more restrictive in framer-motion types but works at runtime
    margin,
    amount,
  });

  return { isInView, ref };
}

// ============================================================================
// UTILITY: Prefers reduced motion check
// ============================================================================

/**
 * Check if user prefers reduced motion.
 * Use this to conditionally disable animations.
 * SSR-safe: returns false on server and initial client render.
 *
 * @returns Boolean indicating if reduced motion is preferred
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Only access window.matchMedia on client after hydration
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// ============================================================================
// UTILITY: Client-side check for SSR-safe animations
// ============================================================================

/**
 * Hook to check if we're on the client side after hydration.
 * Use this to prevent hydration mismatches with animations.
 *
 * @returns Boolean indicating if we're on the client after hydration
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
