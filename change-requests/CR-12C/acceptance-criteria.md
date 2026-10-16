# Acceptance Criteria: CR-12C — Generic Table Primitive with Type-Safe Column Definitions (GenericTable<T>)

## Criteria Checklist
### AC-1: <GenericTable<T>> accepting data: T[] and ColumnDef<T>[] definitions
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Type-safe accessor keys and custom cell renderers
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Empty state fallback and responsive overflow scrolling
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
