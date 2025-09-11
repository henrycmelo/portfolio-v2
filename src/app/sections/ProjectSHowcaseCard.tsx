import { Box, Text, HStack, VStack, Image, Badge } from '@chakra-ui/react'

export default function ProjectShowcaseCard() {
  return (
    <Box 
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      p={8}
      bg="#f8f9fa"
    >
      {/* Project Card */}
      <Box
        maxW="6xl"
        w="full"
        bg="white"
        borderRadius="2xl"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.1)"
        overflow="hidden"
        p={{ base: 8, md: 12, lg: 16 }}
      >
        {/* Header */}
        <HStack justify="space-between" align="center" mb={8}>
          <HStack spacing={3}>
            <Box
              w={12}
              h={12}
              bg="#107c7c"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="white" fontWeight="bold" fontSize="lg">G</Text>
            </Box>
            <Text fontSize="2xl" fontWeight="700" color="#212529">GIDDY</Text>
          </HStack>
          <Badge 
            bg="#e6f2f2" 
            color="#107c7c" 
            px={3} 
            py={1} 
            borderRadius="full"
            fontWeight="600"
          >
            2022-2023
          </Badge>
        </HStack>

        {/* Title */}
        <VStack align="flex-start" spacing={6} mb={12}>
          <Text 
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="700"
            lineHeight="1.1"
            color="#212529"
          >
            Scaling a crypto startup
            <br />
            <Text as="span" color="#107c7c">from 0 to 400,000 users</Text>
          </Text>
        </VStack>

        {/* Mobile Screens */}
        <HStack 
          spacing={6} 
          justify="center" 
          flexWrap="wrap"
          gap={4}
        >
          {/* Screen 1 - Dashboard */}
          <Box
            w={{ base: "180px", md: "220px" }}
            h={{ base: "360px", md: "440px" }}
            bg="white"
            borderRadius="2xl"
            border="8px solid #1f2937"
            position="relative"
            overflow="hidden"
            boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          >
            {/* Status Bar */}
            <Box bg="#1f2937" h="20px" display="flex" alignItems="center" justifyContent="center">
              <Text color="white" fontSize="xs" fontWeight="600">9:41</Text>
              <Box position="absolute" right={3} top={1}>
                <HStack spacing={1}>
                  <Box w={1} h={1} bg="white" borderRadius="full" />
                  <Box w={1} h={1} bg="white" borderRadius="full" />
                  <Box w={1} h={1} bg="white" borderRadius="full" />
                </HStack>
              </Box>
            </Box>
            
            {/* Content */}
            <Box p={4} bg="#f8f9fa" h="full">
              <VStack spacing={4} align="stretch">
                <Text fontSize="xs" color="#6c757d" fontWeight="600">MY BALANCE</Text>
                <Text fontSize="2xl" fontWeight="700" color="#212529">$1,525</Text>
                <Text fontSize="xs" color="#28a745">+$64.32 (07.3%)</Text>
                
                {/* Chart placeholder */}
                <Box 
                  h="120px" 
                  bg="white" 
                  borderRadius="lg" 
                  position="relative"
                  display="flex"
                  alignItems="end"
                  px={2}
                  py={2}
                >
                  <Box w="full" h="80%" bg="linear-gradient(to top, #107c7c20, #107c7c10)" borderRadius="sm" />
                </Box>
                
                {/* Action buttons */}
                <HStack spacing={3} justify="space-around" pt={4}>
                  <VStack spacing={2}>
                    <Box w={10} h={10} bg="#6c757d" borderRadius="full" />
                    <Text fontSize="xs" color="#6c757d">Send</Text>
                  </VStack>
                  <VStack spacing={2}>
                    <Box w={10} h={10} bg="#107c7c" borderRadius="full" />
                    <Text fontSize="xs" color="#6c757d">Buy</Text>
                  </VStack>
                  <VStack spacing={2}>
                    <Box w={10} h={10} bg="#6c757d" borderRadius="full" />
                    <Text fontSize="xs" color="#6c757d">Swap</Text>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
          </Box>

          {/* Screen 2 - Send */}
          <Box
            w={{ base: "180px", md: "220px" }}
            h={{ base: "360px", md: "440px" }}
            bg="white"
            borderRadius="2xl"
            border="8px solid #1f2937"
            position="relative"
            overflow="hidden"
            boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          >
            {/* Status Bar */}
            <Box bg="#1f2937" h="20px" display="flex" alignItems="center" justifyContent="center">
              <Text color="white" fontSize="xs" fontWeight="600">9:41</Text>
            </Box>
            
            {/* Content */}
            <Box p={4} bg="#f8f9fa" h="full">
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="center">
                  <Text fontSize="sm" fontWeight="600">Back</Text>
                  <Text fontSize="lg" fontWeight="700">Send</Text>
                  <Box w={6} />
                </HStack>
                
                <Box bg="white" p={4} borderRadius="lg">
                  <HStack justify="space-between">
                    <HStack spacing={2}>
                      <Box w={8} h={8} bg="#107c7c" borderRadius="full" />
                      <Text fontSize="sm" fontWeight="600">GIDDY</Text>
                    </HStack>
                    <VStack align="end" spacing={0}>
                      <Text fontSize="lg" fontWeight="700">$25.00</Text>
                      <Text fontSize="xs" color="#6c757d">$22.36</Text>
                    </VStack>
                  </HStack>
                </Box>
                
                <Box bg="white" p={4} borderRadius="lg">
                  <Text fontSize="xs" color="#6c757d" mb={2}>Network</Text>
                  <Text fontSize="sm" fontWeight="600">Polygon</Text>
                </Box>
                
                <Box bg="white" p={4} borderRadius="lg">
                  <Text fontSize="xs" color="#6c757d" mb={2}>Fees</Text>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="#28a745">REDUCED</Text>
                    <Text fontSize="sm">$0.10</Text>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </Box>

          {/* Screen 3 - Earn */}
          <Box
            w={{ base: "180px", md: "220px" }}
            h={{ base: "360px", md: "440px" }}
            bg="white"
            borderRadius="2xl"
            border="8px solid #1f2937"
            position="relative"
            overflow="hidden"
            boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          >
            {/* Status Bar */}
            <Box bg="#1f2937" h="20px" display="flex" alignItems="center" justifyContent="center">
              <Text color="white" fontSize="xs" fontWeight="600">9:41</Text>
            </Box>
            
            {/* Content */}
            <Box p={4} bg="#f8f9fa" h="full">
              <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="700" textAlign="center">Earn</Text>
                
                <Box bg="white" p={4} borderRadius="lg">
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="xs" color="#6c757d">STABILITY</Text>
                    <Text fontSize="xs" color="#107c7c">DETAILS →</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="700" color="#107c7c">2% vAPY</Text>
                  <Text fontSize="xs" color="#6c757d" mb={3}>Enjoy stable yield without the rollercoaster ride</Text>
                  <Box bg="#212529" color="white" py={2} px={4} borderRadius="lg" textAlign="center">
                    <Text fontSize="sm" fontWeight="600">Earn now</Text>
                  </Box>
                </Box>
                
                <Box bg="white" p={4} borderRadius="lg">
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="xs" color="#6c757d">GET THOSE GAINS</Text>
                    <Text fontSize="xs" color="#107c7c">DETAILS →</Text>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="700" color="#f59e0b">8% vAPY</Text>
                  <Text fontSize="xs" color="#6c757d" mb={3}>Start earning with the GNS single asset staking pool</Text>
                  <Box bg="#212529" color="white" py={2} px={4} borderRadius="lg" textAlign="center">
                    <Text fontSize="sm" fontWeight="600">Earn now</Text>
                  </Box>
                </Box>
              </VStack>
            </Box>
          </Box>

          {/* Screen 4 - Add Funds */}
          <Box
            w={{ base: "180px", md: "220px" }}
            h={{ base: "360px", md: "440px" }}
            bg="white"
            borderRadius="2xl"
            border="8px solid #1f2937"
            position="relative"
            overflow="hidden"
            boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          >
            {/* Status Bar */}
            <Box bg="#1f2937" h="20px" display="flex" alignItems="center" justifyContent="center">
              <Text color="white" fontSize="xs" fontWeight="600">9:41</Text>
            </Box>
            
            {/* Content */}
            <Box p={4} bg="#f8f9fa" h="full">
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="center">
                  <Text fontSize="sm" fontWeight="600">Back</Text>
                  <Text fontSize="lg" fontWeight="700">Add Funds</Text>
                  <Box w={6} />
                </HStack>
                
                <Box bg="white" p={4} borderRadius="lg">
                  <HStack spacing={3} mb={3}>
                    <Box w={8} h={8} bg="#212529" borderRadius="full" />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="600">Robinhood Connect</Text>
                      <Text fontSize="xs" color="#6c757d">Buy or transfer crypto instantly</Text>
                    </VStack>
                  </HStack>
                  <Box bg="#212529" color="white" py={3} px={4} borderRadius="lg" textAlign="center">
                    <Text fontSize="sm" fontWeight="600">Buy or transfer with Robinhood</Text>
                  </Box>
                </Box>
                
                <Box bg="white" p={4} borderRadius="lg">
                  <HStack spacing={3} mb={3}>
                    <Box w={8} h={8} bg="#1652f0" borderRadius="full" />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="600">Coinbase Pay</Text>
                      <Text fontSize="xs" color="#6c757d">Add funds via your Coinbase account</Text>
                    </VStack>
                  </HStack>
                  <Box bg="#1652f0" color="white" py={3} px={4} borderRadius="lg" textAlign="center">
                    <Text fontSize="sm" fontWeight="600">COINBASE PAY</Text>
                  </Box>
                </Box>
              </VStack>
            </Box>
          </Box>
        </HStack>
      </Box>
    </Box>
  )
}