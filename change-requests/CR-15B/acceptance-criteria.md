# Acceptance Criteria: CR-15B — Centralized Runtime Configuration & Vite Environment Boundaries

## Criteria Checklist
### AC-1: Type-safe AppConfig interface reading import.meta.env with fallback defaults
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: .env.example documenting all required environment variables
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Strongly typed Vite client declarations in vite-env.d.ts
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
