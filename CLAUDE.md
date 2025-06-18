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