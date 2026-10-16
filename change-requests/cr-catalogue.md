# ShopSphere Module-Wise Change Request (CR) Catalogue

This catalogue details all 15 proposed Change Requests, each mapped directly to an individual module of the React with TypeScript curriculum (Modules 2–15 & 17). All CRs are currently set to `PROPOSED` status awaiting stakeholder review.

---

## Catalogue Master Index

| CR ID | Module | Title | Difficulty | Est. Effort | Target Domain |
| :---: | :---: | :--- | :---: | :---: | :--- |
| [**CR-MOD-02**](./CR-MOD-02/request.md) | Mod 2 | TypeScript Fundamentals: Multi-Currency Union Types & DTOs | Medium | 2–3 hrs | Core Types / Utilities |
| [**CR-MOD-03**](./CR-MOD-03/request.md) | Mod 3 | React Components with TS: Reusable Star Rating & Review Badge Library | Low-Med | 2–3 hrs | UI Component Library |
| [**CR-MOD-04**](./CR-MOD-04/request.md) | Mod 4 | Rendering & Styling with TS: Luxury Dark Mode & Dynamic Theme Tokens | Medium | 2–3 hrs | Theme System & CSS Tokens |
| [**CR-MOD-05**](./CR-MOD-05/request.md) | Mod 5 | State Management with TS: Customer Order Lifecycle State Machine | Medium | 3–4 hrs | Post-Purchase / State |
| [**CR-MOD-06**](./CR-MOD-06/request.md) | Mod 6 | Events & Forms with TS: Controlled Product Review Form & Validation | Medium | 3–4 hrs | Product Engagement / Forms |
| [**CR-MOD-07**](./CR-MOD-07/request.md) | Mod 7 | React Hooks with TS: Custom Hooks (`useCountdownTimer` & `useFocusTrap`) | Medium | 2–3 hrs | Custom Hooks & Lifecycle |
| [**CR-MOD-08**](./CR-MOD-08/request.md) | Mod 8 | Routing with React Router: Order Status Filter Route & Query Sync | Low-Med | 2–3 hrs | Client-Side Routing |
| [**CR-MOD-09**](./CR-MOD-09/request.md) | Mod 9 | REST API Integration: Admin Batch Category Price Adjustment Mutation | Med-High | 3–4 hrs | Server Cache & Mutations |
| [**CR-MOD-10**](./CR-MOD-10/request.md) | Mod 10 | Context & Global State: Redux Preferences Slice for Multi-Currency | Medium | 2–3 hrs | Redux Toolkit & State |
| [**CR-MOD-11**](./CR-MOD-11/request.md) | Mod 11 | Authentication & Authorization: Customer Profile Security & Session Guard | Medium | 2–3 hrs | Security & Auth Guards |
| [**CR-MOD-12**](./CR-MOD-12/request.md) | Mod 12 | Advanced Component Patterns: `createPortal` Stock Alert Modal | Medium | 2–3 hrs | Portals & Compound Patterns |
| [**CR-MOD-13**](./CR-MOD-13/request.md) | Mod 13 | Performance Optimization: Memoized Computations & Virtualized Scroll | Medium | 2–3 hrs | Performance & Optimization |
| [**CR-MOD-14**](./CR-MOD-14/request.md) | Mod 14 | Testing React Applications: Integration Tests for Checkout & Admin CRUD | Medium | 3–4 hrs | Automated Testing / Vitest |
| [**CR-MOD-15**](./CR-MOD-15/request.md) | Mod 15 | Enterprise Architecture: Centralized Audit Logger & WCAG Announcer | Medium | 2–3 hrs | Enterprise Architecture |
| [**CR-MOD-17**](./CR-MOD-17/request.md) | Mod 17 | Capstone Enterprise Application: VIP Concierge Inquiry & Order Tracking | Med-High | 3–4 hrs | Capstone Integration Flow |

---

## Specifications by Module

