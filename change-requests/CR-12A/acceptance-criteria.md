# Acceptance Criteria: CR-12A — Accessible createPortal Quick View Modal with Backdrop Blur

## Criteria Checklist
### AC-1: Render modal outside DOM root directly into document.body using ReactDOM.createPortal
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Keyboard Escape key listener and body scroll lock while open
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Seamless Add to Bag and Wishlist triggers directly from modal
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
