# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
bun dev                    # Start development server with host binding
bun build                  # Production build
bun generate              # Static site generation
bun preview               # Preview production build

# Code Quality
bun lint                  # Run ESLint + Prettier checks
bun lintfix              # Auto-fix ESLint + Prettier issues
bun lint:eslint          # ESLint only
bun lint:prettier        # Prettier check only
```

## Architecture Overview

This is a **Nuxt 3 + TypeScript** e-commerce application using **GraphQL** with villus client and **Pinia** for state management.

### Core Technologies
- **Framework**: Nuxt 3 with Vue 3 Composition API
- **API Layer**: GraphQL with villus client (not Apollo)
- **State Management**: Pinia stores with local storage persistence
- **Styling**: SCSS with CSS custom properties, mobile-first responsive design
- **Validation**: Valibot schema validation
- **Maps**: Yandex Maps integration
- **i18n**: Multi-language support (currently Russian)

### Key Architectural Patterns

**GraphQL Organization**:
- `/gql/fragments/` - Reusable GraphQL fragments
- `/gql/queries/` - Query definitions with fragment imports
- `/gql/mutations/` - Mutation definitions
- Always use existing fragments when creating new queries

**Component Architecture**:
- **Base Components**: `BaseButton`, `BaseDialog`, `BaseIcon` - foundational UI elements
- **Form Components**: `/components/form/` - dedicated form controls
- **Feature Components**: Domain-specific components like `ProductCard`, `CartItem`
- **Layout Components**: `AppHeader`, `AppFooter` for app structure

**State Management (Pinia)**:
- `useAppStore()` - Global app state (phone numbers, etc.)
- `useCartStore()` - Shopping cart with localStorage sync
- `useProfileStore()` - User auth and profile data
- `useDeliveryStore()` - Shop selection and delivery/pickup logic
- `useProductStore()` - Product dialog management

**SCSS Architecture**:
- `/assets/styles/components/` - Component-specific styles
- `/assets/styles/helpers/` - Mixins, variables, functions
- `/assets/styles/utils/` - Base styles, normalize, animations
- Extensive use of CSS custom properties for theming
- Mobile-first responsive breakpoints: xs(375px), sm(576px), md(720px), lg(992px), xl(1280px)

### Business Logic Patterns

**E-commerce Flow**:
- Products filtered by shop stoplist (in-stock/out-of-stock)
- Cart management with server synchronization
- Shop selection affects product availability
- Phone-based authentication with verification codes

**Data Fetching**:
- Use `useListQuery<T>()` composable for GraphQL queries
- Reactive data with Vue 3 Composition API
- Type-safe operations with comprehensive TypeScript interfaces in `/types/`

### Development Guidelines

**GraphQL Usage**:
- Always import and use existing fragments
- Follow the pattern: `import { FRAGMENT_NAME } from '~/gql/fragments/...'`
- New queries should follow existing naming conventions (e.g., `CATEGORY_LIST_QUERY`)

**Component Development**:
- Use Composition API with `<script setup>`
- Import types from `/types/` directory
- Follow existing component patterns for props and emits
- Use `storeToRefs()` for reactive store access

**Styling**:
- Use CSS custom properties for colors and spacing
- Follow mobile-first responsive design
- Leverage existing SCSS mixins and functions
- Component styles should be scoped

**Authentication**:
- JWT tokens stored in cookies (`villus:default.token`)
- Global auth middleware handles profile loading
- Use `useProfileStore()` for auth state

## Environment Variables

Required for development:
- `BASE_URL` - GraphQL API endpoint
- `DADATA_API_TOKEN` - Russian address service
- `YANDEX_MAPS_API_KEY` - Yandex Maps integration

## Code Quality

- ESLint + Prettier integration with auto-fix
- TypeScript strict mode enabled
- Always run `bun lint` before commits
- Use existing type definitions and extend when needed

### SCSS Coding Standards

- write code for components in Vue component in style section with lang=scss and scoped attribute
- write common styles in separate files in `assets/styles/components/`

#### BEM Naming Convention:
- **Block**: `.component-name`
- **Element**: `.component-name__element` (double underscore)
- **Modifier**: `.component-name--modifier` (double dash)

#### Required File Imports:
```scss
@use '@/assets/styles/helpers/functions'; // When using functions
@use '@/assets/styles/helpers/media'; // When using media
@use '@/assets/styles/helpers/mixins';       // When using mixins
```

#### Selector Organization (MANDATORY ORDER):
1. **Basic styles** (no nesting)
2. **Media mixins** for the selector
3. **Pseudo-classes and pseudo-selectors**
    - Media mixins for pseudo elements
4. **Modifiers** (`&--modifier`)
    - Media mixins for modifiers
5. **Child tags** (`span`, `img`, etc.)
    - Media mixins for tags

#### Nesting Rules:
- **NEVER** nest elements inside blocks (`.block .block__element` ❌)
- **ONLY fold/nest**:
    - Media mixins (`@include media.lg-up {}`)
    - Pseudo selectors (`:hover`, `::before`)
    - Modifiers (`&--modifier`)
    - Simple single-use tags (`span`, `img`)
- **Media mixins ALWAYS come last** in any nested group

### Media Queries

#### Required Pattern:
```scss
.component {
  // Base styles first
  
  @include media.md-down {
    // Mobile/tablet styles
  }
  
  @include media.lg-up {
    // Desktop styles
  }
}
```

#### Available Breakpoints:
- `xs`, `sm`, `md`, `lg`, `xl`
- Use `-up`, `-down`, `-only` suffixes

### Typography & Sizing

#### Font Size Functions:
- **`functions.rem(16)`** - Convert pixels to rem
- **`functions.rfs(14, 18)`** - Responsive font sizing (min, max)

#### Font Family Variables:
- **`var(--f-base)`** - Body text font
- **`var(--f-headings)`** - Heading font
- **`var(--f-icons)`** - Icon font

### CSS Custom Properties System

#### Color Variables:
- Primary: `var(--c-primary)`, `var(--c-primary-hover)`
- Secondary: `var(--c-secondary)`, `var(--c-secondary-hover)`
- Greys: `var(--c-grey-00)` to `var(--c-grey-100)` (00=white, 100=black)
- States: `var(--c-danger)`, `var(--c-success)`, `var(--c-error)`

#### Layout Variables:
- Containers: `var(--w-container)`, `var(--w-container-md)`, etc.
- Border radius: `var(--b-radius-sm)`, `var(--b-radius-md)`, etc.
- Z-index: `var(--z-bottom)`, `var(--z-middle)`, `var(--z-top)`

### Code Generation Rules

#### When writing SCSS:
1. **Always** start with required `@use` imports
2. **Follow the exact selector organization order**
3. **Use CSS custom properties** instead of hardcoded values
4. **Include mobile-first responsive design**
5. **Apply BEM naming consistently**
6. **Never nest elements in blocks**

#### When suggesting file structure:
1. **Place components** in `/components/` directory
2. **Place sections** in `/sections/` directory
3. **Use proper file naming**: `_component-name.scss`
4. **Always include in appropriate `_index.scss`**

#### Before suggesting any SCSS code, verify:
- [ ] Proper `@use` imports at top
- [ ] BEM naming convention followed
- [ ] CSS custom properties used
- [ ] Media queries in correct order
- [ ] No element nesting in blocks
- [ ] Responsive design included

#### Before suggesting file organization:
- [ ] Files in correct directories
- [ ] Proper underscore prefixes (`_component.scss`)
- [ ] Appropriate `_index.scss` updates suggested

### Common Patterns

#### Component Structure:
```scss
@use '../helpers/media';
@use '../helpers/functions';

