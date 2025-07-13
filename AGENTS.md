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

### Project Structure

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
- Mobile-first responsive breakpoints: xs(375px), sm(576px), md(720px), lg(992px), xl(1280px)

### Business Logic

- Products filtered by shop stoplist (in-stock/out-of-stock)
- Cart management with server synchronization
- Shop selection affects product availability
- Phone-based authentication with verification codes
- JWT tokens stored in cookies (`villus:default.token`)

## Development Guidelines

### Vue Component File Order (MANDATORY)

1. **Script section first** - `<script setup lang="ts">` with all TypeScript code
2. **Template section second** - `<template>` with HTML structure
3. **Style section last** - `<style lang="scss" scoped>` with CSS

### Component Development

- Use Composition API with `<script setup>`
- Import types from `/types/` directory
- Follow existing component patterns for props and emits
- Use `storeToRefs()` for reactive store access

### GraphQL Usage

- Always import and use existing fragments
- Follow the pattern: `import { FRAGMENT_NAME } from '~/gql/fragments/...'`
- New queries should follow existing naming conventions (e.g., `CATEGORY_LIST_QUERY`)
- Use `useListQuery<T>()` composable for GraphQL queries

### File Operations

- **ALWAYS make all changes to a single file in ONE operation** using MultiEdit tool
- Never make multiple separate edits to the same file in sequence
- Group all related changes into a single file modification

## SCSS Coding Standards

### File Structure

- Write component styles in Vue component `<style lang="scss" scoped>` sections
- Write common styles in separate files in `assets/styles/components/`

### BEM Naming Convention

- **Block**: `.component-name`
- **Element**: `.component-name__element` (double underscore)
- **Modifier**: `.component-name--modifier` (double dash)

### Required File Imports

```scss
@use '@/assets/styles/helpers/functions'; // When using functions
@use '@/assets/styles/helpers/media'; // When using media queries
@use '@/assets/styles/helpers/mixins'; // When using mixins
```

### Selector Organization (MANDATORY ORDER)

1. **Basic styles** (no nesting)
2. **Media mixins** for the selector
3. **Pseudo-classes and pseudo-selectors** (`:hover`, `::before`)
    - Media mixins for pseudo elements
4. **Modifiers** (`&--modifier`)
    - Media mixins for modifiers
5. **Child tags** (`span`, `img`, etc.)
    - Media mixins for tags

### Nesting Rules

- **NEVER** nest elements inside blocks (`.block .block__element` ❌)
- **ONLY nest**:
    - Media mixins (`@include media.lg-up {}`)
    - Pseudo selectors (`:hover`, `::before`)
    - Modifiers (`&--modifier`)
    - Simple single-use tags (`span`, `img`)
- **Media mixins ALWAYS come last** in any nested group

### Responsive Design

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

**Available Breakpoints**: `xs`, `sm`, `md`, `lg`, `xl` with `-up`, `-down`, `-only` suffixes

### Typography & Sizing

- **`functions.rem(16)`** - Convert pixels to rem
- **`functions.rfs(14, 18)`** - Responsive font sizing (min, max)

**Font Variables**:

- `var(--f-base)` - Body text font
- `var(--f-headings)` - Heading font
- `var(--f-icons)` - Icon font

### CSS Custom Properties System

**Colors**:

- Primary: `var(--c-primary)`, `var(--c-primary-hover)`
- Secondary: `var(--c-secondary)`, `var(--c-secondary-hover)`
- Greys: `var(--c-grey-00)` to `var(--c-grey-100)` (00=white, 100=black)
- States: `var(--c-danger)`, `var(--c-success)`, `var(--c-error)`

**Layout**:

- Containers: `var(--w-container)`, `var(--w-container-md)`
- Border radius: `var(--b-radius-sm)`, `var(--b-radius-md)`
- Z-index: `var(--z-bottom)`, `var(--z-middle)`, `var(--z-top)`

### Component Pattern Example

```scss
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

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

## Code Quality Standards

### Pre-commit Checklist

- Run `bun lint` before commits
- Use existing type definitions from `/types/`
- Follow TypeScript strict mode
- Ensure all imports are properly typed

### SCSS Validation Checklist

- [ ] Proper `@use` imports at top
- [ ] BEM naming convention followed
- [ ] CSS custom properties used (no hardcoded values)
- [ ] Media queries in correct order
- [ ] No element nesting in blocks
- [ ] Mobile-first responsive design included

### Error Prevention

**Never suggest**:

- Nested elements (`.block .block__element`)
- Hardcoded colors or sizes instead of CSS variables
- Missing `@use` imports
- Wrong file directory placement
- Non-BEM class names in component files

**Always suggest**:

- Mobile-first approach
- CSS custom properties
- Proper file organization
- Semantic HTML with BEM classes

## Environment Variables

Required for development:

- `BASE_URL` - GraphQL API endpoint
- `DADATA_API_TOKEN` - Russian address service
- `YANDEX_MAPS_API_KEY` - Yandex Maps integration

## Important Instructions

- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary for achieving the goal
- ALWAYS prefer editing existing files to creating new ones
- NEVER proactively create documentation files (\*.md) or README files unless explicitly requested
- Only use emojis if the user explicitly requests it
