"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Alert,
  Spinner,
  Image,
  IconButton,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import { Project } from "@/api/projectsAPI";
import { projectsAPI } from "@/api/projectsAPI";
import { toaster } from "@/components/ui/toaster";
import ImageUpload from "./ImageUpload";
import FlexibleButton from "../button/FlexibleButton";

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    company_logo_url: "",
    title: "",
    highlight: "",
    mockup_url: "",
    problem: "",
    solution: "",
    benefit: "",
    role: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAllProjects();
      setProjects(data);
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to fetch projects",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      company_name: "",
      company_logo_url: "",
      title: "",
      highlight: "",
      mockup_url: "",
      problem: "",
      solution: "",
      benefit: "",
      role: "",
    });
    setSelectedProject(null);
    setIsEditing(false);
  };

  const handleAdd = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      company_name: project.company_name,
      company_logo_url: project.company_logo_url,
      title: project.title,
      highlight: project.highlight,
      mockup_url: project.mockup_url,
      problem: project.problem,
      solution: project.solution,
      benefit: project.benefit,
      role: project.role,
    });
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing && selectedProject) {
        await projectsAPI.updateProject(selectedProject.id, formData);
        toaster.create({
          title: "Success",
          description: "Project updated successfully",
          status: "success",
          duration: 3000,
        });
      } else {
        await projectsAPI.createProject(formData);
        toaster.create({
          title: "Success",
          description: "Project created successfully",
          status: "success",
          duration: 3000,
        });
      }

      await fetchProjects();
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toaster.create({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} project`,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectsAPI.deleteProject(id);
        toaster.create({
          title: "Success",
          description: "Project deleted successfully",
          status: "success",
          duration: 3000,
        });
        await fetchProjects();
      } catch (error) {
        toaster.create({
          title: "Error",
          description: "Failed to delete project",
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
    resetForm();
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading projects...</Text>
      </Box>
    );
  }

  return (
    <Box
      maxW="5xl"
      w="full"
      bg="brand.white"
      borderRadius="md"
      boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      overflow="hidden"
      border="1px solid"
      borderColor="brand.divider"
      mx="auto"
    >
      <Box p={{ base: 8, md: 12, lg: 16 }}>
        <HStack justify="space-between" mb={6} align={"center"}>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color={"brand.primary"}
          >
            Project Management
          </Text>

          <FlexibleButton variant="solid" onClick={handleAdd}>
            <IoAdd />
            Add New Project
          </FlexibleButton>
        </HStack>

        {projects.length === 0 ? (
          <Alert.Root status="info">
            <Alert.Indicator />
            <Alert.Title>No projects found</Alert.Title>
            <Alert.Description>
              Click "Add New Project" to create your first project.
            </Alert.Description>
          </Alert.Root>
        ) : (
          <Box
            overflowX="auto"
            borderRadius="lg"
            border="1px solid"
            borderColor="brand.divider"
          >
            <Table.Root
              variant="outline"
              color={"brand.secondary"}
              size="md"
              style={{ tableLayout: "auto" }}
            >
              <Table.Header bg={"brand.bg"}>
                <Table.Row>
                  <Table.ColumnHeader
                    fontWeight={"bold"}
                    color="brand.primary"
                    py={4}
                    px={3}
                    verticalAlign="middle"
                  >
                    Logo
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight={"bold"}
                    color="brand.primary"
                    py={4}
                    px={3}
                    verticalAlign="middle"
                  >
                    Company
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight={"bold"}
                    color="brand.primary"
                    py={4}
                    px={3}
                    verticalAlign="middle"
                  >
                    Title
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight={"bold"}
                    color="brand.primary"
                    py={4}
                    px={3}
                    verticalAlign="middle"
                  >
                    Mockup
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight={"bold"}
                    color="brand.primary"
                    py={4}
                    px={3}
                    verticalAlign="middle"
                  >
                    Role
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight={"bold"}
                    color="brand.primary"
                    py={4}
                    px={3}
                    verticalAlign="middle"
                  >
                    Actions
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {projects.map((project) => (
                  <Table.Row
                    key={project.id}
                    _hover={{ bg: "brand.divider", cursor: "pointer" }}
                    style={{ transition: "background 0.2s" }}
                    onClick={() => handleEdit(project)}
                  >
                    <Table.Cell py={4} px={3} verticalAlign="middle">
                      {project.company_logo_url ? (
                        <Image
                          src={project.company_logo_url}
                          alt={`${project.company_name} logo`}
                          boxSize="40px"
                          objectFit="contain"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                        />
                      ) : (
                        <Box
                          boxSize="40px"
                          bg="gray.100"
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text fontSize="xs" color="gray.500">
                            No Logo
                          </Text>
                        </Box>
                      )}
                    </Table.Cell>
                    <Table.Cell py={4} px={3} verticalAlign="middle">
                      {project.company_name}
                    </Table.Cell>
                    <Table.Cell py={4} px={3} verticalAlign="middle">
                      {project.title}
                    </Table.Cell>
                    <Table.Cell py={4} px={3} verticalAlign="middle">
                      {project.mockup_url ? (
                        <Image
                          src={project.mockup_url}
                          alt={`${project.title} mockup`}
                          boxSize="60px"
                          objectFit="cover"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                        />
                      ) : (
                        <Box
                          boxSize="60px"
                          bg="gray.100"
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text fontSize="xs" color="gray.500">
                            No Image
                          </Text>
                        </Box>
                      )}
                    </Table.Cell>
                    <Table.Cell py={4} px={3} verticalAlign="middle">
                      {project.role}
                    </Table.Cell>
                    <Table.Cell py={4} px={3} verticalAlign="middle">
                      <HStack gap={2}>
                        <IconButton
                          aria-label="Edit project"
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(project)}
                        >
                          <IoPencil />
                        </IconButton>
                        <IconButton
                          aria-label="Delete project"
                          size="sm"
                          variant="outline"
                          colorPalette="red"
                          onClick={() => handleDelete(project.id)}
                        >
                          <IoTrash />
                        </IconButton>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        <DialogRoot
          open={isOpen}
          onOpenChange={(e) => setIsOpen(e.open)}
          size="xl"
        >
          <DialogContent maxW="4xl">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogCloseTrigger onClick={handleModalClose} />
            </DialogHeader>
            <DialogBody pb={6}>
              <VStack gap={4} align="stretch">
                <HStack gap={4} align="start">
                  <Field.Root flex="1">
                    <Field.Label>Company Name</Field.Label>
                    <Input
                      value={formData.company_name}
                      onChange={(e) =>
                        handleInputChange("company_name", e.target.value)
                      }
                      placeholder="Enter company name"
                    />
                  </Field.Root>
                  <Field.Root flex="1">
                    <Field.Label>Company Logo</Field.Label>
                    <ImageUpload
                      currentImageUrl={formData.company_logo_url}
                      onImageUpload={(url) =>
                        handleInputChange("company_logo_url", url)
                      }
                      onImageDelete={() =>
                        handleInputChange("company_logo_url", "")
                      }
                      bucketName="portfolio-images"
                      folder="logos"
                      label="Upload Logo"
                    />
                  </Field.Root>
                </HStack>

                <HStack gap={4}>
                  <Field.Root>
                    <Field.Label>Title</Field.Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter project title"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Highlight</Field.Label>
                    <Input
                      value={formData.highlight}
                      onChange={(e) =>
                        handleInputChange("highlight", e.target.value)
                      }
                      placeholder="Enter highlight text"
                    />
                  </Field.Root>
                </HStack>

                <Field.Root>
                  <Field.Label>Mockup Image</Field.Label>
                  <ImageUpload
                    currentImageUrl={formData.mockup_url}
                    onImageUpload={(url) =>
                      handleInputChange("mockup_url", url)
                    }
                    onImageDelete={() => handleInputChange("mockup_url", "")}
                    bucketName="portfolio-images"
                    folder="mockups"
                    label="Upload Mockup"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Problem</Field.Label>
                  <Textarea
                    value={formData.problem}
                    onChange={(e) =>
                      handleInputChange("problem", e.target.value)
                    }
                    placeholder="Describe the problem"
                    rows={3}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Solution</Field.Label>
                  <Textarea
                    value={formData.solution}
                    onChange={(e) =>
                      handleInputChange("solution", e.target.value)
                    }
                    placeholder="Describe the solution"
                    rows={3}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Benefit</Field.Label>
                  <Textarea
                    value={formData.benefit}
                    onChange={(e) =>
                      handleInputChange("benefit", e.target.value)
                    }
                    placeholder="Describe the benefit"
                    rows={3}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Role</Field.Label>
                  <Textarea
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    placeholder="Describe your role"
                    rows={2}
                  />
                </Field.Root>

                <HStack gap={3} justify="flex-end" pt={4}>
                  <Button variant="outline" onClick={handleModalClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    {isEditing ? "Update" : "Create"} Project
                  </Button>
                </HStack>
              </VStack>
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      </Box>
    </Box>
  );
}
