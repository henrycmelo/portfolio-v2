/**
 * Admin Contact Messages Management Component
 *
 * This component provides an interface for administrators to view and manage contact form submissions.
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
import { IoTrash, IoMail, IoMailOpen, IoArchive, IoChevronDown, IoChevronUp } from 'react-icons/io5';

//API & Data Types
import { contactAPI, ContactMessage } from '@/api/contactAPI';

// Utilities & Components
import { Toaster, toaster } from '../ui/toaster';

//design system -Atoms
import {Button} from '@/design-system/atoms/Button';
import {Text} from '@/design-system/atoms/Text';
import {Badge} from '@/design-system/atoms/Badge';

import { PageHeader } from '@/design-system/organisms/PageHeader';
import { AdminPageTemplate } from '@/design-system/templates/AdminPageTemplate';

//Design System -Foundations (Design Tokens)
import {COLORS, SPACING, BORDERS, ANIMATIONS, SIZES, TYPOGRAPHY } from "@/design-system/foundations"

// ============================================================================
// COMPONENT
// ============================================================================

export default function ContactMessagesManagement() {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMessageId, setExpandedMessageId] = useState<number | null>(null);

  // --------------------------------------------------------------------------
  // LIFECYCLE - Fetch messages on component mount
  // --------------------------------------------------------------------------
  useEffect(() => {
    fetchMessages();
  }, []);

  // --------------------------------------------------------------------------
  // DATA FETCHING
  // --------------------------------------------------------------------------

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await contactAPI.getAllMessages();
      setMessages(data);
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: 'Failed to fetch contact messages.',
        type: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // MESSAGE ACTIONS
  // --------------------------------------------------------------------------

  const handleToggleExpand = (message: ContactMessage) => {
    if (expandedMessageId === message.id) {
      setExpandedMessageId(null);
    } else {
      setExpandedMessageId(message.id || null);
      // Mark as read when expanded
      if (message.status === 'unread' && message.id) {
        handleStatusChange(message.id, 'read');
      }
    }
  };

  const handleStatusChange = async (id: number, status: ContactMessage['status']) => {
    try {
      await contactAPI.updateMessageStatus(id, status);
      await fetchMessages();
      toaster.create({
        title: 'Success',
        description: `Message marked as ${status}.`,
        type: 'success',
        duration: 2000,
      });
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: 'Failed to update message status.',
        type: 'error',
        duration: 3000,
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await contactAPI.deleteMessage(id);
        await fetchMessages();
        toaster.create({
          title: 'Success',
          description: 'Message deleted successfully.',
          type: 'success',
          duration: 3000,
        });
      } catch (error) {
        toaster.create({
          title: 'Error',
          description: 'Failed to delete message.',
          type: 'error',
          duration: 3000,
        });
      }
    }
  };

  // --------------------------------------------------------------------------
  // RENDER HELPERS
  // --------------------------------------------------------------------------

  const getStatusBadge = (status: ContactMessage['status']) => {
    const statusConfig = {
      unread: { variant: 'primary' as const, label: 'Unread' },
      read: { variant: 'success' as const, label: 'Read' },
      archived: { variant: 'neutral' as const, label: 'Archived' },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'UTC',
    }).format(date);
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  if (loading) {
    return (
      <Box textAlign="center" py={SPACING.component.margin.sectionTop}>
        <Spinner size={SIZES.component.spinner.xl} />
        <Text mt={SPACING.component.margin.elementBottom}>Loading messages...</Text>
      </Box>
    );
  }

  return (
    <AdminPageTemplate>
      <Toaster />

      {/* Page Header */}
      <PageHeader
        title="Contact Messages"
        description={`${messages.length} total message${messages.length !== 1 ? 's' : ''}`}
      />

      {/* Empty State */}
      {messages.length === 0 ? (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>No messages yet</Alert.Title>
          <Alert.Description>
            Contact form submissions will appear here.
          </Alert.Description>
        </Alert.Root>
      ) : (
        /* Messages Table */
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
                >
                  Name
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  fontWeight="bold"
                  color={COLORS.brand.primary}
                  py={SPACING.table.header.paddingY}
                  px={SPACING.table.header.paddingX}
                >
                  Email
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
                  Date
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

            {/* Table Body */}
            <Table.Body>
              {messages.map((message) => (
                <>
                  <Table.Row
                    key={message.id}
                    bg={expandedMessageId === message.id ? COLORS.brand.accent + "10" : "transparent"}
                    _hover={{ bg: COLORS.ui.tableRowHoverBg, cursor: "pointer" }}
                    style={{ transition: ANIMATIONS.transitions.background }}
                    onClick={() => handleToggleExpand(message)}
                  >
                    {/* Name */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <HStack gap={SPACING.scale.xs}>
                        {message.status === 'unread' && (
                          <Box
                            w="8px"
                            h="8px"
                            borderRadius="full"
                            bg={COLORS.brand.accent}
                          />
                        )}
                        <Text fontWeight={message.status === 'unread' ? 'bold' : 'normal'}>
                          {message.name}
                        </Text>
                      </HStack>
                    </Table.Cell>

                    {/* Email */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      {message.email}
                    </Table.Cell>

                    {/* Status */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      {getStatusBadge(message.status)}
                    </Table.Cell>

                    {/* Date */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <Text variant="caption" suppressHydrationWarning>
                        {formatDate(message.created_at)}
                      </Text>
                    </Table.Cell>

                    {/* Actions */}
                    <Table.Cell py={SPACING.table.cell.paddingY} px={SPACING.table.cell.paddingX}>
                      <HStack gap={SPACING.scale.xs}>
                        <IconButton
                          aria-label={expandedMessageId === message.id ? "Collapse" : "Expand"}
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleExpand(message);
                          }}
                        >
                          {expandedMessageId === message.id ? <IoChevronUp /> : <IoChevronDown />}
                        </IconButton>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>

                  {/* Expanded Message View */}
                  {expandedMessageId === message.id && (
                    <Table.Row key={`${message.id}-details`}>
                      <Table.Cell colSpan={5} p={SPACING.component.padding.card.y}>
                        <Box
                          bg={COLORS.ui.containerBg}
                          p={SPACING.component.padding.card.y}
                          borderRadius={BORDERS.radius.md}
                          border={BORDERS.widths.thin}
                          borderColor={COLORS.ui.containerBorder}
                        >
                          <VStack align="stretch" gap={SPACING.scale.md}>
                            {/* Message Content */}
                            <Box>
                              <Text fontWeight="bold" mb={SPACING.scale.xs}>Message:</Text>
                              <Text
                                color={COLORS.brand.text}
                                whiteSpace="pre-wrap"
                                lineHeight={TYPOGRAPHY.lineHeights.relaxed}
                              >
                                {message.message}
                              </Text>
                            </Box>

                            {/* Action Buttons */}
                            <HStack gap={SPACING.scale.sm} pt={SPACING.scale.sm}>
                              {message.status !== 'read' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => message.id && handleStatusChange(message.id, 'read')}
                                >
                                  <HStack gap={SPACING.scale.xs}>
                                    <IoMailOpen />
                                    <Text>Mark as Read</Text>
                                  </HStack>
                                </Button>
                              )}
                              {message.status !== 'archived' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => message.id && handleStatusChange(message.id, 'archived')}
                                >
                                  <HStack gap={SPACING.scale.xs}>
                                    <IoArchive />
                                    <Text>Archive</Text>
                                  </HStack>
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                colorPalette="red"
                                onClick={() => message.id && handleDelete(message.id)}
                              >
                                <HStack gap={SPACING.scale.xs}>
                                  <IoTrash />
                                  <Text>Delete</Text>
                                </HStack>
                              </Button>
                            </HStack>
                          </VStack>
                        </Box>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}
    </AdminPageTemplate>
  );
}
