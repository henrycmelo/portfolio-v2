/**
 * CASE STUDIES MANAGEMENT COMPONENT
 *
 * Admin interface for managing case study teasers (CRUD operations).
 * Allows creating, reading, updating, and deleting case study entries.
 *
 * Features:
 * - Case study listing table with thumbnails and details
 * - Create/Edit dialog form for case study data entry
 * - Image upload integration for thumbnails
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
  Badge,
} from "@chakra-ui/react";

// Chakra UI - Data Display & Forms
import { Table } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";

// Icons
import { IoAdd, IoTrash, IoChevronDown, IoChevronUp, IoStar } from "react-icons/io5";

// API & Data Types
import { CaseStudyTeaser, caseStudiesAPI } from "@/api/caseStudiesAPI";

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

export default function CaseStudiesManagement() {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  // Data state
  const [caseStudies, setCaseStudies] = useState<CaseStudyTeaser[]>([]);
  const [loading, setLoading] = useState(true);

  // Accordion/Expansion state
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form state - holds current case study data being created/edited
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    tags: "",
    thumbnail_url: "",
    coming_soon: true,
    featured: false,
    display_order: 1,
  });

  // Image file state - stores selected file before upload
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // --------------------------------------------------------------------------
  // LIFECYCLE - Fetch case studies on component mount
  // --------------------------------------------------------------------------

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  // --------------------------------------------------------------------------
  // DATA FETCHING
  // --------------------------------------------------------------------------

  /**
   * Fetches all case studies from the API
   * Shows loading state and error toasts on failure
   */
  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const data = await caseStudiesAPI.getAllTeasers();
      setCaseStudies(data);
    } catch {
      toaster.create({
        title: "Error",
        description: "Failed to fetch case studies",
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
   */
  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Resets form to initial empty state
   */
  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      subtitle: "",
      tags: "",
      thumbnail_url: "",
      coming_soon: true,
      featured: false,
      display_order: caseStudies.length + 1,
    });
    setThumbnailFile(null);
    setExpandedId(null);
    setIsCreatingNew(false);
  };

  // --------------------------------------------------------------------------
  // CRUD OPERATIONS
  // --------------------------------------------------------------------------

  /**
   * Opens form for creating a new case study
   */
  const handleAdd = () => {
    resetForm();
    setIsCreatingNew(true);
    setExpandedId(null);
  };

  /**
   * Toggles the expansion of a case study for editing
   */
  const handleToggleEdit = (caseStudy: CaseStudyTeaser) => {
    if (expandedId === caseStudy.id) {
      resetForm();
      return;
    }

    setIsCreatingNew(false);
    setExpandedId(caseStudy.id);
    setFormData({
      slug: caseStudy.slug,
      title: caseStudy.title,
      subtitle: caseStudy.subtitle,
      tags: caseStudy.tags.join(", "),
      thumbnail_url: caseStudy.thumbnail_url,
      coming_soon: caseStudy.coming_soon,
      featured: caseStudy.featured,
      display_order: caseStudy.display_order,
    });
  };

  /**
   * Saves case study (create or update)
   */
  const handleSave = async () => {
    try {
      if (!formData.title.trim()) {
        toaster.create({
          title: "Validation Error",
          description: "Title is required",
          type: "error",
          duration: 3000,
        });
        return;
      }

      // Generate slug from title if not provided
      const slug = formData.slug.trim() || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

      const dataToSave = {
        slug,
        title: formData.title,
        subtitle: formData.subtitle,
        tags: formData.tags.split(",").map(t => t.trim()).filter(t => t),
        thumbnail_url: formData.thumbnail_url,
        coming_soon: formData.coming_soon,
        featured: formData.featured,
        display_order: formData.display_order,
      };

      // Find the case study being edited (if updating)
      const caseStudyBeingEdited = expandedId
        ? caseStudies.find(cs => cs.id === expandedId)
        : null;

      // Upload thumbnail if a new file was selected
      if (thumbnailFile) {
        const thumbnailUrl = await uploadImageToSupabase(
          thumbnailFile,
          `case-studies/${slug}`,
          'thumbnail'
        );
        dataToSave.thumbnail_url = thumbnailUrl;

        // Delete old thumbnail if updating
        if (caseStudyBeingEdited?.thumbnail_url &&
            caseStudyBeingEdited.thumbnail_url !== formData.thumbnail_url) {
          try {
            await deleteImageFromSupabase(caseStudyBeingEdited.thumbnail_url);
          } catch (error) {
            console.error('Failed to delete old thumbnail:', error);
          }
        }
      }

      if (expandedId) {
        await caseStudiesAPI.updateTeaser(expandedId, dataToSave);
        toaster.create({
          title: "Success",
          description: "Case study updated successfully",
          type: "success",
          duration: 3000,
        });
      } else {
        await caseStudiesAPI.createTeaser(dataToSave);
        toaster.create({
          title: "Success",
          description: "Case study created successfully",
          type: "success",
          duration: 3000,
        });
      }

      await fetchCaseStudies();
      resetForm();
    } catch (error: unknown) {
      console.error('Error saving case study:', error);
      const errorMessage = error instanceof Error ? error.message : `Failed to ${expandedId ? "update" : "create"} case study`;
      toaster.create({
        title: "Error",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    }
  };

  /**
   * Deletes a case study after confirmation
   */
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this case study?")) {
      try {
        const caseStudyToDelete = caseStudies.find((cs) => cs.id === id);

        // Delete thumbnail from storage
        if (caseStudyToDelete?.thumbnail_url) {
          try {
            await deleteImageFromSupabase(caseStudyToDelete.thumbnail_url);
          } catch (error) {
            console.error("Failed to delete thumbnail:", error);
          }
        }

        await caseStudiesAPI.deleteTeaser(id);
        toaster.create({
          title: "Success",
          description: "Case study deleted successfully",
          type: "success",
          duration: 3000,
        });
        await fetchCaseStudies();
      } catch {
        toaster.create({
          title: "Error",
          description: "Failed to delete case study",
          type: "error",
          duration: 3000,
        });
      }
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  // --------------------------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------------------------

  const renderCaseStudyForm = () => (
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
        {/* Title */}
        <Field.Root>
          <Field.Label>Title</Field.Label>
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter case study title"
          />
        </Field.Root>

        {/* Slug */}
        <Field.Root>
          <Field.Label>Slug (URL-friendly name)</Field.Label>
          <Input
            value={formData.slug}
            onChange={(e) => handleInputChange("slug", e.target.value)}
            placeholder="auto-generated-from-title"
          />
        </Field.Root>

        {/* Subtitle */}
        <Field.Root>
          <Field.Label>Subtitle</Field.Label>
          <Textarea
            value={formData.subtitle}
            onChange={(e) => handleInputChange("subtitle", e.target.value)}
            placeholder="Brief description or key result"
            rows={2}
          />
        </Field.Root>

        {/* Tags */}
        <Field.Root>
          <Field.Label>Tags (comma-separated)</Field.Label>
          <Input
            value={formData.tags}
            onChange={(e) => handleInputChange("tags", e.target.value)}
            placeholder="Fintech, UX Research, Mobile"
          />
        </Field.Root>

        {/* Display Order */}
        <Field.Root>
          <Field.Label>Display Order</Field.Label>
          <Input
            type="number"
            value={formData.display_order}
            onChange={(e) => handleInputChange("display_order", parseInt(e.target.value) || 1)}
            placeholder="1"
          />
        </Field.Root>

        {/* Checkboxes Row */}
        <HStack gap={SPACING.component.gap.md}>
          <Field.Root>
            <HStack>
              <input
                type="checkbox"
                checked={formData.coming_soon}
                onChange={(e) => handleInputChange("coming_soon", e.target.checked)}
              />
              <Field.Label mb={0}>Coming Soon</Field.Label>
            </HStack>
          </Field.Root>

          <Field.Root>
            <HStack>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleInputChange("featured", e.target.checked)}
              />
              <Field.Label mb={0}>Featured</Field.Label>
            </HStack>
          </Field.Root>
        </HStack>

        {/* Thumbnail Image */}
        <Field.Root>
          <Field.Label>Thumbnail Image</Field.Label>
          <ImageUpload
            currentImageUrl={formData.thumbnail_url}
            onImageSelect={(file, previewUrl) => {
              setThumbnailFile(file);
              handleInputChange("thumbnail_url", previewUrl);
            }}
            onImageDelete={() => {
              setThumbnailFile(null);
              handleInputChange("thumbnail_url", "");
            }}
            label="Upload Thumbnail"
          />
        </Field.Root>

        <HStack gap={SPACING.form.footerGap} justify="flex-end" pt={SPACING.form.footerPaddingTop}>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {expandedId ? "Update" : "Create"} Case Study
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
        <Text variant="body" mt={SPACING.component.margin.elementBottom}>Loading case studies...</Text>
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
        title="Case Studies Management"
        actionLabel="Add New Case Study"
        onAction={handleAdd}
        actionIcon={<IoAdd />}
      />

      {/* "Create New" Form */}
      {isCreatingNew && renderCaseStudyForm()}

      {/* Empty State */}
      {caseStudies.length === 0 && !isCreatingNew ? (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>No case studies found</Alert.Title>
          <Alert.Description>
            Click &quot;Add New Case Study&quot; to create your first case study teaser.
          </Alert.Description>
        </Alert.Root>
      ) : caseStudies.length > 0 ? (
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
            <Table.Header bg={COLORS.ui.tableHeaderBg}>
              <Table.Row>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                >
                  Thumbnail
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                >
                  Title
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                >
                  Tags
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                >
                  Status
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                >
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {caseStudies.map((caseStudy) => (
                <>
                  <Table.Row
                    key={caseStudy.id}
                    bg={expandedId === caseStudy.id ? COLORS.brand.accent + "10" : "transparent"}
                    _hover={{ bg: COLORS.ui.tableRowHoverBg, cursor: "pointer" }}
                    style={{ transition: ANIMATIONS.transitions.background }}
                    onClick={(e) => {
                      if (!(e.target as HTMLElement).closest('button')) {
                        handleToggleEdit(caseStudy);
                      }
                    }}
                  >
                    {/* Thumbnail Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      {caseStudy.thumbnail_url ? (
                        <Image
                          src={caseStudy.thumbnail_url}
                          alt={caseStudy.title}
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

                    {/* Title Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <VStack align="start" gap={1}>
                        <HStack>
                          <Text fontWeight="medium">{caseStudy.title}</Text>
                          {caseStudy.featured && (
                            <IoStar color="#D4AF37" />
                          )}
                        </HStack>
                        <Text variant="caption" color={COLORS.brand.textSecondary}>
                          {caseStudy.subtitle}
                        </Text>
                      </VStack>
                    </Table.Cell>

                    {/* Tags Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <HStack gap={1} flexWrap="wrap">
                        {caseStudy.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} size="sm" variant="subtle">
                            {tag}
                          </Badge>
                        ))}
                      </HStack>
                    </Table.Cell>

                    {/* Status Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <Badge
                        colorPalette={caseStudy.coming_soon ? "yellow" : "green"}
                        variant="subtle"
                      >
                        {caseStudy.coming_soon ? "Coming Soon" : "Published"}
                      </Badge>
                    </Table.Cell>

                    {/* Actions Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <HStack gap={SPACING.component.gap.xs}>
                        <IconButton
                          aria-label={expandedId === caseStudy.id ? "Collapse" : "Expand"}
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleEdit(caseStudy);
                          }}
                        >
                          {expandedId === caseStudy.id ? <IoChevronUp /> : <IoChevronDown />}
                        </IconButton>
                        <IconButton
                          aria-label="Delete case study"
                          size="sm"
                          variant="outline"
                          colorPalette="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(caseStudy.id);
                          }}
                        >
                          <IoTrash />
                        </IconButton>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>

                  {/* Expanded Edit Form */}
                  {expandedId === caseStudy.id && (
                    <Table.Row key={`${caseStudy.id}-form`}>
                      <Table.Cell colSpan={5} p={0}>
                        <Box p={SPACING.component.padding.card.y}>
                          {renderCaseStudyForm()}
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
