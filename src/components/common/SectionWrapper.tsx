// components/common/SectionWrapper.tsx
import { Box } from "@chakra-ui/react";
export default function SectionWrapper({ 
  id, 
  children, 
  minHeight = "100vh" 
}: { 
  id: string
  children: React.ReactNode
  minHeight?: string 
}) {
  return (
    <Box 
      id={id}
      minH={minHeight}
      px={{ base: 6, md: 12, lg: 16 }}
      py={{ base: 8, md: 12 }}
    >
      {children}
    </Box>
  )
}