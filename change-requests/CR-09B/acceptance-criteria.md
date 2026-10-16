# Acceptance Criteria: CR-09B — Admin Batch Category Price Adjustment & TanStack Mutation Cache

## Criteria Checklist
### AC-1: Batch Price Adjustment modal for category-wide markdowns (-50% to +50%)
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: TanStack Query useMutation invalidating ["products"] query key on success
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Immediate synchronization across Admin inventory and storefront catalog
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
