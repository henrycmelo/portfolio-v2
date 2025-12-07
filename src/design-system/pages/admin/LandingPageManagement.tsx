/**
 * Admin Landing Page Management Component
 * 
 * This component provides an interface for administrators to manage the landing page content.
 * It includes functionalities to update hero section details, featured projects, and other
 * landing page elements. The component ensures that only authenticated admin users can access
 * the management features. 
 * @component
 */


'use client';

// ============================================================================
// IMPORTS
// ============================================================================

//React & State Management
import { useState, useEffect } from 'react';

//Chakra UI
import { Box, VStack, HStack, Table, IconButton, Alert, Spinner } from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import { IoChevronDown, IoChevronUp, IoAdd } from 'react-icons/io5';


//API & Data Types
import { landingAPI } from '@/api/landingAPI';
import { LandingPageData } from '@/api/landingAPI';

// Utilities & Components
import { Toaster, toaster } from '../ui/toaster';

//design system -Atoms
import {Button} from '@/design-system/atoms/Button';
import {Input} from '@/design-system/atoms/Input';
import {Text} from '@/design-system/atoms/Text';
import { Textarea } from "@/design-system/atoms";

import { PageHeader } from '@/design-system/organisms/PageHeader';
import { AdminPageTemplate } from '@/design-system/templates/AdminPageTemplate';

//Design Sytem -Foundations (Design Tokens)
import {COLORS, SPACING, BORDERS, ANIMATIONS, SIZES } from "@/design-system/foundations"


// ============================================================================
// COMPONENT
// ============================================================================

export default function LandingPageManagement() {
     // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  //Data State
  const [landingPageData, setLandingPageData] = useState<LandingPageData[]>([]);
  const [loading, setLoading] = useState(true);


//accordion/expansion state
const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);
const [isCreatingNew, setIsCreatingNew] = useState(false);

