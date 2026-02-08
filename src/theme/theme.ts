import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        ...defaultConfig.theme?.tokens?.colors,
        brand: {
          // Dark + Gold Premium Palette
          // Primary dark tones (light to dark)
          50: { value: "#F5F5F0" },    // lightest cream
          100: { value: "#E8E4E0" },   // off-white
          200: { value: "#C9C5B9" },   // muted light
          300: { value: "#8A8682" },   // medium gray
          400: { value: "#5A5652" },   // dark gray
          500: { value: "#3A3632" },   // darker gray
          600: { value: "#2A2622" },   // elevated dark
          700: { value: "#151310" },   // secondary dark bg
          800: { value: "#0D0B09" },   // primary background (darkest)

          // Gold accent spectrum
          900: { value: "#D4AF37" },   // primary gold (classic gold)
          920: { value: "#B8960C" },   // dark gold (hover/active)
          950: { value: "#1A1714" },   // gold tinted dark bg
          1000: { value: "#F4E5B8" },  // light gold (highlights)

          // Status colors (adjusted for dark theme)
          1100: { value: "#4ADE80" },  // success green
          1200: { value: "#FBBF24" },  // warning yellow
          1300: { value: "#F87171" },  // error red

          // Utility colors
          1400: { value: "#FFFFFF" },  // pure white
          1500: { value: "#000000" },  // pure black
        },
      },
    },
    semanticTokens: {
      colors: {
        ...defaultConfig.theme?.semanticTokens?.colors,
        brand: {
          // Primary colors (Dark + Gold theme)
          primary: { value: "{colors.brand.50}" },      // light cream for primary text
          secondary: { value: "{colors.brand.300}" },   // muted text

          // Background tokens (dark theme)
          bg: { value: "{colors.brand.800}" },          // primary dark background (#0D0B09)
          bgSecondary: { value: "{colors.brand.700}" }, // slightly lighter dark (#151310)
          bgTertiary: { value: "{colors.brand.600}" },  // elevated surfaces
          bgButton: { value: "{colors.brand.900}" },    // gold button background
          bgAccent: { value: "{colors.brand.950}" },    // gold-tinted dark bg

          // Text tokens (for dark theme)
          text: { value: "{colors.brand.50}" },         // primary text - light cream (#F5F5F0)
          textSecondary: { value: "{colors.brand.200}" }, // secondary text - muted light (#C9C5B9)
          textMuted: { value: "{colors.brand.300}" },   // muted text
          textButton: { value: "{colors.brand.800}" },  // dark text on gold buttons
          textHover: { value: "{colors.brand.900}" },   // gold hover text
          textOnDark: { value: "{colors.brand.1400}" }, // white text

          // Border and divider tokens (dark theme)
          border: { value: "{colors.brand.500}" },      // subtle border
          divider: { value: "{colors.brand.600}" },     // divider color

          // Gold accent tokens
          accent: { value: "{colors.brand.900}" },       // primary gold (#D4AF37)
          accentDark: { value: "{colors.brand.920}" },   // dark gold (#B8960C)
          accentLight: { value: "{colors.brand.1000}" }, // light gold (#F4E5B8)
          accentMedium: { value: "{colors.brand.900}" }, // medium gold

          // Status tokens
          success: { value: "{colors.brand.1100}" },     // success green
          warning: { value: "{colors.brand.1200}" },     // warning yellow
          error: { value: "{colors.brand.1300}" },       // error red

          // Interactive states (dark theme)
          hover: { value: "{colors.brand.600}" },        // hover background
          active: { value: "{colors.brand.500}" },       // active state
          focus: { value: "{colors.brand.900}" },        // gold focus outline
          white: { value: "{colors.brand.1400}" },       // pure white
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
