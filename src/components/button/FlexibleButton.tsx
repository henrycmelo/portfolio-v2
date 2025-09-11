import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

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
    // Base styles
    const baseStyles = {
        px: 8,
        py: 6,
        fontSize: "md",
        fontWeight: "600",
        transition: "all 0.2s",
        size: size
    };

    // Variant-specific styles
    const variantStyles = {
        solid: {
            bg: "brand.accent",
            color: "white",
            _hover: { 
                bg: "brand.accentDark", 
                
            }
        },
        outline: {
            variant: "outline" as const,
            borderColor: "brand.divider",
            color: "brand.secondary",
            _hover: { 
                bg: "transparent", 
                borderColor: "brand.accentDark",
                color: "brand.accentDark"
            }
        },
        ghost:{
            variant: "ghost" as const,
            color: "brand.secondary",
            _hover: { 
                bg: "transparent", 
                color: "brand.accentDark"
            }
        }
    };

    // Icon props based on position
    const iconProps = IconComponent ? {
        [iconPosition === "right" ? "rightIcon" : "leftIcon"]: React.createElement(IconComponent)
    } : {};

    return (
        <Button
            borderRadius="md"
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