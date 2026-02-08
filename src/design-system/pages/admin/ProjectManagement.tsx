/**
 * PROJECT MANAGEMENT COMPONENT
 *
 * Admin interface for managing portfolio projects (CRUD operations).
 * Allows creating, reading, updating, and deleting project entries.
 *
 * Features:
 * - Project listing table with company logos, mockups, and details
 * - Create/Edit dialog form for project data entry
 * - Image upload integration for logos and mockups
 * - Real-time validation and error handling
 *
 * @component
 */

"use client";

// ============================================================================
// IMPORTS
// ============================================================================

// React & State Management
import { useState, useEffect } from "react";

// Chakra UI - Layout & Structure
import {
  Box,
  VStack,
  HStack,
  Alert,
  Spinner,
  Image,
  IconButton,
  Collapsible,
} from "@chakra-ui/react";

// Chakra UI - Data Display & Forms
import { Table } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";

// Icons
import { IoAdd, IoPencil, IoTrash, IoChevronDown, IoChevronUp } from "react-icons/io5";

// API & Data Types
import { Project } from "@/api/projectsAPI";
import { projectsAPI } from "@/api/projectsAPI";

// Utilities & Components
import { toaster } from "@/components/ui/toaster";
import ImageUpload from "@/design-system/molecules/ImageUpload";
import { uploadImageToSupabase, deleteImageFromSupabase } from "@/api/imageUploadAPI";

// Design System - Atoms
import { Button } from "@/design-system/atoms";
import { Text } from "@/design-system/atoms";
import { Input } from "@/design-system/atoms";
import { Textarea } from "@/design-system/atoms";

// Design System - Organisms & Templates
import { PageHeader } from "@/design-system/organisms/PageHeader";
import { AdminPageTemplate } from "@/design-system/templates/AdminPageTemplate";

// Design System - Foundations (Design Tokens)
import { COLORS, SPACING, SIZES, BORDERS, ANIMATIONS } from "@/design-system/foundations";

// ============================================================================
// COMPONENT
// ============================================================================

