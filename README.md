# React AG Grid with TanStack Query

A demonstration project showcasing AG Grid tables integrated with TanStack Query following a clean, structured architecture pattern.

## Stack

- **React 19** - UI library with latest features
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **AG Grid Community** - Powerful data grid component
- **TanStack Query** - Server state management and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Zod** - Runtime type validation and schema definition
- **Axios** - HTTP client for API requests

## Architecture

This project follows a layered architecture pattern with clear separation of concerns:

### Domain Layer (`src/domain/`)

- **Entities** - Business objects with behavior (e.g., `Client` class)
- **Schemas** - Zod schemas for type validation and API contracts
- **Constants** - Application constants and configuration

### Data Layer (`src/repositories/`)

- **Repositories** - Data access abstraction layer
- Handles API communication and data transformation
- Provides clean interface between domain and external services

### Application Layer (`src/queries/` & `src/mutations/`)

- **Queries** - TanStack Query hooks for data fetching
- **Mutations** - TanStack Query hooks for data modification
- Implements caching, optimistic updates, and error handling

### Presentation Layer (`src/containers/` & `src/components/`)

- **Containers** - Smart components that handle business logic
- **Components** - Reusable UI components
- **Table Columns** - AG Grid column definitions and cell renderers

## Key Features

- **Inline Editing** - Cell editing with optimistic updates
- **Type Safety** - End-to-end type safety from API to UI
- **Caching Strategy** - Intelligent data caching with TanStack Query
- **Clean Architecture** - Separation of concerns with clear boundaries
- **Custom Pagination** - Tailored pagination component with page size options

## Project Structure

```
src/
├── components/           # Reusable UI components
├── containers/          # Smart components and business logic
│   └── table/          # Table-specific components
├── domain/             # Business logic and domain models
│   ├── entities/       # Domain entities with behavior
│   ├── schemas/        # Zod validation schemas
│   └── constants/      # Application constants
├── queries/            # TanStack Query data fetching hooks
├── mutations/          # TanStack Query mutation hooks
├── repositories/       # Data access layer
└── lib/               # Utility functions
```

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development server:

   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```
