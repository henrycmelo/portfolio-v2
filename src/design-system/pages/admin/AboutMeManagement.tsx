/**
 * Admin About Me Management Component
 *
 * This component provides an interface for administrators to manage the About Me section.
 * It includes functionalities to update three paragraphs and an image.
 * @component
 */

'use client';

// ============================================================================
// IMPORTS
// ============================================================================

//React & State Management
import { useState, useEffect } from 'react';

//Chakra UI
import { Box, VStack, HStack, Table, IconButton, Alert, Spinner, Image} from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import { IoChevronDown, IoChevronUp, IoAdd } from 'react-icons/io5';

//API & Data Types
import { aboutAPI, AboutData } from '@/api/aboutAPI';

// Utilities & Components
import { Toaster, toaster } from '@/components/ui/toaster';
import ImageUpload from '@/design-system/molecules/ImageUpload';
import { uploadImageToSupabase, deleteImageFromSupabase } from '@/api/imageUploadAPI';

//design system -Atoms
import {Button} from '@/design-system/atoms/Button';
import {Input} from '@/design-system/atoms/Input';
import {Text} from '@/design-system/atoms/Text';
import {Textarea} from '@/design-system/atoms/Textarea';

import { PageHeader } from '@/design-system/organisms/PageHeader';
import { AdminPageTemplate } from '@/design-system/templates/AdminPageTemplate';

//Design System -Foundations (Design Tokens)
import {COLORS, SPACING, BORDERS, ANIMATIONS, SIZES } from "@/design-system/foundations"

// ============================================================================
// COMPONENT
// ============================================================================

