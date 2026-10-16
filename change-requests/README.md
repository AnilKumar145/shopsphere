# ShopSphere Module-Wise Change Request (CR) Planning & Governance

## Overview
This directory contains the formal, module-wise Change Request (CR) catalogue, curriculum alignment mapping, independence audits, conflict audits, approval registers, and individual CR specifications for **ShopSphere**.

Every included module from the React with TypeScript Curriculum (Modules 2–15 & 17, with Modules 1 and 16 excluded per instructions) has a dedicated, unique Change Request designed for progressive trainee learning.

---

## Core Architecture & Governance Rules
1. **Preserve the Golden Baseline**: The root solution codebase (`c:\Users\DELL\Downloads\FakerStoreAPI`) is the golden baseline and remains completely untouched and immutable.
2. **Independent Trainee Workspace**: A standalone, independently verified copy of the solution exists at `c:\Users\DELL\Downloads\FakerStoreAPI\trainee-workspace`.
3. **No Implementation Without Human Approval**: All proposed CRs are strictly set to `PROPOSED`. Implementation begins only after explicit human approval of individual CR IDs.
4. **Isolated & Non-Cumulative**: Each CR is designed to be implemented independently from the unchanged trainee baseline.

---

## Directory Index
- [**TESTER-GUIDE.md**](./TESTER-GUIDE.md) — **Master UI Verification & Tester Guide contrasting Trainee Starter vs Golden Solution behavior across all 38 CRs.**
- [CR-INJECTION-PLAN.md](./CR-INJECTION-PLAN.md) — Master progressive injection roadmap and quality verification protocol.
- [cto-cr-review-matrix.md](./cto-cr-review-matrix.md) — Executive tabular review matrix for CTO.
- [`cr-catalogue.md`](./cr-catalogue.md) — Comprehensive catalogue of all 15 module-wise Change Requests.
- [`curriculum-coverage.md`](./curriculum-coverage.md) — 1:1 mapping of curriculum modules and units to CRs.
- [`missing-functionality-inventory.md`](./missing-functionality-inventory.md) — Detailed inventory of missing application functionality across modules.
- [`approval-register.md`](./approval-register.md) — Live register tracking review and approval status for each module CR.
- [`independence-audit.md`](./independence-audit.md) — Formal audit verifying that each module CR is implementable independently.
- [`conflict-audit.md`](./conflict-audit.md) — Analysis of file touchpoints and overlap management.

---

## Module-Wise Change Requests (CR-MOD-02 through CR-MOD-17)

| CR ID | Module | Title | Primary Focus |
| :---: | :---: | :--- | :--- |
| [**CR-MOD-02**](./CR-MOD-02/request.md) | Module 2 | TypeScript Fundamentals: Multi-Currency Union Types & Generic Record DTOs | Strict Typing & Union Types |
| [**CR-MOD-03**](./CR-MOD-03/request.md) | Module 3 | React Components with TS: Reusable Star Rating & Review Badge Library | Component Props & Composition |
| [**CR-MOD-04**](./CR-MOD-04/request.md) | Module 4 | Rendering & Styling with TS: Luxury Dark Mode & Dynamic CSS Theme Tokens | Dynamic CSS & UI States |
| [**CR-MOD-05**](./CR-MOD-05/request.md) | Module 5 | State Management with TS: Customer Order Lifecycle State Machine | Immutable State & Reducers |
| [**CR-MOD-06**](./CR-MOD-06/request.md) | Module 6 | Events & Forms with TS: Controlled Product Review Form & Validation | FormEvents & Field Validation |
| [**CR-MOD-07**](./CR-MOD-07/request.md) | Module 7 | React Hooks with TS: Custom Hooks (`useCountdownTimer` & `useFocusTrap`) | Lifecycle & Hook Design |
| [**CR-MOD-08**](./CR-MOD-08/request.md) | Module 8 | Routing with React Router: Order Status Filter Route & Query Sync | Nested Routes & SearchParams |
| [**CR-MOD-09**](./CR-MOD-09/request.md) | Module 9 | REST API Integration: Admin Batch Category Price Adjustment Mutation | TanStack Query & Cache Invalidation |
| [**CR-MOD-10**](./CR-MOD-10/request.md) | Module 10 | Context & Global State: Redux Preferences Slice for Multi-Currency | Redux Toolkit & Typed Selectors |
| [**CR-MOD-11**](./CR-MOD-11/request.md) | Module 11 | Authentication & Authorization: Customer Profile Security & Session Guard | Role Authorization & Guarding |
| [**CR-MOD-12**](./CR-MOD-12/request.md) | Module 12 | Advanced Component Patterns: `createPortal` Stock Alert Modal & Compound Dialog | Portals & Compound Patterns |
| [**CR-MOD-13**](./CR-MOD-13/request.md) | Module 13 | Performance Optimization: Memoized Inventory Computations & Large List Rendering | `useMemo` & Render Optimization |
| [**CR-MOD-14**](./CR-MOD-14/request.md) | Module 14 | Testing React Applications: Integration Tests for Checkout & Admin CRUD | Vitest & React Testing Library |
| [**CR-MOD-15**](./CR-MOD-15/request.md) | Module 15 | Enterprise Architecture: Centralized Audit Logger & WCAG 2.1 AA Announcer | Enterprise Services & Accessibility |
| [**CR-MOD-17**](./CR-MOD-17/request.md) | Module 17 | Capstone Enterprise Application: VIP Concierge Inquiry & Order Tracking Workflow | Full-Stack Enterprise Flow |