//Form state - holds current entry data being created/edited
const [formData, setFormData] = useState({
  hero_title: '',
  hero_subtitle: '',
  hero_paragraph: '',
  hero_caption: '',
});

 // --------------------------------------------------------------------------
  // LIFECYCLE - Fetch entries on component mount
  // --------------------------------------------------------------------------
  useEffect(()=>{
    fetchEntries();
  },[]);
  // --------------------------------------------------------------------------
  // DATA FETCHING
  // --------------------------------------------------------------------------

  /**
   * Fetches all content from the API
   * Shows loading state and error toasts on failure
   */

  const fetchEntries = async () =>{
    try{
        setLoading(true);
        const data = await landingAPI.getLandingPageData();
        setLandingPageData(data);
    } catch (error){
        toaster.create({
            title: 'Error',
            description: 'Failed to fetch landing page data.',
            type: 'error',
            duration: 3000,
        })
    } finally {
        setLoading(false);
    }
  }

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
  
    }

    /**
   * Resets form to initial empty state
   * Clears expanded state
   */

    const resetForm = () => {
    setFormData({
        hero_title: '',
        hero_subtitle: '',
        hero_paragraph: '',
        hero_caption: '',
    });
    setExpandedEntryId(null);
    setIsCreatingNew(false);
}
// --------------------------------------------------------------------------
  // CRUD OPERATIONS
  // --------------------------------------------------------------------------

  /**
   * Opens form for creating a new career entry
   * Resets form to empty state and expands "new entry" section
   */

  const handleAdd=() => {
    resetForm();
    setIsCreatingNew(true);
    setExpandedEntryId(null);
  }

  /**
   * Toggles the edit form for an entry (expand/collapse)
   * @param entry - The landing page data entry to toggle
   */
  const handleToggleEdit = (entry: LandingPageData) => {
    if (expandedEntryId === entry.id) {
      // Collapse if already expanded
      resetForm();
    } else {
      // Expand and populate form
      setFormData({
        hero_title: entry.hero_title,
        hero_subtitle: entry.hero_subtitle,
        hero_paragraph: entry.hero_paragraph,
        hero_caption: entry.hero_caption,
      });
      setExpandedEntryId(entry.id || null);
      setIsCreatingNew(false);
    }
  }

  /**
   * Saves or updates landing page data
   * Handles both create and update operations
   */
  const handleSave = async () => {
    try {
      await landingAPI.updateLandingPageData(formData);
      toaster.create({
        title: 'Success',
        description: 'Landing page data updated successfully.',
        type: 'success',
        duration: 3000,
      });
      resetForm();
      fetchEntries();
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: 'Failed to update landing page data.',
        type: 'error',
        duration: 3000,
      });
    }
  }

  /**
   * Cancels current operation and resets form
   */
  const handleCancel = () => {
    resetForm();
  }

  // --------------------------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------------------------

  /**
   * Renders the form for creating or editing landing page content
   */
  const renderLandingForm = () => (
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
        {/* Hero Title */}
        <Field.Root>
          <Field.Label>Hero Title</Field.Label>
          <Input
            value={formData.hero_title}
            onChange={(e) => handleInputChange('hero_title', e.target.value)}
            placeholder="Enter hero title"
            
          />
        </Field.Root>

        {/* Hero Subtitle */}
        <Field.Root>
          <Field.Label>Hero Subtitle</Field.Label>
          <Input
            value={formData.hero_subtitle}
            onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
            placeholder="Enter hero subtitle"
          />
        </Field.Root>

        {/* Hero Paragraph */}
        <Field.Root>
          <Field.Label>Hero Paragraph</Field.Label>
          <Textarea
            value={formData.hero_paragraph}
            onChange={(e) => handleInputChange('hero_paragraph', e.target.value)}
            placeholder="Enter hero paragraph"
            rows={4}
          />
        </Field.Root>

        {/* Hero Caption */}
        <Field.Root>
          <Field.Label>Hero Caption</Field.Label>
          <Input
            value={formData.hero_caption}
            onChange={(e) => handleInputChange('hero_caption', e.target.value)}
            placeholder="Enter hero caption"
          />
        </Field.Root>

        <HStack gap={SPACING.form.footerGap} justify="flex-end" pt={SPACING.form.footerPaddingTop}>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </HStack>
      </VStack>
    </Box>
  );

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <Box textAlign="center" py={SPACING.component.margin.sectionTop}>
        <Spinner size={SIZES.component.spinner.xl} />
        <Text mt={SPACING.component.margin.elementBottom}>Loading landing page content...</Text>
      </Box>
    );
  }

  return (
    <AdminPageTemplate>
      <Toaster />

      {/* Page Header with Add Button */}
      <PageHeader
        title="Landing Page Management"
        actionLabel="Add New Content"
        onAction={handleAdd}
        actionIcon={<IoAdd />}
      />

      {/* "Create New Content" Form - Shows when user clicks Add button */}
      {isCreatingNew && renderLandingForm()}

      {/* Empty State - No Content */}
      {landingPageData.length === 0 && !isCreatingNew ? (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>No landing page content found</Alert.Title>
          <Alert.Description>
            Click &quot;Add New Content&quot; to create your landing page content.
          </Alert.Description>
        </Alert.Root>
      ) : landingPageData.length > 0 ? (
        /* Landing Page Content Table */
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
                  Title
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                  verticalAlign="middle"
                >
                  Subtitle
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                  verticalAlign="middle"
                >
                  Paragraph
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

            {/* Table Body - Content Rows with Accordion */}
            <Table.Body>
              {landingPageData.map((entry) => (
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
                    {/* Title Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      {entry.hero_title}
                    </Table.Cell>

                    {/* Subtitle Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      {entry.hero_subtitle}
                    </Table.Cell>

                    {/* Paragraph Cell */}
                    <Table.Cell
                      py={SPACING.table.cell.paddingY}
                      px={SPACING.table.cell.paddingX}
                      verticalAlign="middle"
                      maxW="400px"
                      whiteSpace="normal"
                    >
                      {entry.hero_paragraph}
                    </Table.Cell>

                    {/* Actions Cell - Expand/Collapse Button */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
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
                    </Table.Cell>
                  </Table.Row>

                  {/* Expanded Edit Form - Shows below the row when expanded */}
                  {expandedEntryId === entry.id && (
                    <Table.Row key={`${entry.id}-form`}>
                      <Table.Cell colSpan={4} p={0}>
                        <Box p={SPACING.component.padding.card.y}>
                          {renderLandingForm()}
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