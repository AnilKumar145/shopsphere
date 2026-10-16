# Acceptance Criteria: CR-08B — Protected & Public Route Guards with Return Path Redirection

## Criteria Checklist
### AC-1: <ProtectedRoute /> guard enforcing role access (customer vs admin)
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Redirects unauthenticated users to /login preserving return path in state
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Seamless return redirect back to target destination upon login
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
