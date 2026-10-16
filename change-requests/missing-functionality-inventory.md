# Missing Functionality Inventory (Module-by-Module)

This inventory identifies genuine, net-new capability gaps in the baseline ShopSphere application across Modules 2 through 15 & Module 17 (excluding Modules 1 and 16). None of these items are bug fixes; each represents missing business capabilities that advance trainee learning.

---

### Module 2: TypeScript Fundamentals for React
- **Gap**: The baseline has product, user, and cart models, but lacks multi-currency union definitions (`CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY'`), generic conversion Record dictionaries, and strict filter predicate type guards.
- **Missing Feature**: Strongly typed multi-currency types and conversion DTOs in `src/types/currency.ts`.

### Module 3: React Components with TypeScript
- **Gap**: Star ratings and review scores on product cards and product details are rendered with plain text (e.g. "3.9 ★ (120 reviews)"). There are no dedicated reusable star-rating or customer feedback badge components.
- **Missing Feature**: Reusable `StarRating` and `ReviewBadge` component library with typed props, optional interactive callbacks, and custom sizing.

### Module 4: Rendering and Styling in React with TypeScript
- **Gap**: The luxury design token palette is fixed in light mode; there is no dynamic high-contrast / dark mode theme token switcher with CSS Custom Properties and discriminated UI states.
- **Missing Feature**: Dynamic Theme Selector toggling between "Atelier Light" and "Midnight Noir" using CSS variables and smooth transition classes.

### Module 5: State Management with TypeScript
- **Gap**: Past orders on `OrdersPage` are rendered as static read-only items. Customers cannot interact with or manage their placed orders.
- **Missing Feature**: Order lifecycle state machine allowing customers to cancel `Confirmed` orders or request refunds on `Delivered` orders with immutable array updates.

### Module 6: Events and Forms with TypeScript
- **Gap**: Shoppers cannot submit their own qualitative product feedback or write customer reviews.
- **Missing Feature**: Controlled `ReviewForm` with 1–5 star rating picker, title, commentary textarea, character count constraints, and inline validation errors.

### Module 7: React Hooks with TypeScript
- **Gap**: Modals and ephemeral alert overlays lack reusable lifecycle timer hooks and accessible keyboard focus trapping hooks.
- **Missing Feature**: Reusable custom hooks: `useCountdownTimer` (for auto-dismissing alerts with cleanup) and `useFocusTrap` (for modal keyboard focus containment).

### Module 8: Routing with React Router and TypeScript
- **Gap**: Orders history cannot be filtered or deep-linked by status via URL query parameters (e.g. `/orders?status=Cancelled`).
- **Missing Feature**: Filterable order navigation tabs syncing with `useSearchParams` and preserving browser history.

### Module 9: REST API Integration with TypeScript
- **Gap**: Admins can edit products one by one, but cannot perform batch operations or invalidate catalog caches across an entire category.
- **Missing Feature**: Admin batch price adjustment mutation tool (e.g., applying a 10% markdown across "jewelery") using TanStack Query mutation and cache invalidation.

### Module 10: Context API and Global State Management
- **Gap**: `preferencesSlice` in Redux Toolkit only stores ephemeral toasts; currency and locale settings are not yet managed centrally.
- **Missing Feature**: Integration of `activeCurrency` into Redux Toolkit `preferencesSlice` with typed actions, selectors, and cross-application price recalculation.

### Module 11: Authentication and Authorization
- **Gap**: Customers cannot update their contact information or shipping defaults in the Account view, and there is no session revocation guard.
- **Missing Feature**: Customer profile editing interface with password change validation and session token renewal guards.

### Module 12: Advanced React Component Patterns
- **Gap**: There is no VIP back-in-stock alert workflow for exclusive merchandise.
- **Missing Feature**: Compound `StockNotificationModal` rendered via `createPortal` into `document.body` with backdrop blur, timer, and keyboard trap.

### Module 13: Performance Optimization
- **Gap**: Catalog calculations (category counts, price range bounds, discount summaries) re-compute on every layout render without memoization.
- **Missing Feature**: Memoized catalog computations with `useMemo` and virtualized row scrolling for large inventory listings in the Admin portal.

### Module 14: Testing React Applications with TypeScript
- **Gap**: Checkout form validation edge cases and Admin inventory CRUD operations lack dedicated automated Vitest integration test suites.
- **Missing Feature**: Dedicated test suites `CheckoutForm.test.tsx` (testing Luhn rejection and field validation) and `AdminCrud.test.tsx` (testing modal inputs and item deletion).

### Module 15: Enterprise React Application Architecture
- **Gap**: The application lacks a centralized client-side audit logging service and WCAG 2.1 AA live screen-reader announcer for asynchronous alerts.
- **Missing Feature**: Centralized enterprise `AuditLogger` service and an accessible `<LiveAnnouncer />` component for screen readers.

### Module 17: Capstone Project — Enterprise React + TypeScript Application
- **Gap**: Luxury buyers cannot submit VIP bespoke concierge inquiries or track multi-stage delivery milestones (Ordered -> Packed -> Shipped -> Out for Delivery -> Delivered).
- **Missing Feature**: Dedicated VIP Concierge Inquiry modal and an interactive Order Tracking Timeline milestone component.
