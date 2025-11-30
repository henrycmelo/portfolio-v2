import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        ...defaultConfig.theme?.tokens?.colors,
        brand: {
          
          50: { value: "#F8F9FA" },  // gray.50
          100: { value: "#E9ECEF" }, // gray.100  
          200: { value: "#DEE2E6" }, // gray.200
          300: { value: "#CED4DA" }, // gray.300
          400: { value: "#ADB5BD" }, // gray.400
          500: { value: "#6C757D" }, // gray.500
          600: { value: "#495057" }, // gray.600
          700: { value: "#343A40" }, // gray.700
          800: { value: "#212529" }, // gray.800
          
          // Accent colors
          900: { value: "#107c7c" }, // accent (teal)
          920: { value: "#0d6a6a" }, // darkAccent
          950: { value: "#e6f2f2" }, // lightAccent
          1000: { value: "#b3dddd" }, // mediumAccent
          
          // Status colors
          1100: { value: "#228B67" }, // success (green)
          1200: { value: "#E0A800" }, // warning (yellow)
          1300: { value: "#B23A48" }, // error (red)
          
          // Additional utility colors
          1400: { value: "#FFFFFF" }, // pure white
          1500: { value: "#000000" }, // pure black
        },
      },
    },
    semanticTokens: {
      colors: {
        ...defaultConfig.theme?.semanticTokens?.colors,
        brand: {
          // Primary colors (your main brand colors)
          primary: { value: "{colors.brand.800}" },     // #212529 (primary black)
          secondary: { value: "{colors.brand.600}" },   // #495057 (secondary dark gray)
          
          // Background tokens (mapped from your semantic.background)
          bg: { value: "{colors.brand.50}" },           // primary background
          bgSecondary: { value: "{colors.brand.100}" }, // secondary background  
          bgTertiary: { value: "{colors.brand.200}" },  // tertiary background
          bgButton: { value: "{colors.brand.900}" },    // button background
          bgAccent: { value: "{colors.brand.950}" },    // light accent background
          
          // Text tokens (mapped from your semantic.text)
          text: { value: "{colors.brand.800}" },        // primary text (#212529)
          textSecondary: { value: "{colors.brand.600}" }, // secondary text (#495057)
          textMuted: { value: "{colors.brand.500}" },   // muted text
          textButton: { value: "{colors.brand.600}" },  // button text
          textHover: { value: "{colors.brand.300}" },   // hover text
          textOnDark: { value: "{colors.brand.1400}" }, // white text for dark backgrounds
          
          // Border and divider tokens
          border: { value: "{colors.brand.300}" },      // border color
          divider: { value: "{colors.brand.100}" },     // divider color
          
          // Accent tokens
          accent: { value: "{colors.brand.900}" },       // main accent (teal)
          accentDark: { value: "{colors.brand.920}" },   // dark accent
          accentLight: { value: "{colors.brand.950}" },  // light accent
          accentMedium: { value: "{colors.brand.1000}" }, // medium accent
          
          // Status tokens  
          success: { value: "{colors.brand.1100}" },     // success green
          warning: { value: "{colors.brand.1200}" },     // warning yellow
          error: { value: "{colors.brand.1300}" },       // error red
          
          // Interactive states
          hover: { value: "{colors.brand.100}" },        // hover background
          active: { value: "{colors.brand.200}" },       // active state
          focus: { value: "{colors.brand.900}" },        // focus outline
          white: { value: "{colors.brand.1400}" },       // pure white
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
