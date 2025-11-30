/**
 * DATA TABLE MOLECULE
 *
 * A reusable table component with consistent styling.
 *
 * Atomic Design Level: MOLECULE (combination of atoms)
 *
 * Atoms used:
 * - Box (container)
 * - Table components
 * - Text
 *
 * Usage:
 *   <DataTable
 *     columns={['Name', 'Email', 'Role']}
 *     data={users}
 *     renderRow={(user) => (
 *       <>
 *         <Table.Cell>{user.name}</Table.Cell>
 *         <Table.Cell>{user.email}</Table.Cell>
 *         <Table.Cell>{user.role}</Table.Cell>
 *       </>
 *     )}
 *   />
 */

import { Box, Table } from '@chakra-ui/react';
import { Text } from '../../atoms/Text';
import { COLORS, SPACING, BORDERS } from '../../foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DataTableProps<T> {
  /**
   * Column headers
   */
  columns: { key: string; label: string }[];

  /**
   * Data array
   */
  data: T[];

  /**
   * Function to render each row
   */
  renderRow: (item: T, index: number) => React.ReactNode;

  /**
   * Optional row click handler
   */
  onRowClick?: (item: T) => void;

  /**
   * Empty state message
   */
  emptyMessage?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function DataTable<T>({
  columns,
  data,
  renderRow,
  onRowClick,
  emptyMessage = 'No data found',
}: DataTableProps<T>) {
  return (
    <Box
      overflowX="auto"
      borderRadius={BORDERS.radius.lg}
      border="1px solid"
      borderColor={COLORS.ui.containerBorder}
    >
      <Table.Root
        variant="outline"
        color={COLORS.brand.secondary}
        size="md"
        style={{ tableLayout: 'auto' }}
      >
        {/* Header */}
        <Table.Header bg={COLORS.ui.tableHeaderBg}>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeader
                key={column.key}
                fontWeight="bold"
                color={COLORS.brand.primary}
                py={SPACING.table.header.paddingY}
                px={SPACING.table.header.paddingX}
                verticalAlign="middle"
              >
                {column.label}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>

        {/* Body */}
        <Table.Body>
          {data.length === 0 ? (
            <Table.Row>
              <Table.Cell
                colSpan={columns.length}
                textAlign="center"
                py={8}
              >
                <Text color={COLORS.brand.textMuted}>
                  {emptyMessage}
                </Text>
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((item, index) => (
              <Table.Row
                key={index}
                _hover={{
                  bg: COLORS.ui.tableRowHoverBg,
                  cursor: onRowClick ? 'pointer' : 'default',
                }}
                style={{ transition: 'background 0.2s' }}
                onClick={() => onRowClick?.(item)}
              >
                {renderRow(item, index)}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
