# Acceptance Criteria: CR-08A — Order Status Filter Route & Query Parameter Synchronization

## Criteria Checklist
### AC-1: Synchronize order filter tabs with useSearchParams (?status=active | cancelled | delivered)
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Direct URL navigation loads corresponding filtered order list
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Browser back/forward history properly restores filter tab
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
