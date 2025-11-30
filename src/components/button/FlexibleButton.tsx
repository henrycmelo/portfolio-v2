/**
 * FLEXIBLE BUTTON (Legacy wrapper)
 *
 * This component now uses the design system Button atom.
 * Consider migrating to import { Button } from '@/design-system/atoms' directly.
 */

import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS, ANIMATIONS } from '@/design-system/foundations';

interface FlexibleButtonProps extends ButtonProps {
    children: React.ReactNode;
    variant?: 'solid' | 'outline' | 'ghost';
    icon?: React.ComponentType;
    iconPosition?: 'left' | 'right';
}

const FlexibleButton: React.FC<FlexibleButtonProps> = ({
    children,
    variant = 'solid',
    icon: IconComponent,
    iconPosition = 'right',
    size = 'lg',
    ...props
}) => {
    // Base styles using design system tokens
    const baseStyles = {
        px: SPACING.component.padding.button.x,
        py: SPACING.component.padding.button.y,
        fontSize: TYPOGRAPHY.sizes.md,
        fontWeight: TYPOGRAPHY.weights.semibold,
        transition: ANIMATIONS.transitions.all,
        size: size
    };

    // Variant-specific styles using design system colors
    const variantStyles = {
        solid: {
            bg: COLORS.brand.accent,
            color: COLORS.brand.white,
            _hover: {
                bg: COLORS.brand.accentDark,
            }
        },
        outline: {
            variant: "outline" as const,
            borderColor: COLORS.brand.divider,
            color: COLORS.brand.secondary,
            _hover: {
                bg: "transparent",
                borderColor: COLORS.brand.accentDark,
                color: COLORS.brand.accentDark
            }
        },
        ghost:{
            variant: "ghost" as const,
            color: COLORS.brand.secondary,
            _hover: {
                bg: "transparent",
                color: COLORS.brand.accentDark
            }
        }
    };

    return (
        <Button
            borderRadius={BORDERS.radius.md}
            {...baseStyles}
            {...variantStyles[variant]}
            {...props}
        >
            {IconComponent && iconPosition === 'left' && <IconComponent />}
            {children}
            {IconComponent && iconPosition === 'right' && <IconComponent />}
        </Button>
    );
};

export default FlexibleButton;