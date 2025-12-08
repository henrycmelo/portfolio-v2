'use client';
import ProjectShowcaseCard from "@/design-system/organisms/ProjectCard";
import { projectsAPI } from "@/api/projectsAPI";
import { Box, Spinner, VStack } from "@chakra-ui/react";
import { Text } from "@/design-system/atoms";
import React, { useEffect, useState } from "react";
import { COLORS, SPACING, TYPOGRAPHY, SIZES } from "@/design-system/foundations";

export interface Project {
  id: number;
  company_name: string;
  company_logo_url: string;
  title: string;
  mockup_url: string;
  problem: string;
  solution: string;
  benefit: string;
  role: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchProjects = async () => {
            try{
                setLoading(true);
                setError(null);
                const data = await projectsAPI.getAllProjects();
                setProjects(data);
            } catch (err) {
                setError('Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    if (loading) return (
        <Box textAlign={"center"} py={10} px={6} color={'brand.secondary'}>
            <Spinner size="xl" />
            <Text mt={4} >Loading projects...</Text>
        </Box>
    );
    if (error) return (
        <Box textAlign={"center"} py={10} px={6}>
            <Text color="red.500" fontSize="lg">{error}</Text>
        </Box>
    )

    return (
        <Box
            maxW={SIZES.container['5xl']}
            w="100%"
            mx="auto"
        >
            {/* Section Title */}
            <Text
                fontSize={{
                    base: TYPOGRAPHY.sizes['2xl'],
                    md: TYPOGRAPHY.sizes['3xl'],
                    lg: TYPOGRAPHY.sizes['4xl']
                }}
                fontWeight={TYPOGRAPHY.weights.bold}
                color={COLORS.brand.primary}
                mb={{
                    base: SPACING.scale.lg,
                    md: SPACING.scale.xl
                }}
            >
                Projects
            </Text>

            {/* Projects List */}
            <VStack
                gap={{
                    base: SPACING.scale.xl,
                    md: SPACING.scale['2xl']
                }}
                align="stretch"
                w="100%"
            >
                {projects.map((project) => (
                    <ProjectShowcaseCard
                        key={project.id}
                        company_name={project.company_name}
                        company_logo_url={project.company_logo_url}
                        title={project.title}
                        mockup_url={project.mockup_url}
                        problem={project.problem}
                        solution={project.solution}
                        benefit={project.benefit}
                        role={project.role}
                    />
                ))}
            </VStack>
        </Box>
    );
}
    