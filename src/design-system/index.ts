/**
 * DESIGN SYSTEM - MAIN INDEX
 *
 * Central export for the entire design system using Atomic Design principles.
 *
 * Atomic Design Hierarchy:
 * 1. Foundations - Design tokens (colors, spacing, typography, etc.)
 * 2. Atoms - Basic building blocks (Button, Text, Input, etc.)
 * 3. Molecules - Simple combinations (FormField, DataTable, etc.)
 * 4. Organisms - Complex sections (PageHeader, etc.)
 * 5. Templates - Page layouts (AdminPageTemplate, etc.)
 *
 * Usage Examples:
 *
 * // Import foundations (design tokens)
 * import { COLORS, SPACING, TYPOGRAPHY } from '@/design-system/foundations'
 *
 * // Import atoms
 * import { Button, Text, Input } from '@/design-system/atoms'
 *
 * // Import molecules
 * import { FormField, DataTable } from '@/design-system/molecules'
 *
 * // Import organisms
 * import { PageHeader } from '@/design-system/organisms'
 *
 * // Import templates
 * import { AdminPageTemplate } from '@/design-system/templates'
 *
 * // Or import from main index
 * import { COLORS, Button, FormField } from '@/design-system'
 */

// ============================================================================
// FOUNDATIONS (Design Tokens)
// ============================================================================
export * from './foundations';

// ============================================================================
// ATOMS (Basic Components)
// ============================================================================
export * from './atoms';

// ============================================================================
// MOLECULES (Component Combinations)
// ============================================================================
export * from './molecules';

// ============================================================================
// ORGANISMS (Complex Sections)
// ============================================================================
export * from './organisms';

// ============================================================================
// TEMPLATES (Page Layouts)
// ============================================================================
export * from './templates';
