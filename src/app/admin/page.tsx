"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Alert,
  Field,
  Spinner,
} from "@chakra-ui/react";
import ProjectManagement from "@/components/admin/ProjectManagement";
import { toaster } from "@/components/ui/toaster";
import FlexibleButton from "@/components/button/FlexibleButton";
import { useAuth } from "@/components/contexts/AuthContext";
import SectionWrapper from "@/components/common/SectionWrapper";
import CareerTimelineManagement from "@/components/admin/CareerTimelineManagement";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, login, isLoggingIn, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
      setPassword("");
      toaster.create({
        title: "Access Denied",
        description: "Invalid email or password",
        type: "error",
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        <VStack gap={4}>
          <Spinner size="xl" color="brand.primary" />
          <Text color="brand.secondary">Loading...</Text>
        </VStack>
      </Box>
    );
  }

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
          bg="brand.white"
          p={8}
          borderRadius="md"
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.15)"
          borderColor="brand.divider"
          w="full"
          maxW="md"
        >
          <VStack gap={6}>
            <Text fontSize="2xl" fontWeight="bold" color="brand.primary">
              Admin Dashboard
            </Text>

            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <VStack gap={4} w="full" color={"brand.secondary"}>
                <Field.Root required>
                  <Field.Label>
                    Email <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    p={2}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label>
                    Password <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    p={2}
                  />
                </Field.Root>

                {error && (
                  <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Title>{error}</Alert.Title>
                  </Alert.Root>
                )}

                <FlexibleButton type="submit" w="full" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <>
                      <Spinner size={"sm"} /> Logging in
                    </>
                  ) : (
                    "Login"
                  )}
                </FlexibleButton>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <>
    <SectionWrapper id="admin-dashboard" minHeight="100vh">
      <ProjectManagement />
    </SectionWrapper>
    <SectionWrapper id="admin-career" minHeight="100vh">
      <CareerTimelineManagement/>
    </SectionWrapper>
    </>

  );
}