export default function AboutMeManagement() {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  //Data State
  const [aboutData, setAboutData] = useState<AboutData[]>([]);
  const [loading, setLoading] = useState(true);

  //accordion/expansion state
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  //Form state - holds current entry data being created/edited
  const [formData, setFormData] = useState({
    subtitle_1: '',
    paragraph_1: '',
    subtitle_2: '',
    paragraph_2: '',
    subtitle_3: '',
    paragraph_3: '',
    image_url: '',
  });

  // Image file state - stores selected file before upload
  const [imageFile, setImageFile] = useState<File | null>(null);

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
        const data = await aboutAPI.getAboutData();
        setAboutData(data);
    } catch (error){
        toaster.create({
            title: 'Error',
            description: 'Failed to fetch about me data.',
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
        subtitle_1: '',
        paragraph_1: '',
        subtitle_2: '',
        paragraph_2: '',
        subtitle_3: '',
        paragraph_3: '',
        image_url: '',
    });
    setImageFile(null);
    setExpandedEntryId(null);
    setIsCreatingNew(false);
  }

  // --------------------------------------------------------------------------
  // CRUD OPERATIONS
  // --------------------------------------------------------------------------

  /**
   * Opens form for creating a new entry
   * Resets form to empty state and expands "new entry" section
   */
  const handleAdd=() => {
    resetForm();
    setIsCreatingNew(true);
    setExpandedEntryId(null);
  }

  /**
   * Toggles the edit form for an entry (expand/collapse)
   * @param entry - The about data entry to toggle
   */
  const handleToggleEdit = (entry: AboutData) => {
    if (expandedEntryId === entry.id) {
      // Collapse if already expanded
      resetForm();
    } else {
      // Expand and populate form
      setFormData({
        subtitle_1: entry.subtitle_1,
        paragraph_1: entry.paragraph_1,
        subtitle_2: entry.subtitle_2,
        paragraph_2: entry.paragraph_2,
        subtitle_3: entry.subtitle_3,
        paragraph_3: entry.paragraph_3,
        image_url: entry.image_url,
      });
      setExpandedEntryId(entry.id || null);
      setIsCreatingNew(false);
    }
  }

  /**
   * Saves or updates about me data
   * Uploads image first, then saves about me data
   */
  const handleSave = async () => {
    try {
      // Create a copy of formData to update with new URL
      const dataToUpdate = { ...formData };

      // Find the entry being edited (if updating)
      const entryBeingEdited = expandedEntryId
        ? aboutData.find(e => e.id === expandedEntryId)
        : null;

      // Upload image if a new file was selected
      if (imageFile) {
        const imageUrl = await uploadImageToSupabase(
          imageFile,
          'about-me',
          'image'
        );
        dataToUpdate.image_url = imageUrl;

        // Delete old image if we're updating and there was a previous image
        if (entryBeingEdited?.image_url &&
            entryBeingEdited.image_url !== formData.image_url) {
          try {
            await deleteImageFromSupabase(entryBeingEdited.image_url);
          } catch (error) {
            console.error('Failed to delete old image:', error);
            // Continue anyway - new upload succeeded
          }
        }
      }

      await aboutAPI.updateAboutData(dataToUpdate);
      toaster.create({
        title: 'Success',
        description: 'About me data updated successfully.',
        type: 'success',
        duration: 3000,
      });
      resetForm();
      fetchEntries();
    } catch (error: any) {
      console.error('Error saving about me data:', error);
      toaster.create({
        title: 'Error',
        description: error.message || 'Failed to update about me data.',
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
   * Renders the form for creating or editing about me content
   */
  const renderAboutForm = () => (
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
        {/* Subtitle 1 */}
        <Field.Root>
          <Field.Label>Subtitle 1</Field.Label>
          <Input
            value={formData.subtitle_1}
            onChange={(e) => handleInputChange('subtitle_1', e.target.value)}
            placeholder="Enter first subtitle"
          />
        </Field.Root>

        {/* Paragraph 1 */}
        <Field.Root>
          <Field.Label>Paragraph 1</Field.Label>
          <Textarea
            value={formData.paragraph_1}
            onChange={(e) => handleInputChange('paragraph_1', e.target.value)}
            placeholder="Enter first paragraph"
            rows={4}
          />
        </Field.Root>

        {/* Subtitle 2 */}
        <Field.Root>
          <Field.Label>Subtitle 2</Field.Label>
          <Input
            value={formData.subtitle_2}
            onChange={(e) => handleInputChange('subtitle_2', e.target.value)}
            placeholder="Enter second subtitle"
          />
        </Field.Root>

        {/* Paragraph 2 */}
        <Field.Root>
          <Field.Label>Paragraph 2</Field.Label>
          <Textarea
            value={formData.paragraph_2}
            onChange={(e) => handleInputChange('paragraph_2', e.target.value)}
            placeholder="Enter second paragraph"
            rows={4}
          />
        </Field.Root>

        {/* Subtitle 3 */}
        <Field.Root>
          <Field.Label>Subtitle 3</Field.Label>
          <Input
            value={formData.subtitle_3}
            onChange={(e) => handleInputChange('subtitle_3', e.target.value)}
            placeholder="Enter third subtitle"
          />
        </Field.Root>

        {/* Paragraph 3 */}
        <Field.Root>
          <Field.Label>Paragraph 3</Field.Label>
          <Textarea
            value={formData.paragraph_3}
            onChange={(e) => handleInputChange('paragraph_3', e.target.value)}
            placeholder="Enter third paragraph"
            rows={4}
          />
        </Field.Root>

        {/* Image Upload */}
        <Field.Root>
          <Field.Label>Image </Field.Label>
          <ImageUpload
            currentImageUrl={formData.image_url}
            onImageSelect={(file, previewUrl) => {
              setImageFile(file);
              handleInputChange('image_url', previewUrl);
            }}
            label="Upload Image"
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
        <Text mt={SPACING.component.margin.elementBottom}>Loading about me content...</Text>
      </Box>
    );
  }

  return (
    <AdminPageTemplate>
      <Toaster />

      {/* Page Header with Add Button */}
      <PageHeader
        title="About Me Management"
        actionLabel="Add New Content"
        onAction={handleAdd}
        actionIcon={<IoAdd />}
      />

      {/* "Create New Content" Form - Shows when user clicks Add button */}
      {isCreatingNew && renderAboutForm()}

      {/* Empty State - No Content */}
      {aboutData.length === 0 && !isCreatingNew ? (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>No about me content found</Alert.Title>
          <Alert.Description>
            Click &quot;Add New Content&quot; to create your about me content.
          </Alert.Description>
        </Alert.Root>
      ) : aboutData.length > 0 ? (
        /* About Me Content Table */
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
                  Image
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                  verticalAlign="middle"
                >
                  Paragraph 1
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                  verticalAlign="middle"
                >
                  Paragraph 2
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
              {aboutData.map((entry) => (
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
                    {/* Image Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      {entry.image_url ? (
                        <Image
                          src={entry.image_url}
                          alt="About me image"
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

                    {/* Paragraph 1 Cell */}
                    <Table.Cell
                      py={SPACING.table.cell.paddingY}
                      px={SPACING.table.cell.paddingX}
                      verticalAlign="middle"
                      maxW="250px"
                      whiteSpace="normal"
                    >
                      {entry.paragraph_1.length > 100
                        ? `${entry.paragraph_1.substring(0, 100)}...`
                        : entry.paragraph_1}
                    </Table.Cell>

                    {/* Paragraph 2 Cell */}
                    <Table.Cell
                      py={SPACING.table.cell.paddingY}
                      px={SPACING.table.cell.paddingX}
                      verticalAlign="middle"
                      maxW="250px"
                      whiteSpace="normal"
                    >
                      {entry.paragraph_2.length > 100
                        ? `${entry.paragraph_2.substring(0, 100)}...`
                        : entry.paragraph_2}
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
                          {renderAboutForm()}
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
