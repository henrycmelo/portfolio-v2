/**
 * Admin Sidebar Management Component
 *
 * This component provides an interface for administrators to manage the sidebar content.
 * It includes functionalities to update avatar, name, and subtitle.
 * @component
 */

'use client';

// ============================================================================
// IMPORTS
// ============================================================================

//React & State Management
import { useState, useEffect } from 'react';

//Chakra UI
import { Box, VStack, HStack, Table, IconButton, Alert, Spinner, Image } from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import { IoChevronDown, IoChevronUp, IoAdd } from 'react-icons/io5';

//API & Data Types
import { sidebarAPI, SidebarData } from '@/api/sidebarAPI';

// Utilities & Components
import { Toaster, toaster } from '../ui/toaster';
import ImageUpload from './ImageUpload';
import { uploadImageToSupabase, deleteImageFromSupabase } from '@/api/imageUploadAPI';

//design system -Atoms
import {Button} from '@/design-system/atoms/Button';
import {Input} from '@/design-system/atoms/Input';
import {Text} from '@/design-system/atoms/Text';

import { PageHeader } from '@/design-system/organisms/PageHeader';
import { AdminPageTemplate } from '@/design-system/templates/AdminPageTemplate';

//Design System -Foundations (Design Tokens)
import {COLORS, SPACING, BORDERS, ANIMATIONS, SIZES } from "@/design-system/foundations"

// ============================================================================
// COMPONENT
// ============================================================================

export default function SidebarManagement() {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  //Data State
  const [sidebarData, setSidebarData] = useState<SidebarData[]>([]);
  const [loading, setLoading] = useState(true);

  //accordion/expansion state
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  //Form state - holds current entry data being created/edited
  const [formData, setFormData] = useState({
    avatar_url: '',
    name: '',
    subtitle: '',
  });

  // Image file state - stores selected file before upload
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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
        const data = await sidebarAPI.getSidebarData();
        setSidebarData(data);
    } catch (error){
        toaster.create({
            title: 'Error',
            description: 'Failed to fetch sidebar data.',
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
        avatar_url: '',
        name: '',
        subtitle: '',
    });
    setAvatarFile(null);
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
   * @param entry - The sidebar data entry to toggle
   */
  const handleToggleEdit = (entry: SidebarData) => {
    if (expandedEntryId === entry.id) {
      // Collapse if already expanded
      resetForm();
    } else {
      // Expand and populate form
      setFormData({
        avatar_url: entry.avatar_url,
        name: entry.name,
        subtitle: entry.subtitle,
      });
      setExpandedEntryId(entry.id || null);
      setIsCreatingNew(false);
    }
  }

  /**
   * Saves or updates sidebar data
   * Uploads avatar first, then saves sidebar data
   */
  const handleSave = async () => {
    try {
      // Create a copy of formData to update with new URL
      const dataToUpdate = { ...formData };

      // Find the entry being edited (if updating)
      const entryBeingEdited = expandedEntryId
        ? sidebarData.find(e => e.id === expandedEntryId)
        : null;

      // Upload avatar if a new file was selected
      if (avatarFile) {
        const avatarUrl = await uploadImageToSupabase(
          avatarFile,
          'sidebar',
          'avatar'
        );
        dataToUpdate.avatar_url = avatarUrl;

        // Delete old avatar if we're updating and there was a previous avatar
        if (entryBeingEdited?.avatar_url &&
            entryBeingEdited.avatar_url !== formData.avatar_url) {
          try {
            await deleteImageFromSupabase(entryBeingEdited.avatar_url);
          } catch (error) {
            console.error('Failed to delete old avatar:', error);
            // Continue anyway - new upload succeeded
          }
        }
      }

      await sidebarAPI.updateSidebarData(dataToUpdate);
      toaster.create({
        title: 'Success',
        description: 'Sidebar data updated successfully.',
        type: 'success',
        duration: 3000,
      });
      resetForm();
      fetchEntries();
    } catch (error: any) {
      console.error('Error saving sidebar data:', error);
      toaster.create({
        title: 'Error',
        description: error.message || 'Failed to update sidebar data.',
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
   * Renders the form for creating or editing sidebar content
   */
  const renderSidebarForm = () => (
    <Box
      bg={COLORS.ui.containerBg}
      p={SPACING.component.padding.card.y}
      borderRadius={BORDERS.radius.md}
      border={BORDERS.widths.thin}
      borderColor={COLORS.brand.accent}
      mb={SPACING.component.margin.elementBottom}
    >
      <VStack gap={SPACING.form.fieldGap} align="stretch">
        {/* Avatar Image Upload */}
        <Field.Root>
          <Field.Label>Avatar Image</Field.Label>
          <ImageUpload
            currentImageUrl={formData.avatar_url}
            onImageSelect={(file, previewUrl) => {
              setAvatarFile(file);
              handleInputChange('avatar_url', previewUrl);
            }}
            label="Upload Avatar"
          />
        </Field.Root>

        {/* Name */}
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your name"
          />
        </Field.Root>

        {/* Subtitle */}
        <Field.Root>
          <Field.Label>Subtitle</Field.Label>
          <Input
            value={formData.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            placeholder="Enter subtitle (e.g., Product Designer | M.S HCI & UX)"
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
        <Text mt={SPACING.component.margin.elementBottom}>Loading sidebar content...</Text>
      </Box>
    );
  }

  return (
    <AdminPageTemplate>
      <Toaster />

      {/* Page Header with Add Button */}
      <PageHeader
        title="Sidebar Management"
        actionLabel="Add New Content"
        onAction={handleAdd}
        actionIcon={<IoAdd />}
      />

      {/* "Create New Content" Form - Shows when user clicks Add button */}
      {isCreatingNew && renderSidebarForm()}

      {/* Empty State - No Content */}
      {sidebarData.length === 0 && !isCreatingNew ? (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>No sidebar content found</Alert.Title>
          <Alert.Description>
            Click &quot;Add New Content&quot; to create your sidebar content.
          </Alert.Description>
        </Alert.Root>
      ) : sidebarData.length > 0 ? (
        /* Sidebar Content Table */
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
                  Avatar
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                  verticalAlign="middle"
                >
                  Name
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
                  Actions
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            {/* Table Body - Content Rows with Accordion */}
            <Table.Body>
              {sidebarData.map((entry) => (
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
                    {/* Avatar Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      {entry.avatar_url ? (
                        <Image
                          src={entry.avatar_url}
                          alt={`${entry.name} avatar`}
                          boxSize={SIZES.component.avatar.md}
                          objectFit="cover"
                          borderRadius={BORDERS.radius.full}
                          border={BORDERS.widths.thin}
                          borderColor={COLORS.ui.placeholderBorder}
                        />
                      ) : (
                        <Box
                          boxSize={SIZES.component.avatar.md}
                          bg={COLORS.ui.placeholderBg}
                          borderRadius={BORDERS.radius.full}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text variant="caption" color={COLORS.ui.placeholderText}>
                            No Avatar
                          </Text>
                        </Box>
                      )}
                    </Table.Cell>

                    {/* Name Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      {entry.name}
                    </Table.Cell>

                    {/* Subtitle Cell */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX} verticalAlign="middle">
                      {entry.subtitle}
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
                          {renderSidebarForm()}
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
