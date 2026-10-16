# Acceptance Criteria: CR-09A — Axios HTTP Client with Interceptors, Bearer Auth & Fallback Resilience

## Criteria Checklist
### AC-1: Axios instance with request interceptor injecting Correlation-ID and Bearer token
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Response interceptor normalizing errors into HttpError instances
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Resilient fallback to mock catalog when external network fails
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