export default function ProjectManagement() {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  // Data state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Accordion/Expansion state
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form state - holds current project data being created/edited
  const [formData, setFormData] = useState({
    company_name: "",
    company_logo_url: "",
    title: "",
    mockup_url: "",
    problem: "",
    solution: "",
    benefit: "",
    role: "",
  });

  // Image file state - stores selected files before upload
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [mockupFile, setMockupFile] = useState<File | null>(null);

  // --------------------------------------------------------------------------
  // LIFECYCLE - Fetch projects on component mount
  // --------------------------------------------------------------------------

  useEffect(() => {
    fetchProjects();
  }, []);

  // --------------------------------------------------------------------------
  // DATA FETCHING
  // --------------------------------------------------------------------------

  /**
   * Fetches all projects from the API
   * Shows loading state and error toasts on failure
   */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAllProjects();
      setProjects(data);
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to fetch projects",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // FORM HANDLERS
  // --------------------------------------------------------------------------

  /**
   * Updates form data when input fields change
   * @param field - The form field to update
   * @param value - The new value for the field
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Resets form to initial empty state
   * Clears expanded state
   */
  const resetForm = () => {
    setFormData({
      company_name: "",
      company_logo_url: "",
      title: "",
      mockup_url: "",
      problem: "",
      solution: "",
      benefit: "",
      role: "",
    });
    setLogoFile(null);
    setMockupFile(null);
    setExpandedProjectId(null);
    setIsCreatingNew(false);
  };

  // --------------------------------------------------------------------------
  // CRUD OPERATIONS
  // --------------------------------------------------------------------------

  /**
   * Opens form for creating a new project
   * Resets form to empty state and expands "new project" section
   */
  const handleAdd = () => {
    resetForm();
    setIsCreatingNew(true);
    setExpandedProjectId(null);
  };

  /**
   * Toggles the expansion of a project for editing
   * Populates form with project data
   * @param project - The project to edit
   */
  const handleToggleEdit = (project: Project) => {
    // If clicking the same project, collapse it
    if (expandedProjectId === project.id) {
      resetForm();
      return;
    }

    // Expand this project and populate form
    setIsCreatingNew(false);
    setExpandedProjectId(project.id);
    setFormData({
      company_name: project.company_name,
      company_logo_url: project.company_logo_url,
      title: project.title,
      mockup_url: project.mockup_url,
      problem: project.problem,
      solution: project.solution,
      benefit: project.benefit,
      role: project.role,
    });
  };

  /**
   * Saves project (create or update)
   * Uploads images first, then saves project data
   * Refreshes project list and collapses form on success
   */
  const handleSave = async () => {
    try {
      // Validate company name is provided (needed for folder structure)
      if (!formData.company_name.trim()) {
        toaster.create({
          title: "Validation Error",
          description: "Company name is required",
          type: "error",
          duration: 3000,
        });
        return;
      }

      // Create a copy of formData to update with new URLs
      const dataToSave = { ...formData };

      // Find the project being edited (if updating)
      const projectBeingEdited = expandedProjectId
        ? projects.find(p => p.id === expandedProjectId)
        : null;

      // Upload logo if a new file was selected
      if (logoFile) {
        const logoUrl = await uploadImageToSupabase(
          logoFile,
          formData.company_name,
          'logo'
        );
        dataToSave.company_logo_url = logoUrl;

        // Delete old logo if we're updating and there was a previous logo
        if (projectBeingEdited?.company_logo_url &&
            projectBeingEdited.company_logo_url !== formData.company_logo_url) {
          try {
            await deleteImageFromSupabase(projectBeingEdited.company_logo_url);
          } catch (error) {
            console.error('Failed to delete old logo:', error);
            // Continue anyway - new upload succeeded
          }
        }
      }

      // Upload mockup if a new file was selected
      if (mockupFile) {
        const mockupUrl = await uploadImageToSupabase(
          mockupFile,
          formData.company_name,
          'mockup'
        );
        dataToSave.mockup_url = mockupUrl;

        // Delete old mockup if we're updating and there was a previous mockup
        if (projectBeingEdited?.mockup_url &&
            projectBeingEdited.mockup_url !== formData.mockup_url) {
          try {
            await deleteImageFromSupabase(projectBeingEdited.mockup_url);
          } catch (error) {
            console.error('Failed to delete old mockup:', error);
            // Continue anyway - new upload succeeded
          }
        }
      }

      if (expandedProjectId) {
        // Update existing project
        await projectsAPI.updateProject(expandedProjectId, dataToSave);
        toaster.create({
          title: "Success",
          description: "Project updated successfully",
          type: "success",
          duration: 3000,
        });
      } else {
        // Create new project
        await projectsAPI.createProject(dataToSave);
        toaster.create({
          title: "Success",
          description: "Project created successfully",
          type: "success",
          duration: 3000,
        });
      }

      await fetchProjects();
      resetForm();
    } catch (error: unknown) {
      console.error('Error saving project:', error);
      const message = error instanceof Error ? error.message : `Failed to ${expandedProjectId ? "update" : "create"} project`;
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 5000,
      });
    }
  };

  /**
   * Deletes a project after confirmation
   * Also deletes associated images from storage bucket
   * Refreshes project list on success
   * @param id - The ID of the project to delete
   */
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        // Find the project to get image URLs before deleting
        const projectToDelete = projects.find((p) => p.id === id);

        // Delete images from storage bucket first
        if (projectToDelete) {
          // Delete logo if it exists
          if (projectToDelete.company_logo_url) {
            try {
              await deleteImageFromSupabase(projectToDelete.company_logo_url);
            } catch (error) {
              console.error("Failed to delete logo from storage:", error);
              // Continue anyway - we still want to delete the project
            }
          }

          // Delete mockup if it exists
          if (projectToDelete.mockup_url) {
            try {
              await deleteImageFromSupabase(projectToDelete.mockup_url);
            } catch (error) {
              console.error("Failed to delete mockup from storage:", error);
              // Continue anyway - we still want to delete the project
            }
          }
        }

        // Now delete the project record from database
        await projectsAPI.deleteProject(id);
        toaster.create({
          title: "Success",
          description: "Project and associated images deleted successfully",
          type: "success",
          duration: 3000,
        });
        await fetchProjects();
      } catch (error) {
        toaster.create({
          title: "Error",
          description: "Failed to delete project",
          type: "error",
          duration: 3000,
        });
      }
    }
  };

  /**
   * Cancels editing/creating and resets form state
   */
  const handleCancel = () => {
    resetForm();
  };

  // --------------------------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------------------------

  /**
   * Renders the project edit/create form
   */
  const renderProjectForm = () => (
    <Box
      bg={COLORS.ui.containerBg}
      p={SPACING.component.padding.card.y}
      borderRadius={BORDERS.radius.md}
      border={BORDERS.widths.thin}
      borderColor={COLORS.brand.accent}
      mb={SPACING.component.margin.elementBottom}
      color={COLORS.brand.text}
    >
      <VStack gap={SPACING.form.fieldGap} align="stretch">
        {/* Company Name */}
        <Field.Root>
          <Field.Label>Company Name</Field.Label>
          <Input
            value={formData.company_name}
            onChange={(e) => handleInputChange("company_name", e.target.value)}
            placeholder="Enter company name"
          />
        </Field.Root>

        {/* Title */}
        <Field.Root>
          <Field.Label>Title</Field.Label>
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter project title"
          />
        </Field.Root>

        {/* Problem Description */}
        <Field.Root>
          <Field.Label>Problem</Field.Label>
          <Textarea
            value={formData.problem}
            onChange={(e) => handleInputChange("problem", e.target.value)}
            placeholder="Describe the problem"
            rows={3}
          />
        </Field.Root>

        {/* Solution Description */}
        <Field.Root>
          <Field.Label>Solution</Field.Label>
          <Textarea
            value={formData.solution}
            onChange={(e) => handleInputChange("solution", e.target.value)}
            placeholder="Describe the solution"
            rows={3}
          />
        </Field.Root>

        {/* Benefit Description */}
        <Field.Root>
          <Field.Label>Benefit</Field.Label>
          <Textarea
            value={formData.benefit}
            onChange={(e) => handleInputChange("benefit", e.target.value)}
            placeholder="Describe the benefit"
            rows={3}
          />
        </Field.Root>

        {/* Role Description */}
        <Field.Root>
          <Field.Label>Role</Field.Label>
          <Textarea
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            placeholder="Describe your role"
            rows={2}
          />
        </Field.Root>

        {/* Company Logo */}
        <Field.Root>
          <Field.Label>Company Logo</Field.Label>
          <ImageUpload
            currentImageUrl={formData.company_logo_url}
            onImageSelect={(file, previewUrl) => {
              setLogoFile(file);
              handleInputChange("company_logo_url", previewUrl);
            }}
            onImageDelete={() => {
              setLogoFile(null);
              handleInputChange("company_logo_url", "");
            }}
            label="Upload Logo"
          />
        </Field.Root>

        {/* Mockup Image Upload */}
        <Field.Root>
          <Field.Label>Mockup Image</Field.Label>
          <ImageUpload
            currentImageUrl={formData.mockup_url}
            onImageSelect={(file, previewUrl) => {
              setMockupFile(file);
              handleInputChange("mockup_url", previewUrl);
            }}
            onImageDelete={() => {
              setMockupFile(null);
              handleInputChange("mockup_url", "");
            }}
            label="Upload Mockup"
          />
        </Field.Root>

        <HStack gap={SPACING.form.footerGap} justify="flex-end" pt={SPACING.form.footerPaddingTop}>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {expandedProjectId ? "Update" : "Create"} Project
          </Button>
        </HStack>
      </VStack>
    </Box>
  );

  // --------------------------------------------------------------------------
  // LOADING STATE
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <Box textAlign="center" py={SPACING.component.margin.sectionTop}>
        <Spinner size={SIZES.component.spinner.xl} />
        <Text variant="body" mt={SPACING.component.margin.elementBottom}>Loading projects...</Text>
      </Box>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <AdminPageTemplate>
      {/* Page Header with Add Button */}
      <PageHeader
        title="Project Management"
        actionLabel="Add New Project"
        onAction={handleAdd}
        actionIcon={<IoAdd />}
      />

      {/* "Create New Project" Form - Shows when user clicks Add button */}
      {isCreatingNew && renderProjectForm()}

      {/* Empty State - No Projects */}
      {projects.length === 0 && !isCreatingNew ? (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>No projects found</Alert.Title>
          <Alert.Description>
            Click &quot;Add New Project&quot; to create your first project.
          </Alert.Description>
        </Alert.Root>
      ) : projects.length > 0 ? (
          /* Projects Table */
          <Box
            overflowX="auto"
            borderRadius={BORDERS.radius.lg}
            border={BORDERS.widths.thin}
            borderColor={COLORS.ui.containerBorder}
          >
            <Table.Root
              variant="outline"
              color={COLORS.brand.secondary}
              size="md"
              style={{ tableLayout: "auto" }}
            >
              {/* Table Header */}
              <Table.Header bg={COLORS.ui.tableHeaderBg}>
                <Table.Row>
                  <Table.ColumnHeader
                    fontWeight="bold"
                    color={COLORS.brand.primary}
                    py={SPACING.table.header.paddingY}
                    px={SPACING.table.header.paddingX}
                    verticalAlign="middle"
                  >
                    Logo
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight="bold"
                    color={COLORS.brand.primary}
                    py={SPACING.table.header.paddingY}
                    px={SPACING.table.header.paddingX}
                    verticalAlign="middle"
                  >
                    Company
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight="bold"
                    color={COLORS.brand.primary}
                    py={SPACING.table.header.paddingY}
                    px={SPACING.table.header.paddingX}
                    verticalAlign="middle"
                  >
                    Title
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight="bold"
                    color={COLORS.brand.primary}
                    py={SPACING.table.header.paddingY}
                    px={SPACING.table.header.paddingX}
                    verticalAlign="middle"
                  >
                    Mockup
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight="bold"
                    color={COLORS.brand.primary}
                    py={SPACING.table.header.paddingY}
                    px={SPACING.table.header.paddingX}
                    verticalAlign="middle"
                  >
                    Role
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    fontWeight="bold"
                    color={COLORS.brand.primary}
                    py={SPACING.table.header.paddingY}
                    px={SPACING.table.header.paddingX}
                    verticalAlign="middle"
                  >
                    Actions
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              {/* Table Body - Project Rows with Accordion */}
              <Table.Body>
                {projects.map((project) => (
                  <>
                    <Table.Row
                      key={project.id}
                      bg={expandedProjectId === project.id ? COLORS.brand.accent + "10" : "transparent"}
                      _hover={{ bg: COLORS.ui.tableRowHoverBg, cursor: "pointer" }}
                      style={{ transition: ANIMATIONS.transitions.background }}
                      onClick={(e) => {
                        // Don't toggle if clicking on action buttons
                        if (!(e.target as HTMLElement).closest('button')) {
                          handleToggleEdit(project);
                        }
                      }}
                    >
                      {/* Company Logo Cell */}
                      <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                        {project.company_logo_url ? (
                          <Image
                            src={project.company_logo_url}
                            alt={`${project.company_name} logo`}
                            boxSize={SIZES.component.avatar.md}
                            objectFit="contain"
                            borderRadius={BORDERS.radius.md}
                            border={BORDERS.widths.thin}
                            borderColor={COLORS.ui.placeholderBorder}
                          />
                        ) : (
                          <Box
                            boxSize={SIZES.component.avatar.md}
                            bg={COLORS.ui.placeholderBg}
                            borderRadius={BORDERS.radius.md}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text variant="caption" color={COLORS.ui.placeholderText}>
                              No Logo
                            </Text>
                          </Box>
                        )}
                      </Table.Cell>

                      {/* Company Name Cell */}
                      <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                        {project.company_name}
                      </Table.Cell>

                      {/* Project Title Cell */}
                      <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                        {project.title}
                      </Table.Cell>

                      {/* Mockup Image Cell */}
                      <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                        {project.mockup_url ? (
                          <Image
                            src={project.mockup_url}
                            alt={`${project.title} mockup`}
                            boxSize={SIZES.component.avatar.lg}
                            objectFit="cover"
                            borderRadius={BORDERS.radius.md}
                            border={BORDERS.widths.thin}
                            borderColor={COLORS.ui.placeholderBorder}
                          />
                        ) : (
                          <Box
                            boxSize={SIZES.component.avatar.lg}
                            bg={COLORS.ui.placeholderBg}
                            borderRadius={BORDERS.radius.md}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text variant="caption" color={COLORS.ui.placeholderText}>
                              No Image
                            </Text>
                          </Box>
                        )}
                      </Table.Cell>

                      {/* Role Cell */}
                      <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                        {project.role}
                      </Table.Cell>

                      {/* Actions Cell - Edit/Delete Buttons */}
                      <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                        <HStack gap={SPACING.component.gap.xs}>
                          <IconButton
                            aria-label={expandedProjectId === project.id ? "Collapse" : "Expand"}
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleEdit(project);
                            }}
                          >
                            {expandedProjectId === project.id ? <IoChevronUp /> : <IoChevronDown />}
                          </IconButton>
                          <IconButton
                            aria-label="Delete project"
                            size="sm"
                            variant="outline"
                            colorPalette="red"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(project.id);
                            }}
                          >
                            <IoTrash />
                          </IconButton>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>

                    {/* Expanded Edit Form - Shows below the row when expanded */}
                    {expandedProjectId === project.id && (
                      <Table.Row key={`${project.id}-form`}>
                        <Table.Cell colSpan={6} p={0}>
                          <Box p={SPACING.component.padding.card.y}>
                            {renderProjectForm()}
                          </Box>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
      ) : null}
    </AdminPageTemplate>
  );
}