### CR-MOD-02: TypeScript Fundamentals (Module 2)
- **Problem**: Baseline lacks strongly typed currency models and conversion dictionaries.
- **Requested Feature**: Union types `CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY'`, `ExchangeRateMap = Record<CurrencyCode, number>`, and conversion utility functions with strict parameter and return type annotations.
- **Target Files**: `src/types/currency.ts`, `src/utils/currencyUtils.ts`.
- **Criteria**: Full type inference, zero `any`, strict compiler compliance.

### CR-MOD-03: React Components with TypeScript (Module 3)
- **Problem**: Star ratings are rendered as plain text strings without accessible, reusable component primitives.
- **Requested Feature**: Reusable `<StarRating rating={number} maxStars={5} onRatingChange?={(n) => void} size="sm"|"md"|"lg" />` and `<ReviewBadge count={number} rating={number} />`.
- **Target Files**: `src/components/ui/StarRating.tsx`, `src/components/ui/StarRating.css`, `src/components/ui/ReviewBadge.tsx`.
- **Criteria**: Functional component typing (`React.FC`), optional props with default parameters, typed children, and export barrels.

### CR-MOD-04: Rendering & Styling in React with TypeScript (Module 4)
- **Problem**: Fixed light-mode color palette without dynamic theme transitions or high-contrast styling.
- **Requested Feature**: Theme switching mechanism toggling CSS Custom Properties (`--color-bg-primary`, `--color-surface`, `--color-text-primary`) between "Atelier Light" and "Midnight Noir", with smooth CSS transitions.
- **Target Files**: `src/index.css`, `src/components/common/ThemeToggle.tsx`.
- **Criteria**: Accessible theme toggle, persistent preference in `localStorage`, clean CSS tokens.

### CR-MOD-05: State Management with TypeScript (Module 5)
- **Problem**: Orders on `OrdersPage` are static read-only items. Customers cannot cancel or manage placed orders.
- **Requested Feature**: Order lifecycle state machine allowing shoppers to cancel `Confirmed` orders or request refunds on `Delivered` orders, using immutable array updates and `useReducer`.
- **Target Files**: `src/pages/OrdersPage.tsx`, `src/services/orderService.ts`.
- **Criteria**: State machine transitions (`Confirmed -> Cancelled`, `Delivered -> Refund_Requested`), state updates without mutation.

### CR-MOD-06: Events and Forms with TypeScript (Module 6)
- **Problem**: Customers cannot submit qualitative feedback or product ratings.
- **Requested Feature**: Controlled `ReviewForm` with `React.FormEvent`, input event handlers, star rating selection, headline input, commentary textarea, and field-level validation errors.
- **Target Files**: `src/features/reviews/ReviewForm.tsx`, `src/features/reviews/ReviewList.tsx`, `src/pages/ProductDetailPage.tsx`.
- **Criteria**: Form validation error messages, form reset on success, prevent default event handling.

### CR-MOD-07: React Hooks with TypeScript (Module 7)
- **Problem**: Overlays and temporary alert dialogs lack reusable lifecycle hooks for auto-dismiss timers and focus trapping.
- **Requested Feature**: `useCountdownTimer(durationSeconds, onExpire)` with `useEffect` cleanup and `useFocusTrap(active)` using `useRef` for accessible keyboard trapping.
- **Target Files**: `src/hooks/useCountdownTimer.ts`, `src/hooks/useFocusTrap.ts`.
- **Criteria**: Top-level hook rules, dependency array management, cleanup on unmount, typed return interfaces.

### CR-MOD-08: Routing with React Router and TypeScript (Module 8)
- **Problem**: Orders history cannot be filtered or bookmarked by status via URL query parameters.
- **Requested Feature**: Status tab bar on `OrdersPage` synchronized with `useSearchParams` (`/orders?status=all|confirmed|cancelled|delivered`), preserving filter state across back/forward navigation.
- **Target Files**: `src/pages/OrdersPage.tsx`.
- **Criteria**: Reactive URL param reading, programmatic `navigate()`, active tab indicator.

### CR-MOD-09: REST API Integration with TypeScript (Module 9)
- **Problem**: Administrators cannot execute batch operations across catalog items or invalidate cached queries by category.
- **Requested Feature**: Admin category batch price adjustment modal using TanStack Query mutation (`useMutation`), updating catalog items and invalidating product cache keys.
- **Target Files**: `src/pages/AdminPage.tsx`, `src/hooks/useCatalog.ts`.
- **Criteria**: Typed mutation payloads, optimistic cache invalidation, feedback toast on completion.

