# Acceptance Criteria: CR-04B — Dual-Mode Catalog List/Grid Rendering & Responsive ProductRow

## Criteria Checklist
### AC-1: Implement viewMode toggle state ("grid" | "list")
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Build <ProductListRow /> layout with thumbnail, rating, and actions
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Responsive design adapting gracefully on mobile, tablet, and desktop
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
