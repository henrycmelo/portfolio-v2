/**
 * CAREER TIMELINE MANAGEMENT COMPONENT
 *
 * Admin interface for managing career timeline entries (CRUD operations).
 * Allows creating, reading, updating, and deleting career entries.
 *
 * Features:
 * - Career timeline listing table with icons and details
 * - Create/Edit accordion form for career data entry
 * - Real-time validation and error handling
 * - Inline editing with accordion pattern
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
  IconButton,
} from "@chakra-ui/react";

// Chakra UI - Data Display & Forms
import { Table } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";

// Icons
import { IoAdd, IoTrash, IoChevronDown, IoChevronUp } from "react-icons/io5";

// API & Data Types
import { CareerEntry } from "@/api/careerAPI";
import { careerAPI } from "@/api/careerAPI";

// Utilities & Components
import { toaster } from "@/components/ui/toaster";

// Design System - Atoms
import { Button } from "@/design-system/atoms/Button";
import { Text } from "@/design-system/atoms/Text";
import { Input } from "@/design-system/atoms/Input";
import { Badge } from "@/design-system/atoms/Badge";

// Design System - Organisms & Templates
import { PageHeader } from "@/design-system/organisms/PageHeader";
import { AdminPageTemplate } from "@/design-system/templates/AdminPageTemplate";

// Design System - Foundations (Design Tokens)
import { COLORS, SPACING, SIZES, BORDERS, ANIMATIONS } from "@/design-system/foundations";

// ============================================================================
// COMPONENT
// ============================================================================

export default function CareerTimelineManagement() {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  // Data state
  const [entries, setEntries] = useState<CareerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Accordion/Expansion state
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form state - holds current entry data being created/edited
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    date: "",
    entry_type: "work" as "work" | "education",
  });

  // --------------------------------------------------------------------------
  // LIFECYCLE - Fetch entries on component mount
  // --------------------------------------------------------------------------

  useEffect(() => {
    fetchEntries();
  }, []);

  // --------------------------------------------------------------------------
  // DATA FETCHING
  // --------------------------------------------------------------------------

  /**
   * Fetches all career entries from the API
   * Shows loading state and error toasts on failure
   */
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await careerAPI.getAllCareerEntries();
      setEntries(data);
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to fetch career entries",
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
      role: "",
      company: "",
      date: "",
      entry_type: "work",
    });
    setExpandedEntryId(null);
    setIsCreatingNew(false);
  };

  // --------------------------------------------------------------------------
  // CRUD OPERATIONS
  // --------------------------------------------------------------------------

  /**
   * Opens form for creating a new career entry
   * Resets form to empty state and expands "new entry" section
   */
  const handleAdd = () => {
    resetForm();
    setIsCreatingNew(true);
    setExpandedEntryId(null);
  };

  /**
   * Toggles the expansion of an entry for editing
   * Populates form with entry data
   * @param entry - The entry to edit
   */
  const handleToggleEdit = (entry: CareerEntry) => {
    // If clicking the same entry, collapse it
    if (expandedEntryId === entry.id) {
      resetForm();
      return;
    }

    // Expand this entry and populate form
    setIsCreatingNew(false);
    setExpandedEntryId(entry.id);
    setFormData({
      role: entry.role,
      company: entry.company,
      date: entry.date,
      entry_type: entry.entry_type,
    });
  };

  /**
   * Saves career entry (create or update)
   * Refreshes entry list and collapses form on success
   */
  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.role.trim() || !formData.company.trim() || !formData.date.trim()) {
        toaster.create({
          title: "Validation Error",
          description: "Role, company, and date are required",
          type: "error",
          duration: 3000,
        });
        return;
      }

      const dataToSave = { ...formData };

      if (expandedEntryId) {
        // Update existing entry
        await careerAPI.updateCareerEntry(expandedEntryId, dataToSave);
        toaster.create({
          title: "Success",
          description: "Career entry updated successfully",
          type: "success",
          duration: 3000,
        });
      } else {
        // Create new entry
        await careerAPI.createCareerEntry(dataToSave);
        toaster.create({
          title: "Success",
          description: "Career entry created successfully",
          type: "success",
          duration: 3000,
        });
      }

      await fetchEntries();
      resetForm();
    } catch (error: any) {
      console.error('Error saving career entry:', error);
      toaster.create({
        title: "Error",
        description: error.message || `Failed to ${expandedEntryId ? "update" : "create"} career entry`,
        type: "error",
        duration: 5000,
      });
    }
  };

  /**
   * Deletes a career entry after confirmation
   * Refreshes entry list on success
   * @param id - The ID of the entry to delete
   */
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this career entry?")) {
      try {
        await careerAPI.deleteCareerEntry(id);
        toaster.create({
          title: "Success",
          description: "Career entry deleted successfully",
          type: "success",
          duration: 3000,
        });
        await fetchEntries();
      } catch (error) {
        toaster.create({
          title: "Error",
          description: "Failed to delete career entry",
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
   * Renders the career entry edit/create form
   */
  const renderEntryForm = () => (
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
        {/* Role */}
        <Field.Root>
          <Field.Label>Role</Field.Label>
          <Input
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            placeholder="Enter role/position"
          />
        </Field.Root>

        {/* Company */}
        <Field.Root>
          <Field.Label>Company</Field.Label>
          <Input
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="Enter company/institution name"
          />
        </Field.Root>

    

        {/* Date */}
        <Field.Root>
          <Field.Label>Date</Field.Label>
          <Input
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            placeholder="Enter date (e.g., 2020 - 2023)"
          />
        </Field.Root>

        {/* Entry Type */}
        <Field.Root>
          <Field.Label>Entry Type</Field.Label>
          <HStack gap={SPACING.component.gap.md}>
            <Button
              variant={formData.entry_type === "work" ? "primary" : "outline"}
              onClick={() => handleInputChange("entry_type", "work")}
              size="sm"
            >
              Work
            </Button>
            <Button
              variant={formData.entry_type === "education" ? "primary" : "outline"}
              onClick={() => handleInputChange("entry_type", "education")}
              size="sm"
            >
              Education
            </Button>
          </HStack>
        </Field.Root>

        <HStack gap={SPACING.form.footerGap} justify="flex-end" pt={SPACING.form.footerPaddingTop}>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {expandedEntryId ? "Update" : "Create"} Entry
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
        <Text variant="body" mt={SPACING.component.margin.elementBottom}>Loading career entries...</Text>
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
        title="Career Timeline Management"
        actionLabel="Add New Entry"
        onAction={handleAdd}
        actionIcon={<IoAdd />}
      />

      {/* "Create New Entry" Form - Shows when user clicks Add button */}
      {isCreatingNew && renderEntryForm()}

      {/* Empty State - No Entries */}
      {entries.length === 0 && !isCreatingNew ? (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>No career entries found</Alert.Title>
          <Alert.Description>
            Click &quot;Add New Entry&quot; to create your first career timeline entry.
          </Alert.Description>
        </Alert.Root>
      ) : entries.length > 0 ? (
        /* Entries Table */
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
                  Role
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
                  Date
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                  verticalAlign="middle"
                >
                  Type
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

            {/* Table Body - Entry Rows with Accordion */}
            <Table.Body>
              {entries.map((entry) => (
                <>
                  <Table.Row
                    key={entry.id}
                    bg={expandedEntryId === entry.id ? COLORS.brand.accent + "10" : "transparent"}
                    _hover={{ bg: COLORS.ui.tableRowHoverBg, cursor: "pointer" }}
                    style={{ transition: ANIMATIONS.transitions.background }}
                    onClick={(e) => {
                      // Don't toggle if clicking on action buttons
                      if (!(e.target as HTMLElement).closest('button')) {
                        handleToggleEdit(entry);
                      }
                    }}
                  >
                    {/* Role Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      {entry.role}
                    </Table.Cell>

                    {/* Company Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      {entry.company}
                    </Table.Cell>

                

                    {/* Date Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      {entry.date}
                    </Table.Cell>

                    {/* Type Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      <Badge variant={entry.entry_type === "work" ? "primary" : "success"}>
                        {entry.entry_type}
                      </Badge>
                    </Table.Cell>

                    {/* Actions Cell - Edit/Delete Buttons */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      <HStack gap={SPACING.component.gap.xs}>
                        <IconButton
                          aria-label={expandedEntryId === entry.id ? "Collapse" : "Expand"}
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleEdit(entry);
                          }}
                        >
                          {expandedEntryId === entry.id ? <IoChevronUp /> : <IoChevronDown />}
                        </IconButton>
                        <IconButton
                          aria-label="Delete entry"
                          size="sm"
                          variant="outline"
                          colorPalette="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(entry.id);
                          }}
                        >
                          <IoTrash />
                        </IconButton>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>

                  {/* Expanded Edit Form - Shows below the row when expanded */}
                  {expandedEntryId === entry.id && (
                    <Table.Row key={`${entry.id}-form`}>
                      <Table.Cell colSpan={6} p={0}>
                        <Box p={SPACING.component.padding.card.y}>
                          {renderEntryForm()}
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
