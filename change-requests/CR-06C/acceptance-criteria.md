# Acceptance Criteria: CR-06C — Reusable Controlled Form Element Primitives & Error Summaries

## Criteria Checklist
### AC-1: Reusable <Input /> and <Select /> with typed HTML input props
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Accessible aria-invalid and aria-describedby binding on errors
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Unified form error banner component for validation summaries
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