.component-name {
  // Base styles
  property: value;
  
  @include media.lg-up {
    // Desktop styles
  }
  
  &:hover {
    // Hover styles
    
    @include media.lg-up {
      // Desktop hover
    }
  }
  
  &--modifier {
    // Modifier styles
    
    @include media.lg-up {
      // Desktop modifier
    }
  }
}

.component-name__element {
  // Element styles
  font-size: functions.rem(16);
  color: var(--c-grey-80);
  
  @include media.lg-up {
    font-size: functions.rem(18);
  }
}
```

#### Section Structure:
```scss
@use '../helpers/media';
@use '../helpers/functions';

.section-name {
  // Section container styles
  max-width: var(--w-container);
  margin-inline: auto;
  padding: var(--pi-container);
  
  @include media.lg-up {
    padding: var(--pi-container-lg);
  }
}

.section-name__container {
  // Inner container if needed
}
```

### Error Prevention

#### Never suggest:
- Nested elements (`.block .block__element`)
- Hardcoded colors or sizes instead of CSS variables
- Missing `@use` imports
- Wrong file directory placement
- Non-BEM class names in component files

#### Always suggest:
- Mobile-first approach
- CSS custom properties
- Proper file organization
- Semantic HTML with BEM classes

#### When reviewing code:
1. **Check BEM naming compliance**
2. **Verify responsive design patterns**
3. **Ensure CSS custom property usage**
4. **Validate file organization**
5. **Confirm proper imports and dependencies**

### Success Criteria
Code suggestions should:
- Follow all naming conventions exactly
- Include proper responsive design
- Use the established CSS custom property system
- Maintain the file organization structure
- Be production-ready and maintainable
- Follow modern best practices for the Nuxt and Vue ecosystem

- **ALWAYS make all changes to a single file in ONE operation** using MultiEdit tool
- Never make multiple separate edits to the same file in sequence
- Group all related changes (fillable, relationships, casts, etc.) into a single file modification
- This prevents losing track of changes and makes code review easier
