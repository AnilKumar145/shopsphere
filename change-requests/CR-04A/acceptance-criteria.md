# Acceptance Criteria: CR-04A — Luxury Dark Mode & Dynamic CSS Theme Tokens

## Criteria Checklist
### AC-1: Implement data-theme="light" | "dark" CSS Custom Property tokens
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Build <ThemeToggle /> component with smooth 200ms CSS transitions
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Persist customer theme preference in localStorage
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
