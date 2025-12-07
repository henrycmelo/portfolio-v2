'use client';
import ProjectShowcaseCard from "@/design-system/organisms/ProjectCard";
import {projectsAPI} from "@/api/projectsAPI"
import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

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
        <Box>
            {projects.map((project) => (
                <ProjectShowcaseCard key={project.id} company_name={project.company_name} company_logo_url={project.company_logo_url} title={project.title} mockup_url={project.mockup_url} problem={project.problem} solution={project.solution} benefit={project.benefit} role={project.role} />
            ))}

        </Box>
    );
}
    