### CR-MOD-10: Context API & Global State Architecture (Module 10)
- **Problem**: Multi-currency preferences are not stored in central application state.
- **Requested Feature**: Redux Toolkit `preferencesSlice` extension with `activeCurrency: CurrencyCode`, `setCurrency` action, typed selectors, and updated `formatCurrency` utility.
- **Target Files**: `src/store/slices/preferencesSlice.ts`, `src/utils/formatters.ts`, `src/layouts/Navbar.tsx`.
- **Criteria**: Redux Toolkit slice configuration, typed `useAppSelector`, instant price reformatting across all views.

### CR-MOD-11: Authentication and Authorization (Module 11)
- **Problem**: Shoppers cannot update their account information, and there is no session revocation guard.
- **Requested Feature**: Customer profile edit modal with password change validation, role verification, and token expiration handling.
- **Target Files**: `src/pages/AccountPage.tsx`, `src/context/AuthContext.tsx`.
- **Criteria**: Role-based access enforcement, field validation, session update in state.

### CR-MOD-12: Advanced React Component Patterns (Module 12)
- **Problem**: No VIP back-in-stock notification alert workflow exists.
- **Requested Feature**: `StockNotificationModal` rendered via `createPortal` into `document.body` with compound modal header, body, and action footer.
- **Target Files**: `src/components/catalog/StockNotificationModal.tsx`, `src/pages/ProductDetailPage.tsx`.
- **Criteria**: Direct portal rendering outside root DOM, compound component structure, keyboard Escape dismissal.

### CR-MOD-13: Performance Optimization (Module 13)
- **Problem**: Heavy catalog calculations (category aggregations, price distributions) re-execute on every render.
- **Requested Feature**: Memoization of expensive catalog metrics via `useMemo`, callback stabilization with `useCallback`, and virtualized list rendering in Admin table.
- **Target Files**: `src/pages/ProductListPage.tsx`, `src/pages/AdminPage.tsx`.
- **Criteria**: Measured reduction in unnecessary re-renders, stable function references.

### CR-MOD-14: Testing React Applications with TypeScript (Module 14)
- **Problem**: Checkout validation edge cases and Admin CRUD operations lack automated test suites.
- **Requested Feature**: New Vitest test files: `src/test/CheckoutForm.test.tsx` (Luhn algorithm rejection, required fields) and `src/test/AdminCrud.test.tsx` (product modal validation, deletion).
- **Target Files**: `src/test/CheckoutForm.test.tsx`, `src/test/AdminCrud.test.tsx`.
- **Criteria**: RTL component testing, mock user events, 100% test pass rate without race conditions.

### CR-MOD-15: Enterprise React Application Architecture (Module 15)
- **Problem**: Application lacks a centralized client-side audit logging service and WCAG 2.1 AA live announcer for screen readers.
- **Requested Feature**: Enterprise `AuditLogger` service (`src/services/auditLogger.ts`) and accessible `<LiveAnnouncer />` component reading asynchronous status alerts.
- **Target Files**: `src/services/auditLogger.ts`, `src/components/common/LiveAnnouncer.tsx`, `src/App.tsx`.
- **Criteria**: Singleton service pattern, ARIA `aria-live="polite"`, clean architectural separation.

### CR-MOD-17: Capstone Enterprise Application (Module 17)
- **Problem**: Luxury buyers cannot submit bespoke concierge consultation inquiries or view a multi-stage order tracking progress timeline.
- **Requested Feature**: VIP Concierge Consultation Inquiry modal on luxury jewelry pieces and interactive multi-stage Order Tracking Timeline on confirmation receipts.
- **Target Files**: `src/features/concierge/ConciergeModal.tsx`, `src/components/orders/OrderTimeline.tsx`, `src/pages/OrderConfirmationPage.tsx`.
- **Criteria**: Complete end-to-end user journey, cohesive luxury aesthetic, full type safety.
