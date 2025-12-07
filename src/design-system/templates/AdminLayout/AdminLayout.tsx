/**
 * ADMIN LAYOUT
 *
 * Layout template with sidebar navigation and header for admin pages.
 * Reuses existing SideBar and SiteHeader components for consistency.
 *
 * Atomic Design Level: TEMPLATE (page layout)
 *
 * Components used:
 * - SideBar (reusable navigation component with profile/avatar)
 * - SiteHeader (reusable header with time, location, and logout)
 * - Box, HStack, VStack (layout containers)
 *
 * Features:
 * - Sidebar with avatar/profile card and admin menu items
 * - Header with admin dashboard title and logout button
 * - Collapsible sidebar functionality
 * - Consistent styling with main portfolio site
 * - Social links hidden (admin-specific configuration)
 *
 * Usage:
 *   <AdminLayout currentSection="projects" onSectionChange={handleChange}>
 *     <YourAdminContent />
 *   </AdminLayout>
 */

import { Box, HStack, VStack } from '@chakra-ui/react';
import Sidebar from '@/design-system/organisms/Sidebar';
import SiteHeader from '@/design-system/organisms/SiteHeader';
import { adminMenuItems } from '@/data/adminNavigation';
import { COLORS } from '@/design-system/foundations';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface AdminLayoutProps {
  /**
   * Currently active section ID
   */
  currentSection: string;

  /**
   * Callback when section is changed
   */
  onSectionChange: (section: string) => void;

  /**
   * Main content to display
   */
  children: React.ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const AdminLayout = ({
  currentSection,
  onSectionChange,
  children
}: AdminLayoutProps) => {
  return (
    <HStack align="stretch" gap={0} h="100vh" bg={COLORS.ui.background}>
      {/* Sidebar Navigation - Reusing existing SideBar component */}
      <Sidebar
        menuItems={adminMenuItems}
        showProfile={true}
        showSocials={false}
        currentSection={currentSection}
        onSectionChange={onSectionChange}
        isAdminMode={true}
      />

      {/* Main Content Area with Header */}
      <VStack flex={1} gap={0} align="stretch" h="100vh">
        {/* Header - Reusing existing SiteHeader component */}
        <SiteHeader />

        {/* Content */}
        <Box
          flex={1}
          p={8}
          overflowY="auto"
          bg={COLORS.ui.background}
        >
          {children}
        </Box>
      </VStack>
    </HStack>
  );
};
