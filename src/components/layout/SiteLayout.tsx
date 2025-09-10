'use client'

import { Box, Flex } from '@chakra-ui/react'
import Sidebar from "./SideBar"


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex h="100vh" bg="gray.50">
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column">
        
        <Box flex="1" overflow="auto" bg={'brand.bg'}>
          {children}
        </Box>
      </Box>
    </Flex>
  )
}