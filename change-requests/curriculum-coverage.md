# ShopSphere — Complete Curriculum & CTO Topic Traceability Matrix (38 CRs)

This document provides a 100% complete traceability mapping from:
1. **Course Outline**: [`Content Outline - ReactTopics -  SA.md`](../docs/Content%20Outline%20-%20ReactTopics%20-%20%20SA.md)
2. **CTO-Requested Additional Concepts**: All 12 requested enterprise topics.

Every single Change Request is directly derived from specific curriculum units **PLUS** the CTO's explicit topic requirements.

---

## Complete 38-CR Traceability Table

| CR ID | Curriculum Module | Curriculum Units Covered | CTO-Requested Topic Included | Change Request Title |
| :---: | :--- | :--- | :--- | :--- |
| [**CR-02A**](./CR-02A/request.md) | **Module 2: TS Fundamentals** | 2.1 Annotations, 2.2 Functions, 2.5 Union Types, 2.6 Narrowing, 2.8 Type Exports | **Core Multi-Currency Types** | Multi-Currency Union Types & Pure Conversion Utilities |
| [**CR-02B**](./CR-02B/request.md) | **Module 2: TS Fundamentals** | 2.3 Interfaces, 2.4 Type Aliases, 2.7 Generics & Record<K, V> | **CTO: Env variables and configuration** | Generic Record DTOs & Runtime Configuration Types |
| [**CR-03A**](./CR-03A/request.md) | **Module 3: React Components with TS** | 3.1 Functional Components, 3.2 Props Interfaces, 3.4 Return Types, 3.6 Organization | **CTO: Passing data from parent to child** | Parent-to-Child Props Flow & Multi-Level Catalog Hierarchy |
| [**CR-03B**](./CR-03B/request.md) | **Module 3: React Components with TS** | 3.2 Optional Props, 3.3 Children & Composition, 3.5 Generic UI Primitives | **Reusable UI Component Primitives** | Reusable Star Rating & Review Badge Component Library |
| [**CR-04A**](./CR-04A/request.md) | **Module 4: Rendering and Styling** | 4.1 Expressions in JSX, 4.3 Dynamic Styling, 4.4 CSS Custom Properties / Tokens | **Luxury Styling & Transitions** | Luxury Dark Mode & Dynamic CSS Theme Tokens |
| [**CR-04B**](./CR-04B/request.md) | **Module 4: Rendering and Styling** | 4.2 Conditional Rendering, 4.3 Dynamic Layouts, 4.5 Responsive UI States | **CTO: Displaying list in page & Responsiveness** | Dual-Mode Catalog List/Grid Rendering & Responsive ProductRow |
| [**CR-05A**](./CR-05A/request.md) | **Module 5: State Management with TS** | 5.1 State Fund., 5.4 Array State, 5.5 Union State, 5.7 Derived State | **Order State Machine Transitions** | Customer Order Lifecycle State Machine & Cancellation Flow |
| [**CR-05B**](./CR-05B/request.md) | **Module 5: State Management with TS** | 5.2 Complex State, 5.6 Reducer Patterns, 5.7 Derived State Calculations | **CTO: Shared TS component with calculations** | Shared Pricing Calculation Engine & Financial Breakdown State |
| [**CR-06A**](./CR-06A/request.md) | **Module 6: Events and Forms with TS** | 6.1 Event Handling, 6.2 Form Events, 6.4 Controlled Components, 6.6 Validation | **CTO: Form validation (Review Form)** | Controlled Product Review Form & Field-Level Validation |
| [**CR-06B**](./CR-06B/request.md) | **Module 6: Events and Forms with TS** | 6.3 Input Events, 6.5 Form Models, 6.6 Validation Algorithms, 6.8 Advanced Forms | **CTO: Form validation & Card security (Luhn Card)** | Checkout Payment Validation with Luhn Algorithm & Card Formatting |
| [**CR-06C**](./CR-06C/request.md) | **Module 6: Events and Forms with TS** | 6.4 Controlled Components, 6.7 Reusable Form Components, 6.8 Form Accessibility | **Form Component Architecture** | Reusable Controlled Form Element Primitives & Error Summaries |
| [**CR-07A**](./CR-07A/request.md) | **Module 7: React Hooks with TS** | 7.1 Hook Rules, 7.2 useEffect, 7.8 Custom Hooks, 7.9 Design Patterns | **Auto-Dismiss Lifecycle** | Custom Hook: useCountdownTimer with Interval Cleanup |
| [**CR-07B**](./CR-07B/request.md) | **Module 7: React Hooks with TS** | 7.3 useRef, 7.8 Custom Hooks, 7.9 DOM Management | **Modal Keyboard A11y** | Custom Hook: useFocusTrap for Modal Keyboard Accessibility |
| [**CR-07C**](./CR-07C/request.md) | **Module 7: React Hooks with TS** | 7.2 useEffect, 7.8 Custom Hooks, 7.9 Optimization Patterns | **Search Keystroke Optimization** | Custom Hook: useDebounce for Search Input Optimization |
| [**CR-08A**](./CR-08A/request.md) | **Module 8: Routing with React Router** | 8.1 Routing Fund., 8.3 Navigation, 8.6 Query Parameters | **Query Param URL Sync** | Order Status Filter Route & Query Parameter Synchronization |
| [**CR-08B**](./CR-08B/request.md) | **Module 8: Routing with React Router** | 8.2 Route Components, 8.7 Protected Routes, 8.8 Fallback Routes | **CTO: Protected and unprotected routes** | Protected & Public Route Guards with Return Path Redirection |
| [**CR-08C**](./CR-08C/request.md) | **Module 8: Routing with React Router** | 8.2 Nested Route Layouts, 8.5 Outlet Component, 8.8 Error Boundary Routes | **CTO: Creating and reusing layouts** | Reusable Application Shell & Layout System (RootLayout) |
| [**CR-09A**](./CR-09A/request.md) | **Module 9: REST API Integration** | 9.1 API Fund., 9.2 Async HTTP, 9.7 API Service Layer, 9.8 Data Transformation | **CTO: API call axios** | Axios HTTP Client with Interceptors, Bearer Auth & Fallback Resilience |
| [**CR-09B**](./CR-09B/request.md) | **Module 9: REST API Integration** | 9.6 CRUD Operations, 9.9 TanStack Query Mutations & Cache Invalidation | **Server State & Cache Invalidation** | Admin Batch Category Price Adjustment & TanStack Mutation Cache |
| [**CR-09C**](./CR-09C/request.md) | **Module 9: REST API Integration** | 9.3 API Response Types, 9.5 Loading and Error States, 9.8 Data Normalization | **Data Contracts & Normalization** | Typed API Response Models & DTO Normalization Layer |
| [**CR-10A**](./CR-10A/request.md) | **Module 10: Global State Management** | 10.5 Redux Core, 10.6 Redux Toolkit, 10.7 State Selection | **Global Multi-Currency Conversion** | Redux Preferences Slice for Multi-Currency & Active Locale |
| [**CR-10B**](./CR-10B/request.md) | **Module 10: Global State Management** | 10.4 Global State Architecture, 10.6 Redux Toolkit Slices, 10.7 Typed Hooks | **Global Toast Feedback Queue** | Redux Toolkit Toast Notification Feed & Auto-Dismiss Dispatcher |
| [**CR-11A**](./CR-11A/request.md) | **Module 11: Auth and Authorization** | 11.1 Auth Fund., 11.2 Login Integration, 11.6 Role Access | **Account Profile Security** | Customer Profile Security & Password Update Validation Guard |
| [**CR-11B**](./CR-11B/request.md) | **Module 11: Auth and Authorization** | 11.4 Token Handling, 11.5 Route Guards, 11.7 Security Considerations | **Session Expiration & Interceptor** | Session Token Expiration Interceptor & Graceful Re-Authentication |
| [**CR-11C**](./CR-11C/request.md) | **Module 11: Auth and Authorization** | 11.7 Security Considerations, Input Sanitization, Masking | **CTO: Security related CRs** | Client-Side Security Sanitization (XSS Stripping & Card Masking) |
| [**CR-12A**](./CR-12A/request.md) | **Module 12: Advanced Component Patterns** | 12.1 Component Design, 12.7 createPortal, 12.3 Compound Patterns | **CTO: Responsiveness + new component** | Accessible createPortal Quick View Modal with Backdrop Blur |
| [**CR-12B**](./CR-12B/request.md) | **Module 12: Advanced Component Patterns** | 12.3 Compound Components, 12.1 Component Design, 12.2 Generic Props | **Compound Dialog Architecture** | Compound Dialog Pattern: Modal.Header, Modal.Body, Modal.Footer |
| [**CR-12C**](./CR-12C/request.md) | **Module 12: Advanced Component Patterns** | 12.2 Generic Components, Type Parameters, Generic Props | **Generic Components** | Generic Table Primitive with Type-Safe Column Definitions (GenericTable<T>) |
| [**CR-13A**](./CR-13A/request.md) | **Module 13: Performance Optimization** | 13.1 React Rendering, 13.3 useMemo, 13.7 TypeScript Performance | **CTO: Performance related CRs (Memoization)** | Memoized Catalog Computations with useMemo for Price & Category Analytics |
| [**CR-13B**](./CR-13B/request.md) | **Module 13: Performance Optimization** | 13.2 React.memo, 13.3 useCallback, 13.4 List Optimization | **CTO: Performance related CRs (Callbacks)** | Stable Callback References with useCallback & Virtualized Inventory Scroll |
| [**CR-14A**](./CR-14A/request.md) | **Module 14: Testing React with TS** | 14.1 Testing Fund., 14.2 Vitest Env, 14.8 Test Isolation | **CTO: Lots of unit tests (Math & Logic)** | Vitest Unit Tests for Pricing Calculation Engine & Financial Math |
| [**CR-14B**](./CR-14B/request.md) | **Module 14: Testing React with TS** | 14.3 Component Testing, 14.4 User Events & Interaction Testing | **CTO: Lots of unit tests (Forms & Events)** | Component Interaction Tests for Form Validation (Checkout & Reviews) |
| [**CR-14C**](./CR-14C/request.md) | **Module 14: Testing React with TS** | 14.6 API Testing & Mocking, 14.7 Routing Tests, 14.8 Test Quality | **CTO: Lots of unit tests (API & Routing)** | Service Mocking & Route Guard Integration Tests |
| [**CR-15A**](./CR-15A/request.md) | **Module 15: Enterprise React Architecture** | 15.1 Architecture, 15.4 Service Architecture, 15.7 Code Quality, 15.10 Strict TS | **CTO: Exception handling and logging** | Enterprise Structured Logger & Custom Exception Hierarchy |
| [**CR-15B**](./CR-15B/request.md) | **Module 15: Enterprise React Architecture** | 15.6 Configuration Management, Environment Variables, 15.10 Strict TS | **CTO: Env variables and configuration** | Centralized Runtime Configuration & Vite Environment Boundaries |
| [**CR-15C**](./CR-15C/request.md) | **Module 15: Enterprise React Architecture** | 15.8 Accessibility, ARIA Live Regions, Focus Management | **Enterprise WCAG Accessibility** | WCAG 2.1 AA Accessible Live Announcer Region (aria-live="polite") |
| [**CR-17A**](./CR-17A/request.md) | **Module 17: Capstone Project** | 17.1 Requirements, 17.3 UI Development, 17.7 Authentication, 17.8 Validation | **Luxury Concierge Journey** | VIP Concierge Consultation Inquiry Workflow & Bespoke Modal |
| [**CR-17B**](./CR-17B/request.md) | **Module 17: Capstone Project** | 17.3 UI Development, 17.4 State Management, 17.9 Animation & Design | **Delivery Milestone Timeline** | Interactive Multi-Stage Order Delivery Milestone Progress Timeline |
