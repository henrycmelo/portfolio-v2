'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Alert,
  Field,
} from '@chakra-ui/react';
import ProjectManagement from '@/components/admin/ProjectManagement';
import { toaster } from "@/components/ui/toaster"

const ADMIN_PASSWORD = 'portfolio2024!'; // In production, use environment variables

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      toaster.create({
        title: 'Welcome to Admin Dashboard',
        status: 'success',
        duration: 3000,
      });
    } else {
      setError('Invalid password');
      toaster.create({
        title: 'Access Denied',
        description: 'Invalid password',
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        <Box
          bg="white"
          p={8}
          rounded="lg"
          shadow="md"
          w="full"
          maxW="md"
        >
          <VStack spacing={6}>
            <Text fontSize="2xl" fontWeight="bold" color="brand.primary">
              Admin Dashboard
            </Text>

            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <VStack gap={4} w="full">
                <Field.Root required>
                  <Field.Label>
                    Password <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                  />
                </Field.Root>

                {error && (
                  <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Title>{error}</Alert.Title>
                  </Alert.Root>
                )}

                <Button
                  type="submit"
                  colorPalette="blue"
                  w="full"
                  size="lg"
                >
                  Login
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Box
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        px={6}
        py={4}
      >
        <Text fontSize="xl" fontWeight="bold" color="brand.primary">
          Portfolio Admin Dashboard
        </Text>
      </Box>

      <Box p={6}>
        <ProjectManagement />
      </Box>
    </Box>
  );
}