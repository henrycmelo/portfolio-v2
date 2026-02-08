/**
 * REVIEWS MANAGEMENT COMPONENT
 *
 * Admin interface for managing testimonials/reviews (CRUD operations).
 * Allows creating, reading, updating, and deleting review entries.
 *
 * @component
 */

"use client";

// ============================================================================
// IMPORTS
// ============================================================================

import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Alert,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { IoAdd, IoTrash, IoChevronDown, IoChevronUp } from "react-icons/io5";

import { DatabaseReview, reviewsAPI } from "@/api/reviewsAPI";
import { toaster } from "@/components/ui/toaster";

import { Button } from "@/design-system/atoms";
import { Text } from "@/design-system/atoms";
import { Input } from "@/design-system/atoms";
import { Textarea } from "@/design-system/atoms";

import { PageHeader } from "@/design-system/organisms/PageHeader";
import { AdminPageTemplate } from "@/design-system/templates/AdminPageTemplate";

import { COLORS, SPACING, SIZES, BORDERS, ANIMATIONS } from "@/design-system/foundations";

// ============================================================================
// COMPONENT
// ============================================================================

export default function ReviewsManagement() {
  // State
  const [reviews, setReviews] = useState<DatabaseReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const [formData, setFormData] = useState({
    reviewer_name: "",
    content: "",
    reviewer_role: "",
    company: "",
    linkedin_url: "",
  });

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewsAPI.getAllReviews();
      setReviews(data);
    } catch {
      toaster.create({
        title: "Error",
        description: "Failed to fetch reviews",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      reviewer_name: "",
      content: "",
      reviewer_role: "",
      company: "",
      linkedin_url: "",
    });
    setExpandedId(null);
    setIsCreatingNew(false);
  };

  const handleAdd = () => {
    resetForm();
    setIsCreatingNew(true);
    setExpandedId(null);
  };

  const handleToggleEdit = (review: DatabaseReview) => {
    if (expandedId === review.id) {
      resetForm();
      return;
    }

    setIsCreatingNew(false);
    setExpandedId(review.id);
    setFormData({
      reviewer_name: review.reviewer_name,
      content: review.content,
      reviewer_role: review.reviewer_role,
      company: review.company,
      linkedin_url: review.linkedin_url,
    });
  };

  const handleSave = async () => {
    try {
      if (!formData.reviewer_name.trim() || !formData.content.trim()) {
        toaster.create({
          title: "Validation Error",
          description: "Name and content are required",
          type: "error",
          duration: 3000,
        });
        return;
      }

      if (expandedId) {
        await reviewsAPI.updateReview(expandedId, formData);
        toaster.create({
          title: "Success",
          description: "Review updated successfully",
          type: "success",
          duration: 3000,
        });
      } else {
        await reviewsAPI.createReview(formData);
        toaster.create({
          title: "Success",
          description: "Review created successfully",
          type: "success",
          duration: 3000,
        });
      }

      await fetchReviews();
      resetForm();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : `Failed to ${expandedId ? "update" : "create"} review`;
      toaster.create({
        title: "Error",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await reviewsAPI.deleteReview(id);
        toaster.create({
          title: "Success",
          description: "Review deleted successfully",
          type: "success",
          duration: 3000,
        });
        await fetchReviews();
      } catch {
        toaster.create({
          title: "Error",
          description: "Failed to delete review",
          type: "error",
          duration: 3000,
        });
      }
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  // Form renderer
  const renderReviewForm = () => (
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
        <Field.Root>
          <Field.Label>Reviewer Name</Field.Label>
          <Input
            value={formData.reviewer_name}
            onChange={(e) => handleInputChange("reviewer_name", e.target.value)}
            placeholder="Enter reviewer name"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Role</Field.Label>
          <Input
            value={formData.reviewer_role}
            onChange={(e) => handleInputChange("reviewer_role", e.target.value)}
            placeholder="e.g., Senior Product Manager"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Company</Field.Label>
          <Input
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="Enter company name"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Review Content</Field.Label>
          <Textarea
            value={formData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            placeholder="Enter the review/testimonial"
            rows={4}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>LinkedIn URL (optional)</Field.Label>
          <Input
            value={formData.linkedin_url}
            onChange={(e) => handleInputChange("linkedin_url", e.target.value)}
            placeholder="https://linkedin.com/in/..."
          />
        </Field.Root>

        <HStack gap={SPACING.form.footerGap} justify="flex-end" pt={SPACING.form.footerPaddingTop}>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {expandedId ? "Update" : "Create"} Review
          </Button>
        </HStack>
      </VStack>
    </Box>
  );

  // Loading state
  if (loading) {
    return (
      <Box textAlign="center" py={SPACING.component.margin.sectionTop}>
        <Spinner size={SIZES.component.spinner.xl} />
        <Text variant="body" mt={SPACING.component.margin.elementBottom}>Loading reviews...</Text>
      </Box>
    );
  }

  return (
    <AdminPageTemplate>
      <PageHeader
        title="Reviews Management"
        actionLabel="Add New Review"
        onAction={handleAdd}
        actionIcon={<IoAdd />}
      />

      {isCreatingNew && renderReviewForm()}

      {reviews.length === 0 && !isCreatingNew ? (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>No reviews found</Alert.Title>
          <Alert.Description>
            Click &quot;Add New Review&quot; to create your first testimonial.
          </Alert.Description>
        </Alert.Root>
      ) : reviews.length > 0 ? (
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
                  Reviewer
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                >
                  Company
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                >
                  Content Preview
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
              {reviews.map((review) => (
                <>
                  <Table.Row
                    key={review.id}
                    bg={expandedId === review.id ? COLORS.brand.accent + "10" : "transparent"}
                    _hover={{ bg: COLORS.ui.tableRowHoverBg, cursor: "pointer" }}
                    style={{ transition: ANIMATIONS.transitions.background }}
                    onClick={(e) => {
                      if (!(e.target as HTMLElement).closest('button')) {
                        handleToggleEdit(review);
                      }
                    }}
                  >
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <VStack align="start" gap={0}>
                        <Text fontWeight="medium">{review.reviewer_name}</Text>
                        <Text variant="caption" color={COLORS.brand.textSecondary}>
                          {review.reviewer_role}
                        </Text>
                      </VStack>
                    </Table.Cell>

                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      {review.company}
                    </Table.Cell>

                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <Text noOfLines={2} maxW="300px">
                        {review.content}
                      </Text>
                    </Table.Cell>

                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <HStack gap={SPACING.component.gap.xs}>
                        <IconButton
                          aria-label={expandedId === review.id ? "Collapse" : "Expand"}
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleEdit(review);
                          }}
                        >
                          {expandedId === review.id ? <IoChevronUp /> : <IoChevronDown />}
                        </IconButton>
                        <IconButton
                          aria-label="Delete review"
                          size="sm"
                          variant="outline"
                          colorPalette="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(review.id);
                          }}
                        >
                          <IoTrash />
                        </IconButton>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>

                  {expandedId === review.id && (
                    <Table.Row key={`${review.id}-form`}>
                      <Table.Cell colSpan={4} p={0}>
                        <Box p={SPACING.component.padding.card.y}>
                          {renderReviewForm()}
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
