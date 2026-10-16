# Acceptance Criteria: CR-12B — Compound Dialog Pattern: Modal.Header, Modal.Body, Modal.Footer

## Criteria Checklist
### AC-1: Implement compound pattern: <Modal.Header>, <Modal.Body>, <Modal.Footer>
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Shared context providing isOpen and onClose to sub-components
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Strict TypeScript typings on compound component sub-properties
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
