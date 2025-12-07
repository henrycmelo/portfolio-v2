# Design System

A comprehensive design system for the portfolio app following **Atomic Design** principles.

## 📁 Structure

```
design-system/
├── foundations/          # Design tokens (colors, spacing, typography, etc.)
├── atoms/               # Basic building blocks
├── molecules/           # Simple combinations
├── organisms/           # Complex components
├── templates/           # Page layouts
├── pages/              # Specific page implementations
└── index.ts            # Master export file
```

## 🎨 Atomic Design Hierarchy

### 1. Foundations
Design tokens and constants used throughout the system.

**Location:** `design-system/foundations/`

- **Colors:** Brand colors, UI colors, semantic colors
- **Spacing:** Consistent spacing scale
- **Typography:** Font sizes, weights, line heights
- **Borders:** Border radius, widths, styles
- **Shadows:** Box shadows for elevation
- **Animations:** Transition and animation tokens
- **Sizes:** Component sizing standards

**Usage:**
```typescript
import { COLORS, SPACING, TYPOGRAPHY } from '@/design-system/foundations';
```

### 2. Atoms
Basic building blocks that can't be broken down further.

**Location:** `design-system/atoms/`

- **Button:** Clickable button component
- **Text:** Typography component with variants
- **Input:** Text input field
- **Textarea:** Multi-line text input
- **Badge:** Label/tag component

**Usage:**
```typescript
import { Button, Text, Input } from '@/design-system/atoms';

<Button variant="primary" size="md">Click me</Button>
<Text variant="h1">Heading</Text>
<Input placeholder="Enter text" />
```

### 3. Molecules
Simple combinations of atoms functioning together.

**Location:** `design-system/molecules/`

- **FormField:** Label + Input + Error message
- **DataTable:** Table with headers and data
- **SectionWrapper:** Consistent section padding
- **ImageUpload:** Image upload with preview

**Usage:**
```typescript
import { FormField, SectionWrapper, ImageUpload } from '@/design-system/molecules';

<SectionWrapper id="contact">
  <FormField label="Name" placeholder="Your name" />
</SectionWrapper>
```

### 4. Organisms
Complex, standalone components.

**Location:** `design-system/organisms/`

- **PageHeader:** Page title with action button
- **SiteHeader:** Top navigation header
- **Sidebar:** Navigation sidebar
- **ProjectCard:** Project showcase card
- **ReviewCard:** Testimonial card

**Usage:**
```typescript
import { PageHeader, Sidebar, ProjectCard } from '@/design-system/organisms';

<PageHeader
  title="Projects"
  actionLabel="Add New"
  onAction={handleAdd}
/>
```

### 5. Templates
Page-level layouts combining organisms, molecules, and atoms.

**Location:** `design-system/templates/`

- **AdminLayout:** Admin dashboard layout (sidebar + header + content)
- **AdminPageTemplate:** Consistent admin page wrapper
- **SiteLayout:** Main site layout

**Usage:**
```typescript
import { AdminLayout, SiteLayout } from '@/design-system/templates';

<AdminLayout currentSection="projects" onSectionChange={handleChange}>
  <YourContent />
</AdminLayout>
```

### 6. Pages
Specific page implementations (admin management pages).

**Location:** `design-system/pages/admin/`

- **ProjectManagement:** Manage projects
- **CareerTimelineManagement:** Manage career timeline
- **AboutMeManagement:** Manage about me section
- **LandingPageManagement:** Manage landing page
- **SidebarManagement:** Manage sidebar content
- **ContactMessagesManagement:** View contact messages

**Usage:**
```typescript
import { ProjectManagement, AboutMeManagement } from '@/design-system/pages/admin';
```

## 🚀 Import Patterns

### Option 1: Import from specific layer
```typescript
import { Button } from '@/design-system/atoms';
import { FormField } from '@/design-system/molecules';
import { PageHeader } from '@/design-system/organisms';
```

### Option 2: Import from master index
```typescript
import { Button, FormField, PageHeader } from '@/design-system';
```

### Option 3: Import foundations
```typescript
import { COLORS, SPACING, TYPOGRAPHY } from '@/design-system/foundations';
```

## 📝 Component Guidelines

### Creating New Components

1. **Identify the atomic level:**
   - Is it a basic element? → Atom
   - Does it combine 2-3 atoms? → Molecule
   - Is it a complex, standalone UI section? → Organism
   - Is it a page layout? → Template
   - Is it a specific page implementation? → Page

2. **Follow the folder structure:**
   ```
   ComponentName/
   ├── ComponentName.tsx    # Component file
   └── index.ts            # Export file
   ```

3. **Use design tokens:**
   ```typescript
   import { COLORS, SPACING } from '@/design-system/foundations';
   
   <Box bg={COLORS.brand.primary} p={SPACING.scale.md} />
   ```

4. **Export from index files:**
   ```typescript
   // ComponentName/index.ts
   export { ComponentName } from './ComponentName';
   export type { ComponentNameProps } from './ComponentName';
   ```

### Naming Conventions

- **Components:** PascalCase (e.g., `Button`, `PageHeader`)
- **Props:** ComponentName + Props (e.g., `ButtonProps`)
- **Files:** Match component name (e.g., `Button.tsx`)
- **Folders:** Match component name (e.g., `Button/`)

## 🎯 Benefits

✅ **Consistent Design:** Centralized design tokens ensure consistency
✅ **Reusable Components:** DRY principle throughout the app
✅ **Easy to Find:** Clear hierarchy makes components discoverable  
✅ **Scalable:** Easy to add new components following the pattern  
✅ **Type-Safe:** Full TypeScript support with proper typing  
✅ **Well-Documented:** Clear structure and usage examples  

## 📚 Resources

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Design System Checklist](https://www.designsystemchecklist.com/)
