# ShopSphere — Curated Contemporary Retail Storefront

> A portfolio-quality, enterprise-grade React 18 + TypeScript e-commerce web application built against the [Fake Store API](https://fakestoreapi.com/) and mapped 1-to-1 against **Modules 2–15 and Module 17 (110 units)** of the authoritative React with TypeScript curriculum.

---

## Key Highlights & Features

- **Distinctive Visual Curation**: Warm editorial foundation, *Newsreader* serif typography paired with *Plus Jakarta Sans*, subtle elevation, and responsive layouts.
- **Real Catalog Integration**: Powered by TanStack Query and the Fake Store API with automatic fallback data for offline resilience.
- **Cart & Wishlist Engine**: Built with React Context, `useReducer` with discriminated action unions, resilient `localStorage` hydration, and dynamic free shipping threshold tracking.
- **Multi-Step Checkout**: Four-phase wizard covering Contact & Address, Delivery Method, Simulated Payment (with deliberate failure toggle for error recovery testing), and Order Review.
- **Order Tracking & Receipts**: Custom `orderService` storing simulated order dispatches and rendering them via a generic `<GenericTable<T>>` component with modal details.
- **Role-Based Authentication**: Supports both Customer and Administrator personas with one-click quick login shortcuts for evaluation.
- **Redux Toolkit Display Preferences**: Live currency switching and catalog pagination thresholds managed via Redux slices (`useAppDispatch`, `useAppSelector`) and an accessible toast notification queue.
- **Curriculum Traceability**: Complete mapping of all 110 included units in [`docs/curriculum-traceability.md`](docs/curriculum-traceability.md).

---

## Technology Stack

- **Framework**: React 18 & TypeScript 5.6 (strict compiler mode)
- **Bundler & Tooling**: Vite 5
- **Routing**: React Router 6 (nested routes, protected routes, dynamic parameters, query sync)
- **Server State**: TanStack Query 5 (caching, query keys, request cancellation)
- **Client Global State**: React Context API (`useReducer`) + Redux Toolkit (`createSlice`, typed hooks)
- **Icons**: Lucide React
- **Testing**: Vitest, JSDOM, React Testing Library, Jest DOM matchers
- **Styling**: Vanilla CSS Design System with CSS Custom Properties and WCAG AA contrast

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (verified on Node `v22.18.0`)
- **npm**: `v9.0.0` or higher

### Installation

```bash
# Clone or navigate to the workspace directory
cd FakerStoreAPI

# Install dependencies
npm install
```

### Development Server

```bash
# Start Vite development server
npm run dev
```
The application will be accessible at `http://localhost:3000/`.

---

## Verification & Build Commands

```bash
# Run strict TypeScript type check
npm run lint
# or
npx tsc --noEmit

# Run automated unit and component test suite
npm test

# Build production bundle with route-based code splitting
npm run build

# Preview production build locally
npm run preview
```

---

## Architecture Overview

```
src/
├── components/          # Reusable UI primitives & layout cross-cuttings
│   ├── common/          # Error boundaries, toast container, HOCs
│   └── ui/              # Button, Input, Select, Modal, GenericTable, Accordion
├── context/             # Domain state machines (CartContext, WishlistContext, AuthContext)
├── features/catalog/    # Catalog components (ProductCard, ProductSkeleton)
├── hooks/               # Custom hooks (useCatalog, useDebounce, useDocumentTitle)
├── layouts/             # RootLayout, Navbar, Footer, ProtectedRoute
├── pages/               # Route components (Home, Catalog, ProductDetail, Cart, etc.)
├── services/            # API client layer, mock data fallbacks, demo order service
├── store/               # Redux Toolkit store, typed hooks, preferences slice
├── styles/              # Design tokens, typography, CSS resets, global rules
├── types/               # Domain interfaces, enums, utility types, discriminated unions
└── utils/               # Formatters, cart calculations, storage wrappers
```

For comprehensive details on architecture and state selection, refer to [`docs/architecture.md`](docs/architecture.md).

---

## Demonstration Boundaries & Limitations

1. **Fake Store API**: The remote Fake Store API is a mock server. Read requests return real mock objects, but write operations do not persist in a remote database.
2. **Demo Orders**: Orders placed during the multi-step checkout are recorded and managed locally via `orderService` in browser `localStorage`.
3. **Simulated Payments**: Payment processing is strictly a simulation for demonstration and grading. No real credit card information is collected or processed.
4. **Demo Authentication**: Static JWT tokens are returned by the demo API. Session state is managed locally with a 24-hour expiration window.

---

## Evaluation Credentials

For evaluator convenience, one-click login shortcuts are embedded on the Sign-In page (`/login`):

- **Customer Persona**: Username `johnd` / Password `m38rmF$`
- **Administrator Persona**: Username `admin_sophia` (Grants Administrative Role)

---

## Documentation Index

- [Curriculum Traceability Matrix (110 Units)](docs/curriculum-traceability.md)
- [Architecture & State Management](docs/architecture.md)
- [Design System & Tokens](docs/design-system.md)
- [REST API Integration](docs/api-integration.md)
- [Testing Strategy & Test Results](docs/testing-strategy.md)
- [Baseline Release Verification](docs/baseline-release.md)
